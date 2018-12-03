---
title: Overview
page_title: MultiSelect | Telerik UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the Kendo UI MultiSelect tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/multiselect, /aspnet-core/helpers/tag-helpers/multiselect
slug: taghelpers_multiselect_aspnetcore
position: 1
---

# MultiSelect Tag Helper Overview

The MultiSelect tag helper helps you configure the Kendo UI MultiSelect widget in ASP.NET Core applications.

## Basic Usage

The following example demonstrates how to define the MultiSelect by using the MultiSelect tag helper.

###### Example

        <kendo-multiselect name="products" filter="FilterType.StartsWith"></kendo-multiselect>

## Configuration

The MultiSelect tag helper configuration options are passed as attributes of the tag.

```cshtml

    @(Html.Kendo().MultiSelect()
          .Name("products")
          .DataTextField("ProductName")
          .DataValueField("ProductID")
          .HtmlAttributes(new { style = "width:100%;" })
          .Filter(FilterType.Contains)
          .DataSource(source => source
              .Read(read => read.Action("GetProducts", "Home"))
          )
    )
```
```tagHelper

    <kendo-multiselect name="products" filter="FilterType.Contains"
                       placeholder="Select product"
                       datatextfield="ProductName"
                       datavaluefield="ProductID"
                       style="width: 100%;">
        <datasource type="DataSourceTagHelperType.Custom">
            <transport>
                <read url="@Url.Action("GetProducts", "Home")" />
            </transport>
        </datasource>
    </kendo-multiselect>
```

## See Also

* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects with the CLI]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
