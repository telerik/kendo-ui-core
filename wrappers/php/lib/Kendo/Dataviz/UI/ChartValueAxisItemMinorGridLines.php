<?php

namespace Kendo\Dataviz\UI;

class ChartValueAxisItemMinorGridLines extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The color of the lines.Note that this has no effect if the visibility of the minor grid lines is not set to true.
    * @param string $value
    * @returns \Kendo\Dataviz\UI\ChartValueAxisItemMinorGridLines
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The dash type of the minor grid lines.
    * @param string $value
    * @returns \Kendo\Dataviz\UI\ChartValueAxisItemMinorGridLines
    */
    public function dashType($value) {
        return $this->setProperty('dashType', $value);
    }

    /**
    * The visibility of the lines.
    * @param boolean $value
    * @returns \Kendo\Dataviz\UI\ChartValueAxisItemMinorGridLines
    */
    public function visible($value) {
        return $this->setProperty('visible', $value);
    }

    /**
    * The width of the lines.Note that this settings has no effect if the visibility of the minor grid lines is not set to true.
    * @param float $value
    * @returns \Kendo\Dataviz\UI\ChartValueAxisItemMinorGridLines
    */
    public function width($value) {
        return $this->setProperty('width', $value);
    }

//<< Properties
}

?>
