<?php

namespace Kendo\Dataviz\UI;

class StockChartLegendInactiveItems extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Configures the legend labels.
    * @param \Kendo\Dataviz\UI\StockChartLegendInactiveItemsLabels|array $value
    * @return \Kendo\Dataviz\UI\StockChartLegendInactiveItems
    */
    public function labels($value) {
        return $this->setProperty('labels', $value);
    }

    /**
    * Configures the legend markers.
    * @param \Kendo\Dataviz\UI\StockChartLegendInactiveItemsMarkers|array $value
    * @return \Kendo\Dataviz\UI\StockChartLegendInactiveItems
    */
    public function markers($value) {
        return $this->setProperty('markers', $value);
    }

//<< Properties
}

?>
