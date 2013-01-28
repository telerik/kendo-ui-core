<?php

namespace Kendo\Dataviz\UI;

class ChartSeriesItemLine extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The line color.
    * @param string $value
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The line opacity.
    * @param float $value
    */
    public function opacity($value) {
        return $this->setProperty('opacity', $value);
    }

    /**
    * The line width.
    * @param string $value
    */
    public function width($value) {
        return $this->setProperty('width', $value);
    }

//<< Properties
}

?>
