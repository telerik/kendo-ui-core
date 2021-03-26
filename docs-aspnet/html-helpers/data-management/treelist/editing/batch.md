---
title: Incell
page_title: Incell Editing
description: "Enable cell edit mode and batch updates in Telerik UI TreeList HtmlHelper for {{ site.framework }}."
slug: htmlhelpers_treelist_aspnetcore_batch_editing
position: 2
---

# Incell Editing

The Telerik UI TreeList HtmlHelper for {{ site.framework }} enables you to implement cell editing and make and save batch updates.

For a runnable example, refer to the [demo on incell (batch) editing of the TreeList](https://demos.telerik.com/{{ site.platform }}/treelist/editing-incell).

To set the incell edit mode of the TreeList:

1. Add a new class to the `~/Models` folder. The following example uses the `EmployeeDirectoryModel` name.

        public class EmployeeDirectoryModel
        {
            public int EmployeeId { get; set; }
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public int? ReportsTo { get; set; }
        }

1.  Open `TreeListController.cs` and add a new action method which will return the **Directories** as JSON. The TreeList will make Ajax requests to this action.

        public JsonResult All_InCell([DataSourceRequest] DataSourceRequest request)
        {
            var result = GetDirectory().ToTreeDataSourceResult(request,
                e => e.EmployeeId,
                e => e.ReportsTo,
                e => e
            );

            return Json(result);
        }

1. Add a new action method to `TreeListController.cs`. It will be responsible for saving the new data items. Name the method `Create_InCell`.

        public JsonResult Create_InCell([DataSourceRequest] DataSourceRequest request, [Bind(Prefix = "models")]IEnumerable<EmployeeDirectoryModel> employees)
        {
            if (ModelState.IsValid)
            {
                foreach (var employee in employees)
                {
                    employeeDirectory.Insert(employee, ModelState);
                }
            }

            return Json(employees.ToTreeDataSourceResult(request, ModelState));
        }

1. Add a new action method to `TreeListController.cs`. It will be responsible for saving the updated data items. Name the method `Update_InCell`.

        public JsonResult Update_InCell([DataSourceRequest] DataSourceRequest request, [Bind(Prefix = "models")]IEnumerable<EmployeeDirectoryModel> employees)
        {
            if (ModelState.IsValid)
            {
                foreach (var employee in employees)
                {
                    employeeDirectory.Update(employee, ModelState);
                }
            }

            return Json(employees.ToTreeDataSourceResult(request, ModelState));
        }

1. Add a new action method to `TreeListController.cs`. It will be responsible for saving the deleted data items. Name the method `Destroy_InCell`.

        public JsonResult Destroy_InCell([DataSourceRequest] DataSourceRequest request, [Bind(Prefix = "models")]IEnumerable<EmployeeDirectoryModel> employees)
        {
            if (ModelState.IsValid)
            {
                foreach (var employee in employees)
                {
                    employeeDirectory.Delete(employee, ModelState);
                }
            }

            return Json(employees.ToTreeDataSourceResult(request, ModelState));
        }

1. In the view, configure the TreeList to use the action methods that were created in the previous steps. The `Create`, `Update`, and `Destroy` action methods have to return a collection with the modified or deleted records which will enable the DataSource to apply the changes accordingly. The `Create` method has to return a collection of the created records with the assigned ID field.

        @(Html.Kendo().TreeList<Kendo.Mvc.Examples.Models.TreeList.EmployeeDirectoryModel>()
            .Name("treelist")
            .Toolbar(toolbar =>
            {
                toolbar.Create();
                toolbar.Save();
                toolbar.Cancel();
            })
            .Columns(columns =>
            {
                columns.Add().Field(e => e.FirstName).Title("First Name").Width(220);
                columns.Add().Field(e => e.LastName).Title("Last Name").Width(100);
                columns.Add().Command(c =>
                    {
                        c.CreateChild().Text("Add child");
                        c.Destroy();
                    }
                ).Width(240);
            })
            .Editable(e => e.Mode(TreeListEditMode.InCell).Move(false))
            .Events(ev => ev.DataBound("onDataBound"))
            .DataSource(dataSource => dataSource
                .Batch(true)
                .Read(read => read.Action("All_InCell", "TreeList"))
                .Create(create => create.Action("Create_InCell", "TreeList").Type(HttpVerbs.Post))
                .Update(update => update.Action("Update_InCell", "TreeList").Type(HttpVerbs.Post))
                .Destroy(delete => delete.Action("Destroy_InCell", "TreeList").Type(HttpVerbs.Post))
                .Model(m =>
                {
                    m.Id(f => f.EmployeeId);
                    m.ParentId(f => f.ReportsTo);
                })
            )
        )
        <script>
            // The following code removes the 'Add child' button from the new records,
            // because they will receive an ID after saving the changes, which means that
            // no child records can be added until that.
            function onDataBound(e) {
                var items = e.sender.items();
                for (var i = 0; i < items.length; i++) {
                    var row = $(items[i]);
                    var dataItem = e.sender.dataItem(row);
                    if (dataItem.isNew()) {
                        row.find("[data-command='createchild']").hide();
                    }
                    else {
                        row.find("[data-command='createchild']").show();
                    }
                }
            }
        </script>

## See Also

* [Incell Editing by the TreeList HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/treelist/editing-incell)
* [Server-Side API](/api/treelist)
