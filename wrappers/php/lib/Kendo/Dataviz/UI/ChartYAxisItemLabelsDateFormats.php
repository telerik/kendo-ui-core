<?php

namespace Kendo\Dataviz\UI;

class ChartYAxisItemLabelsDateFormats extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The format used when yAxis.baseUnit is set to "days".
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartYAxisItemLabelsDateFormats
    */
    public function days($value) {
        return $this->setProperty('days', $value);
    }

    /**
    * The format used when yAxis.baseUnit is set to "hours".
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartYAxisItemLabelsDateFormats
    */
    public function hours($value) {
        return $this->setProperty('hours', $value);
    }

    /**
    * The format used when yAxis.baseUnit is set to "months".
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartYAxisItemLabelsDateFormats
    */
    public function months($value) {
        return $this->setProperty('months', $value);
    }

    /**
    * The format used when yAxis.baseUnit is set to "weeks".
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartYAxisItemLabelsDateFormats
    */
    public function weeks($value) {
        return $this->setProperty('weeks', $value);
    }

    /**
    * The format used when yAxis.baseUnit is set to "years".
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartYAxisItemLabelsDateFormats
    */
    public function years($value) {
        return $this->setProperty('years', $value);
    }

//<< Properties
}

?>
