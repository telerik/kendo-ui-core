---
title: TreeView
page_title: TreeView | Migrate from Telerik Extensions
description: "Handle ASP.NET MVC server-side API for the Kendo UI TreeView widget."
slug: treeview_migrationextensions_aspnetmvc
---

# TreeView Migration

This article demonstrates the ASP.NET MVC server-side API for the Kendo UI TreeView widget.

## Server-side API

### Remote Data Binding

```tab-Previous

    <%= Html.Telerik().TreeView()
         .Name("TreeView")
         .DataBinding(dataBinding => dataBinding
             .Ajax().Select("_AjaxLoading", "TreeView")
         )
     %>
```
```tab-Current

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

### Data Serialization

Data from the server must be serialized in the JSON format demonstrated in the example below.

###### Example

    {
        id: String,
        text: String,
        url: String,
        imageUrl: String,
        spriteCssClass: String,
        hasChildren: Boolean
    }

All fields are optional&mdash;skipping the text field shows the item with the text `undefined`. The `text`, `url`, `imageUrl`, or `spriteCssClass` field names can be changed through the `DataTextField`, `DataUrlField`, `DataImageUrlField`, or `DataSpriteCssClassField` fluent methods, as demonstrated in the example below.

###### Example

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
<!--_-->
The above code allows the items to be serialized in the form below.

###### Example

    {
        id: 2,
        text: "Andrew",
        hasChildren: true
    }

### Item-Posting Field Change

By default, the `id` field is posted to the server. To change the parameter name, use the Data handler.

###### Example

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

### Value Field

The value field is removed. Depending on your use case, apply either of the approaches below.

- If the value was used for load on demand, use the `id` field. The id will be inferred in the client-side `dataSource` and will be used when making requests for more data.
- If the value was used to store arbitrary data, serialize it in a `data-*` attribute through the `HtmlAttributes` item, or if a DataSource is used, access the additional data through the `dataItem` client-side method.

### Conditional Load on Demand

The conditional load on demand for some nodes can be achieved through using custom transport, as demonstrated in the article on [mixing local data and remote binding]({% slug howto_combinelocaldatawithremoteloading_treeview %}).

Define the local transport by using the server-side wrappers in the way shown below.

###### Example

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

### CheckBox Support

Use the checkboxes builder to render checkboxes or enable tri-state checkboxes.

###### Example

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

#### Conditional Checkboxes Display

This functionality requires a custom checkbox template, as demonstrated in the example below.

###### Example

    @(Html.Kendo().TreeView()
        .Name("TreeView")
        .Checkboxes(settings => settings
            .Template(
                // Use conditional rendering
                "# if ('checkable' in item && item.checkable) { #" +
                    "<input type='checkbox' #= item.checked ? 'checked' : '' #>" +
                "# } #"
            )
        )
    )

For more information on this issue, refer to the article on [how to hide checkboxes for root level]({% slug howto_hidecheckboxesforrootlevel_treeview %}).

#### Node Lines Display

The node-line functionality is not supported out of the box, but can be achieved through custom styling, as demonstrated in the article on [how to show lines between nodes]({% slug howto_showlinesbetweennodes_treeview %}).

## Client-Side API

### Configuration

| MVC               | Kendo UI        |
|:---               |:---             |
| `ajaxRequest`     | Now removed. Use `dataItem.children.read()` after obtaining the `dataItem` through `treeview.dataItem(node)`.
| `dataBind`        | Now removed. Use `treeview.dataSource.read()` instead.
| `disable`         | Now removed. Use `treeview.enable(node, false)` instead.
| `getItemText`     | Now renamed. Use `treeview.text(node)`.
| `getItemValue`    | Now removed. Refer to the section on [removed value fields](#value-field-is-removed).
| `findByValue`     | Now removed. Refer to the section on [removed value fields](#value-field-is-removed). An alternative is to use `treeview.findByUid` and access additional data in the related `dataItem`.
| `nodeCheck`       | Now removed. Refer to the section on [checkbox support](#checkbox-support).

### Events

Apart from changing the event builders, the changes listed below are now introduced.

| MVC               | Kendo UI        |
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

Other articles on migrating from Telerik Extensions:

* [Migrate the AutoComplete]({% slug autocomplete_migrationextensions_aspnetmvc %})
* [Migrate the Calendar]({% slug calendar_migrationextensions_aspnetmvc %})
* [Migrate the Chart]({% slug chart_migrationextensions_aspnetmvc %})

To see the articles on migrating Кendo UI controls from Telerik Extensions, browse [this section]({% slug combobox_migrationextensions_aspnetmvc %}).
