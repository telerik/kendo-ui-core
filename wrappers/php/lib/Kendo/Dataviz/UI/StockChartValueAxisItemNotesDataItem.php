<?php

namespace Kendo\Dataviz\UI;

class StockChartValueAxisItemNotesDataItem extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The value of the note.
    * @param  $value
    * @return \Kendo\Dataviz\UI\StockChartValueAxisItemNotesDataItem
    */
    public function value($value) {
        return $this->setProperty('value', $value);
    }

    /**
    * The position of the value axis note.
    * @param string $value
    * @return \Kendo\Dataviz\UI\StockChartValueAxisItemNotesDataItem
    */
    public function position($value) {
        return $this->setProperty('position', $value);
    }

    /**
    * The icon of the note.
    * @param \Kendo\Dataviz\UI\StockChartValueAxisItemNotesDataItemIcon|array $value
    * @return \Kendo\Dataviz\UI\StockChartValueAxisItemNotesDataItem
    */
    public function icon($value) {
        return $this->setProperty('icon', $value);
    }

    /**
    * The label of the note.
    * @param \Kendo\Dataviz\UI\StockChartValueAxisItemNotesDataItemLabel|array $value
    * @return \Kendo\Dataviz\UI\StockChartValueAxisItemNotesDataItem
    */
    public function label($value) {
        return $this->setProperty('label', $value);
    }

    /**
    * The line of the note.
    * @param \Kendo\Dataviz\UI\StockChartValueAxisItemNotesDataItemLine|array $value
    * @return \Kendo\Dataviz\UI\StockChartValueAxisItemNotesDataItem
    */
    public function line($value) {
        return $this->setProperty('line', $value);
    }

//<< Properties
}

?>
