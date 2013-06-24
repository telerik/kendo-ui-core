<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/DataViz.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">

    <div class="demo-section">
        <div id="barcode-container">
            <%= Html.Kendo().Barcode().Name("ean").Value("9658423").Encoding(BarcodeSymbology.EAN8)%>
            <%= Html.Kendo().Barcode().Name("code128").Value("Hello world!").Encoding(BarcodeSymbology.Code128B) %>       
            <%= Html.Kendo().Barcode().Name("postnet").Value("23494").Encoding(BarcodeSymbology.POSTNET)%>
        </div>
    </div>

</asp:Content>