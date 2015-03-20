---
title: Set the widget mask using a custom MVVM binding
page_title: Set the widget mask using a custom MVVM binding
description: Set the widget mask using a custom MVVM binding
---

# Set the widget mask using a custom MVVM binding


The example below demonstrates how to implement [a custom MVVM binding](http://docs.telerik.com/kendo-ui/framework/mvvm/bindings/custom) to set the widget mask option

#### Example:

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
