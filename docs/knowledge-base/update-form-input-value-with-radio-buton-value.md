---
title: Update the Form Input Value with the Selected RadioGroup Value
page_title: Replace the Input Value in the Form with the Selected Value from the RadioGroup - jQuery Form
description: "Learn how to update the input value in a Kendo UI for jQuery Form with the selected value from the RadioGroup."
type: how-to
slug: update-input-value-with-radiogroup-value-form
tags: input, form, update, value, radiogroup, radiobutton
ticketid: 1578406
res_type: kb
---

## Environment

<table>
	<tbody>
		<tr>
			<td>Product</td>    
			<td>Progress® Kendo UI® Form for jQuery</td>
			<td>Progress® Kendo UI® RadioGroup for jQuery</td>
		</tr>
	</tbody>
</table>


## Description

How can I update input value in a Kendo UI for jQuery Form with the selected RadioGroup value?

## Solution

To achieve the desired scenario, use the [`select`](/api/javascript/ui/radiogroup/events/select) event of the RadioGroup to update the input value.

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
              document.getElementById("Name").value = e.target.val();
            }
          },
        }],
      });
    </script>
```

## See Also

* [JavaScript API Reference of the Kendo UI for jQuery Form](/api/javascript/ui/form)
* [jQuery Form Overview (Demo)](https://demos.telerik.com/kendo-ui/form/index)
* [jQuery Form Product Page](https://www.telerik.com/kendo-jquery-ui/form)
* [JavaScript API Reference of the Kendo UI for jQuery RadioGroup](/api/javascript/ui/radiogroup)
* [jQuery RadioGroup Overview (Demo)](https://demos.telerik.com/kendo-ui/radiogroup/index)
* [jQuery RadioGroup Product Page](https://www.telerik.com/kendo-jquery-ui/radiogroup)
