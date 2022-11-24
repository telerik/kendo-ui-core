---
title: Floating Label
page_title: Floating Label
description: "Learn how to initialize a floating label for the Telerik UI AutoComplete component for {{ site.framework }}."
slug: htmlhelpers_autocomplete_floatinglabel_aspnetcore
position: 9
---

# Floating Label

A floating label is a placeholder text for form or input fields, which floats above that field and remains visible once the user starts interacting with that field.

To implement a floating label in the Telerik UI AutoComplete for {{ site.framework }}, define it either as a string or from a function handler.

The following example demonstrates how to set the floating label as a string:
```HtmlHelper
        @(Html.Kendo().AutoComplete()
            .Name("products")
            .DataTextField("ProductName")
            .Filter("contains")
            .Label(label => {
                label.Content("Find a product...");
                label.Floating(true);
            })
            .HtmlAttributes(new { style = "width:100%" })
            .DataSource(source =>
            {
                source.Read(read =>
                {
                    read.Action("FloatingLabel_GetProducts", "AutoComplete");
                });
            })
         )
```
{% if site.core %}
```TagHelper
     <kendo-autocomplete name="products" style="width:100%"
                         dataTextField="ProductName"
                         filter="FilterType.Contains">
        <label content="Find a product..." floating="true" />
        <datasource type="DataSourceTagHelperType.Custom">
            <transport>
                    <read url="@Url.Action("FloatingLabel_GetProducts", "AutoComplete")" />
            </transport>
        </datasource>
    </kendo-autocomplete>
```
{% endif %}

The following example demonstrates how to set the floating label from a function handler:

```HtmlHelper
        @(Html.Kendo().AutoComplete()
            .Name("products")
            .DataTextField("ProductName")
            .Filter("contains")
            .Label(label => {
                label.ContentHandler("contentHandler");
                label.Floating(true);
            })
            .HtmlAttributes(new { style = "width:100%" })
            .DataSource(source =>
            {
                source.Read(read =>
                {
                    read.Action("FloatingLabel_GetProducts", "AutoComplete");
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
     <kendo-autocomplete name="products" style="width:100%"
                         dataTextField="ProductName"
                         filter="FilterType.Contains">
        <label content-handler="contentHandler" floating="true" />
        <datasource type="DataSourceTagHelperType.Custom">
            <transport>
                    <read url="@Url.Action("FloatingLabel_GetProducts", "AutoComplete")" />
            </transport>
        </datasource>
    </kendo-autocomplete>

    <script>
        function contentHandler(){
            return "Find a product...";
        }
    </script>
```
{% endif %}

## See Also

* [AutoComplete Floating Label (Demo)](https://demos.telerik.com/{{ site.platform }}/autocomplete/floating-label)
* [Server-Side API](https://docs.telerik.com/{{ site.platform }}/api/autocomplete)
