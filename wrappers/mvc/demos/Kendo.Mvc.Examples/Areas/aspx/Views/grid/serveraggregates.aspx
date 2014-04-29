<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" 
    Inherits="System.Web.Mvc.ViewPage<IEnumerable<Kendo.Mvc.Examples.Models.Product>>" %>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<% Html.Kendo().Grid(Model)
    .Name("Grid")
    .Columns(columns =>
    {
        columns.Bound(p => p.ProductName)
            .FooterTemplate(agg =>
            { %> Total Count: <%: agg.Count%> <% })
            .GroupFooterTemplate(agg =>
            { %> Count: <%: agg.Count%> <% });
        columns.Bound(p => p.UnitPrice).Format("{0:C}");
        columns.Bound(p => p.UnitsOnOrder)
            .FooterTemplate(agg =>
            { %>Average: <%: agg.Average%> <% })
            .GroupFooterTemplate(agg =>
            { %>Average: <%: agg.Average%> <% });
        columns.Bound(p => p.UnitsInStock)
            .FooterTemplate(agg =>
            { %><div>Min: <%: agg.Min%> </div><div>Max: <%: agg.Max%> </div> <% })
            .GroupHeaderTemplate(agg =>
            { %> <%: agg.Title%>: <%: agg.Key%> (Count: <%: agg.Count%>) <% });
    })
    .Pageable()
    .Sortable()
    .DataSource(dataSource => dataSource
        .Server()
        .Aggregates(aggregates =>
        {
            aggregates.Add(p => p.UnitsInStock).Min().Max().Count();
            aggregates.Add(p => p.UnitsOnOrder).Average();
            aggregates.Add(p => p.ProductName).Count();
            aggregates.Add(p => p.UnitPrice).Sum();
        })
        .Group(groups => groups.Add(p => p.UnitsInStock))
        .Read(read => read.Action("ServerAggregates", "Grid"))
    ).Render();
%>
</asp:Content>
