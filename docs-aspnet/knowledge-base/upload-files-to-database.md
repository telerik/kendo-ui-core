---
title: Upload Files to a Database
description: Learn how to use the Telerik UI for {{ site.framework }} Upload component to upload files to a database.
type: how-to
page_title: Upload Files to a Database
slug: upload-files-to-database
tags: upload, file, database, core, mvc, telerik
previous_url: /helpers/editors/upload/how-to/upload-files-to-a-database, /html-helpers/editors/upload/how-to/upload-files-to-a-database
res_type: kb
component: upload
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Upload</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>2024.4.1112</td>
 </tr>
</table>

## Description

How can I upload files to a database using the Upload component?

## Solution

Refer to the following example of how [upload files to a database](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/UploadFilesToDataBase). 

The example uses an Upload nested in a [Grid]({% slug htmlhelpers_grid_aspnetcore_overview %}) component. The Grid visualizes information about the files that are uploaded and saved in the database.

1. In the `Async` configuration of the Upload, set the `Save` action as the end point that will receive the files uploaded by the component. 

    ```HtmlHelper
        @(Html.Kendo().Upload()
            .Name("files")
            .Async(a => a.Save("Save", "Home"))
            .Events(e => e.Success("onUploadSuccess"))
            .ShowFileList(false) // Hide the file list as we're displaying uploaded files in the Grid
        )
    ```

1. Implement your files saving logic in the `Save` action.

    ```HomeController
        public ActionResult Save(IEnumerable<HttpPostedFileBase> files)
        {
            if (files != null)
            {
                UserFilesEntities db = new UserFilesEntities();

                foreach (var file in files)
                {
                    db.UserFile.Add(new UserFile()
                    {
                        Name = Path.GetFileName(file.FileName),
                        Data = GetFilesBytes(file)
                    });
                }

                db.SaveChanges();
            }

            // Return an empty string to signify success
            return Content("");
        }
    ```

## More {{ site.framework }} Upload Resources

* [{{ site.framework }} Upload Documentation]({%slug htmlhelpers_upload_aspnetcore%})

* [{{ site.framework }} Upload Demos](https://demos.telerik.com/{{ site.platform }}/upload/index)

{% if site.core %}
* [{{ site.framework }} Upload Product Page](https://www.telerik.com/aspnet-core-ui/upload)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} Upload Product Page](https://www.telerik.com/aspnet-mvc/upload)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Client-Side API Reference of the Upload for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/upload)
* [Server-Side API Reference of the Upload for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/upload)
{% if site.core %}
* [Server-Side TagHelper API Reference of the Upload for {{ site.framework }}](https://docs.telerik.com/aspnet-core/api/taghelpers/upload)
{% endif %}
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2024%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)