---
title: Editing
page_title: Kendo UI for jQuery TaskBoard Documentation - Editing
description: "Get started with the Kendo UI for jQuery TaskBoard and learn how to implement its editing functionality."
slug: editing_kendoui_taskboard_widget
position: 6
---

# Editing

The TaskBoard allows column and card editing. By default, editing in the TaskBoard is enabled for both columns and cards.

## Editing Configuration

To set up editing:

1. [Configure the `transport` and the `schema` data source options of the TaskBoard](#configuring-the-data-source)
1. [Set the `editable` configuration (optional)](#setting-the-editable-option)

The following example demonstrates how to configure CRUD (Create, Read, Update, Destroy) data operations for columns and the cards of the TaskBoard.

```dojo
    <div id="taskBoard"></div>

    <script>
        var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service";

        var priorities = new kendo.data.DataSource({
            data: [
                { value: "urgent", text: "Urgent", color: "orange" },
                { value: "highpriority", text: "High Priority", color: "blue" },
                { value: "lowpriority", text: "Low Priority", color: "green" }
            ]
        });

        $("#taskBoard").kendoTaskBoard({
            columnSettings: {
                dataTextField: "Text",
                dataStatusField: "Status",
                dataOrderField: "Order"
            },
            columns: {
                transport: {
                    read: {
                        url: crudServiceBaseUrl + "/taskboard/columns"
                    },
                    create: {
                        url: crudServiceBaseUrl + "/taskboard/columns_create",
                        method: "POST"
                    },
                    update: {
                        url: crudServiceBaseUrl + "/taskboard/columns_update",
                        method: "POST"
                    },
                    destroy: {
                        url: crudServiceBaseUrl + "/taskboard/columns_destroy",
                        method: "POST"
                    }
                },
                schema: {
                    model: {
                        id: "ID",
                        fields: {
                            "ID": { type: "number" },
                            "Text": { type: "string" },
                            "Status": { type: "string", defaultValue: "todo" },
                            "Order": { type: "number" }
                        }
                    }
                }
            },
            dataCategoryField: "Category",
            dataDescriptionField: "Description",
            dataTitleField: "Title",
            dataStatusField: "Status",
            dataOrderField: "Order",
            dataSource: {
                transport: {
                    read: {
                        url: crudServiceBaseUrl + "/taskboard"
                    },
                    create: {
                        url: crudServiceBaseUrl + "/taskboard/create",
                        method: "POST"
                    },
                    update: {
                        url: crudServiceBaseUrl + "/taskboard/update",
                        method: "POST"
                    },
                    destroy: {
                        url: crudServiceBaseUrl + "/taskboard/destroy",
                        method: "POST"
                    }
                },
                schema: {
                    model: {
                        id: "ID",
                        fields: {
                            "ID": { type: "number" },
                            "Category": { type: "string", defaultValue: "lowpriority" },
                            "Description": { type: "string" },
                            "Title": { type: "string", validation: { required: true } },
                            "Status": { type: "string", defaultValue: "todo" },
                            "Order": { type: "number" }
                        }
                    }
                }
            },
            resources: [{
                field: "Category",
                title: "Priority",
                dataSource: priorities
            }],
            previewPane: {
                template: "<p>#:Description#</p>" +
                    "<p>#:resources.Category.title#: <span style='background-color: #:resources.Category.color#'>&nbsp;</span> #:resources.Category.text#</p>"
            },
            editable: {
                form: {
                    buttonsTemplate: "",
                    items: [{
                        field: "Title",
                        label: "Title:"
                    }, {
                        field: "Description",
                        label: "Description:"
                    }, {
                        field: "Category",
                        label: "Priority:",
                        editor: "DropDownList",
                        editorOptions: {
                            dataTextField: "text",
                            dataValueField: "value",
                            dataSource: priorities,
                            template: "<span style='background-color: #:color#'>&nbsp;</span> #:text#",
                            valueTemplate: "<span style='background-color: #:color#'>&nbsp;</span> #:text#"
                        }
                    }]
                }
            },
            height: 750
        });
    </script>
```

### Configuring the Data Source

The TaskBoard uses two different data source instances for its columns and cards.

> * Define the data operations in the `transport` configuration.
> * Define the `id` field of the data items in `schema.model.id`. This ensures correct adding, editing, and deleting of items.
> * Define the model fields.

For more information on the DataSource schema configuration, refer to [`schema.model`](/api/javascript/data/datasource/configuration/schema.model).

The following example demonstrates how to configure the data source of the columns.

    columns: {
        transport: {
            read: {
                url: "https://demos.telerik.com/kendo-ui/service/taskboard/columns"
            },
            create: {
                url: "https://demos.telerik.com/kendo-ui/service/taskboard/columns_create",
                method: "POST"
            },
            update: {
                url: "https://demos.telerik.com/kendo-ui/service/taskboard/columns_update",
                method: "POST"
            },
            destroy: {
                url: "https://demos.telerik.com/kendo-ui/service/taskboard/columns_destroy",
                method: "POST"
            }
        },
        schema: {
            model: {
                id: "ID",
                fields: {
                    "ID": { type: "number" },
                    "Text": { type: "string" },
                    "Status": { type: "string", defaultValue: "todo" },
                    "Order": { type: "number" }
                }
            }
        }
    }

The following example demonstrates how to configure the data source of the cards.

    dataSource: {
        transport: {
            read: {
                url: "https://demos.telerik.com/kendo-ui/service/taskboard"
            },
            create: {
                url: "https://demos.telerik.com/kendo-ui/service/taskboard/create",
                method: "POST"
            },
            update: {
                url: "https://demos.telerik.com/kendo-ui/service/taskboard/update",
                method: "POST"
            },
            destroy: {
                url: "https://demos.telerik.com/kendo-ui/service/taskboard/destroy",
                method: "POST"
            }
        },
        schema: {
            model: {
                id: "ID",
                fields: {
                    "ID": { type: "number" },
                    "Category": { type: "string", defaultValue: "lowpriority" },
                    "Description": { type: "string" },
                    "Title": { type: "string", validation: { required: true } },
                    "Status": { type: "string", defaultValue: "todo" },
                    "Order": { type: "number" }
                }
            }
        }
    }


### Setting the Editable Option

Editing is enabled by default, but the `editable` configuration exposes a number of customization options.

The following example demonstrates how to set the `editable` configuration.

    editable: {
        form: {
            buttonsTemplate: "",
            items: [{
                field: "Title",
                label: "Title:"
            }, {
                field: "Description",
                label: "Description:"
            }, {
                field: "Category",
                label: "Priority:",
                editor: "DropDownList",
                editorOptions: {
                    dataTextField: "text",
                    dataValueField: "value",
                    dataSource: priorities,
                    template: "<span style='background-color: #:color#'>&nbsp;</span> #:text#",
                    valueTemplate: "<span style='background-color: #:color#'>&nbsp;</span> #:text#"
                }
            }]
        }
    }

## See Also

* [Editing of the TaskBoard (Demo)](https://demos.telerik.com/kendo-ui/taskboard/editing)
* [JavaScript API Reference of the TaskBoard](/api/javascript/ui/taskboard)
