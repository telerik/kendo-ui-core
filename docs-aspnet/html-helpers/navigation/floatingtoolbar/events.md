---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI FloatingToolBar component for {{ site.framework }}."
components: ["floatingtoolbar"]
slug: floatingtoolbar_events
position: 5
---

# Events

The FloatingToolBar for {{ site.framework }} exposes events for changes in its visibility, for its movement, and for keyboard handling.

The FloatingToolBar supports the following events:

* `Show`&mdash;Fires before the toolbar becomes visible. Call `e.preventDefault()` to keep it hidden.
* `Hide`&mdash;Fires before the toolbar becomes hidden. Call `e.preventDefault()` to keep it visible.
* `DragStart`&mdash;Fires when the user starts a pointer drag or enters the keyboard Move mode. Call `e.preventDefault()` to cancel the movement.
* `Move`&mdash;Fires when the position of the toolbar changes through dragging, the keyboard Move mode, or the `setPosition()` method.
* `DragEnd`&mdash;Fires when a pointer drag or the keyboard Move mode ends.
* `KendoKeydown`&mdash;Fires when the user presses a key while the toolbar is focused.

The `DragStart` and `DragEnd` events fire only when the `Draggable()` option is enabled. The `Move` event also fires when you call the `setPosition()` client-side method. The data of these events contains the `top` and `left` coordinates of the toolbar.

The following example demonstrates how to subscribe to the FloatingToolBar events.

```HtmlHelper
    @(Html.Kendo().FloatingToolBar()
        .Name("floatingtoolbar")
        .Visible(true)
        .Draggable(true)
        .Events(events => events
            .Show("onShow")
            .Hide("onHide")
            .DragStart("onDragStart")
            .Move("onMove")
            .DragEnd("onDragEnd"))
        .Items(items =>
        {
            items.Add().Type(CommandType.Button).Text("Save").Icon("save");
            items.Add().Type(CommandType.Button).Text("Print").Icon("print");
        })
    )

    <script>
        function onShow(e) {
            console.log("The toolbar is shown.");
        }

        function onHide(e) {
            console.log("The toolbar is hidden.");
        }

        function onDragStart(e) {
            console.log("Movement started at: " + e.top + ", " + e.left);
        }

        function onMove(e) {
            console.log("Current position: " + e.top + ", " + e.left);
        }

        function onDragEnd(e) {
            console.log("Movement ended at: " + e.top + ", " + e.left);
        }
    </script>
```
{% if site.core %}
```TagHelper
    <kendo-floatingtoolbar name="floatingtoolbar" visible="true" draggable="true"
                           on-show="onShow"
                           on-hide="onHide"
                           on-drag-start="onDragStart"
                           on-move="onMove"
                           on-drag-end="onDragEnd">
        <floatingtoolbar-items>
            <item type="CommandType.Button" text="Save" icon="save" />
            <item type="CommandType.Button" text="Print" icon="print" />
        </floatingtoolbar-items>
    </kendo-floatingtoolbar>

    <script>
        function onShow(e) {
            console.log("The toolbar is shown.");
        }

        function onHide(e) {
            console.log("The toolbar is hidden.");
        }

        function onDragStart(e) {
            console.log("Movement started at: " + e.top + ", " + e.left);
        }

        function onMove(e) {
            console.log("Current position: " + e.top + ", " + e.left);
        }

        function onDragEnd(e) {
            console.log("Movement ended at: " + e.top + ", " + e.left);
        }
    </script>
```
{% endif %}

## Next Steps

* [Accessibility of the FloatingToolBar]({% slug htmlhelpers_floatingtoolbar_accessibility %})
* [Keyboard Navigation of the FloatingToolBar]({% slug keynav_aspnetcore_floatingtoolbar %})

## See Also

* [FloatingToolBar Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/floatingtoolbar)
