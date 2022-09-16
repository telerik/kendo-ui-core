---
title: Grouping
page_title: Grouping
description: "Learn how to group data in the Telerik UI ComboBox component for {{ site.framework }} works."
previous_url: /helpers/editors/combobox/grouping
slug: htmlhelpers_combobox_grouping_aspnetcore
position: 3
---

# Grouping Overview

The ComboBox enables you to bind it to a grouped data source.

To group the data, define a group `datasource` expression which uses a custom DataSource configuration, and specify the field by which the ComboBox will be grouped. For a runnable example, refer to the [demo on grouping in the ComboBox](https://demos.telerik.com/{{ site.platform }}/combobox/grouping).

> The data source sorts the grouped data either in ascending or descending order. To persist a specific group order, use the [server grouping feature](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource#configuration-serverGrouping). To define the `serverGrouping` option, use the `ServerGrouping` method of the DataSource.

The following example demonstrates how to group the ComboBox data by country.

```HtmlHelper
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
```
{% if site.core %}
```TagHelper
<kendo-combobox name="customers"
                datatextfield="ContactName"
                datavaluefield="CustomerID">
    <datasource type="DataSourceTagHelperType.Custom">
        <groups>
            <group typeof="string" field="Country"></group>
        </groups>
        <transport>
            <read url="@Url.Action("GetCascadeProducts", "ComboBox")" />
        </transport>
    </datasource>
</kendo-combobox>
```
{% endif %}

## See Also

* [Grouping by the ComboBox HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/combobox/grouping)
* [Server-Side API](/api/combobox)
