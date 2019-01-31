---
title: Overview
page_title: Overview | Kendo UI ListView
description: "Learn how to initialize the Kendo UI ListView widget, customize its layout, and configure its behavior."
slug: overview_kendoui_listview_widget
position: 2
---

# ListView Overview

The [Kendo UI ListView widget](http://demos.telerik.com/kendo-ui/listview/index) enables you to specify a custom type of layout for the items that are displayed in the control.

It can be bound to local JSON data or to remote data by using the Kendo UI DataSource component.

## Getting Started

### Initialize the ListView

The ListView can be created out of an existing `<span>`, `<div>`, or `<ul>` HTML element.

      <ul id="listView"></ul>

To initialize the widget, use the code from the following example.

###### Example

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

## Configuration

### Selection, Navigation, and Editing

The ListView supports selection, navigation, and editing which, by default, are disabled. You can configure any of these functionalities by using Boolean options.

###### Example

      $(document).ready(function() {
          $("#listView").kendoListView({
             selectable: true,
             navigatable: true,
             editable: true,
             template: "<li>${FirstName}</li>",
             editTemplate: '<li><input type="text" data-bind="value:FirstName" name="FirstName" required="required"/></li>'
          });
      });

### Paging

To enable paging, instantiate a separate pager control and bind it to the same DataSource.

###### Example

    <div id="listview"></div>
    <div id="pager"></div>
    <script>
        var dataSource = new kendo.data.DataSource({
            data: [
                { id: 1, item: "Item 1" },
                { id: 2, item: "Item 2" },
                { id: 3, item: "Item 3" },
                { id: 4, item: "Item 4" },
                { id: 5, item: "Item 5" },
                { id: 6, item: "Item 6" }
            ],
            pageSize: 2
        });

        $("#listview").kendoListView({
            dataSource: dataSource,
            template: "<div>#: item #</div>"
        });

        $("#pager").kendoPager({
            dataSource: dataSource
        });
    </script>

## See Also

* [Walkthrough]({% slug basic_usage_kendoui_listview_widget %})
* [How to Reorder Using Drag-and-Drop and Kendo UI Touch]({% slug howto_reorder_using_draganddrop_kendouitouch_listview %})
* [How to Persist Row Selection during Data Operations]({% slug howto_persists_row_selection_listview %})
* [How to Filter Using Slider Selection]({% slug howto_filter_using_slider_selection_listview %})
* [Overview of the ASP.NET MVC HtmlHelper Extension](/aspnet-mvc/helpers/listview/overview)
* [Overview of the JSP Tag]({% slug overview_listview_uiforjsp %})
* [Overview of the PHP Class](/php/widgets/listview/overview)
* [JavaScript API Reference](/api/javascript/ui/listview)
