<?php

require_once '../../include/header.php';
require_once '../../lib/Kendo/Autoload.php';

?>

<div class="configuration-horizontal">
    <div class="config-section">
    <span class="configHead">Values</span>
    <ul class="options">
        <li>
            <input id="value" value="#ff0000"  class="k-textbox" style="width: 100px; margin: 0;" />
            <button id="set" class="k-button">Set value</button>
        </li>
        <li><button id="get" class="k-button">Get value</button></li>
    </ul>
    </div>
    <div class="config-section">
    <span class="configHead">Enable/Disable</span>
    <ul class="options">
        <li>
            <button id="enable" class="k-button">Enable</button> 
            <button id="disable" class="k-button">Disable</button>
        </li>
    </ul>
    </div>
    <div class="config-section">
    <span class="configHead">Open/Close</span>
    <ul class="options">
        <li>
            <button id="open" class="k-button">Open</button> 
            <button id="close" class="k-button">Close</button>
        </li>
    </ul>
    </div>
</div>

<div class="demo-section">
    <label for="colorpicker">ColorPicker:</label>
<?php
    $colorPicker = new \Kendo\UI\ColorPicker('colorpicker');

    $colorPicker
        ->value('#00f')
        ->toolIcon('k-foreColor');

    echo $colorPicker->render();
?>
</div>

<script>
    $(document).ready(function() {
        var colorpicker = $("#colorpicker").data("kendoColorPicker");

        $("#enable").click(function(){
            colorpicker.enable();
        });

        $("#disable").click(function(){
            colorpicker.enable(false);
        });

        $("#get").click(function(){
            alert( colorpicker.value() );
        });

        $("#set").click(function(){
            var color = $("#value").val();
            try {
                color = kendo.parseColor(color);
                colorpicker.value(color);
            } catch(ex) {
                alert('Cannot parse color: "' + color + '"');
            }
        });

        $("#open").click(function(){
            colorpicker.open();
        });

        $("#close").click(function(){
            colorpicker.close();
        });
    });
</script>

<style scoped>
    .demo-section {
        width: 660px;
        padding: 30px;
        text-align: center;
    }
    .k-button {
        min-width: 80px;
    }
    .configuration-horizontal .options li {
        padding: 3px 0;
    }
</style>

<?php require_once '../../include/footer.php'; ?>


