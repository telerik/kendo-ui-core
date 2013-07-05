<?php

namespace Kendo\Dataviz\UI;

class ChartSeriesItemNotesLine extends \kendo\SerializableObject {
//>> Properties

    /**
    * The line width of the notes.
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemNotesLine
    */
    public function width($value) {
        return $this->setProperty('width', $value);
    }

    /**
    * The line color of the notes.
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemNotesLine
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The line length of the notes.
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemNotesLine
    */
    public function length($value) {
        return $this->setProperty('length', $value);
    }

//<< Properties
}

?>
