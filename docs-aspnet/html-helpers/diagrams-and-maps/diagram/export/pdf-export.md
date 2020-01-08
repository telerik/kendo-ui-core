---
title: PDF Export
page_title: PDF Export
description: "Get started with the Telerik UI Diagram for {{ site.framework }} learn how to set the PDF export functionality."
slug: htmlhelpers_diagram_aspnetcore_pdf_export
position: 1
---

# PDF Export

The Diagram provides a built-in PDF export functionality.

For a runnable example, refer to the [demo on exporting the Diagram to PDF](https://demos.telerik.com/aspnet-mvc/diagram/pdf-export).

## Getting Started

To enable PDF export in the Diagram:

1. Introduce a button and handle its `click` event. Export the Diagram within the handler.

    ```HTML
        <button class='export-pdf k-button'>Save as PDF</button>
    ```
    ```JavaScrtipt
        <script>
            $(".export-pdf").click(function () {
                $("#diagram").getKendoDiagram().saveAsPDF();
            });
        </script>
    ```

1. Include the Pako Deflate library in the page to enable compression.

To enable PDF export in the Diagram through code, call the [`saveAsPdf`](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/diagram/methods/saveaspdf) method.

```Razor

    <button class='export-pdf k-button'>Save as PDF</button>

    @(Html.Kendo().Diagram()
          .Name("diagram")
          .Pdf(pdf => pdf
              .FileName("Kendo UI Diagram Export.pdf")
              .ProxyURL(Url.Action("Pdf_Export_Save", "Diagram"))
          )
          .DataSource(dataSource => dataSource
              .Read(read => read
                  .Action("Pdf_Export_Read", "Diagram")
              )
              .Model(m => m.Children("Items"))
          )
          .Editable(false)
          .Layout(l => l.Type(DiagramLayoutType.Layered))
          .ShapeDefaults(sd => sd
              .Visual("visualTemplate")
          )
          .ConnectionDefaults(cd => cd
              .Stroke(s => s
                  .Color("#979797")
                  .Width(2)
              )
          )
          .Events(events => events.DataBound("onDataBound"))
    )

```
```JavaScript
    <script>
        $(".export-pdf").click(function () {
            $("#diagram").getKendoDiagram().saveAsPDF();
        });

        function visualTemplate(options) {
            var dataviz = kendo.dataviz;
            var g = new dataviz.diagram.Group();
            var dataItem = options.dataItem;

            g.append(new dataviz.diagram.Rectangle({
                width: 210,
                height: 75,
                stroke: {
                    width: 0
                },
                fill: dataItem.ColorScheme
            }));

            /*
                Use the DejaVu Sans font for display and embedding in the PDF file.
                The standard PDF fonts have no support for Unicode characters.
            */
            g.append(new dataviz.diagram.TextBlock({
                text: dataItem.FirstName + " " + dataItem.LastName,
                fontFamily: "DejaVu Sans",
                fontSize: "14px",
                x: 85,
                y: 20,
                fill: "#fff"
            }));

            g.append(new dataviz.diagram.TextBlock({
                text: dataItem.Title,
                fontFamily: "DejaVu Sans",
                fontSize: "14px",
                x: 85,
                y: 40,
                fill: "#fff"
            }));

            g.append(new dataviz.diagram.Image({
                source: "@Url.Content("~/content/dataviz/diagram/people/")" + dataItem.Image,
                x: 3,
                y: 3,
                width: 68,
                height: 68
            }));

            return g;
        }

        function onDataBound() {
            this.bringIntoView(this.shapes);
        }
    </script>
```

## See Also

* [PDF Export of the Diagram HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/diagram/pdf-export)
* [Server-Side API](/api/diagram)
