<?php

require_once '../../lib/DataSourceResult.php';
require_once '../../lib/Kendo/Autoload.php';

require_once '../../include/header.php';

$multiselect = new \Kendo\UI\MultiSelect('select');

$multiselect->dataTextField('text')
         ->dataValueField('value')
         ->dataSource(array(
            array('text' => 'Item 1', 'value' => '1'),
            array('text' => 'Item 2', 'value' => '2'),
            array('text' => 'Item 3', 'value' => '3')
         ))
         ->select('onSelect')
         ->change('onChange')
         ->close('onClose')
         ->open('onOpen');

echo $multiselect->render();
?>

<script>
    function onOpen() {
        if ("kendoConsole" in window) {
            kendoConsole.log("event: open");
        }
    }

    function onClose() {
        if ("kendoConsole" in window) {
            kendoConsole.log("event: close");
        }
    }

    function onChange() {
        if ("kendoConsole" in window) {
            kendoConsole.log("event: change");
        }
    }

    function onSelect(e) {
        if ("kendoConsole" in window) {
            var dataItem = this.dataSource.view()[e.item.index()];
            kendoConsole.log("event: select (" + dataItem.text + " : " + dataItem.value + ")" );
        }
    };
</script>
<div class="console"></div>
<?php require_once '../../include/footer.php'; ?>
