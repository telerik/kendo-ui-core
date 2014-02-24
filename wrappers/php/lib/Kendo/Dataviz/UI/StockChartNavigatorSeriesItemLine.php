<?php

namespace Kendo\Dataviz\UI;

class StockChartNavigatorSeriesItemLine extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The line color.
    * @param string $value
    * @return \Kendo\Dataviz\UI\StockChartNavigatorSeriesItemLine
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The line opacity.
    * @param float $value
    * @return \Kendo\Dataviz\UI\StockChartNavigatorSeriesItemLine
    */
    public function opacity($value) {
        return $this->setProperty('opacity', $value);
    }

    /**
    * The line width.
    * @param string $value
    * @return \Kendo\Dataviz\UI\StockChartNavigatorSeriesItemLine
    */
    public function width($value) {
        return $this->setProperty('width', $value);
    }

//<< Properties
}

?>
