<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<div id="background">
    <%= Html.Kendo().Calendar()
            .Name("calendar")
    %>
</div>

<style scoped>
	#background {
		width: 254px;
		height: 250px;
		margin: 30px auto;
		padding: 69px 0 0 11px;
		background: url('<%=Url.Content("~/content/web/calendar/calendar.png")%>') transparent no-repeat 0 0;
	}
	#calendar {
		width: 241px;
	}
</style>
</asp:Content>