---
title: PivotDataSource
page_title: API Reference for Kendo UI PivotDataSource
description: Learn more about the configuration of Kendo UI PivotDataSource, methods and events.
res_type: api
---

# kendo.data.PivotDataSource

The data source used by the [`kendo.ui.PivotGrid`](/api/javascript/ui/pivotgrid) widget. Inherits from [`kendo.data.DataSource`](/api/framework/datasource).

## Configuration

See the [DataSource configuration](/api/framework/datasource#configuration) for all inherited configuration options.

### columns `Array`

The configuration of the column axis members. An array of JavaScript objects or strings. A JavaScript objects are interpreted as column descriptors. Strings are interpreted as the hierarchical name of the member.


<div class="meta-api-description">
Configure and control which fields or headings display along the columns of a pivot or data grid by setting column fields, columns array, or column descriptors, enabling customization of the column axis layout. Support for specifying columns using either strings for hierarchical member names or detailed objects for advanced column settings helps tailor the pivot table’s horizontal structure, field placement, and data slicing along the columns, useful for filtering, grouping, or structuring pivot grid columns based on user needs, data visualization preferences, or reporting requirements.
</div>

#### Example - set the columns

    <script>
    var dataSource = new kendo.data.PivotDataSource({
      type: "xmla",
      columns: ["[Date].[Calendar]"],
      transport: {
        connection: {
            catalog: "Adventure Works DW 2008R2",
            cube: "Adventure Works"
        },
        read: "https://demos.telerik.com/service/v2/olap/msmdpump.dll"
      },
      schema: {
        type: "xmla"
      }
    });
    dataSource.fetch();
    </script>

### columns.expand `Boolean`

If set to `true`, the member will be expanded.


<div class="meta-api-description">
Set or configure whether a column group or hierarchy in a PivotGrid or pivot table is expanded or collapsed by using a boolean flag to open or close column members, revealing or hiding child elements within column axes, enabling control over the visibility of nested column data, toggling hierarchical expansion programmatically, customizing how column levels are displayed, and managing column member states for dynamic data exploration and drill-down functionality.
</div>

#### Example - set the column as expanded

    <script>
    var dataSource = new kendo.data.PivotDataSource({
      type: "xmla",
      columns: [{ name: "[Date].[Calendar]", expand: true }],
      transport: {
        connection: {
            catalog: "Adventure Works DW 2008R2",
            cube: "Adventure Works"
        },
        read: "https://demos.telerik.com/service/v2/olap/msmdpump.dll"
      },
      schema: {
        type: "xmla"
      }
    });
    dataSource.fetch();
    </script>

### columns.name `String`

The hierarchical name of the column.


<div class="meta-api-description">
Specify, configure, or bind a hierarchical column identifier within multi-level pivot table columns to control column labeling, grouping, sorting, filtering, aggregation, and data mapping; define column field paths or node names in complex column hierarchies to target specific columns for display customization, data binding, or pivot data source column axis operations.
</div>

#### Example - set the column name

    <script>
    var dataSource = new kendo.data.PivotDataSource({
      type: "xmla",
      columns: [{ name: "[Date].[Calendar]", expand: false }],
      transport: {
        connection: {
            catalog: "Adventure Works DW 2008R2",
            cube: "Adventure Works"
        },
        read: "https://demos.telerik.com/service/v2/olap/msmdpump.dll"
      },
      schema: {
        type: "xmla"
      }

    });
    dataSource.fetch();
    </script>

### measures `Array|Object`

The configuration of measures. A string array whose values are interpreted as the name of the measures that will be loaded. Measures can be defined as a list of objects with the `name` and `type` fields.

    [{
        name: "[Measures].[_Internet Current Quarter Sales Performance Status]",
        type: "status"
    }]

> The `type` value can be defined to `status` or `trend` to render [`kpiStatusTemplate`](/api/javascript/ui/pivotgrid/configuration/kpistatustemplate) or [`kpiTrendTemplate`](/api/javascript/ui/pivotgrid/configuration/kpitrendtemplate). If `type` is not defined, then the [`dataCellTemplate`](/api/javascript/ui/pivotgrid/configuration/datacelltemplate) will be used.


<div class="meta-api-description">
Configure and control which numeric or aggregated metrics are loaded and displayed in the data source, specifying measures by name or as detailed objects that define individual metric rendering types such as status indicators, trend visuals, or default data cells. Enable selection and filtering of analytical measures, customize KPI visualizations by setting measure properties to display status or trend templates, or allow default rendering when no specific style is assigned. This includes managing arrays of measure identifiers or objects with measure names and rendering types to adjust how sales figures, performance indicators, or key data points appear and behave within pivot tables, dashboards, or reporting tools, supporting use cases that require precise control over metric loading, filtering, and conditional visualization styles.
</div>

#### Example - set the measures

    <div id="pivot"></div>

    <script>
    var dataSource = new kendo.data.PivotDataSource({
      type: "xmla",
      measures: ["[Measures].[Reseller Freight Cost]"],
      transport: {
        connection: {
            catalog: "Adventure Works DW 2008R2",
            cube: "Adventure Works"
        },
        read: "https://demos.telerik.com/service/v2/olap/msmdpump.dll"
      },
      schema: {
        type: "xmla"
      }
    });

    $("#pivot").kendoPivotGrid({
      dataSource: dataSource
    });
    </script>

### measures.values `Array`

A string array whose values are interpreted as the name of the measures that will be loaded.


<div class="meta-api-description">
Specify and configure the set of metrics, data fields, or numerical measures to load, include, or query from a pivot data source by providing a list or array of measure names as strings. Enable selective control over which calculated fields, aggregates, or value columns are retrieved during data processing, filtering the pivot table data scope to only desired measures. Adjust, set, or customize the active measures for data aggregation, analysis, or visualization by listing their identifiers, keys, or names to optimize data loading and querying operations. This feature supports precise control over the included quantitative data dimensions in pivot datasets, affecting summaries, results, and reports.
</div>

#### Example - set the measures

    <div id="pivot"></div>

    <script>
    var dataSource = new kendo.data.PivotDataSource({
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
      },
      schema: {
        type: "xmla"
      }
    });

    $("#pivot").kendoPivotGrid({
      dataSource: dataSource
    });
    </script>

### measures.axis `String` *(default: columns)*

The name of the axis on which the measures will be displayed. The supported values are the rows or columns. This option is applicable if multiple measures are used.


<div class="meta-api-description">
Control the placement and display axis of measure values within pivot tables or grids by configuring whether numerical metrics or aggregated data appear along rows or columns; set or adjust measure orientation to organize multiple measures effectively on either vertical or horizontal axes, enabling flexible layout of aggregated values, data summaries, or calculated fields for enhanced data visualization and comparison in pivot data sources or grids.
</div>

#### Example - set the axis of the measures

    <div id="pivot"></div>
    
    <script>
    var dataSource = new kendo.data.PivotDataSource({
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
      },
      schema: {
        type: "xmla"
      }
    });
    
    $("#pivot").kendoPivotGrid({
      dataSource: dataSource
    });
    </script>

### rows `Array`

The configuration of the row axis members. An array of JavaScript objects or strings. A JavaScript objects are interpreted as rows descriptors. Strings are interpreted as the hierarchical name of the member.


<div class="meta-api-description">
Configure and control the row axis fields of the data source to define which columns or members appear along the rows and how they are organized hierarchically, using arrays of field names or detailed objects to specify row groupings, drill-down levels, and multi-level row structures. Adjust or set row dimensions, arrange nested rows, customize hierarchy orders, and specify row members for pivot tables or data grouping, enabling flexible design of row-based data layouts and controlling which data elements display as rows in complex, multi-level structures.
</div>

#### Example - set the columns

    <script>
    var dataSource = new kendo.data.PivotDataSource({
      type: "xmla",
      rows: ["[Date].[Calendar]"],
      transport: {
        connection: {
            catalog: "Adventure Works DW 2008R2",
            cube: "Adventure Works"
        },
        read: "https://demos.telerik.com/service/v2/olap/msmdpump.dll"
      },
      schema: {
        type: "xmla"
      }
    });
    dataSource.fetch();
    </script>

### rows.expand `Boolean`

If set to `true`, the member will be expanded.


<div class="meta-api-description">
Control the default expanded or collapsed state of specific row entries in hierarchical data views, configuring whether a row or group is initially unfolded or collapsed to enable drill-down, detailed inspection, or grouping of nested items; set expansion states to true or false to manage visibility, enable initial expansion of tree nodes in pivot tables, and customize row-level data display for better overview, navigation, and analysis within grouped or hierarchical datasets.
</div>

#### Example - set the rows as expanded

    <script>
    var dataSource = new kendo.data.PivotDataSource({
      type: "xmla",
      columns: [{ name: "[Date].[Calendar]", expand: true }],
      transport: {
        connection: {
            catalog: "Adventure Works DW 2008R2",
            cube: "Adventure Works"
        },
        read: "https://demos.telerik.com/service/v2/olap/msmdpump.dll"
      },
      schema: {
        type: "xmla"
      }
    });
    dataSource.fetch();
    </script>

### rows.name `String`

The hierarchical name of the rows.


<div class="meta-api-description">
Configure or set the identifier, label, or name used for row hierarchies or axes in pivot table or grid data sources to control how rows are grouped, identified, and displayed during rendering, aggregation, or data summarization; customize, define, or specify the row field naming, axis naming, or hierarchy naming to organize row headers effectively for data analysis, pivot operations, or report generation.
</div>

#### Example - set the rows name

    <script>
    var dataSource = new kendo.data.PivotDataSource({
      type: "xmla",
      rows: [{ name: "[Date].[Calendar]", expand: false }],
      transport: {
        connection: {
            catalog: "Adventure Works DW 2008R2",
            cube: "Adventure Works"
        },
        read: "https://demos.telerik.com/service/v2/olap/msmdpump.dll"
      },
      schema: {
        type: "xmla"
      }
    });
    dataSource.fetch();
    </script>

### transport `Object`

The configuration used to load data items and discover schema information.


<div class="meta-api-description">
Configure how pivot table data is retrieved and loaded by specifying endpoints, HTTP methods, or custom functions that fetch data items, metadata, and schema information, enabling control over data requests, response handling, and dynamic schema discovery for effective pivot data integration, binding, and refresh operations.
</div>

#### Example

    <script>
    var dataSource = new kendo.data.PivotDataSource({
      type: "xmla",
      transport: {
        connection: {
          catalog: "Adventure Works DW 2008R2",
          cube: "Adventure Works"
        },
        read: "https://demos.telerik.com/service/v2/olap/msmdpump.dll"
      },
      schema: {
        type: "xmla"
      }
    });
    </script>

### transport.discover `Object|String|Function`

The configuration which is used when the data source discovers the schema information about the current cube.

> The data source uses [`jQuery.ajax`](https://api.jquery.com/jQuery.ajax) to make an HTTP request to the remote service. The value that is configured through `transport.discover` is passed to `jQuery.ajax`. This means that you can set all options that are supported by `jQuery.ajax` with `transport.read` except for the `success` and `error` callback functions which are used by the transport.

* If the value of `transport.discover` is a function, the data source invokes that function instead of `jQuery.ajax`.
* If the value of `transport.discover` is a string, the data source uses this string as the URL of the remote service.
* If the value of `transport.discover` is omitted, the data source uses `transport.read` for schema discovery.

```pseudo
    <script>
    var dataSource = new kendo.data.PivotDataSource({
      type: "xmla",
      transport: {
        connection: {
          catalog: "Adventure Works DW 2008R2",
          cube: "Adventure Works"
        },
        // The endpoint that returns the schema info for the cube
        discover: "endpoint-returning-info-about-the-cube",
        read: "https://demos.telerik.com/service/v2/olap/msmdpump.dll"
      },
      schema: {
        type: "xmla"
      }
    });
    dataSource.schemaDimensions().done(function(dimensions) {
      /* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(dimensions.length);
    });
    </script>
```


<div class="meta-api-description">
Configure how the data source automatically retrieves or discovers multidimensional schema metadata, cube structures, or OLAP schema definitions by specifying a URL endpoint, custom HTTP request options, or a custom function to fetch or control schema fetching behavior, enabling precise control over metadata loading through AJAX settings or custom data retrieval logic for pivot or cube data sources, supporting transport customization, schema introspection, and dynamic schema loading for pivot tables and analytical data processing.
</div>

### transport.connection `Object`

The configuration that is used for setting the connection options.


<div class="meta-api-description">
Set up and control how data connections are established between the data source and external servers or services, including configuring endpoint URLs, authentication credentials, request headers, connection strings, and security tokens to manage access and communication. Enable or modify transport layer connectivity options such as specifying server addresses, authorization details, network parameters, and connection settings to ensure proper data retrieval and interaction. Manage connection configuration for remote data access, supporting customization of how the component authenticates, communicates, and exchanges information with backend APIs or data providers. Configure options related to establishing and maintaining a stable, secure transport channel for data operations, including tuning connection parameters for authorization, custom headers, and target endpoint specification.
</div>

#### Example

    <script>
    var dataSource = new kendo.data.PivotDataSource({
      type: "xmla",
      transport: {
        connection: {
          catalog: "Adventure Works DW 2008R2",
          cube: "Adventure Works"
        },
        read: "https://demos.telerik.com/service/v2/olap/msmdpump.dll"
      },
      schema: {
        type: "xmla"
      }
    });
    </script>

### transport.connection.catalog `String`

The catalog name.


<div class="meta-api-description">
Configure or set the database catalog name or database identifier for the data connection to ensure the data source targets the correct database instance, enabling control over which specific database is queried, accessed, or connected during data retrieval or loading operations, specifying the catalog or database name during initialization or connection setup for accurate routing of transport layer requests to the intended database environment.
</div>

#### Example - set the connection catalog name

    <script>
    var dataSource = new kendo.data.PivotDataSource({
      type: "xmla",
      transport: {
        connection: {
            catalog: "Adventure Works DW 2008R2"
        },
        read: "https://demos.telerik.com/service/v2/olap/msmdpump.dll",
      },
      schema: {
        type: "xmla"
      }

    });
    </script>

### transport.connection.cube `String`

The cube name in the current data source.


<div class="meta-api-description">
Set or configure the OLAP cube name used by a data source transport connection to target a specific multidimensional data set for querying, enabling integration with OLAP servers like SQL Server Analysis Services or other OLAP providers. This setting controls which cube the data source accesses when sending MDX or OLAP queries, allowing you to specify, change, or direct the connection to particular cubes for pivot tables, multidimensional analytics, or reporting. Use this to identify, select, or switch between OLAP cubes to ensure that the data source queries the correct dataset in an OLAP environment.
</div>

#### Example - set the cube catalog name

    <script>
    var dataSource = new kendo.data.PivotDataSource({
      type: "xmla",
      transport: {
        connection: {
            catalog: "Adventure Works DW 2008R2",
            cube: "Adventure Works"
        },
        read: "https://demos.telerik.com/service/v2/olap/msmdpump.dll",
      },
      schema: {
        type: "xmla"
      }
    });
    </script>

### schema `Object`

The schema configuration of the PivotDataSource.


<div class="meta-api-description">
Define and configure the structure and organization of incoming data by specifying field mappings, data types, aggregation rules, grouping behaviors, and the overall data model used to interpret and process datasets for pivot operations, enabling customized control over how data fields are recognized, grouped, aggregated, and calculated within dynamic pivot tables or similar data summarization tools.
</div>

#### Example

    <script>
    var dataSource = new kendo.data.PivotDataSource({
      type: "xmla",
      transport: {
        connection: {
          catalog: "Adventure Works DW 2008R2",
          cube: "Adventure Works"
        },
        read: "https://demos.telerik.com/service/v2/olap/msmdpump.dll"
      },
      schema: {
        type: "xmla",
        cubes: "Catalogs"
      }
    });
    </script>

### schema.axes `Function|String`

The field from the server response which contains the axes data of the columns and rows. Can be set to a function which is called to return the column and row axes data for the response.


<div class="meta-api-description">
Configure how to access and extract row and column axis definitions from data responses, including options to specify the field name containing axis information or to provide a custom function to process and transform pivot grid axes data; supports flexible mapping, dynamic extraction, and manipulation of column and row axis structures to enable control over pivot table axis schema, layout, and organization for various data formats and custom transformations.
</div>

#### Returns

`Object`&mdash;The axes data of the columns and rows from the response.

The result has the following format and attributes.

    {
        columns:{ // columns axis data
            tuples:[{
                    members:[{
                        children:[],
                        caption:"All",
                        name:"[Date].[Calendar].[All]",
                        levelName:"[Date].[Calendar].[(All)]",
                        levelNum:"0",
                        hasChildren:true,
                        hierarchy:"[Date].[Calendar]"
                    }, /*..other tuple members..*/]
                }
                /*..other tuples..*/
            ]
        },
        rows:{ //rows axis data
            tuples:[{
                    members:[{
                        children:[],
                        caption:"All",
                        name:"[Customer].[Commute Distance].[All]",
                        levelName:"[Customer].[Commute Distance].[(All)]",
                        levelNum:"0",
                        hasChildren:true,
                        hierarchy:"[Customer].[Commute Distance]"
                    }, /*..other tuple members..*/]
                },
                /*..other tuples..*/
            ]
        }
    }

#### Example - specify the field which contains column and row axes as a string

    <script>
    var dataSource = new kendo.data.PivotDataSource({
      transport: {
        /* transport configuration */
      },
      schema: {
        axes: "axes" // axes are returned in the "axes" field of the response
      }
    });
    </script>

#### Example - set column and row axes data as a function

    <script>
    var dataSource = new kendo.data.PivotDataSource({
      transport: {
        /* transport configuration */
      },
      schema: {
        axes: function(response) {
          return response.axes; // axes are returned in the "axes" field of the response
        }
      }
    });
    </script>

### schema.catalogs `Function|String`

The field from the server response which contains the list of catalogs that are available on the server. Can be set to a function which is called to return the schema information of the catalogs for the response. Executed during the schema discovery.


<div class="meta-api-description">
Configure or customize how the data source identifies, extracts, or maps the list of available catalogs or database metadata from server responses, including the ability to specify the exact response field that holds catalog information or provide a custom function to parse and return schema details for catalogs during schema discovery or metadata retrieval processes, enabling control over how catalog schemas are processed, discovered, or interpreted within a data connection or pivot data source setup.
</div>

#### Returns

`Array`&mdash;The catalogs schema from the response.

The result has the following format and attributes.

    [{
        "name":"Adventure Works Internet Sales Model"
    }]

#### Example - specify the field which contains the catalogs schema information as a string

    <script>
    var dataSource = new kendo.data.PivotDataSource({
      transport: {
        /* transport configuration */
      },
      schema: {
        catalogs: "catalogs" // catalogs information is returned in the "catalogs" field of the response
      }
    });
    </script>

#### Example - set the schema information of the cubes as a function

    <script>
    var dataSource = new kendo.data.PivotDataSource({
      transport: {
        /* transport configuration */
      },
      schema: {
        catalogs: function(response) {
          return response.catalogs; // catalogs information are returned in the "catalogs" field of the response
        }
      }
    });
    </script>

### schema.cubes `Function|String`

The field from the server response which contains the list of cubes that are available in the catalog. Can be set to a function which is called to return the schema information of the cubes for the response. Executed during the schema discovery.


<div class="meta-api-description">
Control or customize the extraction and mapping of cube metadata when connecting to OLAP data sources by specifying which response field contains the list of cubes or providing a custom function to parse, transform, or reshape the cube schema during schema discovery; this enables flexible handling of cube catalogs, adapting to varied server responses, supporting custom schema extraction, dynamic cube retrieval, and tailored data structure interpretation for pivot operations and multidimensional analysis.
</div>

#### Returns

`Array`&mdash;The cubes schema from the response.

The result has the following format and attributes.

#### Example - specify the field which contains the schema information of the cubes as a string

    <script>
    var dataSource = new kendo.data.PivotDataSource({
      transport: {
        /* transport configuration */
      },
      schema: {
        cubes: "cubes" // cubes information is returned in the "cubes" field of the response
      }
    });
    </script>

#### Example - set the schema information of the cubes as a function

    <script>
    var dataSource = new kendo.data.PivotDataSource({
      transport: {
        /* transport configuration */
      },
      schema: {
        cubes: function(response) {
          return response.cubes; // cubes information are returned in the "cubes" field of the response
        }
      }
    });
    </script>

### schema.cube `Object`

The cube declaration. If configured, this option will enable the client cube processing that is useful for binding to flat data.

> Only applicable if client cube processing is used.


<div class="meta-api-description">
Configure and enable client-side multidimensional data processing by defining the cube schema that transforms flat data records into hierarchical, pivotable structures for grouping, aggregation, and slicing within the pivot grid. Set up or control client-side cube declaration to organize raw data into dimensions, measures, and hierarchies that support interactive data analysis, allowing the data source to perform local aggregation and grouping operations without server dependency. This setup assists in shaping, structuring, and binding flat datasets into a client-processed cube format for improved pivot table performance and flexible data summarization in reporting or analytics scenarios where client cube processing is enabled.
</div>

#### schema.cube.dimensions `Object`

A set of key/value pairs which specifies the field-dimension mapping that is available for processing dimensions. The key specifies the name of the field to which the dimension will be mapped.

> The key has to match the column name that is used in the columns definition.

##### Example - define the cube dimensions

    <script>
      var dataSource = new kendo.data.PivotDataSource({
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

> The key has to match the measure name that is used in the measures definition of the PivotDataSource.

#### Example - define the cube measures which calculate the sum of the products price

    <script>
      var dataSource = new kendo.data.PivotDataSource({
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
                  aggregate: function(value, state, context) {
                      return (state.accumulator || 0) + value;
                  }
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

##### schema.cube.measures.measureName.aggregate `Function|String`

The function that is used to aggregate the measure value.

The built-in aggregates are:
* `average`
* `count`
* `max`
* `min`
* `sum`

###### Returns

`Object`&mdash;The result of the calculation.

###### Parameters

####### value `Object`

The value of the specified field of the currently processed record.

####### state `Object`

The currently aggregated result of the function for already processed records.

> `state` uses a predefined field that is named `accumulator` where the last aggregated result is preserved.

####### context `Object`

The context for the current aggregate call. Includes the current data item and its index in the data.

    {
        dataItem: `data item`,
        index: `data item index`
    }

###### Example - specify a built-in "average" aggregate function

    <script>
      var dataSource = new kendo.data.PivotDataSource({
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

###### Example - specify an aggregate function for a value summing

    <script>
      var dataSource = new kendo.data.PivotDataSource({
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
                aggregate: function(value, state, context) {
                    return (state.accumulator || 0) + value;
                  }
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

##### schema.cube.measures.measureName.result `Function`

The function that will be called at the end of tuple aggregation.

> If not defined, the `state.accumulator` value that is set in the `aggregate` function will be used.

###### Returns

`Object`&mdash;The result of the calculation.

###### Parameters

####### state `Object`

The last aggregated result of the function for already processed records.

> `state` uses a predefined field named `accumulator` where the last aggregated result is preserved.

###### Example - specify a result function that calculates the final value

    <script>
      var dataSource = new kendo.data.PivotDataSource({
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
                aggregate: function(value, state, context) {
                  if (!isNaN(value)) {
                    state.count = (state.count || 0) + 1;
                    return (state.accumulator || 0) + value;
                  } else {
                    return state.accumulator;
                  }
                },
                result: function(state) {
                  return state.accumulator / state.count
                }
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

### schema.data `Function|String`

The field from the server response which contains the data of the cells. Can be set to a function which is called to return the cell data for the response.


<div class="meta-api-description">
Configure how to extract or map the cell data from a server response when connecting a pivot grid or similar component to remote data sources, by specifying the key or path of the data array within the response or providing a custom function to process, parse, or transform the server output into the grid’s data structure for rendering cells, enabling flexible data binding, response field mapping, and customized data retrieval from various API responses or remote endpoints.
</div>

#### Returns

`Array`&mdash;The cell data from the response.

The result has the following format and attributes.

    [{
        value:"1",
        fmtValue:"1",
        ordinal:0
    },{
        value:"42",
        fmtValue:"$42.00",
        ordinal:1
    }, /*..*/]

#### Example - specify the field which contains the cell data as a string

    <script>
    var dataSource = new kendo.data.PivotDataSource({
      transport: {
        /* transport configuration */
      },
      schema: {
        data: "data" // cells data are returned in the "data" field of the response
      }
    });
    </script>

#### Example - set the cell data as a function

    <script>
    var dataSource = new kendo.data.PivotDataSource({
      transport: {
        /* transport configuration */
      },
      schema: {
        data: function(response) {
          return response.data; // cells data are returned in the "data" field of the response
        }
      }
    });
    </script>

### schema.dimensions `Function|String`

The field from the server response which contains the dimensions schema information. Can be set to a function which is called to return the dimensions schema information for the response. Executed during the schema discovery.


<div class="meta-api-description">
Specify or configure the dimensions schema extraction from server responses by setting the field name or providing a callback function that returns dimension definitions; this enables dynamic schema discovery, dimension mapping, and flexible data shaping for pivot grids, OLAP data sources, or analytical datasets, supporting scenarios where you want to control how dimension metadata is retrieved, interpreted, transformed, or customized during data initialization or loading phases.
</div>

#### Returns

`Array`&mdash;The dimensions schema from the response.

The result has the following format and attributes.

    [
      {
         "name":"Customer",
         "caption":"Customer",
         "uniqueName":"[Customer]",
         "defaultHierarchy":"[Customer].[Commute Distance]",
         "type":"3"
      },
      {
         "name":"Date",
         "caption":"Date",
         "uniqueName":"[Date]",
         "defaultHierarchy":"[Date].[Calendar]",
         "type":"1"
      }, /*..*/
   ]

#### Example - specify the field which contains the dimensions schema information as a string

    <script>
    var dataSource = new kendo.data.PivotDataSource({
      transport: {
        /* transport configuration */
      },
      schema: {
        dimensions: "dimensions" // dimensions information is returned in the "dimensions" field of the response
      }
    });
    </script>

#### Example - set the dimensions schema information as a function

    <script>
    var dataSource = new kendo.data.PivotDataSource({
      transport: {
        /* transport configuration */
      },
      schema: {
        dimensions: function(response) {
          return response.dimensions; // dimensions information are returned in the "dimensions" field of the response
        }
      }
    });
    </script>

### schema.hierarchies `Function|String`

The field from the server response which contains the hierarchies schema information. Can be set to a function which is called to return the hierarchies schema information for the response. Executed during the schema discovery requests.


<div class="meta-api-description">
Configure or set the data source field or callback function that identifies, maps, or extracts hierarchy structures, metadata, or nested dimension schemas from server responses when initializing a pivot data source, enabling control over how hierarchical data, drill-down levels, or multi-level groupings are recognized, parsed, or retrieved for pivot table or analytical components.
</div>

#### Returns

`Array`&mdash;The cube hierarchies schema from the response.

The result has the following format and attributes.

    [
        {
            "name":"Address Line 1",
            "caption":"Address Line 1",
            "uniqueName":"[Customer].[Address Line 1]",
            "dimensionUniqueName":"[Customer]",
            "origin":"2",
            "defaultMember":"[Customer].[Address Line 1].[All]"
        },
        {
            "name":"Address Line 2",
            "caption":"Address Line 2",
            "uniqueName":"[Customer].[Address Line 2]",
            "dimensionUniqueName":"[Customer]",
            "origin":"2",
            "defaultMember":"[Customer].[Address Line 2].[All]"
        },
        /*..*/
    ]

#### Example - specify the field which contains hierarchies schema information as a string

    <script>
    var dataSource = new kendo.data.PivotDataSource({
      transport: {
        /* transport configuration */
      },
      schema: {
        hierarchies: "hierarchies" // hierarchies schema information is returned in the "hierarchies" field of the response
      }
    });
    </script>

#### Example - set hierarchies schema information as a function

    <script>
    var dataSource = new kendo.data.PivotDataSource({
      transport: {
        /* transport configuration */
      },
      schema: {
        hierarchies: function(response) {
          return response.hierarchies; // hierarchies information are returned in the "hierarchies" field of the response
        }
      }
    });
    </script>

### schema.levels `Function|String`

The field from the server response which contains the levels schema information. Can be set to a function which is called to return the levels schema information for the response. Executed during the schema discovery.


<div class="meta-api-description">
Specify or configure the source of hierarchical level data within a pivot grid’s data schema by assigning a field name from the server response that holds level metadata or providing a dynamic function that extracts or returns the hierarchical levels information during schema discovery, enabling control over how multi-level structures, nested hierarchies, or grouping levels are identified, read, mapped, or interpreted from server-side data to support customized or dynamic level schema retrieval in pivot tables or data cubes.
</div>

#### Returns

`Array`&mdash;The levels schema from the response.

The result has the following format and attributes.

  [
      {
         "name":"(all)",
         "caption":"(all)",
         "uniquename":"[customer].[address line 1].[(all)]",
         "dimensionuniquename":"[customer]",
         "orderingproperty":"(all)",
         "origin":"2",
         "hierarchyuniquename":"[customer].[address line 1]"
      },
      {
         "name":"address line 1",
         "caption":"address line 1",
         "uniquename":"[customer].[address line 1].[address line 1]",
         "dimensionuniquename":"[customer]",
         "orderingproperty":"address line 1",
         "origin":"2",
         "hierarchyuniquename":"[customer].[address line 1]"
      }, /*..*/
   ]

#### Example - specify the field which contains the levels schema information as a string

    <script>
    var dataSource = new kendo.data.PivotDataSource({
      transport: {
        /* transport configuration */
      },
      schema: {
        levels: "levels" // levels information is returned in the "levels" field of the response
      }
    });
    </script>

#### Example - set the levels schema information as a function

    <script>
    var dataSource = new kendo.data.PivotDataSource({
      transport: {
        /* transport configuration */
      },
      schema: {
        levels: function(response) {
          return response.levels; // levels information are returned in the "levels" field of the response
        }
      }
    });
    </script>

### schema.measures `Function|String`

The field from the server response which contains the measures schema information. Can be set to a function which is called to return the measures schema information for the response. Executed during the schema discovery.


<div class="meta-api-description">
Specify or configure how to identify, extract, or map measure schema data from server responses for pivot or multidimensional data sources, including setting which response field contains measure definitions or providing custom functions to parse, bind, transform, or retrieve measure metadata during schema detection and data preparation for pivot grids, OLAP cubes, analytical reports, or data summarization; control measure information discovery using dynamic extraction logic or static field references to customize measure parsing, metadata mapping, or aggregation definitions within complex data responses.
</div>

#### Returns

`Array`&mdash;The measures schema from the response.

The result has the following format.

    [
        {
            "name":"Days Current Quarter to Date",
            "caption":"Days Current Quarter to Date",
            "uniqueName":"[Measures].[Days Current Quarter to Date]",
            "aggregator":"0",
            "groupName":"Date"
        },
        {
            "name":"Days in Current Quarter",
            "caption":"Days in Current Quarter",
            "uniqueName":"[Measures].[Days in Current Quarter]",
            "aggregator":"0",
            "groupName":"Date"
        },
        /*..*/
    ]

#### Example - specify the field which contains the measures schema information as a string

    <script>
    var dataSource = new kendo.data.PivotDataSource({
      transport: {
        /* transport configuration */
      },
      schema: {
        measures: "measures" // measures information is returned in the "measures" field of the response
      }
    });
    </script>

#### Example - set the measures schema information as a function

    <script>
    var dataSource = new kendo.data.PivotDataSource({
      transport: {
        /* transport configuration */
      },
      schema: {
        measures: function(response) {
          return response.measures; // measures information are returned in the "measures" field of the response
        }
      }
    });
    </script>

## Methods

See the [DataSource methods](/api/framework/datasource#methods) for all inherited methods.

### axes

Gets the parsed axes data.


<div class="meta-api-description">
Access, retrieve, or inspect the current layout and configuration of row and column hierarchies, measures, and aggregated values within a pivot grid or data pivot component, including how fields are arranged and structured in axes form; enable extraction of parsed axes data as JavaScript objects to analyze, render, customize, debug, or manipulate the table’s dimensional setup, layout hierarchy, pivoted fields, or aggregated metric placements after dynamic operations or user pivot adjustments.
</div>

#### Returns

`Object`&mdash;The parsed axes data.

#### Example - get the axes data

    <script>
    var dataSource = new kendo.data.PivotDataSource({
      type: "xmla",
      columns: ["[Date].[Calendar]"],
      transport: {
        connection: {
            catalog: "Adventure Works DW 2008R2"
        },
        read: "https://demos.telerik.com/service/v2/olap/msmdpump.dll"
      },
      schema: {
        type: "xmla"
      }
    });

    dataSource.fetch();

    var axes = dataSource.axes();
    </script>

### catalog

Gets or sets the current catalog name.


<div class="meta-api-description">
Configure or retrieve the database catalog name connected to a PivotGrid or data source by getting or setting the catalog string programmatically, enabling control over which database schema or catalog the data source accesses; use queries or commands to fetch the current catalog value or update it dynamically to switch data contexts, target different catalogs for data binding, adjust data source configurations, and manage catalog references for pivot table data retrieval and filtering within data-driven applications.
</div>

#### Parameters

##### name `String`

The name of the catalog.

#### Returns

`String`&mdash;The current catalog name.

#### Example - set the catalog

    <script>
    var dataSource = new kendo.data.PivotDataSource({
      type: "xmla",
      columns: ["[Date].[Calendar]"],
      transport: {
        read: "https://demos.telerik.com/service/v2/olap/msmdpump.dll"
      },
      schema: {
        type: "xmla"
      }
    });

    dataSource.catalog("Adventure Works DW 2008R2");
    </script>

#### Example - get the catalog name

    <script>
    var dataSource = new kendo.data.PivotDataSource({
      type: "xmla",
      columns: ["[Date].[Calendar]"],
      transport: {
        connection: {
            catalog: "Adventure Works DW 2008R2"
        },
        read: "https://demos.telerik.com/service/v2/olap/msmdpump.dll"
      },
      schema: {
        type: "xmla"
      }
    });

    var catalogName = dataSource.catalog();
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(catalogName);// prints "Adventure Works DW 2008R2"
    </script>

### columns

Gets or sets the columns configuration.


<div class="meta-api-description">
Control, configure, or retrieve the layout and organization of columns within a pivot grid or data source by getting or setting column configurations, descriptors, or definitions; use this method to programmatically bind new column settings, update existing column arrangements, customize or refresh the displayed pivot columns, adjust column fields, manage hierarchical or grouped columns, and dynamically change the structure of pivot data columns in grids or reports based on arrays of column objects or descriptors, enabling flexible column manipulation, reconfiguration, and data layout control.
</div>

#### Parameters

##### val `Array`

The columns configuration. Accepts the same values as the [`columns`](/api/javascript/data/pivotdatasource#configuration-columns) option.

#### Returns

`Array`&mdash;The current columns configuration.

#### Example - set the columns

    <script>
    var dataSource = new kendo.data.PivotDataSource({
      type: "xmla",
      transport: {
        connection: {
            catalog: "Adventure Works DW 2008R2",
            cube: "Adventure Works"
        },
        read: "https://demos.telerik.com/service/v2/olap/msmdpump.dll"
      },
      schema: {
        type: "xmla"
      }
    });

    dataSource.columns(["[Date].[Calendar]"]);
    </script>

#### Example - get the columns name

    <script>
    var dataSource = new kendo.data.PivotDataSource({
      type: "xmla",
      columns: ["[Date].[Calendar]"],
      transport: {
        connection: {
            catalog: "Adventure Works DW 2008R2"
        },
        read: "https://demos.telerik.com/service/v2/olap/msmdpump.dll"
      },
      schema: {
        type: "xmla"
      }
    });

    var columns = dataSource.columns();
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(columns);// [{ name: ["[Date].[Calendar]"] }]
    </script>

### cube

Gets or sets the current cube name.


<div class="meta-api-description">
Retrieve or specify the active OLAP cube name for multidimensional data analysis in pivot data sources, enabling dynamic switching or setting of the cube used for MDX queries and data aggregation; this supports configuring, changing, or accessing the designated cube for real-time data slicing, multidimensional reporting, and analytical operations within data connections.
</div>

#### Parameters

##### name `String`

The name of the cube.

#### Returns

`String`&mdash;The current cube name.

#### Example - set the cube

    <script>
    var dataSource = new kendo.data.PivotDataSource({
      type: "xmla",
      columns: ["[Date].[Calendar]"],
      transport: {
        connection: {
            catalog: "Adventure Works DW 2008R2"
        },
        read: "https://demos.telerik.com/service/v2/olap/msmdpump.dll"
      },
      schema: {
        type: "xmla"
      }
    });

    dataSource.cube("Adventure Works");

    dataSource.fetch();
    </script>

#### Example - get the cube name

    <script>
    var dataSource = new kendo.data.PivotDataSource({
      type: "xmla",
      columns: ["[Date].[Calendar]"],
      transport: {
        connection: {
            catalog: "Adventure Works DW 2008R2",
            cube: "Adventure Works"
        },
        read: "https://demos.telerik.com/service/v2/olap/msmdpump.dll"
      },
      schema: {
        type: "xmla"
      }
    });

    var cubeName = dataSource.cube();
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(cubeName);// prints "Adventure Works"
    </script>

### discover

Starts the discover request with the specified options.


<div class="meta-api-description">
Start or trigger a metadata discovery process to retrieve schema details, fields, hierarchies, and other metadata from a pivot data source, with options to configure request parameters and customize provider-specific settings. This enables searching for ways to explore, inspect, query, or bind data source structure dynamically by initiating a discover operation or metadata fetch call, allowing control over discovery behavior and metadata extraction methods.
</div>

#### Parameters

##### options `String`

The options of the discover request.

#### Returns

`Object`&mdash;The deferred object.

#### Example

    <script>
      var dataSource = new kendo.data.PivotDataSource({
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
                aggregate: function(value, state, context) {
                  if (!isNaN(value)) {
                    state.count = (state.count || 0) + 1;
                    return (state.accumulator || 0) + value;
                  } else {
                    return state.accumulator;
                  }
                },
                result: function(state) {
                  return state.accumulator / state.count;
                }
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

### expandColumn

Expands a column tuple member that has children.

> The path has to include the unique member names until the significant (the one that needs to be expanded) member is reached.


<div class="meta-api-description">
Control or set the expanded state of hierarchical columns within pivot data structures, enabling drill-down and navigation through nested column groups by specifying the exact path of unique member names from the root to the target child, allowing programmatic expansion or collapse of column nodes, dynamic updating of column views, and precise manipulation of multi-level column hierarchies in data analysis or UI interactions.
</div>

#### Parameters

##### path `Array`

The path that uniquely specifies the tuple member that needs to be expanded.

#### Example - expand the second-level tuple member

    <!-- Real life demo: https://docs.telerik.com/kendo-ui/web/pivotgrid/how-to/expand-multiple-dimensions -->

    <script>
    var dataSource = new kendo.data.PivotDataSource({
      type: "xmla",
      columns: [{ name: "[Date].[Calendar]", expand: true }, { name: "[Product].[Category]" } ],
      rows: [{ name: "[Geography].[City]" }],
      measures: ["[Measures].[Reseller Freight Cost]"],
      transport: {
        connection: {
            catalog: "Adventure Works DW 2008R2"
        },
        read: "https://demos.telerik.com/service/v2/olap/msmdpump.dll"
      },
      schema: {
        type: "xmla"
      }
    });

    dataSource.one("dataBound", function() {
        //Expand CY 2005 - first dimension
        dataSource.expandColumn(["[Date].[Calendar].[Calendar Year].&[2005]"]);

        //Expand All Products under CY 2015 - second dimension
        dataSource.expandColumn(["[Date].[Calendar].[Calendar Year].&[2005]","[Product].[Category].[All Products]"]);
    });

    dataSource.read();
    </script>

### expandRow

Expands a row tuple member that has children.

> The path has to include the unique member names until the significant (the one that needs to be expanded) member is reached.


<div class="meta-api-description">
expandRow method enables programmatically opening or expanding hierarchical row entries in a pivot data structure to reveal nested or child elements, allowing drill-down into detailed row data by specifying a sequence or path of unique member names that identify the exact row tuple to expand. This supports scenarios such as dynamically unfolding grouped rows, revealing deeper levels in row hierarchies, controlling row visibility via code, automating row expansion after data loading, and managing multi-level hierarchical data navigation in pivot grids or similar data visualizations. The method facilitates setting, triggering, or configuring expansion states on parent rows to expose underlying child rows, supporting both initial setups and interactive data exploration workflows.
</div>

#### Parameters

##### path `Array`

The path which uniquely specifies the tuple member that needs to be expanded.

#### Example - expand the second-level tuple member

    <!-- Real life demo: https://docs.telerik.com/kendo-ui/web/pivotgrid/how-to/expand-multiple-dimensions -->

    <script>
    var dataSource = new kendo.data.PivotDataSource({
      type: "xmla",
      rows: [{ name: "[Date].[Calendar]", expand: true }, { name: "[Product].[Category]" } ],
      columns: [{ name: "[Geography].[City]" }],
      measures: ["[Measures].[Reseller Freight Cost]"],
      transport: {
        connection: {
            catalog: "Adventure Works DW 2008R2"
        },
        read: "https://demos.telerik.com/service/v2/olap/msmdpump.dll"
      },
      schema: {
        type: "xmla"
      }
    });

    dataSource.one("dataBound", function() {
        //Expand CY 2005 - first dimension
        dataSource.expandRow(["[Date].[Calendar].[Calendar Year].&[2005]"]);

        //Expand All Products under CY 2015 - second dimension
        dataSource.expandRow(["[Date].[Calendar].[Calendar Year].&[2005]","[Product].[Category].[All Products]"]);
    });

    dataSource.read();
    </script>

### measures

Gets or sets the measures configuration.


<div class="meta-api-description">
Accessing or modifying aggregation fields and calculated values within a data source, retrieving the current measure definitions, updating or replacing aggregation configurations, controlling which fields are aggregated and how, defining or changing summary calculations, adjusting aggregation functions like sum, count, average, or custom calculations, managing measure settings for data grouping and display, configuring or resetting the set of aggregated fields, and managing measure arrays to add, remove, or alter data field aggregations for analytical or reporting purposes.
</div>

#### Parameters

##### val `Array`

The measures configuration. Accepts the same values as the [`measures`](/api/javascript/data/pivotdatasource#configuration-measures-values) option.

#### Returns

`Array`&mdash;The current measures configuration.

#### Example - set the measures

    <script>
    var dataSource = new kendo.data.PivotDataSource({
      type: "xmla",
      transport: {
        connection: {
            catalog: "Adventure Works DW 2008R2",
            cube: "Adventure Works"
        },
        read: "https://demos.telerik.com/service/v2/olap/msmdpump.dll"
      },
      schema: {
        type: "xmla"
      }
    });

    dataSource.measures(["[Measures].[Internet Order Lines Count]"]);
    </script>

#### Example - get the measures

    <script>
    var dataSource = new kendo.data.PivotDataSource({
      type: "xmla",
      measures: ["[Measures].[Internet Order Lines Count]"],
      transport: {
        connection: {
            catalog: "Adventure Works DW 2008R2"
        },
        read: "https://demos.telerik.com/service/v2/olap/msmdpump.dll"
      },
      schema: {
        type: "xmla"
      }
    });

    var measures = dataSource.measures();
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(measures);// [{ name: "[Measures].[Internet Order Lines Count]" }]
    </script>

### measuresAxis

Gets the name of the axis on which the measures are displayed.


<div class="meta-api-description">
Configure or retrieve the placement of measure fields in a pivot grid by identifying which axis—rows, columns, or another dimension—displays the aggregated values or measures; control, check, or dynamically adjust the layout and positioning of these measure fields to customize reporting views, manage UI synchronization, or implement conditional logic based on whether numerical data appears on the rows, columns, or alternative axes for better data visualization and interaction in pivot tables.
</div>

#### Returns

`String`&mdash;The axis name.

#### Example - set the measures

    <script>
    var dataSource = new kendo.data.PivotDataSource({
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
      },
      schema: {
        type: "xmla"
      }
    });

    var axis = dataSource.measuresAxis();
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(axis); // "rows"
    </script>

### rows

Gets or sets the rows configuration.


<div class="meta-api-description">
Retrieve or configure the row axis fields for a pivot grid data source by accessing or modifying the current set of row descriptors, define which data fields display as rows, control the arrangement and selection of row dimensions, set or update the array of row configurations, customize row grouping, adjust which fields are included on the rows axis, and manage how row data is structured and presented in pivot tables.
</div>

#### Parameters

##### val `Array`

The rows configuration. Accepts the same values as the [`row`](/api/javascript/data/pivotdatasource#configuration-rows) option.

#### Returns

`Array`&mdash;The current rows configuration.

#### Example - set the rows

    <script>
    var dataSource = new kendo.data.PivotDataSource({
      type: "xmla",
      transport: {
        connection: {
            catalog: "Adventure Works DW 2008R2",
            cube: "Adventure Works"
        },
        read: "https://demos.telerik.com/service/v2/olap/msmdpump.dll"
      },
      schema: {
        type: "xmla"
      }
    });

    dataSource.rows(["[Date].[Calendar]"]);
    </script>

#### Example - get the rows name

    <script>
    var dataSource = new kendo.data.PivotDataSource({
      type: "xmla",
      rows: ["[Date].[Calendar]"],
      transport: {
        connection: {
            catalog: "Adventure Works DW 2008R2"
        },
        read: "https://demos.telerik.com/service/v2/olap/msmdpump.dll"
      },
      schema: {
        type: "xmla"
      }
    });

    var rows = dataSource.rows();
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(rows);// [{ name: ["[Date].[Calendar]"] }]
    </script>

### schemaCatalogs

Requests the catalogs information.


<div class="meta-api-description">
Fetch, load, or refresh available database catalogs or schema lists for data connections in PivotGrid setups by retrieving catalog metadata, obtaining or updating catalog information, accessing schema catalogs dynamically, requesting catalog data before binding, configuring data source catalogs, enabling catalog discovery, refreshing catalog selections, controlling metadata loading, and managing catalog lists for accurate and up-to-date data binding in analytical grids.
</div>

#### Returns

`Object`&mdash;The deferred object.

#### Example

    <script>
    var dataSource = new kendo.data.PivotDataSource({
      type: "xmla",
      transport: {
        read: "https://demos.telerik.com/service/v2/olap/msmdpump.dll"
      },
      schema: {
        type: "xmla"
      }
    });

    dataSource.schemaCatalogs()
        .done(function(catalogs) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log(catalogs);
        });
    </script>

### schemaCubes

Requests the cubes schema information.


<div class="meta-api-description">
Retrieve or load multidimensional cube metadata, including schemas for cubes, dimensions, measures, hierarchies, and member properties from OLAP, MDX, or XMLA data sources; fetch cube schema information to explore available data structures, enable building dynamic metadata-based user interfaces, query analytical data cubes, inspect measure definitions, configure dimensions and hierarchies, access cube-level metadata for pivot tables or grids, and extract detailed OLAP model details for analysis or display purposes.
</div>

#### Returns

`Object`&mdash;The deferred object.

#### Example

    <script>
    var dataSource = new kendo.data.PivotDataSource({
      type: "xmla",
      transport: {
        connection: {
            catalog: "Adventure Works DW 2008R2"
        },
        read: "https://demos.telerik.com/service/v2/olap/msmdpump.dll"
      },
      schema: {
        type: "xmla"
      }
    });

    dataSource.schemaCubes()
        .done(function(cubes) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log(cubes);
        });
    </script>

### schemaDimensions

Requests the dimensions schema information.


<div class="meta-api-description">
Retrieve or load metadata and schema details for dimensions in a pivot grid data source, including dimension definitions, hierarchical structures, field properties, and metadata for configuring, inspecting, or binding dimension fields, enabling dynamic layout adjustments, UI updates, or data exploration by fetching and accessing the complete schema information that represents the dimensional data model underlying the pivot table structure, supporting use cases such as schema inspection, dimension validation, metadata synchronization, or custom control rendering based on dimension properties.
</div>

#### Returns

`Object`&mdash;The deferred object.

#### Example

    <script>
    var dataSource = new kendo.data.PivotDataSource({
      type: "xmla",
      transport: {
        connection: {
            catalog: "Adventure Works DW 2008R2"
        },
        read: "https://demos.telerik.com/service/v2/olap/msmdpump.dll"
      },
      schema: {
        type: "xmla"
      }
    });

    dataSource.schemaDimensions()
        .done(function(dimensions) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log(dimensions);
        });
    </script>

### schemaHierarchies

Requests the hierarchies schema information.


<div class="meta-api-description">
Refresh or load hierarchy metadata and schema information for pivot grid hierarchies by fetching or updating hierarchy definitions, synchronizing metadata during data binding or loading, retrieving hierarchical structure details, refreshing hierarchy fields and configurations, controlling schema updates for pivot data sources, enabling hierarchy synchronization and metadata refresh operations, managing hierarchical data schema, and maintaining up-to-date hierarchy field information for pivot tables or grids.
</div>

#### Parameters

##### dimensionName `String`

The name of the dimensions which is the "owner" of the hierarchy.

#### Returns

`Object`&mdash;The deferred object.

#### Example

    <script>
    var dataSource = new kendo.data.PivotDataSource({
      type: "xmla",
      transport: {
        connection: {
            catalog: "Adventure Works DW 2008R2"
        },
        read: "https://demos.telerik.com/service/v2/olap/msmdpump.dll"
      },
      schema: {
        type: "xmla"
      }
    });

    var dimensionName = "[Customer]";

    dataSource.schemaHierarchies(dimensionName)
        .done(function(dimensions) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log(dimensions);
        });
    </script>

### schemaLevels

Requests the levels schema information.


<div class="meta-api-description">
Retrieve or refresh hierarchical dimension metadata, load or update levels and schema information for pivot tables, access dimension levels schema to support drill-down, headers, and layout structure in pivot grids, request and obtain hierarchy header details from data source transport and schema settings, fetch metadata about dimension levels dynamically for configuring pivot table hierarchies, control and fetch schema data to enable multi-level row or column headers and drilling features in pivot grid data sources.
</div>

#### Parameters

##### hierarchyName `String`

The name of the hierarchy which is the "owner" of the level.

#### Returns

`Object`&mdash;The deferred object.

#### Example

    <script>
    var dataSource = new kendo.data.PivotDataSource({
      type: "xmla",
      transport: {
        connection: {
            catalog: "Adventure Works DW 2008R2"
        },
        read: "https://demos.telerik.com/service/v2/olap/msmdpump.dll"
      },
      schema: {
        type: "xmla"
      }
    });

    var hierarchyName = "[Georgaphy].[City]";

    dataSource.schemaLevels(hierarchyName)
        .done(function(levels) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log(levels);
        });
    </script>

### schemaMeasures

Requests the measures schema information.


<div class="meta-api-description">
Retrieve, load, fetch, or refresh measure definitions, metadata, and schemas from local or remote data sources to access measure names, fields, aggregation types, and formatting configurations. Enable querying or inspecting measure details within a data source to update, display, or programmatically manage aggregation settings, measure configurations, or schema information related to data measures in pivot or analytical data structures.
</div>

#### Returns

`Object`&mdash;The deferred object.

#### Example

    <script>
    var dataSource = new kendo.data.PivotDataSource({
      type: "xmla",
      transport: {
        connection: {
            catalog: "Adventure Works DW 2008R2"
        },
        read: "https://demos.telerik.com/service/v2/olap/msmdpump.dll"
      },
      schema: {
        type: "xmla"
      }
    });

    dataSource.schemaMeasures()
        .done(function(measures) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log(measures);
        });
    </script>
