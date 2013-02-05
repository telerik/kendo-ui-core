<?php

require_once '../../lib/DataSourceResult.php';
require_once '../../lib/Kendo/Autoload.php';
require_once '../../include/header.php';
?>
<div class="demo-section">
    <h3>T-shirt Size</h3>
<?php
$comboBox = new \Kendo\UI\ComboBox('select');

$comboBox->placeholder('Select size ...')
         ->attr('style', 'width: 200px')
         ->attr('accesskey', 'w')
         ->value('Large')
         ->dataSource(array('X-Small', 'Small', 'Medium', 'Large', 'X-Large', '2X-Large'));

echo $comboBox->render();
?>
</div>

<ul class="keyboard-legend">
    <li>
        <span class="button-preview">
            <span class="key-button leftAlign wider"><a target="_blank" href="http://en.wikipedia.org/wiki/Access_key">Access key</a></span>
            +
            <span class="key-button">w</span>
        </span>
        <span class="button-descr">
            focuses the widget
        </span>
    </li>
</ul>

<ul class="keyboard-legend">
    <li>
        <span class="button-preview">
            <span class="key-button wide leftAlign">up arrow</span>
        </span>
        <span class="button-descr">
            highlights previous item
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button wider leftAlign">down arrow</span>
        </span>
        <span class="button-descr">
            highlights next item
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button wider rightAlign">enter</span>
        </span>
        <span class="button-descr">
            selects highlighted item
        </span>
    </li>
   <li>
        <span class="button-preview">
            <span class="key-button">esc</span>
        </span>
        <span class="button-descr">
            closes the popup
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button">alt</span>
            <span class="key-button wider leftAlign">down arrow</span>
        </span>
        <span class="button-descr">
            opens the popup
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button">alt</span>
            <span class="key-button wide leftAlign">up arrow</span>
        </span>
        <span class="button-descr">
            closes the popup
        </span>
    </li>
</ul>

<script>
    $(document).ready(function () {
        $("#select").kendoComboBox();
    });
</script>

<style scoped>
    div.demo-section
    {
        width: 204px;
        margin: 0px auto 25px auto;
    }
</style>
<?php require_once '../../include/footer.php'; ?>
