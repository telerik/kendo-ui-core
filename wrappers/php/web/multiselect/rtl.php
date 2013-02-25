<?php

require_once '../../lib/DataSourceResult.php';
require_once '../../lib/Kendo/Autoload.php';
require_once '../../include/header.php';
?>
<div class="demo-section k-rtl">
    <h3 class="title">Select Continents</h3>
<?php
$multiselect = new \Kendo\UI\MultiSelect('select');

$multiselect->dataTextField('text')
            ->dataValueField('value')
            ->dataSource(array(
                 array('text' => 'Africa', 'value' => '1'),
                 array('text' => 'Europe', 'value' => '2'),
                 array('text' => 'Asia', 'value' => '3'),
                 array('text' => 'North America', 'value' => '4'),
                 array('text' => 'South America', 'value' => '5'),
                 array('text' => 'Antarctica', 'value' => '6'),
                 array('text' => 'Australia', 'value' => '7')
            ));
echo $multiselect->render();
?>
<style scoped="scoped">
    .demo-section {
        width: 406px;
        margin-top: 40px;
    }
</style>
</div>
<?php require_once '../../include/footer.php'; ?>
