---
title: Overview
page_title: jQuery ListView Documentation | ListView Overview
description: "Get started with the jQuery ListView by Kendo UI and initialize the widget."
slug: overview_kendoui_listview_widget
position: 1
---

# ListView Overview

The Kendo UI ListView enables you to display a custom layout of data-bound items.

The ListView is ideally suited for displaying a list of items in a consistent manner. You can see commonplace examples of its use in the design structures of the Internet, search engine results, tweets from Twitter, Facebook updates, inbox items in Gmail, card lists in Trello, and so on.

The ListView can be bound to local JSON data or to remote data by using the Kendo UI DataSource component. It enables you to control the display of data. It does not provide a default rendering of data-bound items. Instead, it relies on templates to define the way a list of items is displayed, including alternating items and items that are in the process of editing.

* [Demo page for the ListView](https://demos.telerik.com/kendo-ui/listview/index)

## Basic Configuration

To create the ListView, use an existing `<span>`, `<div>`, or `<ul>` HTML element.

      <ul id="listView"></ul>

The following example demonstrates how to initialize the ListView.

      $(document).ready(function() {
          $("#listView").kendoListView({
              template: "<li>${FirstName} ${LastName}</li>",
              dataSource: {
                  data: [
                      {
                          FirstName: "Joe",
                          LastName: "Smith"
                      },
                      {
                          FirstName: "Jane",
                          LastName: "Smith"
                  }]
              }
          });
      });

The following example demonstrates how the ListView works by defining a target HTML element such as a `<list>` or a `<div>`. The ListView item template needs to have only one root element which is the `div.product` element in the following example.

    <div id="listView"></div>

    <script type="text/x-kendo-tmpl" id="template">
        <div class="product">
            <img src="https://demos.telerik.com/kendo-ui/content/web/foods/#= ProductID #.jpg" alt="#: ProductName # image" />
            <h3>#:ProductName#</h3>
            <p>#:kendo.toString(UnitPrice, "c")#</p>
        </div>
    </script>

## Functionality and Features

* [Items]({% slug items_kendoui_listview %})
* [Editing]({% slug editing_kendoui_listview %})
* [Selection]({% slug selection_kendoui_listview %})
* [Paging]({% slug paging_kendoui_listview %})
* [Scrolling]({% slug scrolling_kendoui_listview_widget %})
* [Templates]({% slug templates_kendoui_listview %})

## See Also

* [Basic Usage of the ListView (Demo)](https://demos.telerik.com/kendo-ui/listview/index)
* [JavaScript API Reference of the ListView](/api/javascript/ui/listview)
