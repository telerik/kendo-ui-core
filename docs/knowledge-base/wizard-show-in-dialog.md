---
title: Display a Kendo UI Wizard widget in a Dialog component
description: Initialize a Kendo UI Wizard in a Kendo UI Dialog.
type: how-to
page_title: Display a Kendo UI Wizard in a Dialog component
slug: wizard-show-in-dialog
position: 
tags: wizard, dialog
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product Version</td>
			<td>2020.2.617</td>
		</tr>
		<tr>
			<td>Product</td>
			<td>Wizard for Progress® Kendo UI®</td>
		</tr>
	</tbody>
</table>


## Description
How can I show a Kendo UI Wizard in a Dialog?

## Solution

```dojo
    <div id="dialog">
      <form id="wizard" novalidate method="post"></form>
    </div>

    <script>
    $(document).ready(function() {

        $('#dialog').kendoDialog({
          width: "600px",
          title: "Registration",
          closable: false,
          modal: true,
          open:onOpen
        });

        function onOpen(e){
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
                  ],
            done:function(e){
              e.originalEvent.preventDefault();

              //handle data submission

              kendo.alert('Thank you for registering ' + e.forms[1]._model.Username)

              $('#dialog').getKendoDialog().close();
            }
          });

          e.sender.center();
        };
    });
    </script>
```

## See Also
* [Wizard Configuration - API Reference](https://docs.telerik.com/kendo-ui/api/javascript/ui/wizard)
* [open Event - API Reference](https://docs.telerik.com/kendo-ui/api/javascript/ui/dialog/events/open)
