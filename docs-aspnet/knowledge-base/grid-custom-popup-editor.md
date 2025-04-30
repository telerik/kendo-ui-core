---
title: Use a Custom Popup Editor in Grid
page_title: Use a Custom Popup Editor in Grid
description: "Customize the popup editor of the {{ site.product }} Grid with enabled Popup editing."
previous_url: /helpers/data-management/grid/how-to/editing/custom-popup-editor, /html-helpers/data-management/grid/how-to/editing/custom-popup-editor
slug: howto_usecustompopupeditors_gridaspnetmvc
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Grid</td>
 </tr>
 <tr>
  <td>Product version</td>
  <td>2025.1.227</td>
 </tr>
</table>

## Description

How can I customize the default Popup editor of the Grid?

## Solution

The Grid provides an option for editing its data using a Popup editor. You can modify the default Popup form by using a template. 

To implement a custom Popup form:

1. Declare the name of the View that holds the content of the Popup window by using the [`TemplateName`](/api/kendo.mvc.ui.fluent/grideditingsettingsbuilder#templatenamesystemstring) method.

    ```Razor
    @(Html.Kendo().Grid<TelerikProject.Models.Customer>()
        .Name("grid")
        .Editable(e=>e.Mode(GridEditMode.PopUp).TemplateName("CustomPopUp"))
        ... // Additional configuration.
    )
    ```

1. Create the editor template View. Its name must match the one declared in the `TemplateName()` configuration. By default, the editor templates the Grid uses are located in the `~/Views/Shared/EditorTemplates` directory. Save the new template in this directory, too.

1. Add the desired editors in the **CustomPopUp** View:

    ```Razor CustomPopUp.cshtml
        @model TelerikProject.Models.Customer

        @Html.Kendo().TextBoxFor(m => m.ContactName)
        @Html.Kendo().NumericTextBoxFor(m => m.Age)
        @Html.Kendo().TextBoxFor(m => m.Country)
    ```

For a complete example, refer to the [project on how to customize the Popup editor of the Grid when its editing mode is set to `PopUp`](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/GridEditingCustomPopupEditor).

## More {{ site.framework }} Grid Resources

* [{{ site.framework }} Grid Documentation]({%slug htmlhelpers_grid_aspnetcore_overview%})
* [{{ site.framework }} Grid Demos](https://demos.telerik.com/{{ site.platform }}/grid/index)
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-mvc/grid)
* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})
* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)

## See Also

* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
