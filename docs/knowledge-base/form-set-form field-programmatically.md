---
title: Set Form field programmatically
description: An example on how to set a Form field programmatically.
type: how-to
page_title: Set Form field programmatically
slug: form-set-field-programmatically
tags: form, field, set, change
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Form</td>
 </tr>
</table>

## Description

How can I change From data based on user selection in another widget?

## Solution

Get a reference to the Form instance and set the value of the required model field via the `kendo.data.Model` [set method](/api/javascript/data/observableobject/methods/set). This way the UI, as well as the form data that will be submitted, will be updated with the new value.

> Only a valid model can be updated following this approach

```dojo
    <div id="example">
      <div class="demo-section k-content">
        <h4>Change Shipping Address</h4>
        <input id="address" style="margin-bottom:20px" />
        <div id="validation-success"></div>

        <form id="exampleForm"></form>
      </div>

      <script>
        $(document).ready(function () {
          var validationSuccess = $("#validation-success");

          $("#exampleForm").kendoForm({
            formData: {
              FirstName: "John",
              LastName: "Doe",
              Email: "john.doe@email.com",
              City: "Lyon",
              AddressLine: "2, rue du Commerce"
            },
            items: [
              {
                type: "group",
                label: "Personal Information",
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
                    label: "Email:",
                    validation: {
                      required: true,
                      email: true
                    }
                  }
                ]
              },
              {
                type: "group",
                label: "Shipping Address",
                items: [
                  {
                    field: "City",
                    label: "City:",
                    validation: { required: true }
                  },
                  {
                    field: "AddressLine",
                    label: "Address Line:",
                    validation: { required: true }
                  },
                ]
              }
            ],
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

          $("#address").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: {
              data:[
                { text: "Home", value: "1", ShipAddress: "2, rue du Commerce", ShipCity: "Lyon" },
                { text: "Office", value: "2", ShipAddress: "Boulevard Tirou, 255",
                 ShipCity: "Charleroi"},
                { text: "Swiss Office", value: "2", ShipAddress: "Hauptstr. 31",
                 ShipCity: "Bern"}
              ]
            },
            change: onDdlChange
          });

          function onDdlChange(e){
            var form = $("#exampleForm").getKendoForm();
            var dataItem = e.sender.dataItem();

            form._model.set("City", dataItem.ShipCity);
            form._model.set("AddressLine", dataItem.ShipAddress);
          };

        });
      </script>
    </div>
```

## See Also

* [Form Overview](https://docs.telerik.com/kendo-ui/controls/layout/form/overview)
