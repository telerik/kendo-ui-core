<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" %>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">

<div class="k-rtl">

<%: Html.Kendo().Grid<Kendo.Mvc.Examples.Models.ProductViewModel>()
    .Name("Grid")
    .Pageable()
    .Scrollable()
    .DataSource(dataSource => dataSource
        .Ajax()
        .Read(read => read.Action("Products_Read", "Grid"))
     )
     .Resizable(resize => resize.Columns(true))
%>

</div>

</asp:Content>