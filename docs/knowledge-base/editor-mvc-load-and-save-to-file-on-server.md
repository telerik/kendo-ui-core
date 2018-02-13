---
title: Pre-Populate and Save Editor Data to DOCX Server-Side
description: An example on how to pre-load and save the Kendo UI MVC Editor value from a file on the server.
type: how-to
page_title: Load and Save Editor Value from docx File on the Server | UI for ASP.NET MVC Editor
slug: editor-mvc-load-and-save-to-file-on-server
tags: kendo, kendoui, MVC, editor, load-save-from-server, document-processing, formatprovider
ticketid: 1141852
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Editor for ASP.NET MVC</td>
 </tr>
</table>


## Description

How can I implement the following requirements?

1. I need to pre-populate Editor with the data from a server-side `.docx` file. At the time of the initial loading, the widget data should come from a server-side file so that the widget gets pre-populated with data.
1. I need to place a simple button above the widget area&mdashh;for example, **Save**. On a button click, the Editor data should be sent and saved to a `.docx` file on the server.

## Solution

Use the [`Telerik DocumentProcessing`](https://docs.telerik.com/devtools/document-processing/introduction) library. It ships as a part of the [Telerik UI for ASP.NET MVC](https://docs.telerik.com/aspnet-mvc/introduction) suite. Reference the `Telerik.Windows.Documents.Core.dll` and the `Telerik.Windows.Documents.Flow.dll` assemblies in your project.

To implement the approach:   

1. Include the required libraries in the Controller class:

    ````C#
    	using System.IO;
    	using System.Web;
    	using System.Web.Mvc;
    	using Telerik.Windows.Documents.Flow.FormatProviders.Docx;
    	using Telerik.Windows.Documents.Flow.FormatProviders.Html;
    	using Telerik.Windows.Documents.Flow.Model;
    ````

1. In the Index controller action, the `.docx` file is loaded in a [`RadFlowDocument`](https://docs.telerik.com/devtools/document-processing/libraries/radwordsprocessing/model/radflowdocument) by using the [`DocxFormatProvider`](https://docs.telerik.com/devtools/document-processing/libraries/radwordsprocessing/formats-and-conversion/docx/docxformatprovider) class. Then the content of the document is exported to an HTML string by using the [`HtmlFormatProvider`](https://docs.telerik.com/devtools/document-processing/libraries/radwordsprocessing/formats-and-conversion/html/htmlformatprovider) class and is assigned to a filed in the ViewBag.  

    ````C#
    	public ActionResult Index()
    	{
    		string fileLocation = Server.MapPath("~/App_Data/SampleDocument.docx");

    		DocxFormatProvider docxProvider = new DocxFormatProvider();
    		HtmlFormatProvider htmlProvider = new HtmlFormatProvider();
    		RadFlowDocument document = null;

    		using (FileStream input = new FileStream(fileLocation, FileMode.Open))
    		{
    			document = docxProvider.Import(input);
    		}

    		string html = htmlProvider.Export(document);
    		ViewBag.editorValue = html;

    		return View();
    	}
    ````

1. In the Index view, the Editor loads its value from the ViewBag field.  

    ````C#
    	@(Html.Kendo().Editor()
    		.Name("editor")
    		.Value(ViewBag.editorValue)
    	)
    ````

1. To execute the save logic, use a button click handler.

    ````C#
    	@(Html.Kendo().Button()
    	    .Name("button")
    	    .Content("Click to save changed contents")
    	    .Events(e => e.Click("onClick"))
    	)
    ````

1. Send the [`encodedValue`](https://docs.telerik.com/kendo-ui/api/javascript/ui/editor/methods/encodedvalue) of the Editor to the server.

    ````JavaScript
    	function onClick() {
    		var editorContents = $('#editor').data('kendoEditor').encodedValue();

    		$.post('@Url.Action("Save", "Home")', {
    				data: editorContents
    			},
    			function (e) {
    				alert('Editor saved on server!');
    			}
    		);
    	}
    ````

1. On the server, the encoded string that was sent is decoded. Then its value is loaded in a [`RadFlowDocument`](https://docs.telerik.com/devtools/document-processing/libraries/radwordsprocessing/model/radflowdocument) by using [`HtmlFormatProvider`](https://docs.telerik.com/devtools/document-processing/libraries/radwordsprocessing/formats-and-conversion/html/htmlformatprovider). The document is then exported (saved) on the server by using [`DocxFormatProvider`](https://docs.telerik.com/devtools/document-processing/libraries/radwordsprocessing/formats-and-conversion/docx/docxformatprovider).  

    ````C#
    	public ActionResult Save(string data)
    	{
    		string html = HttpUtility.HtmlDecode(data);
    		string fileLocation = Server.MapPath("~/App_Data/SampleDocument.docx");

    		HtmlFormatProvider htmlProvider = new HtmlFormatProvider();
    		DocxFormatProvider docxProvider = new DocxFormatProvider();
    		RadFlowDocument document = htmlProvider.Import(html);

    		using (Stream output = System.IO.File.Create(fileLocation))
    		{
    			docxProvider.Export(document, output);
    		}

    		return new HttpStatusCodeResult(200);
    	}
    ````

## See Also

* [Kendo UI Editor JavaScript API Reference](https://docs.telerik.com/kendo-ui/api/javascript/ui/editor)
* [Telerik DocumentProcessing Library](https://docs.telerik.com/devtools/document-processing/introduction)
