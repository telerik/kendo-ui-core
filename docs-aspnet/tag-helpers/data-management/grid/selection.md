---
title: Selection
page_title: Selection
description: "Learn how to enable the selection functionality of the Telerik UI Grid for ASP.NET Core by using the Grid TagHelper."
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
* [Single and multiple selection](https://demos.telerik.com/aspnet-core/grid/selection)
* [Checkbox selection](https://demos.telerik.com/aspnet-core/grid/checkbox-selection)

You can set the select mode to `Multiple` or `Single`. Additionally, the Grid provides the `Row` and `Cell` select types which allow multiple or single selection of rows or cells.

The Grid TagHelper accepts the following values for its `selectable` property:
* `true`&mdash;Enables the selection.
* `row`&mdash;Enables the single-row selection.
* `cell`&mdash;Enables the single-cell selection.
* `multiple, row`&mdash;Enables the multiple-row selection.
* `multiple, cell`&mdash;Enables the multiple-cell selection.

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

The Grid provides a built-in functionality for persisting the selection through the `persist-selection` property and its setting it to `true`.

> To persist the selection in the Grid, you also need to configure the `ID` field in the schema of the DataSource. For a runnable example, refer to the [demo on persisting the state of the Grid](https://demos.telerik.com/aspnet-core/grid/persist-state).

```tagHelper
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

* [Selection by the Kendo UI for jQuery Grid (Demo)](https://demos.telerik.com/kendo-ui/grid/selection)
* [API Reference of selectable in Kendo UI for jQuery](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/selectable)
* [Server-Side API](/api/grid)
