<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<%= Html.Kendo().NumericTextBox()
        .Name("numerictextbox")
        .ClientEvents(e => e
             .Change("onChange")
             .Spin("onSpin")
        )
%>
<script>
    function onChange() {
        kendoConsole.log("Change :: " + this.value());
    }

    function onSpin() {
        kendoConsole.log("Spin :: " + this.value());
    }
</script>

<div class="console"></div>
</asp:Content>
