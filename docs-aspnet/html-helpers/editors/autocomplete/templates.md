---
title: Templates
page_title: Templates
description: "Use templates and customize the rendering of the items, popup header and footer of the Telerik UI DropDownList HtmlHelper for {{ site.framework }}."
slug: htmlhelpers_autocomplete_templates_aspnetcore
position: 3
---

# Templates

The AutoComplete provides full control over the way an item, the popup header and the popup footer is rendered through the Kendo UI for jQuery templates.

For more information on the capabilities and syntax of the templates, refer to this [documentation article](https://docs.telerik.com/kendo-ui/framework/templates/overview). For a runnable example, refer to the [demo on customizing the templates in the AutoComplete](https://demos.telerik.com/{{ site.platform }}/autocomplete/template).

## Basic Usage

The following example demonstrates how to customize the AutoComplete by declaring an inline string.

```
    @(Html.Kendo().AutoComplete()
        .Name("customers")
        .DataTextField("ContactName")
        .Template("<span><h3>#: data.ContactName #</h3><p>#: data.CompanyName #</p></span>")
        .DataSource(source =>
        {
            source.Read(read =>
            {
                read.Action("Template_GetCustomers", "Home");
            });
        })
    )
```

The following example demonstrates how to customize the DropDownList by referencing a script tag by its `id`.

```
    <!-- Template -->
    <script id="itemTemplate" type="text/x-kendo-template">
        ContactName: #:data.ContactName#, CustomerID: #:data.CustomerID#
    </script>

    <!-- AutoComplete initialization -->
    @(Html.Kendo().AutoComplete()
        .Name("customers")
        .DataTextField("ContactName")
        .TemplateId("itemTemplate") //Reference to the template
        .DataSource(source =>
        {
            source.Read(read =>
            {
                read.Action("Template_GetCustomers", "Home");
            });
        })
    )
```

## Item Template

The item template manages the way the list items of a AutoComplete are rendered.

The following example demonstrates how to define an item template and how to evaluate it against the dataItem.

    <!-- Template -->
    <script id="itemTemplate" type="text/x-kendo-template">
        ContactName: #:data.ContactName#, CustomerID: #:data.CustomerID#
    </script>

    <!-- AutoComplete initialization -->
    @(Html.Kendo().AutoComplete()
        .Name("customers")
        .DataTextField("ContactName")
        .TemplateId("itemTemplate") // Reference to the template.
        .DataSource(source =>
        {
            source.Read(read =>
            {
                read.Action("Template_GetCustomers", "Home");
            });
        })
    )

## Header Template

The header template manages the way the popup header of a AutoComplete is rendered.

    <!-- Template -->
    <script id="headerTemplate" type="text/x-kendo-template">
        <strong>Header</strong>
    </script>

    <!-- AutoComplete initialization -->
    @(Html.Kendo().AutoComplete()
        .Name("customers")
        .DataTextField("ContactName")
        .HeaderTemplateId("headerTemplate") // Reference to the template.
        .DataSource(source =>
        {
            source.Read(read =>
            {
                read.Action("Template_GetCustomers", "ComboBox");
            });
        })
    )

## Footer Template

The footer template manages the way the popup footer of a AutoComplete is rendered. The footer is re-rendered on every change of the Data Source. The context of the template is the widget itself.

    <!-- Template -->
    <script id="footerTemplate" type="text/x-kendo-template">
        Total <strong>#: instance.dataSource.total() #</strong> items found
    </script>

    <!-- AutoComplete initialization -->
    @(Html.Kendo().AutoComplete()
        .Name("customers")
        .DataTextField("ContactName")
        .FooterTemplateId("footerTemplate") // Reference to the template.
        .DataSource(source =>
        {
            source.Read(read =>
            {
                read.Action("Template_GetCustomers", "Home");
            });
        })
    )

## No-Data Templates

The AutoComplete displays `noDataTemplate` in the popup when the data source is empty.

    <!-- Template -->
    <script id="noDataTemplate" type="text/x-kendo-template">
        <strong>No Data!</strong>
    </script>

    <!-- AutoComplete initialization -->
    @(Html.Kendo().AutoComplete()
        .Name("customers")
        .DataTextField("ContactName")
        .NoDataTemplateId("noDataTemplate") // Reference to the template.
        .DataSource(source =>
        {
            source.Read(read =>
            {
                read.Action("Template_GetCustomers", "Home");
            });
        })
    )

## See Also

* [Customizing Templates in the AutoComplete HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/autocomplete/template)
* [Server-Side API](/api/autocomplete)
