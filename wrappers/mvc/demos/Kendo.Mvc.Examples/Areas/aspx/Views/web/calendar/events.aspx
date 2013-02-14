<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<div class="configuration k-widget k-header">
    <span class="configHead">Events log</span>
    <div class="console"></div>
</div>

<div class="reports">
    <%= Html.Kendo().Calendar()
            .Name("calendar")
            .HtmlAttributes(new { style = "width: 243px;" })
            .Events(e => e.Change("change").Navigate("navigate"))
    %> 
</div>

<script>
    function change() {
        kendoConsole.log("Change :: " + kendo.toString(this.value(), 'd'));
    }

    function navigate() {
        kendoConsole.log("Navigate");
    }
</script>

<style scoped="scoped">
    .reports {
        width: 265px;
        height: 247px;
        padding: 108px 0 0 20px;
        background: url('<%=Url.Content("~/content/web/calendar/reports.png")%>') transparent no-repeat 0 0;
        margin: 30px 105px 20px;
    }
    .configuration {
        height: 390px;
        width: 200px;
    }
    .configuration .console {
        background-color: transparent;
        border: 0;
        height: 342px;
        overflow: auto;
    }
</style>
</asp:Content>