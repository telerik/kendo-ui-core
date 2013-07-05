<?php

namespace Kendo\Dataviz\UI;

class ChartCategoryAxisItemNotesDataItemLine extends \kendo\SerializableObject {
//>> Properties

    /**
    * The line width of the note.
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartCategoryAxisItemNotesDataItemLine
    */
    public function width($value) {
        return $this->setProperty('width', $value);
    }

    /**
    * The line color of the note.
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartCategoryAxisItemNotesDataItemLine
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The line length of the note.
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartCategoryAxisItemNotesDataItemLine
    */
    public function length($value) {
        return $this->setProperty('length', $value);
    }

//<< Properties
}

?>
