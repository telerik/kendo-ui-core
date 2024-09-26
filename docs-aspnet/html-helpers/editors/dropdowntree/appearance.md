---
title: Appearance
page_title: Appearance
description: "Learn about the rendering and appearance options of the Telerik UI DropDownTree for {{ site.framework }}."
slug: appearance_dropdowntree
position: 2
---

# Appearance

In this article, you will find information about the styling options and rendering of the {{ site.product }} DropDownTree.

For a live example, visit the [Appearance Demo of the DropDownTree](https://demos.telerik.com/{{ site.platform }}/dropdowntree/appearance).

## Options

The DropDownTree supports the following styling options:

- [`Size`](#size)—configures the overall size of the component.
- [`Rounded`](#rounded)—configures the border radius of the component.
- [`FillMode`](#fillmode)—configures how the color is applied to the component.

### Size

The `Size` option controls the size of the DropDownTree. The `k-input-{size}` class, which is applied to the wrapping span element of the DropDownTree, reflects the value of the `Size` option. The `k-input-{size}` class is used when the DropDownTree is configured for Multiple Selection. When Single Selection is used in the DropDownTree, the class we apply is `k-picker-{size}`. The option also affects the `span.k-chip` element through the `k-chip-{size}` class.

The following values are available for the `Size` option:

- `Small`—small size (applies the `k-input-sm` class to the wrapping span element)
- `Medium`—medium size (applies the `k-input-md` class to the wrapping span element)
- `Large`—large size (applies the `k-input-lg` class to the wrapping span element)
- `None`—unset.

The following example demonstrates how to set `Size` in the declaration of the DropDownTree:

```HtmlHelper

    @(Html.Kendo().DropDownTree()
        .Name("dropdowntree-single")
        .HtmlAttributes(new { style = "width: 100%" })
        .Height("auto")
        .Placeholder("Select Product")
        .DataValueField("id")
        .Size(ComponentSize.Large)
        .Items(items =>
        {
            items.Add().Text("Furniture").Id("1").Expanded(true)
                .Items(children =>
                {
                    children.Add().Text("Tables & Chairs").Id("2");
                    children.Add().Text("Sofas").Id("3");
                    children.Add().Text("Occasional Furniture").Id("4");
                    children.Add().Text("Childrens furniture").Id("5");
                    children.Add().Text("Beds").Id("6");
                });
            items.Add().Text("Decor").Id("7")
                .Items(children =>
                {
                    children.Add().Text("Bed Linen").Id("8");
                    children.Add().Text("Curtains & Blinds").Id("9");
                    children.Add().Text("Carpets").Id("10");
                    children.Add().Text("Rugs").Id("11");
                    children.Add().Text("Carpets").Id("12");
                });
        })
    )
```
{% if site.core %}
```TagHelper

    <kendo-dropdowntree datavaluefield="id" size="ComponentSize.Large" height="auto" placeholder="Select Product" name="dropdowntree-single" style="width: 100%">
        <items>
            <dropdowntree-item expanded="true" text="Furniture" id="1">
                <items>
                    <dropdowntree-item expanded="false" text="Tables & Chairs" id="2">
                    </dropdowntree-item>
                    <dropdowntree-item expanded="false" text="Sofas" id="3">
                    </dropdowntree-item>
                    <dropdowntree-item expanded="false" text="Occasional Furniture" id="4">
                    </dropdowntree-item>
                    <dropdowntree-item expanded="false" text="Childerns Furniture" id="5">
                    </dropdowntree-item>
                    <dropdowntree-item expanded="false" text="Beds" id="6">
                    </dropdowntree-item>
                </items>
            </dropdowntree-item>
            <dropdowntree-item expanded="false" text="Decor" id="7">
                <items>
                    <dropdowntree-item expanded="false" text="Bed Linen" id="8">
                    </dropdowntree-item>
                    <dropdowntree-item expanded="false" text="Throws" id="9">
                    </dropdowntree-item>
                    <dropdowntree-item expanded="false" text="Curtains & Blinds" id="10">
                    </dropdowntree-item>
                    <dropdowntree-item expanded="false" text="Rugs" id="11">
                    </dropdowntree-item>
                    <dropdowntree-item expanded="false" text="Carpets" id="12">
                    </dropdowntree-item>
                </items>
            </dropdowntree-item>
        </items>
    </kendo-dropdowntree>

```
{% endif %}

The default size value is `Medium` and it is applied to the `span` wrapping element through the `k-input-md` class.

Below is the HTML of the DropDownTree that is affected from the `Size` option. The changes are applied to the `span.k-dropdowntree` wrapping element:

```html
<span class="k-dropdowntree k-picker k-dropdowntree-clearable k-picker-solid k-picker-lg k-rounded-full">
</span>
```

The HTML when multiple selection is configured:

```html
<span class="k-dropdowntree k-input k-input-solid k-dropdowntree-clearable k-input-lg k-rounded-full">
</span>
```

### Rounded

The `Rounded` option controls the border radius of the DropDownTree. The class that corresponds to the `Rounded` option is `k-rounded-{rounded}`.

The following values are available for the `Rounded` option:

- `Small`—small border radius (applies the `k-rounded-sm` class to the wrapping span element)
- `Medium`—medium border radius (applies the `k-rounded-md` class to the wrapping span element)
- `Large`—large border radius (applies the `k-rounded-lg` class to the wrapping span element)
- `Full`—largest (ellipse-like) border radius (applies the `k-rounded-full` class to the wrapping span element)
- `None`—unset.

The default value is `Full`. It applies the `k-rounded-full` class to the `span.k-dropdowntree` wrapping element that contains the HTML of the component.

The following example demonstrates how to set `Rounded` in the declaration of the DropDownTree:

```HtmlHelper

    @(Html.Kendo().DropDownTree()
        .Name("dropdowntree-single")
        .HtmlAttributes(new { style = "width: 100%" })
        .Height("auto")
        .Placeholder("Select Product")
        .DataValueField("id")
        .Rounded(Rounded.Medium)
        .Items(items =>
        {
            items.Add().Text("Furniture").Id("1").Expanded(true)
                .Items(children =>
                {
                    children.Add().Text("Tables & Chairs").Id("2");
                    children.Add().Text("Sofas").Id("3");
                    children.Add().Text("Occasional Furniture").Id("4");
                    children.Add().Text("Childrens furniture").Id("5");
                    children.Add().Text("Beds").Id("6");
                });
            items.Add().Text("Decor").Id("7")
                .Items(children =>
                {
                    children.Add().Text("Bed Linen").Id("8");
                    children.Add().Text("Curtains & Blinds").Id("9");
                    children.Add().Text("Carpets").Id("10");
                    children.Add().Text("Rugs").Id("11");
                    children.Add().Text("Carpets").Id("12");
                });
        })
    )
```
{% if site.core %}
```TagHelper

     <kendo-dropdowntree datavaluefield="id" height="auto" rounded="Rounded.Medium" placeholder="Select Product" name="dropdowntree-single" style="width: 100%">
                <items>
                    <dropdowntree-item expanded="true" text="Furniture" id="1">
                        <items>
                            <dropdowntree-item  text="Tables & Chairs" id="2">
                            </dropdowntree-item>
                            <dropdowntree-item  text="Sofas" id="3">
                            </dropdowntree-item>
                            <dropdowntree-item  text="Occasional Furniture" id="4">
                            </dropdowntree-item>
                            <dropdowntree-item  text="Childerns Furniture" id="5">
                            </dropdowntree-item>
                            <dropdowntree-item  text="Beds" id="6">
                            </dropdowntree-item>
                        </items>
                    </dropdowntree-item>
                    <dropdowntree-item  text="Decor" id="7">
                        <items>
                            <dropdowntree-item  text="Bed Linen" id="8">
                            </dropdowntree-item>
                            <dropdowntree-item  text="Throws" id="9">
                            </dropdowntree-item>
                            <dropdowntree-item  text="Curtains & Blinds" id="10">
                            </dropdowntree-item>
                            <dropdowntree-item  text="Rugs" id="11">
                            </dropdowntree-item>
                            <dropdowntree-item  text="Carpets" id="12">
                            </dropdowntree-item>
                        </items>
                    </dropdowntree-item>
                </items>
            </kendo-dropdowntree>

```
{% endif %}

When single selection is used, the changes are applied to the `span.k-dropdowntree` wrapping element:

```html
<span class="k-dropdowntree k-picker k-dropdowntree-clearable k-picker-solid k-picker-md k-rounded-md">
</span>
```

The HTML when multiple selection is enabled:

```html
<span class="k-dropdowntree k-input k-input-md k-dropdowntree-clearable k-input-solid k-rounded-md k-state-border-down">
</span>
```

### FillMode

The `FillMode` option controls how color is applied to the component. The structure of the class is `k-picker-{fillMode}`.

The following values are available for the `FillMode` option:

- `Solid`—applies the `k-input-solid` class to the wrapping span element
- `Flat`—applies the `k-input-flat` class to the wrapping span element
- `Outline`—applies the `k-input-outline` class to the wrapping span element
- `None`—unset.

The default value is `Solid` and it is applied to the `span.k-dropdowntree` wrapping element through the `k-picker-solid` class.

The following example demonstrates how to set `FillMode` in the declaration of the DropDownTree:

```HtmlHelper

    @(Html.Kendo().DropDownTree()
        .Name("dropdowntree-single")
        .HtmlAttributes(new { style = "width: 100%" })
        .Height("auto")
        .Placeholder("Select Product")
        .DataValueField("id")
        .FillMode(FillMode.Outline)
        .Items(items =>
        {
            items.Add().Text("Furniture").Id("1").Expanded(true)
                .Items(children =>
                {
                    children.Add().Text("Tables & Chairs").Id("2");
                    children.Add().Text("Sofas").Id("3");
                    children.Add().Text("Occasional Furniture").Id("4");
                    children.Add().Text("Childrens furniture").Id("5");
                    children.Add().Text("Beds").Id("6");
                });
            items.Add().Text("Decor").Id("7")
                .Items(children =>
                {
                    children.Add().Text("Bed Linen").Id("8");
                    children.Add().Text("Curtains & Blinds").Id("9");
                    children.Add().Text("Carpets").Id("10");
                    children.Add().Text("Rugs").Id("11");
                    children.Add().Text("Carpets").Id("12");
                });
        })
    )
```
{% if site.core %}
```TagHelper

     <kendo-dropdowntree datavaluefield="id" height="auto" fill-mode="FillMode.Outline" placeholder="Select Product" name="dropdowntree-single" style="width: 100%">
                <items>
                    <dropdowntree-item expanded="true" text="Furniture" id="1">
                        <items>
                            <dropdowntree-item  text="Tables & Chairs" id="2">
                            </dropdowntree-item>
                            <dropdowntree-item  text="Sofas" id="3">
                            </dropdowntree-item>
                            <dropdowntree-item  text="Occasional Furniture" id="4">
                            </dropdowntree-item>
                            <dropdowntree-item  text="Childerns Furniture" id="5">
                            </dropdowntree-item>
                            <dropdowntree-item  text="Beds" id="6">
                            </dropdowntree-item>
                        </items>
                    </dropdowntree-item>
                    <dropdowntree-item  text="Decor" id="7">
                        <items>
                            <dropdowntree-item  text="Bed Linen" id="8">
                            </dropdowntree-item>
                            <dropdowntree-item  text="Throws" id="9">
                            </dropdowntree-item>
                            <dropdowntree-item  text="Curtains & Blinds" id="10">
                            </dropdowntree-item>
                            <dropdowntree-item  text="Rugs" id="11">
                            </dropdowntree-item>
                            <dropdowntree-item  text="Carpets" id="12">
                            </dropdowntree-item>
                        </items>
                    </dropdowntree-item>
                </items>
            </kendo-dropdowntree>
            
```
{% endif %}



The `FillMode.Outline` value is reflected through the respective classes applied to the `span.k-dropdowntree` wrapping element:

```html
<span class="k-dropdowntree k-picker k-picker-outline k-picker-md k-rounded-full k-dropdowntree-clearable">
</span>
```

The HTML when multiple selection is enabled:

```html
<span class="k-dropdowntree k-input k-input-outline k-input-md k-dropdowntree-clearable k-rounded-full k-state-border-down">
</span>
```

@[template](/_contentTemplates/components-rendering-section.md#components-rendering-section)

## See Also

* [Components Appearance Overview]({% slug components_rendering_overview %})
* [Appearance Demo of the DropDownTree](https://demos.telerik.com/{{ site.platform }}/dropdowntree/appearance)
