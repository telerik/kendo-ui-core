<?php

namespace Kendo\Dataviz\UI;

class DiagramPannable extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The pannable key.
    * @param string $value
    * @return \Kendo\Dataviz\UI\DiagramPannable
    */
    public function key($value) {
        return $this->setProperty('key', $value);
    }

//<< Properties
}

?>
