import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GreenPrint, GreenPrintSchema } from './greenprint.schema';
import { GreenPrintService } from './greenprint.service';
import { GreenPrintController } from './greenprint.controller';

// If you need User or CarbonHistory inside the service, import them here too:
// import { User, UserSchema } from '../auth/user.schema';
// import { CarbonHistory, CarbonHistorySchema } from '../users/schemas/carbon-history.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: GreenPrint.name, schema: GreenPrintSchema },
      // { name: User.name, schema: UserSchema },
      // { name: CarbonHistory.name, schema: CarbonHistorySchema },
    ]),
  ],
  controllers: [GreenPrintController],
  providers: [GreenPrintService],
  exports: [GreenPrintService],
})
export class GreenPrintModule {}
