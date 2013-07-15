<?php
require_once '../../lib/Kendo/Autoload.php';
require_once '../../include/header.php';
?>

<div class="configuration-horizontal" id="qrConfig">
    <div class="config-section">
        <span class="configHead">Value</span>
        <ul class="options">
            <li>
                <textarea id="qrValue" class="k-textbox" data-bind="value: qrValue" rows="5" cols="20"></textarea>
            </li>
        </ul>
    </div>
    <div class="config-section">
        <span class="configHead">Options</span>
        <ul class="options">
            <li>
               <label for="errorCorrection">Error correction level:</label>
               <select id="errorCorrection" data-role="dropdownlist" data-bind="value: qrOptions.errorCorrection">
                    <option value="L">L</option>
                    <option value="M">M</option>
                    <option value="Q">Q</option>
                    <option value="H">H</option>
                </select>
            </li>
            <li>
               <label for="encoding">Encoding:</label>
               <select id="encoding" data-role="dropdownlist" data-bind="value: qrOptions.encoding">
                    <option value="ISO_8859_1">ISO_8859_1</option>
                    <option value="UTF_8">UTF_8</option>
                </select>
            </li>             
            <li>
                <label for="size">Size:</label>
                <input id="size" data-bind="value: qrOptions.size" data-role="numerictextbox"
                    data-format="n0" data-decimals="0" />
            </li>
            <li>
                <label for="borderWidth">Border width:</label>
                <input id="borderWidth" data-bind="value: qrOptions.border.width" data-role="numerictextbox"
                    data-format="n0" data-decimals="0"/>
            </li>
        </ul>
    </div>
    <div class="config-section">
        <span class="configHead">Colors</span>
        <ul class="options">
            <li>
                <label for="borderColor">Border color:</label>
                <input id="borderColor" data-role="colorpicker" data-bind="value: qrOptions.border.color" />
            </li>
            <li>
                <label for="backgroundColor">Background color:</label>
                <input id="backgroundColor" data-role="colorpicker" data-bind="value: qrOptions.background"  />
            </li>
            <li>
                <label for="moduleColor">Module color:</label>
                <input id="moduleColor" data-role="colorpicker" data-bind="value: qrOptions.color" />
            </li>
        </ul>
    </div>
</div>
<div class="demo-section">
    <?php
        $qrCode = new \Kendo\Dataviz\UI\QRCode('qrCode');
        $qrCode->size(200);

        echo $qrCode->render();
    ?>
</div>

<script type="text/javascript">
    $(document).ready(function () {
        var qrCode = $("#qrCode").kendoQRCode({
            size: 200
        }).data("kendoQRCode");

        var viewModel = kendo.observable({
            qrValue: "Hello World",
            qrOptions: {
                errorCorrection: "L",
                encoding: "ISO_8859_1",
                background: "#FFFFFF",
                color: "#000000",
                size: 200,
                border: {
                    color: "#FFFFFF",
                    width: 0
                }
            },
            setValue: function () {
                qrCode.value(this.qrValue);
            },
            setElementWidth: function () {
                qrCode.element.width(this.qrOptions.size);
            }
        });

        viewModel.bind("change", function (e) {
            if (e.field == "qrValue") {
                this.setValue();
            }
            else {
                this.setElementWidth();
                qrCode.setOptions(this.qrOptions.toJSON());
            }
        });

        kendo.bind($("#qrConfig"), viewModel);
        viewModel.setElementWidth();
        viewModel.setValue();
    });

</script>

<style scoped>

    .k-qrcode {
        margin: 20px auto;
    }

    #qrValue{
        width: 190px;
        max-width:190px;
        height: 100px;
    }

    .configuration-horizontal .options li {
        padding: 3px 0;
    }

    .configuration-horizontal .config-section
    {
        min-width: 100px;
    }

    .configuration-horizontal .k-textbox {
         margin-left: 0;
    }
    .options label {
         display: inline-block;
         width: 120px;
    }
    .options .k-dropdown,
    .options .k-numerictextbox {
         width: 100px;
    }
</style>


<?php require_once '../../include/footer.php'; ?>
