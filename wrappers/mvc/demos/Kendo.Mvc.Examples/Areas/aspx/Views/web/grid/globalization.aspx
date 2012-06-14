<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master"
    Inherits="System.Web.Mvc.ViewPage<IEnumerable<Kendo.Mvc.Examples.Models.ProductViewModel>>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
    <script src="<%= Url.Content("~/Scripts/cultures/kendo.culture." + System.Threading.Thread.CurrentThread.CurrentUICulture + ".js") %>"></script>
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">

<script type="text/javascript">
    //set culture of the Kendo UI
    kendo.culture("<%: System.Threading.Thread.CurrentThread.CurrentUICulture  %>");
</script>

<div class="configuration k-widget k-header" style="width: 190px">
    <ul class="options">
        <li>Choose culture: 
            <%: Html.Kendo().DropDownList()
                .Name("CulturesSelector")
                .BindTo(new[] { "bg-BG", "de-DE", "en-US", "en-GB" })
                .Value(System.Threading.Thread.CurrentThread.CurrentUICulture.ToString())
                .Events(events => events.Change("culture_change"))
            %>
        </li>
    </ul>
</div>

<%: Html.Kendo().Grid(Model)
        .Name("Grid")
        .HtmlAttributes(new { style = "width:700px" })
        .Columns(columns =>
        {
            columns.Bound(p => p.ProductID).Width(100);
            columns.Bound(p => p.ProductName);
            columns.Bound(p => p.UnitPrice).Width(100);
            columns.Bound(p => p.UnitsInStock).Width(100);
            columns.Bound(p => p.LastSupply).Width(120);
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

<script type="text/javascript">
    var href = window.location.href;
    if (href.indexOf('culture') > -1) {
        $('#culture').val(href.replace(/(.*)culture=([^&]*)/, '$2'));
    }

    function culture_change() {
        var value = this.value();
        if (href.indexOf('culture') > -1) {
            href = href.replace(/culture=([^&]*)/, 'culture=' + value);
        } else {
            href += href.indexOf('?') > -1 ? '&culture=' + value : '?culture=' + value;
        }
        window.location.href = href;
    }    
</script>
</asp:Content>
