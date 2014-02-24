<?php

namespace Kendo\Dataviz\UI;

class ChartCategoryAxisItemNotes extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The position of the category axis note.
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartCategoryAxisItemNotes
    */
    public function position($value) {
        return $this->setProperty('position', $value);
    }

    /**
    * The icon of the notes.
    * @param \Kendo\Dataviz\UI\ChartCategoryAxisItemNotesIcon|array $value
    * @return \Kendo\Dataviz\UI\ChartCategoryAxisItemNotes
    */
    public function icon($value) {
        return $this->setProperty('icon', $value);
    }

    /**
    * The label of the notes.
    * @param \Kendo\Dataviz\UI\ChartCategoryAxisItemNotesLabel|array $value
    * @return \Kendo\Dataviz\UI\ChartCategoryAxisItemNotes
    */
    public function label($value) {
        return $this->setProperty('label', $value);
    }

    /**
    * The line of the notes.
    * @param \Kendo\Dataviz\UI\ChartCategoryAxisItemNotesLine|array $value
    * @return \Kendo\Dataviz\UI\ChartCategoryAxisItemNotes
    */
    public function line($value) {
        return $this->setProperty('line', $value);
    }

    /**
    * Adds ChartCategoryAxisItemNotesDataItem to the ChartCategoryAxisItemNotes.
    * @param \Kendo\Dataviz\UI\ChartCategoryAxisItemNotesDataItem|array,... $value one or more ChartCategoryAxisItemNotesDataItem to add.
    * @return \Kendo\Dataviz\UI\ChartCategoryAxisItemNotes
    */
    public function addDataItem($value) {
        return $this->add('data', func_get_args());
    }

//<< Properties
}

?>
