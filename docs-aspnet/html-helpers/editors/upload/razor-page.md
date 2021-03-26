---
title:  Razor Page
page_title: Configure the Upload in a Razor Page.
description: "An example on how to configure the Telerik UI Upload HtmlHelper for {{ site.framework }} in a Razor Page."
slug: htmlhelpers_upload_razorpage_aspnetcore
position: 8
---

# Razor Page

This article describes how to configure the Telerik UI Upload HtmlHelper for {{ site.framework }} in a RazorPages scenario.

See the Upload configuration in the example below, and for the full project with RazorPages examples, visit our [GitHub repository](https://github.com/telerik/ui-for-aspnet-core-examples/tree/master/Telerik.Examples.RazorPages).

```tab-RazorPage(csthml)
@page
@model Telerik.Examples.RazorPages.Pages.Upload.UploadIndexModel
@{
	ViewData["Title"] = "UploadIndex";
}

@inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
@Html.AntiForgeryToken()

<h1>UploadIndex</h1>

@(Html.Kendo().Upload()
	.Name("files")
	.Async(a=>
		a.SaveUrl("./UploadIndex?handler=Save")
		.RemoveUrl("./UploadIndex?handler=Save")
	)
	.Validation(validation => validation.AllowedExtensions(new string[] { ".jpg" , ".png", ".jpeg" }))
    .Validation(validation => validation.MaxFileSize(2000000))
)
```
```tab-PageModel(cshtml.cs)
    public class UploadIndexModel : PageModel
    {
        public void OnGet()
        {

        }

		public ActionResult OnPostSave(IEnumerable<IFormFile> files)
		{
			// The Name of the Upload component is "files"
			if (files != null)
			{
				foreach (var file in files)
				{
					var fileContent = ContentDispositionHeaderValue.Parse(file.ContentDisposition);

					//// Some browsers send file names with full path.
					//// We are only interested in the file name.
					var fileName = Path.GetFileName(fileContent.FileName.Trim('"'));
					var physicalPath = Path.Combine("App_Data", fileName);

					//// The files are not actually saved in this demo
					////file.SaveAs(physicalPath);
				}
			}

			// Return an empty string to signify success
			return Content("");
		}

		public ActionResult OnPostRemove(string[] fileNames)
		{
			// The parameter of the Remove action must be called "fileNames"

			if (fileNames != null)
			{
				foreach (var fullName in fileNames)
				{
					var fileName = Path.GetFileName(fullName);
					var physicalPath = Path.Combine("App_Data", fileName);

					// TODO: Verify user permissions

					if (System.IO.File.Exists(physicalPath))
					{
						// The files are not actually removed in this demo
						// System.IO.File.Delete(physicalPath);
					}
				}
			}

			// Return an empty string to signify success
			return Content("");
		}
	}
```

## See Also

* [Razor Pages Support]({% slug razor_pages_integration_aspnetmvc6_aspnetmvc %})
* [Upload Overview]({% slug htmlhelpers_upload_aspnetcore %})
