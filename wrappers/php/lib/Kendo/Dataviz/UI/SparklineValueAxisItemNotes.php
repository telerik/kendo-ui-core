<?php

namespace Kendo\Dataviz\UI;

class SparklineValueAxisItemNotes extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The position of the value axis note.
    * @param string $value
    * @return \Kendo\Dataviz\UI\SparklineValueAxisItemNotes
    */
    public function position($value) {
        return $this->setProperty('position', $value);
    }

    /**
    * The icon of the notes.
    * @param \Kendo\Dataviz\UI\SparklineValueAxisItemNotesIcon|array $value
    * @return \Kendo\Dataviz\UI\SparklineValueAxisItemNotes
    */
    public function icon($value) {
        return $this->setProperty('icon', $value);
    }

    /**
    * The label of the notes.
    * @param \Kendo\Dataviz\UI\SparklineValueAxisItemNotesLabel|array $value
    * @return \Kendo\Dataviz\UI\SparklineValueAxisItemNotes
    */
    public function label($value) {
        return $this->setProperty('label', $value);
    }

    /**
    * The line of the notes.
    * @param \Kendo\Dataviz\UI\SparklineValueAxisItemNotesLine|array $value
    * @return \Kendo\Dataviz\UI\SparklineValueAxisItemNotes
    */
    public function line($value) {
        return $this->setProperty('line', $value);
    }

    /**
    * Adds SparklineValueAxisItemNotesDataItem to the SparklineValueAxisItemNotes.
    * @param \Kendo\Dataviz\UI\SparklineValueAxisItemNotesDataItem|array,... $value one or more SparklineValueAxisItemNotesDataItem to add.
    * @return \Kendo\Dataviz\UI\SparklineValueAxisItemNotes
    */
    public function addDataItem($value) {
        return $this->add('data', func_get_args());
    }

//<< Properties
}

?>
