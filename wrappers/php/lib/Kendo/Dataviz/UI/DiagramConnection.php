<?php

namespace Kendo\Dataviz\UI;

class DiagramConnection extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Defines the stroke configuration.
    * @param \Kendo\Dataviz\UI\DiagramConnectionStroke|array $value
    * @return \Kendo\Dataviz\UI\DiagramConnection
    */
    public function stroke($value) {
        return $this->setProperty('stroke', $value);
    }

    /**
    * Defines the hover configuration.
    * @param \Kendo\Dataviz\UI\DiagramConnectionHover|array $value
    * @return \Kendo\Dataviz\UI\DiagramConnection
    */
    public function hover($value) {
        return $this->setProperty('hover', $value);
    }

    /**
    * The start cap (arrow, head or decoration) of the connection:
    * @param string $value
    * @return \Kendo\Dataviz\UI\DiagramConnection
    */
    public function startCap($value) {
        return $this->setProperty('startCap', $value);
    }

    /**
    * The start cap (arrow, head or decoration) of the connection:Note that you can also use the "ArrowStart" for the endCap but its direction will be inversed.
    * @param string $value
    * @return \Kendo\Dataviz\UI\DiagramConnection
    */
    public function endCap($value) {
        return $this->setProperty('endCap', $value);
    }

    /**
    * Adds DiagramConnectionPoint to the DiagramConnection.
    * @param \Kendo\Dataviz\UI\DiagramConnectionPoint|array,... $value one or more DiagramConnectionPoint to add.
    * @return \Kendo\Dataviz\UI\DiagramConnection
    */
    public function addPoint($value) {
        return $this->add('points', func_get_args());
    }

    /**
    * Defines the connection selection configuration.
    * @param \Kendo\Dataviz\UI\DiagramConnectionSelection|array $value
    * @return \Kendo\Dataviz\UI\DiagramConnection
    */
    public function selection($value) {
        return $this->setProperty('selection', $value);
    }

//<< Properties
}

?>
