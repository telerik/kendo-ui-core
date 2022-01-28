---
title: Customize Masks through MVVM Binding
page_title: Customize Masks through MVVM Binding | Kendo UI MaskedTextBox
description: "Learn how to set the Kendo UI MaskedTextBox masks using a custom MVVM binding."
slug: howto_customize_masks_through_mvvmbinding_mvvm_maskedtextbox
---

# Customize Masks through MVVM Binding

The following example demonstrates how to implement [a custom MVVM binding](https://docs.telerik.com/kendo-ui/framework/mvvm/bindings/custom) to set the mask option of the MaskedTextBox.

```dojo
<div id="example">
    <div class="demo-section k-header">
        <div class="box-col" style="width: 300px">
            <h4>Enter a number</h4>
            <input data-role="maskedtextbox"
                   data-bind="value: phoneNumber, mask: mask"
                   style="width: 200px">
            <button data-bind="click: changeMask">Change mask</button>
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

For more runnable examples on the Kendo UI MaskedTextBox, browse its [**How To** documentation folder]({% slug howto_use_raw_methodtoset_modelvalue_angularjs_maskedtextbox %}).
