<?php

namespace Kendo\UI;

class GridColumnMenu extends \Kendo\SerializableObject {
//>> Properties

    public function columns($value) {
        return $this->setProperty('columns', $value);
    }

    public function filterable($value) {
        return $this->setProperty('filterable', $value);
    }

    public function sortable($value) {
        return $this->setProperty('sortable', $value);
    }

    public function messages(\Kendo\UI\GridColumnMenuMessages $value) {
        return $this->setProperty('messages', $value);
    }

//<< Properties
}

?>
