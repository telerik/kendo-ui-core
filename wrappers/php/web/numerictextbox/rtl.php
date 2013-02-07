<?php
require_once '../../include/header.php';
require_once '../../lib/Kendo/Autoload.php';

$numeric = new \Kendo\UI\NumericTextBox('numerictextbox');
?>
<div class="k-rtl">
<?= $numeric->render() ?>
</div>
<?php require_once '../../include/footer.php'; ?>
