---
title: Custom Key Handling
page_title: jQuery ImageEditor Documentation - Custom Key Handling
description: "Learn how to customize the key handling of the jQuery ImageEditor by Kendo UI using the kendoKeydown event."
components: ["imageeditor"]
slug: custom_keynav_imageeditor_kendoui
position: 3
---

# Custom Key Handling

The ImageEditor exposes a `kendoKeydown` event that lets you intercept keyboard interactions before the component's built-in behavior runs.

For the list of all components that support `kendoKeydown`, refer to [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %}).

## How It Works

When the ImageEditor is focused and the user presses a key, the `kendoKeydown` event fires. The event argument (`e`) exposes:

* `e.sender` — the ImageEditor instance.
* `e.keyCode` — the code of the pressed key.
* `e.preventKendoKeydown` — set to `true` to prevent the ImageEditor from running its own handler for this key press.

## Overriding a Built-In Key Combination

The ImageEditor uses `Escape` to close dialogs. The following example replaces `Escape` with `Q`.

```dojo
    <div id="imageeditor"></div>
    <script>
    $("#imageeditor").kendoImageEditor({
        kendoKeydown: function(e) {
            if (e.keyCode === kendo.keys.ESC) {
                e.preventKendoKeydown = true;
            }

            if (e.keyCode === 81) {
                e.preventKendoKeydown = true;
                console.log("Custom close action");
            }
        }
    });
    </script>
```

## Adding a Custom Key Combination

The following example adds a `Ctrl+Z` shortcut to undo.

```dojo
    <div id="imageeditor"></div>
    <script>
    $("#imageeditor").kendoImageEditor({
        kendoKeydown: function(e) {
            if (e.ctrlKey && e.keyCode === 90) {
                e.sender.executeCommand({ command: "UndoImageEditorCommand" });
            }
        }
    });
    </script>
```

## Built-In Keyboard Shortcuts

For the full list of built-in keyboard shortcuts, see the [ImageEditor Keyboard Navigation Demo](https://demos.telerik.com/kendo-ui/imageeditor/keyboard-navigation) and the [Keyboard Navigation article]({% slug keynav_kendoui_imageeditor_widget %}).

## See Also

* [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %})
* [Keyboard Navigation by the ImageEditor]({% slug keynav_kendoui_imageeditor_widget %})
* [Accessibility in the ImageEditor]({% slug jquery_imageeditor_accessibility %})
