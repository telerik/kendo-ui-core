---
title: Placeholder
page_title: Placeholder
description: "Get started with the Telerik UI Sortable component for {{ site.framework }} and learn how to customize the placeholder."
slug: htmlhelpers_sortable_aspnetcore_placeholder
position: 5
---

# Placeholder

You can change the default placeholder of the Sortable by setting the `placeholder` configuration option.

The following example demonstrates how to build the placeholder from the dragged element.

```HtmlHelper
    <ul id="sortable">
        <li>ItemA1</li>
        <li>ItemA2</li>
        <li>ItemA3</li>
    </ul>

    @(Html.Kendo().Sortable()
        .For("#sortable")
        .PlaceholderHandler("placeholderCustom")
    )

    <script>
        function placeholderCustom(element) {
            return element.clone().css({
                "opacity": 0.3,
                "border": "1px dashed #000000"
            });
        }
    </script>
```
{% if site.core %}
```TagHelper
     <ul id="sortable">
        <li>ItemA1</li>
        <li>ItemA2</li>
        <li>ItemA3</li>
    </ul>

    <kendo-sortable name="sortable" placeholder="placeholderCustom" >
    </kendo-sortable>

    <script>
        function placeholderCustom(element) {
            return element.clone().css({
                "opacity": 0.3,
                "border": "1px dashed #000000"
            });
        }
    </script>
```
{% endif %}

The following example demonstrates how to build a static placeholder.

```HtmlHelper

    <ul id="sortable">
        <li>ItemA1</li>
        <li>ItemA2</li>
        <li>ItemA3</li>
    </ul>

    @(Html.Kendo().Sortable()
        .For("#sortable")
        .Placeholder("<li>Drop Here!</li>")
    )
```
{% if site.core %}
```TagHelper
     <ul id="sortable">
        <li>ItemA1</li>
        <li>ItemA2</li>
        <li>ItemA3</li>
    </ul>

    <kendo-sortable name="sortable" placeholder="placeholderHtml" >
    </kendo-sortable>

    <script>
        function placeholderHtml(element) {
            return "<li>Drop Here!</li>"
        }
    </script>
```
{% endif %}

## See Also

* [Basic Usage of the Sortable HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/sortable/index)
{% if site.core %}
* [Basic Usage of the Sortable TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/sortable/tag-helper)
{% endif %}
* [Server-Side API](/api/sortable)
