---
title: Appearance
page_title: Appearance
description: "Learn how to customize the appearance of the Telerik UI OTPInput for {{ site.framework }}."
components: ["otpinput"]
slug: appearance_otpinputhelper
position: 3
---

# Appearance

In this article, you will find information about the styling options and rendering of the {{ site.product }} OTPInput.

For a complete example, refer to the [Appearance Demo of the OTPInput](https://demos.telerik.com/{{ site.platform }}/otpinput/appearance).

## Options

The OTPInput supports the following styling options:

- [`Size()`](#size)—Configures the overall size of the component.
- [`FillMode()`](#fillmode)—Defines how the color is applied to the OTPInput.
- [`Rounded()`](#rounded)—Determines the border radius of the component.

### Size

To control the size of the OTPInput, configure the `Size` option with any of the following values:

- `Small`
- `Medium`
- `Large`
- `None`

The default option is `Medium`.

```HtmlHelper
    @(Html.Kendo().OTPInput()
        .Name("otpinput")
        .Size(ComponentSize.Large)
        .Items(5)
    )
```
{% if site.core %}
```TagHelper
    <kendo-otpinput name="otpinput" 
        size="ComponentSize.Large"
        items="5">
    </kendo-otpinput>
```
{% endif %}
```Html
    <span class="k-input k-otp-input k-input-lg"></span>
```

### FillMode

The `FillMode()` method specifies how the color is applied to the component.

The following options are available for the `FillMode` configuration:

- `Solid`
- `Outline`
- `Flat`
- `None`

The default OTPInput fill mode is `Solid`.

```HtmlHelper
    @(Html.Kendo().OTPInput()
        .Name("otpinput")
        .FillMode(FillMode.Outline)
        .Items(5)
    )
```
{% if site.core %}
```TagHelper
    <kendo-otpinput name="otpinput" 
        fill-mode="FillMode.Outline"
        items="5">
    </kendo-otpinput>
```
{% endif %}
```Html
    <span class="k-otp-input k-input k-input-outline"></span>
```

### Rounded

The border radius of the component can be customized through the `Rounded()` method.

The following values are available for the `Rounded` option:

- `Small`
- `Medium`
- `Large`
- `Full`
- `None`

The default option is `Medium`.

```HtmlHelper
    @(Html.Kendo().OTPInput()
        .Name("otpinput")
        .Rounded(Rounded.Full)
        .Items(5)
    )
```
{% if site.core %}
```TagHelper
    <kendo-otpinput name="otpinput" 
        rounded="Rounded.Full"
        items="5">
    </kendo-otpinput>
```
{% endif %}
```Html
    <span class="k-input k-otp-input k-rounded-full"></span>
```

## See Also

* [Appearance of the OTPInput for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/otpinput/appearance)
* [Server-Side API of the OTPInput HtmlHelper](/api/otpinput)
{% if site.core %}
* [Server-Side API of the OTPInput TagHelper](/api/taghelpers/otpinput)
{% endif %}
* [Client-Side API of the OTPInput](https://docs.telerik.com/kendo-ui/api/javascript/ui/otpinput)