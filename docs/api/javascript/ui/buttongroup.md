---
title: ButtonGroup
page_title: Configuration, methods and events of Kendo UI ButtonGroup
description: Learn how to define the initially selected button, select a button and get the currently selected button.
res_type: api
---

# kendo.ui.ButtonGroup

Represents the Kendo UI ButtonGroup widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### enable `Boolean` *(default: true)*

Defines if the widget is initially enabled or disabled. By default, it is enabled.

#### Example

    <ul id="buttongroup">
        <li>Option 1</li>
        <li>Option 2</li>
        <li>Option 3</li>
    </ul>

    <script>
        $("#buttongroup").kendoButtonGroup({
            enable: false
        });
    </script>

### index `Number`

Defines the initially selected Button (zero based index).

#### Example

    <ul id="buttongroup">
        <li>Option 1</li>
        <li>Option 2</li>
        <li>Option 3</li>
    </ul>

    <script>
        $("#buttongroup").kendoButtonGroup({
            index: 1
        });
    </script>

### selection `String` *(default "single")*

Defines the selection type. Allows the following values:

* `single` (default): allows only a single button to be the currently selected in the group.
* `multiple`: allows multiple buttons to be selected in the group at the same time.
* `none`: does not allow selection. ButtonGroups acts as a group of clickable Buttons.

#### Example

    <ul id="buttongroup">
        <li>Option 1</li>
        <li>Option 2</li>
        <li>Option 3</li>
    </ul>

    <script>
        $("#buttongroup").kendoButtonGroup({
            selection: "multiple"
        });
    </script>

### items `Array`

A JavaScript array that contains the ButtonGroup's items configuration.

#### Example - initialize ButtonGroup with items

    <div id="buttonGroup"></div>
    <script>
        $("#buttonGroup").kendoButtonGroup({
            items: [
                { text: "Align Left", icon: "align-left", selected: true},
                { text: "Align Center", icon: "align-center"},
                { text: "Align Right", icon: "align-right"},
            ]
        });
    </script>

### items.attributes `Object`

Specifies the HTML attributes of a ButtonGroup item.

> HTML attributes which are JavaScript keywords (e.g. class) must be quoted.

#### Example - adding custom class to a button

    <div id="buttonGroup"></div>

    <script>
        $("#buttonGroup").kendoButtonGroup({
            items: [
                { text: "Align Left", icon: "align-left"},
                { text: "Align Center", icon: "align-center", attributes: {class: "red"}},
                { text: "Align Right", icon: "align-right"},
            ]
        });
    </script>

    <style>
        .red { background-color: red; }
    </style>

### items.badge `Boolean|String|Number|Object`

If set to true a default overlay badge will be displayed. If set to a string, an ovelay with content set to the specified string will be displayed. Can be set to a JavaScript object which represents the configuration of the [`Badge widget`](/api/javascript/ui/badge).

#### Example - Various badge settings

    <div style="padding: 10px; background: #cccccc;">
        <div id="buttonGroup"></div>
    </div>

    <script>
        $("#buttonGroup").kendoButtonGroup({
            items: [
                {
                    text: "foo",
                    badge: {
                        text: 1234,
                        max: 99,
                        themeColor: "warning",
                        position: "inline"
                    }
                },
                {
                    text: "bar",
                    badge: {
                        icon: "plus",
                        themeColor: "success",
                        cutoutBorder: true
                    }
                }
            ]
        });
    </script>


### items.badge.align `String` *(default: '')*

Specifies position of the badge relative to button. Valid position options are: `top start`, `top end`, `bottom start`, `bottom end`.

`items.badge.align` works in conjunction with [`items.badge.position`](/api/javascript/ui/buttongroup/configuration/items#itemsbadgeposition).

#### Example

    <div id="buttonGroup"></div>
    <script>
    $("#buttonGroup").kendoButtonGroup({
        items: [
            {
                text: "Save",
                badge: {
                    text: "NEW",
                    position: "edge",
                    align: "top end"
                }
            },
            {
                text: "Delete",
                badge: {
                    text: "5",
                    position: "edge", 
                    align: "bottom start"
                }
            }
        ]
    });
    </script>


### items.badge.cutoutBorder `Boolean` *(default: false)*

Specifies wether or not to render additional "cutout" border around the badge.

#### Example

    <div id="buttonGroup"></div>
    <script>
    $("#buttonGroup").kendoButtonGroup({
        items: [
            {
                text: "Save",
                badge: {
                    text: "1",
                    cutoutBorder: true
                }
            },
            {
                text: "Delete",
                badge: {
                    text: "2",
                    cutoutBorder: false
                }
            }
        ]
    });
    </script>


### items.badge.fill `String` *(default: 'solid')*

Specifies the structure of a badge. Valid options are `solid` (default) and `outline`.

#### Example

    <div id="buttonGroup"></div>
    <script>
    $("#buttonGroup").kendoButtonGroup({
        items: [
            {
                text: "Solid Badge",
                badge: {
                    text: "5",
                    fill: "solid"
                }
            },
            {
                text: "Outline Badge",
                badge: {
                    text: "10",
                    fill: "outline"
                }
            }
        ]
    });
    </script>


### items.badge.icon `String` *(default: '')*

Defines the name for an existing icon in a Kendo UI theme or SVG content. The icon is rendered inside the badge by a `span.k-icon` or `span.k-svg-icon` element.

#### Example

    <div id="buttonGroup"></div>
    <script>
    $("#buttonGroup").kendoButtonGroup({
        items: [
            {
                text: "Alert",
                badge: {
                    icon: "warning"
                }
            },
            {
                text: "Success",
                badge: {
                    icon: "check"
                }
            }
        ]
    });
    </script>


### items.badge.max `Number` *(default: Infinity)*

If `text` is a number, it will cap that number.

#### Example

    <div id="buttonGroup"></div>
    <script>
    $("#buttonGroup").kendoButtonGroup({
        items: [
            {
                text: "Messages",
                badge: {
                    text: 150,
                    max: 99
                }
            },
            {
                text: "Notifications", 
                badge: {
                    text: 25,
                    max: 50
                }
            }
        ]
    });
    </script>


### items.badge.position `String` *(default: 'edge')*

Specifies position of the badge relative to the edge of the button. Valid placemnt options are: `inline`, `edge`, `inside`, `outside`.

Note: position configuration, other than `inline` requires the badge to be aligned. See [`items.badge.align`](/api/javascript/ui/buttongroup/configuration/items#itemsbadgealign) for more details.

#### Example

    <div id="buttonGroup"></div>
    <script>
    $("#buttonGroup").kendoButtonGroup({
        items: [
            {
                text: "Inline",
                badge: {
                    text: "NEW",
                    position: "inline"
                }
            },
            {
                text: "Edge",
                badge: {
                    text: "5",
                    position: "edge",
                    align: "top end"
                }
            },
            {
                text: "Inside",
                badge: {
                    text: "!",
                    position: "inside",
                    align: "top start"
                }
            }
        ]
    });
    </script>


### items.badge.shape `String` *(default: 'rounded')*


Specifies the shape of the badge. 
Valid options are `rectangle`, `rounded`, `pill`, `circle`, `dot`.

#### Example

    <div id="buttonGroup"></div>
    <script>
    $("#buttonGroup").kendoButtonGroup({
        items: [
            {
                text: "Rectangle",
                badge: {
                    text: "1",
                    shape: "rectangle"
                }
            },
            {
                text: "Rounded",
                badge: {
                    text: "2",
                    shape: "rounded"
                }
            },
            {
                text: "Circle",
                badge: {
                    text: "3",
                    shape: "circle"
                }
            },
            {
                text: "Dot",
                badge: {
                    shape: "dot"
                }
            }
        ]
    });
    </script>


### items.badge.size  `String` *(default: 'medium')*

Specifies the size of the badge. Valid options are `small`, `medium` and `large`.

#### Example

    <div id="buttonGroup"></div>
    <script>
    $("#buttonGroup").kendoButtonGroup({
        items: [
            {
                text: "Small",
                badge: {
                    text: "S",
                    size: "small"
                }
            },
            {
                text: "Medium",
                badge: {
                    text: "M",
                    size: "medium"
                }
            },
            {
                text: "Large",
                badge: {
                    text: "L",
                    size: "large"
                }
            }
        ]
    });
    </script>


### items.badge.template `String|Function`

The [template](/api/javascript/kendo/methods/template) which renders the content of the badge.

#### Example

    <div id="buttonGroup"></div>
    <script>
    $("#buttonGroup").kendoButtonGroup({
        items: [
            {
                text: "Custom Template",
                badge: {
                    template: (data) => `<strong>${data.value}</strong>`,
                    text: "NEW"
                }
            },
            {
                text: "Function Template",
                badge: {
                    template: function(data) {
                        return `<i class="k-icon k-i-star"></i> ${data.value}`;
                    },
                    text: "5"
                }
            }
        ]
    });
    </script>


### items.badge.text `String|Number` *(default: '')*

The text of the badge. Valid input includes `string`, `number` or `object` with `toString` method. Default is empty string.

#### Example

    <div id="buttonGroup"></div>
    <script>
    $("#buttonGroup").kendoButtonGroup({
        items: [
            {
                text: "String Text",
                badge: {
                    text: "NEW"
                }
            },
            {
                text: "Number Text",
                badge: {
                    text: 42
                }
            },
            {
                text: "Object Text",
                badge: {
                    text: { toString: function() { return "OBJ"; } }
                }
            }
        ]
    });
    </script>


### items.badge.themeColor `String` *(default: 'secondary')*

Specifies the color of the component. Valid options are `inherit`, `default`, `primary`, `secondary`, `tertiary`, `info`, `success`, `warning`, `error`, `dark`, `light`, `inverted`.

#### Example

    <div id="buttonGroup"></div>
    <script>
    $("#buttonGroup").kendoButtonGroup({
        items: [
            {
                text: "Primary",
                badge: {
                    text: "1",
                    themeColor: "primary"
                }
            },
            {
                text: "Success",
                badge: {
                    text: "2",
                    themeColor: "success"
                }
            },
            {
                text: "Warning",
                badge: {
                    text: "3",
                    themeColor: "warning"
                }
            },
            {
                text: "Error",
                badge: {
                    text: "4",
                    themeColor: "error"
                }
            }
        ]
    });
    </script>


### items.badge.visible `Boolean` *(default: true)*

If set to false the badge will not be displayed.

#### Example

    <div id="buttonGroup"></div>
    <script>
    $("#buttonGroup").kendoButtonGroup({
        items: [
            {
                text: "Visible Badge",
                badge: {
                    text: "SHOW",
                    visible: true
                }
            },
            {
                text: "Hidden Badge",
                badge: {
                    text: "HIDE",
                    visible: false
                }
            }
        ]
    });
    </script>


### items.enabled `Boolean` *(default: true)*

Specifies if a button is enabled.

#### Example

    <div id="buttonGroup"></div>

    <script>
        $("#buttonGroup").kendoButtonGroup({
            items: [
                { text: "foo",  enabled: false },
                { text: "bar" }
            ]
        });
    </script>

### items.icon `String`

Defines the name of an existing icon in a Kendo theme.

#### Example

    <div id="buttonGroup"></div>

    <script>
        $("#buttonGroup").kendoButtonGroup({
            items: [
                { icon: "align-left" },
                { icon: "align-center" },
                { icon: "align-right" }
            ]
        });
    </script>

### items.iconClass `String`

Allows the usage of custom icons. Defines CSS classes which are to be applied to a span element inside the ButtonGroup item.

#### Example
    <link href="https://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet" />
    <div id="buttonGroup"></div>

    <script>
        $("#buttonGroup").kendoButtonGroup({
            items: [
                { iconClass: "fa fa-male" },
                { icon: "align-center" },
                { icon: "align-right" }
            ]
        });
    </script>

### items.imageUrl `String`

If set, the ButtonGroup will render an image with the specified URL in the button.

#### Example

    <div id="buttonGroup"></div>

    <script>
        var baseUrl = "https://demos.telerik.com/kendo-ui/content/shared/icons";
        $("#buttonGroup").kendoButtonGroup({
            items: [
                { text: "foo", imageUrl: baseUrl + "/sports/snowboarding.png" },
                { text: "bar", imageUrl: baseUrl + "/sports/snowboarding.png" }
            ]
        });
    </script>

### items.selected `Boolean` *(default: false)*

Specifies if a button is initially selected.

#### Example

    <div id="buttonGroup"></div>

    <script>
        $("#buttonGroup").kendoButtonGroup({
            items: [
                { text: "foo",  selected: true },
                { text: "bar" }
            ]
        });
    </script>

### items.text `String`

Specifies the text of the ButtonGroup item.

#### Example

    <div id="buttonGroup"></div>

    <script>
        $("#buttonGroup").kendoButtonGroup({
            items: [
                { text: "foo" },
                { text: "bar" }
            ]
        });
    </script>

### items.encoded `Boolean` *(default: true)*

Specifies if text field of the ButtonGroup item should be encoded.

#### Example

    <div id="buttonGroup"></div>

    <script>
        $("#buttonGroup").kendoButtonGroup({
            items: [
                { text: "<b>foo</b>", encoded: false },
                { text: "<b>bar</b>", encoded: true }
            ]
        });
    </script>

### fillMode `String` *(default: 'solid')*

Controls how the color is applied to the buttons in the Group. Valid values are: `"solid"`, `"outline"`, `"flat"`, `"link"`, and `"none"`. Default value is `"solid"`.

#### Example

    <div id="buttonGroup"></div>

    <script>
        $("#buttonGroup").kendoButtonGroup({
            fillMode: "outline",
            items: [
                { text: "<b>foo</b>", encoded: false },
                { text: "<b>bar</b>", encoded: true }
            ]
        });
    </script>

### rounded `String` *(default: 'medium')*

Controls what border radius is applied to first and last button. Valid values are: `"small"`, `"medium"`, `"large"`, `"full"`, and `"none"`. Default value is `"medium"`.

#### Example

    <div id="buttonGroup"></div>

    <script>
        $("#buttonGroup").kendoButtonGroup({
            rounded: "full",
            items: [
                { text: "<b>foo</b>", encoded: false },
                { text: "<b>bar</b>", encoded: true }
            ]
        });
    </script>

### size `String` *(default: 'medium')*

Controls the overall physical size of all buttons in the Group. Valid values are:  `"small"`, `"medium"`, `"large"`, and `"none"`. Default value is `"medium"`.

#### Example

    <div id="buttonGroup"></div>

    <script>
        $("#buttonGroup").kendoButtonGroup({
            size: "large",
            items: [
                { text: "<b>foo</b>", encoded: false },
                { text: "<b>bar</b>", encoded: true }
            ]
        });
    </script>

### themeColor `String` *(default: 'base')*

Controls the main color applied to the buttons in the Group. Valid values are:  `"base"`, `"primary"`, `"secondary"`, `"tertiary"`, `"info"`, `"success"`, `"warning"`, `"error"`, `"dark"`, `"light"`, `"inverse"`, and `"none"`. Default value is `"base"`.

#### Example

    <div id="buttonGroup"></div>

    <script>
        $("#buttonGroup").kendoButtonGroup({
            themeColor: "dark",
            items: [
                { text: "<b>foo</b>", encoded: false },
                { text: "<b>bar</b>", encoded: true }
            ]
        });
    </script>

## Methods

### badge

Gets or sets the badge of a button within the ButtonGroup. This method supports several usage scenarios:

- **Get badge value**: When called with only the button parameter, returns the current badge text  
- **Set badge value**: When called with a button and string/number value, updates the badge text  
- **Create badge**: If the button doesn't have a badge, creates a new one with the specified value  
- **Remove badge**: When called with `false` as the value parameter, completely removes the badge from the button  
- **Handle zero**: Properly handles zero (0) as a valid badge value

#### Parameters

##### button `Selector|Number`

The target button specified either as a jQuery selector/object or as an button index.

##### value `String|Boolean`

The target value to be set or false to be removed.

#### Returns

`String|kendo.ui.Button` the badge value if invoked without parameters, otherwise the ButtonGroup object.

#### Example

    <ul id="buttongroup">
        <li>Option 1</li>
        <li>Option 2</li>
        <li>Option 3</li>
    </ul>

    <script>
        var buttonGroup = $("#buttongroup").kendoButtonGroup({
            select: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
                console.log("selected index:" + e.indices);
            },
            index: 0
        }).data("kendoButtonGroup");

        buttonGroup.badge(0,5);
    </script>

### current

Get the currently selected Button.

#### Returns

`jQuery` the jQuery object representing the currently selected button.

#### Example - get the index of the currently selected Button

    <ul id="buttongroup">
        <li>Option 1</li>
        <li>Option 2</li>
        <li>Option 3</li>
    </ul>

    <script>
        $("#buttongroup").kendoButtonGroup({
            select: function(e) {
                var index = this.current().index();
	/* The result can be observed in the DevTools(F12) console of the browser. */
                console.log(index);
            }
        });
    </script>

### destroy

Prepares the **ButtonGroup** for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the ButtonGroup element from DOM.

#### Example

    <ul id="buttongroup">
        <li>Option 1</li>
        <li>Option 2</li>
        <li>Option 3</li>
    </ul>

    <a onclick="destroy">Destroy the ButtonGroup</a>

    <script>
        $("#buttongroup").kendoButtonGroup();

        function destroy() {
            $("#buttongroup").data("kendoButtonGroup").destroy(); //detach events
            $("#buttongroup").remove(); //remove the button group from the DOM
        }
    </script>

### enable

Enables or disables the widget.

#### Parameters

##### enable `Boolean`

A boolean flag that indicates whether the widget should be enabled or disabled.

#### Example

    <a onclick="enable">Enable</a>
    <ul id="buttongroup">
        <li>Option 1</li>
        <li>Option 2</li>
        <li>Option 3</li>
    </ul>

    <script>
        $("#buttongroup").kendoButtonGroup({
            enable: false
        });
        function enable() {
            $("#buttongroup").data("kendoButtonGroup").enable(true);
        }
    </script>

### select

Select a Button.

> **Note:** Starting from R3 2020 release, calling the `select()` method will no longer trigger the `select` event. That is the expected by design behavior of the widget. If you need to trigger the `select` event upon the method call, you should do that manually by calling the `buttongroup.trigger('select')`.

#### Parameters

##### li `jQuery | Number`

LI element or index of the Button.

#### Example

    <ul id="buttongroup">
        <li>Option 1</li>
        <li>Option 2</li>
        <li>Option 3</li>
    </ul>


    <script>
        var buttongroup = $("#buttongroup").kendoButtonGroup().data("kendoButtonGroup");

        // selects by jQuery object
        buttongroup.select(buttongroup.element.children().eq(0));
        // selects by index
        buttongroup.select(1);
    </script>

## Events

### select

Fires when a Button is selected.

#### Example - get the index of the currently selected Button

    <ul id="buttongroup">
        <li>Option 1</li>
        <li>Option 2</li>
        <li>Option 3</li>
    </ul>

    <script>
        $("#buttongroup").kendoButtonGroup({
            select: function(e) {
                var index = this.current().index();
	/* The result can be observed in the DevTools(F12) console of the browser. */
                console.log(index);
            }
        });
    </script>

#### Event Data

##### e.indices `Array`

The indices of the selected buttons
