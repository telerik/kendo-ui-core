<?php

namespace Kendo\Dataviz\UI;

class StockChartSeriesItemNotes extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The position of the series note.
    * @param string $value
    * @return \Kendo\Dataviz\UI\StockChartSeriesItemNotes
    */
    public function position($value) {
        return $this->setProperty('position', $value);
    }

    /**
    * The icon of the notes.
    * @param \Kendo\Dataviz\UI\StockChartSeriesItemNotesIcon|array $value
    * @return \Kendo\Dataviz\UI\StockChartSeriesItemNotes
    */
    public function icon($value) {
        return $this->setProperty('icon', $value);
    }

    /**
    * The label of the notes.
    * @param \Kendo\Dataviz\UI\StockChartSeriesItemNotesLabel|array $value
    * @return \Kendo\Dataviz\UI\StockChartSeriesItemNotes
    */
    public function label($value) {
        return $this->setProperty('label', $value);
    }

    /**
    * The line of the notes.
    * @param \Kendo\Dataviz\UI\StockChartSeriesItemNotesLine|array $value
    * @return \Kendo\Dataviz\UI\StockChartSeriesItemNotes
    */
    public function line($value) {
        return $this->setProperty('line', $value);
    }

//<< Properties
}

?>
