<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">

<p>

<%= Html.Kendo().Button()
    .Name("textButton")
    .HtmlAttributes( new {type = "button"} )
    .Content("Text button") %>

<%= Html.Kendo().Button()
    .Name("iconTextButton")
    .Tag("a")
    .SpriteCssClass("k-icon k-i-ungroup")
    .Content("Icon and text") %>

<%= Html.Kendo().Button()
    .Name("kendoIconTextButton")
    .Tag("a")
    .Icon("plus")
    .Content("Kendo UI icon") %>

<%= Html.Kendo().Button()
    .Name("iconButton")
    .Tag("em")
    .SpriteCssClass("k-icon k-i-refresh")
    .Content("<span class='k-sprite'>Refresh</span>") %>

</p><p>

<%= Html.Kendo().Button()
    .Name("disabledButton1")
    .Tag("span")
    .Enable(false)
    .Content("Disabled via configuration") %>

<%= Html.Kendo().Button()
    .Name("disabledButton2")
    .Tag("span")
    .HtmlAttributes(new { disabled = "disabled" })
    .Content("Disabled via HTML attribute") %>

</p>

</asp:Content>