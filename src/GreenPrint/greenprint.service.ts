import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { GreenPrint, GreenPrintDocument } from '../GreenPrint/greenprint.schema';

@Injectable()
export class GreenPrintService {
  constructor(
    @InjectModel(GreenPrint.name)
    private readonly greenPrintModel: Model<GreenPrintDocument>,
  ) {}

  // =============================
  // 🔹 CRUD Operations
  // =============================

  async create(data: Partial<GreenPrint>): Promise<GreenPrint> {
    const newDoc = new this.greenPrintModel(data);
    return newDoc.save();
  }

  async findAll(): Promise<GreenPrint[]> {
    return this.greenPrintModel.find().exec();
  }

  async findOne(id: string): Promise<GreenPrint | null> {
    return this.greenPrintModel.findById(id).exec();
  }

  async update(id: string, data: Partial<GreenPrint>): Promise<GreenPrint | null> {
    return this.greenPrintModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async remove(id: string): Promise<GreenPrint | null> {
    return this.greenPrintModel.findByIdAndDelete(id).exec();
  }

  // =============================
  // 🔹 Sync & Portfolio Features
  // =============================

  // Called automatically whenever profile history updates
  async syncUserGreenPrint(
    userId: string,
    entry: { activity: string; amount: number },
  ) {
    let greenPrint = await this.greenPrintModel.findOne({ userId });
    if (!greenPrint) {
      greenPrint = new this.greenPrintModel({
        userId,
        totalCO2Saved: 0,
        highlights: [],
      });
    }

    // Update totals
    greenPrint.totalCO2Saved += entry.amount;

    // Push highlight
    greenPrint.highlights.push(
      JSON.stringify({
      title: `Saved ${entry.amount}kg CO₂ by ${entry.activity}`,
      date: new Date(),
      })
    );

    await greenPrint.save();
    return greenPrint;
  }

  // Ensure GreenPrint exists
  private async ensureForUser(userId: string | Types.ObjectId) {
    const id = typeof userId === 'string' ? new Types.ObjectId(userId) : userId;
    let gp = await this.greenPrintModel.findOne({ userId: id });
    if (!gp) {
      gp = await this.greenPrintModel.create({ userId: id });
    }
    return gp;
  }

  // Public portfolio
  async getPublicGreenPrint(idOrHandle: string, useHandle = false) {
    const query = useHandle
      ? { handle: idOrHandle, isPublic: true }
      : { userId: idOrHandle, isPublic: true };

    const gp = await this.greenPrintModel.findOne(query).lean();
    if (!gp) throw new NotFoundException('GreenPrint not found or private');

    return {
      userId: gp.userId,
      handle: gp.handle,
      totalCO2Saved: gp.totalCO2Saved,
      challengesCompleted: gp.challengesCompleted,
      badges: gp.badges,
      streakDays: gp.streakDays,
      theme: gp.theme,
      bio: gp.bio,
      avatarUrl: gp.avatarUrl,
      updatedAt: gp.updatedAt,
    };
  }

  // Shareable Card (for frontend / social sharing)
  async getShareableCard(idOrHandle: string, useHandle = false) {
    const gp = await this.getPublicGreenPrint(idOrHandle, useHandle);
    return {
      title: `${gp.handle ?? 'GreenPrint'} 🌱`,
      subtitle: `Total CO₂ Saved: ${gp.totalCO2Saved} kg`,
      badges: gp.badges.slice(0, 6),
      meta: {
        streakDays: gp.streakDays,
        challengesCompleted: gp.challengesCompleted,
      },
      theme: gp.theme,
    };
  }

  // =============================
  // 🔹 Mutations
  // =============================

  async addSavedCarbon(userId: string, savedKg: number) {
    const gp = await this.ensureForUser(userId);
    gp.totalCO2Saved = (gp.totalCO2Saved || 0) + (savedKg || 0);
    await gp.save();
    return gp;
  }

  async addBadge(userId: string, badge: string) {
    const gp = await this.ensureForUser(userId);
    if (!gp.badges.includes(badge)) {
      gp.badges.push(badge);
      await gp.save();
    }
    return gp;
  }

  async bumpStreak(userId: string, date = new Date()) {
    const gp = await this.ensureForUser(userId);

    const last = gp.lastStreakDate ? new Date(gp.lastStreakDate) : null;
    const today = new Date(date);
    today.setHours(0, 0, 0, 0);

    if (!last) {
      gp.streakDays = 1;
      gp.lastStreakDate = today;
    } else {
      const lastDay = new Date(last);
      lastDay.setHours(0, 0, 0, 0);

      const diff =
        (today.getTime() - lastDay.getTime()) / (1000 * 60 * 60 * 24);

      if (diff === 1) {
        gp.streakDays += 1;
        gp.lastStreakDate = today;
      } else if (diff > 1) {
        gp.streakDays = 1;
        gp.lastStreakDate = today;
      }
      // if diff === 0 → already counted today
    }

    await gp.save();
    return gp;
  }

  async setHandle(userId: string, handle: string) {
    await this.ensureForUser(userId);
    const existing = await this.greenPrintModel.findOne({
      handle: handle.toLowerCase().trim(),
    });
    if (existing && String(existing.userId) !== String(userId)) {
      throw new Error('Handle already taken');
    }
    return this.greenPrintModel.findOneAndUpdate(
      { userId },
      { handle: handle.toLowerCase().trim() },
      { new: true },
    );
  }

  async setVisibility(userId: string, isPublic: boolean) {
    await this.ensureForUser(userId);
    return this.greenPrintModel.findOneAndUpdate(
      { userId },
      { isPublic },
      { new: true },
    );
  }

  async setTheme(userId: string, theme: string) {
    await this.ensureForUser(userId);
    return this.greenPrintModel.findOneAndUpdate(
      { userId },
      { theme },
      { new: true },
    );
  }

  async setBio(userId: string, bio: string) {
    await this.ensureForUser(userId);
    return this.greenPrintModel.findOneAndUpdate(
      { userId },
      { bio },
      { new: true },
    );
  }
}
