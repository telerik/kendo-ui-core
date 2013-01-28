<?php

namespace Kendo\Dataviz\UI;

class StockChartSeriesItemBorder extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The color of the border.
    * @param string $value
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The dash type of the border.
    * @param string $value
    */
    public function dashType($value) {
        return $this->setProperty('dashType', $value);
    }

    /**
    * The width of the border.
    * @param float $value
    */
    public function width($value) {
        return $this->setProperty('width', $value);
    }

//<< Properties
}

?>
