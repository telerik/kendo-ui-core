---
title: Appearance
page_title: Appearance
description: "Learn how to customize the Telerik UI FloatingActionButton component for {{ site.framework }} by setting its size, color, border, and icon."
slug: htmlhelpers_appearance_floatingactionbutton_aspnetcore
position: 3
---

# Appearance

In this article, you will find information about the styling options and rendering of the {{ site.product }} FloatingActionButton.

For a complete example, refer to the [Appearance Demo of the FloatingActionButton](https://demos.telerik.com/{{ site.platform }}/floatingactionbutton/appearance).

## Options

The FloatingActionButton component provides the following options for styling:

- [`Size()`](#size)&mdash;Configures the size of the component.
- [`FillMode()`](#fillmode)&mdash;Defines how the color is applied to the button.
- [`ThemeColor()`](#themecolor)&mdash;Sets the color applied to the component.
- [`Rounded()`](#rounded)&mdash;Determines the border radius of the component.

### Size

To control the size of the FloatingActionButton, configure the `Size` option with any of the following values:

- `Small`
- `Medium` (the default size)
- `Large`
- `None`

```HtmlHelper
    @(Html.Kendo().FloatingActionButton()
        .Name("fab")
        .Size(FloatingActionButtonSize.Large)
        .Icon("home")
        .Text("Home")
    )
```
{% if site.core %}
```TagHelper
    <kendo-floatingactionbutton name="fab"
        size="FloatingActionButtonSize.Large"
        icon="home"
        text="Home">
    </kendo-floatingactionbutton>
```
{% endif %}

### FillMode

The `FillMode()` method specifies how the color is applied to the component. The default fill mode of the FloatingActionButton is `Solid`.

```HtmlHelper
    @(Html.Kendo().FloatingActionButton()
        .Name("fab")
        .FillMode(FloatingActionButtonFillMode.Solid)
        .Icon("home")
        .Text("Home")
    )
```
{% if site.core %}
```TagHelper
    <kendo-floatingactionbutton name="fab"
        fill-mode="FloatingActionButtonFillMode.Solid"
        icon="home"
        text="Home">
    </kendo-floatingactionbutton>
```
{% endif %}

### ThemeColor

The `ThemeColor` configuration provides a variety of colors that can be applied to the component. The available options are:

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

The default `ThemeColor` is `Primary`.

```HtmlHelper
    @(Html.Kendo().FloatingActionButton()
        .Name("fab")
        .ThemeColor(FloatingActionButtonThemeColor.Secondary)
        .Icon("home")
        .Text("Home")
    )
```
{% if site.core %}
```TagHelper
    <kendo-floatingactionbutton name="fab"
        theme-color="FloatingActionButtonThemeColor.Secondary"
        icon="home"
        text="Home">
    </kendo-floatingactionbutton>
```
{% endif %}

### Rounded

The border radius of the FloatingActionButton can be customized through the `Rounded()` method. The default option is `Full`.

```HtmlHelper
    @(Html.Kendo().FloatingActionButton()
        .Name("fab")
        .Rounded(FloatingActionButtonRounded.Large)
        .Icon("home")
        .Text("Home")
    )
```
{% if site.core %}
```TagHelper
    <kendo-floatingactionbutton name="fab"
        rounded="FloatingActionButtonRounded.Large"
        icon="home"
        text="Home">
    </kendo-floatingactionbutton>
```
{% endif %}

The following values are available for the `Rounded` option:

- `Small`
- `Medium`
- `Large`
- `Full`
- `None`

@[template](/_contentTemplates/components-rendering-section.md#components-rendering-section)

## Best Practices

The Material Design guidelines dictate that:

* When you configure the FloatingActionButton to display additional related actions (speed dial actions), you must configure only an icon for the button without a label. Use labels to display additional information for the related actions.

* If the application requires an icon and a label for the FloatingActionButton, consider omitting the additional actions.

```HtmlHelper
    @(Html.Kendo().FloatingActionButton()
        .Name("fab")
        .Icon("plus")
        .Text("Add To Cart")
    )
```
{% if site.core %}
```TagHelper
    <kendo-floatingactionbutton name="fab"
        icon="plus"
        text="Add To Cart">
    </kendo-floatingactionbutton>
```
{% endif %}

## Icons

The `Icon()` configuration option accepts a name of an icon. The specified icon must be available in the used Kendo UI theme. For more details on the available icons, refer to the [Web Components Icons font](https://www.telerik.com/design-system/docs/foundation/iconography/icon-list/).

```HtmlHelper
    @(Html.Kendo().FloatingActionButton()
        .Name("fab")
        .Icon("plus")
        .Items(items=>{
            items.Add().Icon("star").Label("Add Rating");
            items.Add().Icon("pencil").Label("Add comment");
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-floatingactionbutton name="fab" icon="plus">
        <floatingactionbutton-items>
            <floatingactionbutton-item label="Add Rating" icon="star"></floatingactionbutton-item>
            <floatingactionbutton-item label="Add Comment" icon="edit"></floatingactionbutton-item>
        </floatingactionbutton-items>
    </kendo-floatingactionbutton>
```
{% endif %}

## See Also

* [Components Appearance Overview]({% slug components_rendering_overview %})
* [Appearance of the FloatingActionButton HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/floatingactionbutton/appearance)
* [Server-Side HtmlHelper API](/api/floatingactionbutton)
{% if site.core %}
* [Server-Side TagHelper API](/api/taghelpers/floatingactionbutton)
{% endif %}
* [Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/floatingactionbutton)
