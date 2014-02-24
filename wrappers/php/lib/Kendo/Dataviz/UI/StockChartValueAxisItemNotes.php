<?php

namespace Kendo\Dataviz\UI;

class StockChartValueAxisItemNotes extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The position of the value axis note.
    * @param string $value
    * @return \Kendo\Dataviz\UI\StockChartValueAxisItemNotes
    */
    public function position($value) {
        return $this->setProperty('position', $value);
    }

    /**
    * The icon of the notes.
    * @param \Kendo\Dataviz\UI\StockChartValueAxisItemNotesIcon|array $value
    * @return \Kendo\Dataviz\UI\StockChartValueAxisItemNotes
    */
    public function icon($value) {
        return $this->setProperty('icon', $value);
    }

    /**
    * The label of the notes.
    * @param \Kendo\Dataviz\UI\StockChartValueAxisItemNotesLabel|array $value
    * @return \Kendo\Dataviz\UI\StockChartValueAxisItemNotes
    */
    public function label($value) {
        return $this->setProperty('label', $value);
    }

    /**
    * The line of the notes.
    * @param \Kendo\Dataviz\UI\StockChartValueAxisItemNotesLine|array $value
    * @return \Kendo\Dataviz\UI\StockChartValueAxisItemNotes
    */
    public function line($value) {
        return $this->setProperty('line', $value);
    }

    /**
    * Adds StockChartValueAxisItemNotesDataItem to the StockChartValueAxisItemNotes.
    * @param \Kendo\Dataviz\UI\StockChartValueAxisItemNotesDataItem|array,... $value one or more StockChartValueAxisItemNotesDataItem to add.
    * @return \Kendo\Dataviz\UI\StockChartValueAxisItemNotes
    */
    public function addDataItem($value) {
        return $this->add('data', func_get_args());
    }

//<< Properties
}

?>
