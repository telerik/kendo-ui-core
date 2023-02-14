---
title: Events
page_title: jQuery Popover Documentation - Popover Events
description: "Learn how to use Popover events"
slug: events_kendoui_popover_widget
position: 3
---

# Events

The Kendo UI Popover exposes the [`show`](/api/javascript/ui/popover/events/show) and [`hide`](/api/javascript/ui/popover/events/hide) events which also provide extension points for customization on top of the built-in features.

* [Demo page for the Popover Events](https://demos.telerik.com/kendo-ui/popover/events)

## Showing the Popover

You can subscribe to the `show` event which fires when a Popover is shown to create a custom logic.

The following example demonstrates how to subscribe to the `show` event during initialization.

```dojo
    <span id="target">
      Some content
    </span>

    <script>
      $(document).ready(function() {
        $("#target").kendoPopover({
          template: "Content",
          show: function() {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("popover is shown");
          }
        });

      });
    </script>
```

The following example demonstrates how to subscribe to the `show` event after initialization.

```dojo
    <span id="target">
      Some content
    </span>

    <script>
      $(document).ready(function() {
        var popover = $("#target").kendoPopover({
          template: "Content",
        }).data("kendoPopover");

        popover.bind("show", function() {
	/* The result can be observed in the DevTools(F12) console of the browser. */
          console.log("popover is shown");
        });
      });
    </script>
```

## Hiding the Popover

You can subscribe to the `hide` event which fires when a Popover is hidden to create customization.

The following example demonstrates how to subscribe to the `hide` event during initialization.

```dojo
    <span id="target">
      Some content
    </span>

    <script>
      $(document).ready(function() {
        $("#target").kendoPopover({
          template: "Content",
          hide: function() {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("popover is hidden!");
          }
        });

      });
    </script>
    </script>
```

The following example demonstrates how to subscribe to the `hide` event after initialization.

```dojo
    <span id="target">
      Some content
    </span>

    <script>
      $(document).ready(function() {
        var popover = $("#target").kendoPopover({ template: "Content" }).data("kendoPopover");

        popover.bind("hide", function() {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("popover is hidden!");
        });
      });
    </script>
```


## See Also

* [Basic Usage of the Popover (Demo)](https://demos.telerik.com/kendo-ui/popover/index)
* [Using the API of the Popover (Demo)](https://demos.telerik.com/kendo-ui/popover/api)
* [JavaScript API Reference of the Popover](/api/javascript/ui/popover)
