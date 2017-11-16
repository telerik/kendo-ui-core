---
title: Upload Files and Additional Data in a Single Request
description: An example on how to send a file and additional data with a single request to the Kendo Upload controller action?
type: how-to
page_title: Send File and Additional Data with a Single Request to the Server | Kendo UI Upload
slug: upload-mvc-send-additional-data
tags: kendo, kendoui, mvc, upload, additional-parameters, send-fields
ticketid: 1138520
res_type: kb
component: upload
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Upload for ASP.NET MVC</td>
 </tr>
</table>


## Description

I want to upload a file to the server and also write some data into the SQL database after the user fills a form with those values.

How can I send the field values along the AJAX request of the Upload?

## Solution

Handle the `upload` event of the Upload widget. As a result, you are able to pass additional parameters to the remote call.  

````JavaScript
function onUpload(e) {
	e.data = {
		Title: $('#title').val(),
		Notes: $('#notes').val()
	};
}
````

On the server, you will get the following parameters in a model object:  

````C#
public ActionResult UploadFile(IEnumerable<HttpPostedFileBase> files3, TestModel model)
{...}
````

The model contains the following properties:  

````C#
public class TestModel
{
	public string Title { get; set; }

	public string Notes { get; set; }
}
````

## See Also

* [API Reference of the Upload Widget](https://docs.telerik.com/kendo-ui/api/javascript/ui/upload)
