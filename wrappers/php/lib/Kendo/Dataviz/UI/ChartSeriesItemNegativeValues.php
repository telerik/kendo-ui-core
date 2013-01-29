<?php

namespace Kendo\Dataviz\UI;

class ChartSeriesItemNegativeValues extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The color of the negative values.
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemNegativeValues
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The visibility of the negative values.
    * @param boolean $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemNegativeValues
    */
    public function visible($value) {
        return $this->setProperty('visible', $value);
    }

//<< Properties
}

?>
