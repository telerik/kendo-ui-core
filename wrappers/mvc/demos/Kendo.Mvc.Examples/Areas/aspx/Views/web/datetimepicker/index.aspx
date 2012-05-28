<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<div id="email-settings">
    <div style="margin-top: -17px; margin-left: 180px">
        <%= Html.Kendo().DateTimePicker()
                .Name("datetimepicker")
                .Value(DateTime.Now)
                .HtmlAttributes(new { style = "width:185px" })
        %>
    </div>
</div>
<style scoped>
    #example h2 {
        font-weight: normal;
    }
    #email-settings {
        height: 135px;
        width: 395px;
        margin: 30px auto;
        padding: 110px 0 0 30px;
        background: url('/Content/web/datetimepicker/datetimepicker-back.png') transparent no-repeat 0 0;
    }
    
</style>
</asp:Content>