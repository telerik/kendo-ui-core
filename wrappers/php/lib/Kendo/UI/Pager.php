<?php

namespace Kendo\UI;

class Pager extends \Kendo\UI\Widget {
    protected function name() {
        return 'Pager';
    }
//>> Properties

    /**
    * Indicates whether the pager refresh method will be called within its initialization.
    * @param boolean $value
    * @return \Kendo\UI\Pager
    */
    public function autoBind($value) {
        return $this->setProperty('autoBind', $value);
    }

    /**
    * Defines the number of buttons displayed in the numeric pager.
    * @param float $value
    * @return \Kendo\UI\Pager
    */
    public function buttonCount($value) {
        return $this->setProperty('buttonCount', $value);
    }

    /**
    * Sets the data source of the Pager.
    * @param array|\Kendo\Data\DataSource $value
    * @return \Kendo\UI\Pager
    */
    public function dataSource($value) {
        return $this->setProperty('dataSource', $value);
    }

    /**
    * Sets the selectTemplate option of the Pager.
    * The template for selected page number link.
    * @param string $value The id of the element which represents the kendo template.
    * @return \Kendo\UI\Pager
    */
    public function selectTemplateId($value) {
        $value = new \Kendo\Template($value);

        return $this->setProperty('selectTemplate', $value);
    }

    /**
    * Sets the selectTemplate option of the Pager.
    * The template for selected page number link.
    * @param string $value The template content.
    * @return \Kendo\UI\Pager
    */
    public function selectTemplate($value) {
        return $this->setProperty('selectTemplate', $value);
    }

    /**
    * Sets the linkTemplate option of the Pager.
    * The template for page number links.
    * @param string $value The id of the element which represents the kendo template.
    * @return \Kendo\UI\Pager
    */
    public function linkTemplateId($value) {
        $value = new \Kendo\Template($value);

        return $this->setProperty('linkTemplate', $value);
    }

    /**
    * Sets the linkTemplate option of the Pager.
    * The template for page number links.
    * @param string $value The template content.
    * @return \Kendo\UI\Pager
    */
    public function linkTemplate($value) {
        return $this->setProperty('linkTemplate', $value);
    }

    /**
    * Defines if a label showing current paging information will be displayed.
    * @param boolean $value
    * @return \Kendo\UI\Pager
    */
    public function info($value) {
        return $this->setProperty('info', $value);
    }

    /**
    * Defines if an input element which allows the user to navigate to given page will be displayed.
    * @param boolean $value
    * @return \Kendo\UI\Pager
    */
    public function input($value) {
        return $this->setProperty('input', $value);
    }

    /**
    * Defines if numeric portion of the pager will be shown.
    * @param boolean $value
    * @return \Kendo\UI\Pager
    */
    public function numeric($value) {
        return $this->setProperty('numeric', $value);
    }

    /**
    * Displays a list with predefined page sizes. An array of values to be displayed can be provided. If pageSize option is provided for DataSource then this pageSize value will be automatically selected in created selectbox.
    * @param boolean|array $value
    * @return \Kendo\UI\Pager
    */
    public function pageSizes($value) {
        return $this->setProperty('pageSizes', $value);
    }

    /**
    * Defines if buttons for navigating to the first, last, previous and next pages will be shown.
    * @param boolean $value
    * @return \Kendo\UI\Pager
    */
    public function previousNext($value) {
        return $this->setProperty('previousNext', $value);
    }

    /**
    * Defines if a refresh button will be displayed. Click on that button will call DataSource read() method to get actual data.
    * @param boolean $value
    * @return \Kendo\UI\Pager
    */
    public function refresh($value) {
        return $this->setProperty('refresh', $value);
    }

    /**
    * Defines texts shown within the pager. Use this option to customize or localize the pager messages.
    * @param \Kendo\UI\PagerMessages|array $value
    * @return \Kendo\UI\Pager
    */
    public function messages($value) {
        return $this->setProperty('messages', $value);
    }

    /**
    * Sets the change event of the Pager.
    * Fires when the current page has changed.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\Pager
    */
    public function change($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('change', $value);
    }


//<< Properties
}

?>
