---
title: Floating Label
page_title: Floating Label
description: "Learn how to initialize a floating label for the Telerik UI DropDownList component for {{ site.framework }}."
slug: htmlhelpers_dropdownlist_floatinglabel_aspnetcore
position: 7
---

# Floating Label

A floating label is a placeholder text for form or input fields, which floats above that field and remains visible once the user starts interacting with that field.

To implement a floating label in the Telerik UI DropDownList for {{ site.framework }}, define it either as a string or from a function handler.

The following example demonstrates how to set the floating label as a string:

```HtmlHelper
    @(Html.Kendo().DropDownList()
        .Name("products")
        .HtmlAttributes(new {style = "width:300px"})
        .DataTextField("ProductName")
        .DataValueField("ProductID")
        .AutoBind(false)
        .Label(label =>
        {
            label.Content("Find a product...");
            label.Floating(true);
        })
        .Filter(FilterType.Contains)
        .DataSource(source =>
        {
            source.Read(read =>
            {
                read.Action("RemoteDataSource_GetProducts", "DropDownList");
            });
        })
    )
```
{% if site.core %}
```TagHelper
   <kendo-dropdownlist name="products" style="width:100%"
                          auto-bind="false"
                          datatextfield="ProductName"
                          datavaluefield="ProductID"
                          filter="FilterType.Contains">
          <label content="Find a product..." floating="true" />
          <datasource type="DataSourceTagHelperType.Custom">
              <transport>
                    <read url="@Url.Action("RemoteDataSource_GetProducts", "DropDownList")" />
                </transport>
          </datasource>
    </kendo-dropdownlist>
```
{% endif %}

The following example demonstrates how to set the floating label from a function handler:

```HtmlHelper
    @(Html.Kendo().DropDownList()
        .Name("products")
        .HtmlAttributes(new {style = "width:300px"})
        .DataTextField("ProductName")
        .DataValueField("ProductID")
        .AutoBind(false)
        .Label(label =>
        {
            label.ContentHandler("contentHandler");
            label.Floating(true);
        })
        .Filter(FilterType.Contains)
        .DataSource(source =>
        {
            source.Read(read =>
            {
                read.Action("RemoteDataSource_GetProducts", "DropDownList");
            });
        })
    )

    <script>
        function contentHandler(){
            return "Find a product...";
        }
    </script>
```
{% if site.core %}
```TagHelper
   <kendo-dropdownlist name="products" style="width:100%"
                          auto-bind="false"
                          datatextfield="ProductName"
                          datavaluefield="ProductID"
                          filter="FilterType.Contains">
          <label content-handler="contentHandler" floating="true" />
          <datasource type="DataSourceTagHelperType.Custom">
              <transport>
                    <read url="@Url.Action("RemoteDataSource_GetProducts", "DropDownList")" />
                </transport>
          </datasource>
    </kendo-dropdownlist>

    <script>
        function contentHandler(){
            return "Find a product...";
        }
    </script>
```
{% endif %}

## See Also

* [DropDownList Floating Label (Demo)](https://demos.telerik.com/{{ site.platform }}/dropdownlist/floating-label)
* [Server-Side API](https://docs.telerik.com/{{ site.platform }}/api/dropdownlist)