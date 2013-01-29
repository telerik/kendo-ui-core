<?php

namespace Kendo\Dataviz\UI;

class ChartXAxisItemMajorGridLines extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The color of the lines.
    * @param string $value
    * @returns \Kendo\Dataviz\UI\ChartXAxisItemMajorGridLines
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The visibility of the lines.
    * @param boolean $value
    * @returns \Kendo\Dataviz\UI\ChartXAxisItemMajorGridLines
    */
    public function visible($value) {
        return $this->setProperty('visible', $value);
    }

    /**
    * The width of the lines.
    * @param float $value
    * @returns \Kendo\Dataviz\UI\ChartXAxisItemMajorGridLines
    */
    public function width($value) {
        return $this->setProperty('width', $value);
    }

//<< Properties
}

?>
