<?php

require_once '../../lib/DataSourceResult.php';
require_once '../../lib/Kendo/Autoload.php';
require_once '../../include/header.php';
?>
<div class="k-rtl">
<?php
$multiselect = new \Kendo\UI\MultiSelect('input');

$multiselect->dataTextField('text')
            ->dataValueField('value')
            ->dataSource(array(
                 array('text' => 'Item 1', 'value' => '1'),
                 array('text' => 'Item 2', 'value' => '2'),
                 array('text' => 'Item 3', 'value' => '3')
            ));
echo $multiselect->render();
?>
</div>
<?php require_once '../../include/footer.php'; ?>
