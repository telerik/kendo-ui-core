<?php

namespace Kendo\UI;

class GridPageable extends \Kendo\SerializableObject {
//>> Properties

    public function pageSize($value) {
        return $this->setProperty('pageSize', $value);
    }

    public function previousNext($value) {
        return $this->setProperty('previousNext', $value);
    }

    public function numeric($value) {
        return $this->setProperty('numeric', $value);
    }

    public function buttonCount($value) {
        return $this->setProperty('buttonCount', $value);
    }

    public function input($value) {
        return $this->setProperty('input', $value);
    }

    public function pageSizes($value) {
        return $this->setProperty('pageSizes', $value);
    }

    public function refresh($value) {
        return $this->setProperty('refresh', $value);
    }

    public function info($value) {
        return $this->setProperty('info', $value);
    }

    public function messages(\Kendo\UI\GridPageableMessages $value) {
        return $this->setProperty('messages', $value);
    }

//<< Properties
}

?>
