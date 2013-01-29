<?php

namespace Kendo\UI;

class PanelBarAnimationCollapse extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The number of milliseconds used for the visual animation when a PanelBar item is closed.
    * @param float $value
    * @return \Kendo\UI\PanelBarAnimationCollapse
    */
    public function duration($value) {
        return $this->setProperty('duration', $value);
    }

    /**
    * A whitespace-delimited string of animation effects that are utilized when a PanelBar item
is closed. Options include "fadeOut".
    * @param string $value
    * @return \Kendo\UI\PanelBarAnimationCollapse
    */
    public function effects($value) {
        return $this->setProperty('effects', $value);
    }

//<< Properties
}

?>
