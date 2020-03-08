---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI ComboBox TagHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /helpers/combobox, /helpers/tag-helpers/combobox
slug: taghelpers_combobox_aspnetcore
position: 1
---

# ComboBox TagHelper Overview

The Telerik UI ComboBox TagHelper for ASP.NET Core is a server-side wrapper for the Kendo UI ComboBox widget.

The ComboBox displays a list of values and allows for a single selection from the list.

* [Demo page for the ComboBox](https://demos.telerik.com/aspnet-core/combobox/tag-helper)

## Initializing the ComboBox

The following example demonstrates how to define the ComboBox by using the ComboBox TagHelper.

      <kendo-combobox name="products" filter="FilterType.StartsWith"></kendo-combobox>

## Basic Configuration

The ComboBox TagHelper configuration options are passed as attributes of the tag.

```cshtml

    @(Html.Kendo().ComboBox()
          .Name("products")
          .Placeholder("Select product")
          .DataTextField("ProductName")
          .DataValueField("ProductID")
          .HtmlAttributes(new { style = "width:100%;" })
          .Filter(FilterType.Contains)
          .AutoBind(false)
          .MinLength(3)
          .DataSource(source => source
              .Read(read => read.Action("GetProducts", "Home"))
          )
    )
```
```tagHelper

    <kendo-combobox name="products" filter="FilterType.Contains"
                        placeholder="Select product"
                        datatextfield="ProductName"
                        datavaluefield="ProductID"
                        auto-bind="false"
                        min-length="3" style="width: 100%;">
        <datasource type="DataSourceTagHelperType.Custom">
            <transport>
                <read url="@Url.Action("GetProducts", "Home")" />
            </transport>
        </datasource>
    </kendo-combobox>
```

## See Also

* [Basic Usage of the ComboBox TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/combobox/tag-helper)
* [Server-Side API](/api/combobox)
