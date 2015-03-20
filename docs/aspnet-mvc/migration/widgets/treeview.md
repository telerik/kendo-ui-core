---
title: TreeView
page_title: API documentation for Kendo UI jQuery TreeView widget for ASP.NET MVC
description: This documentation guides you how to load data on demand in the server-side API of Kendo UI TreeView for ASP.NET MVC and serialize JSON format data from the server.
---

# Server-side API

### Remote data binding (Load On Demand)

#### Old

    <%= Html.Telerik().TreeView()
         .Name("TreeView")
         .DataBinding(dataBinding => dataBinding
             .Ajax().Select("_AjaxLoading", "TreeView")
         )
     %>

#### New

    <%= Html.Telerik().TreeView()
         .Name("TreeView")
         .DataSource(source => {
               source.Read(read =>
               {
                   read.Action("_AjaxLoading ", "TreeView");
               });
         })
     %>

### Serializing Data

Data from the server should be serialized in the following JSON format:

    {
        id: String,
        text: String,
        url: String,
        imageUrl: String,
        spriteCssClass: String,
        hasChildren: Boolean
    }

All fields are optional (skipping the text field will show the item with the text “undefined”). The text/url/imageUrl/spriteCssClass field names can be changed through the DataTextField/DataUrlField/DataImageUrlField/DataSpriteCssClassField fluent methods:

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

The above code allows the items to be serialized in the following form:

    {
        id: 2,
        text: "Andrew",
        hasChildren: true
    }

### Changing The Field That Posts The Item ID

By default, the **id** field will be posted to the server. To change the parameter name, you can use the Data handler:

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

The value field is removed.  Depending on your use case, you can either:

- If the value was used for load on demand, use the **id** field.  The id will be inferred in the client-side datasource and will be used when making requests for more data.

-  If the value was used to store arbitrary data, serialize it in a data-* attribute through the item HtmlAttributes, or if a DataSource is used, access the additional data through the **dataItem** client-side method.

### Conditional load on demand for some nodes

This behavior can be achieved using a custom transport, like shown in the how to [mix local data and remote binding article](/web/treeview/how-to/mix-local-data-and-remote-loading). Defining the local transport via the server-side wrappers can be done like this:

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

Use the checkboxes builder to render checkboxes or enable tri-state checkboxes:

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

#### Conditionally showing checkboxes

This functionality requires a custom checkbox template:

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

Any conditional code executed in the client-side template. See also [how to hide checkboxes for root level](/web/treeview/how-to/hide-checkboxes-for-root-level).

#### Show node lines

Node line functionality is not supported out of the box, but can be achieved via custom styling, as shown in the [show lines between nodes help topic](/web/treeview/how-to/show-node-lines).


# Client-Side API Changes

#### MVC -> Kendo

##### ajaxRequest

Removed. Use **dataItem.children.read()** (after obtaining the dataItem through **treeview.dataItem(node)**)

##### dataBind

Removed. Use **treeview.dataSource.read()**

##### disable

Removed. Use **treeview.enable(node, false)**

##### getItemText

Renamed. Use **treeview.text(node)**

##### getItemValue

Removed. See the [Value Field Is Removed](#value-field-is-removed) section of this document.

##### findByValue

Removed. See the [Value Field Is Removed](#value-field-is-removed) section of this document. An alternative is to use **treeview.findByUid** and access additional data in the related dataItem.

##### nodeCheck

Removed. See the [Checkbox Support](#checkbox-support) section of this document.

## Client-Side Events Changes

Apart from changing the event builders, the following changes have been introduced:

#### MVC -> Kendo

##### OnLoad

Removed. Use **$(document).ready()**

##### OnChecked

Removed. See the [Checkbox Support](#checkbox-support) section of this document.

##### OnDataBinding

Removed. Use the DataSource events

##### OnDataBound

Removed. Use the DataSource events

##### OnError

Removed. Use the DataSource events

##### OnNodeDragStart

Renamed. Use the **DragStart** event

##### OnNodeDragging

Renamed. Use the **Drag** event

##### OnNodeDrop

Renamed. Use the **Drop** event

##### OnNodeDropped

Renamed. Use the **DragEnd** event
