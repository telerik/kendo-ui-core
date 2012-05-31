<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master"%>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<h3>Grid with multiple row selection enabled</h3>
<%: Html.Kendo().Grid<Kendo.Mvc.Examples.Models.ProductViewModel>()
    .Name("Grid")
    .Columns(columns =>
    {
        columns.Bound(p => p.ProductID).Groupable(false);
        columns.Bound(p => p.ProductName);
        columns.Bound(p => p.UnitPrice);
        columns.Bound(p => p.UnitsInStock);
    })
    .Pageable()
    .Navigatable()
    .Selectable(selectable => selectable.Mode(GridSelectionMode.Multiple))
    .DataSource(dataSource => dataSource
        .Ajax()
        .PageSize(5)
        .Read(read => read.Action("Products_Read", "Grid"))
    )
%>

<h3>Grid with multiple cell selection enabled</h3>
<%: Html.Kendo().Grid<Kendo.Mvc.Examples.Models.ProductViewModel>()    
    .Name("Grid2")
    .Columns(columns =>
    {
        columns.Bound(p => p.ProductID).Groupable(false);
        columns.Bound(p => p.ProductName);
        columns.Bound(p => p.UnitPrice);
        columns.Bound(p => p.UnitsInStock);
    })    
    .Pageable()           
    .Navigatable()
    .Selectable(selectable => selectable
        .Mode(GridSelectionMode.Multiple)
        .Type(GridSelectionType.Cell)
     )
    .DataSource(dataSource => dataSource
        .Ajax()     
        .PageSize(5)   
        .Read(read => read.Action("Products_Read", "Grid"))        
    )
%>
</asp:Content>
