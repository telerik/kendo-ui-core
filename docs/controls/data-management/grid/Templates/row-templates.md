---
title: Row Templates
page_title: Row Templates | Kendo UI Grid
description: "Learn how to customize the row templates."
previous_url: /controls/data-management/grid/walkthrough#templates
slug: row_templates_kendoui_grid_widget
position: 1
---

# Row Templates

The Kendo UI Grid supports row templates that allow you to place custom content into a grid row.

It is possible to format any cell within the Grid by using templates within a script tag or within the template option on the column object if the Grid is initialized from a `<div>` element.

The following example demonstrates how to use a template to format the email address as a hyperlink by using a template declared in a script block.

###### Example

    <script id="template" type="text/x-kendo-tmpl">
        <tr>
            <td>
                #= firstName #
            </td>
            <td>
                #= lastName #
            </td>
            <td>
                <a href="mailto:#= email #">#= email #</a>
            </td>
        </tr>
    </script>

Specify this as a template for each row by passing it in to the `rowTemplate` option on the Grid and initializing it with the `kendo.template` function, as demonstrated in the following example.

###### Example

    $("#grid").kendoGrid({
        rowTemplate: kendo.template($("#template").html()),
       // other configuration
    });

In the resulting Grid, the email address is an interactive hyperlink which opens a new email message when clicked.

**Figure 6: Grid with a row template applied**

![Grid with row template](/controls/data-management/grid/grid8_1.png)

For more information on Kendo UI templates, refer to the [introductory article on templates]({% slug overview_kendoui_templatescomponent %}).

## See Also

* [Grid JavaScript API Reference](/api/javascript/ui/grid)
* [Walkthrough of the Grid]({% slug walkthrough_kendoui_grid_widget %})
