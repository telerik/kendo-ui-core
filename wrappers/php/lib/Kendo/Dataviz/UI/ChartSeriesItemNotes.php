<?php

namespace Kendo\Dataviz\UI;

class ChartSeriesItemNotes extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The position of the series note.
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemNotes
    */
    public function position($value) {
        return $this->setProperty('position', $value);
    }

    /**
    * The icon of the notes.
    * @param \Kendo\Dataviz\UI\ChartSeriesItemNotesIcon|array $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemNotes
    */
    public function icon($value) {
        return $this->setProperty('icon', $value);
    }

    /**
    * The label of the notes.
    * @param \Kendo\Dataviz\UI\ChartSeriesItemNotesLabel|array $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemNotes
    */
    public function label($value) {
        return $this->setProperty('label', $value);
    }

    /**
    * The line of the notes.
    * @param \Kendo\Dataviz\UI\ChartSeriesItemNotesLine|array $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemNotes
    */
    public function line($value) {
        return $this->setProperty('line', $value);
    }

//<< Properties
}

?>
