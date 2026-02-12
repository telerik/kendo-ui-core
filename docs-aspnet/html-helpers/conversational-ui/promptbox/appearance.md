---
title: Appearance
page_title: Appearance
description: "Specify the appearance of the Telerik UI for {{ site.framework }} PromptBox buttons."
slug: htmlhelpers_promptbox_appearance_aspnetcore
position: 4
components: ["promptbox"]
---

# PromptBox Appearance

The PromptBox provides predefined appearance options such as different sizes, border radiuses, fill modes and theme colors for its built-in button controls.

## Size

The PromptBox allows you to configure the size of its buttons. To achieve this utilize the `Size` option for each button configuration.

The supported values are:
* `Small`
* `Medium` (default)
* `Large`
* `None`

```HtmlHelper
    @(Html.Kendo().PromptBox()
        .Name("promptBox")
        .ActionButton(button => button
            .Size(ComponentSize.Large)
        )
    )
```
{% if site.core %}
```TagHelper
    <kendo-promptbox name="promptBox">
        <action-button size="ComponentSize.Large">
        </action-button>
    </kendo-promptbox>
```
{% endif %}

## Roundness

The PromptBox enables you to apply different `border radius` to its buttons through the `Rounded` option.

The supported values are:
* `Small`
* `Medium` (default)
* `Large`
* `Full`
* `None`

```HtmlHelper
    @(Html.Kendo().PromptBox()
        .Name("promptBox")
        .ActionButton(button => button
            .Rounded(Rounded.Full)
        )
    )
```
{% if site.core %}
```TagHelper
    <kendo-promptbox name="promptBox">
        <action-button rounded="Rounded.Full">
        </action-button>
    </kendo-promptbox>
```
{% endif %}

## Fill Mode

The PromptBox allows you to set different fill modes for its buttons by using the `FillMode` option.

The supported values are:
* `Solid` (default)
* `Flat`
* `Outline`
* `Link`
* `Clear`
* `None`

```HtmlHelper
    @(Html.Kendo().PromptBox()
        .Name("promptBox")
        .ActionButton(button => button
            .FillMode(FillMode.Flat)
        )
    )
```
{% if site.core %}
```TagHelper
    <kendo-promptbox name="promptBox">
        <action-button fill-mode="FillMode.Flat">
        </action-button>
    </kendo-promptbox>
```
{% endif %}

## Theme Colors

The PromptBox allows you to set different theme colors for its buttons by using the `ThemeColor` option.

The supported values include:
* `Base` (default)
* `Primary`
* `Secondary`
* `Tertiary`
* `Info`
* `Success`
* `Warning`
* `Error`
* `Dark`
* `Light`
* `Inverse`
* `None`

```HtmlHelper
    @(Html.Kendo().PromptBox()
        .Name("promptBox")
        .ActionButton(button => button
            .ThemeColor(ThemeColor.Primary)
        )
    )
```
{% if site.core %}
```TagHelper
    <kendo-promptbox name="promptBox">
        <action-button theme-color="ThemeColor.Primary">
        </action-button>
    </kendo-promptbox>
```
{% endif %}

## See Also

* [Server-Side API of the PromptBox HtmlHelper](/api/promptbox)
{% if site.core %}
* [Server-Side API of the PromptBox TagHelper](/api/taghelpers/promptbox)
{% endif %}
* [JavaScript API Reference of the PromptBox](/api/javascript/ui/promptbox)
* [PromptBox Adornments]({% slug htmlhelpers_promptbox_adornments_aspnetcore %})
* [PromptBox Modes]({% slug htmlhelpers_promptbox_modes_aspnetcore %}
