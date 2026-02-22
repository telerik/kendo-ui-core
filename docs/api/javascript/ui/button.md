---
title: Button
description: Configuration, methods and events of the Kendo UI Button
res_type: api
component: button
---

# kendo.ui.Button

Represents the Kendo UI Button widget. Inherits from [Widget](/api/javascript/ui/widget).


## Configuration

### badge `Boolean|String|Number|Object`

If set to true a default overlay badge will be displayed. If set to a string, an ovelay with content set to the specified string will be displayed. Can be set to a JavaScript object which represents the configuration of the [`Badge widget`](/api/javascript/ui/badge).


<div class="meta-api-description">
How do I add a notification count to a Kendo UI button? Control and customize overlay badges on buttons to display notification counts, status labels, or indicators by enabling default badges, setting custom text badges, or configuring badge appearance and behavior through detailed object settings to show alert symbols, numeric counts, message indicators, or status markers directly on button elements for enhanced user feedback and interface clarity.
</div>

#### Example - Various badge settings

    <div style="padding: 10px; background: #cccccc;">
        <button id="button" type="button">Foo</button>
    </div>
    <script>
        $("#button").kendoButton({
            badge: {
                text: 1234,
                max: 99,
                themeColor: "warning",
                shape: "circle",
                cutoutBorder: true
            }
        });
    </script>


### badge.align `String` *(default: '')*

Specifies alignment of the badge relative to button. Valid position options are: `top start`, `top end`, `bottom start`, `bottom end`.

`badge.align` works in conjunction with [`badge.position`](/api/javascript/ui/button/configuration/badge.position).


<div class="meta-api-description">
How do I align a badge on a Kendo UI button? Control the positioning and alignment of a badge on a button by specifying which corner the badge anchors to, enabling placement at the top-left, top-right, bottom-left, or bottom-right edges. Adjust or set badge alignment to customize badge location relative to the button, combining alignment and positioning options to fine-tune the badge’s exact corner placement for notifications, indicators, or status markers. Configure corner alignment for badges attached to buttons, allowing developers to set badge orientation from multiple anchor points for clarity and design consistency in user interfaces, including options for top-start, top-end, bottom-start, and bottom-end alignments.
</div>

#### Example

    <button id="button">Button</button>
    <script>
      $("#button").kendoButton({
        badge: {
          text: "5",
          position: "edge",
          align: "top end"
        }
      });
    </script>

### badge.cutoutBorder `Boolean` *(default: false)*

Specifies wether or not to render additional "cutout" border around the badge.


<div class="meta-api-description">
How do I customize the visual emphasis of a button's badge by using a cutout border? Enable or disable the display of a decorative cutout border around a button’s badge to customize visual emphasis, highlight badges with or without additional border accents, configure badge border styling dynamically, control whether the button’s badge includes an outlined or accented cutout effect, set or toggle the presence of a distinctive border cutoff around badge elements for enhanced UI visibility, adjust badge appearance to include or exclude extra border details, manipulate badge border decorations during button setup or runtime, manage the border style of badges with cutout effects to achieve different visual presentations, and modify badge highlight borders to suit design or interaction requirements.
</div>

#### Example

    <button id="button">Button</button>
    <script>
      $("#button").kendoButton({
        badge: {
          text: "New",
          cutoutBorder: true
        }
      });
    </script>

### badge.fillMode `String` *(default: undefined)*

Sets a value controlling how the color is applied to the badge. When `undefined` (the default), the theme controls the fill mode. Can also be set to the following string values:

- "solid"
- "outline"


<div class="meta-api-description">
How do I configure the fill mode for a button's badge in Kendo UI? Configure how a button’s badge displays colors by choosing between a solid filled background or an outlined style, enabling control over the badge’s visual emphasis, color application, and theme integration. Adjust badge color styling to either fill the entire badge area with the theme color or only outline its edges for subtle highlighting. Set or customize badge appearance, color fill mode, design style, appearance mode, or theme-based color application for badges on buttons to match UI preferences, accessibility needs, or branding requirements. Enable, switch, or control badge color fill behavior to achieve either a fully colored badge background or a minimal outlined badge look in your interface.
</div>

#### Example

    <button id="button">Button</button>
    <script>
      $("#button").kendoButton({
        badge: {
          text: "3",
          fillMode: "outline",
          themeColor: "primary"
        }
      });
    </script>

### badge.icon `String` *(default: '')*

Defines the name for an existing icon in a Kendo UI theme or SVG content. The icon is rendered inside the badge by a `span.k-icon` or `span.k-svg-icon` element.


<div class="meta-api-description">
How do I add an icon to a Kendo UI button's badge? Configure or set a badge icon on a button by specifying an existing theme icon name or providing custom raw SVG content to display as a visual indicator or notification marker within the button’s badge area. Enable embedding of scalable vector graphics or standard icon fonts inside the badge for consistent styling and flexible design, allowing controls to show status, alerts, counts, or decorative symbols on buttons in applications. Customize the badge’s icon content whether you need prebuilt icons or custom SVGs injected with proper elements to ensure uniform rendering and appearance on user interface buttons.
</div>

#### Example

    <button id="button">Button</button>
    <script>
      $("#button").kendoButton({
        badge: {
          icon: "check",
          themeColor: "success"
        }
      });
    </script>

### badge.max `Number` *(default: Infinity)*

If `text` is a number, it will cap that number.


<div class="meta-api-description">
How do I limit the maximum value shown on a button's badge in Kendo UI for jQuery? Control and configure the maximum numeric value shown on a button’s badge by setting an upper limit that caps displayed numbers, ensuring that if the badge text is a number exceeding this threshold, the badge shows a fixed maximum instead of the actual higher number. Set, adjust, or limit the badge count display to prevent overflow or excessively large numbers, enabling consistent UI presentation and user-friendly numeric constraints on visual notification indicators. This feature helps to set, restrict, or enforce ceiling values on numeric badges for buttons, useful for controlling large counts, notifications, or status indicators shown as numbers inside button badges.
</div>

#### Example

    <button id="button">Button</button>
    <script>
      $("#button").kendoButton({
        badge: {
          text: 150,
          max: 99
        }
      });
    </script>

### badge.position `String` *(default: 'edge')*

Specifies position of the badge relative to the edge of the button. Valid placemnt options are: `inline`, `edge`, `inside`, `outside`.

Note: position configuration, other than `inline`, requires the badge to be aligned. See [`badge.align`](/api/javascript/ui/button/configuration/badge.align) for more details.


<div class="meta-api-description">
How do I position a badge next to a button in Kendo UI for jQuery? Control the placement of a badge relative to a button by setting its position to inline, edge, inside, or outside, enabling precise alignment along the button’s borders or within its area; adjust or customize the badge location for different UI layouts, user interface design preferences, or visual emphasis, ensuring the badge appears exactly where needed on the button edge or embedded inside, and pair with alignment settings to fine-tune horizontal or vertical placement for notifications, indicators, counters, or status marks on buttons in various styles and contexts.
</div>

#### Example

    <button id="button">Button</button>
    <script>
      $("#button").kendoButton({
        badge: {
          text: "8",
          position: "inside",
          align: "bottom end"
        }
      });
    </script>

### badge.shape `String` *(default: 'rounded')*

Specifies the shape of the badge. Valid options are: `rectangle`, `rounded`, `pill`, `circle`, `dot`.


<div class="meta-api-description">
How do I change the shape of a badge on a Kendo UI button? Customize and configure the badge shape on buttons by selecting from various styles such as rectangle, rounded corners, pill-shaped, circular, or small dot indicators to fit different design themes, user interface layouts, and visual preferences, enabling control over badge appearance, shape styling, spacing, and how notification or status markers are displayed on interactive elements.
</div>

#### Example

    <button id="button">Button</button>
    <script>
      $("#button").kendoButton({
        badge: {
          text: "7",
          shape: "circle"
        }
      });
    </script>

### badge.size `String` *(default: undefined)*

Sets a value controlling the size of the badge. When `undefined` (the default), the theme controls the size. Can also be set to the following string values:

- "small"
- "medium"
- "large"


<div class="meta-api-description">
How do I change the size of a notification badge in Kendo UI for jQuery Button? Control and adjust the visual dimensions of notification badges or labels attached to buttons by configuring their size to small, medium, or large, enabling customization of badge scaling for alerts, counters, or indicators on interactive elements; set, modify, or enable badge dimension options to fit design needs or interface requirements, ensuring clear visibility and proportional appearance across different button styles and contexts.
</div>

#### Example

    <button id="button">Button</button>
    <script>
      $("#button").kendoButton({
        badge: {
          text: "10",
          size: "large"
        }
      });
    </script>

### badge.template `String|Function`

The [template](/api/javascript/kendo/methods/template) which renders the content of the badge.


<div class="meta-api-description">
How do I customize the badge content on a Kendo UI button using a template? Customize or configure dynamic badge content for buttons by setting templates that define the badge’s inner text or HTML, enabling injection of personalized labels, counts, icons, or conditional markup using string templates or functions; control the appearance and data-driven badge rendering with flexible template options to create real-time, context-aware badge content that can display notifications, statuses, or custom indicators within button elements.
</div>

#### Example

    <button id="button">Button</button>
    <script>
      $("#button").kendoButton({
        badge: {
          template: (data) => `${data.value}+`,
          text: 42
        }
      });
    </script>

### badge.text `String|Number` *(default: '')*

The text of the badge. Valid input includes `string`, `number` or `object` with `toString` method. Default is empty string.


<div class="meta-api-description">
How do I set a badge label on a Kendo UI button using different data types? Configure, update, or set the badge label on buttons to display counts, status indicators, notifications, or brief informational text using strings, numbers, or any object convertible to text. Control dynamic badges that reflect real-time data, user alerts, or summarized info on interactive elements, enabling versatile display of short messages or numeric values as overlay text on buttons. Adjust, change, or assign badge content for UI elements to enhance visual cues, status updates, or count displays with flexible input types supporting string conversion.
</div>

#### Example

    <button id="button">Button</button>
    <script>
      $("#button").kendoButton({
        badge: {
          text: "New",
          themeColor: "info"
        }
      });
    </script>


### badge.themeColor `String` *(default: 'secondary')*

Specifies the color of the component. Valid options are `inherit`, `default`, `primary`, `secondary`, `tertiary`, `info`, `success`, `warning`, `error`, `dark`, `light`, `inverted`.


<div class="meta-api-description">
How do I change the color of a button's badge in Kendo UI for jQuery? Configure or customize the badge color styling on a button by setting its theme or semantic color such as primary, secondary, success, warning, error, info, dark, light, inverted, or default to control the visual emphasis, feedback indication, or design consistency; developers may want to adjust or apply specific color themes for badges to match UI palettes, highlight status, convey state meaning, or inherit parent color schemes within interactive button components.
</div>

#### Example

    <button id="button">Button</button>
    <script>
      $("#button").kendoButton({
        badge: {
          text: "Alert",
          themeColor: "warning"
        }
      });
    </script>

### badge.visible `Boolean` *(default: true)*

If set to false the badge will not be displayed.


<div class="meta-api-description">
How to hide badge on button in Kendo UI? Toggle or configure the visibility of an inline notification badge, status indicator, or counter bubble attached to a button element by enabling or disabling its display, controlling whether the badge is rendered or hidden during initialization or runtime, managing the presence of alert dots, notification bubbles, or inline counters linked with buttons to visually indicate messages, updates, or statuses, and setting or changing badge visibility dynamically to show or hide small inline elements that communicate actionable or informational cues on user interface buttons.
</div>

#### Example

    <button id="button">Button</button>
    <script>
      $("#button").kendoButton({
        badge: {
          text: 21,
          visible: false
        }
      });
    </script>

### enable `Boolean` *(default: true)*

Indicates whether the **Button** should be enabled or disabled. By default, it is enabled, unless a `disabled="disabled"` attribute is detected.


<div class="meta-api-description">
How do I programmatically enable or disable a button in Kendo UI for jQuery? Control the interactive state of the button by setting whether it is active, clickable, responsive to user actions, or disabled, allowing configuration to enable or disable user input, toggle interactivity, set button availability, manage whether the control accepts clicks or taps, and override default enabled status including handling disabled attributes to restrict or allow button functionality in various user interface scenarios.
</div>

#### Example

    <button id="button" type="button">Foo</button>
    <script>
    $("#button").kendoButton({
        enable: false
    });
    </script>


### fillMode `String` *(default: undefined)*

Controls how the color is applied to the button. Valid values are: `"solid"`, `"outline"`, `"flat"`, and `"link"`. When `undefined` (the default), the theme controls the default fill mode.

> The `"none"` value is deprecated. Use custom CSS to achieve an unstyled appearance.


<div class="meta-api-description">
How do I customize the appearance of a Kendo UI button using the fillMode property? Control and customize the visual styling of buttons by adjusting how colors, backgrounds, borders, and fill effects are applied, enabling options like solid fills for vibrant buttons, outlined styles with border emphasis, flat designs without shadows, link-like appearances resembling hyperlinks, or no fill at all to create transparent or minimalistic button looks, supporting various user interface needs such as highlighting, subtlety, emphasis, or disabled states through configuring fill modes, background visibility, border presence, and button color schemes.
</div>

#### Example

    <button id="button" type="button">Cancel</button>
    <script>
        $("#button").kendoButton({
            fillMode: "outline"
        });
    </script>

### icon `String`

Defines a name of an existing icon in the Kendo UI theme sprite. The icon will be applied as background image of a `span` element inside the **Button**.
The `span` element can be added automatically by the widget, or an existing element can be used, if it has a `k-icon` CSS class applied.
For a list of available icon names, please refer to the [Icon Button article](https://docs.telerik.com/kendo-ui/controls/button/icons).


<div class="meta-api-description">
How do I set an icon for a Kendo UI button? Adjust, configure, or assign graphical icons, symbols, or sprite-based images to appear within buttons or clickable elements using predefined theme sprites, icon classes, or custom inline elements; enable visual indicators by specifying icon names, set background images for spans or elements styled with icon CSS classes, customize button appearance with built-in or thematic icon sets, control icon display inside button components, and integrate scalable, consistent iconography for UI buttons and interactive controls.
</div>

#### Example

    <button id="button" type="button">Cancel</button>
    <script>
    $("#button").kendoButton({
        icon: "cancel"
    });
    </script>

#### Example with an existing span element

    <button id="button" type="button">
        <span class="k-icon"></span> Cancel
    </button>
    <script>
    $("#button").kendoButton({
        icon: "cancel"
    });
    </script>


### iconClass `String`

Defines a CSS class - or multiple classes separated by spaced - which are applied to a `span` element inside the **Button**. Allows the usage of custom icons.


<div class="meta-api-description">
How to change the icon class on a Kendo UI button? Control custom icon appearance and styling in button elements by setting one or multiple CSS class names on the inner span, enabling the addition of icon fonts, custom graphical icons, or tailored visual styles; manage icon classes by assigning single or space-separated class strings to modify button icon layout, design, or theme easily through CSS class configurations on the embedded span element.
</div>

#### Example

    <link href="https://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet" />
    <button id="button" type="button">Cancel</button>
    <script>
        $("#button").kendoButton({
            iconClass: "fa fa-male"
        });
    </script>

### imageUrl `String`

Defines a URL, which will be used for an `img` element inside the Button. The URL can be relative or absolute. In case it is relative, it will be evaluated with relation to the web page URL.

The `img` element can be added automatically by the widget, or an existing element can be used, if it has a `k-image` CSS class applied.


<div class="meta-api-description">
How to set an image URL for a Kendo UI button? Set or control the button's visual content by specifying an image source URL, whether absolute or relative, to embed an image element inside a clickable button interface. Enable adding icons, pictures, or custom graphics within buttons by providing a direct image path or linking to external files, automatically generating the necessary image element or using a predefined style class for image inclusion. Configure button appearance with embedded images for UI design, theming, or branding by assigning the image URL source dynamically or statically, supporting both local paths and web-based image addresses for rich, image-based button components.
</div>

#### Example

    <button id="button" type="button">Edit</button>
    <script>
        $("#button").kendoButton({
            imageUrl: "https://demos.telerik.com/kendo-ui/content/web/treeview/edit.png"
        });
    </script>

#### Example with an existing img element

    <button id="button" type="button">
        <img class="k-image" alt="Edit" /> Edit
    </button>
    <script>
        $("#button").kendoButton({
            imageUrl: "https://demos.telerik.com/kendo-ui/content/web/treeview/edit.png"
        });
    </script>

### rounded `String` *(default: undefined)*

Controls what border radius is applied to a button. Valid values are: `"small"`, `"medium"`, `"large"`, and `"full"`. When `undefined` (the default), the theme controls the default border radius.

> The `"none"` value is deprecated. Use custom CSS to remove border radius.


<div class="meta-api-description">
How do I customize the border radius of a Kendo UI button? Adjust or customize button corner styles and border-radius settings by enabling rounded edges, pill-shaped corners, fully circular shapes, or sharp square borders. Configure button radius size with options like small, medium, large, full roundness for pill or circle effects, or no rounding for crisp square corners. Control button shape appearance through border curve settings to create small radius corners, moderate rounding, large rounded edges, fully round pill designs, or remove rounding entirely. This covers customizing CSS border-radius to achieve various button corner aesthetics, from subtle curves to fully rounded or angular edges. Set corner curvature for buttons by specifying radius levels or disabling rounding to suit different UI styles and interactive components.
</div>

#### Example

    <button id="button" type="button">Cancel</button>
    <script>
        $("#button").kendoButton({
            rounded: "full"
        });
    </script>

### size `String` *(default: undefined)*

Controls the overall physical size of a button. Valid values are: `"small"`, `"medium"`, and `"large"`. When `undefined` (the default), the theme controls the default size.

> The `"none"` value is deprecated. Use custom CSS to customize the size.


<div class="meta-api-description">
How do I adjust the size of a Kendo UI button? Adjust the button’s size, dimension, or scale to create a smaller, medium, large, or no-size button for UI elements, enabling control over appearance, spacing, and layout by configuring compact, standard, or prominent button formats. This setting lets developers set, customize, or define button height, width, and overall footprint to match design requirements, visual hierarchy, or responsiveness across applications.
</div>

#### Example

    <button id="button" type="button">Cancel</button>
    <script>
        $("#button").kendoButton({
            size: "large"
        });
    </script>

### spriteCssClass `String`

Defines a CSS class (or multiple classes separated by spaces), which will be used for applying a background image to a `span` element inside the **Button**.
In case you want to use an icon from the Kendo UI theme sprite background image, it is easier to use the [`icon` property](/api/javascript/ui/button#configuration-icon).

The `span` element can be added automatically by the widget, or an existing element can be used, if it has a `k-sprite` CSS class applied.


<div class="meta-api-description">
How do I configure sprite background images on interactive elements using Kendo UI button's `spriteCssClass` property? Configure sprite background images on interactive elements by assigning one or more CSS classes that control icon sprites, enabling the use of multiple class names separated by spaces to style embedded spans inside buttons or similar controls. Manage or customize sprite icons by applying these CSS classes to specific inner elements, either auto-generated spans or existing elements marked with sprite-related classes. Adjust, set, or toggle sprite-based visuals using class selectors to enhance UI components with scalable, cached graphics, and integrate with themes or icon systems by blending sprite classes or replacing them with dedicated icon properties for optimized display. This approach supports flexible styling, sprite positioning, and efficient image loading by leveraging CSS class assignments targeting sprite backgrounds inside buttons or comparable UI elements.
</div>

#### Example

    <button id="button" type="button">Edit</button>
    <script>
        $("#button").kendoButton({
            spriteCssClass: "myEditIcon"
        });
    </script>

#### Example with an existing span element

    <button id="button" type="button">
        <span class="k-sprite"></span> Edit
    </button>
    <script>
        $("#button").kendoButton({
            spriteCssClass: "myEditIcon"
        });
    </script>

### themeColor `String` *(default: undefined)*

Controls the main color applied to the button. Valid values are: `"base"`, `"primary"`, `"secondary"`, `"tertiary"`, `"info"`, `"success"`, `"warning"`, `"error"`, `"dark"`, `"light"`, and `"inverse"`. When `undefined` (the default), the theme controls the default theme color.

> The `"none"` value is deprecated. Use custom CSS to remove the theme color styling.


<div class="meta-api-description">
How do I set the color scheme of a Kendo UI button using themeColor property? Control and customize the primary color scheme of buttons to indicate different statuses, importance levels, or stylistic themes, enabling you to apply various predefined color presets such as base, primary, secondary, tertiary, informational, success, warning, error, dark, light, inverse, or disable coloring altogether. Configure button appearance to differentiate actions, highlight critical functions, set contextual meanings, or match branding by selecting from essential tone options that convey alerts, confirmations, or neutral states, supporting diverse visual emphasis and UI consistency in your application’s controls.
</div>

#### Example

    <button id="button" type="button">Cancel</button>
    <script>
        $("#button").kendoButton({
            themeColor: "dark"
        });
    </script>

## Methods

### enable

Enables or disables the Button.


<div class="meta-api-description">
How do I programmatically enable or disable a Kendo UI button? Control the interactive state of a button by programmatically enabling or disabling user input, toggling whether the button responds to clicks or touch while updating its visual disabled styling, dynamically setting its usability during runtime, managing interactive controls through code to prevent or allow user actions on the button component by passing true to activate or false to deactivate its input functionality and appearance, adjusting interactivity, accessibility, and visual feedback for button elements during application flow.
</div>

#### Parameters

##### toggle `Boolean`

Indicates whether the **Button** should be enabled or disabled. `true` and `false` arguments are accepted. If no argument is supplied, the **Button** will assume `true` and will be enabled.

#### Example

    <button id="button" type="button">Edit</button>
    <script>
        $("#button").kendoButton();
        var button = $("#button").data("kendoButton");
        // disable button
        button.enable(false);
        // enable button
        button.enable(true);
    </script>

## Events

### click

Fires when the **Button** is clicked with the mouse, touched on a touch device, or ENTER (or SPACE) is pressed while the **Button** is focused.


<div class="meta-api-description">
How do I detect when a button is clicked in Kendo UI for jQuery? Detect and handle user interactions with buttons triggered by mouse clicks, touch taps, keyboard keys like ENTER or SPACE, or other activation methods, enabling developers to execute custom functions, control form submissions, navigation, action triggering, event prevention, and accessibility-related behaviors when users activate interactive UI elements or controls.
</div>

#### Event Data

##### e.event `Object`

The original DOM event.

#### Example - subscribe to the "click" event during initialization

    <button id="button" type="button">Edit</button>
    <script>
        $("#button").kendoButton({
            click: function(e) {
                alert(e.event.target.tagName);
            }
        });
    </script>

#### Example - subscribe to the "click" event after initialization

    <button id="button" type="button">Edit</button>
    <script>
        $("#button").kendoButton();
        var button = $("#button").data("kendoButton");
        button.bind("click", function(e) {
            alert(e.event.target.tagName);
        });
    </script>
