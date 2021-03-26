---
title: Show server validation errors in Grid popup and prevent closing
description: An example on how to show server errors in grid popup template and prevent the popup from closing.
type: how-to
page_title: Show server validation errors in Grid editable popup
slug: grid-popup-editing-show-server-validation-errors
tags: grid, popup, editing, validation, server, prevent, closing, ignore
ticketid: 1417523
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Telerik® UI for ASP.NET Core</td>
 </tr>
 <tr>
  <td>Created with Product Version</td>
  <td>2019.2 703</td>
 </tr>
</table>

## Description

I have a requirement to validate an email address and web address for basic format validity in a custom grid popup. All standard data annotated validation works such as required, length etc in the popup but adding the validation for the email address and web address by implementing the `IValidatableObject` interface on my model and adding the necessary code in a Validate method doesn't produce the required effect. At first pass, the popup closes and an error is displayed at the bottom of the grid view (as it would with an inline editable grid). I've followed the example code provided to handle server side validation errors in the `Error` event of the datasource of the grid and while it stops the popup from closing, it will not display the error messages against the relevant controls. Can you please advise?

## Solution

1. The [Kendo UI Validator](https://docs.telerik.com/kendo-ui/controls/editors/validator/overview#validator-overview) can validate emails on the client using the HTML5 validation. To use the client side validation for emails, you should provide the type in the custom popup editor:

    ```
        <div class="k-edit-label">
            @(Html.LabelFor(m => m.Email))
        </div>
        <div class="k-edit-field">
            @(Html.Kendo().TextBoxFor(m => m.Email).HtmlAttributes(new { type = "email"}))
            @(Html.ValidationMessageFor(m => m.Email))
        </div>
    ```
1. To use custom validation on the server, prevent the popup from closing and display the server error underneath the field, you can do this programmatically as the data source has no knowledge of the server validation error:

```
    .DataSource(dataSource => dataSource
       .Ajax()
       .Events(events => events.Error("onError"))
    )
    
    <script>
        function onError(args) {
            var errors = args.errors;
            if (errors) {
                var grid = $("#grid").data("kendoGrid");
                grid.one("dataBinding", function (e) {
                    e.preventDefault();
                    $.each(errors, function (key, value) {
                        var message = "";
                        if ('errors' in value) {
                            $.each(value.errors, function() {
                                message += this + "\n";
                            });
                        }
                        grid.editable.element.find("[data-valmsg-for='" + key + "']").replaceWith('<div class="k-widget k-tooltip k-tooltip-validation" style="margin:0.5em"><span class="k-icon k-i-warning"></span>' + message + '<div class="k-callout k-callout-n"></div></div>').show();
                    });       
                });
            }
        }
    </script>
```

## See Also

* [Show validation summary in grid edit popup]({% slug grid-popup-editing-show-validation-summary %})
* [MVC Validation](https://docs.telerik.com/aspnet-mvc/getting-started/helper-basics/validation)