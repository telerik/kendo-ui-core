<?php

namespace Kendo\UI;

class TabStripAnimationOpen extends \Kendo\SerializableObject {
//>> Properties

    public function duration($value) {
        $this->setProperty('duration', $value);

        return $this;
    }

    public function effects($value) {
        $this->setProperty('effects', $value);

        return $this;
    }

    public function show($value) {
        $this->setProperty('show', $value);

        return $this;
    }

//<< Properties
}

?>
