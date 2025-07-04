---
title: Aurelia
page_title: Aurelia - Kendo UI Third-Party Tools
description: "Create Aurelia applications by using Kendo UI controls and applying the Aurelia-KendoUI Bridge."
slug: aurelia_integration_kendoui
---

# Aurelia

[Aurelia](http://aurelia.io/) is an open-source, vanilla-JavaScript client framework for mobile, desktop, and web. It is written in ECMAScript 2016 and helps you create a maintainable, testable, and extensible UI.

## Aurelia-Kendo UI Bridge

The [Aurelia-Kendo UI Bridge](http://aurelia-ui-toolkits.github.io/demo-kendo/#/about/about) creates native Aurelia components for the Kendo UI suite so that developers can build Aurelia applications by using the Kendo UI toolkit. This interface is a structured and configurable collection of JavaScript classes. It wraps native Kendo UI controls and presents them as Aurelia components.

The skeleton of the Bridge is the standard Aurelia plugin setup and the [Kendo UI Components Catalog index](http://aurelia-ui-toolkits.github.io/demo-kendo/#/catalog-index) is the resulting output of its implementation and development.

This Catalog is an Aurelia application that serves two main purposes:

* Allows developers to verify the correct function of the wrapper code, which presents the Kendo UI native control as an Aurelia component.
* Continuously shares the status of the project by demonstrating different ways of using each component to render Kendo UI controls.

For more information on the Aurelia-Kendo UI Bridge functionalities, refer to [this blog post by Aurelia's founder, Rob Eisenberg](http://blog.durandal.io/2016/01/28/aurelia-and-kendo-ui/).

## Prerequisites and Installation

To get your project up and running, refer to the page on [installing the Aurelia-Kendo UI Bridge](http://aurelia-ui-toolkits.github.io/demo-kendo/#/installation).

## Basic Usage

The following example demonstrates code snippets for Grid components. For more runnable examples of all Aurelia-Kendo UI controls that the Bridge supports, refer to the [Aurelia-Kendo UI components catalog](http://aurelia-ui-toolkits.github.io/demo-kendo/#/samples/grid/basic-use).

```tab-View
    <template>
        <require from="./basic-use.css"></require>

        <ak-grid k-data-source.bind="datasource" k-pageable.bind="pageable" k-sortable.bind="true">
          <ak-col k-title="Contact Name" k-field="ContactName">
            <ak-template>
              <div class='customer-photo' style="background-image: url(https://demos.telerik.com/kendo-ui/content/web/Customers/${CustomerID}.jpg);"></div>
              <div class='customer-name'>${ContactName}</div>
            </ak-template>
          </ak-col>
          <ak-col k-title="Contact Name" k-field="ContactName"></ak-col>
          <ak-col k-title="Contact Title" k-field="ContactTitle"></ak-col>
          <ak-col k-title="Company Name" k-field="CompanyName"></ak-col>
          <ak-col k-field="Country"></ak-col>
        </ak-grid>
    </template>
```
```tab-ViewModel
    export class BasicUse {

    pageable = {
      refresh: true,
      pageSizes: true,
      buttonCount: 10
    };

    constructor() {
      this.datasource = {
        type: 'odata-v4',
        transport: {
          read: 'https://demos.telerik.com/service/v2/odata/Customers'
          },
          pageSize: 5
        };
      }
    }
```
```tab-CSS
    #grid-basic-use .customer-photo {
        display: inline-block;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background-size: 32px 35px;
        background-position: center center;
        vertical-align: middle;
        line-height: 32px;
        box-shadow: inset 0 0 1px #999, inset 0 0 10px rgba(0,0,0,.2);
        margin-left: 5px;
    }

    #grid-basic-use .customer-name {
        display: inline-block;
        vertical-align: middle;
        line-height: 32px;
        padding-left: 3px;
    }
```

## See Also

* [SharePoint Add-Ins]({% slug sharepoint_tutorials %})
* [Twitter Bootstrap]({% slug twitterbootstrapintegration_integration_kendoui %})
* [Angular 2.0]({% slug angular2support_integration_kendoui %})
* [RequireJS]({% slug requirejs_integration_kendoui %})
* [TypeScript]({% slug typescript_integration_kendoui %})
* [Visual Studio IntelliSense]({% slug visualstudiointellisense_integration_kendoui %})
* [Telerik Data Access]({% slug bindtotelerikdataaccesstool_integration_kendoui %})
* [SystemJS Support]({% slug systemjs_integration_kendoui %})
* [Webpack Support]({% slug webpacksupport_integration_kendoui %})
* [Module Bundlers]({% slug module_bundlers_integration_kendoui %})
