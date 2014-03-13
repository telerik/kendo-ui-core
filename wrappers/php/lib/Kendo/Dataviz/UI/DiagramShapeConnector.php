<?php

namespace Kendo\Dataviz\UI;

class DiagramShapeConnector extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The connector name. Predefined names include:
    * @param string $value
    * @return \Kendo\Dataviz\UI\DiagramShapeConnector
    */
    public function name($value) {
        return $this->setProperty('name', $value);
    }

    /**
    * The connector description.
    * @param string $value
    * @return \Kendo\Dataviz\UI\DiagramShapeConnector
    */
    public function description($value) {
        return $this->setProperty('description', $value);
    }

    /**
    * The function that positions the connector.
    * @param string|\Kendo\JavaScriptFunction $value
    * @return \Kendo\Dataviz\UI\DiagramShapeConnector
    */
    public function position($value) {
        return $this->setProperty('position', $value);
    }

//<< Properties
}

?>
