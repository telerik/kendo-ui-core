<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<div id="alarm-settings">
    <div style="margin-top: -7px; margin-left: 180px">
        <%= Html.Kendo().TimePicker()
              .Name("timepicker")
              .Value("10:00 AM")
        %>
    </div>
    <div style="margin-top: 59px; padding-left: 180px">
        <span style="" class="k-widget k-autocomplete k-header k-state-default">
            <input id="descr" class="k-input" type="text" value="Wake up" style="width: 100%" />
        </span>
    </div>
</div>

<style scoped>
    #alarm-settings {
        height: 135px;
        width: 395px;
        margin: 30px auto;
        padding: 110px 0 0 30px;
        background: url('/Content/web/timepicker/alarmSettings.png') transparent no-repeat 0 0;
    }
</style>
</asp:Content>