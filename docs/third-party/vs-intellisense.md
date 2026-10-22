---
title: Visual Studio IntelliSense
page_title: Visual Studio IntelliSense - Kendo UI Third-Party Tools
description: "Learn how to enable Visual Studio IntelliSense for Kendo UI by using TypeScript definitions."
components: ["general"]
previous_url: /vs-intellisense
slug: visualstudiointellisense_integration_kendoui
---

# Visual Studio IntelliSense

Kendo UI provides code completion in Visual Studio through its [TypeScript definitions]({% slug typescript_integration_kendoui %}).

## TypeScript-Based IntelliSense

Visual Studio 2017 and later use a [TypeScript-based language service for JavaScript IntelliSense](https://learn.microsoft.com/en-us/visualstudio/ide/javascript-intellisense). Use the Kendo UI TypeScript definitions to provide type information for components and their configuration.

For more information on this service, the way it works, and the features it supports, refer to:
* [Microsoft/TypeScript GitHub repo wiki: JavaScript Language Service in Visual Studio](https://github.com/Microsoft/TypeScript/wiki/JavaScript-Language-Service-in-Visual-Studio)
* [Microsoft/TypeScript GitHub repo wiki: JSDoc Support in JavaScript](https://github.com/Microsoft/TypeScript/wiki/JsDoc-support-in-JavaScript)

## Installation

Each distribution bundle includes a `typescript` directory containing `kendo.all.d.ts`. The Kendo UI NPM package also includes the TypeScript definitions. Follow the [TypeScript getting-started instructions]({% slug typescript_integration_kendoui %}#getting-started) to add them to your project.

## JSDoc Syntax for TypeScript-Based Intellisense

In JavaScript files, use the TypeScript definitions together with JSDoc annotations to provide type information without disabling the TypeScript-based language service.

The following screenshot demonstrates how to add TypeScript references to a JavaScript code block.

![Kendo UI for jQuery add typescript references to javascript](../images/vsdoc/ts-intellisense-in-js.jpg)

The following screenshots demonstrate how to declare variable types with [JSDoc syntax](https://github.com/Microsoft/TypeScript/wiki/JsDoc-support-in-JavaScript).

![Kendo UI for jQuery declare variable type - approach 1](../images/vsdoc/define-ts-variable-type-in-js-1.jpg)

![Kendo UI for jQuery declare variable type - approach 2](../images/vsdoc/define-ts-variable-type-in-js-2.jpg)

## See Also

* [Twitter Bootstrap]({% slug twitterbootstrapintegration_integration_kendoui %})
* [Angular 2.0]({% slug angular2support_integration_kendoui %})
* [RequireJS]({% slug requirejs_integration_kendoui %})
* [TypeScript]({% slug typescript_integration_kendoui %})
* [SystemJS Support]({% slug systemjs_integration_kendoui %})
* [Webpack Support]({% slug webpacksupport_integration_kendoui %})
* [Module Bundlers]({% slug module_bundlers_integration_kendoui %})
