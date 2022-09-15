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

To specify the layout of the header that will be displayed, use the `Header` method.

```HtmlHelper
   <span id="info" class="k-button wider">Hover me!</span>

    @(Html.Kendo().Popover()
        .For("#info")
        .Position(PopOverPosition.Right)
        .ShowOn(PopoverShowOn.MouseEnter)
        .Header("<div class='custom-header' style='text-align: center'>PopOver header</div>")
        .Body("PopOver main content")
    )
```
{% if site.core %}
```TagHelper
	 <span id="info" class="k-button wider">Hover me!</span>

	<kendo-popover for="#info" show-on="hover" position="right" 
        header="<div class='custom-header' style='text-align: center'>PopOver header</div>"
        body="PopOver main content">
	</kendo-popover>
```
{% endif %}

## Body Template

You can configure the body section through the `Body` method.

```HtmlHelper
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

    @(Html.Kendo().Popover()
        .For("#products")
        .Filter("a")
        .Position(PopoverPosition.Bottom)
        .ShowOn(PopoverShowOn.MouseEnter)
        .Body("<div class=\"template-wrapper\"> + " +
            "<img src=" + @Url.Content("~/content/web/foods/200/") + "#=target.data().id#.jpg" + " alt=\"#=$(data.target).attr('title')#\" />" +
            "<p>#=$(data.target).attr('title')#</p></div>")
        .Width(400)
        .Height(200)
    )
```
{% if site.core %}
```TagHelper
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

    @{
        var bodyTemplate = "<div class=\"template-wrapper\"> + " +
            "<img src=" + @Url.Content("~/content/web/foods/200/") + "#=target.data().id#.jpg" + " alt=\"#=$(data.target).attr('title')#\" />" +
            "<p>#=$(data.target).attr('title')#</p></div>";
    }

	<kendo-popover for="#products" filter="a" show-on="hover" position="bottom" 
        body="@bodyTemplate"
        width="400"
        height="200">
	</kendo-popover>
```
{% endif %}

## See Also

* [Templates in the PopOver HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/popover/template)
