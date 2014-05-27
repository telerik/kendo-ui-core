<?php
require_once '../include/header.php';
require_once '../lib/Kendo/Autoload.php';
?>

<div class="k-rtl">

<?php

$textButton = new \Kendo\UI\Button('textButton');
$textButton->attr('type', 'button')
           ->content('Text button');

echo $textButton->render();

echo " ";

$iconTextButton = new \Kendo\UI\Button('iconTextButton');
$iconTextButton->tag('a')
               ->icon('ungroup')
               ->content('Icon and text');

echo $iconTextButton->render();

echo " ";

$iconButton = new \Kendo\UI\Button('iconButton');
$iconButton->tag('em')
           ->icon('refresh')
           ->content('<span class="k-icon">Refresh</span>');

echo $iconButton->render();

echo " ";

$disabledButton = new \Kendo\UI\Button('disabledButton');
$disabledButton->tag('span')
               ->enable(false)
               ->content('Disabled button');

echo $disabledButton->render();

?>

</div>

<?php require_once '../include/footer.php'; ?>