---
title: Grouping
page_title: Grouping | Kendo UI DropDownList HtmlHelper for ASP.NET Core
description: "Learn how to group data in the Kendo UI DropDownList HtmlHelper for ASP.NET Core works."
slug: htmlhelpers_dropdownlist_grouping_aspnetcore
position: 6
---

# Grouping Overview

The DropDownList enables you to bind it to a grouped data source.

To group the data, define a group `datasource` expression which uses a custom DataSource configuration, and specify the field by which the DropDownList will be grouped.

> **Important**
>
> The data source sorts the grouped data either in ascending or descending order. To persist a specific group order, use the [server grouping feature](http://docs.telerik.com/kendo-ui/api/javascript/data/datasource#configuration-serverGrouping). To define the `serverGrouping` option, use the `ServerGrouping` method of the DataSource.

The following example demonstrates how to group the data in the DropDownList by country.

###### Example

    ```
    @(Html.Kendo().DropDownList()
        .Name("customers")
        .DataSource(source =>  source
            .Custom()
            .Group(g => g.Add("Country", typeof(string)))
            .Transport(transport => transport
                .Read(read =>
                {
                    read.Action("Grouping_GetCustomers", "DropDownList");
                }))
            )
        .DataTextField("ContactName")
        .DataValueField("CustomerID")
    )
    ```

## See Also

* [Templates for DropDownList]({% slug htmlhelpers_dropdownlist_templates_aspnetcore %})
* [Bindings for DropDownList]({% slug htmlhelpers_dropdownlist_databinding_aspnetcore %})
* [JavaScript API Reference of the DropDownList](http://docs.telerik.com/kendo-ui/api/javascript/ui/dropdownlist)
* [DropDownList HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/dropdownlist/overview)
* [DropDownList Official Demos](http://demos.telerik.com/aspnet-core/dropdownlist/index)
