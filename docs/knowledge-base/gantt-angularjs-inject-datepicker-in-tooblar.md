---
title: Add DatePicker to Gantt Toolbar in AngularJS Applications
description: An example on how to inject a Kendo UI DatePicker widget in the Kendo UI Gantt in AngularJS applications.
type: how-to
page_title: Place DatePicker in the Toolbar | Kendo UI Gantt
slug: gantt-angularjs-inject-datepicker-in-tooblar
tags: kendo, kendoui, gantt, angular, angularjs, datepicker, toolbar, inject, insert-picker
res_type: kb
component: gantt
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Gantt</td>
 </tr>
</table>


## Description

How can I insert a Kendo UI DatePicker widget into the toolbar of the Kendo UI Gantt in AngularJS scenarios? How can I use the DatePicker to change the visible dates of the Gantt?

## Solution

1. Pass a template to the Gantt toolbar with a single input element.
1. In the `dataBound` event of the Gantt, initialize the DatePicker and assign a handler for its `change` event.

```dojo
<div ng-app="KendoDemo" ng-controller="MyCtrl">
  <div kendo-gantt="theGantt" k-options="ganttOptions"></div>    
</div>

<script>
  angular.module("KendoDemo", ["kendo.directives"])
    .controller("MyCtrl", function($scope) {
		var start = new Date();
		var end = new Date();
		start.setDate(start.getDate() - 30);
		end.setDate(end.getDate() + 30);

		$scope.ganttOptions = {
		  toolbar: [{
			template: '<input id="picker" />'
		  }],
		  dataBound: function(e) {
			var gantt = e.sender;
			var pickerElement = gantt.element.find('#picker');
			var picker = pickerElement.getKendoDatePicker();

			if (!picker) {
			  pickerElement.kendoDatePicker({
				change: function(e) {
				  $scope.theGantt.date(e.sender.value());
				}
			  });
			}
		  },
		  dataSource: [{
			id: 0,
			orderId: 0,
			parentId: null,
			title: "Task1",
			start: start,
			end: end
		  }],
		  views: [
			"day",
			"week",
			{ type: "month", selected: true }
		  ]
		};
  });
</script>
```

## See Also

* [API Reference of the Gantt](http://docs.telerik.com/kendo-ui/api/javascript/ui/gantt)
* [API Reference of the DatePicker](http://docs.telerik.com/kendo-ui/api/javascript/ui/gantt)
