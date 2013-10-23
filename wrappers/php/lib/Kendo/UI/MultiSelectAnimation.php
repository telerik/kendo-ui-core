<?php

namespace Kendo\UI;

class MultiSelectAnimation extends \Kendo\SerializableObject {
//>> Properties

    /**
    * 
    * @param \Kendo\UI\MultiSelectAnimationClose|array $value
    * @return \Kendo\UI\MultiSelectAnimation
    */
    public function close($value) {
        return $this->setProperty('close', $value);
    }

    /**
    * The animation played when the suggestion popup is opened.
    * @param \Kendo\UI\MultiSelectAnimationOpen|array $value
    * @return \Kendo\UI\MultiSelectAnimation
    */
    public function open($value) {
        return $this->setProperty('open', $value);
    }

//<< Properties
}

?>
