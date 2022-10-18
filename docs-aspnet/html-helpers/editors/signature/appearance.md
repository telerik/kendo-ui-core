---
title: Appearance
page_title: Telerik UI Signature for {{ site.framework }} Documentation - Signature Appearance
description: "Learn how to modify the appearance of the Telerik UI Signature for {{ site.framework }} component."
slug: appearance_telerikui_signature_component
position: 2
---

# Signature Appearance

The Telerik UI Signature for {{ site.framework }} component enables you to change various appearance aspects about the component.

The following example demonstrates a Signature component with custom appearance settings.

```HtmlHelper
    @(Html.Kendo().Signature()
                .StrokeWidth(4)
                .BackgroundColor("#fad980")
                .Color("#212121")
                .Width(500)
                .Height(200)
                )
```
{% if site.core %}
```TagHelper
    <kendo-signature stroke-width="4"
                     background-color="#fad980"
                     color="#212121"
                     width="500"
                     height="200">
    </kendo-signature>
```
{% endif %}

## Background Color

To modify the background color of the Signature container, use its [`BackgroundColor`](https://docs.telerik.com/{{ site.platform }}/api/Kendo.Mvc.UI.Fluent/SignatureBuilder#backgroundColor) configuration.

```HtmlHelper
    @(Html.Kendo().Signature()
                .BackgroundColor("#fad980"))
```
{% if site.core %}
```TagHelper
    <kendo-signature backgroundColor="#fad980">
    </kendo-signature>
```
{% endif %}

## Stroke Color

You can also change the stroke color of the Signature by using its [`Color`](https://docs.telerik.com/{{ site.platform }}/api/Kendo.Mvc.UI.Fluent/SignatureBuilder#color) configuration.

```HtmlHelper
    @(Html.Kendo().Signature()
                .Color("#fad980"))
```
{% if site.core %}
```TagHelper
    <kendo-signature color="#fad980">
    </kendo-signature>
```
{% endif %}

## Stroke Width

To update the stroke width of the Signature, utilize its [`StrokeWidth`](https://docs.telerik.com/{{ site.platform }}/api/Kendo.Mvc.UI.Fluent/SignatureBuilder#strokewidth) configuration.

```HtmlHelper
    @(Html.Kendo().Signature()
                .StrokeWidth(4))
```
{% if site.core %}
```TagHelper
    <kendo-signature strokeWidth="4">
    </kendo-signature>
```
{% endif %}

## See Also

* [Demo Page for the Signature](https://demos.telerik.com/{{ site.platform }}/signature)
* [API Reference of the Signature](https://docs.telerik.com/{{ site.platform }}/api/Kendo.Mvc.UI.Fluent/SignatureBuilder)
* [Knowledge Base Section](/knowledge-base)