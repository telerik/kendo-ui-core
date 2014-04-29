<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">

<div class="k-rtl">

<p>

<%= Html.Kendo().Button()
    .Name("textButton")
    .HtmlAttributes( new {type = "button"} )
    .Content("Text button") %>

<%= Html.Kendo().Button()
    .Name("iconTextButton")
    .Tag("a")
    .Icon("ungroup")
    .Content("Icon and text") %>

<%= Html.Kendo().Button()
    .Name("iconButton")
    .Tag("em")
    .Icon("refresh")
    .Content("<span class='k-icon'>Refresh</span>") %>

<%= Html.Kendo().Button()
    .Name("disabledButton")
    .Tag("span")
    .Enable(false)
    .Content("Disabled button") %>

</p>

</div>

</asp:Content>