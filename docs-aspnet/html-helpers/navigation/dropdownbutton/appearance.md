---
title: Appearance
page_title: Appearance
description: "Learn how to customize the appearance of the Telerik UI DropDownButton HtmlHelper for {{ site.framework }}."
components: ["dropdownbutton"]
slug: htmlhelpers_dropdownbutton_aspnetcore_appearance
position: 3
---

# Appearance

In this article, you will find information about the rendering and styling options of the {{ site.product }} DropDownButton.

For a live example, refer to the [Appearance Demo of the DropDownButton](https://demos.telerik.com/{{ site.platform }}/dropdownbutton/appearance).

## Options

The DropDownButton provides the following methods for styling:

- [`Size()`](#size)—configures the overall size of the component.
- [`ThemeColor()`](#themecolor)—configures what color will be applied to the component.
- [`FillMode()`](#fillmode)—defines how the color is applied to the component.
- [`Rounded()`](#rounded)—determines the border radius of the component.
- [`ShowArrowButton()`](#showarrowbutton)—shows an arrow indicator in the button.

### Size

To control the size of the DropDownButton, configure the `Size()` method with any of the following values:

- `Small`
- `Medium`
- `Large`
- `None`

> When not explicitly set, the applied theme controls the default size.

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
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-dropdownbutton name="DropDownButton" icon="clipboard" size="ComponentSize.Medium">
        <dropdownbutton-items>
            <item id="keep-text" text="Keep Text Only" icon="clipboard-text"></item>
            <item id="paste-html" text="Paste as HTML" icon="clipboard-code"></item>
            <item id="paste-markdown" text="Paste Markdown" icon="clipboard-markdown"></item>
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

> When not explicitly set, the applied theme controls the default fill mode.

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
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-dropdownbutton name="DropDownButton" icon="clipboard" fill-mode="FillMode.Solid">
        <dropdownbutton-items>
            <item id="keep-text" text="Keep Text Only" icon="clipboard-text"></item>
            <item id="paste-html" text="Paste as HTML" icon="clipboard-code"></item>
            <item id="paste-markdown" text="Paste Markdown" icon="clipboard-markdown"></item>
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

> When not explicitly set, the applied theme controls the default theme color.

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
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-dropdownbutton name="DropDownButton" icon="clipboard" theme-color="ThemeColor.Base">
        <dropdownbutton-items>
            <item id="keep-text" text="Keep Text Only" icon="clipboard-text"></item>
            <item id="paste-html" text="Paste as HTML" icon="clipboard-code"></item>
            <item id="paste-markdown" text="Paste Markdown" icon="clipboard-markdown"></item>
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

> When not explicitly set, the applied theme controls the default border radius.

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
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-dropdownbutton name="DropDownButton" icon="clipboard" rounded="Rounded.Medium">
        <dropdownbutton-items>
            <item id="keep-text" text="Keep Text Only" icon="clipboard-text"></item>
            <item id="paste-html" text="Paste as HTML" icon="clipboard-code"></item>
            <item id="paste-markdown" text="Paste Markdown" icon="clipboard-markdown"></item>
        </dropdownbutton-items>
    </kendo-dropdownbutton>
```
{% endif %}

### ShowArrowButton

Enable the `ShowArrowButton()` option to render a down arrow in the DropDownButton that opens and closes its popup. By default, the arrow indicator is not displayed.

```HtmlHelper
    @(Html.Kendo().DropDownButton()
        .Name("DropDownButton")
        .Text("Paste")
        .ShowArrowButton(true)
        .Items(items =>
        {
            items.Add().Id("keep-text").Text("Keep Text Only").Icon("clipboard-text");
            items.Add().Id("paste-html").Text("Paste as HTML").Icon("clipboard-code");
            items.Add().Id("paste-markdown").Text("Paste Markdown").Icon("clipboard-markdown");
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-dropdownbutton name="DropDownButton" text="Paste" show-arrow-button="true">
        <dropdownbutton-items>
            <item id="keep-text" text="Keep Text Only" icon="clipboard-text"></item>
            <item id="paste-html" text="Paste as HTML" icon="clipboard-code"></item>
            <item id="paste-markdown" text="Paste Markdown" icon="clipboard-markdown"></item>
        </dropdownbutton-items>
    </kendo-dropdownbutton>
```
{% endif %}

## Rendering

To review the rendering of the component, refer to the HTML specifications in the [Kendo UI Themes Monorepo](https://github.com/telerik/kendo-themes/tree/develop). The `tests` folder of the repository contains the rendering for all flavors of the components, providing a clear reference for how their elements are structured. The rendering information can help you customize a component's appearance and behavior by applying custom CSS or JavaScript to suit specific design or functional requirements.

## See Also

* [Appearance of the DropDownButton HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/dropdownbutton/appearance)
* [Server-Side API](/api/dropdownbutton)
{% if site.core %}
* [Server-Side TagHelper API](/api/taghelpers/dropdownbutton)
{% endif %}
* [Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/dropdownbutton)