---
title: Templates
page_title: Templates
description: "Learn the basics when working with the Telerik UI FloatingActionButton component for {{ site.framework }}."
slug: htmlhelpers_templates_floatingactionbutton_aspnetcore
position: 4
---

# Templates

The Telerik UI FloatingActionButton for {{ site.framework }} provides full control over the rendering of the speed dial action items by using Kendo UI templates.

* [Demo page for the FloatingActionButton](https://demos.telerik.com/{{ site.platform }}/floatingactionbutton/templates)

## Item Templates

The `Template` and `TemplateId` configuration options allow you to manage the way the speed dial action items of a FloatingActionButton are rendered.

```HtmlHelper
    @(Html.Kendo().FloatingActionButton()
        .Name("fab")
        .Icon("plus")
        .Items(items=>{
            items.Add().Icon("star").Label("Add Rating").TemplateId("fabTemplate");
            items.Add().Icon("pencil").Label("Add comment").TemplateId("fabTemplate");
        })
    )

    <script id="fabTemplate">
      <span class="k-fab-item-text"><strong>#:text#</strong></span>
      <span class= "k-fab-item-icon k-icon k-i-#:icon#"></span>
    </script>
```
{% if site.core %}
```TagHelper
    <kendo-floatingactionbutton name="fab"
                                icon="plus">
        <floatingactionbutton-items>
            <floatingactionbutton-item label="Add Rating" 
                                       icon="star" 
                                       templateId="fabTemplate">
            </floatingactionbutton-item>
            <floatingactionbutton-item label="Add Comment" 
                                       icon="edit" 
                                       templateId="fabTemplate">
            </floatingactionbutton-item>
        </floatingactionbutton-items>
    </kendo-floatingactionbutton>

    <script id="fabTemplate">
      <span class="k-fab-item-text"><strong>#:text#</strong></span>
      <span class= "k-fab-item-icon k-icon k-i-#:icon#"></span>
    </script>
```
{% endif %}

## See Also

* [Templates of the FloatingActionButton HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/floatingactionbutton/templates)
* [Server-Side API](/api/floatingactionbutton)
