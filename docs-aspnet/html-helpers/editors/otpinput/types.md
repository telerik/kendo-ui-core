---
title: Types
page_title: Types
description: "Learn how to configure the different types of the Telerik UI OTPInput component for {{ site.framework }}."
slug: types_otpinputhelper
position: 7
---

# Types

In this article, you will find information about the different ways to configure the type for the {{ site.product }} OTPInput items. The available types are:

* `Number`&mdash;Allows typing only numerical characters.
* `Text`&mdash;Allows typing characters of a different nature.
* `Password`&mdash;Behaves like a input element of type [password](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/password).

The below example demonstrates how to configure the `Type()` configuration of the component.

```HtmlHelper
    @(Html.Kendo().OTPInput()
        .Name("otp")
        .Items(5)
        .Type(OTPType.Number)
    )
```
{% if site.core %}
```TagHelper
    <kendo-otpinput name="otp"
                    items="5"
                    type="OTPType.Number">
    </kendo-otpinput>
```
{% endif %}

## See Also

* [Server-Side API of the OTPInput HtmlHelper](/api/otpinput)
{% if site.core %}
* [Server-Side API of the OTPInput TagHelper](/api/taghelpers/otpinput)
{% endif %}
* [Client-Side API of the OTPInput](https://docs.telerik.com/kendo-ui/api/javascript/ui/otpinput)