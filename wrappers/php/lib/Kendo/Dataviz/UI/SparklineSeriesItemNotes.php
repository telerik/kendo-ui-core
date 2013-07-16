<?php

namespace Kendo\Dataviz\UI;

class SparklineSeriesItemNotes extends \kendo\SerializableObject {
//>> Properties

    /**
    * The icon of the notes.
    * @param \Kendo\Dataviz\UI\SparklineSeriesItemNotesIcon|array $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesItemNotes
    */
    public function icon($value) {
        return $this->setProperty('icon', $value);
    }

    /**
    * The label of the notes.
    * @param \Kendo\Dataviz\UI\SparklineSeriesItemNotesLabel|array $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesItemNotes
    */
    public function label($value) {
        return $this->setProperty('label', $value);
    }

    /**
    * The line of the notes.
    * @param \Kendo\Dataviz\UI\SparklineSeriesItemNotesLine|array $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesItemNotes
    */
    public function line($value) {
        return $this->setProperty('line', $value);
    }

//<< Properties
}

?>
