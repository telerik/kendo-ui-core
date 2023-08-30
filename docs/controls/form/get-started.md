---
title: Getting Started
page_title: jQuery Form Documentation - Getting Started with the Form
description: "Get started with the jQuery Form by Kendo UI and learn how to create, initialize, and enable the component."
slug: getting_started_kendoui_form_widget
position: 1
---

# Getting Started with the Form

This guide demonstrates how to get up and running with the Kendo UI for jQuery Form.

After the completion of this guide, you will be able to achieve the following end result:

```dojo
    <form id="form"></form>

    <script>
      $(document).ready(function () {
        $("#form").kendoForm({
		      size: 'large',
          orientation: "horizontal",
          validatable: {
            validateOnBlur: true,
            validationSummary: true,
            errorTemplate: "<span>#=message#</span>"
          },
          formData: {
            Username: "Alex",
            Email: "alex123@email.com",
            Password: "pass123",
            Birth: new Date('03/06/2001'),
            City: 2
          },
          items: [ 
            { field: "Username", label: "Username:", validation: { required: true } },
            { field: "Email", label: "Email:", validation: { required: true, email: true } },
            {
              field: "Password",
              label: "Password:",
              validation: { required: true },
              hint: "Hint: enter alphanumeric characters only.",
              editor: function (container, options) {
                $('<input type="password" id="Password" name="' + options.field + '" title="Password" required="required" autocomplete="off" aria-labelledby="Password-form-label" data-bind="value: Password" aria-describedby="Password-form-hint"/>')
                  .appendTo(container)
                  .kendoTextBox();
              }
            },
            {
              field: "City",
              editor:"DropDownList",
              editorOptions:{
                dataTextField:"text",
                dataValueField:"id",
                dataSource: {
                  data: [
                    { text:"Sofia", id:1 },
                    { text:"Bern", id: 2 },
                    { text:"Napoli", id:3 }
                  ]
                }
              }
            },
            { field: "Birth", label: { text: "Date of birth:", optional: true }, format: 'dd MMMM yyyy'},            
          ],
          submit: function(e) {
            e.preventDefault();
            alert('Form submitted successfully');
          }
        });
      });
    </script>
```

## 1. Create a Form Element

First, create an empty `<form>` element that you will use to initialize the component.

```html
<form id="form"></form>
```

## 2. Initialize the Form

In this step, you will initialize the Form from the `<form>` element.

```html
<form id="form"></form>

<script>
    // Target the form element by using jQuery and then call the kendoForm() method.
    $("#form").kendoForm({
        // Add some basic configurations such as size.
        size: "large"
    });
</script>
```

## 3. Bind the Form to Data

Once the basic initialization is completed, you can start adding additional configurations to the Form. The first and most important configuration is the [`formData`](/api/javascript/ui/form/configuration/formdata).

```html
    <form id="form"></form>

    <script>
      $("#form").kendoForm({
        size: 'large',
        orientation: "horizontal",
        formData: {
          Username: "Alex",
          Email: "alex123@email.com",
          Password: "pass123",
          Birth: new Date('03/06/2001'),
          City: 2
        }
      });
    </script>
```

## 4. Add the Label and Hint Options

The Form allows you to configure each of the displayed items. For example, you can configure the [`label`](/api/javascript/ui/form/configuration/items#items.label) or add a [`hint`](/api/javascript/ui/form/configuration/items#items.hint).

```html
    <form id="form"></form>

    <script>
      $("#form").kendoForm({
        size: 'large',
        orientation: "horizontal",
        formData: {
          Username: "Alex",
          Email: "alex123@email.com",
          Password: "pass123",
          Birth: new Date('03/06/2001'),
          City: 2
        },
        items: [ 
          { field: "Username", label: "Username:" },
          { field: "Email", label: "Email:"},
          {
            field: "Password",
            label: "Password:",           
            hint: "Hint: enter alphanumeric characters only."            
          },
          { field: "City" },
          { field: "Birth", label: { text: "Date of birth:", optional: true }, format: 'dd MMMM yyyy'},            
        ],
      });
    </script>
```

## 5. Add Editors for the Form Items

The Form allows you to configure a specific editor for the displayed items. The example below demonstrates how to set one of the predefined [`editors'](/api/javascript/ui/form/configuration/items#itemseditor). 
However, you can also implement a [`custom editor`](https://docs.telerik.com/kendo-ui/controls/form/items#custom-editor) that will fit the needs of your application. 

```html
    <form id="form"></form>

    <script>
      $("#form").kendoForm({
        size: 'large',
        orientation: "horizontal",
        formData: {
          Username: "Alex",
          Email: "alex123@email.com",
          Password: "pass123",
          Birth: new Date('03/06/2001'),
          City: 2
        },
        items: [ 
          { field: "Username", label: "Username:" },
          { field: "Email", label: "Email:"},
          {
            field: "Password",
            label: "Password:",           
            hint: "Hint: enter alphanumeric characters only.",
            editor: function (container, options) {
              $('<input type="password" id="Password" name="' + options.field + '" title="Password" autocomplete="off" aria-labelledby="Password-form-label" data-bind="value: Password" aria-describedby="Password-form-hint"/>')
                .appendTo(container)
                .kendoTextBox();
            }
          },
          {
            field: "City",
            editor:"DropDownList",
            editorOptions:{
              dataTextField:"text",
              dataValueField:"id",
              dataSource: {
                data: [
                  { text:"Sofia", id:1 },
                  { text:"Bern", id: 2 },
                  { text:"Napoli", id:3 }
                ]
              }
            }
          },
          { field: "Birth", label: { text: "Date of birth:", optional: true }, format: 'dd MMMM yyyy'},            
        ],
      });
    </script>
```

## 6. Enable Validation

You can specify which of the items in the Form are required. The Form component also gives you the option to configure the built-in Validator options by setting the [`validatable`](/api/javascript/ui/form/configuration/validatable#validatable.validationSummary) options.

```html
    <form id="form"></form>

    <script>  
        $("#form").kendoForm({
          size: 'large',         
          validatable: {
            validateOnBlur: true,
            validationSummary: true,
            errorTemplate: "<span>#=message#</span>"
          },
          formData: {
            Username: "Alex",
            Email: "alex123@email.com",
            Password: "pass123",
            Birth: new Date('03/06/2001'),
            City: 2
          },
          items: [ 
            { field: "Username", label: "Username:", validation: { required: true } },
            { field: "Email", label: "Email:", validation: { required: true, email: true } },
            {
              field: "Password",
              label: "Password:",
              validation: { required: true },
              hint: "Hint: enter alphanumeric characters only.",
              editor: function (container, options) {
                $('<input type="password" id="Password" name="' + options.field + '" title="Password" required="required" autocomplete="off" aria-labelledby="Password-form-label" data-bind="value: Password" aria-describedby="Password-form-hint"/>')
                  .appendTo(container)
                  .kendoTextBox();
              }
            },
            {
              field: "City",
              editor:"DropDownList",
              editorOptions:{
                dataTextField:"text",
                dataValueField:"id",
                dataSource: {
                  data: [
                    { text:"Sofia", id:1 },
                    { text:"Bern", id: 2 },
                    { text:"Napoli", id:3 }
                  ]
                }
              }
            },
            { field: "Birth", label: { text: "Date of birth:", optional: true }, format: 'dd MMMM yyyy'},            
          ],
          submit: function(e) {
            e.preventDefault();
            alert('Form submitted successfully');
          }
        });
    </script>
```

## 7. Configure Form Orientation

The [`orientation`](/api/javascript/ui/form/configuration/orientation) of the Form can be easily changed by using the respective option. 

```
	<form id="form"></form>

    <script>  
        $("#form").kendoForm({
          size: 'large',     
          orientation: "horizontal",
          validatable: {
            validateOnBlur: true,
            validationSummary: true,
            errorTemplate: "<span>#=message#</span>"
          },
          formData: {
            Username: "Alex",
            Email: "alex123@email.com",
            Password: "pass123",
            Birth: new Date('03/06/2001'),
            City: 2
          },
          items: [ 
            { field: "Username", label: "Username:", validation: { required: true } },
            { field: "Email", label: "Email:", validation: { required: true, email: true } },
            {
              field: "Password",
              label: "Password:",
              validation: { required: true },
              hint: "Hint: enter alphanumeric characters only.",
              editor: function (container, options) {
                $('<input type="password" id="Password" name="' + options.field + '" title="Password" required="required" autocomplete="off" aria-labelledby="Password-form-label" data-bind="value: Password" aria-describedby="Password-form-hint"/>')
                  .appendTo(container)
                  .kendoTextBox();
              }
            },
            {
              field: "City",
              editor:"DropDownList",
              editorOptions:{
                dataTextField:"text",
                dataValueField:"id",
                dataSource: {
                  data: [
                    { text:"Sofia", id:1 },
                    { text:"Bern", id: 2 },
                    { text:"Napoli", id:3 }
                  ]
                }
              }
            },
            { field: "Birth", label: { text: "Date of birth:", optional: true }, format: 'dd MMMM yyyy'},            
          ],
          submit: function(e) {
            e.preventDefault();
            alert('Form submitted successfully');
          }
        });
    </script>
```


## Next Steps

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %})
* [Demo Page for the Form](https://demos.telerik.com/kendo-ui/form/index)

## See Also 

* [JavaScript API Reference of the Form](/api/javascript/ui/form)
* [Knowledge Base Section](/knowledge-base)

<script>
  window.onload = function() {
    document.getElementsByClassName("btn-run")[0].click();
  }
</script>
