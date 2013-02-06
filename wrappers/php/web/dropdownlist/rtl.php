<?php

require_once '../../lib/Kendo/Autoload.php';
require_once '../../include/header.php';
?>
<div class="k-rtl">
<?php
$dropDownList = new \Kendo\UI\DropDownList('input');

$dropDownList->dataTextField('text')
             ->dataValueField('value')
             ->dataSource(array(
                 array('text' => 'Item 1', 'value' => '1'),
                 array('text' => 'Item 2', 'value' => '2'),
                 array('text' => 'Item 3', 'value' => '3')
             ));
echo $dropDownList->render();
?>
</div>
<?php require_once '../../include/footer.php'; ?>
