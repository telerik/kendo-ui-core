<?php

namespace Kendo\Dataviz\UI;

class DiagramShapeDefaultsConnector extends \Kendo\SerializableObject {
//>> Properties

    /**
    * 
    * @param string $value
    * @return \Kendo\Dataviz\UI\DiagramShapeDefaultsConnector
    */
    public function name($value) {
        return $this->setProperty('name', $value);
    }

    /**
    * 
    * @param string $value
    * @return \Kendo\Dataviz\UI\DiagramShapeDefaultsConnector
    */
    public function description($value) {
        return $this->setProperty('description', $value);
    }

    /**
    * 
    * @param string|\Kendo\JavaScriptFunction $value
    * @return \Kendo\Dataviz\UI\DiagramShapeDefaultsConnector
    */
    public function position($value) {
        return $this->setProperty('position', $value);
    }

//<< Properties
}

?>
