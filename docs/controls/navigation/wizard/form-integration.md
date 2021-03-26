---
title: Form Integration
page_title: jQuery Wizard Documentation | Wizard Form integration
description: "Get started with the jQuery Wizard by Kendo UI and learn how the Wizard integrates Kendo UI Forms."
slug: form_integration_wizard_widget
position: 2
---

# Form Integration

The Wizard provides integration with the [Kendo UI Form]({% slug overview_kendoui_form_widget  %}) widget.

Each step of the Wizard accepts a `form` configuration object which defines the options as they are available in the [Form](/api/javascript/ui/form) widget itself. Each Form defined within the Wizard configuration will have all the functionality available in the stand-alone Form component.

In order to facilitate the scenarios where Forms are integrated within the Wizard, the widget can be initialized either from a `<form>` element or a `<div>` element.

## Initialization from a `<form>` Element

When the Wizard is initialized from a `<form>` element the Done button at the last Wizard step will act as a submit button. In this scenario if any Form is defined within the Wizard configuration, its element will be rendered as a `<div>` element. If the built-in validation of the underlying Form within the Wizard will be used it is advisable to add the `novalidate` attribute to the `<form>` the Wizard is initialized from.

```dojo
    <form id="wizard" style="width:800px;" novalidate method="post"></form>

    <script>
    $("#wizard").kendoWizard({
        validateForms: true,
        steps:[{
                title: "Start",
                content: '<h1>Start Registration</h1><br/><br/><br/><h3>Click "Next" to start filling-in the form</h3>'
            },{
                title: "Attendee Details",
                form: {
                    formData: {
                        FirstName: "",
                        LastName: "",
                        Email: "",
                    },
                    items: [
                        { field: "FirstName", label: "First Name:", validation: { required: true } },
                        { field: "LastName", label: "Last Name:", validation: { required: true } },
                        { field: "Email", label: "Email:", validation: { required: true, email: true } }
                    ]
                }
            },{
                title: "Finish",
                content: '<h1>Thank you for registering</h1><br/><br/><br/><h3>Click "Done" to submit the form</h3>'
            }
        ]
    })
    </script>
```

## Initialization from a `<div>` Element

When the Wizard is initialized from a `<div>` element any forms initialized via the Wizard configuration will behave as regular forms. If the Wizard contains multiple forms as part of its steps content and the requirement is to submit them separately a Submit button must be defined via the Form [`buttonsTemplate`](/api/javascript/ui/form/configuration/buttonstemplate) configuration option. It is advisable to handle the Form submit event and submit the form data via Ajax as otherwise the page will reload and the Wizard will return in its initial state.

```dojo
<div id="wizard"></div>

    <script>
    $("#wizard").kendoWizard({
        validateForms: true,
        steps:[{
                title: "Start",
                content: '<h1>Start Registration</h1><br/><br/><br/><h3>Click "Next" to start filling-in the form</h3>'
            },{
                title: "Attendee Details",
                form: {
                    formData: {
                        FirstName: "",
                        LastName: "",
                        DateOfBirth: new Date(),
                    },
                    items: [
                        { field: "FirstName", label: "First Name:", validation: { required: true } },
                        { field: "LastName", label: "Last Name:", validation: { required: true } },
                        { field: "DateOfBirth", label: "Date Of Birth:", validation: { required: true} }
                    ],
                    buttonsTemplate: '<input type="submit" />',
                    submit:onSubmit
                }
            },{
                title: "User Details",
                form: {
                    formData: {
                        Username: "",
                        Email: ""
                    },
                    items: [
                        { field: "Username", label: "UserName:", validation: { required: true } },
                        { field: "Email", label: "Email:", validation: { required: true, email:true } }
                    ],
                    buttonsTemplate: '<input type="submit" />',
                    submit:onSubmit
                }
            },{
                title: "Finish",
                content: '<h1>Thank you for registering</h1><br/><br/><br/><h3>Click "Done" to complete the registration process</h3>'
            }
        ]
    })

    function onSubmit(event){
        event.preventDefault();
        //handle data submission
    }
    </script>

```

## Separate Forms

Forms can be defined with the Wizard configuration (the build-in Form integration explained above), could be initialized directly as content of any step of the Wizard, or could be loaded as a content via Ajax call to a remote end-point. When Form is separately initialized (without using the Wizard configuration) or loaded as a remote content on any of the Wizard steps, there is no connection between the Wizard widget and the Form itself. The Form will act as a separate component. For further details refer to the [Content]({% slug content_wizard_widget %}) section.

## See Also

* [Basic usage of the Wizard](https://demos.telerik.com/kendo-ui/wizard/index)
* [JavaScript API Reference of the Wizard](/api/javascript/ui/wizard)
