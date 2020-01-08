---
title: Content
page_title: Content
description: "Use the options for loading and configuring the content of the Telerik UI Tooltip HtmlHelper for {{ site.framework }}."
previous_url: /helpers/layout/tooltip/content
slug: htmlhelpers_tooltip_aspnetcore_content
position: 2
---

# Content

The Tooltip provides options for loading and configuring its content.

## Defining Static Content

To define static content, use the `Content()` configuration method.

```
   <span id="tooltip" class="k-button wider">Hover me!</span>

    @(Html.Kendo().Tooltip()
        .For("#tooltip")
        .Position(TooltipPosition.Top)
        .Content("Hello!")
    )
```

## Using Content Template

To specify the layout of the content and that will be displayed, use the `ContentTemplateId` configuration method.

For more information on the capabilities and syntax of the templates, refer to the [Kendo UI Templates Overview documentation article](https://docs.telerik.com/kendo-ui/framework/templates/overview). For a runnable example, refer to the [Templates demo](https://demos.telerik.com/{{ site.platform }}/tooltip/template).

The following example demonstrates how to customize the Tooltip by referencing a script tag by its `id`.

```
    <ul id="products">
        <li>
            <a href="#" data-id="11" title="A cheese made in the artisan tradition by rural dairy farmers in the north of Spain">
                Queso de Cabrales
            </a>
        </li>
        <li>
            <a href="#" data-id="12" title="A cheese made in the La Mancha region of Spain from the milk of sheep of the Manchega breed">
                Queso<br />Manchego
            </a> 
        </li>
    </ul>

    @(Html.Kendo().Tooltip()
        .For("#products")
        .Filter("a")        
        .ContentTemplateId("template")
        .Position(TooltipPosition.Top)
    )

    <script id="template" type="text/x-kendo-template">
        <div class="template-wrapper">
            <p>#=target.data('id')#</p>
            <p>#=target.data('title')#</p>
        </div>
    </script>
```

## Loading Content with AJAX

{{ site.product }} Tooltip provides built-in support for asynchronously loading content from remote URLs. These URLs return HTML content that can be loaded in the  content area of the Tooltip.

The following example demonstrates how to load the content asynchronously with AJAX by using the `LoadContentFrom` configuration method.

```
@(Html.Kendo().Tooltip()
    .For("#products")
    .Filter("a")
    .LoadContentFrom("Details", "Tooltip")
    .Position(TooltipPosition.Top)
    .Width(220)
    .Height(280)
    .Events(events => events.RequestStart("requestStart"))
)
<script type="text/javascript">
    function requestStart(e) {
        e.options.data = {
            id: e.target.data("id")
        }
    }
</script>
```

For a complete example, refer to the [Loading Content with AJAX Demo](https://demos.telerik.com/{{ site.platform }}/tooltip/ajax).

## See Also

* [Content Template in the Tooltip HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/tooltip/template)
* [Loading Content with AJAX in the Tooltip HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/tooltip/ajax)
