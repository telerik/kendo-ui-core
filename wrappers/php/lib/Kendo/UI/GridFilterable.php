<?php

namespace Kendo\UI;

class GridFilterable extends \Kendo\SerializableObject {
//>> Properties

    public function setExtra($value) {
        $this->setProperty('extra', $value);

        return $this;
    }

    public function setMessages(\Kendo\UI\GridFilterableMessages $value) {
        $this->setProperty('messages', $value);

        return $this;
    }

    public function setOperators(\Kendo\UI\GridFilterableOperators $value) {
        $this->setProperty('operators', $value);

        return $this;
    }

//<< Properties
}

?>
