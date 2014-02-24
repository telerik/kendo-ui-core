<?php

namespace Kendo\Dataviz\UI;

class StockChartSeriesItemTarget extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The target line.
    * @param \Kendo\Dataviz\UI\StockChartSeriesItemTargetLine|array $value
    * @return \Kendo\Dataviz\UI\StockChartSeriesItemTarget
    */
    public function line($value) {
        return $this->setProperty('line', $value);
    }

    /**
    * The target color.
    * @param string|\Kendo\JavaScriptFunction $value
    * @return \Kendo\Dataviz\UI\StockChartSeriesItemTarget
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The border of the target.
    * @param \Kendo\JavaScriptFunction|\Kendo\Dataviz\UI\StockChartSeriesItemTargetBorder|array $value
    * @return \Kendo\Dataviz\UI\StockChartSeriesItemTarget
    */
    public function border($value) {
        return $this->setProperty('border', $value);
    }

//<< Properties
}

?>
