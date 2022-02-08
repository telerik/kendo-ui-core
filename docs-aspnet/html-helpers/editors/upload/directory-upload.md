---
title: Directory Upload
page_title: Directory Upload
description: "Learn how to enable the Directry upload feature of the Telerik UI Upload component for {{ site.framework }}."
slug: htmlhelpers_upload_directory_aspnetcore
position: 9
---

# Directory Upload

The Telerik UI Upload for {{ site.framework }} has an option to enable users to upload whole directories of files through dragging and dropping them over the Upload.

When the Telerik UI Upload for {{ site.framework }} is configured for directory upload the user is allowed to select only folders for upload. Files cannot be selected. In browsers that do not support the directory feature, the behavior falls back to the default file selection. The directory upload feature is only supported by browsers that support [HTML5 directory](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/webkitdirectory) and [DataTransferItem](https://developer.mozilla.org/en-US/docs/Web/API/DataTransferItem) features.

The following example demonstrates how you can enable the `Directory` upload feature for the Telerik UI Upload for {{ site.framework }} :

```HtmlHelper
    @(Html.Kendo().Upload()
        .Name("files")
        .Async(a => a
            .Save("Directory_Upload", "Upload")
            .Remove("Directory_Remove", "Upload")
            .AutoUpload(false)
        )
        .Directory(true)
        .DirectoryDrop(true)
    )
```
```Controller
    public class UploadController : Controller
    {
        public IWebHostEnvironment WebHostEnvironment { get; set; }

        public UploadController(IWebHostEnvironment webHostEnvironment)
        {
            WebHostEnvironment = webHostEnvironment;
        }

        public async Task<ActionResult> Directory_Upload(IEnumerable<IFormFile> files)
        {
            // The Name of the Upload component is "files"
            if (files != null)
            {
                foreach (var file in files)
                {
                    var fileContent = ContentDispositionHeaderValue.Parse(file.ContentDisposition);

                    // Some browsers send file names with full path.
                    // We are only interested in the file name.
                    var fileName = Path.GetFileName(fileContent.FileName.ToString().Trim('"'));
                    var physicalPath = Path.Combine(WebHostEnvironment.WebRootPath, "Files", fileName);

                    // The files are not actually saved in this demo
                    //using (var fileStream = new FileStream(physicalPath, FileMode.Create))
                    //{
                    //    await file.CopyToAsync(fileStream);
                    //}
                }
            }

            // Return an empty string to signify success
            return Content("");
        }

        public ActionResult Directory_Remove(string[] fileNames)
        {
            // The parameter of the Remove action must be called "fileNames"

            if (fileNames != null)
            {
                foreach (var fullName in fileNames)
                {
                    var fileName = Path.GetFileName(fullName);
                    var physicalPath = Path.Combine(WebHostEnvironment.WebRootPath, "Files", fileName);

                    // TODO: Verify user permissions

                    if (System.IO.File.Exists(physicalPath))
                    {
                        // The files are not actually removed in this demo
                        //System.IO.File.Delete(physicalPath);
                    }
                }
            }

            // Return an empty string to signify success
            return Content("");
        }
    }
```

## See Also
* [Directory Upload by the Upload HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/upload/directoryupload)
* [Server-Side API](/api/upload)
