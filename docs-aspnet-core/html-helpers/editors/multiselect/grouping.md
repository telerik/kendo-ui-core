---
title: Grouping
page_title: Grouping | Telerik UI MultiSelect HtmlHelper for ASP.NET Core
description: "Learn how to group data in the Telerik UI MultiSelect HtmlHelper for ASP.NET Core."
slug: htmlhelpers_multiselect_grouping_aspnetcore
position: 6
---

# Grouping

The MultiSelect allows you to bind it to a grouped data source.

To group the data, define a group `datasource` expression which uses a custom DataSource configuration, and specify the field by which the MultiSelect will be grouped.

> The data source sorts the grouped data either in ascending or descending order. To persist a specific group order, use the [server grouping feature of Kendo UI for jQuery](http://docs.telerik.com/kendo-ui/api/javascript/data/datasource#configuration-serverGrouping). To define the `serverGrouping` option, use the `ServerGrouping` method of the DataSource.

The following example demonstrates how to group the data in the MultiSelect by country.

    @(Html.Kendo().MultiSelect()
        .Name("customers")
        .Placeholder("Select customers...")
        .DataSource(source =>  source
            .Custom()
            .Group(g => g.Add("Country", typeof(string)))
            .Transport(transport => transport
                .Read(read =>
                {
                    read.Action("Customers_Read", "MultiSelect")
                        .Data("onAdditionalData");
                }))
                .ServerFiltering(true))
        .DataTextField("ContactName")
        .DataValueField("CustomerID")
    )
    <script>
        function onAdditionalData() {
            return {
                text: $("#customers").val()
            };
        }
    </script>

## See Also

* [Grouping by the MultiSelect HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/multiselect/grouping)
* [Server-Side API](/api/multiselect)
