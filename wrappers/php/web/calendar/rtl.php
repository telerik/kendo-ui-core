<?php
require_once '../../include/header.php';
require_once '../../lib/Kendo/Autoload.php';
?>
<div class="k-rtl">
<?php
$calendar = new \Kendo\UI\Calendar('calendar');
echo $calendar->render();
?>
</div>
<?php require_once '../../include/footer.php'; ?>
