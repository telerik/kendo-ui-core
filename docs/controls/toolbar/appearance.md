---
title: Appearance
page_title: jQuery ToolBar Documentation - Appearance
description: "Get started with the jQuery ToolBar by Kendo UI and control its appearance."
slug: appearance_kendoui_toolbar
position: 5
---

# Appearance

The ToolBar provides predefined appearance options such as different sizes and settings to control its overflow behavior.

For a complete example, refer to the [Appearance Demo of the ToolBar](https://demos.telerik.com/kendo-ui/toolbar/appearance).

## Options

The Kendo UI ToolBar supports the following styling options:

- [`Resizing Options`](#resizing-options)—Configures the resizing capabilities of the component.
- [`Appearance Options`](#appearance-options)—Configures the overall size of the component.
- [`Overflow Options`](#overflow-options)—Configures the overflow functionality of the component.

### Resizing Options

By design, the ToolBar detects changes in the viewport width and hides the overflowing controls in the command overflow popup. This feature may be disabled by setting `resizable` option to `false`. You are able to control the way a given command behaves on resizing with its `overflow` property.

> * Declare commands with `overflow: "never"` first followed by those with `overflow: "auto"`. Declare commands with `overflow: "always"` last.
> * Setting the minimum width of the ToolBar element is mandatory for preventing the ToolBar from resizing below a given width.

The following example demonstrates how to use the `overflow` property.

```dojo
    <div id="toolbar" style="min-width: 240px;"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
                { overflow: "never", type: "button", text: "Never" },
                { overflow: "auto", type: "button", text: "Auto 1" },
                { overflow: "auto", type: "button", text: "Auto 2" },
                { overflow: "always", type: "button", text: "Always" }
            ]
        });
    </script>
```

### Appearance Options

To Kendo UI ToolBar exposes a `size` property that controlls the size of the component. The supported values are:

- `small`
- `medium` (default)
- `large`
- `none`

The following example demonstrates how to set `size` of the toolbar to `small`.

```dojo
<div id="toolbar" style="min-width: 240px;"></div>
    <script>
      $("#toolbar").kendoToolBar({
        size: "small",
        items: [
          { overflow: "never", type: "button", text: "Never" },
          { overflow: "auto", type: "button", text: "Auto 1" },
          { overflow: "auto", type: "button", text: "Auto 2" },
          { overflow: "always", type: "button", text: "Always" }
        ]
      });
    </script>
```

### Overflow Options

The ToolBar and its [`overflow`](/api/javascript/ui/toolbar/configuration/items.overflow) configuration provide the following methods for styling:

- [`mode`](#Mode)—Defines the overflow mode. 
- [`scrollButtons`](#ScrollButtons)—Defines the visibility of scroll buttons when mode is "scroll".
- [`scrollButtonsPosition`](#ScrollButtonsPosition)—Defines the placement of scroll buttons.
- [`scrollDistance`](#ScrollDistance)—Specifies the distance (in pixels) the toolbar scrolls when a scroll button is clicked.

#### Mode

The `mode` setting defines the overflow mode. The available options are:

- `menu`—Moves overflowing items into a dropdown menu. 
- `scroll`—Keeps items visible and enables horizontal scrolling. 
- `section`—Groups items into collapsible sections. 
- `none`—Disables overflow handling and items may be cut off.

The following example demonstrates how to set `scroll` overflow mode.

```dojo
    <div id="toolbar"></div>
    <script>
      $("#toolbar").kendoToolBar({
        overflow: {
          mode: "scroll"
        },
        items: [
          {
            template: "<img alt='Kendo UI for jQuery ToolBar User' src='https://demos.telerik.com/kendo-ui/content/web/toolbar/user.png' class='user-image' />",
            overflow: "never"
          },
          { type: "button", text: "Send", overflow: "never" },
          { type: "button", text: "Discard", overflow: "never" },
          { type: "separator" },
          {
            type: "splitButton",
            imageUrl: "https://demos.telerik.com/kendo-ui/content/web/toolbar/save.png",
            text: "Save",
            menuButtons: [
              { imageUrl: "https://demos.telerik.com/kendo-ui/content/web/toolbar/save.png", text: "Save as" },
              { imageUrl: "https://demos.telerik.com/kendo-ui/content/web/toolbar/upload.png", text: "Upload to drive" }
            ],
            overflow: "never"
          },
          {
            type: "splitButton",
            imageUrl: "https://demos.telerik.com/kendo-ui/content/web/toolbar/reply.png",
            text: "Reply",
            menuButtons: [
              { imageUrl: "https://demos.telerik.com/kendo-ui/content/web/toolbar/save.png",  text: "Reply All" },
              { imageUrl: "https://demos.telerik.com/kendo-ui/content/web/toolbar/forward.png", text: "Forward" },
              { imageUrl: "https://demos.telerik.com/kendo-ui/content/web/toolbar/reply.png", text: "Reply & Delete" }
            ],
            overflow: "never"
          },
          { type: "separator" },
          {
            type: "buttonGroup",
            buttons: [
              { icon: "bold", text: "Bold", togglable: true },
              { icon: "italic", text: "Italic", togglable: true },
              { icon: "underline", text: "Underline", togglable: true }
            ]
          },
          {
            type: "splitButton",
            text: "Insert",
            menuButtons: [
              { text: "Insert above", icon: "insert-top" },
              { text: "Insert between", icon: "insert-middle" },
              { text: "Insert below", icon: "insert-bottom" }
            ]
          },
          { type: "separator" },
          {
            type: "buttonGroup",
            buttons: [
              { imageUrl: "https://demos.telerik.com/kendo-ui/content/web/toolbar/done.png", text: "Done", togglable: true, group: "category" },
              { imageUrl: "https://demos.telerik.com/kendo-ui/content/web/toolbar/todo.png", text: "To Do", togglable: true, group: "category" },
              { imageUrl: "https://demos.telerik.com/kendo-ui/content/web/toolbar/important.png", text: "Important", togglable: true, group: "category" }
            ]
          }
        ]
      });
    </script>
```

#### ScrollButtons

The `scrollButtons` setting defines the visibility of scroll buttons when mode is `scroll`. The available options are:

- `auto`—Displays scroll buttons only when needed. This is the default value.
- `hidden`—Hides the scroll buttons at all times. 
- `visible`—Always shows the scroll buttons.

The following example demonstrates how to set `visible` overflow scroll buttons.

```dojo
    <div id="toolbar"></div>
    <script>
      $("#toolbar").kendoToolBar({
        overflow: {
          mode: "scroll",
          scrollButtons: "visible"
        },
        items: [
          {
            template: "<img alt='Kendo UI for jQuery ToolBar User' src='https://demos.telerik.com/kendo-ui/content/web/toolbar/user.png' class='user-image' />",
            overflow: "never"
          },
          { type: "button", text: "Send", overflow: "never" },
          { type: "button", text: "Discard", overflow: "never" },
          { type: "separator" },
          {
            type: "splitButton",
            imageUrl: "https://demos.telerik.com/kendo-ui/content/web/toolbar/save.png",
            text: "Save",
            menuButtons: [
              { imageUrl: "https://demos.telerik.com/kendo-ui/content/web/toolbar/save.png", text: "Save as" },
              { imageUrl: "https://demos.telerik.com/kendo-ui/content/web/toolbar/upload.png", text: "Upload to drive" }
            ],
            overflow: "never"
          },
          {
            type: "splitButton",
            imageUrl: "https://demos.telerik.com/kendo-ui/content/web/toolbar/reply.png",
            text: "Reply",
            menuButtons: [
              { imageUrl: "https://demos.telerik.com/kendo-ui/content/web/toolbar/save.png",  text: "Reply All" },
              { imageUrl: "https://demos.telerik.com/kendo-ui/content/web/toolbar/forward.png", text: "Forward" },
              { imageUrl: "https://demos.telerik.com/kendo-ui/content/web/toolbar/reply.png", text: "Reply & Delete" }
            ],
            overflow: "never"
          },
          { type: "separator" },
          {
            type: "buttonGroup",
            buttons: [
              { icon: "bold", text: "Bold", togglable: true },
              { icon: "italic", text: "Italic", togglable: true },
              { icon: "underline", text: "Underline", togglable: true }
            ]
          },
          {
            type: "splitButton",
            text: "Insert",
            menuButtons: [
              { text: "Insert above", icon: "insert-top" },
              { text: "Insert between", icon: "insert-middle" },
              { text: "Insert below", icon: "insert-bottom" }
            ]
          },
          { type: "separator" },
          {
            type: "buttonGroup",
            buttons: [
              { imageUrl: "https://demos.telerik.com/kendo-ui/content/web/toolbar/done.png", text: "Done", togglable: true, group: "category" },
              { imageUrl: "https://demos.telerik.com/kendo-ui/content/web/toolbar/todo.png", text: "To Do", togglable: true, group: "category" },
              { imageUrl: "https://demos.telerik.com/kendo-ui/content/web/toolbar/important.png", text: "Important", togglable: true, group: "category" }
            ]
          }
        ]
      });
    </script>
```

#### ScrollButtonsPosition

The `scrollButtonsPosition` setting defines the placement of scroll buttons when the mode is set to `scroll`. The available options are:

- `split`—Scroll buttons appear at both ends of the toolbar. 
- `start`—Scroll buttons appear only at the start of the toolbar. 
- `end`—Scroll buttons appear only at the end of the toolbar.

The following example demonstrates how to apply scroll buttons at the end of the toolbar.

```dojo
    <div id="toolbar"></div>
    <script>
      $("#toolbar").kendoToolBar({
        overflow: {
          mode: "scroll",
          scrollButtonsPosition: "end"
        },
        items: [
          {
            template: "<img alt='Kendo UI for jQuery ToolBar User' src='https://demos.telerik.com/kendo-ui/content/web/toolbar/user.png' class='user-image' />",
            overflow: "never"
          },
          { type: "button", text: "Send", overflow: "never" },
          { type: "button", text: "Discard", overflow: "never" },
          { type: "separator" },
          {
            type: "splitButton",
            imageUrl: "https://demos.telerik.com/kendo-ui/content/web/toolbar/save.png",
            text: "Save",
            menuButtons: [
              { imageUrl: "https://demos.telerik.com/kendo-ui/content/web/toolbar/save.png", text: "Save as" },
              { imageUrl: "https://demos.telerik.com/kendo-ui/content/web/toolbar/upload.png", text: "Upload to drive" }
            ],
            overflow: "never"
          },
          {
            type: "splitButton",
            imageUrl: "https://demos.telerik.com/kendo-ui/content/web/toolbar/reply.png",
            text: "Reply",
            menuButtons: [
              { imageUrl: "https://demos.telerik.com/kendo-ui/content/web/toolbar/save.png",  text: "Reply All" },
              { imageUrl: "https://demos.telerik.com/kendo-ui/content/web/toolbar/forward.png", text: "Forward" },
              { imageUrl: "https://demos.telerik.com/kendo-ui/content/web/toolbar/reply.png", text: "Reply & Delete" }
            ],
            overflow: "never"
          },
          { type: "separator" },
          {
            type: "buttonGroup",
            buttons: [
              { icon: "bold", text: "Bold", togglable: true },
              { icon: "italic", text: "Italic", togglable: true },
              { icon: "underline", text: "Underline", togglable: true }
            ]
          },
          {
            type: "splitButton",
            text: "Insert",
            menuButtons: [
              { text: "Insert above", icon: "insert-top" },
              { text: "Insert between", icon: "insert-middle" },
              { text: "Insert below", icon: "insert-bottom" }
            ]
          },
          { type: "separator" },
          {
            type: "buttonGroup",
            buttons: [
              { imageUrl: "https://demos.telerik.com/kendo-ui/content/web/toolbar/done.png", text: "Done", togglable: true, group: "category" },
              { imageUrl: "https://demos.telerik.com/kendo-ui/content/web/toolbar/todo.png", text: "To Do", togglable: true, group: "category" },
              { imageUrl: "https://demos.telerik.com/kendo-ui/content/web/toolbar/important.png", text: "Important", togglable: true, group: "category" }
            ]
          }
        ]
      });
    </script>
```

#### ScrollDistance

The `scrollDistance` setting specifies the distance (in pixels) the toolbar scrolls when a scroll button is clicked. Default value is 50.

The following example demonstrates how to set `scrollDistance` to the toolbar.

```dojo
    <div id="toolbar"></div>
    <script>
      $("#toolbar").kendoToolBar({
        overflow: {
          mode: "scroll",
          scrollDistance: 30
        },
        items: [
          {
            template: "<img alt='Kendo UI for jQuery ToolBar User' src='https://demos.telerik.com/kendo-ui/content/web/toolbar/user.png' class='user-image' />",
            overflow: "never"
          },
          { type: "button", text: "Send", overflow: "never" },
          { type: "button", text: "Discard", overflow: "never" },
          { type: "separator" },
          {
            type: "splitButton",
            imageUrl: "https://demos.telerik.com/kendo-ui/content/web/toolbar/save.png",
            text: "Save",
            menuButtons: [
              { imageUrl: "https://demos.telerik.com/kendo-ui/content/web/toolbar/save.png", text: "Save as" },
              { imageUrl: "https://demos.telerik.com/kendo-ui/content/web/toolbar/upload.png", text: "Upload to drive" }
            ],
            overflow: "never"
          },
          {
            type: "splitButton",
            imageUrl: "https://demos.telerik.com/kendo-ui/content/web/toolbar/reply.png",
            text: "Reply",
            menuButtons: [
              { imageUrl: "https://demos.telerik.com/kendo-ui/content/web/toolbar/save.png",  text: "Reply All" },
              { imageUrl: "https://demos.telerik.com/kendo-ui/content/web/toolbar/forward.png", text: "Forward" },
              { imageUrl: "https://demos.telerik.com/kendo-ui/content/web/toolbar/reply.png", text: "Reply & Delete" }
            ],
            overflow: "never"
          },
          { type: "separator" },
          {
            type: "buttonGroup",
            buttons: [
              { icon: "bold", text: "Bold", togglable: true },
              { icon: "italic", text: "Italic", togglable: true },
              { icon: "underline", text: "Underline", togglable: true }
            ]
          },
          {
            type: "splitButton",
            text: "Insert",
            menuButtons: [
              { text: "Insert above", icon: "insert-top" },
              { text: "Insert between", icon: "insert-middle" },
              { text: "Insert below", icon: "insert-bottom" }
            ]
          },
          { type: "separator" },
          {
            type: "buttonGroup",
            buttons: [
              { imageUrl: "https://demos.telerik.com/kendo-ui/content/web/toolbar/done.png", text: "Done", togglable: true, group: "category" },
              { imageUrl: "https://demos.telerik.com/kendo-ui/content/web/toolbar/todo.png", text: "To Do", togglable: true, group: "category" },
              { imageUrl: "https://demos.telerik.com/kendo-ui/content/web/toolbar/important.png", text: "Important", togglable: true, group: "category" }
            ]
          }
        ]
      });
    </script>
```

## See Also

* [Resizing the ToolBar (Demo)](https://demos.telerik.com/kendo-ui/toolbar/resizing)
* [Appearance ToolBar (Demo)](https://demos.telerik.com/kendo-ui/toolbar/appearance)
* [JavaScript API Reference of the ToolBar](/api/javascript/ui/toolbar)
