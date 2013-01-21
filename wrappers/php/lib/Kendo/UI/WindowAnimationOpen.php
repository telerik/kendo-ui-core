<?php

namespace Kendo\UI;

class WindowAnimationOpen extends \Kendo\SerializableObject {
//>> Properties

    public function effects($value) {
        $this->setProperty('effects', $value);

        return $this;
    }

    public function duration($value) {
        $this->setProperty('duration', $value);

        return $this;
    }

//<< Properties
}

?>
