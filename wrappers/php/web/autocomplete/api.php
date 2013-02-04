<?php
require_once '../../lib/Kendo/Autoload.php';
require_once '../../include/header.php';
?>
<div class="configuration k-widget k-header">
    <span class="configHead">API Functions</span>
    <ul class="options">
        <li>
            <input id="value" type="text" class="k-textbox" />
            <button id="set" class="k-button">Set value</button>
        </li>
        <li>
            <button id="get" class="k-button">Get value</button>
        </li>
        <li>
            <input id="word" value="B" class="k-textbox" />
            <button id="search" class="k-button">Find starting with</button>
        </li>
    </ul>
</div>
<div id="colors">
   <label for="products">Primary color</label>
<?php

$dataSource = new \Kendo\Data\DataSource();
$dataSource->data(array( 'Red-violet', 'Red', 'Red-orange', 'Orange', 'Yellow-orange',
                        'Yellow', 'Yellow-green', 'Green', 'Blue-green', 'Blue',
                        'Blue-violet', 'Violet'));

$autoComplete = new \Kendo\UI\AutoComplete('products');
$autoComplete->dataSource($dataSource);

echo $autoComplete->render();
?>
</div>

<script>
    $(function() {
        var autocomplete = $("#products").data("kendoAutoComplete"),
            setValue = function(e) {
                if (e.type != "keypress" || kendo.keys.ENTER == e.keyCode)
                    autocomplete.value($("#value").val());
            },
            setSearch = function(e) {
                if (e.type != "keypress" || kendo.keys.ENTER == e.keyCode)
                    autocomplete.search($("#word").val());
            };

        $("#set").click(setValue);
        $("#value").keypress(setValue);
        $("#search").click(setSearch);
        $("#word").keypress(setSearch);

        $("#get").click(function() {
            alert(autocomplete.value());
        });
    });
</script>
<style scoped>
    #colors {
        width: 366px;
        height: 180px;
        padding: 114px 0 0 0;
        background: url('../../content/web/autocomplete/palette.png') transparent no-repeat right 0;
        margin: 30px 0 30px 120px;
        text-align: center;
    }
    #colors label {
        display: block;
        color: #333;
        padding-bottom: 5px;
    }
    #products {
        margin-right: 50px;
    }
    .configuration {
        height: 410px;
        margin-bottom: -21px;
    }
    .configuration .k-textbox {
        width: 40px;
    }
</style>

<?php require_once '../../include/footer.php'; ?>
