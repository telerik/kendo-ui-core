---
title: Angular 2 Support
description: How to use Kendo UI widgets in AngularJS 2 applications (experimental)
position: 240
---

{% raw %}

# Angular 2 experimental support

The Q3 2015 release includes an experimental support for Angular 2. Unlike the AngularJS 1 branch, the Angular 2 relies on the web components implementation.
If your browser does not support web components, you should include the [polyfill library](http://webcomponents.org/polyfills/).

The example below is based on the [5 min quickstart](https://angular.io/docs/js/latest/quickstart.html) setup instructions.

> By the time of the release, Angular 2 is still in alpha stage, and relies on several moving parts (SystemJS, traceur, etc).
> Things are changing pretty fast as the library advances forward, so chances are the setup below won't work with newer versions of any of the libraries.

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

## Widget configuration and events


### Configuration Options

static widget configuration options may be set as regular attributes. For example, the format of the numeric textbox may be assigned like this:

```
<kendo-numerictextbox format="c0"></kendo-numerictextbox>
```

### Bound configuration options

The widget instance also supports bound configuration options, through the `[options]="widgetOptions"` syntax.
If the options object is changed, the widget will be reinstantiated automatically with the new configuration, similar to the `k-rebind` behavior in Angular 1.

> currently, changing properties to the existing options object will not trigger the rebind behavior.

### ng-model and ng-control

Just like in Angular 1, the widgets' value method is mapped to the `ng-model` directive. `ng-control` is also supported.

## Event Handling

Widget events are handled through the standard DOM event handling syntax - the spin event of the numerictextbox widget is handled with the `(spin)="log($event)"` syntax.
The kendo event data is available in the `$event.detail` field.

{% endraw %}
