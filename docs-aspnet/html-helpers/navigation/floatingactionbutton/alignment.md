---
title: Alignment
page_title: Alignment
description: "Learn about the alignment options of the Telerik UI FloatingActionButton component for {{ site.framework }} and learn how to configure the positioning of the widget."
slug: htmlhelpers_alignment_floatingactionbutton_aspnetcore
position: 2
---

# Alignment

The Telerik UI FloatingActionButton for {{ site.framework }} exposes the `Align`, `AlignOffset` and `PositionMode` configuration options. These three options work together and allow you to position the FloatingActionButton component precisely as per the application requirements.


* [Alignment Demo for the FloatingActionButton](https://demos.telerik.com/{{ site.platform }}/floatingactionbutton/alignment)

## Align

The `Align` configuration option specifies the position of the FloatingActionButton relative to its container. When using this option, it is important to ensure that the FloatingActionButton container has a [CSS position](https://developer.mozilla.org/en-US/docs/Web/CSS/position) other than `static` and allows [overflow content](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow). 

```HtmlHelper
    @(Html.Kendo().FloatingActionButton()
            .Name("fab")
            .Align(FloatingActionButtonAlign.TopCenter)
    )   
```
{% if site.core %}
```TagHelper
    <kendo-floatingactionbutton name="fab"
                                align="FloatingActionButtonAlign.TopCenter">
    </kendo-floatingactionbutton>
```
{% endif %}

## AlignOffset

The `AlignOffset` configuration option specifies the horizontal and vertical offset of the FloatingActionButton relative to the `Align` configuration defined.

```HtmlHelper
    @(Html.Kendo().FloatingActionButton()
        .Name("fab")
        .Align(FloatingActionButtonAlign.BottomStart)
        .AlignOffset(ao=>ao.Horizontal(50).Vertical(50))
    )
```
{% if site.core %}
```TagHelper
    <kendo-floatingactionbutton name="fab"
                                align="FloatingActionButtonAlign.BottomStart"
                                align-offset-horizontal="50"
                                align-offset-vertical="50">
    </kendo-floatingactionbutton>
```
{% endif %}

## PositonMode

The `PositionMode` configuration option specifies the CSS position of the FloatingActionButton in the document. You can position the FloatingActionButton relative to the closest ancestor or position it relative to the viewport.

```HtmlHelper
    @(Html.Kendo().FloatingActionButton()
        .Name("fab")
        .Align(FloatingActionButtonAlign.BottomStart)
        .AlignOffset(ao=>ao.Horizontal(50).Vertical(50))
        .PositionMode(FloatingActionButtonPositionMode.Fixed) //positions the button relative to the viewport
    )
```
{% if site.core %}
```TagHelper
    <kendo-floatingactionbutton name="fab"
                                align="FloatingActionButtonAlign.BottomStart"
                                align-offset-horizontal="50"
                                align-offset-vertical="50"
                                position-mode="FloatingActionButtonPositionMode.Fixed"> //positions the button relative to the viewport
    </kendo-floatingactionbutton>
```
{% endif %}

## See Also

* [Alignment of the FloatingActionButton HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/floatingactionbutton/alignment)
* [Using the API of the FloatingActionButton HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/floatingactionbutton/api)
* [Server-Side API](/api/floatingactionbutton)
