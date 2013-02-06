<?php

require_once '../../lib/Kendo/Autoload.php';
require_once '../../include/header.php';
?>
<div id="email-settings">
    <div style="margin-top: -6px; margin-left: 180px">
<?php
$datePicker = new \Kendo\UI\DatePicker('datepicker');

$datePicker->value(new DateTime('10/10/2011', new DateTimeZone('UTC')))
           ->attr('style', 'width: 150px');

echo $datePicker->render();
?>
    </div>
    <div style="margin-top: 59px; margin-left: 180px">
<?php
$monthPicker = new \Kendo\UI\DatePicker('monthpicker');

$monthPicker->value(new DateTime('November 2011', new DateTimeZone('UTC')))
            ->start('year')
            ->depth('year')
            ->format('MMMM yyyy')
            ->attr('style', 'width: 150px');

echo $monthPicker->render();
?>
    </div>
</div>
<style scoped>
    #example h2 {
        font-weight: normal;
    }
    #email-settings {
        height: 135px;
        width: 395px;
        margin: 30px auto;
        padding: 110px 0 0 30px;
        background: url('../../content/web/datepicker/mailSettings.png') transparent no-repeat 0 0;
    }
</style>
<?php require_once '../../include/footer.php'; ?>
