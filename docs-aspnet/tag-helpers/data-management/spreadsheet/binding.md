---
title: Data Binding
page_title: Data Binding
description: "Bind the sheets of the Telerik UI Spreadsheet TagHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC) to a data source instance."
slug: databinding_spreadsheet_aspnetcore
position: 2
---

# Data Binding

You can bind the individual sheets of the Spreadsheet to a DataSource instance.

    <kendo-spreadsheet name="spreadsheet" style="width: 100%">
        <excel proxy-url="@Url.Action(" TagHelper_Save", "Spreadsheet" )" />
        <pdf proxy-url="@Url.Action("TagHelper_Save", "Spreadsheet")" />
        <sheets>
            <sheet name="Products">
                <datasource batch="true">
                    <transport>
                        <read url="https://demos.telerik.com/kendo-ui/service/Products" datatype="jsonp" />
                        <create url="https://demos.telerik.com/kendo-ui/service/Products/Create" datatype="jsonp" />
                        <update url="https://demos.telerik.com/kendo-ui/service/Products/Update" datatype="jsonp" />
                        <destroy url="https://demos.telerik.com/kendo-ui/service/Products/Destroy" datatype="jsonp" />
                    </transport>
                    <schema>
                        <model id="ProductID">
                            <fields>
                                <field type="number" name="ProductID"></field>
                                <field type="string" name="ProductName"></field>
                                <field type="number" name="UnitPrice"></field>
                                <field type="boolean" name="Discontinued"></field>
                                <field type="number" name="UnitsInStock"></field>
                            </fields>
                        </model>
                    </schema>
                </datasource>
            </sheet>
        </sheets>
    </kendo-spreadsheet>

## See Also

* [Basic Usage of the Spreadsheet TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/spreadsheet/index)
* [Server-Side API](/api/spreadsheet)
