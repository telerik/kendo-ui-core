<?php
require_once '../../include/header.php';
require_once '../../lib/Kendo/Autoload.php';

$numeric = new \Kendo\UI\NumericTextBox('numerictextbox');

$numeric->change('onChange')
        ->spin('onSpin');

echo $numeric->render();

?>

<script>
    function onChange() {
        kendoConsole.log("Change :: " + this.value());
    }

    function onSpin() {
        kendoConsole.log("Spin :: " + this.value());
    }
</script>

<div class="console"></div>
<?php require_once '../../include/footer.php'; ?>
