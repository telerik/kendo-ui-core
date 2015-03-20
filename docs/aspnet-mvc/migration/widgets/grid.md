---
title: Grid
page_title: Server-side API documentation for Kendo UI jQuery Grid widget for ASP.NET MVC
description: Documentation and code examples about server-side and client-side API for Kendo UI Grid component.
---

# Server-Side API
 
## DataKeys 

DataKeys Are Moved to the Datasource Model Configuration:

#### Old

    Html.Telerik().Grid<Order>()
        .Name("Grid")       
        .DataKeys(dataKeys => dataKeys.Add(o => o.OrderID))

#### New

    Html.Kendo().Grid<Order>()
        .Name("Grid")
        .DataSource(dataSource => dataSource
            .Ajax()
            .Model(model => model.Id(o => o.OrderID))
        )
 
## DataBinding

### Configuration

DataBinding Configuration Is Moved to Datasource:
 
#### Old
    
    Html.Telerik().Grid<Order>()
        .Name("Grid")      
        .DataBinding(dataBinding => dataBinding.Ajax().Select("_AjaxBinding", "Grid"))
    
#### New    

    Html.Kendo().Grid<Order>()   
        .Name("Grid")  
        .DataSource(dataSource => dataSource
            .Ajax()
            .Read(read => read.Action("AjaxBinding ", "Grid"))
        )

### Methods

**OperationMode** has changed to **ServerOperation**:

#### Old

    Html.Telerik().Grid<Order>()
        .Name("Grid")      
        .DataBinding(dataBinding => dataBinding.Ajax().OperationMode(GridOperationMode.Client))

#### New

    Html.Kendo().Grid<Order>()
        .Name("Grid")
        .DataSource(dataSource => dataSource
            .Ajax()
            .ServerOperation(false)
        )

**DataBinding.WebService** Is Removed

Databinding "Url" Methods Are Renamed to Match the KendoUI Datasource Client Configuration.

#### Old -> New
                
##### Select 

Read

##### Update

Update

##### Delete

Destroy

##### Insert

Create
 
### DetailView

**DetailView.Clienttemplate** Changed to **ClientDetailTemplateId**:

#### Old

    Html.Telerik().Grid<Order>()
        .Name("Grid")
        .DetailView(details => details.ClientTemplate(
            Html.Telerik().TabStrip()
            .Name("TabStrip_<#= EmployeeID #>")                                                                                                           
            .ToHtmlString()
        ))

#### New

    Html.Kendo().Grid<Order>()
        .Name("Grid")
        .ClientDetailTemplateId("employeesTemplate")

    <script id="employeesTemplate" type="text/kendo-tmpl">
        @(Html.Kendo().TabStrip()
            .Name("TabStrip_#=EmployeeID#")           
            .ToClientTemplate())
    </script>
 
**DetailView.Template** changed to **DetailTemplate**:
 
#### Old
      
    Html.Telerik().Grid(Model)
        .Name("Employees")  
        .DetailView(detailView => detailView.Template(e =>
        {           
                Html.Telerik().TabStrip()
                    .Name("TabStrip_" + e.EmployeeID)
                    .Render();
        }))

#### New

    Html.Kendo().Grid(Model)
        .Name("Employees")   
        .DetailTemplate(e =>
        {            
            Html.Kendo().TabStrip()
            .Name("TabStrip_" + e.EmployeeID) 
            .Render();
        })
       
### Editing 

**InForms** Mode is no longer available.

**InsertRowPosition** is renamed to **CreateAt**.

**BeginEdit** and **HtmlFormAttributes** options are not available.

**DefaultDataItem** is moved to DataSource Model configuration.

Grid editing now uses the Kendo Validator instead of jQuery validate.

During updates the Telerik Extensions for ASP.NET MVC only sent the changed properties during updates. With Kendo IU Complete for ASP.NET MVC the whole model is now sent.

Buttons related to editing now utilize both images and text. There are no text-only or image-only buttons available.

Inline edit forms are immediately closed when the update button is clicked. This means that server validation errors should be handled and displayed in the Error event. For example:

    ...
    .DataSource(dataSource => dataSource
        .Ajax()
        .Events(events => events.Error("error_handler"))
    )
    ...

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

#### Old

    Html.Telerik().Grid<Order>()
        .Name("Grid")                           
        .Editable(editable => editable.DefaultDataItem(new Order {
            OrderDate = DateTime.Today
        }))

#### New

    Html.Kendo().Grid<Order>()    
        .Name("Grid")     
        .DataSource(dataSource => dataSource
            .Ajax()
            .Model(model => model.Field(o => o.OrderDate).DefaultValue(DateTime.Today)) 
        )

## Grouping 

Groups Configuration Is Moved to Datasource:

#### Old

    Html.Telerik().Grid<Order>()
        .Name("Grid")                        
        .Groupable(groupable => groupable
            .Groups(groups => groups.Add(o => o.OrderDate))
        )    

#### New

    Html.Kendo().Grid<Order>()   
        .Name("Grid")    
        .DataSource(dataSource => dataSource
            .Ajax()                       
            .Group(group => group.Add(o => o.OrderDate))
        )     

**Visible** option is removed. Same functionality can be achieved by setting **Groupable.Enabled** to false and Group descriptors through the DataSource.
 
## Sorting

**OrderBy** Is Moved to The DataSource Configuration:

#### Old

    Html.Telerik().Grid<Order>()
        .Name("Grid")   
        .Sortable(sortable => sortable.OrderBy(order => order.Add(o => o.OrderDate).Ascending()))

#### New

    Html.Kendo().Grid<Order>()   
        .Name("Grid")    
        .DataSource(dataSource => dataSource
            .Ajax()                       
            .Sort(sort => sort.Add(o => o.OrderDate).Ascending())
        )

## Filtering

**Filters** Is Moved to The DataSource Configuration:

#### Old
       
    Html.Telerik().Grid<Order>()
        .Name("Grid")   
        .Filterable(filtarable => filtarable.Filters(filters => filters.Add(o => o.OrderDate).IsEqualTo(DateTime.Today))

#### New

    Html.Kendo().Grid<Order>()   
        .Name("Grid")        
        .DataSource(dataSource => dataSource
            .Ajax()                        
            .Filter(filter => filter.Add(o => o.OrderDate).IsEqualTo(DateTime.Today))
        ) 

## Pageable

**Position** Is Not Available.

**PageSize** And Total Is Moved to the DataSource Configuration:

#### Old
 
    Html.Telerik().Grid<Order>()
        .Name("Grid")   
        .Pageable(pageable => pageable.PageSize(42).Total(100))

#### New
     
    Html.Kendo().Grid<Order>()   
    .Name("Grid")        
    .DataSource(dataSource => dataSource
        .Ajax()                       
        .PageSize(42)
        .Total(100)
    ) 

**PageOnScroll** Is Removed (Use **Scrollable.Virtual** Option to Enabled Virtual Scrolling Instead).

**Style** Is Removed. Pager Style Can Be Configured by Setting Individual Properties Such As **Input**, **PageSizes**, **Info**, **Numeric**, **PreviousNext**.

## Columns 

**Aggregates** are moved to the DataSource configuration:

#### Old

    Html.Telerik().Grid<Order>()
        .Name("Grid")   
        .Columns(columns =>
        {
            columns.Bound(o => o.OrderID)
            .Aggregate(agg => agg.Count());          
        })

#### New

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
        
**ReadOnly** In Moved To DataSource Model Configuration:

#### Old

    Html.Telerik().Grid<Order>()
        .Name("Grid")   
        .Columns(columns =>
        {
            columns.Bound(o => o.OrderID).ReadOnly(true);          
        })

#### New

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

## KeyboardNavigation

**KeyboardNavigation** Is Renamed To **Navigatable**.

**KeyboardNavigation.EditOnTab** is not available. This is enabled by default.

## NoRecordsTemplate

**NoRecordsTemplate** Is Not Available. There Will Be a No NoRecords Item but Text Will Be Shown Within the Pager. This Text Is Configurable Through **Pageable.Messages** Configuration

## Localization

Localization is essentially handled automatically. Changing the current .NET UI culture will load the corresponding localization assembly for the Kendo UI components.

To change the built-in localization strings the following steps need to be taken.

1. Edit the resource files in the source code project and create a custom build of the assembly.
2. Set corresponding property of the widget. For example:

    grid.Filterable(filter => filter.Messages(msg => msg.IsTrue("is true")));

# Client-side API Changes

## Client-side API

#### MVC -> Kendo

##### insertRow

Removed. Use **grid.dataSource.insert(index, model)**

##### updateRow

Renamed. Use **saveRow** instead.

##### hasChanges

Removed.

##### submitChanges

Renamed. Use **saveChanges** instead.

##### cancelCell

Renamed. Use **closeCell** instead.

##### saveCell

Renamed. use **closeCell* instead.

##### insertedDataItems

Removed. Use the following code snippet instead:

    var inserted = $.grep(grid.DataSource.data(), function(model) {
        return model.isNew();
    });

##### updatedDataitems

Removed. Use the following code snippet instead:

    var inserted = $.grep(grid.dataSource.data(), function(model) {
        return model.dirty;
    });

##### deletedDataItems

Removed. Use the following code snippet instead (utilizing private API):

    var destroyed = grid.dataSource._destroyed

##### ajaxRequest

Removed. Use **grid.dataSource.read()** instead.

##### dataBind(data)

Removed. Use **grid.dataSource.data(data)** instead.

##### filter("Name~eq~'foo'");

Removed. Use the following code snippet instead:

    grid.dataSource.filter( { field: "Name", operator: "eq", value: "foo" } )

##### pageTo

Removed. Use **grid.dataSource.page** instead.

##### grid.rebind(params)

Removed. Use **grid.dataSource.read(params)** instead.

##### sort("Name-desc")

Removed. Use **grid.dataSource.sort( { field: "Name", dir: "desc" } );** instead.

##### serializeData

Removed.

## Client-side Events

All events have removed the "On" prefix.

OnLoad no longer exists, please utilize **$(document).ready()** instead.

#### MVC -> Kendo

##### OnCommand

Removed. Utilize click event instead:

    command.custom("ViewDetails").Click("showDetails")

##### OnComplete

Removed.

##### OnDetailViewCollapse

Renamed to **DetailCollapse**

##### OnDetailViewExpand

Renamed to **DetailInit**

##### OnDelete

Renamed to **Remove**.

##### OnDataBinding

Removed.

If you want to be notified when an ajax request is being made use the following snippet:

    dataSource => dataSource.Ajax().Events(e => e.RequestStart("onRequestStart"))

If you need to send custom data to the action method use .Data() on the DataSource's operation:

    dataSource => dataSource.Ajax()
        .Read(read=>read.Action("Action","Controller").Data("sendData"))
    
    function sendData() {
        return { foo: "bar" };
    }

##### OnError

Removed. Use the Error event on the DataSource instead:

    dataSource => dataSource.Ajax().Events(e => e.Error("onError"))

##### OnRowDataBound

Removed. Utilize **DataBound** instead and utilize the following code snippet:

    function onDataBound() {
        var data = this.view();

        for (var i=0; i< data.length; i++) {
            var dataItem = data[i];
            var tr = $("#grid").find("[data-uid='" + dataItem.uid + "']");
            // use the table row (tr) and data item (dataItem)
        }
     }

##### OnRowSelect

Renamed to **Change**

##### OnSubmitChanges

Renamed to **SaveChanges**
