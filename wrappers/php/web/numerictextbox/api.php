<?php
require_once '../../include/header.php';
require_once '../../lib/Kendo/Autoload.php';

$numeric = new \Kendo\UI\NumericTextBox('numerictextbox');

echo $numeric->render();
?>
<script>
    $(document).ready(function() {
        var numerictextbox = $("#numerictextbox").data("kendoNumericTextBox");

        var setValue = function () {
            numerictextbox.value($("#value").val());
        };

        $("#enable").click(function() {
            numerictextbox.enable();
        });

        $("#disable").click(function() {
            numerictextbox.enable(false);
        });

        $("#focus").click(function() {
            numerictextbox.focus();
        });

        $("#value").kendoNumericTextBox({
            change: setValue
        });

        $("#set").click(setValue);

        $("#get").click(function() {
            alert(numerictextbox.value());
        });
    });
</script>
<div class="configuration k-widget k-header" style="width: 220px">
    <span class="configHead">API Functions</span>
    <ul class="options">
        <li>
           <button id="get" class="k-button">Get value</button> or <button id="focus" class="k-button">Focus</button>
       </li>
       <li>
           <input id="value" value="10" style="float:none" />
           <button id="set" class="k-button">Set value</button>
       </li>
        <li>
            <button id="enable" class="k-button">Enable</button> or <button id="disable" class="k-button">Disable</button>
        </li>
    </ul>
</div>
<?php require_once '../../include/footer.php'; ?>
