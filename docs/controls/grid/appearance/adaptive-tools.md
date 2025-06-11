---
title: Adaptive Tools
page_title: jQuery Grid Documentation - Adaptive Tools
description: "Learn how to enable the adaptive tools in the toolbar of the jQuery Grid by Kendo UI."
slug: adaptive_tools_kendoui_grid_component
position: 6
---

# ToolBar Adaptive Tools

Starting with the Q2 2025 release, the Grid component supports rendering selected toolbar tools in adaptive mode. This feature improves usability on smaller screens by displaying certain UI elements—such as sorting, filtering, grouping, and editing—in a mobile-friendly ActionSheet.

To enable this behavior, configure the Grid with the [`adaptiveMode`](/api/javascript/ui/grid/configuration/adaptivemode) configuration option.

<demo metaUrl="grid/toolbar-tools/" height="600"></demo>

When the `adaptiveMode` is enabled and the Grid is rendered on small or medium screens, the Grid will display popups for sorting, filtering, and grouping in an ActionSheet. To ensure these tools function as expected, the corresponding configuration options (e.g., `sortable`, `filterable`, `groupable`) must be enabled on the Grid instance. If the Grid has editable mode `pop` set, an ActionSheet will also be displayed for editing or creating records. 

The adaptive tools are not displayed and are not supported in the [`overflow`](/api/javascript/ui/toolbar/configuration/items.overflow) mode of the toolbar.


## Sorting

To use sorting in adaptive mode, enable the Grid's [`sortable`](/api/javascript/ui/grid/configuration/sortable) option.

* In `single` sorting mode, the sorting popup will close immediately after a field is selected, and the Grid will be sorted accordingly.

* In `multiple` or `mixed` modes, the popup will remain open until the user clicks the **Done** button. Sorting is applied in the background as fields are selected.


```dojo
    <div id="grid"></div>
    <script src="https://demos.telerik.com/kendo-ui/content/shared/js/products.js"></script>

    <script>
        $("#grid").kendoGrid({
            dataSource: {
                data: products,
                schema: {
                    model: {
                        fields: {
                            ProductName: { type: "string" },
                            UnitPrice: { type: "number" },
                            UnitsInStock: { type: "number" },
                            Discontinued: { type: "boolean" }
                        }
                    }
                },
                pageSize: 20
            },
            height: 550,
            toolbar: ["sort"], 
            adaptiveMode: "auto",
            sortable: {
                mode: "multiple",
                showIndexes: true
            },                
            pageable: true,
            columns: [
                "ProductName",
                { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: "80px" },
                { field: "UnitsInStock", title: "Units In Stock", width: "80px" },
                { field: "Discontinued" }
            ]
        });
    </script>
```

## Filtering

The adaptive filter UI is based on the Grid’s [`filterable`](/api/javascript/ui/grid/configuration/filterable) settings. These options determine how filters are presented and applied within the ActionSheet or popup. For example, if the [`filterable.extra`](/api/javascript/ui/grid/configuration/filterable.extra) is disabled for the Grid or [`filterable.multi`](/api/javascript/ui/grid/configuration/columns.filterable.multi) is enabled for any of the columns, the filter UI will be applied also in the filter adaptive tool.
 

```dojo  
    <div id="grid"></div>
    <script src="https://demos.telerik.com/kendo-ui/content/shared/js/products.js"></script>

    <script>
        $("#grid").kendoGrid({
          dataSource: {
            data: products,
            schema: {
              model: {
                fields: {
                  ProductName: { type: "string" },
                  UnitPrice: { type: "number" },
                  UnitsInStock: { type: "number" },
                  Discontinued: { type: "boolean" },
                },
              },
            },
            pageSize: 20,
          },
          height: 550,
          toolbar: ["filter"],
          adaptiveMode: "auto",
          filterable: {
            extra: false,
          },
          pageable: true,
          columns: [
            "ProductName",
            {
              field: "UnitPrice",
              filterable: {
                multi: true,
              },
              title: "Unit Price",
              format: "{0:c}",
              width: "80px",
            },
            { field: "UnitsInStock", title: "Units In Stock", width: "80px" },
            { field: "Discontinued" },
          ],
        });
      </script>
```

## Grouping

The adaptive `grouping` tool allows users to add, remove, and reorder grouped columns. By default, groups can be rearranged via drag-and-drop within the popup. When the `reorderButtons` option is enabled, you can reorder the groups from the displayed arrow up and down arrow buttons. 

```dojo
    <div id="grid"></div>
    <script src="https://demos.telerik.com/kendo-ui/content/shared/js/products.js"></script>

    <script>
        $("#grid").kendoGrid({
          dataSource: {
            data: products,
            schema: {
              model: {
                fields: {
                  ProductName: { type: "string" },
                  UnitPrice: { type: "number" },
                  UnitsInStock: { type: "number" },
                  Discontinued: { type: "boolean" },
                },
              },
            },
            pageSize: 20,
          },
          height: 550,
          toolbar: ["group"],
          adaptiveMode: "auto",
          groupable: true,
          pageable: true,
          columns: [
            "ProductName",
            {
              field: "UnitPrice",
              filterable: {
                multi: true,
              },
              title: "Unit Price",
              format: "{0:c}",
              width: "80px",
            },
            { field: "UnitsInStock", title: "Units In Stock", width: "80px" },
            { field: "Discontinued" },
          ],
        });
      </script>
```

## Editing

The Grid supports editing in adaptive mode for all available editing configurations: `popup`, `inline`, and `incell`.

To enable editing or deleting rows in adaptive mode when the `popup` or `inline` editing is enabled, configure the Grid with the [`selectable`](/api/javascript/ui/grid/configuration/selectable) option. In a Grid with configured `incell` editing mode, `selectable` is needed only for deleting a row.  

When multiple rows are selected, operations will apply to the most recently selected row.

### Inline Editing

When a row is selected, an **Edit** button appears in the toolbar. Once the user finishes editing (by blurring the row), the Grid exits edit mode and displays **Save changes** and **Cancel changes** buttons.

The inline editing mode is demonstrated in the example below:

```dojo
        <div id="grid"></div>
        <script>
            $(document).ready(function () {
            var crudServiceBaseUrl = "https://demos.telerik.com/service/v2/core",
                dataSource = new kendo.data.DataSource({
                    transport: {
                        read:  {
                            url: crudServiceBaseUrl + "/Products"
                        },
                        update: {
                            url: crudServiceBaseUrl + "/Products/Update",
                            type: "POST",
                            contentType: "application/json"
                        },
                        destroy: {
                            url: crudServiceBaseUrl + "/Products/Destroy",
                            type: "POST",
                            contentType: "application/json"
                        },
                        create: {
                            url: crudServiceBaseUrl + "/Products/Create",
                            type: "POST",
                            contentType: "application/json"
                        },
                        parameterMap: function(options, operation) {
                            if (operation !== "read" && options.models) {
                                return kendo.stringify(options.models);
                            }
                        }
                    },
                    pageSize: 20,
                    schema: {
                        model: {
                            id: "ProductID",
                            fields: {
                                ProductID: { editable: false, nullable: true },
                                ProductName: { validation: { required: true } },
                                UnitPrice: { type: "number", validation: { required: true, min: 1} },
                                Discontinued: { type: "boolean" },
                                UnitsInStock: { type: "number", validation: { min: 0, required: true } }
                            }
                        }
                    }
                });

            $("#grid").kendoGrid({
                dataSource: dataSource,
                height: 550,
                    toolbar: [
                        "create",
                        "edit",
                        "cancel",
                        "save",
                        "filter",
                        "sort",
                        {
                            name: "spacer", type: "spacer"
                        },
                        "columnChooser"
                    ],
                    selectable: "single, row",
                    editable: "inline",
                    adaptiveMode: "auto",
                    filterable: true,
                    sortable: true,
                    pageable: true,
                    columns: [
                        "ProductName",
                        { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: 120 },
                        { field: "UnitsInStock", title: "Units In Stock", width: 120 },
                        { field: "Discontinued", width: 120 }
                    ],
            });
        });
        </script>

```

### Incell Editing

Users can edit cells by clicking into them. After a cell is edited and loses focus, the toolbar displays **Save changes** and **Cancel changes** buttons.

To delete a row, the user must first select the row, then click the **Delete** button in the toolbar.

```dojo
<div id="grid"></div>
        <script>
            $(document).ready(function () {
            var crudServiceBaseUrl = "https://demos.telerik.com/service/v2/core",
                dataSource = new kendo.data.DataSource({
                    transport: {
                        read:  {
                            url: crudServiceBaseUrl + "/Products"
                        },
                        update: {
                            url: crudServiceBaseUrl + "/Products/Update",
                            type: "POST",
                            contentType: "application/json"
                        },
                        destroy: {
                            url: crudServiceBaseUrl + "/Products/Destroy",
                            type: "POST",
                            contentType: "application/json"
                        },
                        create: {
                            url: crudServiceBaseUrl + "/Products/Create",
                            type: "POST",
                            contentType: "application/json"
                        },
                        parameterMap: function(options, operation) {
                            if (operation !== "read" && options.models) {
                                return kendo.stringify(options.models);
                            }
                        }
                    },
                    pageSize: 20,
                    schema: {
                        model: {
                            id: "ProductID",
                            fields: {
                                ProductID: { editable: false, nullable: true },
                                ProductName: { validation: { required: true } },
                                UnitPrice: { type: "number", validation: { required: true, min: 1} },
                                Discontinued: { type: "boolean" },
                                UnitsInStock: { type: "number", validation: { min: 0, required: true } }
                            }
                        }
                    }
                });

            $("#grid").kendoGrid({
                dataSource: dataSource,
                height: 550,
                    toolbar: [
                        "create",
                        "cancelEdit",
                        "cancel",
                        "save",
                        "update",
                        "destroy",
                        {
                            name: "spacer", type: "spacer"
                        },
                        "filter",
                        "sort",
                        "columnChooser"
                    ],
                    selectable: "single, row",
                    editable: "incell",
                    adaptiveMode: "auto",
                    filterable: true,
                    sortable: true,
                    pageable: true,
                    columns: [
                        "ProductName",
                        { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: 120 },
                        { field: "UnitsInStock", title: "Units In Stock", width: 120 },
                        { field: "Discontinued", width: 120 }
                    ],
            });
        });
        </script>
```

### Popup Editing

When popup editing is enabled, selected rows can be edited or deleted using the **Edit** and **Delete** toolbar buttons. Additionally, the **Add new record** form will be displayed inside an ActionSheet on small and medium screens.

```dojo
<div id="grid"></div>
        <script>
            $(document).ready(function () {
            var crudServiceBaseUrl = "https://demos.telerik.com/service/v2/core",
                dataSource = new kendo.data.DataSource({
                    transport: {
                        read:  {
                            url: crudServiceBaseUrl + "/Products"
                        },
                        update: {
                            url: crudServiceBaseUrl + "/Products/Update",
                            type: "POST",
                            contentType: "application/json"
                        },
                        destroy: {
                            url: crudServiceBaseUrl + "/Products/Destroy",
                            type: "POST",
                            contentType: "application/json"
                        },
                        create: {
                            url: crudServiceBaseUrl + "/Products/Create",
                            type: "POST",
                            contentType: "application/json"
                        },
                        parameterMap: function(options, operation) {
                            if (operation !== "read" && options.models) {
                                return kendo.stringify(options.models);
                            }
                        }
                    },
                    pageSize: 20,
                    schema: {
                        model: {
                            id: "ProductID",
                            fields: {
                                ProductID: { editable: false, nullable: true },
                                ProductName: { validation: { required: true } },
                                UnitPrice: { type: "number", validation: { required: true, min: 1} },
                                Discontinued: { type: "boolean" },
                                UnitsInStock: { type: "number", validation: { min: 0, required: true } }
                            }
                        }
                    }
                });

            $("#grid").kendoGrid({
                dataSource: dataSource,
                height: 550,
                    toolbar: [
                        "create",
                        "edit",
                        "cancelEdit",
                        "cancel",
                        "save",
                        "update",
                        "destroy",
                        {
                            name: "spacer", type: "spacer"
                        },
                        "filter",
                        "sort",
                        "columnChooser"
                    ],
                    selectable: "single, row",
                    editable: "popup",
                    adaptiveMode: "auto",
                    filterable: true,
                    sortable: true,
                    pageable: true,
                    columns: [
                        "ProductName",
                        { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: 120 },
                        { field: "UnitsInStock", title: "Units In Stock", width: 120 },
                        { field: "Discontinued", width: 120 }
                    ],
            });
        });
        </script>

```

## Other Customization Options

The following configuration options provide additional control over the appearance and behavior of adaptive tools:

* [`showInactiveTools`](/api/javascript/ui/grid/configuration/toolbar.showinactivetools)&mdash;Controls whether the inactive tools in the toolbar are hidden or displayed in disabled state; 
* `adaptiveTitle`&mdash;Customizes the title text displayed in the adaptive view;
* `adaptiveSubtitle`&mdash;Customizes the subtitle text displayed in the adaptive view;


## See Also

* [Adaptive Tools jQuery Grid (Demo)](https://demos.telerik.com/kendo-ui/grid/adaptive-tools)
* [Adaptive Tools Editing jQuery Grid (Demo)](https://demos.telerik.com/kendo-ui/grid/adaptive-tools-editing)
* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
* [Knowledge Base Section](/knowledge-base)
