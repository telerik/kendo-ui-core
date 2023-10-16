---
title: First Steps
page_title: First Steps with Your Kendo UI for jQuery Project Guide - Getting Started 
description: "A guide on getting started with Kendo UI for jQuery, showing how to add the necessary CSS and JavaScript files, and implement the Grid component."
previous_url: /install/onsite, /getting-started, /intro/getting-started, /using-kendo-with, /getting-started/using-kendo-with, /bootstrapper, /intro/installation/getting-started
slug: getting_started_installation_kendoui
position: 0
---

# First Steps with Kendo UI for jQuery

Welcome to the First Steps guide on getting started with Kendo UI for jQuery!

This guide demonstrates how to start working with the suite by adding the needed resources and initializing a [Kendo UI Grid]({% slug overview_kendoui_grid_widget %}).

The process draws on the following milestones:

 1. [Download the controls](#1-download-the-controls)
 1. [Add the required JavaScript and CSS files](#2-add-the-required-javascript-and-css-files)
 1. [Bind the Grid to data](#3-bind-the-grid-to-data)
 1. [Initialize the Grid](#4-initialize-the-grid)
 1. [Configure the Grid](#5-configure-the-grid)
 1. [Add a license file to your app](#6-add-your-license-file)

 >tip Visual Studio Code users can speed up the project creation by using the [Kendo UI Productivity Tools for Visual Studio Code](intro/installation/vscode-integration).
 
## 1. Download the Controls 

You can quickly download the Kendo UI for jQuery controls after you log into [your Telerik account](https://www.telerik.com/download-login-v2-kendoui). 

## 2. Add the Required JavaScript and CSS Files

First, you will add the Kendo UI assets to your HTML document. In this sample case, you will use the [Kendo UI CDN service]({% slug kendoui_cdn_services_installation %}). In other scenarios, you can [host the files locally]({% slug hosting_kendoui %}).

Always register jQuery before the Kendo UI script&mdash;otherwise, you will get [JavaScript errors]({% slug troubleshooting_common_issues_kendoui %}) when you try to initialize a Kendo UI component or use the Kendo UI API.

> As of R3 2023 the Kendo UI bundles do not include the jQuery library in their `js` directories and you can use any available jQuery source you prefer (https://jquery.com/download/).

To make sure all scripts are loaded, make a simple API call to render the [Kendo UI version](/api/javascript/kendo/fields/version).

> The `$(function() { });` code block is a [jQuery `document.ready`](https://learn.jquery.com/using-jquery-core/document-ready/) handler. All JavaScript code from this guide has to go inside this closure.

	```html
		<link href="https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/default/default-main.css" rel="stylesheet" />
		<script src="https://code.jquery.com/jquery-1.12.3.min.js"></script>
		
    <!-- Add the Kendo library by either using the JAVASCRIPT MODULES -->
    <script src="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/mjs/kendo.all.js" type="module"></script>

    <!-- OR by using the BUNDLED JAVASCRIPT -->
		<script src="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/js/kendo.all.min.js"></script>
	```

## 3. Bind the Grid to Data

You will now create a [Kendo UI DataSource]({% slug overview_kendoui_datasourcecomponent %}) with some dummy orders which will later be used to bind a Grid.

A hard-coded array of data items is the simplest way to create a `datasource`. In real-life scenarios, you can fetch [remote data]({% slug getting_started_kendoui_remote_data_binding %}) or configure [editing (CRUD operations)]({% slug cruddataoperations_kendoui_datasourcecomponent %}).

To ensure the correct implementation of the data operations, you need to configure the [data field types](/api/javascript/data/datasource/configuration/schema#schemamodel). Also, you will apply a [page size](/api/javascript/data/datasource/configuration/pagesize) and a default [sorting](/api/javascript/data/datasource/configuration/sort) by `OrderDate`.

    var orderData = [
      { OrderID: 1, OrderDate: "2017-11-06T12:00:00", Freight: 12.34, ShipCity: "Antwerp", ShipCountry: "Belgium" },
      { OrderID: 2, OrderDate: "2019-03-02T12:00:00", Freight: 23.45, ShipCity: "Singapore", ShipCountry: "Singapore" },
      { OrderID: 3, OrderDate: "2019-06-26T12:00:00", Freight: 34.56, ShipCity: "Shanghai", ShipCountry: "China" },
      { OrderID: 4, OrderDate: "2017-09-20T12:00:00", Freight: 45.67, ShipCity: "Hamburg", ShipCountry: "Germany" },
      { OrderID: 5, OrderDate: "2017-12-12T12:00:00", Freight: 56.78, ShipCity: "Mumbai", ShipCountry: "India" },
      { OrderID: 6, OrderDate: "2018-02-08T12:00:00", Freight: 67.89, ShipCity: "Shanghai", ShipCountry: "China" },
      { OrderID: 7, OrderDate: "2018-05-05T12:00:00", Freight: 78.90, ShipCity: "Tokyo", ShipCountry: "Japan" },
      { OrderID: 8, OrderDate: "2019-08-03T12:00:00", Freight: 89.01, ShipCity: "Port Klang", ShipCountry: "Malaysia" },
      { OrderID: 9, OrderDate: "2018-10-29T12:00:00", Freight: 90.12, ShipCity: "Rotterdam", ShipCountry: "Netherlands" },
      { OrderID: 10, OrderDate: "2018-01-23T12:00:00", Freight: 10.32, ShipCity: "Vancouver", ShipCountry: "Canada" },
      { OrderID: 11, OrderDate: "2018-04-17T12:00:00", Freight: 21.43, ShipCity: "Colón", ShipCountry: "Panama" },
      { OrderID: 12, OrderDate: "2017-07-11T12:00:00", Freight: 32.54, ShipCity: "Manila", ShipCountry: "Philippines" },
      { OrderID: 13, OrderDate: "2017-10-24T12:00:00", Freight: 43.65, ShipCity: "Singapore", ShipCountry: "Singapore" },
      { OrderID: 14, OrderDate: "2018-03-11T12:00:00", Freight: 54.76, ShipCity: "Busan", ShipCountry: "South Korea" },
      { OrderID: 15, OrderDate: "2018-06-17T12:00:00", Freight: 65.87, ShipCity: "Shenzhen", ShipCountry: "China" },
      { OrderID: 16, OrderDate: "2018-10-13T12:00:00", Freight: 76.98, ShipCity: "Hong Kong", ShipCountry: "China" },
      { OrderID: 17, OrderDate: "2019-04-19T12:00:00", Freight: 87.09, ShipCity: "Dubai", ShipCountry: "UAE" },
      { OrderID: 18, OrderDate: "2019-07-25T12:00:00", Freight: 98.21, ShipCity: "Felixstowe", ShipCountry: "UK" },
      { OrderID: 19, OrderDate: "2017-09-22T12:00:00", Freight: 13.24, ShipCity: "Los Angeles", ShipCountry: "USA" },
      { OrderID: 20, OrderDate: "2018-12-09T12:00:00", Freight: 35.46, ShipCity: "New York", ShipCountry: "USA" },
      { OrderID: 21, OrderDate: "2018-02-04T12:00:00", Freight: 57.68, ShipCity: "Guangzhou", ShipCountry: "China" },
      { OrderID: 22, OrderDate: "2019-05-16T12:00:00", Freight: 9.87, ShipCity: "Long Beach", ShipCountry: "USA" },
      { OrderID: 23, OrderDate: "2019-08-18T12:00:00", Freight: 24.13, ShipCity: "Singapore", ShipCountry: "Singapore" }
    ];

    var gridDataSource = new kendo.data.DataSource({
        data: orderData,
        schema: {
            model: {
              fields: {
                OrderID: { type: "number" },
                Freight: { type: "number" },
                OrderDate: { type: "date" },
                ShipCountry: { type: "string" },
                ShipCity: { type: "string" }
              }
            }
        },
        pageSize: 10,
        sort: {
            field: "OrderDate",
            dir: "desc"
        }
    });

## 4. Initialize the Grid

Now you are ready to [initialize a Kendo UI Grid]({% slug overview_kendoui_grid_widget %}#initializing-the-grid). First, add a new `<div>` element to the page.

	<div id="ordersGrid"></div>

The following snippet contains the JavaScript code which will [create the component instance]({% slug initialize_widgets_using_jquery_plugins_installation %}) and use the defined `datasource`. Place the code after the `gridDataSource` definition. For a runnable version of the page after the current step, refer to [this demo](https://dojo.telerik.com/URepufIY).

	$("#ordersGrid").kendoGrid({
	  dataSource: gridDataSource
	});

## 5. Configure the Grid

At this point, you have a populated the Kendo UI Grid. However, you need to improve and polish its performance, for example:

* Define user-friendly column titles and [widths]({% slug column_widths_kendoui_grid_widget %}).
* Enable data operations&mdash;[paging]({% slug paging_kendoui_grid_widget %}), [sorting]({% slug sorting_kendoui_grid_widget %}), and [filtering]({% slug filtering_kendoui_grid_widget %}).
* Define a height and enable [scrolling]({% slug scrolling_kendoui_grid_widget %}) so that the Grid cannot expand indefinitely.

The following example demonstrates the updated Grid configuration.

	$("#ordersGrid").kendoGrid({
	  dataSource: gridDataSource,
	  height: 400,
	  pageable: true,
	  sortable: true,
	  filterable: true,
	  columns: [{
		field:"OrderID",
		title: "Order ID",
		width: 160
	  }, {
		field: "Freight",
		width: 160,
	  }, {
		field: "OrderDate",
		title: "Order Date",
		width: 200,
	  }, {
		field: "ShipCountry",
		title: "Ship Country"
	  }, {
		field: "ShipCity",
		title: "Ship City"
	  }]
	});

The runnable example below demonstrates the final version of the page that you will create and build as a result of this tutorial.

```dojo
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Getting Started with Kendo UI for jQuery</title>

    <link rel="stylesheet" href="https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/default/default-main.css" />

    <script src="https://code.jquery.com/jquery-3.7.0.min.js"></script>
    <script src="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/js/kendo.all.min.js"></script>
  </head>
  <body>

    <div id="ordersGrid"></div>

    <script>
      $(function() {        
        var orderData = [
          { OrderID: 1, OrderDate: "2017-11-06T12:00:00", Freight: 12.34, ShipCity: "Antwerp", ShipCountry: "Belgium" },
          { OrderID: 2, OrderDate: "2019-03-02T12:00:00", Freight: 23.45, ShipCity: "Singapore", ShipCountry: "Singapore" },
          { OrderID: 3, OrderDate: "2019-06-26T12:00:00", Freight: 34.56, ShipCity: "Shanghai", ShipCountry: "China" },
          { OrderID: 4, OrderDate: "2017-09-20T12:00:00", Freight: 45.67, ShipCity: "Hamburg", ShipCountry: "Germany" },
          { OrderID: 5, OrderDate: "2017-12-12T12:00:00", Freight: 56.78, ShipCity: "Mumbai", ShipCountry: "India" },
          { OrderID: 6, OrderDate: "2018-02-08T12:00:00", Freight: 67.89, ShipCity: "Shanghai", ShipCountry: "China" },
          { OrderID: 7, OrderDate: "2018-05-05T12:00:00", Freight: 78.90, ShipCity: "Tokyo", ShipCountry: "Japan" },
          { OrderID: 8, OrderDate: "2019-08-03T12:00:00", Freight: 89.01, ShipCity: "Port Klang", ShipCountry: "Malaysia" },
          { OrderID: 9, OrderDate: "2018-10-29T12:00:00", Freight: 90.12, ShipCity: "Rotterdam", ShipCountry: "Netherlands" },
          { OrderID: 10, OrderDate: "2018-01-23T12:00:00", Freight: 10.32, ShipCity: "Vancouver", ShipCountry: "Canada" },
          { OrderID: 11, OrderDate: "2018-04-17T12:00:00", Freight: 21.43, ShipCity: "Colón", ShipCountry: "Panama" },
          { OrderID: 12, OrderDate: "2017-07-11T12:00:00", Freight: 32.54, ShipCity: "Manila", ShipCountry: "Philippines" },
          { OrderID: 13, OrderDate: "2017-10-24T12:00:00", Freight: 43.65, ShipCity: "Singapore", ShipCountry: "Singapore" },
          { OrderID: 14, OrderDate: "2018-03-11T12:00:00", Freight: 54.76, ShipCity: "Busan", ShipCountry: "South Korea" },
          { OrderID: 15, OrderDate: "2018-06-17T12:00:00", Freight: 65.87, ShipCity: "Shenzhen", ShipCountry: "China" },
          { OrderID: 16, OrderDate: "2018-10-13T12:00:00", Freight: 76.98, ShipCity: "Hong Kong", ShipCountry: "China" },
          { OrderID: 17, OrderDate: "2019-04-19T12:00:00", Freight: 87.09, ShipCity: "Dubai", ShipCountry: "UAE" },
          { OrderID: 18, OrderDate: "2019-07-25T12:00:00", Freight: 98.21, ShipCity: "Felixstowe", ShipCountry: "UK" },
          { OrderID: 19, OrderDate: "2017-09-22T12:00:00", Freight: 13.24, ShipCity: "Los Angeles", ShipCountry: "USA" },
          { OrderID: 20, OrderDate: "2018-12-09T12:00:00", Freight: 35.46, ShipCity: "New York", ShipCountry: "USA" },
          { OrderID: 21, OrderDate: "2018-02-04T12:00:00", Freight: 57.68, ShipCity: "Guangzhou", ShipCountry: "China" },
          { OrderID: 22, OrderDate: "2019-05-16T12:00:00", Freight: 9.87, ShipCity: "Long Beach", ShipCountry: "USA" },
          { OrderID: 23, OrderDate: "2019-08-18T12:00:00", Freight: 24.13, ShipCity: "Singapore", ShipCountry: "Singapore" }
        ];

        var gridDataSource = new kendo.data.DataSource({
          data: orderData,
          schema: {
            model: {
              fields: {
                OrderID: { type: "number" },
                Freight: { type: "number" },
                OrderDate: { type: "date" },
                ShipCountry: { type: "string" },
                ShipCity: { type: "string" }
              }
            }
          },
          pageSize: 10,
          sort: {
            field: "OrderDate",
            dir: "desc"
          }
        });  
        

        $("#ordersGrid").kendoGrid({
          dataSource: gridDataSource,          
          height: 400,
          pageable: true,
          sortable: true,
          filterable: true,
          columns: [{
            field:"OrderID",
            title: "Order ID",
            width: 160
          }, {
            field: "OrderDate",
            title: "Order Date",
            width: 200,
            format: "{0:dd MMMM yyyy}"
          }, {
            field: "ShipCountry",
            title: "Ship Country"
          }, {
            field: "ShipCity",
            title: "Ship City"
          }]
        });

      });
     
    </script>
  </body>
</html>
```

## 6. Add Your License File

Using any Kendo UI for jQuery assets from the [Kendo UI CDN]({% slug kendoui_cdn_services_installation %}), [Kendo UI NPM]({% slug kendoui_npm_packages_kendoui_installation %}) or the downloaded Kendo UI trial versions requires you to add a Kendo UI for jQuery license file to your application. A missing license file triggers [a banner, a watermark, and causes a warning message]({% slug invalid-license %}) in the browser's console.

To generate your license file and add it to your application, follow the instructions in the [Setting Up the License File]({% slug using-license-code %}) article.

## Next Steps

* [Creating Your Own Custom Bundles]({% slug include_only_what_you_need_kendoui_scripts %})
* [The Component DOM Element Structure]({% slug widgetwrapperandelement_references_gettingstarted %})
* [Methods and Events]({% slug widget_methodsand_events_kendoui_installation %})
* [Number Formatting]({% slug numberformatting_kendoui_globalization %})
* [Date Formatting]({% slug dateformatting_kendoui_globalization %})
* [Templates Overview]({% slug overview_kendoui_templatescomponent %})


## See Also

* [Hosting Kendo UI for jQuery in Your Project]({% slug hosting_kendoui %})
* [Installing Kendo UI for jQuery with Bower]({% slug kendoui_bower_packages_kendoui_installation %})
* [Installing Kendo UI for jQuery by Using the CDN Services]({% slug kendoui_cdn_services_installation %})
* [Installing Kendo UI for jQuery with NPM]({% slug kendoui_npm_packages_kendoui_installation %})
* [Installing Kendo UI for jQuery with NuGet]({% slug kendoui_nuget_packages %})
* [Using Kendo UI for jQuery ECMAScript Modules]({% slug kendoui_ecmascript_overview %})
* [Creating Your Own Custom Components]({% slug createcustomkendouiwidgets_gettingstarted %})
* [jQuery Version Support]({% slug jquerysupport_kendoui %})
