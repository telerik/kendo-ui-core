<?php

namespace Kendo\Dataviz\UI;

class StockChartPlotArea extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The background color of the plot area.
    * @param string $value
    * @return \Kendo\Dataviz\UI\StockChartPlotArea
    */
    public function background($value) {
        return $this->setProperty('background', $value);
    }

    /**
    * The background opacity of the plot area.
    * @param float $value
    * @return \Kendo\Dataviz\UI\StockChartPlotArea
    */
    public function opacity($value) {
        return $this->setProperty('opacity', $value);
    }

    /**
    * The border of the plot area.
    * @param \Kendo\Dataviz\UI\StockChartPlotAreaBorder|array $value
    * @return \Kendo\Dataviz\UI\StockChartPlotArea
    */
    public function border($value) {
        return $this->setProperty('border', $value);
    }

    /**
    * The margin of the plot area.
    * @param float| $value
    * @return \Kendo\Dataviz\UI\StockChartPlotArea
    */
    public function margin($value) {
        return $this->setProperty('margin', $value);
    }

//<< Properties
}

?>
