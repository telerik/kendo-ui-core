---
title: Upload Files from Grid Popup Editors
page_title: Upload Files from Grid Popup Editors
description: "Upload files from a Grid popup editor in ASP.NET MVC applications."
previous_url: /helpers/editors/upload/how-to/upload-files-from-grid
slug: howto_uploadfilesgridpopupeditor_uploadaspnetmvc
position: 0
---

# Upload Files from Grid Popup Editors

The example below shows how to integrate the Upload component into the custom template of a [Popup editable Grid](https://demos.telerik.com/aspnet-mvc/grid/editing-popup).

1. Define a Popup editable Grid that uses a custom editor template.

    ```View
        @(Html.Kendo().Grid<FileViewModel>()
            .Name("grid")
            .Columns(columns =>
            {
                columns.Bound(p => p.FileId);
                columns.Bound(p => p.FileName);
                columns.Command(command => { command.Edit(); command.Destroy(); }).Width(200);
            })
            .ToolBar(toolbar => toolbar.Create())
            .Editable(editable => editable.Mode(GridEditMode.PopUp).TemplateName("CustomPopupEditor"))
            .Pageable()
            .Scrollable()
            .HtmlAttributes(new { style = "height:550px;" })
            .DataSource(dataSource => dataSource
                .Ajax()
                .PageSize(20)
                .Model(m =>
                {
                    m.Id(f => f.FileId);
                    m.Field(f => f.FileId).Editable(false);
                })
                .Read(read => read.Action("Read", "Grid"))
                .Update(update => update.Action("Update", "Grid"))
                .Create(create => create.Action("Create", "Grid"))
                .Destroy(destroy => destroy.Action("Destroy", "Grid"))
            )
        )

    ```
    ```GridController

        public ActionResult Read([DataSourceRequest] DataSourceRequest request)
        {
            return Json(gridService.Read().ToDataSourceResult(request));
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult Update([DataSourceRequest] DataSourceRequest request, FileViewModel file)
        {
            if (file != null && ModelState.IsValid)
            {
                gridService.Update(file);
            }

            return Json(new[] {file}.ToDataSourceResult(request,ModelState));
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult Create([DataSourceRequest] DataSourceRequest request, FileViewModel file)
        {
            if (file != null && ModelState.IsValid)
            {
                gridService.Create(file);
            }

            return Json(new[] { file }.ToDataSourceResult(request, ModelState));
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult Destroy([DataSourceRequest] DataSourceRequest request, FileViewModel file)
        {
            if (file != null)
            {
                gridService.Destroy(file);
            }

            return Json(new[] { file }.ToDataSourceResult(request, ModelState));
        }
    ```
    ```Model

        public class FileViewModel
        {
            public int FileId { get; set; }

            public string FileName { get; set; }
        }
    ```

1. Create the custom editor template `CustomPopupEditor.cshtml` in the `~/Views/Shared/EditorTemplates` folder. Define the `FileName` property as read-only, since it will be populated dynamically based on the uploaded file in the next Step. Also, handle the [`Success`](https://docs.telerik.com/aspnet-mvc/api/kendo.mvc.ui.fluent/uploadeventbuilder#successsystemstring) event of the Upload control to get the name of the uploaded file.

    ```CustomPopupEditor.cshtml
        @model FileViewModel

        @Html.HiddenFor(model => model.FileId)

        @(Html.Kendo().TextBoxFor(m => m.FileName).Readonly(true))

        <br/><br/>
        
        @(Html.Kendo().Upload()
            .Name("file")
            .Multiple(false)
            .Async(a => a
                .Save("SaveFile", "Grid")
                .Remove("RemoveFile", "Grid")
                .AutoUpload(true)
            )
            .Validation(validation => validation.AllowedExtensions(new string[] { ".gif", ".jpg", ".jpeg", ".png" }))
            .Validation(validation => validation.MaxFileSize(3145728))
            .Events(ev => ev.Success("onUploadSuccess"))
        )
    ```

1. Set up the `Save` and `Remove` Action methods of the Upload.

    ```GridController
        public ActionResult SaveFile(HttpPostedFileBase file)
        {
            if (file != null)
            {
                //// Some browsers send file names with full path.
                //// We are only interested in the file name.
                var fileName = Path.GetFileName(file.FileName.Trim('"'));
                var physicalPath = Path.Combine(Server.MapPath("~/App_Data"), fileName);
                file.SaveAs(physicalPath);
            }

            // Return an empty string to signify success
            return Content("");
        }

        public ActionResult RemoveFile(string fileNames)
        {
            // The parameter of the Remove action must be called "fileNames"
            if (fileNames != null)
            {
                var fileName = Path.GetFileName(fileNames);
                var physicalPath = Path.Combine(Server.MapPath("~/App_Data"), fileName);

                // TODO: Verify user permissions
                if (System.IO.File.Exists(physicalPath))
                {
                    System.IO.File.Delete(physicalPath);
                }
            }

            // Return an empty string to signify success
            return Content("");
        }
    ```

1. Update the value of the `FileName` Model property with the name of the uploaded file in the Upload `Success` event handler. 

    ```
        <script>
            function onUploadSuccess(e) {
                var files = e.files;
                var grid = $("#grid").getKendoGrid(); // Get a reference to the Grid
                var fileNameTextBox = $("#FileName").data("kendoTextBox"); //Get a reference to the TextBox editor in the Popup template
                if (e.operation == "upload") {
                    var uploadedFileName = e.files[0].name; // Get the name of the successfully uploaded file.
                    fileNameTextBox.value(uploadedFileName); // Change the TextBox value based on the name of the uploaded file.
                    fileNameTextBox.trigger("change"); // It is required to trigger the 'change' event manually.
                    grid.editable.options.model.set("FileName", uploadedFileName); //Update the "FileName" Model property based on the uploaded file name.
                }
                if(e.operation == "remove") {
                    fileNameTextBox.value("");
                    fileNameTextBox.trigger("change");
                    grid.editable.options.model.set("FileName", "");
                }
            }
        </script>
    ```

## See Also

* [Basic Usage by the Upload HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/upload)
* [UploadBuilder Server-Side API](https://docs.telerik.com/aspnet-mvc/api/kendo.mvc.ui.fluent/uploadbuilder)
* [Upload Server-Side API](/api/upload)
