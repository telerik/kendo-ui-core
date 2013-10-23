<?php

namespace Kendo\UI;

class ProgressBarAnimation extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The duration of each progress animation in milliseconds.
    * @param float $value
    * @return \Kendo\UI\ProgressBarAnimation
    */
    public function duration($value) {
        return $this->setProperty('duration', $value);
    }

//<< Properties
}

?>
