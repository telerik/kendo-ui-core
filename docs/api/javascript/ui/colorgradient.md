---
title: ColorGradient
page_title: Configuration, methods and events of Kendo UI ColorGradient
res_type: api
---

# kendo.ui.ColorGradient

This is the HSV color selector, which is used by default in the `kendo.ui.FlatColorPicker`.

## Configuration

### opacity `Boolean` *(default: false)*

Specifies whether we should display the opacity slider to allow
selection of transparency.


<div class="meta-api-description">
Control the visibility and availability of transparency adjustment within color gradients by enabling or disabling the opacity or alpha slider, allowing users to select or restrict semi-transparent colors, configure alpha channel manipulation during color selection, set whether transparency controls appear in color pickers, toggle user access to opacity modification in gradients, manage transparency options initialization for customizable color presentations, and adjust or limit the ability to apply varying alpha levels within color blending tools.
</div>

#### Example

    <div id="colorgradient"></div>
    <script>
    $("#colorgradient").kendoColorGradient({
      opacity: true
    });
    </script>

### contrastTool `Boolean|Object` *(default: false)*

Enables the contrast tool in the ColorGradient.


<div class="meta-api-description">
Configure and enable contrast checking tools for color gradients to assess and measure foreground and background color combinations, verify accessibility compliance, ensure sufficient contrast ratios according to WCAG standards, preview color contrast dynamically, adjust gradient colors for better visibility and readability, validate color accessibility during design, control contrast evaluation features, and set up integrated UI components for checking contrast levels within color transition ranges.
</div>

#### Example

    <div id="ColorGradient"></div>
    <script>
    $("#ColorGradient").kendoColorGradient({
      contrastTool: true
    });
    </script>

### contrastTool.backgroundColor `String|kendo.Color` *(default: '#ffffff')*

Sets the background color for the contrast tool in the ColorGradient.


<div class="meta-api-description">
Adjust or configure the background color of the contrast adjustment tool within color gradient interfaces, enabling you to set, customize, or modify the tool’s backdrop using various CSS color formats such as hex codes, RGB values, or named colors to enhance visibility, improve contrast previews, or tailor the interface appearance for better color differentiation and accessibility testing in design workflows.
</div>

#### Example

    <div id="ColorGradient"></div>
    <script>
    $("#ColorGradient").kendoColorGradient({
      contrastTool: {
        backgroundColor: "#ff0000"
      }
    });
    </script>

### format `String` *(default: "hex")*

Sets the default input format in the gradient input editor.


<div class="meta-api-description">
Configure color input and parsing formats for gradients by setting the default color notation such as hex codes, RGB values, HSL values, or other color models controlling how colors are entered, displayed, interpreted, and processed within gradient editors or interfaces, enabling customization of color representation and input handling during initialization and user interaction for flexible color specification, conversion, and validation across various color format requirements.
</div>

#### Example

    <div id="ColorGradient"></div>
    <script>
    $("#ColorGradient").kendoColorGradient({
      format: "rgb"
    });
    </script>

### formats `Array` *(default: ["hex", "rgb"])*

Sets the available input formats in the gradient input editor. Only "hex" and "rgb" are valid values.


<div class="meta-api-description">
Control and customize which color code formats the gradient color picker accepts and recognizes for user input, such as enabling or disabling hexadecimal (hex) or RGB color values, configuring supported color notation types for color selection interfaces, setting acceptable formats for color entry and editing in gradient tools, and managing input mode preferences to restrict or allow specific color representation styles like hex strings or RGB numeric values during color gradient configuration.
</div>

#### Example

    <div id="ColorGradient"></div>
    <script>
    $("#ColorGradient").kendoColorGradient({
      format: "rgb",
      formats: ["rgb"]
    });
    </script>

### input `Boolean` *(default: true)*

Whether to render the input.


<div class="meta-api-description">
Configure whether to display or hide an editable input field within a color gradient interface, allowing users to enable or disable direct color value entry, set interactive color adjustment controls, toggle input visibility inside gradient controls, or control the presence of a color input box embedded in the gradient component for manual color editing and user input.
</div>

#### Example

    <div id="ColorGradient"></div>
    <script>
    $("#ColorGradient").kendoColorGradient({
      input: false
    });
    </script>

### size `String`*(default: "medium")*

Sets a value controlling size of the component. Can also be set to the following string values:

- "small"
- "medium"
- "large"
- "none"


<div class="meta-api-description">
Adjust or configure the visual scale, dimensions, or overall size of a color gradient component by specifying numeric values or selecting from predefined size options such as small, medium, large, or none. This enables developers to set the gradient’s rendered scale, control its appearance, customize its display size, or scale the color effect dynamically for UI elements, ensuring flexible sizing whether using precise measurements or common size labels.
</div>

#### Example

    <div id="ColorGradient"></div>
    <script>
    $("#ColorGradient").kendoColorGradient({
      size: "small"
    });
    </script>


### value `String | kendo.Color` *(default: null)*

Specifies the initially selected color.


<div class="meta-api-description">
Set or initialize the starting color for a gradient control, preloading a default or initial color choice, configuring the color picker with a preset value, defining the currently selected color for binding to data models, programmatically retrieving or updating the chosen color, controlling the initial color state, seeding user input with a predefined hue, and managing color selection settings dynamically within the gradient interface.
</div>

#### Example

    <div id="colorgradient"></div>
    <script>
    $("#colorgradient").kendoColorGradient({
      value: "#b72bba"
    });
    </script>

### messages `Object`

Allows customization labels and messages in the ColorGradient.


<div class="meta-api-description">
Customize, configure, or set text labels, tooltips, prompts, notifications, and user-facing messages for color gradient controls to support localization, internationalization, translation, or multilingual interfaces by overriding default phrases, adjusting wording, or enabling language-specific strings in the user interface.
</div>

#### Example

    <div id="colorgradient"></div>
    <script>
    $("#colorgradient").kendoColorGradient({
      messages: {
        contrastRatio: "Contrast ratio",
        gradient: "Gradient view"
      }
    });
    </script>

### messages.contrastRatio `String` *(default: "Contrast ratio")*

Allows customization of the "Contrast ratio" text in the contrast tool.


<div class="meta-api-description">
Customize the text label for contrast ratio displayed in color gradient accessibility tools, enabling localization, translation, or adjustment of interface wording related to contrast measurement, contrast checking labels, or accessibility color contrast indicators within user interfaces.
</div>

#### Example

    <div id="colorgradient"></div>
    <script>
    $("#colorgradient").kendoColorGradient({
        contrastTool: true,
        messages: {
            contrastRatio: "Color Contrast"
        }
    });
    </script>

### messages.fail `String` *(default: "Fail")*

Allows customization of the "Fail" text in the contrast tool.


<div class="meta-api-description">
Configure the error message or failure text displayed during color contrast checks, customize the label or notification shown when contrast requirements are not met, set or modify the localized warning, alert, or fail prompt for accessibility tools assessing color gradients, control the text output for unsuccessful contrast validation, and adjust how failure messages appear in different languages or contexts within color contrast evaluation features.
</div>

#### Example

    <div id="colorgradient"></div>
    <script>
    $("#colorgradient").kendoColorGradient({
        contrastTool: true,
        messages: {
            fail: "Does not meet contrast standards"
        }
    });
    </script>

### messages.pass  `String` *(default: "Pass")*

Allows customization of the "Pass" text in the contrast tool.


<div class="meta-api-description">
Adjust, configure, or localize the text label indicating a successful pass in color contrast or accessibility gradient tools, enabling customization of status messages like "Pass" for different languages, UI themes, or user preferences. Control how success outcomes are displayed in color contrast checks, override default pass indicators, and set personalized or translated messages to improve accessibility feedback and user experience across various applications.
</div>

#### Example

    <div id="colorgradient"></div>
    <script>
    $("#colorgradient").kendoColorGradient({
        contrastTool: true,
        messages: {
            pass: "Meets contrast standards"
        }
    });
    </script>

### messages.toggleFormat `String` *(default: "Toggle format")*

Allows customization of the toggle format button's title in the Gradient's input editor.


<div class="meta-api-description">
Customize or localize the label, tooltip, or title text for the format toggle button in a color gradient input editor to control how users switch color coding styles, modify button captions, enable or configure multi-language support, adjust UI element text for accessibility, or set descriptive prompts for toggling color format display between options.
</div>

#### Example

    <div id="colorgradient"></div>
    <script>
    $("#colorgradient").kendoColorGradient({
        input: true,
        messages: {
            toggleFormat: "Switch color format"
        }
    });
    </script>

### messages.red `String` *(default: "Red")*

Allows customization of the rgb's red input's aria-label in the Gradient's input editor.


<div class="meta-api-description">
Customize or set the accessibility label, aria-label, or screen reader description for the red color input in color pickers, RGB input fields, or gradient editors to improve usability, accessibility, and assistive technology support when adjusting red channel values, configuring red component inputs, or controlling color gradient interfaces.
</div>

#### Example

    <div id="colorgradient"></div>
    <script>
    $("#colorgradient").kendoColorGradient({
        input: true,
        messages: {
            red: "Red channel"
        }
    });
    </script>

### messages.green `String` *(default: "Green")*

Allows customization of the rgb's green input's aria-label in the Gradient's input editor.


<div class="meta-api-description">
Customize or configure the accessible label, aria-label, or screen reader text for the green color channel input within a color gradient editor, specifically adjusting how the green RGB value is identified for assistive technologies, enabling control over the verbal description, accessibility naming, or spoken label for the green component in color pickers, input fields, or gradient controls.
</div>

#### Example

    <div id="colorgradient"></div>
    <script>
    $("#colorgradient").kendoColorGradient({
        input: true,
        messages: {
            green: "Green channel"
        }
    });
    </script>

### messages.blue `String` *(default: "Blue")*

Allows customization of the rgb's blue input's aria-label in the Gradient's input editor.


<div class="meta-api-description">
Customize the accessible label, aria-label, or screen reader description for the blue channel input of a color gradient editor, enabling developers to control or set the spoken text, accessibility message, or alternative text for the RGB blue component in gradient color pickers, improving usability and assistive technology support for color input controls related to blue values.
</div>

#### Example

    <div id="colorgradient"></div>
    <script>
    $("#colorgradient").kendoColorGradient({
        input: true,
        messages: {
            blue: "Blue channel"
        }
    });
    </script>

### messages.alpha `String` *(default: "Alpha")*

Allows customization of the rgb's alpha input's aria-label in the Gradient's input editor.


<div class="meta-api-description">
Customize, configure, or set the accessibility label for the alpha (opacity) input within color gradient controls, enabling control over the ARIA label that describes the transparency slider or input field for red-green-blue alpha channels. Adjust, modify, or localize the descriptive text used by screen readers to identify and explain the alpha component of color transparency, improving accessibility, usability, and clarity in color editing interfaces where users want to fine-tune or understand the opacity level in RGB color gradients.
</div>

#### Example

    <div id="colorgradient"></div>
    <script>
    $("#colorgradient").kendoColorGradient({
        input: true,
        opacity: true,
        messages: {
            alpha: "Alpha channel"
        }
    });
    </script>

### messages.hex `String` *(default: "HEX")*

Allows customization of the hex input's aria-label in the Gradient's input editor.


<div class="meta-api-description">
Customize or configure the hex color input label for enhanced accessibility, screen reader support, and localization in color gradient controls, enabling clear semantic descriptions, ARIA labeling, and multilingual adaptations for color picker hex code inputs, facilitating usability improvements, internationalization, and user interface customization for assistive technologies and diverse user settings.
</div>

#### Example

    <div id="colorgradient"></div>
    <script>
    $("#colorgradient").kendoColorGradient({
        input: true,
        messages: {
            hex: "Hexadecimal value"
        }
    });
    </script>

## Methods

### focus

Focuses the widget.


<div class="meta-api-description">
Control and configure keyboard focus and accessibility focus for color gradient interfaces by programmatically setting input focus and enabling ARIA focus management, ensuring the component receives keyboard events and is properly announced by screen readers, allowing developers to programmatically move focus to the element for improved keyboard navigation, accessibility support, and interactive UI workflows.
</div>

#### Example

    <div id="colorgradient"></div>
    <script>
    $("#colorgradient").kendoColorGradient();
    var colorgradient = $("#colorgradient").data("kendoColorGradient");
    colorgradient.focus();
    </script>

### value `String|kendo.Color` *(default: null)*

Get or set the selected color. If no argument is given, this returns the
currently selected color as a string in format #FFFFFF when the `opacity`
option is off, or rgba(255, 255, 255, 1) when `opacity` is requested.

If one argument is given, it selects the new color and updates the UI.  The
argument can be a string in hex, rgb or rgba format, or a [Color][] object.
This does not trigger the "change" event.


<div class="meta-api-description">
Control, retrieve, or update the currently selected color within a color gradient interface by getting or setting color values in multiple formats such as hex strings (#FFFFFF), RGB, RGBA with opacity, or color objects. Enable dynamic color selection, modification, and querying without triggering change events, allowing configuration of opacity handling and seamless conversion between color representations. Ideal for reading the active color state or programmatically applying specific colors to user interfaces with support for both opaque and transparent color specifications.
</div>

#### Parameters

##### color `String` *(optional)*

#### Returns

`String` the string representation of the current color.

#### Example

    <div id="colorgradient"></div>
    <script>
    $("#colorgradient").kendoColorGradient();
    var colorgradient = $("#colorgradient").data("kendoColorGradient");

    // set picker value
    colorgradient.value("#ccc");

    // get picker value
    var value = colorgradient.value();
    </script>

### color

Get or set the selected color. If no argument is given, this returns the currently selected color as a [`kendo.Color` object](/api/javascript/color).


<div class="meta-api-description">
Retrieve or update the currently chosen color within a color gradient, enabling programmatic access to read the active hue or change the selection dynamically. This functionality supports fetching the present color value, modifying the color selection by specifying a new color input, adjusting or synchronizing the gradient's active color state, controlling color selection through code, querying the current fill or shade, and setting the gradient color to a preferred or computed color value for styling, theming, or user interface updates.
</div>

#### Parameters

##### color `kendo.Color` *(optional)*

The color that should be set as the current value

#### Returns

`kendo.Color` the current value

#### Example

    <div id="colorgradient"></div>
    <script>
    $("#colorgradient").kendoColorGradient();
    var colorgradient = $("#colorgradient").data("kendoColorGradient");

    // set picker color using kendo.Color object
    var color = kendo.Color.fromRGB(255, 0, 0, 1);
    colorgradient.color(color);

    // get picker color as kendo.Color object
    var currentColor = colorgradient.color();
    console.log(currentColor.toCss()); // logs the color in CSS format
    </script>

### enable

Enables or disables the widget.


<div class="meta-api-description">
Activate or deactivate user interaction on the color gradient interface by invoking enable with true or false to toggle the component’s ability to respond to user input, control interactivity dynamically after setup, switch on or off user control, manage input acceptance on the gradient selector, set the component to interactive or non-interactive modes, enable touch or mouse input processing for color adjustments, disable user manipulation for read-only displays, configure whether users can modify the gradient visually, and control responsiveness to interaction events during runtime.
</div>

#### Parameters

##### enable `Boolean` *(optional)*

Whether the widget should be enabled (`true`) or disabled (`false`). If not specified, the method will enable the widget.

#### Example

    <div id="colorgradient"></div>
    <script>
    $("#colorgradient").kendoColorGradient();
    var colorgradient = $("#colorgradient").data("kendoColorGradient");
    colorgradient.enable(false);
    </script>

## Events

### change

Triggers when a new color has been selected.


<div class="meta-api-description">
Detect color selection changes, capture updates when users pick or adjust colors in gradient controls, listen for color update events triggered by user interaction or programmatic selection, handle dynamic color choice notifications, respond to new color inputs for UI refresh or data saving, track color picker adjustments or changes in gradient values, enable reactions to color modifications within color controls, monitor color selection events to synchronize application state or trigger logic, bind event listeners to receive details about updated color choices or context during color changes.
</div>

#### Event Data

##### e.value `String`

The value of the ColorGradient.

#### Example - subscribe to the "change" event during initialization

    <div id="colorgradient"></div>
    <script>
    $("#colorgradient").kendoColorGradient({
      change: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("The newly selected color is ", e.value);
      }
    });
    </script>

#### Example - subscribe to the "change" event after initialization

    <div id="colorgradient"></div>
    <script>
    function picker_change(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log("The newly selected color is ", e.value);
    }
    $("#colorgradient").kendoColorGradient();
    var colorgradient = $("#colorgradient").data("kendoColorGradient");
    colorgradient.bind("change", picker_change);
    </script>

[parseColor]: /api/javascript/kendo#parseColor
[Color]: /api/javascript/kendo#Color
