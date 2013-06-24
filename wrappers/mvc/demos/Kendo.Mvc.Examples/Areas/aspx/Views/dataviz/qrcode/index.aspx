<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/DataViz.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">

<div class="demo-section">
    <%=
        Html.Kendo().QRCode()
            .Name("qrMail")
            .Value("mailto:clientservice@kendoui.com")
            .Size(100)
    %>

    <%=
        Html.Kendo().QRCode()
            .Name("qrUrl")
            .Value("http://demos.kendoui.com/dataviz/overview/index.html")
            .ErrorCorrectionLevel(QRErrorCorrectionLevel.M)
            .Size(130)
            .Border(border => border.Color("#d11717").Width(5))
    %>
    
    <%=
        Html.Kendo().QRCode()
            .Name("qrTelephone")
            .Value("tel:+1-888-365-2779")
            .ErrorCorrectionLevel(QRErrorCorrectionLevel.Q)
            .Size(170)
            .DarkModuleColor("#FF321C")
            .Border(border => border.Color("#FF321C").Width(5))
    %>           

    <%=
        Html.Kendo().QRCode()
            .Name("qrGeoLocation")
            .Value("geo:42.65049,23.37925,100")
            .ErrorCorrectionLevel(QRErrorCorrectionLevel.H)
            .Size(190)
            .Background("#ACD608")
    %>

</div>

<style scoped>
    .k-qrcode {
        display:inline-block;
        margin: 10px;       
    }               
</style>

</asp:Content>

