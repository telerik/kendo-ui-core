---
title: Export
page_title: Export
description: "Learn the Export Options of the Telerik UI ArcGauge component for {{ site.framework }}."
slug: export_arcgaugehelper_aspnetcore
position: 4
---

# Arc Gauge Export

The Telerik UI ArcGauge for {{ site.framework }} export relies on the [Telerik UI DrawingAPI library](https://docs.telerik.com/kendo-ui/framework/drawing/dom-elements/overview). It enables you to export the content to:

* [Export as PDF](#export-to-pdf)

* [Export as Image](#export-to-image)

* [Export as SVG](#export-to-svg)

## Export as PDF

The arc gauge allows you to retrieve the PDF representation of the content via the [exportPDF method](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/arcgauge/methods/exportpdf). The `base64` result can be forwarded to a service or downloaded on the client-side.

```HtmlHelper        
    <button class='export-pdf k-button'>Export as PDF</button>
    
    @(Html.Kendo().ArcGauge()
        .Name("gauge")
        .Value(65)
        .Scale(x => x.MajorUnit(20).MinorUnit(5))
    )

    <script>
        $(document).ready( function () {
            $(".export-pdf").click(function () {
                var gauge = $("#gauge").getKendoArcGauge();
                gauge.exportPDF({ paperSize: "auto", margin: { left: "1cm", top: "1cm", right: "1cm", bottom: "1cm" } }).done(function (data) {
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
    <button class='export-pdf k-button'>Export as PDF</button>

    <kendo-arcgauge name="gauge" value="65">
        <scale major-unit="20" minor-unit="5">
        </scale>
    </kendo-arcgauge>

    <script>
        $(document).ready( function () {
            $(".export-pdf").click(function () {
                var gauge = $("#gauge").getKendoArcGauge();
                gauge.exportPDF({ paperSize: "auto", margin: { left: "1cm", top: "1cm", right: "1cm", bottom: "1cm" } }).done(function (data) {
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

The arc gauge allows you to retrieve the Image representation of the content via the [exportImage method](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/arcgauge/methods/exportimage). The `base64` result can be forwarded to a service or downloaded on the client-side.

```HtmlHelper     
    <button class='export-img k-button'>Export as Image</button>

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
    <button class='export-img k-button'>Export as Image</button>
    
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

The arc gauge allows you to retrieve the Scalable Vector Graphics (SVG) representation of the content via the [exportSVG method](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/arcgauge/methods/exportsvg). The `base64` result can be forwarded to a service or downloaded on the client-side.

```HtmlHelper        
    <button class='export-svg k-button'>Export as SVG</button>

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
    <button class='export-svg k-button'>Export as SVG</button>
    
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
* [scale of the ArcGauge]({%slug scale_arcgaugehelper_aspnetcore%})