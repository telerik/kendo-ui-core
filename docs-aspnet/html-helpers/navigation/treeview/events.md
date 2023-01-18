---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI TreeView component for {{ site.framework }}."
slug: events_treeview_aspnetcore
position: 7
---

# Events

The Telerik UI TreeView for {{ site.framework }} exposes multiple [events](/api/Kendo.Mvc.UI.Fluent/TreeViewEventBuilder) that allow you to control and customize the behavior of the UI component.

For a complete example on basic TreeView events, refer to the [demo on using the events of the TreeView](https://demos.telerik.com/{{ site.platform }}/treeview/events).

## Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```HtmlHelper
    @(Html.Kendo().TreeView()
            .Name("treeview")
            .Checkboxes(true)
            .DragAndDrop(true)
            .LoadOnDemand(false)
            .Events(events => events
                .Change("onChange")
                .Select("onSelect")
                .Check("onCheck")
                .Collapse("onCollapse")
                .Expand("onExpand")
                .DragStart("onDragStart")
                .Drag("onDrag")
                .Drop("onDrop")
                .DragEnd("onDragEnd")
                .Navigate("onNavigate")
                .LoadCompleted("onLoadCompleted")
            )
            .DataTextField("Name")
            .DataSource(dataSource => dataSource
                .Read(read => read
                    .Action("Employees", "treeview")
                )
            )
        )

    <script type="text/javascript">
            function onChange(e) {
            console.log('Selected node changed to:', e.sender.select());
        }

        function onSelect(e) {
            console.log('Selected node:', e.node);
        }

        function onCheck(e) {
            console.log('Checked node:', e.node);
        }

        function onCollapse(e) {
            console.log('Collapsed node:', e.node);
        }

        function onExpand(e) {
            console.log('Expanded node:', e.node);
        }

        function onDragStart(e) {
            console.log('Started dragging:', e.sourceNode);
        }

        function onDrag(e) {
            console.log("Dragging:", e.sourceNode);
        }

        function onDragEnd(e) {
            console.log("Finished dragging:", e.sourceNode);
        }

        function onDrop(e) {
            console.log("Dropped:", e.sourceNode);
        }

        function onLoadCompleted(e) {
            console.log("Load Completed: ", Array.prototype.map.call(e.nodes, function (item) { return item.Name; }).join(", "));
        }
    </script>
```
{% if site.core %}
```TagHelper
    <kendo-treeview auto-bind="true" drag-and-drop="true" load-on-demand="false" datatextfield="Name" name="treeview" on-change="onChange" on-select="onSelect" on-check="onCheck" on-collapse="onCollapse" on-expand="onExpand" on-dragstart="onDragStart" on-drag="onDrag" on-drop="onDrop" on-dragend="onDragEnd" on-navigate="onNavigate" on-load-completed="onLoadCompleted">
        <hierarchical-datasource>
            <schema>
                <hierarchical-model id="id"></hierarchical-model>
            </schema>
            <transport>
                <read url="@Url.Action("Employees", "treeview")" cache="true" />
            </transport>
        </hierarchical-datasource>
        <checkboxes enabled="true" />
    </kendo-treeview>

    <script type="text/javascript">
        function onChange(e) {
            console.log('Selected node changed to:', e.sender.select());
        }

        function onSelect(e) {
            console.log('Selected node:', e.node);
        }

        function onCheck(e) {
            console.log('Checked node:', e.node);
        }

        function onCollapse(e) {
            console.log('Collapsed node:', e.node);
        }

        function onExpand(e) {
            console.log('Expanded node:', e.node);
        }

        function onDragStart(e) {
            console.log('Started dragging:', e.sourceNode);
        }

        function onDrag(e) {
            console.log("Dragging:", e.sourceNode);
        }

        function onDragEnd(e) {
            console.log("Finished dragging:", e.sourceNode);
        }

        function onDrop(e) {
            console.log("Dropped:", e.sourceNode);
        }

        function onLoadCompleted(e) {
            console.log("Load Completed: ", Array.prototype.map.call(e.nodes, function (item) { return item.Name; }).join(", "));
        }
    </script>
```
{% endif %}

## Next Steps

* [Using the TreeView Events (Demo)](https://demos.telerik.com/{{ site.platform }}/treeview/events)

## See Also

* [Using the API of the TreeView HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/treeview/api)
* [TreeView Server-Side API](/api/treeview)
* [TreeView Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/treeview)
