<?php

namespace Kendo\UI;

class PagerMessages extends \Kendo\SerializableObject {
//>> Properties

    public function display($value) {
        return $this->setProperty('display', $value);
    }

    public function empty($value) {
        return $this->setProperty('empty', $value);
    }

    public function page($value) {
        return $this->setProperty('page', $value);
    }

    public function of($value) {
        return $this->setProperty('of', $value);
    }

    public function itemsPerPage($value) {
        return $this->setProperty('itemsPerPage', $value);
    }

    public function first($value) {
        return $this->setProperty('first', $value);
    }

    public function previous($value) {
        return $this->setProperty('previous', $value);
    }

    public function next($value) {
        return $this->setProperty('next', $value);
    }

    public function last($value) {
        return $this->setProperty('last', $value);
    }

    public function refresh($value) {
        return $this->setProperty('refresh', $value);
    }

//<< Properties
}

?>
