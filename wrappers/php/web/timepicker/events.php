<?php
require_once '../../include/header.php';
require_once '../../lib/Kendo/Autoload.php';
?>
<div class="demo-section" style="width: 250px;">
    <label for="timepicker">Pick time:</label>
<?php
$timePicker = new \Kendo\UI\TimePicker('timepicker');

$timePicker->change('onChange')
           ->close('onClose')
           ->open('onOpen');

echo $timePicker->render();
?>
</div>

<script>
    function onOpen() {
        kendoConsole.log("Open");
    }

    function onClose() {
        kendoConsole.log("Close");
    }

    function onChange() {
        kendoConsole.log("Change :: " + kendo.toString(this.value(), 't'));
    }
</script>
<div class="console"></div>
<?php require_once '../../include/footer.php'; ?>
