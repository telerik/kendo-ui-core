---
title: Templates
page_title: Templates
description: "Get started with the Telerik UI PivotGridV2 HtmlHelper for {{ site.framework }} and learn about the available template options."
slug: htmlhelpers_pivotgridv2_aspnetcore_templates
position: 5
---

# Templates

The Telerik UI PivotGridV2 HtmlHelper for {{ site.framework }} provides built-in templates, which allow you to customize the way the data is displayed in the table.

The templates use the [Kendo UI Templates syntax](https://docs.telerik.com/kendo-ui/framework/templates/overview).

The available types of PivotGridV2 templates are:
* [Data cell template](#data-cell-template)
* [Column header template](#column-header-template)
* [Row header template](#row-header-template)

For a live example, see the [PivotGridV2 Templates](https://demos.telerik.com/{{ site.platform }}/pivotgridv2/templates) demo.

## Data Cell Template

The data cell template is the [template](https://docs.telerik.com/kendo-ui/api/javascript/kendo/methods/template) which renders the content of the data cell. By default, it renders the `fmtValue` formatted value of the data item.

In the data cell template, you can access the following fields:
* `columnTuple`&mdash;The tuple of the corresponding column header cell.
* `rowTuple`&mdash;The tuple of the corresponding row header cell.
* `measure`&mdash;The value of the data cell measure.
* `dataItem`&mdash;The data item itself.

```HtmlHelper
    @(Html.Kendo().PivotGrid()
        .Name("pivotgrid")
        .ColumnWidth(200)
        .Height(570)
        .DataCellTemplateId("dataCellTemplate")
        // Other configuration.
    )
```
{% if site.core %}
```TagHelper
    <kendo-pivotgridv2 name="pivotgrid" column-width="200" height="570" cell-template-id="dataCellTemplate">
        <!--Other configuration. -->
    </kendo-pivotgridv2>
````
{% endif %}
```Template
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
```

## Column Header Template

The column header template is the [template](https://docs.telerik.com/kendo-ui/api/javascript/kendo/methods/template) which renders the content of the column header cell. By default, it renders the caption of the tuple member.

In the column header template, you can access the following fields:
* `member`&mdash;The member of the corresponding column header cell.
* `tuple`&mdash;The tuple of the corresponding column header cell.

```HtmlHelper
    @(Html.Kendo().PivotGridV2()
        .Name("pivotgridv2")
        .ColumnWidth(200)
        .Height(570)
        .ColumnHeaderTemplateId("headerTemplate")
        // other configuration settings
    )
```
{% if site.core %}
```TagHelper
    <kendo-pivotgridv2 name="pivotgrid" column-width="200" height="570" column-header-template-id="headerTemplate">
        <!--Other configuration. -->
    </kendo-pivotgridv2>
````
{% endif %}
```Template
    <script id="headerTemplate" type="text/x-kendo-tmpl">
        # if (!member.children.length) { #
            <em>#: member.caption #</em>
        # } else { #
            #: member.caption #
        # } #
    </script>
```

## Row Header Template

The row header template is the [template](https://docs.telerik.com/kendo-ui/api/javascript/kendo/methods/template) which renders the content of the row header cell. By default, it renders the caption of the tuple member.

In the row header template, you can access the following fields:
* `member`&mdash;The member of the corresponding column header cell.
* `tuple`&mdash;The tuple of the corresponding column header cell.

```HtmlHelper
    @(Html.Kendo().PivotGridV2()
        .Name("pivotgridv2")
        .ColumnWidth(200)
        .Height(570)
        .RowHeaderTemplateId("headerTemplate")
        // other configuration settings
    )
```
{% if site.core %}
```TagHelper
    <kendo-pivotgridv2 name="pivotgrid" column-width="200" height="570" row-header-template-id="headerTemplate">
        <!--Other configuration. -->
    </kendo-pivotgridv2>
````
{% endif %}
```Template
    <script id="headerTemplate" type="text/x-kendo-tmpl">
        # if (!member.children.length) { #
            <em>#: member.caption #</em>
        # } else { #
            #: member.caption #
        # } #
    </script>
```


## See Also

* [Templates in the Telerik UI PivotGridV2 HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/pivotgridv2/templates)
* [Server-side API](/api/pivotgridv2)
