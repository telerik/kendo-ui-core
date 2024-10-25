---
title: Apply Source and Template Bindings by Using Model with Computed Field in MVVM
page_title: Apply Source and Template Bindings by Using Model with Computed Field in MVVM
description: "Apply source and template binding by using a Model with a computed field in Kendo UI MVVM."
slug: howto_applysourceandtemplatebinding_usingmodelcomputedfield_mvvm
previous_url: /framework/mvvm/how-to/using-model-with-computed-field
tags: telerik, kendo, jquery, mvvm, pattern, architecture, apply, source, template, bindings, using, model, with, computed, field
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
  <td>Visual Studio Version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I apply source and template binding by using a Model with a computed field in Kendo UI MVVM?

## Solution

The following example demonstrates how to achieve the desired scenario.

```dojo
    <div data-bind="source: data" data-template="tmp"></div>
    <script id="tmp" type="text/x-kendo-template">
    <div>
    <label>Quantity</label>
    <span class="k-input k-textbox k-input-solid k-input-md k-rounded-md k-valid" style="">
    <input type="text" data-bind="value: quantity" title="value" data-role="textbox" class="k-input-inner" style="width: 100%;" />
      </span>
      <p> 
      Price:
      <span data-bind="text: price"></span>
      </p>
      <p>
      Total:
      <span data-bind="text: total"></span>
      </p>
      </div>
    </script>
    <script>

      var Product = kendo.data.Model.define({
        fields: {
          "quantity": {
            type: "number"
          },
          "price": {
            type: "number"
          }
        },
        total: function() { //define the calculated field
          return this.get("quantity") * this.get("price");
        }
      });

      var viewModel = kendo.observable({
        data: [
          new Product({ "quantity": 1, "price": 2 })
        ]
      });
      kendo.bind($(document.body), viewModel);
    </script>
```

## See Also

* [ObservableObject Overview]({% slug overview_observabeobject_kendoui %})
* [Kendo UI MVVM Bindings]({% slug attributebinding_mvvm_kendoui %})
* [Building MVVM-Bound Forms (Tutorial)]({% slug mvvmboundforms_mvvmpattern_kendoui %})