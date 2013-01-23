<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
<div class="demo-section">
    <div class="k-rtl">
    <label for="datetimepicker">Choose date:</label>
    <%= Html.Kendo().DateTimePicker()
          .Name("datetimepicker")
    %>
    </div>

    <style scoped>
        .demo-section {
            width: 400px;
            text-align: center;
            margin: 50px auto;
            padding-top: 50px;
            padding-bottom: 50px;
        }
    </style>
</div>
</asp:Content>