<?php

namespace Kendo\Dataviz\UI;

class StockChartNavigator extends \Kendo\SerializableObject {
//>> Properties

    public function setDataSource(\Kendo\Data\DataSource $value) {
        $this->setProperty('dataSource', $value);

        return $this;
    }

    public function setAutoBind($value) {
        $this->setProperty('autoBind', $value);

        return $this;
    }

    public function setDateField($value) {
        $this->setProperty('dateField', $value);

        return $this;
    }

    public function setVisible($value) {
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

    public function setSelect(\Kendo\Dataviz\UI\StockChartNavigatorSelect $value) {
        $this->setProperty('select', $value);

        return $this;
    }

    public function setHint(\Kendo\Dataviz\UI\StockChartNavigatorHint $value) {
        $this->setProperty('hint', $value);

        return $this;
    }

//<< Properties
}

?>
