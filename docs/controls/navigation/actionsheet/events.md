---
title: Events
page_title: jQuery ActionSheet Documentation - Events
description: "Get started with the jQuery ActionSheet by Kendo UI and learn how to handle the events of the widget."
slug: events_actionsheet_widget
position: 3
---

# Events

The Kendo UI ActionSheet exposes events which provide easy configuration or extension points for custom functionality.

## Open

The `open` event fires when the ActionSheet is opened.

The following example demonstrates how you can subscribe to the `open` event of the widget:

```dojo
    <div id="actionsheet"></div>
    <button id="openActionSheetBttn">OPEN ACTION SHEET</button>
    <script>
        var actionsheet = $('#actionsheet').kendoActionSheet({
        title:'Select item',
        items:[
            {
              text: 'Edit Item',
              iconClass: 'k-icon k-i-edit',
              description: "Select to enter edit mode.",
              click: onClick
            },
            {
              text: 'Add to Favorites',
              iconClass: 'k-icon k-i-heart',
              click: onClick
            },
            {
              text: 'Cancel',
              iconClass: 'k-icon k-i-cancel',
              group: 'bottom',
              click: onClick
            },
        ],
        open: onOpen
        }).data('kendoActionSheet');

        function onClick(e) {
            e.preventDefault();
            actionsheet.close();
        }

        function onOpen() {
            console.log("Open fired!")
            // your custom logic here
        }

        $("#openActionSheetBttn").kendoButton({
            click: function (e) {
                actionsheet.open()
            }
        });
</script
```

## Close

The `close` event fires when the ActionSheet is closed.

The following example demonstrates how you can subscribe to the `open` event of the widget:

```dojo
    <div id="actionsheet"></div>
    <button id="openActionSheetBttn">OPEN ACTION SHEET</button>
    <script>
        var actionsheet = $('#actionsheet').kendoActionSheet({
        title:'Select item',
        items:[
            {
              text: 'Edit Item',
              iconClass: 'k-icon k-i-edit',
              description: "Select to enter edit mode.",
              click: onClick
            },
            {
              text: 'Add to Favorites',
              iconClass: 'k-icon k-i-heart',
              click: onClick
            },
            {
              text: 'Cancel',
              iconClass: 'k-icon k-i-cancel',
              group: 'bottom',
              click: onClick
            },
        ],
        close: onClose
        }).data('kendoActionSheet');

        function onClick(e) {
            e.preventDefault();
            actionsheet.close();
        }

        function onClose() {
            console.log("Close fired!")
            // your custom logic here
        }

        $("#openActionSheetBttn").kendoButton({
            click: function (e) {
                actionsheet.open()
            }
        });
</script
```

## See Also

* [JavaScript API Reference of the ActionSheet](/api/javascript/ui/actionsheet)
