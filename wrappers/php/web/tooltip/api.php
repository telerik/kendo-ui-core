<?php
require_once '../../lib/Kendo/Autoload.php';

require_once '../../include/header.php';

$tooltip = new \Kendo\UI\Tooltip('#tooltip'); // select the container for the tooltip
$tooltip->filter('div')
    ->autoHide(false)
    ->showOn('click')
    ->width(300)
    ->content('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')
    ->position('right');

echo $tooltip->render();
?>

    <div class="configuration k-widget k-header" style="z-index:10000">
        <span class="configHead">API Functions</span>
        <ul class="options">
            <li>
               Show at
            <?php
                $selector = new \Kendo\UI\DropDownList('selector');
                $selector->change('change')
                    ->dataTextField('text')
                    ->dataValueField('value')
                    ->dataSource(array(array('value' => 1, 'text' => 'Target 1'),array('value' => 2, 'text' => 'Target 2')));
                echo $selector->render();
            ?>
            </li>
        </ul>
    </div>

    <div id="tooltip">
        <div id="target1" class="k-group">Target 1</div>
        <div id="target2" class="k-group">Target 2</div>
    </div>

    <script>
        function change() {
            $("#tooltip").data("kendoTooltip").show($("#target" + this.value()));
        }
    </script>

    <style scoped="scoped">
        #target1, #target2 {
            text-align: center;
            width: 200px;
            white-space: nowrap;
            border-width: 1px;
            border-style: solid;
            padding: 2em;
            margin: 10px;
        }
    </style>

<?php require_once '../../include/footer.php'; ?>
