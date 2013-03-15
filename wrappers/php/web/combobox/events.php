<?php

require_once '../../lib/DataSourceResult.php';
require_once '../../lib/Kendo/Autoload.php';

require_once '../../include/header.php';

$comboBox = new \Kendo\UI\ComboBox('combobox');

$comboBox->dataTextField('text')
         ->dataValueField('value')
         ->dataSource(array(
            array('text' => 'Item 1', 'value' => '1'),
            array('text' => 'Item 2', 'value' => '2'),
            array('text' => 'Item 3', 'value' => '3')
         ))
         ->dataBound('onDataBound')
         ->select('onSelect')
         ->change('onChange')
         ->close('onClose')
         ->open('onOpen');
?>
<div class="demo-section">
    <h3 class="title">ComboBox
    </h3>
<?php
echo $comboBox->render();
?>
</div>

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

    function onDataBound() {
        if ("kendoConsole" in window) {
            kendoConsole.log("event: dataBound");
        }
    };

    function onSelect(e) {
        if ("kendoConsole" in window) {
            var dataItem = this.dataItem(e.item.index());
            kendoConsole.log("event: select (" + dataItem.text + " : " + dataItem.value + ")" );
        }
    };
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
<div class="demo-section">
    <h3 class="title">Console log
    </h3>
    <div class="console"></div>
</div>
<?php require_once '../../include/footer.php'; ?>
