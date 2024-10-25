---
title: Appearance
page_title: Appearance
description: "Learn how to customize the appearance of the Telerik UI SplitButton HtmlHelper for {{ site.framework }}."
slug: htmlhelpers_splitbutton_aspnetcore_appearance
position: 3
---

# Appearance

In this article, you will find information about the rendering and styling options of the {{ site.product }} SplitButton.

For a live example, refer to the [Appearance Demo of the SplitButton](https://demos.telerik.com/{{ site.platform }}/splitbutton/appearance).

## Options

The SplitButton provides the following methods for styling:

- [`Size()`](#size)—configures the overall size of the component.
- [`ThemeColor()`](#themecolor)—configures what color will be applied to the component.
- [`FillMode()`](#fillmode)—defines how the color is applied to the component.
- [`Rounded()`](#rounded)—determines the border radius of the component.

### Size

To control the size of the SplitButton, configure the `Size()` method with any of the following values:

- `Small`
- `Medium`
- `Large`
- `None`

The default `Size` value is `Medium`.

```HtmlHelper
    @(Html.Kendo().SplitButton()
        .Name("splitButton")
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
    <kendo-splitbutton name="splitButton" text="Paste" icon="clipboard" size="ComponentSize.Medium">
        <splitbutton-items>
            <item id="keep-text" text="Keep Text Only" icon="clipboard-text"></item>
            <item id="paste-html" text="Paste as HTML" icon="clipboard-code"></item>
            <item id="paste-markdown" text="Paste Markdown" icon="clipboard-markdown"></item>
        </splitbutton-items>
    </kendo-splitbutton>
```
{% endif %}

### FillMode

To manipulate the fill mode of the SplitButton, configure the `FillMode()` method with any of the following values:

- `Solid`
- `Outline`
- `Flat`
- `None`

The default `FillMode` value is `Solid`.

```HtmlHelper
    @(Html.Kendo().SplitButton()
        .Name("splitButton")
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
    <kendo-splitbutton name="splitButton" text="Paste" icon="clipboard" fill-mode="FillMode.Solid">
        <splitbutton-items>
            <item id="keep-text" text="Keep Text Only" icon="clipboard-text"></item>
            <item id="paste-html" text="Paste as HTML" icon="clipboard-code"></item>
            <item id="paste-markdown" text="Paste Markdown" icon="clipboard-markdown"></item>
        </splitbutton-items>
    </kendo-splitbutton>
```
{% endif %}

### ThemeColor

To specify the theme color of the SplitButton, configure the `ThemeColor()` method with any of the following values:

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
    @(Html.Kendo().SplitButton()
        .Name("splitButton")
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
    <kendo-splitbutton name="splitButton" text="Paste" icon="clipboard" theme-color="ThemeColor.Base">
        <splitbutton-items>
            <item id="keep-text" text="Keep Text Only" icon="clipboard-text"></item>
            <item id="paste-html" text="Paste as HTML" icon="clipboard-code"></item>
            <item id="paste-markdown" text="Paste Markdown" icon="clipboard-markdown"></item>
        </splitbutton-items>
    </kendo-splitbutton>
```
{% endif %}

### Rounded

To set the border radius of the SplitButton, configure the `Rounded()` method with any of the following values:

- `Small`
- `Medium`
- `Large`
- `Full`
- `None`

The default `Rounded` value is `Medium`.

```HtmlHelper
    @(Html.Kendo().SplitButton()
        .Name("splitButton")
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
    <kendo-splitbutton name="splitButton" text="Paste" icon="clipboard" rounded="Rounded.Medium">
        <splitbutton-items>
            <item id="keep-text" text="Keep Text Only" icon="clipboard-text"></item>
            <item id="paste-html" text="Paste as HTML" icon="clipboard-code"></item>
            <item id="paste-markdown" text="Paste Markdown" icon="clipboard-markdown"></item>
        </splitbutton-items>
    </kendo-splitbutton>
```
{% endif %}

## Rendering
 
To review the rendering of the component, refer to the HTML specifications in the [Kendo UI Themes Monorepo](https://github.com/telerik/kendo-themes/tree/develop). The `tests` folder of the repository contains the rendering for all flavors of the components, providing a clear reference for how their elements are structured. The rendering information can help you customize a component's appearance and behavior by applying custom CSS or JavaScript to suit specific design or functional requirements.

## See Also

* [Appearance of the SplitButton HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/splitbutton/appearance)
* [Server-Side API](/api/splitbutton)
{% if site.core %}
* [Server-Side TagHelper API](/api/taghelpers/splitbutton)
{% endif %}
* [Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/splitbutton)