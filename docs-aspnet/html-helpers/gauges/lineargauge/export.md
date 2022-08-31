---
title: Export
page_title: Export
description: "Learn the Export Options of the Telerik UI LinearGauge component for {{ site.framework }}."
slug: export_lineargaugehelper_aspnetcore
position: 4
---

# LinearGauge Export

The Telerik UI LinearGauge for {{ site.framework }} export relies on the [Telerik UI DrawingAPI library](https://docs.telerik.com/kendo-ui/framework/drawing/dom-elements/overview). It enables you to export the content to:

* [Export as PDF](#export-to-pdf)

* [Export as Image](#export-to-image)

* [Export as SVG](#export-to-svg)

## Export as PDF

The linear gauge allows you to retrieve the PDF representation of the content via the [exportPDF method](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/lineargauge/methods/exportpdf). The `base64` result can be forwarded to a service or downloaded on the client-side.

```HtmlHelper        
    <button class='export-pdf k-button'>Export as PDF</button>

    @(Html.Kendo().LinearGauge()
        .Name("linearGauge")
        .Scale(scale => scale
            .Min(0) 
            .Max(200)
        )
        .Pointer(pointer => pointer
            .Value(10)
        )
    )

    <script>
        $(document).ready( function () {
            $(".export-pdf").click(function () {
                var gauge = $("#linearGauge").getKendoLinearGauge();
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
    
    <kendo-lineargauge name="linearGauge">
        <scale min="0" max="200">
        </scale>
        <lineargauge-pointers>
            <pointer value="10"></pointer>
        </lineargauge-pointers>
    </kendo-lineargauge>

    <script>
        $(document).ready( function () {
            $(".export-pdf").click(function () {
                var gauge = $("#linearGauge").getKendoLinearGauge();
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

The linear gauge allows you to retrieve the Image representation of the content via the [exportImage method](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/lineargauge/methods/exportimage). The `base64` result can be forwarded to a service or downloaded on the client-side.

```HtmlHelper        
    <button class='export-img k-button'>Export as Image</button>

    @(Html.Kendo().LinearGauge()
        .Name("linearGauge") 
        .Scale(scale => scale
            .Min(0) 
            .Max(200)
        )
        .Pointer(pointer => pointer
            .Value(10)
        )
    )

    <script>
        $(document).ready( function () {
            $(".export-img").click(function () {
                var gauge = $("#linearGauge").getKendoLinearGauge();
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
    
    <kendo-lineargauge name="linearGauge">
        <scale min="0" max="200">
        </scale>
        <lineargauge-pointers>
            <pointer value="10"></pointer>
        </lineargauge-pointers>
    </kendo-lineargauge>

    <script>
        $(document).ready( function () {
            $(".export-img").click(function () {
                var gauge = $("#linearGauge").getKendoLinearGauge();
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

The linear gauge allows you to retrieve the Scalable Vector Graphics (SVG) representation of the content via the [exportSVG method](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/lineargauge/methods/exportsvg). The `base64` result can be forwarded to a service or downloaded on the client-side.

```HtmlHelper        
    <button class='export-svg k-button'>Export as SVG</button>

    @(Html.Kendo().LinearGauge()
        .Name("linearGauge")
        .Scale(scale => scale
            .Min(0) 
            .Max(200)
        )
        .Pointer(pointer => pointer
            .Value(10)
        )
    )

    <script>
        $(document).ready( function () {
            $(".export-svg").click(function () {
                var gauge = $("#linearGauge").getKendoLinearGauge();
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
    
    <kendo-lineargauge name="linearGauge">
        <scale min="0" max="200">
        </scale>
        <lineargauge-pointers>
            <pointer value="10"></pointer>
        </lineargauge-pointers>
    </kendo-lineargauge>

    <script>
        $(document).ready( function () {
            $(".export-svg").click(function () {
                var gauge = $("#linearGauge").getKendoLinearGauge();
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

* [Overview of the LinearGauge]({%slug overview_lineargaugehelper_aspnetcore%})
* [Scale of the LinearGauge]({%slug scale_lineargaugehelper_aspnetcore%})
