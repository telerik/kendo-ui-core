---
title: Popup
page_title: Popup Editing
description: "Define commands and set the edit mode to configure the Telerik UI TreeList HtmlHelper for {{ site.framework }} for popup editing."
slug: htmlhelpers_treelist_aspnetcore_popup_editing
position: 4
---

# Popup Editing

You can define commands and set the edit mode to configure the Telerik UI TreeList for {{ site.framework }} for popup editing.

For runnable examples, refer to the [demos on implementing the editing approaches in the TreeList](https://demos.telerik.com/{{ site.platform }}/treelist/editing-popup).

To set the popup edit mode of the TreeList:

1. Add a new class to the `~/Models` folder. The following example uses the `EmployeeDirectoryModelPopUp` name.

        public class EmployeeDirectoryModelPopUp
        {
            public int EmployeeId { get; set; }
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public int? ReportsTo { get; set; }
        }

1. Add an empty MVC Controller `TreeListController.cs` and add a new action method `ReadOrders` which will return the **Directories** as JSON in the expected format. The TreeList will make Ajax requests to this action.

        public JsonResult All([DataSourceRequest] DataSourceRequest request)
        {
            var result = GetDirectory().ToTreeDataSourceResult(request,
                e => e.EmployeeId,
                e => e.ReportsTo,
                e => e
            );

            return Json(result);
        }

1. Add a new action method to `TreeListController.cs`. It will be responsible for saving the new data items. Name the method `Create`.  The `Create` method has to return a collection of the created records with the assigned Id field.

        public JsonResult Create([DataSourceRequest] DataSourceRequest request, EmployeeDirectoryModel employee)
        {
            if (ModelState.IsValid)
            {
                employeeDirectory.Insert(employee, ModelState);
            }

            return Json(new[] { employee }.ToTreeDataSourceResult(request, ModelState));
        }

1. Add a new action method to `TreeListController.cs`. It will be responsible for saving the updated data items. Name the method `Update`.

        public JsonResult Update([DataSourceRequest] DataSourceRequest request, EmployeeDirectoryModel employee)
        {
            if (ModelState.IsValid)
            {
                employeeDirectory.Update(employee, ModelState);
            }

            return Json(new[] { employee }.ToTreeDataSourceResult(request, ModelState));
        }

1. Add a new action method to `TreeListController.cs`. It will be responsible for saving the deleted data items. Name the method `Destroy`.

        public JsonResult Destroy([DataSourceRequest] DataSourceRequest request, EmployeeDirectoryModel employee)
        {
            if (ModelState.IsValid)
            {
                employeeDirectory.Delete(employee, ModelState);
            }

            return Json(new[] { employee }.ToTreeDataSourceResult(request, ModelState));
        }

1. In the view, configure the TreeList to use the action methods created in the previous steps. The `Create`, `Update`, and `Destroy` action methods have to return a collection with the modified or deleted records so the DataSource on the client is aware of the server-side changes.

        @(Html.Kendo().TreeList<Kendo.Mvc.Examples.Models.TreeList.EmployeeDirectoryModelPopUp>()
            .Name("treelist")
            .Toolbar(toolbar => toolbar.Create())
            .Columns(columns =>
            {
                columns.Add().Field(e => e.FirstName).Width(220).Title("First Name");
                columns.Add().Field(e => e.LastName).Width(100).Title("Last Name");
                columns.Add().Width(300).Command(c =>
                {
                    c.CreateChild().Text("Add child");
                    c.Edit();
                    c.Destroy();
                });
            })
            .Editable(e => e.Mode("popup"))
            .DataSource(dataSource => dataSource
                .Create(create => create.Action("Create", "EmployeeDirectory"))
                .Read(read => read.Action("All", "EmployeeDirectory"))
                .Update(update => update.Action("Update", "EmployeeDirectory"))
                .Destroy(delete => delete.Action("Destroy", "EmployeeDirectory"))
                .Model(m =>
                {
                    m.Id(f => f.EmployeeId);
                    m.ParentId(f => f.ReportsTo);
                })
            )
        )	  

## See Also

* [Editing Approaches by the TreeList HtmlHelper for {{ site.framework }} (Demos)](https://demos.telerik.com/{{ site.platform }}/treelist/editing)
* [Server-Side API](/api/treelist)
