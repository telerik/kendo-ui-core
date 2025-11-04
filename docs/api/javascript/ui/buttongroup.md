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


<div class="meta-api-description">
How do I enable interactivity in Kendo UI ButtonGroup? Configure the initial interactivity and accessibility of button collections by enabling or disabling user input and keyboard focus, controlling whether buttons respond to clicks or remain inert, setting the component’s active or disabled visual states, managing usability and access by toggling enabled or disabled modes, adjusting whether button sets accept user actions or block them with a disabled appearance, and determining if the group is receptive to user interaction at startup or locked to prevent input.
</div>

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


<div class="meta-api-description">
How do I set the initially active button in a Kendo UI ButtonGroup? Control or specify the initially active, selected, or default button within a group by setting its zero-based position or order, enabling configuration of which button is highlighted or enabled on load, allowing synchronization of initial UI state, preselecting options, setting default choices, managing initial focus or activation within button collections or tabs, and defining starting selection for user interfaces that require controlled or predetermined button activation on initialization.
</div>

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


<div class="meta-api-description">
How to configure Kendo UI ButtonGroup to allow multiple button selections at once? Configure user interaction modes for a group of buttons to specify whether one button can be selected at a time, multiple buttons can be toggled simultaneously, or none can be selected, effectively turning the buttons into independent clickable controls without selection state. Adjust settings to enable single-choice selection typical for radio button behavior, allow multi-choice selection similar to checkboxes, or completely disable selection for use cases requiring non-selectable interactive buttons. This controls selection behavior, toggle modes, multiple or single active states, and clickable grouping preferences for user interfaces involving grouped button components.
</div>

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


<div class="meta-api-description">
How do I customize the buttons in a Kendo UI ButtonGroup? Define and customize a collection of interactive buttons by supplying an array of objects that specify each button’s label, icon, assigned value, whether it is enabled or disabled, custom templates, and event handlers for clicks. Manage the button set dynamically to add new buttons, remove existing ones, rearrange their order, or bind data-driven configurations at startup or runtime. Control the visual and functional aspects of each button in a group through structured configuration, supporting scenarios like toggling states, customizing appearance, handling user interactions, and integrating with application logic.
</div>

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


<div class="meta-api-description">
How can I add custom attributes to individual buttons within a Kendo UI ButtonGroup widget? Configure custom HTML attributes for each button or item within a group by assigning unique IDs, CSS classes, data attributes, ARIA roles and properties for accessibility, inline styles, or any standard or custom HTML attributes to individual elements. This enables precise control over element identification, styling, event targeting, accessibility enhancements, and data binding by specifying attribute name-value pairs as objects, including handling cases where attribute names clash with JavaScript keywords through quoting. Users often seek to customize button elements, manage dynamic attributes, implement accessibility compliance, add metadata, or apply specific styles on a per-item basis within grouped controls.
</div>

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


<div class="meta-api-description">
How to add custom badges to individual buttons in a ButtonGroup control? Configure overlay badges on individual buttons within a group to display status indicators, notifications, or labels by enabling default badges with simple flags, setting custom text badges for descriptive overlays, or applying advanced configurations using detailed badge options and properties. Customize and control badge appearance, content, visibility, and behavior for button elements, supporting use cases like showing unread counts, alerts, status markers, or other contextual information on grouped button controls. Adjust badges dynamically through boolean flags, strings, or complex objects to tailor how badges appear and respond in interactive button collections.
</div>

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


<div class="meta-api-description">
How to align badges in Kendo UI ButtonGroup? Adjust badge placement on buttons within a group by configuring alignment options to position indicators at corners such as top-left, top-right, bottom-left, or bottom-right relative to each button; control exact badge locations using alignment settings combined with position properties to fine-tune how badges appear on grouped buttons, enabling developers to set, align, or control notification dots, counters, or status badges around button elements in various corner positions for clear visual cues and UI customization.
</div>

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


<div class="meta-api-description">
How to add a cutout border around badges in Kendo UI ButtonGroup? Control the visual separation between badges and buttons by enabling or disabling an additional cutout border around badges in grouped buttons, allowing customization of badge outlines, toggling distinct border styles to highlight or isolate badges within button groups, adjusting the appearance of badge edges to create spacing or emphasis, and setting options to include or exclude this decorative cutout effect for clearer distinction in user interfaces.
</div>

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


<div class="meta-api-description">
How to make badges in a Kendo UI ButtonGroup display with a solid filled background instead of an outlined style? Control the appearance of badges on grouped buttons by configuring whether badges display with a solid filled background or a transparent outlined style; customize badge fill modes to toggle between full color fill or subtle border outlines on badges within button collections, enabling customization of badge visibility and emphasis through fill styles such as solid or outlined variants during component setup or runtime styling adjustments.
</div>

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


<div class="meta-api-description">
How do I customize the icon within a badge in Kendo UI ButtonGroup? Set or customize the icon displayed within a badge on items in a button group by specifying a theme icon name or providing custom SVG markup, enabling control over badge visuals with recognizable Kendo UI theme glyphs or personalized SVG graphics, supporting icon configuration inside badge elements for enhanced UI indicators or notifications, including options to input existing icon names or raw SVG content to appear consistently in badges alongside buttons, suitable for developers seeking to configure, enable, or change badge iconography within grouped button interfaces.
</div>

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


<div class="meta-api-description">
How do I prevent button badges from showing extremely large numbers in Kendo UI ButtonGroup? Control and configure the maximum numeric value displayed on button badges or counters, setting upper limits to cap large numbers shown on item badges within button groups, managing overflow or truncation of numeric indicators, restricting badge counts to a defined maximum threshold to prevent excessively large or cluttered numeric displays, enabling concise and readable notification dots or badges by specifying maximum allowed numbers, customizing and limiting badge number displays on interactive button elements when the text content represents numeric counts or indicators.
</div>

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


<div class="meta-api-description">
How do I control the position of notification badges in a Kendo UI ButtonGroup? Control and customize the placement of notification badges on button edges within a group, enabling developers to set badge positions as inline with the button label, aligned along the button’s edge, placed inside the button boundaries, or displayed outside the button perimeter. Adjusting badge location supports different UI designs, helps highlight status indicators distinctly, and can be combined with badge alignment settings to fine-tune vertical or horizontal positioning relative to each button’s shape and layout. This flexibility allows configuring badge placement for visibility, style consistency, and responsive design across various interface scenarios where badges indicate counts, alerts, or statuses on grouped buttons.
</div>

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


<div class="meta-api-description">
How do I customize the shape of badges in a Kendo UI ButtonGroup? Set or customize the geometric form and visual style of badges on grouped buttons or menu items by selecting from shapes such as rectangle, rounded corners, pill-shaped, circular, or small dot indicators to configure numeric counters, status indicators, minimal notification dots, or alert symbols; adjust badge outlines, contours, and overall appearance to match design requirements, apply shapes that convey priority or state, and control how badges visually represent counts or statuses across button collections and interactive UI elements.
</div>

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


<div class="meta-api-description">
How do I adjust the size of badges in a Kendo UI ButtonGroup? Adjust the size, scale, or dimensions of badges displayed on individual buttons within a grouped button interface, controlling their visual prominence, spacing, and overall appearance by setting the badge to small, medium, or large variants; customize the badge sizing to fit design requirements, enhance user interface clarity, and ensure consistent indicator sizing across button elements in button groups.
</div>

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


<div class="meta-api-description">
How do I customize the badge content on Kendo UI ButtonGroup items using a template? Customize or configure dynamic badges on ButtonGroup elements by setting a template that controls the badge content rendering using Kendo templates, enabling insertion of HTML, item-specific data, conditional logic, icons, counts, or custom markup to display personalized, data-driven, or context-sensitive badge visuals on buttons within a group.
</div>

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


<div class="meta-api-description">
How do I set the badge text in a Kendo UI ButtonGroup? Set or update the badge label, counter, or status text displayed on group buttons by configuring the badge content as a string, numeric value, or any object convertible to text, enabling dynamic indicators, notifications, counts, or status markers within button collections to customize or reflect real-time information in a concise format.
</div>

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


<div class="meta-api-description">
How do I set custom colors for badges in a Kendo UI button group? Control and customize the visual color of badges associated with individual buttons in a group by configuring the badge's color scheme using semantic color tokens such as default, primary, secondary, tertiary, info, success, warning, error, dark, light, inverted, or inherit; this enables setting, changing, or theming badge colors for status indicators, alerts, notifications, or highlights on buttons within a button group to match application design, state, or user context.
</div>

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


<div class="meta-api-description">
How to show/hide badges on individual buttons in a ButtonGroup? Control visibility of notification badges, indicators, counts, or status markers on individual buttons within a group by enabling or disabling the display of badges on button items. Adjust settings to show or hide visual badges on buttons that indicate alerts, messages, or statuses, allowing dynamic toggling of badge appearance for grouped buttons. Manage badge rendering to either display or suppress notification dots, counters, or status symbols on button elements within a toolbar or navigation set, providing flexible control over badge visibility per button item in a button group context.
</div>

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


<div class="meta-api-description">
How can I enable or disable individual buttons within a Kendo UI ButtonGroup? Toggle individual button interactivity, activate or deactivate specific buttons, control button clickability, enable or disable keyboard focus on buttons, manage selection state of each button programmatically or through configuration, customize which buttons respond to user input by setting button enabled status, configure interactive states per button in a group, allow or block user actions on particular buttons, dynamically set buttons as active or inactive, control user access to buttons in UI components.
</div>

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


<div class="meta-api-description">
How to set icons for individual buttons in a Kendo UI ButtonGroup component? Configure or assign icons to individual buttons within a grouped set, enabling the display of built-in theme icons by specifying icon names as strings for each button element; control and customize button visuals by setting icon properties to include predefined graphic symbols, standard iconography, or theme-based icons to enhance UI clarity and user interaction in grouped button components.
</div>

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


<div class="meta-api-description">
How to customize icons in a Kendo UI ButtonGroup using CSS class names? Apply one or multiple CSS class names to customize icons within grouped buttons, enabling the integration of icon fonts like Font Awesome, SVG styling helpers, sprite classes, or any custom icon design by assigning class selectors that target the icon container element inside button groups. Customize, set, or control icons visually by adding style classes, define custom graphical representations in button collections, and implement precise icon theming or branding for interactive button items with flexible CSS class attachments.
</div>

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


<div class="meta-api-description">
How to set custom images in ButtonGroup items using a URL? Set or configure button images by specifying the URL to display custom icons, pictures, or graphical content inside button group items, enabling buttons with embedded images, icons, or visual elements loaded from external links, useful for adding icons, logos, avatars, or custom illustrations within button components for enhanced UI and visual recognition in menus or toolbars.
</div>

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


<div class="meta-api-description">
How do I set an initial selection state in Kendo UI ButtonGroup? Control which button in a group is initially active, selected, highlighted, or toggled on when the interface loads by setting the initial selection state within the button collection or array. Configure or set specific items as chosen, enabled, or active by default to reflect preselected options, default highlights, or initial button states in a grouped control, allowing developers to preset user interface elements to indicate the default or starting selection in a collection of buttons. This influences which button appears pressed, selected, or checked on initialization, supporting default selection, preselection, initial states, and toggle control in button arrays or grouped controls.
</div>

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


<div class="meta-api-description">
How do I customize the button text in a Kendo UI ButtonGroup? Configure the visible label or caption for a button within a grouped set, allowing you to define or change the display text shown on individual buttons, including support for plain strings or localized translations. This setting controls the user-facing text on each button element inside a button group component, enabling you to customize, update, or localize the button titles or names that users see in the interface. Adjust or set the button text to match different languages, provide contextual or descriptive labels, and ensure clarity and accessibility for grouped interactive elements.
</div>

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


<div class="meta-api-description">
How to prevent HTML injection in Kendo UI ButtonGroup labels? Configure whether the text content of group buttons is encoded or rendered as raw HTML, controlling HTML encoding to enable or disable HTML tags inside button labels, allowing injection-safe display of literal tags, raw HTML rendering, escaped character entities, or sanitized text within button group items. This setting manages text encoding behavior for button labels to enable showing HTML content, escaping HTML characters, preventing code injection, customizing label display, and controlling how special characters or HTML elements appear in button text fields.
</div>

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


<div class="meta-api-description">
How do I change the appearance of buttons in a Kendo UI ButtonGroup? Adjust button color styling modes including solid fill, outlined borders, flat appearance, link-style text, or no color fill to customize button visuals within grouped controls; set, configure, enable, or control how color is applied to buttons with options for fully colored backgrounds, bordered outlines, minimalist flat designs, hyperlink-like text styles, or disabling color application altogether.
</div>

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


<div class="meta-api-description">
How to control corner curvature in Kendo UI ButtonGroup buttons? Control and customize the corner curvature or border radius of the first and last buttons within a button group by setting styles like small, medium, large, full, or none rounding. Adjust or configure rounded edges to achieve various button shapes such as slightly curved, pill-shaped, fully circular corners, or sharp square corners when initializing button groups. Enable or disable corner rounding for grouped buttons for design consistency or unique UI styling, controlling how button edges appear visually on both ends of the group interface. Manage the appearance of button borders through configurable corner radius options affecting only the outermost buttons to create cohesive or distinct visual button group layouts.
</div>

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


<div class="meta-api-description">
How can I adjust the size of grouped buttons in a Kendo UI ButtonGroup? Adjust and configure the overall size, scale, and visual density of grouped buttons by setting dimensions such as small, medium, large, or disabling sizing with none, enabling control over button height, width, padding, and compactness for consistent interface design, responsive layouts, and user experience customization.
</div>

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


<div class="meta-api-description">
How do I change the default color of a button group in Kendo UI for jQuery? Adjust or set the primary color scheme, style, or emphasis of multiple buttons grouped together by configuring the main theme color to customize visual appearance, highlight importance, or match branding. Options include standard color categories like base, primary, secondary, tertiary, info, success, warning, error states, dark and light themes, inverse palettes, or disabling color with none. Useful for controlling button group aesthetics, theming button states, enabling consistent UI color coding, and applying contextual or semantic colors to grouped interactive elements. This enables developers to define or override default colors, switch between preset tones, or style grouped buttons collectively for uniform design language and user interface clarity.
</div>

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


<div class="meta-api-description">
How do I dynamically update badge values in a Kendo UI ButtonGroup component? Manage button badges dynamically by retrieving current badge text, setting or updating badge values with strings or numbers, creating new badges if absent, removing badges entirely by passing false, and retaining zero as a legitimate badge value; control badge presence and content on individual buttons within a group, enabling flexible badge manipulation, customization, display toggling, and state querying for notification counts, alerts, or label indicators across interface components.
</div>

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


<div class="meta-api-description">
How to get currently selected button in Kendo UI ButtonGroup? Retrieve or get the currently active, selected, or highlighted button within a group or collection, enabling access to the chosen button element for checking its selection status, triggering updates, applying focus, handling user interactions, executing conditional operations depending on the selected item, or managing state based on the current choice in a set of buttons.
</div>

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


<div class="meta-api-description">
How do I properly remove event listeners from a Kendo UI ButtonGroup component? remove event listeners and handlers from a button group component, clear all associated data attributes to prevent memory leaks, safely release resources of nested or child UI components, perform cleanup operations before deleting or disposing of button group widgets, prepare interactive button containers for efficient garbage collection, detach event bindings and related data for proper teardown, control and manage the lifecycle by explicitly cleaning up without deleting DOM elements, enable safe disposal of grouped buttons and nested widgets to maintain application performance and prevent memory issues, unset event bindings and remove stored metadata linked to grouped button controls, finalize and reset UI button group interactions and state prior to removal or replacement.
</div>

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


<div class="meta-api-description">
How do I disable user input for all buttons in a Kendo UI ButtonGroup? Toggle or set the interactive state of a group of buttons dynamically by enabling or disabling user input and interaction, controlling whether the buttons within the group respond to clicks, taps, or other actions, programmatically activating or deactivating the entire button collection to manage usability, availability, or access based on application logic, user permissions, or workflow status, and switching between enabled and disabled states that visually indicate interactivity or inactivity for the button set.
</div>

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


<div class="meta-api-description">
How to programmatically select an item in Kendo UI ButtonGroup? Programmatically set or change which button is selected within a group of buttons without requiring user clicks, enabling automated control over button states, selection updates, or active choices in UI button groups; configure the selection state directly from code, trigger selection changes silently without firing user interaction events, or manually invoke events to simulate user selection, supporting scenarios where developers need to control button group options dynamically, update active buttons through scripts, or manage selection logic without user input.
</div>

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


<div class="meta-api-description">
How do I detect when a button is selected in a ButtonGroup? Detect and respond to user interactions when a button within a group is clicked or chosen by capturing selection events or changes, enabling developers to trigger custom actions like updating state, syncing with data models, handling form inputs, toggling UI components, tracking analytics, or executing callbacks upon button press or selection changes within a set of grouped buttons.
</div>

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
