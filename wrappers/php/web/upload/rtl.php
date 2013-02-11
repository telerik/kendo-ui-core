<?php
require_once '../../lib/Kendo/Autoload.php';
require_once '../../include/header.php';
?>
<div class="k-rtl">
<?php
$upload = new \Kendo\UI\Upload('files[]');

echo $upload->render();
?>
</div>
<?php require_once '../../include/footer.php'; ?>
