<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">

<div class="k-rtl">
    <%= Html.Kendo().Slider()
            .Name("slider")
    %>

<br /><br /><br />

    <%= Html.Kendo().RangeSlider()
            .Name("rangeslider")
    %>
</div>

</asp:Content>