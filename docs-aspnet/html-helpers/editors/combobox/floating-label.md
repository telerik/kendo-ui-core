---
title: Floating Label
page_title: Floating Label
description: "Learn how to initialize a floating label for the Telerik UI ComboBox component for {{ site.framework }}."
slug: htmlhelpers_combobox_floatinglabel_aspnetcore
position: 7
---

# Floating Label

A floating label is a placeholder text for form or input fields, which floats above that field and remains visible once the user starts interacting with that field.

To implement a floating label in the Telerik UI ComboBox for {{ site.framework }}, define it either as a string or from a function handler.

The following example demonstrates how to set the floating label as a string:

```HtmlHelper
        @(Html.Kendo().ComboBox()
            .Name("products")
            .Placeholder("Select product")
            .DataTextField("ProductName")
            .DataValueField("ProductID")
            .Label(label => {
                label.Content("Find a product...");
                label.Floating(true);
            })
            .HtmlAttributes(new { style = "width:100%;" })
            .Filter(FilterType.Contains)
            .DataSource(source =>
            {
                source.Read(read =>
                {
                    read.Action("FloatingLabel_GetProducts", "ComboBox");
                });
            })
        )
```
{% if site.core %}
```TagHelper
    <kendo-combobox name="products"
                    datatextfield="ProductName"
                    datavaluefield="ProductID"
                    filter="FilterType.Contains"
                    placeholder="Select product"
                    style="width:100%;">
        <label content="Find a product..." floating="true"/>
        <datasource>
            <transport>
                    <read url="@Url.Action("FloatingLabel_GetProducts", "ComboBox") cache="true" />
            </transport>
        </datasource>
    </kendo-combobox>
```
{% endif %}

The following example demonstrates how to set the floating label from a function handler:

```HtmlHelper
        @(Html.Kendo().ComboBox()
            .Name("products")
            .Placeholder("Select product")
            .DataTextField("ProductName")
            .DataValueField("ProductID")
            .Label(label => {
                label.ContentHandler("contentHandler");
                label.Floating(true);
            })
            .HtmlAttributes(new { style = "width:100%;" })
            .Filter(FilterType.Contains)
            .DataSource(source =>
            {
                source.Read(read =>
                {
                    read.Action("FloatingLabel_GetProducts", "ComboBox");
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
    <kendo-combobox name="products"
                    datatextfield="ProductName"
                    datavaluefield="ProductID"
                    filter="FilterType.Contains"
                    placeholder="Select product"
                    style="width:100%;">
        <label content-handler="contentHandler" floating="true"/>
        <datasource>
            <transport>
                    <read url="@Url.Action("FloatingLabel_GetProducts", "ComboBox") cache="true" />
            </transport>
        </datasource>
    </kendo-combobox>

    <script>
        function contentHandler(){
             return "Find a product...";
        }
    </script>
```
{% endif %}

## See Also

* [ComboBox Floating Label (Demo)](https://demos.telerik.com/{{ site.platform }}/combobox/floating-label)
* [Server-Side API](https://docs.telerik.com/{{ site.platform }}/api/combobox)