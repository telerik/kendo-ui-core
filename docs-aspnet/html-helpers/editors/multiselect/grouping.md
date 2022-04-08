---
title: Grouping
page_title: Grouping
description: "Learn how to group data in the Telerik UI MultiSelect component for {{ site.framework }}."
previous_url: /helpers/editors/multiselect/grouping
slug: htmlhelpers_multiselect_grouping_aspnetcore
position: 6
---

# Grouping

The MultiSelect allows you to bind it to a grouped data source.

To group the data, define a group `datasource` expression which uses a custom DataSource configuration, and specify the field by which the MultiSelect will be grouped.

> The data source sorts the grouped data either in ascending or descending order. To persist a specific group order, use the [server grouping feature of Kendo UI for jQuery](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource#configuration-serverGrouping). To define the `serverGrouping` option, use the `ServerGrouping` method of the DataSource.

The following example demonstrates how to group the data in the MultiSelect by country.

```HtmlHelper
    @(Html.Kendo().MultiSelect()
        .Name("customers")
        .DataTextField("ContactName")
        .DataValueField("CustomerID")
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
    )
    <script>
        function onAdditionalData() {
            return {
                text: $("#customers").val()
            };
        }
    </script>
```
{% if site.core %}
```TagHelper
    <kendo-multiselect name="customers"
                       datatextfield="ContactName"
                       datavaluefield="CustomerID"
                       placeholder="Select customers...">
        <datasource type="DataSourceTagHelperType.Custom" server-filtering="true">
            <groups>
                <group field="Country" typeof="string"></group>
            </groups>
            <transport>
                 <read url="@Url.Action("Customers_Read", "MultiSelect")" data="onAdditionalData"/>
            </transport>
        </datasource>
    </kendo-multiselect>
    <script>
        function onAdditionalData() {
            return {
                text: $("#customers").val()
            };
        }
    </script>
```
{% endif %}

## See Also

* [Grouping by the MultiSelect HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/multiselect/grouping)
* [Server-Side API](/api/multiselect)
