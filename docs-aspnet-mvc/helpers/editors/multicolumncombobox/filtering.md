---
title: Filtering
page_title: Filtering | Telerik UI MultiColumnComboBox HtmlHelper for ASP.NET MVC
description: "Set the filter options of the Telerik UI MultiColumnComboBox HtmlHelper for ASP.NET MVC."
slug: filtering_multicolumncombobox_aspnetmvc
position: 4
---

# Filtering

Apart from the standard filter options, the MultiColumnComboBox allows you to set fields against which the data will be filtered.

The option accepts an array of strings.

```
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

## See Also

* [Server Filtering by the MultiColumnComboBox HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/multicolumncombobox/serverfiltering)
* [Client Filtering by the MultiColumnComboBox HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/multicolumncombobox/clientfiltering)
* [MultiColumnComboBoxBuilder Server-Side API](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/MultiColumnComboBoxBuilder)
* [MultiColumnComboBox Server-Side API](/api/multicolumncombobox)
