# Angular Microsoft Application Insights

Utility library to easily configure Microsoft Application Insights into an Angular project.

## Installation

Install dependencies first:

```
npm i @microsoft/applicationinsights-angularplugin-js @microsoft/applicationinsights-web
```

then install the package:

```
npm i @omaxel/angular-ms-app-insights
```

## Usage

- Configure the module in `app.module.ts`

  ```
  AppInsightsModule.forRoot({
    connectionString: 'YOUR_CONNECTION_STRING',~~~~
    appName: 'YOUR_APP_NAME',

    // Optionals
    appVersion: 'YOUR_APP_VERSION',
    appBuildNumber: 'YOUR_APP_BUILD_NUMBER'
  }),
  ```

- In the `app.component.ts` file, call the `init` method:

  ```
  import { Component } from '@angular/core';
  import { AppInsightsService } from "@omaxel/angular-ms-app-insights";

  @Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
  })
  export class AppComponent {
    constructor(appInsightsService: AppInsightsService) {
      appInsightsService.init();
    }
  }
  ```

## Track custom events

You can call the `trackEvent` method of `AppInsightsService` to track a custom event:

```
@Component({
  selector: 'app-example',
  templateUrl: './example.component.html'
})
export class ExampleComponent {
  constructor(private appInsightsService: AppInsightsService) { }

  onClick() {
    this.appInsightsService.trackEvent('my-event-name', { myProperty: 'my-value' });
  }
}
```
