---
title: Customize Delete Confirmation Window in Gantt
description: Learn how to customize a delete confirmation dialog in the Kendo UI Gantt for jQuery
type: how-to
page_title: Customize Delete Confirmation Window in Gantt - Kendo UI Gantt for jQuery
slug: gantt-customize-confirmation-window
tags: gantt, custom, delete, window, dialog
ticketid: 1528478
res_type: kb
component: gantt
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Gantt for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I customize the delete confirmation dialog in the Kendo UI Gantt for jQuery?

## Solution

The following example demonstrates how to customize the default Delete confirmation dialog in Gantt component.

To achieve this behavior:

1. Add a Kendo UI Window component and create its template.
1. Subscribe to the [`remove`](/api/javascript/javascript/ui/gantt/events/remove) event and prevent the default behavior.
1. Add [`Kendo UI Template`]({% slug overview_kendoui_templatescomponent %}) and handle the button configurations to remove the task/close the window. 
1. The Kendo UI Gantt's [`editable.confirmation'](/api/javascript/javascript/ui/gantt/configuration/editable.confirmation) should be set to `false` to prevent the default confirm window from showing.

```dojo
	<style>
        span.k-icon.k-i-warning
        {
          background-color: khaki;
          color: white;
          font-size: 32px;
          margin-right: 5px;
        }
  
        div.deleteMessage
        {
          margin-bottom: 80px  
        }
  
        button#cancelButton, button#deleteButton
        {
          float: right;  
          margin-right: 15px;
        }
    </style>

    <div id="example">
      <div id="gantt"></div>
      <div id="window"></div>

      <script type="text/x-kendo-template" id="windowTemplate">
        <div class="deleteMessage"><span class="k-icon k-i-warning"></span>Are you sure you want to delete this task?</div>
        <hr />
        <button class="k-button k-primary" id="deleteButton">Delete</button>
        <button class="k-button" id="cancelButton"> Cancel</button>

      </script>

      <script>
        $(document).ready(function () {
          var windowTemplate = kendo.template($("#windowTemplate").html());
          var serviceRoot = "https://demos.telerik.com/kendo-ui/service";
          var tasksDataSource = new kendo.data.GanttDataSource({
            transport: {
              read: {
                url: serviceRoot + "/GanttTasks",
                dataType: "jsonp"
              },
              update: {
                url: serviceRoot + "/GanttTasks/Update",
                dataType: "jsonp",
                timeout: 5000
              },
              destroy: {
                url: serviceRoot + "/GanttTasks/Destroy",
                dataType: "jsonp",
                timeout: 5000
              },
              create: {
                url: serviceRoot + "/GanttTasks/Create",
                dataType: "jsonp",
                timeout: 5000
              },
              parameterMap: function (options, operation) {
                if (operation !== "read") {
                  return { models: kendo.stringify(options.models || [options]) };
                }
              }
            },
            schema: {
              model: {
                id: "id",
                fields: {
                  id: { from: "ID", type: "number" },
                  orderId: { from: "OrderID", type: "number", validation: { required: true } },
                  parentId: { from: "ParentID", type: "number", defaultValue: null, nullable: true, validation: { required: true } },
                  start: { from: "Start", type: "date" },
                  end: { from: "End", type: "date" },
                  title: { from: "Title", defaultValue: "", type: "string" },
                  percentComplete: { from: "PercentComplete", type: "number" },
                  summary: { from: "Summary", type: "boolean" },
                  expanded: { from: "Expanded", type: "boolean", defaultValue: true }
                }
              }
            },
            error: function (ev) {
              ev.sender.cancelChanges();
              kendo.alert("Task was not Created, Updated or Destroyed properly!</br></br>" +
                          "If you are using this service for local demo or in dojo consider <a href='https://github.com/telerik/kendo-ui-demos-service/tree/master/demos-and-odata-v3'>downloading and running the service locally</a>.</br>" +
                          "And make sure to set the <a href='https://github.com/telerik/kendo-ui-demos-service/blob/master/demos-and-odata-v3/KendoCRUDService/Models/Gantt/GanttTaskRepository.cs#L12'>UpdateDatabase</a> flag to true.");
            }
          });

          var dependenciesDataSource = new kendo.data.GanttDependencyDataSource({
            transport: {
              read: {
                url: serviceRoot + "/GanttDependencies",
                dataType: "jsonp"
              },
              update: {
                url: serviceRoot + "/GanttDependencies/Update",
                dataType: "jsonp"
              },
              destroy: {
                url: serviceRoot + "/GanttDependencies/Destroy",
                dataType: "jsonp"
              },
              create: {
                url: serviceRoot + "/GanttDependencies/Create",
                dataType: "jsonp"
              },
              parameterMap: function (options, operation) {
                if (operation !== "read") {
                  return { models: kendo.stringify(options.models || [options]) };
                }
              }
            },
            schema: {
              model: {
                id: "id",
                fields: {
                  id: { from: "ID", type: "number" },
                  predecessorId: { from: "PredecessorID", type: "number" },
                  successorId: { from: "SuccessorID", type: "number" },
                  type: { from: "Type", type: "number" }
                }
              }
            }
          });

          var window = $("#window").kendoWindow({
            visible: false, //the window will not appear before its .open method is called
            width: "400px",
            height: "250px",
            actions: []
          }).data("kendoWindow");

          var gantt = $("#gantt").kendoGantt({
            dataSource: tasksDataSource,
            editable: {
              confirmation: false
            },
            views: [
              "day",
              { type: "week", selected: true },
              "month"
            ],
            columns: [
              { field: "id", title: "ID", width: 60 },
              { field: "title", title: "Title", editable: true, sortable: true },
              {
                title: "Timings",
                columns: [
                  { field: "start", title: "Start Time", format: "{0:MM/dd/yyyy}", width: 100, editable: true, sortable: true },
                  { field: "end", title: "End Time", format: "{0:MM/dd/yyyy}", width: 100, editable: true, sortable: true }
                ]
              }
            ],
            remove: function(e){

              //Prevent default remove behavior
              e.preventDefault();

              //Get the task
              var data = e.task;

              //Send the task data object to the template and render it
              window.content(windowTemplate(data));

              //Open the window and center it
              window.center().open();

              $("#deleteButton").click(function(){

                //remove the task from the datasource and send the request
                gantt.dataSource.remove(data);
                gantt.dataSource.sync();

                window.close();

              });

              $("#cancelButton").click(function(){
                window.close();
              })

            },
            height: 700,
            showWorkHours: false,
            showWorkDays: false,
            snap: false
          }).data("kendoGantt");


          $(document).bind("kendo:skinChange", function () {
            gantt.refresh();
          });
        });
      </script>
    </div>
```
