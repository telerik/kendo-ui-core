---
title: Appearance
page_title: Appearance
description: "Learn how to customize the Telerik UI FloatingActionButton component for {{ site.framework }} by setting its size, shape, color, icon and text."
slug: htmlhelpers_appearance_floatingactionbutton_aspnetcore
position: 3
---

# Appearance

The Telerik UI FloatingActionButton for {{ site.framework }} allows you to customize the appearance of the component by setting its the size, shape, color, icon and text.

## Best Practices

The Material Design guidelines dictate that:

* When you configure the FloatingActionButton to display additional related actions (speed dial actions), you should configure only an icon for the button, without a label. Use labels to display additional information for the related actions.

* If the application requires an icon and a label for the Kendo UI FloatingActionButton, consider omitting the additional actions.

```HtmlHelper
    @(Html.Kendo().FloatingActionButton()
        .Name("fab")
        .Icon("plus")
        .Text("Add To Cart")
    )
    </script>
```
{% if site.core %}
```TagHelper
    <kendo-floatingactionbutton name="fab"
                                icon="plus"
                                text="Add To Cart">
    </kendo-floatingactionbutton>
```
{% endif %}
## Icons

The `Icon` configuration option specifies the name of an icon. The selected icon must be available in the Kendo UI theme that is rendered by the FloatingActionButton. For more details on the available Web Font icons, see the [Web Font Icons article](https://docs.telerik.com/kendo-ui/styles-and-layout/icons-web).

```Razor
    @(Html.Kendo().FloatingActionButton()
        .Name("fab")
        .Icon("plus")
        .Items(items=>{
            items.Add().Icon("star").Label("Add Rating");
            items.Add().Icon("edit").Label("Add comment");
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-floatingactionbutton name="fab"
                                icon="plus">
        <floatingactionbutton-items>
            <floatingactionbutton-item label="Add Rating" icon="star"></floatingactionbutton-item>
            <floatingactionbutton-item label="Add Comment" icon="edit"></floatingactionbutton-item>
        </floatingactionbutton-items>
    </kendo-floatingactionbutton>
```
{% endif %}
## See Also

* [Basic Usage of the FloatingActionButton HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/floatingactionbutton/basic-usage)
* [Using the API of the FloatingActionButton HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/floatingactionbutton/api)
* [Server-Side API](/api/floatingactionbutton)
