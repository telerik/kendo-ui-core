---
title: Export
page_title: Exporting the Map to PDF, SVG, and PNG
description: "Configure the export functionality of the Telerik UI Map component for {{ site.framework }} and print out its content to PDF, SVG, and PNG formats by using the available configurations of the Kendo UI Drawing graphics library."
slug: export_map_aspnetcore
position: 2
---

# Export

You can export the Telerik UI for {{ site.framework }} Map to a Document Format (PDF), Scalable Vector Graphics (SVG), and Portable Network Graphics (PNG) file format by using the [Kendo UI Drawing graphics library](https://docs.telerik.com/kendo-ui/framework/drawing/overview).

You can also save all file formats through the Kendo UI [`saveAs()`](https://docs.telerik.com/kendo-ui/api/javascript/kendo/methods/saveas) client-side method.

## Exporting to PDF

To export the Map to a PDF format document, use the [`exportPdf()`](https://docs.telerik.com/kendo-ui/api/javascript/drawing/methods/exportpdf) client-side method provided by the Kendo UI Drawing library.

```HtmlHelper
    @{
        var coordinates = new double[] { 30.268107, -97.744821 };
    }

    <div class="configurator">
        <div class="header">Export options</div>
        <div class="box-col">
            <button class='export-pdf'>Export as PDF</button>
        </div>
    </div>

    @(Html.Kendo().Map()
          .Name("map")
          .Center(30.2681, -97.7448)
          .Zoom(3)
          .Layers(layers =>
           {
               layers.Add()
                  .Style(style => style.Fill(fill => fill.Opacity(0.7)))
                  .Type(MapLayerType.Shape)
                  .DataSource(dataSource => dataSource
                      .GeoJson()
                      .Read(read => read.Url(Url.Content("~/shared/dataviz/map/countries-users.geo.json")))
                  );
           })
    )

    <!-- Load Pako ZLIB library to enable PDF compression -->
    <script src="@Url.Content("~/shared/pako.min.js")"></script>

    <script>
        $(document).ready( function () {
            $(".export-pdf").click(function () {
                // Convert the DOM element to a drawing by using kendo.drawing.drawDOM.
                kendo.drawing.drawDOM($("#map"))
                    .then(function (group) {
                        // Render the result as a PDF file.
                        return kendo.drawing.exportPDF(group, {
                            paperSize: "auto",
                            margin: { left: "1cm", top: "1cm", right: "1cm", bottom: "1cm" }
                        });
                    })
                    .done(function (data) {
                        // Save the PDF file.
                        kendo.saveAs({
                            dataURI: data,
                            fileName: "Map.pdf",
                            proxyURL: "@Url.Action("Export_Save", "Map")"
                        });
                    });
            });
        });
    </script>
```
{% if site.core %}
```TagHelper
    @{
        var coordinates = new double[] { 30.268107, -97.744821 };
    }

    <div class="configurator">
        <div class="header">Export options</div>
        <div class="box-col">
            <button class='export-pdf'>Export as PDF</button>
        </div>
    </div>

    <kendo-map name="map" center="coordinates" zoom="3">
        <layers>
            <layer type="MapLayerType.Shape">
                <map-style>
                    <fill opacity="0.7" />
                </map-style>
                <datasource custom-type="geojson">
                    <transport>
                        <read url="@Url.Content("~/shared/dataviz/map/countries-users.geo.json")" />
                    </transport>
                </datasource>
            </layer>
        </layers>
    </kendo-map>

    <!-- Load Pako ZLIB library to enable PDF compression -->
    <script src="@Url.Content("~/shared/pako.min.js")"></script>

    <script>
        $(document).ready( function () {
            $(".export-pdf").click(function () {
                // Convert the DOM element to a drawing by using kendo.drawing.drawDOM.
                kendo.drawing.drawDOM($("#map"))
                    .then(function (group) {
                        // Render the result as a PDF file.
                        return kendo.drawing.exportPDF(group, {
                            paperSize: "auto",
                            margin: { left: "1cm", top: "1cm", right: "1cm", bottom: "1cm" }
                        });
                    })
                    .done(function (data) {
                        // Save the PDF file.
                        kendo.saveAs({
                            dataURI: data,
                            fileName: "Map.pdf",
                            proxyURL: "@Url.Action("Export_Save", "Map")"
                        });
                    });
            });
        });
    </script>
```
{% endif %}

## Exporting to SVG 

To export the Map to an SVG format document, use the [`exportSvg()`](https://docs.telerik.com/kendo-ui/api/javascript/drawing/methods/exportsvg) client-side method provided by the Kendo UI Drawing library.

```HtmlHelper
    @{
        var coordinates = new double[] { 30.268107, -97.744821 };
    }

    <div class="configurator">
        <div class="header">Export options</div>
        <div class="box-col">
            <button class='export-svg'>Export as SVG</button>
        </div>
    </div>

    @(Html.Kendo().Map()
          .Name("map")
          .Center(30.2681, -97.7448)
          .Zoom(3)
          .Layers(layers =>
           {
               layers.Add()
                  .Style(style => style.Fill(fill => fill.Opacity(0.7)))
                  .Type(MapLayerType.Shape)
                  .DataSource(dataSource => dataSource
                      .GeoJson()
                      .Read(read => read.Url(Url.Content("~/shared/dataviz/map/countries-users.geo.json")))
                  );
           })
    )

    <script>
        $(document).ready( function () {

            $(".export-svg").click(function () {
                // Convert the DOM element to a drawing by using kendo.drawing.drawDOM.
                kendo.drawing.drawDOM($("#map"))
                    .then(function (group) {
                        // Render the result as an SVG document.
                        return kendo.drawing.exportSVG(group);
                    })
                    .done(function (data) {
                        // Save the SVG document.
                        kendo.saveAs({
                            dataURI: data,
                            fileName: "Map.svg",
                            proxyURL: "@Url.Action("Export_Save", "Map")"
                        });
                    });
            });

        });
    </script>
```
{% if site.core %}
```TagHelper
    @{
        var coordinates = new double[] { 30.268107, -97.744821 };
    }

    <div class="configurator">
        <div class="header">Export options</div>
        <div class="box-col">
            <button class='export-svg'>Export as SVG</button>
        </div>
    </div>

    
    <kendo-map name="map" center="coordinates" zoom="3">
        <layers>
            <layer type="MapLayerType.Shape">
                <map-style>
                    <fill opacity="0.7" />
                </map-style>
                <datasource custom-type="geojson">
                    <transport>
                        <read url="@Url.Content("~/shared/dataviz/map/countries-users.geo.json")" />
                    </transport>
                </datasource>
            </layer>
        </layers>
    </kendo-map>

    <script>
        $(document).ready( function () {

            $(".export-svg").click(function () {
                // Convert the DOM element to a drawing by using kendo.drawing.drawDOM.
                kendo.drawing.drawDOM($("#map"))
                    .then(function (group) {
                        // Render the result as a SVG document.
                        return kendo.drawing.exportSVG(group);
                    })
                    .done(function (data) {
                        // Save the SVG document.
                        kendo.saveAs({
                            dataURI: data,
                            fileName: "Map.svg",
                            proxyURL: "@Url.Action("Export_Save", "Map")"
                        });
                    });
            });

        });
    </script>
```
{% endif %}

## Exporting to PNG

To export the Map to a PNG format document, use the [`exportPNG()`](https://docs.telerik.com/kendo-ui/api/javascript/drawing/methods/exportsvg) client-side method provided by the Kendo UI Drawing library.

```HtmlHelper
    @{
        var coordinates = new double[] { 30.268107, -97.744821 };
    }

    <div class="configurator">
        <div class="header">Export options</div>
        <div class="box-col">
            <button class='export-img'>Export as Image</button>
        </div>
    </div>

    @(Html.Kendo().Map()
          .Name("map")
          .Center(30.2681, -97.7448)
          .Zoom(3)
          .Layers(layers =>
           {
               layers.Add()
                  .Style(style => style.Fill(fill => fill.Opacity(0.7)))
                  .Type(MapLayerType.Shape)
                  .DataSource(dataSource => dataSource
                      .GeoJson()
                      .Read(read => read.Url(Url.Content("~/shared/dataviz/map/countries-users.geo.json")))
                  );
           })
    )

    <script>
        $(document).ready( function () {

             $(".export-img").click(function () {
                // Convert the DOM element to a drawing by using kendo.drawing.drawDOM.
                kendo.drawing.drawDOM($("#map"))
                    .then(function (group) {
                        // Render the result as a PNG image.
                        return kendo.drawing.exportImage(group);
                    })
                    .done(function (data) {
                        // Save the image file.
                        kendo.saveAs({
                            dataURI: data,
                            fileName: "Map.png",
                            proxyURL: "@Url.Action("Export_Save", "Map")"
                        });
                    });
            });

        });
    </script>
```
{% if site.core %}
```TagHelper
    @{
        var coordinates = new double[] { 30.268107, -97.744821 };
    }

    <div class="configurator">
        <div class="header">Export options</div>
        <div class="box-col">
            <button class='export-img'>Export as Image</button>
        </div>
    </div>

        
    <kendo-map name="map" center="coordinates" zoom="3">
        <layers>
            <layer type="MapLayerType.Shape">
                <map-style>
                    <fill opacity="0.7" />
                </map-style>
                <datasource custom-type="geojson">
                    <transport>
                        <read url="@Url.Content("~/shared/dataviz/map/countries-users.geo.json")" />
                    </transport>
                </datasource>
            </layer>
        </layers>
    </kendo-map>

    <script>
        $(document).ready( function () {

             $(".export-img").click(function () {
                // Convert the DOM element to a drawing by using kendo.drawing.drawDOM.
                kendo.drawing.drawDOM($("#map"))
                    .then(function (group) {
                        // Render the result as a PNG image.
                        return kendo.drawing.exportImage(group);
                    })
                    .done(function (data) {
                        // Save the image file.
                        kendo.saveAs({
                            dataURI: data,
                            fileName: "Map.png",
                            proxyURL: "@Url.Action("Export_Save", "Map")"
                        });
                    });
            });

        });
    </script>
```
{% endif %}

## See Also

* [Exporting the Map HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/map/export)
* [Server-Side API of the Map for {{ site.framework }}](/api/map)