<?php

namespace Kendo\UI;

class ListView extends \Kendo\UI\Widget {
    protected function name() {
        return 'ListView';
    }

    protected function createElement() {
        $tagName = $this->getProperty('tagName');
        if ($tagName == NULL) {
            $tagName = 'div';
        }

        return new \Kendo\Html\Element($tagName);
    }

    public function html() {
        $html = parent::html();

        if ($this->getProperty('pageable')) {
            $pager = new \Kendo\Html\Element('div');
            $pager->attr('id', "{$this->id}_pager");


            $html = "$html {$pager->outerHtml()}";
        }

        return $html;
    }

    public function properties() {
        $properties = parent::properties();

        //remove tagName from init script
        unset($properties['tagName']);

        //adjust pager settings
        $pageable = $properties['pageable'];
        if ($pageable) {
            if (!is_array($pageable)) {
                $pageable = array();
            }

            $pageable['pagerId'] = "{$this->id}_pager";
            $properties['pageable'] = $pageable;
        }

        return $properties;
    }

//>> Properties

    /**
    * If set to false the widget will not bind to the data source during initialization. In this case data binding will occur when the change event of the
data source is fired. By default the widget will bind to the data source specified in the configuration.
    * @param boolean $value
    * @return \Kendo\UI\ListView
    */
    public function autoBind($value) {
        return $this->setProperty('autoBind', $value);
    }

    /**
    * Sets the data source of the ListView.
    * @param array|\Kendo\Data\DataSource $value
    * @return \Kendo\UI\ListView
    */
    public function dataSource($value) {
        return $this->setProperty('dataSource', $value);
    }

    /**
    * Indicates whether keyboard navigation is enabled/disabled.
    * @param boolean $value
    * @return \Kendo\UI\ListView
    */
    public function navigatable($value) {
        return $this->setProperty('navigatable', $value);
    }

    /**
    * Indicates whether selection is enabled/disabled. Possible values:
    * @param boolean|string $value
    * @return \Kendo\UI\ListView
    */
    public function selectable($value) {
        return $this->setProperty('selectable', $value);
    }

    /**
    * Sets the template option of the ListView.
    * The id of the template used for rendering the items in the listview.
    * @param string $value The id of the element which represents the kendo template.
    * @return \Kendo\UI\ListView
    */
    public function templateId($value) {
        $value = new \Kendo\Template($value);

        return $this->setProperty('template', $value);
    }

    /**
    * Sets the template option of the ListView.
    * The id of the template used for rendering the items in the listview.
    * @param string $value The template content.
    * @return \Kendo\UI\ListView
    */
    public function template($value) {
        return $this->setProperty('template', $value);
    }

    /**
    * Sets the editTemplate option of the ListView.
    * Specifies ListView item template in edit mode.
    * @param string $value The id of the element which represents the kendo template.
    * @return \Kendo\UI\ListView
    */
    public function editTemplateId($value) {
        $value = new \Kendo\Template($value);

        return $this->setProperty('editTemplate', $value);
    }

    /**
    * Sets the editTemplate option of the ListView.
    * Specifies ListView item template in edit mode.
    * @param string $value The template content.
    * @return \Kendo\UI\ListView
    */
    public function editTemplate($value) {
        return $this->setProperty('editTemplate', $value);
    }

    /**
    * Sets the altTemplate option of the ListView.
    * Template to be used for rendering the alternate items in the listview.
    * @param string $value The id of the element which represents the kendo template.
    * @return \Kendo\UI\ListView
    */
    public function altTemplateId($value) {
        $value = new \Kendo\Template($value);

        return $this->setProperty('altTemplate', $value);
    }

    /**
    * Sets the altTemplate option of the ListView.
    * Template to be used for rendering the alternate items in the listview.
    * @param string $value The template content.
    * @return \Kendo\UI\ListView
    */
    public function altTemplate($value) {
        return $this->setProperty('altTemplate', $value);
    }

    /**
    * Indicates whether paging is enabled/disabled.
    * @param boolean|\Kendo\UI\ListViewPageable|array $value
    * @return \Kendo\UI\ListView
    */
    public function pageable($value) {
        return $this->setProperty('pageable', $value);
    }

    /**
    * Specifies ListView wrapper element tag name.
    * @param string $value
    * @return \Kendo\UI\ListView
    */
    public function tagName($value) {
        return $this->setProperty('tagName', $value);
    }

    /**
    * Sets the cancel event of the ListView.
    * Fired when the user clicks the "cancel" button.The event handler function context (available via the this keyword) will be set to the widget instance.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\ListView
    */
    public function cancel($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('cancel', $value);
    }

    /**
    * Sets the change event of the ListView.
    * Fires when the list view selection has changed.The event handler function context (available via the this keyword) will be set to the widget instance.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\ListView
    */
    public function change($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('change', $value);
    }

    /**
    * Sets the dataBound event of the ListView.
    * Fires when the list view has received data from the data source and it is already rendered.The event handler function context (available via the this keyword) will be set to the widget instance.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\ListView
    */
    public function dataBound($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('dataBound', $value);
    }

    /**
    * Sets the dataBinding event of the ListView.
    * Fires when the list view is about to be rendered.The event handler function context (available via the this keyword) will be set to the widget instance.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\ListView
    */
    public function dataBinding($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('dataBinding', $value);
    }

    /**
    * Sets the edit event of the ListView.
    * Fires when the list view enters edit mode.The event handler function context (available via the this keyword) will be set to the widget instance.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\ListView
    */
    public function edit($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('edit', $value);
    }

    /**
    * Sets the remove event of the ListView.
    * Fires before the list view item is removed. If it is not prevented will call DataSource sync method.The event handler function context (available via the this keyword) will be set to the widget instance.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\ListView
    */
    public function remove($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('remove', $value);
    }

    /**
    * Sets the save event of the ListView.
    * Fired when a data item is saved.The event handler function context (available via the this keyword) will be set to the widget instance.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\ListView
    */
    public function save($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('save', $value);
    }


//<< Properties
}

?>
