---
title: Grid Integration
page_title: Grid Integration | AngularJS Directives
description: "Learn the tips and tricks about how to use Kendo UI Grid widget in AngularJS."
previous_url: /AngularJS/the-grid-widget
slug: grid_settings_angularjs_directives
position: 4
---

# Grid Integration

The [Grid](http://www.telerik.com/kendo-ui/grid) is one of the most complex Kendo UI widgets.

This article outlines some of the specifics for setting and using the Grid with AngularJS.

## Avoiding the Evaluation of Title Expressions

AngularJS evaluates a template expression which is placed as [`column.title`](/api/javascript/ui/grid/configuration/columns.title) content. To avoid this behavior, set a [`ng-non-bindable`](https://docs.angularjs.org/api/ng/directive/ngNonBindable) attribute through the [`headerAttributes`](/api/javascript/ui/grid/configuration/columns.headerattributes) so that AngularJS skips the expression evaluation.

```dojo
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
                    title: "First Name {% raw %}{{1+1}}{% endraw %}",
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

## Handling the change Event

If you assign a `k-on-change` event handler, it is evaluated in a scope, which contains additional local variables:

- `kendoEvent`&mdash;The `change` event as triggered by Kendo UI.
- `selected`&mdash;The selected elements (a jQuery object).
- `data`&mdash;The selected data items (an array of models).

> The `selected` object is a jQuery object which references DOM elements. As of the AngularJS 1.2.24 release, it is not allowed to use this in template expressions "[for security reasons](https://docs.angularjs.org/error/$parse/isecdom)". As a result, the `k-on-change="myChangeHandler(selected)"` snippet will not work with Angular 1.2.24. To work around this issue, pass it in an object or in an array. For example, `k-on-change="myChangeHandler({ selected: selected })"`. The handler function has to take that into account.

When the Grid is not in a multiple selection mode, the `data` will be a single data item and not an array and that item will also be accessible as a `dataItem`. When the cell selection is allowed, an additional `columns` variable is present. This variable is an array which contains the indexes of the columns with selected cells. To see what variables are available, choose the selection mode of the Grid and select items from it.

```dojo
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
  data: {% raw %}{{ data | json }}{% endraw %}
  columns: {% raw %}{{ columns | json }}{% endraw %}
  <span ng-show="gridOptions.selectable == 'row' || gridOptions.selectable == 'cell'">DataItem: {% raw %}{{ dataItem | json }}{% endraw %}</span>
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

## Setting Columns Dynamically

If your project requires you to load a column definition from the server, you need to postpone the widget initialization until the data is available because the Grid does not support the definition of columns once the widget is created. To achieve this behavior, use the `k-ng-delay` attribute. To emulate networking as the data is asynchronously set in scope, use `$timeout`.

The following example demonstrates how to dynamically set the Grid columns in AngularJS.

```dojo
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

## Customizing Templates

The Grid supports templates that can be customized by the user. To completely customize the way each row is displayed, define the `rowTemplate`. To define individual cell templates, add a `template` property to your column definitions. The difference from applying plain Kendo UI is that when the Grid is created with the AngularJS directive, the templates can contain live `\{\{angular\}\}` bits. The `rowTemplate`, `columns.template`, and `columns.groupFooterTemplate` are compiled with AngularJS in a scope that contains a `dataItem` variable, which points to the data model of the current item. The `dataItem` in a `groupFooterTemplate` is an object with fields and their corresponding aggregates.

The following example demonstrates how to set the Grid row template (`rowTemplate`) by using markup. You can also define it in the Grid `options` object in the same way as when you do not use AngularJS.

```dojo
<div ng-app="app" ng-controller="MyCtrl">
  <div kendo-grid k-options="gridOptions" k-ng-delay="gridOptions">
    <table>
        <tr k-row-template data-uid="#: uid #">
            <td colspan="2" style="text-align:center">This is <strong>{% raw %}{{dataItem.text}}{% endraw %}</strong>
                and has an ID of {% raw %}{{dataItem.id}}{% endraw %}</td>
        </tr>
        <tr k-alt-row-template class="k-alt" data-uid="#: uid #">
            <td colspan="2" style="text-align:center">This is <strong>{% raw %}{{dataItem.text}}{% endraw %}</strong>
                and has an ID of {% raw %}{{dataItem.id}}{% endraw %}</td>
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

When you use aggregates, the `column` and `aggregate` information becomes available in the `footerTemplate` of the Grid through `{% raw %}{{ column }}{% endraw %}` and `{% raw %}{{ aggregate }}{% endraw %}` respectively. To access the aggregates of the columns in the `groupFooterTemplate`, use the `dataItem` variable with the `dataItem.field.aggregate` syntax.

> When you use `rowTemplate`, include the `data-uid="#: uid #"` attribute in the top-level row element as described in the [Grid documentation]({% slug howto_use_dates_inside_row_template_grid %}). Avoid using an AngularJS template, such as `data-uid="{% raw %}{{dataItem.uid}}{% endraw %}"`, because it is compiled after the Grid is displayed and the widget is not able to discriminate between the different rows and the data items to which they belong.

The following example demonstrates how to use the `sum` aggregate in a `footerTemplate` and a `groupFooterTemplate`, and apply an Angular currency pipe to it.

```dojo
<script src="https://demos.telerik.com/kendo-ui/content/shared/js/products.js"></script>

  <div id="example" ng-app="KendoDemos">
    <div ng-controller="MyCtrl">
      <kendo-grid options="mainGridOptions" k-data-source="ds"></kendo-grid>
    </div>
  </div>

  <script>
    angular.module("KendoDemos", [ "kendo.directives" ])
      .controller("MyCtrl", function($scope){

      $scope.ds = new kendo.data.DataSource({
        pageSize: 20,
        data: products,
        group: {
          field: "CategoryID", aggregates: [
            { field: "UnitPrice", aggregate: "sum" },
            { field: "UnitsInStock", aggregate: "sum" }
          ]
        },
        aggregate: [
          { field: "UnitPrice", aggregate: "sum" },
          { field: "UnitsInStock", aggregate: "sum" }
        ]});

      $scope.mainGridOptions = {
        height: 500,
        columns: [
          { field: "ProductName", title: "Product Name", width: 200,
            template: "{% raw %}{{ dataItem.ProductName }}{% endraw %}"
          },
          { field: "UnitPrice", title: "Unit Price", width: 80,
            footerTemplate: "{% raw %}{{ column.title }}{% endraw %} : {% raw %}{{ aggregate.sum | currency }}{% endraw %}",
            groupFooterTemplate:"{% raw %}{{ dataItem.UnitPrice.sum | currency }}{% endraw %}"
          },
          { field: "UnitsInStock", title: "Units In Stock", width: 80,
            aggregates: ["sum"],
            footerTemplate: "{% raw %}{{ column.title }}{% endraw %} : {% raw %}{{ aggregate.sum }}{% endraw %}",
            groupFooterTemplate: "{% raw %}{{ dataItem.UnitsInStock.sum }}{% endraw %}"
          }
        ]
      };
    });
  </script>
```

## Controlling Server Requests

To take full control on the logic that performs the request to the server, define the different transport operations as functions. Inside the function, you can use the `$http` or the `$.ajax` methods to perform what is needed. When done (inside the success callback), pass the result to the `success` function part of the events arguments object.

The following example demonstrates how to use `$http` to bind the Grid.

```dojo
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
                $http.jsonp('https://demos.telerik.com/kendo-ui/service/Products?callback=JSON_CALLBACK')
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

* [AngularJS Integration Overview]({% slug angularjs_integration_directives %})
* [Global Events]({% slug global_events_angularjs_directives %})
* [Directives with DataSource]({% slug datasource_updates_angularjs_directives %})
* [ng-* Directives in Widget Markup]({% slug ngrepeat_ngif_ngbind_support_angularjs %})
* [Memory Leaks]({% slug memory_leaks_angularjs_directives %})
* [How to Load View in Window]({% slug window_service_angularjs_directives %})
* [How to Nest Widgets]({% slug nest_widgets_angularjs_directives %})
* [Troubleshooting: Common Issues]({% slug common_issues_support_angularjs %})
* [Angular 2 Migration Guide](http://ngmigrate.telerik.com/)
