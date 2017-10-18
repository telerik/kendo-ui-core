---
title: How to Attach Click Event Handler for Custom Command in AngularJS Grid
description: Attaching handler for the custom command click event in AngularJS 
type: how-to
page_title: How to attach handler for the command click event in Kendo UI Grid in AngularJS
slug: grid-angular-click-handler-for-command
tags: grid, angularJS, event, command, handler
res_type: kb
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

How to attach handler for the click event of a custom button to a function defined in the scope.

## Solution

#### Example

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
