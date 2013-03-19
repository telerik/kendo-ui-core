<?php
require_once '../../include/header.php';
require_once '../../lib/Kendo/Autoload.php';

$numeric = new \Kendo\UI\NumericTextBox('numerictextbox');
?>
<div class="demo-section k-rtl">
    <h2>Set Value</h2>
<?= $numeric->render() ?>
</div>

<style scoped>
    .demo-section {
        width: 250px;
        margin: 35px auto 50px;
        padding: 30px;
    }
    .demo-section h2 {
        text-transform: uppercase;
        font-size: 1.2em;
        margin-bottom: 10px;
    }
</style>

<?php require_once '../../include/footer.php'; ?>
