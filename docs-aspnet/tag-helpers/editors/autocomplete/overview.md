---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI AutoComplete TagHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /helpers/autocomplete, /helpers/tag-helpers/autocomplete
slug: taghelpers_autocomplete_aspnetcore
position: 1
---

# AutoComplete TagHelper Overview

The Telerik UI AutoComplete TagHelper for ASP.NET Core is a server-side wrapper for the Kendo UI AutoComplete widget.

The AutoComplete provides suggestions depending on the typed text and allows multiple value entries.

* [Demo page for the AutoComplete](https://demos.telerik.com/aspnet-core/autocomplete/tag-helper)

## Initializing the AutoComplete

The following example demonstrates how to define the AutoComplete by using the AutoComplete TagHelper.

    <kendo-autocomplete name="products" filter="FilterType.StartsWith"></kendo-autocomplete>

## Basic Configuration

The AutoComplete TagHelper configuration options are passed as attributes of the tag.

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

* [Basic Usage of the AutoComplete TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/autocomplete/tag-helper)
* [Server-Side API](/api/autocomplete)
