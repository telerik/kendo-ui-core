<?php

namespace Kendo\Dataviz\UI;

class StockChartNavigatorCategoryAxisItemNotesDataItem extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The value of the note.
    * @param  $value
    * @return \Kendo\Dataviz\UI\StockChartNavigatorCategoryAxisItemNotesDataItem
    */
    public function value($value) {
        return $this->setProperty('value', $value);
    }

    /**
    * The position of the category axis note.
    * @param string $value
    * @return \Kendo\Dataviz\UI\StockChartNavigatorCategoryAxisItemNotesDataItem
    */
    public function position($value) {
        return $this->setProperty('position', $value);
    }

    /**
    * The icon of the note.
    * @param \Kendo\Dataviz\UI\StockChartNavigatorCategoryAxisItemNotesDataItemIcon|array $value
    * @return \Kendo\Dataviz\UI\StockChartNavigatorCategoryAxisItemNotesDataItem
    */
    public function icon($value) {
        return $this->setProperty('icon', $value);
    }

    /**
    * The label of the note.
    * @param \Kendo\Dataviz\UI\StockChartNavigatorCategoryAxisItemNotesDataItemLabel|array $value
    * @return \Kendo\Dataviz\UI\StockChartNavigatorCategoryAxisItemNotesDataItem
    */
    public function label($value) {
        return $this->setProperty('label', $value);
    }

    /**
    * The line of the note.
    * @param \Kendo\Dataviz\UI\StockChartNavigatorCategoryAxisItemNotesDataItemLine|array $value
    * @return \Kendo\Dataviz\UI\StockChartNavigatorCategoryAxisItemNotesDataItem
    */
    public function line($value) {
        return $this->setProperty('line', $value);
    }

//<< Properties
}

?>
