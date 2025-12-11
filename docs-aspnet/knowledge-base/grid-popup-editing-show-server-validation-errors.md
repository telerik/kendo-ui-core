---
title: Show Server Validation Errors in Grid Popup and Prevent Closing
description: An example on how to show server errors in a popup template and prevent the popup from closing when working with the {{ site.product }} Grid.
type: how-to
page_title: Show Server Validation Errors in Grid Popup and Prevent Closing
slug: grid-popup-editing-show-server-validation-errors
tags: grid, popup, editing, validation, server, prevent, closing, ignore
ticketid: 1417523
res_type: kb
components: ["general"]
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Grid</td>
 </tr>
 <tr>
  <td>Created with Product Version</td>
  <td>2019.2 703</td>
 </tr>
</table>

## Description

I have a requirement to validate an email address and web address for basic format validity in a custom grid popup. All standard data annotated validation works such as required, length etc in the popup but adding the validation for the email address and web address by implementing the `IValidatableObject` interface on my model and adding the necessary code in a Validate method doesn't produce the required effect. At first pass, the popup closes and an error is displayed at the bottom of the grid view (as it would with an inline editable grid). I've followed the example code provided to handle server side validation errors in the `Error` event of the datasource of the grid and while it stops the popup from closing, it will not display the error messages against the relevant controls. Can you please advise?

## Solution

1. The [Kendo UI Validator](https://docs.telerik.com/kendo-ui/controls/validator/overview#validator-overview) can validate emails on the client using the HTML5 validation. To use the client side validation for emails, you should provide the type in the custom popup editor:

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

```Razor
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
                        grid.editable.element.find("[data-valmsg-for='" + key + "']").replaceWith('<div class="k-widget k-tooltip k-tooltip-validation" style="margin:0.5em"><span class="k-icon k-i-exclamation-circle"></span>' + message + '<div class="k-callout k-callout-n"></div></div>').show();
                    });
                });
            }
        }
    </script>
```

For more information on validation, see the following articles:

* [Show Validation Summary in a Grid Edit Popup]({% slug grid-popup-editing-show-validation-summary %})
* [Validation in {{ site.product }}](https://docs.telerik.com/{{ site.platform }}/getting-started/helper-basics/validation)

## More {{ site.framework }} Grid Resources

* [{{ site.framework }} Grid Documentation]({%slug htmlhelpers_grid_aspnetcore_overview%})

* [{{ site.framework }} Grid Demos](https://demos.telerik.com/{{ site.platform }}/grid/index)

{% if site.core %}
* [{{ site.framework }} DataGrid Product Page](https://www.telerik.com/aspnet-core-ui/grid)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-mvc/grid)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
