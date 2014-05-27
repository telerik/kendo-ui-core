<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
<%=Html.Kendo().Calendar()
      .Name("calendar")
      .Format("MM/dd/yyyy")
      .Selection(select =>
      {
          select.Action("SelectAction", "Calendar", new { date = "{0}" })
                .Dates(new List<DateTime> { 
                    DateTime.Today,
                    DateTime.Today.AddDays(5),
                    DateTime.Today.AddDays(-5),
                    DateTime.Today.AddMonths(1), 
                    DateTime.Today.AddMonths(-1) 
                });
      })
      .Value(ViewBag.date as DateTime?)
%>

<% if (ViewBag.date != null) { %>
    <p>This date was clicked: <%=ViewBag.date%></p>
<% } %>
 </asp:Content>