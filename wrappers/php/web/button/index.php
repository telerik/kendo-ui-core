<?php
require_once '../../include/header.php';
require_once '../../lib/Kendo/Autoload.php';
?>

<p>
  
<?php

$textButton = new \Kendo\UI\Button('textButton');
$textButton->tag('span')
           ->content('Text button');

echo $textButton->render();

$iconTextButton = new \Kendo\UI\Button('iconTextButton');
$iconTextButton->attr('type', 'button')
               ->spriteCssClass('k-icon k-i-ungroup')
               ->content('Icon and text');

echo $iconTextButton->render();

$iconButton = new \Kendo\UI\Button('iconButton');
$iconButton->spriteCssClass('k-icon k-i-refresh')
           ->content('<span class="k-sprite">Refresh</span>');

echo $iconButton->render();

?>

</p><p>

<?php

$disabledButton1 = new \Kendo\UI\Button('disabledButton1');
$disabledButton1->enable(false)
                ->content('Disabled via configuration');

echo $disabledButton1->render();

$disabledButton2 = new \Kendo\UI\Button('disabledButton2');
$disabledButton2->attr('disabled', 'disabled')
                ->content('Disabled via HTML attribute');

echo $disabledButton2->render();

?>

</p>

<?php require_once '../../include/footer.php'; ?>