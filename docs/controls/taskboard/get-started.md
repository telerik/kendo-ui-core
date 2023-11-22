---
title: Getting Started
page_title: jQuery TaskBoard Documentation - Getting Started with the TaskBoard
description: "Get started with the jQuery TaskBoard by Kendo UI and learn how to create and initialize the component."
slug: getting_started_kendoui_taskboard_widget
position: 2
---


# Getting Started with the TaskBoard 

This guide demonstrates how to get up and running with the Kendo UI for jQuery TaskBoard.

After the completion of this guide, you will achieve the following end result:

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
            height: 750
        });
    </script>
```

## 1. Create a div Element

First, create a `<div>` element on the page that will be used to initialize the component. The content of the `<div>` will be the content of the TaskBoard.

```html
    <div id="taskBoard"></div>
```

## 2. Initialize the TaskBoard

In this step, you will initialize the TaskBoard from the `<div>` element.

```html
    <div id="taskBoard"></div>

    <script>
        $("#taskBoard").kendoTaskBoard();
    </script>
```

## 3. Specify the Data Source

Here, you will specify the [`dataSource`](/api/javascript/ui/taskboard/configuration/datasource) of the TaskBoard and pass some local data.

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
        });
    </script>
```

## 4. Set the Desired Columns

In this step, you will specify the [`columns`](/api/javascript/ui/taskboard/configuration/columns) of the TaskBoard.

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
        });
    </script>
```

## 5. Specify Fields for Status, Order and Category of the Card

Here, you will specify [`dataStatusField`](/api/javascript/ui/taskboard/configuration/datastatusfield), [`dataOrderField`](/api/javascript/ui/taskboard/configuration/dataorderfield), and [`dataCategoryField`](/api/javascript/ui/taskboard/configuration/dataCategoryField) properties.

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
            dataStatusField: "status", // The field of the data item that provides the status of the card.
            dataOrderField: "order", // The field used to order cards (number based).
            dataCategoryField: "color", // The category field of the card.
            height: 750
        });
    </script>
```

## Next Steps

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %})
* [Demo Page for the TaskBoard](https://demos.telerik.com/kendo-ui/taskboard/index)

## See Also 

* [JavaScript API Reference of the TaskBoard](/api/javascript/ui/taskboard)
* [Knowledge Base Section](/knowledge-base)

<script>
  window.onload = function() {
    document.getElementsByClassName("btn-run")[0].click();
  }
</script>
