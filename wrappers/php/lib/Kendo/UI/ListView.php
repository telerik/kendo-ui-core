<?php

namespace Kendo\UI;

class ListView extends \Kendo\UI\Widget {
    protected function name() {
        return 'ListView';
    }
//>> Properties

    /**
    * Indicates whether the list view will call read on the DataSource initially.
    * @param boolean $value
    */
    public function autoBind($value) {
        return $this->setProperty('autoBind', $value);
    }

    /**
    * Sets the data source of the ListView.
    * @param \Kendo\Data\DataSource $value
    */
    public function dataSource(\Kendo\Data\DataSource $value) {
        return $this->setProperty('dataSource', $value);
    }

    /**
    * Indicates whether keyboard navigation is enabled/disabled.
    * @param boolean $value
    */
    public function navigatable($value) {
        return $this->setProperty('navigatable', $value);
    }

    /**
    * Indicates whether selection is enabled/disabled. Possible values:
    * @param string $value
    */
    public function selectable($value) {
        return $this->setProperty('selectable', $value);
    }

    /**
    * The id of the template used for rendering the items in the listview.
    * @param string $value
    */
    public function template($value) {
        return $this->setProperty('template', $value);
    }

    /**
    * Specifies ListView item template in edit mode.
    * @param string $value
    */
    public function editTemplate($value) {
        return $this->setProperty('editTemplate', $value);
    }

    /**
    * Template to be used for rendering the alternate items in the listview.
    * @param string $value
    */
    public function altTemplate($value) {
        return $this->setProperty('altTemplate', $value);
    }

    /**
    * Indicates whether paging is enabled/disabled.
    * @param boolean $value
    */
    public function pageable($value) {
        return $this->setProperty('pageable', $value);
    }

    /**
    * Specifies ListView wrapper element tag name.
    * @param string $value
    */
    public function tagName($value) {
        return $this->setProperty('tagName', $value);
    }

    /**
    * Sets the change event of the ListView.
    * Fires when the list view selection has changed.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    */
    public function change($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('change', $value);
    }

    /**
    * Sets the dataBound event of the ListView.
    * Fires when the list view has received data from the data source.
and is about to render it.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    */
    public function dataBound($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('dataBound', $value);
    }

    /**
    * Sets the dataBinding event of the ListView.
    * Fires when the grid is about to be rendered.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    */
    public function dataBinding($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('dataBinding', $value);
    }

    /**
    * Sets the edit event of the ListView.
    * Fires when the list view enters edit mode.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    */
    public function edit($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('edit', $value);
    }

    /**
    * Sets the remove event of the ListView.
    * Fires before the list view item is removed.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    */
    public function remove($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('remove', $value);
    }

//<< Properties
}

?>
