<?php

namespace Kendo\Dataviz\UI;

class StockChartNavigator extends \Kendo\SerializableObject {
//>> Properties

    public function dataSource(\Kendo\Data\DataSource $value) {
        return $this->setProperty('dataSource', $value);
    }

    public function autoBind($value) {
        return $this->setProperty('autoBind', $value);
    }

    public function dateField($value) {
        return $this->setProperty('dateField', $value);
    }

    public function visible($value) {
        return $this->setProperty('visible', $value);
    }

    public function addSeriesItem(\Kendo\Dataviz\UI\StockChartNavigatorSeriesItem $value) {
        return $this->add('series', $value);
    }

    public function select(\Kendo\Dataviz\UI\StockChartNavigatorSelect $value) {
        return $this->setProperty('select', $value);
    }

    public function hint(\Kendo\Dataviz\UI\StockChartNavigatorHint $value) {
        return $this->setProperty('hint', $value);
    }

//<< Properties
}

?>
