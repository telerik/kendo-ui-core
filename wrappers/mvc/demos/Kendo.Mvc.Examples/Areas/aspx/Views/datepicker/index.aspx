<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<div id="email-settings">
    <div style="margin-top: -6px; margin-left: 180px">
        <%= Html.Kendo().DatePicker()
              .Name("datepicker")
              .Value("10/10/2011")
              .HtmlAttributes(new { style = "width:150px" })
        %>
    </div>
    <div style="margin-top: 59px; margin-left: 180px">
        <%= Html.Kendo().DatePicker()
              .Name("monthpicker")
              .Start(CalendarView.Year)
              .Depth(CalendarView.Year)
              .Format("MMMM yyyy")
              .Value("November 2011")
              .HtmlAttributes(new { style = "width:150px" })
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
        background: url('/Content/web/datepicker/mailSettings.png') transparent no-repeat 0 0;
    }
    
</style>
</asp:Content>