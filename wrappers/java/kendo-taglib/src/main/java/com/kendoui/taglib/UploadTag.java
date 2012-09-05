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

    public Function getSelect() {
        return (Function)getProperty("select");
    }

    public void setSelect(String select) {
        setProperty("select", new Function(select));
    }

    public Function getUpload() {
        return (Function)getProperty("upload");
    }

    public void setUpload(String upload) {
        setProperty("upload", new Function(upload));
    }

    public Function getSuccess() {
        return (Function)getProperty("success");
    }

    public void setSuccess(String success) {
        setProperty("success", new Function(success));
    }

    public Function getError() {
        return (Function)getProperty("error");
    }

    public void setError(String error) {
        setProperty("error", new Function(error));
    }

    public Function getComplete() {
        return (Function)getProperty("complete");
    }

    public void setComplete(String complete) {
        setProperty("complete", new Function(complete));
    }

    public Function getCancel() {
        return (Function)getProperty("cancel");
    }

    public void setCancel(String cancel) {
        setProperty("cancel", new Function(cancel));
    }

    public Function getProgress() {
        return (Function)getProperty("progress");
    }

    public void setProgress(String progress) {
        setProperty("progress", new Function(progress));
    }

    public Function getRemove() {
        return (Function)getProperty("remove");
    }

    public void setRemove(String remove) {
        setProperty("remove", new Function(remove));
    }

    //<< Attributes
}