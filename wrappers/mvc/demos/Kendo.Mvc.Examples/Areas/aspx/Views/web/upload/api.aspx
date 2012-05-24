<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<div class="configuration k-widget k-header">
    <span class="configHead">API Functions</span>
    <ul class="options">
        <li>
            <button class="toggleEnabled k-button">Toggle enabled state</button>
        </li>
        <li>
            <button class="enable k-button">Enable</button>
        </li>
        <li>
            <button class="disable k-button">Disable</button>
        </li>
    </ul>
</div>
<form method="post" style="width:45%">
    <%= Html.Kendo().Upload()
        .Name("files")
    %>
</form>
<script>
    function getUpload() {
        return $("#files").data("kendoUpload");
    }

    $(document).ready(function() {
        $(".toggleEnabled").click(function() {
            getUpload().toggle();
        });

        $(".enable").click(function() {
            getUpload().enable();
        });

        $(".disable").click(function() {
            getUpload().disable();
        });
    });
</script>
</asp:Content>
