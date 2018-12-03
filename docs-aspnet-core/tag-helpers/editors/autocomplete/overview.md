---
title: Overview
page_title: AutoComplete | Telerik UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the Kendo UI AutoComplete tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/autocomplete, /aspnet-core/helpers/tag-helpers/autocomplete
slug: taghelpers_autocomplete_aspnetcore
position: 1
---

# AutoComplete Tag Helper Overview

The AutoComplete tag helper helps you configure the Kendo UI AutoComplete widget in ASP.NET Core applications.

## Basic Usage

The following example demonstrates how to define the AutoComplete by using the AutoComplete tag helper.

###### Example

        <kendo-autocomplete name="products" filter="FilterType.StartsWith"></kendo-autocomplete>

## Configuration

The AutoComplete tag helper configuration options are passed as attributes of the tag.

```cshtml

    @(Html.Kendo().AutoComplete()
          .Name("products2")
          .DataTextField("ProductName")
          .Filter("contains")
          .MinLength(3)
          .HtmlAttributes(new { style = "width:100%" })
          .DataSource(source =>
          {
              source
                  .Read(read =>
                  {
                      read.Action("GetProducts", "Home")
                      .Data("onAdditionalData");
                  })
                  .ServerFiltering(true);
          })
    )

    <script>
        function onAdditionalData() {
            return {
                text: $("#products").val()
            };
        }
    </script>
```
```tagHelper

    <kendo-autocomplete name="products" filter="FilterType.Contains"
                        datatextfield="ProductName"
                        min-length="3" style="width: 100%;">
        <datasource type="DataSourceTagHelperType.Custom" server-filtering="true">
            <transport>
                <read url="@Url.Action("GetProducts", "Home")" data="onAdditionalData" />
            </transport>
        </datasource>
    </kendo-autocomplete>

    <script>
        function onAdditionalData() {
            return {
                text: $("#products").val()
            };
        }
    </script>
```

## See Also

* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects with the CLI]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
