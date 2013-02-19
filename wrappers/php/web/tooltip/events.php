<?php
require_once '../../lib/Kendo/Autoload.php';

require_once '../../include/header.php';

$tooltip = new \Kendo\UI\Tooltip('#autohide-true'); // select the container for the tooltip
$tooltip->show('onShow')
    ->hide('onHide')
    ->content('Hello!')
    ->position('top');

echo $tooltip->render();

$tooltip = new \Kendo\UI\Tooltip('#autohide-false'); // select the container for the tooltip
$tooltip->show('onShow')
    ->hide('onHide')
    ->autoHide(false)
    ->content('Hello!')
    ->position('top');

echo $tooltip->render();
?>

    <div class="demo-section">
        <span id="autohide-true" class="key-button wider">Hover me!</span>
        <span id="autohide-false" class="key-button wider">Hover me too!</span>
    </div>

    <div class="demo-section">
        <h3 class="title">Console log</h3>
        <div class="console"></div>
    </div>

    <script>
        function onShow(e) {
            kendoConsole.log("event :: show");
        }

        function onHide(e) {
            kendoConsole.log("event :: hide");
        }
    </script>

    <style scoped="scoped">
        .demo-section {
            width: 600px;
            padding-top: 2em;
            padding-bottom: 2em;
            text-align: center;
        }
        .wider {
            margin: 0 20px;
            padding: 15px 8px;
            line-height: 23px;
            width: 120px;
        }
    </style>

<?php require_once '../../include/footer.php'; ?>
