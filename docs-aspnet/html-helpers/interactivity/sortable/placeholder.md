---
title: Placeholder
page_title: Placeholder
description: "Get started with the Telerik UI Sortable HtmlHelper for {{ site.framework }} and learn how to customize the placeholder."
slug: htmlhelpers_sortable_aspnetcore_placeholder
position: 5
---

# Placeholder

You can change the default placeholder of the Sortable by setting the `placeholder` configuration option.

The following example demonstrates how to build the placeholder from the dragged element.

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

The following example demonstrates how to build a static placeholder.

    <ul id="sortable">
        <li>ItemA1</li>
        <li>ItemA2</li>
        <li>ItemA3</li>
    </ul>

    @(Html.Kendo().Sortable()
        .For("#sortable")
        .Placeholder("<li>Drop Here!</li>")
    )


## See Also

* [Basic Usage of the Sortable HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/sortable/index)
* [Server-Side API](/api/sortable)
