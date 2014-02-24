<?php
require_once '../../include/header.php';
require_once '../../lib/Kendo/Autoload.php';

$maskedtextbox = new \Kendo\UI\MaskedTextBox('maskedtextbox');

$maskedtextbox->mask("(999) 000-0000");

$maskedtextbox->change('onChange');

?>

<div class="demo-section">
<?php
echo $maskedtextbox->render();
?>
</div>
<div class="demo-section">
    <h3 class="title">Console log</h3>
    <div class="console"></div>
</div>

<script>
    function onChange() {
        kendoConsole.log("Change :: " + this.value());
    }
</script>
<style scoped>
    .demo-section {
        width: 500px;
        text-align: center;
    }
    .console {
        margin: 0;
    }
</style>
<?php require_once '../../include/footer.php'; ?>
