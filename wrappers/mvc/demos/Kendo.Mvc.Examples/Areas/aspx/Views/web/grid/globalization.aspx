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
                .BindTo(new[] { "en-US", "de-DE", "bg-BG", "fr-FR", "pl-PL", "ru-RU", "uk-UA" })
                .Value(System.Threading.Thread.CurrentThread.CurrentUICulture.ToString())
                .Events(events => events.Change("cultureChange"))
            %>
        </li>
    </ul>
</div>

<%: Html.Kendo().Grid<Kendo.Mvc.Examples.Models.ProductViewModel>(Model)
    .Name("Grid")
    .HtmlAttributes(new { style = "width: 700px; float: left;" })
    .Columns(columns =>
    {
        columns.Bound(p => p.ProductName);
        columns.Bound(p => p.UnitPrice).Width(140);
        columns.Bound(p => p.UnitsInStock).Width(120);
        columns.Command(command => { command.Edit(); command.Destroy(); }).Width(220);
    })
    .ToolBar(toolbar => toolbar.Create())
    .Editable(editable => editable.Mode(GridEditMode.InLine))
    .Pageable()
    .Sortable()
    .Scrollable()
    .DataSource(dataSource => dataSource
        .Ajax()
        .Events(events => events.Error("error"))
        .Model(model => model.Id(p => p.ProductID))
        .Create(update => update.Action("Globalization_Create", "Grid").Data("sendCulture"))
        .Read(read => read.Action("Globalization_Read", "Grid").Data("sendCulture"))
        .Update(update => update.Action("Globalization_Update", "Grid").Data("sendCulture"))
        .Destroy(update => update.Action("Globalization_Destroy", "Grid").Data("sendCulture"))
    )
%>

<script type="text/javascript">
    var href = window.location.href;
    if (href.indexOf('culture') > -1) {
        $('#culture').val(href.replace(/(.*)culture=([^&]*)/, '$2'));
    }

    function sendCulture() {
        return {
            culture: "<%= System.Threading.Thread.CurrentThread.CurrentUICulture%>"
        }
    }


    function cultureChange() {
        var value = this.value();
        if (href.indexOf('culture') > -1) {
            href = href.replace(/culture=([^&]*)/, 'culture=' + value);
        } else {
            href += href.indexOf('?') > -1 ? '&culture=' + value : '?culture=' + value;
        }
        window.location.href = href;
    }  

    function error(e) {
        if (e.errors) {
            var message = "Errors:\n";
            $.each(e.errors, function (key, value) {
                if ('errors' in value) {
                    $.each(value.errors, function() {
                        message += this + "\n";
                    });
                }
            });        
            alert(message);
        }
    }
</script>
</asp:Content>
