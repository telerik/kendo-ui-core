---
title: Getting Started
page_title: Getting Started - Kendo UI for jQuery PDF Export
description: "Get started with the jQuery PDF Export by Kendo UI and learn how to export the content of a page to PDF."
slug: getting_started_kendoui_pdf_export
position: 1
---

# Getting Started with PDF Export

This guide demonstrates how to use the Kendo UI for jQuery Drawing Library to export the content of a page to a PDF file.

After the completion of this guide, you will achieve the following result:

```dojo
    <button id="export">Export to PDF</button>
    <div id="container">
      <div id="chart"></div>
      <div id="grid"></div>
    </div>
    <script>
      $("#export").on("click", () => {
        kendo.drawing.drawDOM("#container", {
          margin: "2px", // configure some of the PDF options.
          paperSize: "A3",
          landscape: true,
          multiPage: true
        }).then(function(group){
          kendo.drawing.pdf.saveAs(group, "filename.pdf");
        });
      });

      $("#chart").kendoChart({
        dataSource: {
          data: getData()
        },
        seriesDefaults: {
          type: "line",
        },
        series: [{
          field: "value",
          categoryField: "year",
          name: "United States"
        }]
      });

      $("#grid").kendoGrid({
        dataSource: {
          data: getData()
        }
      })

      function getData() {
        return [
          {
            "country": "United States",
            "year": "1994",
            "value": 4.9
          },
          {
            "country": "United States",
            "year": "1995",
            "value": 9.2
          },
          {
            "country": "United States",
            "year": "1996",
            "value": 16.4
          },
          {
            "country": "United States",
            "year": "1997",
            "value": 21.6
          },
          {
            "country": "United States",
            "year": "1998",
            "value": 30.1
          },
          {
            "country": "United States",
            "year": "1999",
            "value": 35.9
          },
          {
            "country": "United States",
            "year": "2000",
            "value": 43.1
          },
          {
            "country": "United States",
            "year": "2001",
            "value": 49.2
          },
          {
            "country": "United States",
            "year": "2002",
            "value": 59.0
          },
          {
            "country": "United States",
            "year": "2003",
            "value": 61.9
          },
          {
            "country": "United States",
            "year": "2004",
            "value": 65
          },
          {
            "country": "United States",
            "year": "2005",
            "value": 68.3
          },
          {
            "country": "United States",
            "year": "2006",
            "value": 69.2
          }
        ];
      }
    </script>
```

## 1. Draw the Scene

Use the Drawing API to generate a drawing of the current scene.

```javascript
kendo.drawing.drawDOM("#container");
```

## 2. Configure the Options of the PDF

Set some of the options such as margins, landscape mode, and paper size:

```javascript
 kendo.drawing.drawDOM("#container", {
    margin: "2px", // configure some of the PDF options.
    paperSize: "A3",
    landscape: true,
    multiPage: true
 });
```

## 3. Export the Scene to PDF

Export the generated scene to a PDF file:

```javascript
.then(function(group){
    kendo.drawing.pdf.saveAs(group, "filename.pdf");
});
```

## (Optional) 4. Convert to Data URI or Blob

You can convert the generated PDF to Data URI or a Blob. By doing so you can attach the file to a form that can be submitted later on.

```javascript
    kendodrawing.pdf.toBlob(group, function(blob){
        // You can now upload it to a server.
        // This form simulates an <input type="file" name="pdfFile" />.
        var form = new FormData();
        form.append("pdfFile", blob);

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/posturl", true);
        xhr.send(form);
    });

    // Alternatively, you can get it as a data URL.
    kendo.drawing.pdf.toDataURL(group, function(dataURL){ ... });
```

## Next Steps

* [Drawing Library Overview]({% slug overview_kendoui_drawingapi %})
* [Drawing HTML Elements Overview]({% slug drawingofhtmlelements_drawingapi %})
* [Saving Files]({% slug overview_savingfiles_kendoui %})

## See Also 

* [Knowledge Base Section](/knowledge-base)

