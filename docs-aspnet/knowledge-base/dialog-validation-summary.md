---
title: How can I show validation summary on a Dialog
description: "An example of how can I show validation summary in the {{ site.product }} Dialog."
type: how-to
page_title: How can I show a validation summary on a Dialog
slug: dialog-validation-summary
tags: mvc, core, dialog, validation, summary
res_type: kb
component: dialog
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.prodcut }} Dialog</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>Created with the 2022.2.621 version</td>
 </tr>
</table>

## Description

How can I show a validation summary in the {{ site.product }} Dialog?

## Solution

1. Set an initial HTML content within the Dialog which will act as a container for the error messages.
1. Get the reference of the validator and attach a handler to the validate event through the .bind() configuration method.
1. Within the handler, assess if any errors have occurred using the .errors() method, and based on the evaluation, append the error messages to the content of the dialog and open it.

```Index.cshtml
    <form id="myform">
        <input name="username" required /> <br />
        <input name="password" required /> <br />
        <button>Validate</button>
    </form>

    @(Html.Kendo().Dialog()
            .Name("SMEValidationSummary")
            .Title("SME Validation Summary")
            .Closable(false)
            .Content("<div class='errors'></div>")
            .Width(400)
            .Modal(true)
            .Visible(false)
            .Actions(actions =>
            {
                actions.Add().Text("OK").Primary(true);
            })
    )
```
```Script.js
    $(document).ready(function(){
        var validator = $("#myform").kendoValidator().data("kendoValidator");
        validator.bind("validate", function (e) {        
                var errors = this.errors();
                
                if (errors.length) {
                    var html = "<ul style='color:red;'>";
                    for (var i = 0; i < errors.length; i++) {
                        html += "<li>" + errors[i] + "</li>";
                    }
                    html += "</ul>";
                    $(".errors").html($(html));
                    $("#SMEValidationSummary").data("kendoDialog").open();
                }
        });
    })
```

For the complete implementation of the suggested approach, refer to the following [Telerik REPL](https://netcorerepl.telerik.com/cmasECbw25M5uiBi06) example.