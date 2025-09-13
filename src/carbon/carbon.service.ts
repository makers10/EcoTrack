import { Injectable } from '@nestjs/common';

@Injectable()
export class CarbonService {
  calculateReduction(activityType: string, value: number): number {
    const conversionFactors = {
      recycling_plastic: 1.5, // kg CO2 per kg of plastic recycled
      recycling_paper: 0.8,   // kg CO2 per kg of paper recycled
      recycling_glass: 0.3,   // kg CO2 per kg of glass recycled
      biking: 0.25,           // kg CO2 per km (compared to driving)
      walking: 0.25,          // kg CO2 per km (compared to driving)
      public_transport: 0.1,  // kg CO2 per km (compared to driving)
      energy_saving: 0.5,     // kg CO2 per kWh saved
      water_saving: 0.0003,   // kg CO2 per liter saved
      sustainable_shopping: 2  // kg CO2 per product
    };

    return value * (conversionFactors[activityType] || 0);
  }

  getActivityTypes() {
    return [
      { id: 'recycling_plastic', name: 'Plastic Recycling', unit: 'kg' },
      { id: 'recycling_paper', name: 'Paper Recycling', unit: 'kg' },
      { id: 'recycling_glass', name: 'Glass Recycling', unit: 'kg' },
      { id: 'biking', name: 'Biking', unit: 'km' },
      { id: 'walking', name: 'Walking', unit: 'km' },
      { id: 'public_transport', name: 'Public Transport', unit: 'km' },
      { id: 'energy_saving', name: 'Energy Saving', unit: 'kWh' },
      { id: 'water_saving', name: 'Water Saving', unit: 'liters' },
      { id: 'sustainable_shopping', name: 'Sustainable Shopping', unit: 'items' },
    ];
  }
}