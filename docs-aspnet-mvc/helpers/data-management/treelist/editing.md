---
title: Editing
page_title: Editing | Telerik UI TreeList HtmlHelper for ASP.NET MVC
description: "Learn how to configure Telerik UI TreeList HtmlHelper and enable CRUD operations."
slug: editing_mvc_treelist_helper
position: 2
---

# Editing

The [Telerik UI TreeList HtmlHelper](https://demos.telerik.com/aspnet-mvc/treelist) provides a built-in editing functionality.

To implement the editing functionality of the TreeList:

1. [Set the model](#setting-the-model)
1. [Configure the transport](#configuring-the-transport)

## Setting the Model

All CRUD operations of the TreeList HtmlHelper require a model with `Id` and `ParentId` fields. Those models has to be configured in the DataSource of the TreeList.

    .DataSource(dataSource => dataSource
        ...
        .Model(m => {
            m.Id(f => f.EmployeeId);
            m.ParentId(f => f.ReportsTo);

## Configuring the Transport

Once the schema is configured, you need to configure the action methods in the DataSource for `"Update"`, `"Destroy"`, and `"Create"`. An important part of the CRUD operations is the response from the service, which needs to return the manipulated records, so that the TreeList can apply the changes to the DataSource accordingly. The new records also have to contain the newly assigned within the service `Id` value.

    .DataSource(dataSource => dataSource
        .Create(create => create.Action("Create", "EmployeeDirectory"))
        .Read(read => read.Action("All", "EmployeeDirectory"))
        .Update(update => update.Action("Update", "EmployeeDirectory"))
        .Destroy(delete => delete.Action("Destroy", "EmployeeDirectory"))

## Edit Modes

The TreeList supports the following edit modes:

* [Popup and inline editing](#popup-and-inine-editing)
* [Incell editing](#incell-editing)

### Popup and Inline Editing

To enable the popup and inline edit modes, configure the toolbar to display the **Add new record** button and define a command column for the **Update**, **Delete**, and **Add child** buttons. The only difference between the inline and popup edit modes is the position of the rendered editors. With the popup editing, the editors are rendered in a modal window and with the inline edit mode, the editors are rendered in the `tr` element of the edited record. For runnable examples, refer to the demo on [popup editing of the TreeList](https://demos.telerik.com/aspnet-mvc/treelist/editing-popup).

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

### Incell Editing

The incell (batch) edit mode renders editor per field when the user clicks on a particular cell of the record. It allows multiple edits before the **Save changes** button is clicked, which can then send all changes to the service.

With the incell edit mode you do not need to use the command buttons for update, because the editing is initiated on cell click. Another difference from the other two edit modes are the commands in the toolbar, which includes the **Save changes** and **Cancel changes** buttons for saving or canceling all changes with a single click.

Due to the specifics of the TreeList, creating a child node for a new record is not supported, because in order for a child to be created, the parent node must have an assigned `id`. However, since the `id` is assigned within the service on the `create` action, when the new record is not saved, it will not have `id`. The code within the `dataBound` event ensures that the **createChild** button is removed for all new records. For a runnable example, refer to the [demo on incell editing in the TreeList](https://demos.telerik.com/aspnet-mvc/treelist/editing-incell).

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
                m.ParentId(f => f.ReportsTo);
                m.Expanded(true);
                ...
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

* [Editing by the TreeList HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/treelist/editing)
* [Incell Editing by the TreeList HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/treelist/editing-incell)
* [Popup Editing by the TreeList HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/treelist/editing-popup)
* [TreeList Server-Side API](/api/treelist)
* [TreeList Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/treelist)
