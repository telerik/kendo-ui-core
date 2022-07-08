---
title: Show and Hide Passwords in TextBox
description: An example on how to show and hide the input of a {{ site.product }} TextBox.
type: how-to
page_title: Show and Hide a Password in TextBox
slug: textbox-toggle-password
tags: texbox, password, show, hide, toggle, preview
res_type: kb
component: textbox
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.prodcut }} TextBox</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>Created with the 2022.2.621 version</td>
 </tr>
</table>

## Description

How can I toggle sensitive data, such as passwords, so that the user can preview the entered input?

## Solution

1. Add a `button` or a `span` element and handle the `click` event for it.
1. In the event handler, change the `type` attribute of the TextBox to `text` or `password` so that the text is displayed or obscured.

```Index.cshtml
    @(Html.Kendo().TextBox()
        .Name("textbox")
        .Placeholder("Password")
        .Value("myBigS1cret")
        .HtmlAttributes(new { type = "password" })
    )
    <span toggle="textbox" class="k-icon k-i-eye toggle-password"></span>
```
```Script.js
    <script>
        $(document).ready(function(){
            $(".toggle-password").click(function () {
                $(this).toggleClass("k-i-minus k-i-eye"); //toggle the current icon
                var input = $("[id='" + $(this).attr("toggle") + "']"); //get the input

                if (input.attr("type") === "password") { //change the input type
                    input.attr("type", "text");
                } else {
                    input.attr("type", "password");
                }
            });
        });
    </script>
```

For the complete implementation of the suggested approach, refer to the following [Telerik REPL](https://netcorerepl.telerik.com/GckrEqvI37R0V54u19) example.
