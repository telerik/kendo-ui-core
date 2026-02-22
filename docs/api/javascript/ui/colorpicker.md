---
title: ColorPicker
page_title: Configuration, methods and events of Kendo UI ColorPicker
res_type: api
component: color-picker
---

# kendo.ui.ColorPicker

A drop-down color picker widget.

This widget can be used as a replacement for the browser's built-in color
picker widget - `<input type="color">` in HTML5.  It can be
instantiated from such an element and by default it will replace it in
the DOM.

## Configuration

### adaptiveMode `String`*(default: "none")*

Specifies the adaptive rendering of the component. The supported values are: `none` *(default)*, `auto`.


<div class="meta-api-description">
How to configure adaptive mode in Kendo UI ColorPicker control for responsive design? Control and configure dynamic UI adaptation for color selection tools across various devices and screen sizes, enabling responsive design or fixed layouts at startup. Set modes to disable automatic adjustments or activate intelligent switching for mobile, touchscreens, and different resolutions. Customize how the color chooser interface scales, adapts, or remains static depending on device type, viewport dimensions, or user interaction context. Enable or disable automatic responsive rendering to optimize usability when selecting colors on phones, tablets, desktops, or varying display environments. Manage initialization behavior for color pickers to flexibly adjust their interface or keep consistent visuals across platforms and form factors.
</div>

#### Example

    <input id="colorpicker" type="color" />
    <script>
      $("#colorpicker").kendoColorPicker({
        adaptiveMode: "auto"
      });
    </script>

### adaptiveTitle `String`

Allows customization of the title's text in the adaptive view of the component.


<div class="meta-api-description">
How do I customize the label text in Kendo UI ColorPicker for mobile-friendly interfaces? Customize or set the label text displayed in responsive or mobile-friendly color selection interfaces, enabling developers to configure, change, or control the title shown within adaptive color picker views for accessibility, responsive design, or mobile UI contexts. This allows modification of the heading, caption, or identifying text in compact or adaptive color selection components to enhance usability, screen reader support, or interface clarity in various device layouts and screen sizes.
</div>

#### Example

    <input id="colorpicker" type="color" />
    <script>
      $("#colorpicker").kendoColorPicker({
        adaptiveMode: "auto",
        adaptiveTitle: "Pick a Color"
      });
    </script>

### adaptiveSubtitle `String`

Allows customization of the subtitle's text in the adaptive view of the component.


<div class="meta-api-description">
How do I customize the secondary subtitle in Kendo UI ColorPicker when it switches to adaptive view? Set, customize, or localize the secondary subtitle text or description shown when the color selection control switches to adaptive or responsive view, enabling developers to configure, override, or provide custom brief explanatory text, helper labels, or contextual subtitles that appear specifically in compact or adaptive display modes for improved user guidance and localization support.
</div>

#### Example

    <input id="colorpicker" type="color" />
    <script>
      $("#colorpicker").kendoColorPicker({
        adaptiveMode: "auto",
        adaptiveSubtitle: "Select your preferred color"
      });
    </script>

### buttons `Boolean` *(default: true)*

Specifies whether the widget should display the Apply / Cancel buttons.


<div class="meta-api-description">
How do I show/hide apply and cancel buttons in a Kendo UI ColorPicker widget? Control the presence of action controls for confirming or canceling color selections in color picker interfaces, enabling toggling between requiring explicit user confirmation with Apply and Cancel buttons or allowing immediate color changes without additional prompts. Configure whether to show or hide confirmation buttons to manage user experience around committing or dismissing chosen colors, setting options to require manual apply and cancel actions, enable instant selection without extra steps, or customize user interaction flow for color selection widgets. Adjust display and behavior of accept or cancel controls to support workflows needing final approval before applying colors or seamless real-time color updates as users pick new values.
</div>

#### Example

    <input id="colorpicker" type="color" />
    <script>
      $("#colorpicker").kendoColorPicker({
        buttons: false
      })
    </script>

### contrastTool `Boolean|Object` *(default: false)*

Enables the contrast tool in the ColorGradient.


<div class="meta-api-description">
How to enable contrast verification in Kendo UI ColorPicker? Configure and activate a contrast helper integrated within the color selection interface to assess and adjust color contrast dynamically while choosing or editing colors. This feature enables quick contrast verification, toggling visual contrast guides, and real-time adjustment of color shades to ensure accessible and visually balanced color combinations within the color gradient area. It supports use cases like setting contrast thresholds, enabling or disabling contrast aids, inspecting color visibility, and optimizing colors for readability and compliance during color customization or design workflows.
</div>

#### Example

    <div id="colorpicker"></div>
    <script>
    $("#colorpicker").kendoColorPicker({
      contrastTool: true
    });
    </script>

### contrastTool.backgroundColor `String|kendo.Color` *(default: '#ffffff')*

Sets the background color for the contrast tool in the ColorGradient.


<div class="meta-api-description">
How to change the background color behind contrast tool previews in a Kendo UI ColorPicker widget? Set or customize the background color behind the contrast tool previews to match or simulate your target backdrop for accurate color contrast evaluation, enabling control over the preview environment in color selection interfaces; adjust or configure the background shade used by contrast checking features within color gradients to ensure color accessibility testing against specific backgrounds, backgrounds for contrast comparison, or simulate different visual contexts and environments when evaluating color combinations for readability and compliance.
</div>

#### Example

    <div id="colorpicker"></div>
    <script>
    $("#colorpicker").kendoColorPicker({
      contrastTool: {
        backgroundColor: "#ff0000"
      }
    });
    </script>

### clearButton `Boolean` *(default: false)*
Specifies whether the widget should display the 'Clear color' button.


<div class="meta-api-description">
How do I enable the clear color button in Kendo UI ColorPicker? Enable or disable the option to show a button that clears or resets the selected color in color selection interfaces, allowing users to remove or reset their current color choice, configure visibility of the clear color control, toggle the presence of a reset or clear color action within color pickers, manage user ability to clear or remove chosen colors, and control whether a button for clearing color selections appears in UI components handling color input.
</div>

#### Example

    <input id="colorpicker" type="color" />
    <script>
      $("#colorpicker").kendoColorPicker({
        clearButton: true
      });
    </script>

### closeOnSelect `Boolean` *(default: false)*

Specifies whether selection of a color in the palette view closes the popup. Applied only when buttons are set to false and the currently selected view is palette.


<div class="meta-api-description">
How to configure Kendo UI ColorPicker to close automatically after selecting a color? Control the behavior of the color picker popup to automatically close or remain open when a color is chosen from the palette, enabling seamless or deliberate selection workflows, toggle instant close on selection versus keeping the palette active for picking multiple colors, adjust settings to either confirm color choices manually or have the popup dismiss immediately upon selection, manage popup visibility on color pick actions especially when no confirm or cancel buttons are shown, configure whether the color selection triggers an automatic close of the picker or requires additional user interaction for finalizing color input, set up quick selection modes where choosing a color closes the interface versus extended interaction modes keeping the palette open for batch selection or adjustments.
</div>

#### Example

    <input id="colorpicker" type="color" />
    <script>
      $("#colorpicker").kendoColorPicker({
        buttons: false,
        view: "palette",
        views: ["palette"],
        closeOnSelect: true
      });
    </script>

### columns `Number`

The number of columns to show in the color dropdown when a [`pallete`](/api/javascript/ui/colorpicker#configuration-palette) is specified.
This is automatically initialized for the "basic" and "websafe" palettes.
If you use a custom palette then you can set this to some value that makes sense for your colors.


<div class="meta-api-description">
How do I adjust the number of columns in the Kendo UI ColorPicker dropdown? Control and configure the number of columns or swatch layout in a color selection dropdown, adjusting how color options appear in grids or rows for custom palettes or predefined sets like basic or websafe. Set, customize, or change the arrangement of color cells, color squares, or palette columns to optimize visual presentation, user interface design, or color picking experience. Enable, modify, or specify the grid width, column count, or swatch distribution in color pickers, influencing how many colors appear side-by-side in dropdown palettes for easier color selection or UI customization.
</div>

#### Example - wrap list of colors on two rows with 3 columns

    <input id="colorpicker" type="color" />
    <script>
    $("#colorpicker").kendoColorPicker({
      palette: [ "#000", "#333", "#666", "#999", "#ccc", "#fff" ],
      columns: 3
    });
    </script>


### format `String` *(default: "hex")*

Sets the default input format in the gradient input editor.


<div class="meta-api-description">
How to customize color notation format in Kendo UI ColorPicker? Control and customize the input and parsing of gradient colors by specifying the preferred color notation format such as hex, RGB, HSL, CSS color strings, or other gradient representations. Enable precise configuration of how users input color stops and adjust gradient values, allowing seamless interpretation and conversion between color formats, supporting flexible formatting options for gradient color editing, and handling different color code styles for gradients in the color picker interface. Adjust input parsing behavior to match user preferences or application requirements, ensuring consistent handling of gradient color strings, supporting diverse gradient input methods, and enabling accurate color format recognition and conversion.
</div>

#### Example

    <input id="colorpicker" type="color" />
    <script>
    $("#colorpicker").kendoColorPicker({
      format: "rgb"
    });
    </script>

### formats `Array` *(default: ["hex", "rgb"])*

Sets the available input formats in the gradient input editor. Only "hex" and "rgb" are valid values.


<div class="meta-api-description">
How do I customize color input formats in Kendo UI ColorPicker? Control and customize which color input formats are available in the color selection interface by enabling or restricting formats such as hexadecimal and RGB values, set or configure input type options during setup to accept only specific color code styles for gradient editing. Optimize color input handling by allowing selection between hex and rgb notation, specifying accepted color coding formats for precise user input, configuring color value types, controlling input format constraints, and enabling developers to manage color format availability within the color picker component.
</div>

#### Example

    <input id="colorpicker" type="color" />
    <script>
    $("#colorpicker").kendoColorPicker({
      format: "rgb",
      formats: ["rgb"]
    });
    </script>

### fillMode `String`*(default: undefined)*

Sets a value controlling how the color is applied. When `undefined` (the default), the theme controls the default fill mode. Can also be set to the following string values:

- "solid"
- "flat"
- "outline"

> The `"none"` value is deprecated. Use custom CSS instead.


<div class="meta-api-description">
How do I configure the ColorPicker to fill with a solid color? Configure how the selected color is applied or rendered, including options to enable solid color fills, flat color blocks, outlined strokes around elements, or disabling the color application entirely; set or control the style of color application using modes like solid, flat, outline, or none to affect the visual fill effect, color rendering style, or stroke presentation in UI components or graphics elements.
</div>

#### Example - sets the fillMode

    <input id="colorpicker" type="color" />
    <script>
    $("#colorpicker").kendoColorPicker({
      fillMode: "outline"
    });
    </script>

### input `Boolean` *(default: true)*

Whether to render the input in the ColorGradient component.


<div class="meta-api-description">
How do I show or hide the color code input in a Kendo UI ColorPicker widget? Control the visibility and activation of the text input field for entering or editing color values within a color selection gradient, enabling users to toggle showing or hiding the manual color code input, configure whether a numeric, hexadecimal, or RGB input box appears inside the color picker interface, adjust if direct color value typing is allowed alongside graphical gradient selection, and manage how users can input precise color information either through keyboard entry or purely visual selection modes.
</div>

#### Example

    <input id="colorpicker" type="color" />
    <script>
    $("#colorpicker").kendoColorPicker({
      input: false
    });
    </script>

### tileSize `Number|Object` *(default: 14)*

The size of a color cell.


<div class="meta-api-description">
How do I adjust the size of individual color swatches in a Kendo UI ColorPicker? Adjust the width and height of individual color swatches or cells to control their visual size, density, spacing, and touch target area in color selection interfaces, enabling customization of how compact or spacious each color tile appears in color pickers, palettes, or grids; configure swatch dimensions to optimize user interaction on different devices by setting tile size for improved accessibility, layout fitting, and aesthetic balance in color selection components.
</div>

#### Example

    <input id="colorpicker" type="color" />
    <script>
    $("#colorpicker").kendoColorPicker({
      palette: "basic",
      tileSize: 32
    });
    </script>

### tileSize.width `Number` *(default: 14)*

The width of the color cell.


<div class="meta-api-description">
How do I adjust the width of each color swatch in a Kendo UI ColorPicker? Adjust or configure the horizontal dimension, width, or size of each individual color swatch, tile, or cell within a color picker or palette interface to control spacing, layout fit, alignment, or uniformity of color selection tiles, enabling developers to set, scale, or customize the width of color boxes for consistent visual appearance, design responsiveness, or user interface styling in color selection components.
</div>

#### Example

    <input id="colorpicker" type="color" />
    <script>
    $("#colorpicker").kendoColorPicker({
      palette: "basic",
      tileSize: { width: 40 }
    });
    </script>

### tileSize.height `Number` *(default: 14)*

The height of the color cell.


<div class="meta-api-description">
How do I set the height of individual color tiles in a Kendo UI ColorPicker? Adjust the vertical dimension or height of individual color swatches, color tiles, or palette cells in a color selection grid, controlling the size of each color block to customize layout density or visual spacing in color pickers, color palettes, or color selection interfaces. Configure or set the height value numerically to increase or decrease the vertical size of color tiles, enabling fine-tuning of grid appearance, uniform sizing of color cells, and improving user interface design for color swatch arrays or color grid components during initialization or setup.
</div>

#### Example

    <input id="colorpicker" type="color" />
    <script>
    $("#colorpicker").kendoColorPicker({
      palette: "basic",
      tileSize: { height: 40 }
    });
    </script>

### messages `Object`

Allows localization of the strings that are used in the widget.


<div class="meta-api-description">
How do I customize the color selection interface in Kendo UI ColorPicker with localized text strings for internationalization? Configure and customize the color selection interface by providing localized text strings, translated labels, tooltips, hints, and prompts to support multiple languages and regional settings for color pickers. Enable internationalization, multi-language support, language-specific text, and custom messaging for color choosing components, allowing developers to set or override default UI text, adapt language displays, and control accessibility cues related to color selection tools. This encompasses translation, localization, user interface text replacement, and dynamic message configuration for color input controls in various app environments.
</div>

#### Example

    <input id="colorpicker" type="color" />
    <script>
    $("#colorpicker").kendoColorPicker({
      messages: {
        apply: "Update",
        cancel: "Discard"
      }
    })
    </script>

### messages.apply `String` *(default: "Apply")*

Allows customization of the "Apply" button text.


<div class="meta-api-description">
How do I customize the "Apply" button in Kendo UI ColorPicker? Customize or set the label, text, or caption of the confirmation button used to apply chosen colors in color selection tools or components, enabling control over the displayed action button wording, including altering default Apply button text, modifying confirm prompts, renaming color selection submit buttons, and tailoring user interface messages for color pickers or color choosers.
</div>

#### Example

    <input id="colorpicker" type="color" />
    <script>
    $("#colorpicker").kendoColorPicker({
      messages: {
        apply: "Update"
      }
    })
    </script>

### messages.cancel `String` *(default: "Cancel")*

Allows customization of the "Cancel" button text.


<div class="meta-api-description">
How do I change the cancel button text in a Kendo UI ColorPicker? Configure or customize the text label for the cancel button in a color selection interface, enabling localization, translation, or modification of the cancel action prompt in color picker dialogs. This setting controls the display text for the cancel button, allowing developers to set, change, or override default cancel button wording to match user language preferences, user interface terminology, or application-specific phrasing in color picker components. Adjust, localize, rename, or personalize the cancel option text shown to users when dismissing or exiting the color picker without applying changes.
</div>

#### Example

    <input id="colorpicker" type="color" />
    <script>
    $("#colorpicker").kendoColorPicker({
      messages: {
        cancel: "Discard"
      }
    })
    </script>

### messages.clearColor `String` *(default: "Clear color")*

Allows customization of the Clear Color button label.


<div class="meta-api-description">
How do I customize the clear color button's label in a Kendo UI ColorPicker? Adjust, configure, or localize the label text for the button that resets or clears the selected color in a color selection widget, enabling customization of the clear color button’s wording, text, or prompt to match different languages, user interfaces, or design preferences for color picker controls, including setting alternative phrasing for clearing or resetting color selection within color input components.
</div>

#### Example

    <input id="colorpicker" type="color" />
    <script>
      $("#colorpicker").kendoColorPicker({
        clearButton: true,
        messages: {
          clearColor: "Remove Color"
        }
      });
    </script>

### messages.previewInput `String`

Overrides the messages.hex property. Legacy option.


<div class="meta-api-description">
How do I customize the color code label in Kendo UI ColorPicker? Customize or replace the default hex color code label, text, or message displayed in the color selector interface, enabling localization, language overrides, or personalized hex value prompts for color input fields, color pickers, or color selection components, including legacy support for internationalization and UI text customization.
</div>

#### Example

    <input id="colorpicker" type="color" />
    <script>
    $("#colorpicker").kendoColorPicker({
      messages: {
        previewInput: "Edit Color"
      }
    })
    </script>

### messages.contrastRatio `String` *(default: "Contrast ratio")*

Allows customization of the "Contrast ratio" text in the contrast tool.


<div class="meta-api-description">
How do I change the contrast ratio label in Kendo UI's color picker? Adjust or configure the text label for contrast ratio measurement in color selection tools, customize the display name for color contrast indicators, control the wording or description shown for contrast evaluations, set or change the contrast-related label used in color pickers or color accessibility features, modify messages or prompts related to contrast ratio values, personalize the naming of contrast ratio displays for clearer UX, rename or update contrast ratio terms to fit UI language preferences or localization needs, tailor the terminology used for color contrast assessments within color selection components or accessibility checks.
</div>

#### Example

    <input id="colorpicker" type="color" />
    <script>
      $("#colorpicker").kendoColorPicker({
        contrastTool: true,
        messages: {
          contrastRatio: "Color Contrast"
        }
      });
    </script>

### messages.fail `String` *(default: "Fail")*

Allows customization of the "Fail" text in the contrast tool.


<div class="meta-api-description">
How to customize the failure message in Kendo UI ColorPicker? Customize or configure the contrast checker failure message, set or localize the error label displayed when a color choice does not meet accessibility or contrast requirements, control the warning or fail text in color selection tools, adjust the notification shown for insufficient contrast in color pickers, define custom strings for contrast validation failures, change or overwrite the default fail message to match localization or branding needs, update the error prompt indicating color contrast issues during color picking or accessibility checks.
</div>

#### Example

    <input id="colorpicker" type="color" />
    <script>
      $("#colorpicker").kendoColorPicker({
        contrastTool: true,
        messages: {
          fail: "Poor"
        }
      });
    </script>

### messages.pass  `String` *(default: "Pass")*

Allows customization of the "Pass" text in the contrast tool.


<div class="meta-api-description">
How do I customize the label text for passing contrast results in a Kendo UI ColorPicker? Customize the label text for the pass status in color contrast checking, control the display word or phrase that indicates successful contrast compliance, set or change the message shown when a color combination passes accessibility contrast tests, configure the label wording for passing contrast results within color selection or color picker tools, adjust or localize the term that signals contrast validation success, modify how the passing state is described in UI elements related to color accessibility, update or personalize the pass indicator message shown in color contrast evaluation features.
</div>

#### Example

    <input id="colorpicker" type="color" />
    <script>
      $("#colorpicker").kendoColorPicker({
        contrastTool: true,
        messages: {
          pass: "Good"
        }
      });
    </script>

### messages.gradient `String` *(default: "Gradient view")*

Allows customization of the Gradient view button.


<div class="meta-api-description">
How can I customize the button text for the gradient option in a Kendo UI ColorPicker? Customize, configure, or set the text label, caption, or title displayed on the gradient selection button within color pickers, enabling personalized wording, localization, button text replacement, or UI language adjustments for the gradient control element in color picker components.
</div>

#### Example

    <input id="colorpicker" type="color" />
    <script>
      $("#colorpicker").kendoColorPicker({
        views: ["gradient", "palette"],
        messages: {
          gradient: "Color Gradient"
        }
      });
    </script>

### messages.palette `String` *(default: "Palette view")*

Allows customization of the Palette view button.


<div class="meta-api-description">
How can I customize the text displayed in the palette button of a Kendo UI color picker? Control and customize the palette button label and text displayed in the color selection interface, enabling you to set, modify, or localize the palette view name, caption, or prompt for color palette options, customize UI text for palette buttons, adjust wording for color picker palette features, and configure the display message related to color swatch selection or palette access.
</div>

#### Example

    <input id="colorpicker" type="color" />
    <script>
      $("#colorpicker").kendoColorPicker({
        views: ["gradient", "palette"],
        messages: {
          palette: "Color Palette"
        }
      });
    </script>

### messages.toggleFormat `String` *(default: "Toggle format")*

Allows customization of the toggle format button's title in the Gradient's input editor.


<div class="meta-api-description">
How do I change the label on the format toggle button in Kendo UI ColorPicker? Customize, set, or change the label, title, or text displayed on the button that switches or toggles between different gradient input modes or formats within a color selection tool, enabling control over the user interface wording for gradient editing controls, including adjusting button captions for format switching in color pickers or gradient editors.
</div>

#### Example

    <input id="colorpicker" type="color" />
    <script>
      $("#colorpicker").kendoColorPicker({
        messages: {
          toggleFormat: "Switch Format"
        }
      });
    </script>

### messages.red `String` *(default: "Red")*

Allows customization of the rgb's red input's aria-label in the Gradient's input editor.


<div class="meta-api-description">
How do I customize the screen reader description for the red RGB input in a Kendo UI color picker's gradient editor? Customize and set the accessible label, aria-label, or screen reader description for the red RGB input in the gradient editor of a color selection tool, enabling control over how the red channel input is announced or described for improved accessibility, user interface customization, and assistive technology compatibility in color pickers and gradient editors.
</div>

#### Example

    <input id="colorpicker" type="color" />
    <script>
      $("#colorpicker").kendoColorPicker({
        format: "rgb",
        messages: {
          red: "Red Component"
        }
      });
    </script>

### messages.green `String` *(default: "Green")*

Allows customization of the rgb's green input's aria-label in the Gradient's input editor.


<div class="meta-api-description">
How can I customize the green slider label in Kendo UI ColorPicker? Configure the accessible label or ARIA description for the green channel input within a color gradient editor, enabling customization or localization of the text that screen readers announce for the green RGB value control in color selection tools. Adjust, set, or customize the green slider or input field label to improve usability for assistive technologies or tailor the user interface wording related to green color intensity in color pickers supporting gradients and RGB color models.
</div>

#### Example

    <input id="colorpicker" type="color" />
    <script>
      $("#colorpicker").kendoColorPicker({
        format: "rgb",
        messages: {
          green: "Green Component"
        }
      });
    </script>

### messages.blue `String` *(default: "Blue")*

Allows customization of the rgb's blue input's aria-label in the Gradient's input editor.


<div class="meta-api-description">
How do I customize the accessibility label for the blue channel input in a Kendo UI color picker? Set or customize the accessibility label, ARIA description, or screen reader text for the blue channel input in an RGB color picker or gradient editor, enabling improved voiceover support, semantic labeling, and assistive technology configuration for the blue component control within color selection interfaces.
</div>

#### Example

    <input id="colorpicker" type="color" />
    <script>
      $("#colorpicker").kendoColorPicker({
        format: "rgb",
        messages: {
          blue: "Blue Component"
        }
      });
    </script>

### messages.alpha `String` *(default: "Alpha")*

Allows customization of the rgb's alpha input's aria-label in the Gradient's input editor.


<div class="meta-api-description">
How to customize the accessibility label for the transparency control in Kendo UI ColorPicker? Customize or translate the accessibility label for the transparency control in color selection tools, enabling localization and modification of the alpha channel’s descriptive text used by screen readers in gradient and RGBA input editors. Adapt, set, or override the aria-label for opacity inputs to improve user experience, accessibility, and internationalization of color pickers managing color transparency or alpha values.
</div>

#### Example

    <input id="colorpicker" type="color" />
    <script>
      $("#colorpicker").kendoColorPicker({
        opacity: true,
        messages: {
          alpha: "Transparency"
        }
      });
    </script>

### messages.hex `String` *(default: "HEX")*

Allows customization of the hex input's aria-label in the Gradient's input editor.


<div class="meta-api-description">
How can I customize the hex code input description for screen readers in a Kendo UI ColorPicker? Customize or localize the accessible label, aria-label, or assistive text for the hexadecimal color input field within a color gradient or color picker interface, enabling modification of the hex code input description for screen readers, improving accessibility and internationalization by changing the spoken label or input prompt for the hex color value in color selection tools or UI components.
</div>

#### Example

    <input id="colorpicker" type="color" />
    <script>
      $("#colorpicker").kendoColorPicker({
        format: "hex",
        messages: {
          hex: "Hexadecimal"
        }
      });
    </script>

### palette `String|Array` *(default: null)*

When a non-null `palette` argument is supplied, the drop-down will be
a simple color picker that lists the colors. The following are supported:

- "basic" -- displays 20 basic colors

- "websafe" -- display the "web-safe" color palette

- otherwise, pass a string with colors in HEX representation separated with
  commas, or an array of colors, and it will display that palette instead.
  If you pass an array it can contain strings supported by [parseColor][] or
  [Color][] objects.


<div class="meta-api-description">
How to configure custom color palettes in Kendo UI ColorPicker component? Configure and customize the color selection options by defining a specific set of colors shown in the color picker dropdown, including preset palettes like basic 20-color sets, web-safe color lists, or personalized palettes using HEX codes, color strings, or color objects; enable simple palette-based color picking, control available swatches, set predefined or custom color arrays, or specify exact color ranges for consistent color choices and easy color theme management in user interfaces.
</div>

#### Example - use "websafe" palette

    <input id="colorpicker" type="color" />
    <script>
    $("#colorpicker").kendoColorPicker({
      palette: "websafe"
    });
    </script>

#### Example - use list of colors

    <input id="colorpicker" type="color" />
    <script>
    $("#colorpicker").kendoColorPicker({
      palette: [ "#000", "#333", "#666", "#999", "#ccc", "#fff" ],
      columns: 6
    });
    </script>

### opacity `Boolean` *(default: false)*

Only for the HSV selector.  If `true`, the widget will display the opacity slider.
Note that currently in HTML5 the `<input type="color">` does not support opacity.


<div class="meta-api-description">
How to enable opacity control in Kendo UI ColorPicker widget? Enable control over transparency or alpha channel by displaying an opacity slider within the color selection interface, allowing users to set or adjust alpha values alongside hue, saturation, and value controls for more precise color customization, including transparency levels; configure or toggle visibility of this alpha adjustment tool for enhanced color picking beyond solid colors, particularly useful when working with RGBA or HSV color models, although note that standard HTML color inputs do not support opacity settings natively.
</div>

#### Example

    <input id="colorpicker" type="color" />
    <script>
    $("#colorpicker").kendoColorPicker({
      opacity: true
    });
    </script>

### preview `Boolean` *(default: true)*

Displays the color preview element and the previously selected color for comparison. With buttons set to false, both elements will update at the same time.


<div class="meta-api-description">
How do I configure the color preview in Kendo UI ColorPicker to show both new and old colors? Control displaying a live color swatch preview with before-and-after color comparison, enabling side-by-side visualization of the current selection alongside the previously chosen color for direct contrast and accurate color matching, configure to show or hide preview panels, compare new and old colors in real time, enable simultaneous updates or preserve prior swatches, adjust how color changes are previewed during selection, toggle interactive color difference views, set up visual feedback for color adjustments, and manage simultaneous or separate updating of color previews and previous color states.
</div>

#### Example

    <input id="colorpicker" type="color" />
    <script>
    $("#colorpicker").kendoColorPicker({
      preview: false
    });
    </script>

### rounded `String` *(default: undefined)*

Sets a value controlling the border radius. When `undefined` (the default), the theme controls the default border radius. Can also be set to the following string values:

- "small"
- "medium"
- "large"
- "full"

> The `"none"` value is deprecated. Use custom CSS instead.


<div class="meta-api-description">
How can I customize the corner roundness of the Kendo UI color picker? Adjust corner roundness of color picker by setting border radius with numeric values or presets like small, medium, large, full, or none to customize curvature, shape, and edge smoothness. Control or configure the curvature of color selector corners, enable rounded edges, set radius for circular or sharp style, and fine-tune visual appearance with flexible border rounding options. Customize corner styling on color picker UI elements using radius values or predefined size tokens for different rounding preferences and design consistency.
</div>

#### Example

    <input id="colorpicker" type="color" />
    <script>
    $("#colorpicker").kendoColorPicker({
      rounded: "full"
    });
    </script>

### toolIcon `String` *(default: null)*

A CSS class name to display an icon in the color picker button.  If
specified, the HTML for the element will look like this:

    <span class="k-tool-icon ${toolIcon}">
      <span class="k-selected-color"></span>
    </span>


<div class="meta-api-description">
How to customize the icon in Kendo UI colorpicker's selection button? Customize the icon displayed in the color selection button by setting a CSS class that defines the visual symbol shown next to the chosen color, enabling integration with icon font libraries, SVG-based icons, or CSS sprite images for tailored user interface appearance. Control and modify the appearance of the color picker's action button by applying specific class names that configure or replace the default icon rendering, supporting use cases like theming, branding, or enhancing usability through custom visual cues. Adjust or enable different icon styles programmatically by referencing CSS selector names that affect the color picker's icon container, facilitating flexible design adjustments for toolbars and color controls within applications.
</div>

#### Example

    <input id="colorpicker" type="color" />
    <script>
    $("#colorpicker").kendoColorPicker({
      toolIcon: "k-foreColor"
    });
    </script>

### value `String|kendo.Color` *(default: null)*

The initially selected color.
Note that when initializing the widget from an `<input>` element, the initial color will be decided by the field instead.


<div class="meta-api-description">
How do I set the initial color in a Kendo UI ColorPicker widget? Set or configure the initial or default color displayed in a color selection tool or widget, specifying the starting color choice when the component or input control first loads, enabling control over the preselected or default hue, shade, or hex code shown to users before any interaction or color changes occur, also handling cases where initialization may derive from an input element’s existing value, allowing developers to preset, define, or control the starting color state for consistent color input or selection experiences.
</div>

#### Example

    <div id="colorpicker"></div>
    <script>
    $("#colorpicker").kendoColorPicker({
      value: "#b72bba"
    });
    </script>

### view `String` *(default: "gradient")*

The initially selected view in the ColorPicker.


<div class="meta-api-description">
How to customize the color selection interface in Kendo UI ColorPicker? Configure the initial color selection interface, choosing between different color picking modes such as palette, gradient, swatches, or custom views to control how colors are displayed and selected when the color picker UI loads, enabling you to set, switch, or initialize the default color selection method shown to users on open, including options to customize or prioritize specific color input styles or layouts.
</div>

#### Example

    <div id="colorpicker"></div>
    <script>
    $("#colorpicker").kendoColorPicker({
      view: "palette"
    });
    </script>

### views `Array` *(default: [ "gradient", "palette" ])*

The available views in the ColorPicker. Valid values are "gradient" and "palette".


<div class="meta-api-description">
How can I customize the color selection interface in Kendo UI ColorPicker? Control and customize the visible interface sections for selecting colors, enabling options like gradient sliders or color palettes, and configure which color selection modes are accessible, such as activating gradient-based selection, palette-based choices, or both simultaneously, allowing customization of user experience in color picking, setting available views, toggling gradient selectors, restricting or displaying predefined color swatches, and managing interface options for color input methods.
</div>

#### Example

    <div id="colorpicker"></div>
    <script>
    $("#colorpicker").kendoColorPicker({
      view: "palette",
      views: ["palette"]
    });
    </script>

### size `String`*(default: undefined)*

Sets a value controlling size of the component. When `undefined` (the default), the theme controls the default size. Can also be set to the following string values:

- "small"
- "medium"
- "large"

> The `"none"` value is deprecated. Use custom CSS instead.


<div class="meta-api-description">
How do I adjust the size of the color swatches in Kendo UI ColorPicker? Adjust the visible dimensions and interactive area of the color selection tool by setting its size or scale, controlling how large or compact the color swatches, touch targets, and expanded picker appear for better user interface alignment. Enable configuring the display size to small, medium, or large presets, or disable sizing for custom layouts, ensuring the color picker fits different screen densities, touch responsiveness, and design requirements. Customize the component’s footprint, scaling, and spacing to optimize usability, accessibility, and visual integration within your app or website’s theme and layout constraints.
</div>

#### Example

    <div id="colorpicker"></div>
    <script>
    $("#colorpicker").kendoColorPicker({
      size: "small"
    });
    </script>


## Methods

### close

Closes the popup.


<div class="meta-api-description">
How can I programmatically close the color picker popup in Kendo UI? Programmatically hide or dismiss the color selection popup, close or deactivate the color panel interface, end or terminate the open color picker dialog from code, control popup visibility without changing the chosen color value, hide the UI after a manual or automated color choice, exit or shut the color panel modal, toggle off the color selector overlay, manage closing the selection panel via script commands, finalize and close the color picker popup without resetting selections, and ensure the color picker component is hidden post selection or external event triggers.
</div>

#### Example

    <input id="colorpicker" type="color" />
    <script>
    $("#colorpicker").kendoColorPicker();
    var colorpicker = $("#colorpicker").data("kendoColorPicker");
    colorpicker.open();

    setTimeout(function() {
        colorpicker.close();
    }, 1000);
    </script>

### open

Opens the popup element with the color selector.


<div class="meta-api-description">
How to programmatically open the color picker interface in Kendo UI for jQuery? Trigger, programmatically display, or launch a color selection popup, show or open color palettes on demand, invoke the color picker interface dynamically, control the visibility of the color selector through code, integrate color picker opening with custom user interactions, enable popup display via keyboard shortcuts or scripted events, activate the color palette component during runtime, manage focus or UI flow by opening the color selector programmatically, set or enable color selection dialogs without user clicks.
</div>

#### Example

    <input id="colorpicker" type="color" />
    <script>
    $("#colorpicker").kendoColorPicker();
    var colorpicker = $("#colorpicker").data("kendoColorPicker");
    colorpicker.open();
    </script>

### toggle

Toggles the popup.


<div class="meta-api-description">
How do I programmatically open and close the color selection popup in Kendo UI for jQuery? programmatically open or close a color selection popup, control the visibility of a color picker interface through code or event triggers, toggle the display state between showing and hiding the color picker, manage user interface popups dynamically, enable or disable the color selection overlay from scripts or handlers, switch between expanded and collapsed views of the color picker, implement interactive controls to open or shut the color selection tool, automate popup visibility for customizable user workflows, handle popup state changes without manual user clicks, program toggling for seamless UI integration of color selection components
</div>

#### Example

    <input id="colorpicker" type="color" />
    <script>
    $("#colorpicker").kendoColorPicker();
    var colorpicker = $("#colorpicker").data("kendoColorPicker");
    colorpicker.toggle();
    </script>

### value `String|kendo.Color` *(default: null)*

Get or set the selected color. If no argument is given, this returns the
currently selected color as a string in format #FFFFFF when the `opacity`
option is off, or rgba(255, 255, 255, 1) when `opacity` is requested.

If one argument is given, it selects the new color and updates the UI.  The
argument can be a string in **hex**, **rgb** or **rgba** format, or a [Color][] object.
This does not trigger the "change" event.


<div class="meta-api-description">
How do I get/set the currently chosen color in a Kendo UI ColorPicker component? Retrieve or assign the currently chosen color in a color selection interface by getting or setting the color value in multiple formats such as hexadecimal strings (#FFFFFF), RGB strings (rgb(255, 255, 255)), RGBA strings with transparency levels (rgba(255, 255, 255, 1)), or color objects. This method supports reading the current color without arguments and updating the selected color with a single input parameter, allowing developers to programmatically control, configure, or modify the color state within the picker component's UI, while managing color changes silently without triggering event listeners or change handlers.
</div>

#### Parameters

##### color `String` *(optional)*

#### Returns

`String` the string representation of the current color.

#### Example

    <div id="colorpicker"></div>
    <script>
    $("#colorpicker").kendoColorPicker();
    var colorpicker = $("#colorpicker").data("kendoColorPicker");

    // set picker value
    colorpicker.value("#ccc");

    // get picker value
    var value = colorpicker.value();
    </script>

### color

Get or set the selected color. If no argument is given, this returns the currently selected color as a [`kendo.Color` object](/api/javascript/color).


<div class="meta-api-description">
How can I programmatically change the selected color in a Kendo UI ColorPicker widget? Set, get, update, or retrieve the current selected color programmatically by calling the color method with or without parameters; control the color picker's value dynamically, fetch the active color as a color object, synchronize color state in code, adjust or read user-selected colors on demand, change or access the chosen color value for UI updates, manipulate the color selection through code logic, obtain and modify the current color setting, and integrate color state management seamlessly within applications.
</div>

#### Parameters

##### color `kendo.Color` *(optional)*

The color that should be set as the current value

#### Returns

`kendo.Color` the current value

#### Example

    <div id="colorpicker"></div>
    <script>
    $("#colorpicker").kendoColorPicker();
    var colorpicker = $("#colorpicker").data("kendoColorPicker");

    // set picker color
    colorpicker.color(kendo.parseColor("#ff0000"));

    // get picker color
    var currentColor = colorpicker.color();
    /* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(currentColor.toHex()); // logs the color in hex format
    </script>

### enable

Enables or disables the widget.


<div class="meta-api-description">
How do I programmatically enable or disable user input in a Kendo UI color picker widget? Toggle interactive state of a color selection widget by enabling or disabling user input dynamically through code, allowing programmatic control to activate, deactivate, block, or permit user interactions and events on the color picker interface during runtime using true or false boolean flags.
</div>

#### Parameters

##### enable `Boolean` *(optional)*

Whether the widget should be enabled (`true`) or disabled (`false`). If not specified, the method will enable the widget.

#### Example - disable the color picker

    <div id="colorpicker"></div>
    <script>
    $("#colorpicker").kendoColorPicker();
    var colorpicker = $("#colorpicker").data("kendoColorPicker");
    colorpicker.enable(false);
    </script>

### setBackgroundColor

sets a new background color for the contrast tool.


<div class="meta-api-description">
How to dynamically change the background color of the contrast tool in Kendo UI ColorPicker? Change or configure the background color of the color contrast tool dynamically during runtime, enabling instant updates to the contrast preview when adjusting colors or themes. Enable setting or modifying the contrast background color on the fly to reflect new color values, customize or control background hues for accessibility testing, and apply immediate visual feedback for color contrast changes. This capability supports adjusting, updating, or overriding the contrast tool’s backdrop color programmatically to ensure accurate preview and color accessibility verification in interactive or responsive design workflows.
</div>

#### Parameters

##### color `String|kendo.Color`

The new background color.

#### Example

    <div id="colorpicker"></div>
    <script>
    $("#colorpicker").kendoColorPicker({
      contrastTool: {
        backgroundColor: "#ffffff"
      }
    });

    var colorpicker = $("#colorpicker").data("kendoColorPicker");
    colorpicker.setBackgroundColor("#ff0000");
    </script>

## Events

### change

Fires when a color was selected, either by clicking on it (in the
simple picker), by clicking ENTER or by pressing "Apply" in the HSV
picker.


<div class="meta-api-description">
How can I programmatically detect when a color is changed in a Kendo UI ColorPicker? Detect and handle user color selections, capturing changes when a new color is picked through clicking, keyboard input like ENTER, or confirmation actions such as applying HSV adjustments. Enable event-driven responses to update interfaces, synchronize color values, trigger callbacks, or initiate subsequent processes tied to color choice modifications, supporting interactive color selection workflows and dynamic UI feedback based on user interaction with color picking components.
</div>

#### Event Data

##### e.value `String`

The value of the colorpicker.

#### Example - subscribe to the "change" event during initialization

    <div id="colorpicker"></div>
    <script>
    $("#colorpicker").kendoColorPicker({
      change: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("The picked color is ", e.value);
      }
    });
    </script>

#### Example - subscribe to the "change" event after initialization

    <div id="colorpicker"></div>
    <script>
    function picker_change(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log("The picked color is ", e.value);
    }
    $("#colorpicker").kendoColorPicker();
    var colorpicker = $("#colorpicker").data("kendoColorPicker");
    colorpicker.bind("change", picker_change);
    </script>

### select

Fires as a new color is displayed in the drop-down picker.  This is
not necessarily the "final" value; for example this event triggers
when the sliders in the HSV selector are dragged, but then pressing
ESC would cancel the selection and the color will revert to the
original value.


<div class="meta-api-description">
How to handle in-progress color changes with the Kendo UI for jQuery ColorPicker? Capture real-time updates and transient changes as users interact with a color selection interface, responding to dynamic previews during slider drags, hue adjustments, or other live modifications before final confirmation. Enable handling of in-progress color changes for instant UI feedback, live previews, or intermediary state updates, with the ability to detect cancellation actions like pressing escape to revert temporary selections, supporting workflows that require non-committal color sampling, provisional changes, and immediate visual response during continuous user input.
</div>

##### e.value `String`

The value of the colorpicker.

#### Example - subscribe to the "select" event during initialization

    <div id="colorpicker"></div>
    <script>
    $("#colorpicker").kendoColorPicker({
      select: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("The selected color is ", e.value);
      }
    });
    </script>

#### Example - subscribe to the "select" event after initialization

    <div id="colorpicker"></div>
    <script>
    function picker_select(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log("The selected color is ", e.value);
    }
    $("#colorpicker").kendoColorPicker();
    var colorpicker = $("#colorpicker").data("kendoColorPicker");
    colorpicker.bind("select", picker_select);
    </script>

### open

Fires when the picker popup is opening.


<div class="meta-api-description">
When does a Kendo UI ColorPicker's popup start to open? Detect when the color picker popup starts to open or appears, trigger functions, run code on popup display, listen for popup activation or show events, handle UI updates when the picker is about to appear, set focus or synchronize state as the color selection panel emerges, respond to opening triggers, attach event listeners for popup launch moments, execute pre-display logic for color selection dialogs, and capture event details when the color picker popup transitions from closed to visible.
</div>

#### Example - subscribe to the "open" event during initialization

    <div id="colorpicker"></div>
    <script>
    $("#colorpicker").kendoColorPicker({
      open: function() {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("Picker popup opened");
      }
    });
    </script>

#### Example - subscribe to the "open" event after initialization

    <div id="colorpicker"></div>
    <script>
    function picker_open() {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log("Picker popup opened");
    }
    $("#colorpicker").kendoColorPicker();
    var colorpicker = $("#colorpicker").data("kendoColorPicker");
    colorpicker.bind("open", picker_open);
    </script>

### close

Fires when the picker popup is closing.


<div class="meta-api-description">
What event is triggered when a Kendo UI ColorPicker dialog closes? Detect when a color selection popup or color picker dialog closes to trigger updates, save chosen colors, reset UI elements, perform cleanup, or run custom actions when the color selection interface is dismissed, exited, or finished. Capture event signals for popup closure, color picker dismissal, end of user interaction with the color selector, or termination of the color choosing process to integrate color pick completion handling, state persistence, interface refresh, or resource management workflows.
</div>

#### Example - subscribe to the "close" event during initialization

    <div id="colorpicker"></div>
    <script>
    $("#colorpicker").kendoColorPicker({
      close: function() {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("Picker popup closed");
      }
    });
    </script>

#### Example - subscribe to the "close" event after initialization

    <div id="colorpicker"></div>
    <script>
    function picker_close() {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log("Picker popup closed");
    }
    $("#colorpicker").kendoColorPicker();
    var colorpicker = $("#colorpicker").data("kendoColorPicker");
    colorpicker.bind("close", picker_close);
    </script>

[parseColor]: /api/javascript/kendo#parseColor
[Color]: /api/javascript/kendo#Color
