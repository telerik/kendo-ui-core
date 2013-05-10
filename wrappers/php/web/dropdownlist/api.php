<?php

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
    <span class="configHead">Select</span>
    <ul class="options">
        <li>
            <input id="index" value="0" class="k-textbox" style="width: 40px; margin: 0;" /> <button id="select" class="k-button">Select by index</button>
        </li>
        <li>
            <input id="value" value="1" class="k-textbox" style="width: 40px; margin: 0;" /> <button id="setValue" class="k-button">Select by value</button>
        </li>
        <li>
            <input id="word" value="Pulp" class="k-textbox" style="width: 100px; margin: 0;" /> <button id="find" class="k-button">Select item starting with</button>
        </li>
    </ul>
    </div>
</div>

<div class="demo-section">
<?php
$dropDownList = new \Kendo\UI\DropDownList('movies');

$dropDownList->dataTextField('text')
             ->dataValueField('value')
             ->attr('style', 'width: 250px')
             ->dataSource(array(
                array('text' => 'The Shawshank Redemption', 'value' => 1),
                array('text' => 'The Godfather', 'value' => 2),
                array('text' => 'The Godfather: Part II', 'value' => 3),
                array('text' => "Il buono, il brutto, il cattivo.", 'value' => 4),
                array('text' => 'Pulp Fiction', 'value' => 5),
                array('text' => "12 Angry Men", 'value' => 6),
                array('text' => "Schindler's List", 'value' => 7),
                array('text' => "One Flew Over the Cuckoo's Nest", 'value' => 8),
                array('text' => 'Inception', 'value' => 9),
                array('text' => 'The Dark Knight', 'value' => 10)
             ));

echo $dropDownList->render();
?>
</div>
<script>
    $(document).ready(function() {
        var dropdownlist = $("#movies").data("kendoDropDownList"),
            setValue = function(e) {
                if (e.type != "keypress" || kendo.keys.ENTER == e.keyCode)
                    dropdownlist.value($("#value").val());
            },
            setIndex = function(e) {
                if (e.type != "keypress" || kendo.keys.ENTER == e.keyCode) {
                    var index = parseInt($("#index").val());
                    dropdownlist.select(index);
                }
            },
            setSearch = function(e) {
                if (e.type != "keypress" || kendo.keys.ENTER == e.keyCode)
                    dropdownlist.search($("#word").val());
            };

        $("#enable").click(function() {
            dropdownlist.enable();
        });

        $("#disable").click(function() {
            dropdownlist.enable(false);
        });

        $("#readonly").click(function () {
            dropdownlist.readonly();
        });

        $("#open").click(function() {
            dropdownlist.open();
        });

        $("#close").click(function() {
            dropdownlist.close();
        });

        $("#getValue").click(function() {
            alert(dropdownlist.value());
        });

        $("#getText").click(function() {
            alert(dropdownlist.text());
        });

        $("#setValue").click(setValue);
        $("#value").keypress(setValue);

        $("#select").click(setIndex);
        $("#index").keypress(setIndex);

        $("#find").click(setSearch);
        $("#word").keypress(setSearch);
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
