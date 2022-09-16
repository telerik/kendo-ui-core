---
title: Export
page_title: Export
description: "Learn the Export Options of the Telerik UI RadialGauge component for {{ site.framework }}."
slug: export_radialgaugehelper_aspnetcore
position: 4
---

# Radial Gauge Export

The Telerik UI RadialGauge for {{ site.framework }} export relies on the [Telerik UI DrawingAPI library](https://docs.telerik.com/kendo-ui/framework/drawing/dom-elements/overview). It enables you to export the content to:

* [Export as PDF](#export-to-pdf)

* [Export as Image](#export-to-image)

* [Export as SVG](#export-to-svg)

## Export as PDF

The radial gauge allows you to retrieve the PDF representation of the content via the [exportPDF method](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/radialgauge/methods/exportpdf). The `base64` result can be forwarded to a service or downloaded on the client-side.

```HtmlHelper        
    <button class='export-pdf k-button'>Export as PDF</button>
    
    @(Html.Kendo().RadialGauge()
        .Name("gauge")
        .Pointers(pointers =>
        {
            pointers.Add().Value(10).Color("#c20000").Length(0.5).Cap(c => c.Size(0.15).Color("red"));
        })
    )   

    <script>
        $(document).ready( function () {
            $(".export-pdf").click(function () {
                var gauge = $("#gauge").getKendoRadialGauge();
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

    <kendo-radialgauge name="gauge">
        <radialgauge-pointers>
            <pointer value="10" color="#c20000" length="0.5">
                <cap size="0.15" color="red"/>
            </pointer>
        </radialgauge-pointers>
    </kendo-radialgauge>

    <script>
        $(document).ready( function () {
            $(".export-pdf").click(function () {
                var gauge = $("#gauge").getKendoRadialGauge();
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

The radial gauge allows you to retrieve the Image representation of the content via the [exportImage method](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/radialgauge/methods/exportimage). The `base64` result can be forwarded to a service or downloaded on the client-side.

```HtmlHelper        
    <button class='export-img k-button'>Export as Image</button>

    @(Html.Kendo().RadialGauge()
        .Name("gauge")
        .Pointers(pointers =>
        {
            pointers.Add().Value(10).Color("#c20000").Length(0.5).Cap(c => c.Size(0.15).Color("red"));
        })
    )

    <script>
        $(document).ready( function () {
            $(".export-img").click(function () {
                var gauge = $("#gauge").getKendoRadialGauge();
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

    <kendo-radialgauge name="gauge">
        <radialgauge-pointers>
            <pointer value="10" color="#c20000" length="0.5">
                <cap size="0.15" color="red"/>
            </pointer>
        </radialgauge-pointers>
    </kendo-radialgauge>

    <script>
        $(document).ready( function () {
            $(".export-img").click(function () {
                var gauge = $("#gauge").getKendoRadialGauge();
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

The radial gauge allows you to retrieve the Scalable Vector Graphics (SVG) representation of the content via the [exportSVG method](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/radialgauge/methods/exportsvg). The `base64` result can be forwarded to a service or downloaded on the client-side.

```HtmlHelper        
    <button class='export-svg k-button'>Export as SVG</button>

    @(Html.Kendo().RadialGauge()
        .Name("gauge")
        .Pointers(pointers =>
        {
            pointers.Add().Value(10).Color("#c20000").Length(0.5).Cap(c => c.Size(0.15).Color("red"));
        })
    )

    <script>
        $(document).ready( function () {
            $(".export-svg").click(function () {
                var gauge = $("#gauge").getKendoRadialGauge();
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

    <kendo-radialgauge name="gauge">
        <radialgauge-pointers>
            <pointer value="10" color="#c20000" length="0.5">
                <cap size="0.15" color="red"/>
            </pointer>
        </radialgauge-pointers>
    </kendo-radialgauge>

    <script>
        $(document).ready( function () {
            $(".export-svg").click(function () {
                var gauge = $("#gauge").getKendoRadialGauge();
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

* [Overview of the RadialGauge]({%slug overview_radialgaugehelper_aspnetcore%})
* [Scale of the RadialGauge]({%slug scale_radialgaugehelper_aspnetcore%})
