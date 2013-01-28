<?php

namespace Kendo\Dataviz\UI;

class ChartValueAxisItemMajorGridLines extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The color of the lines.
    * @param string $value
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The visibility of the lines.
    * @param boolean $value
    */
    public function visible($value) {
        return $this->setProperty('visible', $value);
    }

    /**
    * The width of the lines.
    * @param float $value
    */
    public function width($value) {
        return $this->setProperty('width', $value);
    }

//<< Properties
}

?>
