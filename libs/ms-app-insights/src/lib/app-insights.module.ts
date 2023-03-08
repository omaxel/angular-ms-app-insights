import { ErrorHandler, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppInsightsConfigModel } from './models/app-insights-config.model';
import { APP_INSIGHTS_CONFIG } from './tokens/app-insights.token';
import { AppInsightsService } from './services/app-insights.service';
import { ApplicationinsightsAngularpluginErrorService } from '@microsoft/applicationinsights-angularplugin-js';

@NgModule({
  imports: [CommonModule],
})
export class AppInsightsModule {
  static forRoot(
    config: AppInsightsConfigModel
  ): ModuleWithProviders<AppInsightsModule> {
    return {
      ngModule: AppInsightsModule,
      providers: [
        {
          provide: APP_INSIGHTS_CONFIG,
          useValue: config,
        },
        {
          provide: ErrorHandler,
          useClass: ApplicationinsightsAngularpluginErrorService,
        },
        AppInsightsService,
      ],
    };
  }
}
