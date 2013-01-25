<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" 
    Inherits="System.Web.Mvc.ViewPage<IEnumerable<Kendo.Mvc.Examples.Models.ProductViewModel>>" %>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<%: Html.Kendo().Grid(Model)
    .Name("Grid")
    .Columns(columns =>
    {
        columns.Bound(p => p.ProductName);
        columns.Bound(p => p.UnitPrice).Width(130);
        columns.Bound(p => p.UnitsInStock).Width(130);
        columns.Bound(p => p.Discontinued).Width(130);
    })
    .Pageable()
    .Sortable()
    .Scrollable(scr => scr.Height(430))
    .Filterable()
    .DataSource(dataSource => dataSource
        .Ajax()
        .PageSize(20)
        .ServerOperation(false)
     )
%>
</asp:Content>
