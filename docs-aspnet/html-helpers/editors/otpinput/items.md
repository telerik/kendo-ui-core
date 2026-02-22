---
title: Items
page_title: Items
description: "Learn how to configure the items of the Telerik UI OTPInput for {{ site.framework }}."
components: ["otpinput"]
slug: items_otpinputhelper
position: 5
---

# Items

In this article, you will find information about different ways to configure the {{ site.product }} OTPInput items. 

The option accepts either an:

* Numerical value
* Action delegate

The below example demonstrates how to configure the items by passing a number. 

```HtmlHelper
    @(Html.Kendo().OTPInput()
        .Name("otp")
        .Items(5)
    )
```
{% if site.core %}
```TagHelper
     <kendo-otpinput name="otp" items="5">
     </kendo-otpinput>
```
{% endif%}

The next example shows how to configure the items by passing an Action delegate.

```HtmlHelper
    @(Html.Kendo().OTPInput()
        .Name("otp")
        .Items(items => {
            items.Add().GroupLength(3);
            items.Add().GroupLength(2);
            items.Add().GroupLength(3);
        })
    )
```
{% if site.core %}
```TagHelper
     <kendo-otpinput name="otp">
        <otpinput-items>
            <item group-length="3" />
            <item group-length="2" />
            <item group-length="3" />
        </otpinput-items>
     </kendo-otpinput>
```
{% endif%}

## See Also

* [Server-Side API of the OTPInput HtmlHelper](/api/otpinput)
{% if site.core %}
* [Server-Side API of the OTPInput TagHelper](/api/taghelpers/otpinput)
{% endif %}
* [Client-Side API of the OTPInput](https://docs.telerik.com/kendo-ui/api/javascript/ui/otpinput)
