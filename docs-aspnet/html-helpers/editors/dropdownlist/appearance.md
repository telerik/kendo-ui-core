---
title: Appearance
page_title: Appearance
description: "Learn about the rendering and appearance options of the Telerik UI DropDownList for {{ site.framework }}."
slug: appearance_dropdownlist_aspnetcore
position: 3
---

# Appearance

In this article, you will find information about the styling options and rendering of the {{ site.product }} DropDownList.

For a live example, visit the [Appearance Demo of the DropDownList](https://demos.telerik.com/{{ site.platform }}/dropdownlist/appearance).

## Options

The DropDownList supports the following styling options:

- [`Size`](#size)—configures the overall size of the component.
- [`Rounded`](#rounded)—configures the border radius of the component.
- [`FillMode`](#fillmode)—configures how the color is applied to the component.

### Size

The `Size` option controls the size of the DropDownList. The `k-picker-{size}` class, which is applied to the wrapping span element of the DropDownList, reflects the value of the `Size` option.

The following values are available for the `Size` option:

- `Small`—small size (applies the `k-picker-sm` class to the wrapping span element)
- `Medium`—medium size (applies the `k-picker-md` class to the wrapping span element)
- `Large`—large size (applies the `k-picker-lg` class to the wrapping span element)
- `None`—unset.

The following example demonstrates how to set `Size` in the declaration of the DropDownList:

```HtmlHelper
    @(Html.Kendo().DropDownList()
        .Name("categories")
        .Size(ComponentSize.Medium)
        .HtmlAttributes(new { style = "width:100%" })
        .OptionLabel("Select category...")
        .DataTextField("CategoryName")
        .DataValueField("CategoryId")
        .Height(310)
        .Template("<span class=\"k-state-default\" style=\"background-image: url(" + Url.Content("~/Content/web/dropdownlist/") + "#:data.CategoryId#.jpg" + ");\" ></span>" +
            "<span class=\"k-state-default\" style=\"padding-left: 15px;\"><h3>#: data.CategoryName #</h3></span>")
        .ValueTemplate("<span class=\"selected-value\" style=\"background-image: url(" + Url.Content("~/Content/web/dropdownlist/") + "#:data.CategoryId#.jpg" + ");\" ></span>" + "<span>#:data.CategoryName#</span>")
        .DataSource(source =>
        {
            source.Read(read =>
            {
                read.Action("Overview_Get_Categories", "DropDownList");
            });
        })
        .FooterTemplate("Total number of <strong>#: instance.dataSource.total() #</strong> categories found")
    )
```
{% if site.core %}
```TagHelper
<kendo-dropdownlist name="categories"
                    datatextfield="CategoryName"
                    datavaluefield="CategoryId"
                    size="ComponentSize.Medium"
                    option-label="Select category..."
                    height="310"
                    template="<span class='k-state-default' style='background-image: url(/Content/web/dropdownlist/#:data.CategoryId#.jpg);'></span><span class='k-state-default' style='padding-left: 15px;'><h3>#: data.CategoryName #</h3></span>"
                    value-template="<span class='selected-value' style='background-image: url(/Content/web/dropdownlist/#:data.CategoryId#.jpg);'></span><span>#:data.CategoryName#</span>"
                    footer-template="Total number of <strong>#: instance.dataSource.total() #</strong> categories found">

    <datasource>
        <transport>
            <read url="@Url.Action("Overview_Get_Categories", "DropDownList")" />
        </transport>
    </datasource>
</kendo-dropdownlist>
```
{% endif %}

The default `Size` value is `Medium` and it is applied to the wrapping span element through the `k-picker-md` class.

```html
<span class="k-dropdownlist k-picker k-picker-md">
</span>
```

### Rounded

The `Rounded` option controls the border radius of the DropDownList. The class that corresponds to the `Rounded` option is `k-rounded-{rounded}`.

The following values are available for the `Rounded` option:

- `Small`—small border radius (applies the `k-rounded-sm` class to the wrapping span element)
- `Medium`—medium border radius (applies the `k-rounded-md` class to the wrapping span element)
- `Large`—large border radius (applies the `k-rounded-lg` class to the wrapping span element)
- `Full`—largest border radius (applies the `k-rounded-full` class to the wrapping span element)
- `None`—unset.

The following example demonstrates how to set `Rounded` in the declaration of the DropDownList:
```HtmlHelper
    @(Html.Kendo().DropDownList()
        .Name("categories")
        .Rounded(Rounded.Medium)
        .HtmlAttributes(new { style = "width:100%" })
        .OptionLabel("Select category...")
        .DataTextField("CategoryName")
        .DataValueField("CategoryId")
        .Height(310)
        .Template("<span class=\"k-state-default\" style=\"background-image: url(" + Url.Content("~/Content/web/dropdownlist/") + "#:data.CategoryId#.jpg" + ");\" ></span>" +
            "<span class=\"k-state-default\" style=\"padding-left: 15px;\"><h3>#: data.CategoryName #</h3></span>")
        .ValueTemplate("<span class=\"selected-value\" style=\"background-image: url(" + Url.Content("~/Content/web/dropdownlist/") + "#:data.CategoryId#.jpg" + ");\" ></span>" + "<span>#:data.CategoryName#</span>")
        .DataSource(source =>
        {
            source.Read(read =>
            {
                read.Action("Overview_Get_Categories", "DropDownList");
            });
        })
        .FooterTemplate("Total number of <strong>#: instance.dataSource.total() #</strong> categories found")
    )
```
{% if site.core %}
```TagHelper
<kendo-dropdownlist name="categories"
                    datatextfield="CategoryName"
                    datavaluefield="CategoryId"
                    rounded="Rounded.Medium"
                    option-label="Select category..."
                    height="310"
                    template="<span class='k-state-default' style='background-image: url(/Content/web/dropdownlist/#:data.CategoryId#.jpg);'></span><span class='k-state-default' style='padding-left: 15px;'><h3>#: data.CategoryName #</h3></span>"
                    value-template="<span class='selected-value' style='background-image: url(/Content/web/dropdownlist/#:data.CategoryId#.jpg);'></span><span>#:data.CategoryName#</span>"
                    footer-template="Total number of <strong>#: instance.dataSource.total() #</strong> categories found">

    <datasource>
        <transport>
            <read url="@Url.Action("Overview_Get_Categories", "DropDownList")" />
        </transport>
    </datasource>
```
{% endif %}
The default `Rounded` value is `Medium` and it is applied to the wrapping span element through the `k-rounded-md` class.

```html
<span class="k-dropdownlist k-picker k-rounded-md">
</span>
```

### FillMode

The `FillMode` option controls the way color is applied to the rendered DropDownList. The `k-picker-{fillMode}` class, which is applied to the wrapping span element of the DropDownList, reflects the value of the `FillMode` option.

The following values are available for the `FillMode` option:

- `Solid`—applies the `k-picker-solid` class to the wrapping span element
- `Flat`—applies the `k-picker-flat` class to the wrapping span element
- `Outline`—applies the `k-picker-outline` class to the wrapping span element
- `None`—unset.

The following example demonstrates how to set `FillMode` in the declaration of the DropDownList:
```HtmlHelper
    @(Html.Kendo().DropDownList()
        .Name("categories")
        .FillMode(FillMode.Solid)
        .HtmlAttributes(new { style = "width:100%" })
        .OptionLabel("Select category...")
        .DataTextField("CategoryName")
        .DataValueField("CategoryId")
        .Height(310)
        .Template("<span class=\"k-state-default\" style=\"background-image: url(" + Url.Content("~/Content/web/dropdownlist/") + "#:data.CategoryId#.jpg" + ");\" ></span>" +
            "<span class=\"k-state-default\" style=\"padding-left: 15px;\"><h3>#: data.CategoryName #</h3></span>")
        .ValueTemplate("<span class=\"selected-value\" style=\"background-image: url(" + Url.Content("~/Content/web/dropdownlist/") + "#:data.CategoryId#.jpg" + ");\" ></span>" + "<span>#:data.CategoryName#</span>")
        .DataSource(source =>
        {
            source.Read(read =>
            {
                read.Action("Overview_Get_Categories", "DropDownList");
            });
        })
        .FooterTemplate("Total number of <strong>#: instance.dataSource.total() #</strong> categories found")
    )
```
{% if site.core %}
```TagHelper
<kendo-dropdownlist name="categories"
                    datatextfield="CategoryName"
                    datavaluefield="CategoryId"
                    fill-mode="FillMode.Solid"
                    option-label="Select category..."
                    height="310"
                    template="<span class='k-state-default' style='background-image: url(/Content/web/dropdownlist/#:data.CategoryId#.jpg);'></span><span class='k-state-default' style='padding-left: 15px;'><h3>#: data.CategoryName #</h3></span>"
                    value-template="<span class='selected-value' style='background-image: url(/Content/web/dropdownlist/#:data.CategoryId#.jpg);'></span><span>#:data.CategoryName#</span>"
                    footer-template="Total number of <strong>#: instance.dataSource.total() #</strong> categories found">

    <datasource>
        <transport>
            <read url="@Url.Action("Overview_Get_Categories", "DropDownList")" />
        </transport>
    </datasource>
</kendo-dropdownlist>
```
{% endif %}
The default `FillMode` value is `Solid` and it is applied to the wrapping span element through the `k-picker-solid` class.

```html
<span class="k-dropdownlist k-picker k-picker-solid">
</span>
```

@[template](/_contentTemplates/components-rendering-section.md#components-rendering-section)

## See Also

* [Components Appearance Overview]({% slug components_rendering_overview %})
* [Appearance Demo of the DropDownList](https://demos.telerik.com/aspnet-mvc/dropdownlist/appearance)
