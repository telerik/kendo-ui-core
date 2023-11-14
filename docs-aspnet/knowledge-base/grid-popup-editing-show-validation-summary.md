---
title: Showing a Validation Summary in a Grid Popup
description: An example on how to show a validation summary in a Grid popup template instead of tooltips when working with the {{ site.product }} Grid
type: how-to
page_title: Show Validation Errors Summary in an Editable Grid Popup
slug: grid-popup-editing-show-validation-summary
tags: grid, popup, editing, validation, tooltip, summary, list, instead, remove
ticketid: 1411276
res_type: kb
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
  <td>2019.1.220</td>
 </tr>
</table>

## Description

I want to display the validation summary instead of tooltips in the Grid's Popup edit template.

## Solution

The {{ site.product }} Grid with popup editing uses a Validator that is designed to show the errors as tooltips:

![{{ site.product_short }} Grid popup validation](images/edit-popup-validation.png)

You can create a validation summary with a few lines of JavaScript.

1. Override the `errorTemplate` of the editable internal widget which holds the validator
1. Add an `Edit()` event handler and bind to the validate event of the validator
1. Generate the Validation summary and append it to a predefined HTML element in your popup template

```Index.cshtml
    .Events(e => e.Edit("addValidationSummary"))
    <script>
        kendo.ui.Editable.fn.options.errorTemplate = "<span style='color:red;'>*</span>";

        function addValidationSummary(e) {
            var validator = e.container.data("kendoValidator");
            validator.bind("validate", function (e) {
                var errors = this.errors();
                if (errors.length) {
                    var html = "<ul>";
                    for (var i = 0; i < errors.length; i++) {
                        html += "<li>" + errors[i] + "</li>";
                    }
                    html += "</ul>";
                    $("#errors").html($(html));
                }
            });
        }
    </script>
```
```MyCustomPopup.cshtml
    @model ProjectName.Models.Order
    @using Kendo.Mvc.UI
    <div id="errors" style="color:red;"></div>
        <fieldset>
            <legend>Order</legend>
            @Html.HiddenFor(model => model.Id)
            <div class="editor-label">
                @Html.LabelFor(model => model.OrderDate)
            </div>
            <div class="editor-field">
                @Html.Kendo().DatePickerFor(model => model.OrderDate)
                @Html.ValidationMessageFor(model => model.OrderDate)
            </div>
            <div class="editor-label">
                @Html.LabelFor(model => model.CreatedBy)
            </div>
            <div class="editor-field">
                @Html.Kendo().TextBoxFor(model => model.CreatedBy)
                @Html.ValidationMessageFor(model => model.CreatedBy)
            </div>
        </fieldset>
```

This is the result:

![{{ site.product_short }} Grid popup validation summary](images/edit-popup-validation-summary.png)

For more information on validation, see the following articles:

* [Show Server Validation Errors in a Grid Edit Popup]({% slug grid-popup-editing-show-server-validation-errors %})
* [Validation in {{ site.product }}](https://docs.telerik.com/{{ site.platform }}/getting-started/helper-basics/validation)

## More {{ site.framework }} Grid Resources

* [{{ site.framework }} Grid Documentation]({%slug htmlhelpers_grid_aspnetcore_overview%})

* [{{ site.framework }} Grid Demos](https://demos.telerik.com/{{ site.platform }}/grid/index)

{% if site.core %}
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-core-ui/grid)

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
