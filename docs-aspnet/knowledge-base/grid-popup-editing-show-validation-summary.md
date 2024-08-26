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
  <td>2024.2.514</td>
 </tr>
</table>

## Description

How can I display the validation summary instead of tooltips in the Grid's Popup edit template?

## Solution

The {{ site.product }} Grid configured for Popup editing uses a Validator that shows the error messages as tooltips:

![{{ site.product_short }} Grid popup validation](images/edit-popup-validation.png)

You can show a validation summary with a few lines of JavaScript.

1. Handle the [`Edit`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/grideventbuilder#editsystemstring) event of the Grid.
1. Get a reference to the [Kendo UI Validator](https://docs.telerik.com/kendo-ui/controls/validator/overview) and update its options by using the [`setOptions()`](https://docs.telerik.com/kendo-ui/api/javascript/ui/validator/methods/setoptions) method.

```HtmlHelper
    @(Html.Kendo().Grid <OrderViewModel>()
        .Name("grid")
        .Events(e => e.Edit("addValidationSummary"))
        ...
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-grid name="grid" on-edit="addValidationSummary">
        <!-- Other configuration -->
    </kendo-grid>
```
{% endif %}
```Scripts
    <script>
        function addValidationSummary(e) {
            var validator = e.container.data("kendoValidator");
            validator.setOptions({
                errorTemplate: "", // Remove the "errorTemplate". This way, the tooltip will not show.
                validationSummary: true // Enable the validation summary option.
            });
        }
    </script>
```

As a result, the error messages will be displayed as a list above the editors:

![{{ site.product_short }} Grid popup validation summary](images/edit-popup-validation-summary.png)

To keep the tooltips, as well, do not reset the "errorTemplate" option:

```Scripts
    <script>
        function addValidationSummary(e) {
            var validator = e.container.data("kendoValidator");
            validator.setOptions({
                validationSummary: true
            });
        }
    </script>
```

For more information on validation, refer to the following articles:

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
