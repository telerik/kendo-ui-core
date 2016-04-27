---
title: Grid
page_title: Grid | Migrate from Telerik Extensions
description: "Handle ASP.NET MVC server-side API for the Kendo UI Grid widget."
slug: grid_migrationextensions_aspnetmvc
---

# Grid Migration

This article demonstrates the ASP.NET MVC server-side API for the Kendo UI Grid widget.

## Server-Side API

### DataKeys

The `DataKeys` configuration option is now moved to the `Datasource` model configuration.

```tab-Previous

    Html.Telerik().Grid<Order>()
        .Name("Grid")       
        .DataKeys(dataKeys => dataKeys.Add(o => o.OrderID))
```
```tab-Current

    Html.Kendo().Grid<Order>()
        .Name("Grid")
        .DataSource(dataSource => dataSource
            .Ajax()
            .Model(model => model.Id(o => o.OrderID))
        )
```

### Data Binding

#### Configuration

The `DataBinding` configuration is now moved to the `Datasource`.

```tab-Previous

    Html.Telerik().Grid<Order>()
        .Name("Grid")      
        .DataBinding(dataBinding => dataBinding.Ajax().Select("_AjaxBinding", "Grid"))

```
```tab-Current    

    Html.Kendo().Grid<Order>()   
        .Name("Grid")  
        .DataSource(dataSource => dataSource
            .Ajax()
            .Read(read => read.Action("AjaxBinding ", "Grid"))
        )
```

#### Methods

The `DataBinding.WebService` configuration option is now removed.

The `OperationMode` configuration option is now changed to `ServerOperation`.

```tab-Previous

    Html.Telerik().Grid<Order>()
        .Name("Grid")      
        .DataBinding(dataBinding => dataBinding.Ajax().OperationMode(GridOperationMode.Client))
```
```tab-Current

    Html.Kendo().Grid<Order>()
        .Name("Grid")
        .DataSource(dataSource => dataSource
            .Ajax()
            .ServerOperation(false)
        )
```

#### URL Methods

The `DataBinding` `URL` methods are now renamed to match the Kendo UI `Datasource` client configuration.

| Previous    | Current         |
|:---         |:---             |
| `Select`    | `Read`          |
| `Update`    | `Update`        |
| `Delete`    | `Destroy`       |
| `Insert`    | `Create`        |

#### DetailView

The `DetailView.Clienttemplate` configuration option is now changed to `ClientDetailTemplateId`.

```tab-Previous

    Html.Telerik().Grid<Order>()
        .Name("Grid")
        .DetailView(details => details.ClientTemplate(
            Html.Telerik().TabStrip()
            .Name("TabStrip_<#= EmployeeID #>")                                                                                                           
            .ToHtmlString()
        ))
```
```tab-Current

    Html.Kendo().Grid<Order>()
        .Name("Grid")
        .ClientDetailTemplateId("employeesTemplate")

    <script id="employeesTemplate" type="text/kendo-tmpl">
        @(Html.Kendo().TabStrip()
            .Name("TabStrip_#=EmployeeID#")           
            .ToClientTemplate())
    </script>
```

The `DetailView.Template` configuration option is now changed to `DetailTemplate`.

```tab-Previous

    Html.Telerik().Grid(Model)
        .Name("Employees")  
        .DetailView(detailView => detailView.Template(e =>
        {           
                Html.Telerik().TabStrip()
                    .Name("TabStrip_" + e.EmployeeID)
                    .Render();
        }))
```
```tab-Current

    Html.Kendo().Grid(Model)
        .Name("Employees")   
        .DetailTemplate(e =>
        {            
            Html.Kendo().TabStrip()
            .Name("TabStrip_" + e.EmployeeID)
            .Render();
        })
```

### Editing

| Previous            | Current        
|:---                 |:---             
| `InForms` mode      | No longer available.
| `InsertRowPosition` | Now renamed. Use `CreateAt` instead.
| `BeginEdit`         | No longer available.  
| `HtmlFormAttributes`| No longer available.

The Grid editing now uses the Kendo UI Validator instead of jQuery validate.

During updates, Telerik Extensions for ASP.NET MVC send the changed properties during updates only. With Kendo IU Complete for ASP.NET MVC, the whole model is now sent.

Buttons related to editing now use both images and text. There are no text-only or image-only buttons available.

Inline edit forms are immediately closed when the update button is clicked. This means that server validation errors should be handled and displayed in the `Error` event, as demonstrated in the example below.

###### Example

    //Omitted for brevity.
    .DataSource(dataSource => dataSource
        .Ajax()
        .Events(events => events.Error("error_handler"))
    )
    //Omitted for brevity.

    <script type="text/javascript">
        function error_handler(e) {
            if (e.errors) {
                var message = "Errors:\n";
                $.each(e.errors, function (key, value) {
                    if ('errors' in value) {
                        $.each(value.errors, function() {
                            message += this + "\n";
                            });
                        }
                    });
                alert(message);
            }
        }
    </script>

The `DefaultDataItem` is now moved to the `DataSource` model configuration.

```tab-Previous

    Html.Telerik().Grid<Order>()
        .Name("Grid")                           
        .Editable(editable => editable.DefaultDataItem(new Order {
            OrderDate = DateTime.Today
        }))
```
```tab-Current

    Html.Kendo().Grid<Order>()    
        .Name("Grid")     
        .DataSource(dataSource => dataSource
            .Ajax()
            .Model(model => model.Field(o => o.OrderDate).DefaultValue(DateTime.Today))
        )
```

### Grouping

The `Visible` option is now removed. The same functionality can be achieved by setting the `Groupable.Enabled` to `false` and the `Group` descriptors through the `DataSource`.

The `Groups` configuration option is now moved to the `Datasource`.

```tab-Previous

    Html.Telerik().Grid<Order>()
        .Name("Grid")                        
        .Groupable(groupable => groupable
            .Groups(groups => groups.Add(o => o.OrderDate))
        )    
```
```tab-Current

    Html.Kendo().Grid<Order>()   
        .Name("Grid")    
        .DataSource(dataSource => dataSource
            .Ajax()                       
            .Group(group => group.Add(o => o.OrderDate))
        )     
```

### Sorting

The `OrderBy` configuration option is now moved to the `DataSource` configuration.

```tab-Previous

    Html.Telerik().Grid<Order>()
        .Name("Grid")   
        .Sortable(sortable => sortable.OrderBy(order => order.Add(o => o.OrderDate).Ascending()))
```
```tab-Current

    Html.Kendo().Grid<Order>()   
        .Name("Grid")    
        .DataSource(dataSource => dataSource
            .Ajax()                       
            .Sort(sort => sort.Add(o => o.OrderDate).Ascending())
        )
```

### Filtering

The `Filters` configuration option is now moved to the `DataSource` configuration.

```tab-Previous

    Html.Telerik().Grid<Order>()
        .Name("Grid")   
        .Filterable(filtarable => filtarable.Filters(filters => filters.Add(o => o.OrderDate).IsEqualTo(DateTime.Today))
```
```tab-Current

    Html.Kendo().Grid<Order>()   
        .Name("Grid")        
        .DataSource(dataSource => dataSource
            .Ajax()                        
            .Filter(filter => filter.Add(o => o.OrderDate).IsEqualTo(DateTime.Today))
        )
```

### Pageable

| Previous            | Current    
|:---                 |:---             
| `Position`          | No longer available.
| `PageOnScroll`      | Now removed. Use the `Scrollable.Virtual` configuration to enable virtual scrolling instead.  
| `Style`             | Now removed. The Pager style can be configured by setting individual properties such as `Input`, `PageSizes`, `Info`, `Numeric`, `PreviousNext`.

The `PageSize` and `Total` are now moved to the DataSource configuration.

```tab-Previous

    Html.Telerik().Grid<Order>()
        .Name("Grid")   
        .Pageable(pageable => pageable.PageSize(42).Total(100))
```
```tab-Current

    Html.Kendo().Grid<Order>()   
    .Name("Grid")        
    .DataSource(dataSource => dataSource
        .Ajax()                       
        .PageSize(42)
        .Total(100)
    )
```

### Columns

The `Aggregates` configuration option is now moved to the DataSource configuration.

```tab-Previous

    Html.Telerik().Grid<Order>()
        .Name("Grid")   
        .Columns(columns =>
        {
            columns.Bound(o => o.OrderID)
            .Aggregate(agg => agg.Count());          
        })
```
```tab-Current

    Html.Kendo().Grid<Order>()   
        .Name("Grid"
        .Columns(columns =>
        {
            columns.Bound(o => o.OrderID);
        })
        .DataSource(dataSource => dataSource
            .Ajax()                       
            .Aggregates(agg => agg.Add(o => o.OrderID).Count())
        )
```

The `ReadOnly` configuration option is now moved to the `DataSource` model configuration.

```tab-Previous

    Html.Telerik().Grid<Order>()
        .Name("Grid")   
        .Columns(columns =>
        {
            columns.Bound(o => o.OrderID).ReadOnly(true);          
        })
```
```tab-Current

    Html.Kendo().Grid<Order>()   
        .Name("Grid")
        .Columns(columns =>
        {
            columns.Bound(o => o.OrderID);
        })
        .DataSource(dataSource => dataSource
            .Ajax()
            .Model(model => model.Field(o => o.OrderID).Editable(false))
        )
```

### KeyboardNavigation

| Previous            | Current    
|:---                 |:---             
| `KeyboardNavigation`| Now renamed to `Navigatable`.
| `KeyboardNavigation.EditOnTab`| No longer available. This is enabled by default.  

### NoRecordsTemplate

The `NoRecordsTemplate` is now renamed to `NoRecords`.

```tab-Previous

    Html.Telerik().Grid<Order>()
        .Name("Grid")
        .NoRecordsTemplate("foo")
```
```tab-Current

    Html.Kendo().Grid<Order>()   
        .Name("Grid")
        .NoRecords("foo")
```

For more hints on how to use the `NoRecords` setting, refer to the [article on the Grid configuration]({% slug configuration_gridhelper_aspnetmvc %}#no-records-template).

A `No Records` message is also shown inside the Pager. The message is configurable through the `Pageable.Messages` option.

### Localization

Localization is essentially handled automatically. Changing the current .NET UI culture loads the corresponding localization assembly for the Kendo UI components.

To change the built-in localization strings, follow the steps listed below.

**Step 1** Edit the resource files in the source code project and create a custom build of the assembly.

**Step 2** Set the corresponding property of the widget.

###### Example

    grid.Filterable(filter => filter.Messages(msg => msg.IsTrue("is true")));

## Client-Side API

### Configuration

| MVC             | Kendo UI         
|:---             |:---             
| `insertRow`     | Now removed. Use `grid.dataSource.insert(index, model)` instead.
| `updateRow`     | Now renamed. Use `saveRow` instead.
| `hasChanges`    | Now removed.    
| `submitChanges` | Now renamed. Use `saveChanges` instead.
| `cancelCell`    | Now renamed. Use `closeCell` instead.
| `saveCell`      | Now renamed. Use `closeCell` instead.     
| `ajaxRequest`       | Now removed. Use `grid.dataSource.read()` instead.     
| `dataBind(data)`    | Now removed. Use `grid.dataSource.data(data)` instead.   
| `pageTo`            | Now removed. Use `grid.dataSource.page` instead.   
| `grid.rebind(params)`| Now removed. Use `grid.dataSource.read(params)` instead.   
| `sort("Name-desc")` | Now removed. Use `grid.dataSource.sort( { field: "Name", dir: "desc" } );` instead.   
| `serializeData`     | Now removed.    

The `insertedDataItems` configuration option is now removed. Instead, use the code snippet below.

    var inserted = $.grep(grid.dataSource.data(), function(model) {
    return model.isNew();
    });

The `updatedDataitems` configuration option is now removed. Instead, use the code snippet below.

    var updated = $.grep(grid.dataSource.data(), function(model) {
    return model.dirty;
    });  

The `deletedDataItems` configuratino option is now removed. Instead, use the code snippet below, applying private API.

    var destroyed = grid.dataSource._destroyed`

<!--_-->
The `filter("Name~eq~'foo'");` is now removed. Instead, use the code snippet below.

    grid.dataSource.filter( { field: "Name", operator: "eq", value: "foo" } )

### Events

None of the events has the `On` prefix anymore.

None of the widgets features the `OnLoad` event anymore. Use the `$(document).ready()` instead.

| MVC               | Kendo UI        |
|:---               |:---             |
| `OnComplete`      | Now removed.    |
| `OnDetailViewCollapse` | Now renamed to `DetailCollapse`. |
| `OnDetailViewExpand`   | Now renamed to `DetailInit`.     |
| `OnDelete`        | Now renamed to `Remove`. |
| `OnRowSelect`     | Now renamed to `Change`. |
| `OnSubmitChanges` | Now renamed to `SaveChanges`. |

The `OnCommand` event is now removed. Use the `click` one instead.

    command.custom("ViewDetails").Click("showDetails")


The `OnDataBinding` event is now removed. If you want to be notified when an Ajax request is being made, use the code below.

    dataSource => dataSource.Ajax().Events(e => e.RequestStart("onRequestStart"))

To send custom data to the `action` method, use `.Data()` on the DataSource operation.

    dataSource => dataSource.Ajax()
        .Read(read=>read.Action("Action","Controller").Data("sendData"))

    function sendData() {
        return { foo: "bar" };
    }

The `OnError` event is now removed. Use the `Error` one on the DataSource instead.

    dataSource => dataSource.Ajax().Events(e => e.Error("onError"))

The `OnRowDataBound` event is now removed. Use the `DataBound` one instead and apply the code below.

    function onDataBound() {
        var data = this.view();

        for (var i=0; i< data.length; i++) {
            var dataItem = data[i];
            var tr = $("#grid").find("[data-uid='" + dataItem.uid + "']");
            // use the table row (tr) and data item (dataItem)
        }
     }

## See Also

Other articles on migrating from Telerik Extensions:

* [Migrate the AutoComplete]({% slug autocomplete_migrationextensions_aspnetmvc %})
* [Migrate the Calendar]({% slug calendar_migrationextensions_aspnetmvc %})
* [Migrate the Chart]({% slug chart_migrationextensions_aspnetmvc %})

To see the articles on migrating Кendo UI controls from Telerik Extensions, browse [this section]({% slug combobox_migrationextensions_aspnetmvc %}).
