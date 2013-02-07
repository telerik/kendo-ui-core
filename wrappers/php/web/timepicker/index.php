<?php
require_once '../../include/header.php';
require_once '../../lib/Kendo/Autoload.php';
?>
 <div id="alarm-settings">
    <div style="margin-top: -7px; margin-left: 180px">
<?php
$timePicker = new \Kendo\UI\TimePicker('timepicker');

$timePicker->value('10:00 AM');

echo $timePicker->render();
?>
    </div>
    <div style="margin-top: 59px; padding-left: 180px">
        <span style="" class="k-widget k-autocomplete k-header k-state-default">
            <input id="descr" class="k-input" type="text" value="Wake up" style="width: 100%" />
        </span>
    </div>
</div>
<style scoped>
    #alarm-settings {
        height: 135px;
        width: 395px;
        margin: 30px auto;
        padding: 110px 0 0 30px;
        background: url('../../content/web/timepicker/alarmSettings.png') transparent no-repeat 0 0;
    }
</style>
<?php require_once '../../include/footer.php'; ?>
