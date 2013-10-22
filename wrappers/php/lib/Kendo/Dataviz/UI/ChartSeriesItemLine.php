<?php

namespace Kendo\Dataviz\UI;

class ChartSeriesItemLine extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The line color. Accepts a valid CSS color string, including hex and rgb.
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemLine
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The line opacity. By default the line is opaque.
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemLine
    */
    public function opacity($value) {
        return $this->setProperty('opacity', $value);
    }

    /**
    * The line width in pixels.
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemLine
    */
    public function width($value) {
        return $this->setProperty('width', $value);
    }

    /**
    * The supported values are:
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemLine
    */
    public function style($value) {
        return $this->setProperty('style', $value);
    }

//<< Properties
}

?>
