---
title: ToolBar
page_title: Configuration, methods and events of Kendo UI ToolBar
relatedDocs: gs-web-toolbar-overview
---

# kendo.ui.ToolBar

Represents the Kendo UI ToolBar. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### resizable `Boolean` *(default: true)*

If `resizable` is set to `true` the widget will detect changes in the viewport width and hides the overflowing controls in the command overflow popup.

> When set to `true`, the resizable configuration triggers `overflow: hidden;` CSS property. 

#### Example - Resizable and Non-Resizable ToolBar

    <div style="width: 350px; border: 1px solid #ccc; padding: 10px 10px 50px;">
        
        <h5>Non-Resizable ToolBar</h5>
        <div id="toolbar-non-resizable"></div>
        
        <h5>Resizable ToolBar</h5>
        <div id="toolbar-resizable"></div>
        
    </div>
    
    <script>
        $("#toolbar-non-resizable").kendoToolBar({
            resizable: false,
            items: [
                { type: "button", text: "Button 1" },
                { type: "button", text: "Button 2" },
                { type: "button", text: "Button 3" },
                { type: "button", text: "Button 4" }
            ]
        });
        
        $("#toolbar-resizable").kendoToolBar({
            resizable: true,
            items: [
                { type: "button", text: "Button 1" },
                { type: "button", text: "Button 2" },
                { type: "button", text: "Button 3" },
                { type: "button", text: "Button 4" }
            ]
        });
    </script>

### items `Array`

A JavaScript array that contains the ToolBar's commands configuration.

> For more information regarding supported commands and their configuration properties check the [Getting Started topic](/web/toolbar/overview#command-types).

#### Example - initialize ToolBar with Button, Toggle Button and SplitButton

    <div id="toolbar"></div>
    <script>
        $("#toolbar").kendoToolBar({
            items: [
                { type: "button", text: "Button" },
                { type: "button", text: "Toggle", togglable: true },
                { type: "splitButton", text: "SplitButton", menuButtons: [{text: "Option 1"}, {text: "Option 2"}] }
            ]
        });
    </script>

### items.attributes `Object`

Specifies the HTML attributes of a ToolBar button.

> HTML attributes which are JavaScript keywords (e.g. class) must be quoted.

#### Example - adding custom class to a button

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
            { type: "button", text: "My Button", attributes: { "class": "red" } }
            ]
        });
    </script>

    <style>
        .red { background-color: red; }
    </style>

### items.buttons `Array`

Specifies the buttons of ButtonGroup.

#### Example

    <div id="toolbar"></div>

    <script>
    $("#toolbar").kendoToolBar({
      items: [
        {
          type: "buttonGroup",
          buttons: [
            { text: "foo" },
            { text: "bar" },
            { text: "baz" }
          ]
        }
      ]
    });
    </script>

### items.buttons.attributes `Object`

Specifies the HTML attributes of a ButtonGroup's button.

> HTML attributes which are JavaScript keywords (e.g. class) must be quoted.

#### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
            { type: "buttonGroup", buttons: [
                { text: "foo", attributes: { "class": "red" } },
                { text: "bar", attributes: { "class": "blue" } }
            ] }
            ]
        });
    </script>
    <style>
        .red { background-color: red; }
        .blue { background-color: blue; }
    </style>

### items.buttons.click `Function`

Specifies the click event handler of the button. Applicable only for the children of a ButtonGroup.

#### Example

    <div id="toolbar"></div>

    <script>
    function onClick() {
      console.log("click");
    }

    $("#toolbar").kendoToolBar({
      items: [
        {
          type: "buttonGroup",
          buttons: [
            { text: "foo", click: onClick },
            { text: "bar", click: onClick },
            { text: "baz", click: onClick }
          ]
        }
      ]
    });
    </script>

### items.buttons.enable `Boolean` *(default: true)*

Specifies whether the button is initially enabled or disabled.

#### Example

    <div id="toolbar"></div>

    <script>
    $("#toolbar").kendoToolBar({
      items: [
        {
          type: "buttonGroup",
          buttons: [
            { text: "foo", enable: false },
            { text: "bar" },
            { text: "baz" }
          ]
        }
      ]
    });
    </script>

### items.buttons.group `String`

Assigns the button to a group. Applicable only for the children of a ButtonGroup that has togglable true.

#### Example

    <div id="toolbar"></div>

    <script>
    $("#toolbar").kendoToolBar({
      items: [
        {
          type: "buttonGroup",
          buttons: [
            { text: "foo", togglable: true, group: "myGroup" },
            { text: "bar", togglable: true, group: "myGroup" },
            { text: "baz", togglable: true, group: "myGroup" }
          ]
        }
      ]
    });
    </script>

### items.buttons.hidden `Boolean` *(default: false)*

Determines if the button is visible or hidden. By default the buttons are visible.

#### Example

    <div id="toolbar"></div>

    <script>
    $("#toolbar").kendoToolBar({
      items: [
        {
          type: "buttonGroup",
          buttons: [
            { text: "foo" },
            { text: "bar" },
            { text: "baz", hidden: true }
          ]
        }
      ]
    });
    </script>

### items.buttons.icon `String`

Sets icon for the menu button. The icon should be one of the existing in the Kendo UI theme sprite.

#### Example

    <div id="toolbar"></div>

    <script>
    $("#toolbar").kendoToolBar({
      items: [
        {
          type: "buttonGroup",
          buttons: [
            { text: "foo", icon: "clock" },
            { text: "bar", icon: "note" },
            { text: "baz", icon: "refresh" }
          ]
        }
      ]
    });
    </script>

### items.buttons.id `String`

Specifies the ID of the button.

> By design the widget will render two buttons - the one located in the ToolBar container will receive the specified ID, the one located in the Overflow Popup container will receive the specified ID but with *_overflow* suffix. If the ID will be used for determining which button is clicked in the `click` or `toggle` event handler, the developer should use the ID property of the event data which always contains the specified ID without suffix.

#### Example

    <div id="toolbar"></div>

    <script>
    $("#toolbar").kendoToolBar({
      items: [
        {
          type: "buttonGroup",
          buttons: [
            { text: "foo", id: "foo" },
            { text: "bar", id: "bar" },
            { text: "baz", id: "baz" }
          ]
        }
      ]
    });
    </script>

### items.buttons.imageUrl `String`

If set, the ToolBar will render an image with the specified URL in the button.

#### Example

    <div id="toolbar"></div>

    <script>
    $("#toolbar").kendoToolBar({
      items: [
        {
          type: "buttonGroup",
          buttons: [
            { text: "foo", imageUrl: "foo.png" },
            { text: "bar", imageUrl: "bar.png" },
            { text: "baz", imageUrl: "baz.png" }
          ]
        }
      ]
    });

### items.buttons.selected `Boolean` *(default: false)*

Specifies if the toggle button is initially selected. Applicable only for the children of a ButtonGroup that has togglable true.

#### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
            {
                type: "buttonGroup",
                buttons: [
                { text: "foo", togglable: true, selected: true },
                { text: "bar", togglable: true },
                ]
            }
            ]
        });
    </script>

### items.buttons.showIcon `String` *(default: "both")*

Specifies where the icon of the button will be displayed. Applicable only for the children of a ButtonGroup.

#### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
            {
                type: "buttonGroup",
                buttons: [
                { text: "foo", icon: "clock", showIcon: "toolbar" },
                { text: "bar", icon: "note", showIcon: "toolbar" },
                { text: "baz", icon: "refresh", showIcon: "toolbar" }
                ]
            }
            ]
        });
    </script>

### items.buttons.showText `String` *(default: "both")*

Specifies where the text of the menu button will be displayed. Applicable only for the buttons of a ButtonGroup.

#### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
            {
                type: "buttonGroup",
                buttons: [
                { text: "foo", icon: "clock", showText: "overflow" },
                { text: "bar", icon: "note", showText: "overflow" },
                { text: "baz", icon: "refresh",showText: "overflow" }
                ]
            }
            ]
        });
    </script>

### items.buttons.spriteCssClass `String`

Defines a CSS class (or multiple classes separated by spaces) which will be used for button icon.

#### Example

    <div id="toolbar"></div>

    <script>
    $("#toolbar").kendoToolBar({
      items: [
        {
          type: "buttonGroup",
          buttons: [
            { text: "foo", spriteCssClass: "foo, bar" },
            { text: "bar", spriteCssClass: "bar" },
            { text: "baz", spriteCssClass: "baz" }
          ]
        }
      ]
    });

### items.buttons.toggle `Function`

Specifies the toggle event handler of the button. Applicable only for the children of a ButtonGroup.

#### Example

    <div id="toolbar"></div>

    <script>
        function toggle(e) {
            console.log(e.group);
        }

        $("#toolbar").kendoToolBar({
            items: [
            {
                type: "buttonGroup",
                buttons: [
                { text: "foo", togglable: true, group: "myGroup", toggle: toggle },
                { text: "bar", togglable: true, group: "myGroup", toggle: toggle }
                ]
            }
            ]
        });
    </script>

### items.buttons.togglable `Boolean`

Specifies if the button is togglable, e.g. has a selected and unselected state. Applicable only for the children of a ButtonGroup.

#### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
            {
                type: "buttonGroup",
                buttons: [
                { text: "foo", togglable: true },
                { text: "bar", togglable: true }
                ]
            }
            ]
        });
    </script>

### items.buttons.text `String`

Specifies the text of the menu button.

#### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
            {
                type: "buttonGroup",
                buttons: [
                { text: "foo" },
                { text: "bar" }
                ]
            }
            ]
        });
    </script>

### items.buttons.url `String`

Specifies the url of the button to navigate to.

#### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
            {
                type: "buttonGroup",
                buttons: [
                { text: "foo", url: "http://www.telerik.com" },
                { text: "bar", url: "http://www.google.com" },
                ]
            }
            ]
        });
    </script>

### items.click `Function`

Specifies the click event handler of the button. Applicable only for commands of type `button` and `splitButton`.

#### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
            {
                type: "button",
                text: "foo",
                click: function(e) {
                    console.log(e.target.text() + " is clicked");
                }
            }
            ]
        });
    </script>

### items.enable `Boolean` *(default: true)*

Specifies whether the control is initially enabled or disabled. Default value is "true".

#### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
            {
                type: "button",
                text: "foo",
                enable: false
            }
            ]
        });
    </script>

### items.group `String`

Assigns the button to a group. Applicable only for buttons with `togglable: true`.

#### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
            { type: "button", text: "foo", togglable: true, group: "myGroup" },
            { type: "button", text: "bar", togglable: true, group: "myGroup" },
            { type: "button", text: "baz", togglable: true, group: "myGroup" }
            ]
        });
    </script>

### items.hidden `Boolean` *(default: false)*

Determines if a button is visible or hidden. By default buttons are visible.

#### Example

    <div id="toolbar"></div>

    <script>
    $("#toolbar").kendoToolBar({
      items: [
        { type: "button", text: "MyButton 1", hidden: true },
        { type: "button", text: "MyButton 2" }
      ]
    });
    </script>

### items.icon `String`

Sets icon for the item. The icon should be one of the existing in the Kendo UI theme sprite.

#### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
            { type: "button", text: "foo", icon: "clock" },
            { type: "button", text: "bar", icon: "note" },
            { type: "button", text: "baz", icon: "refresh" }
            ]
        });
    </script>

### items.id `String`

Specifies the ID of the button.

> By design the widget will render two buttons - the one located in the ToolBar container will receive the specified ID, the one located in the Overflow Popup container will receive the specified ID but with *_overflow* suffix. If the ID will be used for determining which button is clicked in the `click` or `toggle` event handler, the developer should use the ID property of the event data which always contains the specified ID without suffix.

#### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
            { type: "button", text: "foo", id: "foo" },
            { type: "button", text: "bar", id: "bar" },
            { type: "button", text: "baz", id: "baz" }
            ]
        });
    </script>

### items.imageUrl `String`

If set, the ToolBar will render an image with the specified URL in the button.

#### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
          items: [
          { type: "button", text: "foo", imageUrl: "foo.png" },
          { type: "button", text: "bar", imageUrl: "bar.png" },
          { type: "button", text: "baz", imageUrl: "baz.png" }
          ]
        });
    </script>

### items.menuButtons `Array`

Specifies the menu buttons of a SplitButton.

#### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [ {
                type: "splitButton",
                text: "splitButton",
                menuButtons: [
                    { id: "foo", text: "Foo" },
                    { id: "bar", text: "Bar" },
                    { id: "baz", text: "Baz" }
                ]
            } ]
        });
    </script>

### items.menuButtons.attributes `Object`

Specifies the HTML attributes of a menu button.

> HTML attributes which are JavaScript keywords (e.g. class) must be quoted.

#### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
            {
                type: "splitButton",
                id: "hello",
                text: "Insert",
                attributes: { "class": "red" },
                menuButtons: [
                    { text: "Insert above", icon: "insert-n", attributes: { "class": "blue" } },
                    { text: "Insert between", icon: "insert-m" },
                    { text: "Insert below", icon: "insert-s" }
                ]
            }
            ]
        });
    </script>
    <style>
        .red { background-color: red; }
        .blue { color: blue; }
    </style>

### items.menuButtons.enable `Boolean`

Specifies whether the menu button is initially enabled or disabled.

#### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
            {
                type: "splitButton",
                text: "splitButton",
                menuButtons: [
                    { id: "foo", text: "Foo", enable: false },
                    { id: "bar", text: "Bar" },
                    { id: "baz", text: "Baz" }
                ]
            }
            ]
        });
    </script>

### items.menuButtons.hidden `Boolean` *(default: false)*

Determines if a button is visible or hidden. By default buttons are visible.

#### Example

    <div id="toolbar"></div>

    <script>
    $("#toolbar").kendoToolBar({
      items: [
        {
          type: "splitButton",
          text: "MyButton",
          menuButtons: [
            { text: "foo" },
            { text: "bar" },
            { text: "baz", hidden: true }
          ]
        }
      ]
    });
    </script>

### items.menuButtons.icon `String`

Sets icon for the menu buttons. The icon should be one of the existing in the Kendo UI theme sprite.

#### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
            {
                type: "splitButton",
                text: "splitButton",
                menuButtons: [
                    { id: "foo", text: "Foo", icon: "tick" },
                    { id: "bar", text: "Bar", icon: "note" },
                    { id: "baz", text: "Baz", icon: "clock" }
                ]
            }
            ]
        });
    </script>

### items.menuButtons.id `String`

Specifies the ID of the menu buttons.

> By design the widget will render two buttons - the one located in the ToolBar container will receive the specified ID, the one located in the Overflow Popup container will receive the specified ID but with *_overflow* suffix. If the ID will be used for determining which button is clicked in the `click` or `toggle` event handler, the developer should use the ID property of the event data which always contains the specified ID without suffix.

#### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [ {
                type: "splitButton",
                text: "splitButton",
                menuButtons: [
                    { id: "foo", text: "Foo" },
                    { id: "bar", text: "Bar" },
                    { id: "baz", text: "Baz" }
                ]
            } ]
        });
    </script>

### items.menuButtons.imageUrl `String`

If set, the ToolBar will render an image with the specified URL in the menu button.

#### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
            {
                type: "splitButton",
                text: "splitButton",
                menuButtons: [
                    { id: "foo", text: "Foo", imageUrl: "foo.png" },
                    { id: "bar", text: "Bar", imageUrl: "bar.png" },
                    { id: "baz", text: "Baz", imageUrl: "baz.png" }
                ]
            }
            ]
        });
    </script>

### items.menuButtons.spriteCssClass `String`

Defines a CSS class (or multiple classes separated by spaces) which will be used for menu button icon.

#### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
            {
                type: "splitButton",
                text: "splitButton",
                menuButtons: [
                    { id: "foo", text: "Foo", spriteCssClass: "foo" },
                    { id: "bar", text: "Bar", spriteCssClass: "bar" },
                    { id: "baz", text: "Baz", spriteCssClass: "baz" }
                ]
            }
            ]
        });
    </script>

### items.menuButtons.text `String`

Specifies the text of the menu buttons.

#### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
            {
                type: "splitButton",
                text: "splitButton",
                menuButtons: [
                    { id: "foo", text: "Foo" },
                    { id: "bar", text: "Bar" },
                    { id: "baz", text: "Baz" }
                ]
            }
            ]
        });
    </script>

### items.menuButtons.url `String`

Specifies the url of the menu button to navigate to.

#### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
            {
                type: "splitButton",
                text: "splitButton",
                menuButtons: [
                    { id: "foo", text: "Telerik", url: "http://www.telerik.com" },
                    { id: "bar", text: "Google", url: "http://www.google.com" }
                ]
            }
            ]
        });
    </script>

### items.overflow `String` *(default: "auto")*

Specifies how the button behaves when the ToolBar is resized. Possible values are: "always", "never" or "auto" (default).

#### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
                {
                    type: "splitButton",
                    text: "splitButton",
                    menuButtons: [
                        { id: "foo", text: "Foo" },
                        { id: "bar", text: "Bar" }
                    ],
                    overflow: "never"
                },
                {
                    type: "button",
                    text: "Button",
                    overflow: "auto"
                },
                {
                    type: "buttonGroup",
                    buttons: [
                        { text: "Option 1", togglable: true },
                        { text: "Option 2", togglable: true },
                        { text: "Option 3", togglable: true }
                    ],
                    overflow: "always"
                }
            ]
        });
    </script>

### items.overflowTemplate `String|Function`

Specifies what element will be added in the command overflow popup. Applicable only for items that have a template.

#### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
                {
                    template: "<span>Toolbar template</span>",
                    overflowTemplate: "<span>Overflow template</span>"
                }
            ]
        });
    </script>

### items.primary `Boolean` *(default: false)*

Specifies whether the button is primary. Primary buttons receive different styling.

#### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
            { type: "button", text: "Primary", primary: true },
            { type: "button", text: "Standard" }
            ]
        });
    </script>

### items.selected `Boolean` *(default: false)*

Specifies if the toggle button is initially selected. Applicable only for buttons with `togglable: true`.

#### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
            { type: "button", text: "Foo", togglable: true, selected: true }
            ]
        });
    </script>

### items.showIcon `String` *(default: "both")*

Specifies where the button icon will be displayed. Possible values are: "toolbar", "overflow" or "both" (default).

#### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
                { type: "button", text: "Foo", icon: "tick", showIcon: "toolbar" }
            ]
        });
    </script>

### items.showText `String` *(default: "both")*

Specifies where the text will be displayed. Possible values are: "toolbar", "overflow" or "both" (default).

#### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
                { type: "button", text: "Foo", icon: "tick", showText: "overflow" }
            ]
        });
    </script>

### items.spriteCssClass `String`

Defines a CSS class (or multiple classes separated by spaces) which will be used for button icon.

#### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
                { type: "button", text: "Foo", spriteCssClass: "tick" }
            ]
        });
    </script>

### items.template `String|Function`

Specifies what element will be added in the ToolBar wrapper. Items with template does not have a type.

> If `overflowTemplate` is not defined for a template command, than the command will be threated as `overflow: "never"`.

#### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
                {
                    template: "<span>Toolbar template</span>"
                }
            ]
        });
    </script>

### items.text `String`

Sets the text of the button.

#### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
                { type: "button", text: "Foo" }
            ]
        });
    </script>

### items.togglable `Boolean` *(default: false)*

Specifies if the button is togglable, e.g. has a selected and unselected state.

> Buttons with `togglable: true` will fire the `toggle` event. `click` event will **not** be fired.

#### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
                { type: "button", text: "Foo", togglable: true }
            ]
        });
    </script>

### items.toggle `Function`

Specifies the toggle event handler of the button. Applicable only for commands of type `button` and `togglable: true`.

#### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
            {
                type: "button",
                text: "Foo",
                togglable: true,
                toggle: function() {
                    console.log("toggle!");
                }
            }
            ]
        });
    </script>

### items.type `String`

Specifies the command type. Supported types are "button", "splitButton", "buttonGroup", "separator".

> Specifying the type is **mandatory**. Only commands that have a `template` does not need `type`.

#### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
                {
                    type: "splitButton",
                    text: "splitButton",
                    menuButtons: [
                        { id: "foo", text: "Foo" },
                        { id: "bar", text: "Bar" }
                    ]
                },
                {
                    type: "separator"
                },
                {
                    type: "button",
                    text: "Button"
                },
                {
                    type: "buttonGroup",
                    buttons: [
                        { text: "Option 1", togglable: true },
                        { text: "Option 2", togglable: true },
                        { text: "Option 3", togglable: true }
                    ]
                }
            ]
        });
    </script>

### items.url `String`

Specifies the url to navigate to.

#### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
            {
                type: "button",
                text: "Foo",
                url: "http://www.google.com"
            }
            ]
        });
    </script>

## Methods

### add

Adds new command to the ToolBar widget. Accepts object with [valid command configuration options](/web/toolbar/overview#command-types).

#### Parameters

##### command `Object`

An object with valid command configuration options.

#### Example - add button to the ToolBar

    <div id="toolbar"></div>
    <script>
        $("#toolbar").kendoToolBar({
            items: [
                { type: "button", text: "MyButton" }
            ]
        });

        var toolbar = $("#toolbar").data("kendoToolBar");
        toolbar.add({
            type: "button",
            text: "Just added",
            togglable: true
        });
    </script>

### destroy

Prepares the widget for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> This method does not remove the widget element from DOM.

#### Example

    <div id="toolbar"></div>
    <script>
        $("#toolbar").kendoToolBar({
          items: [
            { type: "button", text: "MyButton" }
          ]
        });
        var toolbar = $("#toolbar").data("kendoToolBar");
        toolbar.destroy();
    </script>

### enable

Enables or disables the specified command. If the second parameter is omitted it will be treated as `true` and the command will be enabled.

#### Parameters

##### command `String|Element|jQuery`

A string, DOM element or jQuery object which represents the command to be enabled or disabled. A string is treated as jQuery selector.

##### enable `Boolean`

A boolean flag that determines whether the command should be enabled (true) or disabled (false). If omitted the command will be enabled.

#### Example - enable command

    <div id="toolbar"></div>
    <script>
        $("#toolbar").kendoToolBar({
            items: [
                { type: "button", id: "btn1", text: "Button 1", enable: false }
            ]
        });

        var toolbar = $("#toolbar").data("kendoToolBar");
        toolbar.enable("#btn1"); //enables the initially disabled command
    </script>

#### Example - disable command

    <div id="toolbar"></div>
    <script>
        $("#toolbar").kendoToolBar({
            items: [
                { type: "button", id: "btn1", text: "Button 1", enable: true }
            ]
        });

        var toolbar = $("#toolbar").data("kendoToolBar");
        toolbar.enable("#btn1", false); //disables the initially disabled command
    </script>

### getSelectedFromGroup

Returns the selected toggle button from the specified group.

#### Parameters

##### groupName `String`

The name of the group.

#### Example - get selected button from group with name "radio"

    <div id="toolbar"></div>
    <script>
        $("#toolbar").kendoToolBar({
            items: [
                {
                    type: "buttonGroup",
                    items: [
                        { type: "button", id: "btn1", text: "Button 1", togglable: true, group: "radio" },
                        { type: "button", id: "btn1", text: "Button 1", togglable: true, group: "radio", selected: true },
                        { type: "button", id: "btn1", text: "Button 1", togglable: true, group: "radio" }
                    ]
                }
            ]
        });

        var toolbar = $("#toolbar").data("kendoToolBar");
        var selected = toolbar.getSelectedFromGroup("radio");

        console.log(selected.attr("id"));
    </script>

### hide

Hides a command from the ToolBar widget. The command is hidden from the ToolBar container and overflow popup (if resizable is enabled).

#### Parameters

##### command `String|Element|jQuery`

A string, DOM element or jQuery object which represents the command to be hidden. A string is treated as jQuery selector.

#### Example - removed button from the ToolBar

    <div id="toolbar"></div>
    <script>
        $("#toolbar").kendoToolBar({
            items: [
                { type: "button", id: "btn1", text: "Button 1" },
                { type: "button", id: "btn2", text: "Button 2" }
            ]
        });

        var toolbar = $("#toolbar").data("kendoToolBar");
        toolbar.hide($("#btn2"));
    </script>

### remove

Removes a command from the ToolBar widget. The command is removed from the ToolBar container and overflow popup (if resizable is enabled).

#### Parameters

##### command `String|Element|jQuery`

A string, DOM element or jQuery object which represents the command to be removed. A string is treated as jQuery selector.

#### Example - removed button from the ToolBar

    <div id="toolbar"></div>
    <script>
        $("#toolbar").kendoToolBar({
            items: [
                { type: "button", id: "btn1", text: "Button 1" },
                { type: "button", id: "btn2", text: "Button 2" }
            ]
        });

        var toolbar = $("#toolbar").data("kendoToolBar");
        toolbar.remove($("#btn2"));
    </script>

### show

Shows a hidden command in the ToolBar widget. The command is shown in the ToolBar container and overflow popup (if resizable is enabled).

#### Parameters

##### command `String|Element|jQuery`

A string, DOM element or jQuery object which represents the command to be shown. A string is treated as jQuery selector.

#### Example - show button from the ToolBar

    <div id="toolbar"></div>
    <script>
        $("#toolbar").kendoToolBar({
            items: [
                { type: "button", id: "btn1", text: "Button 1" },
                { type: "button", id: "btn2", text: "Button 2", hidden: true }
            ]
        });

        var toolbar = $("#toolbar").data("kendoToolBar");
        toolbar.show($("#btn2"));
    </script>

### toggle

Change the state of a togglable button.

> This method does **not** trigger the `toggle` event!

#### Example - change the state of togglable buttons using the API

    <div id="toolbar"></div>
    <script>
        $("#toolbar").kendoToolBar({
          items: [
            { type: "buttonGroup", buttons: [
              { type: "button", togglable: true, id: "foo", text: "foo", group: "group1" },
              { type: "button", togglable: true, id: "bar", text: "bar", group: "group1" }
              ]
            }
          ]
        });
        
        var toolbar = $("#toolbar").data("kendoToolBar");
        toolbar.toggle("#foo", true); //select button with id: "foo"
        toolbar.toggle("#bar", true); //select button with id: "bar" (also deselects "#foo" as the buttons are from the same group
    </script>

## Events

### click

Fires when the user clicks a command button.

> The event does not fire for togglable buttons. If the button has `togglable: true` use the `toggle` event.

#### Event Data

##### e.target `jQuery`

The jQuery object that represents the command element.

##### e.id `String`

The id of the command element.

##### e.sender `kendo.ui.ToolBar`

The widget instance which fired the event.

#### Example - subscribe to the "click" event during initialization

    <div id="toolbar"></div>
    <script>
        $("#toolbar").kendoToolBar({
            items: [
                { type: "button", id: "btn1", text: "Button 1" },
                { type: "button", id: "btn2", text: "Button 2" }
            ],
            click: function(e) {
                console.log("click", e.target.text());
            }
        });
    </script>

#### Example - subscribe to the "click" event after initialization

    <div id="toolbar"></div>
    <script>
        $("#toolbar").kendoToolBar({
            items: [
                { type: "button", id: "btn1", text: "Button 1" },
                { type: "button", id: "btn2", text: "Button 2" }
            ]
        });

        var toolbar = $("#toolbar").data("kendoToolBar");
        toolbar.bind("click", function(e){
            console.log("click", e.target.text());
        });
    </script>

### close

Fires when the SplitButton's popup closes.

#### Event Data

##### e.SplitButton `jQuery`

The jQuery object that represents the SplitButton element.

##### e.preventDefault `Function`

Prevents the close action if called. The popup will remain open.

##### e.sender `kendo.ui.ToolBar`

The widget instance which fired the event.

#### Example - subscribe to the "close" event during initialization

    <div id="toolbar"></div>
    <script>
        $("#toolbar").kendoToolBar({
            items: [
                { type: "splitButton", id: "splitButton", name: "splitButton", text: "Split Button", menuButtons: [
                    { id: "option1", text: "Option 1" },
                    { id: "option2", text: "Option 2" },
                    { id: "option3", text: "Option 3" },
                    { id: "option4", text: "Option 4" }
                ] }
            ],
            close: function(e) {
                console.log("close", e);
            }
        });
    </script>

#### Example - subscribe to the "close" event after initialization and prevent the popup closing

    <div id="toolbar"></div>
    <script>
        $("#toolbar").kendoToolBar({
            items: [
                { type: "splitButton", id: "splitButton", name: "splitButton", text: "Split Button", menuButtons: [
                    { id: "option1", text: "Option 1" },
                    { id: "option2", text: "Option 2" },
                    { id: "option3", text: "Option 3" },
                    { id: "option4", text: "Option 4" }
                ] }
            ]
        });

        var toolbar = $("#toolbar").data("kendoToolBar");
        toolbar.bind("close", function(e){
            console.log("close", e);
        });
    </script>

### open

Fires when the Split Button's popup opens.

#### Event Data

##### e.SplitButton `jQuery`

The jQuery object that represents the SplitButton element.

##### e.preventDefault `Function`

Prevents the open action if called. The popup will remain closed.

##### e.sender `kendo.ui.ToolBar`

The widget instance which fired the event.

#### Example - subscribe to the "open" event during initialization

    <div id="toolbar"></div>
    <script>
        $("#toolbar").kendoToolBar({
            items: [
                { type: "splitButton", id: "splitButton", name: "splitButton", text: "Split Button", menuButtons: [
                    { id: "option1", text: "Option 1" },
                    { id: "option2", text: "Option 2" },
                    { id: "option3", text: "Option 3" },
                    { id: "option4", text: "Option 4" }
                ] }
            ],
            open: function(e) {
                console.log("open", e);
            }
        });
    </script>

#### Example - subscribe to the "open" event after initialization and prevent the popup closing

    <div id="toolbar"></div>
    <script>
        $("#toolbar").kendoToolBar({
            items: [
                { type: "splitButton", id: "splitButton", name: "splitButton", text: "Split Button", menuButtons: [
                    { id: "option1", text: "Option 1" },
                    { id: "option2", text: "Option 2" },
                    { id: "option3", text: "Option 3" },
                    { id: "option4", text: "Option 4" }
                ] }
            ]
        });

        var toolbar = $("#toolbar").data("kendoToolBar");
        toolbar.bind("open", function(e){
            console.log("open", e);
        });
    </script>

### toggle

Fires when the user changes the checked state of a toggle button.

> **Important** `click` event does not fire for buttons that have `togglable: true`

#### Event Data

##### e.target `jQuery`

The jQuery object that represents the command element.

##### e.checked `Boolean`

Boolean flag that indicates the button state.

##### e.id `String`

The id of the command element.

##### e.sender `kendo.ui.ToolBar`

The widget instance which fired the event.

#### Example - subscribe to the "toggle" event during initialization

    <div id="toolbar"></div>
    <script>
        $("#toolbar").kendoToolBar({
            items: [
                { type: "button", id: "btn1", text: "Button 1", togglable: true },
                { type: "button", id: "btn2", text: "Button 2", togglable: true }
            ],
            toggle: function(e) {
                console.log("toggle", e.target.text(), e.checked);
            }
        });
    </script>

#### Example - subscribe to the "toggle" event after initialization

    <div id="toolbar"></div>
    <script>
        $("#toolbar").kendoToolBar({
            items: [
                { type: "button", id: "btn1", text: "Button 1", togglable: true },
                { type: "button", id: "btn2", text: "Button 2", togglable: true }
            ]
        });

        var toolbar = $("#toolbar").data("kendoToolBar");
        toolbar.bind("toggle", function(e){
            console.log("toggle", e.target.text(), e.checked);
        });
    </script>

### overflowClose

Fires when the overflow popup container is about to close.

#### Event Data

##### e.preventDefault `Function`

Prevents the close action if called. The popup will remain open.

##### e.sender `kendo.ui.ToolBar`

The widget instance which fired the event.

#### Example - subscribe to the "overflowClose" event during initialization

    <div id="toolbar"></div>
    <script>
        $("#toolbar").kendoToolBar({
            items: [
                { type: "button", id: "btn1", text: "Button 1" },
                { type: "button", id: "btn2", text: "Button 2", overflow: "always" }
            ],
            overflowClose: function(e) {
                console.log("close");
            }
        });
    </script>

#### Example - subscribe to the "overflowClose" event after initialization

    <div id="toolbar"></div>
    <script>
        $("#toolbar").kendoToolBar({
            items: [
                { type: "button", id: "btn1", text: "Button 1" },
                { type: "button", id: "btn2", text: "Button 2", overflow: "always" }
            ]
        });

        var toolbar = $("#toolbar").data("kendoToolBar");
        toolbar.bind("overflowClose", function(e){
            console.log("close");
        });
    </script>

### overflowOpen

Fires when the overflow popup container is about to open.

#### Event Data

##### e.preventDefault `Function`

Prevents the close action if called. The popup will remain closed.

##### e.sender `kendo.ui.ToolBar`

The widget instance which fired the event.

#### Example - subscribe to the "overflowOpen" event during initialization

    <div id="toolbar"></div>
    <script>
        $("#toolbar").kendoToolBar({
            items: [
                { type: "button", id: "btn1", text: "Button 1" },
                { type: "button", id: "btn2", text: "Button 2", overflow: "always" }
            ],
            overflowOpen: function(e) {
                console.log("open");
            }
        });
    </script>

#### Example - subscribe to the "overflowOpen" event after initialization

    <div id="toolbar"></div>
    <script>
        $("#toolbar").kendoToolBar({
            items: [
                { type: "button", id: "btn1", text: "Button 1" },
                { type: "button", id: "btn2", text: "Button 2", overflow: "always" }
            ]
        });

        var toolbar = $("#toolbar").data("kendoToolBar");
        toolbar.bind("overflowOpen", function(e){
            console.log("open");
        });
    </script>
