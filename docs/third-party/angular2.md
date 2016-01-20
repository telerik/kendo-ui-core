---
title: Angular 2.0
page_title: Angular 2.0 | Kendo UI Third-Party Tools
description: "Learn how to use Kendo UI widgets in Angular 2.0 applications (experimental)."
previous_url: /angular2
slug: angular2support_integration_kendoui
position: 3
---

# Angular 2.0

The 2015 Q3 release includes an experimental support for Angular 2.0. Unlike Angular 1.* versions, Angular 2.0 relies on the implementation of web components. If your browser does not support web components, add the [polyfill library](http://webcomponents.org/polyfills/).

> **Important**
>
> As of the time of the release, Angular 2 is still in alpha stage and relies on several moving parts (SystemJS, Traceur, etc). Things are changing pretty fast as the library advances forward, so chances are the setup below is not going to work with newer versions of any of the libraries.

The example below is based on the [5 min quickstart](https://angular.io/docs/js/latest/quickstart.html) setup instructions.

###### Example

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Kendo UI Angular 2 Quickstart</title>

        <script src="https://code.angularjs.org/tools/system.js"></script>
        <script src="https://code.angularjs.org/tools/typescript.js"></script>
        <script src="https://code.angularjs.org/2.0.0-alpha.44/angular2.dev.js"></script>

        <link href="http://cdn.kendostatic.com/2015.3.1111/styles/kendo.common.min.css" rel="stylesheet" />
        <link href="http://cdn.kendostatic.com/2015.3.1111/styles/kendo.metro.min.css" rel="stylesheet" />

        <script src="//code.jquery.com/jquery-1.9.1.min.js"></script>
        <script src="//kendo.cdn.telerik.com/2015.3.1111/js/kendo.all.min.js"></script>

    </head>
    <body>

        <!-- The app component created in app.ts -->
        <my-app></my-app>

        <script>
            System.config({
                transpiler: 'typescript',
                typescriptOptions: { emitDecoratorMetadata: true }
            });
            System.import('./app.ts');
        </script>
    </body>
</html>
```
```typescript
/// <reference path="kendo.angular2.d.ts" />
import {Component, View, bootstrap, FORM_DIRECTIVES, ControlGroup, Control } from 'angular2/angular2';
import {KendoValueAccessor} from 'kendo/angular2';

@Component({
    selector: 'my-app'
})
@View({
    template: `
    <form [ng-form-model]='myForm'>
    <button (click)="log()">log</button>
    <button (click)="setValue()">set value</button>
    <button (click)="setFormat()">set format</button>
    <div>
        <label>age: {{ data.age }} {{ myForm.controls.age.value }}</label>
    </div>
    <fieldset>
        <legend>Web Component</legend>
        <label>[control] and [value]</label><kendo-numerictextbox [options]="numericOptions" ng-control="age" (spin)="log($event)" [(ng-model)]='data.age'></kendo-numerictextbox>
        <kendo-slider [options]="sliderOptions" ng-control="age" [(ng-model)]='data.age'></kendo-slider>
        </div>
    </fieldset>
    <button (click)="onLogin()">Login</button>
    </form>
    `,
    directives: [FORM_DIRECTIVES, KendoValueAccessor]
})

class MyAppComponent {
    data: { age: Number } = { age: 10 };
    numericOptions: { format: String } = { format: "c0" };
    sliderOptions: { orientation: String } = { orientation: "horizontal" };

    theFormat: String;

    myForm: ControlGroup;

    constructor() {
        this.data.age = 10;

        this.myForm = new ControlGroup({
            fullName: new Control(""),
            username: new Control(""),
            age: new Control("")
        });

    }

    setFormat() {
        // WARNING: assigning value to the existing options object does not work yet.
        this.numericOptions = { format: "n0" };
        this.sliderOptions = { orientation: "vertical" };
    }

    log() {
        console.log(arguments);
    }

    setValue() {
        this.data.age = 7;
    }

    onLogin() {
        alert(this.myForm.controls.age.value);
    }
}

bootstrap(MyAppComponent);
```
``` typescript
// kendo.angular2.d.ts
declare module "kendo/angular2" {
    class KendoValueAccessor {
        private elementRef;
        private cd;
        onChange: (_: any) => void;
        onTouched: () => void;
        element: any;
        constructor(cd, elementRef);
        writeValue(value: any): void;
        registerOnChange(fn: (_: any) => {}): void;
        registerOnTouched(fn: () => {}): void;
    }
}
```

## Widget Configuration and Events

### Configuration Options

Static widget configuration options may be set as regular attributes. For example, the format of Kendo UI NumericTextBox may be assigned like this:

```
<kendo-numerictextbox format="c0"></kendo-numerictextbox>
```

### Bound Configuration Options

The widget instance also supports bound configuration options, through the `[options]="widgetOptions"` syntax. If the options object is changed, the widget will be automatically re-instantiated with the new configuration, similar to the `k-rebind` behavior in Angular 1.

> **Important**
>
> Currently, changing properties to the existing options object is not going to trigger the `rebind` behavior.

### `ng-model` and `ng-control`

Just like in Angular 1 versions, the widgets' `value` method is mapped to the `ng-model` directive. `ng-control` is also supported.

## Event Handling

Widget events are handled through the standard DOM event handling syntax. The `spin` event of the NumericTextBox widget is handled with the `(spin)="log($event)"` syntax. The Kendo UI event data is available in the `$event.detail` field.

## See Also

Other articles on Kendo UI integration with third-party tools and frameworks:

* [Twitter Bootstrap]({% slug twitterbootstrapintegration_integration_kendoui %})
* [Web Components]({% slug webcomponents_integration_kendoui %})
* [RequireJS]({% slug requirejs_integration_kendoui %})
* [TypeScript]({% slug typescript_integration_kendoui %})
* [Visual Studio IntelliSense]({% slug visualstudiointellisense_integration_kendoui %})
* [Telerik Data Access]({% slug bindtotelerikdataaccesstool_integration_kendoui %})
* [SystemJS Support]({% slug systemjs_integration_kendoui %})
* [Webpack Support]({% slug webpacksupport_integration_kendoui %})
