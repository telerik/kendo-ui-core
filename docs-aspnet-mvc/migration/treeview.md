---
title: TreeView
page_title: Migrating the TreeView Extension | Telerik UI for ASP.NET MVC
description: "Handle the Telerik UI ASP.NET MVC server-side API for migrating the TreeView Extension."
previous_url: /migration/widgets/treeview
slug: treeview_migrationextensions_aspnetmvc
---

# Migrating the TreeView Extension

To migrate the Telerik UI TreeView Extension for ASP.NET MVC to Telerik UI for ASP.NET MVC, use the available and updated API.

* The following example demonstrates the change when setting the remote data binding in the TreeView.

    ```Previous

        <%= Html.Telerik().TreeView()
             .Name("TreeView")
             .DataBinding(dataBinding => dataBinding
                 .Ajax().Select("_AjaxLoading", "TreeView")
             )
         %>
    ```
    ```Current

        <%= Html.Telerik().TreeView()
             .Name("TreeView")
             .DataSource(source => {
                   source.Read(read =>
                   {
                       read.Action("_AjaxLoading ", "TreeView");
                   });
             })
         %>
    ```

* Data from the server must be serialized in the JSON format.

    {
        id: String,
        text: String,
        url: String,
        imageUrl: String,
        spriteCssClass: String,
        hasChildren: Boolean
    }

    All fields are optional&mdash;skipping the text field shows the item with the text `undefined`. The `text`, `url`, `imageUrl`, or `spriteCssClass` field names can be changed through the `DataTextField`, `DataUrlField`, `DataImageUrlField`, or `DataSpriteCssClassField` fluent methods, as demonstrated in the example below.

        <%= Html.Kendo().TreeView()
             .Name("TreeView")
             .DataTextField("text")
             .DataSource(source => {
                   source.Read(read =>
                   {
                       read.Action("_AjaxLoading ", "TreeView");
                   });
             })
         %>

   The code from the previous example allows the items to be serialized in the following form.

        {
            id: 2,
            text: "Andrew",
            hasChildren: true
        }

* By default, the `id` field is posted to the server. To change the parameter name, use the Data handler.

    <%= Html.Kendo().TreeView()
        .Name("TreeView")
        .DataSource(dataSource => dataSource
            .Read(read => read
                .Action("Employees", "TreeView")
                .Data("addData")
            )
        )
    %>

    <script>
        function addData(data) {
            return { employeeId: data.id };
        }
    </script>

* The value field is removed. Depending on your use case, apply either of the approaches below.

    - If the value was used for load on demand, use the `id` field. The id will be inferred in the client-side `dataSource` and will be used when making requests for more data.
    - If the value was used to store arbitrary data, serialize it in a `data-*` attribute through the `HtmlAttributes` item, or if a DataSource is used, access the additional data through the `dataItem` client-side method.

* The conditional load on demand for some nodes can be achieved through using custom transport, as demonstrated in the article on [mixing local data and remote binding](https://docs.telerik.com/kendo-ui/controls/navigation/treeview/how-to/binding/mix-local-data-and-remote-loading). Define the local transport by using the server-side wrappers in the following way.

    @(Html.Kendo().TreeView()
        .Name("treeview")
        .DataSource(dataSource => dataSource
            .Custom().Transport(t => t.Read("onRead"))
        )
    )

    <script>
        function onRead(options) {
            options.success(
                // use fetched data
            )
        }
    </script>

* Use the checkboxes builder to render checkboxes or enable tri-state checkboxes.

    @(Html.Kendo().TreeView()
        .Name("TreeView")
        .Checkboxes(true)  // simple check boxes, posting an array of IDs
    )

    @(Html.Kendo().TreeView()
        .Name("TreeView")
        .Checkboxes(settings => settings
            .CheckChildren(true) // enables tri-state checkboxes, which check sub-nodes
        )
    )

* The conditional checkboxes display requires a custom checkbox template as demonstrated in the following example. For more information, refer to the article on [how to hide checkboxes for root level](https://docs.telerik.com/kendo-ui/controls/navigation/treeview/how-to/templates/hide-checkboxes-for-root-level).

    @(Html.Kendo().TreeView()
        .Name("TreeView")
        .Checkboxes(settings => settings
            .Template(
                // Use conditional rendering.
                "# if ('checkable' in item && item.checkable) { #" +
                    "<input type='checkbox' #= item.checked ? 'checked' : '' #>" +
                "# } #"
            )
        )
    )

* The node-line functionality is not supported out of the box, but can be achieved through custom styling, as demonstrated in the article on [how to show lines between nodes](https://docs.telerik.com/kendo-ui/controls/navigation/treeview/how-to/appearance/show-node-lines).

* The following table lists the changes when using the client-side API configuration in the TreeView.

    |Previous           |Current        |
    |:---               |:---             |
    | `ajaxRequest`     | Now removed. Use `dataItem.children.read()` after obtaining the `dataItem` through `treeview.dataItem(node)`.
    | `dataBind`        | Now removed. Use `treeview.dataSource.read()` instead.
    | `disable`         | Now removed. Use `treeview.enable(node, false)` instead.
    | `getItemText`     | Now renamed. Use `treeview.text(node)`.
    | `getItemValue`    | Now removed. Refer to the section on [removed value fields](#value-field-is-removed).
    | `findByValue`     | Now removed. Refer to the section on [removed value fields](#value-field-is-removed). An alternative is to use `treeview.findByUid` and access additional data in the related `dataItem`.
    | `nodeCheck`       | Now removed. Refer to the section on [checkbox support](#checkbox-support).

* The following table lists the changes apart from the changes in the event builders.

    |Previous           |Current        |
    |:---               |:---             |
    | `OnLoad`          | Now removed. Use `$(document).ready()` instead.
    | `OnChecked`       | Now removed. Refer to the section on [checkbox support](#checkbox-support).
    | `OnDataBinding`   | Now removed. Use the DataSource events instead.
    | `OnDataBound`     | Now removed. Use the DataSource events instead.
    | `OnError`         | Now removed. Use the DataSource events instead.
    | `OnNodeDragStart` | Now renamed. Use the `DragStart` event.
    | `OnNodeDragging`  | Now renamed. Use the `Drag` event.
    | `OnNodeDrop`      | Now renamed. Use the `Drop` event.
    | `OnNodeDropped`   | Now renamed. Use the `DragEnd` event.

## See Also

* [Migrating the AutoComplete]({% slug autocomplete_migrationextensions_aspnetmvc %})
* [Migrating from Telerik UI Extensions (Overview of Changes)]({% slug overview_migrationextensions_aspnetmvc %})
