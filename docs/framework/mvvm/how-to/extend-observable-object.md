---
title: Bind Container to Extended ObservableObject with Default Values | Kendo UI MVVM
page_title: Bind Container to Extended ObservableObject with Default Values | Kendo UI MVVM
description: "Bind a container to an extended ObservableObject with default values in Kendo UI MVVM."
slug: howto_bindacontainertoanextended_observableobjectwithdefaultvalues_mvvm
---

# Bind Container to Extended ObservableObject with Default Values

The example below demonstrates how to bind a container to an extended ObservableObject with default values in Kendo UI MVVM. The model passes the default values to the `Observable.fn.init` method.

As an alternative, default values can be defined using the `Observable.fn.set` method.

###### Example

```html
<div id="form">
    <fieldset>
    <legend>WORKING:</legend>
     <input data-bind="value: filter.name" data-value-update="keypress" />
     <input data-bind="value: filter.name" data-value-update="keypress" />
     <button data-bind="events: {click: click}">this.set("filter.name", "test");</button>
     </fieldset>
</div>
<script>
    $(function() {
      var BaseVM = kendo.data.ObservableObject.extend({
        init: function(values) {
          //Define default values
          var defaultValues = {
            filter: {name: "John Doe"}
          };

          kendo.data.ObservableObject.fn.init.call(this, $.extend({}, defaultValues, values));
        },
        click: function() {
          this.set("filter.name", "test");
        }
      });

      var viewModel2 = BaseVM.extend({});

      kendo.bind($("#form"), new viewModel2());
    });
</script>
```

## See Also

Other articles on Kendo UI MVVM:

* [MVVM Overview]({% slug overview_mvvmpattern_kendoui %})
* [ObservableObject Overview]({% slug overview_observabeobject_kendoui %})
* [Tutorial on How to Build MVVM Bound Forms]({% slug mvvmboundforms_mvvmpattern_kendoui %})
* [How to Apply Source and Template Binding Using Model with Computed Field]({% slug howto_applysourceandtemplatebinding_usingmodelcomputedfield_mvvm %})


For detailed information on the bindings Kendo UI MVVM supports, refer to the section about [Kendo UI MVVM bindings]({% slug attributebinding_mvvm_kendoui %}).
