---
title: Filtering
page_title: Filtering | Telerik UI MultiColumnComboBox HtmlHelper for ASP.NET Core
description: "Set the filter options of the Telerik UI MultiColumnComboBox HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: filtering_multicolumncombobox_aspnetcore
position: 4
---

# Filtering

Apart from the standard filter options, the MultiColumnComboBox allows you to set fields against which the data will be filtered.

The option accepts an array of strings.

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

## See Also

* [Server Filtering by the MultiColumnComboBox HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/multicolumncombobox/serverfiltering)
* [Client Filtering by the MultiColumnComboBox HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/multicolumncombobox/clientfiltering)
* [Server-Side API](/api/multicolumncombobox)
