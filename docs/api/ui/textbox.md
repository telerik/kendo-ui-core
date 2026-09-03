---
title: TextBox
page_title: Configuration, methods and events of the Kendo UI TextBox
description: Code examples and tips how to configure TextBox widget, use available methods and events.
res_type: api
component: textbox
---

# kendo.ui.TextBox

Represents the Kendo UI TextBox widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### clearButton `Boolean` *(default: false)*

If set to `true`, will render a button that can be used to clear the value.


<div class="meta-api-description">
How do I disable the clear button in a Kendo UI TextBox? Control whether an input field includes a clickable clear icon or button to quickly erase or reset the current text value, allowing users to remove entered content with a single tap or click; configure the presence of this clear control to enable, disable, show, hide, or toggle the clear action functionality in text input areas, search boxes, or form fields for improved user experience and efficient text manipulation.
</div>

#### Example - disable the widget

    <input id="textbox" />
    <script>
        $("#textbox").kendoTextBox({
            value: "John",
            clearButton: true
        });
    </script>

### enable `Boolean` *(default: true)*

If set to `false`, the widget will be disabled and will not allow user input. The widget is enabled by default and allows user input.


<div class="meta-api-description">
How do I disable user input in a Kendo UI TextBox? Control the ability to allow or block user input and interaction within a text input field by enabling or disabling the editable state, setting the control to accept or reject typing, preventing text entry when inactive or locked, toggling input responsiveness on or off for form fields, and managing whether users can focus, type, or modify content inside the text box component during runtime or initialization.
</div>

#### Example - disable the widget

    <input id="textbox" />
    <script>
        $("#textbox").kendoTextBox({
            enable: false
        });
    </script>

### fillMode `String`*(default: undefined)*

Sets a value controlling how the color is applied. When `undefined` (the default), the theme controls the default fill mode. Can also be set to the following string values:

- "solid"
- "flat"
- "outline"

> The `"none"` value is deprecated. Use custom CSS instead.


<div class="meta-api-description">
How do I configure the background color of a Kendo UI TextBox to use a solid fill? Configure how background color appears on input fields by setting fill styles such as solid backgrounds, flat shading without shadows, outlined borders highlighting the edges, or no color fill at all. Adjust whether the text input displays as fully colored blocks, simple flat color layers, border-only outlines, or transparent backgrounds, enabling customization of visual emphasis, user interface themes, or accessibility preferences in text input areas. Control the color rendering mode on text entry boxes to switch between filled backgrounds, minimal flat fills, visible outlines, or disabling color fills for flexible styling options in form inputs and UI components.
</div>

#### Example - sets the fillMode

    <input id="textbox" />
    <script>
    $("#textbox").kendoTextBox({
        fillMode: "flat"
    });
    </script>


### inputMode `String`*(default: "text")*

Specifies the [`inputmode` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode) of the inner `<input />` element. It is used to specify the type of on-screen keyboard that should be displayed when the user focuses the input.


<div class="meta-api-description">
How to configure the input mode of a Kendo UI textbox for numeric keypad entry? Control the type of virtual keyboard or input method that appears when a text input is focused by configuring input hints such as numeric keypad, telephone keypad, email keyboard, URL entry, decimal input, or text input variations. Enable, set, or customize which on-screen keyboard layout shows based on user input context, guiding devices to optimize data entry for numbers, phone numbers, emails, dates, search queries, or general text fields. Adjust input modes to improve user experience across touchscreens, mobile browsers, and accessibility tools by specifying input types through dynamic attributes or property settings that influence the native keyboard behavior and input method editors.
</div>

#### Example

    <input id="textbox" />
    <script>
    $("#textbox").kendoTextBox({
        inputMode: "numeric"
    });
    </script>

### label `String|Function|Object` *(default: null)*

Adds a label before the input. If the input has no `id` attribute, a generated `id` will be assigned. The `string` and the `function` parameters are setting the inner HTML of the label.


<div class="meta-api-description">
How to set up labels for Kendo UI TextBox inputs? Set or configure descriptive text, titles, captions, or identifiers displayed alongside input fields to clarify purpose, control labeling behavior, customize visible labels before text inputs, generate or assign associated identifiers automatically, provide static strings or dynamic content via functions for labeling, manage accessible labels to enhance form usability and clarity, adjust the text that appears linked to input boxes for user guidance, and control label content programmatically for flexible user interface descriptions and input field naming.
</div>

#### Example - create a label from a string

    <input id="textbox" />
    <script>
        $("#textbox").kendoTextBox({
            label: "First name"
        });
    </script>

The function context (available through the keyword `this`) will be set to the widget instance.

#### Example - create a label from a function

    <input id="textbox" />
    <script>
        $("#textbox").kendoTextBox({
            label: function() {
                return "First name";
            }
        });
    </script>

### label.content `String|Function` *(default: "")*

Sets the inner HTML of the label.


<div class="meta-api-description">
How do I add rich HTML content to a TextBox label in Kendo UI for jQuery? Configure or customize the label text with rich HTML content, enabling embedding of tags, formatting, or complex markup inside form field labels. Control and set the label display using HTML strings to provide styled, formatted, or interactive label content beyond plain text in input controls. Enable dynamic or static label customization by injecting HTML directly into the label element for enhanced UI presentation, accessible label formatting, or advanced label designs during component initialization or runtime updates. Adjust label inner HTML, define custom label markup, or set label content to fulfill UX requirements that go beyond simple textual labels in textbox fields.
</div>

#### Example - create a label from a string

    <input id="textbox" />
    <script>
        $("#textbox").kendoTextBox({
            label: {
                content: "First name"
            }
        });
    </script>

The function context (available through the keyword `this`) will be set to the widget instance.

#### Example - create a label from a function

    <input id="textbox" />
    <script>
        $("#textbox").kendoTextBox({
            label: {
                content: function() {
                    return "First name";
                }
            }
        });
    </script>

### label.floating `Boolean` *(default: false)*

If set to `true`, the widget will be wrapped in a container that will allow the floating label functionality.

> **Important:** The [value](/api/javascript/ui/textbox/methods/value) method **does not trigger** the `focusout` event of the input.
This can affect the floating label functionality.
To overcome this behavior, manually invoke the `refresh` method of the Floating Label: `$("#textbox").data("kendoTextBox").floatingLabel.refresh();`


<div class="meta-api-description">
How to enable floating label behavior in Kendo UI textbox? Enable or configure floating label behavior that dynamically moves the label above the input field when focused or containing text, supporting floating positioning and wrapping the input for visual clarity; control or activate floating label states programmatically, refresh or update floating label display after value changes without triggering focus events, customize floating label appearance and interaction for text input fields to improve user experience and visual feedback, manage label animations that react to input focus, blur, or programmatic value changes in text boxes, and ensure consistent floating label visibility during input events and value manipulation.
</div>

#### Example - create a floating label

    <input id="textbox" />
    <script>
        $("#textbox").kendoTextBox({
            label: {
                content: "First name",
                floating: true
            }
        });
    </script>

### placeholder `String` *(default: "")*

The hint displayed by the widget when it is empty. Not set by default.


<div class="meta-api-description">
How do I set a default placeholder text for a Kendo UI textbox? Set or configure a hint, ghost text, prompt, or example text inside an empty input field to guide users on what to enter, display placeholder text or a default message when the input box is empty, provide instructional or descriptive cues within text inputs before user input, customize the default showing text inside text fields, update or change the hint dynamically, enable soft guidance text inside input areas, control the transparent or faded text shown on empty inputs, specify placeholder content for form fields to improve user experience and clarity.
</div>

#### Example - specify placeholder

    <input id="textbox" />
    <script>
        $("#textbox").kendoTextBox({
            placeholder: "Enter value ..."
        });
    </script>

### prefixOptions `Object`

The configuration for the prefix adornment of the component.


<div class="meta-api-description">
How do I customize the prefix element in a Kendo UI for jQuery TextBox? Configure and customize a prefix element displayed before text input values, enabling you to add static text, icons, or dynamic templates as adornments. Control the appearance, content, styles, CSS classes, attributes, and interactive behaviors such as event handling and accessibility features to enhance input fields. Enable setting prefixes for labeling, indicating status, embedding icons, or adding clickable elements that precede user input for improved UI clarity and interaction in forms or text fields. Adjust prefix content and functionality to fit design and usability requirements through versatile options that manage visual and behavioral aspects of input adornments.
</div>

#### Example - specify prefix adornment template

    <input id="textbox" />
    <script>
        $("#textbox").kendoTextBox({
            prefixOptions: {
                template: () => `${kendo.ui.icon("search")}`
            }
        });
    </script>

### prefixOptions.icon `String`

Defines the name for an existing icon in a Kendo UI theme or SVG content


<div class="meta-api-description">
How to set an icon before the input field in a Kendo UI TextBox? Configure or customize the icon displayed before the input field by setting an icon through theme icon names or directly embedding inline SVG markup to control the prefix visual element in text boxes, enabling developers to specify or change the leading symbol, graphic, or graphical indicator that appears inside or adjacent to input controls for branding, usability, or visual context purposes.
</div>

#### Example - specify prefix adornment icon

    <input id="textbox" />
    <script>
        $("#textbox").kendoTextBox({
            prefixOptions: {
                icon: "search"
            }
        })
    </script>

### prefixOptions.template `String|Function`

The [template](/api/javascript/kendo/methods/template) for the prefix adornment of the component.


<div class="meta-api-description">
How to customize the prefix in Kendo UI TextBox with a dynamic template? Customize and control the visual prefix displayed inside input fields by configuring dynamic templates that render icons, HTML elements, or data-driven content before the text box input. Enable flexible prefix customization using templating syntax to insert visual adornments such as symbols, images, or bound data, allowing developers to set, modify, or replace default prefix elements with personalized or context-sensitive components in text inputs. Adjust and define prefix content appearance, inject custom markup, or bind prefix visuals to data sources to enhance user interface elements with tailored leading decorations before user-entered text.
</div>

#### Example - specify prefix adornment template

    <input id="textbox" />
    <script>
        $("#textbox").kendoTextBox({
            prefixOptions: {
                template: () => `${kendo.ui.icon("search")}`
            }
        })
    </script>

### prefixOptions.separator `Boolean` *(default: true)*

If set to `false`, the prefix adornment will not have a separator.


<div class="meta-api-description">
How do I show or hide the separator next to the prefix in a Kendo UI TextBox? Adjust the configuration to show or hide a visual divider or separator next to the prefix element in a text input field, enabling control over whether a distinct boundary or line appears between the prefix and the input area, including options to enable, disable, or remove the separator during setup or runtime, useful for customizing the appearance and layout of prefix icons, labels, or adornments in text boxes to enhance clarity, spacing, and user interface styling without showing any dividing line if undesired.
</div>

#### Example - specify prefix adornment separator

    <input id="textbox" />
    <script>
        $("#textbox").kendoTextBox({
            prefixOptions: {
                template: () => `${kendo.ui.icon("search")}`,
                separator: false
            }
        })
    </script>

### readonly `Boolean` *(default: false)*

If set to `true`, the widget will be readonly and will not allow user input. The widget is not readonly by default and allows user input.


<div class="meta-api-description">
How can I make a Kendo UI TextBox non-editable? Control whether the input field can be edited or is locked to display static text by enabling or disabling the read-only mode, preventing any user typing, input changes, or modifications while still showing the current value; useful for scenarios requiring display-only fields, disabling user interaction, setting non-editable text, and configuring input controls to be view-only or immutable within forms, UI components, or data entry interfaces.
</div>

#### Example - make the widget readonly

    <input id="textbox" />
    <script>
        $("#textbox").kendoTextBox({
            readonly: true
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
How do I make the corners of my Kendo UI TextBox input field rounded? Control the shape and corner curvature of input fields by configuring border radius settings such as small, medium, large, full, or none to customize how rounded the edges appear, enabling developers to set or adjust the input box’s corner roundness for a softer or sharper look during setup or dynamic styling, allowing flexible adjustment of corner styles in user interfaces and form elements.
</div>

#### Example

    <input id="textbox" />
    <script>
    $("#textbox").kendoTextBox({
        rounded: "large"
    });
    </script>

### suffixOptions `Object`

The configuration for the suffix adornment of the component.


<div class="meta-api-description">
How do I add a suffix to my Kendo UI TextBox for displaying units or extra information? Configure or set a suffix element, adornment, or appended content for input fields to display units, icons, labels, or extra information after the text entry area; customize the appearance, template, styling, and interactive behavior of these suffix components to enhance input clarity, user interface design, or provide contextual cues alongside user input in forms or controls.
</div>

#### Example - specify suffix adornment template

    <input id="textbox" />
    <script>
        $("#textbox").kendoTextBox({
            suffixOptions: {
                template: () => `${kendo.ui.icon("search")}`
            }
        });
    </script>

### suffixOptions.icon `String`

Defines the name for an existing icon in a Kendo UI theme or SVG content


<div class="meta-api-description">
How to customize the icon in a Kendo UI text box? Set or customize the icon displayed as a suffix in a text input field by specifying either a predefined theme icon name or providing custom raw SVG markup, enabling flexible adjustment of suffix visuals, suffix icon styling, suffix symbol configuration, or appending search, clear, dropdown, or action icons after the input content, supporting icon replacement, custom graphics, inline SVG usage, and icon selection from Kendo UI icon sets for enhanced user interface elements.
</div>

#### Example - specify suffix adornment icon

    <input id="textbox" />
    <script>
        $("#textbox").kendoTextBox({
            suffixOptions: {
                icon: "search"
            }
        })
    </script>

### suffixOptions.template `String|Function`

The [template](/api/javascript/kendo/methods/template) for the suffix adornment of the component.


<div class="meta-api-description">
How to customize the suffix content of a Kendo UI TextBox? Customize the trailing content displayed after input fields by configuring suffix templates, enabling insertion of HTML, icons, dynamic markup, or personalized elements to enhance user interfaces. Control and define the appearance, structure, and behavior of suffix adornments adjacent to text input components, allowing flexible rendering of additional visual cues, interactive icons, or contextual information directly tied to the input area. Enable modification, setting, or customization of trailing suffix content using templating approaches that support rich markup and dynamic customization for improved user experience and UI design.
</div>

#### Example - specify suffix adornment template

    <input id="textbox" />
    <script>
        $("#textbox").kendoTextBox({
            suffixOptions: {
                template: () => `${kendo.ui.icon("search")}`
            }
        })
    </script>

### suffixOptions.separator `Boolean` *(default: true)*

If set to `false`, the suffix adornment will not have a separator.


<div class="meta-api-description">
How to hide the separator line next to the suffix in a Kendo UI textbox? Control the appearance and visibility of the dividing line or separator next to a text input suffix, enabling or disabling the visual boundary between the input field and its suffix element, customize whether a line or border divider is shown alongside suffix adornments, adjust separator visibility for clear UI distinction, configure suffix decorations to include or exclude a separating element, toggle the dividing line presence adjacent to textual suffix content, manage the display of suffix separators to enhance or reduce visual separation, set the suffix border line on or off for cleaner or more distinct input styling.
</div>

#### Example - specify suffix adornment separator

    <input id="textbox" />
    <script>
        $("#textbox").kendoTextBox({
            suffixOptions: {
                template: () => `${kendo.ui.icon("search")}`,
                separator: false
            }
        })
    </script>

### value `String`*(default: "")*

The value of the widget.


<div class="meta-api-description">
How do I access the current value of a Kendo UI TextBox control? Access or modify the current content inside a text input field, enabling retrieval or assignment of user-entered or programmatically set strings, supporting scenarios such as updating input dynamically, clearing fields, validating input data, binding form values, handling user submissions, or synchronizing text content with application state or external data sources.
</div>

#### Example - specify value of the widget

    <input id="textbox" />
    <script>
        $("#textbox").kendoTextBox({
            value: "John Doe"
        });
    </script>

### size `String`*(default: undefined)*

Sets a value controlling size of the component. When `undefined` (the default), the theme controls the default size. Can also be set to the following string values:

- "small"
- "medium"
- "large"

> The `"none"` value is deprecated. Use custom CSS instead.


<div class="meta-api-description">
How do I control the size of a Kendo UI TextBox input field? Adjust or configure the input field dimensions to control spacing, visual density, and layout fitting for text input components, enabling compact, medium, large, or no sizing options to customize the appearance and usability of form controls, optimize UI spacing, modify control scale, and tailor input box size to match design requirements or responsive layouts.
</div>

#### Example - sets a size

    <input id="textbox" />
    <script>
    $("#textbox").kendoTextBox({
        size: "large",
        rounded: "large"
    });
    </script>

## Methods

### destroy

Prepares the widget for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the widget element from DOM.


<div class="meta-api-description">
How do I properly clean up and destroy a Kendo UI TextBox component? Terminate or clean up a textbox component by disabling or unregistering all event listeners, clearing stored data attributes, preventing memory leaks, deactivating or removing internal states, and recursively shutting down any nested UI elements or child components without deleting the DOM element itself; enable efficient resource management, safe teardown, and proper disposal of associated event handlers and data bindings to avoid retained references and ensure the component stops responding or consuming memory after use or before re-initialization.
</div>

#### Example - destroy  the widget

    <input id="textbox" />
    <script>
        $("#textbox").kendoTextBox();
        var textbox = $("#textbox").data("kendoTextBox");
        textbox.destroy();
    </script>

### enable

Enables or disables the widget.


<div class="meta-api-description">
How do I programmatically allow or prevent user input in a Kendo UI TextBox? Activate or deactivate user input and focus capabilities for a text input field by toggling interactive state programmatically, controlling whether the field accepts keyboard typing, mouse clicks, or other input events, managing enabled or disabled modes dynamically during runtime, setting the field’s responsiveness to user actions, turning input acceptance on or off, configuring focus behavior to allow or prevent cursor placement, and adjusting the component’s readiness for data entry or interaction based on boolean flags to enable or disable editing functionality.
</div>

#### Parameters

##### enable `Boolean`

If set to `true`, the widget will be enabled. If set to `false`, the widget will be disabled.

#### Example - enable the widget

    <input id="textbox" />
    <script>
        $("#textbox").kendoTextBox({
            enable: false
        });
        var textbox = $("#textbox").data("kendoTextBox");
        textbox.enable(true);
    </script>

#### Example - disable the widget

    <input id="textbox" />
    <script>
        $("#textbox").kendoTextBox();
        var textbox = $("#textbox").data("kendoTextBox");
        textbox.enable(false);
    </script>

### focus

Focuses the widget.


<div class="meta-api-description">
How do I programmatically focus on a Kendo UI TextBox element after rendering? Programmatically set input focus to a text input field or text box to enable immediate typing, keyboard event handling, and caret placement by activating or moving the cursor into the input element; use focus control to direct user interaction after rendering, navigation, form validation, or dynamic updates, ensuring the text box is active and ready for keyboard input, editable text insertion, or form completion, including methods to shift or set active input focus, enable editing readiness, and manage user input targeting within UI components.
</div>

#### Example - focus the widget

    <input id="textbox" />
    <script>
        $("#textbox").kendoTextBox();
        var textbox = $("#textbox").data("kendoTextBox");
        textbox.focus();
    </script>

### readonly

Toggles the readonly state of the widget. When the widget is readonly it doesn't allow user input.

> There is a difference between disabled and readonly mode. The value of a disabled widget is **not** posted as part of a `form` whereas the value of a readonly widget is posted.


<div class="meta-api-description">
How do I make a Kendo UI textbox read-only while still allowing form submission? Configure the ability to toggle input restriction on a text field by enabling or disabling the read-only mode, which prevents users from modifying the content while preserving the current value and ensuring it is still submitted with forms; control whether a text input accepts user edits or remains locked without disabling the entire input, differentiate between read-only and disabled states to manage form data inclusion, set or remove input barriers on text boxes to maintain data integrity without blocking focus or interaction, and control editing permissions programmatically to accommodate scenarios like form validation, data display, or partial user input restrictions.
</div>

#### Parameters

##### readonly `Boolean`

If set to `true`, the widget will not allow user input. If set to `false`, the widget will allow user input.

#### Example - allow user input

    <input id="textbox" />
    <script>
        $("#textbox").kendoTextBox({
            readonly: true
        });
        var textbox = $("#textbox").data("kendoTextBox");
        textbox.readonly(false);
    </script>

#### Example - make the widget readonly

    <input id="textbox" />
    <script>
        $("#textbox").kendoTextBox();
        var textbox = $("#textbox").data("kendoTextBox");
        textbox.readonly(true);
    </script>

### value

Gets or sets the value of the widget.

> **Important:** This method **does not trigger** the [change](/api/javascript/ui/textbox/events/change) event.
This can affect [MVVM value binding](/framework/mvvm/bindings/value). The model bound to the widget will not be updated.
You can overcome this behavior triggering the `change` event manually using [trigger("change")](/api/javascript/observable/methods/trigger) method.

> **Important:** This method **does not trigger** the `focusout` event of the input.
This can affect the [floating label functionality](/api/javascript/ui/textbox/configuration/label.floating).
To overcome this behavior, manually invoke the `refresh` method of the Floating Label: `$("#textbox").data("kendoTextBox").floatingLabel.refresh();`


<div class="meta-api-description">
How can I programmatically set the value of a Kendo UI for jQuery textbox? Retrieve or assign the current input content of a text field programmatically to read or update its value without user input, enabling control over the text box content directly in code. This approach fetches or sets the input string without firing standard user interaction events such as change or focusout, which means automatic data bindings or UI behaviors like floating labels might not update unless those events are manually triggered or refreshed. Developers can manipulate the input value silently to synchronize with models, automate form updates, or implement custom event handling, ensuring that updates to the input are controlled and can be supplemented with manual event dispatching or UI refresh calls to maintain data consistency and interface feedback.
</div>

#### Parameters

##### value `String`

The value to set.

#### Returns

`String` the value of the widget.

#### Example - trigger the change event after setting the value

    <input id="textbox" />
    <script>
        $("#textbox").kendoTextBox();
        var textbox = $("#textbox").data("kendoTextBox");
        textbox.value("new value");
        textbox.trigger("change");
    </script>

#### Example - set and get the value of the widget

    <input id="textbox" />
    <script>
        $("#textbox").kendoTextBox({
            value: "Oranges"
        });
        var textbox = $("#textbox").data("kendoTextBox");
        var value = textbox.value();
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(value); // Displays "Oranges"
        textbox.value("Apples");
        value = textbox.value();
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(value); // Displays "Apples"
    </script>

## Events

### change

Fired when the value of the widget is changed by the user.

The event handler function context (available through the keyword `this`) will be set to the widget instance.

> **Important:** The event is not fired when the value of the widget is changed from code.


<div class="meta-api-description">
How to detect when user types something in Kendo UI TextBox control? Detect and handle user-initiated modifications in input fields such as typing, pasting, or selection changes, while ignoring programmatic updates to capture genuine user interaction events on text inputs. Enable or listen for input value updates triggered by direct user actions, set event handlers that respond specifically to manual content changes, and access the input component context within handlers to retrieve or manipulate relevant properties and methods. Monitor live user input changes, detect when text is altered through keyboard entry or clipboard actions, and respond dynamically only to user-driven text updates rather than script-induced modifications.
</div>

#### Event Data

##### e.sender `kendo.ui.TextBox`

The widget instance which fired the event.

#### Example - subscribe to the "change" event during initialization

    <input id="textbox" />
    <script>
        $("#textbox").kendoTextBox({
            change: function(e) {
                var value = this.value();
	/* The result can be observed in the DevTools(F12) console of the browser. */
                console.log(value);
                // Use the value of the widget
            }
        });
    </script>

#### Example - subscribe to the "change" event after initialization

    <input id="textbox" />
    <script>
        function textbox_change(e) {
            var value = this.value();
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log(value);
            // Use the value of the widget
        };
        $("#textbox").kendoTextBox();
        var textbox = $("#textbox").data("kendoTextBox");
        textbox.bind("change", textbox_change);
    </script>


The change event fires only once the value of widget is changed and the widget itself is blurred out. You can add a custom events/methods by extending the existing functionality of the TextBox. How to add a `keyup` event to the TextBox is demonstrated in [this article](/knowledge-base/textbox-add-keyup-event).
