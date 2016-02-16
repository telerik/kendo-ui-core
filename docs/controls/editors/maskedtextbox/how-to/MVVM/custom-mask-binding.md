---
title: Customize Masks through MVVM Binding
page_title: Customize Masks through MVVM Binding | Kendo UI MaskedTextBox
description: "Learn how to set the Kendo UI MaskedTextBox masks using a custom MVVM binding."
slug: howto_customize_masks_through_mvvmbinding_mvvm_maskedtextbox
---

# Customize Masks through MVVM Binding

The example below demonstrates how to implement [a custom MVVM binding](http://docs.telerik.com/kendo-ui/framework/mvvm/bindings/custom) to set the widget mask option.

###### Example

```html
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

Other articles on Kendo UI MaskedTextBox:

* [MaskedTextBox JavaScript API Reference](/api/javascript/ui/maskedtextbox)
* [How to Show Custom Placeholder on Blur]({% slug howto_show_custom_placeholderon_blur_maskedtextbox %})
* [How to Use Custom Directive to Set Model Value]({% slug howto_use_raw_methodtoset_modelvalue_angularjs_maskedtextbox %})
* [How to Use Custom MVVM Binding to Set Model Value]({% slug howto_use_custommvvm_bindingto_setmodel_value_maskedtextbox %})
