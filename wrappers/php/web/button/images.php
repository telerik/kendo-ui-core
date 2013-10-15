<?php
require_once '../../include/header.php';
require_once '../../lib/Kendo/Autoload.php';
?>

<style scoped>

  .k-button .k-image
  {
    height: 16px;
  }

</style>

<?php

$iconButton = new \Kendo\UI\Button('iconButton');
$iconButton->attr('type', 'button')
           ->spriteCssClass('k-icon k-i-refresh')
           ->content('Sprite icon');

echo $iconButton->render();

echo " ";

$kendoIconButton = new \Kendo\UI\Button('kendoIconButton');
$kendoIconButton->attr('type', 'button')
                ->icon('note')
                ->content('Kendo UI sprite icon');

echo $kendoIconButton->render();

echo " ";

$imageButton = new \Kendo\UI\Button('imageButton');
$imageButton->attr('type', 'button')
            ->imageUrl('../../content/shared/icons/sports/snowboarding.png')
            ->content('Image icon');

echo $imageButton->render();

?>

<?php require_once '../../include/footer.php'; ?>