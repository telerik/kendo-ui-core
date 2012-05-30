<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
<%= Html.Kendo().Splitter()
      .Name("splitter")
      .Panes(panes =>
      {
          panes.Add().LoadContentFrom(Url.Content("~/Content/web/splitter/ajax/ajaxContent1.html"));

          panes.Add().LoadContentFrom(Url.Content("~/Content/web/splitter/ajax/ajaxContent2.html"));
      })
%>
</asp:Content>