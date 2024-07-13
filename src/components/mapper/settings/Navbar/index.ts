import { NAV_TYPE } from '@/types/mapper.types';
import { navCommonSettings } from './Common';

export * from './Common'

export const navBarTypeSettings = {
    [NAV_TYPE.NAV_V1]: {
      ...navCommonSettings,
      inputs: [...navCommonSettings.inputs],
    },
    [NAV_TYPE.NAV_V2]: {
      ...navCommonSettings,
      inputs: [...navCommonSettings.inputs],
    },
    [NAV_TYPE.NAV_V3]: {
      ...navCommonSettings,
      inputs: [...navCommonSettings.inputs],
    },
  };