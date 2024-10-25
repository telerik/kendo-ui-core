---
title: Templates
page_title: Kendo UI for jQuery TaskBoard Documentation - Templates
description: "Get started with the Kendo UI for jQuery TaskBoard and learn how to customize its templates."
slug: templates_kendoui_taskboard_widget
position: 9
---

# Templates

The TaskBoard provides full control over the rendering of columns, cards, and popup headers by using [Kendo UI templates]({% slug overview_kendoui_templatescomponent %}).

The TaskBoard supports the following templates:

* [Card template](#card-template)
* [Column template](#column-template)
* [Editable header template](#editable-header-template)
* [Preview pane template](#preview-pane-template)
* [Preview pane header template](#preview-pane-header-template)

For a complete example, refer to the [Templates demo of the TaskBoard](https://demos.telerik.com/kendo-ui/taskboard/templates).

## Card Template

The card template controls the rendering of the cards.

```dojo
    <script id="card-template" type="text/x-kendo-template">
        #:title# #=cardMenuButton#
        #:description#  
    </script> 

    <script> 
        $("#taskBoard").kendoTaskBoard({ 
            template: $("#card-template").html(), 
            dataOrderField: "order", 
            dataSource: [ 
                { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" }, 
                { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" }, 
                { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" }, 
                { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" }, 
                { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
            ], 
            columns: [ 
                { text: "Doing", status: "doing" }, 
                { text: "Backlog", status: "backlog" }, 
                { text: "Done", status: "done" } 
            ] 
        }); 
    </script>
```

## Column Template

The column template controls the rendering of the column header. In the template context the `buttons` field provides the HTML for the buttons of the column.

```dojo
    <div id="taskBoard"></div>

    <script>
        $("#taskBoard").kendoTaskBoard({
            dataOrderField: "order",
            dataSource: [
                { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
                { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
                { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
                { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
                { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
            ],
            columns: [
                { text: "Doing", status: "doing" },
                { text: "Backlog", status: "backlog" },
                { text: "Done", status: "done" }
            ],
            columnSettings: {
                template: '<div class="k-taskboard-column-header-actions" style="background-color: lightgray">#=buttons#</div>' + 
                            '<span class="k-spacer"></span>' + 
                            '<div class="k-taskboard-column-header-text k-text-ellipsis">#:text#(#:status#)</div>'
            }
        });
    </script>
```

## Editable Header Template

The editable header template controls the rendering of the header.

```dojo
    <div id="taskBoard"></div>

    <script>
        $("#taskBoard").kendoTaskBoard({
            dataOrderField: "order",
            dataSource: [
                { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
                { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
                { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
                { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
                { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
            ],
            columns: [
                { text: "Doing", status: "doing" },
                { text: "Backlog", status: "backlog" },
                { text: "Done", status: "done" }
            ],
            editable: {
                headerTemplate: "<div class='k-taskboard-pane-header-text'>Editing <strong>#:title#</strong></div>"
            }
        });
    </script>
```

## Preview Pane Template

The preview pane template controls the rendering of the preview pane.

```dojo
    <div id="taskBoard"></div>

    <script>
        $("#taskBoard").kendoTaskBoard({
            previewPane: {
                template: "<p>#:description#</p><p>Category: #:category#</p>"
            },
            dataOrderField: "order",
            dataSource: [
                { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
                { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
                { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
                { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
                { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
            ],
            columns: [
                { text: "Doing", status: "doing" },
                { text: "Backlog", status: "backlog" },
                { text: "Done", status: "done" }
                ]
        });
    </script>
```

## Preview Pane Header Template

The preview pane header template controls the rendering of the header of the preview pane.

```dojo
    <div id="taskBoard"></div>

    <script>
        $("#taskBoard").kendoTaskBoard({
            previewPane: {
                headerTemplate: "<div class='k-taskboard-pane-header-text'>Viewing <strong>#:title#</strong></div>"
            },
            dataOrderField: "order",
            dataSource: [
                { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
                { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
                { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
                { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
                { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
            ],
            columns: [
                { text: "Doing", status: "doing" },
                { text: "Backlog", status: "backlog" },
                { text: "Done", status: "done" }
            ]
        });
    </script>
```

## See Also

* [TaskBoard Templates (Demo)](https://demos.telerik.com/kendo-ui/taskboard/templates)
* [JavaScript API Reference of the TaskBoard](/api/javascript/ui/taskboard)
