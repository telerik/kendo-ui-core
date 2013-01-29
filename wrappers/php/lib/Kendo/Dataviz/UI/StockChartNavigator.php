<?php

namespace Kendo\Dataviz\UI;

class StockChartNavigator extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Sets the data source of the StockChartNavigator.
    * @param \Kendo\Data\DataSource $value
    * @return \Kendo\Dataviz\UI\StockChartNavigator
    */
    public function dataSource(\Kendo\Data\DataSource $value) {
        return $this->setProperty('dataSource', $value);
    }

    /**
    * Indicates whether the navigator will call read on the data source initially.
Applicable only when using a dedicated navigator data source.
    * @param boolean $value
    * @return \Kendo\Dataviz\UI\StockChartNavigator
    */
    public function autoBind($value) {
        return $this->setProperty('autoBind', $value);
    }

    /**
    * The field containing the point date.
It is used as a default field for the navigator axis.The data item field value must be either:
    * @param string $value
    * @return \Kendo\Dataviz\UI\StockChartNavigator
    */
    public function dateField($value) {
        return $this->setProperty('dateField', $value);
    }

    /**
    * The visibility of the navigator.
    * @param boolean $value
    * @return \Kendo\Dataviz\UI\StockChartNavigator
    */
    public function visible($value) {
        return $this->setProperty('visible', $value);
    }

    /**
    * Adds StockChartNavigatorSeriesItem to the StockChartNavigator.
    * @param mixed|\Kendo\Dataviz\UI\StockChartNavigatorSeriesItem,... $value one or more StockChartNavigatorSeriesItem to add.
    * @return \Kendo\Dataviz\UI\StockChartNavigator
    */
    public function addSeriesItem($value) {
        return $this->add('series', func_get_args());
    }

    /**
    * Specifies the initially selected range.The full range of values is shown if no range is specified.
    * @param mixed|\Kendo\Dataviz\UI\StockChartNavigatorSelect $value
    * @return \Kendo\Dataviz\UI\StockChartNavigator
    */
    public function select($value) {
        return $this->setProperty('select', $value);
    }

    /**
    * Default options for the navigator hint.
    * @param mixed|\Kendo\Dataviz\UI\StockChartNavigatorHint $value
    * @return \Kendo\Dataviz\UI\StockChartNavigator
    */
    public function hint($value) {
        return $this->setProperty('hint', $value);
    }

//<< Properties
}

?>
