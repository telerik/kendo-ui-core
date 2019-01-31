---
title: Show and Hide Passwords in MaskedTextBox
description: An example on how to show and hide the input of a Kendo UI MaskedTextBox widget.
type: how-to
page_title: Show and Hide a Password | Kendo UI MaskedTextBox
slug: maskedtextbox-toggle-password
tags: maskedtextbox, password, show, hide, toggle, preview
res_type: kb
component: maskedtextbox
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Kendo UI MaskedTextBox</td>
 </tr>
 <tr>
  <td>Kendo UI version</td>
  <td>Created with the 2018.3.1017 version</td>
 </tr>
</table>

## Description

How can I toggle sensitive data, such as SSN or card numbers so that the user can preview the entered input?

## Solution

1. Add a button or a `span` element and handle the `click` event for it.
1. In the event handler, change the `type` attribute of the MaskedTextBox to `text` or `password` so that the text is displayed or obscured.

```dojo
<h4>Enter SSN</h4>
<input id="maskedtextbox" type="password"/>
<span toggle="maskedtextbox" class="k-icon k-i-lock toggle-password"></span>

<script>
    $(document).ready(function() {
    $("#maskedtextbox").kendoMaskedTextBox({
        mask: "000-00-0000"
    });


    $(".toggle-password").click(function () {

        $(this).toggleClass("k-i-lock k-i-unlock");
        var input = $("[id='" + $(this).attr("toggle") + "']");

        if (input.attr("type") === "password") {
            input.attr("type", "text");
        } else {
            input.attr("type", "password");
        }
    });
    });
</script>
```
