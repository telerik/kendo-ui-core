<?php

namespace Kendo\Dataviz\UI;

class StockChartNavigatorSelect extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The lower boundary of the selected range.
    * @param date $value
    */
    public function from($value) {
        return $this->setProperty('from', $value);
    }

    /**
    * The upper boundary of the selected range.
    * @param date $value
    */
    public function to($value) {
        return $this->setProperty('to', $value);
    }

//<< Properties
}

?>
