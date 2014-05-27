<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" 
    Inherits="System.Web.Mvc.ViewPage<IEnumerable<Kendo.Mvc.Examples.Models.Product>>" %>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<%: Html.Kendo().Grid(Model)    
    .Name("Grid")
    .Columns(columns => {
        columns.Bound(p => p.ProductID).Groupable(false);
        columns.Bound(p => p.ProductName);
        columns.Bound(p => p.UnitPrice);
        columns.Bound(p => p.UnitsInStock);
    })
    .Pageable()
    .Sortable()
    .Scrollable() 
    .Filterable()
    .Groupable()
%>
</asp:Content>
