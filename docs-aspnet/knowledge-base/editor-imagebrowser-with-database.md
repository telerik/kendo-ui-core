---
title: Store Images in a Database using the ImageBrowser of the Editor
description: Set up the ImageBrowser of the Telerik UI for {{ site.framework }} Editor to store images in an MS SQL database.
type: how-to
page_title: Store Images in a Database using the ImageBrowser of the Editor
slug: editor-imagebrowser-with-database
tags: editor, image, store, database, sql, browser, core, mvc, telerik
previous_url: /helpers/editors/editor/how-to/database-with-imagebrowser, /html-helpers/editors/editor/how-to/database-with-imagebrowser
res_type: kb
component: editor
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td> {{ site.product }} Editor</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>2024.4.1112</td>
 </tr>
</table>

## Description

How can I use the Editor's ImageBrowser with a database?

## Solution

See the full example on how to [set up the Editor `ImageBrowser` to store the images in an MS SQL database](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/EditorDatabaseImageBrowser) in an ASP.NET MVC application.

1. Implement the `Upload` action, to which the ImageBrowser uploads the selected files.

    ```C# HomeController
        public ActionResult Upload(string path, HttpPostedFileBase file)
        {
            if (file != null)
            {
                var files = new FilesRepository();
                var parentFolder = files.GetFolderByPath(path);
                if (parentFolder != null)
                {
                    files.SaveImage(parentFolder, file);
                    return Json(
                        new FileBrowserEntry
                        {
                            Name = Path.GetFileName(file.FileName),
                            Size = file.ContentLength
                        }
                    , "text/plain");
                }
            }
            throw new HttpException(404, "File Not Found");
        }
    ```

1. Implement the `FileRepository` class, which performs the data operations with the database.

    ```C# FilesRepository.cs
        using System;
        using System.Collections.Generic;
        using System.IO;
        using System.Linq;
        using System.Web;
        using Kendo.Mvc.UI;

        public class FilesRepository
        {
            private ImageBrowserEntities dataContext;

            protected ImageBrowserEntities Db
            {
                get { return dataContext ?? (dataContext = new ImageBrowserEntities()); }
            }

            public IEnumerable<FileBrowserEntry> Images(string path)
            {
                return Images(GetFolderByPath(path));
            }

            public void SaveImage(Folder parent, HttpPostedFileBase file)
            {
                var buffer = new byte[file.InputStream.Length];
                file.InputStream.Read(buffer, 0, (int) file.InputStream.Length);
                var image = new Image
                            {
                                Name = Path.GetFileName(file.FileName),
                                Folder = parent,
                                Image1 = buffer
                            };
                Db.Images.Add(image);
                Db.SaveChanges();
            }

            //... additional methods...
        }
    ```

## More {{ site.framework }} Editor Resources

* [{{ site.framework }} Editor Documentation]({%slug htmlhelpers_editor_aspnetcore%})

* [{{ site.framework }} Editor Demos](https://demos.telerik.com/{{ site.platform }}/editor/index)

{% if site.core %}
* [{{ site.framework }} Editor Product Page](https://www.telerik.com/aspnet-core-ui/editor)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} Editor Product Page](https://www.telerik.com/aspnet-mvc/editor)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Client-Side API Reference of the Editor for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/editor)
* [Server-Side API Reference of the Editor for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/editor)
{% if site.core %}
* [Server-Side TagHelper API Reference of the Editor for {{ site.framework }}](https://docs.telerik.com/aspnet-core/api/taghelpers/editor)
{% endif %}
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2024%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)