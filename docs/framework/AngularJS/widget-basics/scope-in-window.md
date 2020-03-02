---
title: Accessing Scope in Windows
page_title: Accessing the AngularJS Scope in a Window | AngularJS Directives
description: "Learn how to deal with different scopes of widgets in AngularJS applications."
slug: angularjs_window_scope
previous_url: /framework/AngularJS/introduction#placing-widgets-in-windows
position: 8
---

# Accessing Scope in Windows

The AngularJS framework creates a new scope for any content that is placed in a window because of the dynamic scoping of the framework.

A widget that is placed in the window or in a popup loses its connection to the parent scope and does not handle any changes to the parent scope.

## Getting AngularJS Scope Attached to Popup Window

To work around this issue, use either of the following approaches:

* Apply the [`appendTo`](https://docs.telerik.com/kendo-ui/api/javascript/ui/window/configuration/appendto) option to append the window to another HTML element which is part of the AngularJS application and scope.

    ```dojo
      <div id="example" ng-app="KendoDemos">
        <div class="demo-section k-header" ng-controller="MyCtrl">
          <div kendo-window="wnd" k-append-to="'#example'">
          </div>
        </div>
      </div>
      <script>
        angular.module("KendoDemos", [ "kendo.directives" ])
        .controller("MyCtrl", function($scope){
          $scope.$on("kendoRendered", function(e) {
            //retrieve the child scope from the window element
            var childScope = angular.element($scope.wnd.element).scope();
            console.log(childScope);
            });
          });
      </script>
    ```

* Initialize the AngularJS application on `body`.

## Using Separate Controller to Resolve Window Scopes

The following example demonstrates the best approach to handle the issue by using a separate `controller` that handles the scope of the window.

```dojo
	<div id="example" ng-app="KendoDemos">
		<div ng-controller="Host">
			<div kendo-window="editPopup"
				 k-modal="true"
				 k-title="'popupTitle'"
				 k-width="300"
				 k-resizable="false"
				 k-height="200"
				 k-visible="false">

				<div ng-controller="Popup">
				  <span>Selected: {% raw %}{{dataview.DataSourceID}}{% endraw %} </span>
				  <select kendo-drop-down-list style="width:230px;"
						  ng-model="dataview.DataSourceID"
						  k-data-text-field="'Name'"
						  k-data-value-field="'ID'"
						  k-data-source="datasources"></select>
				</div>
			</div>
			<button kendo-button ng-click="Show()">Show</button>
		</div>
	</div>

	<script>
		angular.module("KendoDemos", ["kendo.directives"])
			.controller("Host", function($scope) {
				$scope.Show = function() {
				  $scope.editPopup.center();
				  $scope.editPopup.open();
				}
			}).controller("Popup", function($scope) {
				var datasources = [{ ID: 13, Name: "ID is 13" }, { ID: 14, Name: "ID is 14" }];
				$scope.datasources = datasources;
				var dataview = { DataSourceID: 14 };
				$scope.dataview = dataview;
			});
	</script>
```

## See Also

* [AngularJS Integration Overview]({% slug angularjs_integration_directives %})
* [Global Events]({% slug global_events_angularjs_directives %})
