---
title: Repeated Table Headers
page_title: Repeated Table Headers | Kendo UI Drawing Library
description: "Render table headers on each page when you export content in PDF with the Kendo UI Drawing library."
previous_url: /framework/drawing/drawing-dom#recurrent-table-headers
slug: recurrenttableheaders_drawing
position: 10
---

# Repeated Table Headers

The Drawing library enables you to render recurrent table headers.

If you want the `<thead>` elements, or the headers of Kendo UI Grid widgets, to be repeated on each page, pass the `repeatHeaders: true` option.

```dojo

    <script>
      function exportPDF(){
        kendo.drawing.drawDOM("#grid", {
           paperSize: "A4",
           margin: "2cm",
           landscape: true,
           forcePageBreak: ".my-page-break",
           repeatHeaders:true
        }).then(function(group){
          kendo.drawing.pdf.saveAs(group, "filename.pdf");
        });
      }
    </script>

    <button class="k-button" onclick="exportPDF()">Export</button>
    <table id="grid">
      <thead>
        <tr>
          <th>Car Make</th>
          <th>Car Model</th>
          <th>Year</th>
          <th>Category</th>
          <th>Air Conditioner</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Volvo</td>
          <td>S60</td>
          <td>2010</td>
          <td>Saloon</td>
          <td>Yes</td>
        </tr>
        <tr>
          <td>Audi</td>
          <td>A4</td>
          <td>2002</td>
          <td>Saloon</td>
          <td>Yes</td>
        </tr>
        <tr>
          <td>BMW</td>
          <td>535d</td>
          <td>2006</td>
          <td>Saloon</td>
          <td>Yes</td>
        </tr>
        <tr>
          <td>BMW</td>
          <td>320d</td>
          <td>2006</td>
          <td>Saloon</td>
          <td>No</td>
        </tr>
        <tr class="my-page-break">
          <td>VW</td>
          <td>Passat</td>
          <td>2008</td>
          <td>Saloon</td>
          <td >Yes</td>
        </tr>
        <tr>
          <td>Peugeot</td>
          <td>407</td>
          <td>2006</td>
          <td>Saloon</td>
          <td>Yes</td>
        </tr>
        <tr>
          <td>Honda</td>
          <td>Accord</td>
          <td>2008</td>
          <td>Saloon</td>
          <td>No</td>
        </tr>
        <tr>
          <td>Alfa Romeo</td>
          <td>159</td>
          <td>2008</td>
          <td>Saloon</td>
          <td>No</td>
        </tr>
        <tr>
          <td>Nissan</td>
          <td>Almera</td>
          <td>2001</td>
          <td>Saloon</td>
          <td>Yes</td>
        </tr>
        <tr>
          <td>Mitsubishi</td>
          <td>Lancer</td>
          <td>2008</td>
          <td>Saloon</td>
          <td>Yes</td>
        </tr>
      </tbody>
    </table>
```

## See Also

* [Multi-Page Content]({% slug multipagecontent_drawing %})
* [Drawing Basic Shapes]({% slug basicshapes_drawingapi %})
* [Drawing DOM Elements]({% slug drawingofhtmlelements_drawingapi %})
* [Limitations and Browser Support for Kendo UI Drawing API]({% slug supportedbrowsers_drawingapi %})
