---
title: Getting Started
page_title: jQuery Pager Documentation - Getting Started with the Pager
description: "Get started with the jQuery Pager by Kendo UI and learn how to create, initialize, and enable the widget."
slug: getting_started_kendoui_pager_widget
position: 1
---

# Getting Started with the Pager

This guide demonstrates how to get up and running with the Kendo UI for jQuery Pager.

After the completion of this guide, you will be able to achieve the following end result:

```dojo
    <div id="pager"></div>

    <script>
        var dataSource = new kendo.data.DataSource({
            data: [
            { productName: "Tea", category: "Beverages" },
            { productName: "Coffee", category: "Beverages" },
            { productName: "Ham", category: "Food" },
            { productName: "Bread", category: "Food" }
            ],
            pageSize: 2
        });

        $("#pager").kendoPager({
            dataSource: dataSource,
            pageSizes: [2, 3, 4, "all"]
        });

        dataSource.read();
    </script>     
```

## 1. Create an Empty Div Element

First, create a `<div>` element on the page to initialize the Pager. It will also serve as the main container of the Pager component.

```html
<div id="pager"></div>
```

## 2. Initialize the Pager 

In this step, you will initialize the Pager from the `<div>` element. All settings of the Pager will be provided in the initialization script statement and you have to describe its layout and configuration in JavaScript.

```html
<div id="pager"></div>

<script>
    // Target the div element by using jQuery and then call the kendoPager() method.
    $("#pager").kendoPager();
</script>
```

## 3. Bind the Pager to a DataSource

The below example shows how you can bind the Pager to a DataSource. 

```html
<div id="pager"></div>

<script>
    var dataSource = new kendo.data.DataSource({
        data: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" },
        { productName: "Ham", category: "Food" },
        { productName: "Bread", category: "Food" }
        ],
        pageSize: 2
    });

    $("#pager").kendoPager({
        dataSource: dataSource,      
    });

    dataSource.read();
</script>
```

## 4. Set the Page Sizes of the Pager

The [`PageSizes`](/api/javascript/ui/pager/configuration/pagesizes) configuration allows you to change the number of displayed items. As a result, the Pager renders a dropdown with the options you have configured. The example below shows one possible way to set the `pageSizes`. It uses a template to visualize the items and demonstrate the Page Size feature. 

```dojo
    <div class="contests-wrapper">
    </div>
    <div id="pager"></div>

    <script id="template" type="text/x-kendo-template">
        <section class="contest-card-wrapper">
            <h3 title="#= Title #">#= Title #</h3>
            <img class="contest-image" src='https://demos.telerik.com/kendo-ui/content/web/pager/images/#=Id#.jpg' alt="Kendo UI for jQuery Pager #= Title #" />
            
        </section>
    </script>

    <script>
      $(document).ready(function () {
        var template = kendo.template($("#template").html());

        var dataSource = new kendo.data.DataSource({
          transport: {
            read: {
              url: "https://demos.telerik.com/kendo-ui/content/web/pager/photo-contests.json",
              dataType: "json"
            }
          },
          pageSize: 4,
          change: function () {
            $(".contests-wrapper").html(kendo.render(template, this.view()));
          }
        });

        $("#pager").kendoPager({
          dataSource: dataSource,
          pageSizes: [2, 3, 4, "all"],
        });

        dataSource.read();
      });
    </script>
```

## Next Steps 

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %}) 
* [Demo Page for the Pager](https://demos.telerik.com/kendo-ui/pager/index)

## See Also 

* [JavaScript API Reference of the Pager](/api/javascript/ui/pager)
* [Knowledge Base Section](/knowledge-base)

<script>
  window.onload = function() {
    document.getElementsByClassName("btn-run")[0].click();
  }
</script>