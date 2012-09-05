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

    public String getSelect() {
        return ((Function)getProperty("select")).getBody();
    }

    public void setSelect(String select) {
        setProperty("select", new Function(select));
    }

    public String getUpload() {
        return ((Function)getProperty("upload")).getBody();
    }

    public void setUpload(String upload) {
        setProperty("upload", new Function(upload));
    }

    public String getSuccess() {
        return ((Function)getProperty("success")).getBody();
    }

    public void setSuccess(String success) {
        setProperty("success", new Function(success));
    }

    public String getError() {
        return ((Function)getProperty("error")).getBody();
    }

    public void setError(String error) {
        setProperty("error", new Function(error));
    }

    public String getComplete() {
        return ((Function)getProperty("complete")).getBody();
    }

    public void setComplete(String complete) {
        setProperty("complete", new Function(complete));
    }

    public String getCancel() {
        return ((Function)getProperty("cancel")).getBody();
    }

    public void setCancel(String cancel) {
        setProperty("cancel", new Function(cancel));
    }

    public String getProgress() {
        return ((Function)getProperty("progress")).getBody();
    }

    public void setProgress(String progress) {
        setProperty("progress", new Function(progress));
    }

    public String getRemove() {
        return ((Function)getProperty("remove")).getBody();
    }

    public void setRemove(String remove) {
        setProperty("remove", new Function(remove));
    }

    //<< Attributes
}