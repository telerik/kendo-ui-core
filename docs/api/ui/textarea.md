---
title: TextArea
page_title: Configuration, methods and events of the Kendo UI TextArea
description: Code examples and tips how to configure TextArea widget, use available methods and events.
res_type: api
component: textarea
---

# kendo.ui.TextArea

Represents the Kendo UI TextArea widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### enable `Boolean` *(default: true)*

If set to `false`, the widget will be disabled and will not allow user input. The widget is enabled by default and allows user input.


<div class="meta-api-description">
How do I disable keyboard input in a Kendo UI jQuery textarea? Control or configure whether a multi-line text input field is interactive, allowing users to type, edit, or prevent any keyboard input; enable or disable the text box to accept user input, pause text entry, make the component read-only or non-editable, toggle interactivity for forms, set input acceptance on or off, control user engagement with the text area, and manage whether typing, pasting, or modifying content is allowed or blocked.
</div>

#### Example - disable the widget

    <textarea id="description"></textarea>
    <script>
        $("#description").kendoTextArea({
            rows:20,
            enable: false
        })
    </script>

### fillMode `String`*(default: undefined)*

Sets a value controlling how the color is applied. When `undefined` (the default), the theme controls the default fill mode. Can also be set to the following string values:

- "solid"
- "flat"
- "outline"

> The `"none"` value is deprecated. Use custom CSS instead.


<div class="meta-api-description">
How to customize the appearance of a Kendo UI textarea's fill mode? Adjust and customize the color application and visual style of a text input area by setting modes that control fill appearance such as solid backgrounds, flat color fills, outlined borders, or transparent styles with no fill, enabling configurations for different visual emphasis, theming, UI states, or user interaction feedback on multiline text fields.
</div>

#### Example

    <textarea id="description"></textarea>
    <script>
    $("#description").kendoTextArea({
        fillMode: "flat"
    });
    </script>


### inputMode `String`*(default: "text")*

Specifies the [`inputmode` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode) of the inner `<input />` element. It is used to specify the type of on-screen keyboard that should be displayed when the user focuses the input.


<div class="meta-api-description">
How to set input mode for textarea in Kendo UI for jQuery? Control and configure the type of on-screen virtual keyboard that appears for text input areas by setting input modes such as numeric, email, telephone, search, URL, or default text to optimize user data entry experience. Enable specifying input constraints that guide mobile and touchscreen devices to show the appropriate keyboard layout when users focus on text fields, improving input accuracy and user interface responsiveness. Adjust input behavior to facilitate different content types like numbers, email addresses, phone numbers, URLs, or natural language text by defining input mode settings that influence keyboard type, input predictions, and formatting assistance dynamically. Optimize user interaction by specifying which keyboard configuration is triggered for text input areas, supporting enhanced data input workflows across various devices and contexts.
</div>

#### Example

    <textarea id="textarea"></textarea>
    <script>
    $("#textarea").kendoTextArea({
        inputMode: "numeric",
        placeholder: "Enter numbers only"
    });
    </script>


### layoutFlow `String` *(default: "vertical")*

This option is used to specify the layout flow of the component. Can also be set to the following string values: `vertical` or `horizontal`.


<div class="meta-api-description">
How to adjust layout flow in Kendo UI textarea? Adjust or configure the orientation and arrangement of content and controls within a multiline text input area by setting the flow direction to vertical or horizontal, enabling customization of how text fields, buttons, or other user interface elements are visually organized and stacked; control layout flow to switch between column-style or row-style layouts, manage component alignment, and tailor the spatial distribution of text input regions for responsive designs or specific UI patterns.
</div>

#### Example - specify layout flow

    <textarea id="description"></textarea>
    <script>
        $("#description").kendoTextArea({
            layoutFlow: "horizontal"
        })
    </script>

### label `String|Function|Object` *(default: null)*

Adds a label before the textarea. If the textarea has no `id` attribute, a generated `id` will be assigned. The `string` and the `function` parameters are setting the inner HTML of the label.


<div class="meta-api-description">
How do I dynamically change the label on a Kendo UI TextArea? Configure or set descriptive text or a caption preceding a multiline text input area, control label content dynamically through strings or functions, associate accessible labels by linking with generated or custom identifiers, customize labeling for text boxes or input areas, enable or update label text for text areas, add or modify field descriptions to enhance form clarity and usability, set captions or headers for user input fields to improve accessibility and user guidance, create or bind labels that describe textarea components for screen readers and user interfaces.
</div>

#### Example - create a label from a string

    <textarea id="description"></textarea>
    <script>
        $("#description").kendoTextArea({
            label: "Description"
        })
    </script>


The function context (available through the keyword `this`) will be set to the widget instance.

#### Example - create a label from a function

    <textarea id="description"></textarea>
    <script>
        $("#description").kendoTextArea({
                label: function() {
                    return "First name";
                }
        })
    </script>


### label.content `String|Function` *(default: "")*

Sets the inner HTML of the label.


<div class="meta-api-description">
How can I set custom HTML content for a label in a Kendo UI textarea? Configure the text or HTML markup displayed as the label for a multi-line text input area, enabling the setting or customization of label content with formatted text, inline elements, styled HTML strings, or dynamic label values. This covers scenarios where developers want to embed custom HTML within the label, control the label's inner markup, set descriptive or informative labels, or modify the label content programmatically to enhance form accessibility, styling, or user guidance.
</div>

#### Example - create a label from a string

    <textarea id="description"></textarea>
    <script>
        $("#description").kendoTextArea({
                label: {
                    content: "First name"
                }
        })
    </script>

The function context (available through the keyword `this`) will be set to the widget instance.

#### Example - create a label from a function

    <textarea id="description"></textarea>
    <script>
        $("#description").kendoTextArea({
                label: {
                    content: function() {
                        return "First name";
                    }
                }
        })
    </script>

### label.floating `Boolean` *(default: false)*

If set to `true`, the widget will be wrapped in a container that will allow the floating label functionality.

> **Important:** The [value](/api/javascript/ui/textarea/methods/value) method **does not trigger** the `focusout` event of the textarea.
This can affect the floating label functionality.
To overcome this behavior, manually invoke the `refresh` method of the Floating Label: `$("#description").data("kendoTextArea").floatingLabel.refresh();`


<div class="meta-api-description">
How can I make the label in my Kendo UI TextArea float above the field when it's focused? Control floating label behavior for multiline text inputs by enabling or disabling labels that move above the field when focused or containing text, configure dynamic label positioning, set up labels that float on user interaction or value presence, customize input field label animations that shift on focus or data entry, manage container wrapping for text areas with floating placeholders, adjust label states triggered by focus or input value changes, handle events affecting floating label updates including manual refresh control, optimize user interface clarity by floating labels that remain visible during text entry, and implement floating label patterns for improved readability and form usability in text area components.
</div>

#### Example - create a floating label

    <textarea id="description"></textarea>
    <script>
        $("#description").kendoTextArea({
                label: {
                    content: "First name",
                    floating: true
                }
        })
    </script>

### maxLength `Number` *(default: null)*

The maximum number of characters that the user can enter.


<div class="meta-api-description">
How do I limit the number of characters in a Kendo UI textarea? Set or configure the maximum allowed number of characters for user input in a multiline text field, restrict or limit text length to prevent overflow or excessive input, control input size by enforcing a client-side character cap during typing or pasting, validate and cap user input length dynamically to ensure data meets length constraints, and enable input truncation or limitation for text areas to manage content size before form submission or processing.
</div>

#### Example - specify max length

    <textarea id="description"></textarea>
    <script>
        $("#description").kendoTextArea({
            maxLength: 200
        })
    </script>

### overflow `String`*(default: "auto")*

Sets a value controlling how the overflow of the textarea is applied. Can also be set to the following string values:

- "auto"
- "hidden"
- "visible"
- "scroll"
- "clip"
- "none"


<div class="meta-api-description">
How to control scrollbar visibility in a Kendo UI textarea? Manage and customize how excess content is displayed or hidden when it goes beyond the visible area of a multi-line text input or editing field, enabling control over scrollbar visibility, content clipping, and scrolling behavior with options to enable automatic scrollbars, force scrollbars always on, hide overflow content, keep content fully visible without scrolling, clip content strictly at boundaries, or disable overflow effects entirely for tailored text area display and user interaction.
</div>

#### Example

    <textarea id="description"></textarea>
    <script>
    $("#description").kendoTextArea({
        overflow: "visible"
    });
    </script>

### placeholder `String` *(default: "")*

The hint displayed by the widget when it is empty. Not set by default.


<div class="meta-api-description">
How to set hint text for an empty Kendo UI TextArea? Set or configure the hint text, ghost text, or helper text displayed inside an empty multi-line input area to guide users before any text is entered. Control the transparent prompt shown only when the input field is blank to indicate expected content, enable customizable placeholder text, set initial hint messages for empty text areas, or define default helper text that disappears once the user starts typing. This feature supports showing contextual instructions or sample input within text boxes that accept multiple lines, improving usability by presenting subtle guidance when no value is present.
</div>

#### Example - specify placeholder

    <textarea id="description"></textarea>
    <script>
        $("#description").kendoTextArea({
                placeholder: "Enter value ..."
        })
    </script>


### prefixOptions `Object`

The configuration for the prefix adornment of the component.


<div class="meta-api-description">
How do I customize the prefix label in a Kendo UI for jQuery textarea? Set or customize a prefix label, icon, or content area displayed before a multiline text input field, controlling its visibility, styling, attributes, and dynamic or static content; configure what appears as a leading adornment or marker preceding user input, enabling tailored pre-input indicators, tags, or context prompts that enhance text area presentation and user guidance.
</div>

#### Example - specify prefix adornment template

    <textarea id="prefix"></textarea>
    <script>
        $("#prefix").kendoTextArea({
            prefixOptions: {
                template: () => `${kendo.ui.icon("search")}${kendo.ui.icon("pencil")}${kendo.ui.icon("gear")}`
            }
        });
    </script>

### prefixOptions.template `String|Function`

The [template](/api/javascript/kendo/methods/template) for the prefix adornment of the component.


<div class="meta-api-description">
How to customize the prefix content in a Kendo UI for jQuery TextArea? Customize or configure the prefix content, label, or adornment displayed before the main input area in multiline text fields, enabling you to set or control custom prefix elements, content, or markup using template strings, functions, or dynamic rendering approaches. This includes scenarios where developers want to inject custom HTML, icons, labels, or components as prefix elements in text areas, using templating methods that allow flexible prefix formatting, styling, or functional prefix customization to enhance input fields with pre-text, symbols, or interface adornments.
</div>

#### Example - specify prefix adornment template

    <textarea id="description"></textarea>
    <script>
        $("#description").kendoTextArea({
            prefixOptions: {
                template: () => `${kendo.ui.icon("search")}${kendo.ui.icon("pencil")}${kendo.ui.icon("gear")}`
            }
        })
    </script>

### prefixOptions.icon `String`

Defines the name for an existing icon in a Kendo UI theme or SVG content


<div class="meta-api-description">
How to add an icon to the start of a Kendo UI textarea? Add or configure a leading icon inside a multiline text input area by specifying either a predefined theme icon name or custom SVG markup to display a vector graphic before the entered text; enable icon prefixing in text areas, set built-in or custom icons, customize the appearance with scalable graphics, or embed inline SVG for personalized symbols preceding user input.
</div>

#### Example - specify prefix adornment icon

    <textarea id="description"></textarea>
    <script>
        $("#description").kendoTextArea({
            prefixOptions: {
                icon: "pencil"
            }
        })
    </script>

### prefixOptions.separator `Boolean` *(default: true)*

If set to `false`, the prefix adornment will not have a separator.


<div class="meta-api-description">
How do I remove the separator line in a Kendo UI textarea? Configure or toggle the presence of a visual divider or separator line between the prefix icon, label, or adornment and the main input area in a multiline text input field; enable or disable the dividing line to adjust the styling and spacing around the prefix element, allowing for cleaner or more distinct separation between the prefix content and the text input area depending on design preferences or UI requirements.
</div>

#### Example - specify prefix adornment separator

    <textarea id="description"></textarea>
    <script>
        $("#description").kendoTextArea({
            prefixOptions: {
                template: () => `${kendo.ui.icon("search")}${kendo.ui.icon("pencil")}${kendo.ui.icon("gear")}`,
                separator: false
            }
        })
    </script>

### readonly `Boolean` *(default: false)*

If set to `true`, the widget will be readonly and will not allow user input. The widget is not readonly by default and allows user input.


<div class="meta-api-description">
How do I make a Kendo UI textarea non-editable? Control whether a multiline text input is editable or locked to prevent user modifications, disable typing and text changes, set a text area to read-only mode to restrict input, configure the field so users can view but not alter content, enforce non-editable states for display-only purposes, restrict input interaction by enabling read-only, toggle or enable read protection to block text entry or editing, manage input permissions to disable user edits, set the text box to reject typing and changes while still displaying text, implement uneditable text areas for forms or content display.
</div>

#### Example - make the widget readonly

    <textarea id="description"></textarea>
    <script>
        $("#description").kendoTextArea({
                readonly: true
        })
    </script>

### resize `String`*(default: "none")*

The `auto` option can be used only with the `maxRows` configuration.

Sets a value controlling how the resize is applied. Can also be set to the following string values:

- "both"
- "horizontal"
- "vertical"
- "auto"
- "none"


<div class="meta-api-description">
How do I configure resizing in a Kendo UI textarea? Control and configure the ability to resize multi-line text input areas by enabling or restricting resizing in horizontal, vertical, both directions, automatically based on content size, or completely disabling resize functionality. Customize how text boxes expand or shrink by setting resizing behavior to fixed, dynamic growth limited by row count, or selective axis adjustments, managing user interaction with text area dimensions for flexible, responsive, or locked layouts. Adjust resizing modes such as both directions, horizontal-only, vertical-only, automatic adjustment synced with maximum rows, or no resizing to influence UI flexibility and user input experience.
</div>

#### Example

    <textarea id="description"></textarea>
    <script>
    $("#description").kendoTextArea({
        resize: "both"
    });
    </script>

### rows `Number` *(default: 1)*

The number of visible text lines for the control.


<div class="meta-api-description">
How do I adjust the number of visible lines in a Kendo UI textarea? Adjust or set the number of visible text lines in a multiline text input to control height, reduce scrolling, configure default size, specify initial visible rows, manage text area vertical space, determine how many lines appear without scrolling, control textarea line count, set visible rows for better layout, customize multiline input height, and ensure consistent text display area.
</div>

#### Example - specify widget height

    <textarea id="description"></textarea>
    <script>
        $("#description").kendoTextArea({
                rows: 10
        })
    </script>

### rounded `String` *(default: undefined)*

Sets a value controlling the border radius. When `undefined` (the default), the theme controls the default border radius. Can also be set to the following string values:

- "small"
- "medium"
- "large"
- "full"

> The `"none"` value is deprecated. Use custom CSS instead.


<div class="meta-api-description">
How do I style the corners of a Kendo UI textarea with rounded edges? Adjust or customize the corner styling of multi-line text input areas by setting rounded edges, border-radius values, or selecting from semantic presets to create smooth, pill-shaped, subtle, or sharp square corners. Control the curvature of textarea corners for visual design consistency with options like small, medium, large rounding steps, full circular shapes, or no rounding, enabling flexible corner radius configuration for user interface elements. Developers can set or enable corner roundness, customize the CSS border-radius for text areas, and fine-tune the look and feel of input fields by defining precise or preset rounding choices to match design requirements.
</div>

#### Example

    <textarea id="description"></textarea>
    <script>
    $("#description").kendoTextArea({
        rounded: "large"
    });
    </script>

### suffixOptions `Object`

The configuration for the suffix adornment of the component.


<div class="meta-api-description">
How can I customize the suffix element in a Kendo UI textarea? Configure and customize a trailing element appended to a multiline text input, enabling control over its content such as icons or text, appearance including styling and CSS classes, interactive behavior through event handlers, visibility toggling, and presentation details to add functional or decorative suffix components to a text area input field in web or app interfaces.
</div>

#### Example - specify suffix adornment template

    <textarea id="suffix"></textarea>
    <script>
        $("#suffix").kendoTextArea({
            suffixOptions: {
                template: () => `${kendo.ui.icon("search")}${kendo.ui.icon("pencil")}${kendo.ui.icon("gear")}`
            }
        });
    </script>

### suffixOptions.icon `String`

Defines the name for an existing icon in a Kendo UI theme or SVG content


<div class="meta-api-description">
How do I customize the icon at the end of a Kendo UI textarea? Customize or configure the icon displayed at the end of a multiline input field by specifying either a predefined icon name from a UI icon library or supplying custom inline SVG markup, enabling control over suffix icons, adornments, or symbols appended to text areas during setup or runtime adjustments for enhanced visual cues, branding, or user interface clarity.
</div>

#### Example - specify suffix adornment icon

    <textarea id="description"></textarea>
    <script>
        $("#description").kendoTextArea({
            suffixOptions: {
                icon: "search"
            }
        })
    </script>

### suffixOptions.template `String|Function`

The [template](/api/javascript/kendo/methods/template) for the suffix adornment of the component.


<div class="meta-api-description">
How to customize the suffix content in a Kendo UI textarea? Configure and customize additional content appended to a multiline text input by defining a render template that injects HTML elements, dynamic data bindings, icons, decorative text, or interactive components after the main input area. Enable suffix adornments within textarea fields by specifying templates that control the appearance and behavior of trailing content, supporting scenarios like inserting badges, buttons, validation indicators, custom markup, or supplementary information displayed alongside user input. This feature supports rendering complex suffix elements to enhance user interface elements with programmable, data-driven, or styled content appended to the textarea field.
</div>

#### Example - specify suffix adornment template

    <textarea id="description"></textarea>
    <script>
        $("#description").kendoTextArea({
            suffixOptions: {
                template: () => `${kendo.ui.icon("search")}${kendo.ui.icon("pencil")}${kendo.ui.icon("gear")}`
            }
        })
    </script>

### suffixOptions.separator `Boolean` *(default: true)*

If set to `false`, the suffix adornment will not have a separator.


<div class="meta-api-description">
How can I remove the line separating the suffix in a Kendo UI textarea? Control the presence or absence of a visual divider or separator line before the suffix in a multiline text input area, enabling configuration of whether the suffix adornment is separated by a line or appears seamlessly connected without a boundary; set, enable, disable, or customize the spacing, styling, and visual separation between the main text field and the suffix to achieve distinct or integrated suffix display, borderless suffix rendering, or tailored suffix positioning in textareas.
</div>

#### Example - specify suffix adornment separator

    <textarea id="description"></textarea>
    <script>
        $("#description").kendoTextArea({
            suffixOptions: {
                template: () => `${kendo.ui.icon("search")}${kendo.ui.icon("pencil")}${kendo.ui.icon("gear")}`,
                separator: false
            }
        })
    </script>


### value `String`*(default: "")*

The value of the widget.


<div class="meta-api-description">
How do I get/set the text content inside a Kendo UI TextArea input? Access or modify the current multiline text content inside a TextArea input by retrieving or setting the string value programmatically or capturing user-entered data, enabling synchronization of displayed text with application state, supporting dynamic updates, text input handling, content binding, and seamless interaction with forms, inputs, or data models where reading, updating, or controlling textarea content as plain text or strings is required.
</div>

#### Example - specify value of the widget

    <textarea id="description"></textarea>
    <script>
        $("#description").kendoTextArea({
                value: "Best offer in the area!"
        })
    </script>

### size `String`*(default: undefined)*

Sets a value controlling size of the component. When `undefined` (the default), the theme controls the default size. Can also be set to the following string values:

- "small"
- "medium"
- "large"

> The `"none"` value is deprecated. Use custom CSS instead.


<div class="meta-api-description">
How do I adjust the size of a Kendo UI TextArea in my jQuery application? Adjust, define, or configure the height and width dimensions of a multiline text input area using numeric values or predefined size options like small, medium, large, or none to control the visible space, scaling, and spacing of the text box. Enable resizing or preset scaling of the text input field, control its compactness or expansiveness for user interfaces, and select from standardized sizing options for consistent appearance or specify custom numeric dimensions for precise layout adjustments. Manage the component’s rendered size for form inputs, allowing fine-tuning of text area height and width to fit design requirements or user preferences.
</div>

#### Example - sets a size

    <textarea id="description"></textarea>
    <script>
    $("#description").kendoTextArea({
        size: "large",
        rounded: "large"
    });
    </script>

### maxRows `Number` *(default: null)*

The maximum number of visible rows to which the textarea can auto-resize. Used in combination with `resize: "auto"`.


<div class="meta-api-description">
How to set maximum rows for a Kendo UI jQuery textarea? Control and limit the maximum visible height or number of lines of a multiline text input area that automatically resizes based on user input, enabling developers to set constraints on how tall the text box can grow while dynamically adjusting its size as content changes, useful for managing scroll height, preventing overflow, configuring auto-expanding input fields, setting upper bounds on rows displayed, and controlling the vertical space consumed by editable text areas when auto-resize or dynamic height adjustment is enabled.
</div>

#### Example - specify maxRows

    <textarea id="description"></textarea>
    <script>
        $("#description").kendoTextArea({
            resize: "auto",
            maxRows: 5
        })
    </script>

## Methods

### destroy

Prepares the widget for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the widget element from DOM.


<div class="meta-api-description">
How do I properly destroy a Kendo UI for jQuery TextArea component instance to prevent memory leaks? Remove or clean up a text area component instance by properly releasing all associated resources, detaching event listeners, clearing data attributes, and triggering cleanup routines in nested or child UI components to prevent memory leaks and ensure safe disposal, without deleting the element from the document structure. This includes tearing down event handlers, clearing plugin data, disabling interactive bindings, and cascading destruction to embedded controls for thorough cleanup before manual DOM removal or replacement, supporting scenarios such as dynamic UI updates, manual component lifecycle management, and application shutdown procedures.
</div>

#### Example - destroy  the widget

    <textarea id="description"></textarea>
    <script>
        var textarea = $("#description").kendoTextArea().data('kendoTextArea');
        textarea.destroy();
    </script>

### enable

Enables or disables the widget.


<div class="meta-api-description">
How do I dynamically prevent users from editing a multi-line text field in Kendo UI? Activate or deactivate user input capability on a multi-line text field dynamically, allowing control over whether users can type, edit, or interact with the text area content; this function manages the editable state, toggling between read-only and interactive modes to support scenarios like form validation, conditional enabling or disabling of input fields, accessibility adjustments, or workflow-driven text entry permissions.
</div>

#### Parameters

##### enable `Boolean`

If `true`, the widget will be enabled. If `false`, the widget will be disabled.

#### Example - enable the widget

    <textarea id="description"></textarea>
    <script>
        var textarea = $("#description").kendoTextArea({
            enable: false
        }).data('kendoTextArea');
        textarea.enable(true);
    </script>

#### Example - disable the widget

    <textarea id="description"></textarea>
    <script>
        var textarea = $("#description").kendoTextArea().data('kendoTextArea');
        textarea.enable(false);
    </script>

### focus

Focuses the widget.


<div class="meta-api-description">
How can I programmatically focus on a Kendo UI textarea element? Set or trigger keyboard focus on a multiline text input area programmatically to enable typing, activate keyboard navigation, shift accessibility focus, bring cursor placement to the input field, or manage user interaction via script. This action ensures the text box receives immediate focus after initialization or dynamically during runtime, allowing input readiness, cursor control, or assistive technology support within user interfaces. Control input element focus state through method calls to simulate user tabbing, automate form navigation, or enhance accessibility workflows by moving focus to the editable text region when needed.
</div>

#### Example - focus the widget

    <textarea id="description"></textarea>
    <script>
        var textarea = $("#description").kendoTextArea().data('kendoTextArea');
        textarea.focus();
    </script>

### readonly

Toggles the readonly state of the widget. When the widget is readonly it doesn't allow user input.

> There is a difference between disabled and readonly mode. The value of a disabled widget is **not** posted as part of a `form` whereas the value of a readonly widget is posted.


<div class="meta-api-description">
How to make a Kendo UI textarea non-editable but still submit its value? Control or toggle the read-only state of a multiline text input area to prevent users from editing content while still allowing the field’s value to be included in form submissions, configure or enable a non-editable text area that disallows input but remains submittable within forms, set or switch a text field between editable and read-only modes at runtime to block user changes without disabling data posting, manage input interactivity by activating a readonly mode that differs from disabled by ensuring values are sent with the form even when editing is restricted, adjust user input permissions on text areas for scenarios needing display-only content that should still submit data to the server.
</div>

#### Parameters

##### readonly `Boolean`

If set to `true`, the widget will not allow user input. If set to `false`, the widget will allow user input.

#### Example - allow user input

    <textarea id="description"></textarea>
    <script>
        var textarea = $("#description").kendoTextArea({
            readonly:true
        }).data('kendoTextArea');

        textarea.readonly(false);
    </script>

#### Example - make the widget readonly

    <textarea id="description"></textarea>
    <script>
        var textarea = $("#description").kendoTextArea().data('kendoTextArea');

        textarea.readonly(true);
    </script>

### value

Gets or sets the value of the widget.

> **Important:** This method **does not trigger** the [change](/api/javascript/ui/textarea/events/change) event.
This can affect [MVVM value binding](/framework/mvvm/bindings/value). The model bound to the widget will not be updated.
You can overcome this behavior triggering the `change` event manually using [trigger("change")](/api/javascript/observable/methods/trigger) method.

> **Important:** This method **does not trigger** the `focusout` event of the textarea.
This can affect the [floating label functionality](/api/javascript/ui/textarea/configuration/label.floating).
To overcome this behavior, manually invoke the `refresh` method of the Floating Label: `$("#textarea").data("kendoTextArea").floatingLabel.refresh();`


<div class="meta-api-description">
How to programmatically update a textarea's value in Kendo UI for jQuery without triggering change events? Retrieve or assign the current text content within a multiline input area programmatically, controlling or updating the textual data without automatically triggering input change events, model bindings, or focus loss notifications; this direct manipulation requires manual event dispatching such as firing change events or refreshing UI elements like floating labels to ensure proper synchronization and visual updates when using frameworks or MVVM patterns, enabling precise control over user input value, data binding states, and interface behavior without automatic side effects.
</div>

#### Parameters

##### value `String`

The value to set.

#### Returns

`String` the value of the widget.

#### Example - trigger the change event after setting the value

    <textarea id="description"></textarea>
    <script>
        var textarea = $("#description").kendoTextArea().data('kendoTextArea');

        textarea.value("new value");
        textarea.trigger("change");
    </script>

#### Example - set and get the value of the widget

    <textarea id="description"></textarea>
    <script>
        var textarea = $("#description").kendoTextArea({
            value: "a very good description"
        }).data('kendoTextArea');
        var value = textarea.value();

	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(value); // Displays "a very good description"
        textarea.value("even better description");
        value = textarea.value();
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(value); // Displays "even better description"
    </script>

## Events

### change

Fired when the value of the widget is changed by the user.

The event handler function context (available through the keyword `this`) will be set to the widget instance.

> **Important:** The event is not fired when the value of the widget is changed from code.


<div class="meta-api-description">
How can I detect user changes in a Kendo UI textarea? Trigger actions when users modify textarea content through typing, pasting, selecting, or composing input, capturing only user-initiated changes and excluding programmatic updates. Enable real-time validation, autosave, dynamic UI refresh, or state synchronization by detecting value commits in multiline input fields. Handle change events tied directly to user interaction, accessing the component instance context to read or update internal properties and methods. Monitor user edits in text areas to implement custom logic on input alteration, ensuring response to actual user input rather than code-driven modifications.
</div>

#### Event Data

##### e.sender `kendo.ui.TextArea`

The widget instance which fired the event.

#### Example - subscribe to the "change" event during initialization

    <textarea id="description"></textarea>
    <script>
        $("#description").kendoTextArea({
            change: function(e){
                var value = this.value();
	/* The result can be observed in the DevTools(F12) console of the browser. */
                console.log(value);
                // Use the value of the widget
            }
        })
    </script>


#### Example - subscribe to the "change" event after initialization

    <textarea id="description"></textarea>
    <script>
        function textarea_change(e) {
            var value = this.value();
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log(value);
            // Use the value of the widget
        };

        var textarea = $("#description").kendoTextArea().data('kendoTextArea');

        textarea.bind("change", textarea_change)
    </script>
