<?php

namespace Kendo\Dataviz\UI;

class ChartValueAxisItemNotes extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The position of the value axis note.
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartValueAxisItemNotes
    */
    public function position($value) {
        return $this->setProperty('position', $value);
    }

    /**
    * The icon of the notes.
    * @param \Kendo\Dataviz\UI\ChartValueAxisItemNotesIcon|array $value
    * @return \Kendo\Dataviz\UI\ChartValueAxisItemNotes
    */
    public function icon($value) {
        return $this->setProperty('icon', $value);
    }

    /**
    * The label of the notes.
    * @param \Kendo\Dataviz\UI\ChartValueAxisItemNotesLabel|array $value
    * @return \Kendo\Dataviz\UI\ChartValueAxisItemNotes
    */
    public function label($value) {
        return $this->setProperty('label', $value);
    }

    /**
    * The line of the notes.
    * @param \Kendo\Dataviz\UI\ChartValueAxisItemNotesLine|array $value
    * @return \Kendo\Dataviz\UI\ChartValueAxisItemNotes
    */
    public function line($value) {
        return $this->setProperty('line', $value);
    }

    /**
    * Adds ChartValueAxisItemNotesDataItem to the ChartValueAxisItemNotes.
    * @param \Kendo\Dataviz\UI\ChartValueAxisItemNotesDataItem|array,... $value one or more ChartValueAxisItemNotesDataItem to add.
    * @return \Kendo\Dataviz\UI\ChartValueAxisItemNotes
    */
    public function addDataItem($value) {
        return $this->add('data', func_get_args());
    }

//<< Properties
}

?>
