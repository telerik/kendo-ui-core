<?php
require_once '../../include/header.php';
require_once '../../lib/Kendo/Autoload.php';
?>

<div class="k-rtl">

<?php

$textButton = new \Kendo\UI\Button('textButton');
$textButton->content('Text button');

echo $textButton->render();

$iconTextButton = new \Kendo\UI\Button('iconTextButton');
$iconTextButton->spriteCssClass('k-icon k-i-ungroup')
               ->content('Icon and text');

echo $iconTextButton->render();

$iconButton = new \Kendo\UI\Button('iconButton');
$iconButton->spriteCssClass('k-icon k-i-refresh')
           ->content('<span class="k-sprite">Refresh</span>');

echo $iconButton->render();

$disabledButton = new \Kendo\UI\Button('disabledButton');
$disabledButton->enable(false)
               ->content('Disabled button');

echo $disabledButton->render();

?>

</div>

<?php require_once '../../include/footer.php'; ?>