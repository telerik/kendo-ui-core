---
title: Show a Custom MaskedTextBox Placeholder on Blur
page_title: Render a Custom MaskedTextBox Placeholder on Blur
description: "Learn how to show a custom placeholder on blur in the Kendo UI MaskedTextBox widget."
slug: howto_show_custom_placeholderon_blur_maskedtextbox
previous_url: /controls/editors/maskedtextbox/how-to/custom-placeholder
tags: telerik, kendo, jquery, maskedtextbox, show, render, custom, placeholder, on, blur
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

How can I use MVVM to show a custom placeholder on `blur` in the Kendo UI for jQuery MaskedTextBox?

## Solution

The following example demonstrates how to show custom text as a placeholder on `blur` when the MaskedTextBox has no value.

```dojo
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

* [Basic Usage of the MaskedTextBox (Demo)](https://demos.telerik.com/kendo-ui/maskedtextbox/index)
* [Using the API of the MaskedTextBox (Demo)](https://demos.telerik.com/kendo-ui/maskedtextbox/api)
* [JavaScript API Reference of the MaskedTextBox](/api/javascript/ui/maskedtextbox)
