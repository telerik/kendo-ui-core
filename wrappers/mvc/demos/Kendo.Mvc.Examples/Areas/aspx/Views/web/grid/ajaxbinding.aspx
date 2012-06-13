<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" %>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<%: Html.Kendo().Grid<Kendo.Mvc.Examples.Models.ProductViewModel>()    
            .Name("Grid")
            .Columns(columns => {
                columns.Bound(p => p.ProductID).Groupable(false).Width(140);
                columns.Bound(p => p.ProductName);
                columns.Bound(p => p.UnitPrice)
                    .HtmlAttributes(new { style = "text-align: right" })
                    .Width(140);
                columns.Bound(p => p.UnitsInStock).Width(160);
            })
            .Pageable()
            .Sortable()
            .Scrollable() 
            .Filterable()
            .Groupable()
            .DataSource(dataSource => dataSource
                .Ajax()
                .Read(read => read.Action("Products_Read", "Grid"))
             )
    %>
</asp:Content>
