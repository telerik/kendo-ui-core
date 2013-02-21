<?php

namespace Kendo\Dataviz\UI;

class ChartSeriesItemTargetLine extends \kendo\SerializableObject {
//>> Properties

    /**
    * The width of the line.
    * @param  $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemTargetLine
    */
    public function width($value) {
        return $this->setProperty('width', $value);
    }

//<< Properties
}

?>
