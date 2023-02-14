---
title: Templates
page_title: Templates
description: "Use templates and customize the rendering of the items, tags, and the popup header of the Telerik UI MultiSelect component for {{ site.framework }}."
slug: htmlhelpers_multiselect_templates_aspnetcore
position: 4
---

# Templates

The MultiSelect provides full control over the way items, tags, or a pop-up header is rendered through the Kendo UI for jQuery templates.

## Basic Usage

The following example demonstrates how to customize the MultiSelect by referencing a script tag by its `id`.

```HtmlHelper
    <!-- Template -->
    <script id="itemTemplate" type="text/x-kendo-template">
        ContactName: #:data.ContactName#, CustomerID: #:data.CustomerID#
    </script>

    <!-- MultiSelect initialization -->
    @(Html.Kendo().MultiSelect()
        .Name("customers")
        .DataTextField("ContactName")
        .DataValueField("CustomerID")
        .ItemTemplateId("itemTemplate") //Reference to the template
        .DataSource(source =>
        {
            source.Read(read =>
            {
                read.Action("Customers_Read", "MultiSelect");
            });
        })
    )
```
{% if site.core %}
```TagHelper
    <!-- Template -->
    <script id="itemTemplate" type="text/x-kendo-template">
        ContactName: #:data.ContactName#, CustomerID: #:data.CustomerID#
    </script>

    <!-- MultiSelect initialization -->
    <kendo-multiselect name="customers"
                       datatextfield="ContactName"
                       datavaluefield="CustomerID"
                       item-template-id="itemTemplate">
        <datasource type="DataSourceTagHelperType.Custom">
               <transport>
                    <read url="@Url.Action("Customers_Read", "MultiSelect")" />
               </transport>
        </datasource>
    </kendo-multiselect>
```
{% endif %}

The following example demonstrates how to customize the MultiSelect by declaring an inline string.

```HtmlHelper
    @(Html.Kendo().MultiSelect()
        .Name("customers")
        .DataTextField("ContactName")
        .DataValueField("CustomerID")
        .ItemTemplate("<span><h3>#: data.ContactName #</h3><p>#: data.CompanyName #</p></span>")
        .DataSource(source =>
        {
            source.Read(read =>
            {
                read.Action("Customers_Read", "MultiSelect");
            });
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-multiselect name="customers"
                       datatextfield="ContactName"
                       datavaluefield="CustomerID"
                       item-template="<span><h3>#: data.ContactName #</h3><p>#: data.CompanyName #</p></span>">
        <datasource type="DataSourceTagHelperType.Custom">
               <transport>
                    <read url="@Url.Action("Customers_Read", "MultiSelect")" />
               </transport>
        </datasource>
    </kendo-multiselect>
```
{% endif %}

## Item Template

The item template manages the way the list items of a MultiSelect are rendered.

The following example demonstrates how to define an item template and how to evaluate it against the `dataItem`.

```HtmlHelper
    <!-- Template -->
    <script id="itemTemplate" type="text/x-kendo-template">
        ContactName: #:data.ContactName#, CustomerID: #:data.CustomerID#
    </script>

    <!-- MultiSelect initialization -->
    @(Html.Kendo().MultiSelect()
        .Name("customers")
        .DataTextField("ContactName")
        .DataValueField("CustomerID")
        .ItemTemplateId("itemTemplate") // Reference to the template.
        .DataSource(source =>
        {
            source.Read(read =>
            {
                read.Action("Customers_Read", "MultiSelect");
            });
        })
    )
```
{% if site.core %}
```TagHelper
    <!-- Template -->
    <script id="itemTemplate" type="text/x-kendo-template">
        ContactName: #:data.ContactName#, CustomerID: #:data.CustomerID#
    </script>

    <!-- MultiSelect initialization -->
    <kendo-multiselect name="customers"
                       datatextfield="ContactName"
                       datavaluefield="CustomerID"
                       item-template-id="itemTemplate">
        <datasource type="DataSourceTagHelperType.Custom">
               <transport>
                    <read url="@Url.Action("Customers_Read", "MultiSelect")" />
               </transport>
        </datasource>
    </kendo-multiselect>
```
{% endif %}

## Tag Template

The tag template manages the way the tag of a MultiSelect is rendered.

The following example demonstrates how to define a tag template.

```HtmlHelper
    <!-- Template -->
    <script id="tagTemplate" type="text/x-kendo-template">
        ContactName: #:data.ContactName#
    </script>

    <!-- MultiSelect initialization -->
    @(Html.Kendo().MultiSelect()
        .Name("customers")
        .DataTextField("ContactName")
        .DataValueField("CustomerID")
        .TagTemplateId("tagTemplate") // Reference to the template.
        .DataSource(source =>
        {
            source.Read(read =>
            {
                read.Action("Customers_Read", "MultiSelect");
            });
        })
    )
```
{% if site.core %}
```TagHelper
    <!-- Template -->
    <script id="tagTemplate" type="text/x-kendo-template">
        ContactName: #:data.ContactName#
    </script>

    <!-- MultiSelect initialization -->
    <kendo-multiselect name="customers"
                       datatextfield="ContactName"
                       datavaluefield="CustomerID"
                       tag-template-id="tagTemplate">
        <datasource type="DataSourceTagHelperType.Custom">
               <transport>
                    <read url="@Url.Action("Customers_Read", "MultiSelect")" />
               </transport>
        </datasource>
    </kendo-multiselect>
```
{% endif %}

## Header Template

The header template manages the way the pop-up header of a MultiSelect is rendered.

The following example demonstrates how to define a header template.

```HtmlHelper
    <!-- Template -->
    <script id="headerTemplate" type="text/x-kendo-template">
        <strong>Header</strong>
    </script>

    <!-- MultiSelect initialization -->
    @(Html.Kendo().MultiSelect()
        .Name("customers")
        .DataTextField("ContactName")
        .DataValueField("CustomerID")
        .HeaderTemplateId("headerTemplate") // Reference to the template.
        .DataSource(source =>
        {
            source.Read(read =>
            {
                read.Action("Customers_Read", "MultiSelect");
            });
        })
    )
```
{% if site.core %}
```TagHelper
    <!-- Template -->
    <script id="headerTemplate" type="text/x-kendo-template">
        <strong>Header</strong>
    </script>

    <!-- MultiSelect initialization -->
    <kendo-multiselect name="customers"
                       datatextfield="ContactName"
                       datavaluefield="CustomerID"
                       header-template-id="headerTemplate">
        <datasource type="DataSourceTagHelperType.Custom">
               <transport>
                    <read url="@Url.Action("Customers_Read", "MultiSelect")" />
               </transport>
        </datasource>
    </kendo-multiselect>
```
{% endif %}

## Footer Template

The footer template manages the way the pop-up footer of a MultiSelect is rendered. The footer is re-rendered on every change of the DataSource. The context of the template is the widget itself.

The following example demonstrates how to define a footer template.

```HtmlHelper
    <!-- Template -->
    <script id="footerTemplate" type="text/x-kendo-template">
        Total <strong>#: instance.dataSource.total() #</strong> items found
    </script>

    <!-- MultiSelect initialization -->
    @(Html.Kendo().MultiSelect()
        .Name("customers")
        .DataTextField("ContactName")
        .DataValueField("CustomerID")
        .FooterTemplateId("footerTemplate") // Reference to the template.
        .DataSource(source =>
        {
            source.Read(read =>
            {
                read.Action("Customers_Read", "MultiSelect");
            });
        })
    )
```
{% if site.core %}
```TagHelper
    <!-- Template -->
    <script id="footerTemplate" type="text/x-kendo-template">
        Total <strong>#: instance.dataSource.total() #</strong> items found
    </script>

    <!-- MultiSelect initialization -->
    <kendo-multiselect name="customers"
                       datatextfield="ContactName"
                       datavaluefield="CustomerID"
                       footer-template-id="footerTemplate">
        <datasource type="DataSourceTagHelperType.Custom">
               <transport>
                    <read url="@Url.Action("Customers_Read", "MultiSelect")" />
               </transport>
        </datasource>
    </kendo-multiselect>
```
{% endif %}

## No-Data Templates

The MultiSelect displays `noDataTemplate` in the popup when the data source is empty.

The following example demonstrates how to define a `noDataTemplate` template.

```HtmlHelper
    <!-- Template -->
    <script id="noDataTemplate" type="text/x-kendo-template">
        <strong>No Data!</strong>
    </script>

    <!-- MultiSelect initialization -->
    @(Html.Kendo().MultiSelect()
        .Name("customers")
        .DataTextField("ContactName")
        .DataValueField("CustomerID")
        .NoDataTemplateId("noDataTemplate") // Reference to the template.
        .DataSource(source =>
        {
            source.Read(read =>
            {
                read.Action("Customers_Read", "MultiSelect");
            });
        })
    )
```
{% if site.core %}
```TagHelper
    <!-- Template -->
    <script id="noDataTemplate" type="text/x-kendo-template">
        <strong>No Data!</strong>
    </script>

    <!-- MultiSelect initialization -->
    <kendo-multiselect name="customers"
                       datatextfield="ContactName"
                       datavaluefield="CustomerID"
                       no-data-template-id="noDataTemplate">
        <datasource type="DataSourceTagHelperType.Custom">
               <transport>
                    <read url="@Url.Action("Customers_Read", "MultiSelect")" />
               </transport>
        </datasource>
    </kendo-multiselect>
```
{% endif %}

## See Also

* [Customizing Templates in the MultiSelect HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/multiselect/template)
* [Server-Side API](/api/multiselect)
