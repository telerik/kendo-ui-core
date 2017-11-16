---
title: Attach click Event Handler for Custom Commands in AngularJS Grid
description: An example on how to attach a click event handler for a custom command in an AngularJS Grid.
type: how-to
page_title: Attach a Handler for the Command click Event in AngularJS | Kendo UI Grid
slug: grid-angular-click-handler-for-command
tags: grid, angularJS, event, command, handler
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
 <tr>
  <td>Progress Kendo UI version</td>
  <td>2017.3.913</td>
 </tr>
</table>

## Description

How can I attach a handler for the `click` event of a custom button to a function that is defined in the scope of a Kendo UI Grid in AngularJS projects?

## Solution

The following example demonstrates how to apply the necessary approach.

```
	<div id="example" ng-app="KendoDemos">
		<div ng-controller="MyCtrl">
			<kendo-grid options="mainGridOptions">            
        </kendo-grid>
		</div>
	</div>

	<script>
		angular.module("KendoDemos", ["kendo.directives"])
			.controller("MyCtrl", function ($scope, $window) {			
				$scope.clickHandler = function (e) {
					var scope = this.$angular_scope;
					var winObj = scope.returnWindow(); //getting reference to the window object
					var tr = $(e.target).closest("tr"); // get the current table row (tr)
            // get the data bound to the current table row
          var data = this.dataItem(tr);
          console.log(data.uid);
					return false;
				}

				$scope.returnWindow = function () {
					return $window;
				}

				$scope.mainGridOptions = {
					dataSource: {
						type: "odata",
						transport: {
							read: "//demos.telerik.com/kendo-ui/service/Northwind.svc/Employees"
						},
						pageSize: 5,
						serverPaging: true,
						serverSorting: true
					},
					sortable: true,
					pageable: true,
					columns: [{
						command: [{
							name: "customButton",
							click: $scope.clickHandler
						}]
					}]
				};
			})
	</script>  
```
