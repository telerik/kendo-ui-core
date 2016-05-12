---
title: AngularJS Integration
page_title: AngularJS Integration | AngularJS Directives"
description: "Learn more about the AngularJS integration of Kendo UI controls and find out how to use the widgets in AngularJS applications."
previous_url: /using-kendo-with-angularjs
slug: angularjs_integration_directives
position: 1
---

# AngularJS Integration

Read on below to learn about the integration between Kendo UI and AngularJS and visit our website [Developing with AngularJS?](http://www.telerik.com/kendo-ui/angularjs-and-kendo-ui-framework-integration "Developing with AngularJS?") page for more information.

## Overview

Kendo UI can be used seamlessly with AngularJS. The integration between both frameworks is baked-in via AngularJS directives for Kendo UI widgets, which are part of the product distribution and officially supported by our team. Thus, you can benefit from the features available in AngularJS (such as declarative data binding, routing, form validation, and others) and employ them when building up your project.

> **Important**
>
> AngularJS Kendo UI widget initialization is not designed to be combined with the Kendo UI server wrappers. Using wrappers is equivalent to [jQuery plugin syntax initialization](/intro/installation/jquery-initialization "Initialize a Widget Using jQuery Plug-in Syntax"). If you want to create Kendo UI widget instances with AngularJS, do not use server wrappers for these instances. Also, bear in mind that the two frameworks have some overlapping features, such as Angular binding and Kendo UI MVVM, which must not be mixed.

## AngularJS-Kendo UI Bindings

The AngularJS bindings are now integrated into Kendo UI. If you are using one of the bundles, such as `kendo.all.min.js`, then the required code is already there. If you load individual Kendo UI files, you need to also load `kendo.angular.js` (or `kendo.angular.min.js`). It must be loaded after `kendo.core`.

To activate the Angular bindings, load `angular.js` before you load Kendo UI. Therefore, load the scripts in the order shown below.

###### Example

    <script src="jquery.js"></script>
    <script src="angular.js"></script>
    <script src="kendo.all.js"></script>

Do not forget to load the Kendo UI stylesheets too. Next when creating your AngularJS application, declare dependency on `"kendo.directives"`, as showne below.

###### Example

    var app = angular.module("your-angular-app", [ "kendo.directives" ]);

### Widget Creation in AngularJS

The directives kick in on attributes like `kendo-widget-name`. Refer to the example below to get the `DatePicker` widget:

    <label>Birthday: <input kendo-date-picker /></label>

When AngularJS compiles the HTML, the Kendo UI directive will turn the `<input>` field into a nice date picker widget. As a shortcut, you can discard the dashes after `kendo-`:

    <input kendo-numerictextbox />

### Widget Options in HTML

You can specify any options supported by Kendo UI widgets in element attributes by converting the option name from camelCase to dash-separated-words, and prefixing it with `k-`.

> **Important**
> * A widget will not initialize if any of the defined attribute options are `undefined`. For instance, if the NumericTextBox `k-max` attribute points to a `$scope.maxNumber` field which is `undefined`, it will not initialize.
> * Kendo bindings will parse attributes without prefixes if they match the widget's options. For instance, the HTML5 `placeholder` attribute defined in the NumericTextBox element will be parsed as Angular expression, because the widget has a `placeholder` option. Because of this built-in functionality, you will need to ensure that the attribute has a valid Angular expression or a valid string value, rendered between `'` (single quote) characters.

#### Set Options As Attributes in AngularJS

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

Note an important detail in the example above: the strings `'Increment'` and `'Decrement'` are quoted inside the attribute values. Without the single quote inside they will be interpreted as variable names and Angular-Kendo will look for `$scope.Increment` and `$scope.Decrement` variables. Because omitting the quotes is a common error, Angular-Kendo will emit a warning in the JS console when such variables are not found.

#### Specify Options from Controller in AngularJS

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

#### Set array and object Options as attributes in AngularJS

You can use declarative attributes for `array` and `object` configuration options, too.

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

If you want to store the whole widget configuration in the `controller`, you can use the special `k-options` attribute.

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
> A widget will not initialize if any of the defined attribute options are `undefined`. For instance, if the NumericTextBox `k-max` attribute points to a `$scope.maxNumber` field which is `undefined`, it will not initialize.

### Template Directives

The data-bound container widgets may have their template options specified as nested directives. Refer to the example below to set templates via AngularJS directives.

###### Example

``` html
<div ng-app="app" ng-controller="MyCtrl">
  <div kendo-list-view k-data-source="source">
    <!-- the template (including the div tag itself) here will be assigned as a string to the `template` configuration option of the listview widget -->
    <div class="product" k-template>
        <img ng-src="http://demos.telerik.com/kendo-ui/content/web/foods/{{dataItem.ProductID}}.jpg" alt=" {{dataItem.ProductName}} image" />
        <h3>{{ dataItem.ProductName }}</h3>
        <p>{{ dataItem.UnitPrice | currency:"USD$":0 }}</p>
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

The following widgets support template directives:

* TreeMap&mdash;The widget supports the `k-template`.
* MobileListView&mdash;Supports the`k-header-template` and `k-template`.
* MobileScrollView&mdash;Supports the`k-empty-template` and `k-template`.
* Grid&mdash;Supports the`k-alt-row-template`, `k-detail-template`, and `k-row-template`.
* ListView&mdash;Supports the`k-edit-template`, `k-template`, and `k-alt-template`.
* Pager&mdash;Supports the`k-select-template` and `k-link-template`.
* PivotGrid&mdash;Supports the`k-column-header-template`, `k-data-cell-template`, and `k-row-header-template`.
* Scheduler&mdash;Supports the`k-all-day-event-template`, `k-date-header-template`, `k-event-template`, `k-major-time-header-template`, and `k-minor-time-header-template`.
* TreeView&mdash;Supports the`k-template`.
* Validator&mdash;Supports the`k-error-template`.

### Form Validation

AngularJS provides built-in form validation functionality, however `k-ng-model` does not update the internal [`$dirty` and `$pristine` properties](https://docs.angularjs.org/api/ng/type/form.FormController). That is why, in order to use `$dirty` and `$pristine` you should manually update them when the value of the widget changes. You may do it using `$watch`, as demonstrated in the example below.

###### Example

``` html
<div ng-app="app" ng-controller="MyCtrl">
   <form name="myForm">
     <input kendo-numeric-text-box="kntb2" k-min="0" k-max="100" k-ng-model="value2">
     <br><br>
     Dirty: {{myForm.$dirty}}
     <br />
     Pristine: {{myForm.$pristine}}
   </form>
</div>
<script>
  angular.module("app", [ "kendo.directives" ]).controller("MyCtrl", function($scope) {
   var watch = $scope.$watch('value2', function(newValue, oldValue){
      if(oldValue != newValue){
        $scope.myForm.$dirty = true;
        $scope.myForm.$pristine = false;
        watch();
      }
    })
  });
</script>
```

### Scope Bindings

#### Bind Values: ng-model

For all widgets which provide a `value()` method you can use the standard `ng-model` directive to bind their value into the AngularJS scope.

###### Example

```html
<div ng-app="app" ng-controller="MyCtrl">
  <label>Birthday: <input kendo-date-picker ng-model="birthday" /></label>
  <p>
    Your selection: {{ birthday }}
  </p>
</div>
<script>
angular.module("app", ["kendo.directives"]).controller("MyCtrl", function($scope) {
});
</script>
```

The input field is now bound to the scope variable. When you select a date, the `birthday` variable will be set to the input field's value (as a string).

#### Bind Values: k-ng-model

If your element is a form field like `<input>` or `<textarea>` (which has a text value), `ng-model` will bind the field contents, which is what most AngularJS users would expect. So, for the DatePicker example above, you would get a string date instead of a JavaScript Date object, in the scope.

If you need to get the actual `widget.value()` you can use `k-ng-model`.

###### Example

```html
<div ng-app="app" ng-controller="MyCtrl">
  <label>Birthday: <input kendo-date-picker k-ng-model="birthday" /></label>
  <p>
    Your selection: {{ birthday }}
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
> If you are using AngularJS, then you probably want to use Angular's own routing mechanism and data binding. Do not mix that with Kendo UI MVVM.

### The k-value-primitive Attribute

As of Kendo UI Q3 2014 (2014.3.1119) release, the `k-value-primitve` attribute has been introduced for DropDownList, ComboBox, MultiSelect, and AutoComplete widgets.

With this option you can set the widget to either use primitive or object values. It will work in a similar way to the `data-value-primitive` option in the [MVVM value binding](http://docs.telerik.com/kendo-ui/framework/mvvm/bindings/value#use-the-value-binding-with-a-select-widget-to-update-the-view-model-field-with-the-value-field-when-the-initial-value-is-null). By using this option you can always apply the `k-ng-model` attribute no matter if you are using primitive or non-primitive values. By default the attribute is set to `false`.

#### Set to False

Setting the `k-value-primitive` to `false` will force the widget to accept or return an object, or an array of objects, for the MultiSelect, holding the current value selected.

###### Example

```html
<div ng-app="app" ng-controller="MyCtrl">
    <h4>Select product</h4>
    <select kendo-multi-select k-options="selectOptions" k-ng-model="selectedIds" k-value-primitive="false"></select>
    <p ng-show="selectedIds.length"><br />Selected: {{ selectedIds }}</p>
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
Here the MultiSelect will display `Chai` as selected and the widget's value will be set to `[{"ProductName":"Chai","ProductID":1}]`.

#### Set to True

In this scenario, when `k-value-primitive` is set to `true`, you can pass an array of primitive values holding the IDs of the elements that you want to select.

###### Example

```html
<div ng-app="app" ng-controller="MyCtrl">
    <h4>Select product</h4>
    <select kendo-multi-select k-options="selectOptions" k-ng-model="selectedIds" k-value-primitive="true"></select>
    <p ng-show="selectedIds.length"><br />Selected: {{ selectedIds }}</p>
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

In this case the widget will display `Chai` and `Mishi Kobe Niku` as selected and the widget's value will be set to `[1,9]`.

### Event Handlers

#### Set Handlers via Widget Configuration Options

If you store the whole configuration in the `controller`, then you can add an event handler in the same way as you would do with plain Kendo UI.

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

The sample above includes a paragraph that is using Angular's `ng-show` directive and will be displayed only after a month was picked. Note that in the event handler `$scope.$digest()` had to be called to make this trick work.

#### Set Handlers via k-on Attribute

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

Note that the `kendoEvent` variable will be defined in scope and you must pass it to the event handler. If you are using the `k-on-` attributes, you do not need to call `$digest()` on the scope. Your bindings take care of it.

#### Special Change Event on Some Widgets

The Grid, TreeView, and ListView widgets will evaluate handlers defined with `k-on-change` in a scope, containing additional information about the selected items, as local variables. The following locals are defined:

- `selected` (jQuery object)&mdash;The selected elements.
- `data` (array or data item)&mdash;The selected data models. It will be an array when a multiple selection is enabled, or a single item otherwise.
- `dataItem`&mdash;When multiple selection is not enabled, this is provided for consistency and will be the same item as `data`.
- `angularDataItem`&mdash;When multiple selection is not enabled, this is the `dataItem` object that has its properties wrapped with getter/setters.
- `columns`&mdash;For the Grid, when the cell selection is enabled, it will be an array with zero-based column indexes for the selected columns. Also, in this case, the `selected` object will contain the respective `<td>` elements instead of the `<tr>` ones.

The `kendoEvent` is available as well.

### Widget Update upon Option Changes

You can update a widget from `controller`. Use the special `k-rebind` attribute to create a widget which automatically updates when some scope variable changes. This option will destroy the original widget and will recreate it using the changed options.

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

To watch multiple options for change, use `k-options` and pass the same variable to `k-rebind`, as shown below.

> **Important**
>
> This approach is not suitable for `dataBound` widgets, because those widgets will be recreated on each change of their data&mdash;for example, after Grid paging.

###### Example

    <ul kendo-menu k-options="menuOptions" k-rebind="menuOptions"> ... </ul>

### State Changes

Kendo UI Q1 2015 release intorduced support for `k-ng-disabled` and `k-ng-readonly` directives. By using them, you can change the `disabled` or `readonly` state of the widget based on a scope variable.

`k-ng-disabled` is supported by all widgets containing an `enabled` method, except the PanelBar and Menu widget. `k-ng-readonly` is supported by all widgets containing a `readonly` method.

#### Change Disabled State

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

#### Change Readonly State

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

It is sometimes useful to postpone creating a widget until after some asynchronously-loaded data is available. For example, you would need this feature to initialize a Grid widget when you load the column definitions from the server as the Grid does not support re-defining columns after the widget is instantiated.

#### Use k-ng-delay Attribute

You can use the special `k-ng-delay` attribute to delay the initialization of a widget.

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

The grid will be created only when the `gridOptions` variable becomes available.

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

Sometimes you might need a reference to a widget in order to call methods on it from your controller. To get one, just assign a name to the `kendo-widget-name` attribute.

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

As of Kendo UI Q1 2015 release, if you use the tag directive variant, you can set the `k-scope-field` to achieve the same.

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

As of Kendo UI Q2 2015 release, the timeout initialization of the widgets has been removed. To set the options of a widget as part of the link function of a custom directive, use `k-ng-delay` and `timeout`.

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

AngularJS will create a new scope for the content placed in a window. This is due to the dynamic scoping behavior of the framework. A widget placed in the window or popup will loose its connection to the parent scope and hence it will not handle any changes to the parent scope.

#### Get AngularJS Scope Attached to Pop-Up Window

The available workaround is to either access the widget directly, using its jQuery object, or to access the newly created child scope. Basically, you will need to find the window or popup element and get the scope from it.

###### Example

````html
<div id="example" ng-app="KendoDemos">
    <div class="demo-section k-header" ng-controller="MyCtrl">
        <div kendo-window="wnd"></div>
    </div>
</div>
<script>
    angular.module("KendoDemos", [ "kendo.directives" ])
    .controller("MyCtrl", function($scope){
      $scope.$on("kendoRendered", function(e) {
        //retrieve the child scope from the window element
        var childScope = angular.element($scope.wnd.element).scope();
      });
    });
</script>
````

#### Use Separate Controller to Resolve Window Scopes

The best solution in this case would be for you to use a separate `controller` that will handle the scope of the window.

###### Example

````html
<div ng-controller="Host">
  <div class="demo-section k-content">

    <div kendo-window="editPopup" k-modal="true" k-title="'popupTitle'" k-width="300"
           k-resizable="false" k-height="200" k-visible="false">

        <div ng-controller="Popup">
          <span>Selected: {{dataview.DataSourceID}} </span>
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

Since the Kendo UI 2015 Q2 release when the widget's `k-options` is bound to a non-existing object, the widget is not initialized and fails silently. This is caused by a change introduced to accommodate the AngularJS router implementation, which makes the widget wait for the options object to be set.

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
