---
title: Data Binding
page_title: jQuery TreeList Documentation | Data Binding
description: "Get started with the jQuery TreeList by Kendo UI and bind the widget to local or remote data."
slug: databinding_kendoui_treelist
position: 2
---

# Data Binding

The TreeList provides options for binding it to [local arrays](#bining-to-local-data) and [remote data](#bining-to-remote-data).

## Binding to Local Data

The following example demonstrates how to bind a TreeList with a nullable `parentId` field to a local data array.

```dojo
    <div id="treelist"></div>

    <!-- Initialize the TreeList -->
    <script>

      $(document).ready(function(){
        $("#treelist").kendoTreeList({
          columns: [
            { field: "parentId", width:150 },
            { field: "Name" },
            { field: "Position" }
          ],
          dataSource: {
            schema:{
              model:{
                id: "id",
                parentId:"parentId",
                fields:{
                  id: { type: "number"},
                  parentId: { type: "number", nullable:true }
                }
              }
            },
            data: [
              // Jane Smith is the root item because her parentId is null.
              { id: 1, parentId: null, Name: "Jane Smith", Position: "CEO" },
              { id: 2, parentId: 1,    Name: "Alex Sells", Position: "EVP Sales" },
              { id: 3, parentId: 1,    Name: "Bob Price",  Position: "EVP Marketing" }
            ]
          }
        });
      });
    </script>
```

The following example demonstrates how to bind a TreeList with a non-nullable `parentId` field to a local data array.  

```dojo
    <div id="treelist"></div>

    <!-- Initialize the TreeList -->
    <script>

      $(document).ready(function(){
        $("#treelist").kendoTreeList({
          columns: [
            { field: "parentId", width:150 },
            { field: "Name" },
            { field: "Position" }
          ],
          dataSource: {
            schema:{
              model:{
                id: "id",
                parentId:"parentId",
                fields:{
                  id: { type: "number"},
                  parentId: { type: "number", nullable:false }
                }
              }
            },
            data: [
              // Jane Smith is the root item because her parentId is 0 which is the default value for number types and the parentId field is NOT nullable
              { id: 1, parentId: 0, Name: "Jane Smith", Position: "CEO" },
              { id: 2, parentId: 1,    Name: "Alex Sells", Position: "EVP Sales" },
              { id: 3, parentId: 1,    Name: "Bob Price",  Position: "EVP Marketing" }
            ]
          }
        });
      });
    </script>

```

## Binding to Remote Data

You can also bind the `TreeListDataSource` to remote data which means that the TreeList will load items from a web service. Remote data binding enables the retrieval of data from the server and the saving of the TreeList data items to the server database. For more information, refer to the article on [using the Kendo UI DataSource]({% slug overview_kendoui_datasourcecomponent %}).

> To lazy-load the TreeList hierarchy, calculate and include the Boolean [`hasChildren`](/api/javascript/data/treelistmodel/fields/haschildren) field on the server.
> When the user clicks the expand icon, the TreeList DataSource requests the children of the item by sending the parent item `id` as a request parameter, for example `&id=1`.
> You can change the parameter name by using the [`paramaterMap`](/api/javascript/data/datasource/configuration/transport.parametermap) function. For more information, refer to the controller code in the [`kendo-ui-demos service`](https://github.com/telerik/kendo-ui-demos-service/blob/master/demos-and-odata-v3/KendoCRUDService/Controllers/EmployeeDirectoryController.cs).

The following example demonstrates how to enable the remote binding for the TreeList by setting the DataSource `transport`.

```dojo

    <div id="treelist"></div>

    <script>

        $(document).ready(function(){
            var serviceRoot = "https://demos.telerik.com/kendo-ui/service";

            // Create the TreeListDataSource.
            var dataSource = new kendo.data.TreeListDataSource({
                transport: {
                    // Define the remote end points
                    read:  {
                        url: serviceRoot + "/EmployeeDirectory/All",
                        dataType: "jsonp"
                    },
                    update: {
                        url: serviceRoot + "/EmployeeDirectory/Update",
                        dataType: "jsonp"
                    },
                    destroy: {
                        url: serviceRoot + "/EmployeeDirectory/Destroy",
                        dataType: "jsonp"
                    },
                    create: {
                        url: serviceRoot + "/EmployeeDirectory/Create",
                        dataType: "jsonp"
                    },

                    // Post the changed models in the `model` field serialized as JSON.
                    parameterMap: function(options, operation) {
                        if (operation !== "read" && options.models) {
                            return { models: kendo.stringify(options.models) };
                        }
                    }
                },

                // Enable batch updates.
                batch: true,

                // Define the model schema.
                schema: {
                    model: {
                        id: "EmployeeId",
                        parentId: "ReportsTo",
                        fields: {
                            EmployeeId: { type: "number", editable: false, nullable: false },
                            ReportsTo: { type: "number", nullable: true },
                            FirstName: { validation: { required: true } },
                            LastName: { validation: { required: true } },
                            HireDate: { type: "date" },
                            Phone: { type: "string" },
                            HireDate: { type: "date" },
                            BirthDate: { type: "date" },
                            Extension: { type: "number", validation: { min: 0, required: true } },
                            Position: { type: "string" }
                        }
                    }
                }
            });

            // Create the TreeList.
            $("#treelist").kendoTreeList({
                // Declare the TreeList columns.
                columns: [
                    { field: "LastName", title: "Last Name" },
                    { field: "Position" }
                ],
                // Bind the TreeList to the dataSource.
                dataSource: dataSource
            });
        });

    </script>
```

## See Also

* [Local Data Binding in the TreeList (Demo)](https://demos.telerik.com/kendo-ui/treelist/local-data-binding)
* [Remote Data Binding in the TreeList (Demo)](https://demos.telerik.com/kendo-ui/treelist/remote-data-binding)
* [TreeList JavaScript API Reference](/api/javascript/ui/treelist)
