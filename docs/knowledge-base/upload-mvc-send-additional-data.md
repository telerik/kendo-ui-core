---
title: File Upload with Additional Data
description: How to send a file and additional data with a single request to the Kendo Upload controller action?
type: how-to
page_title: Send the File and Additional Data With a Single Request to the Server
slug: upload-mvc-send-additional-data
position: 0
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

I would like to upload a file to the server and also write some data into SQL database after the user fills a form with those values. How to send the field values along the Upload AJAX request?

## Solution
  
To send a single request to the server, containing both the file and the additional data, you will need to handle the *upload* event of the widget. This way you could pass additional parameters to the remote call:  

````JavaScript
function onUpload(e) {
	e.data = {
		Title: $('#title').val(),
		Notes: $('#notes').val()
	};
}
````
  
Then on the server, you will get those parameters in a model object:  

````C#
public ActionResult UploadFile(IEnumerable<HttpPostedFileBase> files3, TestModel model)
{...}
````
  
Where the model contains the following properties:  

````C#
public class TestModel
{
	public string Title { get; set; }

	public string Notes { get; set; }
}
````

## See Also

* [Kendo Upload API Reference](https://docs.telerik.com/kendo-ui/api/javascript/ui/upload)
