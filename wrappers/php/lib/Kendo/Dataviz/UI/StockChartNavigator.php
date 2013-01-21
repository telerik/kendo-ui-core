<?php

namespace Kendo\Dataviz\UI;

class StockChartNavigator extends \Kendo\SerializableObject {
//>> Properties

    public function dataSource(\Kendo\Data\DataSource $value) {
        $this->setProperty('dataSource', $value);

        return $this;
    }

    public function autoBind($value) {
        $this->setProperty('autoBind', $value);

        return $this;
    }

    public function dateField($value) {
        $this->setProperty('dateField', $value);

        return $this;
    }

    public function visible($value) {
        $this->setProperty('visible', $value);

        return $this;
    }

    public function addSeriesItem(\Kendo\Dataviz\UI\StockChartNavigatorSeriesItem $value) {
        $values = $this->getProperty('series');

        if ($values == null) {
            $values = array();
            $this->setProperty('series', $values);
        }

        $values[] = $value;

        return $this;
    }

    public function select(\Kendo\Dataviz\UI\StockChartNavigatorSelect $value) {
        $this->setProperty('select', $value);

        return $this;
    }

    public function hint(\Kendo\Dataviz\UI\StockChartNavigatorHint $value) {
        $this->setProperty('hint', $value);

        return $this;
    }

//<< Properties
}

?>
