---
title: Resize Images before Upload
description: An example on how to resize an image that is selected by the user before it is uploaded to the server.
type: how-to
page_title: Resize Images before Upload | UI for ASP.NET Core
slug: upload-resize-image-before-upload
tags: upload,resize,image,client,before upload
ticketid: 1381676
res_type: kb
---

## Environment

<table>
	<tr>
		<td>Product</td>
		<td>Upload for ASP.NET Core</td>
	</tr>
</table>

## Description

I am using the Kendo UI Upload for uploading photos that were taken with a phone.

How can I resize the photos before the upload to reduce the amount of time it takes to upload them? Is there a way to resize the photos by using JavaScript and the Upload?

## Solution

To achieve client-side resizing of images, use the `<canvas>` and `Image` elements for fetching a `blob` that will be part of the POST data to the server.

1. Use the [async mode](https://demos.telerik.com/kendo-ui/upload/async) of the Upload.
1. Disable the [automatic upload](https://docs.telerik.com/kendo-ui/api/javascript/ui/upload/configuration/async.autoupload).
1. Hook to the [`select`](https://docs.telerik.com/kendo-ui/api/javascript/ui/upload/events/select) event.
1. Use a timetout to start the resizing logic and prevent errors with the built-in Upload logic.
1. When you have the resized blob, create a `File` from it and replace the data in the Kendo UI Upload with the new data (file and its size).
1. Once resizing is done, initiate an upload through the [`upload`](https://docs.telerik.com/kendo-ui/api/javascript/ui/upload/methods/upload) method so that the files reach the controller.

```CSHTML
@(Html.Kendo().Upload()
			.Name("files")
			.Events(ev => ev.Select("fileSelectHandler"))
			.Async(a => a
				.Save("SaveAsync", "ResizeFile")
				.AutoUpload(false)
			)
)

<script>
	function fileSelectHandler(e) {
		// A timeout so you do not break the built-in features and throw errors.
		// Note: the file size shown by the Upload will, therefore, be wrong.
		// Consider using a template to hide it: https://demos.telerik.com/aspnet-mvc/upload/templates.
		setTimeout(function () {
			triggerResizing();
		});
	}

	function triggerResizing() {
		var files = $("#files").data("kendoUpload").getFiles();
		for (var i = 0; i < files.length; i++) {
			files[i] = resizeFile(files[i]);
		}

		// Consider devising a better way to monitor the progress of the resizing operations,
		// so that you can trigger an upload when you are sure they are done.
		// For example, keep a hash table with results per file and loop it in an interval.
		setTimeout(function () {
			$("#files").data("kendoUpload").upload();
		}, 300);
	}

	function resizeFile(data) {
		// The resizing logic. Note that it is not extensively tested and may have quirks.
		var uploadFile = data.rawFile;
		var img = new Image();
		var canvas = document.createElement("canvas");
		var reader = new FileReader();
		reader.onload = function (e) {
			img.onload = function () {
				var ctx = canvas.getContext("2d");
				ctx.drawImage(img, 0, 0);

				// The image constraints.
				var MAX_WIDTH = 400;
				var MAX_HEIGHT = 300;
				var width = img.width;
				var height = img.height;

				if (width > height) {
					if (width > MAX_WIDTH) {
						height *= MAX_WIDTH / width;
						width = MAX_WIDTH;
					}
				} else {
					if (height > MAX_HEIGHT) {
						width *= MAX_HEIGHT / height;
						height = MAX_HEIGHT;
					}
				}
				canvas.width = width;
				canvas.height = height;
				// The end of the image constraints.

				var ctx = canvas.getContext("2d");
				ctx.drawImage(img, 0, 0, width, height);

				canvas.toBlob(function (blob) {
					blob.lastModifiedDate = new Date();
					blob.name = data.name;
					// Replace the original files with the new files.
					data.size = blob.size;
					data.rawFile = new File([blob], data.name);

					return data;
				}, 'image/png', 1);
			}
			img.src = e.target.result;
		}
		reader.readAsDataURL(uploadFile);
	}
</script>
```

The following example demonstrates how to configure the controller. The controller is expected only to save the file but you may also add server resizing logic to ensure the file matches the project requirements.

```C#
public class ResizeFileController : Controller
{
	//needed to get the application root path
	private IHostingEnvironment _env;
	public ResizeFileController(IHostingEnvironment env)
	{
		_env = env;
	}

	public IActionResult Index()
    {
        return View();
    }

	public async Task<ActionResult> SaveAsync(IEnumerable<IFormFile> files)
	{
		if (files != null)
		{
			foreach (var file in files)
			{
				var fileContent = ContentDispositionHeaderValue.Parse(file.ContentDisposition);

				// Some browsers send file names with a full path.
				// Only the file name is of interest here.
				var fileName = Path.GetFileName(fileContent.FileName.ToString().Trim('"'));

				// For portability, this will be in the application folder.
				// Commonly, you may want to use the wwwroot folder through WebRootPath
				// or some other location on your hard drive.
				var appRoot = _env.ContentRootPath;
				var physicalPath = Path.Combine(appRoot, "SavedFiles", fileName);

				using (var fileStream = new FileStream(physicalPath, FileMode.Create))
				{
					// Implement the server validation before saving. The current example is a rudimentary one.
					await file.CopyToAsync(fileStream);
				}
			}
		}

		// Return an empty string to signify success.
		return Content("");
	}
}
```

## Notes

* The Upload does not offer such a feature out of the box and the suggested workaround may have side effects or provoke issues, especially with a wider variety of images users can upload.
* The automatic upload is disabled because the resizing of images on the client is asynchronous.
* You may want to refactor the code to fit your coding standards. A few available comments denote areas that can be improved.
