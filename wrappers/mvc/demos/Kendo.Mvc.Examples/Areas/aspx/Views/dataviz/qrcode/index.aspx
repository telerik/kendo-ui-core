<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/DataViz.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">

<div class="demo-section">
    <h3>E-mail</h3>
    <%=
         Html.Kendo().QRCode()
            .Name("qrMail")
            .Value("mailto:clientservice@kendoui.com")
            .DarkModuleColor("#e15613")
            .Background("transparent")
            .Size(120)
    %>
</div>
<div class="demo-section">
    <h3>URL</h3>  
    <%=
    Html.Kendo().QRCode()
        .Name("qrUrl")
        .Value("http://demos.kendoui.com/dataviz/overview/index.html")
        .ErrorCorrectionLevel(QRErrorCorrectionLevel.M)
        .Size(120)
        .Border(border => border.Color("#000000").Width(5))
    %>    
</div>
<div class="demo-section">
    <h3>Telephone</h3>
     <%=
        Html.Kendo().QRCode()
            .Name("qrTelephone")
            .Value("tel:+1-888-365-2779")
            .ErrorCorrectionLevel(QRErrorCorrectionLevel.Q)
            .Size(120)
            .DarkModuleColor("#67a814")
            .Border(border => border.Color("#67a814").Width(5))
    %>           
</div>
<div class="demo-section">
    <h3>Geo Location</h3>
    <%=
        Html.Kendo().QRCode()
            .Name("qrGeoLocation")
            .Value("geo:42.65049,23.37925,100")
            .ErrorCorrectionLevel(QRErrorCorrectionLevel.H)
            .Size(120)
            .DarkModuleColor("#166a83")
    %>
</div>

<style scoped>
    .demo-section {
        display: inline-block;
        margin: 17px;
    }
    .k-qrcode {
        display:inline-block;
        margin: 10px 0 0;
        border: none;
    }
</style>

</asp:Content>

