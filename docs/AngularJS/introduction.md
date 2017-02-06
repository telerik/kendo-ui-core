---
title: AngularJS Integration
page_title: AngularJS Integration | AngularJS Directives"
description: "Learn more about the AngularJS integration of Kendo UI controls and find out how to use the widgets in AngularJS applications."
previous_url: /using-kendo-with-angularjs
slug: angularjs_integration_directives
position: 1
---

# AngularJS Integration

This article demonstrates the approach through which Kendo UI and AngularJS are integrated.

For more information, visit the website page on [developing with AngularJS](http://www.telerik.com/kendo-ui/angularjs-and-kendo-ui-framework-integration "Developing with AngularJS?").

## Overview

Kendo UI is seamlessly used with AngularJS. It is possible to integrate the two frameworks through the AngularJS directives for Kendo UI widgets. These directives are part of the product distribution and are officially supported by the Kendo UI team. In this way, you benefit from the features available in AngularJS, such as declarative data binding, routing, form validation, and others, and employ them when building up your project.

> **Important**
>
> The initialization of Kendo UI widgets in AngularJS projects is not designed to be combined with the Kendo UI server wrappers. Using wrappers is equivalent to [jQuery plugin syntax initialization](/intro/installation/jquery-initialization "Initialize a Widget Using jQuery Plug-in Syntax"). To create Kendo UI widget instances with AngularJS, do not use server wrappers for these instances. Also, the two frameworks have some overlapping features, such as Angular binding and Kendo UI MVVM, which must not be mixed.

## AngularJS-Kendo UI Bindings

The AngularJS bindings are now integrated into Kendo UI. If you are using one of the bundles, such as `kendo.all.min.js`, the required code is already there. If you load individual Kendo UI files, also load `kendo.angular.js` or `kendo.angular.min.js`. It has to be loaded after `kendo.core.js`.

To activate the Angular bindings, load `angular.js` before you load Kendo UI and load the scripts in the following order.

###### Example

    <script src="jquery.js"></script>
    <script src="angular.js"></script>
    <script src="kendo.all.js"></script>

Remember to load the Kendo UI stylesheets too. Next, when creating your AngularJS application, declare a dependency on `"kendo.directives"` as shown below.

###### Example

    var app = angular.module("your-angular-app", [ "kendo.directives" ]);

### Widget Creation in AngularJS

The directives start to operate on attributes like `kendo-widget-name`.

The example below demonstrates how to get the `DatePicker` widget.

###### Example

    <label>Birthday: <input kendo-date-picker /></label>

When AngularJS compiles the HTML, the Kendo UI directive turn the `<input>` field into a nice DatePicker widget.

The example below demonstrates how to discard the dashes after `kendo-` as a shortcut approach.

###### Example

    <input kendo-numerictextbox />

### Widget Options in HTML

It is possible for you to specify any options supported by Kendo UI widgets in `element` attributes by converting the option name from camelCase to dash-separated-words and prefixing it with a `k-`.

> **Important**
> * If any of the defined attribute options are `undefined`, the widget will not initialize. For example, if the NumericTextBox `k-max` attribute points to a `$scope.maxNumber` field which is `undefined`, it will not initialize.
> * If the attributes match the widget options, Kendo UI bindings parse them without prefixes. For example, the HTML5 `placeholder` attribute defined in the NumericTextBox element will be parsed as an Angular expression, because the widget has a `placeholder` option. Because of this built-in functionality, ensure that the attribute has a valid Angular expression or a valid string value, rendered between `'` (single quote) characters.

#### Set Options as Attributes in AngularJS

The example below demonstrates an important detail&mdash;the `'Increment'` and `'Decrement'` strings are quoted inside the attribute values. Without the single quote inside they are interpreted as variable names and AngularJS-Kendo UI will look for the `$scope.Increment` and `$scope.Decrement` variables. The omission of the quotes is a common error&mdash;that is why AngularJS-Kendo UI emit a warning in the JS console whenever such variables are not found.

###### Example

```html
    <div ng-app="app" ng-controller="MyCtrl">
        <input kendo-numerictextbox k-min="1" k-max="10" k-up-arrow-text="'Increment'" k-down-arrow-text="'Decrement'">
    </div>
    <script>
    angular.module("app", ["kendo.directives"]).controller("MyCtrl", function($scope) {
    });
    </script>
```

#### Specify Options from Controller in AngularJS

The example below demonstrates how to specify options form the `controller` in AngularJS projects.

###### Example

```html
    <div ng-app="app" ng-controller="MyCtrl">
        <input kendo-numerictextbox k-min="1" k-max="10" k-up-arrow-text="textUp" k-down-arrow-text="textDown">
    </div>
    <script>
    angular.module("app", ["kendo.directives"]).controller("MyCtrl", function($scope) {
        $scope.textUp = "Increment";
        $scope.textDown = "Decrement";
    });
    </script>
```

#### Set Array and Object Options as Attributes in AngularJS

The example below demonstrates how to use declarative attributes for the `array` and `object` configuration options too.

###### Example

```html
    <div ng-app="app" ng-controller="MyCtrl">
        <textarea kendo-editor
                  k-tools="[
                      'bold',
                      'italic',
                      'undeline',
                      {
                        name: 'foreColor',
                        palette: [ '#f00', '#0f0', '#00f' ]
                      }
                  ]"></textarea>
    </div>
    <script>
    angular.module("app", ["kendo.directives"]).controller("MyCtrl", function($scope) {
    });
    </script>
```

### Widget Configuration in Controller

The example below demonstrates how to store the whole widget configuration in the `controller` by using the special `k-options` attribute.

###### Example

```html
    <div ng-app="app" ng-controller="MyCtrl">
        <input kendo-date-picker k-options="monthPickerConfig">
    </div>
    <script>
    angular.module("app", ["kendo.directives"]).controller("MyCtrl", function($scope) {
        $scope.monthPickerConfig = {
          start  : "year",
          depth  : "year",
          format : "MMMM yyyy"
        };
    });
    </script>
```

> **Important**
>
> If any of the defined attribute options are `undefined`, the widget will not initialize. For example, if the NumericTextBox `k-max` attribute points to a `$scope.maxNumber` field which is `undefined`, it will not initialize.

### Template Directives

The data-bound container widgets may have their template options specified as nested directives.

The example below demonstrates how to set templates through the AngularJS directives.

###### Example

``` html
    <div ng-app="app" ng-controller="MyCtrl">
      <div kendo-list-view k-data-source="source">
        <!-- the template (including the div tag itself) here will be assigned as a string to the `template` configuration option of the listview widget -->
        <div class="product" k-template>
            <img ng-src="http://demos.telerik.com/kendo-ui/content/web/foods/{% raw %}{{dataItem.ProductID}}{% endraw %}.jpg" alt="{% raw %}{{dataItem.ProductName}}{% endraw %} image" />
            <h3>{% raw %}{{ dataItem.ProductName }}{% endraw %}</h3>
            <p>{% raw %}{{ dataItem.UnitPrice | currency:"USD$":0 }}{% endraw %}</p>
        </div>
      </div>
    </div>
    <script>
    angular.module("app", ["kendo.directives"]).controller("MyCtrl", function($scope) {
       $scope.source = new kendo.data.DataSource({
         transport: {
           read: {
             url: "http://demos.telerik.com/kendo-ui/service/products",
             dataType: "jsonp"
           }
         },
         pageSize: 21
      });
    });
    </script>
```

The following table provides information on the template directives that are supported by the Kendo UI widgets.

|WIDGET           |SUPPORTED TEMPLATE DIRECTIVES |
|:---             |:---                         |
|TreeMap          |`k-template`                 |
|MobileListView   |`k-header-template` and `k-template` |
|MobileScrollView |`k-empty-template` and `k-template`  |
|Grid             |`k-alt-row-template`, `k-detail-template`, and `k-row-template` |
|ListView         |`k-edit-template`, `k-template`, and `k-alt-template` |
|Pager            |`k-select-template` and `k-link-template` |
|PivotGrid        |`k-column-header-template`, `k-data-cell-template`, and `k-row-header-template` |
|Scheduler        |`k-all-day-event-template`, `k-date-header-template`, `k-event-template`, `k-major-time-header-template`, and `k-minor-time-header-template` |
|TreeView         |`k-template`                 |
|Validator        |`k-error-template`           |

### Scope Bindings

#### Bind Values: ng-model

To bind the value of widgets that provide a `value()` method to the AngularJS scope, use the standard `ng-model` directive.

###### Example

```html
    <div ng-app="app" ng-controller="MyCtrl">
      <label>Birthday: <input kendo-date-picker ng-model="birthday" /></label>
      <p>
        Your selection: {% raw %}{{ birthday }}{% endraw %}
      </p>  
    </div>
    <script>
    angular.module("app", ["kendo.directives"]).controller("MyCtrl", function($scope) {
    });
    </script>
```

The input field is now bound to the scope variable. When you select a date, the `birthday` variable is set to the value of the input field as a string.

#### Bind Values: k-ng-model

If your element is a form field that has a text value, such as `<input>` or `<textarea>`, `ng-model` binds the field contents. So, for the DatePicker example above, you get a string date instead of a JavaScript Date object in the scope.

The example below demonstrates how to get the actual `widget.value()` by using `k-ng-model`.

###### Example

```html
    <div ng-app="app" ng-controller="MyCtrl">
      <label>Birthday: <input kendo-date-picker k-ng-model="birthday" /></label>
      <p>
        Your selection: {% raw %}{{ birthday }}{% endraw %}
      </p>
    </div>
    <script>
    angular.module("app", ["kendo.directives"]).controller("MyCtrl", function($scope) {
    });
    </script>
```

The directive will update the `birthday` variable with the selected `Date` object whenever the `change` event occurs on the widget.

> **Important**
>
> If you are using AngularJS, it is convenient to apply the Angular's own routing mechanism and data binding. However, do not mix these with the Kendo UI MVVM.

### The k-value-primitive Attribute

As of the Kendo UI Q3 2014 (2014.3.1119) release, the `k-value-primitve` attribute has been introduced for the DropDownList, ComboBox, MultiSelect, and AutoComplete widgets.

The `k-value-primitve` option enables you to set the widget to either use primitive or object values. It works in a similar way as the `data-value-primitive` option in the [MVVM value binding]({% slug valuebinding_mvvm_kendoui %}#use-the-value-binding-with-a-select-widget-to-update-the-view-model-field-with-the-value-field-when-the-initial-value-is-null). By using this option you can always apply the `k-ng-model` attribute no matter if you are using primitive or non-primitive values. By default, the attribute is set to `false`.

#### Set to false

Setting the `k-value-primitive` to `false` forces the widget to accept or return an object or an array of objects for the MultiSelect holding the current value selected.

The example below demonstrates that the MultiSelect displays `Chai` as selected and that the value of the widget is set to `[{"ProductName":"Chai","ProductID":1}]`.

###### Example

```html
    <div ng-app="app" ng-controller="MyCtrl">
        <h4>Select product</h4>
        <select kendo-multi-select k-options="selectOptions" k-ng-model="selectedIds" k-value-primitive="false"></select>
        <p ng-show="selectedIds.length"><br />Selected: {% raw %}{{ selectedIds }}{% endraw %}</p>
    </div>
    <script>
      angular.module("app", [ "kendo.directives" ]).controller("MyCtrl", function($scope){
        $scope.selectOptions = {
          placeholder: "Select products...",
          dataTextField: "ProductName",
          dataValueField: "ProductID",
          dataSource: {
            transport: {
              read: {
                url: "http://demos.telerik.com/kendo-ui/service/products",
                dataType: "jsonp"
              }
            }
          }
        };
        $scope.selectedIds = [ {ProductName: "Chai", ProductID: 1} ];
      })
    </script>
```

#### Set to true

In this scenario, when `k-value-primitive` is set to `true`, you can pass an array of primitive values holding the IDs of the elements that you want to select.

###### Example

```html
    <div ng-app="app" ng-controller="MyCtrl">
        <h4>Select product</h4>
        <select kendo-multi-select k-options="selectOptions" k-ng-model="selectedIds" k-value-primitive="true"></select>
        <p ng-show="selectedIds.length"><br />Selected: {% raw %}{{ selectedIds }}{% endraw %}</p>
    </div>
    <script>
      angular.module("app", [ "kendo.directives" ]).controller("MyCtrl", function($scope){
        $scope.selectOptions = {
          placeholder: "Select products...",
          dataTextField: "ProductName",
          dataValueField: "ProductID",
          dataSource: {
            transport: {
              read: {
                url: "http://demos.telerik.com/kendo-ui/service/products",
                dataType: "jsonp"
              }
            }
          }
        };
        $scope.selectedIds = [1, 9] ;
      })
    </script>
```

In this case the widget displays `Chai` and `Mishi Kobe Niku` as selected and the value of the widget is set to `[1,9]`.

### Event Handlers

#### Set Handlers through Widget Configuration Options

If you store the whole configuration in the `controller`, add an event handler in the same way as with plain Kendo UI.

###### Example

```html
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

The sample above includes a paragraph that is using the Angular's `ng-show` directive and is displayed only after a month was picked. The `$scope.$digest()` event handler had to be called to make this approach work.

#### Set Handlers through k-on Attribute

It is possible to specify event handlers using attributes as well. They require the `k-on-` prefix.

###### Example

```html
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

The `kendoEvent` variable is defined in a scope and you have to pass it to the event handler. If you are using the `k-on-` attributes, you do not need to call `$digest()` on the scope because your bindings take care of it.

#### Special Change Event on Some Widgets

The Grid, TreeView, and ListView widgets evaluate handlers defined with `k-on-change` in a scope containing additional information about the selected items as local variables.

The following locals are defined:
- `selected` (jQuery object)&mdash;The selected elements.
- `data` (array or data item)&mdash;The selected data models. It will be an array when a multiple selection is enabled, or a single item otherwise.
- `dataItem`&mdash;When multiple selection is not enabled, this is provided for consistency and will be the same item as `data`.
- `angularDataItem`&mdash;When multiple selection is not enabled, this is the `dataItem` object that has its properties wrapped with getter/setters.
- `columns`&mdash;For the Grid, when the cell selection is enabled, it will be an array with zero-based column indexes for the selected columns. Also, in this case, the `selected` object will contain the respective `<td>` elements instead of the `<tr>` ones.

The `kendoEvent` is available as well.

The following example demonstrates how to use some of these local variables.

###### Example

```html
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
              read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Employees"
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

### Widget Update upon Option Changes

To create a widget that automatically updates when some of the scope variables changes, update the widget from `controller` by using the special `k-rebind` attribute. This option destroys the original widget and recreates it using the changed option.

###### Example

```html
    <div ng-app="app" ng-controller="MyCtrl">
      <ul kendo-menu k-orientation="orientation" k-rebind="orientation">
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
      <select kendo-drop-down-list ng-model="orientation">
        <option>horizontal</option>
        <option>vertical</option>
      </select>
    </div>
    <script>
      angular.module("app", [ "kendo.directives" ]).controller("MyCtrl", function($scope) {
        $scope.orientation = "horizontal";
      });
    </script>
```

The example below demonstrates how to use `k-options` and pass the same variable to `k-rebind` when watching multiple options for changes, .

> **Important**
>
> This approach is not suitable for `dataBound` widgets because those widgets are recreated on each change of their data&mdash;for example, after paging of the Grid.

###### Example

    <ul kendo-menu k-options="menuOptions" k-rebind="menuOptions"> ... </ul>

### State Changes

The Kendo UI Q1 2015 release introduces support for the `k-ng-disabled` and `k-ng-readonly` directives. By using them, you can change the `disabled` or `readonly` state of the widget based on a scope variable.

All widgets that contain the `enabled` method, except for the PanelBar and the Menu, support the `k-ng-disabled` directive.

All widgets that contain the `readonly` method support the `k-ng-readonly` directive.

#### Change the Disabled State

###### Example

```html
    <div id="example" ng-app="KendoDemos">
      <div class="demo-section k-content" ng-controller="MyCtrl">
        <select id="customers"
                kendo-drop-down-list
                k-ng-disabled = "isDisabled"
                k-options="customOptions"></select>
      </div>
    </div>

    <script>
      angular.module("KendoDemos", [ "kendo.directives" ])
      .controller("MyCtrl", function($scope){
        $scope.isDisabled = true;
        $scope.customOptions = {
          dataSource: {
            transport: {
              read: {
                dataType: "jsonp",
                url: "http://demos.telerik.com/kendo-ui/service/Customers",
              }
            }
          },
          dataTextField: "ContactName",
          dataValueField: "CustomerID"
        };
      })
    </script>
```

#### Change the Readonly State

###### Example

```html
    <div id="example" ng-app="KendoDemos">
      <div class="demo-section k-content" ng-controller="MyCtrl">
        <select id="customers"
                kendo-drop-down-list
                k-ng-readonly = "isReadonly"
                k-options="customOptions"></select>
      </div>
    </div>

    <script>
      angular.module("KendoDemos", [ "kendo.directives" ])
      .controller("MyCtrl", function($scope){
        $scope.isReadonly = true;
        $scope.customOptions = {
          dataSource: {
            transport: {
              read: {
                dataType: "jsonp",
                url: "http://demos.telerik.com/kendo-ui/service/Customers",
              }
            }
          },
          dataTextField: "ContactName",
          dataValueField: "CustomerID"
        };
      })
    </script>
```

### Delay Widget Initialization

In particular scenarios it is useful to postpone the creation of a widget until some asynchronously loaded data becomes available. For example, initializing a Grid when you load the column definitions from the server as the Grid does not support re-defining columns after the widget is instantiated.

#### Use k-ng-delay Attribute

To delay the initialization of a widget, use the special `k-ng-delay` attribute.

The example below demonstrates that the Grid is created only when the `gridOptions` variable becomes available.

###### Example

    // in controller
    $http({ method: "GET", url: "customers.json" })
      .success(function(result){
        var dataSource = new kendo.data.DataSource({
          data: result.data
        });
        $scope.gridOptions = {
          dataSource: data,
          columns: result.columns,
          ...
        };
      });

    <!-- in HTML: -->
    <div kendo-grid k-options="gridOptions" k-ng-delay="gridOptions"></div>

#### Use HTTP Call

You can load the widget data with a `$http` call and initialize the widget when the data is available.

###### Example

```html
<div ng-app="app" ng-controller="MyCtrl">
  <select kendo-drop-down-list k-options="customOptions" k-ng-delay="customOptions.dataSource"></select>
</div>
<script>
  angular.module("app", [ "kendo.directives" ]).controller("MyCtrl", function($scope, $http) {
    $http({method: "GET", url: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"})
      .success(function(result){
        $scope.customOptions.dataSource = new kendo.data.DataSource({
          data: result.d
        });
      });
    $scope.customOptions = {
      dataTextField: "ProductName",
      dataValueField: "ProductID"
    };
  });
</script>
```

### Widget References

#### Get Instances in Controller

To call methods on a widget from your controller, you might sometimes need a reference to the widget. To get such, assign a name to the `kendo-widget-name` attribute.

###### Example

```html
<div ng-app="app" ng-controller="MyCtrl">
  <input kendo-datepicker="datePicker" k-on-change="onChange()">
</div>
<script>
  angular.module("app", [ "kendo.directives" ]).controller("MyCtrl", function($scope) {
    $scope.onChange = function() {
     alert($scope.datePicker.value());
    };
  });
</script>
```

#### Get Instances in Controller: Tag Directive

As of the Kendo UI Q1 2015 release, if you use the tag directive variant, you can set the `k-scope-field` to achieve the same.

###### Example

```html
    <div ng-app="app" ng-controller="MyCtrl">
      <kendo-date-picker k-scope-field="datePicker" k-on-change="onChange()"></kendo-date-picker>
    </div>
    <script>
      angular.module("app", [ "kendo.directives" ]).controller("MyCtrl", function($scope) {
        $scope.onChange = function() {
         alert($scope.datePicker.value());
        };
      });
    </script>
```

#### Set Options in Link Function

As of the Kendo UI Q2 2015 release, the timeout initialization of the widgets is removed.

To set the options of a widget as part of the link function of a custom directive, use `k-ng-delay` and `timeout`.

###### Example

````html
    <div id="example" ng-app="KendoDemos">
        <div class="demo-section k-header" ng-controller="MyCtrl">
            <my-custom-directive />
        </div>
    </div>
    <script>
        angular.module("KendoDemos", [ "kendo.directives" ])
            .directive('myCustomDirective', function($timeout) {
                return {
                    template: '<input kendo-auto-complete k-options="options" k-ng-delay="options" style="width: 100%;" />',
                    link: function (scope) {
                    $timeout(function() {
                        scope.options = { placeholder: 'placeholder text here'};
                    })
                }
            };
        })
        .controller("MyCtrl", function($scope){});
    </script>
````

### Widgets Placed in Window

AngularJS creates a new scope for the content placed in a window. The reason for this behavior is the dynamic scoping of the framework. A widget placed in the window or popup loses its connection to the parent scope and does not handle any changes to the parent scope.

#### Get AngularJS Scope Attached to Pop-Up Window

The available workaround is either:

* To use the [`appendTo`](http://docs.telerik.com/kendo-ui/api/javascript/ui/window#configuration-appendTo) option to append the window to another HTML element which is part of the Angular application and scope, or
* To initialize the AngularJS application on the body.

The following example demonstrates the first approach and it shows how to find the window or popup element and get the scope from it.

###### Example

````html
    <div id="example" ng-app="KendoDemos">
        <div class="demo-section k-header" ng-controller="MyCtrl">
            <div kendo-window="wnd" k-append-to="'#example'"></div>
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
````

#### Use Separate Controller to Resolve Window Scopes

The example below demonstrates the best solution in this case&mdash;to use a separate `controller` that handles the scope of the window.

###### Example

````html
    <div ng-controller="Host">
      <div class="demo-section k-content">

        <div kendo-window="editPopup" k-modal="true" k-title="'popupTitle'" k-width="300"
               k-resizable="false" k-height="200" k-visible="false">

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

    </div>
````

## Known Limitations

As of the Kendo UI 2015 Q2 release, if the widget's `k-options` is bound to a non-existing object, the widget is not initialized. This is caused by a change introduced to accommodate the AngularJS router implementation which causes the widget to wait for the options object to be set.

## See Also

Other articles on AngularJS directives and integration with Kendo UI:

* [Global Events]({% slug global_events_angularjs_directives %})
* [Grid Settings]({% slug grid_settings_angularjs_directives %})
* [Directives with DataSource]({% slug datasource_updates_angularjs_directives %})
* [ng-* Directives in Widget Markup]({% slug ngrepeat_ngif_ngbind_support_angularjs %})
* [Memory Leaks]({% slug memory_leaks_angularjs_directives %})
* [How to Load View in Window]({% slug window_service_angularjs_directives %})
* [How to Nest Widgets]({% slug nest_widgets_angularjs_directives %})
* [Troubleshooting: Common Issues]({% slug common_issues_support_angularjs %})
* [Angular 2 Migration Guide](http://ngmigrate.telerik.com/)
