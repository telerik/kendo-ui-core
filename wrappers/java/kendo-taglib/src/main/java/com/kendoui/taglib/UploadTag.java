package com.kendoui.taglib;

@SuppressWarnings("serial")
public class UploadTag extends WidgetTag {
    public UploadTag() {
        super("Upload");
    }

    //>> Attributes

    public boolean getEnabled() {
        return (boolean)getProperty("enabled");
    }

    public void setEnabled(boolean enabled) {
        setProperty("enabled", enabled);
    }

    public boolean getMultiple() {
        return (boolean)getProperty("multiple");
    }

    public void setMultiple(boolean multiple) {
        setProperty("multiple", multiple);
    }

    public boolean getShowFileList() {
        return (boolean)getProperty("showFileList");
    }

    public void setShowFileList(boolean showFileList) {
        setProperty("showFileList", showFileList);
    }

    //<< Attributes
}