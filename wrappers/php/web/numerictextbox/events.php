<?php
require_once '../../include/header.php';
require_once '../../lib/Kendo/Autoload.php';

$numeric = new \Kendo\UI\NumericTextBox('numerictextbox');

$numeric->change('onChange')
        ->spin('onSpin');

?>

<div class="demo-section">
<?php
echo $numeric->render();
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

    function onSpin() {
        kendoConsole.log("Spin :: " + this.value());
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
