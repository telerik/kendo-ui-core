<?php

namespace Kendo\Dataviz\UI;

class DiagramConnectionDefaults extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Defines the label displayed on the connection path.
    * @param \Kendo\Dataviz\UI\DiagramConnectionDefaultsContent|array $value
    * @return \Kendo\Dataviz\UI\DiagramConnectionDefaults
    */
    public function content($value) {
        return $this->setProperty('content', $value);
    }

    /**
    * Defines the editing behavior of the connections.
    * @param boolean|\Kendo\Dataviz\UI\DiagramConnectionDefaultsEditable|array $value
    * @return \Kendo\Dataviz\UI\DiagramConnectionDefaults
    */
    public function editable($value) {
        return $this->setProperty('editable', $value);
    }

    /**
    * The start cap (arrow, head or decoration) of the connection:Note that you can also use the "ArrowStart" for the endCap but its direction will be inversed.
    * @param string $value
    * @return \Kendo\Dataviz\UI\DiagramConnectionDefaults
    */
    public function endCap($value) {
        return $this->setProperty('endCap', $value);
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
    * Defines the connection selection configuration.
    * @param \Kendo\Dataviz\UI\DiagramConnectionDefaultsSelection|array $value
    * @return \Kendo\Dataviz\UI\DiagramConnectionDefaults
    */
    public function selection($value) {
        return $this->setProperty('selection', $value);
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
    * Defines the stroke configuration.
    * @param \Kendo\Dataviz\UI\DiagramConnectionDefaultsStroke|array $value
    * @return \Kendo\Dataviz\UI\DiagramConnectionDefaults
    */
    public function stroke($value) {
        return $this->setProperty('stroke', $value);
    }

//<< Properties
}

?>
