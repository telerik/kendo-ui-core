---
title: Persist Multi-Checkbox Filters in Grids When External Using DataSources
description: Learn how to persist a multi-checkbox filter in the Kendo UI for jQuery Data Grid component when external using an external DataSource.
type: how-to
page_title: Persist the Multi-Checkbox Filter When the Data Grid Uses an External DataSource - Kendo UI Grid for jQuery
slug: grid-persist-checkbox-filter-external-datasource
tags: kendoui, jquery, data, grid, persist, multi, checkbox, filter, external, datasource
ticketid: 1580564
res_type: kb
---

## Environment

<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Progress® Kendo UI® for jQuery Grid</td>
		</tr>
	</tbody>
</table>


## Description

How can I persist the multi-checkbox filter in the Data Grid when the multi-checkbox filter references an external DataSource?

## Solution

Calling [`setOptions`](/api/javascript/ui/grid/methods/setoptions) method does not persist the multi-checkbox filter when the filter references an external DataSource.

To work around this issue, use either of the following approaches:

* Declare the DataSource directly inside the [`columns.filterable.dataSource`](/api/javascript/ui/grid/configuration/columns.filterable.datasource) property:

	```dojo
	    <div class="box-col">
	      <button id="save">Save State</button>
	      <button id="load">Load State</button>
	    </div>
	    <div id="grid"></div>
	    <script>
	      $(document).ready(function() {
	        var telerikWebServiceBase = "https://demos.telerik.com/kendo-ui/service/";
	        $("#grid").kendoGrid({
	          dataSource: {
	            type: "odata",
	            transport: {
	              read: telerikWebServiceBase + "Northwind.svc/Employees"
	            },
	            pageSize: 20,
	            serverPaging: true,
	            serverSorting: true,
	            serverFiltering: true,
	          },
	          editable: true,
	          filterable: true,
	          pageable: true,
	          columns: [
	            {
	              field: "FirstName",
	              title: "First Name",
	              filterable: {
	                multi: true, search: true,
	                dataSource: {
	                  transport: {
	                    read: {
	                      url: telerikWebServiceBase + "Employees/Unique",
	                      dataType: "jsonp",
	                      data: {
	                        field: "FirstName"
	                      }
	                    }
	                  }
	                }
	              },
	              width: "220px"
	            },
	            {
	              field: "LastName",
	              filterable: {
	                dataSource: {
	                  transport: {
	                    read: {
	                      url: telerikWebServiceBase + "Employees/Unique",
	                      dataType: "jsonp",
	                      data: {
	                        field: "LastName"
	                      }
	                    }
	                  }
	                },
	                multi: true
	              },
	              title: "Last Name",
	              width: "220px"
	            },
	            {
	              field: "Country",
	              width: "220px"
	            },
	            {
	              field: "City",
	              filterable: {
	                multi: true,
	                dataSource: [{
	                  City: "Seattle",
	                },{
	                  City: "Tacoma",
	                },{
	                  City: "Kirkland",
	                },{
	                  City: "Redmond",
	                },{
	                  City: "London"
	                }],
	                checkAll: false
	              },
	              width: "220px"
	            },
	            {
	              filterable: {
	                multi: true,
	                dataSource: {
	                  transport: {
	                    read: {
	                      url: telerikWebServiceBase + "Employees/Unique",
	                      dataType: "jsonp",
	                      data: {
	                        field: "Title"
	                      }
	                    }
	                  }
	                }
	              },
	              field: "Title"
	            }
	          ]
	        });

	        var grid = $("#grid").data("kendoGrid");

	        $("#save").click(function (e) {
	          e.preventDefault();
	          localStorage["kendo-grid-options"] = kendo.stringify(grid.getOptions());
	        });

	        $("#load").click(function (e) {
	          e.preventDefault();
	          var options = JSON.parse(localStorage["kendo-grid-options"]);
	          if (options) {
	            grid.setOptions(options);
	          }
	        });
	      });
	    </script>
	```

* Pass a reference of the external filterable DataSource to the `options` object before calling the `setOptions` method:

	```dojo
	    <div class="box-col">
	      <button id="save">Save State</button>
	      <button id="load">Load State</button>
	    </div>
	    <div id="grid"></div>
	    <script>
	      $(document).ready(function() {
	        var telerikWebServiceBase = "https://demos.telerik.com/kendo-ui/service/";
	        var FirstNameMultiDataSource = new kendo.data.DataSource({
	          transport: {
	            read: {
	              url: telerikWebServiceBase + "Employees/Unique",
	              dataType: "jsonp",
	              data: {
	                field: "FirstName"
	              }
	            }
	          }
	        })
	        $("#grid").kendoGrid({
	          dataSource: {
	            type: "odata",
	            transport: {
	              read: telerikWebServiceBase + "Northwind.svc/Employees"
	            },
	            pageSize: 20,
	            serverPaging: true,
	            serverSorting: true,
	            serverFiltering: true,
	          },
	          editable: true,
	          filterable: true,
	          pageable: true,
	          columns: [
	            {
	              field: "FirstName",
	              title: "First Name",
	              filterable: {
	                multi: true, search: true,
	                dataSource: FirstNameMultiDataSource
	              },
	              width: "220px"
	            },
	            {
	              field: "LastName",
	              filterable: {
	                dataSource: {
	                  transport: {
	                    read: {
	                      url: telerikWebServiceBase + "Employees/Unique",
	                      dataType: "jsonp",
	                      data: {
	                        field: "LastName"
	                      }
	                    }
	                  }
	                },
	                multi: true
	              },
	              title: "Last Name",
	              width: "220px"
	            },
	            {
	              field: "Country",
	              width: "220px"
	            },
	            {
	              field: "City",
	              filterable: {
	                multi: true,
	                dataSource: [{
	                  City: "Seattle",
	                },{
	                  City: "Tacoma",
	                },{
	                  City: "Kirkland",
	                },{
	                  City: "Redmond",
	                },{
	                  City: "London"
	                }],
	                checkAll: false
	              },
	              width: "220px"
	            },
	            {
	              filterable: {
	                multi: true,
	                dataSource: {
	                  transport: {
	                    read: {
	                      url: telerikWebServiceBase + "Employees/Unique",
	                      dataType: "jsonp",
	                      data: {
	                        field: "Title"
	                      }
	                    }
	                  }
	                }
	              },
	              field: "Title"
	            }
	          ]
	        });

	        var grid = $("#grid").data("kendoGrid");

	        $("#save").click(function (e) {
	          e.preventDefault();
	          localStorage["kendo-grid-options"] = kendo.stringify(grid.getOptions());
	        });
			
	        $("#load").click(function (e) {
	          e.preventDefault();
	          var options = JSON.parse(localStorage["kendo-grid-options"]);
	          // Reference the FirstName filterbale dataSource.
	          options.columns[0].filterable.dataSource = FirstNameMultiDataSource;
	          if (options) {
	            grid.setOptions(options);
	          }
	        });
	      });
	    </script>
	```


## See Also

* [JavaScript API Reference of the jQuery Data Grid](/api/javascript/ui/grid)
* [jQuery Data Grid Overview Demo](https://demos.telerik.com/kendo-ui/grid/index)
* [Persist the State of the Data Grid and the Function Handlers](/knowledge-base/grid-persist-state-with-functions)
