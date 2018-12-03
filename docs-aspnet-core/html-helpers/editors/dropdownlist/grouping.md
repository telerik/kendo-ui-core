---
title: Grouping
page_title: DropDownList | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn how the Grouping functionality for the Kendo UI DropDownList HtmlHelper for ASP.NET Core works."
slug: htmlhelpers_dropdownlist_grouping_aspnetcore
position: 6
---

# Grouping Overview

The DropDownList supports binding to a grouped data source. Define a `datasource` group expression to group the data by using the Custom DataSource configuration. You need to specify the field that the widget should group by:

The example below demonstrates how to group the data in the DropDownList by Country:

###### Example

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



> **Important**
>
> The data source sorts the grouped data either in ascending or descending order. If you want to persist a specific group order, use the [server grouping feature](http://docs.telerik.com/kendo-ui/api/javascript/data/datasource#configuration-serverGrouping). Use the DataSource `ServerGrouping` method to define the `serverGrouping` option.


 ## See Also

* [Templates for DropDownList]({% slug htmlhelpers_dropdownlist_templates_aspnetcore %})
* [Bindings for DropDownList]({% slug htmlhelpers_dropdownlist_databinding_aspnetcore %})
* [JavaScript API Reference of the DropDownList](http://docs.telerik.com/kendo-ui/api/javascript/ui/dropdownlist)
* [DropDownList HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/dropdownlist/overview)
* [DropDownList Official Demos](http://demos.telerik.com/aspnet-core/dropdownlist/index)