---
title: Change the Value of an Input Based on the Selection in RadioGroup in Form
description: Learn how to set the value of the input based on the selection of the RadioGroup in Kendo Form.
type: how-to
page_title: Set Input Value Based on the Radiogroup Selection - Kendo UI Form for jQuery
slug: form-change-input-value-radiogroup
tags: form, input, value, radiogroup
ticketid: 1578406
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Form for jQuery</td>
 </tr>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® RadioGroup for jQuery</td>
 </tr>
</table>

## Description

How can I change the value in an input field displayed in Kendo UI for jQuery Form based on the selection in RadioGroup?

## Solution

Use the [items.editorOptions](/api/javascript/ui/grid/configuration/columns.editoroptions) to handle the RadioGroup [select event](/api/javascript/ui/radiogroup/events/select). In the event handler find the needed field and set its value.


```dojo
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
        editor: "RadioGroup",
        editorOptions: {
          layout: "horizontal",
          items: ["Insert Procedure", "Update Procedure", "Synchronize Procedure"],
          select:function(e){              
            $("#Name").data('kendoTextBox').value(e.target.val());
          } 
        },
      }],
    });
  </script>
```

## See Also

* [Form Overview](https://docs.telerik.com/kendo-ui/controls/form/overview)
