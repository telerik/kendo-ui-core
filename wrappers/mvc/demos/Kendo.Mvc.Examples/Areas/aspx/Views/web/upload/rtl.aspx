<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">

<div class="k-rtl">
    <%= Html.Kendo().Upload()
        .Name("files")
        .Async(a => a
            .Save("Save", "Upload")
            .Remove("Remove", "Upload")
            .AutoUpload(true)
        )
    %>
</div>

</asp:Content>