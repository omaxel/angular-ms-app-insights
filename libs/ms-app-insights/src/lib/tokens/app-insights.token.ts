import { InjectionToken } from '@angular/core';
import { AppInsightsConfigModel } from '../models/app-insights-config.model';

export const APP_INSIGHTS_CONFIG = new InjectionToken<AppInsightsConfigModel>(
  'app-insights-config'
);
