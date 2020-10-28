---
title: Row Templates
page_title: jQuery Grid Documentation | Row Templates
description: "Get started with the jQuery Grid by Kendo UI and learn how to place custom content into a grid row with the help of row templates."
previous_url: /controls/data-management/grid/walkthrough#templates
slug: row_templates_kendoui_grid_widget
position: 1
---

# Row Templates

The Kendo UI Grid supports row templates which enable you to place custom content into a Grid row.

For runnable examples, refer to:
* [Demo on using the row template of the Grid](https://demos.telerik.com/kendo-ui/grid/rowtemplate)
* [Demo on using the detail-row template of the Grid](https://demos.telerik.com/kendo-ui/grid/detailtemplate)
* [Demo on using the toolbar template of the Grid](https://demos.telerik.com/kendo-ui/grid/toolbar-template)

If you initialize the Grid from a `<div>` element, you can format any cell within the Grid by using templates within a `script` tag or within the `template` option on the column object.

The following example demonstrates how to use a template for formatting the email address as a hyperlink through a template declared in a `script` block.

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

The following example demonstrates how to specify the previous approach as a template for each row by passing it in to the `rowTemplate` option and by initializing it with the `kendo.template` function. As a result, the email address is an interactive hyperlink which opens a new email message when the user clicks it.

    $("#grid").kendoGrid({
        rowTemplate: kendo.template($("#template").html()),
       // Other configuration.
    });

**Figure 1: A Grid with an applied row template**

![Grid with row template](../grid8_1.png)

## KB Articles on Row Templates

* [Adding Row Numbers]({% slug howto_addrownumbers_grid %})
* [Using Dates inside the Row Template]({% slug howto_use_dates_inside_row_template_grid %})
* [Find Out More in the Knowledge Base](/knowledge-base)

## See Also

* [Using Row Templates in the Grid (Demo)](https://demos.telerik.com/kendo-ui/grid/rowtemplate)
* [Using Detail-Row Templates in the Grid (Demo)](https://demos.telerik.com/kendo-ui/grid/detailtemplate)
* [Using Toolbar Templates in the Grid (Demo)](https://demos.telerik.com/kendo-ui/grid/toolbar-template)
* [Introduction on Templates]({% slug overview_kendoui_templatescomponent %})
* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
