<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/DataViz.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">

<div class="demo-section">
    <%=
        Html.Kendo().QRCode()
            .Name("qrCode")
            .Size(200)
    %>   
</div>
<div class="configuration-horizontal" id="qrConfig">
    <div class="config-section">
        <span class="configHead">Value</span>
        <ul class="options">
            <li>
                <textarea id="qrValue" class="k-textbox" data-bind="value: qrValue" rows="5" cols="20"></textarea>       
            </li>
            <li>
                <button data-bind="click: setValue" class="k-button">Set Value</button>
            </li>
        </ul>
    </div>
    <div class="config-section">
        <span class="configHead">Options</span>
        <ul class="options">
            <li>
                <select id="errorCorrectionLevel" data-role="dropdownlist" data-bind="value: qrOptions.errorCorrectionLevel">
                    <option value="L">L</option>
                    <option value="M">M</option>
                    <option value="Q">Q</option>
                    <option value="H">H</option>
                </select>
                <label for="errorCorrectionLevel">Error correction level</label>
            </li>
            <li>
                <input id="size" data-bind="value: qrOptions.size" data-role="numerictextbox"
                    data-format="n0" data-decimals="0" />
                <label for="size">Size</label>
            </li>
            <li>
                <input id="borderWidth" data-bind="value: qrOptions.border.width" data-role="numerictextbox"
                    data-format="n0" data-decimals="0"/>
                <label for="borderWidth">Border width</label>
            </li>
            <li>
                <input id="borderColor" data-role="colorpicker" data-bind="value: qrOptions.border.color" />
                <label for="borderColor">Border color</label>
            </li>
            <li>
                <input id="backgroundColor" data-role="colorpicker" data-bind="value: qrOptions.background"  />
                <label for="backgroundColor">Background color</label>
            </li>                                               
            <li>
                <input id="moduleColor" data-role="colorpicker" data-bind="value: qrOptions.darkModuleColor" />
                <label for="moduleColor">Module color</label>
            </li>
            <li>
                <button id="setOptions" data-bind="click: setOptions" class="k-button">Set options</button>
            </li>
        </ul>
    </div>
</div>

<script type="text/javascript">
    $(document).ready(function () {
        var qrCode = $("#qrCode").data("kendoQRCode");

        var viewModel = kendo.observable({
            qrValue: "Hello World",
            qrOptions: {
                errorCorrectionLevel: "L",
                background: "#FFFFFF",
                darkModuleColor: "#000000",
                size: 200,
                border: {
                    color: "#FFFFFF",
                    width: 0
                }
            },
            setOptions: function () {
                this.setElementWidth();
                qrCode.setOptions(this.qrOptions.toJSON());
            },
            setValue: function () {
                qrCode.value(this.qrValue);
            },
            setElementWidth: function () {
                qrCode.element.width(this.qrOptions.size);
            }
        });

        kendo.bind($("#qrConfig"), viewModel);
        viewModel.setElementWidth();
        viewModel.setValue();
    });
                
</script>

<style scoped>                
                
    .k-qrcode {                         
        margin: 0 auto;                 
    }
                     
    #qrValue{
        width: 300px;
        max-width:300px;
        height: 100px;
    }

    .configuration-horizontal .options li {
        padding: 3px 0;
    }
                          
    .configuration-horizontal .k-textbox {
            margin-left: 0;
    }
</style>

</asp:Content>
