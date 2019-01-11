---
title: Grouping
page_title: Grouping | Kendo UI ComboBox HtmlHelper for ASP.NET Core
description: "Learn how to group data in the Kendo UI ComboBox HtmlHelper for ASP.NET Core works."
slug: htmlhelpers_combobox_grouping_aspnetcore
position: 6
---

# Grouping Overview

The ComboBox enables you to bind it to a grouped data source.

To group the data, define a group `datasource` expression which uses a custom DataSource configuration, and specify the field by which the ComboBox will be grouped.

> **Important**
>
> The data source sorts the grouped data either in ascending or descending order. To persist a specific group order, use the [server grouping feature](http://docs.telerik.com/kendo-ui/api/javascript/data/datasource#configuration-serverGrouping). To define the `serverGrouping` option, use the `ServerGrouping` method of the DataSource.

The following example demonstrates how to group the data in the ComboBox by country.

###### Example

    @(Html.Kendo().ComboBox()
        .Name("customers")
        .DataSource(source =>  source
            .Custom()
            .Group(g => g.Add("Country", typeof(string)))
            .Transport(transport => transport
                .Read(read =>
                {
                    read.Action("Grouping_GetCustomers", "ComboBox");
                }))
            )
        .DataTextField("ContactName")
        .DataValueField("CustomerID")
    )

## See Also

* [Templates for ComboBox]({% slug htmlhelpers_combobox_templates_aspnetcore %})
* [Bindings for ComboBox]({% slug htmlhelpers_combobox_databinding_aspnetcore %})
* [JavaScript API Reference of the ComboBox](http://docs.telerik.com/kendo-ui/api/javascript/ui/combobox)
* [ComboBox HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/combobox/overview)
* [ComboBox Official Demos](http://demos.telerik.com/aspnet-core/combobox/index)
