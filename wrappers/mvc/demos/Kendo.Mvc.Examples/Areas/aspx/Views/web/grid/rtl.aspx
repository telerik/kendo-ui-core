<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" %>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">

<div class="k-rtl">

<%: Html.Kendo().Grid<Kendo.Mvc.Examples.Models.ProductViewModel>()
    .Name("grid")
    .Pageable()
    .Scrollable()
    .Sortable()
    .HtmlAttributes(new { style = "height:430px;" })
    .Columns(columns =>
    {
        columns.Bound(p => p.ProductName).Title("Product Name");
        columns.Bound(p => p.UnitPrice).Title("Unit Price").Width(130);
        columns.Bound(p => p.UnitsInStock).Title("Units In Stock").Width(130);
        columns.Bound(p => p.Discontinued).Width(130);
    })
    .DataSource(dataSource => dataSource
        .Ajax()
        .PageSize(15)
        .Read(read => read.Action("Products_Read", "Grid"))
     )
    .Resizable(resize => resize.Columns(true))
%>

</div>

</asp:Content>