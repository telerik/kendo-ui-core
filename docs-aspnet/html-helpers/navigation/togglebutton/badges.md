---
title: Badges
page_title: ToggleButton Badges
description: "Include a badge and enhance the meaning of the text content of the Telerik UI ToggleButton component for {{ site.framework }}."
slug: badges_togglebutton_aspnetcore
position: 4
---

# Badges

The ToggleButton can incorporate a [Badge](https://docs.telerik.com/{{ site.platform }}/html-helpers/layout/badge/overview) to enhance the meaning of the text content.

The ToggleButton provides the `Badge()` configuration method for configuring the ToggleButton's Badge. The [API](/api/kendo.mvc.ui.fluent/buttonbadgesettingsbuilder) exposes several methods that you can use to customize the appearance of the Badge:

* `Shape()`&mdash;Specifies the shape of the badge. The default value is `Rounded`.
* `Size()`&mdash;Sets the proportions of the badge. The default size is `Medium`
* `ThemeColor()`&mdash;Configures the default theme color for the badge. The default value is `Primary`.
* `Position()`&mdash;Defines the position of the Badge of the badge. The default value is `Inline`.
* `Fill()`&mdash;Species the fill mode of the badge. The default value is `Solid`. 
* `Visible()`&mdash;Configures the visible state of the badge.
* `Align()`&mdash;Defines the alignment of the badge.
* `CutoutBorder()`&mdash;Specifies wether or not to render additional cutout border around the badge.


```HtmlHelper
    @(Html.Kendo().ToggleButton()
        .Name("toggleButton")
        .Content("Text ToggleButton")
        .Badge(badge => badge
            .Text("+5")
            .CutoutBorder(true)
            .Shape(BadgeShape.Rectangle)
            .Size(BadgeSize.Large)
            .ThemeColor(BadgeColor.Success)
            .Position(BadgePosition.Outside)
            .Align(BadgeAlign.TopEnd)
        )
    )
```
{% if site.core %}
```TagHelper
    <kendo-togglebutton name="toggleButton">
        <badge text="+5"
            cutout-border="true"
            visible="true"
            fill="@BadgeFill.Solid"
            shape="@BadgeShape.Rectangle"
            size="@BadgeSize.Large"
            theme-color="@BadgeColor.Success"
            position="@BadgePosition.Outside"
            align="@BadgeAlign.TopEnd" />
        Text ToggleButton
    </kendo-togglebutton>
```
{% endif %}


 The `Icon()` method displays the appropriate [Kendo UI for jQuery font icon](https://docs.telerik.com/kendo-ui/styles-and-layout/icons-web) icon. The icon is rendered inside the badge by a `span.k-icon` or `span.k-svg-icon` element.

```HtmlHelper
    @(Html.Kendo().ToggleButton()
        .Name("toggleButton")
        .Content("Text ToggleButton")
        .Badge(badge => badge
            .Shape(BadgeShape.Circle)
            .Size(BadgeSize.Large)
            .ThemeColor(BadgeColor.Success)
            .Position(BadgePosition.Edge)
            .Align(BadgeAlign.TopStart)
            .Icon("save")
        )
    )
```
{% if site.core %}
```TagHelper
    <kendo-button name="toggleButton">
        <badge icon="save"
               shape="@BadgeShape.Circle"
               size="@BadgeSize.Medium"
               theme-color="@BadgeColor.Success"
               position="@BadgePosition.Edge"
               align="@BadgeAlign.TopStart" />
        Text ToggleButton
    </kendo-button>
```
{% endif %}

## See Also

* [Adding Badges to the ToggleButton HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/togglebutton/badges)
* [Server-Side API](/api/togglebutton)
