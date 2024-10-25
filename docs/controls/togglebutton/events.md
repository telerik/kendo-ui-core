---
title: Events
page_title: Events
description: "Learn how to handle the events of the Kendo UI ToggleButton component for jQuery."
slug: events_kendoui_togglebutton
position: 7
---

# Events

The ToggleButton exposes a [`toggle`](https://docs.telerik.com/kendo-ui/api/javascript/ui/togglebutton/events/toggle) event that you can handle when the selected state is altered. 

For a complete example on basic ToggleButton events, refer to the [demo on using the events of the ToggleButton](https://demos.telerik.com/kendo-ui/togglebutton/events).


The following example demonstrates how to subscribe to the `toggle` event.

```dojo
    <button id="togglebutton">
        Toggle Button
    </button>

    <script>
        $(document).ready(function(){
            $("#togglebutton").kendoToggleButton({
                group: "toggleGroup",
                toggle: onToggle
            });
        })

        function onToggle(e) {
            console.log(e.target.text() + " 'toggle' event is fired."  + " Checked State:" + e.checked + " Group:" + e.group);
        }
    </script>
```

## Next Steps

* [Using the ToggleButton Events (Demo)](https://demos.telerik.com/kendo-ui/togglebutton/events)

## See Also

* [Using the API of the ToggleButton widget for Kendo UI for jQuery (Demo)](https://demos.telerik.com/kendo-ui/togglebutton/api)
* [ToggleButton Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/togglebutton)