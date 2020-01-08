---
title: Overview
page_title: Editing Overview
description: "Learn how to configure the Telerik UI TreeList HtmlHelper for {{ site.framework }} and enable CRUD operations."
previous_url: /helpers/data-management/treelist/editing
slug: editing_aspnetcore_treelist_helper
position: 1
---

# Editing Overview

The [Telerik UI TreeList HtmlHelper](https://demos.telerik.com/{{ site.platform }}/treelist) provides a built-in editing functionality.

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

* [Incell (batch) editing]({% slug htmlhelpers_treelist_aspnetcore_batch_editing %})
* [Inline editing]({% slug htmlhelpers_treelist_aspnetcore_inline_editing %} )
* [Popup editing]({% slug htmlhelpers_treelist_aspnetcore_popup_editing %})
* [Editing by dragging and dropping of rows]({% slug htmlhelpers_treelist_aspnetcore_drag_drop_editing %})

## See Also

* [Editing by the TreeList HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/treelist/editing)
* [Incell Editing by the TreeList HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/treelist/editing-incell)
* [Popup Editing by the TreeList HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/treelist/editing-popup)
* [Editing by Dragging and Dropping in the TreeList HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/treelist/dragdrop)
* [Server-Side API](/api/treelist)
