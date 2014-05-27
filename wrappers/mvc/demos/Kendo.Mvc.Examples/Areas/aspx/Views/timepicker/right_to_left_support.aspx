<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">

<div class="k-rtl">
            
    <label for="timepicker">Pick time:</label>
    <%= Html.Kendo().TimePicker()
            .Name("timepicker")
    %>

</div>

</asp:Content>