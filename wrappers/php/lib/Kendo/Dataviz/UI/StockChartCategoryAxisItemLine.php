<?php

namespace Kendo\Dataviz\UI;

class StockChartCategoryAxisItemLine extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The color of the lines. Any valid CSS color string will work here, including hex and rgb.Note: This will also effect the major and minor ticks, but not the grid lines.
    * @param string $value
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The dash type of the line.
    * @param string $value
    */
    public function dashType($value) {
        return $this->setProperty('dashType', $value);
    }

    /**
    * The visibility of the lines.
    * @param boolean $value
    */
    public function visible($value) {
        return $this->setProperty('visible', $value);
    }

    /**
    * The width of the line. This will also effect the major and minor ticks, but
not the grid lines.
    * @param float $value
    */
    public function width($value) {
        return $this->setProperty('width', $value);
    }

//<< Properties
}

?>
