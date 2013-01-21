<?php

namespace Kendo\UI;

class GridColumnMenu extends \Kendo\SerializableObject {
//>> Properties

    public function columns($value) {
        $this->setProperty('columns', $value);

        return $this;
    }

    public function filterable($value) {
        $this->setProperty('filterable', $value);

        return $this;
    }

    public function sortable($value) {
        $this->setProperty('sortable', $value);

        return $this;
    }

    public function messages(\Kendo\UI\GridColumnMenuMessages $value) {
        $this->setProperty('messages', $value);

        return $this;
    }

//<< Properties
}

?>
