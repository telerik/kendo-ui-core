---
title: Kendo UI Grid in AngularJS
description: Use Kendo UI Grid with AngularJS
---

{% raw %}

# The Grid widget in Angular-Kendo

The Grid is one of Kendo's most complex widgets. On this page we will outline some particularities.

## The `k-on-change` attribute

If you assign a `k-on-change` event handler, it will be evaluated in a scope containing additional local variables:

- `kendoEvent` — the "change" event as triggered by Kendo UI;

- `selected` — the selected elements (jQuery object);

- `data` — the selected data items (array of models);

> Note: `selected` is a jQuery object which references DOM elements.  As of AngularJS 1.2.24 this is disallowed in
> template expressions “[for security reasons](https://docs.angularjs.org/error/$parse/isecdom)”.  The following will
> *not* work with Angular 1.2.24:
>
>     k-on-change="myChangeHandler(selected)"
>
> The workaround is to pass it in an object or in an array, for example:
>
>     k-on-change="myChangeHandler({ selected: selected })"
>
> Obviously, the handler function needs to take that into account.

When the grid is not in multiple selection mode, the `data` above will not be an array but a single data item, and that item is also accessible as `dataItem`.

When cell selection is allowed, an additional `columns` variable will be present. It is an array containing the indexes of the columns where cells are selected.

The following example allows you to choose the grid's selection mode and then select items in the grid and see what variables are available.

#### Handle the change event in AngularJS
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
## Dynamically set columns

When you need to, say, load columns definition from the server, you need to postpone the widget initialization until the data is available, because the Grid doesn't support defining columns after the widget is created. For this, the `k-ng-delay` attribute comes in handy. Here is an example (using `$timeout` to emulate networking — the data is set in scope asynchronously):

#### Dynamically set the grid columns in AngularJS
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

The Grid supports a lot of user-customizable templates. You can define the `rowTemplate` if you want to completely customize how each row is displayed, or individual cell templates by adding a `template` property in your column definitions. The difference versus plain Kendo is that when the Grid is created with the Angular directive the templates can contain live `\{\{angular\}\}` bits. Both `rowTemplate` and `columns.template` are compiled with Angular in a scope containing a `dataItem` variable which points to the data model of the current item. Here is an example for `rowTemplate`:

#### Set the grid row template in AngularJS
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

In the above example if you select an item it will display two input fields bound to the selected data model. You can notice that if you edit the data, the text in the grid will be updated seamlessly, thanks to Angular. Grid functions like sorting will still work properly.

The one thing you must be careful about when using `rowTemplate` is to include the attribute `data-uid="#: uid #"` on the toplevel row element, as described in the Grid documentation. That cannot use an Angular template like `data-uid="{{dataItem.uid}}"`, because that is compiled after the grid was displayed and the widget will not be able to tell which row belongs to which data item.

## How to bind the Grid using the $http service

In order to take full control on the logic that performs the request to the server all you have to do is to define the different transport operations as functions. Inside the function you can use the $http or the $.ajax methods to perform the needed. When done (inside the success callback) you just need to pass the result to the `success` function part of the events arguments object.

#### Use $http to bind the grid
```html
<div ng-app="app" ng-controller="MyCtrl">
    <div kendo-grid k-options="gridOptions"></div>
</div>
<script>
angular.module("app", ["kendo.directives"]).controller("MyCtrl", function($scope, $http) {
    $scope.gridOptions = {
        columns: [ { field: "FirstName" }, { field: "LastName" } ],
        dataSource: {
            schema: {
                data: "d"
            },
            transport: {
                read: function (e) {
                  $http({method: 'GET', url: 'http://demos.telerik.com/kendo-ui/service/Northwind.svc/Employees'}).
                  success(function(data, status, headers, config) {
                      e.success(data)
                  }).
                  error(function(data, status, headers, config) {
                      alert('something went wrong')
                      console.log(status);
                  });
              }
           },
          pageSize: 5
        }
    }
});
</script>

{% endraw %}
