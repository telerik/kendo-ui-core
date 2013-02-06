<?php

require_once '../../lib/Kendo/Autoload.php';
require_once '../../include/header.php';
?>
<div class="demo-section" style="width: 155px;">
<?php
$datePicker = new \Kendo\UI\DatePicker('datepicker');
$datePicker->open('onOpen')
           ->close('onClose')
           ->change('onChange');

echo $datePicker->render();
?>
</div>

<div class="console"></div>
<script>
    function onOpen() {
        kendoConsole.log("Open");
    }

    function onClose() {
        kendoConsole.log("Close");
    }

    function onChange() {
        kendoConsole.log("Change :: " + kendo.toString(this.value(), 'd'));
    }
</script>
<?php require_once '../../include/footer.php'; ?>
