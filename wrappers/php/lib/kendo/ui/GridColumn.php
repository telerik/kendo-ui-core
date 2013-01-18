<?php

namespace kendo\ui;

class GridColumn extends \kendo\SerializableObject {
//>> Properties

    public function setAttributes($value) {
        $this->setProperty('attributes', $value);

        return $this;
    }

    public function setCommand($value) {
        $this->setProperty('command', $value);

        return $this;
    }

    public function addCommandItem(\kendo\ui\GridColumnCommandItem $value) {
        $values = $this->getProperty('command');

        if ($values == null) {
            $values = array();
            $this->setProperty('command', $values);
        }

        $values[] = $value;

        return $this;
    }

    public function setEditor($value) {
        $this->setProperty('editor', $value);

        return $this;
    }

    public function setEncoded($value) {
        $this->setProperty('encoded', $value);

        return $this;
    }

    public function setField($value) {
        $this->setProperty('field', $value);

        return $this;
    }

    public function setFilterable($value) {
        $this->setProperty('filterable', $value);

        return $this;
    }

    public function setFilterable(\kendo\ui\GridColumnFilterable $value) {
        $this->setProperty('filterable', $value);

        return $this;
    }

    public function setFormat($value) {
        $this->setProperty('format', $value);

        return $this;
    }

    public function setHeaderAttributes($value) {
        $this->setProperty('headerAttributes', $value);

        return $this;
    }

    public function setHeaderTemplate($value) {
        $this->setProperty('headerTemplate', $value);

        return $this;
    }

    public function setHidden($value) {
        $this->setProperty('hidden', $value);

        return $this;
    }

    public function setSortable($value) {
        $this->setProperty('sortable', $value);

        return $this;
    }

    public function setTemplate($value) {
        $this->setProperty('template', $value);

        return $this;
    }

    public function setAggregates($value) {
        $this->setProperty('aggregates', $value);

        return $this;
    }

    public function setGroupHeaderTemplate($value) {
        $this->setProperty('groupHeaderTemplate', $value);

        return $this;
    }

    public function setGroupFooterTemplate($value) {
        $this->setProperty('groupFooterTemplate', $value);

        return $this;
    }

    public function setFooterTemplate($value) {
        $this->setProperty('footerTemplate', $value);

        return $this;
    }

    public function setTitle($value) {
        $this->setProperty('title', $value);

        return $this;
    }

    public function setWidth($value) {
        $this->setProperty('width', $value);

        return $this;
    }

    public function setMenu($value) {
        $this->setProperty('menu', $value);

        return $this;
    }

//<< Properties
}

?>
