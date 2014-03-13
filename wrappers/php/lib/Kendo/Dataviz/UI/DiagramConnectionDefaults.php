<?php

namespace Kendo\Dataviz\UI;

class DiagramConnectionDefaults extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Defines the stroke configuration.
    * @param \Kendo\Dataviz\UI\DiagramConnectionDefaultsStroke|array $value
    * @return \Kendo\Dataviz\UI\DiagramConnectionDefaults
    */
    public function stroke($value) {
        return $this->setProperty('stroke', $value);
    }

    /**
    * Defines the hover configuration.
    * @param \Kendo\Dataviz\UI\DiagramConnectionDefaultsHover|array $value
    * @return \Kendo\Dataviz\UI\DiagramConnectionDefaults
    */
    public function hover($value) {
        return $this->setProperty('hover', $value);
    }

    /**
    * The start cap (arrow, head or decoration) of the connection:
    * @param string $value
    * @return \Kendo\Dataviz\UI\DiagramConnectionDefaults
    */
    public function startCap($value) {
        return $this->setProperty('startCap', $value);
    }

    /**
    * The start cap (arrow, head or decoration) of the connection:Note that you can also use the "ArrowStart" for the endCap but its direction will be inversed.
    * @param string $value
    * @return \Kendo\Dataviz\UI\DiagramConnectionDefaults
    */
    public function endCap($value) {
        return $this->setProperty('endCap', $value);
    }

//<< Properties
}

?>
