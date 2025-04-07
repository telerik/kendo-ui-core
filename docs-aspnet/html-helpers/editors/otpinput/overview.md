---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI OTPInput for {{ site.framework }}."
slug: overview_otpinputhelper
position: 0
---

# {{ site.framework }} OTPInput Overview

{% if site.core %}
The Telerik UI OTPInput TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI OTPInput widget.
{% else %}
The Telerik UI OTPInput HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI OTPInput widget.
{% endif %}

The OTPInput is a UI component that allows the user to enter a one-time password (OTP) during multi-factor authentication. Its sole purpose is to strengthen applications in terms of security while offering a seamless user experience during user interaction.

* [Demo page for the OTPInput HtmlHelper](https://demos.telerik.com/{{ site.platform }}/otpinput/index)
{% if site.core %}
* [Demo page for the OTPInput TagHelper](https://demos.telerik.com/{{ site.platform }}/otpinput/index)
{% endif %}

## Functionality and Features

|Feature|Description|
|-------|-----------|
| [Appearance]({% slug appearance_otpinputhelper %}) | You can use the available styling options for configuring the size, border radius, and fill mode of the OTPInput. |
| [Types]({% slug types_otpinputhelper %}) | You can set the type of all the rendered inputs. |
| [Items]({% slug items_otpinputhelper %}) | You can configure the items of the OTPInput through an action delegate or a single number. |
| [Separators]({% slug separator_otpinputhelper %}) | The OTPInput supports different types of separators between the item groups. |
| [Adaptiveness]({% slug adaptiveness_otpinputhelper %}) | You configure what type of virtual keyboard will be displayed when working with the component on a mobile device. |
| [Accessibility]({% slug htmlhelpers_otpinput_accessibility %}) | The OTPInput is accessible for screen readers, supports WAI-ARIA attributes, and delivers [keyboard shortcuts for faster navigation]({% slug keynav_otpinputhelper %}). |

## Next Steps

* [Getting Started with the {{ site.product}} OTPInput]({% slug getting_started_otpinputhelper %})

## See Also

* [Overview of the {{ site.product }} OTPInput (Demo)](https://demos.telerik.com/aspnet-core/otpinput/index) 
* [Using the API of the {{ site.product }} OTPInput (Demo)](https://demos.telerik.com/aspnet-core/otpinput/api)
* [Server-Side API of the OTPInput HtmlHelper](/api/otpinput)
{% if site.core %}
* [Server-Side API of the OTPInput TagHelper](/api/taghelpers/otpinput)
{% endif %}
* [Client-Side API of the OTPInput](https://docs.telerik.com/kendo-ui/api/javascript/ui/otpinput)