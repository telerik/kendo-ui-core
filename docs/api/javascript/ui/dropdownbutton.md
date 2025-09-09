---
title: DropDownButton
page_title: Configuration, methods and events of Kendo UI DropDownButton
description: Configuration, methods and events of the Kendo UI DropDownButton
res_type: api
component: dropdownbutton
---

# kendo.ui.DropDownButton

Represents the Kendo UI DropDownButton widget. Inherits from [Widget](/api/javascript/ui/widget).


## Configuration

### enabled `Boolean` *(default: true)*

Indicates whether the **DropDownButton** should be enabled or disabled. By default, it is enabled, unless a `disabled="disabled"` attribute is detected.

#### Example

    <button id="dropdownbutton" type="button">Foo</button>
    <script>
    $("#dropdownbutton").kendoDropDownButton({
        items:[
            { text: "item 1" },
            { text: "item 2" }
        ],
        enabled: false
    });
    </script>


### fillMode `String` *(default: 'solid')*

Controls how the color is applied to the button. Valid values are: `"solid"`, `"outline"`, `"flat"`, `"link"`, and `"none"`. Default value is `"solid"`.

#### Example

    <button id="dropdownbutton" type="button">Cancel</button>
    <script>
        $("#dropdownbutton").kendoDropDownButton({
            items:[
                { text: "item 1" },
                { text: "item 2" }
            ],
            fillMode: "outline"
        });
    </script>

### icon `String`

Defines a name of an existing icon in the Kendo UI theme sprite. The icon will be applied as background image of a `span` element inside the **DropDownButton**.
The `span` element can be added automatically by the widget, or an existing element can be used, if it has a `k-icon` CSS class applied.
For a list of available icon names, please refer to the [Icons demo](https://demos.telerik.com/kendo-ui/web/styling/icons.html).

#### Example

    <button id="dropdownbutton" type="button">Cancel</button>
    <script>
    $("#dropdownbutton").kendoDropDownButton({
        items:[
            { text: "item 1" },
            { text: "item 2" }
        ],
        icon: "cancel"
    });
    </script>

### iconClass `String`

Defines a CSS class - or multiple classes separated by spaced - which are applied to a `span` element inside the **DropDownButton**. Allows the usage of custom icons.

#### Example

    <link href="https://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet" />
    <button id="dropdownbutton" type="button">Cancel</button>
    <script>
        $("#dropdownbutton").kendoDropDownButton({
            items:[
                { text: "item 1" },
                { text: "item 2" }
            ],
            iconClass: "fa fa-male"
        });
    </script>

### imageUrl `String`

Defines a URL, which will be used for an `img` element inside the DropDownButton. The URL can be relative or absolute. In case it is relative, it will be evaluated with relation to the web page URL.

The `img` element can be added automatically by the widget, or an existing element can be used, if it has a `k-image` CSS class applied.

#### Example

    <button id="dropdownbutton" type="button">Button</button>
    <script>
        $("#dropdownbutton").kendoDropDownButton({
            items:[
                { text: "item 1" },
                { text: "item 2" }
            ],
            imageUrl: "https://demos.telerik.com/kendo-ui/content/web/treeview/edit.png"
        });
    </script>

### items `Array`

Specifies the menu buttons of the **DropDownButton**.

#### Example

    <button id="dropdownbutton" type="button">Button</button>
    <script>
        $("#dropdownbutton").kendoDropDownButton({
            items: [
                { id: "item1", text: "Item1", click: function(ev){alert("Item 1 clicked!");} },
                { id: "item2", text: "Item2", icon: "gear", attributes: { "data-context": "some arbitrary data" }},
                { id: "item3", text: "Item3", imageUrl: "https://demos.telerik.com/kendo-ui/content/shared/icons/sports/snowboarding.png"},
                { id: "item4", text: "Item4" },
                { id: "item5", text: "Item5", enabled: false },
                { id: "item6", text: "Item6", hidden: true  }
            ],
        });
    </script>

### items.attributes `Object`

Adds custom attributes to the LI element of the menu button.

#### Example

    <button id="dropdownbutton" type="button">Actions</button>
    <script>
        $("#dropdownbutton").kendoDropDownButton({
            items: [
                { 
                    text: "Save", 
                    attributes: { 
                        "data-action": "save",
                        "data-priority": "high",
                        "title": "Save the current document"
                    }
                },
                { 
                    text: "Export", 
                    attributes: { 
                        "data-action": "export",
                        "class": "export-item"
                    }
                }
            ]
        });
    </script>

### items.click `Function`

Adds unique click callback for the menu item.

#### Example

    <button id="dropdownbutton" type="button">File</button>
    <script>
        $("#dropdownbutton").kendoDropDownButton({
            items: [
                { 
                    text: "New",
                    click: function(e) {
                        console.log("New file clicked");
                        alert("Creating new file...");
                    }
                },
                { 
                    text: "Open",
                    click: function(e) {
                        console.log("Open file clicked", e);
                        alert("Opening file dialog...");
                    }
                },
                { 
                    text: "Save",
                    click: function(e) {
                        console.log("Save clicked", e.item);
                        alert("File saved successfully!");
                    }
                }
            ]
        });
    </script>

### items.data `Function`

Adds a custom data callback to be added to the context of menu item - useful to attach context dynamically.

#### Example

    <button id="dropDownButton">Command</button>
    <script>

        var commands = {
            "command_one": function () {
                alert("Command One Executed!")
            },
            "command_two": function () {
                alert("Command Two Executed!")
            },
            "default_command": function () {
                alert("Default Executed!")
            }
        }

        function getContext(item) {
            return {
                command: commands[item.id]
            }
        }

        var dropDownButton = $("#dropDownButton").kendoDropDownButton({
            items: [
                { id: "command_one", text: "Command 1", data: getContext},
                { id: "command_two", text: "Command 2", data: getContext}
            ],
            click: function(ev) {
                if (ev.target.data("command")) {
                    ev.target.data("command")();
                } else {
                    commands["default_command"]();
                }
            }
        }).data("kendoDropDownButton");
    </script>

### items.enabled `Boolean` *(default: true)*

Toggles the enabled state of the item.

#### Example

    <button id="dropdownbutton" type="button">Actions</button>
    <script>
        $("#dropdownbutton").kendoDropDownButton({
            items: [
                { text: "Edit", enabled: true },
                { text: "Delete", enabled: false },  // This item will be disabled
                { text: "Copy", enabled: true },
                { text: "Archive", enabled: false }  // This item will be disabled
            ]
        });
    </script>

### items.hidden `Boolean` *(default: false)*

Indicates wether the item should hidden.

#### Example

    <button id="dropdownbutton" type="button">View</button>
    <script>
        $("#dropdownbutton").kendoDropDownButton({
            items: [
                { text: "Show Details", hidden: false },  // This item will be visible
                { text: "Advanced Options", hidden: true },  // This item will be hidden
                { text: "Export", hidden: false },
                { text: "Debug Mode", hidden: true }  // This item will be hidden
            ]
        });
    </script>

### items.icon `String`

Specifies the icon of the item.

#### Example

    <button id="dropdownbutton" type="button">Tools</button>
    <script>
        $("#dropdownbutton").kendoDropDownButton({
            items: [
                { text: "Settings", icon: "gear" },
                { text: "Save", icon: "save" },
                { text: "Print", icon: "print" },
                { text: "Email", icon: "email" }
            ]
        });
    </script>

### items.id `String`

Specifies the id of the item.

#### Example

    <button id="dropdownbutton" type="button">Actions</button>
    <script>
        $("#dropdownbutton").kendoDropDownButton({
            items: [
                { id: "new-item", text: "New" },
                { id: "edit-item", text: "Edit" },
                { id: "delete-item", text: "Delete" },
                { id: "duplicate-item", text: "Duplicate" }
            ]
        });
        
        // Later you can access items by their id
        var dropdownbutton = $("#dropdownbutton").data("kendoDropDownButton");
        console.log("Item with id 'edit-item':", dropdownbutton.items().filter('[data-id="edit-item"]'));
    </script>

### items.imageUrl `String`

Specifies the image of the item.

#### Example

    <button id="dropdownbutton" type="button">Social</button>
    <script>
        $("#dropdownbutton").kendoDropDownButton({
            items: [
                { 
                    text: "Image", 
                    imageUrl: "https://demos.telerik.com/kendo-ui/content/shared/icons/16/photo.png" 
                },
                { 
                    text: "Video", 
                    imageUrl: "https://demos.telerik.com/kendo-ui/content/shared/icons/16/video.png" 
                },
                { 
                    text: "Volume", 
                    imageUrl: "https://demos.telerik.com/kendo-ui/content/shared/icons/16/speaker.png" 
                }
            ]
        });
    </script>

### items.spriteCssClass `String`

Specifies custom css class added to the sprite icon element of the item.

#### Example

    <style>
        .custom-icon { width: 16px; height: 16px; background-color: #ff6358; }
        .warning-icon { width: 16px; height: 16px; background-color: #ffa500; }
        .success-icon { width: 16px; height: 16px; background-color: #28a745; }
    </style>
    <button id="dropdownbutton" type="button">Status</button>
    <script>
        $("#dropdownbutton").kendoDropDownButton({
            items: [
                { text: "Error", spriteCssClass: "custom-icon" },
                { text: "Warning", spriteCssClass: "warning-icon" },
                { text: "Success", spriteCssClass: "success-icon" }
            ]
        });
    </script>

### items.text `String`

Specifies the text of the item.

#### Example

    <button id="dropdownbutton" type="button">Choose Language</button>
    <script>
        $("#dropdownbutton").kendoDropDownButton({
            items: [
                { text: "English" },
                { text: "Español" },
                { text: "Français" },
                { text: "Deutsch" },
                { text: "日本語" }
            ]
        });
    </script>

### items.url `String`

Specifies the url of the item - it will render `a` element and will navigate the browser on click.

#### Example

    <button id="dropdownbutton" type="button">Quick Links</button>
    <script>
        $("#dropdownbutton").kendoDropDownButton({
            items: [
                { text: "Google", url: "https://www.google.com" },
                { text: "Kendo UI Demos", url: "https://demos.telerik.com/kendo-ui/" },
                { text: "Documentation", url: "https://docs.telerik.com/kendo-ui/" },
                { text: "Support", url: "https://www.telerik.com/support/kendo-ui" }
            ]
        });
    </script>

### itemTemplate `String|Function`

Specifies a custom template for the menu items.

#### Example

    <button id="dropDownButton">Click me!</button>
    <script>
        $("#dropDownButton").kendoDropDownButton({
            items: [
                { text: "Item 1" },
                { text: "Item 2" },
                { text: "Item 3" }
            ],
            itemTemplate: "<span class=\"k-link k-menu-link\"><strong>#:text#</strong></span>"
        });
    </script>

### popup `Object`

The options that will be used for the popup initialization. For more details about the available options
refer to [Popup](/api/javascript/ui/popup) documentation.

#### Example

    <button id="dropdownbutton" type="button">Options</button>
    <script>
        $("#dropdownbutton").kendoDropDownButton({
            items: [
                { text: "Option 1" },
                { text: "Option 2" },
                { text: "Option 3" }
            ],
            popup: {
                origin: "bottom left",
                position: "top left",
                anchor: "left",
                appendTo: "body",
                animation: {
                    open: { effects: "fadeIn" },
                    close: { effects: "fadeOut" }
                }
            }
        });
    </script>

### popup.appendTo `String` *(default: document.body)*

Defines a jQuery selector that will be used to find a container element, where the popup will be appended to. The element needs to be relatively positioned.

#### Example

    <div id="container" style="position: relative; width: 500px; height: 300px; border: 1px solid #ccc;">
        <p>This is a container with relative positioning</p>
        <button id="dropdownbutton" type="button">Actions</button>
    </div>
    <script>
        $("#dropdownbutton").kendoDropDownButton({
            items: [
                { text: "Edit" },
                { text: "Delete" },
                { text: "Archive" }
            ],
            popup: {
                appendTo: "#container"  // Popup will be appended to the container div
            }
        });
    </script>

### rounded `String` *(default: 'medium')*

Controls what border radius is applied to a button. Valid values are: `"small"`, `"medium"`, `"large"`, `"full"`, and `"none"`. Default value is `"medium"`.

#### Example

    <button id="dropdownbutton" type="button">Cancel</button>
    <script>
        $("#dropdownbutton").kendoDropDownButton({
            items:[
                { text: "item 1" },
                { text: "item 2" }
            ],
            rounded: "full"
        });
    </script>

### size `String` *(default: 'medium')*

Controls the overall physical size of a button. Valid values are:  `"small"`, `"medium"`, `"large"`, and `"none"`. Default value is `"medium"`.

#### Example

    <button id="dropdownbutton" type="button">Cancel</button>
    <script>
        $("#dropdownbutton").kendoDropDownButton({
            items:[
                { text: "item 1" },
                { text: "item 2" }
            ],
            size: "large"
        });
    </script>

### spriteCssClass `String`

Defines a CSS class (or multiple classes separated by spaces), which will be used for applying a background image to a `span` element inside the **DropDownButton**.
In case you want to use an icon from the Kendo UI theme sprite background image, it is easier to use the [`icon` property](/api/javascript/ui/button#configuration-icon).

The `span` element can be added automatically by the widget, or an existing element can be used, if it has a `k-sprite` CSS class applied.

#### Example

    <button id="dropdownbutton" type="button">Button</button>
    <script>
        $("#dropdownbutton").kendoDropDownButton({
            items:[
                { text: "item 1" },
                { text: "item 2" }
            ],
            spriteCssClass: "myEditIcon"
        });
    </script>

### showArrowButton `Boolean`*(default: false)*

Configures the DropDownButton to render a down arrow that opens and closes its popup.

#### Example

    <button id="dropdownbutton" type="button">Foo</button>
    <script>
    $("#dropdownbutton").kendoDropDownButton({
        items:[
            { text: "item 1" },
            { text: "item 2" }
        ],
        showArrowButton: true
    });
    </script>


### themeColor `String` *(default: 'base')*

Controls the main color applied to the button. Valid values are:  `"base"`, `"primary"`, `"secondary"`, `"tertiary"`, `"info"`, `"success"`, `"warning"`, `"error"`, `"dark"`, `"light"`, `"inverse"`, and `"none"`. Default value is `"base"`.

#### Example

    <button id="dropdownbutton" type="button">Cancel</button>
    <script>
        $("#dropdownbutton").kendoDropDownButton({
            items:[
                { text: "item 1" },
                { text: "item 2" }
            ],
            themeColor: "dark"
        });
    </script>

### messages `Object` 

Allows localization of the strings that are used in the widget.

#### Example

    <button id="dropdownbutton" type="button">Cancel</button>
    <script>
        $("#dropdownbutton").kendoDropDownButton({
            items:[
                { text: "item 1" },
                { text: "item 2" }
            ],
            messages: {
                labelSuffix: "Button"
            }
        });
    </script>

### messages.labelSuffix `String` 

Controls the label suffix that will be used for the aria-label attribute.

#### Example

    <button id="dropdownbutton" type="button">Cancel</button>
    <script>
        $("#dropdownbutton").kendoDropDownButton({
            items:[
                { text: "item 1" },
                { text: "item 2" }
            ],
            messages: {
                labelSuffix: "MenuButton" // inspect the aria-label attribute in the browser console
            }
        });
    </script>

## Methods

### enable

Enables or disables the DropDownButton and all the items in the Button list.

#### Parameters

##### state `Boolean`

Indicates whether the **DropDownButton** should be enabled or disabled. `true` and `false` arguments are accepted. If no argument is supplied, the **DropDownButton** will assume `true` and will be enabled.

##### items `String|jQuery`

Collection of the items to disabled/enabled.

#### Example

    <button id="dropdownbutton" type="button">Button</button>
    <script>
        $("#dropdownbutton").kendoDropDownButton({
            items:[
                { text: "item 1" },
                { text: "item 2" }
            ]
        });
        var button = $("#dropdownbutton").data("kendoDropDownButton");
        // disable button
        button.enable(false);
    </script>

#### Example - disable a specific item

    <button id="dropdownbutton" type="button">Button</button>
    <script>
        $("#dropdownbutton").kendoDropDownButton({
            items:[
                { id: "item1", text: "Item 1" },
                { id: "item2", text: "Item 2" }
            ]
        });
        var button = $("#dropdownbutton").data("kendoDropDownButton");
        
        button.enable(false, "#item1");
    </script>

#### Example - disable a collection of items

    <button id="dropdownbutton" type="button">Button</button>
    <script>
        $("#dropdownbutton").kendoDropDownButton({
            items:[
                { id: "item1", text: "Item 1" },
                { id: "item2", text: "Item 2" }
            ]
        });
        var button = $("#dropdownbutton").data("kendoDropDownButton");
        
        button.enable(false, $("#item1, #item2"));
    </script>

### hide

Hides an item.

#### Parameters
##### items `String|jQuery`

Collection of the items to hide.

#### Example

    <button id="dropdownbutton" type="button">Button</button>
    <script>
        $("#dropdownbutton").kendoDropDownButton({
            items:[
                { id: "item1", text: "Item 1" },
                { id: "item2", text: "Item 2" }
            ]
        });
        var button = $("#dropdownbutton").data("kendoDropDownButton");
        
        button.hide($("#item1"));
    </script>

### show

Shows an item.

#### Parameters
##### items `String|jQuery`

Collection of the items to show.

#### Example

    <button id="dropdownbutton" type="button">Button</button>
    <script>
        $("#dropdownbutton").kendoDropDownButton({
            items:[
                { id: "item1", text: "Item 1" },
                { id: "item2", text: "Item 2" }
            ]
        });
        var button = $("#dropdownbutton").data("kendoDropDownButton");
        
        button.show($("#item1"));
    </script>

### items

Returns the menu items as DOM elements wrapped in jQuery collection.

#### Example

    <button id="dropdownbutton" type="button">Button</button>
    <script>
        $("#dropdownbutton").kendoDropDownButton({
            items:[
                { id: "item1", text: "Item 1" },
                { id: "item2", text: "Item 2" }
            ]
        });
        var button = $("#dropdownbutton").data("kendoDropDownButton");
        
        var items = button.items();
        console.log(items);
    </script>

### open

Opens the button menu.

#### Example

    <button id="dropdownbutton" type="button">Button</button>
    <script>
        $("#dropdownbutton").kendoDropDownButton({
            items:[
                { id: "item1", text: "Item 1" },
                { id: "item2", text: "Item 2" }
            ]
        });
        var button = $("#dropdownbutton").data("kendoDropDownButton");
        
        button.open();
    </script>

### close

Closes the button menu.

#### Example

    <button id="dropdownbutton" type="button">Button</button>
    <script>
        $("#dropdownbutton").kendoDropDownButton({
            items:[
                { id: "item1", text: "Item 1" },
                { id: "item2", text: "Item 2" }
            ]
        });
        var button = $("#dropdownbutton").data("kendoDropDownButton");
        
        button.close();
    </script>

## Events

### click

Fires when the **DropDownButton** or any if its items is clicked with the mouse, touched on a touch device, or ENTER (or SPACE) is pressed while the **DropDownButton** or an item is focused.

#### Event Data

##### e.originalEvent `Object`

The original DOM event.

##### e.target `jQuery`

The DOM element fired the event wrapped in jQuery object.

##### e.id `String`

The id of the element, which fired the event, wrapped in jQuery object. 

#### Example - subscribe to the "click" event during initialization

    <button id="dropdownbutton" type="button">Button</button>
    <script>
        $("#dropdownbutton").kendoDropDownButton({
            items:[
                { id: "item1", text: "item 1" },
                { id: "item2", text: "item 2" }
            ],
            click: function(e) {
                console.log(e.id + " clicked!");
            }
        });
    </script>

#### Example - subscribe to the "click" event after initialization

    <button id="dropdownbutton" type="button">Button</button>
    <script>
        $("#dropdownbutton").kendoDropDownButton({
            items:[
                { text: "item 1" },
                { text: "item 2" }
            ]
        });
        var button = $("#dropdownbutton").data("kendoDropDownButton");
        button.bind("click", function(e) {
            console.log(e.id + " clicked!");
        });
    </script>

### open

Fires when the menu button is opened. 

#### Example

    <button id="dropdownbutton" type="button">Button</button>
    <script>
        $("#dropdownbutton").kendoDropDownButton({
            items:[
                { id: "item1", text: "item 1" },
                { id: "item2", text: "item 2" }
            ],
            open: function(e) {
                console.log("Opened!");
            }
        });
    </script>

### close

Fires when the menu button is closed. 

#### Example

    <button id="dropdownbutton" type="button">Button</button>
    <script>
        $("#dropdownbutton").kendoDropDownButton({
            items:[
                { id: "item1", text: "item 1" },
                { id: "item2", text: "item 2" }
            ],
            close: function(e) {
                console.log("Closed!");
            }
        });
    </script>
