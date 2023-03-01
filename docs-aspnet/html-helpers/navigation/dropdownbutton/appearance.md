---
title: Appearance
page_title: Appearance
description: "Learn how to customize the appearance of the Telerik UI DropDownButton HtmlHelper for {{ site.framework }}."
slug: htmlhelpers_dropdownbutton_aspnetcore_appearance
position: 3
---

# Appearance

In this article, you will find information about the rendering and styling options of the {{ site.product }} DropDownButton.

For general information regarding the rendering, visit the [Components Rendering](https://docs.telerik.com/{{ site.platform }}/styles-and-layout/components-rendering-overview) article.

For a complete example, refer to the [Appearance Demo of the DropDownButton](https://demos.telerik.com/{{ site.platform }}/dropdownbutton/appearance).

## Options

The DropDownButton provides the following methods for styling:

- [`Size()`](#size)—configures the overall size of the component.
- [`ThemeColor()`](#themecolor)—configures what color will be applied to the component.
- [`FillMode()`](#fillmode)—defines how the color is applied to the component.
- [`Rounded()`](#rounded)—determines the border radius of the component.

### Size

To control the size of the DropDownButton, configure the `Size()` method with any of the following values:

- `Small`
- `Medium`
- `Large`
- `None`

The default `Size` value is `Medium`.

```HtmlHelper
    @(Html.Kendo().DropDownButton()
        .Name("DropDownButton")
        .Icon("clipboard")
        .Size(ComponentSize.Medium)
        .Items(items =>
        {
            items.Add().Id("keep-text").Text("Keep Text Only").Icon("clipboard-text");
            items.Add().Id("paste-html").Text("Paste as HTML").Icon("clipboard-code");
            items.Add().Id("paste-markdown").Text("Paste Markdown").Icon("clipboard-markdown");
        }
    )
```
{% if site.core %}
```TagHelper
    <kendo-dropdownbutton name="DropDownButton" text="Paste" icon="paste" size="ComponentSize.Medium">
        <dropdownbutton-items>
            <item id="keep-text" text="Keep Text Only" icon="paste-plain-text"></item>
            <item id="paste-html" text="Paste as HTML" icon="paste-as-html"></item>
            <item id="paste-markdown" text="Paste Markdown" icon="paste-markdown"></item>
        </dropdownbutton-items>
    </kendo-dropdownbutton>
```
{% endif %}

### FillMode

To manipulate the fill mode of the DropDownButton, configure the `FillMode()` method with any of the following values:

- `Solid`
- `Outline`
- `Flat`
- `None`

The default `FillMode` value is `Solid`.

```HtmlHelper
    @(Html.Kendo().DropDownButton()
        .Name("DropDownButton")
        .Icon("clipboard")
        .FillMode(FillMode.Solid)
        .Items(items =>
        {
            items.Add().Id("keep-text").Text("Keep Text Only").Icon("clipboard-text");
            items.Add().Id("paste-html").Text("Paste as HTML").Icon("clipboard-code");
            items.Add().Id("paste-markdown").Text("Paste Markdown").Icon("clipboard-markdown");
        }
    )
```
{% if site.core %}
```TagHelper
    <kendo-dropdownbutton name="DropDownButton" text="Paste" icon="paste" fill-mode="FillMode.Solid">
        <dropdownbutton-items>
            <item id="keep-text" text="Keep Text Only" icon="paste-plain-text"></item>
            <item id="paste-html" text="Paste as HTML" icon="paste-as-html"></item>
            <item id="paste-markdown" text="Paste Markdown" icon="paste-markdown"></item>
        </dropdownbutton-items>
    </kendo-dropdownbutton>
```
{% endif %}

### ThemeColor

To specify the theme color of the DropDownButton, configure the `ThemeColor()` method with any of the following values:

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

The default `ThemeColor` value is `Base`.

```HtmlHelper
    @(Html.Kendo().DropDownButton()
        .Name("DropDownButton")
        .Icon("clipboard")
        .ThemeColor(ThemeColor.Base)
        .Items(items =>
        {
            items.Add().Id("keep-text").Text("Keep Text Only").Icon("clipboard-text");
            items.Add().Id("paste-html").Text("Paste as HTML").Icon("clipboard-code");
            items.Add().Id("paste-markdown").Text("Paste Markdown").Icon("clipboard-markdown");
        }
    )
```
{% if site.core %}
```TagHelper
    <kendo-dropdownbutton name="DropDownButton" text="Paste" icon="paste" theme-color="ThemeColor.Base">
        <dropdownbutton-items>
            <item id="keep-text" text="Keep Text Only" icon="paste-plain-text"></item>
            <item id="paste-html" text="Paste as HTML" icon="paste-as-html"></item>
            <item id="paste-markdown" text="Paste Markdown" icon="paste-markdown"></item>
        </dropdownbutton-items>
    </kendo-dropdownbutton>
```
{% endif %}

### Rounded

To set the border radius of the DropDownButton, configure the `Rounded()` method with any of the following values:

- `Small`
- `Medium`
- `Large`
- `Full`
- `None`

The default `Rounded` value is `Medium`.

```HtmlHelper
    @(Html.Kendo().DropDownButton()
        .Name("DropDownButton")
        .Icon("clipboard")
        .Rounded(Rounded.Medium)
        .Items(items =>
        {
            items.Add().Id("keep-text").Text("Keep Text Only").Icon("clipboard-text");
            items.Add().Id("paste-html").Text("Paste as HTML").Icon("clipboard-code");
            items.Add().Id("paste-markdown").Text("Paste Markdown").Icon("clipboard-markdown");
        }
    )
```
{% if site.core %}
```TagHelper
    <kendo-dropdownbutton name="DropDownButton" text="Paste" icon="paste" rounded="Rounded.Medium">
        <dropdownbutton-items>
            <item id="keep-text" text="Keep Text Only" icon="paste-plain-text"></item>
            <item id="paste-html" text="Paste as HTML" icon="paste-as-html"></item>
            <item id="paste-markdown" text="Paste Markdown" icon="paste-markdown"></item>
        </dropdownbutton-items>
    </kendo-dropdownbutton>
```
{% endif %}

## See Also

* [Appearance of the DropDownButton HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/dropdownbutton/appearance)
* [Button Server-Side API](/api/button)
* [Button Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/dropdownbutton)