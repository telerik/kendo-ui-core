<?php

namespace Kendo\Dataviz\UI;

class StockChartSeriesItemHighlightBorder extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The width of the border.
    * @param float $value
    * @return \Kendo\Dataviz\UI\StockChartSeriesItemHighlightBorder
    */
    public function width($value) {
        return $this->setProperty('width', $value);
    }

    /**
    * The border color.
    * @param string $value
    * @return \Kendo\Dataviz\UI\StockChartSeriesItemHighlightBorder
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The border opacity.
    * @param float $value
    * @return \Kendo\Dataviz\UI\StockChartSeriesItemHighlightBorder
    */
    public function opacity($value) {
        return $this->setProperty('opacity', $value);
    }

//<< Properties
}

?>
