---
title: Getting Started
page_title: jQuery ListView Documentation - Getting Started with the ListView
description: "Get started with the jQuery ListView by Kendo UI and learn how to create, initialize, and enable the widget."
slug: getting_started_kendoui_listview_widget
position: 1
---

# Getting Started with the ListView

This guide demonstrates how to get up and running with the Kendo UI for jQuery ListView.

After the completion of this guide, you will be able to achieve the following end result:

```dojo
      <div id="listView"></div>

      <script type="text/x-kendo-template" id="template">
        <div class="product">
            <img src="../content/web/foods/#= ProductID #.jpg" alt="Kendo UI for jQuery ListView #: ProductName #" />
            <h3>Product Name</h3>
            <p>#:ProductName#</p>
            <h3>Price</h3>
            <p>#:kendo.toString(UnitPrice, "c")#</p>
        </div>
      </script>

      <script>
        var products = [{
          ProductID : 1,
          ProductName : "Chai",
          UnitPrice : 18.0000
        }, {
          ProductID : 2,
          ProductName : "Chang",
          UnitPrice : 19.0000
        }, {
          ProductID : 3,
          ProductName : "Aniseed Syrup",
          UnitPrice : 10.0000
        }, {
          ProductID : 4,
          ProductName : "Chef Anton's Cajun Seasoning",
          UnitPrice : 22.0000
        }, {
          ProductID : 5,
          ProductName : "Chef Anton's Gumbo Mix",
          UnitPrice : 21.3500
        }, {
          ProductID : 6,
          ProductName : "Grandma's Boysenberry Spread",
          UnitPrice : 25.0000,
        }, {
          ProductID : 7,
          ProductName : "Uncle Bob's Organic Dried Pears",
          UnitPrice : 30.0000
        }, {
          ProductID : 8,
          ProductName : "Northwoods Cranberry Sauce",
          UnitPrice : 40.0000
        }, {
          ProductID : 9,
          ProductName : "Mishi Kobe Niku",
          UnitPrice : 97.0000
        }, {
          ProductID : 10,
          ProductName : "Ikura",
          UnitPrice : 31.0000
        }, {
          ProductID : 11,
          ProductName : "Queso Cabrales",
          UnitPrice : 21.0000
        }, {
          ProductID : 12,
          ProductName : "Queso Manchego La Pastora",
          UnitPrice : 38.0000
        }, {
          ProductID : 13,
          ProductName : "Konbu",
          UnitPrice : 6.0000
        }, {
          ProductID : 14,
          ProductName : "Tofu",
          UnitPrice : 23.2500
        }, {
          ProductID : 15,
          ProductName : "Genen Shouyu",
          UnitPrice : 15.5000
        }];

        $(function () {
          $("#listView").kendoListView({
            dataSource: {
              data: products,
              pageSize: 5
            },
            template: kendo.template($("#template").html()),
            pageable: true,
            scrollable: true,
            height: 400
          });
        });
      </script>
```

## 1. Create a div Element

First, create an empty `<div>` element that you will use to initialize the widget.

```html
<div id="listView"></div>
```

## 2. Initialize the ListView 

In this step, you will initialize the ListView from the `<div>` element.

```html
<div id="listView"></div>

<script>
    // Target the div element by using jQuery and then call the kendoListView() method.
    $("#listView").kendoListView({
        // Add some basic configurations such as height.
        height: 400
    });
</script>
```

## 3. Bind the ListView to Data

Once the basic initialization is completed, you can start adding additional configurations to the ListView. The first and most important configuration is the [`dataSource`]({% slug overview_kendoui_datasourcecomponent %}).

```html
      <div id="listView"></div>

      <script>
        var products = [{
          ProductID : 1,
          ProductName : "Chai",
          UnitPrice : 18.0000
        }, {
          ProductID : 2,
          ProductName : "Chang",
          UnitPrice : 19.0000
        }, {
          ProductID : 3,
          ProductName : "Aniseed Syrup",
          UnitPrice : 10.0000
        }, {
          ProductID : 4,
          ProductName : "Chef Anton's Cajun Seasoning",
          UnitPrice : 22.0000
        }, {
          ProductID : 5,
          ProductName : "Chef Anton's Gumbo Mix",
          UnitPrice : 21.3500
        }, {
          ProductID : 6,
          ProductName : "Grandma's Boysenberry Spread",
          UnitPrice : 25.0000,
        }, {
          ProductID : 7,
          ProductName : "Uncle Bob's Organic Dried Pears",
          UnitPrice : 30.0000
        }, {
          ProductID : 8,
          ProductName : "Northwoods Cranberry Sauce",
          UnitPrice : 40.0000
        }, {
          ProductID : 9,
          ProductName : "Mishi Kobe Niku",
          UnitPrice : 97.0000
        }, {
          ProductID : 10,
          ProductName : "Ikura",
          UnitPrice : 31.0000
        }, {
          ProductID : 11,
          ProductName : "Queso Cabrales",
          UnitPrice : 21.0000
        }, {
          ProductID : 12,
          ProductName : "Queso Manchego La Pastora",
          UnitPrice : 38.0000
        }, {
          ProductID : 13,
          ProductName : "Konbu",
          UnitPrice : 6.0000
        }, {
          ProductID : 14,
          ProductName : "Tofu",
          UnitPrice : 23.2500
        }, {
          ProductID : 15,
          ProductName : "Genen Shouyu",
          UnitPrice : 15.5000
        }];

        $(function () {
          $("#listView").kendoListView({
            dataSource: {
              data: products
            },
            height: 400
          });
        });
      </script>
```

## 4. Configure the ListView Template

The ListView allows you to specify the HTML structure for each item by using a [`template`]({% slug templates_kendoui_listview %}).

```html
      <div id="listView"></div>
      <!-- Define the HTML structure of the items in the template. -->
      <script type="text/x-kendo-template" id="template">
        <div class="product">
            <img src="../content/web/foods/#= ProductID #.jpg" alt="Kendo UI for jQuery ListView #: ProductName # " />
            <h3>Product Name</h3>
            <p>#:ProductName#</p>
            <h3>Price</h3>
            <p>#:kendo.toString(UnitPrice, "c")#</p>
        </div>
      </script>

      <script>
        $(function () {
          $("#listView").kendoListView({
            template: kendo.template($("#template").html()), // Provide a template to the ListView configuration.
            height: 400
          });
        });
      </script>
```

## 5. Configure Paging for the ListView

The ListView allows you to display a specific amount of items per page. This improves the performance when large datasets must be rendered. To enable the paging functionality, specify a [`pageSize`](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/configuration/pagesize) in the dataSource configuration and set the [`pageable`](https://docs.telerik.com/kendo-ui/api/javascript/ui/listview/configuration/pageable) property of the ListView to `true`.

```html
      <div id="listView"></div>

      <script>
        $(function () {
          $("#listView").kendoListView({
            dataSource: {
              data: products,
              pageSize: 5 // Specify a pageSize.
            },
            template: kendo.template($("#template").html()),
            pageable: true, // Set pageable to true.
            height: 400
          });
        });
      </script>
```

## 6. Configure Scrolling for the ListView

The ListView allows you to display a scrollbar inside the widget so end-users don't have to scroll the entire page in their browser. To enable the scrolling functionality, set the [`scrollable`](https://docs.telerik.com/kendo-ui/api/javascript/ui/listview/configuration/scrollable) property to `true`.

```html
      <div id="listView"></div>

      <script>
        $(function () {
          $("#listView").kendoListView({
            dataSource: {
              data: products,
              pageSize: 5
            },
            template: kendo.template($("#template").html()),
            pageable: true,
            scrollable: true, // Set scrollable to true.
            height: 400
          });
        });
      </script>
```

## Next Steps 

* [Referencing Existing Widget Instances]({% slug widget_methodsand_events_kendoui_installation %}) 
* [Demo Page for the ListView](https://demos.telerik.com/kendo-ui/listview/index)

## See Also 

* [JavaScript API Reference of the ListView](/api/javascript/ui/listview)
* [Knowledge Base Section](/knowledge-base)

<script>
  window.onload = function() {
    document.getElementsByClassName("btn-run")[0].click();
  }
</script>