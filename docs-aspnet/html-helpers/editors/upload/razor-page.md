---
title: Razor Pages
page_title: Razor Pages
description: "Learn how to use the Telerik UI Upload component for {{ site.framework }} in a Razor Pages application."
slug: htmlhelpers_upload_razorpage_aspnetcore
position: 12
---

# Upload in Razor Pages

Razor Pages is an alternative to the MVC pattern that makes page-focused coding easier and more productive. This approach consists of a `cshtml` file and a `cshtml.cs` file (by design, the two files have the same name). 

You can seamlessly integrate the Telerik UI Upload for {{ site.framework }} in Razor Pages applications.

This article describes how to configure the Upload component in a Razor Pages scenario.

For the complete project, refer to the [Upload in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/Upload/UploadIndex.cshtml).

```tab-HtmlHelper(cshtml)
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
		.RemoveUrl("./UploadIndex?handler=Remove")
	)
	.Validation(validation => validation.AllowedExtensions(new string[] { ".jpg" , ".png", ".jpeg" }))
    .Validation(validation => validation.MaxFileSize(2000000))
)
```
{% if site.core %}
```tab-TagHelper(cshtml)
@page
@model Telerik.Examples.RazorPages.Pages.Upload.UploadIndexModel
@{
	ViewData["Title"] = "UploadIndex";
    string[] extensions = { ".gif", ".jpg", ".png" };
}

@inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
@Html.AntiForgeryToken()

<h1>UploadIndex</h1>

<kendo-upload name="files">
    <async remove-url="@Url.Page("UploadIndex","Remove")" save-url="@Url.Page("UploadIndex","Save")" />
    <validation allowed-extensions="@extensions" max-file-size="2000000" />
</kendo-upload>
```
{% endif %}
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

* [Using Telerik UI for ASP.NET Core in Razor Pages](https://docs.telerik.com/aspnet-core/getting-started/razor-pages#using-telerik-ui-for-aspnet-core-in-razor-pages)
* [Client-Side API of the Upload](https://docs.telerik.com/kendo-ui/api/javascript/ui/upload)
* [Server-Side HtmlHelper API of the Upload](/api/upload)
* [Server-Side TagHelper API of the Upload](/api/taghelpers/upload)
* [Knowledge Base Section](/knowledge-base)
