<?php

namespace Kendo\Dataviz\UI;

class StockChartCategoryAxisItemNotes extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The position of the category axis note.
    * @param string $value
    * @return \Kendo\Dataviz\UI\StockChartCategoryAxisItemNotes
    */
    public function position($value) {
        return $this->setProperty('position', $value);
    }

    /**
    * The icon of the notes.
    * @param \Kendo\Dataviz\UI\StockChartCategoryAxisItemNotesIcon|array $value
    * @return \Kendo\Dataviz\UI\StockChartCategoryAxisItemNotes
    */
    public function icon($value) {
        return $this->setProperty('icon', $value);
    }

    /**
    * The label of the notes.
    * @param \Kendo\Dataviz\UI\StockChartCategoryAxisItemNotesLabel|array $value
    * @return \Kendo\Dataviz\UI\StockChartCategoryAxisItemNotes
    */
    public function label($value) {
        return $this->setProperty('label', $value);
    }

    /**
    * The line of the notes.
    * @param \Kendo\Dataviz\UI\StockChartCategoryAxisItemNotesLine|array $value
    * @return \Kendo\Dataviz\UI\StockChartCategoryAxisItemNotes
    */
    public function line($value) {
        return $this->setProperty('line', $value);
    }

    /**
    * Adds StockChartCategoryAxisItemNotesDataItem to the StockChartCategoryAxisItemNotes.
    * @param \Kendo\Dataviz\UI\StockChartCategoryAxisItemNotesDataItem|array,... $value one or more StockChartCategoryAxisItemNotesDataItem to add.
    * @return \Kendo\Dataviz\UI\StockChartCategoryAxisItemNotes
    */
    public function addDataItem($value) {
        return $this->add('data', func_get_args());
    }

//<< Properties
}

?>
