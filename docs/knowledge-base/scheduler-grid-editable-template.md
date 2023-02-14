---
title: Grid in the Scheduler Edit Template  
description: Learn how to use Grid in Scheduler edit template with an additionally dynamically bound row editor.
type: how-to
page_title: How to Add a Grid in the Scheduler Edit Template with an Additionally Dynamically Bound Row Editor  - Kendo UI Scheduler for jQuery
slug: scheduler-grid-editable-template
tags: kendo, kendoui, scheduler, grid, edit, template
ticketid: 1539603
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  Progress® Kendo UI® Scheduler for jQuery</td>
  <td>Progress® Kendo UI® Grid for jQuery</td> 
 </tr>
</table>


## Description

How can I add a Grid in the [editable template](/api/javascript/ui/scheduler/configuration/editable.template) of the Scheduler with an additionally dynamically bound row editor ?

## Solution

1. In the edit template of the Scheduler add a Grid using the MVVM binder scenario (using data-role="grid").
1. Add an empty 'rowEditor' container inside the edit template.
1. Using the [`edit`](/api/javascript/ui/scheduler/events/edit) event of the Scheduler you can programmatically inject the detached row editor and create the temporary model for the binder.


````dojo
<script id="editor" type="text/x-kendo-template">
   <h3>Edit meeting</h3>
   <p>
       <label>Title: <input data-bind="value: title" class="k-input k-textbox k-input-solid k-input-md k-rounded-md" /></label>
   </p>
   <p>
       <label>Start: <input data-role="datetimepicker" data-bind="value: start" /></label>
   </p>
   <p>
       <label>End: <input data-role="datetimepicker" data-bind="value: end" /></label>
   </p>
   <div id="rowEditor">
  
   </div>
   <div id="rowGrid" data-role="grid" data-bind="source: rows" 
   			data-selectable="true"
        data-columns="[
                                 { 'field': 'name', 'title': 'Name', 'width': 270 },
                                 { 'field': 'field', 'title': 'Field' }
                              ]">
   </div>
</script>

<script id="rowEditor" type="text/x-kendo-template">
		<p>
       <label>Name: <input  data-bind="value: selected.name" class="k-input k-textbox k-input-solid k-input-md k-rounded-md" /></label>
   </p>
   <p>
       <label>Field: <input data-bind="value: selected.field" class="k-input k-textbox k-input-solid k-input-md k-rounded-md" /></label>
   </p>
   <button data-role="button" data-bind="click: add">Add</button>
   <button data-role="button" data-bind="click: update">Update</button>
   <button data-role="button" data-bind="click: remove">Remove</button>
   <button data-role="button" data-bind="click: clear">Clear</button>
</script>
  
  
<div id="scheduler"></div>
<script>

  
$("#scheduler").kendoScheduler({
  date: new Date("2013/6/6"),
  editable: {
    template: $("#editor").html()
  },
  views: [
    { type: "day" }
  ],
  dataSource: [
    {
      id: 1,
      start: new Date("2013/6/6 08:00 AM"),
      end: new Date("2013/6/6 09:00 AM"),
      title: "Interview",
      rows: [ 
        { name: "Name 1", field: "Field 1" }, 
        { name: "Name 2", field: "Field 2" }
      ]
    },
    {
      id: 2,
      start: new Date("2013/6/6 10:00 AM"),
      end: new Date("2013/6/6 11:00 AM"),
      title: "Interview 2",
      rows: []
    }
  ],
  edit: function (ev) {
  	var event = ev.event,
        container = ev.container,
        rowEditorContainer = container.find("#rowEditor"),
        grid = container.find("#rowGrid").data("kendoGrid");
    
    if (!event.rows) {
    	event.set("rows", []);
    }
    
    var rowModel = kendo.observable({
          selected: { name: "", field: "" },
          add: function () {           
          	grid.dataSource.insert(this.get("selected"));
          }, 
          update: function () {
          	// Updates of a selected row happen automatically due to the Binder. 
          }, 
          remove: function () {
          	grid.dataSource.remove(this.get("selected"));
            this.set("selected", { name: "", field: "" })
          }, 
          clear: function () {
            grid.clearSelection();
          	this.set("selected", { name: "", field: "" })
          }
    });
    
    grid.bind("change", function (ev) {
      var selectedRow = ev.sender.select()[0];
      var selectedDataItem = ev.sender.dataItem(selectedRow);
      rowModel.set("selected", selectedDataItem);
    });    
    
    rowEditorContainer.html($("#rowEditor").html());
    kendo.bind(rowEditorContainer, rowModel);
  }
});
</script>
````

## See Also

* [API Reference of the Scheduler](/api/javascript/ui/scheduler)
