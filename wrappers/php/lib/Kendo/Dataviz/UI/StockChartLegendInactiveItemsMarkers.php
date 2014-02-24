<?php

namespace Kendo\Dataviz\UI;

class StockChartLegendInactiveItemsMarkers extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The color of the markers.
Any valid CSS color string will work here, including hex and rgb.
    * @param string $value
    * @return \Kendo\Dataviz\UI\StockChartLegendInactiveItemsMarkers
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

//<< Properties
}

?>
