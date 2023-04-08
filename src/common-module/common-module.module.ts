import { Global, Module } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
export const TOKENS = {
  uuid: 'UUID',
};
const uuidProvider = {
  useValue: uuid,
  provide: TOKENS.uuid,
};

@Global()
@Module({
  providers: [uuidProvider],
  exports: [uuidProvider],
})
export class CommonModuleModule {}
