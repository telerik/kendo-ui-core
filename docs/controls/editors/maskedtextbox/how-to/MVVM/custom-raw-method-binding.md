---
title: Use Custom MVVM Binding to Set Model Value
page_title: Use Custom MVVM Binding to Set Model Value | Kendo UI MaskedTextBox
description: "Learn how to use custom MVVM bindings to retrieve unmasked widget values in the Kendo UI MaskedTextBox widget."
slug: howto_use_custommvvm_bindingto_setmodel_value_maskedtextbox
---

# Use Custom MVVM Binding to Set Model Value

The example below demonstrates how to implement [a custom MVVM binding](http://docs.telerik.com/kendo-ui/framework/mvvm/bindings/custom) to set the unmasked widget value.

###### Example

```html
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

Other articles on Kendo UI MaskedTextBox:

* [MaskedTextBox JavaScript API Reference](/api/javascript/ui/maskedtextbox)
* [How to Customize Masks through MVVM Binding]({% slug howto_customize_masks_through_mvvmbinding_mvvm_maskedtextbox %})
* [How to Show Custom Placeholder on Blur]({% slug howto_show_custom_placeholderon_blur_maskedtextbox %})
* [How to Use Custom Directive to Set Model Value]({% slug howto_use_raw_methodtoset_modelvalue_angularjs_maskedtextbox %})
