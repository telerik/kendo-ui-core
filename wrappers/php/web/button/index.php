<?php
require_once '../../include/header.php';
require_once '../../lib/Kendo/Autoload.php';
?>

<p>
  
<?php

$textButton = new \Kendo\UI\Button('textButton');
$textButton->attr('type', 'button')
           ->content('Text button');

echo $textButton->render();

echo " ";

$iconTextButton = new \Kendo\UI\Button('iconTextButton');
$iconTextButton->tag('a')
               ->spriteCssClass('k-icon k-i-ungroup')
               ->content('Icon and text');

echo $iconTextButton->render();

echo " ";

$kendoIconTextButton = new \Kendo\UI\Button('kendoIconTextButton');
$kendoIconTextButton->tag('a')
               ->icon('plus')
               ->content('Kendo UI Icon');

echo $kendoIconTextButton->render();

echo " ";

$iconButton = new \Kendo\UI\Button('iconButton');
$iconButton->tag('em')
           ->spriteCssClass('k-icon k-i-refresh')
           ->content('<span class="k-sprite">Refresh</span>');

echo $iconButton->render();

?>

</p><p>

<?php

$disabledButton1 = new \Kendo\UI\Button('disabledButton1');
$disabledButton1->tag('span')
                ->enable(false)
                ->content('Disabled via configuration');

echo $disabledButton1->render();

echo " ";

$disabledButton2 = new \Kendo\UI\Button('disabledButton2');
$disabledButton2->tag('span')
                ->attr('disabled', 'disabled')
                ->content('Disabled via HTML attribute');

echo $disabledButton2->render();

?>

</p>

<?php require_once '../../include/footer.php'; ?>