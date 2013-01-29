<?php

namespace Kendo\UI;

class PanelBarAnimationExpand extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The number of milliseconds used for the visual animation when an item is opened.
    * @param float $value
    * @returns \Kendo\UI\PanelBarAnimationExpand
    */
    public function duration($value) {
        return $this->setProperty('duration', $value);
    }

    /**
    * A whitespace-delimited string of animation effects that are used when an item is expanded. Options include
"expandVertical" and "fadeIn".
    * @param string $value
    * @returns \Kendo\UI\PanelBarAnimationExpand
    */
    public function effects($value) {
        return $this->setProperty('effects', $value);
    }

    /**
    * 
    * @param boolean $value
    * @returns \Kendo\UI\PanelBarAnimationExpand
    */
    public function show($value) {
        return $this->setProperty('show', $value);
    }

//<< Properties
}

?>
