---
title: Editing
page_title: Kendo UI for jQuery OrgChart Documentation - Editing
description: "Get started with the Kendo UI for jQuery OrgChart and learn how to implement its editing functionality."
slug: editing_kendoui_orgchart_widget
position: 3
---

# Editing

The OrgChart allows node editing. By default, editing in the OrgChart is enabled.

The editing enables you to replace the avatar of an existing node and add an avatar for the new nodes. Note that the size of the newly uploaded image for the avatars can be up to 1MB.

## Editing Configuration

To set up editing:

1. [Configure the `transport` and the `schema` data source options of the OrgChart](#configuring-the-data-source)
1. [Set the `editable` configuration (optional)](#setting-the-editable-option)

The following example demonstrates how to configure CRUD (Create, Read, Update, Destroy) data operations for the nodes of the OrgChart.

```dojo    
    <div id="orgchart"></div>    

    <script>  
        var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service";
        $("#orgchart").kendoOrgChart({
            dataSource: {
                transport: {
                    read: {
                        url: crudServiceBaseUrl + "/EmployeesOrgChart",
                        dataType: "json"
                    },
                    create: {
                        url: crudServiceBaseUrl + "/EmployeesOrgChart/create",
                        method: "POST"
                    },
                    update: {
                        url: crudServiceBaseUrl + "/EmployeesOrgChart/update",
                        method: "POST"
                    },
                    destroy: {
                        url: crudServiceBaseUrl + "/EmployeesOrgChart/destroy",
                        method: "POST"
                    }
                },
                schema: {
                    model: {
                        id: "Id",
                        parentId: "ParentId",
                        expanded: true,
                        fields: {
                            Id: { type: "number", editable: false, nullable: false },
                            ParentId: { field: "ParentId", nullable: true },
                            title: { field: "Position", nullable: true },
                            avatar: { field: "Avatar", nullable: true },
                            name: { field: "FullName" }
                        }
                    }
                }
            }
        });
    </script>
```

### Configuring the Data Source

The OrgChart uses an OrgChart dataSource instance.

> * Define the data operations in the `transport` configuration.
> * Define the `id` field of the data items in `schema.model.id`. This ensures the correct adding, editing, and deleting of items.
> * Define the model fields.

For more information on the DataSource schema configuration, refer to [`schema.model`](/api/javascript/data/datasource/configuration/schema.model).

The following example demonstrates how to configure the OrgChart DataSource for CRUD (Create, Read, Update, Destroy) data operations.

	var ds = new kendo.data.OrgChartDataSource({
        transport: {
            read: {
                url: crudServiceBaseUrl + "/EmployeesOrgChart",
                dataType: "json"
            },
            create: {
                url: crudServiceBaseUrl + "/EmployeesOrgChart/create",
                method: "POST"
            },
            update: {
                url: crudServiceBaseUrl + "/EmployeesOrgChart/update",
                method: "POST"
            },
            destroy: {
                url: crudServiceBaseUrl + "/EmployeesOrgChart/destroy",
                method: "POST"
            }
        },
        //....
    });   


### Setting the Editable Option

Editing is enabled by default, but the `editable` configuration exposes a number of customization options.

The following example demonstrates how to set the `editable` configuration.

    editable: {
        form: {
            items: [{
                field: "title",
                label: "Position",
                editor: "AutoComplete"
            }]
        }
    }

## See Also

* [Editing of the OrgChart (Demo)](https://demos.telerik.com/kendo-ui/orgchart/editing)
* [JavaScript API Reference of the OrgChart](/api/javascript/ui/orgchart)
