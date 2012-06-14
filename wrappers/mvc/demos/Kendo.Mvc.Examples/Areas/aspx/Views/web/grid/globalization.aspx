<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
    <script src="<%= Url.Content("~/Scripts/cultures/kendo.culture.de-DE.js") %>"></script>
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">

<script type="text/javascript">
    //set culture of the Kendo UI
    kendo.culture("de-DE");
</script>

<%
    Culture = "de-DE";
%>

<%: Html.Kendo().Grid<Kendo.Mvc.Examples.Models.ProductViewModel>()    
            .Name("Grid")
            .Columns(columns => {
                columns.Bound(p => p.ProductID);
                columns.Bound(p => p.ProductName);
                columns.Bound(p => p.UnitPrice);
                columns.Bound(p => p.UnitsInStock);
                columns.Bound(p => p.LastSupply);
            })
            .Pageable()
            .Sortable()
            .Scrollable() 
            .Filterable()            
            .DataSource(dataSource => dataSource
                .Ajax()
                .Read(read => read.Action("Globalization_Read", "Grid"))
             )
    %>
</asp:Content>
