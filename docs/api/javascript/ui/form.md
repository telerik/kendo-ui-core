---
title: Form
page_title: Configuration, methods and events of Kendo UI Form
description: 'Configuration steps for the Form widget.'
res_type: api
---

# kendo.ui.Form

Represents the Kendo UI Form widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### buttonsTemplate `String|Function`

Specifies the [template](/api/javascript/kendo/methods/template) which is used for rendering the Form buttons.


<div class="meta-api-description">
Customize, configure, or control the layout, appearance, and functionality of form action buttons using custom markup, HTML templates, or JavaScript code; enable dynamic rendering and data-binding expressions to modify button labels, styles, order, and behavior; set or override default form buttons with flexible template syntax supporting string or function inputs for tailored UI actions, interactive buttons, and enhanced user interaction on forms.
</div>

#### Example

    <form id="myForm"></form>

    <script>
        $("#myForm").kendoForm({
            formData: {
                ID: 1,
                Name: "Ivan",
                Address: "Sofia"
            },
            buttonsTemplate: "<button>Submit</button>"
        });
    </script>

### clearButton `Boolean` *(default: true)*

Specifies if the clearButton should be rendered on initialization.


<div class="meta-api-description">
Enable or disable the presence of a clear or reset button visible on the form from the moment it loads, controlling whether users can quickly erase all input values with a single action as part of the initial rendering; this setting configures the form’s default behavior to show or hide a global clear option, affecting whether the form includes a reset functionality right when it first appears without dynamically toggling it later.
</div>

#### Example

    <form id="myForm"></form>

    <script>
        $("#myForm").kendoForm({
            formData: {
                ID: 1,
                Name: "Ivan",
                Address: "Sofia"
            },
            clearButton: false,
        });
    </script>

### focusFirst `Boolean` *(default: false)*

Specifies if the first editor of the form will be focused on initialization.



<div class="meta-api-description">
Control automatic keyboard focus on the initial input field or first editable element when a form loads, enabling or disabling the behavior that sets cursor focus to the top or primary editor upon form initialization, managing how the form responds by default to user interaction readiness, configuring whether the interface automatically targets the first input control for immediate typing, and setting the focus behavior on form start to streamline user data entry flow or prevent automatic focus shifting depending on use case preferences.
</div>

#### Example

    <form id="myForm"></form>

    <script>
        $("#myForm").kendoForm({
            formData: {
                Name: "Ivan",
                ZipCode: 1000
            },
            focusFirst: true
        });
    </script>

### formatLabel `Function`

Callback function that could be used to change the default format of the automatically generated labels.

> Note: this callback takes effect only if the items option or items.label property are not specified and labels are being automatically generated.


<div class="meta-api-description">
Control and customize how automatic field labels are generated and displayed in forms by specifying a callback function to format or override the default label text and style. Configure label formatting logic to dynamically change label content, adjust text presentation, or apply custom naming conventions when form fields are auto-labeled without predefined label values. Enable flexible label customization through programmable callbacks that modify, format, or transform generated labels in form setups where fields lack explicit label definitions or manual label assignment. Allows dynamic manipulation of automatically created form field headings to fit naming preferences, localization, or branding requirements without manually setting each label. Supports scenarios for developers needing to format, rewrite, or tailor default labels during form initialization when labels are inferred from field properties.
</div>

#### Example

    <form id="myForm"></form>

    <script>
        $("#myForm").kendoForm({
            formData: {
                Name: "Ivan",
                ZipCode: 1000
            },
            formatLabel: function(field) {
                return field + ":";
            }
        });
    </script>

### formData `Object`

Provides the data model of the Form.

The widget renders the form fields based on their data type, unless the `items` option is specified.


<div class="meta-api-description">
Manage, bind, and control the underlying data of a form's inputs, enabling reading and updating of values programmatically, setting initial or default values, synchronizing form state, dynamically populating fields based on data types or custom configurations, handling form model data for validation, submission, or conditional rendering, and manipulating individual or all form fields through code to customize form behavior and state management.
</div>

#### Example - render fields based on model

    <form id="myForm"></form>

    <script>
        $("#myForm").kendoForm({
            formData: {
                ID: 1,
                Name: "Ivan",
                Address: "Sofia"
            }
        });
    </script>

### items `Array`

A JavaScript array that contains the Form's items configuration.


<div class="meta-api-description">
Configure the form layout and content by specifying an array of field definitions, input controls, editor settings, labels, and grouping details to control the arrangement and rendering of form elements, inputs, controls, or nested sections; set up form structure, input fields, UI components, and layout organization through an array of item configurations to customize how forms display and organize data entry controls and groups.
</div>

#### Example

    <form id="myForm"></form>

    <script>
        $("#myForm").kendoForm({
            formData: {
                ID: 1,
                Name: "Ivan",
                Address: "Sofia"
            },
            items: [{
                field: "Name",
                label: "Name:",
                validation: { required: true }
            }, {
                field: "Address",
                label: "Address:"
            }]
        });
    </script>

### items.type `String`

Defines the type of the item. Available options: "group".


<div class="meta-api-description">
Configure, define, or specify the kind, category, or classification of an item within a form setup, including how each item is rendered or grouped. Control or customize item behavior by setting its type to organize form elements as individual fields, grouped sections, or specific container types, enabling form structure management, layout grouping, and rendering style control. Adjust item types to tailor the presentation and interaction model in dynamic forms, form builders, or component configurations, handling cases like grouped fieldsets, conditional sections, nested items, or segmented content blocks. Developers seeking to control form field grouping, customize form layouts, enable grouped input sections, or set initialization parameters for form components will find this essential for precise form item rendering and arrangement.
</div>

#### Example

    <form id="myForm"></form>

    <script>
        $("#myForm").kendoForm({
            formData: {
                ID: 1,
                FirstName: "John",
                LastName: "Doe",
                Address: "Sofia"
            },
            items: [{
                type: "group",
                label: "Personal Information",
                items:[{
                    field: "FirstName",
                    label: "First Name:",
                    validation: { required: true }
                },{
                    field: "LastName",
                    label: "Last Name:",
                    validation: { required: true }
                }]
            },{ 
                type: "group",
                label: "Shipping Address",
                items:[{
                    field: "Address",
                    label: "Address:"
                }]
            }
            ]
        });
    </script>

### items.field `String`

Maps to the model field which will be configured and sets the name of the input.


<div class="meta-api-description">
Link form inputs to model attributes by assigning specific data fields and input names, enabling synchronization between user input and model state, facilitating validation tied to exact fields, and ensuring accurate data mapping during form submission. Configure, set, or bind inputs to corresponding model properties to control data flow, validation rules, and field identification within forms, supporting scenarios like dynamic forms, model-driven input handling, and validation integration aligned with backend data models. Manage the connection between input elements and their underlying model representation to enable seamless two-way data binding, distinct input naming, and precise form data processing.
</div>

#### Example

    <form id="myForm"></form>

    <script>
        $("#myForm").kendoForm({
            formData: {
                ID: 1,
                Name: "John Doe",
                Address: "Sofia"
            },
            items: [{
                field: "Name",
                validation: { required: true }
            }, {
                field: "Address"
            }]
        });
    </script>

### items.editor `String|Function`

Defines the editor widget type. Available options are:

* DropDown widgets - "AutoComplete", "DropDownList", "ComboBox", "MultiSelect", "DropDownTree", "MultiColumnComboBox"
* DatePicker widgets - "DateInput", "DatePicker", "DateTimePicker", "TimePicker"
* Input widgets - "TextBox", "TextArea", "NumericTextBox", "MaskedTextBox", "RadioGroup", "CheckBoxGroup", "Switch", "Rating", "Slider", "ColorPicker", "ColorGradient", "ColorPalette", "FlatColorPicker", "Signature", "OTPInput", "hidden"
* Editor widget - "Editor"
* Upload widget - "Upload"


<div class="meta-api-description">
Configure and control which input or editing component is used to render form items by specifying types such as dropdown selectors, autocomplete fields, combo boxes, multiselect lists, date pickers including datetime and time inputs, various text inputs like text boxes, text areas, numeric fields, masked inputs, radio groups, checkboxes, switches, sliders, rating controls, color pickers with multiple styles, signature pads, OTP inputs, rich text editors, file uploaders, and hidden fields. Enable customization of item editors by setting or changing editor components for diverse input scenarios including single or multiple selections, date and time entry, rich text editing, numeric and masked input formats, color selection, binary toggles, rating scales, signature capture, and secure or hidden inputs, supporting a wide range of UI element configurations and user interaction patterns. Adjust and specify editor component types to match developer needs for form item interaction modes, input styles, component behavior, UI controls, and user input validation contexts across dropdown-based selectors, calendar and temporal input controls, text and numeric data entry fields, multi-option selectors, color and graphical input tools, secure input methods, and file upload mechanisms.
</div>

#### Example - define editor as string

    <form id="myForm"></form>

    <script>
        $("#myForm").kendoForm({
            formData: {
                ID: 1,
                Name: "John Doe",
                Address: 3
            },
            items: [{
                field: "Name",
                validation: { required: true }
            }, {
                field: "Address",
                editor:"DropDownList",
                editorOptions:{
                    dataTextField:"text",
                    dataValueField:"id",
                    dataSource: {
                        data: [
                            {text:"Sofia", id:1},
                            {text:"London", id:2},
                            {text:"New York", id:3}]
                    }
                }
            }]
        });
    </script>

#### Example - define editor as hidden

    <form id="myForm"></form>

    <script>
        $("#myForm").kendoForm({
            formData: {
                ID: 1,
                Name: "John Doe",
                Address: 3
            },
            items: [{
                field: "ID",
                editor: "hidden"
            }, {
                field: "Name",
                validation: { required: true }
            }, {
                field: "Address",
                editor:"DropDownList",
                editorOptions:{
                    dataTextField:"text",
                    dataValueField:"id",
                    dataSource: {
                        data: [
                            {text:"Sofia", id:1},
                            {text:"London", id:2},
                            {text:"New York", id:3}]
                    }
                }
            }]
        });
    </script>

#### Example - define editor as function

    <form id="myForm"></form>

    <script>
        $("#myForm").kendoForm({
            formData: {
                ID: 1,
                Name: "John Doe",
                Address: 3
            },
            items: [{
                field: "Name",
                validation: { required: true }
            }, {
                field: "Address",
                editor:function(container, options) {
                    $("<input name='" + options.field + "'data-bind='value: " +  options.field + "'/>")
                    .appendTo(container)
                    .kendoDropDownList({
                        dataTextField:"text",
                        dataValueField:"id",
                        dataSource: {
                            data: [
                                {text:"Sofia", id:1},
                                {text:"London", id:2},
                                {text:"New York", id:3}]
                        }
                    })
                }
            }]
        });
    </script>

### items.editorOptions `Object`

Defines the widget configuration for the specified `items.editor`.


<div class="meta-api-description">
Set or customize the input widget or editor used for individual form fields by specifying configuration options such as widget type, constructor parameters, event callbacks, data bindings, visual styling, and interactive behaviors, enabling control over the editing experience, UI appearance, validation hooks, custom event handling, and dynamic updates for form controls during initialization or runtime.
</div>

#### Example

    <form id="myForm"></form>

    <script>
        $("#myForm").kendoForm({
            formData: {
                ID: 1,
                Name: "John Doe",
                Address: 3
            },
            items: [{
                field: "Name",
                validation: { required: true }
            }, {
                field: "Address",
                editor:"DropDownList",
                editorOptions:{
                    dataTextField:"text",
                    dataValueField:"id",
                    dataSource: {
                        data: [
                            {text:"Sofia", id:1},
                            {text:"London", id:2},
                            {text:"New York", id:3}]
                    }
                }
            }]
        });
    </script>

### items.validation `Object`

Specified the validation rules for the field.


<div class="meta-api-description">
Set, configure, or customize field-level validation rules, constraints, and input checks within form items to control data accuracy, enforce required formats, enable conditional validations, apply custom error criteria, handle input validation logic, and ensure that user entries meet specified validation parameters or business rules during form initialization or dynamic updates.
</div>

#### Example - use built-in validation rules

    <form id="myForm"></form>

    <script>
      $("#myForm").kendoForm({
        formData: {
          Name: "John Doe",
          Email:"john.doe@email.com"
        },
        validateable:{
            validateOnBlur:true
        },
        items: [{
          field: "Name",
          validation: { 
            required: true,
            pattern:"[a-z A-Z]+"
          },
          hint:"Only lower and upper case letters are allowed"
        }, {
          field: "Email",
          validation: { 
            required: true,
            email:true
          }
        }]
      });
    </script>

#### Example - customize the built-in validation messages

    <form id="myForm"></form>

    <script>
      $("#myForm").kendoForm({
        formData: {
          Name: "John Doe",
          Email:"john.doe@email.com"
        },
        validateable:{
            validateOnBlur:true
        },
        items: [{
            field: "Name",
            validation: { 
                required: {
                    message: "The field is required" },
                pattern: {
                    value:"[a-z A-Z]+", 
                    message:"Invalid input"}
                },
            hint:"Only lower and upper case letters are allowed"
        }, {
          field: "Email",
          validation: { 
            required: true,
            email:true
          }
        }]
      });
    </script>

#### Example - set custom validation rule

    <form id="myForm"></form>

    <script>
      $("#myForm").kendoForm({
        formData: {
          Name: "John Doe",
          Comment:""
        },
        validateable:{
            validateOnBlur:true
        },
        items: [{
          field: "Name",
        },{
          field: "Comment",
          validation: { 
            validateCommentlength:function(input){
              if (input.is("[name='Comment']") && input.val() != "") {
                input.attr("data-validatecommentlength-msg", "Comment must be less than 150 characters");
                return input.val().length < 150;
              }

              return true;
            }
          }
        }]
      });
    </script>

### items.label `String|Object`

Defines the field label.


<div class="meta-api-description">
Configure, set, or customize the text displayed as a label or caption beside form fields, inputs, checkboxes, and other form elements to provide clear, descriptive identifiers or prompts for users within forms, enabling control over the visible naming or titles that help users understand each field’s purpose or data to enter during form rendering and initialization.
</div>

#### Example

    <form id="myForm"></form>

    <script>
        $("#myForm").kendoForm({
            formData: {
                ID: 1,
                Name: "John Doe",
                Address: "Sofia"
            },
            items: [{
                field: "Name",
                label: "Full Name:",
                validation: { required: true }
            }, {
                field: "Address",
                label: "Shipping Address:"
            }]
        });
    </script>

### items.label.text `String`

Defines the text of the label.


<div class="meta-api-description">
Control, customize, or update the displayed caption, title, or field label text for a form input's visible label, enabling configuration or dynamic setting of the text shown alongside form fields, input descriptors, or user prompts in forms and user interfaces.
</div>

#### Example

    <form id="myForm"></form>

    <script>
        $("#myForm").kendoForm({
            formData: {
                ID: 1,
                Name: "John Doe",
                Address: "Sofia"
            },
            items: [{
                field: "Name",
                label: {
                  text: "Full Name:"
                },
                validation: { required: true }
            }, {
                field: "Address",
                label: {
                  text: "Shipping Address:"
                }
            }]
        });
    </script>

### items.label.optional `Boolean`

Specifies if the field is optional by rendering additional text next to the label.


<div class="meta-api-description">
Configure form fields to display or hide optional indicators next to labels, enabling control over marking inputs as optional or required within user interfaces, labels, or form items. This setting lets developers show supplementary text or markers alongside form field labels to signify optional inputs, customize optional field labeling, toggle visibility of optional captions, and manage user guidance for form completion by indicating which fields do not require mandatory input. It supports scenarios involving form validation cues, user experience preferences for optional fields, and labeling customization to clearly differentiate optional from required form entries during form setup or dynamic rendering.
</div>

#### Example

    <form id="myForm"></form>

    <script>
        $("#myForm").kendoForm({
            formData: {
                ID: 1,
                Name: "John Doe",
                Address: "Sofia",
                Birth: new Date()
            },
            items: [{
                field: "Name",
                label: {
                  text: "Full Name:"
                },
                validation: { required: true }
            }, {
                field: "Address",
                label: {
                  text: "Shipping Address:"
                }
            },{
                field: "Birth",
                label: {
                  text: "Date of birth:",
                  optional: true
                }
            }]
        });
    </script>

### items.label.encoded `Boolean` *(default: true)*

Specifies if the label text will HTML-encoded before it is displayed. If set to `false` the label text will be displayed as is.


<div class="meta-api-description">
Configure whether form field labels are rendered as plain text with HTML encoding or displayed as raw HTML containing markup, controlling if label content outputs encoded characters or preserves HTML tags, enabling developers to toggle between safe text rendering and rich label formatting with embedded HTML elements, customizing label presentation by enabling or disabling HTML encoding to support secure display or complex styled labels within forms.
</div>

#### Example

    <form id="myForm"></form>

    <script>
        $("#myForm").kendoForm({
            formData: {
                ID: 1,
                Name: "John Doe",
                Address: "Sofia",
              	Birth: new Date(),
            },
            items: [{
                field: "Name",
                label: {
                  text: "Full Name:"
                },
                validation: { required: true }
            }, {
                field: "Address",
                label: {
                  text: "Shipping Address:"
                }
            },{
                field: "Birth",
                label: {
                  text: "<b>Date of birth:<b>",
                  optional: true,
                  encoded: false
                }
            }]
        });
    </script>

### items.id `String`

Defines the field id.


<div class="meta-api-description">
Set or configure the unique identifier for a form input element to enable precise targeting in code, markup, or styles such as linking labels, applying CSS rules, running automated tests, focusing or manipulating fields programmatically, referencing inputs in JavaScript or frameworks, customizing element selection, and ensuring accessible relationships between labels and inputs with consistent field IDs.
</div>

#### Example

    <form id="myForm"></form>

    <script>
        $("#myForm").kendoForm({
            formData: {
                Name: "John Doe",
                Address: "Sofia"
            },
            items: [{
                id: "Name_customId",
                field: "Name"
            }, {
                id: "Address_customId",
                field: "Address"
            }]
        });
    </script>

### items.title `String`

Defines the field title.


<div class="meta-api-description">
Control the text label or visible title displayed for individual form fields, enabling customization of field names, captions, or headings that appear next to input boxes, dropdowns, or controls within forms. Configure or set descriptive, accessible field labels to improve user interface clarity, readability, and screen reader support. Adjust or define the form item’s displayed title, field name, or label text for user guidance, form layout organization, and enhanced accessibility compliance.
</div>

#### Example

    <form id="myForm"></form>

    <script>
        $("#myForm").kendoForm({
            formData: {
                Name: "John Doe",
                Address: "Sofia"
            },
            items: [{
                title: "Full Name",
                field: "Name"
            }, {
                title: "Shipping Address",
                field: "Address"
            }]
        });
    </script>

### items.hint `String`

Defines the hint text that will be shown underneath the form editor.


<div class="meta-api-description">
Set or configure short helper text, tooltips, or brief inline guidance that appears below form fields or input editors to offer users concise instructions, examples, contextual tips, or supplementary information for completing or understanding each form item, aiding validation, clarifying expected input, and enhancing user experience with clear, succinct prompts tied directly to individual fields.
</div>

#### Example

    <form id="myForm"></form>

    <script>
        $("#myForm").kendoForm({
            formData: {
                Name: "John Doe",
                Address: "Sofia"
            },
            items: [{
                field: "Name",
                hint: "Enter Full Name"
            }, {
                field: "Address",
                hint: "Enter Address with ZIP Code"
            }]
        });
    </script>

### items.colSpan `Number|Array`

Defines the field size when grid layout is used. A fixed number defines the colspan for the form field. An array is used to map the colSpan to responsive breakpoints.


<div class="meta-api-description">
Set or customize the horizontal width of form fields within grid layouts by specifying how many columns a field should span, enabling control over layout density and alignment. Configure fixed or dynamic column spans to adjust field widths, apply responsive designs by mapping column spans across various screen sizes or breakpoints, manage how form elements stretch or condense within grid structures, and optimize form layouts for desktop and mobile views by controlling column occupancy and field placement. This supports precise layout adjustments, adaptive form resizing, and flexible grid-based alignment for form input components.
</div>

#### Example

 <form id="myForm"></form>

    <script>
      $("#myForm").kendoForm({
        formData: {
            ID: 1,
            FirstName: "John",
            LastName: "Doe",
            Address: "London",
            Postcode: "SW1A 1AA"
        },
        layout:"grid",
        grid: {
            cols: 2,
            gutter: 20
        },
        items: [{
            type: "group",
            label: "Personal Information",
            layout: "grid",
            grid: {
                cols: 6,
                gutter: 10
            },
            items:[{
                field: "FirstName",
                label: "First Name:",
                validation: { required: true },
                colSpan: [{
                    maxWidth: 600,
                    value: 2
                },
                {
                    minWidth: 601,
                    maxWidth: 1000,
                    value: 4
                }]
            },{
                field: "LastName",
                label: "Last Name:",
                validation: { required: true },
                colSpan: 4
            }]
        },{ 
            type: "group",
            label: "Shipping Address",
            layout: "grid",
            colSpan: 2,
            grid: {
                cols: 4,
                gutter: 10
            },
            items:[{
                field: "Address",
                label: "Address:",
                colSpan: 2,
            },{
                field: "Postcode",
                label: "Postcode:",
                colSpan: 2
            }]
        }]
      });
    </script>

### items.colSpan.maxWidth `Number`

Defines the maximum width in pixels for which the specific breakpoint colSpan value will be applied.


<div class="meta-api-description">
Set or configure the maximum pixel width threshold to control when a column span adjustment activates based on screen size or container width, enabling responsive layout changes that apply specific column spans only up to a defined maximum width limit, useful for managing form item widths, breakpoints, and grid responsiveness across different device sizes or screen resolutions.
</div>

#### Example

 <form id="myForm"></form>

    <script>
      $("#myForm").kendoForm({
        formData: {
            ID: 1,
            FirstName: "John",
            LastName: "Doe",
            Address: "London",
            Postcode: "SW1A 1AA"
        },
        layout:"grid",
        grid: {
            cols: 2,
            gutter: 20
        },
        items: [{
            type: "group",
            label: "Personal Information",
            layout: "grid",
            grid: {
                cols: 6,
                gutter: 10
            },
            items:[{
                field: "FirstName",
                label: "First Name:",
                validation: { required: true },
                colSpan: [{
                    maxWidth: 600,
                    value: 2
                },
                {
                    minWidth: 601,
                    maxWidth: 1000,
                    value: 4
                }]
            },{
                field: "LastName",
                label: "Last Name:",
                validation: { required: true },
                colSpan: 4
            }]
        },{ 
            type: "group",
            label: "Shipping Address",
            layout: "grid",
            colSpan: 2,
            grid: {
                cols: 4,
                gutter: 10
            },
            items:[{
                field: "Address",
                label: "Address:",
                colSpan: 2,
            },{
                field: "Postcode",
                label: "Postcode:",
                colSpan: 2
            }]
        }]
      });
    </script>

### items.colSpan.minWidth `Number`

Defines the minimum width in pixels for which the specific breakpoint colSpan value will be applied.


<div class="meta-api-description">
Set or adjust the minimum pixel width threshold to control when a form’s column span changes responsively based on screen size, enabling precise management of column layout and breakpoints during window resizing. Configure the smallest viewport width that triggers a specific column span value, helping to customize responsive design, optimize form fields’ horizontal distribution, and maintain layout consistency across devices. This feature supports defining pixel-based breakpoints for dynamic column adjustments, allowing developers to enable or disable column spanning behavior at certain widths to ensure optimal usability and appearance.
</div>

#### Example

 <form id="myForm"></form>

    <script>
      $("#myForm").kendoForm({
        formData: {
            ID: 1,
            FirstName: "John",
            LastName: "Doe",
            Address: "London",
            Postcode: "SW1A 1AA"
        },
        layout:"grid",
        grid: {
            cols: 2,
            gutter: 20
        },
        items: [{
            type: "group",
            label: "Personal Information",
            layout: "grid",
            colSpan: 2,
            grid: {
                cols: 6,
                gutter: 10
            },
            items:[{
                field: "FirstName",
                label: "First Name:",
                validation: { required: true },
                colSpan: 2
            },{
                field: "LastName",
                label: "Last Name:",
                validation: { required: true },
                colSpan: 4
            }]
        },{ 
            type: "group",
            label: "Shipping Address",
            layout: "grid",
            colSpan: 2,
            grid: {
                cols: 4,
                gutter: 10
            },
            items:[{
                field: "Address",
                label: "Address:",
                colSpan: 2,
            },{
                field: "Postcode",
                label: "Postcode:",
                colSpan: 2
            }]
        }]
      });
    </script>

### items.colSpan.value `Number`

Defines the colSpan value that will be applied when the width of the form meets the breakpoint criteria.


<div class="meta-api-description">
Adjust or configure the number of grid columns a form element spans based on screen size or responsive breakpoints, enabling control over the width and positioning of form items, labels, and controls as the layout adapts to window resizing or device changes. This setting helps manage responsive form layouts by specifying how many columns an item occupies at different viewport widths, supporting dynamic adjustment of element spans, flexible column spans, and layout rearrangement to optimize form appearance and usability across various screen sizes and breakpoint conditions.
</div>

#### Example

 <form id="myForm"></form>

    <script>
      $("#myForm").kendoForm({
        formData: {
            ID: 1,
            FirstName: "John",
            LastName: "Doe",
            Address: "London",
            Postcode: "SW1A 1AA"
        },
        layout:"grid",
        grid: {
            cols: 2,
            gutter: 20
        },
        items: [{
            type: "group",
            label: "Personal Information",
            layout: "grid",
            colSpan: 2,
            grid: {
                cols: 6,
                gutter: 10
            },
            items:[{
                field: "FirstName",
                label: "First Name:",
                validation: { required: true },
                colSpan: 2
            },{
                field: "LastName",
                label: "Last Name:",
                validation: { required: true },
                colSpan: 4
            }]
        },{ 
            type: "group",
            label: "Shipping Address",
            layout: "grid",
            colSpan: 2,
            grid: {
                cols: 4,
                gutter: 10
            },
            items:[{
                field: "Address",
                label: "Address:",
                colSpan: 2,
            },{
                field: "Postcode",
                label: "Postcode:",
                colSpan: 2
            }]
        }]
      });
    </script>

### items.attributes `Object`

Defines the attributes that are applied to the input element.


<div class="meta-api-description">
Add or configure custom HTML attributes such as id, class, data attributes, aria labels, and other metadata directly on form input elements to control styling, accessibility, data binding, and element identification. Enable setting, overriding, or managing attributes to enhance form inputs with semantic roles, custom dataset properties, accessibility hooks, unique identifiers, or styling hooks for CSS and JavaScript interactions. This feature supports precise control over rendered input tags, helping developers to customize element behavior, improve screen reader roles, track data layers, or apply CSS classes for layout and interactivity.
</div>

#### Example

    <form id="myForm"></form>

    <script>
        $("#myForm").kendoForm({
            formData: {
                Name: "John Doe",
                Address: "Sofia"
            },
            items: [{
                field: "Name",
                hint: "Enter Full Name",
                attributes:{
                    class: "myClass"
                }
            }, {
                field: "Address",
                hint: "Enter Address with ZIP Code"
            }]
        });
    </script>

    <style>
      .myClass{
        color:red;
      }
    </style>
 
### items.layout `String` *(default: '')*

Specify the layout of the item when `items.type` is set to "group". Valid options:

* `grid`: This is equivalent to `display: grid`. It defines the form item as a grid container and establishes a new grid formatting context for its contents.


<div class="meta-api-description">
Control and configure the arrangement, positioning, and layout style of nested form controls or child elements within a grouped section, enabling you to set how form items are visually structured inside container groups using grid-based layouts or alternative organization methods. Adjust grid layouts, configure child item placement, manage container display styles, enable grid formatting contexts, and organize grouped form components flexibly to achieve responsive design, alignment control, or complex multi-element arrangements within grouped form sections.
</div>

#### Example

    <form id="myForm"></form>

    <script>
        $(document).ready(function () {            
            $("#myForm").kendoForm({
                formData: {
                    FirstName: "John",
                    LastName: "Doe",
                    Email: "john.doe@email.com"
                },
                layout: "grid",
                grid: {
                    cols: 2,
                    gutter: 20
                },
                items: [
                    {
                        type: "group",
                        label: "Personal Information",
                        layout: "grid",
                        grid: { cols: 1, gutter: 10},
                        items: [
                            { 
                                field: "FirstName", 
                                label: "First Name:", 
                                validation: { required: true } 
                            },
                            { 
                                field: "LastName", 
                                label: "Last Name:", 
                                validation: { required: true } 
                            },
                            { 
                                field: "Email", 
                                label: "Email", 
                                validation: { 
                                    required: true, 
                                    email: true 
                                }
                            }
                        ]
                    },                  
                ],               
            });
        });
    </script>

### items.grid `Object`

[Grid layout](/api/javascript/ui/form/configuration/grid) settings of the form item.


<div class="meta-api-description">
Set and customize grid-based layouts for form elements by defining column and row sizes, controlling how many columns or rows an item spans, adjusting responsive breakpoints for different screen sizes, enabling flexible arrangement and positioning within forms, managing item alignment and distribution across grid cells, and configuring dynamic resizing or rearranging of form controls using grid properties.
</div>

#### Example

    <form id="myForm"></form>

    <script>
        $(document).ready(function () {            
            $("#myForm").kendoForm({
                formData: {
                    FirstName: "John",
                    LastName: "Doe",
                    Email: "john.doe@email.com"
                },
                layout: "grid",
                grid: {
                    cols: 2,
                    gutter: 20
                },
                items: [
                    {
                        type: "group",
                        label: "Personal Information",
                        layout: "grid",
                        grid: { cols: 1, gutter: 10},
                        items: [
                            { 
                                field: "FirstName", 
                                label: "First Name:", 
                                validation: { required: true } 
                            },
                            { 
                                field: "LastName", 
                                label: "Last Name:", 
                                validation: { required: true } 
                            },
                            { 
                                field: "Email", 
                                label: "Email", 
                                validation: { 
                                    required: true, 
                                    email: true 
                                }
                            }
                        ]
                    },                  
                ],               
            });
        });
    </script>

### items.grid.cols `Number|Array`

Defines the columns of the grid.


<div class="meta-api-description">
Configure the number and layout of columns within an embedded grid inside a form item by setting column definitions that determine how fields display, including column count, width sizing, header labels, templates for content rendering, and data binding options. Control the grid column structure by specifying arrays of column settings to customize the appearance and behavior of each grid field in the form item, enabling fine-tuned arrangement and presentation of data columns during initialization, adjustment, or dynamic updates. Adjust, set, or define columns to manage grid layout, header text, field templates, binding configurations, and responsive widths within form item grids for tailored data grids inside form components.
</div>

#### Example - setting columns to number
    <form id="myForm"></form>

    <script>
        $(document).ready(function () {            
            $("#myForm").kendoForm({
                formData: {
                    FirstName: "John",
                    LastName: "Doe",
                    Email: "john.doe@email.com"
                },
                layout: "grid",
                items: [
                    {
                        type: "group",
                        label: "Personal Information",
                        layout: "grid",
                        grid: { cols: 1, gutter: 10},
                        items: [
                            { 
                                field: "FirstName", 
                                label: "First Name:", 
                                validation: { required: true } 
                            },
                            { 
                                field: "LastName", 
                                label: "Last Name:", 
                                validation: { required: true } 
                            },
                            { 
                                field: "Email", 
                                label: "Email", 
                                validation: { 
                                    required: true, 
                                    email: true 
                                }
                            }
                        ]
                    },                  
                ],               
            });
        });
    </script>


### items.grid.cols.maxWidth `Number`

Defines the maximum width in pixels for which the specific breakpoint col value for the columns applies.


<div class="meta-api-description">
Control the responsive layout of form columns by setting the maximum viewport width in pixels to define when a grid column breakpoint stops applying, enabling precise adjustment of column count or arrangement based on screen size limits, configuring when to switch column numbers for adaptive designs, managing form grid responsiveness by specifying the upper width boundary for column behavior, customizing how many columns appear up to a certain viewport width to optimize form layout on various devices, adjusting or limiting the breakpoint range for column changes in form grids, setting thresholds for responsive column layouts to control form appearance across different screen widths, defining the maximum screen width for applying specific column configurations in responsive forms.
</div>

#### Example - setting columns to an array
    <form id="myForm"></form>

    <script>
        $(document).ready(function () {            
            $("#myForm").kendoForm({
                formData: {
                    FirstName: "John",
                    LastName: "Doe",
                    Email: "john.doe@email.com"
                },
                layout: "grid",
                items: [
                    {
                        type: "group",
                        label: "Personal Information",
                        layout: "grid",
                        grid: { 
                            cols: [{
                                maxWidth: 600,
                                value: 2
                            },
                            {
                                minWidth: 601,
                                maxWidth: 800,
                                value: 3
                            },
                            {
                                minWidth: 801,
                                maxWidth: 2800,
                                value: 4
                            }], 
                            gutter: 10
                        },
                        items: [
                            { 
                                field: "FirstName", 
                                label: "First Name:", 
                                validation: { required: true } 
                            },
                            { 
                                field: "LastName", 
                                label: "Last Name:", 
                                validation: { required: true } 
                            },
                            { 
                                field: "Email", 
                                label: "Email", 
                                validation: { 
                                    required: true, 
                                    email: true 
                                }
                            }
                        ]
                    },                  
                ],               
            });
        });
    </script>

### items.grid.cols.minWidth `Number`

Defines the minimum width in pixels for which the specific breakpoint col value for the columns applies.


<div class="meta-api-description">
Configure responsive column layouts by specifying the minimum pixel width that triggers changes in the number of columns within a form grid. Control how and when grid columns adjust to different screen sizes, set breakpoints based on minimum widths to enable or disable specific column counts, manage column responsiveness through pixel thresholds, and define layout shifts as the viewport resizes. Adjust column behavior to optimize form presentation across devices by setting minimum widths that determine when column configurations apply.
</div>

#### Example - setting columns to an array
    <form id="myForm"></form>

    <script>
        $(document).ready(function () {            
            $("#myForm").kendoForm({
                formData: {
                    FirstName: "John",
                    LastName: "Doe",
                    Email: "john.doe@email.com"
                },
                layout: "grid",
                items: [
                    {
                        type: "group",
                        label: "Personal Information",
                        layout: "grid",
                        grid: { 
                            cols: [{
                                maxWidth: 600,
                                value: 2
                            },
                            {
                                minWidth: 601,
                                maxWidth: 800,
                                value: 3
                            },
                            {
                                minWidth: 801,
                                maxWidth: 2800,
                                value: 4
                            }], 
                            gutter: 10
                        },
                        items: [
                            { 
                                field: "FirstName", 
                                label: "First Name:", 
                                validation: { required: true } 
                            },
                            { 
                                field: "LastName", 
                                label: "Last Name:", 
                                validation: { required: true } 
                            },
                            { 
                                field: "Email", 
                                label: "Email", 
                                validation: { 
                                    required: true, 
                                    email: true 
                                }
                            }
                        ]
                    },                  
                ],               
            });
        });
    </script>

### items.grid.cols.value `Number`

Defines the number of columns to be applied if current width of the form is between the maxWidth and minWidth values


<div class="meta-api-description">
Control and configure the number of grid columns used in a responsive form layout based on the form’s current width between specified minimum and maximum breakpoints. Adjust the column count dynamically as the form resizes to enable flexible multi-column layouts, set or change the grid columns for different screen widths, define responsive column behavior for intermediate widths, and control how many columns appear at runtime for adaptable form designs. This setting enables developers to specify integer values for columns, manage responsive grid configurations, and customize form layouts across varying viewport sizes for optimal appearance and usability.
</div>

#### Example - setting columns to an array
    <form id="myForm"></form>

    <script>
        $(document).ready(function () {            
            $("#myForm").kendoForm({
                formData: {
                    FirstName: "John",
                    LastName: "Doe",
                    Email: "john.doe@email.com"
                },
                layout: "grid",
                items: [
                    {
                        type: "group",
                        label: "Personal Information",
                        layout: "grid",
                        grid: { 
                            cols: [{
                                maxWidth: 600,
                                value: 2
                            },
                            {
                                minWidth: 601,
                                maxWidth: 800,
                                value: 3
                            },
                            {
                                minWidth: 801,
                                maxWidth: 2800,
                                value: 4
                            }], 
                            gutter: 10
                        },
                        items: [
                            { 
                                field: "FirstName", 
                                label: "First Name:", 
                                validation: { required: true } 
                            },
                            { 
                                field: "LastName", 
                                label: "Last Name:", 
                                validation: { required: true } 
                            },
                            { 
                                field: "Email", 
                                label: "Email", 
                                validation: { 
                                    required: true, 
                                    email: true 
                                }
                            }
                        ]
                    },                  
                ],               
            });
        });
    </script>

### items.grid.gutter `Number|String|Object`

Defines the width of the gutters between the columns / rows.


<div class="meta-api-description">
Control and customize the spacing between form fields by setting horizontal and vertical gaps in the grid layout, adjusting the width of gutters between columns and rows to manage separation, padding, or margin inside form arrangements, enabling precise alignment and visual spacing for form elements, configuring inter-field spaces to improve layout clarity and responsiveness, tuning column and row spacing to optimize form appearance and usability, setting gap size for consistent spacing in multi-column or multi-row form designs, modifying grid margin widths for better form organization and readability.
</div>

#### Example

    <form id="myForm"></form>
    <script>
    $(document).ready(function () {
        $("#myForm").kendoForm({
            formData: {
                FirstName: "John",
                LastName: "Doe",
                Email: "john.doe@email.com"
            },
            items: [{
                type: "group",
                label: "Personal Information",
                layout: "grid",
                grid: {
                    cols: 2,
                    gutter: 20
                },
                items: [{
                    field: "FirstName",
                    label: "First Name:",
                    validation: { required: true }
                }, {
                    field: "LastName", 
                    label: "Last Name:",
                    validation: { required: true }
                }, {
                    field: "Email",
                    label: "Email:",
                    validation: { required: true, email: true }
                }]
            }]
        });
    });
    </script>

### items.grid.gutter.rows `String|Number|Array`

Defines the width of the gutters between the rows.


<div class="meta-api-description">
Configure vertical spacing, row gaps, or the distance between rows in grid-based form layouts by adjusting the row gutters or the space separating each row track. Control the vertical grid gap, set padding or margin between stacked form rows, customize the height of the space dividing individual rows, and manage row separation to optimize form field arrangement and visual structure. Adjust row spacing to enable consistent, even distribution of form elements along vertical axes within grid systems or layouts.
</div>

#### Example - setting the gutter rows value
     <form id="myForm"></form>

    <script>
        $(document).ready(function () {            
            $("#myForm").kendoForm({
                formData: {
                    FirstName: "John",
                    LastName: "Doe",
                    Email: "john.doe@email.com"
                },
                layout: "grid",
                items: [
                    {
                        type: "group",
                        label: "Personal Information",
                        layout: "grid",
                        grid: { 
                            gutter: {
                                rows: [{
                                    maxWidth: 600,
                                    value: 2
                                },
                                {
                                    minWidth: 601,
                                    maxWidth: 800,
                                    value: 4
                                },
                                {
                                    minWidth: 801,
                                    maxWidth: 2800,
                                    value: 6
                                }],
                                cols: 3
                            }
                        },
                        items: [
                            { 
                                field: "FirstName", 
                                label: "First Name:", 
                                validation: { required: true } 
                            },
                            { 
                                field: "LastName", 
                                label: "Last Name:", 
                                validation: { required: true } 
                            },
                            { 
                                field: "Email", 
                                label: "Email", 
                                validation: { 
                                    required: true, 
                                    email: true 
                                }
                            }
                        ]
                    },                  
                ],               
            });
        });
    </script>


### items.grid.gutter.rows.maxWidth `Number`

Defines the maximum width in pixels for the specific breakpoint gutter row value.


<div class="meta-api-description">
Set and configure the maximum pixel width for row gutters in responsive grid layouts to control and limit space between rows at different screen sizes, enabling precise adjustment of row spacing, managing grid gutter expansion on large or wide viewports, customizing horizontal gaps within form or UI grid rows, and controlling how row gutters adapt or scale across breakpoints for consistent spacing in flexible, responsive designs.
</div>

#### Example - setting the gutter rows value
    <form id="myForm"></form>

    <script>
        $(document).ready(function () {            
            $("#myForm").kendoForm({
                formData: {
                    FirstName: "John",
                    LastName: "Doe",
                    Email: "john.doe@email.com"
                },
                layout: "grid",
                items: [
                    {
                        type: "group",
                        label: "Personal Information",
                        layout: "grid",
                        grid: { 
                            gutter: {
                                rows: [{
                                    maxWidth: 600,
                                    value: 2
                                },
                                {
                                    minWidth: 601,
                                    maxWidth: 800,
                                    value: 4
                                },
                                {
                                    minWidth: 801,
                                    maxWidth: 2800,
                                    value: 6
                                }],
                                cols: 3
                            }
                        },
                        items: [
                            { 
                                field: "FirstName", 
                                label: "First Name:", 
                                validation: { required: true } 
                            },
                            { 
                                field: "LastName", 
                                label: "Last Name:", 
                                validation: { required: true } 
                            },
                            { 
                                field: "Email", 
                                label: "Email", 
                                validation: { 
                                    required: true, 
                                    email: true 
                                }
                            }
                        ]
                    },                  
                ],               
            });
        });
    </script>

### items.grid.gutter.rows.minWidth `Number`

Defines the minimum width in pixels for the specific breakpoint gutter row value.


<div class="meta-api-description">
Control the minimum pixel width needed to trigger responsive row spacing between form items, enabling dynamic adjustment of vertical gutters based on viewport or breakpoint widths. Configure or set the smallest screen width at which row gutters apply to optimize layout spacing in grid-based forms. Enable adaptive vertical spacing that activates only when the screen or container is at or above a defined minimum width, allowing precise control over form item vertical gaps across different device sizes. Adjust, customize, or define threshold widths for gutter rows to manage responsive visual separation and maintain balanced form layouts on various screen sizes and breakpoints.
</div>

#### Example - setting the gutter rows value
    <form id="myForm"></form>

    <script>
        $(document).ready(function () {            
            $("#myForm").kendoForm({
                formData: {
                    FirstName: "John",
                    LastName: "Doe",
                    Email: "john.doe@email.com"
                },
                layout: "grid",
                items: [
                    {
                        type: "group",
                        label: "Personal Information",
                        layout: "grid",
                        grid: { 
                            gutter: {
                                rows: [{
                                    maxWidth: 600,
                                    value: 2
                                },
                                {
                                    minWidth: 601,
                                    maxWidth: 800,
                                    value: 4
                                },
                                {
                                    minWidth: 801,
                                    maxWidth: 2800,
                                    value: 6
                                }],
                                cols: 3
                            }
                        },
                        items: [
                            { 
                                field: "FirstName", 
                                label: "First Name:", 
                                validation: { required: true } 
                            },
                            { 
                                field: "LastName", 
                                label: "Last Name:", 
                                validation: { required: true } 
                            },
                            { 
                                field: "Email", 
                                label: "Email", 
                                validation: { 
                                    required: true, 
                                    email: true 
                                }
                            }
                        ]
                    },                  
                ],               
            });
        });
    </script>

### items.grid.gutter.rows.value `Number`

Defines the row gap value for the specific breakpoint.


<div class="meta-api-description">
Adjust and control vertical spacing between grid rows for specific screen sizes or responsive breakpoints within form layouts, setting row gaps, row spacing, or vertical gutters to fine-tune layout appearance on different devices. Manage and customize responsive grid row gaps to achieve consistent or adaptive vertical padding, margin, or space between rows, enabling precise arrangement and alignment in grid-based forms across various viewport widths. Configure vertical row gaps or spacing values to optimize grid layouts responsively, ensuring clarity, readability, and balanced form elements on mobile, tablet, or desktop breakpoints.
</div>

#### Example - setting the gutter rows value
<form id="myForm"></form>

    <script>
        $(document).ready(function () {            
            $("#myForm").kendoForm({
                formData: {
                    FirstName: "John",
                    LastName: "Doe",
                    Email: "john.doe@email.com"
                },
                layout: "grid",
                items: [
                    {
                        type: "group",
                        label: "Personal Information",
                        layout: "grid",
                        grid: { 
                            gutter: {
                                rows: [{
                                    maxWidth: 600,
                                    value: 2
                                },
                                {
                                    minWidth: 601,
                                    maxWidth: 800,
                                    value: 4
                                },
                                {
                                    minWidth: 801,
                                    maxWidth: 2800,
                                    value: 6
                                }],
                                cols: 3
                            }
                        },
                        items: [
                            { 
                                field: "FirstName", 
                                label: "First Name:", 
                                validation: { required: true } 
                            },
                            { 
                                field: "LastName", 
                                label: "Last Name:", 
                                validation: { required: true } 
                            },
                            { 
                                field: "Email", 
                                label: "Email", 
                                validation: { 
                                    required: true, 
                                    email: true 
                                }
                            }
                        ]
                    },                  
                ],               
            });
        });
    </script>

### items.grid.gutter.cols `String|Number|Array`

Defines the width of the gutters between the columns.


<div class="meta-api-description">
Control and configure the horizontal spacing between columns in grid layouts by setting column gutter width, adjusting inter-column gaps, margins, or spacing to manage the distance between elements in forms or grid-based designs. Enable customization of grid column spacing, grid gap size, or horizontal padding between columns for precise layout alignment and responsive grid organization. Adjust and fine-tune the separation between vertical columns to optimize form appearance, control whitespace distribution in grids, and create visually balanced layouts with customizable column gaps.
</div>

#### Example - setting the gutter cols value
    <form id="myForm"></form>

    <script>
        $(document).ready(function () {            
            $("#myForm").kendoForm({
                formData: {
                    FirstName: "John",
                    LastName: "Doe",
                    Email: "john.doe@email.com"
                },
                layout: "grid",
                items: [
                    {
                        type: "group",
                        label: "Personal Information",
                        layout: "grid",
                        grid: { 
                            gutter: {
                                cols: [{
                                    maxWidth: 600,
                                    value: 2
                                },
                                {
                                    minWidth: 601,
                                    maxWidth: 800,
                                    value: 4
                                },
                                {
                                    minWidth: 801,
                                    maxWidth: 2800,
                                    value: 6
                                }],
                                rows: 3
                            }
                        },
                        items: [
                            { 
                                field: "FirstName", 
                                label: "First Name:", 
                                validation: { required: true } 
                            },
                            { 
                                field: "LastName", 
                                label: "Last Name:", 
                                validation: { required: true } 
                            },
                            { 
                                field: "Email", 
                                label: "Email", 
                                validation: { 
                                    required: true, 
                                    email: true 
                                }
                            }
                        ]
                    },                  
                ],               
            });
        });
    </script>

### items.grid.gutter.cols.maxWidth `Number`

Defines the maximum width in pixels for the specific breakpoint gutter col value.


<div class="meta-api-description">
Control and set the maximum pixel width for responsive grid columns within form layouts to limit how wide individual columns can stretch at various breakpoints, enabling precise capping of gutter column sizes in adaptive, flexible, and responsive grid designs. Adjust, configure, or restrict column maximum widths to manage layout consistency, prevent overly wide gutters, and fine-tune the responsive behavior of form item grids across different screen sizes and viewport widths. This setting helps maintain uniform grid structures, supports responsive design best practices, and ensures columns do not exceed specified maximum pixel widths during dynamic resizing or breakpoint changes.
</div>

#### Example - setting the gutter cols value
        <form id="myForm"></form>

    <script>
        $(document).ready(function () {            
            $("#myForm").kendoForm({
                formData: {
                    FirstName: "John",
                    LastName: "Doe",
                    Email: "john.doe@email.com"
                },
                layout: "grid",
                items: [
                    {
                        type: "group",
                        label: "Personal Information",
                        layout: "grid",
                        grid: { 
                            gutter: {
                                cols: [{
                                    maxWidth: 600,
                                    value: 2
                                },
                                {
                                    minWidth: 601,
                                    maxWidth: 800,
                                    value: 4
                                },
                                {
                                    minWidth: 801,
                                    maxWidth: 2800,
                                    value: 6
                                }],
                                rows: 3
                            }
                        },
                        items: [
                            { 
                                field: "FirstName", 
                                label: "First Name:", 
                                validation: { required: true } 
                            },
                            { 
                                field: "LastName", 
                                label: "Last Name:", 
                                validation: { required: true } 
                            },
                            { 
                                field: "Email", 
                                label: "Email", 
                                validation: { 
                                    required: true, 
                                    email: true 
                                }
                            }
                        ]
                    },                  
                ],               
            });
        });
    </script>

### items.grid.gutter.cols.minWidth `Number`

Defines the minimum width in pixels for the specific breakpoint gutter col value.


<div class="meta-api-description">
Set or adjust the minimum width in pixels for grid gutter columns within responsive forms to control how narrow columns can become at different breakpoints, preventing layout elements from shrinking too small; configure column spacing, layout constraints, responsive behavior, and gutter sizes to ensure consistent spacing and appearance across screen sizes while managing grid columns and their minimum dimensions effectively.
</div>

#### Example - setting the gutter cols value
        <form id="myForm"></form>

    <script>
        $(document).ready(function () {            
            $("#myForm").kendoForm({
                formData: {
                    FirstName: "John",
                    LastName: "Doe",
                    Email: "john.doe@email.com"
                },
                layout: "grid",
                items: [
                    {
                        type: "group",
                        label: "Personal Information",
                        layout: "grid",
                        grid: { 
                            gutter: {
                                cols: [{
                                    maxWidth: 600,
                                    value: 2
                                },
                                {
                                    minWidth: 601,
                                    maxWidth: 800,
                                    value: 4
                                },
                                {
                                    minWidth: 801,
                                    maxWidth: 2800,
                                    value: 6
                                }],
                                rows: 3
                            }
                        },
                        items: [
                            { 
                                field: "FirstName", 
                                label: "First Name:", 
                                validation: { required: true } 
                            },
                            { 
                                field: "LastName", 
                                label: "Last Name:", 
                                validation: { required: true } 
                            },
                            { 
                                field: "Email", 
                                label: "Email", 
                                validation: { 
                                    required: true, 
                                    email: true 
                                }
                            }
                        ]
                    },                  
                ],               
            });
        });
    </script>

### items.grid.gutter.cols.value `Number`

Defines the col gap value for the specific breakpoint.


<div class="meta-api-description">
Configure and control the horizontal spacing between grid columns in responsive layouts by setting the column gap value for different breakpoints, adjusting the horizontal gutter width between columns in forms or grid items, customizing the responsive column spacing to create consistent gaps across screen sizes, enabling developers to define and fine-tune the horizontal gap between grid columns for various device widths, setting the amount of horizontal space between columns in a grid system for forms, managing the responsive horizontal column gap to optimize layout and alignment, specifying and modifying how wide the horizontal gap is between column elements at different breakpoints, adjusting the horizontal distance between columns dynamically based on screen size, controlling column spacing for grid items in responsive designs, and tailoring the horizontal gutter size for columns to improve form layout clarity and visual separation.
</div>

#### Example - setting the gutter rows value
        <form id="myForm"></form>

    <script>
        $(document).ready(function () {            
            $("#myForm").kendoForm({
                formData: {
                    FirstName: "John",
                    LastName: "Doe",
                    Email: "john.doe@email.com"
                },
                layout: "grid",
                items: [
                    {
                        type: "group",
                        label: "Personal Information",
                        layout: "grid",
                        grid: { 
                            gutter: {
                                cols: [{
                                    maxWidth: 600,
                                    value: 2
                                },
                                {
                                    minWidth: 601,
                                    maxWidth: 800,
                                    value: 4
                                },
                                {
                                    minWidth: 801,
                                    maxWidth: 2800,
                                    value: 6
                                }],
                                rows: 3
                            }
                        },
                        items: [
                            { 
                                field: "FirstName", 
                                label: "First Name:", 
                                validation: { required: true } 
                            },
                            { 
                                field: "LastName", 
                                label: "Last Name:", 
                                validation: { required: true } 
                            },
                            { 
                                field: "Email", 
                                label: "Email", 
                                validation: { 
                                    required: true, 
                                    email: true 
                                }
                            }
                        ]
                    },                  
                ],               
            });
        });
    </script>

### orientation `String`

Configures the Form orientation. Available options are `"horizontal"` and `"vertical"`.

By default, the Form is rendered with vertical orientation.


<div class="meta-api-description">
Adjust the layout direction of form fields and labels by setting the display order horizontally or vertically, enabling customization of form structure to suit UI alignment preferences, switch between side-by-side horizontal arrangements or stacked vertical columns, configure form field and label positioning, control form alignment for readability or design flow, toggle field placement orientation, set forms to present inputs in rows or columns, manage layout orientation for forms to enhance user interaction and visual organization, specify whether form elements appear horizontally inline or vertically stacked.
</div>

#### Example - set horizontal orientation

    <form id="myForm"></form>

    <script>
        $("#myForm").kendoForm({
            orientation: "horizontal",
            formData: {
                ID: 1,
                Name: "Ivan",
                Address: "Sofia"
            },
            items: [{
                field: "Name",
                label: "Name:"
            }, {
                field: "Address",
                label: "Address:"
            }]
        });
    </script>

### messages `Object`

Configures text messages displayed in the Form. Use it to customize or localize the Form messages.


<div class="meta-api-description">
Customize and localize form text elements including validation messages, hints, labels, error notifications, feedback prompts, and instructional content by configuring text strings, language translations, user-facing messages, form field descriptions, and contextual help information to adapt forms for different locales, improve user experience, control displayed text content, set multilingual support, and tailor validation feedback dynamically across various form components.
</div>

#### Example - customize form submit and clear buttons messages

    <form id="myForm"></form>

    <script>
        $("#myForm").kendoForm({
            orientation: "horizontal",
            formData: {
                ID: 1,
                Name: "Ivan"
            },
            items: [{
                field: "Name",
                label: "Name:"
            }],
            messages: {
                submit: "Custom Submit Button Text",
                clear: "Custom Clear Button Text"
            }
        });
    </script>

### messages.submit `String` *(default: "Submit")*

The text message displayed for the Form submit button.


<div class="meta-api-description">
Configure or customize the text label displayed on form submit buttons, modify button captions or titles for submission actions, control submit button wording, set or update the call-to-action text on forms, change or localize the button text that triggers form submission, adjust or define what users see on submit controls, specify the exact phrasing or message shown on submit buttons, enable different submit button labels for forms in various contexts or languages.
</div>

#### Example - set the submit button message

    <form id="myForm"></form>

    <script>
        $("#myForm").kendoForm({
            orientation: "horizontal",
            formData: {
                ID: 1,
                Name: "Ivan"
            },
            items: [{
                field: "Name",
                label: "Name:"
            }],
            messages: {
                submit: "Custom Submit Button Text"
            }
        });
    </script>

### messages.clear `String` *(default: "Clear")*

The text message displayed for the Form clear button.


<div class="meta-api-description">
Customize or configure the text label, caption, or message shown on the form clear button, reset control, or input clearing element to display localized, translated, or user-defined phrases for clearing form fields, resetting input values, or erasing entered data in forms and user interfaces. Adjust the clear/reset button wording, prompt, or text to match specific language, locale, branding, or contextual requirements in forms across applications.
</div>

#### Example - set the clear button message

    <form id="myForm"></form>

    <script>
        $("#myForm").kendoForm({
            orientation: "horizontal",
            formData: {
                ID: 1,
                Name: "Ivan"
            },
            items: [{
                field: "Name",
                label: "Name:"
            }],
            messages: {
                clear: "Custom Clear Button Text"
            }
        });
    </script>

### messages.optional `String` *(default: "(Optional)")*

The text message displayed next to a field label when the [items.label.optional](items.label.optional) option is set to `true`.


<div class="meta-api-description">
Control or customize the text displayed alongside form field labels indicating optional inputs or non-mandatory fields, enabling configuration of optional field indicators, setting custom optional messages, modifying label suffixes for optional entries, adjusting prompts that inform users about non-required form elements, and tailoring UI hints for optional inputs in form designs or user input validation.
</div>

#### Example - set the clear button message

    <form id="myForm"></form>

    <script>
        $("#myForm").kendoForm({
            orientation: "horizontal",
            formData: {
                ID: 1,
                Name: "Ivan"
            },
            items: [{
                field: "Name",
                label: {
                    text: "Name:",
                    optional: true
                }
            }],
            messages: {
                optional: "(Optional field)"
            }
        });
    </script>

### validatable `Object`

Configures the built-in Validator options.


<div class="meta-api-description">
Control and configure client-side form validation by enabling validation features that manage rules, error messages, custom validation logic, error message positioning, timing of validation triggers, and overall validator settings to ensure form inputs are checked before submission. Adjust validation behavior, enforce data correctness, customize how and when form fields are validated, and tailor feedback display with options that govern validation lifecycle, user input checks, and error handling mechanisms within interactive forms.
</div>

#### Example

    <form id="myForm"></form>

    <script>
        $("#myForm").kendoForm({
            validatable: {
                validateOnBlur: true,
                validationSummary: true,
                errorTemplate: "<span>#=message#</span>"
            },
            formData: {
                ID: 1,
                Name: "Ivan",
                Address: "Sofia"
            },
            items: [{
                field: "Name",
                label: "Name:",
                validation: { required: true }
            }, {
                field: "Address",
                label: "Address:",
                validation: { required: true }
            }]
        });
    </script>

### validatable.validateOnBlur `Boolean` *(default: true)*

Configures the Form Validator [validateOnBlur](/api/javascript/ui/validator/configuration/validateonblur) option.


<div class="meta-api-description">
Enable or disable automatic input validation triggered when a form field loses focus, controlling whether validation runs on blur events such as onBlur or focusout. Configure immediate client-side checks to occur as soon as a user exits a field to show validation feedback, or delay validation until other events. Set validation behavior to validate on field blur, enabling real-time error detection, or disable it to prevent validation until form submission or manual triggers. Adjust validation timing for form inputs based on focus changes, controlling when and how validation logic executes during user interaction.
</div>

#### Example - set validateOnBlur

    <form id="myForm"></form>

    <script>
        $("#myForm").kendoForm({
            validatable: {
                validateOnBlur: false,
            },
            formData: {
                ID: 1,
                Name: "Ivan",
                Address: "Sofia"
            },
            items: [{
                field: "Name",
                label: "Name:",
                validation: { required: true }
            }, {
                field: "Address",
                label: "Address:",
                validation: { required: true }
            }]
        });
    </script>

### validatable.validationSummary `Boolean|Object` *(default: false)*

Configures the Form Validator [validationSummary](/api/javascript/ui/validator/configuration/validationsummary) option.


<div class="meta-api-description">
Control and customize the display of aggregated validation error messages within forms by enabling or disabling a centralized error summary, configuring its position and appearance, and managing how all validation feedback is presented collectively to improve user error visibility and form usability, including options to show a concise list of form validation issues, integrate a unified error overview, and adjust the summary’s rendering and placement options.
</div>

#### Example - set validationSummary to false

    <form id="myForm"></form>

    <script>
        $("#myForm").kendoForm({
            validatable: {
                validationSummary: false
            },
            formData: {
                ID: 1,
                Name: "Ivan",
                Address: "Sofia"
            },
            items: [{
                field: "Name",
                label: "Name:",
                validation: { required: true }
            }, {
                field: "Address",
                label: "Address:",
                validation: { required: true }
            }]
        });
    </script>

#### Example - render validation summary in custom container

    <form id="myForm"></form>
    <div id="summary"></div>

    <script>
        $("#myForm").kendoForm({
            validatable: {
                validationSummary: {
                    container: "#summary"
                }
            },
            formData: {
                ID: 1,
                Name: "Ivan",
                Address: "Sofia"
            },
            items: [{
                field: "Name",
                label: "Name:",
                validation: { required: true }
            }, {
                field: "Address",
                label: "Address:",
                validation: { required: true }
            }]
        });
    </script>

### validatable.errorTemplate `String|Function`

Configures the Form Validator [errorTemplate](/api/javascript/ui/validator/configuration/errortemplate) option.


<div class="meta-api-description">
Control and customize form validation feedback by defining how error messages are displayed using HTML strings, templates, or rendering functions to tailor the structure, styling, and CSS classes of validation errors, enabling developers to set, configure, or override validation message presentation, appearance, markup, and layout for enhanced user input error handling and visual consistency in forms.
</div>

#### Example - change validation message

    <form id="myForm"></form>

    <script>
        $("#myForm").kendoForm({
            validatable: {
                errorTemplate: "<span>#=message#</span>"
            },
            formData: {
                ID: 1,
                Name: "Ivan",
                Address: "Sofia"
            },
            items: [{
                field: "Name",
                label: "Name:",
                validation: { required: true }
            }, {
                field: "Address",
                label: "Address:",
                validation: { required: true }
            }]
        });
    </script>

### layout `String` *(default: '')*

Specify the layout of Form content. Valid options are:

* `grid`: This is equivalent to `display: grid`. It defines the form element as a grid container and establishes a new grid formatting context for its contents.

> Note: Grid layout is supported only on modern browsers. Even so, not all browsers that support grid layout support all features.


<div class="meta-api-description">
Configure how form fields and input controls are arranged and displayed by setting the form’s content structure, including grid-based layouts that enable complex field alignment using CSS grid principles, allowing developers to organize input elements in rows and columns for responsive and structured user interfaces. This includes options to align, control spacing, and manage the visual hierarchy of form components in modern browsers supporting grid layouts, helping implement flexible, organized forms with precise control over field positioning, layout style, and container behavior for enhanced UI design and usability.
</div>

#### Example

    <form id="myForm"></form>
    <script>
    $(document).ready(function () {
        $("#myForm").kendoForm({
            formData: {
                FirstName: "John",
                LastName: "Doe",
                Email: "john.doe@email.com",
                Age: 25
            },
            layout: "grid",
            grid: {
                cols: 2,
                gutter: 16
            },
            items: [{
                field: "FirstName",
                label: "First Name:",
                validation: { required: true }
            }, {
                field: "LastName",
                label: "Last Name:", 
                validation: { required: true }
            }, {
                field: "Email",
                label: "Email:",
                validation: { required: true, email: true }
            }, {
                field: "Age",
                label: "Age:",
                validation: { required: true }
            }]
        });
    });
    </script>

### grid `Object`

Grid layout settings.


<div class="meta-api-description">
Set up and control the layout and alignment of input fields and labels in a form using customizable grid configurations. Enable defining the number of columns and rows, adjusting spacing, and managing responsive design for dynamic arrangement of form elements. Configure grid-based structuring for precise placement, alignment, and flexible resizing of form controls. Optimize form layout by controlling grid templates, gaps, and responsiveness to ensure organized field distribution across different screen sizes and device contexts. Manage form element positioning and responsive grid layouts to enhance visual grouping, spacing consistency, and user interface structure.
</div>

#### Example

    <form id="myForm"></form>
    <script>
    $(document).ready(function () {
        $("#myForm").kendoForm({
            formData: {
                FirstName: "John",
                LastName: "Doe",
                Email: "john.doe@email.com",
                Phone: "123-456-7890",
                Address: "123 Main St"
            },
            layout: "grid",
            grid: {
                cols: [1, 2],
                gutter: {
                    cols: 20,
                    rows: 10
                }
            },
            items: [{
                field: "FirstName",
                label: "First Name:",
                validation: { required: true }
            }, {
                field: "LastName",
                label: "Last Name:",
                validation: { required: true }
            }, {
                field: "Email", 
                label: "Email:",
                validation: { required: true, email: true }
            }, {
                field: "Phone",
                label: "Phone:"
            }, {
                field: "Address",
                label: "Address:"
            }]
        });
    });
    </script>

### grid.cols `Number|Array`

A number defines the columns of the grid. When an array is used it is used to map the columns to the provided responsive breakpoints.


<div class="meta-api-description">
Adjust or configure the number of columns in a grid-based form layout by specifying a fixed column count or an array that assigns different column numbers across responsive breakpoints, enabling control over form structure on various screen sizes, allowing developers to set, define, customize, and manage column layouts during initialization for adaptive, flexible, and responsive form designs with precise column distribution based on device width or viewport.
</div>

#### Example - setting columns to number
    <form id="myForm"></form>

    <script>
        $("#myForm").kendoForm({
            formData: {
                ID: 1,
                Name: "Ivan",
                Address: "Sofia"
            },
            layout: "grid",
            grid: {
                cols: 2,
                gutter: 10,
                rows: 1
            },
            items: [{
                field: "Name",
                label: "Name:"
            }, {
                field: "Address",
                label: "Address:"
            }]
        });
    </script>

#### Example - setting columns to an array
    <form id="myForm"></form>

    <script>
        $("#myForm").kendoForm({
            formData: {
                ID: 1,
                Name: "Ivan",
                Address: "Sofia"
            },
            layout: "grid",
            grid: {
                cols: [{
                    maxWidth: 600,
                    value: 2
                },
                {
                    minWidth: 601,
                    maxWidth: 800,
                    value: 3
                },
                {
                    minWidth: 801,
                    maxWidth: 2800,
                    value: 4
                }],
                gutter: 10,
                rows: 1
            },
            items: [{
                field: "Name",
                label: "Name:"
            }, {
                field: "Address",
                label: "Address:"
            }]
        });
    </script>

### grid.cols.maxWidth `Number`

Defines the maximum width in pixels for which the specific breakpoint col value for the columns applies.


<div class="meta-api-description">
Set and adjust the maximum pixel width threshold that determines when a responsive column layout applies, enabling control over column configurations based on viewport size or screen width. Configure the upper limit for specific column counts at various breakpoints, defining when column arrangements switch as the display size changes, managing responsiveness and layout behavior for forms or grid-based components across different devices. Enable precise control over column width boundaries to ensure layout adapts smoothly by setting maximum widths where column numbers change, supporting dynamic resizing, responsive design, and custom breakpoint handling.
</div>

#### Example - setting columns to an array
    <form id="myForm"></form>

    <script>
        $("#myForm").kendoForm({
            formData: {
                ID: 1,
                Name: "Ivan",
                Address: "Sofia"
            },
            layout: "grid",
            grid: {
                cols: [{
                    maxWidth: 600,
                    value: 2
                },
                {
                    minWidth: 601,
                    maxWidth: 800,
                    value: 3
                },
                {
                    minWidth: 801,
                    maxWidth: 2800,
                    value: 4
                }],
                gutter: 10,
                rows: 1
            },
            items: [{
                field: "Name",
                label: "Name:"
            }, {
                field: "Address",
                label: "Address:"
            }]
        });
    </script>

### grid.cols.minWidth `Number`

Defines the minimum width in pixels for which the specific breakpoint col value for the columns applies.


<div class="meta-api-description">
Configure adaptive column layouts by defining minimum pixel widths for responsive breakpoints that determine when the form’s grid changes the number of columns; control how and when the column count adjusts according to viewport or screen size by setting flexible minimum widths to enable dynamic, mobile-friendly, or desktop-optimized multi-column arrangements that respond seamlessly to resizing, screen-width thresholds, or device-specific display requirements.
</div>

#### Example - setting columns to an array
    <form id="myForm"></form>

    <script>
        $("#myForm").kendoForm({
            formData: {
                ID: 1,
                Name: "Ivan",
                Address: "Sofia"
            },
            layout: "grid",
            grid: {
                cols: [{
                    maxWidth: 600,
                    value: 2
                },
                {
                    minWidth: 601,
                    maxWidth: 800,
                    value: 3
                },
                {
                    minWidth: 801,
                    maxWidth: 2800,
                    value: 4
                }],
                gutter: 10,
                rows: 1
            },
            items: [{
                field: "Name",
                label: "Name:"
            }, {
                field: "Address",
                label: "Address:"
            }]
        });
    </script>

### grid.cols.value `Number`

Defines the number of columns to be applied if current width of the form is between the maxWidth and minWidth values


<div class="meta-api-description">
Adjust or configure the number of layout columns responsive to the form’s current width, controlling how many columns appear when the form size is within specific minimum and maximum width breakpoints. Enable dynamic grid column settings, set responsive column counts for form layouts, manage column distribution based on form resizing, and customize column numbers to adapt to different screen widths. This controls the grid structure used for form presentation during width ranges, allowing flexible multi-column layouts or single-column modes depending on the available form width.
</div>

#### Example - setting columns to an array
    <form id="myForm"></form>

    <script>
        $("#myForm").kendoForm({
            formData: {
                ID: 1,
                Name: "Ivan",
                Address: "Sofia"
            },
            layout: "grid",
            grid: {
                cols: [{
                    maxWidth: 600,
                    value: 2
                },
                {
                    minWidth: 601,
                    maxWidth: 800,
                    value: 3
                },
                {
                    minWidth: 801,
                    maxWidth: 2800,
                    value: 4
                }],
                gutter: 10,
                rows: 1
            },
            items: [{
                field: "Name",
                label: "Name:"
            }, {
                field: "Address",
                label: "Address:"
            }]
        });
    </script>


### grid.gutter `Number|String|Object`

Defines the width of the gutters between the columns / rows.


<div class="meta-api-description">
Adjust and customize the spacing between form fields by setting horizontal and vertical gaps within the grid layout, control padding or margins between columns and rows, configure the distance or separation of elements in the form grid, manage the size of gaps or gutters for responsive layouts, set or modify inter-field space to optimize form appearance, enable control over grid cell spacing for better alignment and visual clarity, tune the horizontal and vertical intervals between form inputs, set up layout padding or spacing parameters to ensure consistent field distribution, control the width or size of separation areas to avoid overcrowding or excessive whitespace, and refine the spacing metrics that impact overall form structure and readability.
</div>

#### Example

    <form id="myForm"></form>
    <script>
    $(document).ready(function () {
        $("#myForm").kendoForm({
            formData: {
                FirstName: "John",
                LastName: "Doe", 
                Email: "john.doe@email.com",
                Phone: "123-456-7890"
            },
            layout: "grid",
            grid: {
                cols: 2,
                gutter: {
                    cols: 20,
                    rows: 15
                }
            },
            items: [{
                field: "FirstName",
                label: "First Name:",
                validation: { required: true }
            }, {
                field: "LastName",
                label: "Last Name:",
                validation: { required: true }
            }, {
                field: "Email",
                label: "Email:",
                validation: { required: true, email: true }
            }, {
                field: "Phone",
                label: "Phone:"
            }]
        });
    });
    </script>

### grid.gutter.rows `String|Number|Array`

Defines the width of the gutters between the rows. When an array is used, it is mapped to set the gutter between the rows for the provided responsive breakpoints.


<div class="meta-api-description">
Adjust vertical spacing or row gaps in forms by setting row gutter size, control distance between form rows, customize vertical margins or padding between rows, configure responsive row spacing for different screen sizes, enable dynamic vertical gaps in grid layouts, define per-breakpoint vertical gutters, set spacing consistency in form rows, manage row separation within grid structure, control vertical layout spacing in forms, optimize vertical whitespace between form elements.
</div>

#### Example - setting the gutter rows value
    <form id="myForm"></form>

    <script>
        $("#myForm").kendoForm({
            formData: {
                ID: 1,
                Name: "Ivan",
                Address: "Sofia"
            },
            grid: {
                cols: 2,
                gutter: {
                    rows: 1,
                    cols: 2
                },
                rows: 1
            },
            items: [{
                field: "Name",
                label: "Name:"
            }, {
                field: "Address",
                label: "Address:"
            }]
        });
    </script>

### grid.gutter.rows.maxWidth `Number`

Defines the maximum width in pixels for the specific breakpoint gutter row value.


<div class="meta-api-description">
Control and configure the maximum pixel width for row gutters in responsive grid layouts to set limits on horizontal spacing between form rows, adjust gutter size dynamically at different breakpoints, prevent excessive spacing in form row gaps, customize spacing boundaries for rows in grid-based forms, enable fine-tuning of horizontal padding or margins between rows, set upper limits on gutter widths for better responsiveness, manage row spacing constraints on form grids, and ensure consistent and controlled spacing around rows across various screen sizes.
</div>

#### Example - setting the gutter rows value
    <form id="myForm"></form>

    <script>
        $("#myForm").kendoForm({
            formData: {
                ID: 1,
                Name: "Ivan",
                Address: "Sofia"
            },
            grid: {
                cols: 2,
                gutter: {
                    rows: [{
                        maxWidth: 600,
                        value: 5
                    },
                    {
                        minWidth: 601,
                        maxWidth: 800,
                        value: 10
                    },
                    {
                        minWidth: 801,
                        maxWidth: 2800,
                        value: 15
                    }],
                    cols: 2
                },
                rows: 1
            },
            items: [{
                field: "Name",
                label: "Name:"
            }, {
                field: "Address",
                label: "Address:"
            }]
        });
    </script>

### grid.gutter.rows.minWidth `Number`

Defines the minimum width in pixels for the specific breakpoint gutter row value.


<div class="meta-api-description">
Adjust the minimum pixel width threshold for responsive grid gutter rows to control when gutter spacing adapts based on screen size, enabling precise configuration of layout breakpoints, minimum row widths, and adaptive spacing for form grid rows. This setting manages the smallest allowable width for row gutters within responsive breakpoints, supports fine-tuning of responsive behavior, and helps optimize form layout spacing across different device widths and screen resolutions.
</div>

#### Example - setting the gutter rows value
    <form id="myForm"></form>

    <script>
        $("#myForm").kendoForm({
            formData: {
                ID: 1,
                Name: "Ivan",
                Address: "Sofia"
            },
            grid: {
                cols: 2,
                gutter: {
                    rows: [{
                        maxWidth: 600,
                        value: 5
                    },
                    {
                        minWidth: 601,
                        maxWidth: 800,
                        value: 10
                    },
                    {
                        minWidth: 801,
                        maxWidth: 2800,
                        value: 15
                    }],
                    cols: 2
                },
                rows: 1
            },
            items: [{
                field: "Name",
                label: "Name:"
            }, {
                field: "Address",
                label: "Address:"
            }]
        });
    </script>

### grid.gutter.rows.value `Number`

Defines the row gap value for the specific breakpoint.


<div class="meta-api-description">
Configure vertical spacing between grid rows for responsive breakpoints by setting the row gap value or vertical gutter in form layouts, enabling control over the space separating rows in a grid system, adjusting row spacing dynamically based on screen size or device type, managing responsive row gaps to optimize form layout and readability, customizing vertical grid gaps within forms to maintain consistent spacing across different viewport widths, specifying row spacing metrics for responsive design, controlling row separation distance in grid-based forms for better alignment and visual hierarchy on various devices, setting or modifying the vertical gutter size between form rows to improve layout flexibility and responsiveness, enabling adaptive vertical spacing rules for form grids to accommodate diverse design needs and ensuring grid row gaps behave correctly under resizing or breakpoint changes.
</div>

#### Example - setting the gutter rows value
    <form id="myForm"></form>

    <script>
        $("#myForm").kendoForm({
            formData: {
                ID: 1,
                Name: "Ivan",
                Address: "Sofia"
            },
            grid: {
                cols: 2,
                gutter: {
                    rows: [{
                        maxWidth: 600,
                        value: 5
                    },
                    {
                        minWidth: 601,
                        maxWidth: 800,
                        value: 10
                    },
                    {
                        minWidth: 801,
                        maxWidth: 2800,
                        value: 15
                    }],
                    cols: 2
                },
                rows: 1
            },
            items: [{
                field: "Name",
                label: "Name:"
            }, {
                field: "Address",
                label: "Address:"
            }]
        });
    </script>

### grid.gutter.cols `String|Number|Array`

Defines the width of the gutters between the columns. When an array is used, it is mapped to set the gutter between the columns for the provided responsive breakpoints.


<div class="meta-api-description">
Adjust or configure the horizontal spacing between columns in a grid layout by setting column gutter widths, either uniformly or responsively across breakpoints, to control the padding or margins that separate form elements or grid items horizontally, enabling fine-tuning of column gap sizes for different screen widths or device sizes, supporting single fixed values or arrays that specify distinct gutter widths per responsive breakpoint to optimize layout spacing and alignment in flexible grid-based form designs.
</div>

#### Example - setting the gutter rows value
    <form id="myForm"></form>

    <script>
        $("#myForm").kendoForm({
            formData: {
                ID: 1,
                Name: "Ivan",
                Address: "Sofia"
            },
            grid: {
                cols: 2,
                gutter: {
                    rows: 1,
                    cols: 2
                },
                rows: 1
            },
            items: [{
                field: "Name",
                label: "Name:"
            }, {
                field: "Address",
                label: "Address:"
            }]
        });
    </script>

### grid.gutter.cols.maxWidth `Number`

Defines the maximum width in pixels for the specific breakpoint gutter col value.


<div class="meta-api-description">
Set or configure the maximum pixel width limitation for gutter columns within a responsive grid system, controlling how wide column gutters can stretch at different screen sizes or breakpoints to maintain consistent, predictable spacing and layout boundaries. Control, limit, or cap the gutter column width so columns don’t expand too far on larger or varying viewports, aiding in responsive design, layout stability, and precise grid alignment. Enable setting fixed or maximum gutter widths to prevent columns from exceeding certain pixel constraints, ensuring design consistency, adaptive grid behavior, and fine-tuning spacing between form elements or grid columns across different device widths and screen resolutions.
</div>

#### Example - setting the gutter rows value
    <form id="myForm"></form>

    <script>
        $("#myForm").kendoForm({
            formData: {
                ID: 1,
                Name: "Ivan",
                Address: "Sofia"
            },
            grid: {
                cols: 2,
                gutter: {
                    cols: [{
                        maxWidth: 600,
                        value: 5
                    },
                    {
                        minWidth: 601,
                        maxWidth: 800,
                        value: 10
                    },
                    {
                        minWidth: 801,
                        maxWidth: 2800,
                        value: 15
                    }],
                    rows: 2
                },
                rows: 1
            },
            items: [{
                field: "Name",
                label: "Name:"
            }, {
                field: "Address",
                label: "Address:"
            }]
        });
    </script>

### grid.gutter.cols.minWidth `Number`

Defines the minimum width in pixels for the specific breakpoint gutter col value.


<div class="meta-api-description">
Control the minimum pixel width for responsive grid columns in forms to prevent columns from shrinking too small at specific breakpoints, set or adjust the smallest allowable column size within gutters, manage responsive layouts by defining threshold widths for column narrowing, ensure consistent spacing and readability by configuring minimum column dimensions, enable precise column width constraints for adaptive form designs, handle layout scaling by specifying pixel-based limits on column collapse, and customize grid gutter behavior for optimal responsiveness across device sizes.
</div>

#### Example - setting the gutter rows value
    <form id="myForm"></form>

    <script>
        $("#myForm").kendoForm({
            formData: {
                ID: 1,
                Name: "Ivan",
                Address: "Sofia"
            },
            grid: {
                cols: 2,
                gutter: {
                    cols: [{
                        maxWidth: 600,
                        value: 5
                    },
                    {
                        minWidth: 601,
                        maxWidth: 800,
                        value: 10
                    },
                    {
                        minWidth: 801,
                        maxWidth: 2800,
                        value: 15
                    }],
                    rows: 2
                },
                rows: 1
            },
            items: [{
                field: "Name",
                label: "Name:"
            }, {
                field: "Address",
                label: "Address:"
            }]
        });
    </script>

### grid.gutter.cols.value `Number`

Defines the col gap value for the specific breakpoint.


<div class="meta-api-description">
Adjust the horizontal spacing or gap between columns within a grid layout for specific responsive breakpoints, controlling the distance between vertical content blocks, setting column margins dynamically on different screen sizes, customizing grid column padding, configuring inter-column spacing for responsive forms or layouts, managing grid column intervals in a responsive design, defining the width of column gutters, tuning the space between columns to optimize layout appearance on various devices, specifying column gap values to control how tightly grid columns align horizontally across breakpoints, and enabling precise adjustment of column separation to improve readability and visual structure in adaptive form or UI grids.
</div>

#### Example - setting the gutter rows value
    <form id="myForm"></form>

    <script>
        $("#myForm").kendoForm({
            formData: {
                ID: 1,
                Name: "Ivan",
                Address: "Sofia"
            },
            grid: {
                cols: 2,
                gutter: {
                    cols: [{
                        maxWidth: 600,
                        value: 5
                    },
                    {
                        minWidth: 601,
                        maxWidth: 800,
                        value: 10
                    },
                    {
                        minWidth: 801,
                        maxWidth: 2800,
                        value: 15
                    }],
                    rows: 2
                },
                rows: 1
            },
            items: [{
                field: "Name",
                label: "Name:"
            }, {
                field: "Address",
                label: "Address:"
            }]
        });
    </script>

### size `String`*(default: "medium")*

Sets a value controlling size of the component. Can also be set to the following string values:

- "small"
- "medium"
- "large"
- "none"


<div class="meta-api-description">
Adjust form dimensions, spacing, and visual density by configuring size options such as small, medium, large, or none; control layout scale, adjust compactness, set form width and height preferences, manage form component sizing and padding, enable responsive form scaling, customize input area size, and define overall form footprint to fit design requirements and improve user interface consistency.
</div>

#### Example - sets a size

    <form id="myForm"></form>

    <script>
        $("#myForm").kendoForm({
            size: "large",
            validatable: {
                errorTemplate: "<span>#=message#</span>"
            },
            formData: {
                ID: 1,
                Name: "Ivan",
                Address: "Sofia"
            },
            items: [{
                field: "Name",
                label: "Name:",
                validation: { required: true }
            }, {
                field: "Address",
                label: "Address:",
                validation: { required: true }
            }]
        });
    </script>

## Methods

### validate

Validates the form by executing the Form Validator [validate() method](/api/javascript/ui/validator/methods/validate).


<div class="meta-api-description">
Trigger programmatic validation of form inputs, execute validation rules, check if form fields meet requirements, determine form validity before submission or state updates, control validation flow, enable or disable form progress based on validation results, run built-in or custom validation logic, enforce input constraints, handle validation responses in code, and assess if data complies with set rules to prevent invalid form submissions or state changes.
</div>

#### Example

    <form id="myForm"></form>

    <script>
        $("#myForm").kendoForm({
            formData: {
                ID: 1,
                Name: "Ivan",
                Address: "Sofia"
            },
            items: [{
                field: "Name",
                label: "Name:",
                validation: { required: true }
            }, {
                field: "Address",
                label: "Address:",
                validation: { required: true }
            }]
        });

        var form = $("#myForm").getKendoForm();

        form.validate();
    </script>

### clear

Clears the form fields. Sets all model fields to `null` except the ones with hidden input (editor: "hidden").


<div class="meta-api-description">
Reset form inputs, clear all visible fields, and set form data model values to null while preserving hidden or non-visible fields; programmatically erase or initialize form contents, reset user input fields without affecting hidden or system-managed values, clear form state to default empty conditions, control form clearing behavior for visible editors, and enable resetting form components dynamically after loading.
</div>

#### Example

    <form id="myForm"></form>

    <script>
        $("#myForm").kendoForm({
            formData: {
                ID: 1,
                Name: "Ivan",
                Address: "Sofia"
            }
        });

        var form = $("#myForm").getKendoForm();

        form.clear();
    </script>

### setOptions

Sets the options of the Form. Use this method if you want to enable/disable a particular option dynamically.


<div class="meta-api-description">
Change or update form settings dynamically, configure or modify form options at runtime, enable or disable specific form features on the fly, adjust form behavior or appearance through setting updates, apply new configurations to forms without reloading, control form parameters programmatically, switch or override form options during execution, manage dynamic form properties, customize form controls and features via code, update form attributes instantly based on user input or conditions.
</div>

#### Parameters

##### options `Object`

The configuration options to be set.

#### Example

    <form id="myForm"></form>

    <script>
        $("#myForm").kendoForm({
            formData: {
                ID: 1,
                Name: "Ivan",
                Address: "Sofia"
            }
        });

        var form = $("#myForm").getKendoForm();

        form.setOptions({
            orientation: "horizontal"
        });
    </script>

### destroy

Prepares the widget for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the widget element from DOM.


<div class="meta-api-description">
Clean up and properly dispose of form components by invoking the destruction process that detaches all event listeners, removes internal data bindings, and cascades cleanup calls to nested widgets or child elements to prevent memory leaks and ensure safe removal from the application lifecycle without removing the DOM element itself. This process handles event unbinding, data cleanup, and recursive destruction of embedded widgets, enabling controlled teardown, resetting resources, and preparing forms for removal or replacement in single-page applications or dynamic interfaces. Use this method to avoid lingering event handlers, free up memory, and maintain application performance by systematically disabling all interactive behavior and associated data on forms and their child components.
</div>

#### Example

    <form id="myForm"></form>

    <script>
        $("#myForm").kendoForm({
            formData: {
                ID: 1,
                Name: "Ivan",
                Address: "Sofia"
            }
        });

        var form = $("#myForm").getKendoForm();

        form.destroy();
    </script>

## Fields

### validator `kendo.ui.Validator`

The [Validator instance](/api/javascript/ui/validator).


<div class="meta-api-description">
Control and access the validation engine that runs input checks and manages validation rules within a form, enabling programmatic triggering of validation processes, inspection and modification of validation constraints, retrieving validation outcomes, setting up or customizing validation logic, invoking validation methods directly, managing rule sets for inputs, and performing dynamic or manual validation after form setup to ensure data integrity and input correctness.
</div>

#### Example - use the validator API 

    <form id="myForm"></form>

    <script>
        var form = $("#myForm").kendoForm({
            formData: {
                ID: 1,
                Name: "",
                Address: ""
            },
            items: [{
                field: "Name",
                label: "Name:",
                validation: { required: true }
            }, {
                field: "Address",
                label: "Address:",
                validation: { required: true }
            }]
        }).data("kendoForm");

        form.validator.validateInput("[name='Name']");
        form.validator.validateInput("[name='Address']");
    </script>

## Events

### validate

Fired when the validation of the entire form completes.


<div class="meta-api-description">
Trigger actions or run custom logic after the entire form completes validation by detecting when all inputs have been checked and results are finalized, enabling control over form submission enabling or disabling, updating interface elements based on validation success or failure, aggregating and displaying error messages, and reacting to overall form validity changes; this event-based approach supports scenarios like handling validation completion, responding to synchronous or asynchronous validation results, managing UI feedback post-validation, and orchestrating form state transitions after verifying all fields collectively.
</div>

#### Event Data

##### e.sender `kendo.ui.Form`

The Form instance which fired the event.

##### e.valid `Boolean`

The validation state - `true` or `false`.

##### e.model `Object`

The form model.

##### e.errors `Array`

Contains the validation errors if form is not valid.

#### Example - subscribe to the "validate" event during initialization

    <form id="myForm"></form>

    <script>
        $("#myForm").kendoForm({
            formData: {
                ID: 1,
                Name: "Ivan",
                Address: "Sofia"
            },
            items: [{
                field: "Name",
                label: "Name:",
                validation: { required: true }
            }, {
                field: "Address",
                label: "Address:",
                validation: { required: true }
            }],
            validate: function(ev) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
                console.log(ev);
            }
        });
    </script>

#### Example - subscribe to the "validate" event after initialization

    <form id="myForm"></form>

    <script>
        var form = $("#myForm").kendoForm({
            formData: {
                ID: 1,
                Name: "Ivan",
                Address: "Sofia"
            },
            items: [{
                field: "Name",
                label: "Name:",
                validation: { required: true }
            }, {
                field: "Address",
                label: "Address:",
                validation: { required: true }
            }]
        }).getKendoForm();

        form.bind("validate", function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("valid" + e.valid);
        });
    </script>

### validateField

Fired when the validation state of a field changes.


<div class="meta-api-description">
Detect changes in individual form field validation status, trigger custom logic or UI updates when input validation results update, listen for field validation state changes to enable or disable buttons, show or hide error messages dynamically, handle validation feedback events to respond to form input correctness, monitor validation success or failure per field for conditional behavior, react to validation updates for specific inputs, control form workflow based on real-time validation outcomes, configure event responses to field validation state transitions, and programmatically inspect validation event data indicating field identity and current validation state.
</div>

#### Event Data

##### e.sender `kendo.ui.Form`

The Form instance which fired the event.

##### e.valid `Boolean`

The validation state of the field - `true` or `false`.

##### e.model `Object`

The form model.

##### e.error `String`

Contains the validation error if the state is not valid.

##### e.input `jQuery`

The validated input.

#### Example - subscribe to the "validateField" event during initialization

    <form id="myForm"></form>

    <script>
        $("#myForm").kendoForm({
            formData: {
                ID: 1,
                Name: "Ivan",
                Address: "Sofia"
            },
            items: [{
                field: "Name",
                label: "Name:",
                validation: { required: true }
            }, {
                field: "Address",
                label: "Address:",
                validation: { required: true }
            }],
            validateField: function(ev) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
                console.log(ev);
            }
        });
    </script>

#### Example - subscribe to the "validateField" event after initialization

    <form id="myForm"></form>

    <script>
        var form = $("#myForm").kendoForm({
            formData: {
                ID: 1,
                Name: "Ivan",
                Address: "Sofia"
            },
            items: [{
                field: "Name",
                label: "Name:",
                validation: { required: true }
            }, {
                field: "Address",
                label: "Address:",
                validation: { required: true }
            }]
        }).getKendoForm();

        form.bind("validateField", function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("valid" + e.valid);
        });
    </script>

### change

Triggered when the form model is updated.

> **Important:** When validateOnBlur is `true` the change event is triggered only if a valid value is entered.


<div class="meta-api-description">
Capture and handle updates whenever the form data or model changes, enabling developers to listen for modifications, trigger validation checks, synchronize related data, enable or disable save buttons, or run custom logic after user input alters form values; this change event fires post-update and can be configured to react only to valid inputs when validation on blur is active, supporting use cases like dynamic form reactions, input monitoring, data binding, real-time validation feedback, and conditional UI updates based on form state transitions.
</div>

#### Event Data

##### e.sender `kendo.ui.Form`

The Form instance which fired the event.

##### e.field `String`

The name of the field that triggered the change.

##### e.value `String`

The new value.

#### Example - subscribe to the "change" event during initialization

    <form id="myForm"></form>

    <script>
        $("#myForm").kendoForm({
            formData: {
                ID: 1,
                Name: "Ivan",
                Address: "Sofia"
            },
            items: [{
                field: "Name",
                label: "Name:",
                validation: { required: true }
            }, {
                field: "Address",
                label: "Address:",
                validation: { required: true }
            }],
            change: function(ev) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
                console.log(ev);
            }
        });
    </script>

#### Example - subscribe to the "change" event after initialization

    <form id="myForm"></form>

    <script>
        var form = $("#myForm").kendoForm({
            formData: {
                ID: 1,
                Name: "Ivan",
                Address: "Sofia"
            },
            items: [{
                field: "Name",
                label: "Name:",
                validation: { required: true }
            }, {
                field: "Address",
                label: "Address:",
                validation: { required: true }
            }]
        }).getKendoForm();

        form.bind("change", function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log(e);
        });
    </script>

### submit

Triggered when the form is submitted.


<div class="meta-api-description">
Capture and manage form submission events, intercepting user submits to validate or inspect input data before processing; control behavior by preventing default actions, implementing custom submit handlers, enabling asynchronous saving, or triggering additional workflows on form send actions, allowing configuration of event-driven responses and dynamic form interactions during submission.
</div>

#### Event Data

##### e.sender `kendo.ui.Form`

The Form instance which fired the event.

##### e.model `Object`

The form model.

#### Example - subscribe to the "submit" event during initialization

    <form id="myForm"></form>

    <script>
        $("#myForm").kendoForm({
            formData: {
                ID: 1,
                Name: "Ivan",
                Address: "Sofia"
            },
            items: [{
                field: "Name",
                label: "Name:",
                validation: { required: true }
            }, {
                field: "Address",
                label: "Address:",
                validation: { required: true }
            }],
            submit: function(ev) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
                console.log(ev.model);
            }
        });
    </script>

#### Example - subscribe to the "submit" event after initialization

    <form id="myForm"></form>

    <script>
        var form = $("#myForm").kendoForm({
            formData: {
                ID: 1,
                Name: "Ivan",
                Address: "Sofia"
            },
            items: [{
                field: "Name",
                label: "Name:",
                validation: { required: true }
            }, {
                field: "Address",
                label: "Address:",
                validation: { required: true }
            }]
        }).getKendoForm();

        form.bind("submit", function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log(e);
        });
    </script>

### clear

Triggered when the form is cleared.


<div class="meta-api-description">
Detecting when a form’s inputs or fields are reset, cleared, or emptied to trigger updates like state reset, model synchronization, data binding refresh, input revalidation, UI refreshes, or cleanup processes; capturing events fired when users or code clear form fields, enabling hooks or listeners to run custom logic immediately after clearing fields, managing form reset handling, ensuring data consistency after clearing, and integrating with validation or reactive data updates upon emptying form contents.
</div>

#### Event Data

##### e.sender `kendo.ui.Form`

The Form instance which fired the event.

#### Example - subscribe to the "clear" event during initialization

    <form id="myForm"></form>

    <script>
        $("#myForm").kendoForm({
            formData: {
                ID: 1,
                Name: "Ivan",
                Address: "Sofia"
            },
            items: [{
                field: "Name",
                label: "Name:",
                validation: { required: true }
            }, {
                field: "Address",
                label: "Address:",
                validation: { required: true }
            }],
            clear: function(ev) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
                console.log(ev.sender);
            }
        });
    </script>
