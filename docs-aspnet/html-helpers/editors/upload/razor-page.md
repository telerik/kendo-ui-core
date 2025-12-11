---
title: Razor Pages
page_title: Razor Pages
description: "Learn how to use the Telerik UI Upload component for {{ site.framework }} in a Razor Pages application."
components: ["upload"]
slug: htmlhelpers_upload_razorpage_aspnetcore
position: 12
---

# Upload in Razor Pages

This article describes how to seamlessly integrate and configure the Telerik UI Upload for {{ site.framework }} in Razor Pages applications.

@[template](/_contentTemplates/core/razor-pages-general-info.md#referencing-handler-methods)

## Getting Started

The following example demonstrates how to configure the Upload component for asynchronous file uploads with save and remove operations in a Razor Pages application.

```HtmlHelper
@page
@model UploadIndexModel

@inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
@Html.AntiForgeryToken()

<h1>UploadIndex</h1>

@(Html.Kendo().Upload()
	.Name("files")
	.Async(a => a
		.SaveUrl("/UploadIndex?handler=Save")
		.RemoveUrl("/UploadIndex?handler=Remove")
		.AutoUpload(true)
	)
	.Validation(validation => validation.AllowedExtensions(new string[] { ".jpg" , ".png", ".jpeg" }))
    .Validation(validation => validation.MaxFileSize(2000000))
)
```
{% if site.core %}
```TagHelper
@page
@model UploadIndexModel

@inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
@Html.AntiForgeryToken()

@{
    string[] extensions = { ".jpeg", ".jpg", ".png" };
}

<h1>UploadIndex</h1>

<kendo-upload name="files">
    <async remove-url="@Url.Page("UploadIndex","Remove")" save-url="@Url.Page("UploadIndex","Save")" auto-upload="true" />
    <validation allowed-extensions="@extensions" max-file-size="2000000" />
</kendo-upload>
```
{% endif %}
```C# PageModel
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

For the complete project, refer to the [Upload in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/Upload/UploadIndex.cshtml).

## See Also

* [Using Telerik UI for ASP.NET Core in Razor Pages](https://docs.telerik.com/aspnet-core/getting-started/razor-pages#using-telerik-ui-for-aspnet-core-in-razor-pages)
* [Client-Side API of the Upload](https://docs.telerik.com/kendo-ui/api/javascript/ui/upload)
* [Server-Side HtmlHelper API of the Upload](/api/upload)
* [Server-Side TagHelper API of the Upload](/api/taghelpers/upload)
* [Knowledge Base Section](/knowledge-base)
