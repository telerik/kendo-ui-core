<?php
require_once '../../include/header.php';
require_once '../../lib/Kendo/Autoload.php';
?>
<div class="k-rtl">
<?php
$timePicker = new \Kendo\UI\TimePicker('timepicker');

echo $timePicker->render();
?>
</div>
<?php require_once '../../include/footer.php'; ?>
