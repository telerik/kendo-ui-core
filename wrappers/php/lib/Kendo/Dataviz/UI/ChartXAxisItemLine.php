<?php

namespace Kendo\Dataviz\UI;

class ChartXAxisItemLine extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The color of the line. This will also effect the major and minor ticks, but
not the grid lines.
    * @param string $value
    * @returns \Kendo\Dataviz\UI\ChartXAxisItemLine
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The dash type of the line.
    * @param string $value
    * @returns \Kendo\Dataviz\UI\ChartXAxisItemLine
    */
    public function dashType($value) {
        return $this->setProperty('dashType', $value);
    }

    /**
    * The visibility of the line.
    * @param boolean $value
    * @returns \Kendo\Dataviz\UI\ChartXAxisItemLine
    */
    public function visible($value) {
        return $this->setProperty('visible', $value);
    }

    /**
    * The width of the line. This will also effect the major and minor ticks, but
not the grid lines.
    * @param float $value
    * @returns \Kendo\Dataviz\UI\ChartXAxisItemLine
    */
    public function width($value) {
        return $this->setProperty('width', $value);
    }

//<< Properties
}

?>
