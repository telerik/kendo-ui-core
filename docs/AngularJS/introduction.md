---
title: Using Kendo with AngularJS
description: How to use Kendo UI widgets in AngularJS applications
previous_url: /using-kendo-with-angularjs
position: 1
---

{% raw %}

# Using Kendo with AngularJS

Kendo UI can be used seamlessly with AngularJS. The two frameworks have some overlapping features though.
If you are using AngularJS then you probably want to use Angular's own routing mechanism and data binding. Do not mix that with Kendo MVVM.

- [Creating widgets the Angular way](#creating-widgets-the-angular-way)
- [Widget options in HTML](#widget-options-in-html)
- [Widget configuration in controller](#widget-configuration-in-controller)
- [Template Directives](#template-directives)
- [Form validation](#form-validation)
- [Scope bindings (`ng-model`)](#scope-bindings-ng-model)
- [Scope bindings (`k-ng-model`)](#scope-bindings-k-ng-model)
- [The k-value-primitive attribute](#the-k-value-primitive-attribute)
- [Event handlers](#event-handlers)
- [Updating widgets when options change](#updating-widgets-when-options-change)
- [Change widget state using k-ng-disbaled and k-ng-readonly](#change-widget-state-using-k-ng-disbaled-and-k-ng-readonly)
- [Delaying widget initialization](#delaying-widget-initialization)
- [Getting widget references](#getting-widget-references)

> AngularJS Kendo UI widget initialization is not designed to be combined with the Kendo UI server wrappers.
Using wrappers is equivalent to [jQuery plugin syntax initialization](/basics/jquery-initialization).
If you want to create Kendo UI widget instances with AngularJS, then do not use server wrappers for these instances.

## Using Angular-Kendo bindings

The Angular bindings are now integrated into Kendo UI.  If you're using one of the bundles (such as `kendo.all.min.js`) then the required code is already there.  If you load individual Kendo UI files, you need to also load `kendo.angular.js` (or `kendo.angular.min.js`).  It must be loaded after `kendo.core`.

In order for the Angular bindings to be activated, you must load `angular.js` _before_ Kendo.

Therefore, load the scripts in this order:

    <script src="jquery.js"></script>
    <script src="angular.js"></script>
    <script src="kendo.all.js"></script>

Don't forget to load the Kendo UI stylesheets too.

Next, when creating your AngularJS application you must declare dependency on "kendo.directives":

    var app = angular.module("your-angular-app", [ "kendo.directives" ]);

### Creating widgets the Angular way

The directives kick in on attributes like `kendo-widget-name`.  For example to get a `DatePicker` widget, you'd write the following:

    <label>Birthday: <input kendo-date-picker /></label>

When AngularJS compiles the HTML, the Kendo UI directive will turn the `<input>` field into a nice date picker widget.

As a shortcut, you can discard the dashes after `kendo-`:

    <input kendo-numerictextbox />

### Widget options in HTML

You can specify any options supported by Kendo UI widgets in element attributes, by converting the option name from camelCase to dash-separated-words, and prefixing it with `k-`.  For example:

> Important: Kendo bindings will parse attributes without **prefixes** if they match widget's options. For instance, the HTML5 `placeholder` attribute defined in the `NumericTextBox` element will be parsed as Angular expression,
because the widget has a placeholder option. Because of this built-in functionality, you will need to ensure that attribute has a valid Angular expression or a valid string value, quoted with `'` characters.

#### Set Kendo UI widget options as attributes in AngularJS

```html
<div ng-app="app" ng-controller="MyCtrl">
    <input kendo-numerictextbox k-min="1" k-max="10" k-up-arrow-text="'Increment'" k-down-arrow-text="'Decrement'">
</div>
<script>
angular.module("app", ["kendo.directives"]).controller("MyCtrl", function($scope) {
});
</script>
```

Notice an important detail in the example above: the strings `'Increment'` and `'Decrement'` are quoted inside the attribute values.  Without the single inside they will be interpreted as variable names and Angular-Kendo will look for `$scope.Increment` and `$scope.Decrement` variables.  Because omitting the quotes is a common error, Angular-Kendo will emit a warning in the JS console when such variables are not found.

#### Set specific Kendo UI widget options from controller in AngularJS
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

You can use declarative attributes for array and object configuration options, too.

#### Set Kendo UI widget array and object options as attributes in AngularJS

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
### Widget configuration in controller

If you'd like to store all widget configuration in the controller, you can use the special `k-options` attribute:

#### Configure Kendo UI Widget from controller in AngularJS

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

### Template Directives

The data-bound container widgets may have their template options specified as nested directives.

#### Set Kendo UI templates via AngularJS directives
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

The following widgets support template directives

* TreeMap -  `k-template`,
* MobileListView -  `k-header-template`, `k-template`
* MobileScrollView -  `k-empty-template`, `k-template`
* Grid -  `k-alt-row-template`, `k-detail-template`, `k-row-template`
* ListView -  `k-edit-template`, `k-template`, `k-alt-template`
* Pager -  `k-select-template`, `k-link-template`
* PivotGrid -  `k-column-header-template`, `k-data-cell-template`, `k-row-header-template`
* Scheduler -  `k-all-day-event-template`, `k-date-header-template`, `k-event-template`, `k-major-time-header-template`, `k-minor-time-header-template`
* TreeView -  `k-template`,
* Validator -  `k-error-template`

### Form validation

AngularJS provides built-in form validation functionality, however `k-ng-model` does not update the internal [$dirty and $pristine properties](https://docs.angularjs.org/api/ng/type/form.FormController). This is why in order to use $dirty and $pristine you should manually update them when the value of the widget changes. You may do it using $watch like this:

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

### Scope bindings (`ng-model`)

For all widgets which provide a `value()` method you can use the standard `ng-model` directive to bind their value into the AngularJS scope.  Example:

#### Bind the widget value via ng-model

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

The input field is now bound to the scope variable.  When you select a date, the `birthday` variable will be set to the input field's value (as a string).

### Scope bindings (`k-ng-model`)

If your element is a form field like `<input>` or `<textarea>` (which has a text value), the `ng-model` will bind the field contents, which is what most AngularJS users would expect.  So for the DatePicker example above, you would get a string date, instead of a JavaScript Date object, in the scope.

If you need to get the actual `widget.value()` you can use `k-ng-model`:

#### Bind the widget value via k-ng-model

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

### The k-value-primitive attribute

Starting with the 2014.3.1119 release the `k-value-primitve` attribue has been introduced for DropDownList, ComboBox, MultiSelect and AutoComplete widgets.

With this option you can set the widget to either use primitive or object values. It will work in a similar way to `data-value-primitive` option in the [MVVM value binding](http://docs.telerik.com/kendo-ui/framework/mvvm/bindings/value#use-the-value-binding-with-a-select-widget-to-update-the-view-model-field-with-the-value-field-when-the-initial-value-is-null).

Using this option you can always use the `k-ng-model` attribute no matter if you are using primitive or non-primitive values. By default the attribute is set to false.

Setting the `k-value-primitive` to `false` will force the widget to accept/return an object, or an array of objects for the MultiSelect, holding the current value selected. Here is an example:

### Set k-value-primitive to false
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
Here the MultiSelect will display `Chai` as selected and the widget's value will be set to `[{"ProductName":"Chai","ProductID":1}]`

In the other scenario, when `k-value-primitive` is set to true you can pass an array of primitive values holding the ID's of the elements that you want to select:

### Set k-value-primitive to true
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

In this case the widget will display `Chai` and `Mishi Kobe Niku` as selected and the widget's value will be set to `[1,9]`

### Event handlers

If you store the whole configuration in the controller, then adding an event handler is done the same you would do with plain Kendo UI:

#### Set event handler via the widget configuration options

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

The sample above includes a paragraph that's using Angular's `ng-show` directive and will be displayed only after a month was picked.  Notice in the event handler that we had to call `$scope.$digest()` in order for this trick to work.

It is possible to specify event handlers using attributes as well. They require the `k-on-` prefix:

#### Set event handler via k-on attribute

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
Notice that the `kendoEvent` variable will be defined in scope and we must pass it to the event handler.  If we are using the `k-on-` attributes, there is no need to call `$digest()` on the scope (it's taken care of by our bindings).

#### Special `"change"` event on certain widgets

The Grid, TreeView and ListView widgets will evaluate handlers defined with `k-on-change` in a scope containing additional information about the selected item(s), as local variables.  The following locals are defined:

- `selected` (jQuery object) -- the selected elements

- `data` (array or data item) -- the selected data model(s).  It will be an array when multiple selection is enabled, or a single item otherwise.

- `dataItem` -- when multiple selection is not enabled, this is provided for consistency and will be the same item as `data`.

- `columns` -- for the Grid, when cell selection is enabled, it will be an array with zero-based column indexes for the selected columns. Also in this case the `selected` object will contain the respective `<td>` elements, instead of `<tr>`-s.

The `kendoEvent` is available as well.

### Updating widgets when options change

You can use the special `k-rebind` attribute to create a widget which automatically updates when some scope variable changes. This option will destroy the original widget, and will recreate it using the changed options.

#### Update widget options from controller

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

To watch multiple options for change, just use `k-options` and pass the same variable to `k-rebind`:

    <ul kendo-menu k-options="menuOptions" k-rebind="menuOptions"> ... </ul>

### Change widget state using k-ng-disbaled and k-ng-readonly

With the 2015 Q1 release support for `k-ng-disabled` and `k-ng-readonly` directives has been introduced. Using them you can change the disabled/readonly state of the widget based on a scope variable.

#### Change disabled state

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

#### Change readonly state

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

### Delaying widget initialization

It's sometimes useful to postpone creating a widget until after some asynchronously-loaded data is available.  For example you would need this to initialize a Grid widget when you load the column definitions from server (as the Grid does not support re-defining the columns after the widget is instantiated).

You can use the special `k-ng-delay` attribute for this.  Example:

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

Or you can load the widget data with a $http call and initialize the widget when the data is available. Example:

#### Delay widget initialization

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

### Getting widget references

Sometimes you might need a reference to the widgets in order to call methods on it from your controller.  To get one, just assign a name to the `kendo-widget-name` attribute, for example:

#### Get the widget instance in the controller

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

(Introduced in Q1 2015) if you use the tag directive variant, set the `k-scope-field` to achieve the same:

#### Get the widget instance in the controller (with tag directive)

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
{% endraw %}
