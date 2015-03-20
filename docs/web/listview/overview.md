---
title: Overview
page_title: Kendo UI ListView Widget Documentation
description: Specify custom type of layout, first steps, configuration and behavior of Kendo UI ListView widget.
position: 1
---

# ListView Overview

The ListView is designed to give your the freedom to specify custom type of layout
for the items displayed in the control. It can be bound to local JSON data or to
remote data using the Kendo DataSource component.


## Getting Started

### Creating a **ListView** from existing HTML element

      <ul id="listView"></ul>

The ListView can be initialized from span, div or ul elements.

### Initialize the Kendo ListView

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

## Configuring ListView Behavior

Kendo ListView supports selection, navigation, editing. Configuring any of
these ListView behaviors is done using simple boolean configuration options. For
example, the follow snippet shows how to enable all of these behaviors.

### Enabling ListView selection, navigation and editing

      $(document).ready(function() {
          $("#listView").kendoListView({
             selectable: true,
             navigatable: true,
             editable: true,
             template: "<li>${FirstName}</li>",
             editTemplate: '<li><input type="text" data-bind="value:FirstName" name="FirstName" required="required"/></li>'
          });
      });

By default selection, navigation and editing are **disabled**.

To enable paging, the developer should initiaze separate pager control and bind it to the same DataSource.

### Enabling ListView paging

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

