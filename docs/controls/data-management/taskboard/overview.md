---
title: Overview
page_title: Kendo UI for jQuery TaskBoard Documentation - TaskBoard Overview
description: "Get started with the Kendo UI for jQuery TaskBoard and learn about its features and how to initialize the widget."
slug: overview_kendoui_taskboard_widget
position: 1
---

# {{ site.product }} TaskBoard Overview

The Kendo UI TaskBoard allows you to easily organize items and keep track of their state. The TaskBoard provides a clean and user-friendly interface and enables you to manage tasks, notes, projects, people, or other kinds of items. The component displays columns (lanes), which can represent different types of project/task statuses. Tasks are visualized as cards, which are easily customizable through templates. You can reorder cards within the columns, or drag and drop them onto another column.

* [TaskBoard demos](https://demos.telerik.com/kendo-ui/taskboard/index) 

## Initializing the TaskBoard

The following example demonstrates how to initialize the TaskBoard from an existing `<div>` element. 

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
                data: cardsData,
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
    </script>
```

## Functionality and Features

* [Data Binding]({% slug databinding_kendoui_taskboard_widget %})
* [Cards]({% slug cards_kendoui_taskboard_widget %})
* [Columns]({% slug columns_kendoui_taskboard_widget %})
* [Editing]({% slug editing_kendoui_taskboard_widget %})
* [Resources]({% slug resources_kendoui_taskboard_widget %})
* [Search]({% slug search_kendoui_taskboard_widget %})
* [Templates]({% slug templates_kendoui_taskboard_widget %})
* [Toolbar]({% slug toolbar_kendoui_taskboard_widget %})
* [Accessibility]({% slug accessibility_kendoui_taskboard_widget %})

## Referencing Existing Instances

To get a reference to an existing TaskBoard instance:

1. Use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) method.
1. Once a reference is established, use the [TaskBoard API](/api/javascript/ui/taskboard) to control its behavior.

        var taskBoard = $("#taskBoard").data("kendoTaskBoard");

## See Also

* [Basic Usage of the TaskBoard (Demo)](https://demos.telerik.com/kendo-ui/taskboard/index)
* [Kendo UI TaskBoard Columns]({% slug columns_kendoui_taskboard_widget %})
* [Kendo UI TaskBoard Cards]({% slug cards_kendoui_taskboard_widget %})
* [JavaScript API Reference of the TaskBoard](/api/javascript/ui/taskboard)
