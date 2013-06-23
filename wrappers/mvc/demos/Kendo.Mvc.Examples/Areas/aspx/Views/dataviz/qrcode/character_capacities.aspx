<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/DataViz.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">

<div class="qrcode-wrapper demo-section">
    <label for="qrModes">Choose data mode</label>
    <input id="qrModes" data-option-label="Please Select" data-role="dropdownlist" data-text-field="text" data-value-field="value"
        data-bind="source: modes, value: selectedMode" />
    <h3 class="title" data-bind="text: selectedMode.description"></h3>     
    <%=
        Html.Kendo().QRCode()
            .Name("qrCode")
            .Size(400)
            .ErrorCorrectionLevel(QRErrorCorrectionLevel.L)
            .HtmlAttributes(new { data_bind = "value: selectedMode.value"})
    %>                         
</div>

<script type="text/javascript">
    $(document).ready(function () {
        var viewModel = kendo.observable({
            modes: [{
                value: new Array(7090).join("9"),
                text: "Numeric",
                description: "Maximum 7089 characters can be encoded in Numeric mode."
            }, {
                value: new Array(4297).join("Z"),
                text: "Alphanumeric",
                description: "Maximum 4296 characters can be encoded in Alphanumeric mode."
            }, {
                value: new Array(2954).join("z"),
                text: "Byte",
                description: "Maximum 2953 characters can be encoded in byte mode."
            }],
            selectedMode: null
        });

        kendo.bind($(".qrcode-wrapper"), viewModel);
    });
</script>

<style scoped>
    .k-qrcode {        
        width: 400px;
        margin: 0 auto;
    }               
</style>

</asp:Content>
