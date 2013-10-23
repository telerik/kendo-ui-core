<?php

namespace Kendo\Dataviz\UI;

class SparklineCategoryAxisItemNotesDataItemLine extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The line width of the note.
    * @param float $value
    * @return \Kendo\Dataviz\UI\SparklineCategoryAxisItemNotesDataItemLine
    */
    public function width($value) {
        return $this->setProperty('width', $value);
    }

    /**
    * The line color of the note.
    * @param string $value
    * @return \Kendo\Dataviz\UI\SparklineCategoryAxisItemNotesDataItemLine
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The line length of the note.
    * @param float $value
    * @return \Kendo\Dataviz\UI\SparklineCategoryAxisItemNotesDataItemLine
    */
    public function length($value) {
        return $this->setProperty('length', $value);
    }

//<< Properties
}

?>
