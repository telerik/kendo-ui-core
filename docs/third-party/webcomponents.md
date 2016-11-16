---
title: Web Components
page_title: Web Components | Kendo UI Third-Party Tools
description: "Learn how to use Kendo UI widgets as web components."
previous_url: /webcomponents
slug: webcomponents_integration_kendoui
position: 2
---

# Web Components

Kendo UI provides a set of [custom elements](http://w3c.github.io/webcomponents/spec/custom/) allowing the initialization and application of the Kendo UI widgets in the Web Components way.

## Include Scripts

Starting from the Kendo UI 2017.R1 release, the WebComponents integration is not loaded by default. To add it to your project, you need to include it separately.

###### Example

```html
    <script src="http://kendo.cdn.telerik.com/{{ site.cdnVersion }}/js/kendo.all.min.js"></script>
    <script src="http://kendo.cdn.telerik.com/{{ site.cdnVersion }}/js/kendo.webcomponents.min.js"></script>
```

## Initialize Widgets

Initializing a Kendo UI widget is as simple as adding the desired custom element to the DOM. To provide values for the initialization options, use attributes and child nodes. Specify options of the `Object` type by using JSON strings.

> **Important**
>
> Custom element names follow the `kendo-widgetname` convention or `kendo-mobile-widgetname` for mobile widgets.

###### Example

```html
    <kendo-datepicker value="09/16/2015"></kendo-datepicker>

    <kendo-numerictextbox spinners="false" value="42"></kendo-numerictextbox>

    <kendo-dropdownlist value="Orange">
        <option>Black</option>
        <option>Orange</option>
        <option>Grey</option>
    </kendo-dropdownlist>

    <kendo-rangeslider min="0" max="100" tooltip="{enabled: false}">
        <input/>
        <input/>
    </kendo-rangeslider>
```

The creation of widgets on the fly is also supported, as demonstrated in the example below. Widgets are initialized once the custom element is inserted into a document with a browsing context.

###### Example

```html
    <script>
        var date = document.createElement("kendo-datepicker");
        document.body.appendChild(date);
        // the DatePicker is now live
        date.value(new Date());
    </script>
```

## Access Fields and Methods

When a Kendo UI widget is created as a web component from a custom HTML element, all its methods and fields are copied to this custom element. This spares the need to know which descendant of the custom element holds the widget instance.

###### Example

```html
    <kendo-grid id="grid1"></kendo-grid>
    <kendo-grid id="grid2"></kendo-grid>

    <script>

        // get reference to the columns collection of Grid 1
        var grid1 = document.getElementById("grid1");
        var columns1 = grid1.columns;

        // resize Grid 2
        var grid2 = document.getElementById("grid2");
        grid2.wrapper.height(900); // wrapper is a jQuery object
        grid2.resize();

    </script>
```

## Handle Events

Event handlers can be set either using the attributes of the element or by attaching them after the initialization of the widget using the  [`bind` method](/api/javascript/ui/widget#methods-bind). Attributes should follow the `on-eventname` convention and point to a handler living in the global scope.

### The init Event

The Kendo UI R3 2016 release introduces a special `init` event, which is triggered once the custom element is attached to the DOM.

The example below demonstrates how to subscribe to the event.

###### Example

```html
    <script>
        function onInit(e){
            alert(e.sender.value());
        }
    </script>
    <kendo-numerictextbox on-init="onInit" value="42"></kendo-numerictextbox>
```

### During Initialization

The example below demonstrates how to subscribe to events during initialization.

###### Example

```html
    <kendo-numerictextbox value="42" on-change="onChange"></kendo-numerictextbox>
    <script>
        function onChange(){
            alert(this.value());
        }
    </script>
```

### After Initialization

The example below demonstrates how to subscribe to events after initialization.

###### Example

```html
    <kendo-numerictextbox value="42"></kendo-numerictextbox>
    <script>
        var numeric = document.querySelector("kendo-numerictextbox");
        numeric.bind("change", function() {
            alert(this.value());
        });
    </script>
```

## Set a DataSource

Specify the DataSource in the way you configure any other option&mdash;through the attributes of the elements, or by using the `setDataSource` method after the widget is initialized.

###### Example

```html
    <kendo-dropdownlist data-source="['Black', 'Orange', 'Grey']"></kendo-dropdownlist>
    <script>
        var dataSource = new kendo.data.DataSource({
            data:['Red', 'Green', 'Blue']
        });
        var color = document.querySelector("kendo-dropdownlist");
        color.setDataSource(dataSource);
    </script>
```

## Browser Support

Web Components work using certain features that older browsers do not support. It is recommended to use the [`webcomponents.js`](http://webcomponents.org/polyfills/) polyfill library where wider Web Components support is required.

> **Important**
>
> The widget instance might not be available on the `DOMContentLoaded` or the jQuery `document.ready` event because the Internet Explorer does not support custom elements at this point and relies on polyfills. Use the [`WebComponentsReady`](http://webcomponents.org/polyfills/custom-elements/) event of the polyfill or the `init` event of the widget instead.

## See Also

Other articles on Kendo UI integration with third-party tools and frameworks:

* [Angular 2.0]({% slug angular2support_integration_kendoui %})
* [Twitter Bootstrap]({% slug twitterbootstrapintegration_integration_kendoui %})
* [RequireJS]({% slug requirejs_integration_kendoui %})
* [TypeScript]({% slug typescript_integration_kendoui %})
* [Visual Studio IntelliSense]({% slug visualstudiointellisense_integration_kendoui %})
* [Telerik Data Access]({% slug bindtotelerikdataaccesstool_integration_kendoui %})
* [SystemJS Support]({% slug systemjs_integration_kendoui %})
* [Webpack Support]({% slug webpacksupport_integration_kendoui %})
* [Aurelia]({% slug aurelia_integration_kendoui %})
