---
title: Templates
page_title: Templates
description: "Use templates and customize the rendering of the items, values, and the popup header of the Telerik UI ComboBox HtmlHelper for {{ site.framework }}."
slug: htmlhelpers_combobox_templates_aspnetcore
position: 4
---

# Templates

The ComboBox provides full control over the way an item, a selected value, or a pop-up header is rendered through the Kendo UI for jQuery templates.

For more information on the capabilities and syntax of the templates, refer to this [documentation article](https://docs.telerik.com/kendo-ui/framework/templates/overview). For a runnable example, refer to the [demo on customizing the templates in the ComboBox](https://demos.telerik.com/{{ site.platform }}/combobox/template).

## Basic Usage

The following example demonstrates how to customize the ComboBox by referencing a script tag by its `id`.

    <!-- Template -->
    <script id="itemTemplate" type="text/x-kendo-template">
        ContactName: #:data.ContactName#, CustomerID: #:data.CustomerID#
    </script>

    <!-- ComboBox initialization -->
    @(Html.Kendo().ComboBox()
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

The following example demonstrates how to customize the ComboBox by declaring an inline string.

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

    <!-- Template -->
    <script id="itemTemplate" type="text/x-kendo-template">
        ContactName: #:data.ContactName#, CustomerID: #:data.CustomerID#
    </script>

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

## Header Templates

The header template manages the way the popup header of a ComboBox is rendered.

    <!-- Template -->
    <script id="headerTemplate" type="text/x-kendo-template">
        <strong>Header</strong>
    </script>

    @(Html.Kendo().ComboBox()
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

The footer template manages the way the popup footer of a ComboBox is rendered. The footer is re-rendered on every change of the Data Source. The context of the template is the widget itself.

    <!-- Template -->
    <script id="footerTemplate" type="text/x-kendo-template">
        Total <strong>#: instance.dataSource.total() #</strong> items found
    </script>

    @(Html.Kendo().ComboBox()
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

The ComboBox displays `noDataTemplate` in the popup when the data source is empty.

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

* [Customizing Templates in the ComboBox HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/combobox/template)
* [Server-Side API](/api/combobox)
