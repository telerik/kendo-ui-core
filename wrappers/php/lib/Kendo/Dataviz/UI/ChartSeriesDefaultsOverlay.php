<?php

namespace Kendo\Dataviz\UI;

class ChartSeriesDefaultsOverlay extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The chart series gradient.The supported values are:
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartSeriesDefaultsOverlay
    */
    public function gradient($value) {
        return $this->setProperty('gradient', $value);
    }

//<< Properties
}

?>
