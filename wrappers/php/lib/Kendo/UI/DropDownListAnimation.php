<?php

namespace Kendo\UI;

class DropDownListAnimation extends \Kendo\SerializableObject {
//>> Properties

    /**
    * 
    * @param \Kendo\UI\DropDownListAnimationClose|array $value
    * @return \Kendo\UI\DropDownListAnimation
    */
    public function close($value) {
        return $this->setProperty('close', $value);
    }

    /**
    * The animation played when the suggestion popup is opened.
    * @param \Kendo\UI\DropDownListAnimationOpen|array $value
    * @return \Kendo\UI\DropDownListAnimation
    */
    public function open($value) {
        return $this->setProperty('open', $value);
    }

//<< Properties
}

?>
