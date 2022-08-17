---
title: Data Binding
page_title: Kendo UI for jQuery TaskBoard Documentation | TaskBoard Data Binding
description: "Get started with the Kendo UI for jQuery TaskBoard and bind the widget to local or remote data."
slug: databinding_kendoui_taskboard_widget
position: 2
---

# Data Binding

The TaskBoard provides options for binding it to [local arrays](#binding-to-local-data) and [remote data](#binding-to-remote-data).

## Binding to Local Data

The following example demonstrates how to bind a TaskBoard to a local data array.

```dojo
    <div id="taskBoard"></div>

    <script>
      var cardsData = [
        { id: 1, title: "Campaigns", order: 1, description: "Create a new landing page for campaign", status: "todo", color: "orange" },
        { id: 2, title: "Newsletters", order: 2, description: "Send newsletter", status: "todo", color: "blue" },
        { id: 3, title: "Ads Analytics", order: 3, description: "Review ads performance", status: "todo", color: "green" },
        { id: 4, title: "SEO Analytics", order: 4, description: "Review SEO results", status: "inProgress", color: "blue" },
        { id: 5, title: "Customer Research", order: 5, description: "Interview focus groups", status: "inProgress", color: "orange" },
        { id: 6, title: "Testimonials & Case Studies", order: 6, description: "Publish new case study", status: "done", color: "green" },
        { id: 7, title: "Content", order: 7, description: "Plan content for podcasts", status: "done", color: "green" },
        { id: 8, title: "Customer Journey", order: 8, description: "Update virtual classrooms' experience", status: "done", color: "blue" },
      ];

      $("#taskBoard").kendoTaskBoard({
        columns: [
          { text: "To-Do", status: "todo" },
          { text: "In Progress", status: "inProgress" },
          { text: "Done", status: "done" }
        ],
        dataSource: {
          transport: {
            read: function(options){
              options.success(cardsData);
            },
            update: function(options){
              options.success(options.data);
            },
            create: function(options){
              options.success($.extend({}, options.data, {
                id: getUniqueId()
              }));
            },
            destroy: function(options){
              options.success();
            },
          },
          schema: {
            model: {
              id: "id",
              fields: {
                id: { type: "number" },
                order: { type: "number", defaultValue: 0 },
                title: { field: "title", defaultValue: "No title" },
                description: { field: "description", validation: { required: true } },
              }
            }
          }
        },
        dataStatusField: "status",
        dataOrderField: "order",
        dataCategoryField: "color",
        height: 750,
        resources: [
          {
            field: "color",
            dataSource: [
              { value: "orange", color: "#ffa500" },
              { value: "green", color: "#008000" },
              { value: "blue", color: "#0000ff" }
            ]
          }
        ]
      });

      function getUniqueId() {
        var taskboard = $("#taskBoard").data("kendoTaskBoard");
        // return next unique id
        return taskboard.dataSource.total() + 1;
      }
    </script>
```

## Binding to Remote Data

You can also bind the TaskBoard to remote data. Remote data binding enables the retrieval of data from the server. For more information, refer to the article on [using the Kendo UI DataSource]({% slug basicusage_kendoui_datasourcecomponent %}).

The following example demonstrates how to enable remote binding for the TaskBoard by setting the DataSource `transport` configuration.

```dojo

     <div id="taskBoard"></div>

    <script>
        var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service";

        $("#taskBoard").kendoTaskBoard({
            columnSettings: {
                dataTextField: "Text",
                dataStatusField: "Status",
                dataOrderField: "Order",

            },
            columns: {
                transport: {
                    read: {
                        url: crudServiceBaseUrl + "/taskboard/columns"
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
                    update: { // Update operation is required in order for cards to be moved across columns
                        url: crudServiceBaseUrl + "/taskboard/update",
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
                dataSource: [
                    { value: "urgent", text: "Urgent", color: "orange" },
                    { value: "highpriority", text: "High Priority", color: "blue" },
                    { value: "lowpriority", text: "Low Priority", color: "green" }
                ]
            }],
            editable: false,
            cardMenu: false,
            height: 750
        });
    </script>
```

## See Also

* [Local Data Binding in the TaskBoard (Demo)](https://demos.telerik.com/kendo-ui/taskboard/local-data-binding)
* [Remote Data Binding in the TaskBoard (Demo)](https://demos.telerik.com/kendo-ui/taskboard/remote-data-binding)
* [TaskBoard JavaScript API Reference](/api/javascript/ui/taskboard)
