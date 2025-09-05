---
title: SplitButton
page_title: Configuration, methods and events of Kendo UI SplitButton
description: Configuration, methods and events of the Kendo UI SplitButton
res_type: api
component: splitbutton
---

# kendo.ui.SplitButton

Represents the Kendo UI SplitButton widget. Inherits from [Widget](/api/javascript/ui/widget).


## Configuration

### arrowIcon `String` *(default: 'caret-alt-down')*

The icon rendered for the arrow button of the **SplitButton**.

#### Example

    <button id="splitbutton" type="button">Foo</button>
    <script>
    $("#splitbutton").kendoSplitButton({
        items:[
            { text: "item 1" },
            { text: "item 2" }
        ],
        arrowIcon: "caret-alt-up"
    });
    </script>

### enabled `Boolean` *(default: true)*

Indicates whether the **SplitButton** should be enabled or disabled. By default, it is enabled, unless a `disabled="disabled"` attribute is detected.

#### Example

    <button id="splitbutton" type="button">Foo</button>
    <script>
    $("#splitbutton").kendoSplitButton({
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

    <button id="splitbutton" type="button">Cancel</button>
    <script>
        $("#splitbutton").kendoSplitButton({
            items:[
                { text: "item 1" },
                { text: "item 2" }
            ],
            fillMode: "outline"
        });
    </script>

### icon `String`

Defines a name of an existing icon in the Kendo UI theme sprite. The icon will be applied as background image of a `span` element inside the **SplitButton**.
The `span` element can be added automatically by the widget, or an existing element can be used, if it has a `k-icon` CSS class applied.
For a list of available icon names, please refer to the [Icons demo](https://demos.telerik.com/kendo-ui/web/styling/icons.html).

#### Example

    <button id="splitbutton" type="button">Cancel</button>
    <script>
    $("#splitbutton").kendoSplitButton({
        items:[
            { text: "item 1" },
            { text: "item 2" }
        ],
        icon: "cancel"
    });
    </script>

### iconClass `String`

Defines a CSS class - or multiple classes separated by spaced - which are applied to a `span` element inside the **SplitButton**. Allows the usage of custom icons.

#### Example

    <link href="https://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet" />
    <button id="splitbutton" type="button">Cancel</button>
    <script>
        $("#splitbutton").kendoSplitButton({
            items:[
                { text: "item 1" },
                { text: "item 2" }
            ],
            iconClass: "fa fa-male"
        });
    </script>

### imageUrl `String`

Defines a URL, which will be used for an `img` element inside the SplitButton. The URL can be relative or absolute. In case it is relative, it will be evaluated with relation to the web page URL.

The `img` element can be added automatically by the widget, or an existing element can be used, if it has a `k-image` CSS class applied.

#### Example

    <button id="splitbutton" type="button">Button</button>
    <script>
        $("#splitbutton").kendoSplitButton({
            items:[
                { text: "item 1" },
                { text: "item 2" }
            ],
            imageUrl: 'https://demos.telerik.com/kendo-ui/content/shared/icons/16/star.png'
        });
    </script>

### items `Array`

Specifies the menu buttons of the **SplitButton**.

#### Example

    <button id="splitbutton" type="button">Button</button>
    <script>
        $("#splitbutton").kendoSplitButton({
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

    <button id="splitButton">Command</button>
    <script>
        $("#splitButton").kendoSplitButton({
            items: [
                { text: "Item 1", attributes: { "data-value": "value1", "data-info": "custom" } },
                { text: "Item 2", attributes: { "data-value": "value2", "class": "special-item" } }
            ]
        });
    </script>

### items.click `Function`

Adds unique click callback for the menu item.

#### Example

    <button id="splitButton">Command</button>
    <script>
        $("#splitButton").kendoSplitButton({
            items: [
                { 
                    text: "Save", 
                    click: function(e) {
                        console.log("Save clicked", e);
                        alert("Document saved!");
                    }
                },
                { 
                    text: "Delete", 
                    click: function(e) {
                        console.log("Delete clicked", e);
                        if (confirm("Are you sure?")) {
                            alert("Document deleted!");
                        }
                    }
                }
            ]
        });
    </script>

### items.data `Function`

Adds a custom data callback to be added to the context of menu item - useful to attach context dynamically.

#### Example

    <button id="splitButton">Command</button>
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

        var splitButton = $("#splitButton").kendoSplitButton({
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
        }).data("kendoSplitButton");
    </script>

### items.enabled `Boolean` *(default: true)*

Toggles the enabled state of the item.

#### Example

    <button id="splitButton">Command</button>
    <script>
        $("#splitButton").kendoSplitButton({
            items: [
                { text: "Available Option", enabled: true },
                { text: "Disabled Option", enabled: false },
                { text: "Another Available", enabled: true }
            ]
        });
    </script>

### items.hidden `Boolean` *(default: false)*

Indicates wether the item should hidden.

#### Example

    <button id="splitButton">Command</button>
    <script>
        $("#splitButton").kendoSplitButton({
            items: [
                { text: "Visible Option", hidden: false },
                { text: "Hidden Option", hidden: true },
                { text: "Another Visible", hidden: false }
            ]
        });
    </script>

### items.icon `String`

Specifies the icon of the item.

#### Example

    <button id="splitButton">Command</button>
    <script>
        $("#splitButton").kendoSplitButton({
            items: [
                { text: "Save", icon: "save" },
                { text: "Download", icon: "download" },
                { text: "Print", icon: "print" }
            ]
        });
    </script>

### items.id `String`

Specifies the id of the item.

#### Example

    <button id="splitButton">Command</button>
    <script>
        $("#splitButton").kendoSplitButton({
            items: [
                { text: "Option 1", id: "option-1" },
                { text: "Option 2", id: "option-2" },
                { text: "Option 3", id: "option-3" }
            ]
        });
    </script>

### items.imageUrl `String`

Specifies the image of the item.

#### Example

    <button id="splitButton">Command</button>
    <script>
        $("#splitButton").kendoSplitButton({
            items: [
                { text: "Profile", imageUrl: "/images/profile.png" },
                { text: "Settings", imageUrl: "/images/settings.png" },
                { text: "Help", imageUrl: "/images/help.png" }
            ]
        });
    </script>

### items.spriteCssClass `String`

Specifies the custom CSS class that is added to the sprite icon element of the item.

#### Example

    <button id="splitButton">Command</button>
    <script>
        $("#splitButton").kendoSplitButton({
            items: [
                { text: "Home", spriteCssClass: "k-sprite sprite-home" },
                { text: "Dashboard", spriteCssClass: "k-sprite sprite-dashboard" },
                { text: "Reports", spriteCssClass: "k-sprite sprite-reports" }
            ]
        });
    </script>

### items.text `String`

Specifies the text of the item.

#### Example

    <button id="splitButton">Command</button>
    <script>
        $("#splitButton").kendoSplitButton({
            items: [
                { text: "New Document" },
                { text: "Open Document" },
                { text: "Save Document" },
                { text: "Print Document" }
            ]
        });
    </script>

### items.url `String`

Specifies the url of the item - it will render `a` element and will navigate the browser on click.

#### Example

    <button id="splitButton">Command</button>
    <script>
        $("#splitButton").kendoSplitButton({
            items: [
                { text: "Home", url: "/home" },
                { text: "Products", url: "/products" },
                { text: "Support", url: "/support" },
                { text: "Contact", url: "/contact" }
            ]
        });
    </script>

### itemTemplate `String|Function`

Specifies a custom template for the menu items.

#### Example

    <button id="splitButton">Click me!</button>
    <script>
        $("#splitButton").kendoSplitButton({
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

    <button id="splitButton">Command</button>
    <script>
        $("#splitButton").kendoSplitButton({
            items: [
                { text: "Option 1" },
                { text: "Option 2" },
                { text: "Option 3" }
            ],
            popup: {
                origin: "top left",
                position: "bottom left",
                collision: "flip",
                animation: {
                    open: { effects: "slideIn:down" },
                    close: { effects: "slideIn:up" }
                }
            }
        });
    </script>

### popup.appendTo `String`

Defines a jQuery selector that will be used to find a container element, where the popup will be appended to.

#### Example

    <div id="container">
        <button id="splitButton">Command</button>
    </div>
    <script>
        $("#splitButton").kendoSplitButton({
            items: [
                { text: "Option 1" },
                { text: "Option 2" },
                { text: "Option 3" }
            ],
            popup: {
                appendTo: "#container"
            }
        });
    </script>

### rounded `String` *(default: 'medium')*

Controls what border radius is applied to a button. Valid values are: `"small"`, `"medium"`, `"large"`, `"full"`, and `"none"`. Default value is `"medium"`.

#### Example

    <button id="splitbutton" type="button">Cancel</button>
    <script>
        $("#splitbutton").kendoSplitButton({
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

    <button id="splitbutton" type="button">Cancel</button>
    <script>
        $("#splitbutton").kendoSplitButton({
            items:[
                { text: "item 1" },
                { text: "item 2" }
            ],
            size: "large"
        });
    </script>

### spriteCssClass `String`

Defines a CSS class (or multiple classes separated by spaces), which will be used for applying a background image to a `span` element inside the **SplitButton**.
In case you want to use an icon from the Kendo UI theme sprite background image, it is easier to use the [`icon` property](/api/javascript/ui/button#configuration-icon).

The `span` element can be added automatically by the widget, or an existing element can be used, if it has a `k-sprite` CSS class applied.

#### Example

    <button id="splitbutton" type="button">Button</button>
    <script>
        $("#splitbutton").kendoSplitButton({
            items:[
                { text: "item 1" },
                { text: "item 2" }
            ],
            spriteCssClass: "myEditIcon"
        });
    </script>

### themeColor `String` *(default: 'base')*

Controls the main color applied to the button. Valid values are:  `"base"`, `"primary"`, `"secondary"`, `"tertiary"`, `"info"`, `"success"`, `"warning"`, `"error"`, `"dark"`, `"light"`, `"inverse"`, and `"none"`. Default value is `"base"`.

#### Example

    <button id="splitbutton" type="button">Cancel</button>
    <script>
        $("#splitbutton").kendoSplitButton({
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

    <button id="splitbutton" type="button">Cancel</button>
    <script>
        $("#splitbutton").kendoSplitButton({
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

Controls the label suffix that will be concatenated to the button's text and used for the aria-label attribute.

#### Example

    <button id="splitbutton" type="button">Cancel</button>
    <script>
        $("#splitbutton").kendoSplitButton({
            items:[
                { text: "item 1" },
                { text: "item 2" }
            ],
            messages: {
                labelSuffix: "MenuButton"
            }
        });
    </script>

## Methods

### enable

Enables or disables the SplitButton and all the items in the Button list.

#### Parameters

##### state `Boolean`

Indicates whether the **SplitButton** should be enabled or disabled. `true` and `false` arguments are accepted. If no argument is supplied, the **SplitButton** will assume `true` and will be enabled.

##### items `String|jQuery`

Collection of the items to disabled/enabled.

#### Example

    <button id="splitbutton" type="button">Button</button>
    <script>
        $("#splitbutton").kendoSplitButton({
            items:[
                { text: "item 1" },
                { text: "item 2" }
            ]
        });
        var button = $("#splitbutton").data("kendoSplitButton");
        // disable button
        button.enable(false);
    </script>

#### Example - disable a specific item

    <button id="splitbutton" type="button">Button</button>
    <script>
        $("#splitbutton").kendoSplitButton({
            items:[
                { id: "item1", text: "Item 1" },
                { id: "item2", text: "Item 2" }
            ]
        });
        var button = $("#splitbutton").data("kendoSplitButton");

        button.enable(false, "#item1");
    </script>

#### Example - disable a collection of items

    <button id="splitbutton" type="button">Button</button>
    <script>
        $("#splitbutton").kendoSplitButton({
            items:[
                { id: "item1", text: "Item 1" },
                { id: "item2", text: "Item 2" }
            ]
        });
        var button = $("#splitbutton").data("kendoSplitButton");

        button.enable(false, $("#item1, #item2"));
    </script>

### hide

Hides an item.

#### Parameters

##### items `String|jQuery`

Collection of the items to hide.

#### Example

    <button id="splitbutton" type="button">Button</button>
    <script>
        $("#splitbutton").kendoSplitButton({
            items:[
                { id: "item1", text: "Item 1" },
                { id: "item2", text: "Item 2" }
            ]
        });
        var button = $("#splitbutton").data("kendoSplitButton");

        button.hide($("#item1"));
    </script>

### show

Shows an item.

#### Parameters

##### items `String|jQuery`

Collection of the items to show.

#### Example

    <button id="splitbutton" type="button">Button</button>
    <script>
        $("#splitbutton").kendoSplitButton({
            items:[
                { id: "item1", text: "Item 1", hidden: true },
                { id: "item2", text: "Item 2" }
            ]
        });
        var button = $("#splitbutton").data("kendoSplitButton");

        button.show($("#item1"));
    </script>

### items

Returns the menu items as DOM elements wrapped in jQuery collection.

#### Example

    <button id="splitButton">Command</button>
    <script>
        var splitButton = $("#splitButton").kendoSplitButton({
            items: [
                { text: "Option 1", id: "opt1" },
                { text: "Option 2", id: "opt2" },
                { text: "Option 3", id: "opt3" }
            ]
        }).data("kendoSplitButton");

        // Get all menu items
        var items = splitButton.items();
        console.log("Number of menu items:", items.length);
        
        // Access specific item
        items.each(function(index, item) {
            console.log("Item " + index + ":", $(item).text());
        });
    </script>

#### Returns

`jQuery`

### open

Opens the button menu.

#### Example

    <button id="splitbutton" type="button">Button</button>
    <script>
        $("#splitbutton").kendoSplitButton({
            items:[
                { id: "item1", text: "Item 1" },
                { id: "item2", text: "Item 2" }
            ]
        });
        var button = $("#splitbutton").data("kendoSplitButton");

        button.open();
    </script>

### close

Closes the button menu.

#### Example

    <button id="splitbutton" type="button">Button</button>
    <script>
        $("#splitbutton").kendoSplitButton({
            items:[
                { id: "item1", text: "Item 1" },
                { id: "item2", text: "Item 2" }
            ]
        });
        var button = $("#splitbutton").data("kendoSplitButton");

        button.close();
    </script>

## Events

### click

Fires when the **SplitButton** or any if its items is clicked with the mouse, touched on a touch device, or ENTER (or SPACE) is pressed while the **SplitButton** or an item is focused.

#### Event Data

##### e.originalEvent `Object`

The original DOM event.

##### e.target `jQuery`

The DOM element fired the event wrapped in jQuery object.

##### e.id `String`

The id of the element, which fired the event, wrapped in jQuery object.

#### Example - subscribe to the "click" event during initialization

    <button id="splitbutton" type="button">Button</button>
    <script>
        $("#splitbutton").kendoSplitButton({
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

    <button id="splitbutton" type="button">Button</button>
    <script>
        $("#splitbutton").kendoSplitButton({
            items:[
                { text: "item 1" },
                { text: "item 2" }
            ]
        });
        var button = $("#splitbutton").data("kendoSplitButton");
        button.bind("click", function(e) {
            console.log(e.id + " clicked!");
        });
    </script>

### open

Fires when the menu button is opened.

#### Example

    <button id="splitbutton" type="button">Button</button>
    <script>
        $("#splitbutton").kendoSplitButton({
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

    <button id="splitbutton" type="button">Button</button>
    <script>
        $("#splitbutton").kendoSplitButton({
            items:[
                { id: "item1", text: "item 1" },
                { id: "item2", text: "item 2" }
            ],
            close: function(e) {
                console.log("Closed!");
            }
        });
    </script>
