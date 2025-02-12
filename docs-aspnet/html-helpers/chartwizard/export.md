---
title: Export Options
page_title: Telerik UI Chart Wizard Documentation - Export Options
description: "Learn more about the built-in export options of the Telerik UI for {{ site.framework }} Chart Wizard component."
slug: htmlhelpers_export_chartwizard
position: 3
---

# Export Options

By default, the generated chart in the Chart Wizard can be exported to `PDF`, `SVG`, or `PNG` formats.

For greater control over the exported file, configure the respective `Pdf()` and `Image()` export settings within the `ExportOptions()` configuration of the component. For example, you can specify the desired paper margins and size, title, image dimensions, and more.

The following example demonstrates how to customize the default export options of the Chart Wizard.

```HtmlHelper
    <div class="container">
        @(Html.Kendo().ChartWizard<Product>()
            .Name("chartwizard")
            .ExportOptions(export =>
            {
                export.Filename("Month_Report");
                export.Pdf(pdf => pdf.PaperSize("A4").Title("Month Report").Landscape(true));
                export.Image(image => image.Width(1900).Height(1200));
            })
            .DataSource(dataSource => dataSource
                .Read(read => read.Action("Read", "ChartWizard"))
            )
            .DataColumns(columns =>
            {
                columns.Add().Field(f => f.ProductName).Title("Product Name");
                columns.Add().Field(f => f.Quantity);
            })
        )
    </div>
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvcl

    <div class="container">
        <kendo-chartwizard name="chartwizard">
            <export-options filename="Month_Report">
                <pdf paper-size="A4" title="Month Report" landscape="true"/>
                <image width="1900" height="1200"/>
            </export-options>
            <datasource type="DataSourceTagHelperType.Ajax">
                <schema data="Data" total="Total" errors="Errors">
                    <model>
                        <fields>
                            <field name="ProductName" type="string"></field>
                            <field name="Quantity" type="number"></field>
                        </fields>
                    </model>
                </schema>
                <transport>
                    <read url="@Url.Action("Read", "ChartWizard")"/>
                </transport>
            </datasource>
            <data-columns>
                <data-column field="ProductName" title="Product Name"/>
                <data-column field="Quantity" />
            </data-columns>
        </kendo-chartwizard>
    </div>
```
{% endif %}

## See Also

* [Exporting the Chart Wizard for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/chartwizard/export-options)
* [Server-Side API of the Chart Wizard HtmlHelper](/api/chartwizard)
{% if site.core %}
* [Server-Side API of the Chart Wizard TagHelper](/api/taghelpers/chartwizard)
{% endif %}

