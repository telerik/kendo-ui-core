---
title: Grid Settings
page_title: Grid Settings | AngularJS Directives
description: "Learn the tips and tricks about how to use Kendo UI Grid widget in AngularJS."
slug: grid_settings_angularjs_directives
position: 4
---

# Grid Settings

The Grid is one of the most complex Kendo UI widgets. This chapter outlines some of its particularities regarding the AngularJS integration supported by Kendo UI.

## `k-on-change` Attribute

If you assign a `k-on-change` event handler, it will be evaluated in a scope, which contains additional local variables:

- `kendoEvent` — the `change` event as triggered by Kendo UI
- `selected` — the selected elements (a jQuery object)
- `data` — the selected data items (an array of models)

> **Important**  
> `selected` is a jQuery object which references DOM elements. As of AngularJS 1.2.24 release this is disallowed in template expressions "[for security reasons](https://docs.angularjs.org/error/$parse/isecdom)". Therefore, the following will not work with Angular 1.2.24:
>
>     k-on-change="myChangeHandler(selected)"
>
> The workaround is to pass it in an object or in an array. For example:
>
>     k-on-change="myChangeHandler({ selected: selected })"
>
> Obviously, the handler function needs to take that into account.

When the grid is not in a multiple selection mode, the `data` above will not be an array, but a single data item, and that item is also accessible as `dataItem`. When the cell selection is allowed, an additional `columns` variable is present. This variable is an array containing the indexes of the columns where cells are selected. Choose the grid's selection mode and then select items from the grid and see what variables are available:

###### Example - handle the `change` event in AngularJS

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

## Dynamic Column Settings

When you need to, say, load a column definition from the server, you need to postpone the widget initialization until the data is available, because the Grid does not support the option to define columns once the widget is created. That is where the `k-ng-delay` attribute comes in handy. You can use `$timeout` to emulate networking as the data is asynchronously set in scope.

###### Example - dynamically set the grid columns in AngularJS

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

## Templates

The Grid supports a lot of user-customizable templates. You can define the `rowTemplate` if you want to completely customize the way each row is displayed, or define individual cell templates by adding a `template` property to your column definitions. The difference from applying plain Kendo is that when the Grid is created with the AngularJS directive, the templates can contain live `\{\{angular\}\}` bits. Both `rowTemplate` and `columns.template` are compiled with AngularJS in a scope containing a `dataItem` variable, which points to the data model of the current item.

###### Example - set the grid row template in AngularJS (`rowTemplate`)

```html
<div ng-app="app" ng-controller="MyCtrl">
  <div kendo-grid k-options="gridOptions" k-ng-delay="gridOptions"></div>
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
    ],
    rowTemplate: "<tr data-uid='#: uid #'><td colspan='2' style='text-align: center'>" +
      "This is <b>{{dataItem.text}}</b> and has ID={{dataItem.id}}" +
      "</td></tr>"
  };
});
</script>
```

As seen, if you select an item, it displays two input fields bound to the selected data model. Note that if you edit the data, the text in the grid will be updated seamlessly thanks to AngularJS. Grid functions, such as sorting, will still properly work.

> **Important**  
> When using `rowTemplate`, include the `data-uid="#: uid #"` attribute in the toplevel row element as described in the [Grid documentation](/web/grid/how-to/Templates/row-template-using-dates). You must not use an AngularJS template like `data-uid="{{dataItem.uid}}"` because it is compiled after the grid is displayed and the widget cannot discriminate between the different rows and the data items they belong to.

## `$http` Service Binding the Grid

In order to take full control on the logic that performs the request to the server all you have to do is to define the different transport operations as functions. Inside the function you can use the $http or the $.ajax methods to perform the needed. When done (inside the success callback) you just need to pass the result to the `success` function part of the events arguments object.

###### Example - use `$http` to bind the Grid

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
                  $http.jsonp('http://demos.telerik.com/kendo-ui/service/Products?callback=JSON_CALLBACK').
                  success(function(data, status, headers, config) {
                      e.success(data)
                  }).
                  error(function(data, status, headers, config) {
                      alert('something went wrong')
                      console.log(status);
                  });
              }
           }
        }
    }
});
</script>

## See Also

Other articles on AngularJS directives and integration with Kendo UI:

* [AngularJS Integration Overview]({% slug angularjs_integration_directives %})
* [DataSource Updates]({% slug datasource_updates_angularjs_directives %})
* [Directives with Timeout Initialization in Markup]({% slug ngrepeat_ngif_ngbind_support_angularjs %})
* [Global Events]({% slug global_events_angularjs_directives %})
* [Memory Leaks]({% slug memory_leaks_angularjs_directives %})
* [How to Nest Widgets]({% slug nest_widgets_angularjs_directives %})