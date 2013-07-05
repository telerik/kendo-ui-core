<?php

namespace Kendo\Dataviz\UI;

class ChartCategoryAxisItemNotesDataItem extends \kendo\SerializableObject {
//>> Properties

    /**
    * The value of the note.
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartCategoryAxisItemNotesDataItem
    */
    public function value($value) {
        return $this->setProperty('value', $value);
    }

    /**
    * The icon of the note.
    * @param \Kendo\Dataviz\UI\ChartCategoryAxisItemNotesDataItemIcon|array $value
    * @return \Kendo\Dataviz\UI\ChartCategoryAxisItemNotesDataItem
    */
    public function icon($value) {
        return $this->setProperty('icon', $value);
    }

    /**
    * The label of the note.
    * @param \Kendo\Dataviz\UI\ChartCategoryAxisItemNotesDataItemLabel|array $value
    * @return \Kendo\Dataviz\UI\ChartCategoryAxisItemNotesDataItem
    */
    public function label($value) {
        return $this->setProperty('label', $value);
    }

    /**
    * The line of the note.
    * @param \Kendo\Dataviz\UI\ChartCategoryAxisItemNotesDataItemLine|array $value
    * @return \Kendo\Dataviz\UI\ChartCategoryAxisItemNotesDataItem
    */
    public function line($value) {
        return $this->setProperty('line', $value);
    }

//<< Properties
}

?>
