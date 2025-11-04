---
title: PivotDataSourceV2
page_title: API Reference for Kendo UI PivotDataSourceV2
description: Learn more about the configuration of Kendo UI PivotDataSourceV2, methods and events.
res_type: api
---

# kendo.data.PivotDataSourceV2

The data source used by the [`kendo.ui.PivotGridV2`](/api/javascript/ui/pivotgridv2) widget. Inherits from [`kendo.data.DataSource`](/api/framework/datasource).

## Configuration

See the [DataSource configuration](/api/framework/datasource#configuration) for all inherited configuration options.

### columns `Array`

The configuration of the column axis members. An array of JavaScript objects or strings. A JavaScript objects are interpreted as column descriptors. Strings are interpreted as the hierarchical name of the member.


<div class="meta-api-description">
How do I configure column settings for a pivot table using the PivotDataSourceV2.columns property in Kendo UI for jQuery? Specify or configure the set of columns, column members, or headers for a pivot table or data grid axis using an array of descriptors, which can be strings representing hierarchical column names or structured JavaScript objects defining detailed column properties and hierarchy. This setup enables control over how columns are defined, arranged, and displayed along the pivot table’s horizontal axis, supporting both simple string-based column identifiers and complex object-based column definitions for dynamic, multi-level column layouts. Use this approach when setting, customizing, or manipulating the column dimension, axis members, or column fields in a pivot data source for filtering, sorting, or hierarchical data representation.
</div>

#### Example - set the columns

    <script>
    var dataSource = new kendo.data.PivotDataSourceV2({
      type: "xmla",
      columns: ["[Date].[Calendar]"],
      transport: {
          connection: {
              catalog: "Adventure Works DW 2008R2",
              cube: "Adventure Works"
          },
          read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
      }
    });
    dataSource.fetch();
    </script>

### columns.expand `Boolean`

If set to `true`, the member will be expanded.


<div class="meta-api-description">
How to configure default expanded state of column members in Kendo UI Pivot Grid V2? Configure the default expanded or collapsed state of column members in a pivot grid or data pivot table, controlling whether specific columns are shown expanded on load or initial rendering. Enable or disable the automatic expansion of hierarchical column groups, set initial visibility for nested columns, and control the default open or closed state of column tree nodes. Adjust the initial display to expand certain column items by default in multidimensional data views, pivot table columns, or cross-tab reports, affecting how detailed column data is presented and navigated at startup. Establish which columns start expanded in data pivot interfaces, useful for setting up dynamic column drill-downs, initial UI states, or customized data exploration with expanded column branches.
</div>

#### Example - set the column as expanded

    <script>
    var dataSource = new kendo.data.PivotDataSourceV2({
      type: "xmla",
      columns: [{ name: "[Date].[Calendar]", expand: true }],
      transport: {
          connection: {
              catalog: "Adventure Works DW 2008R2",
              cube: "Adventure Works"
          },
          read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
      }
    });
    dataSource.fetch();
    </script>

### columns.name `String`

The hierarchical name of the column.


<div class="meta-api-description">
How do I specify a unique identifier for a column in a Kendo UI PivotGridV2? Configure or specify the hierarchical identifier that defines a column’s unique identity and position within nested or multi-level column structures in advanced pivot grids, enabling grouping, referencing, addressing, or organizing columns across various aggregation levels, field bindings, or rendering processes, and controlling how columns are identified and manipulated in complex data grids with multi-tiered column hierarchies.
</div>

#### Example - set the column name

    <script>
    var dataSource = new kendo.data.PivotDataSourceV2({
      type: "xmla",
      columns: [{ name: "[Date].[Calendar]", expand: false }],
      transport: {
          connection: {
              catalog: "Adventure Works DW 2008R2",
              cube: "Adventure Works"
          },
          read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
      }

    });
    dataSource.fetch();
    </script>

### measures `Array|Object`

The configuration of measures. A string array whose values are interpreted as the name of the measures that will be loaded. Measures can be defined as a list of objects with the `name` property holding the name.

  [{
        name: "[Measures].[_Internet Current Quarter Sales Performance Status]"
    }]


<div class="meta-api-description">
How to configure measures for Kendo UI PivotDataSourceV2? Configure or specify which numerical metrics, measures, or key performance indicators (KPIs) a pivot or data grid should load and display, using arrays of measure names or objects with measure identifiers to filter, select, or limit the data aggregation fields, enabling precise control over the measures included in reports, dashboards, or data summaries by defining measure names, measure arrays, or measure objects for targeted data analysis and visualization.
</div>

#### Example - set the measures

    <div id="pivot"></div>

    <script>
    var dataSource = new kendo.data.PivotDataSourceV2({
      type: "xmla",
      measures: ["[Measures].[Reseller Freight Cost]"],
      transport: {
        connection: {
            catalog: "Adventure Works DW 2008R2",
            cube: "Adventure Works"
        },
        read: "https://demos.telerik.com/service/v2/olap/msmdpump.dll"
      }
    });

    $("#pivot").kendoPivotGridV2({
      dataSource: dataSource
    });
    </script>

### measures.values `Array`

A string array whose values are interpreted as the name of the measures that will be loaded.


<div class="meta-api-description">
How to specify measures for a PivotDataSourceV2 in Kendo UI? Control and customize which numerical metrics or value fields to load and retrieve by specifying a list or array of measure names, enabling filtering, inclusion, or limitation of key performance indicators, analytical values, or aggregated data points in pivot data sources, allowing developers to set, configure, or define exactly which measurable fields are fetched and processed for reports, dashboards, or data analysis components.
</div>

#### Example - set the measures

    <div id="pivot"></div>

    <script>
    var dataSource = new kendo.data.PivotDataSourceV2({
      type: "xmla",
      measures: {
          values: ["[Measures].[Reseller Freight Cost]"]
      },
      transport: {
        connection: {
            catalog: "Adventure Works DW 2008R2",
            cube: "Adventure Works"
        },
        read: "https://demos.telerik.com/service/v2/olap/msmdpump.dll"
      }
    });

    $("#pivot").kendoPivotGridV2({
      dataSource: dataSource
    });
    </script>

### measures.axis `String` *(default: columns)*

The name of the axis on which the measures will be displayed. The supported values are the rows or columns. This option is applicable if multiple measures are used.


<div class="meta-api-description">
How do I configure the placement of measure fields in a Kendo UI PivotGridV2? Configure the placement and arrangement of measure fields within a pivot data source by specifying whether measures should appear along the rows or columns axis, enabling dynamic control over how multiple numerical or aggregated data points are organized in pivot layouts. Adjust where to display value metrics, numerical measures, or aggregated fields in pivot tables, dashboards, or data visualizations by setting the measures orientation horizontally or vertically, facilitating customization of data summaries, comparisons, and analysis across columns or rows. Enable the control of measure positioning in multi-measure setups to influence layout, grouping, and clarity of analytical data views in pivot configurations.
</div>

#### Example - set the axis of the measures

    <div id="pivot"></div>
    
    <script>
    var dataSource = new kendo.data.PivotDataSourceV2({
      type: "xmla",
      measures: {
          values: ["[Measures].[Internet Revenue Trend]", "[Measures].[Internet Revenue Status]"],
          axis: "rows"
      },
      transport: {
        connection: {
            catalog: "Adventure Works DW 2008R2",
            cube: "Adventure Works"
        },
        read: "https://demos.telerik.com/service/v2/olap/msmdpump.dll"
      }
    });
    
    $("#pivot").kendoPivotGridV2({
      dataSource: dataSource
    });
    </script>

### rows `Array`

The configuration of the row axis members. An array of JavaScript objects or strings. A JavaScript objects are interpreted as rows descriptors. Strings are interpreted as the hierarchical name of the member.


<div class="meta-api-description">
How to configure row fields in Kendo UI for jQuery PivotDataSourceV2? Configure and control which fields or data elements display along the row axis in pivot grids by specifying arrays of field identifiers, member names, or detailed row descriptor objects that define hierarchical or customized row layout structures; set, customize, or define row categories, groupings, or hierarchy levels for dynamic data grouping, filtering, and organization in pivot table views, enabling tailored row configurations using simple strings or complex object descriptors to manage row dimension, sorting, and hierarchy in data visualization components.
</div>

#### Example - set the columns

    <script>
    var dataSource = new kendo.data.PivotDataSourceV2({
      type: "xmla",
      rows: ["[Date].[Calendar]"],
      transport: {
        connection: {
            catalog: "Adventure Works DW 2008R2",
            cube: "Adventure Works"
        },
        read: "https://demos.telerik.com/service/v2/olap/msmdpump.dll"
      }
    });
    dataSource.fetch();
    </script>

### rows.expand `Boolean`

If set to `true`, the member will be expanded.


<div class="meta-api-description">
How do I configure the default state of row members in a Kendo UI PivotGrid V2? Control the default expanded or collapsed state of row members in a pivot table or PivotGrid V2 by configuring whether specific row levels start opened or closed, enabling you to set initial visibility or expansion state for hierarchical data rows, expand or collapse row nodes on load, predefine row group expansion, adjust the display to show nested data expanded by default, toggle automatic expand/collapse of rows during initialization, and customize how row groups appear when the grid first renders to improve data navigation and readability.
</div>

#### Example - set the rows as expanded

    <script>
    var dataSource = new kendo.data.PivotDataSourceV2({
      type: "xmla",
      columns: [{ name: "[Date].[Calendar]", expand: true }],
      transport: {
        connection: {
            catalog: "Adventure Works DW 2008R2",
            cube: "Adventure Works"
        },
        read: "https://demos.telerik.com/service/v2/olap/msmdpump.dll"
      }
    });
    dataSource.fetch();
    </script>

### rows.name `String`

The hierarchical name of the rows.


<div class="meta-api-description">
How do I customize the row headers in a Kendo UI PivotGridV2? Specify or configure the hierarchical identifier for grouping and organizing rows in a pivot data source, enabling control over how row headers and nested row members are named, grouped, and displayed in pivot tables or grids. Enable setting or customizing row grouping keys, defining multi-level row hierarchies, controlling row header labels, and managing how row members are identified and structured within a pivot data source for flexible, dynamic row grouping and header presentation in data visualization components.
</div>

#### Example - set the rows name

    <script>
    var dataSource = new kendo.data.PivotDataSourceV2({
      type: "xmla",
      rows: [{ name: "[Date].[Calendar]", expand: false }],
      transport: {
        connection: {
            catalog: "Adventure Works DW 2008R2",
            cube: "Adventure Works"
        },
        read: "https://demos.telerik.com/service/v2/olap/msmdpump.dll"
      }
    });
    dataSource.fetch();
    </script>

### transport `Object`

The configuration used to load data items and discover schema information.


<div class="meta-api-description">
How do I configure data loading strategies in Kendo UI for jQuery Pivot Grid V2? Control and configure data loading strategies, including fetching data items and schema detection, by specifying data sources through URLs, custom read functions, or handlers that return arrays, while managing HTTP request settings like headers, parameters, formats, and mapping functions. Enable flexible retrieval and binding of data from remote endpoints or local collections, with options to customize parameter encoding, request negotiation, response parsing, and schema inference to optimize data transport and integration workflows.
</div>

#### Example

    <script>
    var dataSource = new kendo.data.PivotDataSourceV2({
      type: "xmla",
      transport: {
        connection: {
          catalog: "Adventure Works DW 2008R2",
          cube: "Adventure Works"
        },
        read: "https://demos.telerik.com/service/v2/olap/msmdpump.dll",
        discover: "https://demos.telerik.com/service/v2/olap/msmdpump.dll"
      }
    });
    </script>

### transport.discover `Object|String|Function`

The configuration which is used when the data source discovers the schema information about the current cube.

* If the value of `transport.discover` is a string, the data source uses this string as the URL of the remote service.


<div class="meta-api-description">
How to configure discovery transport settings for Kendo UI PivotGridV2's data source? Configure and control how a data source accesses and retrieves multidimensional cube schema information by specifying discovery transport settings, including setting the discovery endpoint URL, customizing HTTP request parameters, headers, and methods, enabling remote schema fetching, adjusting transport configurations for schema discovery calls, defining custom functions for schema retrieval, and managing how metadata about data cubes is obtained, ensuring flexible and precise control over the data source’s schema acquisition process.
</div>

#### Example - set the discover remote service

    <script>
    var dataSource = new kendo.data.PivotDataSourceV2({
      type: "xmla",
      transport: {
        connection: {
            catalog: "Adventure Works DW 2008R2",
            cube: "Adventure Works"
        },
        read: "https://demos.telerik.com/service/v2/olap/msmdpump.dll"
      }
    });
    dataSource.discover({ command: "schemaCatalogs" });
    </script>

### transport.connection `Object`

The configuration that is used for setting the connection options.


<div class="meta-api-description">
How do I customize the connection settings for my Kendo UI Pivot Grid to access remote data? Set up and customize the connection parameters for accessing and retrieving pivot grid data from remote servers, including configuring endpoint URLs, HTTP headers, authentication credentials, network timeouts, and communication protocols. Control how data transport establishes connections to various data sources by defining connection settings that handle secure authorization, request customization, session management, and adaptability to REST APIs or web services. Enable precise tuning of connection details to manage data fetching, remote service communication, and integration with backend systems, covering scenarios such as secure token handling, API endpoint configuration, header injection, and timeout adjustments for reliable and efficient pivot data loading.
</div>

#### Example

    <script>
    var dataSource = new kendo.data.PivotDataSourceV2({
      type: "xmla",
      transport: {
        connection: {
          catalog: "Adventure Works DW 2008R2",
          cube: "Adventure Works"
        },
        read: "https://demos.telerik.com/service/v2/olap/msmdpump.dll"
      }
    });
    </script>

### transport.connection.catalog `String`

The catalog name.


<div class="meta-api-description">
How do I set the database catalog for Kendo UI PivotGrid V2 data source? Set or specify the database catalog, database schema namespace, or catalog name string used during connection setup for data retrieval or querying operations. This configuration controls which catalog or database segment the data source targets when establishing a connection, enabling filtering, scoping, or selecting specific database catalogs. It supports scenarios where multiple catalogs exist, allowing developers to define, control, or override the catalog identifier for queries, connections, or integration with database servers and data providers. Commonly used to configure the catalog parameter when connecting to databases with hierarchical organization or multi-catalog support.
</div>

#### Example - set the connection catalog name

    <script>
    var dataSource = new kendo.data.PivotDataSourceV2({
      type: "xmla",
      transport: {
        connection: {
            catalog: "Adventure Works DW 2008R2"
        },
        read: "https://demos.telerik.com/service/v2/olap/msmdpump.dll",
      }

    });
    </script>

### transport.connection.cube `String`

The cube name in the current data source.


<div class="meta-api-description">
How do I specify the OLAP cube identifier for connecting to multidimensional data sources in Kendo UI PivotGridV2? Specify or configure the OLAP cube identifier for connecting to multidimensional data sources, enabling selection of the target cube for MDX queries, data retrieval, and binding within OLAP or MDX backend connections in pivot table or data visualization components. This setting controls which multidimensional cube is accessed, allowing users to set, change, or target specific OLAP cubes when querying, filtering, or analyzing hierarchical, aggregated, or multidimensional data from OLAP servers or data warehouses.
</div>

#### Example - set the cube catalog name

    <script>
    var dataSource = new kendo.data.PivotDataSourceV2({
      type: "xmla",
      transport: {
        connection: {
            catalog: "Adventure Works DW 2008R2",
            cube: "Adventure Works"
        },
        read: "https://demos.telerik.com/service/v2/olap/msmdpump.dll",
      }
    });
    </script>

### schema `Object`

The schema configuration of the PivotDataSourceV2.


<div class="meta-api-description">
How to configure field mapping and data transformations for pivot operations using the PivotDataSourceV2 schema? Configure how input data fields are identified, mapped, and transformed for pivot operations by specifying field names, data types, aggregations, parsing rules, and modeling directives to control grouping, sorting, and summarization of raw server or local datasets. Set or adjust schema definitions to interpret incoming data structures, define aggregation functions, enable data parsing and type casting, and manage the shape of the dataset for pivot tables, enabling flexible handling of complex data transformations, field mappings, and analytical calculations within pivot sources.
</div>

#### Example

    <script>
    var dataSource = new kendo.data.PivotDataSourceV2({
      type: "odata",
      transport: {
        read: "/odata/SalesData"
      },
      schema: {
        cube: {
          dimensions: {
            "ProductName": { caption: "Product Name" },
            "Category": { caption: "Category" }
          },
          measures: {
            "TotalSales": { field: "TotalSales", aggregate: "sum" }
          }
        }
      }
    });
    </script>

### schema.cube `Object`

The cube declaration. If configured, this option will enable the client cube processing that is useful for binding to flat data.

> Only applicable if client cube processing is used.
> Necessary when binding the Pivot to data of type "odata".


<div class="meta-api-description">
How to configure cube schema for Kendo UI Pivot Grid with client-side processing? Configure multidimensional data modeling and client-side cube processing for pivot grids by defining the cube schema that maps flat or tabular data into a structured cube format, enabling aggregation, slicing, and dicing of data with dimensions and measures derived from arrays or OData responses; this setup supports transforming raw, flattened datasets into interactive pivot grid views where you control data shaping, aggregation logic, and hierarchical relationships without server-side processing, ideal for scenarios requiring in-browser analytics, custom dimension definitions, or advanced client binding and shaping of data models.
</div>

#### schema.cube.dimensions `Object`

A set of key/value pairs which specifies the field-dimension mapping that is available for processing dimensions. The key specifies the name of the field to which the dimension will be mapped.

> The key has to match the column name that is used in the columns definition.

##### Example - define the cube dimensions

    <script>
      var dataSource = new kendo.data.PivotDataSourceV2({
        columns: ["ProductName" ],
        rows: ["Category"],
        data: [{ ProductName: "Chai", UnitPrice: 42, Cateogry: "Beverages" } ],
        schema: {
          cube: {
            dimensions: {
              ProductName: { caption: "All Products" },
              Category: { caption: "All Cateogries" }
            }
          }
        }
      });

      dataSource.fetch(function() {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(dataSource.data(), dataSource.axes());
      });
    </script>

##### schema.cube.dimensions.dimensionName `String`

The name of the field which maps to the dimension.

##### schema.cube.dimensions.dimensionName.caption `String`

A user-friendly name of the dimension.

#### schema.cube.measures `Object`

A set of key/value pairs which specifies the available measures. The key specifies the name of measure.

> The key has to match the measure name that is used in the measures definition of the PivotDataSourceV2.

#### Example - define the cube measures which calculate the sum of the products price

    <script>
      var dataSource = new kendo.data.PivotDataSourceV2({
        columns: ["ProductName" ],
        rows: ["Category"],
        measures: ["Sum"],
        data: [{ ProductName: "Chai", UnitPrice: 42, Cateogry: "Beverages" } ],
        schema: {
          cube: {
            dimensions: {
              ProductName: { caption: "All Products" },
              Category: { caption: "All Cateogries" }
            },
            measures: {
              "Sum": {
                  field: "UnitPrice",
                  format: "{0:c}",
                  aggregate: "sum"
              }
            }
          }
        }
      });

      dataSource.fetch(function() {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(dataSource.data(), dataSource.axes());
      });
    </script>

##### schema.cube.measures.measureName.field `String`

The field name whose value is used for calculations.

##### schema.cube.measures.measureName.format `String`

The format which will be applied to the calculated measure value.

##### schema.cube.measures.measureName.aggregate `String`

The function that is used to aggregate the measure value.

The built-in aggregates are:
* `average`
* `count`
* `max`
* `min`
* `sum`

###### Example - specify a built-in "average" aggregate function

    <script>
      var dataSource = new kendo.data.PivotDataSourceV2({
        columns: ["ProductName" ],
        rows: ["Category"],
        measures: ["Sum"],
        data: [{ ProductName: "Chai", UnitPrice: 42, Cateogry: "Beverages" } ],
        schema: {
          cube: {
            dimensions: {
              ProductName: { caption: "All Products" },
              Category: { caption: "All Cateogries" }
            },
            measures: {
              "Average": {
                field: "UnitPrice",
                aggregate: "average"
            }
          }
        }
      }
    });

      dataSource.fetch(function() {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(dataSource.data(), dataSource.axes());
      });
    </script>


## Methods

See the [DataSource methods](/api/framework/datasource#methods) for all inherited methods.

### axes

Gets the parsed axes data.


<div class="meta-api-description">
How to access parsed axes information in Kendo UI PivotGridV2? Retrieve or access parsed axes information, including row and column hierarchies, member mappings, axis metadata, and aggregated data from a pivot data structure for purposes such as rendering tables, customizing data processing, debugging axis configurations, traversing hierarchical dimensions, inspecting axis-level summaries, or binding axis information in user interfaces. This method supports extracting internal axis representations from multidimensional data sources, enabling detailed analysis of axis structure, layout control, and integration of hierarchical or aggregated axis elements into applications or visualization workflows.
</div>

#### Returns

`Object`&mdash;The parsed axes data.

#### Example - get the axes data

    <script>
    var dataSource = new kendo.data.PivotDataSourceV2({
      type: "xmla",
      columns: ["[Date].[Calendar]"],
      transport: {
        connection: {
            catalog: "Adventure Works DW 2008R2"
        },
        read: "https://demos.telerik.com/service/v2/olap/msmdpump.dll"
      }
    });

    dataSource.fetch();

    var axes = dataSource.axes();
    </script>

### catalog

Gets or sets the current catalog name.


<div class="meta-api-description">
How to set catalog name in Kendo UI PivotDataSourceV2? Configure, retrieve, or update the catalog name used for OLAP, MDX, or multidimensional data queries within a pivot data source, enabling control over which data catalog or schema is targeted when executing analytical queries; supports getting the current catalog name by calling without arguments, or setting a new catalog string to switch the data source context, facilitating dynamic adjustment of data connections for pivot tables, OLAP cubes, or multidimensional query operations.
</div>

#### Parameters

##### name `String`

The name of the catalog.

#### Returns

`String`&mdash;The current catalog name.

#### Set the catalog

```pseudo
    <script>
    var dataSource = new kendo.data.PivotDataSourceV2({
      type: "xmla",
      columns: ["[Date].[Calendar]"],
      transport: {
        read: "https://demos.telerik.com/service/v2/olap/msmdpump.dll"
      }
    });

    dataSource.catalog("Adventure Works DW 2008R2");
    </script>
```

#### Example - get the catalog name

    <script>
    var dataSource = new kendo.data.PivotDataSourceV2({
      type: "xmla",
      columns: ["[Date].[Calendar]"],
      transport: {
        connection: {
            catalog: "Adventure Works DW 2008R2"
        },
        read: "https://demos.telerik.com/service/v2/olap/msmdpump.dll"
      }
    });

    var catalogName = dataSource.catalog();
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(catalogName);// prints "Adventure Works DW 2008R2"
    </script>

### columns

Gets or sets the columns configuration.


<div class="meta-api-description">
How to dynamically change column layout in Kendo UI Pivot Grid? Access, modify, or reconfigure the arrangement and structure of pivot grid columns by retrieving the current column setup or setting a new column layout for the pivot data source, enabling control over column dimensions, ordering, grouping, and display within the pivot table; use this to dynamically adjust column configurations, update pivot axes, customize column hierarchies, or programmatically change how data columns are organized and rendered in a pivot grid environment.
</div>

#### Parameters

##### val `Array`

The columns configuration. Accepts the same values as the [`columns`](/api/javascript/data/pivotdatasourcev2#configuration-columns) option.

#### Returns

`Array`&mdash;The current columns configuration.

#### Example - set the columns

    <script>
    var dataSource = new kendo.data.PivotDataSourceV2({
      type: "xmla",
      transport: {
        connection: {
            catalog: "Adventure Works DW 2008R2",
            cube: "Adventure Works"
        },
        read: "https://demos.telerik.com/service/v2/olap/msmdpump.dll"
      }
    });

    dataSource.columns(["[Date].[Calendar]"]);
    </script>

#### Example - get the columns name

    <script>
    var dataSource = new kendo.data.PivotDataSourceV2({
      type: "xmla",
      columns: ["[Date].[Calendar]"],
      transport: {
        connection: {
            catalog: "Adventure Works DW 2008R2"
        },
        read: "https://demos.telerik.com/service/v2/olap/msmdpump.dll"
      }
    });

    var columns = dataSource.columns();
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(columns);// [{ name: ["[Date].[Calendar]"] }]
    </script>

### cube

Gets or sets the current cube name.


<div class="meta-api-description">
How to set the OLAP cube connection for a PivotDataSourceV2 in Kendo UI? Configure, access, or modify the OLAP cube connection for multidimensional data queries by retrieving or setting the data source's target cube name. Control which analytical cube the pivot data source interacts with by specifying the cube identifier string or retrieving the current one, enabling dynamic switching between different OLAP cubes and managing the data context for pivot operations. Use commands that get or set the cube configuration to read data from, connect to, or change the targeted multidimensional data model, facilitating flexible cube selection, cube name updates, or inspection of the active cube for data slicing, dicing, and aggregation scenarios.
</div>

#### Parameters

##### name `String`

The name of the cube.

#### Returns

`String`&mdash;The current cube name.

#### Set the cube

```pseudo
    <script>
    var dataSource = new kendo.data.PivotDataSourceV2({
      type: "xmla",
      columns: ["[Date].[Calendar]"],
      transport: {
        connection: {
            catalog: "Adventure Works DW 2008R2"
        },
        read: "https://demos.telerik.com/service/v2/olap/msmdpump.dll"
      }
    });

    dataSource.cube("Adventure Works");

    dataSource.fetch();
    </script>
```

#### Example - get the cube name

    <script>
    var dataSource = new kendo.data.PivotDataSourceV2({
      type: "xmla",
      columns: ["[Date].[Calendar]"],
      transport: {
        connection: {
            catalog: "Adventure Works DW 2008R2",
            cube: "Adventure Works"
        },
        read: "https://demos.telerik.com/service/v2/olap/msmdpump.dll"
      }
    });

    var cubeName = dataSource.cube();
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(cubeName);// prints "Adventure Works"
    </script>

### discover

Starts the discover request with the specified options.


<div class="meta-api-description">
How to automatically detect schema and metadata in Kendo UI for jQuery Pivot Grid V2? Trigger automatic schema detection, metadata extraction, or data structure retrieval from a pivot or multidimensional data source to identify available fields, measures, hierarchies, dimensions, and metadata elements; configure and control discovery options such as filters, query parameters, or scope of data to programmatically fetch and analyze the data schema for dynamic pivot grid configurations, data binding, or analytical setup in reporting or data visualization contexts.
</div>

#### Parameters

##### options `String`

The options of the discover request.

#### Returns

`Object`&mdash;The deferred object.

#### Example

    <script>
    var dataSource = new kendo.data.PivotDataSourceV2({
      type: "xmla",
      transport: {
        connection: {
            catalog: "Adventure Works DW 2008R2"
        },
        read: "https://demos.telerik.com/service/v2/olap/msmdpump.dll"
      }
    });

    dataSource.discover({ command: "schemaMeasures" });
    </script>

### measures

Gets or sets the measures configuration.


<div class="meta-api-description">
How to customize aggregation settings in Kendo UI PivotGridV2? Configure and retrieve data aggregation settings, including defining and adjusting value fields, metrics, aggregations like sum, count, average, and custom calculations, setting field captions, formatting numeric or statistical results, binding fields to measures for data summarization, modifying or fetching current aggregation rules, controlling how data values are computed and presented in pivot tables or grids, enabling tailored summaries, updating measure configurations dynamically, and managing value field behaviors in complex data source setups.
</div>

#### Parameters

##### val `Array`

The measures configuration. Accepts the same values as the [`measures`](/api/javascript/data/pivotdatasourcev2#configuration-measures-values) option.

#### Returns

`Array`&mdash;The current measures configuration.

#### Example - set the measures

    <script>
    var dataSource = new kendo.data.PivotDataSourceV2({
      type: "xmla",
      transport: {
        connection: {
            catalog: "Adventure Works DW 2008R2",
            cube: "Adventure Works"
        },
        read: "https://demos.telerik.com/service/v2/olap/msmdpump.dll"
      }
    });

    dataSource.measures(["[Measures].[Internet Order Lines Count]"]);
    </script>

#### Example - get the measures

    <script>
    var dataSource = new kendo.data.PivotDataSourceV2({
      type: "xmla",
      measures: ["[Measures].[Internet Order Lines Count]"],
      transport: {
        connection: {
            catalog: "Adventure Works DW 2008R2"
        },
        read: "https://demos.telerik.com/service/v2/olap/msmdpump.dll"
      }
    });

    var measures = dataSource.measures();
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(measures);// [{ name: "[Measures].[Internet Order Lines Count]" }]
    </script>

### measuresAxis

Gets the name of the axis on which the measures are displayed.


<div class="meta-api-description">
How do I determine if measures in my pivot table are on the rows or columns axis using Kendo UI for jQuery? Retrieve or determine the axis placement of measures in a pivot table or pivot layout by identifying whether the values, metrics, or aggregated data fields are displayed on the rows axis, columns axis, or another dimension. This enables developers to dynamically detect, configure, or adjust UI components, data bindings, visualization orientation, or conditional logic based on whether measures appear horizontally or vertically within pivot grids, reports, or data summaries, supporting layout control, responsive design, or customized rendering of aggregated fields in complex datasets.
</div>

#### Returns

`String`&mdash;The axis name.

#### Example - set the measures

    <script>
    var dataSource = new kendo.data.PivotDataSourceV2({
      type: "xmla",
      measures: {
          values: ["[Measures].[Internet Order Lines Count]", "[Measures].[Days Current Quarter to Date]"],
          axis: "rows"
      },
      transport: {
        connection: {
            catalog: "Adventure Works DW 2008R2",
            cube: "Adventure Works"
        },
        read: "https://demos.telerik.com/service/v2/olap/msmdpump.dll"
      }
    });

    var axis = dataSource.measuresAxis();
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(axis); // "rows"
    </script>

### rows

Gets or sets the rows configuration.


<div class="meta-api-description">
How do I configure row definitions in Kendo UI Pivot Grid V2? Configure, retrieve, or modify the row definitions and arrangements within a pivot table's data source including setting row fields, adjusting row hierarchy levels, controlling field order and grouping for rows, managing the layout of row axes, binding new row data structures, updating existing row configurations, and extracting the current row setup to enable dynamic control over how rows display and organize in pivot grid components.
</div>

#### Parameters

##### val `Array`

The rows configuration. Accepts the same values as the [`row`](/api/javascript/data/pivotdatasourcev2#configuration-rows) option.

#### Returns

`Array`&mdash;The current rows configuration.

#### Example - set the rows

    <script>
    var dataSource = new kendo.data.PivotDataSourceV2({
      type: "xmla",
      transport: {
        connection: {
            catalog: "Adventure Works DW 2008R2",
            cube: "Adventure Works"
        },
        read: "https://demos.telerik.com/service/v2/olap/msmdpump.dll"
      }
    });

    dataSource.rows(["[Date].[Calendar]"]);
    </script>

#### Example - get the rows name

    <script>
    var dataSource = new kendo.data.PivotDataSourceV2({
      type: "xmla",
      rows: ["[Date].[Calendar]"],
      transport: {
        connection: {
            catalog: "Adventure Works DW 2008R2"
        },
        read: "https://demos.telerik.com/service/v2/olap/msmdpump.dll"
      }
    });

    var rows = dataSource.rows();
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(rows);// [{ name: ["[Date].[Calendar]"] }]
    </script>

### schemaCatalogs

Requests the catalogs information.


<div class="meta-api-description">
How do I retrieve available database catalogs in Kendo UI PivotGridV2? Retrieve or fetch available database catalogs and schema metadata from a data source by querying or requesting catalog lists, namespaces, or schema options programmatically for browsing, inspecting, loading, or populating schema catalogs, OLAP structures, or metadata information through data source connection methods that enable schema exploration, catalog enumeration, and metadata retrieval from configured sources.
</div>

#### Returns

`Object`&mdash;The deferred object.

#### Example

    <script>
    var dataSource = new kendo.data.PivotDataSourceV2({
      type: "xmla",
      transport: {
        read: "https://demos.telerik.com/service/v2/olap/msmdpump.dll"
      }
    });

    dataSource.schemaCatalogs()
        .then(function(catalogs) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log(catalogs);
        });
    </script>

### schemaCubes

Requests the cubes schema information.


<div class="meta-api-description">
How do I retrieve cube metadata for my pivot grid using Kendo UI's PivotDataSourceV2? Retrieve, load, or refresh multidimensional cube metadata including dimensions, measures, hierarchies, and schema structure for building fields and axes from OLAP or MDX sources; fetch or query cube definitions and metadata information to access or update the available cube schema, enabling dynamic inspection or extraction of data source cubes for analytics, reporting, or visualization setups that require up-to-date cube layouts and hierarchies.
</div>

#### Returns

`Object`&mdash;The deferred object.

#### Example

    <script>
    var dataSource = new kendo.data.PivotDataSourceV2({
      type: "xmla",
      transport: {
        connection: {
            catalog: "Adventure Works DW 2008R2"
        },
        read: "https://demos.telerik.com/service/v2/olap/msmdpump.dll"
      }
    });

    dataSource.schemaCubes()
        .then(function(cubes) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log(cubes);
        });
    </script>

### schemaDimensions

Requests the dimensions schema information.


<div class="meta-api-description">
How to retrieve dimension schema information in Kendo UI for jQuery PivotGridV2? Retrieve or load the structure of dimension fields and hierarchies from pivot grid metadata by calling a method that queries the configured data source or metadata endpoint to obtain detailed dimension schema information, enabling you to programmatically access, generate, update, or inspect pivot grid dimension layouts, fields, and hierarchy definitions, fetch metadata for building or modifying multidimensional data views, and control how dimension information is exposed and managed within dynamic pivot table components or data visualization layers.
</div>

#### Returns

`Object`&mdash;The deferred object.

#### Example

    <script>
    var dataSource = new kendo.data.PivotDataSourceV2({
      type: "xmla",
      transport: {
        connection: {
            catalog: "Adventure Works DW 2008R2"
        },
        read: "https://demos.telerik.com/service/v2/olap/msmdpump.dll"
      }
    });

    dataSource.schemaDimensions()
        .then(function(dimensions) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log(dimensions);
        });
    </script>

### schemaHierarchies

Requests the hierarchies schema information.


<div class="meta-api-description">
How to get hierarchical metadata schemas in Kendo UI PivotGridV2? Retrieve or fetch hierarchical metadata schemas including structure, levels, captions, and definitions from a data source to configure, inspect, or bind axes and fields in pivot or grid components; enable loading and querying of hierarchical schema information for dynamic data modeling, hierarchy exploration, schema inspection, and metadata retrieval in pivot tables or multidimensional data views.
</div>

#### Parameters

##### dimensionName `String`

The name of the dimensions which is the "owner" of the hierarchy.

#### Returns

`Object`&mdash;The deferred object.

#### Example

    <script>
    var dataSource = new kendo.data.PivotDataSourceV2({
      type: "xmla",
      transport: {
        connection: {
            catalog: "Adventure Works DW 2008R2"
        },
        read: "https://demos.telerik.com/service/v2/olap/msmdpump.dll"
      }
    });

    var dimensionName = "[Customer]";

    dataSource.schemaHierarchies(dimensionName)
        .then(function(dimensions) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log(dimensions);
        });
    </script>

### schemaLevels

Requests the levels schema information.


<div class="meta-api-description">
How to retrieve hierarchy metadata for Kendo UI PivotGridV2? Retrieve hierarchy metadata, level definitions, and structure from data sources by obtaining row and column schema levels, enabling inspection of hierarchical ordering, levels configuration, and metadata for building drill-downs, rendering multi-level headers, or programmatically mapping fields within pivot tables or data grids. This supports querying and controlling hierarchy layers, accessing detailed level information, and managing nested grouping or ordering for complex data visualizations and manipulations.
</div>

#### Parameters

##### hierarchyName `String`

The name of the hierarchy which is the "owner" of the level.

#### Returns

`Object`&mdash;The deferred object.

#### Example

    <script>
    var dataSource = new kendo.data.PivotDataSourceV2({
      type: "xmla",
      transport: {
        connection: {
            catalog: "Adventure Works DW 2008R2"
        },
        read: "https://demos.telerik.com/service/v2/olap/msmdpump.dll"
      }
    });

    var hierarchyName = "[Georgaphy].[City]";

    dataSource.schemaLevels(hierarchyName)
        .then(function(levels) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log(levels);
        });
    </script>

### schemaMeasures

Requests the measures schema information.


<div class="meta-api-description">
How do I retrieve measure metadata with Kendo UI for jQuery PivotDataSourceV2? Retrieve and query measure metadata, measure definitions, value fields, aggregations, data formats, and identifiers by invoking measure schema retrieval methods on advanced pivot data sources. Enable loading, inspecting, validating, and listing available measures and their properties, support dynamic fetching of measure lists, aggregation types, and associated metadata from data connections, and control access to detailed measures schema information for purposes such as populating value field selections, verifying aggregation compatibility, or exploring measure configurations within data-driven applications.
</div>

#### Returns

`Object`&mdash;The deferred object.

#### Example

    <script>
    var dataSource = new kendo.data.PivotDataSourceV2({
      type: "xmla",
      transport: {
        connection: {
            catalog: "Adventure Works DW 2008R2"
        },
        read: "https://demos.telerik.com/service/v2/olap/msmdpump.dll"
      }
    });

    dataSource.schemaMeasures()
        .then(function(measures) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log(measures);
        });
    </script>