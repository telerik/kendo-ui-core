<?php

namespace kendo\dataviz\ui;

class StockChartNavigator extends \kendo\SerializableObject {
//>> Properties

    public function addSeriesItem(\kendo\dataviz\ui\StockChartNavigatorSeriesItem $value) {
        $values = $this->getProperty('series');

        if ($values == null) {
            $values = array();
            $this->setProperty('series', $values);
        }

        $values[] = $value;

        return $this;
    }

    public function setSelect(\kendo\dataviz\ui\StockChartNavigatorSelect $value) {
        $this->setProperty('select', $value);

        return $this;
    }

//<< Properties
}

?>
