<?php

namespace Kendo\UI;

class GridColumnCommandItem extends \Kendo\SerializableObject {
//>> Properties

    public function name($value) {
        $this->setProperty('name', $value);

        return $this;
    }

    public function text($value) {
        $this->setProperty('text', $value);

        return $this;
    }

    public function className($value) {
        $this->setProperty('className', $value);

        return $this;
    }

    public function click($value) {
        $this->setProperty('click', $value);

        return $this;
    }

//<< Properties
}

?>
