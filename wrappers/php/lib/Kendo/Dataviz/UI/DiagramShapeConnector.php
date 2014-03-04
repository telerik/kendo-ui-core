<?php

namespace Kendo\Dataviz\UI;

class DiagramShapeConnector extends \Kendo\SerializableObject {
//>> Properties

    /**
    * 
    * @param string $value
    * @return \Kendo\Dataviz\UI\DiagramShapeConnector
    */
    public function position($value) {
        return $this->setProperty('position', $value);
    }

    /**
    * 
    * @param string $value
    * @return \Kendo\Dataviz\UI\DiagramShapeConnector
    */
    public function description($value) {
        return $this->setProperty('description', $value);
    }

//<< Properties
}

?>
