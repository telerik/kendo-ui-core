---
title: Selection
page_title: Selection | Telerik UI Grid Tag Helper for ASP.NET Core
description: "Learn how to enable the selection functionality of the Telerik UI Grid for ASP.NET Core using tag helpers."
slug: taghelpers_grid_aspnetcore_selection
position: 5
---

# Selection

By default, the selection functionality of the Telerik UI Grid for ASP.NET Core is disabled.

## Getting Started

To control the selection in the Grid, use the `selectable` property.

   ```tagHelper
        <kendo-grid name="grid" height="550" on-change="onChange" selectable="true">
            <datasource type="DataSourceTagHelperType.Custom" custom-type="odata" page-size="20">
                <transport>
                    <read url="https://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers" />
                </transport>
            </datasource>
            <groupable enabled="true" />
            <sortable enabled="true" />
            <pageable button-count="5" refresh="true" page-sizes="new int[] { 5, 10, 20 }">
            </pageable>

            <filterable enabled="true" />
            <columns>
                <column field="ContactName" title="Contact Name" width="240" />
                <column field="ContactTitle" title="Contact Title" />
                <column field="CompanyName" title="Company Name" />
                <column field="Country" title="Country" width="150" />
            </columns>
        </kendo-grid>

        <script>
            function onChange(e) {
                var selectedRow = this.select();
                var dataItem = this.dataItem(selectedRow);
                console.log(dataItem)
            }
        </script>
   ```

## Select Modes

The Grid supports the following select modes:
* [Single and multiple selection (htmlhelper demo)](https://demos.telerik.com/aspnet-core/grid/selection)
* [Checkbox selection (htmlhelper demo)](https://demos.telerik.com/aspnet-core/grid/checkbox-selection)

You can set the select mode to `Multiple` or `Single`. Additionally, the Grid provides the `Row` and `Cell` select types which allow multiple or single selection of rows or cells.

Accepted values in the kendo-grid tag for `selectable` are:
* "true" - enables selection
* "row" - the user can select a single row.
* "cell" - the user can select a single cell.
* "multiple, row" - the user can select multiple rows.
* "multiple, cell" - the user can select multiple cells.

   ```tagHelper
        <kendo-grid name="grid" height="550" on-change="onChange" selectable="multiple, cell">
            <datasource type="DataSourceTagHelperType.Custom" custom-type="odata" page-size="20">
                <transport>
                    <read url="https://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers" />
                </transport>
            </datasource>
            <groupable enabled="true" />
            <sortable enabled="true" />
            <pageable button-count="5" refresh="true" page-sizes="new int[] { 5, 10, 20 }">
            </pageable>

            <filterable enabled="true" />
            <columns>
                <column field="ContactName" title="Contact Name" width="240" />
                <column field="ContactTitle" title="Contact Title" />
                <column field="CompanyName" title="Company Name" />
                <column field="Country" title="Country" width="150" />
            </columns>
        </kendo-grid>

        <script>
            function onChange(e) {
                var selectedRow = this.select();
                var dataItem = this.dataItem(selectedRow);
                console.log(dataItem)
            }
        </script>
   ```


## Persisting the Selection

The Grid also provides a built-in functionality for persisting the selection through the `persist-selection` property by setting it to be `true`. 

>You also need to configure the `ID` field in the schema of the DataSource. For a runnable example, refer to the [htmlhelper demo on persisting the state of the Grid](https://demos.telerik.com/aspnet-core/grid/persist-state).

​```tagHelper
        <kendo-grid name="grid" height="550" on-change="onChange" persist-selection="true">
            <datasource type="DataSourceTagHelperType.Custom" custom-type="odata" page-size="20">
                <transport>
                    <read url="https://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers" />
                </transport>
                 <schema>
                    <model id="CustomerID">
                        <fields>
                            <field name="ContactName" type="string"></field>
                            <field name="ContactTitle" type="string"></field>
                            <field name="CompanyName" type="string"></field>
                            <field name="Country" type="string"></field>
                        </fields>
                    </model>
                </schema>
            </datasource>
            <groupable enabled="true" />
            <sortable enabled="true" />
            <pageable button-count="5" refresh="true" page-sizes="new int[] { 5, 10, 20 }">
            </pageable>

            <filterable enabled="true" />
            <columns>
                <column field="ContactName" title="Contact Name" width="240" />
                <column field="ContactTitle" title="Contact Title" />
                <column field="CompanyName" title="Company Name" />
                <column field="Country" title="Country" width="150" />
            </columns>
        </kendo-grid>

        <script>
            function onChange(e) {
                var selectedRow = this.select();
                var dataItem = this.dataItem(selectedRow);
                console.log(dataItem)
            }
        </script>
```

## See Also

* [Kendo UI for jQuery: selectable](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/selectable)
* [Kendo UI for jQuery: Grid/Selection](https://demos.telerik.com/kendo-ui/grid/selection)
* [JavaScript API Reference for the ASP.NET Core Grid](/api/grid)