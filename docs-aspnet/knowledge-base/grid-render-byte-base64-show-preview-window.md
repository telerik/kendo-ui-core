---
title: Display and Preview Byte and base64 Images in Grid Using a Window
page_title: Render and Preview Byte and base64 Images in Grid Using a Window
description: "Render and preview byte and base64 images in the {{ site.product }} Grid by using a Kendo UI for jQuery Window."
previous_url: /helpers/data-management/grid/how-to/Integration/render-byte-base64-show-preview-window, /html-helpers/data-management/grid/how-to/Integration/render-byte-base64-show-preview-window
slug: howto_renderbyteandbase64images_gridaspnetmv
component: grid
type: how-to
res_type: kb
components: ["general"]
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Grid</td>
 </tr>
 <tr>
  <td>Product version</td>
  <td>2025.1.227</td>
 </tr>
</table>

## Description

How can I display `Byte` and `base64` images in the Grid and preview them by using a Window component?

## Solution

The solution relies on the following key steps:

1. Use the `ClientTemplate()` option to display the images in the respective column cell:

    ```HtmlHelper
    @(Html.Kendo().Grid<Order>()
        .Name("Grid")
        .HtmlAttributes(new { style = "heigth:600px;"})
        .Columns(columns => {
            columns.Bound(p => p.Image)
                .ClientTemplate("<img src='" + @Url.Action("RenderPhoto", "Home", new { photoId = "#=OrderID-1#" }, @Request.Url.Scheme) + "' class='imgLink' />")
                .Title("Byte array images");
            columns.Bound(p => p.Image64)
                .ClientTemplate("<img src='data:image/png;base64,#=Image64#' class='imgLink' />")
                .Title("Base64 Images");
        })
        ...// Additional configuration.
    )
    ```
    ```C# HomeController
        public ActionResult RenderPhoto(int photoId)
        {
            byte[] photo = FetchPhotoFromDb(photoId);
            return File(photo, "image/png");
        }

        private static byte[] FetchPhotoFromDb(int photoId)
        {
            // Fetch image from database.
            return byteImages[photoId];
        }

        public static List<byte[]> byteImages = readFiles(new List<byte[]>());

        private static List<byte[]> readFiles(List<byte[]> byteImages)
        {
            // Get file paths (can be stored in DB).
            string[] filePaths = Directory.GetFiles(HostingEnvironment.MapPath("~/Areas/GridRenderAndPreviewByteAndBase64Images/Content/icons/"));

            foreach (string filePath in filePaths)
            {
                using (Image currentImage = Image.FromFile(filePath))
                {
                    byteImages.Add(ImageToByteArrayConverter.imageToByteArray(currentImage));
                }
            }

            return byteImages;
        }
    ```

1. Initialize a Window component with jQuery and handle the `click` event of the `img` elements in the Grid column templates:

    ```js
        $(function () {
            $("#window").kendoWindow({
                width: "600px",
                title: "Image preview",
                visible: false
            });

            $("#Grid").on("click", ".imgLink", showImage);
        });

        function showImage() {
            imgTag = "<img src='" + this.src + "' />";
            windowElement = $("#window").data("kendoWindow");
            windowElement.content(imgTag); // Update the Window's content based on the clicked image.
            windowElement.setOptions({
                width: 320,
                height: 320
            });
            windowElement.center();
            windowElement.open(); // Open the Window.
        }
    ```

To review the complete example, refer to the [project on how to render byte and base64 images in the Grid and preview them using a Window](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/GridRenderAndPreviewByteAndBase64Images) when working with the Kendo UI Grid in ASP.NET MVC applications.

## More {{ site.framework }} Grid Resources

* [{{ site.framework }} Grid Documentation]({%slug htmlhelpers_grid_aspnetcore_overview%})
* [{{ site.framework }} Grid Demos](https://demos.telerik.com/{{ site.platform }}/grid/index)
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-mvc/grid)
* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})
* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)

## See Also

* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
