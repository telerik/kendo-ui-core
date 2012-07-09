<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" %>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<%: Html.Kendo().Grid<Kendo.Mvc.Examples.Models.Order>()
    .Name("Grid")
    .Columns(columns =>
    {
        columns.Bound(o => o.OrderID);
        columns.Bound(o => o.ShipCountry);
        columns.Bound(o => o.ShipName);
        columns.Bound(o => o.ShipAddress).Filterable(false);
    })
    .DataSource(dataSource => dataSource
        .Ajax()
        .Read(read => read.Action("ColumnMenu_Read", "Grid"))
     )
    .Pageable()
    .Filterable()
    .Sortable()
    .ColumnMenu()
%>
</asp:Content>
