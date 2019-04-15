---
title: Saving Files
page_title: Saving Files | Kendo UI Saving Files
description: "Learn how to save files on the client machine when working with Kendo UI."
previous_url: /framework/save-files/introduction
slug: overview_savingfiles_kendoui
position: 9
---

# Saving Files

As of the 2014 Q3 release, you can save files on the client machine by using the [`kendo.saveAs`](/api/javascript/kendo/methods/saveas) method.

## Configuration

To save a file on the client machine:

1. Call the `kendo.saveAs` method.
1. Pass a file name and a valid [data URI](https://developer.mozilla.org/en-US/docs/Web/HTTP/data_URIs), or a [blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob).

The following example demonstrates how to save a text file on the client by using a data URI.

```dojo
<script>
	var dataURI = "data:text/plain;base64,SGVsbG8gV29ybGQh";
	kendo.saveAs({
	  dataURI: dataURI,
	  fileName: "test.txt"
	});
</script>
```

The following example demonstrates how to save a text file on the client by using a blob.

```dojo
<script>
	var blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});
	kendo.saveAs({
	  dataURI: blob,
	  fileName: "test.txt"
	});
</script>
```

## Setting Server Proxy

The `kendo.saveAs` will attempt to save the file using client-side API in browsers that support file creation (IE10+, Google Chrome and Firefox). If the browser does not implement an API for saving files, then `kendo.saveAs` could POST the content to a server-side proxy, which will stream the file back to the end user. The server-side proxy approach works in all [supported browsers]({% slug wbe_browserand_operating_system_support %}). Set the `proxyURL` option to enable the server proxy, as demonstrated below.

When a proxy is used the `kendo.saveAs()` method includes any CSRF and anti-forgery tokens out of the box as long as they are present on the page. The logic internally uses the [`kendo.antiForgeryTokens()`](/api/javascript/kendo/methods/antiforgerytokens) method and adds that to the request data as it posts to the proxy.

```
<script>
	var dataURI = "data:text/plain;base64,SGVsbG8gV29ybGQh";
	kendo.saveAs({
	    dataURI: dataURI,
	    fileName: "test.txt",
	    proxyURL: "/path/to/proxy"
	});
</script>
```

## Forcing Proxy Usage

You can also set `kendo.saveAs` to always use the server proxy by setting the `forceProxy` option to `true`, as shown below.

> Using a server proxy is highly recommended for files over 1MB or more. You may get a "Unknown network error" if the file is too large to be saved without a proxy.

```
<script>
	var dataURI = "data:text/plain;base64,SGVsbG8gV29ybGQh";
	kendo.saveAs({
	    dataURI: dataURI,
	    fileName: "test.txt",
	    proxyURL: "/path/to/proxy",
	    forceProxy: true
	});
</script>
```

## Server Proxy Implementations

The proxy receives a POST request with the following parameters in the request body:

* `contentType`&mdash;This is the MIME type of the file.
* `base64`&mdash;The `base-64`-encoded file content.
* `fileName`&mdash;The file name as requested by the caller.
* Any anti-forgery tokens if present on the page

The proxy is expected to return the decoded file with set `"Content-Disposition"` header.

The following examples demonstrate sample implementations of a server-side proxy for different platforms.

### ASP.NET WebForms

```tab-ASPX
<%@ Page Language="C#" AutoEventWireup="true" CodeFile="SaveFile.aspx.cs" Inherits="SaveFile" %>
```
```tab-Code-Behind
public partial class SaveFile : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        string contentType = Request.Form["contentType"];
        string base64 = Request.Form["base64"];
        string fileName = Request.Form["fileName"];

        byte[] fileContents = Convert.FromBase64String(base64);

        Response.ContentType = contentType;
        Response.AppendHeader("Content-Disposition", "attachment; filename=" + fileName);
        Response.BinaryWrite(fileContents);
        Response.End();
    }
}
```
```tab-Usage
<script>
	var dataURI = "data:text/plain;base64,SGVsbG8gV29ybGQh";
	kendo.saveAs({
	    dataURI: dataURI,
	    fileName: "test.txt",
	    proxyURL: "<%= ResolveUrl("~/SaveFile.aspx") %>"
	});
</script>
```

### ASP.NET WebAPI Controller

```
public class SaveFile : ApiController
{
    public class FileData
    {
        public string ContentType { get; set; }
        public string Base64 { get; set; }
        public string FileName { get; set; }
    }

    // POST api/savefile
    public HttpResponseMessage Post([FromBody]FileData file)
    {
        var data = Convert.FromBase64String(file.Base64);

        var result = new HttpResponseMessage(HttpStatusCode.OK)
        {
            Content = new StreamContent(new MemoryStream(data))
        };

        result.Content.Headers.ContentType = new MediaTypeHeaderValue(file.ContentType);

        result.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment")
        {
            FileName = file.FileName
        };

        return result;
    }
}
```

### ASP.NET MVC Proxy

```tab-Controller
public class HomeController
{
    [HttpPost]
    [ValidateAntiForgeryToken]
    public ActionResult Save(string contentType, string base64, string fileName)
    {
        var fileContents = Convert.FromBase64String(base64);

        return File(fileContents, contentType, fileName);
    }
}
```
```tab-View-Razor
<script>
	var dataURI = "data:text/plain;base64,SGVsbG8gV29ybGQh";
	kendo.saveAs({
	    dataURI: dataURI,
	    fileName: "test.txt",
	    proxyURL: "@Url.Action("Save", "Home")"
	});
</script>
```

### PHP Proxy

```
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $fileName = $_POST['fileName'];
    $contentType = $_POST['contentType'];
    $base64 = $_POST['base64'];

    $data = base64_decode($base64);

    header('Content-Type:' . $contentType);
    header('Content-Length:' . strlen($data));
    header('Content-Disposition: attachment; filename=' . $fileName);

    echo $data;
}
```

### Java (Spring MVC)

```
@RequestMapping(value = "/save", method = RequestMethod.POST)
public @ResponseBody void save(String fileName, String base64, String contentType, HttpServletResponse response) throws IOException {

    response.setHeader("Content-Disposition", "attachment;filename=" + fileName);

    response.setContentType(contentType);

    byte[] data = DatatypeConverter.parseBase64Binary(base64);

    response.setContentLength(data.length);
    response.getOutputStream().write(data);
    response.flushBuffer();
}
```

## See also

* [Overview of the Excel Export Feature]({% slug introduction_excelexport_kendoui %})
* [Overview of Kendo UI Drawing API](/framework/drawing/overview)
* [JavaScript API Reference on PDF Export](/api/javascript/drawing/pdfoptions)
