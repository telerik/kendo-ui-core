---
title: Add Custom Reset Button to Form
description: Learn how to add a reset button to the Form.
type: how-to
page_title: Add Custom Reset Button to Form
slug: form-custom-reset-button
tags: form, reset, setoptions
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Form for jQuery</td>
 </tr>
</table>

## Description

How can I add a custom button to reset the inital data loaded in the From?

## Solution

Configure a `buttonsTemplate` and add the html for the reset button. On click of the custom reset button, get a reference to the Form. Use the [setOptions](/api/javascript/ui/form/methods/setoptions) method to set the formData of the Form to the initial data.

```dojo
    <form id="myForm"></form>

    <script>
      function custom(){     
        var form = $("#myForm").data('kendoForm');
        var initial = form.options.formData;
        form.setOptions({
          formData: {
            ID: initial.ID,
            Name: initial.Name,
            Address: initial.Address
          }
        });
      }

      $(document).ready(function(){        
        $("#myForm").kendoForm({
          formData: {
            ID: 1,
            Name: "Ivan",
            Address: "Sofia"
          },
          buttonsTemplate:'<div class="k-form-buttons">'+
          '<button class="k-button k-primary k-form-submit" type="submit">Submit</button>'+
          '<button class="k-button k-form-clear">Clear</button>'+
          '<button id="btn" onclick="custom()" class="k-button">Custom Reset button</button>'+
          '</div>',
          submit: function(e) {
            e.preventDefault();
          }          
        });
      })
    </script>
```

## See Also

* [Form Overview](https://docs.telerik.com/kendo-ui/controls/layout/form/overview)
