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

Specifies the [template](/api/javascript/kendo/methods/template) which is used for rendering the From buttons.

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

### focusFirst `Boolean` *(default: false)*

Specifies if the first editor of the form will be focused on initialization.


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

### items.field `String`

Maps to the model field which will be configured and sets the name of the input.

### items.editor `String|Function`

Defines the editor widget type. Available options are:

* DropDown widgets - "AutoComplete", "DropDownList", "ComboBox", "MultiSelect", "DropDownTree", "MultiColumnComboBox"
* DatePicker widgets - "DateInput", "DatePicker", "DateTimePicker", "TimePicker"
* Input widgets - "NumericTextBox", "MaskedTextBox", "RadioGroup", "CheckBoxGroup", "Switch", "Rating", "Slider", "ColorPicker"
* Editor widget - "Editor"

### items.editorOptions `Object`

Defines the widget configuration for the specified `items.editor`.

### items.validation `Object`

Specified the validation rules for the field.

### items.label `String|Object`

Defines the field label.

### items.label.text `String`

Defines the text of the label.

### items.label.optional `Boolean`

Specifies if the field is optional by rendering additional text next to the label.

### items.label.encoded `Boolean` *(default: true)*

Specifies if the label text will HTML-encoded before it is displayed. If set to `false` the label text will be displayed as is.

### items.id `String`

Defines the field id.

### items.title `String`

Defines the field title.

### items.hint `String`

Defines the hint text that will be shown underneath the form editor.

### items.colSpan `Number`

Defines the field size when grid layout is used.

### items.attributes `Object`

Defines the attributes that are applied to the input element.

### orientation `String`

Configures the Form orientation. Available options are `"horizontal"` and `"vertical"`.

By default, the Form is rendered with vertical orientation.

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

### grid `Object`

Grid layout settings.

### grid.cols `Number|String`

Defines the columns of the grid.

### grid.gutter `Number|String`

Defines the width of the gutters between the columns / rows.

## Methods

### validate

Validates the form by executing the Form Validator [validate() method](/api/javascript/ui/validator/methods/validate).

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

Clears the form fields. Sets all model fields to `null`.

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

## Events

### validate

Fired when the validation of the entire form completes.

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
            console.log("valid" + e.valid);
        });
    </script>

### validateField

Fired when the validation state of a field changes.

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
            console.log("valid" + e.valid);
        });
    </script>

### change

Triggered when the form model is updated.

> **Important:** When validateOnBlur is `true` the change event is triggered only if a valid value is entered.

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
            console.log(e);
        });
    </script>

### submit

Triggered when the form is submitted.

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
            console.log(e);
        });
    </script>

### clear

Triggered when the form is cleared.

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
                console.log(ev.sender);
            }
        });
    </script>
