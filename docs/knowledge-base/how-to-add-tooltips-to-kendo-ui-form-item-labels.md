---
title: Adding Tooltips to Kendo UI Form Items
description: Learn how to apply tooltips to form item labels in Kendo UI Forms, enhancing user interface interactivity.
type: how-to
page_title: How To Add Tooltips to Form Item Labels in Kendo UI Forms
slug: how-to-add-tooltips-to-kendo-ui-form-item-labels
tags: kendo-ui, form, tooltip, user-interface
res_type: kb
ticketid: 1654168
---

## Environment

| Product | Kendo UI for jQuery Form |
| --- | --- |
| Version | 2024.3.806 |

## Description

When designing forms using Kendo UI, adding tooltips to form item labels can enhance user interactivity by providing additional information or guidance. This KB article also answers the following questions:

- How can I add tooltips to form item labels in Kendo UI?
- What is the method to show tooltips on form inputs upon clicking?
- Can I prevent tooltips from automatically hiding after they are displayed?

## Solution

To add tooltips to form item labels, utilize the Kendo UI Tooltip component. Initialize the Tooltip on the Form element and set it to display on form inputs. Configure the Tooltip to show upon clicking and disable auto-hiding to keep the tooltips visible until manually closed.

1. Initialize the Tooltip component on your Form element. Use the [`filter`](/api/javascript/ui/tooltip/configuration/filter) option to target form inputs specifically. 

2. Use the [`autoHide`](/api/javascript/ui/tooltip/configuration/filtautohideer) property set to `false` to keep the tooltip visible until the user closes it (if desired).

Here is an example of initializing a Tooltip for the Form:

```javascript
$("#exampleform").kendoTooltip({
    filter: "input",
    autoHide: false
});
```
Here is the full example:

```dojo
    <div id="example">
        <div id="validation-success"></div>
        <form id="exampleform" style="width: 350px"></form>
      <script>
        $(document).ready(function () {
          var validationSuccess = $("#validation-success");

          $("#exampleform").kendoForm({
            orientation: "vertical",
            formData: {
              Username: "johny",
              Email: "john.doe@email.com",
              Password: "pass123",
              Birth: new Date(),
              Agree: false
            },
            items: [{
              type: "group",
              label: "Registration Form",
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
                { field: "Birth", label: { text: "Date of birth:", optional: true } },
                { field: "Agree", label: "Agree to Terms:", validation: { required: true } }
              ]
            }],
            validateField: function(e) {
              validationSuccess.html("");
            },
            submit: function(e) {
              e.preventDefault();
              validationSuccess.html("<div class='k-messagebox k-messagebox-success'>Form data is valid!</div>");
            },
            clear: function(ev) {
              validationSuccess.html("");
            }
          });

          $('#exampleform').kendoTooltip({
            filter: "input",
            autoHide: false
          });
        });
      </script>
    </div>
```

## See Also

- [Kendo UI Tooltip Documentation](https://docs.telerik.com/kendo-ui/api/javascript/ui/tooltip)
- [Kendo UI Form Documentation](https://docs.telerik.com/kendo-ui/api/javascript/ui/form)
- [Kendo UI Tooltip Overview (Demo)](https://demos.telerik.com/kendo-ui/tooltip/index)
- [Kendo UI Form Overview (Demo)](https://demos.telerik.com/kendo-ui/form/index)
