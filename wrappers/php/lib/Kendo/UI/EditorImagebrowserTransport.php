<?php

namespace Kendo\UI;

class EditorImagebrowserTransport extends \Kendo\SerializableObject {
//>> Properties

    public function setRead($value) {
        $this->setProperty('read', $value);

        return $this;
    }

    public function setThumbnailUrl($value) {
        $this->setProperty('thumbnailUrl', $value);

        return $this;
    }

    public function setUploadUrl($value) {
        $this->setProperty('uploadUrl', $value);

        return $this;
    }

    public function setImageUrl($value) {
        $this->setProperty('imageUrl', $value);

        return $this;
    }

    public function setDestroy($value) {
        $this->setProperty('destroy', $value);

        return $this;
    }

    public function setCreate($value) {
        $this->setProperty('create', $value);

        return $this;
    }

//<< Properties
}

?>
