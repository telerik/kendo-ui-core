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
$iconButton->spriteCssClass('k-icon k-i-refresh')
           ->content('Sprite icon');

echo $iconButton->render();

$imageButton = new \Kendo\UI\Button('imageButton');
$imageButton->imageUrl('../../content/shared/icons/sports/snowboarding.png')
            ->content('Image icon');

echo $imageButton->render();

?>

<?php require_once '../../include/footer.php'; ?>