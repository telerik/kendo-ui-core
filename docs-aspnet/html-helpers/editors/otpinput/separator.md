---
title: Separator
page_title: Separator
description: "Learn how to configure different separators between the items of the Telerik UI OTPInput for {{ site.framework }} component."
slug: separator_otpinputhelper
position: 4
---

# Separator

In this article, you will find information about the different ways to add a separator between the {{ site.product }} OTPInput items. The option accepts either a string or a function handler.

> In order for the functionality to be incorporated successfully, the [`Items`]({%slug items_otpinputhelper%}) need to be configured through an Action delegate.

The below example demonstrates how to add a separator as a string. 

```HtmlHelper
    @(Html.Kendo().OTPInput()
            .Name("otp")
            .Items(items => {
                items.Add().GroupLength(3);
                items.Add().GroupLength(2);
                items.Add().GroupLength(3);
            })
            .Separator("-")
    )
```
{% if site.core %}
```TagHelper
     <kendo-otpinput name="otp" separator="-">
            <otpinput-items>
                <item group-length="3" />
                <item group-length="2" />
                <item group-length="3" />
            </otpinput-items>
     </kendo-otpinput>
```
{% endif%}

The next example shows how to add a separator in the form of a function handler by using the [`kendo.ui.icon`](https://docs.telerik.com/kendo-ui/api/javascript/ui/ui/methods/icon) method.

```HtmlHelper
    @(Html.Kendo().OTPInput()
            .Name("otp")
            .Items(items => {
                items.Add().GroupLength(3);
                items.Add().GroupLength(2);
                items.Add().GroupLength(3);
            })
            .SeparatorHandler("separatorHandler")
    )
```
{% if site.core %}
```TagHelper
     <kendo-otpinput name="otp" separator-handler="separatorHandler">
            <otpinput-items>
                <item group-length="3" />
                <item group-length="2" />
                <item group-length="3" />
            </otpinput-items>
     </kendo-otpinput>
```
{% endif%}
```JavaScript
   <script>
        function separatorHandler() {
            return kendo.ui.icon({icon: "shape-line", type: "svg"})
        }
   </script>
```

## See Also

* [Server-Side API of the OTPInput HtmlHelper](/api/otpinput)
{% if site.core %}
* [Server-Side API of the OTPInput TagHelper](/api/taghelpers/otpinput)
{% endif %}
* [Client-Side API of the OTPInput](https://docs.telerik.com/kendo-ui/api/javascript/ui/otpinput)