---
title: Overview
page_title: Overview | Kendo UI ToolBar
description: "Learn how to initialize the Kendo UI ToolBar widget and configure its command types and behaviors."
slug: overview_kendoui_toolbar_widget
relatedDocs: api-web-toolbar
position: 1
---

# ToolBar Overview

The [Kendo UI ToolBar widget](http://demos.telerik.com/kendo-ui/toolbar/index) is designed to hold different types of controls such as buttons, button groups, toggle buttons, split buttons, and other customized elements.

The ToolBar consists of three main areas: ToolBar wrapper, overflow anchor, and command overflow popup. The wrapper holds all commands that can be placed within the available container width. The ones for which there is no space to fit in are moved to the command overflow popup.

![ToolBar areas](/controls/navigation/toolbar/toolbar-areas.png)

## Getting Started

### Intialize the ToolBar

The example below demonstrates how to initialize the ToolBar and apply its basic functionalities.

###### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
                //regular button
                {
                    type: "button",
                    text: "Button",
                    icon: "note",
                    showIcon: "toolbar"
                },

                //toggle button
                {
                    type: "button",
                    togglable: true,
                    text: "Toggle Button",
                    icon: "tick",
                    selected: true
                },

                //split button
                {
                    type: "splitButton",
                    text: "Split Button",
                    menuButtons: [
                        { id: "option1", text: "Option 1" },
                        { id: "option2", text: "Option 2" },
                        { id: "option3", text: "Option 3" }
                    ]
                },

                //button group
                {
                    type: "buttonGroup",
                    buttons: [
                        { text: "left",   showText: "overflow", icon: "justifyLeft",   showIcon: "toolbar" },
                        { text: "center", showText: "overflow", icon: "justifyCenter", showIcon: "toolbar" },
                        { text: "right",  showText: "overflow", icon: "justifyRight",  showIcon: "toolbar" }
                    ]
                },

                //separator
                {
                    type: "separator"
                },

                //custom template
                {
                    template: "<label>Custom template: <input type='text' id='textbox' /></label>",
                    overflowTemplate: "<span></span>"
                }
            ]
        });
    </script>

## Command Types

### Button

The example below demonstrates the properties of each button.

###### Example

    $("#toolbar").kendoToolBar({
        items: [
            {
                //(Mandatory) Specifies the command type.
                type: "button",

                //Sets the text.
                text: "MyButton",

                //Specifies where the text will be displayed. The possible values are: "toolbar", "overflow", or "both" (default).
                showText: "both",

                //Sets icon for the item. The icon should be one of the existing in the Kendo UI theme sprite.
                icon: "folder-add",

                //If set, the ToolBar will render an image with the specified URL in the button.
                imageUrl: "../content/btnImage.png"

                //Defines a CSS class (or multiple classes, separated by spaces) which will be used for button icon.
                spriteCssClass: "myIcon"

                //Specifies where the button icon will be displayed. The possible values are: "toolbar", "overflow", or "both" (default).
                showIcon: "toolbar",

                //Specifies the ID of the button.
                id: "myButton",

                //Specifies whether the control is initially enabled or disabled. The default value is "true".
                enable: true,

                //Specifies whether the button is primary. Primary buttons receive different styling.
                primary: false,

                //Specifies how the button behaves when the ToolBar is resized. The possible values are "always", "never", or "auto" (default).
                overflow: "auto",

                //Specifies if the button is togglable, e.g. has a selected and unselected state.
                togglable: true,

                //Specifies if the toggle button is initially selected. Applicable only for buttons with toggle: true.
                selected: true,

                //Assigns the button to a group. Applicable only for buttons with toggle: true.
                group: "myGroup",

                //Specifies the click event handler.
                click: function(e) {
                    //handle click event
                },

                //Specifies the toggle event handler for buttons with togglable: true.
                toggle: function(e) {
                    //handle toggle event
                }
            }
        ]
    });


When resizing is enabled, the control will be rendered twice: once in the ToolBar and once in the command overflow popup.
If the button has an `ID` set, it will be assigned to the element in the ToolBar wrapper. The corresponding element in the command overflow popup will receive the same `ID` with an `"_overflow"` suffix. For example, a button with `id: "foo"` and `overflow: "auto"` will render an element with `id="foo"` in the ToolBar and another element with `id="foo_overflow"` in the ToolBar command overflow popup.

The `overflow` property accepts the following values:

* `"always"` - the button will be rendered and displayed only in the command overflow popup.
* `"never"` - the button will be rendered and displayed only in the ToolBar wrapper.
* `"both"` - the button will be rendered both in the ToolBar wrapper and in the command overflow popup. It will be displayed in only one of the locations depending on the available space in the ToolBar wrapper.

#### Appearance of the Button

* `icon` - the property defines a name of an existing icon from the Kendo UI theme sprite. The icon will be applied as background image of a `span` element rendered inside the Button. For a list of available icon names, refer to the [demo on icons](http://demos.telerik.com/kendo-ui/styling/icons).
* `imageUrl` - the property defines an URL which will be used for an `img` element inside the Button. The `img` element will be rendered automatically by the widget.
* `spriteCssClass` - the property defines a one or more CSS classes separated by spaces, which will be used for applying a background image to a `span` element inside the Button. In case you want to use an icon from the Kendo UI theme sprite background image, it is easier to use the icon property.

The example below demonstrates how to use icons in the ToolBar when setting the appearance of the Button.

###### Example

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

* `"toolbar"` - the icon is displayed only when the button can be seen in the ToolBar wrapper. The same button will appear with no icon in the command overflow popup.
* `"overflow"` - the icon will be displayed only when the button can be seen in the command overflow popup. The same button will appear with no icon in the ToolBar wrapper.
* `"both"` - the icon will be displayed for both buttons. This is the default setting.

The `showText` property accepts the following values:

* `"toolbar"` - only the button located in the ToolBar wrapper displays the text.
* `"overflow"` - only the button located in the command overflow container displays the text.
* `"both"` - both buttons display the text. This is the default setting.

The example below demonstrates how to define a button displayed only as an icon in the ToolBar wrapper and having only text in the command overflow container.

###### Example

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

### Toggle Button

The Toggle Button allows users to change a setting between two states. To define a Toggle Button, set the button `togglable` property to `true`. The Toggle Button supports the same configuration options as the standard button.

> **Important**
> * Clicking on a Toggle Button triggers the `toggle` event.
> * Clicking on a Toggle Button does not trigger the `click` event.

The example below demonstrates how to define a Toggle Button in the ToolBar widget.

###### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
                {
                    type: "button",
                    togglable: true,
                    text: "My Toggle Button",
                    spriteCssClass: "myIcon",
                    showIcon: "toolbar",
                    selected: true
                }
            ]
        });
    </script>

#### Groups

Only one button from a group of buttons can be selected at a time. This is useful if you want to create a group of mutually exclusive Toggle Buttons.

The example below demonstrates how to define a group of mutually exclusive Toggle Buttons.

###### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
                { type: "button", text: "foo", togglable: true, group: "controlGroup" },
                { type: "button", text: "bar", togglable: true, group: "controlGroup" },
                { type: "button", text: "baz", togglable: true, group: "controlGroup" }
            ]
        });
    </script>

### Split Button

The Split Button is a composite control which has a primary (main) button and alternative options displayed in a drop-down list, bound to a secondary button. In the command overflow popup the Split Button is rendered as a flat list of commands. The first one is the primary (main) button, followed by the drop-down items in the order they are defined.

The example below demonstrates how to defines a Spli Button in the ToolBar widget.

###### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
                {
                    type: "splitButton", //setting the command type is **mandatory**
                    text: "Split Button", //define the text of the primary button
                    icon: "folter-add", //set icon of the primary button
                    menuButtons: [ //define the drop-down options
                        { id: "option1", text: "Option 1" },
                        { id: "option2", text: "Option 2" },
                        { id: "option3", text: "Option 3" },
                        { id: "option4", text: "Option 4" }
                    ]
                }
            ]
        });
    </script>

### Button Group

The Button Group consists of multiple button elements that are visually separated in a group. In the command overflow popup the Button Group is rendered as a list of commands.

The example below demonstrates how to define a Button Group in the ToolBar widget.

###### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
                {
                    type: "buttonGroup",
                    id: "btnGroup",
                    //ButtonGroup's items accept the same appearance configuration options as the button item
                    buttons: [
                        { text: "prev", icon: "arrow-w" },
                        { text: "next", icon: "arrow-e" }
                    ]
                }
            ]
        });
    </script>

The example below demonstrates how to define a Button Group with mutually exclusive options.

###### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
                {
                    type: "buttonGroup",
                    id: "btnGroup",
                    //ButtonGroup's items accept the same appearance configration optinos as the button control
                    buttons: [
                        { text: "foo", togglable: true, group: "controlGroup" },
                        { text: "bar", togglable: true, group: "controlGroup" },
                        { text: "baz", togglable: true, group: "controlGroup" }
                    ]
                }
            ]
        });
    </script>

### Separator

The Separator can act as a delimiter between the ToolBar commands.

The example below demonstrates how to define a Separator.

###### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
                { type: "button", text: "Button 1" },
                { type: "separator" },
                { type: "button", text: "Button 2" }
            ]
        });
    </script>

### Custom Templates

The ToolBar widget allows the developer to define custom items.

Unlike all other commands the template command does not need a type set. If a template is provided the `type` property will be ignored. By default, you are required to define both `template` and `overflowTemplate` to specify how the command is going to be rendered in the command overflow popup. If the command is not intended to appear in the command overflow popup, set its `overflow` property to `"never"`.

> **Important**
>
> By default, a custom template command without `overflowTemplate` is not going to be shown in the command overflow popup, e.g. it is not going to be considered as `overflow: never`.

The example below demonstrates how to add a template command.

###### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
                {
                    //specifies what element will be added in the ToolBar wrapper
                    template: '<img class="mail-icon" src="gmail.png" alt="gmail" />',

                    //specifies what element will be added in the command overflow popup
                    overflowTemplate: '<img class="mail-overflow-icon" src="gmail-overflow.png" alt="gmail" />
                }
            ]
        });
    </script>

The example below demonstrates how to add a template command that is going to appear only in the ToolBar wrapper.

###### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
                {
                    //specifies what element will be added in the ToolBar wrapper
                    template: '<img class="mail-icon" src="gmail.png" alt="gmail" />',
                    overflow: "never"
                }
            ]
        });
    </script>

Custom template commands allow you to add other Kendo UI widgets in the ToolBar.

The example below demonstrates how to implement a Kendo UI DropDown widget in the Kendo UI ToolBar.

###### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
                //add the DropDownList element in the ToolBar via template
                { template: '<input id="dropdownlist" />', overflow: "never" }
            ]
        });

        //initialze the DropDownList after ToolBar
        $("#dropdownlist").kendoDropDownList({
            dataSource: [{ item: "Item 1", value: 1 }, { item: "Item 2", value: 2 }],
            dataTextField: "item",
            dataValueField: "value"
        });
    </script>

## Display

### Resizing

By design, the ToolBar detects changes in the viewport width and hides the overflowing controls in the command overflow popup. This feature may be disabled by setting `resizable` option to `false`. You are able to control the way a given command behaves on resizing with its `overflow` property.

> **Imporatant**
> * Commands with `overflow: "never"` should be declared first, followed by those with `overflow: "auto"`. Commands with `overflow: "always"` should be declared last.
> * Setting the min-width of the ToolBar's element is mandatory if you want to prevent the widget from resizing below a given width.

The example below demonstrates how to use the `overflow` property.

###### Example

    <div id="toolbar" style="min-width: 240px;"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
                { overflow: "never", template: '<input id="search" />' },
                { overflow: "never", type: "button", text: "Never" },
                { overflow: "auto", type: "button", text: "Auto 1" },
                { overflow: "auto", type: "button", text: "Auto 2" },
                { overflow: "always", type: "button", text: "Always" }
            ]
        });
    </script>

### Mobile Rendering

The widget provides a mobile specific stylization when placed within the header or footer of a mobile View.

For more information on the mobile rendering feature, refer to the [demo page on the ToolBar acting as ActionBar](http://demos.telerik.com/kendo-ui/navbar/adaptive-toolbar).

## ToolBar API

### Event Handling

The ToolBar widget exposes the following events:

* `click` - fires when a button is clicked.
* `toggle` - fires when the selected state of the Toggle button is changed.
* `open` - fires when the drop-down container of a SplitButton opens.
* `close` - fires when the drop-down container of a SplitButton closes.
* `overflowOpen` - fires when the command overflow popup of the ToolBar opens.
* `overflowClose` - fires when the command overflow popup of the ToolBar closes.

You are also able to attach `click` and `toggle` event handlers to the buttons through the config options.

For more information on the configuration options Kendo UI ToolBar supports, refer to the [ToolBar API](/api/javascript/ui/toolbar).

The example below demonstrates how to use ToolBar events.

###### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
                {
                    type: "button",
                    text: "Button 1",
                    click: function(e) {
                        //this click event handler will fire first
                    }
                },
                {
                    type: "button",
                    togglable: true,
                    text: "Toggle Button",
                    toggle: function(e) {
                        //this toggle event handler will fire first
                    }
                }
            ],
            click: function(e) {
                //this click event handler will fire second
            },
            toggle: function(e) {
                //this toggle event handler will fire second
            }
        });
    </script>


## See Also

Other articles on Kendo UI ToolBar:

* [Overview of the ASP.NET MVC HtmlHelper Extension for the ToolBar Widget](/aspnet-mvc/helpers/toolbar/overview)
* [Overview of the ToolBar JSP Tag]({% slug overview_toolbar_uiforjsp %})
* [Overview of the ToolBar PHP Class](/php/widgets/toolbar/overview)
* [How to Close ToolBar Popup Manually]({% slug howto_closetoolbarpopupmanually_toolbar %})
* [How to Develop and Register Custom ToolBar Tools]({% slug howto_customtool_toolbar %})
* [How to Use FontAwesome Icons]({% slug howto_usefontawesomeicons_toolbar %})
* [ToolBar JavaScript API Reference](/api/javascript/ui/toolbar)
