<?php

namespace Kendo\UI;

class WindowPosition extends \kendo\SerializableObject {
//>> Properties

    /**
    * Specifies the initial top position of the window.
    * @param float $value
    * @return \Kendo\UI\WindowPosition
    */
    public function top($value) {
        return $this->setProperty('top', $value);
    }

    /**
    * Specifies the initial left position of the window.
    * @param float $value
    * @return \Kendo\UI\WindowPosition
    */
    public function left($value) {
        return $this->setProperty('left', $value);
    }

//<< Properties
}

?>
