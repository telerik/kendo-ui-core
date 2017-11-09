---
title: Place a DatePicker in the Gantt Toolbar in AngularJS Application
description: An example on how to inject a DatePicker widget in the Kendo UI Gantt in AngularJS application.
type: how-to
page_title: Inject DatePicker in the Gantt Toolbar | Kendo UI Gantt
slug: gantt-angularjs-inject-datepicker-in-tooblar
tags: kendo, kendoui, gantt, angular, angularjs, datepicker, toolbar, inject, insert-picker
ticketid: 
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Gantt</td>
 </tr>
</table>


## Description

In AngularJS scenario, how to insert a DatePicker widget within the Kendo Gantt toolbar? How to use the picker to change the Gantt visible dates?

## Solution

Pass a template with a single input element to the Gantt toolbar. Then, in the Gantt `dataBound` event initialize the picker and assign a handler for its `change` event:

```html
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
