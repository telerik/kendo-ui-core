<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
<script src="<%= Url.Content("~/Scripts/cultures/kendo.culture.de-DE.min.js") %>"></script>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
<script type="text/javascript">
    //set culture of the Kendo UI
    kendo.culture("de-DE");
</script>

<%
    Culture = "de-DE";
%>

<%= Html.Kendo().CurrencyTextBox()
        .Name("CurrencyTextBox")
        .Value(25)
%>
</asp:Content>