<?php

require_once '../../lib/Kendo/Autoload.php';
require_once '../../include/header.php';
?>
<div class="demo-section" style="width: 185px;">
<?php
$dateTimePicker = new \Kendo\UI\DateTimePicker('datetimepicker');
$dateTimePicker->open('onOpen')
           ->close('onClose')
           ->change('onChange');

echo $dateTimePicker->render();
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
