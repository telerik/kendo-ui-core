<?php

require_once '../../lib/Kendo/Autoload.php';
require_once '../../include/header.php';
?>
<div id="to-do">
<?php
$dateTimePicker = new \Kendo\UI\DateTimePicker('datetimepicker');

$dateTimePicker->value(new DateTime('now', new DateTimeZone('UTC')))
           ->attr('style', 'width: 200px');

echo $dateTimePicker->render();
?>
</div>
<style scoped>
    #to-do {
        height: 52px;
        width: 221px;
        margin: 30px auto;
        padding: 91px 0 0 188px;
        background: url('../../content/web/datepicker/todo.png') transparent no-repeat 0 0;
    }
</style>
<?php require_once '../../include/footer.php'; ?>
