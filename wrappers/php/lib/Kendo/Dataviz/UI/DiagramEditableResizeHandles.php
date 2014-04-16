<?php

namespace Kendo\Dataviz\UI;

class DiagramEditableResizeHandles extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Set the handles backgorund.
    * @param string $value
    * @return \Kendo\Dataviz\UI\DiagramEditableResizeHandles
    */
    public function background($value) {
        return $this->setProperty('background', $value);
    }

    /**
    * Specifies the handles stroke styles.
    * @param \Kendo\Dataviz\UI\DiagramEditableResizeHandlesStroke|array $value
    * @return \Kendo\Dataviz\UI\DiagramEditableResizeHandles
    */
    public function stroke($value) {
        return $this->setProperty('stroke', $value);
    }

    /**
    * Set the handles hover styles.
    * @param \Kendo\Dataviz\UI\DiagramEditableResizeHandlesHover|array $value
    * @return \Kendo\Dataviz\UI\DiagramEditableResizeHandles
    */
    public function hover($value) {
        return $this->setProperty('hover', $value);
    }

    /**
    * The hangles width.
    * @param float $value
    * @return \Kendo\Dataviz\UI\DiagramEditableResizeHandles
    */
    public function width($value) {
        return $this->setProperty('width', $value);
    }

    /**
    * The hangles height.
    * @param float $value
    * @return \Kendo\Dataviz\UI\DiagramEditableResizeHandles
    */
    public function height($value) {
        return $this->setProperty('height', $value);
    }

//<< Properties
}

?>
