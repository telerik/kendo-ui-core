<?php
require_once '../lib/Kendo/Autoload.php';

require_once '../include/header.php';

$layer = new \Kendo\Dataviz\UI\MapLayer();
$layer->type("tile")
      ->urlTemplate("http://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png")
      ->subdomains(array('a', 'b', 'c'))
      ->attribution("&copy; <a href='http://osm.org/copyright'>OpenStreetMap contributors</a>");

$markerTooltip = new \Kendo\Dataviz\UI\MapMarkerTooltip();
$markerTooltip->content('Austin, TX');

$marker = new \Kendo\Dataviz\UI\MapMarker();
$marker->location(array(30.268107, -97.744821))
       ->shape('pinTarget')
       ->tooltip($markerTooltip);

$map = new \Kendo\Dataviz\UI\Map('map');
$map->center(array(30.2681, -97.7448))
    ->zoom(3)
    ->addLayer($layer)
    ->addMarker($marker);

echo $map->render();
?>
<?php require_once '../include/footer.php'; ?>
