---
title: Pre-Populate and Save Editor Data to DOCX Server-Side
description: An example of how to pre-load and save the MVC Editor value from a file on the server.
type: how-to
page_title: Load and Save Editor Value from docx File on the Server | UI for ASP.NET MVC Editor
slug: editor-mvc-load-and-save-to-file-on-server
position: 
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
I have the following two requirements:

1. I need to pre-populate editor with server-side .docx file. At the time of initial loading, the widget data should come from a server side file so that the widget gets pre-populated with data.

1. I need to place a simple button above the widget area like "Save". On a button click, the Editor data should be sent and saved to a .docx file on the server.

## Solution
To achieve the desired the [`Telerik DocumentProcessing`](https://docs.telerik.com/devtools/document-processing/introduction) library should be used. It ships as a part of the [Telerik UI for ASP.NET MVC](https://docs.telerik.com/aspnet-mvc/introduction) suite. The `Telerik.Windows.Documents.Core.dll` and the `Telerik.Windows.Documents.Flow.dll` assemblies should be referenced in the project.

The following are the required implementation steps:  
  
* Include the required libraries in the Controller class:

````C#
	using System.IO;
	using System.Web;
	using System.Web.Mvc;
	using Telerik.Windows.Documents.Flow.FormatProviders.Docx;
	using Telerik.Windows.Documents.Flow.FormatProviders.Html;
	using Telerik.Windows.Documents.Flow.Model;
````
  
* In the Index controller action, the .docx file is loaded in a [`RadFlowDocument`](https://docs.telerik.com/devtools/document-processing/libraries/radwordsprocessing/model/radflowdocument) using the [`DocxFormatProvider`](https://docs.telerik.com/devtools/document-processing/libraries/radwordsprocessing/formats-and-conversion/docx/docxformatprovider) class. Then the content of the document is exported to an HTML string using the [`HtmlFormatProvider`](https://docs.telerik.com/devtools/document-processing/libraries/radwordsprocessing/formats-and-conversion/html/htmlformatprovider) class and it is assigned to a filed in the ViewBag:  

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
  
* In the Index view, the Editor loads its value from the above ViewBag field:  

````C#
	@(Html.Kendo().Editor()
		.Name("editor")
		.Value(ViewBag.editorValue)
	)
````
  
* A button click handler is used to execute the save logic:

````C#
	@(Html.Kendo().Button()
	    .Name("button")
	    .Content("Click to save changed contents")
	    .Events(e => e.Click("onClick"))
	)
````

* The encoded value from the [`Editor`](https://docs.telerik.com/kendo-ui/api/javascript/ui/editor#methods-encodedValue) is sent to the server  

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
  
* On the server, the sent encoded string is decoded. Then its value is loaded in a [`RadFlowDocument`](https://docs.telerik.com/devtools/document-processing/libraries/radwordsprocessing/model/radflowdocument) using the [`HtmlFormatProvider`](https://docs.telerik.com/devtools/document-processing/libraries/radwordsprocessing/formats-and-conversion/html/htmlformatprovider). The document is then exported (saved) on the server using the [`DocxFormatProvider`](https://docs.telerik.com/devtools/document-processing/libraries/radwordsprocessing/formats-and-conversion/docx/docxformatprovider):  

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
* [Telerik DocumentProcessing library](https://docs.telerik.com/devtools/document-processing/introduction)
