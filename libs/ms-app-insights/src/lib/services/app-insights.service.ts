import { Inject, Injectable } from '@angular/core';
import {
  ApplicationInsights,
  ICustomProperties,
  IEventTelemetry,
} from '@microsoft/applicationinsights-web';
import { APP_INSIGHTS_CONFIG } from '../tokens/app-insights.token';
import { AppInsightsConfigModel } from '../models/app-insights-config.model';
import { Router } from '@angular/router';
import { AngularPlugin } from '@microsoft/applicationinsights-angularplugin-js';

@Injectable()
export class AppInsightsService {
  appInsights?: ApplicationInsights;

  constructor(
    @Inject(APP_INSIGHTS_CONFIG)
    private appInsightsConfig: AppInsightsConfigModel,
    private router: Router
  ) {}

  init() {
    if (!this.appInsightsConfig?.connectionString) {
      console.warn(`No Application Insights' connection string specified.`);
      return;
    }

    const { connectionString, appName, appVersion, appBuildNumber } =
      this.appInsightsConfig;

    const angularPlugin = new AngularPlugin();

    this.appInsights = new ApplicationInsights({
      config: {
        enableAutoRouteTracking: true,
        connectionString: connectionString,
        extensions: [angularPlugin],
        extensionConfig: {
          [angularPlugin.identifier]: { router: this.router },
        },
      },
    });

    this.appInsights.loadAppInsights();

    this.appInsights.addTelemetryInitializer((telemetryItem) => {
      telemetryItem.data ??= {};

      telemetryItem.tags ??= [];
      telemetryItem.tags['ai.cloud.role'] = appName;

      telemetryItem.ver = appVersion || 'not-set';
      telemetryItem.data['build'] = appBuildNumber || 'not-set';

      if (window) {
        telemetryItem.data['host'] = window.location.host;
        telemetryItem.data['viewportHeight'] = window.innerHeight;
        telemetryItem.data['viewportWidth'] = window.innerWidth;
        telemetryItem.data['devicePixelRatio'] = window.devicePixelRatio;
        telemetryItem.data['screenHeight'] = window.screen?.height;
        telemetryItem.data['screenWidth'] = window.screen?.width;
      }
    });
  }

  trackEvent(eventName: string, customProperties: ICustomProperties) {
    if (!this.appInsights) return;

    const event: IEventTelemetry = {
      name: eventName.toString(),
    };

    this.appInsights?.trackEvent(event, customProperties);
  }
}
