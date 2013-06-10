<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Mobile.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">

<% Html.Kendo().MobileView()
        .Name("")        
        .Title("")
        .Content(() =>
        {
            %>
           <%Html.Kendo().MobileListView()                 
                .Items(i =>
                {
                    i.Add().Text("Text").HtmlAttributes(new { @class = "foo" }).Icon("toprated");
                    i.AddLink().Text("Link").HtmlAttributes(new { @class = "foo" }).LinkHtmlAttributes(new { @class = "bar" });               
                })
                .Render();
            %>
            <%
        })
        .Render();
%>
 
</asp:Content>
