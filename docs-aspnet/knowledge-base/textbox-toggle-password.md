---
title: Show and Hide Passwords in a TextBox
description: An example on how to show and hide the input of a {{ site.product }} TextBox.
type: how-to
page_title: Show and Hide a Password in a TextBox
slug: textbox-toggle-password
tags: texbox, password, show, hide, toggle, preview
res_type: kb
component: textbox
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} TextBox</td>
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

```Razor Index.cshtml
    @(Html.Kendo().TextBox()
        .Name("textbox")
        .Placeholder("Password")
        .Value("myBigS1cret")
        .HtmlAttributes(new { type = "password" })
    )
    <span toggle="textbox" class="k-icon k-i-eye toggle-password"></span>
```
```JS script.js
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

## More {{ site.framework }} TextBox Resources

* [{{ site.framework }} TextBox Documentation]({%slug htmlhelpers_overview_textbox%})

* [{{ site.framework }} TextBox Demos](https://demos.telerik.com/{{ site.platform }}/textbox)

{% if site.core %}
* [{{ site.framework }} TextBox Product Page](https://www.telerik.com/aspnet-core-ui/textbox)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} TextBox Product Page](https://www.telerik.com/aspnet-mvc/textbox)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Telerik REPL: Show and Hide Passwords in TextBox](https://netcorerepl.telerik.com/GckrEqvI37R0V54u19)
* [Client-Side API Reference of the TextBox for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/textbox)
* [Server-Side API Reference of the TextBox for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/textbox)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
