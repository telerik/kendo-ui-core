---
title: FlatColorPicker
page_title: Configuration, methods and events of Kendo UI FlatColorPicker
res_type: api
---

# kendo.ui.FlatColorPicker

A standalone color editor with color palette and color gradient views.

## Configuration

### opacity `Boolean` *(default: false)*

Specifies whether we should display the opacity slider to allow
selection of transparency.


<div class="meta-api-description">
Control transparency and alpha channel selection by enabling or disabling the opacity slider within the color picker interface, allowing users to adjust color transparency levels interactively, toggle visibility of the transparency control, set or configure an alpha adjustment handle, and manage whether the color selection includes opacity settings or only solid colors.
</div>

#### Example

    <div id="flatpicker"></div>
    <script>
    $("#flatpicker").kendoFlatColorPicker({
      opacity: true
    });
    </script>

### buttons `Boolean` *(default: false)*

Specifies whether the widget should display the Apply / Cancel buttons.


<div class="meta-api-description">
Control the visibility and presence of confirmation controls such as Apply and Cancel buttons within a color selection interface, enabling configuration to require explicit user approval before applying changes or to allow instant color updates without prompts, adjusting user interaction flow by toggling acceptance and cancellation options during component setup or runtime.
</div>

#### Example

    <div id="flatpicker"></div>
    <script>
    $("#flatpicker").kendoFlatColorPicker({
      buttons: true
    });
    </script>

### columns `Number`

The number of columns to show in the palette. Also defines the width of the FlatColorPicker.


<div class="meta-api-description">
Control the number of color swatch columns or grid layout in a color palette picker to adjust the width, arrangement, or sizing of the color selection interface; configure how many color cells appear horizontally, customize palette column count for responsive design or compact view, set the horizontal layout density of color options, manage color picker grid columns to optimize visual space or style preferences, and define the number of columns shown for flexible palette display in user interfaces.
</div>

#### Example - wrap list of colors on two rows with 3 columns

    <input id="flatcolorpicker" type="color" />
    <script>
    $("#flatcolorpicker").kendoFlatColorPicker({
      palette: [ "#000", "#333", "#666", "#999", "#ccc", "#fff" ],
      columns: 3
    });
    </script>

### contrastTool `Boolean|Object` *(default: false)*

Enables the contrast tool in the ColorGradient.


<div class="meta-api-description">
Control the activation of a contrast-checking feature within a color gradient picker to enable or disable visual contrast analysis for accessibility purposes, allowing developers to set, toggle, or configure contrast tools that assess color combinations, ensure sufficient contrast ratios, and enhance usability and readability by evaluating color contrast directly inside gradient controls or color selection interfaces.
</div>

#### Example

    <div id="flatcolorpicker"></div>
    <script>
    $("#flatcolorpicker").kendoFlatColorPicker({
      contrastTool: true
    });
    </script>

### contrastTool.backgroundColor `String|kendo.Color` *(default: '#ffffff')*

Sets the background color for the contrast tool in the ColorGradient.


<div class="meta-api-description">
Set or configure the background color behind contrast analysis tools within color picking interfaces to enhance visibility, adjust contrast testing environments, control the backdrop shade for contrast indicators, customize the color gradient tool’s background, modify visual styling for contrast evaluation, improve readability behind contrast overlays, tailor the contrast tool backdrop color for accessibility checks, and fine-tune contrast display colors for design and development workflows.
</div>

#### Example

    <div id="flatcolorpicker"></div>
    <script>
    $("#flatcolorpicker").kendoFlatColorPicker({
      contrastTool: {
        backgroundColor: "#ff0000"
      }
    });
    </script>

### clearButton `Boolean` *(default: false)*
Specifies whether the widget should display the 'Clear color' button.


<div class="meta-api-description">
Control the presence or visibility of a clear, reset, or remove color button in a color selection interface, allowing users to quickly erase or reset their current color choice, toggle the option to enable or disable this feature, configure the display of a button that clears the picked or selected color, manage the availability of a user interface element for removing chosen colors, and set whether a reset or clear action for colors is accessible during color picker setup or initialization.
</div>

#### Example

    <div id="flatcolorpicker"></div>
    <script>
    $("#flatcolorpicker").kendoFlatColorPicker({
      clearButton: true
    });
    </script>

### format `String` *(default: "hex")*

Sets the default input format in the gradient input editor.


<div class="meta-api-description">
Set or adjust the color input format and value representation in a gradient color picker, enabling users to specify, edit, or parse color strings in various notations such as hex, RGB, RGBA, HSL, or other color code formats; control how color values are displayed, interpreted, and validated during entry or initialization, influencing the expected syntax, input parsing behavior, and the editing experience for gradients, swatches, or color stops within color selection components.
</div>

#### Example

    <div id="flatcolorpicker"></div>
    <script>
    $("#flatcolorpicker").kendoFlatColorPicker({
      format: "rgb"
    });
    </script>

### formats `Array` *(default: ["hex", "rgb"])*

Sets the available input formats in the gradient input editor. Only "hex" and "rgb" are valid values.


<div class="meta-api-description">
Customize and restrict color input options to specific string formats such as hexadecimal and RGB for color selection interfaces, enabling precise control over accepted color values, format validation, parsing rules, and input UI behavior when users enter or edit gradient colors. Configure which color code formats are recognized and processed in color pickers, allowing developers to limit user input to hex codes or RGB strings, manage format acceptance, enforce consistent color string standards, and tailor input mechanisms for gradient color editing.
</div>

#### Example

    <div id="flatcolorpicker"></div>
    <script>
    $("#flatcolorpicker").kendoFlatColorPicker({
      format: "rgb",
      formats: ["rgb"]
    });
    </script>


### input `Boolean` *(default: true)*

Whether to render the input in ColorGradient component.


<div class="meta-api-description">
Control the visibility and availability of the color input field within a color picker interface, enabling or disabling the text box where users can type, paste, or edit color values in formats like hex codes, RGB values, or other color notations. Adjust whether the component includes a manual color entry option, allowing for direct input of color strings, managing user interaction with color gradients versus textual color specification, and customizing the UI for color selection via text entry or purely graphical picking.
</div>

#### Example

    <div id="flatcolorpicker"></div>
    <script>
    $("#flatcolorpicker").kendoFlatColorPicker({
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
Adjusting the control's visual dimensions, compactness, or scale is possible by selecting size options like small, medium, large, or disabling sizing altogether; this enables customizing the color picker’s overall appearance, layout density, and footprint within user interfaces, facilitating configuration of component scale to fit different design needs or responsive layouts, set color selector sizing, control widget compactness, or modify the flat color picker's dimension presets for better integration and usability.
</div>

#### Example

    <div id="flatcolorpicker"></div>
    <script>
    $("#flatcolorpicker").kendoFlatColorPicker({
      size: "small"
    });
    </script>


### value `String | kendo.Color` *(default: null)*

Specifies the initially selected color.


<div class="meta-api-description">
Configure the initial color selection, preset or prefill the starting color state, set or restore the default chosen color, control the color displayed on component load, establish the first visible selected color, define the starting color value for color pickers, enable preselecting or initializing with a specific color, adjust the component’s initial color choice, specify the default color shown upon rendering, and manage the initial color input or state for user interface color selection tools.
</div>

#### Example

    <div id="flatpicker"></div>
    <script>
    $("#flatpicker").kendoFlatColorPicker({
      value: "#b72bba"
    });
    </script>

### view `String` *(default: "gradient")*

The initially selected view in the FlatColorPicker.


<div class="meta-api-description">
Control or configure the initial display mode, default selected tab, or starting interface of a color selection component, specifying which view or panel appears first when the color picker loads or initializes. Set or enable the preferred starting layout, such as palette, swatches, or custom view, to customize the user’s first interaction with the color selection tool. Adjust the default visible section or active view on launch to tailor the color picker's initial presentation or user experience.
</div>

#### Example

    <div id="flatcolorpicker"></div>
    <script>
    $("#flatcolorpicker").kendoFlatColorPicker({
      view: "palette"
    });
    </script>

### views `Array` *(default: [ "gradient", "palette" ])*

The available views in the FlatColorPicker. Valid values are "gradient" and "palette".


<div class="meta-api-description">
Configure and control the available color selection modes by enabling or disabling interfaces such as gradient sliders or palette swatches, allowing customization of color pickers to include gradient-based color picking, preset palettes, swatch views, or disable any mode for a streamlined UI, supporting versatile color choosing experiences through flexible mode toggling and interface selection.
</div>

#### Example

    <div id="flatcolorpicker"></div>
    <script>
    $("#flatcolorpicker").kendoFlatColorPicker({
      view: "palette",
      views: ["palette"]
    });
    </script>

### preview `Boolean` *(default: true)*

Specifies whether a selected and previous color are displayed for color comparison. with autoupdate set to true both selected and previous colors will be updated.


<div class="meta-api-description">
Control the display of side-by-side color swatches showing both the current selected color and the previous one for easy visual comparison, allowing users to preview changes in color pickers, toggle color previews on or off, enable automatic updating of color selections, review before and after hues, monitor color transitions, configure simultaneous display of previous and new colors, and set up real-time updates of shown color swatches for instant feedback when adjusting colors.
</div>

#### Example

    <div id="flatpicker"></div>
    <script>
    $("#flatpicker").kendoFlatColorPicker({
      preview: false
    });
    </script>

### autoupdate `Boolean` *(default: true)*

Specifies whether the UI should be updated while the user is typing in
the input field, whenever a valid color can be parsed.  If you pass
`false` for this, the widget will update only when ENTER is pressed.


<div class="meta-api-description">
Control live color preview updates during input editing by enabling or disabling automatic UI refresh as users type color values, allowing instant application of parsed valid colors or deferring updates until explicit confirmation like pressing Enter. Configure the color picker to dynamically reflect input changes in real-time, support manual commit for color selection changes, toggle between live updating and delayed update modes, and manage instant feedback versus controlled interaction for color input fields and components. Adjust settings to optimize user experience for color selection workflows needing immediate visual feedback or those prioritizing confirmation-based updates.
</div>

#### Example

    <div id="flatpicker"></div>
    <script>
    $("#flatpicker").kendoFlatColorPicker({
      autoupdate: false
    });
    </script>

### palette `String|Array` *(default: null)*

Specifies the color palette to display.


<div class="meta-api-description">
Configure and customize the selection of color swatches or color groups shown in a color picker interface, enabling control over which predefined colors, palettes, or color sets appear as clickable options for users to choose from, allowing adjustment of the visible grid or array of colors for easy selection, filtering, or grouping of hues to match design requirements or user preferences within color selection tools.
</div>

#### Example - use "websafe" palette

    <div id="flatcolorpicker"></div>
    <script>
    $("#flatcolorpicker").kendoFlatColorPicker({
      palette: "websafe",
      columns: 18
    });
    </script>

#### Example - use list of colors

    <div id="flatcolorpicker"></div>
    <script>
    $("#flatcolorpicker").kendoFlatColorPicker({
      palette: [ "#000", "#333", "#666", "#999", "#ccc", "#fff" ],
      columns: 6
    });
    </script>

### messages `Object`

Allows customization of "Apply" / "Cancel" labels.


<div class="meta-api-description">
Configure button text labels for color picker controls, including customizing the apply and cancel buttons to support localization, internationalization, translation, or setting alternative text for user interface actions in color selection widgets. Enable setting or overriding default messages for confirmation and cancellation buttons within color pickers to match different languages, regional settings, or UI preferences, ensuring buttons like apply, confirm, cancel, or close reflect desired wording in color selection components.
</div>

#### Example

    <div id="flatpicker"></div>
    <script>
    $("#flatpicker").kendoFlatColorPicker({
      buttons: true,
      messages: {
        apply: "Update",
        cancel: "Discard"
      }
    });
    </script>

### messages.apply `String`

Allows customization of "Apply" label.


<div class="meta-api-description">
Customize the label text of the color picker’s apply or confirm button to support localization, translation, multi-language interfaces, button text customization, UI text modification, changing the apply button caption, configuring the color selection confirmation label, adjusting action button wording, enabling custom button language settings, and tailoring the apply control text to match user language preferences or app-specific terminology.
</div>

#### Example

    <div id="flatpicker"></div>
    <script>
    $("#flatpicker").kendoFlatColorPicker({
      buttons: true,
      messages: {
        apply: "Update"
      }
    });
    </script>

### messages.cancel `String`

Allows customization of "Cancel" label.


<div class="meta-api-description">
Customize or set the label, text, caption, or name of the Cancel button in color picker interfaces, enabling localization, translation, or modification of the cancel action button text for internationalization, user interface personalization, or adapting the cancel control to different languages and regions while configuring or controlling the appearance and wording of cancel options in flat or pop-up color selection components.
</div>

#### Example

    <div id="flatpicker"></div>
    <script>
    $("#flatpicker").kendoFlatColorPicker({
      buttons: true,
      messages: {
        cancel: "Discard"
      }
    });
    </script>

### messages.clearColor `String` *(default: "Clear color")*

Allows customization of the Clear Color button label.


<div class="meta-api-description">
Customize the label text for the clear color button, adjust or translate the clear color action text, set or localize the button caption that resets or clears the selected color, modify the clear color button’s display text for different languages or preferences, configure the wording for the option to remove color selection or reset to no color, control the button label that clears the current color choice, update or customize the clear color prompt text in color pickers, tailor the clear color button title or message to fit UI language settings, enable localization of the clear color control text, and set the clear or reset color button label for better user interface clarity.
</div>

#### Example

    <div id="flatcolorpicker"></div>
    <script>
    $("#flatcolorpicker").kendoFlatColorPicker({
        messages: {
            clearColor: "Remove Color"
        }
    });
    </script>

### messages.contrastRatio `String` *(default: "Contrast ratio")*

Allows customization of the "Contrast ratio" text in the contrast tool.


<div class="meta-api-description">
Customize, configure, or set the label text for the color contrast ratio indicator, adjust accessibility tooltips or descriptions related to contrast levels, control the display wording for contrast ratio measurements in color pickers, modify the contrast validation messages or accessibility hints shown in color selection interfaces, and personalize the contrast ratio tooltips or labels to meet design or localization needs within color picking components.
</div>

#### Example

    <div id="flatcolorpicker"></div>
    <script>
    $("#flatcolorpicker").kendoFlatColorPicker({
        messages: {
            contrastRatio: "Color Contrast Ratio"
        }
    });
    </script>

### messages.fail `String` *(default: "Fail")*

Allows customization of the "Fail" text in the contrast tool.


<div class="meta-api-description">
Customize the contrast tool failure message, error label, or alert text shown when color contrast checks do not pass by configuring the localization or language settings for the warning, fail notification, or accessibility feedback in the color picker interface. This includes setting, changing, or enabling the display text that appears when contrast validation fails, allowing adjustments for internationalization, user feedback customization, or overriding default error prompts related to color contrast compliance.
</div>

#### Example

    <div id="flatcolorpicker"></div>
    <script>
    $("#flatcolorpicker").kendoFlatColorPicker({
        messages: {
            fail: "Failed"
        }
    });
    </script>

### messages.pass  `String` *(default: "Pass")*

Allows customization of the "Pass" text in the contrast tool.


<div class="meta-api-description">
Control and customize the label text indicating a successful contrast check or passing status within color selection tools, enabling you to set, rename, or localize the "pass" message displayed in color accessibility or contrast validation features to fit your UI terminology, user interface language preferences, or accessibility compliance feedback, ensuring that contrast tool status messages align with your design system and user experience requirements.
</div>

#### Example

    <div id="flatcolorpicker"></div>
    <script>
    $("#flatcolorpicker").kendoFlatColorPicker({
        messages: {
            pass: "Passed"
        }
    });
    </script>

### messages.gradient `String` *(default: "Gradient view")*

Allows customization of the Gradient view button.


<div class="meta-api-description">
Customize, configure, or set the text label, displayed message, or button caption for gradient selection in color pickers, enabling localization, multilingual support, personalized naming, or changing the gradient toggle’s visible text to match user interface language, terminology preferences, or accessibility needs when interacting with gradient controls in color picker components.
</div>

#### Example

    <div id="flatcolorpicker"></div>
    <script>
    $("#flatcolorpicker").kendoFlatColorPicker({
        messages: {
            gradient: "Color Gradient"
        }
    });
    </script>

### messages.palette `String` *(default: "Palette view")*

Allows customization of the Palette view button.


<div class="meta-api-description">
Customize the color selection palette button labels and tooltips, control the text shown on palette view toggles, set or update palette button captions and hover hints, configure the display names and accessibility tooltips for color palette options, tailor the palette interface wording, localize or modify the palette button text and descriptive tooltips to improve user interaction, manage palette view messaging, and adjust the color picker palette button prompts for clearer user guidance and interface customization.
</div>

#### Example

    <div id="flatcolorpicker"></div>
    <script>
    $("#flatcolorpicker").kendoFlatColorPicker({
        messages: {
            palette: "Color Palette"
        }
    });
    </script>

### messages.toggleFormat `String` *(default: "Toggle format")*

Allows customization of the toggle format button's aria-label in the Gradient's input editor.


<div class="meta-api-description">
Configure or customize the accessibility label, aria-label, or screen reader text for the button that switches between different input formats like gradient and flat color in the color picker component. Adjust or set the toggle button’s descriptive label to improve usability, accessibility, or voiceover interactions when enabling users to change color input modes, formats, or views within the color selection user interface. Enable control over how the toggle format button is described to assistive technologies for better navigation and clarity in gradient or flat color input editing scenarios.
</div>

#### Example

    <div id="flatcolorpicker"></div>
    <script>
    $("#flatcolorpicker").kendoFlatColorPicker({
        messages: {
            toggleFormat: "Switch Color Format"
        }
    });
    </script>

### messages.red `String` *(default: "Red")*

Allows customization of the rgb's red input's aria-label in the Gradient's input editor.


<div class="meta-api-description">
Customize the accessible label, aria-label, or screen reader description for the red color channel input within a color picker or gradient editor to improve accessibility, localization, voice-over support, or user interface clarity when adjusting red RGB values, red color sliders, or red components in color selection tools.
</div>

#### Example

    <div id="flatcolorpicker"></div>
    <script>
    $("#flatcolorpicker").kendoFlatColorPicker({
        messages: {
            red: "Red Channel"
        }
    });
    </script>

### messages.green `String` *(default: "Green")*

Allows customization of the rgb's green input's aria-label in the Gradient's input editor.


<div class="meta-api-description">
Set, customize, or configure the green channel input label, aria label, or accessibility label for the green value field in gradient or RGB color pickers, color input controls, or color selectors, enabling tailored screen reader text, localized prompts, or descriptive labels for the green component in color gradient editors, color pickers, or color input forms within UI components.
</div>

#### Example

    <div id="flatcolorpicker"></div>
    <script>
    $("#flatcolorpicker").kendoFlatColorPicker({
        messages: {
            green: "Green Channel"
        }
    });
    </script>

### messages.blue `String` *(default: "Blue")*

Allows customization of the rgb's blue input's aria-label in the Gradient's input editor.


<div class="meta-api-description">
Configure, customize, or localize the label, aria-label, or accessibility text for the blue channel input in a color picker’s RGB gradient editor interface, enabling setting or controlling the description, tooltip, or screen reader text associated with the blue color component input field, facilitating internationalization, translation, or customization of user interface elements that handle blue value adjustment in gradient or color selection controls.
</div>

#### Example

    <div id="flatcolorpicker"></div>
    <script>
    $("#flatcolorpicker").kendoFlatColorPicker({
        messages: {
            blue: "Blue Channel"
        }
    });
    </script>

### messages.alpha `String` *(default: "Alpha")*

Allows customization of the rgb's alpha input's aria-label in the Gradient's input editor.


<div class="meta-api-description">
Customize or set the accessible label for the transparency or opacity input in color pickers, control the ARIA description for the alpha channel in gradient or RGB color inputs, configure the screen reader text for alpha values in color editing interfaces, modify the descriptive text associated with transparency sliders or fields, adjust the accessibility labels for opacity adjustment controls, enable tailored aria-labels for alpha inputs in gradient or color pickers, define the spoken or assistive technology text for alpha component input areas, set user-friendly labels for RGBA alpha transparency fields, control how alpha or opacity inputs are identified by screen readers in color selection tools, and personalize the accessibility messages related to alpha channel inputs in color editing widgets.
</div>

#### Example

    <div id="flatcolorpicker"></div>
    <script>
    $("#flatcolorpicker").kendoFlatColorPicker({
        messages: {
            alpha: "Transparency"
        }
    });
    </script>

### messages.hex `String` *(default: "HEX")*

Allows customization of the hex input's aria-label in the Gradient's input editor.


<div class="meta-api-description">
Customize the accessible label or aria-label for the hexadecimal color input field in a gradient or color picker interface, enabling developers to set, modify, translate, localize, or configure the descriptive text or hint for the hex code input box, improving screen reader compatibility, accessibility, and user interface clarity when selecting or editing colors by their hex values.
</div>

#### Example

    <div id="flatcolorpicker"></div>
    <script>
    $("#flatcolorpicker").kendoFlatColorPicker({
        messages: {
            hex: "Hexadecimal"
        }
    });
    </script>

## Methods

### focus

Focuses the widget.


<div class="meta-api-description">
Programmatically set or move keyboard focus to a color picker component to enable keyboard interaction, accessibility support, or keyboard navigation; activate keyboard event handlers and input readiness by focusing the element via code, ensuring users can type, navigate, or control the picker with keys after initialization, programmatic commands, or dynamic user interface changes.
</div>

#### Example

    <div id="flatpicker"></div>
    <script>
    $("#flatpicker").kendoFlatColorPicker();
    var flatpicker = $("#flatpicker").data("kendoFlatColorPicker");
    flatpicker.focus();
    </script>

### value `String|kendo.Color` *(default: null)*

Get or set the selected color. If no argument is given, this returns the
currently selected color as a string in format #FFFFFF when the `opacity`
option is off, or rgba(255, 255, 255, 1) when `opacity` is requested.

If one argument is given, it selects the new color and updates the UI.  The
argument can be a string in hex, rgb or rgba format, or a [Color][] object.
This does not trigger the "change" event.


<div class="meta-api-description">
Retrieve or assign the chosen color dynamically by getting the current selection as a hex code like #FFFFFF or an rgba string including transparency if opacity is enabled, or by setting a new color using various formats such as hexadecimal strings, rgb or rgba notation, or color objects to update the user interface without triggering change events; control, query, or modify the color picker's value programmatically for tasks like initializing color, reading user choice, applying color presets, or syncing color states in different representations.
</div>

#### Parameters

##### color `String` *(optional)*

#### Returns

`String` the string representation of the current color.

#### Example

    <div id="flatpicker"></div>
    <script>
    $("#flatpicker").kendoFlatColorPicker();
    var flatpicker = $("#flatpicker").data("kendoFlatColorPicker");

    // set picker value
    flatpicker.value("#ccc");

    // get picker value
    var value = flatpicker.value();
    </script>

### color

Get or set the selected color. If no argument is given, this returns the currently selected color as a [`kendo.Color` object](/api/javascript/color).


<div class="meta-api-description">
Retrieve or assign the current chosen color in a color picker interface, enabling reading the user’s selected hue or programmatically updating the color value for dynamic UI changes, data binding, or customization. Accessing this method without parameters will provide the active color selection object, while supplying a color input will modify the picker’s selection accordingly, supporting scenarios such as syncing colors, initializing default values, capturing user input, or adjusting themes through code. This function is essential for managing color state, customizing appearance, or integrating color data within applications using varied color formats and updates.
</div>

#### Example

    <div id="flatcolorpicker"></div>
    <script>
    $("#flatcolorpicker").kendoFlatColorPicker();
    var flatpicker = $("#flatcolorpicker").data("kendoFlatColorPicker");

    // set the color
    flatpicker.color("#ff6358");

    // get the currently selected color
    var selectedColor = flatpicker.color();
    console.log(selectedColor.toHex()); // "#ff6358"
    </script>

#### Parameters

##### color `kendo.Color` *(optional)*

The color that should be set as the current value

#### Returns

`kendo.Color` the current value

### enable

Enables or disables the widget.


<div class="meta-api-description">
Control activation or deactivation of the color selection component to allow or prevent user interaction, toggle whether the color picker is active or inactive, enable or disable input functionality, dynamically switch the component’s interactive state, manage user access to color choosing features, turn on or off the color picker responsiveness, set the control’s enabled status for editing colors, programmatically activate or deactivate the color input interface, allow or restrict color selection by enabling or disabling the control, and adjust the component’s usability for selecting colors through enabling or disabling commands.
</div>

#### Parameters

##### enable `Boolean` *(optional)*

Whether the widget should be enabled (`true`) or disabled (`false`). If not specified, the method will enable the widget.

#### Example - disable the flat color picker

    <div id="flatpicker"></div>
    <script>
    $("#flatpicker").kendoFlatColorPicker();
    var flatpicker = $("#flatpicker").data("kendoFlatColorPicker");
    flatpicker.enable(false);
    </script>

## Events

### change

Triggers when a new color has been selected.


<div class="meta-api-description">
Detect when a user selects or changes a color to trigger actions like updating interfaces, applying chosen colors to CSS or element styles, syncing color values with data models, sending color selections to servers or APIs, handling real-time color updates, responding to user input for dynamic theming, enabling event-driven color changes, capturing color picker state changes, and integrating color changes with application logic or UI components.
</div>

#### Event Data

##### e.value `String`

The value of the FlatColorPicker.

#### Example - subscribe to the "change" event during initialization

    <div id="flatpicker"></div>
    <script>
    $("#flatpicker").kendoFlatColorPicker({
      change: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("The newly selected color is ", e.value);
      }
    });
    </script>

#### Example - subscribe to the "change" event after initialization

    <div id="flatpicker"></div>
    <script>
    function picker_change(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log("The newly selected color is ", e.value);
    }
    $("#flatpicker").kendoFlatColorPicker();
    var flatpicker = $("#flatpicker").data("kendoFlatColorPicker");
    flatpicker.bind("change", picker_change);
    </script>

[parseColor]: /api/javascript/kendo#parseColor
[Color]: /api/javascript/kendo#Color
