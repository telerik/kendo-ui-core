---
title: Grid Settings
page_title: Grid Settings | AngularJS Directives
description: "Learn the tips and tricks about how to use Kendo UI Grid widget in AngularJS."
slug: grid_settings_angularjs_directives
position: 4
---

# Grid Settings

[The Grid](http://www.telerik.com/kendo-ui/grid) is one of the most complex Kendo UI widgets. This chapter outlines some of its particularities regarding the AngularJS integration supported by Kendo UI.

## Escaping Execution of Title Expression

> **Important**
>
> AngularJS evaluates a template expression placed as [`column.title`](/api/javascript/ui/grid#configuration-columns.title) content. To avoid this behavior, set a [`ng-non-bindable`](https://docs.angularjs.org/api/ng/directive/ngNonBindable) attribute through the [`headerAttributes`](/api/javascript/ui/grid#configuration-columns.headerAttributes) so that AngularJS skips the expression evaluation.

The example below demonstrates how to use the `headerAttributes` to prevent the execution of expressions inside the title content.

###### Example

```html
<div id="example" ng-app="KendoDemos">
    <div ng-controller="MyCtrl">
        <kendo-grid options="mainGridOptions">
        </kendo-grid>
    </div>
</div>

<script>
    angular.module("KendoDemos", [ "kendo.directives" ])
        .controller("MyCtrl", function($scope){
            $scope.mainGridOptions = {
                dataSource: {
                    type: "odata",
                    transport: {
                        read: "//demos.telerik.com/kendo-ui/service/Northwind.svc/Employees"
                    }
                },
                columns: [{
                    field: "FirstName",
                    title: "First Name {{1+1}}",
                    headerAttributes: {"ng-non-bindable": true},
                    width: "180px"
                    },{
                    field: "LastName",
                    title: "Last Name",
                    width: "120px"
                    },{
                    field: "Country",
                    width: "120px"
                    },{
                    field: "City",
                    width: "120px"
                    }]
            };
        });
</script>
```

## Attributes

### k-on-change

If you assign a `k-on-change` event handler, it is evaluated in a scope, which contains additional local variables:

- `kendoEvent`&mdash;The `change` event as triggered by Kendo UI.
- `selected`&mdash;The selected elements (a jQuery object).
- `data`&mdash;The selected data items (an array of models).

> **Important**
>
> The `selected` object is a jQuery one which references DOM elements. As of AngularJS 1.2.24 release this is disallowed in template expressions "[for security reasons](https://docs.angularjs.org/error/$parse/isecdom)". Therefore, the following will not work with Angular 1.2.24:
>
>     k-on-change="myChangeHandler(selected)"
>
> The workaround is to pass it in an object or in an array. For example:
>
>     k-on-change="myChangeHandler({ selected: selected })"
>
> Obviously, the handler function needs to take that into account.

When the Grid is not in a multiple selection mode, the `data` above will not be an array, but a single data item, and that item is also accessible as `dataItem`. When the cell selection is allowed, an additional `columns` variable is present. This variable is an array containing the indexes of the columns where cells are selected. Choose the grid's selection mode and then select items from the grid and see what variables are available.

The example below demonstrates how to handle the `change` event in AngularJS.

###### Example

```html
<div ng-app="app" ng-controller="MyCtrl">
  <label>Select mode: <select kendo-dropdownlist ng-model="gridOptions.selectable">
    <option value="row">Row</option>
    <option value="cell">Cell</option>
    <option value="multiple, row">Multiple, row</option>
    <option value="multiple, cell">Multiple, cell</option>
  </select></label>

  <div kendo-grid k-options="gridOptions" k-rebind="gridOptions.selectable"
       k-on-change="handleChange(data, dataItem, columns)"></div>
  <pre>
  data: {{ data | json }}
  columns: {{ columns | json }}
  <span ng-show="gridOptions.selectable == 'row' || gridOptions.selectable == 'cell'">DataItem: {{ dataItem | json }}</span>
  </pre>
</div>
<script>
  angular.module("app", ["kendo.directives"]).controller("MyCtrl", function($scope) {
    var data = new kendo.data.DataSource({
      data: [
        { text: "Foo", id: 1 },
        { text: "Bar", id: 2 },
        { text: "Baz", id: 3 }
      ]
    });
    $scope.handleChange = function(data, dataItem, columns) {
      $scope.data = data;
      $scope.columns = columns;
      $scope.dataItem = dataItem;
    };
    $scope.gridOptions = {
      dataSource: data,
      selectable: "row",
      columns: [
        { field: "text", title: "Text" },
        { field: "id", title: "Id" }
      ]
    };
  });
</script>
```

## Features

### Dynamic Columns

When you need to, say, load a column definition from the server, you need to postpone the widget initialization until the data is available, because the Grid does not support the option to define columns once the widget is created. That is where the `k-ng-delay` attribute comes in handy. You can use `$timeout` to emulate networking as the data is asynchronously set in scope.

The example below demonstrates how to dynamically set the Grid columns in AngularJS.

###### Example

```html
<div ng-app="app" ng-controller="MyCtrl">
  <div kendo-grid k-options="gridOptions" k-ng-delay="gridOptions"></div>
</div>
<script>
angular.module("app", ["kendo.directives"]).controller("MyCtrl", function($scope, $timeout) {
  $timeout(function(){
    $scope.gridOptions = {
      sortable: true,
      selectable: true,
      dataSource: [
        { text: "Foo", id: 1 },
        { text: "Bar", id: 2 },
        { text: "Baz", id: 3 }
      ],
      columns: [
        { field: "text", title: "Text" }
      ]
    };
  }, 500);
});
</script>
```

### Templates

The Grid supports a lot of user-customizable templates. You can define the `rowTemplate` if you want to completely customize the way each row is displayed, or define individual cell templates by adding a `template` property to your column definitions. The difference from applying plain Kendo is that when the Grid is created with the AngularJS directive, the templates can contain live `\{\{angular\}\}` bits. Both `rowTemplate` and `columns.template` are compiled with AngularJS in a scope containing a `dataItem` variable, which points to the data model of the current item.

The example below demonstrates how to set the Grid row template (`rowTemplate`) in AngularJS via markup. It is also possible to define it in the Grid options object, as when not using Angular.

###### Example

```html
<div ng-app="app" ng-controller="MyCtrl">
  <div kendo-grid k-options="gridOptions" k-ng-delay="gridOptions">
    <table>
        <tr k-row-template data-uid="#: uid #">
            <td colspan="2" style="text-align:center">This is <strong>{{dataItem.text}}</strong> and has an ID of {{dataItem.id}}</td>
        </tr>
        <tr k-alt-row-template class="k-alt" data-uid="#: uid #">
            <td colspan="2" style="text-align:center">This is <strong>{{dataItem.text}}</strong> and has an ID of {{dataItem.id}}</td>
        </tr>
    </table>
  </div>
</div>
<script>
angular.module("app", ["kendo.directives"]).controller("MyCtrl", function($scope) {
  var data = new kendo.data.DataSource({
    data: [
      { text: "Foo", id: 1 },
      { text: "Bar", id: 2 },
      { text: "Baz", id: 3 }
    ]
  });
  $scope.gridOptions = {
    dataSource: data,
    sortable: true,
    selectable: true,
    columns: [
      { field: "text", title: "Text" },
      { field: "id", title: "Id" }
    ]
  };
});
</script>
```

> **Important**
>
> When using `rowTemplate`, include the `data-uid="#: uid #"` attribute in the toplevel row element as described in the [Grid documentation]({% slug howto_use_dates_inside_row_template_grid %}). You must not use an AngularJS template like `data-uid="{{dataItem.uid}}"` because it is compiled after the grid is displayed and the widget cannot discriminate between the different rows and the data items they belong to.

## Server Requests

### HTTP Service Binding the Grid

To take full control on the logic that performs the request to the server, all you have to do is to define the different transport operations as functions. Inside the function you can use the `$http` or the `$.ajax` methods to perform what is needed. When done (inside the success callback), just pass the result to the `success` function part of the events arguments object.

The example below demonstrates how to use `$http` to bind the Grid.

###### Example

```html
<div ng-app="app" ng-controller="MyCtrl">
    <div kendo-grid k-options="gridOptions"></div>
 </div>
   <script>
      angular.module("app", ["kendo.directives"]).controller("MyCtrl", function($scope, $http) {
        $scope.gridOptions = {
          columns: [ { field: "ProductID" }, { field: "ProductName" } ],
          pageable: true,
          dataSource: {
            pageSize: 5,
            transport: {
              read: function (e) {
                $http.jsonp('http://demos.telerik.com/kendo-ui/service/Products?callback=JSON_CALLBACK')
                  .then(function success(response) {
                  e.success(response.data)
                }, function error(response) {
                  alert('something went wrong')
                  console.log(response);
                })
              }
            }
          }
        }
      });
    </script>
```

## See Also

Other articles on AngularJS directives and integration with Kendo UI:

* [AngularJS Integration Overview]({% slug angularjs_integration_directives %})
* [Global Events]({% slug global_events_angularjs_directives %})
* [Directives with DataSource]({% slug datasource_updates_angularjs_directives %})
* [ng-* Directives in Widget Markup]({% slug ngrepeat_ngif_ngbind_support_angularjs %})
* [Memory Leaks]({% slug memory_leaks_angularjs_directives %})
* [How to Load View in Window]({% slug window_service_angularjs_directives %})
* [How to Nest Widgets]({% slug nest_widgets_angularjs_directives %})
* [Troubleshooting: Common Issues]({% slug common_issues_support_angularjs %})
