---
title: Button
page_title: jQuery ToolBar Documentation | Button Command Type
description: "Get started with the jQuery ToolBar by Kendo UI and learn how to configure and use the Button command type."
previous_url: /controls/navigation/toolbar/button
slug: button_toolbar_widget
---

# Button

You can configure the Button command type of the ToolBar to acquire different behavior, state, and appearance.

## Configuration of the Button

The following example demonstrates the properties of the button.

    $("#toolbar").kendoToolBar({
        items: [
            {
                // (Mandatory) Specifies the command type.
                type: "button",

                // Sets the text.
                text: "MyButton",

                // Specifies where the text will be displayed. The possible values are: "toolbar", "overflow", or "both" (default).
                showText: "both",

                // Sets icon for the item. The icon should be one of the existing in the Kendo UI theme sprite.
                icon: "folder-add",

                // If set, the ToolBar will render an image with the specified URL in the button.
                imageUrl: "../content/btnImage.png"

                // Defines a CSS class (or multiple classes, separated by spaces) which will be used for button icon.
                spriteCssClass: "myIcon"

                // Specifies where the button icon will be displayed. The possible values are: "toolbar", "overflow", or "both" (default).
                showIcon: "toolbar",

                // Specifies the ID of the button.
                id: "myButton",

                // Specifies whether the control is initially enabled or disabled. The default value is "true".
                enable: true,

                // Specifies whether the button is primary. Primary buttons receive different styling.
                primary: false,

                // Specifies how the button behaves when the ToolBar is resized. The possible values are "always", "never", or "auto" (default).
                overflow: "auto",

                // Specifies if the button is togglable, for example, has a selected and unselected state.
                togglable: true,

                // Specifies if the toggle button is initially selected. Applicable only for buttons with toggle: true.
                selected: true,

                // Assigns the button to a group. Applicable only for buttons with "toggle: true".
                group: "myGroup",

                // Specifies the click event handler.
                click: function(e) {
                    // Handle the click event.
                },

                // Specifies the toggle event handler for buttons with "togglable: true".
                toggle: function(e) {
                    // Handle the toggle event.
                }
            }
        ]
    });

When resizing is enabled, the control will be rendered once in the ToolBar and another time in the command overflow popup. If the button has a set `ID`, it will be assigned to the element in the ToolBar wrapper. The corresponding element in the command overflow popup will receive the same `ID` with an `"_overflow"` suffix. For example, a button with `id: "foo"` and `overflow: "auto"` will render an element with `id="foo"` in the ToolBar and another element with `id="foo_overflow"` in the ToolBar command overflow popup.

The `overflow` property accepts the following values:
* `"always"`&mdash;The button will be rendered and displayed only in the command overflow popup.
* `"never"`&mdash;The button will be rendered and displayed only in the ToolBar wrapper.
* `"both"`&mdash;The button will be rendered both in the ToolBar wrapper and in the command overflow popup. Depending on the available space in the ToolBar wrapper, it will be displayed in only one of the locations.

## Appearance of the Button

* `icon`&mdash;The property defines a name of an existing icon from the Kendo UI theme sprite. The icon will be applied as a background image of a `span` element that is rendered inside the Button. For a list of available icon names, refer to the [demo on icons](https://demos.telerik.com/kendo-ui/styling/icons).
* `imageUrl`&mdash;The property defines an URL which will be used for an `img` element inside the Button. The `img` element will be rendered automatically by the widget.
* `spriteCssClass`&mdash;The property defines one or more CSS classes that are separated by spaces which will be used for applying a background image to a `span` element inside the Button. To use an icon from the Kendo UI theme sprite background image, use the `icon` property.

The following example demonstrates how to use icons in the ToolBar when you set the appearance of the Button.

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
                { type: "button", text: "Button 1", icon: "folder-add" },
                { type: "Button", text: "Button 2", imageUrl: "/images/edit-icon.gif" },
                { type: "button", text: "Button 3", spriteCssClass: "myEditIcon" }
            ]
        });
    </script>

The `showIcon` property accepts the following values:
* `"toolbar"`&mdash;The icon is displayed only when the button can be seen in the ToolBar wrapper. The same button will appear with no icon in the command overflow popup.
* `"overflow"`&mdash;The icon will be displayed only when the button can be seen in the command overflow popup. The same button will appear with no icon in the ToolBar wrapper.
* (Default) `"both"`&mdash;The icon will be displayed for both buttons.

The `showText` property accepts the following values:
* `"toolbar"`&mdash;Only the button that is located in the ToolBar wrapper displays the text.
* `"overflow"`&mdash;Only the button that is located in the command overflow container displays the text.
* (Default) `"both"`&mdash;Both buttons display the text.

The following example demonstrates how to define a button that is displayed only as an icon in the ToolBar wrapper and having only text in the command overflow container.

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
                {
                    type: "button",
                    text: "Add new folder",
                    icon: "folder-add",
                    showText: "overflow",
                    showIcon: "toolbar"
                }
            ]
        });
    </script>

## See Also

* [Basic Usage of the ToolBar (Demo)](https://demos.telerik.com/kendo-ui/toolbar/index)
* [JavaScript API Reference of the ToolBar](/api/javascript/ui/toolbar)
