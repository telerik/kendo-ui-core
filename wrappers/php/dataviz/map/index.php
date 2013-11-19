<?php
require_once '../../lib/Kendo/Autoload.php';

require_once '../../include/header.php';

$layer = new \Kendo\Dataviz\UI\MapLayer();
$layer->type("tile")
      ->urlTemplate("http://tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png")
      ->attribution("&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors");

$map = new \Kendo\Dataviz\UI\Map('map');
$map->center(array(30.2681, -97.7448))
    ->zoom(3)
    ->addLayer($layer);

echo $map->render();
?>
<?php require_once '../../include/footer.php'; ?>
