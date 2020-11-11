---
title: First Steps
page_title: First Steps with Your Kendo UI for jQuery Project Guide | Getting Started | Kendo UI for jQuery
description: "A guide on getting started with Kendo UI for jQuery, how to add the necessary CSS and JavaScript files and implement the DatePicker widget."
previous_url: /install/onsite, /getting-started, /intro/getting-started, /using-kendo-with, /getting-started/using-kendo-with, /bootstrapper, /intro/installation/getting-started
slug: getting_started_installation_kendoui
position: 0
---

# First Steps

Welcome to the First Steps guide on getting started with Kendo UI for jQuery!

This guide demonstrates how to start working with the suite and implements a use case scenario with the Kendo UI [Grid]({% slug overview_kendoui_grid_widget %}), [Chart]({% slug overview_kendoui_charts_widget %}), and [Button]({% slug overview_kendoui_button_widget %}) widgets.

The process draws on the following milestones:

 1. [Download the controls](https://www.telerik.com/download-login-v2-kendoui)
 1. [Required JavaScript and CSS files](#1-adding-the-required-javascript-and-css-files)
 1. [Data binding](#2-binding-to-data)
 1. [Widget initialization](#3-Initializing-the-widgets)
 1. [Grid configuration](#4-configuring-the-grid)
 1. [Date formatting](#5-formatting-the-dates)
 1. [Templates](#6-using-templates)
 1. [Globalization](#7-adding-globalization)
 1. [Chart implementation](#8-including-charts)
 1. [Events](#9-handling-the-events)

The included explanations contain links to some fundamental or relevant articles in the Kendo UI documentation. While you will not need those immediately, do check them later for in-depth learning of Kendo UI.

Some of the described steps provide links to complete runnable examples so that you can compare and verify your implementation.

## 1. Adding the Required JavaScript and CSS Files

First, you will add the Kendo UI assets to your HTML document. In this sample case, you will use the [Kendo UI CDN service]({% slug kendoui_cdn_services_installation %}). In other scenarios, you may want to [host the files locally]({% slug hosting_kendoui %}).

Always register the common (base) [Kendo UI stylesheet]({% slug themesandappearnce_kendoui_desktopwidgets %}) before the theme stylesheet. Similarly, always register jQuery before the Kendo UI script&mdash;otherwise, you will get [JavaScript errors]({% slug troubleshooting_common_issues_kendoui %})
when you try to initialize a Kendo UI widget or use the Kendo UI API.

To make sure all scripts are loaded, make a simple API call to render the [Kendo UI version](/api/javascript/kendo/fields/version).

> The `$(function() { });` code block is a [jQuery `document.ready`](https://learn.jquery.com/using-jquery-core/document-ready/) handler. Except for the template function in [6. Using Templates](#6-using-templates), all JavaScript code from this guide has to go inside this closure.

	<!DOCTYPE html>
	<html>
	<head>
		<meta charset="utf-8" />
		<title>Getting Started with Kendo UI for jQuery</title>

		<link href="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/styles/kendo.common.min.css" rel="stylesheet" />
		<link href="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/styles/kendo.default.min.css" rel="stylesheet" />
		<script src="https://code.jquery.com/jquery-1.12.3.min.js"></script>
		<script src="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/js/kendo.all.min.js"></script>
	</head>
	<body>

		<p>Hello <a href="https://docs.telerik.com/kendo-ui/intro/first-steps">Kendo UI for jQuery</a>!
			This is version <strong id="kendoVersion"></strong>.</p>

		<script>

			$(function() {

				$("#kendoVersion").text(kendo.version);

			});

		</script>

	</body>
	</html>

## 2. Binding to Data

You will now create a [Kendo UI DataSource]({% slug overview_kendoui_datasourcecomponent %}) with some dummy orders which will later be used used to bind a Grid.

A hard-coded array of data items is the simplest way to create a datasource. In real-life scenarios, you may want to fetch [remote data]({% slug basicusage_kendoui_datasourcecomponent %}) or configure [editing (CRUD operations)]({% slug cruddataoperations_kendoui_datasourcecomponent %}).

To ensure the correct implementation of the data operations, you need to configure the [data field types](/api/javascript/data/datasource/configuration/schema#schemamodel). In addition, you will apply a [page size](/api/javascript/data/datasource/configuration/pagesize) and a default [sorting](/api/javascript/data/datasource/configuration/sort) by `OrderDate`.

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

## 3. Initializing the Widgets

Now you are ready to [initialize a Kendo UI Grid]({% slug overview_kendoui_grid_widget %}#initializing-the-grid). First, add a new `<div>` element to the page.

	<div id="ordersGrid"></div>

The following snippet contains the JavaScript code which will [create the widget instance]({% slug initialize_widgets_using_jquery_plugins_installation %}) and use the defined datasource. Place the code after the `gridDataSource` definition. For a runnable version of the page after the current step, refer to [this demo](https://dojo.telerik.com/URepufIY).

	$("#ordersGrid").kendoGrid({
	  dataSource: gridDataSource
	});

## 4. Configuring the Grid

At this point, you have a populated the Kendo UI Grid. However, you need to improve and polish its performance such as:

* Define user-friendly column titles and [widths]({% slug column_widths_kendoui_grid_widget %})
* Enable data operations&mdash;[paging]({% slug paging_kendoui_grid_widget %}), [sorting]({% slug sorting_kendoui_grid_widget %}), and [filtering]({% slug filtering_kendoui_grid_widget %})
* Define a height and enable [scrolling]({% slug scrolling_kendoui_grid_widget %}) so that the Grid cannot expand indefinitely

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

## 5. Formatting the Dates

Kendo UI widgets can [display dates in a variety of ways]({% slug dateformatting_kendoui_globalization %}). For example, you can [format](/api/javascript/ui/grid/configuration/columns.format) the **Order Date** column.

	//field: "OrderDate",
	//title: "Order Date",
	//width: 200,
	format: "{0:dd MMMM yyyy}"

## 6. Using Templates

It is common to customize the way information appears in a data-bound component. For example, to apply different colors to large and small shipments in the **Freight** column, use a [Kendo UI template]({% slug overview_kendoui_templatescomponent %}) which will call a JavaScript function and pass the `Freight` value as an argument.

You need to define a `getFreightColor` function [in the global JavaScript scope]({% slug overview_kendoui_templatescomponent %}#handling-external-templates-and-expressions)&mdash;that is, outside the `document.ready` closure. This approach is necessary because the Kendo UI templates are evaluated in the global scope and all functions that they call must be defined in the global scope as well.

The function will return a color style value which depends on the `freight` value.

	// $(function() {
	// ...
	// });

	function getFreightColor(freight) {
		if (freight > 60) {
		  return "#090";
		} else if (freight < 30) {
		  return "#f00";
		} else {
		  return "#00c";
		}
	}

Then, call the function in the `Freight` [column template](/api/javascript/ui/grid/configuration/columns.template). If `getFreightColor` is not defined in the global scope, you will get a `getFreightColor is not defined` [JavaScript error]({% slug troubleshooting_common_issues_kendoui %}) in the [browser console]({% slug troubleshooting_javascript_errors_kendoui %}). For a runnable version of the page after the current step, refer to [this demo](https://dojo.telerik.com/icexeFiK).

	//field: "Freight",
	//width: 160,
	template: "<span style='color:#= getFreightColor(Freight) #'>#= Freight #</span>"

## 7. Adding Globalization

[Globalization]({% slug overview_kendoui_globalization %}) is a standard requirement for many software applications. Kendo UI enables you to override the default English messages of the widgets by including an additional JavaScript file. For example, if you want the Grid to render French messages, register the following [localization]({% slug overview_localization_kendoui %}) file after `kendo.all.min.js`.

    <script src="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/js/messages/kendo.messages.fr-FR.min.js"></script>

Instead of `fr-FR`, you can experiment with a few other localizations which are available out-of-the-box and hosted on the Kendo UI CDN&mdash;for example, `es-ES` or `de-DE`.

Additionally, culture-aware widgets, such as the Calendar, DatePicker, and NumericTextBox, can change the way they display dates and numbers. For more information, refer to the article on [internationalization]({% slug overview_kendoui_intl %}).

## 8. Including Charts

You have already rendered a functional Grid in the project and can now display its data in a more visual and user-friendly format by including a Kendo UI Chart.

Above the Grid, add a new `<div>` element for the Chart.

	<div id="ordersChart"></div>

Place the Chart declaration before the declaration of the Grid.

The following Chart configuration includes:

* No initial data. To spare a remote request, the Grid data will be reused by the Chart after it is loaded.
* Default alphabetic [sorting](/api/javascript/data/datasource/configuration/sort) by `ShipCountry`.
* A [Chart title](/api/javascript/dataviz/ui/chart/configuration/title) with some font styles.
* The data will be [displayed in bars (columns)](/api/javascript/dataviz/ui/chart/configuration/seriesdefaults.type).
* Definitions about which is the [`category` field](/api/javascript/dataviz/ui/chart/configuration/series.categoryfield) and which is the [`value` field](/api/javascript/dataviz/ui/chart/configuration/series.field). Normally, the category axis is horizontal and the value axis is vertical.
* [Rotation](/api/javascript/dataviz/ui/chart/configuration/categoryaxis.labels#categoryaxislabelsrotation) of the country labels so that they can fit more easily.
* [A cursor style on label hover](https://www.telerik.com/forums/change-cursor-to-pointer-when-hovering-over-a-label-in-axislabel#jY5GIVMDfUGEcyuNGe2YXg) is applied with a [`visual`](/api/javascript/dataviz/ui/chart/configuration/categoryaxis.labels#categoryaxislabelsvisual) function.
* Number [formatting](/api/javascript/dataviz/ui/chart/configuration/valueaxis.labels#valueaxislabelsformat) for the `Freight` values.
* An [axis title](/api/javascript/dataviz/ui/chart/configuration/valueaxis.title#valueaxis.title) for the vertical axis.
* [Tooltips](/api/javascript/dataviz/ui/chart/configuration/tooltip) on series hover.

```
	$("#ordersChart").kendoChart({
	  dataSource: {
		data: [],
		sort: {
		  field: "ShipCountry",
		  dir: "asc"
		}
	  },
	  title: {
		text: "Orders by Country",
		font: "20px sans-serif",
		color: "#ff6800"
	  },
	  seriesDefaults: {
		type: "column"
	  },
	  series: [{
		field: "Freight",
		categoryField: "ShipCountry"
	  }],
	  categoryAxis: {
		labels: {
		  rotation: -45,
		  visual: function(e) {
			var visual = e.createVisual();
			visual.options.cursor = "default";
			return visual;
		  }              
		}
	  },
	  valueAxis: {
		title: {
		  text: "metric tons"
		},
		labels: {
		  format: "{0:n0}"
		}
	  },
	  tooltip: {
		visible: true,
		template: "#= category #: #= value # t"
	  }
	});
```

## 9. Handling the Events

* [Using the `dataBound` event of the Grid](#using-the-grid-databound)
* [Using the `seriesClick` and `axisLabelClick` events of the Chart](#using-the-chart-seriesclick-and-axislabelclick)
* [Using the `click` event of the Button](#using-the-button-click)

### Using the Grid dataBound

At this point, the Chart is rendered empty. To get the Grid data and set it to the Chart, you will use the [`dataBound`](/api/javascript/ui/grid/events/databound) event of the Grid.

In the next example, note the following:

- Kendo UI events expose some common [arguments]({% slug widget_methodsand_events_kendoui_installation %}#using-event-handler-arguments),
including the widget instance that fired the event (`e.sender`).
- The `dataBound` event handler obtains a [reference to the Chart instance]({% slug widget_methodsand_events_kendoui_installation %}) so that the Chart must already exist. That is why you placed the Chart declaration before the declaration of the Grid.
- The Grid and the Chart can use a [shared Kendo UI DataSource]({% slug overview_kendoui_datasourcecomponent %}#shared-datasource) instance. Avoid using this approach so that the data operations in the Grid do not influence the appearance of the Chart.
- The `dataBound` event of the Grid will be fired on each data operation (sorting, filtering, paging, and so on). However, you need to bind the Chart just once. That is why you will [unsubscribe]({% slug widget_methodsand_events_kendoui_installation %}#unbinding-from-events) from the `dataBound` event at the end of the handler.

        //$("#ordersGrid").kendoGrid({
          //dataSource: gridDataSource,

          dataBound: function(e) {
		    var grid = e.sender,
				chart = $("#ordersChart").data("kendoChart");

			chart.dataSource.data(grid.dataSource.data());
            grid.unbind("dataBound");
          },

		  //height: 400,
		  // ...
		//});

### Using the Chart seriesClick and axisLabelClick

Now, enhance the project with some widget interaction. For example, if you want to click on a country in the Chart and filter the Grid by `ShipCountry`, you can click a couple of applicable places&mdash;the [bars (series)](/api/javascript/dataviz/ui/chart/events/seriesclick) and
the [axis labels](/api/javascript/dataviz/ui/chart/events/axislabelclick). Therefore, you will use two separate click handlers.

	//$("#ordersChart").kendoChart({
	  // ...
	  //series: [{
	  //  field: "Freight",
	  //  categoryField: "ShipCountry"
	  //}],

	  seriesClick: function(e) {
		filterGrid(e.category);
	  },
	  axisLabelClick: function(e) {
		filterGrid(e.value);
	  },

	  //categoryAxis: {
	  // ...
	//});

To [filter the Grid by using its dataSource API](/api/javascript/data/datasource/methods/filter), the handlers will call the same function.

	//$("#ordersChart").kendoChart({
	  // ...
	//});

	function filterGrid(country) {
		$("#ordersGrid").data("kendoGrid").dataSource.filter({
			field: "ShipCountry",
			operator: "eq",
			value: country
		});
	}

### Using the Button click

Finally, you can add a button that will programmatically reset the Grid filter state. This functionality can also be achieved through the **Clear** button inside the filtering menu of the **Ship Country** column.

Add the following button markup just above the Grid `<div>`.

    <p>
      <button id="clearGridFilter">Show all countries</button>
    </p>

Initialize the [Button widget]({% slug overview_kendoui_button_widget %}) and configure its [`click`](/api/javascript/ui/button/events/click) handler.

	$("#clearGridFilter").kendoButton({
	  click: function(e) {
		$("#ordersGrid").data("kendoGrid").dataSource.filter({});
	  }
	});

This is it! Now you are ready to dive more deeply into Kendo UI for jQuery and implement modern and slick web applications!

The following implementation demonstrates the final runnable version of the page.

```dojo
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Getting Started with Kendo UI for jQuery</title>

    <link href="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/styles/kendo.common.min.css" rel="stylesheet" />
    <link href="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/styles/kendo.default.min.css" rel="stylesheet" />
    <script src="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/js/jquery.min.js"></script>
    <script src="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/js/kendo.all.min.js"></script>
    <!--<script src="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/js/messages/kendo.messages.fr-FR.min.js"></script>-->
  </head>
  <body>

    <p>Hello <a href="https://docs.telerik.com/kendo-ui/intro/first-steps">Kendo UI for jQuery</a>!
      This is version <strong id="kendoVersion"></strong>.</p>

    <div id="ordersChart"></div>

    <p>
      <button id="clearGridFilter">Show all countries</button>
    </p>

    <div id="ordersGrid"></div>

    <script>

      $(function() {

        $("#kendoVersion").text(kendo.version);

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

        $("#ordersChart").kendoChart({
          dataSource: {
            data: [],
            sort: {
              field: "ShipCountry",
              dir: "asc"
            }
          },
          title: {
            text: "Orders by Country",
            font: "20px sans-serif",
            color: "#ff6800"
          },
          seriesDefaults: {
            type: "column"
          },
          series: [{
            field: "Freight",
            categoryField: "ShipCountry"
          }],
          seriesClick: function(e) {
            filterGrid(e.category);
          },
          axisLabelClick: function(e) {
            filterGrid(e.value);
          },
          categoryAxis: {
            labels: {
              rotation: -45,
              visual: function(e) {
                var visual = e.createVisual();
                visual.options.cursor = "default";
                return visual;
              }              
            }
          },
          valueAxis: {
            title: {
              text: "metric tons"
            },
            labels: {
              format: "{0:n0}"
            }
          },
          tooltip: {
            visible: true,
            template: "#= category #: #= value # t"
          }
        });

        function filterGrid(country) {
          $("#ordersGrid").data("kendoGrid").dataSource.filter({
            field: "ShipCountry",
            operator: "eq",
            value: country
          });
        }

        $("#clearGridFilter").kendoButton({
          click: function(e) {
            $("#ordersGrid").data("kendoGrid").dataSource.filter({});
          }
        });

        $("#ordersGrid").kendoGrid({
          dataSource: gridDataSource,
          dataBound: function(e) {
            var grid = e.sender,
                chart = $("#ordersChart").data("kendoChart");

            chart.dataSource.data(grid.dataSource.data());
            grid.unbind("dataBound");
          },
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
            template: "<span style='color:#= getFreightColor(Freight) #'>#= Freight #</span>"
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

      function getFreightColor(freight) {
        if (freight > 60) {
          return "#090";
        } else if (freight < 30) {
          return "#f00";
        } else {
          return "#00c";
        }
      }

    </script>

  </body>
</html>
```

## Next Steps

* [Ways to download and install Kendo UI for jQuery]({% slug overviewdownload_kendoui %})
* [Create your own custom bundles]({% slug include_only_what_you_need_kendoui_installation %})
* [Learn about the widget DOM element structure]({% slug widgetwrapperandelement_references_gettingstarted %})
* [Create your own custom widgets]({% slug createcustomkendouiwidgets_gettingstarted %})
* [Initialize widgets with MVVM]({% slug mvvm_initialization_kendoui %})
* [Check out the jQuery version support]({% slug jquerysupport_kendoui %})
* [Explore the widget script dependencies]({% slug script_filesfor_barcodes_widgets %})

## See Also

* [Hosting Kendo UI in Your Project]({% slug hosting_kendoui %})
* [Installing Kendo UI with Bower]({% slug kendoui_bower_packages_kendoui_installation %})
* [Installing Kendo UI by Using the CDN Services]({% slug kendoui_cdn_services_installation %})
* [Installing Kendo UI with NPM]({% slug kendoui_npm_packages_kendoui_installation %})
* [Installing Kendo UI with NuGet]({% slug kendoui_nuget_packages %})
