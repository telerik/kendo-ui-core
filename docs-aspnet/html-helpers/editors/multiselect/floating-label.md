---
title: Floating Label
page_title: Floating Label
description: "Learn how to initialize a floating label for the Telerik UI MultiSelect component for {{ site.framework }}."
slug: htmlhelpers_multiselect_floatinglabel_aspnetcore
position: 7
---

# Floating Label

A floating label is a placeholder text for form or input fields, which floats above that field and remains visible once the user starts interacting with that field.

To implement a floating label in the Telerik UI MultiSelect for {{ site.framework }}, define it either as a string or from a function handler.

The following example demonstrates how to set the floating label as a string:

```HtmlHelper
       @(Html.Kendo().MultiSelect()
            .Name("products")
            .HtmlAttributes(new {style = "width:100%;"})
            .DataTextField("ProductName")
            .DataValueField("ProductID")
            .Label(label => {
                label.Content("Find a product...");
                label.Floating(true);
            })
            .DataSource(source =>
            {
                source.Read(read =>
                {
                    read.Action("FloatingLabel_GetProducts", "MultiSelect");
                });
            })
        )
```
{% if site.core %}
```TagHelper
    <kendo-multiselect name="products"
                       datatextfield="ProductName"
                       datavaluefield="ProductID">
          <label content="Find a product..." floating="true" />
          <datasource type="DataSourceTagHelperType.Custom">
              <transport>
                  <read url="@Url.Action("FloatingLabel_GetProducts", "MultiSelect")" />
              </transport>
          </datasource>
    </kendo-multiselect>
```
{% endif %}

The following example demonstrates how to set the floating label from a function handler:

```HtmlHelper
       @(Html.Kendo().MultiSelect()
            .Name("products")
            .HtmlAttributes(new {style = "width:100%;"})
            .DataTextField("ProductName")
            .DataValueField("ProductID")
            .Label(label => {
                label.ContentHandler("contentHandler");
                label.Floating(true);
            })
            .DataSource(source =>
            {
                source.Read(read =>
                {
                    read.Action("FloatingLabel_GetProducts", "MultiSelect");
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
    <kendo-multiselect name="products"
                       datatextfield="ProductName"
                       datavaluefield="ProductID">
          <label content-handler="contentHandler" floating="true" />
          <datasource type="DataSourceTagHelperType.Custom">
              <transport>
                  <read url="@Url.Action("FloatingLabel_GetProducts", "MultiSelect")" />
              </transport>
          </datasource>
    </kendo-multiselect>

    <script>
        function contentHandler(){
             return "Find a product...";
        }
    </script>
```
{% endif %}

## See Also

* [MultiSelect Floating Label (Demo)](https://demos.telerik.com/{{ site.platform }}/multiselect/floating-label)
* [Server-Side API](https://docs.telerik.com/{{ site.platform }}/api/multiselect)