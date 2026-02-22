---
title: MaskedTextBox
page_title: Configuration, methods and events of Kendo UI MaskedTextBox
description: Code examples and tips how to configure MaskedTextBox widget, use available methods and events.
res_type: api
component: maskedtextbox
---

# kendo.ui.MaskedTextBox

Represents the Kendo UI MaskedTextBox widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### clearPromptChar `Boolean`*(default: false)*

Specifies whether the widget will replace the prompt characters with spaces on blur. Prompt chars will be shown again on focus (available since Q2 2014 SP1).


<div class="meta-api-description">
How to hide placeholder characters in masked input fields when they lose focus? Control hiding or displaying placeholder characters in masked input fields by configuring the replacement of mask prompt symbols with spaces or blanks when the input loses focus, allowing input masks to appear clearer on blur and automatically restoring placeholder markers on focus. Adjust how mask prompt characters behave on focus and blur events to manage visibility, customize user input experience by enabling or disabling prompt character clearance, ensure better readability and cleaner input display when the field is unfocused, and set the input component to toggle prompt placeholders dynamically during user interaction or editing states.
</div>

#### Example - specify different prompt char

    <input id="maskedtextbox" />
    <script>
    $("#maskedtextbox").kendoMaskedTextBox({
        mask: "000000",
        clearPromptChar: true
    });
    </script>

### culture `String`*(default: "en-US")*

Specifies the culture info used by the widget.


<div class="meta-api-description">
How do I configure date and number formats for a Kendo UI MaskedTextBox? Configure locale settings, regional formats, or language-specific parsing for input controls by setting culture or language preferences that influence date, time, number formats, separators, and validation patterns. Enable or adjust locale-aware masks to handle internationalization, regional input conventions, cultural identifiers such as "en-US" or other language codes, ensuring proper formatting and parsing of user-entered data according to specific cultural rules and standards. Control or customize data input behavior to comply with local conventions, adapt to different geographical or linguistic environments, and support multi-language scenarios for text boxes requiring format-sensitive validation and display.
</div>

#### Example - specify German culture internationalization


    <script src="https://kendo.cdn.telerik.com/2024.3.1015/js/cultures/kendo.culture.de-DE.min.js"></script>
    <input id="maskedtextbox" />
    <script>
    $("#maskedtextbox").kendoMaskedTextBox({
        mask: "0,000.00 $",
        culture: "de-DE"
    });
    </script>

### fillMode `String`*(default: undefined)*

Sets a value controlling how the color is applied. When `undefined` (the default), the theme controls the default fill mode. Can also be set to the following string values:

- "solid"
- "flat"
- "outline"

> The `"none"` value is deprecated. Use custom CSS instead.


<div class="meta-api-description">
How do I customize the background color of a MaskedTextBox in Kendo UI for jQuery? Adjust how the input field's background or border color is displayed by setting fill styles such as solid fills for full background coverage, flat fills for minimalistic surface coloring, outlines to highlight edges with borders, or disabling color fills altogether to keep backgrounds transparent or default. Customize the visual appearance using modes that control whether the color fills the entire area, appears only as an outline, remains flat and subtle, or is omitted completely for unstyled backgrounds, enabling flexible design options and theming control in text input components.
</div>

#### Example - sets the fillMode

    <input id="maskedtextbox" />
    <script>
    $("#maskedtextbox").kendoMaskedTextBox({
        mask: "000000",
        fillMode: "flat"
    });
    </script>


### inputMode `String`*(default: "text")*

Specifies the [`inputmode` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode) of the inner `<input />` element. It is used to specify the type of on-screen keyboard that should be displayed when the user focuses the input.


<div class="meta-api-description">
How do I configure the on-screen keyboard for Kendo UI MaskedTextBox to only show numbers? Control or configure the type of on-screen keyboard or virtual keypad that appears when entering data into a masked input field by specifying input modes such as numeric, decimal, telephone, email, URL, or plain text. Enable or set the input mode attribute to influence mobile or touch device keyboards, optimize user input for specific data types, improve data entry accuracy, and ensure the displayed keyboard matches expected input formats. Adjust keyboard behavior for input fields by defining input modes like numbers-only, decimal points, phone numbers, email addresses, web links, or general text input to enhance usability and user experience on various devices.
</div>

#### Example

    <input id="maskedtextbox" />
    <script>
    $("#maskedtextbox").kendoMaskedTextBox({
        mask: "000-000-0000",
        inputMode: "numeric"
    });
    </script>


### label `String|Function|Object` *(default: null)*

Adds a label before the input. If the input has no `id` attribute, a generated `id` will be assigned. The `string` and the `function` parameters are setting the inner HTML of the label.


<div class="meta-api-description">
How to customize the label in a Kendo UI masked textbox? Configure and customize a descriptive label or text prompt displayed before an input field, enabling clear identification or captioning of the input area. Control label content using static strings or dynamic functions to set the label's inner HTML, link labels to inputs by associating them through IDs, which can be auto-generated if missing, ensuring accessibility and user interface clarity. Enable setting, modifying, or binding label elements for form inputs to enhance usability, screen reader compatibility, and form field identification in web forms or UI components.
</div>

#### Example - create a label from a string

    <input id="maskedtextbox" />
    <script>
        $("#maskedtextbox").kendoMaskedTextBox({
            label: "First name"
        });
    </script>

The function context (available through the keyword `this`) will be set to the widget instance.

#### Example - create a label from a function

    <input id="maskedtextbox" />
    <script>
        $("#maskedtextbox").kendoMaskedTextBox({
            label: function() {
                return "First name";
            }
        });
    </script>

### label.content `String|Function` *(default: "")*

Sets the inner HTML of the label.


<div class="meta-api-description">
How to customize label content in Kendo UI MaskedTextBox? Customize the label text or HTML content for an input field by setting or controlling the label’s inner HTML, enabling plain text, formatted text, icons, or embedded elements within the label area, configuring label appearance and content dynamically during setup or runtime, adjusting label markup for user interface elements, and controlling how labels display inline text or rich HTML inside form controls.
</div>

#### Example - create a label from a string

    <input id="maskedtextbox" />
    <script>
        $("#maskedtextbox").kendoMaskedTextBox({
            label: {
                content: "First name"
            }
        });
    </script>

The function context (available through the keyword `this`) will be set to the widget instance.

#### Example - create a label from a function

    <input id="maskedtextbox" />
    <script>
        $("#maskedtextbox").kendoMaskedTextBox({
            label: {
                content: function() {
                    return "First name";
                }
            }
        });
    </script>

### label.floating `Boolean` *(default: false)*

If set to `true`, the widget will be wrapped in a container that will allow the floating label functionality.

> **Important:** The [value](/api/javascript/ui/maskedtextbox/methods/value) method **does not trigger** the `focusout` event of the input.
This can affect the floating label functionality.
To overcome this behavior, manually invoke the `refresh` method of the Floating Label: `$("#maskedtextbox").data("kendoMaskedTextBox").floatingLabel.refresh();`


<div class="meta-api-description">
How do I enable dynamic label movement in Kendo UI's MaskedTextBox? Configure floating label behavior for input fields by enabling dynamic label movement that rises above the textbox when focused or containing value, supporting seamless floating label integration by wrapping input components or enabling floating label options during setup; control label animations and interactions that respond to user focus, typing, or programmatic value changes while avoiding focus loss event conflicts, with methods available to refresh or update the floating label display state dynamically after value changes or input updates to ensure consistent label positioning and visibility.
</div>

#### Example - create a floating label

    <input id="maskedtextbox" />
    <script>
        $("#maskedtextbox").kendoMaskedTextBox({
            label: {
                content: "First name",
                floating: true
            }
        });
    </script>

### mask `String`*(default: "")*

Specifies the input mask. The following mask rules are supported:

- **0** - Digit. Accepts any digit between 0 and 9.
- **9** - Digit or space. Accepts any digit between 0 and 9, plus space.
- **#** - Digit or space. Like **9** rule, but allows also (+) and (-) signs.
- **L** - Letter. Restricts input to letters a-z and A-Z. This rule is equivalent to [a-zA-Z] in regular expressions.
- **?** - Letter or space. Restricts input to letters a-z and A-Z. This rule is equivalent to [a-zA-Z] in regular expressions.
- **&** - Character. Accepts any character. The rule is equivalent to *\S* in regular expressions.
- **C** - Character or space. Accepts any character. The rule is equivalent to *.* in regular expressions.
- **A** - Alphanumeric. Accepts letters and digits only.
- **a** - Alphanumeric or space. Accepts letters, digits and space only.
- **.** - Decimal placeholder. The decimal separator will be gotten from the current culture used by Kendo.
- **,** - Thousands placeholder. The display character will be gotten from the current culture used by Kendo.
- **$** - Currency symbol. The display character will be gotten from the current culture used by Kendo.


<div class="meta-api-description">
How do I configure input format restrictions for a Kendo UI MaskedTextBox? Configure and control input format restrictions, character validation, and culture-aware placeholders for text inputs by setting customizable masks that define which characters—digits, letters, alphanumeric, spaces, special signs, decimals, thousands separators, and currency symbols—are allowed at each position; enforce keystroke validation, input patterns, and locale-specific symbols to ensure that entered data matches specific formats such as phone numbers, dates, currencies, codes, or custom structured strings using flexible mask symbols that include digits, letters, any characters, optional spaces, plus or minus signs, and culture-sensitive decimal and currency placeholders.
</div>

#### Example - specify a phone number mask

    <input id="maskedtextbox" />
    <script>
    $("#maskedtextbox").kendoMaskedTextBox({
        mask: "(000) 000-0000"
    });
    </script>

### prefixOptions `Object`

The configuration for the prefix adornment of the component.


<div class="meta-api-description">
How do I add a custom prefix to a Kendo UI MaskedTextBox? Set or customize a static prefix or icon displayed before user input to enhance labeling and provide contextual hints; control the appearance, content, CSS styling, attributes, and visibility of the prefix to configure leading text or symbols that appear within input fields, enabling developers to add fixed characters, indicators, or decorative elements that prefix user-entered values, adjust or toggle prefix display dynamically, and tailor input field decoration for clarity, branding, or formatting purposes.
</div>

#### Example - specify prefix adornment template

    <input id="maskedtextbox" />
    <script>
        $("#maskedtextbox").kendoMaskedTextBox({
            mask: "000000",
            prefixOptions: {
                template: () => `${kendo.ui.icon("search")}`
            }
        });
    </script>

### prefixOptions.icon `String`

Defines the name for an existing icon in a Kendo UI theme or SVG content


<div class="meta-api-description">
How do I add an icon to the input field of a Kendo UI MaskedTextBox? Customize the input field by configuring a leading icon or symbol before the text area using predefined icons from a UI theme library or custom SVG graphics, enabling developers to set, change, or control the prefix icon displayed in masked input components for enhanced visual context, branding, or user interface clarity in forms and data entry fields.
</div>

#### Example - specify prefix adornment icon

    <input id="maskedtextbox" />
    <script>
        $("#maskedtextbox").kendoMaskedTextBox({
            mask: "000000",
            prefixOptions: {
                icon: "search"
            }
        })
    </script>

### prefixOptions.template `String|Function`

The [template](/api/javascript/kendo/methods/template) for the prefix adornment of the component.


<div class="meta-api-description">
How to customize the prefix of a masked input in Kendo UI for jQuery? Control and customize the masked input prefix or adornment by setting a template or custom markup that appears before the user input, enabling dynamic HTML or text prefixes through template functions or strings, useful for formatting input fields with currency symbols, codes, labels, or any prefix content rendered ahead of the typed value, allowing flexible configuration of prefix display, styling, and conditional prefix content in masked text inputs for user interfaces.
</div>

#### Example - specify prefix adornment template

    <input id="maskedtextbox" />
    <script>
        $("#maskedtextbox").kendoMaskedTextBox({
            mask: "000000",
            prefixOptions: {
                template: () => `${kendo.ui.icon("search")}`
            }
        })
    </script>

### prefixOptions.separator `Boolean` *(default: true)*

If set to `false`, the prefix adornment will not have a separator.


<div class="meta-api-description">
How to customize the delimiter between prefix label and input field in MaskedTextBox? Configure the display of a delimiter or dividing character between a prefix label or icon and the main input text field, enabling or disabling the visual separator that partitions prefix elements from entered data; adjust this setting to include, omit, or customize the dividing symbol for improved clarity, styling, or formatting when showing prefix adornments adjacent to user input in masked input controls.
</div>

#### Example - specify prefix adornment separator

    <input id="maskedtextbox" />
    <script>
        $("#maskedtextbox").kendoMaskedTextBox({
            mask: "000000",
            prefixOptions: {
                template: () => `${kendo.ui.icon("search")}`,
                separator: false
            }
        })
    </script>

### promptChar `String`*(default: "_")*

Specifies the character used to represent the absence of user input in the widget


<div class="meta-api-description">
How to change the placeholder character in Kendo UI MaskedTextBox? Set or modify the placeholder character that appears in input fields where a mask expects user input but no data has been entered yet, controlling how empty positions are visually represented in masked text inputs. Customize, configure, or change the symbol or prompt character that fills the gaps in masked user input fields, enabling clear indication of missing or incomplete data, influencing mask display behavior, setting default fill characters for unpopulated mask slots, and managing how the UI shows placeholders during form entry or data validation.
</div>

#### Example - specify different prompt char

    <input id="maskedtextbox" />
    <script>
    $("#maskedtextbox").kendoMaskedTextBox({
        mask: "000000",
        promptChar: " " //specify prompt char as empty char
    });
    </script>

> Note that the `promptChar` should not be equal to any of the used mask literals in the mask value.

### rounded `String`*(default: undefined)*

Sets a value controlling the border radius. When `undefined` (the default), the theme controls the default border radius. Can also be set to the following string values:

- "small"
- "medium"
- "large"
- "full"

> The `"none"` value is deprecated. Use custom CSS instead.


<div class="meta-api-description">
How do I set rounded corners for a Kendo UI MaskedTextBox? Adjust or configure the corner rounding of an input field by setting numeric border-radius values or predefined options like none, small, medium, large, or full to create rounded or sharp corners. Customize the shape and curvature of text input boxes by controlling the border-radius to achieve desired UI styles such as square edges, softly rounded corners, pill shapes, or fully circular input fields, enabling flexible visual design for form elements and masked inputs. This setting supports developers looking to modify the appearance of input components by enabling, setting, or toggling between specific rounding presets or precise pixel-based radius configurations during initialization or dynamic styling.
</div>

#### Example - sets a border radius

    <input id="maskedtextbox" />
    <script>
    $("#maskedtextbox").kendoMaskedTextBox({
        mask: "000000",
        size: "large",
        rounded: "large"
    });
    </script>

### rules `Object`

Defines an object of custom mask rules.


<div class="meta-api-description">
How to customize validation rules for Kendo UI MaskedTextBox input fields? Define and customize input mask patterns with specific validation rules by setting characters linked to regular expressions or validation functions, enabling precise control over allowed input formats, custom token definitions, extending or replacing default masking logic, configuring how each character in the mask is validated, supporting tailored validation logic for input fields, adjusting or overriding built-in mask behaviors to enforce specific data formats, and creating bespoke input constraints for masked text inputs.
</div>

#### Example - specify a custom rule as a RegExp instance

    <input id="maskedtextbox" />
    <script>
    $("#maskedtextbox").kendoMaskedTextBox({
        mask: "~000",
        rules: {
            "~": /[+-]/
        }
    });
    </script>

#### Example - specify a custom rule as a function

    <input id="maskedtextbox" />
    <script>
    $("#maskedtextbox").kendoMaskedTextBox({
        mask: "^000^",
        rules: {
            "^": function (char) {
                return char === "^"; //allow ony "^" symbol
            }
        }
    });
    </script>

### size `String`*(default: undefined)*

Sets a value controlling size of the component. When `undefined` (the default), the theme controls the default size. Can also be set to the following string values:

- "small"
- "medium"
- "large"

> The `"none"` value is deprecated. Use custom CSS instead.


<div class="meta-api-description">
How do I adjust the size of the Kendo UI MaskedTextBox control? Adjust the visual dimensions, scale, or overall size of the input field by setting its height and width through predefined scale options like small, medium, large, or none, or by specifying a custom sizing value to control how compact or expansive the text box appears in the user interface, enabling tailored layout, responsive design, and consistent component sizing across various screens or contexts.
</div>

#### Example - sets a size

    <input id="maskedtextbox" />
    <script>
    $("#maskedtextbox").kendoMaskedTextBox({
        mask: "000000",
        size: "large",
        rounded: "large"
    });
    </script>

### suffixOptions `Object`

The configuration for the suffix adornment of the component.


<div class="meta-api-description">
How to customize the appearance of suffix elements in Kendo UI MaskedTextBox? Control and customize the appearance, content, style, and positioning of suffix elements appended to input fields, including adding text labels, icons, or units after user input. Enable or configure suffix visibility, interaction behavior, and styling using CSS classes or templates to enhance contextual cues, UI feedback, or formatting in masked input components. Adjust suffix adornments to suit different data formats, handle user focus and hover states, and align suffixes flexibly for currency symbols, measurement units, or status indicators.
</div>

#### Example - specify suffix adornment template

    <input id="maskedtextbox" />
    <script>
        $("#maskedtextbox").kendoMaskedTextBox({
            mask: "000000",
            suffixOptions: {
                template: () => `${kendo.ui.icon("search")}`
            }
        });
    </script>

### suffixOptions.icon `String`

Defines the name for an existing icon in a Kendo UI theme or SVG content


<div class="meta-api-description">
How do I customize the suffix icon in Kendo UI MaskedTextBox? Configure or customize the suffix icon on input fields by specifying a built-in themed icon name or injecting custom SVG content to enhance visual appearance, enable icon toggling, or add actionable graphics next to text input boxes; control suffix icon rendering with options to set Kendo theme icons or provide your own scalable vector graphics for flexible styling, branding, or UI feedback indicators in masked input components.
</div>

#### Example - specify suffix adornment icon

    <input id="maskedtextbox" />
    <script>
        $("#maskedtextbox").kendoMaskedTextBox({
            mask: "000000",
            suffixOptions: {
                icon: "search"
            }
        })
    </script>

### suffixOptions.template `String|Function`

The [template](/api/javascript/kendo/methods/template) for the suffix adornment of the component.


<div class="meta-api-description">
How can I customize the suffix in a Kendo UI MaskedTextBox input field? Customize the suffix display in an input field by configuring templates that render static HTML, dynamic strings, or functions to show icons, text, or bound data after the input content; enable control over suffix adornments, styling, and dynamic rendering within masked input fields by setting or adjusting suffix template options during setup to tailor suffix visuals with flexible template definitions supporting various formats and interactive content.
</div>

#### Example - specify suffix adornment template

    <input id="maskedtextbox" />
    <script>
        $("#maskedtextbox").kendoMaskedTextBox({
            mask: "000000",
            suffixOptions: {
                template: () => `${kendo.ui.icon("search")}`
            }
        })
    </script>

### suffixOptions.separator `Boolean` *(default: true)*

If set to `false`, the suffix adornment will not have a separator.


<div class="meta-api-description">
How can I customize the separator between input field and suffix in a Kendo UI MaskedTextBox? Adjust the appearance of the input by enabling or disabling the visual divider between the masked text field and its suffix adornment, controlling whether a separator line or space is shown to distinguish the input area from suffix content, configuring the display of a boundary or gap between user input and attached suffix elements, managing the presence of a dividing mark or separator between formatted input and suffix icons or labels, toggling the visibility of a split or break that clarifies the transition from the mask input to suffix decorations, setting options to show or hide the boundary line that separates the main input from suffix adornments like units or symbols, customizing how the input and suffix are visually connected or separated by a line or spacer, deciding to present or omit a dividing element that visually partitions the masked input from its suffix components, controlling the inclusion of a separator character or UI element to improve input clarity and aesthetics.
</div>

#### Example - specify suffix adornment separator

    <input id="maskedtextbox" />
    <script>
        $("#maskedtextbox").kendoMaskedTextBox({
            mask: "000000",
            suffixOptions: {
                template: () => `${kendo.ui.icon("search")}`,
                separator: false
            }
        })
    </script>

### unmaskOnPost `Boolean`*(default: false)*

Specifies whether the widget will unmask the input value on form post (available since Q1 2015).


<div class="meta-api-description">
How to control what gets sent when submitting a form using Kendo UI MaskedTextBox? Configure input submission to send either the raw unmasked value or the formatted masked text when posting form data, enabling control over whether mask characters are included or stripped from the input before submission, suitable for scenarios requiring the original plain value for processing or the formatted display value, with options to enable, disable, or toggle automatic removal of mask patterns on form post requests.
</div>

#### Example - unmask value on form post

    <form id='form'>
      <input id="maskedtextbox" name='maskedtb'/>
      <button type='submit'>Post</button>
    </form>

    <div><h4>Result</h4><p id='result'></p></div>
    <script>
      $("#maskedtextbox").kendoMaskedTextBox({
        mask: "000000",
        unmaskOnPost: true
      });

      $("#form").on("submit", function(e) {
        e.preventDefault();
        let formData = $("#form").serialize();
        $("#result").html(formData);
      });
    </script>

### value `String`*(default: "")*

Specifies the value of the MaskedTextBox widget.


<div class="meta-api-description">
How do I get or set the formatted input value in a Kendo UI MaskedTextBox? Access or modify the current text input that conforms to a specified format or mask pattern, retrieve or set the full string including placeholders or mask characters, programmatically read or update the input value for form controls, integrate with data binding scenarios to initialize or synchronize masked input content, control or obtain the formatted user input as a string for validation, dynamic changes, or UI interactions in masked input fields.
</div>

#### Example - specify value option

    <input id="maskedtextbox" />
    <script>
    $("#maskedtextbox").kendoMaskedTextBox({
        mask: "(000) 000-0000",
        value: "(123) 456-7890"
    });
    </script>

#### Example - specify value option as a HTML attribute

    <input id="maskedtextbox" value="(123) 456-7890" />
    <script>
    $("#maskedtextbox").kendoMaskedTextBox({
        mask: "(000) 000-0000"
    });
    </script>

## Fields

### options `Object`

An object, which holds the options of the widget.


<div class="meta-api-description">
How to update the mask pattern of a Kendo UI MaskedTextBox programmatically? Configure, retrieve, and update the component’s runtime settings for text input masks, including changing mask patterns, prompt characters, current values, and other dynamic behaviors; control or inspect the live configuration object that governs masked input formatting, enabling programmatic management, debugging, state synchronization, validation tweaks, and real-time adjustments to input constraints and display formatting during application execution.
</div>

#### Example - get options of the component

    <input id="maskedtextbox" />
    <script>
    $("#maskedtextbox").kendoMaskedTextBox();

    var maskedtextbox = $("#maskedtextbox").data("kendoMaskedTextBox");

    var options = maskedtextbox.options;
    console.log(options)
    </script>

## Methods

### destroy

Prepares the **MaskedTextBox** for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks.

> **Important:** This method does not remove the MaskedTextBox element from DOM.


<div class="meta-api-description">
What happens when I call destroy on my Kendo masked input widget? Terminate or dismantle a masked input control instance to release resources, clean up event listeners, erase stored data attributes, remove internal references, and prevent memory leaks without deleting the underlying HTML element; use this to safely disable or deactivate the input widget, detach handlers, clear bindings, and prepare it for manual element removal or complete disposal in web applications.
</div>

#### Example

    <input id="maskedtextbox" />
    <script>
    $("#maskedtextbox").kendoMaskedTextBox();

    var maskedtextbox = $("#maskedtextbox").data("kendoMaskedTextBox");

    // detach events
    maskedtextbox.destroy();
    </script>

### enable

Enables or disables the widget.


<div class="meta-api-description">
How do I enable user input in a Kendo masked textbox? Control, toggle, set, or switch the interactive state of a masked input field to accept or block user input, enable or disable keyboard events, manage focus responsiveness, and dynamically activate or deactivate the component’s usability and appearance; programmatically turn on or off input acceptance and focus handling to control whether the field is editable or read-only after initialization, adjusting behavior for form input control, user interaction enabling, accessibility state management, and dynamic UI responsiveness.
</div>

#### Parameters

##### enable `Boolean`

If set to `true` the widget will be enabled. If set to `false` the widget will be disabled.

#### Example - enable the widget

    <input id="maskedtextbox" disabled="disabled" />
    <script>
    $("#maskedtextbox").kendoMaskedTextBox();

    var maskedtextbox = $("#maskedtextbox").data("kendoMaskedTextBox");
    maskedtextbox.enable(true);
    </script>

### readonly

Toggles the readonly state of the widget. When the widget is readonly it doesn't allow user input.

> There is a difference between disabled and readonly mode. The value of a disabled widget is **not** posted as part of a `form` whereas the value of a readonly widget is posted.


<div class="meta-api-description">
How to make Kendo UI MaskedTextBox input field read-only but still submit its value in a form? Control or configure the input field to be non-editable without disabling it, enabling a read-only state that blocks user typing or changes while still including the field’s value in form submissions; toggle between editable and read-only modes dynamically during runtime, ensuring the value remains part of form data unlike when the input is disabled, and manage interactive state to prevent user modifications but allow data posting in forms.
</div>

#### Parameters

##### readonly `Boolean`

If set to `true` the widget will not allow user input. If set to `false` the widget will allow user input.

#### Example - make the widget readonly

    <input id="maskedtextbox" />
    <script>
    $("#maskedtextbox").kendoMaskedTextBox();

    var maskedtextbox = $("#maskedtextbox").data("kendoMaskedTextBox");
    maskedtextbox.readonly();
    </script>

### raw

Gets the unmasked value of the MaskedTextBox.


<div class="meta-api-description">
How to get the unmasked raw input text from a Kendo UI MaskedTextBox? Retrieve or extract the unmasked raw input text from a masked input field, obtaining the pure user-entered data without any formatting, mask characters, placeholders, or literals for purposes such as validation, processing, saving, or comparison. This operation returns the clean underlying string without altering the visible masked display or interface, enabling developers to access the true input value behind any input masks, patterns, or format constraints applied during typing or initialization. Access, get, or obtain the raw unformatted input data independently from the masked representation for handling input values directly in code, form submission workflows, or data storage.
</div>

#### Returns

`String` The raw value of the widget.

#### Example - get the raw value of the MaskedTextBox

    <input id="maskedtextbox" />
    <script>
    $("#maskedtextbox").kendoMaskedTextBox({
        mask: "(000)-000",
        value: "(123)-456"
    });

    var maskedtextbox = $("#maskedtextbox").data("kendoMaskedTextBox");

    var raw = maskedtextbox.raw(); //the result value will be "123456"

	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(raw);
    </script>

### value

Gets or sets the value of the MaskedTextBox.

> **Important:** This method **does not trigger** the `focusout` event of the input.
This can affect the [floating label functionality](/api/javascript/ui/maskedtextbox/configuration/label.floating).
To overcome this behavior, manually invoke the `refresh` method of the Floating Label: `$("#maskedtextbox").data("kendoMaskedTextBox").floatingLabel.refresh();`


<div class="meta-api-description">
How do I get or set the value of a Kendo MaskedTextBox control in jQuery? Retrieve or update the current text or formatted input of a masked text input control programmatically by getting or setting its value dynamically, allowing developers to read or assign the input string after initialization without triggering focus or blur events; this method helps control the displayed masked content, supports manipulation of user-entered or prefilled data, enables synchronization with floating labels or placeholder refreshes, and can be combined with custom event handling or manual refresh calls to maintain UI consistency when programmatically changing the input’s content.
</div>

#### Parameters

##### value `String`

The value to set.

#### Returns

`String` The value of the widget.

#### Example - get the value of the MaskedTextBox

    <input id="maskedtextbox" />
    <script>
    $("#maskedtextbox").kendoMaskedTextBox({
        mask: "000000",
        value: "123456"
    });

    var maskedtextbox = $("#maskedtextbox").data("kendoMaskedTextBox");

    var value = maskedtextbox.value();

	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(value);
    </script>

#### Example - set the value of the MaskedTextBox

    <input id="maskedtextbox" />
    <script>
    $("#maskedtextbox").kendoMaskedTextBox({
        mask: "(000) 000-0000"
    });

    var maskedtextbox = $("#maskedtextbox").data("kendoMaskedTextBox");

    var value = maskedtextbox.value();

    maskedtextbox.value("555 123 1234");
    </script>

## Events

### change

Fires when the value is changed


<div class="meta-api-description">
How do I detect when a user edits a value in a Kendo UI masked input field? Detect when the text or input value is modified in a masked input field, capturing changes as users edit content, enabling event-driven responses like validation, real-time data synchronization, input monitoring, and triggering updates or follow-up processes when the value is altered.
</div>

#### Event Data

##### e.sender `kendo.ui.MaskedTextBox`

The widget instance which fired the event.

#### Example - subscribe to the "change" event during initialization

    <input id="maskedtextbox" />
    <script>
    $("#maskedtextbox").kendoMaskedTextBox({
        change: function() {
            var value = this.value();
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log(value); //value is the selected date in the maskedtextbox
        }
    });
    </script>

#### Example - subscribe to the "change" event after initialization

    <input id="maskedtextbox" />
    <script>
    $("#maskedtextbox").kendoMaskedTextBox();

    var maskedtextbox = $("#maskedtextbox").data("kendoMaskedTextBox");

    maskedtextbox.bind("change", function() {
        var value = this.value();
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(value); //value is the selected date in the maskedtextbox
    });
    </script>

