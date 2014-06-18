<?php
require_once '../lib/Kendo/Autoload.php';

require_once '../include/header.php';

$layer = new \Kendo\Dataviz\UI\MapLayer();
$layer->type("bing")
      ->imagerySet("aerialWithLabels")

      // IMPORTANT: This key is locked to demos.telerik.com/kendo-ui
      // Please replace with your own Bing Key
      ->key("AjQF548guEF8MWgEspVokNny7l_GULKsZ81tR-LvPK96Bm3REkCjNHs2aC_b7nvF");

$map = new \Kendo\Dataviz\UI\Map('map');
$map->center(array(51.505, -0.09))
    ->zoom(3)
    ->addLayer($layer);

echo $map->render();
?>
<?php require_once '../include/footer.php'; ?>
