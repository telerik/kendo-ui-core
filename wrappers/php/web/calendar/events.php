<?php
require_once '../../include/header.php';
require_once '../../lib/Kendo/Autoload.php';
?>

<div class="configuration k-widget k-header">
    <span class="configHead">Events log</span>
    <div class="console"></div>
</div>
<div class="reports">
<?php
$calendar = new \Kendo\UI\Calendar('calendar');
$calendar->attr('style', 'width: 243px')
         ->change('onChange')
         ->navigate('onNavigate');

echo $calendar->render();
?>
</div>

<script>
    function onChange() {
        kendoConsole.log("Change :: " + kendo.toString(this.value(), 'd'));
    }

    function onNavigate() {
        kendoConsole.log("Navigate");
    }
</script>

<style scoped="scoped">
    .reports {
        width: 265px;
        height: 247px;
        padding: 108px 0 0 20px;
        background: url('../../content/web/calendar/reports.png') transparent no-repeat 0 0;
        margin: 30px 105px 20px;
    }
    .configuration {
        height: 390px;
        width: 200px;
    }
    .configuration .console {
        background-color: transparent;
        border: 0;
        height: 342px;
        overflow: auto;
    }
</style>

<?php require_once '../../include/footer.php'; ?>
