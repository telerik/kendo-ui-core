---
title: Use Custom Popup Editors
page_title: Use Custom Popup Editors
description: "Customize the popup editor of the Kendo UI Grid in a popup mode."
previous_url: /helpers/data-management/grid/how-to/editing/custom-popup-editor
slug: howto_usecustompopupeditors_gridaspnetmvc
---

# Customize the Popup Editors in the Grid

The Grid provides an option for editing its data in a popup. You can modify the popup window by using templates. 

To customize it the popup editor:

1. Declare the name of the file that will render the content of the popup window by using the [`TemplateName`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/grideditingsettingsbuilder#templatenamesystemstring) extension method.

    ```
    @(Html.Kendo().Grid<TelerikProject.Models.Customer>()
        .Name("grid")
        .Editable(e=>e.Mode(GridEditMode.PopUp).TemplateName("CustomPopUp"))
        ...
    ```

2. Create the editor template file. Its name must match the one declared in the `TemplateName()` configuration. By default, the editor templates that the Grid is using are located in the `~/Views/Shared/EditorTemplates` directory. Save the new template in this directory too.

3. Implement the new editor template.

    ```CustomPopUp.cshtml
        @model TelerikProject.Models.Customer

        @Html.Kendo().TextBoxFor(m => m.ContactName)
        @Html.Kendo().NumericTextBoxFor(m => m.Age)
        @Html.Kendo().TextBoxFor(m => m.Country)
    ```

For a full example, refer to the project on how to [customize the popup editor of the Kendo UI Grid when the mode is configured to `popup`](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/grid/custom-popup-editor).

## See Also

* [Overview of the Grid HtmlHelper]({% slug htmlhelpers_grid_aspnetcore_overview %})
* [GridBuilder API Reference](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/gridbuilder)
