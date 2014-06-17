<?php

require_once '../include/header.php';
require_once '../lib/Kendo/Autoload.php';

?>



<div class="demo-section">
    <div class="box-col" style="width: 260px;">
        <h4>FlatColorPicker:</h4>
<?php
    $flatcolorpicker = new \Kendo\UI\FlatColorPicker('flatcolorpicker');

    $flatcolorpicker->change('flatcolorpickerChange');

    echo $flatcolorpicker->render();
?>   
    </div>
    <div class="box-col">
        <h4>ColorPicker (palette):</h4>
<?php
    $palettePicker = new \Kendo\UI\ColorPicker('palette-picker');

    $palettePicker
        ->value('#cc2222')
        ->palette('basic')
        ->select('pickerSelect')
        ->change('pickerChange')
        ->open('pickerOpen')
        ->close('pickerClose');

    echo $palettePicker->render();
?>     
    </div>
    <div class="box-col">
        <h4>ColorPicker (HSV):</h4>
<?php
    $hsvPicker = new \Kendo\UI\ColorPicker('hsv-picker');

    $hsvPicker
        ->value('#22cc22')
        ->select('pickerSelect')
        ->change('pickerChange')
        ->open('pickerOpen')
        ->close('pickerClose');

    echo $hsvPicker->render();
?>       
    </div>
    <div class="box-col">
        <h4>ColorPalette:</h4>
<?php
    $palette = new \Kendo\UI\ColorPalette('palette');

    $palette->change('paletteChange');

    echo $palette->render();
?>       
    </div>
</div>

<script>
    function pickerSelect(e) {
        kendoConsole.log("Select in picker #" + this.element.attr("id") + " :: " + e.value);
    }

    function pickerChange(e) {
        kendoConsole.log("Change in picker #" + this.element.attr("id") + " :: " + e.value);
    }

    function pickerOpen() {
        kendoConsole.log("Open in picker #" + this.element.attr("id"));
    }

    function pickerClose() {
        kendoConsole.log("Close in picker #" + this.element.attr("id"));
    }

    function paletteChange(e) {
        kendoConsole.log("Change in color palette :: " + e.value);
    }

    function flatcolorpickerChange(e) {
        kendoConsole.log("Change in flat color picker :: " + e.value);
    }
</script>

<div class="box">
    <h4>Console log</h4>
    <div class="console"></div>
</div>

<?php require_once '../include/footer.php'; ?>

