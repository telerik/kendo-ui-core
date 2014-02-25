<?php

namespace Kendo\UI;

class NotificationPosition extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Determines the pixel position of the first popup notification with regard to the viewport's bottom edge.
    * @param float $value
    * @return \Kendo\UI\NotificationPosition
    */
    public function bottom($value) {
        return $this->setProperty('bottom', $value);
    }

    /**
    * Determines the pixel position of the first popup notification with regard to the viewport's left edge.
    * @param float $value
    * @return \Kendo\UI\NotificationPosition
    */
    public function left($value) {
        return $this->setProperty('left', $value);
    }

    /**
    * Determines whether the popup notifications will move together with the other page content during scrolling.
    * @param boolean $value
    * @return \Kendo\UI\NotificationPosition
    */
    public function pinned($value) {
        return $this->setProperty('pinned', $value);
    }

    /**
    * Determines the pixel position of the first popup notification with regard to the viewport's right edge.
    * @param float $value
    * @return \Kendo\UI\NotificationPosition
    */
    public function right($value) {
        return $this->setProperty('right', $value);
    }

    /**
    * Determines the position of the first popup notification with regard to the viewport's top edge. Numeric values are treated as pixels.
    * @param float $value
    * @return \Kendo\UI\NotificationPosition
    */
    public function top($value) {
        return $this->setProperty('top', $value);
    }

//<< Properties
}

?>
