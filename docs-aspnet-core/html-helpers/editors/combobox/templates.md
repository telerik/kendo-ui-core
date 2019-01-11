---
title: Templates
page_title: Templates | Kendo UI ComboBox HtmlHelper for ASP.NET Core
description: "Use templates and customize the rendering of the items, values, and the popup header of the Kendo UI ComboBox HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_combobox_templates_aspnetcore
position: 4
---

# Templates

The ComboBox provides full control over the way an item, a selected value, or a pop-up header is rendered through the Kendo UI templates.

For more information on the capabilities and syntax of the templates, refer to this [documentation article](https://docs.telerik.com/kendo-ui/framework/templates/overview).

## Basic Usage

The following example demonstrates how to customize the ComboBox by referencing a script tag by its `id`.

###### Example

    <!-- Template -->
    <script id="itemTemplate" type="text/x-kendo-template">
        ContactName: #:data.ContactName#, CustomerID: #:data.CustomerID#
    </script>

    <!-- ComboBox initialization -->
    @(Html.Kendo().ComboBox()
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

The following example demonstrates how to customize the ComboBox by declaring an inline string.

###### Example

    @(Html.Kendo().ComboBox()
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

## Item Template

The item template manages the way the list items of a ComboBox are rendered.

The following example demonstrates how to define an item template and how to evaluate it against the dataItem.

###### Example

    <!-- Template -->
    <script id="itemTemplate" type="text/x-kendo-template">
        ContactName: #:data.ContactName#, CustomerID: #:data.CustomerID#
    </script>

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

## Header Templates

The header template manages the way the pop-up header of a ComboBox is rendered.

The following example demonstrates how to define a header template.

###### Example

    <!-- Template -->
    <script id="headerTemplate" type="text/x-kendo-template">
        <strong>Header</strong>
    </script>

    @(Html.Kendo().ComboBox()
        .Name("customers")
        .DataTextField("ContactName")
        .DataValueField("CustomerID")
        .HeaderTemplateId("headerTemplate") //Reference to the template
        .DataSource(source =>
        {
            source.Read(read =>
            {
                read.Action("Template_GetCustomers", "ComboBox");
            });
        })
    )

## Footer Templates

The footer template manages the way the pop-up footer of a ComboBox is rendered. The footer is re-rendered on every change of the Data Source. The context of the template is the widget itself.

The following example demonstrates how to define a footer template.

###### Example

    <!-- Template -->
    <script id="footerTemplate" type="text/x-kendo-template">
        Total <strong>#: instance.dataSource.total() #</strong> items found
    </script>

    @(Html.Kendo().ComboBox()
        .Name("customers")
        .DataTextField("ContactName")
        .DataValueField("CustomerID")
        .FooterTemplateId("footerTemplate") //Reference to the template
        .DataSource(source =>
        {
            source.Read(read =>
            {
                read.Action("Template_GetCustomers", "ComboBox");
            });
        })
    )

## No-Data Templates

The ComboBox displays `noDataTemplate` in the popup when the data source is empty.

The following example demonstrates how to define a `noDataTemplate` template.

###### Example

    <!-- Template -->
    <script id="noDataTemplate" type="text/x-kendo-template">
        <strong>No Data!</strong>
    </script>

    @(Html.Kendo().ComboBox()
        .Name("customers")
        .DataTextField("ContactName")
        .DataValueField("CustomerID")
        .NoDataTemplateId("noDataTemplate") //Reference to the template
        .DataSource(source =>
        {
            source.Read(read =>
            {
                read.Action("Template_GetCustomers", "ComboBox");
            });
        })
    )

## See Also

* [Templates for ComboBox]({% slug htmlhelpers_combobox_templates_aspnetcore %})
* [Bindings for ComboBox]({% slug htmlhelpers_combobox_databinding_aspnetcore %})
* [Grouping in ComboBox]({% slug htmlhelpers_combobox_grouping_aspnetcore %})
* [JavaScript API Reference of the ComboBox](http://docs.telerik.com/kendo-ui/api/javascript/ui/combobox)
* [ComboBox HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/combobox/overview)
* [ComboBox Official Demos](http://demos.telerik.com/aspnet-core/combobox/index)
