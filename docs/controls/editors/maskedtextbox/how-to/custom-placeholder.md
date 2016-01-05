---
title: Show Custom Placeholder on Blur
page_title: Show Custom Placeholder on Blur | Kendo UI MaskedTextBox Widget
description: "Learn how to show a custom placeholder on blur in the Kendo UI MaskedTextBox widget."
slug: howto_show_custom_placeholderon_blur_maskedtextbox
---

# Show Custom Placeholder on Blur

The example below demonstrates how to show a custom placeholder text on blur when the MaskedTextBox widget has no value.

###### Example

```html
<div id="example">
    <div class="demo-section k-header">
        <h4>Mask Input </h4>
        <ul id="fieldlist">
            <li>
                <label for="phone_number">Phone number:</label>
                <input id="phone_number" value="555 123 4567" />
            </li>
            <li>
                <label for="credit_card">Credit Card number:</label>
                <input id="credit_card" value="1234 1234 1234 1234" />
            </li>
            <li>
                <label for="ssn">Social security number:</label>
                <input id="ssn" value="003-12-3456" />
            </li>
            <li>
                <label for="postcode">UK postcode:</label>
                <input id="postcode" value="W1N 1AC"/>
            </li>
        </ul>
    </div>

    <script>
        $(document).ready(function() {
            $("#phone_number").kendoMaskedTextBox({
                mask: "(999) 000-0000"
            });

            $("#credit_card").kendoMaskedTextBox({
                mask: "0000 0000 0000 0000"
            });

            $("#ssn").kendoMaskedTextBox({
                mask: "000-00-0000"
            });

            $("#postcode").kendoMaskedTextBox({
                mask: "L0L 0LL"
            });

            var placeholder = "Enter value";

            $("[data-role=maskedtextbox]").on("blur", function() {
              if (!this.value) {
                this.value = placeholder;
              }
            }).on("focus", function() {
              if (this.value == placeholder) {
                    $(this).data("kendoMaskedTextBox").value("");
                $(this).focus();
              }
            });
        });
    </script>

    <style>
        .demo-section {
            width: 400px;
        }

        #fieldlist
        {
            margin:0;
            padding:0;
        }

        #fieldlist li
        {
            list-style:none;
            padding:10px 0;
        }

        #fieldlist label {
            display: inline-block;
            width: 150px;
            margin-right: 5px;
            text-align: right;
        }
    </style>
</div>
```

## See Also

Other articles on Kendo UI MaskedTextBox:

* [MaskedTextBox JavaScript API Reference](/api/javascript/ui/maskedtextbox)
* [How to Customize Masks through MVVM Binding]({% slug howto_customize_masks_through_mvvmbinding_mvvm_maskedtextbox %})
* [How to Use Custom Directive to Set Model Value]({% slug howto_use_raw_methodtoset_modelvalue_angularjs_maskedtextbox %})
* [How to Use Custom MVVM Binding to Set Model Value]({% slug howto_use_custommvvm_bindingto_setmodel_value_maskedtextbox %})
