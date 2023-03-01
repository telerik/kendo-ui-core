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
            items.Add().Icon("pencil").Label("Add comment");
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-floatingactionbutton name="fab"
                                icon="plus">
        <floatingactionbutton-items>
            <floatingactionbutton-item label="Add Rating" 
                                       icon="star">
            </floatingactionbutton-item>
            <floatingactionbutton-item label="Add Comment" 
                                       icon="edit">
            </floatingactionbutton-item>
        </floatingactionbutton-items>
    </kendo-floatingactionbutton>
```
{% endif %}

## Visual Backwards Compatibility

In order to achieve the same look and feel as the old rendering (prior to R1 2022), the element references must be updated. Visit the [CSS Classes Migration]({% slug components_rendering_overview %}#css-classes-migration) and [JQuery Selectors Migration]({% slug components_rendering_overview %}#jquery-selectors-migration) sections of the [Styling Overview]({% slug components_rendering_overview %}) article for additional information.

> The new styling and rendering support only the [default options](#options) when you use a LESS theme.

If you are upgrading from a version prior to R1 2022 and you are using custom CSS to override default FloatingActionButton styles, you will need to update the classes used in the selectors of your custom CSS rules. The following example shows how to achieve the same customization in the FloatingActionButton, depending on whether your Telerik UI for {{ site.framework }} version is older than R1 2022, or newer. 

The first set of CSS rules relies on the classes available in the old rendering.

```
<style>
/*  Old rendering (versions prior to R1 2022)*/ 

/* Applies lightblue background-color to the primary FloatingActionButton */
.k-fab.k-fab-primary { 
  background-color: lightblue;
}

/* Applies lightgreen background-color to the secondary FloatingActionButton */
.k-fab.k-fab-secondary { 
  background-color: lightgreen;
}

/* Applies coral background-color to the tertiary FloatingActionButton */
.k-fab.k-fab-tertiary { 
  background-color: coral;
}
</style>
```

The second set of CSS rules relies on the classes available in the new rendering.

```
<style>
/*  New Rendering (versions after R1 2022) */   
      
/* Applies lightblue background-color to the primary FloatingActionButton */
.k-fab.k-fab-solid-primary { 
  background-color: lightblue;
}

/* Applies lightgreen background-color to the secondary FloatingActionButton */
.k-fab.k-fab-solid-secondary { 
  background-color: lightgreen;
}

/* Applies coral background-color to the tertiary FloatingActionButton */
.k-fab.k-fab-solid-tertiary { 
  background-color: coral;
}
</style>
```

## See Also

* [Basic Usage of the FloatingActionButton HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/floatingactionbutton/basic-usage)
* [Using the API of the FloatingActionButton HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/floatingactionbutton/api)
* [Server-Side API](/api/floatingactionbutton)
