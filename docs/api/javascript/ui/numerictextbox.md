---
title: NumericTextBox
page_title: Configuration, methods and events of Kendo UI NumericTextBox
description: Code examples and tips how to configure NumericTextBox widget, use available methods and events.
res_type: api
component: numeric-textbox
---

# kendo.ui.NumericTextBox

Represents the Kendo UI NumericTextBox widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### autoAdjust `Boolean` *(default: true)*

If this property is enabled and you have configured `min` and/or `max` values, and the user enters a value that falls out of that range, the value will automatically be set to either the minimum or maximum allowed value.


<div class="meta-api-description">
How does Kendo UI's NumericTextBox handle values that exceed its minimum or maximum limits? Enable automatic clamping and input normalization for numeric fields by setting values that exceed minimum or maximum limits to the closest boundary, ensuring user-entered numbers are automatically adjusted, constrained, or corrected within the predefined range, controlling input validation, enforcing value limits, preventing out-of-range entries, and maintaining data integrity for numeric input controls.
</div>

#### Example - prevent automatic value adjustments

    <h3>Input a value higher than 20 or lower than 10 and then focus out the input.</h3>
    <input id="numerictextbox" />
    <script>
    $("#numerictextbox").kendoNumericTextBox({
        min: 10,
        max: 20,
        autoAdjust: false
    });
    </script>

### culture `String`*(default: "en-US")*

Specifies the culture info used by the component. A valid kendo culture file must be added to the page in order for the example to work. `<script src="https://kendo.cdn.telerik.com/{kendo version}/js/cultures/kendo.culture.de-DE.min.js"></script>`


<div class="meta-api-description">
How do I set up international number formatting in Kendo UI NumericTextBox? Configure the locale or regional settings for number formatting and parsing including decimal separators, thousand delimiters, grouping conventions, currency symbols, and numeric patterns by specifying culture or language options for the input widget. Adjust cultural conventions to control how numeric values display and parse in various international formats, enabling support for different countries’ conventions for decimals, grouping digits, currencies, and number styles, often requiring inclusion of a specific culture or localization script file. Set or enable cultural localization to customize numeric input according to language-specific rules, regional number formatting standards, and currency display preferences, supporting globalized applications with correct parsing and rendering of monetary and numeric data.
</div>

#### Example - specify a culture

    <input id="numerictextbox" />
    <script>
    $("#numerictextbox").kendoNumericTextBox({
        culture: "de-DE"
    });
    </script>

### decimals `Number`*(default: null)*

Specifies the number precision applied to the widget value and when the NumericTextBox is focused. If not set, the precision defined by the current culture is used. If the user enters a number with a greater precision than is currently configured, the widget value will be rounded. For example, if `decimals` is `2` and the user inputs `12.346`, the value will become `12.35`. If `decimals` is `1` the user inputs `12.99`, the value will become `13.00`.

Compare with the [`format`](/api/javascript/ui/numerictextbox#configuration-format) property.


<div class="meta-api-description">
How do I set the number of decimal places for a numeric input field in Kendo UI? Set or configure the number of decimal places, decimal precision, and rounding rules for numeric input fields to control how many digits appear after the decimal point during entry and display; adjust or limit fractional digits, enforce fixed or culture-based decimal places, manage rounding behavior when user input exceeds precision limits, and customize decimal accuracy to fit currency, measurement, or data formatting needs in numeric text boxes or input components.
</div>

#### Example

    <input id="numerictextbox" />
    <script>
    $("#numerictextbox").kendoNumericTextBox({
        decimals: 1
    });
    </script>

### downArrowText `String`*(default: "Decrease value")*

Specifies the text of the tooltip on the down arrow.


<div class="meta-api-description">
How can I change the text on the down arrow of a Kendo NumericTextBox? Configure or customize the tooltip label displayed on the decrement or down arrow button of a numeric input control to support localization, accessibility, or user interface clarity by setting descriptive text that appears when hovering over or focusing on the down arrow, enabling developers to provide translated, customized, or contextual help messages for the numeric field’s down-step action.
</div>

#### Example

    <input id="numerictextbox" />
    <script>
    $("#numerictextbox").kendoNumericTextBox({
        downArrowText: "Less"
    });
    </script>

### factor `Number`*(default: "1")*

Specifies the factor by which the value is multiplied. The obtained result is used as edit value. So, if `15` as string is entered in the **NumericTextBox** and the factor value is set to `100` the visual value will be `1500`. On blur the visual value will be divided by `100` thus scaling the widget value to the original proportion.


<div class="meta-api-description">
How to adjust the numeric input value in a Kendo UI NumericTextBox to display different magnitudes than its actual value? Adjust, scale, multiply, or control the numeric input value's visual representation by setting a factor that expands or contracts the displayed number during editing while maintaining the actual underlying original value; this enables entering values that are automatically multiplied for display and then correctly scaled back when focus leaves the input, supporting scenarios like percentage conversion, unit scaling, or proportional value adjustments where the input's numeric magnitude shown to users differs from the stored base figure, and allows configuration to customize how user-entered numbers are transformed visually without altering data integrity.
</div>

#### Example

    <input id="numerictextbox" />
    <script>
    $("#numerictextbox").kendoNumericTextBox({
       format: "p0",
       factor: 100,
       min: 0,
       max: 1,
       step: 0.01
    });
    </script>

### fillMode `String`*(default: "solid")*

Sets a value controlling how the color is applied. Can also be set to the following string values:

- "none"
- "solid"
- "flat"
- "outline"


<div class="meta-api-description">
How can I customize the appearance of a numeric input field in Kendo UI to have an outlined border? Adjust or configure the color application style and visual fill behavior for input fields or numeric text components, enabling solid, flat, outlined, or no fill appearance to customize how backgrounds, borders, or highlights appear within form controls, input boxes, or user interface elements; apply different fill modes to change the look and feel of numeric fields, including options for solid color filling, flat shading, outlined borders, or transparent styles for enhanced UI design customization and styling flexibility in numeric input controls.
</div>

#### Example - sets the fillMode

    <input id="numerictextbox" />
    <script>
    $("#numerictextbox").kendoNumericTextBox({
        fillMode: "flat"
    });
    </script>

### format `String`*(default: "n")*

Specifies the number format used when the widget is not focused. Check this page for all [valid number formats](/framework/globalization/intl/numberformatting).

Compare with the [`decimals`](/api/javascript/ui/numerictextbox#configuration-decimals) property.


<div class="meta-api-description">
How can I customize the display format of numbers in a Kendo UI NumericTextBox? Adjust the display style or formatting pattern of numeric input values when the field is not active or focused, enabling control over how numbers appear with standard or custom numeric formats, including currency, percentage, decimal places, thousands separators, or localized number styles; configure output formatting for readability, presentation, or parsing purposes, differentiating between editing and display modes and customizing the appearance of numbers when a user finishes typing or moves focus away from the input field.
</div>

#### Example

    <input id="numerictextbox" />
    <script>
    $("#numerictextbox").kendoNumericTextBox({
       format: "c0"
    });
    </script>


### inputMode `String`*(default: "text")*

Specifies the [`inputmode` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode) of the inner `<input />` element. It is used to specify the type of on-screen keyboard that should be displayed when the user focuses the input.


<div class="meta-api-description">
How do I customize the virtual keyboard for a numeric input field in Kendo UI NumericTextBox? Control and customize the type of virtual keyboard or on-screen keypad that appears when users interact with a numeric input field, enabling options like numeric-only, decimal number entry, telephone keypad, email input, URL entry, or search keyboard on mobile and touch devices; configure, set, or specify input modes to optimize user input experience, enhance form usability on smartphones and tablets, and dictate which keyboard layout shows up for numeric or text input cases in web forms and applications.
</div>

#### Example

    <input id="numerictextbox" />
    <script>
    $("#numerictextbox").kendoNumericTextBox({
        inputMode: "decimal"
    });
    </script>

### label `String|Function|Object` *(default: null)*

Adds a label before the input. If the input has no `id` attribute, a generated `id` will be assigned. The `string` and the `function` parameters are setting the inner HTML of the label.


<div class="meta-api-description">
How do I set the label for a Kendo NumericTextBox? Set, configure, or customize text displayed as a label or caption preceding a numeric input field, including assigning accessible identifiers like IDs automatically when missing, using plain strings or dynamic functions to define label content, enabling control over descriptive text that appears before or alongside numeric input elements, supporting cases where labeling needs to be static text, dynamic content, or programmatically generated HTML, and managing accessibility and usability by linking labels to inputs for clearer user interfaces and enhanced form navigation.
</div>

#### Example - create a label from a string

    <input id="numerictextbox" />
    <script>
        $("#numerictextbox").kendoNumericTextBox({
            label: "First name"
        });
    </script>

The function context (available through the keyword `this`) will be set to the widget instance.

#### Example - create a label from a function

    <input id="numerictextbox" />
    <script>
        $("#numerictextbox").kendoNumericTextBox({
            label: function() {
                return "First name";
            }
        });
    </script>

### label.content `String|Function` *(default: "")*

Sets the inner HTML of the label.


<div class="meta-api-description">
How can I customize the content of a NumericTextBox label with HTML tags? Customize and control the label's inner HTML content for numeric input fields by setting rich markup, HTML tags, and formatted text within the label element, enabling developers to embed links, styles, or complex label structures that enhance clarity, accessibility, or branding. Configure and define the label display dynamically to support customized label rendering, rich content insertion, and flexible labeling of number input components to meet varied UI requirements with precise HTML control.
</div>

#### Example - create a label from a string

    <input id="numerictextbox" />
    <script>
        $("#numerictextbox").kendoNumericTextBox({
            label: {
                content: "First name"
            }
        });
    </script>

The function context (available through the keyword `this`) will be set to the widget instance.

#### Example - create a label from a function

    <input id="numerictextbox" />
    <script>
        $("#numerictextbox").kendoNumericTextBox({
            label: {
                content: function() {
                    return "First name";
                }
            }
        });
    </script>

### label.floating `Boolean` *(default: false)*

If set to `true`, the widget will be wrapped in a container that will allow the floating label functionality.

> **Important:** The [value](/api/javascript/ui/numerictextbox/methods/value) method **does not trigger** the `focusout` event of the input.
This can affect the floating label functionality.
To overcome this behavior, manually invoke the `refresh` method of the Floating Label: `$("#numerictextbox").data("kendoNumericTextBox").floatingLabel.refresh();`

<div class="meta-api-description">
How do I enable floating label behavior in Kendo UI NumericTextBox? Control how a label dynamically floats above a numeric input field by enabling or disabling floating label behavior, allowing the label to move above the input on focus or when values are entered for improved form readability and layout management. This feature supports creating interactive, user-friendly numeric input forms with floating or floating-style labels that respond to input focus or value changes. It involves configuring or wrapping the numeric input with floating label containers, managing label positioning automatically during user interactions, focus events, or programmatic value updates, and handling cases where manual refresh is needed to sync label state when input focusout events are not triggered. This floating label control is essential for developers looking to implement advanced label animations, floating placeholders, or enhanced form UI where labels visually separate from input text on focus or typing within numeric input fields.
</div>

#### Example - create a floating label

    <input id="numerictextbox" />
    <script>
        $("#numerictextbox").kendoNumericTextBox({
            label: {
                content: "First name",
                floating: true
            }
        });
    </script>

### max `Number`*(default: null)*

 Specifies the largest value the user can enter.


<div class="meta-api-description">
How do I set an upper limit for numeric input in a Kendo UI NumericTextBox? Set or configure the upper limit for numeric input to restrict the highest value users can enter in a numeric field, controlling maximum allowed numbers, defining value boundaries, and preventing out-of-range entries. Enable or adjust maximum constraints when validating, restricting, or setting numeric ranges, often used together with minimum limits and step increments to enforce precise input boundaries in numeric input controls, forms, or UI components handling numbers.
</div>

#### Example - specify max option

    <input id="numerictextbox" />
    <script>
    $("#numerictextbox").kendoNumericTextBox({
        max: 100
    });
    </script>

#### Example - specify max option as a HTML attribute

    <input id="numerictextbox" max="100" />
    <script>
    $("#numerictextbox").kendoNumericTextBox();
    </script>

### min `Number`*(default: null)*

 Specifies the smallest value the user can enter.


<div class="meta-api-description">
How do I restrict the input value in a Kendo UI NumericTextBox to be at least a certain number? Control the minimum numeric value accepted by a number input field, configure the lowest allowed number for validation, enforce lower bounds to restrict input through typing or spinner controls, set the smallest permissible value to prevent entries beneath a threshold, define minimum limits for numeric input components, and manage input constraints to avoid values falling below a specified minimum.
</div>

#### Example - specify min option

    <input id="numerictextbox" />
    <script>
    $("#numerictextbox").kendoNumericTextBox({
        min: -100
    });
    </script>

#### Example - specify min option as a HTML attribute

    <input id="numerictextbox" min="-100" />
    <script>
    $("#numerictextbox").kendoNumericTextBox();
    </script>

### placeholder `String`*(default: "")*

The hint displayed by the widget when it is empty. Not set by default.


<div class="meta-api-description">
How do I set the placeholder text for a numeric input field in Kendo UI? Set or customize the hint text, prompt, or placeholder string displayed inside a numeric input field when empty to guide users on what number or format to enter, including examples like default text, placeholders, input suggestions, or instructions shown before any digits are typed; control or configure the initial empty-state message, placeholder visibility, and the text that appears before user input in numeric fields or spin box controls.
</div>

#### Example

    <input id="numerictextbox" />
    <script>
    $("#numerictextbox").kendoNumericTextBox({
        placeholder: "Select A Value"
    });
    </script>


### prefixOptions `Object`

The configuration for the prefix adornment of the component.


<div class="meta-api-description">
How do I customize the prefix of a numeric text box in Kendo UI for jQuery? Control, customize, and configure prefix adornments or prepend content in number input fields with options to set static text, dynamic templates, icons, styles, and custom attributes for enhancing the appearance and behavior of numeric text inputs. Enable flexible prefix integration by defining how prefixes display, including text labels, SVG or icon elements, CSS styling, class names, and attribute settings to tailor the input’s leading decoration from initialization. Adjust prefix content and formatting for numeric input components, supporting a wide range of visual and functional prefix customizations to fit various UI needs, such as currency symbols, units, or custom markers.
</div>

#### Example - specify prefix adornment template

    <input id="numerictextbox" />
    <script>
        $("#numerictextbox").kendoNumericTextBox({
            prefixOptions: {
                template: () => `${kendo.ui.icon("search")}`
            }
        });
    </script>

### prefixOptions.icon `String`

Defines the name for an existing icon in a Kendo UI theme or SVG content


<div class="meta-api-description">
How can I customize the prefix icon in a Kendo UI NumericTextBox? Configure and customize the prefix icon displayed before numeric input values in a numeric text box by setting an icon from a predefined icon set or supplying custom SVG markup; control, enable, or change the decorative or functional graphic element that appears as a prefix alongside numeric input fields, including using theme-based named icons or raw SVG content for enhanced UI clarity, branding consistency, or improved user experience in number input components.
</div>

#### Example - specify prefix adornment icon

    <input id="numerictextbox" />
    <script>
        $("#numerictextbox").kendoNumericTextBox({
            prefixOptions: {
                icon:"search"
            }
        })
    </script>

### prefixOptions.template `String|Function`

The [template](/api/javascript/kendo/methods/template) for the prefix adornment of the component.


<div class="meta-api-description">
How do I customize the prefix content in a Kendo UI NumericTextBox? Control and customize the prefix content displayed before the numeric input field by setting static text, dynamic HTML, or custom template markup, enabling configuration of adornments or labels that appear as prefixes inside numeric input components, supporting template strings or template functions for flexible rendering of prefixes using template engines or custom render logic to tailor the user interface before the value input area.
</div>

#### Example - specify prefix adornment template

    <input id="numerictextbox" />
    <script>
        $("#numerictextbox").kendoNumericTextBox({
            prefixOptions: {
                template: () => `${kendo.ui.icon("search")}`
            }
        })
    </script>

### prefixOptions.separator `Boolean` *(default: true)*

If set to `false`, the prefix adornment will not have a separator.


<div class="meta-api-description">
How to enable/disable separator between prefix label and numeric value in Kendo UI NumericTextBox? Control the display of a visual delimiter or separator between the numeric input value and its prefix label, enabling or disabling the character that divides the prefix from the number for clearer formatting or compact presentation. Adjust settings to toggle whether the prefix is visually separated from the numeric text box content, remove spaces or symbols between prefix and value, customize how prefixes like currency symbols, units, or labels appear adjacent to numerical entries, and configure the numeric input appearance for seamless or distinct prefix alignment without a dividing separator. This setting supports scenarios where developers want to set, enable, or disable a separator or delimiter between a prefix and the numeric field value, influencing how prefixes integrate visually in forms, calculators, or data entry components.
</div>

#### Example - specify prefix adornment separator

    <input id="numerictextbox" />
    <script>
        $("#numerictextbox").kendoNumericTextBox({
            prefixOptions: {
                template: () => `${kendo.ui.icon("search")}`,
                separator: false
            }
        })
    </script>



### restrictDecimals `Boolean`*(default: false)*

 Specifies whether the decimals length should be restricted during typing. The length of the fraction is defined by the `decimals` value.


<div class="meta-api-description">
How can I limit the number of decimal places in a Kendo UI NumericTextBox? Control and set the maximum number of decimal places allowed in numerical input fields, enabling precision enforcement and limiting fraction length during typing, restricting users from entering excessive decimal digits, configuring live validation to ensure correct decimal-place input, managing input precision dynamically, preventing more digits than specified after the decimal point, and enabling decimal digit constraints to maintain consistent numerical format in text boxes.
</div>

#### Example

    <input id="numerictextbox" />
    <script>
    $("#numerictextbox").kendoNumericTextBox({
        decimals: 3,
        restrictDecimals: true
    });
    </script>

### round `Boolean`*(default: true)*

 Specifies whether the value should be rounded or truncated. The length of the fraction is defined by the `decimals` value.


<div class="meta-api-description">
How to handle decimal values in Kendo UI NumericTextBox? Adjust how numeric input manages decimal values by specifying whether to round numbers to the nearest allowed precision or truncate them by cutting off excess digits, controlling the handling of fractional parts for formatting, value processing, or validation in numeric entry fields. Configure rounding behavior, decimal precision, fractional digit handling, or truncation methods to influence numerical data representation, precision control, or input sanitization in user interfaces that require flexible numeric value formatting and display options.
</div>

#### Example

    <input id="numerictextbox" />
    <script>
    $("#numerictextbox").kendoNumericTextBox({
        round: false
    });
    </script>

### rounded `String`*(default: "medium")*

Sets a value controlling the border radius. Can also be set to the following string values:

- "none"
- "small"
- "medium"
- "large"
- "full"


<div class="meta-api-description">
How do I customize the corner curvature of a Kendo UI NumericTextBox? Adjust the input field corner curvature or border radius to achieve square edges, slightly rounded corners, or fully rounded shapes by configuring numeric values or selecting preset options such as none, small, medium, large, or full radius; customize the appearance of numeric input boxes by setting how rounded or sharp the corners appear, enabling control over the visual style and user interface design of numeric text fields with versatile rounding settings.
</div>

#### Example - sets the rounded value

    <input id="numerictextbox" />
    <script>
    $("#numerictextbox").kendoNumericTextBox({
        rounded: "large"
    });
    </script>

### selectOnFocus `Boolean`*(default: false)*

 When set to true, the text of the input will be selected after the widget is focused.


<div class="meta-api-description">
How to automatically select numeric input in Kendo UI NumericTextBox when it gains focus? Control automatic highlighting and selection of the input value when a numeric input gains focus, enabling quick replacement, copying, or editing of numbers. Configure whether the entire numeric text is selected on focus to improve user efficiency during data entry, editing, or form interactions. Enable or disable focus-driven text selection behavior to streamline workflows involving numeric inputs, making it easier to overwrite, edit, or copy values immediately upon clicking or tabbing into the field. Adjust settings for auto-selecting the full numeric content upon focus to enhance usability and speed for forms, sliders, calculators, or input controls handling numbers. Manage how numeric input fields respond to gaining focus by controlling if the complete number is highlighted automatically for faster user edits or replacements.
</div>

#### Example

    <input id="numerictextbox" />
    <script>
    $("#numerictextbox").kendoNumericTextBox({
        selectOnFocus: true
    });
    </script>

### size `String`*(default: "medium")*

Sets a value controlling size of the component. Can also be set to the following string values:

- "small"
- "medium"
- "large"
- "none"


<div class="meta-api-description">
How do I adjust the size of a numeric input control in Kendo UI for jQuery? Adjust the numeric input control’s dimensions and spacing by specifying its scale and density to make it more compact, spacious, or default sized; configure the numeric field’s size with options like small, medium, large, or none to tailor the visual appearance for minimal, standard, or expanded layouts, enabling fine-tuning of the component’s footprint, UI density, and responsive sizing for various device form factors and design preferences.
</div>

#### Example - sets a size

    <input id="numerictextbox" />
    <script>
    $("#numerictextbox").kendoNumericTextBox({
        size: "large"
    });
    </script>

### spinners `Boolean`*(default: true)*

 Specifies whether the up and down spin buttons should be rendered


<div class="meta-api-description">
How to disable spinner controls in Kendo UI NumericTextBox? Toggle visibility of increment and decrement buttons in numeric input fields to enable or disable spinner controls, allowing configuration of up/down arrows for adjusting values, hiding or showing stepper buttons for simplified user interfaces, customizing or removing built-in spin functionality, controlling whether users can change numbers via arrow controls, and managing UI elements for numeric value modification in forms or interactive components.
</div>

#### Example - hide spin buttons

    <input id="numerictextbox" />
    <script>
    $("#numerictextbox").kendoNumericTextBox({
        spinners: false
    });
    </script>

### step `Number`*(default: 1)*

 Specifies the value used to increment or decrement widget value.


<div class="meta-api-description">
How to adjust increment amount in NumericTextBox when using spin buttons? Adjust the numeric input increment or decrement amount to control the value changes when using spin buttons, arrow keys, or programmatic updates, enabling precise step sizes, value intervals, or custom numeric increments for fine-tuning input behavior and enforcing increment control, step intervals, value stepping, customizable step amounts, or step size configuration in numeric input components.
</div>

#### Example - specify step option

    <input id="numerictextbox" />
    <script>
    $("#numerictextbox").kendoNumericTextBox({
        step: 0.1
    });
    </script>

#### Example - specify step option as a HTML attribute

    <input id="numerictextbox" step="0.1" />
    <script>
    $("#numerictextbox").kendoNumericTextBox();
    </script>


### suffixOptions `Object`

The configuration for the suffix adornment of the component.


<div class="meta-api-description">
How can I customize the suffix in a Kendo UI NumericTextBox? Configure or customize the text, icon, or label displayed immediately after a numeric input value, adjusting the suffix adornment’s content, style, visibility, and interactive behavior for number input fields. Control or set suffix decorations, units, symbols, or contextual indicators appended to numeric inputs, modifying how additional information or measurement labels appear after user-entered values, with options to fine-tune appearance, formatting, and interaction for enhanced data clarity and UI consistency.
</div>

#### Example - specify suffix adornment template

    <input id="numerictextbox" />
    <script>
        $("#numerictextbox").kendoNumericTextBox({
            suffixOptions: {
                template: () => `${kendo.ui.icon("search")}`
            }
        });
    </script>

### suffixOptions.icon `String`

Defines the name for an existing icon in a Kendo UI theme or SVG content


<div class="meta-api-description">
How to add an icon suffix to a numeric input field in Kendo UI for jQuery? Configure or add a visual icon as a suffix to numeric input fields, enabling the use of predefined theme icons or custom SVG markup to enhance the numerical text box appearance and user interface; supports specifying icon names from UI icon libraries or embedding raw SVG content for flexible styling and branding of numeric input components.
</div>

#### Example - specify suffix adornment icon

    <input id="numerictextbox" />
    <script>
        $("#numerictextbox").kendoNumericTextBox({
            suffixOptions: {
                icon: "search"
            }
        })
    </script>

### suffixOptions.template `String|Function`

The [template](/api/javascript/kendo/methods/template) for the suffix adornment of the component.


<div class="meta-api-description">
How to customize suffix elements in Kendo UI NumericTextBox? Control, customize, and configure suffix elements or adornments displayed after numeric input fields by using customizable template strings or functions to render dynamic, formatted content. Enable suffix customization for numeric input controls, allowing developers to set suffix labels, symbols, units, or any formatted markup that appears following the entered number. Support various customization patterns including static text, conditional formatting, or dynamic templates that adapt based on input values, ideal for appending units, currency symbols, measurement codes, or contextual indicators to numeric text boxes. Tailor the display of suffixes to suit localization, formatting needs, or business logic by providing flexible template options that can be configured programmatically or declaratively. This facilitates extensive control over rendering suffix adornments in numeric input components across web applications or UI frameworks.
</div>

#### Example - specify suffix adornment template

    <input id="numerictextbox" />
    <script>
        $("#numerictextbox").kendoNumericTextBox({
            suffixOptions: {
                template: () => `${kendo.ui.icon("search")}`
            }
        })
    </script>

### suffixOptions.separator `Boolean` *(default: true)*

If set to `false`, the suffix adornment will not have a separator.


<div class="meta-api-description">
How to configure the separator in NumericTextBox suffix options? Adjust how the numeric input’s suffix displays by configuring whether a visual divider or separator appears between the number field and its suffix text or symbol, enabling you to toggle a distinct boundary or seamless adjacency between the numeric value and its unit, label, or adornment, with options to enable, disable, set, or control the spacing and separation style for clearer differentiation or compact layout in numeric input interfaces.
</div>

#### Example - specify suffix adornment separator

    <input id="numerictextbox" />
    <script>
        $("#numerictextbox").kendoNumericTextBox({
            suffixOptions: {
                template: () => `${kendo.ui.icon("search")}`,
                separator: false
            }
        })
    </script>



### upArrowText `String`*(default: "Increase value")*

 Specifies the text of the tooltip on the up arrow.


<div class="meta-api-description">
How to customize up arrow button tooltip in NumericTextBox? Customize or set the tooltip text, label, or accessible description displayed when hovering over or focusing on the increment up arrow button in numeric input controls, enabling localization, accessibility improvements, user interface customization, and clear spin control identification; configure or update the hover text, up arrow label, or increment button description to support various languages, screen readers, and user feedback for numeric step controls in forms or UI components.
</div>

#### Example

    <input id="numerictextbox" />
    <script>
    $("#numerictextbox").kendoNumericTextBox({
        upArrowText: "More"
    });
    </script>

### value `Number`*(default: null)*

 Specifies the value of the NumericTextBox widget.


<div class="meta-api-description">
How do I set the initial value of a Kendo NumericTextBox? Set, get, or update the numeric input value displayed in a numeric text box, control or retrieve its current number programmatically, initialize with a starting value, bind the numeric data for two-way syncing with models or forms, manipulate or access the displayed number for validation, user input handling, form submission, or dynamic updates in code, and integrate numeric controls with reactive data sources or event-driven interfaces.
</div>

#### Example - specify value option

    <input id="numerictextbox" />
    <script>
    $("#numerictextbox").kendoNumericTextBox({
        value: 10
    });
    </script>

#### Example - specify value option as a HTML attribute

    <input id="numerictextbox" value="10" />
    <script>
    $("#numerictextbox").kendoNumericTextBox();
    </script>

## Fields

### options `Object`
An object, which holds the options of the widget.


<div class="meta-api-description">
How do I dynamically change the decimal places of a NumericTextBox in Kendo UI? Access and modify the full set of configuration settings for a numeric input control at runtime, including properties like formatting options, current value, minimum and maximum limits, step increments, and decimal precision. Enable dynamic inspection or adjustment of the numeric field’s behavior, update formatting styles or validation rules, control allowed ranges and stepping intervals, change displayed value formatting or decimal places, and programmatically configure or retrieve all current numeric input parameters after the control has been initialized. This allows querying, updating, or overriding numeric input settings on the fly for flexible and interactive number handling in user interfaces.
</div>

#### Example - get options of the widget

    <input id="numerictextbox" />
    <script>
    $("#numerictextbox").kendoNumericTextBox();

    var numerictextbox = $("#numerictextbox").data("kendoNumericTextBox");

    var options = numerictextbox.options;
    </script>

## Methods

### destroy
Prepares the **NumericTextBox** for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the NumericTextBox element from DOM.


<div class="meta-api-description">
How do I properly remove a NumericTextBox widget to prevent memory leaks? remove or clean up a numeric input widget, release resources and memory, detach event handlers to prevent leaks, clear internal data and references, safely prepare component for disposal, teardown before destroying or removing from page, cleanup nested child widgets and their events, ensure no residual listeners remain, reset numeric input controls for safe removal, handle memory management for number input fields, unbind events and clear data bindings from numeric text controls, prepare numeric input interface for garbage collection, avoid memory leaks by removing widget-related handlers and data without deleting HTML elements.
</div>

#### Example

    <input id="numerictextbox" />
    <script>
    $("#numerictextbox").kendoNumericTextBox();

    var numerictextbox = $("#numerictextbox").data("kendoNumericTextBox");

    // detach events
    numerictextbox.destroy();
    </script>

### enable

Enables or disables the widget.


<div class="meta-api-description">
How do I programmatically enable or disable a NumericTextBox in Kendo UI for jQuery? Toggle activation, enablement, or interactivity of a numeric input field dynamically during runtime to control whether users can enter, edit, focus, or interact with the numeric control. This method lets developers programmatically switch the numeric textbox between enabled and disabled states, controlling user input access and focusability after the component has been initialized or rendered. Use cases include enabling or disabling the numeric field based on application logic, validating input availability, managing form states, and dynamically controlling input readiness in numeric form controls.
</div>

#### Parameters

##### enable `Boolean`

If set to `true` the widget will be enabled. If set to `false` the widget will be disabled.

Setting this property to `true` does not affect other properties of the NumericTextBox. It applies the `.k-disabled` CSS class of the wrapper span and sets the `aria-disabled` property of the input to `true`.

#### Example - enable the widget

    <input id="numerictextbox" disabled="disabled" />
    <script>
    $("#numerictextbox").kendoNumericTextBox();

    var numerictextbox = $("#numerictextbox").data("kendoNumericTextBox");
    numerictextbox.enable(true);
    </script>

### readonly

Toggles the readonly state of the widget. When the widget is readonly it doesn't allow user input.

> There is a difference between disabled and readonly mode. The value of a disabled widget is **not** posted as part of a `form` whereas the value of a readonly widget is posted.


<div class="meta-api-description">
How do I prevent user input in Kendo UI NumericTextBox while still allowing form submission? Control the ability to prevent user input on numeric input fields while retaining the current value for form submission by enabling or disabling edit access without blocking data posting. Configure numeric inputs to be non-editable or locked so users cannot change the value but the existing number remains submitted with forms, differentiating from fully disabled states that omit values from submission. Set, toggle, or check the read-only status to allow passive display of numeric values that can be included in form data but restrict typing, clicking, or changing the number, supporting use cases for preserving form integrity, validation, and controlled user interaction in data entry scenarios.
</div>

#### Parameters

##### readonly `Boolean`

If set to `true` the widget will not allow user input. If set to `false` the widget will allow user input.

#### Example - make the widget readonly

    <input id="numerictextbox" />
    <script>
    $("#numerictextbox").kendoNumericTextBox();

    var numerictextbox = $("#numerictextbox").data("kendoNumericTextBox");
    numerictextbox.readonly();
    </script>

### focus

Focuses the widget.


<div class="meta-api-description">
How do I programmatically focus on a Kendo UI NumericTextBox? Programmatically set or control keyboard focus on numeric input fields to enable immediate typing, activate input elements via code or user interaction, shift focus after validation or page initialization, trigger standard focus events for accessibility and keyboard support, and ensure the cursor is positioned on number entry fields without altering their current content or values.
</div>

#### Example

    <input id="numerictextbox" />
    <script>
    $("#numerictextbox").kendoNumericTextBox();

    var numerictextbox = $("#numerictextbox").data("kendoNumericTextBox");
    numerictextbox.focus();
    </script>

### max

Gets or sets the max value of the widget.


<div class="meta-api-description">
How do I set an upper limit for numeric input in a Kendo UI NumericTextBox widget? Set, retrieve, or update the upper limit for numeric input dynamically to enforce maximum value constraints and validation rules in numeric input controls; control or adjust the highest allowable number programmatically during runtime, manage input boundaries, establish or modify maximum thresholds for user-entered numbers, enforce upper bounds to prevent values exceeding a specific limit, constrain input values by setting or getting max numeric limits, enable dynamic adjustment of maximum permissible numeric values, retrieve current max caps, or programmatically impose new maximums for numeric entry widgets.
</div>

#### Parameters

##### value `Number | String`

The max value to set.

#### Returns

`Number` The max value of the widget.

#### Example - get the max value of the NumericTextBox

    <input id="numerictextbox" />
    <script>
    $("#numerictextbox").kendoNumericTextBox();

    var numerictextbox = $("#numerictextbox").data("kendoNumericTextBox");

    var max = numerictextbox.max();

	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(max);
    </script>

#### Example - set the max value of the NumericTextBox

    <input id="numerictextbox" />
    <script>
    $("#numerictextbox").kendoNumericTextBox();

    var numerictextbox = $("#numerictextbox").data("kendoNumericTextBox");

    var max = numerictextbox.max();

    numerictextbox.max(10);
    </script>

### min

Gets or sets the min value of the widget.


<div class="meta-api-description">
How do I set the lowest allowed value in a Kendo UI NumericTextBox? Configure or retrieve the minimum numeric value restriction to enforce the lowest acceptable input in a numeric input field, set a lower limit or boundary for user-entered numbers, programmatically control, update, or validate the minimum allowed value, bind or dynamically adjust the numeric minimum limit for input validation and range control, get the current minimum constraint or specify a new one to ensure user input stays above a defined threshold in numeric entry components.
</div>

#### Parameters

##### value `Number | String`

The min value to set.

#### Returns

`Number` The min value of the widget.

#### Example - get the min value of the NumericTextBox

    <input id="numerictextbox" />
    <script>
    $("#numerictextbox").kendoNumericTextBox();

    var numerictextbox = $("#numerictextbox").data("kendoNumericTextBox");

    var min = numerictextbox.min();

	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(min);
    </script>

#### Example - set the min value of the NumericTextBox

    <input id="numerictextbox" />
    <script>
    $("#numerictextbox").kendoNumericTextBox();

    var numerictextbox = $("#numerictextbox").data("kendoNumericTextBox");

    var min = numerictextbox.min();

    numerictextbox.min(10);
    </script>

### step

Gets or sets the step value of the widget.


<div class="meta-api-description">
How do I set the step interval for a Kendo NumericTextBox to only allow integer increments? Configure the amount by which numeric input values increase or decrease when interacting with spin buttons or keyboard arrow keys, enabling precise control over increment or decrement steps including both whole numbers and decimals. Adjust or retrieve the step size dynamically through methods that set or get the interval for value changes, supporting use cases such as fine-tuning numeric adjustments, controlling step intervals, customizing input sensitivity, enabling decimal or integer increments, programmatically updating value changes, and managing numeric spin behavior for user interfaces.
</div>

#### Parameters

##### value `Number | String`

The step value to set.

#### Returns

`Number` The step value of the widget.

#### Example - get the step value of the NumericTextBox

    <input id="numerictextbox" />
    <script>
    $("#numerictextbox").kendoNumericTextBox();

    var numerictextbox = $("#numerictextbox").data("kendoNumericTextBox");

    var step = numerictextbox.step();

	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(step);
    </script>

#### Example - set the step value of the NumericTextBox

    <input id="numerictextbox" />
    <script>
    $("#numerictextbox").kendoNumericTextBox();

    var numerictextbox = $("#numerictextbox").data("kendoNumericTextBox");

    var step = numerictextbox.step();

    numerictextbox.step(0.5);
    </script>

### value

Gets or sets the value of the NumericTextBox.

> **Important:** This method **does not trigger** the `focusout` event of the input.
This can affect the [floating label functionality](/api/javascript/ui/numerictextbox/configuration/label.floating).
To overcome this behavior, manually invoke the `refresh` method of the Floating Label: `$("#numerictextbox").data("kendoNumericTextBox").floatingLabel.refresh();`


<div class="meta-api-description">
How do I dynamically set or get the numeric value of a Kendo UI NumericTextBox in jQuery? Retrieve or assign the numeric input value programmatically by getting the current number or setting a new numeric value in the control through code, enabling dynamic reading, updating, or manipulation of the numeric input field without user interaction. Control the numeric field’s data state directly, bypassing user-triggered events like focusout or blur, which means updates won’t automatically fire event handlers or refresh UI elements such as floating labels unless manually refreshed. Common use cases include programmatically changing, retrieving, or syncing numeric values in forms, input validations, calculations, or custom logic flows where numeric input control values need to be accessed or modified without triggering input focus changes or related event side effects.
</div>

#### Parameters

##### value `Number | String`

The value to set.

#### Returns

`Number` The value of the widget.

#### Example - get the value of the NumericTextBox

    <input id="numerictextbox" />
    <script>
    $("#numerictextbox").kendoNumericTextBox();

    var numerictextbox = $("#numerictextbox").data("kendoNumericTextBox");

    var value = numerictextbox.value();

	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(value);
    </script>

#### Example - set the value of the NumericTextBox

    <input id="numerictextbox" />
    <script>
    $("#numerictextbox").kendoNumericTextBox();

    var numerictextbox = $("#numerictextbox").data("kendoNumericTextBox");

    var value = numerictextbox.value();

    numerictextbox.value(0.5);
    </script>

## Events

### change

Fires when the value is changed


<div class="meta-api-description">
How to detect when user changes value in Kendo UI NumericTextBox? Detect and respond to modifications in numeric input fields by capturing value updates whenever users alter the number, enabling real-time validation, data binding, state management, or triggering related UI changes. Monitor input shifts, track value transitions, and handle events that fire on numeric value alterations to synchronize models, refresh interfaces, or execute custom logic based on the updated numeric content, ensuring dynamic responsiveness to user edits and programmatic changes alike.
</div>

#### Event Data

##### e.sender `kendo.ui.NumericTextBox`

The widget instance which fired the event.

#### Example - subscribe to the "change" event during initialization

    <input id="numerictextbox" />
    <script>
    $("#numerictextbox").kendoNumericTextBox({
        change: function() {
            var value = this.value();
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log(value); //value is the selected date in the numerictextbox
        }
    });
    </script>

#### Example - subscribe to the "change" event after initialization

    <input id="numerictextbox" />
    <script>
    $("#numerictextbox").kendoNumericTextBox();

    var numerictextbox = $("#numerictextbox").data("kendoNumericTextBox");

    numerictextbox.bind("change", function() {
        var value = this.value();
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(value); //value is the selected date in the numerictextbox
    });
    </script>

### spin

Fires when the value is changed from the spin buttons


<div class="meta-api-description">
How to detect changes triggered by spin controls in Kendo UI NumericTextBox? Detect changes triggered by incrementing or decrementing numeric input using spin controls, enabling response to value updates from arrow buttons, spinner interaction, or step adjustments; capture events when users click or tap numeric stepper arrows to modify values, facilitating validation, data binding updates, dynamic UI refreshes, or custom logic execution upon numeric value changes caused by spinner increments or decrements within numeric input fields.
</div>

#### Event Data

##### e.sender `kendo.ui.NumericTextBox`

The widget instance which fired the event.

#### Example - subscribe to the "spin" event during initialization

    <input id="numerictextbox" />
    <script>
    $("#numerictextbox").kendoNumericTextBox({
        spin: function() {
            var value = this.value();
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log(value); //value is the selected date in the numerictextbox
        }
    });
    </script>

#### Example - subscribe to the "spin" event after initialization

    <input id="numerictextbox" />
    <script>
    $("#numerictextbox").kendoNumericTextBox();

    var numerictextbox = $("#numerictextbox").data("kendoNumericTextBox");

    numerictextbox.bind("spin", function() {
        var value = this.value();
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(value); //value is the selected date in the numerictextbox
    });
    </script>
