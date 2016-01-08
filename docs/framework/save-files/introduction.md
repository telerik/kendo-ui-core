---
title: Overview
page_title: Overview | Kendo UI Saving Files
description: "Learn how to save files on the client machine when working with Kendo UI."
slug: overview_savingfiles_kendoui
position: 1
---

# Overview of File Saving

Since its 2014 Q3 release, Kendo UI allows you to save files on the client machine. This is done via the [`kendo.saveAs`](/api/javascript/kendo#methods-saveAs) method.

## Configuration

### Save Files

To save a file on the client machine, call the `kendo.saveAs` method, and pass a valid [data URI](https://developer.mozilla.org/en-US/docs/Web/HTTP/data_URIs) and a file name.

The example below demonstrates how to save a text file on the client.

###### Example

```html
<script>
var dataURI = "data:text/plain;base64," + kendo.util.encodeBase64("Hello World!");
kendo.saveAs({
    dataURI: dataURI,
    fileName: "test.txt"
});
</script>
```

## Browser Support

The `kendo.saveAs` will attempt to save the file using client-side API in browsers that support file creation (IE10+, Google Chrome and FireFox).

### Set Server Proxy

If the browser does not implement an API for saving files, then `kendo.saveAs` could POST the content to a server-side proxy, which will stream the file back to the end user. The server-side proxy approach works in all [supported browsers]({% slug wbe_browserand_operating_system_support %}). Set the `proxyURL` option to enable the server proxy, as demonstrated below.

###### Example

```
<script>
var dataURI = "data:text/plain;base64," + kendo.util.encodeBase64("Hello World!");
kendo.saveAs({
    dataURI: dataURI,
    fileName: "test.txt",
    proxyURL: "/path/to/proxy"
});
</script>
```

### Force Proxy Usage

You are also able to make `kendo.saveAs` always use the server proxy by setting the `forceProxy` option to `true`, as shown below.

###### Example

```
<script>
var dataURI = "data:text/plain;base64," + kendo.util.encodeBase64("Hello World!");
kendo.saveAs({
    dataURI: dataURI,
    fileName: "test.txt",
    proxyURL: "/path/to/proxy",
    forceProxy: true
});
</script>
```

## Server Proxy Implementations

### Parameters

The proxy receives a POST request with the following parameters in the request body:

* `contentType`&mdash;This is the MIME type of the file.
* `base64`&mdash;The `base-64`-encoded file content.
* `fileName`&mdash;The file name as requested by the caller.

The proxy is expected to return the decoded file with set `"Content-Disposition"` header.

### Examples

Here are a few sample implementations of a server-side proxy for different platforms.

#### ASP.NET WebForms

##### ASPX

###### Example

```
<%@ Page Language="C#" AutoEventWireup="true" CodeFile="SaveFile.aspx.cs" Inherits="SaveFile" %>
```

##### Code-Behind

###### Example

```
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
##### Usage

###### Example

```
<script>
var dataURI = "data:text/plain;base64," + kendo.util.encodeBase64("Hello World!");
kendo.saveAs({
    dataURI: dataURI,
    fileName: "test.txt",
    proxyURL: "<%= ResolveUrl("~/SaveFile.aspx") %>"
});
</script>
```

#### ASP.NET WebAPI Controller

###### Example

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

#### ASP.NET MVC Proxy

##### Controller

###### Example

```
public class HomeController
{
    [HttpPost]
    public ActionResult Save(string contentType, string base64, string fileName)
    {
        var fileContents = Convert.FromBase64String(base64);

        return File(fileContents, contentType, fileName);
    }
}
```

##### View (Razor)

###### Example

```
<script>
var dataURI = "data:text/plain;base64," + kendo.util.encodeBase64("Hello World!");
kendo.saveAs({
    dataURI: dataURI,
    fileName: "test.txt",
    proxyURL: "@Url.Action("Save", "Home")"
});
</script>
```

#### PHP Proxy

###### Example

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

#### Java (Spring MVC)

###### Example

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

Articles related to the Kendo UI file-saving functionality:

* [Overview of the Excel Export Feature]({% slug introduction_excelexport_kendoui %})
* [Overview of Kendo UI Drawing API](/framework/drawing/overview)
* [JavaScript API Reference on PDF Export](/api/javascript/drawing/pdfoptions)
