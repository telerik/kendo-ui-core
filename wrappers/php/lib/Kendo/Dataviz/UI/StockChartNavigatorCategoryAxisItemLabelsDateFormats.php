<?php

namespace Kendo\Dataviz\UI;

class StockChartNavigatorCategoryAxisItemLabelsDateFormats extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The format used when categoryAxis.baseUnit is set to "days".
    * @param string $value
    * @return \Kendo\Dataviz\UI\StockChartNavigatorCategoryAxisItemLabelsDateFormats
    */
    public function days($value) {
        return $this->setProperty('days', $value);
    }

    /**
    * The format used when categoryAxis.baseUnit is set to "hours".
    * @param string $value
    * @return \Kendo\Dataviz\UI\StockChartNavigatorCategoryAxisItemLabelsDateFormats
    */
    public function hours($value) {
        return $this->setProperty('hours', $value);
    }

    /**
    * The format used when categoryAxis.baseUnit is set to "months".
    * @param string $value
    * @return \Kendo\Dataviz\UI\StockChartNavigatorCategoryAxisItemLabelsDateFormats
    */
    public function months($value) {
        return $this->setProperty('months', $value);
    }

    /**
    * The format used when categoryAxis.baseUnit is set to "weeks".
    * @param string $value
    * @return \Kendo\Dataviz\UI\StockChartNavigatorCategoryAxisItemLabelsDateFormats
    */
    public function weeks($value) {
        return $this->setProperty('weeks', $value);
    }

    /**
    * The format used when categoryAxis.baseUnit is set to "years".
    * @param string $value
    * @return \Kendo\Dataviz\UI\StockChartNavigatorCategoryAxisItemLabelsDateFormats
    */
    public function years($value) {
        return $this->setProperty('years', $value);
    }

//<< Properties
}

?>
