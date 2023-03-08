export interface AppInsightsConfigModel {
  connectionString: string;

  appName: string;
  appVersion?: string;
  appBuildNumber?: string;
}
