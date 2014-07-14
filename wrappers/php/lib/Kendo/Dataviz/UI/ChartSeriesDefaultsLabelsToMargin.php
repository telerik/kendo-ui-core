<?php

namespace Kendo\Dataviz\UI;

class ChartSeriesDefaultsLabelsToMargin extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The bottom margin of the to labels.
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartSeriesDefaultsLabelsToMargin
    */
    public function bottom($value) {
        return $this->setProperty('bottom', $value);
    }

    /**
    * The left margin of the to labels.
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartSeriesDefaultsLabelsToMargin
    */
    public function left($value) {
        return $this->setProperty('left', $value);
    }

    /**
    * The right margin of the to labels.
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartSeriesDefaultsLabelsToMargin
    */
    public function right($value) {
        return $this->setProperty('right', $value);
    }

    /**
    * The top margin of the to labels.
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartSeriesDefaultsLabelsToMargin
    */
    public function top($value) {
        return $this->setProperty('top', $value);
    }

//<< Properties
}

?>
