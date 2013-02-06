<?php

require_once '../../lib/Kendo/Autoload.php';

require_once '../../include/header.php';
?>
<div class="configuration k-widget k-header" style="width: 210px">
    <span class="configHead">API Functions</span>
    <ul class="options">
        <li>
            <button id="enable" class="k-button">Enable</button> or <button id="disable" class="k-button">Disable</button>
        </li>
        <li>
            <button id="open" class="k-button">Open</button> or <button id="close" class="k-button">Close</button> the drop-down
        </li>
        <li>
            <button id="getValue" class="k-button">Get value</button> or <button id="getText" class="k-button">Get text</button>
        </li>
        <li>
            <input id="index" value="0" class="k-textbox" /> <button id="select" class="k-button">Select by index</button>
        </li>
        <li>
            <input id="value" value="1" class="k-textbox" /> <button id="setValue" class="k-button">Select by value</button>
        </li>
        <li>
            <input id="word" value="Pulp" class="k-textbox" /> <button id="find" class="k-button">Select item starting with</button>
        </li>
    </ul>
</div>

<?php
$dropDownList = new \Kendo\UI\DropDownList('products');

$dropDownList->dataTextField('text')
             ->dataValueField('value')
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

echo $dropDownList->render();
?>
<script>
    $(document).ready(function() {
        var dropdownlist = $("#products").data("kendoDropDownList"),
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
</style>
<?php require_once '../../include/footer.php'; ?>
