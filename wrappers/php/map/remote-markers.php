<?php
require_once '../lib/Kendo/Autoload.php';
require_once '../include/map_data.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    header('Content-Type: application/json');

    $result = store_locations();

    echo json_encode($result);

    exit;
}

require_once '../include/header.php';

$tile_layer = new \Kendo\Dataviz\UI\MapLayer();
$tile_layer->type("tile")
      ->urlTemplate("http://#= subdomain #.tile2.opencyclemap.org/transport/#= zoom #/#= x #/#= y #.png")
      ->subdomains(array('a', 'b', 'c'))
      ->attribution("&copy; <a href='http://osm.org/copyright'>OpenStreetMap contributors</a>." +
                    "Tiles courtesy of <a href='http://www.opencyclemap.org/'>Andy Allan</a>");

$transport = new \Kendo\Data\DataSourceTransport();
$transport->read(array('url' => 'remote-markers.php', 'type' => 'POST', 'dataType' => 'json'));

$dataSource = new \Kendo\Data\DataSource();
$dataSource->transport($transport);

$marker_layer = new \Kendo\Dataviz\UI\MapLayer();
$marker_layer->type('marker')
      ->dataSource($dataSource)
      ->locationField('latLng')
      ->titleField('name');

$map = new \Kendo\Dataviz\UI\Map('map');
$map->center(array(30.2681, -97.7448))
    ->zoom(15)
    ->addLayer($tile_layer)
    ->addLayer($marker_layer);

echo $map->render();
?>
<?php require_once '../include/footer.php'; ?>
