---
title: Getting Started
page_title: jQuery Gantt Documentation - Getting Started with the Gantt
description: "Get started with the jQuery Gantt by Kendo UI and learn how to create and initialize the component."
slug: getting_started_kendoui_gantt_widget
position: 1
---

# Getting Started with the Gantt

This guide demonstrates how to get up and running with the Kendo UI for jQuery Gantt.

After the completion of this guide, you will be able to achieve the following end result:

```dojo
    <div id="gantt"></div>

    <script>
      let myDataArray = [
        {
            id: 1,
            orderId: 0,
            parentId: null,
            title: "Task1",
            start: new Date("2023/9/13 9:00"),
            end: new Date("2023/9/13 11:00")
        },
        {
            id: 2,
            orderId: 1,
            parentId: null,
            title: "Task2",
            start: new Date("2023/9/13 12:00"),
            end: new Date("2023/9/13 14:00")
        },
        {
            id: 3,
            orderId: 2,
            parentId: null,
            title: "Task3",
            start: new Date("2023/9/13 13:00"),
            end: new Date("2023/9/13 15:00")
        }
      ];

      // Target the div element by using jQuery and then call the kendoGantt() method.
      $("#gantt").kendoGantt({
        height: "400px",
        toolbar: [
            { name: "append" },
            { name: "pdf" }
        ],
        // Enable the filtering functionality.
        filterable: true,
        // Enable the editing functionality (incell by default).
        editable: true,
        dataSource: {
          data: myDataArray,
          
        }
      });
    </script>
```

## 1. Create an Empty Div Element

First, create an empty `<div>` element on the page that will serve as the main container of the Gantt.

```html
<div id="gantt"></div>
```

## 2. Initialize the Gantt

In this step, you will initialize the Gantt from the empty `<div>` element. All settings of the Gantt will be provided in the initialization script statement and you have to describe its layout and configuration in JavaScript.

```html
<div id="gantt"></div>

<script>
    // Target the div element by using jQuery and then call the kendoGantt() method.
    $("#gantt").kendoGantt({
        // Add some basic configurations such as width and height.
        width: "700px",
        height: "400px"
    });
</script>
```

## 3. Bind the Gantt to Data

Once the basic initialization is completed, you can start adding additional configurations to the Gantt. The first and most important configuration is the [`dataSource`]({% slug overview_kendoui_datasourcecomponent %}).

```html
<div id="gantt"></div>

<script>
  let myDataArray = [
        {
            id: 1,
            orderId: 0,
            parentId: null,
            title: "Task1",
            start: new Date("2014/6/17 9:00"),
            end: new Date("2014/6/17 11:00")
        },
        {
            id: 2,
            orderId: 1,
            parentId: null,
            title: "Task2",
            start: new Date("2014/6/17 12:00"),
            end: new Date("2014/6/17 14:00")
        },
        {
            id: 3,
            orderId: 2,
            parentId: null,
            title: "Task3",
            start: new Date("2014/6/17 13:00"),
            end: new Date("2014/6/17 15:00")
        }
      ];

  // Target the div element by using jQuery and then call the kendoGantt() method.
  $("#gantt").kendoGantt({
    width: "700px",
    height: "400px",
    dataSource: {
      data: myDataArray,
    }
  });
</script>
```

## 4. Add Editing and Filtering

Among other functionalities, the Gantt supports editing and filtering. The editing configuration allows users to edit the Gantt items. You can do that either through the popup by clicking the task in the timeline view or editing an individual cell in the TreeList. The filtering configuration allows users to filter the data inside the Gantt.

```html
<div id="gantt"></div>

<script>
   let myDataArray = [
        {
            id: 1,
            orderId: 0,
            parentId: null,
            title: "Task1",
            start: new Date("2014/6/17 9:00"),
            end: new Date("2014/6/17 11:00")
        },
        {
            id: 2,
            orderId: 1,
            parentId: null,
            title: "Task2",
            start: new Date("2014/6/17 12:00"),
            end: new Date("2014/6/17 14:00")
        },
        {
            id: 3,
            orderId: 2,
            parentId: null,
            title: "Task3",
            start: new Date("2014/6/17 13:00"),
            end: new Date("2014/6/17 15:00")
        }
      ];

  $("#gantt").kendoGantt({
    width: "700px",
    height: "400px" 
    toolbar: [
        { name: "append" },
        { name: "pdf" }
    ],
    // Enable the filtering functionality.
    filterable: true,
    // Enable the editing functionality (incell by default).
    editable: true, 
    dataSource: {
      data: myDataArray,
    }
  });
</script>
```

## Next Steps

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %})
* [Demo Page for the Kendo UI for jQuery Gantt](https://demos.telerik.com/kendo-ui/gantt/index)

## See Also

* [JavaScript API Reference of the jQuery Gantt](/api/javascript/ui/gantt)
* [Knowledge Base Section](/knowledge-base)

<script>
  window.onload = function() {
    document.getElementsByClassName("btn-run")[0].click();
  }
</script>
