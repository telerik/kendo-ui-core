<?php

namespace Kendo\Dataviz\UI;

class ChartSeriesItemNegativeValues extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The color of the chart negative bubble values.
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemNegativeValues
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * If set to true the chart will display the negative bubbles. By default the negative bubbles are not displayed.
    * @param boolean $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemNegativeValues
    */
    public function visible($value) {
        return $this->setProperty('visible', $value);
    }

//<< Properties
}

?>
