<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" %>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
    <%:Html.Kendo().Grid<Kendo.Mvc.Examples.Models.OrderViewModel>()
        .Name("grid")
        .Columns(columns =>
        {
            columns.Bound(o => o.OrderID).Width(60);
            columns.Bound(o => o.CustomerID).Width(90);
            columns.Bound(o => o.ShipName).Width(220);
            columns.Bound(o => o.ShipAddress).Width(280);
            columns.Bound(o => o.ShipCity).Width(110);
            columns.Bound(o => o.ShipCountry).Width(110);
        })
        .Sortable()
        .Scrollable(scrollable => scrollable.Virtual(true))
        .HtmlAttributes(new { style = "height:430px;" })
        .DataSource(dataSource => dataSource
            .Ajax()
            .PageSize(100)
            .Read(read => read.Action("Virtualization_Read", "Grid"))
         )
    %>
</asp:Content>
