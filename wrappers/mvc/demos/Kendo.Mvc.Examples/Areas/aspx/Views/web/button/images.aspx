<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">

<style scoped>

.k-button .k-image
{
    height: 16px;
}
            
</style>

<%= Html.Kendo().Button()
    .Name("iconButton")
    .SpriteCssClass("k-icon k-i-refresh")
    .Content("Sprite icon") %>

<%= Html.Kendo().Button()
    .Name("imageButton")
    .ImageUrl(Url.Content("~/Content/shared/icons/sports/snowboarding.png"))
    .Content("Image icon") %>

</asp:Content>