<?php

namespace Kendo\Dataviz\UI;

class StockChartNavigatorCategoryAxisItemNotes extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The position of the category axis note.
    * @param string $value
    * @return \Kendo\Dataviz\UI\StockChartNavigatorCategoryAxisItemNotes
    */
    public function position($value) {
        return $this->setProperty('position', $value);
    }

    /**
    * The icon of the notes.
    * @param \Kendo\Dataviz\UI\StockChartNavigatorCategoryAxisItemNotesIcon|array $value
    * @return \Kendo\Dataviz\UI\StockChartNavigatorCategoryAxisItemNotes
    */
    public function icon($value) {
        return $this->setProperty('icon', $value);
    }

    /**
    * The label of the notes.
    * @param \Kendo\Dataviz\UI\StockChartNavigatorCategoryAxisItemNotesLabel|array $value
    * @return \Kendo\Dataviz\UI\StockChartNavigatorCategoryAxisItemNotes
    */
    public function label($value) {
        return $this->setProperty('label', $value);
    }

    /**
    * The line of the notes.
    * @param \Kendo\Dataviz\UI\StockChartNavigatorCategoryAxisItemNotesLine|array $value
    * @return \Kendo\Dataviz\UI\StockChartNavigatorCategoryAxisItemNotes
    */
    public function line($value) {
        return $this->setProperty('line', $value);
    }

    /**
    * Adds StockChartNavigatorCategoryAxisItemNotesDataItem to the StockChartNavigatorCategoryAxisItemNotes.
    * @param \Kendo\Dataviz\UI\StockChartNavigatorCategoryAxisItemNotesDataItem|array,... $value one or more StockChartNavigatorCategoryAxisItemNotesDataItem to add.
    * @return \Kendo\Dataviz\UI\StockChartNavigatorCategoryAxisItemNotes
    */
    public function addDataItem($value) {
        return $this->add('data', func_get_args());
    }

//<< Properties
}

?>
