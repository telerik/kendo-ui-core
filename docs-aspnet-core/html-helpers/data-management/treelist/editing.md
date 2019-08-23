---
title: Editing
page_title: Editing | Telerik UI for ASP.NET Core HTML Helpers
description: "Learn how to configure the Telerik UI TreeList HtmlHelper and enable CRUD operations."
slug: editing_aspnetcore_treelist_helper
position: 3
---

# Editing

The [Telerik UI TreeList HtmlHelper](https://demos.telerik.com/aspnet-core/treelist) provides a built-in editing functionality.

To implement the editing functionality of the TreeList:

1. [Set the model](#setting-the-model)
1. [Configure the transport](#configuring-the-transport)

## Setting the Model

All CRUD operations of the TreeList HtmlHelper require a model with `Id` and `ParentId` fields. Those models has to be configured in the DataSource of the TreeList. Based on the `ParentId` field, the TreeList distinguishes the root items. If the `ParentId` field is nullable, root items with be items whose `ParentId` field values are `null`. If the `ParentId` is not nullable, root items will be items which have a default value for their data type.

 The following example demonstrates how to use the nullable model&mdash;items with ParentId `null` will be root items.

```tab-Razor
 	.DataSource(dataSource => dataSource
	...
	.Model(m => {
		m.Id(f => f.EmployeeId);
		m.ParentId(f => f.ReportsTo).Nullable(true);
```
```tab-Model
    public int? ReportsTo { get; set; }
	public int EmployeeId { get; set; }
```

The following example demonstrates how to use the non-nullable model&mdash;items with ParentId `string.empty` will be root items.

```tab-Razor
 	.DataSource(dataSource => dataSource
	...
	.Model(m => {
		m.Id(f => f.EmployeeId);
		m.ParentId(f => f.ReportsTo).Nullable(false);
```
```tab-Model
    public string ReportsTo { get; set; }
	public string EmployeeId { get; set; }
```

## Configuring the Transport

Once the schema is configured, you need to configure the action methods in the DataSource for `"Update"`, `"Destroy"`, and `"Create"`. An important part of the CRUD operations is the response from the service, which needs to return the manipulated records, so that the TreeList can apply the changes to the DataSource accordingly. The new records also have to contain the newly assigned within the service `Id` value.

```
  .DataSource(dataSource => dataSource
      .Create(create => create.Action("Create", "EmployeeDirectory"))
      .Read(read => read.Action("All", "EmployeeDirectory"))
      .Update(update => update.Action("Update", "EmployeeDirectory"))
      .Destroy(delete => delete.Action("Destroy", "EmployeeDirectory"))
```

## Edit Modes

The TreeList supports the following edit modes:

* [Popup and inline editing](#popup-and-inine-editing)
* [Incell editing](#incell-editing)
* [Editing by dragging and dropping of rows](#editing-by-dragging-and-dropping)

### Popup and Inline Editing

To enable the popup and inline edit modes, configure the toolbar to display the **Add new record** button and define a command column for the **Update**, **Delete**, and **Add child** buttons. The only difference between the inline and popup edit modes is the position of the rendered editors. With the popup editing, the editors are rendered in a modal window and with the inline edit mode, the editors are rendered in the `tr` element of the edited record. For runnable examples, refer to the demos on [popup editing of the TreeList](https://demos.telerik.com/aspnet-core/treelist/editing-popup).

```
    @(Html.Kendo().TreeList<Kendo.Mvc.Examples.Models.TreeList.EmployeeDirectoryModel>()
    	.Name("treelist")
    	.Toolbar(toolbar => toolbar.Create())
    	.Editable(e => e.Mode("popup"))
    	.Columns(columns =>
    	{
    		...
    		columns.Add().Width(300).Command(c =>
    		{
    			c.CreateChild().Text("Add child");
    			c.Edit();
    			c.Destroy();
    		})
```

### Incell Editing

The incell (batch) edit mode renders editor per field when the user clicks on a particular cell of the record. It allows multiple edits before the **Save changes** button is clicked, which can then send all changes to the service.

With the incell edit mode you do not need to use the command buttons for update, because the editing is initiated on cell click. Another difference from the other two edit modes are the commands in the toolbar, which includes the **Save changes** and **Cancel changes** buttons for saving or canceling all changes with a single click.

Due to the specifics of the TreeList, creating a child node for a new record is not supported, because in order for a child to be created, the parent node must have an assigned `id`. However, since the `id` is assigned within the service on the `create` action, when the new record is not saved, it will not have `id`. The code within the `dataBound` event ensures that the **createChild** button is removed for all new records. For a runnable example, refer to the [demo on incell editing in the TreeList](https://demos.telerik.com/aspnet-core/treelist/editing-incell).

```
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
			...
			columns.Add().Command(c =>
				{
					c.CreateChild().Text("Add child");
					c.Destroy();
				}
			).Width(240);
		})
		.Events(ev => ev.DataBound("onDataBound"))
		.Editable(e => e.Mode(TreeListEditMode.InCell))
		.DataSource(dataSource => dataSource
			.Batch(true)
			.Read(read => read.Action("All_InCell", "TreeList"))
			.Create(create => create.Action("Create_InCell", "TreeList").Type(HttpVerbs.Post))
			.Update(update => update.Action("Update_InCell", "TreeList").Type(HttpVerbs.Post))
			.Destroy(delete => delete.Action("Destroy_InCell", "TreeList").Type(HttpVerbs.Post))
			.Model(m =>
			{
				m.Id(f => f.EmployeeId);
				m.ParentId(f => f.ReportsTo).Nullable(true);
				m.Expanded(true);
				...
			})
		)
	)
 	<script>
		// The following code removes the 'Add child' button from the new records,
		// because they will receive an ID after saving the changes, which means that
		// no child records could be added until then.
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
```

### Editing by Dragging and Dropping

> Currently, the dragging and dropping of items (`.Editable(editable=>editable.Move(true))`) is not supported with the incell edit mode of the TreeList because the draggable functionality prevents the `mousedown` event. As a result, the `change` event of the editor input does not fire, which in turn prevents the MVVM binding from saving the updated value. To work around this problem, refer to [this GitHub issue](https://github.com/telerik/kendo-ui-core/issues/4673).

When the `.Editable(editable=>editable.Move(true))` option is set to `true`, the user can drag and drop the rows and the TreeList internally updates the `ParentId` field. To persist the new hierarchy, configure the TreeList data source for CRUD operations and set `transport.update` as a bare minimum. For a runnable example, refer to the [demo on editing by dragging and dropping the rows of the TreeList](https://demos.telerik.com/aspnet-core/treelist/dragdrop).

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

* [Editing by the TreeList HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/treelist/editing)
* [Incell Editing by the TreeList HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/treelist/editing-incell)
* [Popup Editing by the TreeList HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/treelist/editing-popup)
* [Editing by Dragging and Dropping in the TreeList HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/treelist/dragdrop)
* [Server-Side API](/api/treelist)
