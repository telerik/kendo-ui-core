---
title: Drag-and-Drop
page_title: Editing by Dragging and Dropping
description: "Learn how to enable the drag-and-drop editing of the Telerik UI TreeList HtmlHelper for {{ site.framework }}."
slug: htmlhelpers_treelist_aspnetcore_drag_drop_editing
position: 5
---

# Editing by Dragging and Dropping

> Currently, the dragging and dropping of items (`.Editable(editable=>editable.Move(true))` and `.Editable(editable=>editable.Move(move => move.Reorderable(true)))`) is not supported with the incell edit mode of the TreeList because the draggable functionality prevents the `mousedown` event. As a result, the `change` event of the editor input does not fire, which in turn prevents the MVVM binding from saving the updated value. To work around this problem, refer to [this GitHub issue](https://github.com/telerik/kendo-ui-core/issues/4673).

When the `.Editable(editable=>editable.Move(true))` property is set to `true`, the user can drag and drop the rows and the TreeList internally updates the `ParentId` field. Setting the `.Editable(editable=>editable.Move(move => move.Reorderable(true)))` property to `true` enables users not only to move items to a different level in the hierarchy but also allows users to reorder items within a particular hierarchy level.

To persist the new hierarchy, configure the TreeList data source for CRUD operations and set `transport.update` as a bare minimum. For a runnable example, refer to the [demo on editing by dragging and dropping the rows of the TreeList](https://demos.telerik.com/{{ site.platform }}/treelist/dragdrop).

```tab-Razor
    @(Html.Kendo().TreeList<EmployeeViewModel>()
    	.Name("treelist")
    	.Toolbar(t=>t.Save()) /* to batch save the new hierarchy */
		.DataSource(dataSource => dataSource
        	.Batch(true) /* enable batch operations */
        	.Read(read => read.Action("Employees_Read", "TreeList"))
        	.Update(update => update.Action("Employees_Update", "TreeList"))
        	.Model(m =>
        	{
        	    m.Id(f => f.OrderID);
        	    m.ParentId(f => f.ParentOrderID).Nullable(true);
        	    m.Expanded(true);
        	})
    	)
		/* other TreeList settings */
	)
```
```tab-Controller
	// The TreeList sends the updated items with prefix "models".
  // Remember to bind it in the controller so that the collection can be intercepted.
	public JsonResult Update([DataSourceRequest] DataSourceRequest request, [Bind(Prefix = "models")]IEnumerable<EmployeeDirectoryModel> employees).
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
```

## See Also

* [Editing by Dragging and Dropping in the TreeList HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/treelist/dragdrop)
* [Server-Side API](/api/treelist)
