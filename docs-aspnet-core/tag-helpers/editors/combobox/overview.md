---
title: Overview
page_title: ComboBox | Telerik UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the Kendo UI ComboBox tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/combobox, /aspnet-core/helpers/tag-helpers/combobox
slug: taghelpers_combobox_aspnetcore
position: 1
---

# ComboBox Tag Helper Overview

The ComboBox tag helper helps you configure the Kendo UI ComboBox widget in ASP.NET Core applications.

## Basic Usage

The following example demonstrates how to define the ComboBox by using the ComboBox tag helper.

###### Example

        <kendo-combobox name="products" filter="FilterType.StartsWith"></kendo-combobox>

## Configuration

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

* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects with the CLI]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
