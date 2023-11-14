---
title: SharePoint Add-Ins
page_title: SharePoint Add-Ins - Kendo UI Third-Party Frameworks
description: "Learn in theory and in practice how to build SharePoint add-ins with Kendo UI."
slug: sharepoint_tutorials
---

# SharePoint Add-Ins

This article provides general information and configuration specifics for building SharePoint add-ins with Kendo UI.

For more information on building SharePoint add-ins with Kendo UI, refer to:
* [Online tutorial by John Bristowe](https://www.telerik.com/blogs/building-sharepoint-add-ins-with-kendo-ui)
* [GitHub project repository](https://github.com/telerik/kendo-ui-sharepoint-2013-demo)

> Both the [tutorial](https://www.telerik.com/blogs/building-sharepoint-add-ins-with-kendo-ui) and [project repository](https://github.com/telerik/kendo-ui-sharepoint-2013-demo) refer to the Chart, DropDownList, and Scheduler widgets.

## Getting Started

The Microsoft releases of the SharePoint 2013 and later versions allow the building of solutions through self-contained extensions called SharePoint add-ins. The add-ins are built by using a combination of web technologies like HTML, CSS, and JavaScript instead of being based on ASP.NET.

SharePoint add-ins come in two flavors:
* SharePoint-hosted add-ins&mdash;They are served through SharePoint websites and are built with a combination of HTML, CSS, and JavaScript.
* Provider-hosted add-ins&mdash;Use external resources to SharePoint and can be built using any web stack (i.e. PHP)

## Kendo UI Integration

The add-in model enables the incorporation of web technologies that allow for the use of front-end libraries such as Kendo UI.

Kendo UI is a well-suited solution when building SharePoint add-ins because of the following features it provides:
* Easy integration with the SharePoint REST API.
* Built-in themes, including one that matches the Office 365 look and feel.
* Built-in export functionalities to most common office formats, such as Excel, PDF, and image files.
* Widely-recognized accessibility standards like WAI-ARIA, WCAG 2.2, and Section 508.

## Configuring DataSource

The proper configuration of the Kendo UI DataSource ensures its proper connection with the SharePoint REST API. The SharePoint endpoints support a variety of serialization formats and make it possible for the Data Source to work with SharePoint data that is stored in document libraries, metadata lists, or user profiles. In this way, the SharePoint service interfaces are consumed by the Data Source when the Data Source performs CRUD data operations.

To configure the Kendo UI Data Source:

1. Use the [`transport`](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/configuration/transport) option. To enable the Data Source to utilize the SharePoint services and perform CRUD operation against them, use `transport`. Note that you need to define a model for the Data Source because it drives the serialization plumbing.
2. Include the `accept` request-header. To inform the receiving endpoint to issue a reply through JSON, include the `accept` request-header with the JSON MIME-type specified.
3. Define the `data()` function. The `data()` function is necessary to parse the payload that is returned by the SharePoint REST API due to the presence of the `odata=verbose` request-header.

For more information on the Kendo UI Data Source abstraction, refer to [its introductory article]({% slug overview_kendoui_datasourcecomponent %}).

## Configuring CRUD Data Operations

1. Use the URL property of the `read` operation&mdash;SharePoint exposes services through the `<server>/<site>/_api/<feature_area>/<resource>` URI structure. To load data from the service endpoint, configure the Data Source through the `URL` property of the `read` operation.
2. Set the `create` operation. The DataSource has to use the `POST` request method for the `create` operations because the SharePoint services are RESTful. To ensure it is provided to the receiving service, you also need to define a `X-RequestDigest` request-header.
3. Set the `update` and `destroy` operations. The `update` and `destroy` operations target service endpoints through the `MERGE` and `DELETE` request methods respectively. To set the `update` and `destroy` operation, configure the `update` and `destroy` methods.

## See Also

* [Kendo UI DataSource API](/api/javascript/data/datasource.html)
* [Online Tutorial](https://www.telerik.com/blogs/building-sharepoint-add-ins-with-kendo-ui)
* [GitHub Project](https://github.com/telerik/kendo-ui-sharepoint-2013-demo)
* [Twitter Bootstrap]({% slug twitterbootstrapintegration_integration_kendoui %})
* [Angular 2.0]({% slug angular2support_integration_kendoui %})
* [RequireJS]({% slug requirejs_integration_kendoui %})
* [TypeScript]({% slug typescript_integration_kendoui %})
* [Visual Studio IntelliSense]({% slug visualstudiointellisense_integration_kendoui %})
* [Telerik Data Access]({% slug bindtotelerikdataaccesstool_integration_kendoui %})
* [SystemJS Support]({% slug systemjs_integration_kendoui %})
* [Webpack Support]({% slug webpacksupport_integration_kendoui %})
* [Module Bundlers]({% slug module_bundlers_integration_kendoui %})
* [Aurelia]({% slug aurelia_integration_kendoui %})
