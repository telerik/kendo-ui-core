<?php

namespace Kendo\Dataviz\UI;

class StockChartSeriesDefaultsStack extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The type of stack to plot. The following types are supported:
    * @param string $value
    * @return \Kendo\Dataviz\UI\StockChartSeriesDefaultsStack
    */
    public function type($value) {
        return $this->setProperty('type', $value);
    }

//<< Properties
}

?>
