---
title: Templates
page_title: Templates
description: "Use templates and customize the rendering of the items, values, and the popup header of the Telerik UI DropDownList HtmlHelper for {{ site.framework }}."
slug: htmlhelpers_dropdownlist_templates_aspnetcore
position: 4
---

# Templates

The DropDownList provides full control over the way an item, a selected value, or a pop-up header is rendered through the Kendo UI for jQuery templates.

For more information on the capabilities and syntax of the templates, refer to this [documentation article](https://docs.telerik.com/kendo-ui/framework/templates/overview). For a runnable example, refer to the [demo on customizing the templates in the DropDownList](https://demos.telerik.com/{{ site.platform }}/dropdownlist/template).

## Basic Usage

The following example demonstrates how to customize the DropDownList by declaring an inline string.

```
    <!-- Template -->
    <script id="itemTemplate" type="text/x-kendo-template">
        ContactName: #:data.ContactName#, CustomerID: #:data.CustomerID#
    </script>

    <!-- DropDownList initialization -->
    @(Html.Kendo().DropDownList()
                .Name("customers")
                .DataTextField("ContactName")
                .DataValueField("CustomerID")
                .TemplateId("itemTemplate") //Reference to the template
                .DataSource(source =>
                {
                    source.Read(read =>
                    {
                        read.Action("Template_GetCustomers", "ComboBox");
                    });
                })
    )
```

The following example demonstrates how to customize the DropDownList by referencing a script tag by its `id`.

```
    @(Html.Kendo().DropDownList()
                .Name("customers")
                .DataTextField("ContactName")
                .DataValueField("CustomerID")
                .Template("<span><h3>#: data.ContactName #</h3><p>#: data.CompanyName #</p></span>")
                .DataSource(source =>
                {
                    source.Read(read =>
                    {
                        read.Action("Template_GetCustomers", "ComboBox");
                    });
                })
    )
```

## Item Template

The item template manages the way the list items of a DropDownList are rendered.

The following example demonstrates how to define an item template and how to evaluate it against the dataItem.

    <!-- Template -->
    <script id="itemTemplate" type="text/x-kendo-template">
        ContactName: #:data.ContactName#, CustomerID: #:data.CustomerID#
    </script>

    <!-- DropDownList initialization -->
    @(Html.Kendo().DropDownList()
                .Name("customers")
                .DataTextField("ContactName")
                .DataValueField("CustomerID")
                .TemplateId("itemTemplate") // Reference to the template.
                .DataSource(source =>
                {
                    source.Read(read =>
                    {
                        read.Action("Template_GetCustomers", "ComboBox");
                    });
                })
    )

## Value Templates

The value template manages the way the selected value of a DropDownList is rendered.

> Include only HTML elements in the value templates.

    <!-- Template -->
    <script id="valueTemplate" type="text/x-kendo-template">
        ContactName: #:data.ContactName#
    </script>

    <!-- DropDownList initialization -->
    @(Html.Kendo().DropDownList()
                .Name("customers")
                .DataTextField("ContactName")
                .DataValueField("CustomerID")
                .ValueTemplateId("valueTemplate") // Reference to the template.
                .DataSource(source =>
                {
                    source.Read(read =>
                    {
                        read.Action("Template_GetCustomers", "ComboBox");
                    });
                })
    )

## Header Templates

The header template manages the way the pop-up header of a DropDownList is rendered.

    <!-- Template -->
    <script id="headerTemplate" type="text/x-kendo-template">
        <strong>Header</strong>
    </script>

    <!-- DropDownList initialization -->
    @(Html.Kendo().DropDownList()
                .Name("customers")
                .DataTextField("ContactName")
                .DataValueField("CustomerID")
                .HeaderTemplateId("headerTemplate") // Reference to the template.
                .DataSource(source =>
                {
                    source.Read(read =>
                    {
                        read.Action("Template_GetCustomers", "ComboBox");
                    });
                })
    )

## Footer Templates

The footer template manages the way the pop-up footer of a DropDownList is rendered. The footer is re-rendered on every change of the Data Source. The context of the template is the widget itself.

    <!-- Template -->
    <script id="footerTemplate" type="text/x-kendo-template">
        Total <strong>#: instance.dataSource.total() #</strong> items found
    </script>

    <!-- DropDownList initialization -->
    @(Html.Kendo().DropDownList()
                .Name("customers")
                .DataTextField("ContactName")
                .DataValueField("CustomerID")
                .FooterTemplateId("footerTemplate") // Reference to the template.
                .DataSource(source =>
                {
                    source.Read(read =>
                    {
                        read.Action("Template_GetCustomers", "ComboBox");
                    });
                })
    )

## No-Data Templates

The DropDownList displays `noDataTemplate` in the popup when the data source is empty.

> When the `noDataTemplate` option is defined, the DropDownList always opens the popup element.

    <!-- Template -->
    <script id="noDataTemplate" type="text/x-kendo-template">
        <strong>No Data!</strong>
    </script>

    <!-- DropDownList initialization -->
    @(Html.Kendo().DropDownList()
                .Name("customers")
                .DataTextField("ContactName")
                .DataValueField("CustomerID")
                .NoDataTemplateId("noDataTemplate") // Reference to the template.
                .DataSource(source =>
                {
                    source.Read(read =>
                    {
                        read.Action("Template_GetCustomers", "ComboBox");
                    });
                })
    )

## See Also

* [Customizing Templates in the DropDownList HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/dropdownlist/template)
* [Server-Side API](/api/dropdownlist)
