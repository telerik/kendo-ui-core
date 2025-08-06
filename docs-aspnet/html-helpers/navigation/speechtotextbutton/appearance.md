---
title: Appearance
page_title: Appearance
description: "Learn how to customize the appearance of the Telerik UI SpeechToTextButton HtmlHelper for {{ site.framework }}."
slug: speechtotextbutton_appearance
position: 2
---

# Appearance

In this article, you will find information about the styling options of the {{ site.product }} SpeechToTextButton.

For a live example, visit to the [Appearance Demo of the SpeechToTextButton component](https://demos.telerik.com/{{ site.platform }}/speechtotextbutton/appearance).

## Options

The SpeechToTextButton component provides the following options for styling:

* [`Size()`](#size)&mdash;Configures the overall size of the component.
* [`ThemeColor()`](#themecolor)&mdash;Sets what color will be applied to the component.
* [`FillMode()`](#fillmode)&mdash;Defines how the color is applied to the SpeechToTextButton.
* [`Rounded()`](#rounded)&mdash;Determines the border radius of the component.
* [`Icon()` and `StopIcon()`](#icons)&mdash;Customize the default icons in the active and inactive states.

### Size

To control the size of the SpeechToTextButton, configure the `Size()` option with any of the following values:

- `Small`
- `Medium` (the default size)
- `Large`
- `None`

```HtmlHelper
@(Html.Kendo().SpeechToTextButton()
    .Name("speechButton")
    .Size(ComponentSize.Medium)
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-speechtotextbutton name="speechButton" size="ComponentSize.Medium">
</kendo-speechtotextbutton>
```
{% endif %}

### ThemeColor

The `ThemeColor()` configuration provides a variety of colors that can be applied to the SpeechToTextButton. The available options are:

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
- `None`

The default `ThemeColor` is `Base`.

```HtmlHelper
@(Html.Kendo().SpeechToTextButton()
    .Name("speechButton")
    .ThemeColor(ThemeColor.Base)
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-speechtotextbutton name="speechButton" theme-color="ThemeColor.Base">
</kendo-speechtotextbutton>
```
{% endif %}

### FillMode

The `FillMode()` method specifies how the color is applied to the component. The default SpeechToTextButton fill mode is `Solid`.

```HtmlHelper
@(Html.Kendo().SpeechToTextButton()
    .Name("speechButton")
    .FillMode(ButtonFillMode.Solid)
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-speechtotextbutton name="speechButton" fill-mode="ButtonFillMode.Solid">
</kendo-speechtotextbutton>
```
{% endif %}

The following options are available for the `FillMode()` configuration:

- `Solid`
- `Outline`
- `Flat`
- `Link`
- `Clear`
- `None`

### Rounded

The border radius of the SpeechToTextButton can be customized through the `Rounded()` method. The default option is `Medium`.

```HtmlHelper
@(Html.Kendo().SpeechToTextButton()
    .Name("speechButton")
    .Rounded(Rounded.Medium)
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-speechtotextbutton name="speechButton" rounded="Rounded.Medium">
</kendo-speechtotextbutton>
```
{% endif %}

The following values are available for the `Rounded()` option:

- `Small`
- `Medium`
- `Large`
- `Full`
- `None`

### Icons

The SpeechToTextButton displays different icons based on its [operational state]({% slug htmlhelpers_overview_speechtotextbutton%}#button-states). When the component is in inactive mode (ready to start recording), it displays the `microphone-outline` icon by default. You can customize this using the `Icon()` configuration option to specify a different icon that better fits your application's design.

During active mode (while recording speech), the component automatically switches to the `stop-sm` icon to indicate that recording is in progress and can be stopped. The `StopIcon()` option allows you to override this default behavior with a custom icon of your choice.

Select the desired icons from the comprehensive list of available <a href="https://www.telerik.com/design-system/docs/foundation/iconography/icon-list/" target="_blank">built-in icons in {{ site.product }}</a>.

```HtmlHelper
@(Html.Kendo().SpeechToTextButton()
    .Name("speechButton")
    .Icon("microphone-outline")
    .StopIcon("stop-sm")
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-speechtotextbutton name="speechButton"
    icon="microphone-outline"
    stop-icon="stop-sm">
</kendo-speechtotextbutton>
```
{% endif %}

## See Also

* [Appearance of the SpeechToTextButton for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/speechtotextbutton/appearance)
* [Server-Side API of the SpeechToTextButton](/api/speechtotextbutton)
{% if site.core %}
* [Server-Side API of the SpeechToTextButton TagHelper](/api/taghelpers/speechtotextbutton)
{% endif %}
* [Client-Side API of the SpeechToTextButton](https://docs.telerik.com/kendo-ui/api/javascript/ui/speechtotextbutton)