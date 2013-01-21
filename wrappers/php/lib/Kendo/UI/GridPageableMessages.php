<?php

namespace Kendo\UI;

class GridPageableMessages extends \Kendo\SerializableObject {
//>> Properties

    public function display($value) {
        $this->setProperty('display', $value);

        return $this;
    }

    public function empty($value) {
        $this->setProperty('empty', $value);

        return $this;
    }

    public function page($value) {
        $this->setProperty('page', $value);

        return $this;
    }

    public function of($value) {
        $this->setProperty('of', $value);

        return $this;
    }

    public function itemsPerPage($value) {
        $this->setProperty('itemsPerPage', $value);

        return $this;
    }

    public function first($value) {
        $this->setProperty('first', $value);

        return $this;
    }

    public function previous($value) {
        $this->setProperty('previous', $value);

        return $this;
    }

    public function next($value) {
        $this->setProperty('next', $value);

        return $this;
    }

    public function last($value) {
        $this->setProperty('last', $value);

        return $this;
    }

    public function refresh($value) {
        $this->setProperty('refresh', $value);

        return $this;
    }

//<< Properties
}

?>
