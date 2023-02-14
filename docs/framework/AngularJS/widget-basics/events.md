---
title: Event Handlers
page_title: Event Handling | AngularJS Directives
description: "Learn more about handling Kendo UI widget events in AngularJS applications."
previous_url: /framework/AngularJS/introduction#setting-event-handlers
slug: angularjs_widget_events
position: 4
---

# Event Handlers

Kendo UI supports the setting of event handlers in AngularJS applications.

## Using Widget Configuration Options

If you store the whole configuration in the `controller`, add an event handler in the same way as with plain Kendo UI.

The following example includes a paragraph that uses the Angular `ng-show` directive and which is displayed only after a month is selected. To implement the approach, you need to call the `$scope.$digest()` event handler.

```dojo
    <div ng-app="app" ng-controller="MyCtrl">
      <input kendo-date-picker k-options="monthPickerConfig" />
      <p ng-show="selected">A month was picked</p>
    </div>
    <script>
      angular.module("app", [ "kendo.directives" ]).controller("MyCtrl", function($scope) {
          $scope.monthPickerConfig = {
            start  : "year",
            depth  : "year",
            format : "MMMM yyyy",
            change : function(e) { // handler for "change" event
              var datePicker = e.sender;
              console.log(datePicker.value());
              $scope.selected = true;
              $scope.$digest();
            }
          };
      });
    </script>
```

## Using the k-on Attribute

You can also specify event handlers by using attributes. They require the `k-on-` prefix.

In the following example, the `kendoEvent` variable is defined in a scope and you have to pass it to the event handler. If you are using the `k-on-` attributes, you do not need to call `$digest()` on the scope because your bindings take care of it.

```dojo
    <div ng-app="app" ng-controller="MyCtrl">
      <input kendo-date-picker k-on-change="onDateSelected(kendoEvent)" />
      <p ng-show="selected">A month was picked</p>
    </div>
    <script>
      angular.module("app", [ "kendo.directives" ]).controller("MyCtrl", function($scope) {
        $scope.onDateSelected = function(e) {
          var datePicker = e.sender;
          console.log(datePicker.value());
          $scope.selected = true;
        };
      });
    </script>
```

## Using Special change Events

The Grid, TreeView, and ListView widgets evaluate handlers that are defined with `k-on-change` in a scope which contains additional information about the selected items as local variables.

The following local variables are defined:
- `selected` (jQuery object)&mdash;The selected elements.
- `data` (array or data item)&mdash;The selected data models. It will be an array when a multiple selection is enabled, or a single item otherwise.
- `dataItem`&mdash;When multiple selection is not enabled, this is provided for consistency and will be the same item as `data`.
- `angularDataItem`&mdash;When multiple selection is not enabled, this is the `dataItem` object that has its properties wrapped with getter/setters.
- `columns`&mdash;For the Grid, when the cell selection is enabled, it will be an array with zero-based column indexes for the selected columns. Also, in this case, the `selected` object will contain the respective `<td>` elements instead of the `<tr>` ones.

The `kendoEvent` is also available.

The following example demonstrates how to use some of these local variables.

```dojo
    <div id="example" ng-app="KendoDemos">
      <div ng-controller="MyCtrl">
        <kendo-grid options="mainGridOptions" k-on-change="onChange({ selected: selected },data,dataItem,angularDataItem)">
        </kendo-grid>
      </div>
    </div>
    <script>
      angular.module("KendoDemos", [ "kendo.directives" ])
        .controller("MyCtrl", function($scope){
        $scope.onChange = function(selected,data,dataIteam,angularDataItem) {
          console.log("Selected: "+ selected.selected,data,dataIteam,angularDataItem);
          console.log("data: ", data);
          console.log("dataIteam: ", dataIteam);
          console.log("angularDataItem: ", angularDataItem);
        }
        $scope.mainGridOptions = {
          dataSource: {
            type: "odata",
            transport: {
              read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Employees"
            },
            pageSize: 5,
            serverPaging: true,
            serverSorting: true
          },
          selectable:true,
          columns: [{
            field: "FirstName",
            title: "First Name",
            width: "120px"
          },{
            field: "LastName",
            title: "Last Name",
            width: "120px"
          }]
        };
      })
    </script>
```

## See Also

* [AngularJS Integration Overview]({% slug angularjs_integration_directives %})
* [Global Events]({% slug global_events_angularjs_directives %})
