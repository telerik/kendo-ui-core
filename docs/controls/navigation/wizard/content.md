---
title: Content
page_title: jQuery Wizard Documentation | Wizard Content
description: "Get started with the jQuery Wizard by Kendo UI and learn how to set its content."
slug: content_wizard_widget
position: 3
---

# Content

The Wizard provides options for loading content via AJAX, defining local content or initializing the Wizard from an existing HTML.

## Loading Content with AJAX

The Wizard provides built-in support for asynchronously loading content from remote URLs via the [`contentUrl`](/api/javascript/ui/wizard/configuration/steps/contentUrl) configuration option. These remote call should return HTML content that will be loaded in the content area of the respective Wizard step. The Wizard also provides  [`loadOnDemand`](/api/javascript/ui/wizard/configuration/loadondemand) configuration option which determines whether each step content will be loaded when it is selected or all of them will be loaded initially with the rendering of the widget. It is possible also to specify whether the step content will be reloaded on each navigation to the given Step via the [`reloadOnSelect`](/api/javascript/ui/wizard/configuration/reloadonselect) configuration option.

For a complete example, refer to the [demo on loading Wizard content with AJAX](https://demos.telerik.com/kendo-ui/wizard/ajax).

## Loading Local Content

### Defining Local Content with the Built-in Form Integration

The Wizard integrates the Kendo UI Form component and supports all its configuration options. For further Form configuration options refer to the [Form documentation section]({% slug overview_kendoui_form_widget %}).

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
                    ]
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
                    ]
                }
            },{
                title: "Finish",
                content: '<h1>Thank you for registering</h1><br/><br/><br/><h3>Click "Done" to complete the registration process</h3>'
            }
        ]
    });
    </script>
```

### Defining HTML Content

The content of each Wizard step can be specified via the [`steps.content`](/api/javascript/ui/wizard/configuration/steps/content) or [`steps.contentId`](/api/javascript/ui/wizard/configuration/steps/contentId) configuration options. In this way a specific HTML string or a DOM element, specified by its Id, will be used as content:

```dojo
    <div id="wizard"></div>

    <script id="finalStep" type="text/kendo-template">
        <h1>Thank you for registering</h1>
        <br/><br/><br/>
        <h3>Click "Done" to complete the registration process</h3>
    </script>

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
                    ]
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
                    ]
                }
            },{
                title: "Finish",
                contentId: "finalStep"
            }
        ]
    });
    </script>
```

The Wizard can also be initialized from an element, with existing HTML content:

```dojo
    <div id="wizard">
        <div>
            <h1>Start Registration</h1>
            <h3>Click "Next" to start filling-in the form</h3>
        </div>
        <div>
            <h1>Personal data</h1>
            <form class="k-form">
                <div class="k-form-container">
                    <div class="k-form-field">
                        <label>Name: <input type="text" id="drop"></label>
                    </div>
                    <div class="k-form-field">
                        <label>Surname: <input type="text"></label>
                    </div>
                </div>
            </form>
        </div>
        <div>
            <h1>Contacts data</h1>
            <form class="k-form">
                <div class="k-form-container">
                    <div class="k-form-field">
                        <label>Telephone: <input type="text"></label>
                    </div>
                    <div class="k-form-field">
                        <label>Mail: <input type="text"></label>
                    </div>
                </div>
            </form>
        </div>
    </div>

    <script>
    $("#wizard").kendoWizard({
            steps: [{
                title: "Welcome",
            },{
                title: "Personal Details",
            },{
                title: "Contact Details"
            }]
        });
    </script>
```

## See Also

* [Basic usage of the Wizard](https://demos.telerik.com/kendo-ui/wizard/index)
* [JavaScript API Reference of the Wizard](/api/javascript/ui/wizard)
