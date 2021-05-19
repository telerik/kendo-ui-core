---
title: Exclude Content from PDF Export with Drawing API
description: An example on how to exclude specific content while exporting to PDF by using the Kendo UI Drawing API.
type: how-to
page_title: Prevent the Export of Content to PDF | Kendo UI Drawing Library
slug: pdf-export-exclude-content
tags: pdf, export, content, exclude, drawing, api
ticketid: 1135598
res_type: kb
component: drawing-api
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Drawing API</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I exclude elements within the exported content and prevent them from being exported to PDF?

## Solution

Elements that you do not want to be exported can be hidden just before the export begins by using CSS and then shown again after the export finishes. This is possible by adding the special `k-pdf-export` class to the selector of a CSS rule that hides the specified elements. The special class is automatically added to the elements just before the start of the export process and removed when it finishes. Hiding the elements for the duration of the export excludes them from the exported PDF.

```dojo
	<div id="example">
		<button class='export-pdf k-button'>Export as PDF</button>
	    <div class="container">
	      Export the container's content, but exclude the next element:
	      <h4 class="noExport">Element that will be excluded from export</h4>
	    </div>
	</div>
	<style>
	  .k-pdf-export .noExport {
	    display: none;
	  }
	</style>
	<script>
	  $(document).ready(function() {
	      $(".export-pdf").click(function() {
	          // Convert the DOM element to a drawing using kendo.drawing.drawDOM
	          kendo.drawing.drawDOM($(".container"))
	          .then(function(group) {
	              // Render the result as a PDF file
	              return kendo.drawing.exportPDF(group, {
	                  paperSize: "a4",
	                  margin: { left: "1cm", top: "1cm", right: "1cm", bottom: "1cm" }
	              });
	          })
	          .done(function(data) {
	              // Save the PDF file
	              kendo.saveAs({
	                  dataURI: data,
	                  fileName: "Example.pdf",
	                  proxyURL: "https://demos.telerik.com/kendo-ui/service/export"
	              });
	          });
	      });
	  });
	</script>
```
