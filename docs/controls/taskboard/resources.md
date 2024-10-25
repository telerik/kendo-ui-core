---
title: Resources
page_title: Kendo UI for jQuery TaskBoard Documentation - Resources
description: "Get started with the Kendo UI for jQuery TaskBoard and learn how to configure its resources."
slug: resources_kendoui_taskboard_widget
position: 8
---

# Resources

A TaskBoard resource is optional metadata that can be associated with a card. The TaskBoard supports single instance and multiple instance resources.

## Single Instance Resources

A single instance resource is a resource of which only one instance can be assigned to a TaskBoard card, for example, a TaskBoard which displays tasks with different priority. Each card can have a single priority.

The following example demonstrates how to use a single instance resource. 

```dojo
    <div id="taskBoard"></div>

    <script>
        $("#taskBoard").kendoTaskBoard({
            resources: [{
                field: "category",
                dataColorField: "Color",
                dataTextField: "Text",
                dataValueField: "Value",
                dataSource: [
                    { Value: "urgent", Text: "Urgent", Color: "orange" },
                    { Value: "highpriority", Text: "High Priority", Color: "blue" },
                    { Value: "lowpriority", Text: "Low Priority", Color: "green" }
                ]
            }],
            dataSource: [
                { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "urgent" },
                { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "urgent" },
                { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "highpriority" },
                { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "lowpriority" },
                { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "lowpriority" }
            ],
            columns: [
                { text: "Doing", status: "doing" },
                { text: "Backlog", status: "backlog" },
                { text: "Done", status: "done" }
            ]
        });
    </script>
```

## Multiple Instance Resources

A multiple instance resource is a resource of which more than one instance can be assigned to a TaskBoard card, for example, a TaskBoard which displays a list of issues. Each issue can have different tags at the same time, for example, `bug`, `client-side`, `high severity`.

The following example demonstrates how to use a multiple instance resource. 

```dojo
    <div id="taskBoard"></div>

    <script id="card-template" type="text/x-kendo-template">
        <div class="template-container">
            <div class="template-header">
                <p><a class="k-card-title k-link" href="" data-command="SelectCardCommand">#: title #</a></p>
            </div>
            <p>#:description#</p>
            <p>Tags: # for (var i = 0; i < resources.tags.length; i++) { #
            <span style="color: #:resources.tags[i].color#">#:resources.tags[i].text#</span>
            # } # </p>
        </div>
    </script>

    <script>
        $("#taskBoard").kendoTaskBoard({
            resources: [{
                field: "tags",
                multiple: true,
                dataSource: [
                    { value: "bug", text: "Bug", color: "gray" },
                    { value: "feature", text: "Feature", color: "orange" },
                    { value: "client-side", text: "Client-side", color: "blue" },
                    { value: "server-side", text: "Server-side", color: "green" }
                ]
            }],
            template: $("#card-template").html(),
            dataSource: [
                { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", tags: [ "bug", "client-side" ] },
                { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", tags: [ "feature", "client-side" ] },
                { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", tags: [ "feature", "server-side" ] },
                { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", tags: [ "chore", "client-side" ] },
                { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", tags: [ "chore", "server-side" ] }
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

* [Overview Kendo UI TaskBoard (Demo)](https://demos.telerik.com/kendo-ui/taskboard/index)
* [JavaScript API Reference of the Kendo UI TaskBoard](/api/javascript/ui/taskboard)
