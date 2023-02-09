---
title: Use Custom MVVM Binding to Set the MaskedTextBox Model Value
page_title: Use Custom MVVM Binding to Set the MaskedTextBox Model Value
description: "Learn how to use custom MVVM bindings to retrieve unmasked widget values in the Kendo UI MaskedTextBox."
slug: howto_use_custommvvm_bindingto_setmodel_value_maskedtextbox
previous_url: /controls/editors/maskedtextbox/how-to/MVVM/custom-raw-method-binding
tags: telerik, kendo, jquery, maskedtextbox, use, custom, mvvm, binding, to, set, the, model, unmasked, value
component: maskedtextbox
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® MaskedTextBox for jQuery</td>
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

How can I use MVVM to set the unmasked value of the Kendo UI for jQuery MaskedTextBox?

## Solution

The following example demonstrates how to implement [a custom MVVM binding]({% slug custombinding_mvvm_kendoui %}) to set the model value of the MaskedTextBox.

```dojo
<div id="example">
    <div class="demo-section k-header">
        <div class="box-col" style="width: 300px">
            <h4>Enter a number</h4>
            <input data-role="maskedtextbox"
                   data-mask="(999) 000-0000"
                   data-bind="raw: phoneNumber"
                   style="width: 200px">

            <span data-bind="text: phoneNumber"></span>
        </div>
    </div>
    <script>
        kendo.data.binders.widget.raw = kendo.data.Binder.extend({
            init: function (widget, bindings, options) {
                //call the base constructor
                kendo.data.Binder.fn.init.call(this, widget.element[0], bindings, options);
                this.widget = widget;
                this._change = $.proxy(this.change, this);
                this.widget.first("change", this._change);
                this._initChange = false;
            },
            change: function() {
              var that = this;
              var value = that.widget.raw();

              that._initChange = true;

              that.bindings.raw.set(value);

              that._initChange = false;
            },
            refresh: function () {
              if (!this._initChange) {
                var value = this.bindings.raw.get();
                this.widget.value(value);
              }
            }
        });
        var viewModel = kendo.observable({
            phoneNumber: "1234566789"
        });
        kendo.bind($("#example"), viewModel);
    </script>
</div>
```

## See Also

* [Basic Usage of the MaskedTextBox (Demo)](https://demos.telerik.com/kendo-ui/maskedtextbox/index)
* [Using the API of the MaskedTextBox (Demo)](https://demos.telerik.com/kendo-ui/maskedtextbox/api)
* [JavaScript API Reference of the MaskedTextBox](/api/javascript/ui/maskedtextbox)
