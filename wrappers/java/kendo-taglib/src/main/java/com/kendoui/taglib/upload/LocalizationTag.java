
package com.kendoui.taglib.upload;

import com.kendoui.taglib.BaseTag;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class LocalizationTag extends BaseTag /* interfaces *//* interfaces */ {

//>> Attributes

    @Override
    public int doEndTag() throws JspException {
        Localization parent = (Localization)findParentWithClass(Localization.class);

        parent.setLocalization(this);

        return super.doEndTag();
    }

    public String getCancel() {
        return (String)getProperty("cancel");
    }

    public void setCancel(String value) {
        setProperty("cancel", value);
    }

    public String getDropFilesHere() {
        return (String)getProperty("dropFilesHere");
    }

    public void setDropFilesHere(String value) {
        setProperty("dropFilesHere", value);
    }

    public String getRemove() {
        return (String)getProperty("remove");
    }

    public void setRemove(String value) {
        setProperty("remove", value);
    }

    public String getRetry() {
        return (String)getProperty("retry");
    }

    public void setRetry(String value) {
        setProperty("retry", value);
    }

    public String getSelect() {
        return (String)getProperty("select");
    }

    public void setSelect(String value) {
        setProperty("select", value);
    }

    public String getStatusFailed() {
        return (String)getProperty("statusFailed");
    }

    public void setStatusFailed(String value) {
        setProperty("statusFailed", value);
    }

    public String getStatusUploaded() {
        return (String)getProperty("statusUploaded");
    }

    public void setStatusUploaded(String value) {
        setProperty("statusUploaded", value);
    }

    public String getStatusUploading() {
        return (String)getProperty("statusUploading");
    }

    public void setStatusUploading(String value) {
        setProperty("statusUploading", value);
    }

    public String getUploadSelectedFiles() {
        return (String)getProperty("uploadSelectedFiles");
    }

    public void setUploadSelectedFiles(String value) {
        setProperty("uploadSelectedFiles", value);
    }

//<< Attributes
}
