---
title: Templates
page_title: Templates
description: "Use templates and customize the rendering of the items, values, and the popup header of the Telerik UI DropDownList component for {{ site.framework }}."
components: ["dropdownlist"]
slug: htmlhelpers_dropdownlist_templates_aspnetcore
position: 4
---

# Templates

The DropDownList provides full control over the way an item, a selected value, or a pop-up header is rendered through the Kendo UI for jQuery templates.

For more information on the capabilities and syntax of the templates, refer to this [documentation article](https://docs.telerik.com/kendo-ui/framework/templates/overview). For a runnable example, refer to the [demo on customizing the templates in the DropDownList](https://demos.telerik.com/{{ site.platform }}/dropdownlist/template).

## Basic Usage

The following example demonstrates how to customize the DropDownList by declaring an inline string.


```HtmlHelper
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
{% if site.core %}
```TagHelper
<kendo-dropdownlist name="customers"
                    datatextfield="ContactName"
                    datavaluefield="CustomerID"
                    template-id="itemTemplate">
    <datasource>
        <transport>
            <read url="@Url.Action("Template_GetCustomers", "ComboBox")" />
        </transport>
    </datasource>
</kendo-dropdownlist>
```
{% endif %}
```JS Template
    <script id="itemTemplate" type="text/x-kendo-template">
        ContactName: #:data.ContactName#, CustomerID: #:data.CustomerID#
    </script>
```

The following example demonstrates how to customize the DropDownList by referencing a script tag by its `id`.

```HtmlHelper
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
```TagHelper
<kendo-dropdownlist name="customers"
                    datatextfield="ContactName"
                    datavaluefield="CustomerID"
                    template="<span><h3>#: data.ContactName #</h3><p>#: data.CompanyName #</p></span>">

    <datasource>
        <transport>
            <read url="@Url.Action("Template_GetCustomers", "ComboBox")" />
        </transport>
    </datasource>
</kendo-dropdownlist>
```

## Item Template

The item template manages the way the list items of a DropDownList are rendered.

The following example demonstrates how to define an item template and how to evaluate it against the dataItem.

```HtmlHelper
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
```
{% if site.core %}
```TagHelper
<kendo-dropdownlist name="customers"
                    datatextfield="ContactName"
                    datavaluefield="CustomerID"
                    template-id="itemTemplate">
    <datasource>
        <transport>
            <read url="@Url.Action("Template_GetCustomers", "ComboBox")" />
        </transport>
    </datasource>
</kendo-dropdownlist>
```
{% endif %}
```JS Template
    <script id="itemTemplate" type="text/x-kendo-template">
        ContactName: #:data.ContactName#, CustomerID: #:data.CustomerID#
    </script>
```

## Value Templates

The value template manages the way the selected value of a DropDownList is rendered.

> Include only HTML elements in the value templates.

```HtmlHelper
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
```
{% if site.core %}
```TagHelper
<kendo-dropdownlist name="customers"
                    datatextfield="ContactName"
                    datavaluefield="CustomerID"
                    value-template-id="valueTemplate">

    <datasource>
        <transport>
            <read url="@Url.Action("Template_GetCustomers", "ComboBox")" />
        </transport>
    </datasource>
</kendo-dropdownlist>
```
{% endif %}
```JS Template
    <script id="valueTemplate" type="text/x-kendo-template">
        ContactName: #:data.ContactName#
    </script>

```

## Header Templates

The header template manages the way the pop-up header of a DropDownList is rendered.

```HtmlHelper

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
```
{% if site.core %}
```TagHelper
<kendo-dropdownlist name="customers"
                    datatextfield="ContactName"
                    datavaluefield="CustomerID"
                    header-template-id="headerTemplate">

    <datasource>
        <transport>
            <read url="@Url.Action("Template_GetCustomers", "ComboBox")" />
        </transport>
    </datasource>
</kendo-dropdownlist>
```
{% endif %}
```JS Template
    <script id="headerTemplate" type="text/x-kendo-template">
        <strong>Header</strong>
    </script>
```

## Footer Templates

The footer template manages the way the pop-up footer of a DropDownList is rendered. The footer is re-rendered on every change of the Data Source. The context of the template is the widget itself.

```HtmlHelper
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
```
{% if site.core %}
```TagHelper
  <kendo-dropdownlist name="customers"
                    datatextfield="ContactName"
                    datavaluefield="CustomerID"
                    footer-template-id="footerTemplate">

    <datasource>
        <transport>
            <read url="@Url.Action("Template_GetCustomers", "ComboBox")" />
        </transport>
    </datasource>
</kendo-dropdownlist>
```
{% endif %}
```JS Template
    <script id="footerTemplate" type="text/x-kendo-template">
        Total <strong>#: instance.dataSource.total() #</strong> items found
    </script>
```

## No-Data Templates

The DropDownList displays `noDataTemplate` in the popup when the data source is empty.

> When the `noDataTemplate` option is defined, the DropDownList always opens the popup element.

```HtmlHelper
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
```
{% if site.core %}
```TagHelper
<kendo-dropdownlist name="customers"
                    datatextfield="ContactName"
                    datavaluefield="CustomerID"
                    no-data-template-id="noDataTemplate">

    <datasource>
        <transport>
            <read url="@Url.Action("Template_GetCustomers", "ComboBox")" />
        </transport>
    </datasource>
</kendo-dropdownlist>
```
{% endif %}
```JS Template
    <script id="noDataTemplate" type="text/x-kendo-template">
        <strong>No Data!</strong>
    </script>
```

## Option Label Template

The DropDownList displays an `OptionLabelTemplate` when the `OptionLabel` has been set. Use `OptionLabelTemplate` if you want to customize the markup of the optionLabel.

> If the `OptionLabel` is defined as an object, the object must contain the model properties corresponding to the `DataValueField` and `DataTextField` options. For example, `OptionLabel(new { ContactName = "Select address", CustomerID = 0 })`. Otherwise, the component will show `undefined`.

```HtmlHelper
    @(Html.Kendo().DropDownList()
                .Name("customers")
                .DataTextField("ContactName")
                .DataValueField("CustomerID")
                .OptionLabel("Select address...")
                .OptionLabelTemplate("<span style='color: red'>Select address...</span>")
                .DataSource(source =>
                {
                    source.Read(read =>
                    {
                        read.Action("Template_GetCustomers", "ComboBox");
                    });
                })
    )
```
{% if site.core %}
```TagHelper
<kendo-dropdownlist name="customers"
                    datatextfield="ContactName"
                    datavaluefield="CustomerID"
                    option-label="Select address..."
                    option-label-template="<span style='color: red'>Select address...</span>">

    <datasource>
        <transport>
            <read url="@Url.Action("Template_GetCustomers", "ComboBox")" />
        </transport>
    </datasource>
</kendo-dropdownlist>
```
{% endif %}

## See Also

* [Customizing Templates in the DropDownList HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/dropdownlist/template)
* [Server-Side API](/api/dropdownlist)
