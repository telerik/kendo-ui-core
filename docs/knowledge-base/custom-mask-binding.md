---
title: Customize Masks in the MaskedTextBox through MVVM
page_title: Set Custom Masks in the MaskedTextBox through MVVM
description: "Learn how to set the Kendo UI MaskedTextBox masks by using a custom MVVM binding."
slug: howto_customize_masks_through_mvvmbinding_mvvm_maskedtextbox
previous_url: /controls/editors/maskedtextbox/how-to/MVVM/custom-mask-binding
tags: telerik, kendo, jquery, maskedtextbox, customize, masks, through, mvvm, binding
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

How can I use MVVM to set the mask of the Kendo UI for jQuery MaskedTextBox?

## Solution

The following example demonstrates how to implement [a custom MVVM binding]({% slug custombinding_mvvm_kendoui %}) to set the `mask` option of the MaskedTextBox.

```dojo
<div id="example">
    <div class="demo-section k-header">
        <div class="box-col" style="width: 300px">
            <h4>Enter a number</h4>
            <input data-role="maskedtextbox"
                   data-bind="value: phoneNumber, mask: mask"
                   style="width: 200px">
            <button class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"  data-bind="click: changeMask"><span class="k-button-text">Change mask</span></button>
        </div>
    </div>
    <script>
        kendo.data.binders.widget.mask = kendo.data.Binder.extend({
            init: function (widget, bindings, options) {
                //call the base constructor
                kendo.data.Binder.fn.init.call(this, widget.element[0], bindings, options);

                this.widget = widget;
            },
            refresh: function () {
                var value = this.bindings.mask.get();

                this.widget.setOptions({ mask: value });
            }
        });

        var viewModel = kendo.observable({
            phoneNumber: "(123) 456-6789",
            mask: "(999) 000-0000",
            changeMask: function() {
                viewModel.set("mask", "99999");
            }
        });

        kendo.bind($("#example"), viewModel);
    </script>
</div>
```

## See Also

* [Basic Usage of the MaskedTextBox (Demo)](https://demos.telerik.com/kendo-ui/maskedtextbox/index)
* [Using the API of the MaskedTextBox (Demo)](https://demos.telerik.com/kendo-ui/maskedtextbox/api)
* [JavaScript API Reference of the MaskedTextBox](/api/javascript/ui/maskedtextbox)
