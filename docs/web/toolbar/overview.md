---
title: Overview
page_title: Summary of Kendo UI ToolBar functionality
description: Find out how to use the Kendo UI ToolBar widget
relatedDocs: api-web-toolbar
---

# ToolBar Overview

The ToolBar widget is designed to hold different types of controls such as buttons, button groups, toggle buttons, split buttons or other custom defined elements.
The widget consists of a three main areas - ToolBar wrapper, overflow anchor and command overflow popup.
The TollBar wrapper holds all commands that can be placed within the available container width, those ones for which there is not enough space are moved to the command overflow popup.

![ToolBar areas](/web/toolbar/toolbar-areas.png)

## Getting Started

### Example - initialization and basic usage

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

Each button item can have the following properties:

    $("#toolbar").kendoToolBar({
        items: [
            {
                //**mandatory** specifies the command type
                type: "button",

                //sets the text
                text: "MyButton",

                //specifies where the text will be displayed. Possible values are: "toolbar", "overflow" or "both" (default).
                showText: "both",

                //sets icon for the item. The icon should be one of the existing in the Kendo UI theme sprite.
                icon: "folder-add",

                //if set, the ToolBar will render an image with the specified URL in the button.
                imageUrl: "../content/btnImage.png"

                //defines a CSS class (or multiple classes separated by spaces) which will be used for button icon.
                spriteCssClass: "myIcon"

                //specifies where the button icon will be displayed. Possible values are: "toolbar", "overflow" or "both" (default).
                showIcon: "toolbar",

                //specifies the ID of the button.
                id: "myButton",

                //specifies whether the control is initially enabled or disabled. Default value is "true".
                enable: true,

                //specifies whether the button is primary. Primary buttons receive different styling.
                primary: false,

                //specifies how the button behaves when the ToolBar is resized. Possible values are: "always", "never" or "auto" (default).
                overflow: "auto",

                //specifies if the button is togglable, e.g. has a selected and unselected state.
                togglable: true,

                //specifies if the toggle button is initially selected. Applicable only for buttons with toggle: true.
                selected: true,

                //assigns the button to a group. Applicable only for buttons with toggle: true.
                group: "myGroup",

                //specifies the click event handler
                click: function(e) {
                    //handle click event
                },

                //specifies the toggle event handler (for buttons with togglable: true)
                toggle: function(e) {
                    //handle toggle event
                }
            }
        ]
    });

**When resizing is enabled the control will be rendered two times** - once in the ToolBar and once in the command overflow popup.
If the button has an ID set, it will be assigned to the element in the ToolBar wrapper. The corresponding element in the command overflow popup will receive the same ID with an "_overflow" suffix.
For example, a button with `id: "foo"` and `overflow: "auto"` will render an element with id="foo" in the ToolBar and another element with an id="foo_overflow" in the ToolBar command overflow popup.

The `overflow` property accepts the following values:

* "always" - the button will be rendered and displayed only in the command overflow popup.
* "never" - the button will be rendered and displayed only in the ToolBar wrapper.
* "both" - the button will be rendered both in the ToolBar wrapper and in the command overflow popup. It will be displayed in only one of the locations depending on the available space in the ToolBar wrapper.

#### Button appearance:

* The `icon` property defines a name of an existing icon from the Kendo UI theme sprite. The icon will be applied as background image of a `span` element rendered inside the Button. For a list of available icon names, refer to the [Icons demo](http://demos.telerik.com/kendo-ui/styling/icons).
* The `imageUrl` property defines an URL which will be used for an `img` element inside the Button. The `img` element will be rendered automatically by the widget.
* The `spriteCssClass` property defines a one or more CSS classes separated by spaces, which will be used for applying a background image to a `span` element inside the Button. In case you want to use an icon from the Kendo UI theme sprite background image, it is easier to use the icon property.

##### Example - using icons

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

* "toolbar" - the icon will be displayed only when the button is visible in the ToolBar wrapper. The same button will appear with no icon in the command overflow popup.
* "overflow" - the icon will be displayed only when the button is visible in the command overflow popup. The same button will appear with no icon in the ToolBar wrapper.
* "both" - the icon will be displayed for both buttons. This is the default setting.

The `showText` property accepts the following values:

* "toolbar" - only the button located in the ToolBar wrapper will have a text.
* "overflow" - only the button located in the command overflow container will have a text.
* "both" - both buttons will have a text. This is the default setting.

##### Example - define a button that will be displayed only as an icon in the ToolBar wrapper and will have only text in the command overflow container

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

The Toggle Button allows the user to change a setting between two states. To define a Toggle Button, set the button `togglable` property to `true`. The Toggle Button supports the same configuration options as the standard button.

> Clicking on a Toggle Button triggers the `toggle` event. Clicking on a Toggle Button does **not** trigger the `click` event.

##### Example - define a Toggle Button

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

#### Toggle Button groups

Only a one Button from a group may be selected at a time. This is useful if you want to create a group of mutually exclusive Toggle Buttons.

##### Example - define a group of mutually exclusive Toggle Buttons

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

The Split Button is a composite control which has a primary (main) button and alternative options displayed in a drop-down list bound to a secondary button.

In the command overflow popup the Split Button is rendered as flat list of commands. The first is the primary (main) button followed by the drop-down items in the order they are defined.

##### Example - define a Split Button

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

The Button Group consists of multiple button elements that are visually separated in a group.

In the command overflow popup the Button Group is rendered as list of commands.

##### Example - define a Button Group

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

##### Example - define a Button Group with a mutually exclusive options

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

The separator can act as a delimiter between the ToolBar commands.

##### Example - define a separator

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

Unlike all other commands the template command does not need a type set.
If a template is provided the type property will be ignored.
By default, you should define both `template` and `overflowTemplate` in order to specify how the command will be rendered in the command overflow popup.
If the command should not appear in the command overflow popup its `overflow` property should be set to `"never"`.

> By default a custom template command without overflowTemplate will not be shown in the command overflow popup e.g. it will be considered as `overflow: never`.

##### Example - add a template command

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

##### Example - add a template command that will appear only in the ToolBar wrapper

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

Custom template commands allows the developer to add other Kendo UI widgets in the ToolBar.

##### Example - add DropDownList widget in the ToolBar

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

## Resizing

By design the widget will detect changes in the viewport width and hide the overflowing controls in the command overflow popup. This feature may be disabled by setting `resizable` option to `false`.

The developer can control how a given command will behave on resizing with its `overflow` property.

> Commands with `overflow: "never"` should be declared first followed by those with `overflow: "auto"`. Commands with `overflow: "always"` should be declared last.

> Setting the min-width of the ToolBar's element is mandatory if the developer wants to prevent the widget from resizing below a given width.

##### Example - using the overflow property

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

## Mobile rendering

Widget provides a mobile specific stylization when placed in header or footer of a mobile View. For more information please check the ["ToolBar as ActionBar" demo page](http://demos.telerik.com/kendo-ui/navbar/adaptive-toolbar).

## Event handling

The ToolBar widget exposes the following events:

* `click` - fires when button is clicked.
* `toggle` - fires when the selected state of Toggle button is changed.
* `open` - fires when the drop down container of a SplitButton opens.
* `close` - fires when the drop down container of a SplitButton closes.
* `overflowOpen` - fires when the command overflow popup of the ToolBar opens.
* `overflowClose` - fires when the command overflow popup of the ToolBar closes.

In addition the developer has ability to attach `click` and `toggle` event handlers to the buttons through the config options.

##### Example - using events

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
