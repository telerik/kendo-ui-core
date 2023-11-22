---
title: Export
page_title: Export
description: "Explore the export options of the Telerik UI ArcGauge component for {{ site.framework }}."
slug: export_arcgaugehelper_aspnetcore
position: 4
---

# Export

The ArcGauge export functionality relies on the [Kendo UI Drawing library](https://docs.telerik.com/kendo-ui/framework/drawing/overview). It enables you to export the ArcGauge to any of the following formats:

* [Export to PDF](#export-to-pdf)

* [Export as Image](#export-as-image)

* [Export as SVG](#export-as-svg)

## Export to PDF

The ArcGauge allows you to retrieve the PDF representation of the content through the [`exportPDF()` method](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/arcgauge/methods/exportpdf). The `base64` result can be forwarded to a remote endpoint or downloaded client-side.

```HtmlHelper        
    <button class='export-pdf k-button k-button-md k-rounded-md k-button-solid k-button-solid-base'>Export to PDF</button>
    
    @(Html.Kendo().ArcGauge()
        .Name("gauge")
        .Value(65)
        .Scale(x => x.MajorUnit(20).MinorUnit(5))
    )

    <script>
        $(document).ready( function () {
            $(".export-pdf").on("click", function () {
                var gauge = $("#gauge").getKendoArcGauge();
                gauge.exportPDF({ 
                    paperSize: "auto", 
                    margin: { left: "1cm", top: "1cm", right: "1cm", bottom: "1cm" } 
                }).done(function (data) {
                    kendo.saveAs({
                        dataURI: data,
                        fileName: "chart.pdf",
                        proxyURL: "https://demos.telerik.com/kendo-ui/service/export"
                    });
                });
            });
        });
    </script>
```
{% if site.core %}
```TagHelper
    <button class='export-pdf k-button k-button-md k-rounded-md k-button-solid k-button-solid-base'>Export to PDF</button>

    <kendo-arcgauge name="gauge" value="65">
        <scale major-unit="20" minor-unit="5">
        </scale>
    </kendo-arcgauge>

    <script>
        $(document).ready( function () {
            $(".export-pdf").on("click", function () {
                var gauge = $("#gauge").getKendoArcGauge();
                gauge.exportPDF({ 
                    paperSize: "auto", 
                    margin: { left: "1cm", top: "1cm", right: "1cm", bottom: "1cm" } 
                }).done(function (data) {
                    kendo.saveAs({
                        dataURI: data,
                        fileName: "chart.pdf",
                        proxyURL: "https://demos.telerik.com/kendo-ui/service/export"
                    });
                });
            });
        });
    </script>
```
{% endif %}

## Export as Image

You can retrieve the image representation of the ArcGauge content by using the [`exportImage()` method](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/arcgauge/methods/exportimage). The `base64` result can be forwarded to a service or downloaded client-side.

```HtmlHelper     
    <button class='export-img k-button k-button-md k-rounded-md k-button-solid k-button-solid-base'>Export as Image</button>

    @(Html.Kendo().ArcGauge()
        .Name("gauge")
        .Value(65)
        .Scale(x => x.MajorUnit(20).MinorUnit(5))
    )

    <script>
        $(document).ready( function () {
            $(".export-img").click(function () {
                var gauge = $("#gauge").getKendoArcGauge();
                gauge.exportImage().done(function (data) {
                    kendo.saveAs({
                        dataURI: data,
                        fileName: "chart.png",
                        proxyURL: "https://demos.telerik.com/kendo-ui/service/export"
                    });
                });
            });
        });
    </script>
```
{% if site.core %}
```TagHelper
    <button class='export-img k-button k-button-md k-rounded-md k-button-solid k-button-solid-base'>Export as Image</button>
    
    <kendo-arcgauge name="gauge" value="65">
        <scale major-unit="20" minor-unit="5">
        </scale>
    </kendo-arcgauge>

    <script>
        $(document).ready( function () {
            $(".export-img").click(function () {
                var gauge = $("#gauge").getKendoArcGauge();
                gauge.exportImage().done(function (data) {
                    kendo.saveAs({
                        dataURI: data,
                        fileName: "chart.png",
                        proxyURL: "https://demos.telerik.com/kendo-ui/service/export"
                    });
                });
            });
        });
    </script>
```
{% endif %}

## Export as SVG

You can use the [`exportSVG()` method](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/arcgauge/methods/exportsvg) to export the ArcGauge as a Scalable Vector Graphics (SVG). The `base64` result can be forwarded to a service or downloaded on the client.

```HtmlHelper        
    <button class='export-svg k-button k-button-md k-rounded-md k-button-solid k-button-solid-base'>Export as SVG</button>

    @(Html.Kendo().ArcGauge()
        .Name("gauge")
        .Value(65)
        .Scale(x => x.MajorUnit(20).MinorUnit(5))
    )

    <script>
        $(document).ready( function () {
            $(".export-svg").click(function () {
                var gauge = $("#gauge").getKendoArcGauge();
                gauge.exportSVG().done(function (data) {
                    kendo.saveAs({
                        dataURI: data,
                        fileName: "chart.svg",
                        proxyURL: "https://demos.telerik.com/kendo-ui/service/export"
                    });
                });
            });
        });
    </script>
```
{% if site.core %}
```TagHelper
    <button class='export-svg k-button k-button-md k-rounded-md k-button-solid k-button-solid-base'>Export as SVG</button>
    
    <kendo-arcgauge name="gauge" value="65">
        <scale major-unit="20" minor-unit="5">
        </scale>
    </kendo-arcgauge>

    <script>
        $(document).ready( function () {
            $(".export-svg").click(function () {
                var gauge = $("#gauge").getKendoArcGauge();
                gauge.exportSVG().done(function (data) {
                    kendo.saveAs({
                        dataURI: data,
                        fileName: "chart.svg",
                        proxyURL: "https://demos.telerik.com/kendo-ui/service/export"
                    });
                });
            });
        });
    </script>
```
{% endif %}


## See Also

* [Overview of the ArcGauge]({%slug overview_arcgaugehelper_aspnetcore%})
* [Configuring the ArcGauge Colors]({%slug colors_arcgaugehelper_aspnetcore%})