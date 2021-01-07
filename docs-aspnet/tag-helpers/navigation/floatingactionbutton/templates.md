---
title: Templates
page_title: Templates
description: "Learn the basics when working with the Telerik UI FloatingActionButton TagHelper for {{ site.framework }}."
slug: taghelpers_templates_floatingactionbutton_aspnetcore
position: 4
---

# Templates

The Telerik UI FloatingActionButton TagHelper for {{ site.framework }} provides full control over the rendering of the speed dial action items by using Kendo UI templates.

## Item Templates

The `template` and `templateId` configuration options allow you to manage the way the speed dial action items of a FloatingActionButton are rendered.

```tagHelper
    <kendo-floatingactionbutton name="fab"
                                align="FloatingActionButtonAlign.BottomCenter"
                                align-offset-vertical="50"
                                position-mode="FloatingActionButtonPositionMode.Absolute"
                                theme-color="FloatingActionButtonThemeColor.Success"
                                icon="plus">
        <floatingactionbutton-items>
            <floatingactionbutton-item label="Add Rating" icon="star" templateId="fabTemplate"></floatingactionbutton-item>
            <floatingactionbutton-item label="Add Comment" icon="edit" templateId="fabTemplate"></floatingactionbutton-item>
            <floatingactionbutton-item label="Add To Cart" icon="cart" templateId="fabTemplate"></floatingactionbutton-item>
        </floatingactionbutton-items>
    </kendo-floatingactionbutton>

    <script id="fabTemplate">
      <span class="k-fab-item-text"><strong>#:text#</strong></span>
      <span class= "k-fab-item-icon k-icon k-i-#:icon#"></span>
    </script>
```

## See Also

* [Templates of the FloatingActionButton HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/floatingactionbutton/templates)
* [Server-Side API](/api/floatingactionbutton)
