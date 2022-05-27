---
title: Bind the Container to Extended ObservableObject with Default Values in MVVM
page_title: Bind the Container to Extended ObservableObject with Default Values in MVVM
description: "Bind a container to an extended ObservableObject with default values in Kendo UI MVVM."
slug: howto_bindacontainertoanextended_observableobjectwithdefaultvalues_mvvm
previous_url: /framework/mvvm/how-to/extend-observable-object
tags: telerik, kendo, jquery, mvvm, pattern, architecture, bind, container, to, extended, observableobject, with, default, values
component: mvvm pattern
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® MVVM Architecture</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Visual Studio version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I bind a container to an extended `ObservableObject` with default values in Kendo UI MVVM?

## Solution

The following example demonstrates how to achieve the desired scenario. The model passes the default values to the `Observable.fn.init` method.

As an alternative, default values can be defined using the `Observable.fn.set` method.

```dojo
    <div id="form">
      <fieldset>
        <legend>WORKING:</legend>
        <span class="k-input k-textbox k-input-solid k-input-md k-rounded-md k-valid" style="">
          <input type="text" data-bind="value: filter.name" data-value-update="keypress" title="value" data-role="textbox" class="k-input-inner" /></span>
        <span class="k-input k-textbox k-input-solid k-input-md k-rounded-md k-valid" style="">
          <input type="text" data-bind="value: filter.name" data-value-update="keypress" title="value" data-role="textbox" class="k-input-inner" />
        </span>
        <button type="button" data-bind="events: {click: click}" class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base">
          <span class="k-button-text">this.set("filter.name", "test");</span>
        </button>
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

* [ObservableObject Overview]({% slug overview_observabeobject_kendoui %})
* [Kendo UI MVVM Bindings]({% slug attributebinding_mvvm_kendoui %})
* [Building MVVM-Bound Forms (Tutorial)]({% slug mvvmboundforms_mvvmpattern_kendoui %})
