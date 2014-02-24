<?php

namespace Kendo\Dataviz\UI;

class SparklineCategoryAxisItemNotes extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The position of the category axis note.
    * @param string $value
    * @return \Kendo\Dataviz\UI\SparklineCategoryAxisItemNotes
    */
    public function position($value) {
        return $this->setProperty('position', $value);
    }

    /**
    * The icon of the notes.
    * @param \Kendo\Dataviz\UI\SparklineCategoryAxisItemNotesIcon|array $value
    * @return \Kendo\Dataviz\UI\SparklineCategoryAxisItemNotes
    */
    public function icon($value) {
        return $this->setProperty('icon', $value);
    }

    /**
    * The label of the notes.
    * @param \Kendo\Dataviz\UI\SparklineCategoryAxisItemNotesLabel|array $value
    * @return \Kendo\Dataviz\UI\SparklineCategoryAxisItemNotes
    */
    public function label($value) {
        return $this->setProperty('label', $value);
    }

    /**
    * The line of the notes.
    * @param \Kendo\Dataviz\UI\SparklineCategoryAxisItemNotesLine|array $value
    * @return \Kendo\Dataviz\UI\SparklineCategoryAxisItemNotes
    */
    public function line($value) {
        return $this->setProperty('line', $value);
    }

    /**
    * Adds SparklineCategoryAxisItemNotesDataItem to the SparklineCategoryAxisItemNotes.
    * @param \Kendo\Dataviz\UI\SparklineCategoryAxisItemNotesDataItem|array,... $value one or more SparklineCategoryAxisItemNotesDataItem to add.
    * @return \Kendo\Dataviz\UI\SparklineCategoryAxisItemNotes
    */
    public function addDataItem($value) {
        return $this->add('data', func_get_args());
    }

//<< Properties
}

?>
