---
title: Templates
page_title: Templates
description: "Use templates and customize the rendering of the content in the Telerik UI PopOver component for {{ site.framework }}."
slug: htmlhelpers_templates_popover
position: 2
---

# Templates

The PopOver allows you to control the way its header and body sections are rendered. You can add `HTML` elements and customize the appearance with `CSS`.

## Header Template

To specify the layout of the header that will be displayed, use either the [`Header()`](/api/kendo.mvc.ui.fluent/popoverbuilder#headersystemstring) option, which accepts a string, or the [`HeaderHandler()`](/api/kendo.mvc.ui.fluent/popoverbuilder#headerhandlersystemstring) option, which returns the template content through a JavaScript function.

The following example demonstrates how to use the `HeaderHandler()` option to set the header of the PopOver based on the text content of the target element.

```HtmlHelper
<ul id="products" class="dairy-photos">
    <li>
        <span data-id="1" title="A cheese made in the artisan tradition by rural dairy farmers in the north of Spain.">Queso de Cabrales</span>
    </li>
    <li>
        <span data-id="2" title="A cheese made in the La Mancha region of Spain from the milk of sheep of the Manchega breed.">Queso Manchego</span>
    </li>
</ul>

@(Html.Kendo().Popover()
    .For("#products")
    .Filter("li")
    .Position(PopOverPosition.Right)
    .ShowOn(PopoverShowOn.MouseEnter)
    .HeaderHandler("getHeaderContnet")
    .Body("PopOver main content")
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<ul id="products" class="dairy-photos">
    <li>
        <span data-id="1" title="A cheese made in the artisan tradition by rural dairy farmers in the north of Spain.">Queso de Cabrales</span>
    </li>
    <li>
        <span data-id="2" title="A cheese made in the La Mancha region of Spain from the milk of sheep of the Manchega breed.">Queso Manchego</span>
    </li>
</ul>

<kendo-popover for="#products" filter="li" show-on="mouseenter" position="right" 
    header-handler="getHeaderContnet"
    body="PopOver main content">
</kendo-popover>
```
{% endif %}
```JS Scripts
<script>
    function getHeaderContnet(e) {
        return `<b>${e.target.first().text()}</b>`;
    }
</script>
```

## Body Template

You can configure the body section through the [`Body()`](/api/kendo.mvc.ui.fluent/popoverbuilder#bodysystemstring) or [`BodyHandler()`](/api/kendo.mvc.ui.fluent/popoverbuilder#bodyhandlersystemstring) configuration options.

When using the `Body()` option, you can specify the content directly as a string or use the [Template component]({% slug htmlhelpers_overview_template%}) to integrate other UI components or HTML elements. 

If the PopOver body content must be dynamic (for example, based on a specified condition or other components and elements on the page), utilize the `BodyHandler()` method that accepts the name of a JavaScript function.

The following example shows how to use the `BodyHandler()` option to display an image and description in the body of the PopOver by using HTML attributes of the target element.

```HtmlHelper
<ul id="products" class="dairy-photos">
    <li>
        <span data-id="1" title="A cheese made in the artisan tradition by rural dairy farmers in the north of Spain.">
            <img alt="Telerik UI for ASP.NET Core Popover Queso de Cabrales" src="@Url.Content("~/content/web/foods/1.jpg")" />Queso de Cabrales
        </span>
    </li>
    <li>
        <span data-id="2" title="A cheese made in the La Mancha region of Spain from the milk of sheep of the Manchega breed.">
            <img alt="Telerik UI for ASP.NET Core Popover Queso Manchego" src="@Url.Content("~/content/web/foods/2.jpg")" />Queso Manchego
        </span>
    </li>
</ul>

@(Html.Kendo().Popover()
    .For("#products")
    .Filter("li")
    .Position(PopOverPosition.Right)
    .ShowOn(PopoverShowOn.MouseEnter)
    .BodyHandler("getBodyContent")
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<ul id="products" class="dairy-photos">
    <li>
        <span data-id="1" title="A cheese made in the artisan tradition by rural dairy farmers in the north of Spain.">
            <img alt="Telerik UI for ASP.NET Core Popover Queso de Cabrales" src="@Url.Content("~/content/web/foods/1.jpg")" />Queso de Cabrales
        </span>
    </li>
    <li>
        <span data-id="2" title="A cheese made in the La Mancha region of Spain from the milk of sheep of the Manchega breed.">
            <img alt="Telerik UI for ASP.NET Core Popover Queso Manchego" src="@Url.Content("~/content/web/foods/2.jpg")" />Queso Manchego
        </span>
    </li>
</ul>

<kendo-popover for="#products" filter="li" show-on="mouseenter" position="right" 
    body-handler="getBodyContent">
</kendo-popover>
```
{% endif %}
```JS Scripts
<script>
    function getBodyContent(data) {
        let imageTitle = $(data.target).find('span').attr('title');
        let imageName = $(data.target).find('span').attr('data-id');
        let imageURL = `@Url.Content("~/content/web/foods/")${imageName}.jpg`;
        return `<div class="template-wrapper"><img src="${imageURL}" alt="${imageTitle}" /><p>${imageTitle}</p></div>`;
    }
</script>
```

## See Also

* [Templates in the PopOver HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/popover/templates)
* [Server-Side API of the PopOver HtmlHelper](/api/popover)
{% if site.core %}* [Server-Side API of the PopOver TagHelper](/api/taghelpers/popover){% endif %}
