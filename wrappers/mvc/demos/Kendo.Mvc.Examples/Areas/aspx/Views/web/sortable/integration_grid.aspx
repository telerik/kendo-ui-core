<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<IEnumerable<Kendo.Mvc.Examples.Models.ProductViewModel>>" %>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">

<%:Html.Kendo().Grid(Model)
    .Name("Grid")
    .Columns(columns =>
    {
        columns.Bound(p => p.ProductName).Title("Product Name");
        columns.Bound(p => p.UnitPrice).Title("Unit Price").Width(130);
        columns.Bound(p => p.UnitsInStock).Title("Units In Stock").Width(130);
        columns.Bound(p => p.Discontinued).Width(130);
    })
    .Pageable()
    .DataSource(dataSource => dataSource        
        .Ajax()
        .PageSize(15)
        .ServerOperation(false)        
     )
%>

<%:Html.Kendo().Sortable()
    .For("#Grid")
    .Filter("table > tbody > tr")
    .HintHandler("noHint")
    .PlaceholderHandler("placeholder")
    .ContainerSelector("#Grid tbody")
    .Events(events => events.Change("onChange"))
%>

<script>
    var noHint = $.noop;

    function placeholder(element) {
        return element.clone().addClass("k-state-hover").css("opacity", 0.65);
    }

    function onChange(e) {
        var grid = $("#Grid").data("kendoGrid"),
            skip = grid.dataSource.skip(),
            oldIndex = e.oldIndex + skip,
            newIndex = e.newIndex + skip,
            data = grid.dataSource.data(),
            dataItem = grid.dataSource.getByUid(e.item.data("uid"));

        grid.dataSource.remove(dataItem);
        grid.dataSource.insert(newIndex, dataItem);
    }
</script>

</asp:Content>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>