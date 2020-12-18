---
title: Templates
page_title: Templates
description: "Learn the basics when working with the Telerik UI FloatingActionButton HtmlHelper for {{ site.framework }}."
slug: htmlhelpers_templates_floatingactionbutton_aspnetcore
position: 4
---

# Templates

The Telerik UI FloatingActionButton HtmlHelper for {{ site.framework }} provides full control over the rendering of the speed dial action items by using Kendo UI templates.

* [Demo page for the FloatingActionButton](https://demos.telerik.com/{{ site.platform }}/floatingactionbutton/templates)

## Item Templates

The `Template` and `TemplateId` configuration options allow you to manage the way the speed dial action items of a FloatingActionButton are rendered.

```Razor
    @(Html.Kendo().FloatingActionButton()
        .Name("fab")
        .Icon("plus")
        .Items(items=>{
            items.Add().Icon("star").Label("Add Rating").TemplateId("fabTemplate");
            items.Add().Icon("edit").Label("Add comment").TemplateId("fabTemplate");
        })
    )

    <script id="fabTemplate">
      <span class="k-fab-item-text"><strong>#:text#</strong></span>
      <span class= "k-fab-item-icon k-icon k-i-#:icon#"></span>
    </script>
```

## See Also

* [Templates of the FloatingActionButton HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/templates)
* [Server-Side API](/api/floatingactionbutton)
