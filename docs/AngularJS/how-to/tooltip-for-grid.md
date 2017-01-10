---
title: Create Tooltips for Grid Elements
page_title: Create Tooltips for Grid Elements | AngularJS Directives
description: "Learn how to create Kendo UI Tooltips for the elements of a Kendo UI Grid in AngularJS applications."
slug: tooltip_for_grid_angularjs_directives
---

# Create Tooltips for Grid Elements

In AngularJS applications, it is possible for you to create and show Kendo UI Tooltips for the elements of a Kendo UI Grid.

To apply this behavior:   
1. Define a Kendo UI Tooltip widget around the Grid declaration.   
1. Together with the Grid settings, define the Tooltip settings in the `$scope`.   
1. Prepare a jQuery selector that will match the elements you want and set it to the `filter` property of the Tooltip.   
1. Define the `content` property so it returns the desired information&mdash;for example, based on the target element contents, the `data-*` attributes, or other logic.   

###### Example

	<div id="example" ng-app="KendoDemos">
		<div ng-controller="MyCtrl">

			<kendo-tooltip k-options="ttipOptions">

				<kendo-grid options="mainGridOptions">
				</kendo-grid>

			</kendo-tooltip>

		</div>
	</div>

	<script>
		angular.module("KendoDemos", ["kendo.directives"])
			.controller("MyCtrl", function ($scope) {

				$scope.ttipOptions = {
					filter: "th", //selector to match elements that will get a tooltip
					content: function (e) {
						var target = e.target; // element for which the tooltip is shown
						return "tooltip content for: " + $(target).text(); //generate content for the tooltips
					}
				};

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
								field: "FirstName",
								title: "First Name",
								width: "120px"
							}, {
								field: "LastName",
								title: "Last Name",
								width: "120px"
							}, {
								field: "Country",
								width: "120px"
							}, {
								field: "City",
								width: "120px"
							}, {
								field: "Title"
							}
					]
				};
			})
	</script>

## See Also

Other articles and how-to examples on AngularJS directives and Kendo UI:

* [AngularJS Integration Overview]({% slug angularjs_integration_directives %})
* [Global Events]({% slug global_events_angularjs_directives %})
* [Grid Settings]({% slug grid_settings_angularjs_directives %})
* [Directives with DataSource]({% slug datasource_updates_angularjs_directives %})
* [ng-* Directives in Widget Markup]({% slug ngrepeat_ngif_ngbind_support_angularjs %})
* [Memory Leaks]({% slug memory_leaks_angularjs_directives %})
* [How to Nest Widgets]({% slug nest_widgets_angularjs_directives %})
* [Troubleshooting: Common Issues]({% slug common_issues_support_angularjs %})
* [Kendo Tooltip Overview]({% slug overview_kendoui_tooltip_widget %})
* [Kendo Tooltip API](/api/javascript/ui/tooltip)
