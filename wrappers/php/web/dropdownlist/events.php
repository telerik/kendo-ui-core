<?php

require_once '../../lib/Kendo/Autoload.php';

require_once '../../include/header.php';

$dropDownList = new \Kendo\UI\DropDownList('dropdownlist');

$dropDownList->dataTextField('text')
             ->dataValueField('value')
             ->dataSource(array(
                array('text' => 'Item1', 'value' => '1'),
                array('text' => 'Item2', 'value' => '2'),
                array('text' => 'Item3', 'value' => '3')
             ))
             ->dataBound('onDataBound')
             ->select('onSelect')
             ->change('onChange')
             ->close('onClose')
             ->open('onOpen');
?>

<div class="demo-section">
    <h3 class="title">DropDownList</h3>
<?php
echo $dropDownList->render();
?>
</div>
<div class="demo-section">
    <h3 class="title">Console log</h3>
    <div class="console"></div>
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
    }

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
    .demo-section .k-dropdown {
        text-align: left;
    }
    .console {
        margin: 0;
    }
</style>
<?php require_once '../../include/footer.php'; ?>
