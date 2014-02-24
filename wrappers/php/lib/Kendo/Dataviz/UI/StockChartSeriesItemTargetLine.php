<?php

namespace Kendo\Dataviz\UI;

class StockChartSeriesItemTargetLine extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The width of the line.
    * @param |\Kendo\JavaScriptFunction $value
    * @return \Kendo\Dataviz\UI\StockChartSeriesItemTargetLine
    */
    public function width($value) {
        return $this->setProperty('width', $value);
    }

//<< Properties
}

?>
