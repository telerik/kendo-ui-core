---
title: Introduction
page_title: Save files on the client machine
description: This article shows how save files on the client machine using Kendo UI
position: 1
---

# Introduction

Kendo UI allows developers to save files on the client machine since the 2014 Q3 release. This is done via the [kendo.saveAs](/api/javascript/kendo#methods-saveAs) method.

## Save files

To save a file on the client machine call the `kendo.saveAs` method and pass a valid [data URI](https://developer.mozilla.org/en-US/docs/Web/HTTP/data_URIs) and a file name.

#### Example - save a text file

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
If the browser doesn't implement an API for saving files then `kendo.saveAs` could POST the content to a server-side proxy which will stream the file back to the end user.
The server-side proxy approach works in all [supported browsers](/browsers-support). Set the `proxyURL` option to enable the server proxy. You can make `kendo.saveAs` always use the server proxy
by setting the `forceProxy` option to `true`.

#### Example - set server proxy

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

#### Example - force proxy usage

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

The proxy will receive a POST request with the following parameters in the request body:

* contentType: The MIME type of the file
* base64: The base-64 encoded file content
* fileName: The file name, as requested by the caller.

The proxy should return the decoded file with set "Content-Disposition" header.

Here are a few sample implementations of a server-side proxy for different platforms.

### ASP.NET WebForms

#### ASPX

```
<%@ Page Language="C#" AutoEventWireup="true" CodeFile="SaveFile.aspx.cs" Inherits="SaveFile" %>
```

#### Code-behind
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
#### Usage

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

#### Controller

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

#### View (Razor)

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
