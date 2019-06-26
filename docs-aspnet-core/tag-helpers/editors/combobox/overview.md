---
title: Overview
page_title: ComboBox Overview | Telerik UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the Kendo UI ComboBox tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/combobox, /aspnet-core/helpers/tag-helpers/combobox
slug: taghelpers_combobox_aspnetcore
position: 1
---

# ComboBox Tag Helper Overview

The [ComboBox](http://docs.telerik.com/kendo-ui/controls/editors/combobox/overview) displays a list of values and allows for a single selection from the list.

The user input is restricted within the predefined options.

The ComboBox tag helper extension is a server-side wrapper for the [Kendo UI ComboBox](http://demos.telerik.com/kendo-ui/combobox/index) widget and enables you to configure the Kendo UI ComboBox widget in ASP.NET Core applications.

## Initializing the ComboBox

The following example demonstrates how to define the ComboBox by using the ComboBox tag helper.

      <kendo-combobox name="products" filter="FilterType.StartsWith"></kendo-combobox>

## Basic Configuration

The ComboBox tag helper configuration options are passed as attributes of the tag.

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

* [Basic Usage of the ComboBox Tag Helper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/combobox/tag-helper)
* [JavaScript API Reference of the ComboBox](http://docs.telerik.com/kendo-ui/api/javascript/ui/combobox)
