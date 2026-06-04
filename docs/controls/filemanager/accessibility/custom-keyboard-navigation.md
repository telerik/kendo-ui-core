---
title: Custom Key Handling
page_title: jQuery FileManager Documentation - Custom Key Handling
description: "Learn how to customize the key handling of the jQuery FileManager by Kendo UI using the kendoKeydown event."
components: ["filemanager"]
slug: custom_keynav_filemanager_kendoui
position: 3
---

# Custom Key Handling

The FileManager exposes a `kendoKeydown` event that lets you intercept keyboard interactions before the component's built-in behavior runs.

For the list of all components that support `kendoKeydown`, refer to [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %}).

## How It Works

When a focused FileManager pane or item receives keyboard input, the `kendoKeydown` event fires before the FileManager runs its own keyboard handler. The event argument (`e`) exposes:

* `e.sender` — the FileManager instance.
* `e.keyCode` — the code of the pressed key.
* `e.preventKendoKeydown` — set to `true` to prevent the FileManager from running its own keyboard handler for this key press.

## Overriding a Built-In Key Combination

The FileManager uses `Arrow` keys to navigate files and folders. The following example replaces `Arrow Up` and `Arrow Down` with `U` and `D`.

```dojo
    <div id="filemanager"></div>
    <script>
    $("#filemanager").kendoFileManager({
        dataSource: {
            transport: {
                read: function(options) {
                    options.success([
                        { name: "Documents", isDirectory: true },
                        { name: "report.pdf", isDirectory: false, size: 1024 }
                    ]);
                }
            }
        },
        kendoKeydown: function(e) {
            var keys = kendo.keys;

            if (e.keyCode === keys.UP || e.keyCode === keys.DOWN) {
                e.preventKendoKeydown = true;
            }

            var focused = $(document.activeElement);
            if (e.keyCode === 85) {
                e.preventKendoKeydown = true;
                focused.prev().trigger("focus");
            }
            if (e.keyCode === 68) {
                e.preventKendoKeydown = true;
                focused.next().trigger("focus");
            }
        }
    });
    </script>
```

## Adding a Custom Key Combination

The following example adds an `I` key shortcut that logs the selected file name.

```dojo
    <div id="filemanager"></div>
    <script>
    $("#filemanager").kendoFileManager({
        dataSource: {
            transport: {
                read: function(options) {
                    options.success([
                        { name: "Documents", isDirectory: true },
                        { name: "report.pdf", isDirectory: false, size: 1024 }
                    ]);
                }
            }
        },
        kendoKeydown: function(e) {
            if (e.keyCode === 73) {
                var selected = e.sender.getSelected();
                if (selected.length) {
                    console.log("Selected:", selected[0].name);
                }
            }
        }
    });
    </script>
```

## Built-In Keyboard Shortcuts

For the full list of built-in keyboard shortcuts, see the [FileManager Keyboard Navigation Demo](https://demos.telerik.com/kendo-ui/filemanager/keyboard-navigation) and the [Keyboard Navigation article]({% slug keynav_kendoui_filemanager_widget %}).

## See Also

* [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %})
* [Keyboard Navigation by the FileManager]({% slug keynav_kendoui_filemanager_widget %})
* [Accessibility in the FileManager]({% slug jquery_filemanager_accessibility %})
