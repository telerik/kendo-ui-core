---
title: Templates
page_title: jQuery PivotGridV2 Documentation - Templates
description: "Get started with the jQuery PivotGridV2 by Kendo UI and learn how to use its templates."
slug: templates_kendoui_pivotgridv2
position: 3
---

# Templates

The Kendo UI PivotGridV2 provides the built-in functionality to change the appearance of the rendered data by using [templates](% slug overview_kendoui_templatescomponent %).

For a live example, visit the [PivotGridV2 Templates](https://demos.telerik.com/kendo-ui/pivotgridv2/templates) demo.

## Template Configurations

The PivotGridV2 offers three template configurations:

- [`dataCellTemplate`](/api/javascript/ui/pivotgridv2/configuration/datacelltemplate)—Changes the appearance of each data cell.
- [`columnHeaderTemplate`](/api/javascript/ui/pivotgridv2/configuration/columnheadertemplate)—Changes the appearance of each column header.
- [`rowHeaderTemplate`](/api/javascript/ui/pivotgridv2/configuration/rowheadertemplate)—Changes the appearance of each row header.

The following example demonstrates how to set-up a `dataCellTemplate`:

    <script id="dataCellTemplate" type="text/x-kendo-tmpl">
        # if (!dataItem) { #
             <em>N/A</em> <!-- This value will be rendered if there is no available data for the specific cell. -->
         # } else { #
             <b><span style='color: green;'>#: dataItem.fmtValue #</span></b> <!-- In all other cases the formatted value will be rendered in green color. -->
         # } #
    </script>

    $("#pivotgrid").kendoPivotGridV2({
        dataCellTemplate: $("#dataCellTemplate").html()
    });

The following example demonstrates how to set-up both a `columnHeaderTemplate` and a `rowHeaderTemplate` at once:

    <script id="headerTemplate" type="text/x-kendo-tmpl">
        <b>#: member.caption #</b> <!-- Display the column/row title in bold. -->
    </script>

    $("#pivotgrid").kendoPivotGridV2({
        columnHeaderTemplate: $("#headerTemplate").html(),
        rowHeaderTemplate: $("#headerTemplate").html()
    });

## See also

* [PivotGridV2 Templates (Demo)](https://demos.telerik.com/kendo-ui/pivotgridv2/templates)
* [PivotGridV2 JavaScript API Reference](/api/javascript/ui/pivotgridv2)