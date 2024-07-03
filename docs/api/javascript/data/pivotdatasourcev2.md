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
          read: 'https://demos.telerik.com/olap/msmdpump.dll'
      }
    });
    dataSource.fetch();
    </script>

### columns.expand `Boolean`

If set to `true`, the member will be expanded.

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
          read: 'https://demos.telerik.com/olap/msmdpump.dll'
      }
    });
    dataSource.fetch();
    </script>

### columns.name `String`

The hierarchical name of the column.

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
          read: 'https://demos.telerik.com/olap/msmdpump.dll'
      }

    });
    dataSource.fetch();
    </script>

### measures `Array|Object`

The configuration of measures. A string array whose values are interpreted as the name of the measures that will be loaded. Measures can be defined as a list of objects with the `name` property holding the name.

  [{
        name: "[Measures].[_Internet Current Quarter Sales Performance Status]"
    }]

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
        read: "https://demos.telerik.com/olap/msmdpump.dll"
      }
    });

    $("#pivot").kendoPivotGridV2({
      dataSource: dataSource
    });
    </script>

### measures.values `Array`

A string array whose values are interpreted as the name of the measures that will be loaded.

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
        read: "https://demos.telerik.com/olap/msmdpump.dll"
      }
    });

    $("#pivot").kendoPivotGridV2({
      dataSource: dataSource
    });
    </script>

### measures.axis `String` *(default: columns)*

The name of the axis on which the measures will be displayed. The supported values are the rows or columns. This option is applicable if multiple measures are used.

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
        read: "https://demos.telerik.com/olap/msmdpump.dll"
      }
    });
    
    $("#pivot").kendoPivotGridV2({
      dataSource: dataSource
    });
    </script>

### rows `Array`

The configuration of the row axis members. An array of JavaScript objects or strings. A JavaScript objects are interpreted as rows descriptors. Strings are interpreted as the hierarchical name of the member.

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
        read: "https://demos.telerik.com/olap/msmdpump.dll"
      }
    });
    dataSource.fetch();
    </script>

### rows.expand `Boolean`

If set to `true`, the member will be expanded.

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
        read: "https://demos.telerik.com/olap/msmdpump.dll"
      }
    });
    dataSource.fetch();
    </script>

### rows.name `String`

The hierarchical name of the rows.

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
        read: "https://demos.telerik.com/olap/msmdpump.dll"
      }
    });
    dataSource.fetch();
    </script>

### transport `Object`

The configuration used to load data items and discover schema information.

### transport.discover `Object|String|Function`

The configuration which is used when the data source discovers the schema information about the current cube.

* If the value of `transport.discover` is a string, the data source uses this string as the URL of the remote service.
#### Example - set the discover remote service

    <script>
    var dataSource = new kendo.data.PivotDataSourceV2({
      type: "xmla",
      transport: {
        connection: {
            catalog: "Adventure Works DW 2008R2",
            cube: "Adventure Works"
        },
        read: "https://demos.telerik.com/olap/msmdpump.dll"
      }
    });
    dataSource.discover();
    </script>

### transport.connection `Object`

The configuration that is used for setting the connection options.

### transport.connection.catalog `String`

The catalog name.

#### Example - set the connection catalog name

    <script>
    var dataSource = new kendo.data.PivotDataSourceV2({
      type: "xmla",
      transport: {
        connection: {
            catalog: "Adventure Works DW 2008R2"
        },
        read: "https://demos.telerik.com/olap/msmdpump.dll",
      }

    });
    </script>

### transport.connection.cube `String`

The cube name in the current data source.

#### Example - set the cube catalog name

    <script>
    var dataSource = new kendo.data.PivotDataSourceV2({
      type: "xmla",
      transport: {
        connection: {
            catalog: "Adventure Works DW 2008R2",
            cube: "Adventure Works"
        },
        read: "https://demos.telerik.com/olap/msmdpump.dll",
      }
    });
    </script>

### schema `Object`

The schema configuration of the PivotDataSourceV2.

### schema.cube `Object`

The cube declaration. If configured, this option will enable the client cube processing that is useful for binding to flat data.

> Only applicable if client cube processing is used.
> Necessary when binding the Pivot to data of type "odata".

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
        read: "https://demos.telerik.com/olap/msmdpump.dll"
      }
    });

    dataSource.fetch();

    var axes = dataSource.axes();
    </script>

### catalog

Gets or sets the current catalog name.

#### Parameters

##### name `String`

The name of the catalog.

#### Returns

`String`&mdash;The current catalog name.

#### Example - set the catalog

    <script>
    var dataSource = new kendo.data.PivotDataSourceV2({
      type: "xmla",
      columns: ["[Date].[Calendar]"],
      transport: {
        read: "https://demos.telerik.com/olap/msmdpump.dll"
      }
    });

    dataSource.catalog("Adventure Works DW 2008R2");
    </script>

#### Example - get the catalog name

    <script>
    var dataSource = new kendo.data.PivotDataSourceV2({
      type: "xmla",
      columns: ["[Date].[Calendar]"],
      transport: {
        connection: {
            catalog: "Adventure Works DW 2008R2"
        },
        read: "https://demos.telerik.com/olap/msmdpump.dll"
      }
    });

    var catalogName = dataSource.catalog();
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(catalogName);// prints "Adventure Works DW 2008R2"
    </script>

### columns

Gets or sets the columns configuration.

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
        read: "https://demos.telerik.com/olap/msmdpump.dll"
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
        read: "https://demos.telerik.com/olap/msmdpump.dll"
      }
    });

    var columns = dataSource.columns();
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(columns);// [{ name: ["[Date].[Calendar]"] }]
    </script>

### cube

Gets or sets the current cube name.

#### Parameters

##### name `String`

The name of the cube.

#### Returns

`String`&mdash;The current cube name.

#### Example - set the cube

    <script>
    var dataSource = new kendo.data.PivotDataSourceV2({
      type: "xmla",
      columns: ["[Date].[Calendar]"],
      transport: {
        connection: {
            catalog: "Adventure Works DW 2008R2"
        },
        read: "https://demos.telerik.com/olap/msmdpump.dll"
      }
    });

    dataSource.cube("Adventure Works");

    dataSource.fetch();
    </script>

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
        read: "https://demos.telerik.com/olap/msmdpump.dll"
      }
    });

    var cubeName = dataSource.cube();
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(cubeName);// prints "Adventure Works"
    </script>

### discover

Starts the discover request with the specified options.

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
        read: "https://demos.telerik.com/olap/msmdpump.dll"
      }
    });

    dataSource.discover({
        data: {
          command: "schemaMeasures",
          restrictions: {
            catalogName: dataSource.catalog(),
            cubeName: dataSource.cube()
          }
        });
    </script>

### measures

Gets or sets the measures configuration.

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
        read: "https://demos.telerik.com/olap/msmdpump.dll"
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
        read: "https://demos.telerik.com/olap/msmdpump.dll"
      }
    });

    var measures = dataSource.measures();
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(measures);// [{ name: "[Measures].[Internet Order Lines Count]" }]
    </script>

### measuresAxis

Gets the name of the axis on which the measures are displayed.

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
        read: "https://demos.telerik.com/olap/msmdpump.dll"
      }
    });

    var axis = dataSource.measuresAxis();
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(axis); // "rows"
    </script>

### rows

Gets or sets the rows configuration.

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
        read: "https://demos.telerik.com/olap/msmdpump.dll"
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
        read: "https://demos.telerik.com/olap/msmdpump.dll"
      }
    });

    var rows = dataSource.rows();
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(rows);// [{ name: ["[Date].[Calendar]"] }]
    </script>

### schemaCatalogs

Requests the catalogs information.

#### Returns

`Object`&mdash;The deferred object.

#### Example

    <script>
    var dataSource = new kendo.data.PivotDataSourceV2({
      type: "xmla",
      transport: {
        read: "https://demos.telerik.com/olap/msmdpump.dll"
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
        read: "https://demos.telerik.com/olap/msmdpump.dll"
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
        read: "https://demos.telerik.com/olap/msmdpump.dll"
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
        read: "https://demos.telerik.com/olap/msmdpump.dll"
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
        read: "https://demos.telerik.com/olap/msmdpump.dll"
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
        read: "https://demos.telerik.com/olap/msmdpump.dll"
      }
    });

    dataSource.schemaMeasures()
        .then(function(measures) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log(measures);
        });
    </script>