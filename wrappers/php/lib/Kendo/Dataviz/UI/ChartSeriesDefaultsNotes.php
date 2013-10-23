<?php

namespace Kendo\Dataviz\UI;

class ChartSeriesDefaultsNotes extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The icon of the notes.
    * @param \Kendo\Dataviz\UI\ChartSeriesDefaultsNotesIcon|array $value
    * @return \Kendo\Dataviz\UI\ChartSeriesDefaultsNotes
    */
    public function icon($value) {
        return $this->setProperty('icon', $value);
    }

    /**
    * The label of the notes.
    * @param \Kendo\Dataviz\UI\ChartSeriesDefaultsNotesLabel|array $value
    * @return \Kendo\Dataviz\UI\ChartSeriesDefaultsNotes
    */
    public function label($value) {
        return $this->setProperty('label', $value);
    }

    /**
    * The line of the notes.
    * @param \Kendo\Dataviz\UI\ChartSeriesDefaultsNotesLine|array $value
    * @return \Kendo\Dataviz\UI\ChartSeriesDefaultsNotes
    */
    public function line($value) {
        return $this->setProperty('line', $value);
    }

//<< Properties
}

?>
