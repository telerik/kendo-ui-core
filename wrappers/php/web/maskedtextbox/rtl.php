<?php
require_once '../../include/header.php';
require_once '../../lib/Kendo/Autoload.php';

$maskedtextbox = new \Kendo\UI\MaskedTextBox('maskedtextbox');
$maskedtextbox->mask("(999) 000-0000");
?>
<div class="demo-section k-rtl">
    <h2>Set Value</h2>
    <?= $maskedtextbox->render() ?>
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
