package com.kendoui.taglib;

import com.kendoui.taglib.json.Function;

@SuppressWarnings("serial")
public class UploadTag extends WidgetTag {
    public UploadTag() {
        super("Upload");
    }

    //>> Attributes

    public boolean getEnabled() {
        return (boolean)getProperty("enabled");
    }

    public void setEnabled(boolean value) {
        setProperty("enabled", value);
    }

    public boolean getMultiple() {
        return (boolean)getProperty("multiple");
    }

    public void setMultiple(boolean value) {
        setProperty("multiple", value);
    }

    public boolean getShowFileList() {
        return (boolean)getProperty("showFileList");
    }

    public void setShowFileList(boolean value) {
        setProperty("showFileList", value);
    }

    public String getCancel() {
        return ((Function)getProperty("cancel")).getBody();
    }

    public void setCancel(String value) {
        setProperty("cancel", new Function(value));
    }

    public String getComplete() {
        return ((Function)getProperty("complete")).getBody();
    }

    public void setComplete(String value) {
        setProperty("complete", new Function(value));
    }

    public String getError() {
        return ((Function)getProperty("error")).getBody();
    }

    public void setError(String value) {
        setProperty("error", new Function(value));
    }

    public String getProgress() {
        return ((Function)getProperty("progress")).getBody();
    }

    public void setProgress(String value) {
        setProperty("progress", new Function(value));
    }

    public String getRemove() {
        return ((Function)getProperty("remove")).getBody();
    }

    public void setRemove(String value) {
        setProperty("remove", new Function(value));
    }

    public String getSelect() {
        return ((Function)getProperty("select")).getBody();
    }

    public void setSelect(String value) {
        setProperty("select", new Function(value));
    }

    public String getSuccess() {
        return ((Function)getProperty("success")).getBody();
    }

    public void setSuccess(String value) {
        setProperty("success", new Function(value));
    }

    public String getUpload() {
        return ((Function)getProperty("upload")).getBody();
    }

    public void setUpload(String value) {
        setProperty("upload", new Function(value));
    }

//<< Attributes
}