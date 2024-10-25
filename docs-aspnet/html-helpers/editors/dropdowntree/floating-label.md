---
title: Floating Label
page_title: Floating Label
description: "Learn how to initialize a floating label for the Telerik UI DropDownTree component for {{ site.framework }}."
slug: htmlhelpers_dropdowntree_floatinglabel_aspnetcore
position: 7
---

# Floating Label

A floating label is a placeholder text for form or input fields, which floats above that field and remains visible once the user starts interacting with that field.

To implement a floating label in the Telerik UI DropDownTree for {{ site.framework }}, define it either as a string or from a function handler.

The following example demonstrates how to set the floating label as a string:

```HtmlHelper
    @(Html.Kendo().DropDownTree()
        .Name("dropdowntree")
        .DataTextField("Name")
        .Label(label =>
        {
            label.Content("Select an employee...");
            label.Floating(true);
        })
        .HtmlAttributes(new { style = "width: 100%" })
        .DataSource(dataSource => dataSource
            .Read(read => read
                .Action("Remote_Data_Binding_Get_Employees", "DropDownTree")
            )
        )
    )
```
{% if site.core %}
```TagHelper
    <kendo-dropdowntree name="dropdowntree" datatextfield="Name" style="width: 100%">
        <label content="Select an employee..." floating="true" />
        <hierarchical-datasource>
            <schema>
                <hierarchical-model id="id"></hierarchical-model>
            </schema>
            <transport>
                <read url="@Url.Action("Remote_Data_Binding_Get_Employees", "DropDownTree")" />
            </transport>
        </hierarchical-datasource>
    </kendo-dropdowntree>
```
{% endif %}


The following example demonstrates how to set the floating label from a function handler:

```HtmlHelper
    @(Html.Kendo().DropDownTree()
        .Name("dropdowntree")
        .DataTextField("Name")
        .Label(label =>
        {
            label.ContentHandler("contentHandler");
            label.Floating(true);
        })
        .HtmlAttributes(new { style = "width: 100%" })
        .DataSource(dataSource => dataSource
            .Read(read => read
                .Action("Remote_Data_Binding_Get_Employees", "DropDownTree")
            )
        )
    )

    <script>
        function contentHandler(){
            return "Select an employee...";
        }
    </script>
```
{% if site.core %}
```TagHelper
    <kendo-dropdowntree name="dropdowntree" datatextfield="Name" style="width: 100%">
        <label content-handler="contentHandler" floating="true" />
        <hierarchical-datasource>
            <schema>
                <hierarchical-model id="id"></hierarchical-model>
            </schema>
            <transport>
                <read url="@Url.Action("Remote_Data_Binding_Get_Employees", "DropDownTree")" />
            </transport>
        </hierarchical-datasource>
    </kendo-dropdowntree>

    <script>
        function contentHandler(){
            return "Select an employee...";
        }
    </script>
```
{% endif %}

## See Also

* [DropDownTree Floating Label (Demo)](https://demos.telerik.com/{{ site.platform }}/dropdowntree/floating-label)
* [Server-Side API](https://docs.telerik.com/{{ site.platform }}/api/dropdowntree)
