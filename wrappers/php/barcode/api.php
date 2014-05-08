<?php
require_once '../lib/Kendo/Autoload.php';
require_once '../include/header.php';
?>

    <div id="example" class="k-content">

        <div class="demo-section">
            <?php
        $barcode = new \Kendo\Dataviz\UI\Barcode('barcode');
        $barcode->value("1234567");
        $barcode->type("ean8");
        $barcode->background("transparent");
        echo $barcode->render();
        ?>
        </div>
        <div class="configuration-horizontal">
            <div class="config-section">
                <ul class="options">
                    <li>
                        <label><input  id="value" class="k-textbox" value="1234567"/> Value </label>
                        <span id="validValue" class="k-widget k-tooltip k-tooltip-validation k-invalid-msg"></span>
                    </li>
                    <li><label><input  id="type" /> Encoding </label></li>
                    <li><label><input type="checkbox" id="text" checked="checked"/> Show Text </label></li>
                    <li><label><input type="checkbox" id="checksum" /> Show Checksum </label></li>
                </ul>
            </div>
        </div>

        <script>
            function setOptions(e) {
                var validValue = $('#validValue');
                if (this.element&&this.element[0].id == "type") {
                    $('#value').val(this.dataItem().value);
                }
                try {
                    var barcode = $('#barcode').data('kendoBarcode');
                    barcode.setOptions({
                        value: $('#value').val(),
                        checksum: $('#checksum').is(':checked'),
                        text: {
                            visible: $('#text').is(':checked')
                        },
                        type: $('#type').kendoDropDownList('value')
                    })
                    validValue.hide();
                } catch (e) {
                    validValue.text(e.message).show();
                }
            }

            $(document).ready(function () {

                $('#type').kendoDropDownList({
                    dataSource: [
                     { type: 'EAN8', value: "1234567" },
                     { type: 'EAN13', value: "123456789987" },
                     { type: 'UPCE', value: "123456" },
                     { type: 'UPCA', value: "12345678998" },
                     { type: 'Code11', value: "1234567" },
                     { type: 'Code39', value: "HELLO" },
                     { type: 'Code39Extended', value: "Hi!" },
                     { type: 'Code128', value: "Hello World!" },
                     { type: 'Code93', value: "HELLO" },
                     { type: 'Code93Extended', value: "Hello" },
                     { type: 'Code128A', value: "HELLO" },
                     { type: 'Code128B', value: "Hello" },
                     { type: 'Code128C', value: "1234567" },
                     { type: 'MSImod10', value: "1234567" },
                     { type: 'MSImod11', value: "1234567" },
                     { type: 'MSImod1010', value: "1234567" },
                     { type: 'MSImod1110', value: "1234567" },
                     { type: 'GS1-128', value: "12123456" },
                     { type: 'POSTNET', value: "12345" }
                    ],
                    change: setOptions,
                    dataTextField: "type",
                    dataValueField: "type"
                });

                $('#value,#checksum,#text').change(setOptions);
            });
        </script>
        <style type="text/css">
            #barcode
            {
                width: 300px;
                margin: 0 auto;
            }

            .configuration-horizontal .options li
            {
                padding: 3px 0;
            }

            .configuration-horizontal .k-textbox
            {
                width:150px;
                margin-left: 0;
            }

            #validValue
            {
                display:none;
            }
        </style>
    </div>


<?php require_once '../include/footer.php'; ?>
