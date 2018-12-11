---
title: Overview
page_title: MultiColumnComboBox | Telerik UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the Kendo UI MultiColumnComboBox tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: taghelpers_multicolumncombobox_aspnetcore
position: 1
---

# MultiColumnComboBox Tag Helper Overview

The MultiColumnComboBox tag helper helps you configure the Kendo UI MultiColumnComboBox widget in ASP.NET Core applications.

## Basic Usage

The following example demonstrates how to define the MultiColumnComboBox by using the MultiColumnComboBox tag helper.

###### Example

    <kendo-multicolumncombobox name="products" filter="FilterType.StartsWith"></kendo-multicolumncombobox>

## Configuration

The MultiColumnComboBox tag helper configuration options are passed as attributes of the tag.

```tagHelper

    <kendo-multicolumnmulticolumncombobox name="products" filter="FilterType.Contains"
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
    </kendo-multicolumnmulticolumncombobox>
```
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

## See Also

* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects with the CLI]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
