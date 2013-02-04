<?php

require_once '../../include/header.php';
require_once '../../lib/Kendo/Autoload.php';

?>

<div class="demo-section">
    <dl>
        <dt><label for="palette-picker">ColorPicker (palette):</label></dt>
        <dd>
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
        </dd>

        <dt><label for="hsv-picker">ColorPicker (HSV):</label></dt>
        <dd>
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
        </dd>

        <dt>ColorPalette:</dt>
        <dd>
<?php
    $palette = new \Kendo\UI\ColorPalette('palette');

    $palette->change('paletteChange');

    echo $palette->render();
?>
        </dd>

        <dt>FlatColorPicker:</dt>
        <dd>
<?php
    $flatcolorpicker = new \Kendo\UI\FlatColorPicker('flatcolorpicker');

    $flatcolorpicker->change('flatcolorpickerChange');

    echo $flatcolorpicker->render();
?>
        </dd>
    </dl>
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

<div class="demo-section">
    <h3 class="title">Console log</h3>
    <div class="console"></div>
</div>

<style scoped>
    .demo-section {
        width: 500px;
    }

    .demo-section dl {
        display: inline-block;
    }

    .demo-section dl:after {
        content: " ";
        clear: both;
        font: 0/0;
    }

    .demo-section dt,
    .demo-section dd {
        float: left;
        margin: 0;
        padding: 0 0 1em;
    }

    .demo-section dt {
        width: 45%;
        padding-top: .3em;
        padding-right: 5%;
        clear: left;
        text-align: right;
    }

    .demo-section dd {
        width: 50%;
    }
</style>

<?php require_once '../../include/footer.php'; ?>

