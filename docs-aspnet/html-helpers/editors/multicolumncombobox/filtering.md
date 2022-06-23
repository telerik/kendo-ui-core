---
title: Filtering
page_title: Filtering
description: "Set the filter options of the Telerik UI MultiColumnComboBox component for {{ site.framework }}."
previous_url: /helpers/editors/multicolumncombobox/filtering
slug: filtering_multicolumncombobox_aspnetcore
position: 6
---

# Filtering

Apart from the standard filter options, the MultiColumnComboBox allows you to set fields against which the data will be filtered.

The option accepts an array of strings.

```HtmlHelper
    @(Html.Kendo().MultiColumnComboBox()
        .Name("multicolumncombobox")
        .Filter("contains")
        .FilterFields(new string[] { "ContactName", "ContactTitle" })
        .Columns(columns =>
        {
            columns.Add().Field("ContactName").Title("Contact Name").Width("200px")
            columns.Add().Field("ContactTitle").Title("Contact Title").Width("200px");
            columns.Add().Field("CompanyName").Title("Company Name").Width("200px");
            columns.Add().Field("Country").Title("Country").Width("200px");
        })
        .DataSource(source => source
            .Read(read => read.Action("Products_Read", "MultiColumnComboBox"))
            .ServerFiltering(true)
        )
    )
```
{% if site.core %}
```TagHelper
    <kendo-multicolumncombobox  name="multicolumncombobox" 
    filter="FilterType.Contains"
    filter-fields='new string[] { "ContactName", "ContactTitle"}'>
        <multicolumncombobox-columns>
            <column field="ContactName" title="Contact Name" width="200px">
            </column>
            <column field="ContactTitle" title="Contact Title" width="200px">
            </column>
            <column field="CompanyName" title="Company Name" width="200px">
            </column>
            <column field="Country" title="Country" width="200px">
            </column>
        </multicolumncombobox-columns>
        <datasource server-filtering="true">
            <transport>
                <read url="@Url.Action("Products_Read", "MultiColumnComboBox")" />
            </transport>
        </datasource>
    </kendo-multicolumncombobox>
```
{% endif %}

## See Also

* [Server Filtering by the MultiColumnComboBox HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/multicolumncombobox/serverfiltering)
* [Client Filtering by the MultiColumnComboBox HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/multicolumncombobox/clientfiltering)
* [Server-Side API](/api/multicolumncombobox)
