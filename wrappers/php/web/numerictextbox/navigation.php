<?php
require_once '../../include/header.php';
require_once '../../lib/Kendo/Autoload.php';
?>
<div class="demo-section">
    <h2>Set Value</h2>
<?php
$numeric = new \Kendo\UI\NumericTextBox('numerictextbox');

$numeric->attr('style', 'width: 250px');
$numeric->attr('accesskey', 'w');

echo $numeric->render();
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
            increases the widget's value
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button wider leftAlign">down arrow</span>
        </span>
        <span class="button-descr">
            decreases the widget's value
        </span>
    </li>
</ul>

<style scoped>
    .demo-section {
        width: 250px;
        margin: 35px auto 50px;
        padding: 30px;
    }
    .demo-section h2 {
        text-transform: uppercase;
        font-size: 1.2em;
        margin-bottom: 10px;
    }
</style>
<?php require_once '../../include/footer.php'; ?>
