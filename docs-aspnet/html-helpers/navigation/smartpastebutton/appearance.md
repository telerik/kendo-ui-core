---
title: Appearance
page_title: Appearance
description: "Learn how to customize the appearance of the Telerik UI SmartPasteButton HtmlHelper for {{ site.framework }}."
components: ["smartpastebutton"]
slug: smartpastebutton_appearance
position: 4
---

# Appearance

In this article, you will find information about the styling options of the {{ site.product }} SmartPasteButton.

For a complete example, refer to the [Appearance Demo of the SmartPasteButton](https://demos.telerik.com/{{ site.platform }}/smartpastebutton/appearance).

## Options

The SmartPasteButton component provides the following options for styling:

- [`Size()`](#size)&mdash;Configures the overall size of the component.
- [`ThemeColor()`](#themecolor)&mdash;Sets what color will be applied to the component.
- [`FillMode()`](#fillmode)&mdash;Defines how the color is applied.
- [`Rounded()`](#rounded)&mdash;Determines the border radius of the component.
- [`Icon()`](#icon)&mdash;Specifies the icon displayed on the button in its default state.
- [`CancelIcon()`](#cancelicon)&mdash;Specifies the icon displayed when the button is in listening/processing state.

### Size

To control the size of the SmartPasteButton, configure the `Size()` method with any of the following values:

- `Small`
- `Medium`
- `Large`

To apply the `none` size (as shown in the demo), use the client-side `setOptions()` configuration.

```HtmlHelper
@(Html.Kendo().SmartPasteButton()
    .Name("smartPasteButton")
    .Service("https://demos.telerik.com/service/v2/ai/smartpaste/smartpaste")
    .Text("Smart Paste")
    .Size(ComponentSize.Medium)
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-smartpastebutton name="smartPasteButton"
                        text="Smart Paste"
                        size="ComponentSize.Medium">
    <service url="https://demos.telerik.com/service/v2/ai/smartpaste/smartpaste" />
</kendo-smartpastebutton>
```
{% endif %}

### FillMode

The `FillMode()` method specifies how the color is applied to the component.

```HtmlHelper
@(Html.Kendo().SmartPasteButton()
    .Name("smartPasteButton")
    .Service("https://demos.telerik.com/service/v2/ai/smartpaste/smartpaste")
    .Text("Smart Paste")
    .FillMode(FillMode.Solid)
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-smartpastebutton name="smartPasteButton"
                        text="Smart Paste"
                        fill-mode="FillMode.Solid">
    <service url="https://demos.telerik.com/service/v2/ai/smartpaste/smartpaste" />
</kendo-smartpastebutton>
```
{% endif %}

The following options are available for the `FillMode` configuration:

- `Solid`
- `Flat`
- `Outline`

To apply the `link`, `clear`, or `none` fill modes (as shown in the demo), use the client-side `setOptions()` configuration.

### ThemeColor

The `ThemeColor` configuration provides a variety of colors that can be applied to the SmartPasteButton. The available options are:

- `Base`
- `Primary`
- `Secondary`
- `Tertiary`
- `Info`
- `Success`
- `Warning`
- `Error`
- `Dark`
- `Light`
- `Inverse`

```HtmlHelper
@(Html.Kendo().SmartPasteButton()
    .Name("smartPasteButton")
    .Service("https://demos.telerik.com/service/v2/ai/smartpaste/smartpaste")
    .Text("Smart Paste")
    .ThemeColor(ThemeColor.Base)
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-smartpastebutton name="smartPasteButton"
                        text="Smart Paste"
                        theme-color="ThemeColor.Base">
    <service url="https://demos.telerik.com/service/v2/ai/smartpaste/smartpaste" />
</kendo-smartpastebutton>
```
{% endif %}

### Rounded

The border radius of the SmartPasteButton can be customized through the `Rounded()` method.

```HtmlHelper
@(Html.Kendo().SmartPasteButton()
    .Name("smartPasteButton")
    .Service("https://demos.telerik.com/service/v2/ai/smartpaste/smartpaste")
    .Text("Smart Paste")
    .Rounded(Rounded.Medium)
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-smartpastebutton name="smartPasteButton"
                        text="Smart Paste"
                        rounded="Rounded.Medium">
    <service url="https://demos.telerik.com/service/v2/ai/smartpaste/smartpaste" />
</kendo-smartpastebutton>
```
{% endif %}

The following values are available for the `Rounded` option:

- `Small`
- `Medium`
- `Large`
- `Full`
- `None`

> The `None` value is deprecated. Use custom CSS instead.

### Icon

The SmartPasteButton supports icon customization through the `Icon()` method. The icon value is the name of a Kendo UI font icon (for example, `paste-sparkle`, `copy`, or `microphone-outline`).

```HtmlHelper
@(Html.Kendo().SmartPasteButton()
    .Name("smartPasteButton")
    .Service("https://demos.telerik.com/service/v2/ai/smartpaste/smartpaste")
    .Text("Smart Paste")
    .Icon("paste-sparkle")
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-smartpastebutton name="smartPasteButton"
                        text="Smart Paste"
                        icon="paste-sparkle">
    <service url="https://demos.telerik.com/service/v2/ai/smartpaste/smartpaste" />
</kendo-smartpastebutton>
```
{% endif %}

### CancelIcon

The `CancelIcon()` method sets the icon displayed while the SmartPasteButton is in listening/processing state.

```HtmlHelper
@(Html.Kendo().SmartPasteButton()
    .Name("smartPasteButton")
    .Service("https://demos.telerik.com/service/v2/ai/smartpaste/smartpaste")
    .Text("Smart Paste")
    .CancelIcon("cancel")
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-smartpastebutton name="smartPasteButton"
                        text="Smart Paste"
                        cancel-icon="cancel">
    <service url="https://demos.telerik.com/service/v2/ai/smartpaste/smartpaste" />
</kendo-smartpastebutton>
```
{% endif %}

## Updating the Appearance on the Client

In the demo, the SmartPasteButton is updated through `setOptions()` on the client. The client-side configuration uses the JavaScript option names (`size`, `themeColor`, `rounded`, `fillMode`, `icon`).

```HtmlHelper
@(Html.Kendo().SmartPasteButton()
    .Name("smartPasteButton")
    .Service("https://demos.telerik.com/service/v2/ai/smartpaste/smartpaste")
    .Text("Smart Paste")
)

<script>
    function onChange(e) {
        var size = $("#size").data("kendoDropDownList").value();
        var themeColor = $("#themeColor").data("kendoDropDownList").value();
        var rounded = $("#rounded").data("kendoDropDownList").value();
        var fillMode = $("#fillMode").data("kendoDropDownList").value();
        var icon = $("#icon").data("kendoDropDownList").value();

        var options = {
            size: size,
            themeColor: themeColor,
            rounded: rounded,
            fillMode: fillMode,
            icon: icon
        };

        var smartPasteButton = $("#smartPasteButton").data("kendoSmartPasteButton");
        smartPasteButton.setOptions(options);
    }
</script>
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-smartpastebutton name="smartPasteButton"
                        text="Smart Paste">
    <service url="https://demos.telerik.com/service/v2/ai/smartpaste/smartpaste" />
</kendo-smartpastebutton>

<script>
    function onChange(e) {
        var size = $("#size").data("kendoDropDownList").value();
        var themeColor = $("#themeColor").data("kendoDropDownList").value();
        var rounded = $("#rounded").data("kendoDropDownList").value();
        var fillMode = $("#fillMode").data("kendoDropDownList").value();
        var icon = $("#icon").data("kendoDropDownList").value();

        var options = {
            size: size,
            themeColor: themeColor,
            rounded: rounded,
            fillMode: fillMode,
            icon: icon
        };

        var smartPasteButton = $("#smartPasteButton").data("kendoSmartPasteButton");
        smartPasteButton.setOptions(options);
    }
</script>
```
{% endif %}

## See Also

* [SmartPasteButton Appearance (Demo)](https://demos.telerik.com/{{ site.platform }}/smartpastebutton/appearance)
* [SmartPasteButton Overview]({% slug htmlhelpers_overview_smartpastebutton %})
* [SmartPasteButton Events]({% slug smartpastebutton_events %})
* [Server-Side API of the SmartPasteButton ](/api/smartpastebutton)
{% if site.core %}
* [Server-Side API of the SmartPasteButton TagHelper](/api/taghelpers/smartpastebutton)
{% endif %}
* [Knowledge Base Section](/knowledge-base)
