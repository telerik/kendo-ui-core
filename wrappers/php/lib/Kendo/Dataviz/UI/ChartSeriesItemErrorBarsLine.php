<?php

namespace Kendo\Dataviz\UI;

class ChartSeriesItemErrorBarsLine extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The width of the line.
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemErrorBarsLine
    */
    public function width($value) {
        return $this->setProperty('width', $value);
    }

    /**
    * The dash type of the error bars line.The following dash types are supported:
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemErrorBarsLine
    */
    public function dashType($value) {
        return $this->setProperty('dashType', $value);
    }

//<< Properties
}

?>
