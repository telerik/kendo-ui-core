<?php
require_once '../../include/header.php';
require_once '../../lib/Kendo/Autoload.php';
?>

<?php

$timeTemplate = new \Kendo\UI\NotificationTemplate();
$timeTemplate->type('time');
$timeTemplate->template("<div style='padding: .6em 1em'>Time is: <span class='timeWrap'>#: time #</span></div>");

$notification = new \Kendo\UI\Notification('notification');
$notification->width("12em");
$notification->addTemplate($timeTemplate);

echo $notification->render();

?>

<div class="demo-section">
    <p>
        <button id="showNotification" class="k-button">Show notification</button>

        <button id="hideAllNotifications" class="k-button">Hide All Notifications</button>
    </p>
</div>
 
<div class="demo-section">                
    <h3 class="title">Console log</h3>
    <div class="console"></div>
</div>
           
<script>

    $(document).ready(function () {

        var notification = $("#notification").data("kendoNotification");

        $("#showNotification").click(function () {
            var d = new Date();
            notification.show({ time: kendo.toString(d, 'HH:MM:ss.') + kendo.toString(d.getMilliseconds(), "000") }, "time");
        });

        $("#hideAllNotifications").click(function () {
            notification.hide();
        });
    });
</script>

<?php require_once '../../include/footer.php'; ?>