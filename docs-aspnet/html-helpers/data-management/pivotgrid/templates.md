---
title: Templates
page_title: Templates
description: "Get started with the Telerik UI PivotGrid HtmlHelper for {{ site.framework }} and learn about the provided templating options."
slug: htmlhelpers_pivotgrid_aspnetcore_templates
position: 5
---

# Templates

The Telerik UI PivotGrid HtmlHelper for {{ site.framework }} provides templating options that can be used to customize the way its data is visualized in the table.

Under the hood, the templates use the [Kendo UI Templates syntax](https://docs.telerik.com/kendo-ui/framework/templates/overview).

To use templates in the PivotGrid, apply any of the available template options:
* [Data cell template](#data-cell-template)
* [Column header template](#column-header-template)
* [Row header template](#row-header-template)

## Data Cell Template

The data cell template is the [template](https://docs.telerik.com/kendo-ui/api/javascript/kendo/methods/template) which renders the content of the data cell. By default, it renders the `fmtValue` formatted value of the data item.

In the data cell template, you can use the following fields:
* `columnTuple`&mdash;The tuple of the corresponding column header cell.
* `rowTuple`&mdash;The tuple of the corresponding row header cell.
* `measure`&mdash;The value of the data cell measure.
* `dataItem`&mdash;The data item itself.

    @(Html.Kendo().PivotGrid()
        .Name("pivotgrid")
        .ColumnWidth(200)
        .Height(570)
        .DataCellTemplateId("dataCellTemplate")
        // Other configuration.
    )

    <script id="dataCellTemplate" type="text/x-kendo-tmpl">
        # var columnMember = columnTuple ? columnTuple.members[0] : { children: [] }; #
        # var rowMember = rowTuple ? rowTuple.members[0] : { children: [] }; #
        # var value = kendo.toString(kendo.parseFloat(dataItem.value) || "N/A", "c2"); #

        # if (columnMember.children.length || rowMember.children.length) { #
            <em  style="color: red">#: value # (total)</em>
        # } else { #
            #: value #
        # } #
    </script>

## Column Header Template

The column header template is the [template](https://docs.telerik.com/kendo-ui/api/javascript/kendo/methods/template) which renders the content of the column header cell. By default, it renders the caption of the tuple member.

In the column header template, you can use the following fields:
* `member`&mdash;The member of the corresponding column header cell.
* `tuple`&mdash;The tuple of the corresponding column header cell.

    @(Html.Kendo().PivotGrid()
        .Name("pivotgrid")
        .ColumnWidth(200)
        .Height(570)
        .ColumnHeaderTemplateId("headerTemplate")
        // other configuration settings
    )

    <script id="headerTemplate" type="text/x-kendo-tmpl">
        # if (!member.children.length) { #
            <em>#: member.caption #</em>
        # } else { #
            #: member.caption #
        # } #
    </script>

## Row Header Template

The row header template is the [template](https://docs.telerik.com/kendo-ui/api/javascript/kendo/methods/template) which renders the content of the row header cell. By default, it renders the caption of the tuple member.

In the row header template, you can use the following fields:
* `member`&mdash;The member of the corresponding column header cell.
* `tuple`&mdash;The tuple of the corresponding column header cell.

    @(Html.Kendo().PivotGrid()
        .Name("pivotgrid")
        .ColumnWidth(200)
        .Height(570)
        .ColumnHeaderTemplateId("headerTemplate")
        // other configuration settings
    )

    <script id="headerTemplate" type="text/x-kendo-tmpl">
        # if (!member.children.length) { #
            <em>#: member.caption #</em>
        # } else { #
            #: member.caption #
        # } #
    </script>

## See Also

* [Templates in the Telerik UI PivotGrid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/pivotgrid/templates)
* [Server-side API](/api/pivotgrid)
