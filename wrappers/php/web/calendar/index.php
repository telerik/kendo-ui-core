<?php
require_once '../../include/header.php';
require_once '../../lib/Kendo/Autoload.php';
?>

<div id="background">
<?php
$calendar = new \Kendo\UI\Calendar('calendar');

echo $calendar->render();
?>
</div>

<style scoped>
    #background {
        width: 254px;
        height: 250px;
        margin: 30px auto;
        padding: 69px 0 0 11px;
        background: url('../../content/web/calendar/calendar.png') transparent no-repeat 0 0;
    }
    #calendar {
        width: 241px;
    }
</style>
<?php require_once '../../include/footer.php'; ?>
