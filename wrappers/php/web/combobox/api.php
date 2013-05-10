<?php

require_once '../../lib/DataSourceResult.php';
require_once '../../lib/Kendo/Autoload.php';

require_once '../../include/header.php';

?>
<div class="configuration-horizontal">
    <div class="config-section">
    <span class="configHead">API Functions</span>
    <ul class="options">
        <li>
            <button id="enable" class="k-button">Enable</button> <button id="disable" class="k-button">Disable</button>
        </li>
        <li>
            <button id="readonly" class="k-button">Readonly</button>
        </li>
        <li>
            <button id="open" class="k-button">Open</button> <button id="close" class="k-button">Close</button>
        </li>
        <li>
            <button id="getValue" class="k-button">Get value</button> <button id="getText" class="k-button">Get text</button>
        </li>
    </ul>
    </div>
    <div class="config-section">
    <span class="configHead">Filter</span>
    <ul class="options">
        <li>
            <select id="filter">
                <option value="none">None</option>
                <option value="startswith">Starts with</option>
                <option value="contains">Contains</option>
                <option value="eq">Equal</option>
            </select>
        </li>
        <li>
            <input id="word" value="The" class="k-textbox" style="width: 149px; margin: 0;" />
        </li>
        <li>
            <button id="find" class="k-button">Find item</button>
        </li>
    </ul>
    </div>
    <div class="config-section">
    <span class="configHead">Select</span>
    <ul class="options">
        <li>
            <input id="index" value="0" class="k-textbox" style="width: 40px; margin: 0;" /> <button id="select" class="k-button">Select by index</button>
        </li>
        <li>
            <input id="value" value="1" class="k-textbox" style="width: 40px; margin: 0;" /> <button id="setValue" class="k-button">Select by value</button>
        </li>
    </ul>
    </div>
</div>
<div class="demo-section">
<?php
$comboBox = new \Kendo\UI\ComboBox('movies');

$comboBox->dataTextField('text')
         ->dataValueField('value')
         ->attr('style', 'width: 250px')
         ->dataSource(array(
            array('text' => '12 Angry Men', 'value' => 1),
            array('text' => 'Il buono, il brutto, il cattivo.', 'value' => 2),
            array('text' => 'Inception', 'value' => 3),
            array('text' => "One Flew Over the Cuckoo's Nest", 'value' => 4),
            array('text' => 'Pulp Fiction', 'value' => 5),
            array('text' => "Schindler's List", 'value' => 6),
            array('text' => 'The Dark Knight', 'value' => 7),
            array('text' => 'The Godfather', 'value' => 8),
            array('text' => 'The Godfather: Part II', 'value' => 9),
            array('text' => 'The Shawshank Redemption', 'value' => 10),
            array('text' => 'The Shawshank Redemption 2', 'value' => 11)
         ));

echo $comboBox->render();
?>
</div>
<script>
$(function() {
    $("#filter").kendoDropDownList({
        change: filterTypeOnChanged
    });

    var combobox = $("#movies").data("kendoComboBox"),
        setValue = function(e) {
            if (e.type != "keypress" || kendo.keys.ENTER == e.keyCode)
                combobox.value($("#value").val());
        },
        setIndex = function(e) {
            if (e.type != "keypress" || kendo.keys.ENTER == e.keyCode) {
                var index = parseInt($("#index").val());
                combobox.select(index);
            }
        },
        setSearch = function (e) {
            if (e.type != "keypress" || kendo.keys.ENTER == e.keyCode)
                combobox.search($("#word").val());
        };

    $("#enable").click(function() {
        combobox.enable();
    });

    $("#disable").click(function() {
        combobox.enable(false);
    });

    $("#readonly").click(function () {
        combobox.readonly();
    });

    $("#open").click(function() {
        combobox.open();
    });

    $("#close").click(function() {
        combobox.close();
    });

    $("#getValue").click(function() {
        alert(combobox.value());
    });

    $("#getText").click(function() {
        alert(combobox.text());
    });

    $("#setValue").click(setValue);
    $("#value").keypress(setValue);

    $("#select").click(setIndex);
    $("#index").keypress(setIndex);

    $("#find").click(setSearch);
    $("#word").keypress(setSearch);

    function filterTypeOnChanged() {
        combobox.options.filter = $("#filter").val();
    }
});
</script>
<style scoped>
    .configuration .k-textbox {
        width: 40px;
    }
    .demo-section {
        width: 660px;
        padding: 30px;
        text-align: center;
    }
    .k-button {
        min-width: 80px;
    }
    .configuration-horizontal .options li {
        padding: 3px 0;
    }
</style>
<?php require_once '../../include/footer.php'; ?>
