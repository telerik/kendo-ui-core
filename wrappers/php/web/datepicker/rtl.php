<?php

require_once '../../lib/Kendo/Autoload.php';
require_once '../../include/header.php';
?>
<div class="demo-section">
    <div class="k-rtl">
        <label for="datepicker">Choose date:</label>
<?php
$datePicker = new \Kendo\UI\DatePicker('datepicker');

echo $datePicker->render();
?>
    </div>
</div>
<style scoped>
    .demo-section {
        width: 400px;
        text-align: center;
        margin: 50px auto;
        padding-top: 50px;
        padding-bottom: 50px;
    }
</style>
<?php require_once '../../include/footer.php'; ?>
