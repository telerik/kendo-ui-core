---
title: Rezise Image Before Upload
description: How to resize an image chosen by the user before it is uploaded to the server
type: how-to
page_title: Rezise image before upload
slug: upload-resize-image-before-upload
position: 
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
I am using the upload widget to upload photos taken from a phone and really need to resize them before the upload to reduce the amount of time it take to upload the photo. Is there a way to resize the photo with JavaScript with the Telerik Upload wdiget?

## Solution

Client-side resizing of images can be achieved through `<canvas>` and `Image` elements that can be used to fetch a `blob` that will be part of the POST data to the server. To use this approach with the Kendo Upload widget, you need to:

1. use its [async mode](https://demos.telerik.com/kendo-ui/upload/async)
1. disable the [automatic upload](https://docs.telerik.com/kendo-ui/api/javascript/ui/upload/configuration/async.autoupload)
1. hook to the [select](https://docs.telerik.com/kendo-ui/api/javascript/ui/upload/events/select) event
1. use a timetout to start the resizing logic to prevent errors with the built-in upload logic
1. when you have the resized blob, create a `File` from it and replace the data in the Kendo Upload widget with the new data (file and its size)
1. once resizing is done, initiate an upload through the [upload method](https://docs.telerik.com/kendo-ui/api/javascript/ui/upload/methods/upload) so the files reach the controller

Here is an example:

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
		//timeout so we don't break the built-in features and throw errors
		//note: the file size shown by the upload widget will, therefore, be wrong
		//consider using a template to hide it: https://demos.telerik.com/aspnet-mvc/upload/templates
		setTimeout(function () {
			triggerResizing();
		});
	}

	function triggerResizing() {
		var files = $("#files").data("kendoUpload").getFiles();
		for (var i = 0; i < files.length; i++) {
			files[i] = resizeFile(files[i]);
		}

		//consider devising a better way to monitor the progress of the resizing operations
		//so you can trigger upload when you are sure they are done
		//for example, keep a hash table with results per file and loop it in an interval
		setTimeout(function () {
			$("#files").data("kendoUpload").upload();
		}, 300);
	}

	function resizeFile(data) {
		//resizing logic. Note that it is not extensively tested and may have quirks
		var uploadFile = data.rawFile;
		var img = new Image();
		var canvas = document.createElement("canvas");
		var reader = new FileReader();
		reader.onload = function (e) {
			img.onload = function () {
				var ctx = canvas.getContext("2d");
				ctx.drawImage(img, 0, 0);

				//image constraints
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
				//end of image constraints

				var ctx = canvas.getContext("2d");
				ctx.drawImage(img, 0, 0, width, height);

				canvas.toBlob(function (blob) {
					blob.lastModifiedDate = new Date();
					blob.name = data.name;
					//replace original files with the new files
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

There is nothing special in the controller, it simply has to save the file. Of course, you may want to add server resizing logic to ensure the file matches the project requirements.

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

				// Some browsers send file names with full path.
				// We are only interested in the file name.
				var fileName = Path.GetFileName(fileContent.FileName.ToString().Trim('"'));

				//for portability, this will be in the application folder.
				//In a common case, you may want to use the wwwroot folder through WebRootPath
				//or some other location on your hard drive
				var appRoot = _env.ContentRootPath;
				var physicalPath = Path.Combine(appRoot, "SavedFiles", fileName);

				using (var fileStream = new FileStream(physicalPath, FileMode.Create))
				{
					//implement server validatoin before saving, this is a rudimentary example
					await file.CopyToAsync(fileStream);
				}
			}
		}

		// Return an empty string to signify success
		return Content("");
	}
}
```

## Notes

* The upload widget does not offer such a feature out of the box, and Telerik cannot guarantee it will not have side effects or issues (especially with a wider variety of images users can upload).
* It is important that the automatic upload is disabled because resizing images on the client is asynchronous.
* You may want to refactor the code to fit your coding standards. A few comments are available that denote likely areas that can get improved.

