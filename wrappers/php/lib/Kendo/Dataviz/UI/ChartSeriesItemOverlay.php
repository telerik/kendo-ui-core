<?php

namespace Kendo\Dataviz\UI;

class ChartSeriesItemOverlay extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The gradient name.Available options:
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemOverlay
    */
    public function gradient($value) {
        return $this->setProperty('gradient', $value);
    }

//<< Properties
}

?>
