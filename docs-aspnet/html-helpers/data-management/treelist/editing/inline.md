---
title: Inline
page_title: Inline Editing
description: "Define commands and set the edit mode to configure the Telerik UI TreeList HtmlHelper for {{ site.framework }} for inline editing."
slug: htmlhelpers_treelist_aspnetcore_inline_editing
position: 3
---

# Inline Editing

You can define commands and set the edit mode to configure the Telerik UI TreeList for {{ site.framework }} for inline editing.

For runnable examples, refer to the [demos on implementing the editing approaches in the TreeList](https://demos.telerik.com/{{ site.platform }}/treelist/editing).

To set the inline edit mode of the TreeList:

1. Add a new class to the `~/Models` folder. The following example uses the `EmployeeDirectoryModel` name.

        public class EmployeeDirectoryModel
        {
            public int EmployeeId { get; set; }
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public int? ReportsTo { get; set; }
        }

1.  Open `TreeListController.cs` and add a new action method which will return the **Directories** as JSON. The TreeList will make Ajax requests to this action.

        public JsonResult All([DataSourceRequest] DataSourceRequest request)
        {
            var result = GetDirectory().ToTreeDataSourceResult(request,
                e => e.EmployeeId,
                e => e.ReportsTo,
                e => e
            );

            return Json(result);
        }

1. Add a new action method to `TreeListController.cs`. It will be responsible for saving the new data items. Name the method `Create`.

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

1. In the view, configure the TreeList to use the action methods that were created in the previous steps. The `Create`, `Update`, and `Destroy` action methods have to return a collection with the modified or deleted records which will enable the DataSource to apply the changes accordingly. The `Create` method has to return a collection of the created records with the assigned ID field.

        @(Html.Kendo().TreeList<Kendo.Mvc.Examples.Models.TreeList.EmployeeDirectoryModel>()
            .Name("treelist")
            .Toolbar(toolbar => toolbar.Create())
            .Columns(columns =>
            {
                columns.Add().Field(e => e.FirstName).Title("First Name").Width(220);
                columns.Add().Field(e => e.LastName).Title("Last Name").Width(100);
                columns.Add().Field(e => e.Position);
                columns.Add().Field(e => e.HireDate).Format("{0:MMMM d, yyyy}");
                columns.Add().Field(e => e.Phone);
                columns.Add().Field(e => e.Extension).Title("Ext").Format("{0:#}");
                columns.Add().Width(300).Command(c =>
                {
                    c.CreateChild().Text("Add child");
                    c.Edit();
                    c.Destroy();
                })
                .HtmlAttributes(new
                {
                    style = "text-align: center;"
                });
            })
            .Editable()
            .DataSource(dataSource => dataSource
                .Create(create => create.Action("Create", "TreeList"))
                .Read(read => read.Action("All", "TreeList"))
                .Update(update => update.Action("Update", "TreeList"))
                .Destroy(delete => delete.Action("Destroy", "TreeList"))
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
