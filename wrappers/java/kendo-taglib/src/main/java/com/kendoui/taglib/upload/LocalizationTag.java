
package com.kendoui.taglib.upload;

import com.kendoui.taglib.BaseTag;

import com.kendoui.taglib.UploadTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class LocalizationTag extends BaseTag /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        UploadTag parent = (UploadTag)findParentWithClass(UploadTag.class);


        parent.setLocalization(this);

//<< doEndTag

        return super.doEndTag();
    }

    @Override
    public void initialize() {
//>> initialize
//<< initialize

        super.initialize();
    }

    @Override
    public void destroy() {
//>> destroy
//<< destroy

        super.destroy();
    }

//>> Attributes

    public static String tagName() {
        return "upload-localization";
    }

    public java.lang.String getCancel() {
        return (java.lang.String)getProperty("cancel");
    }

    public void setCancel(java.lang.String value) {
        setProperty("cancel", value);
    }

    public java.lang.String getDropFilesHere() {
        return (java.lang.String)getProperty("dropFilesHere");
    }

    public void setDropFilesHere(java.lang.String value) {
        setProperty("dropFilesHere", value);
    }

    public java.lang.String getRemove() {
        return (java.lang.String)getProperty("remove");
    }

    public void setRemove(java.lang.String value) {
        setProperty("remove", value);
    }

    public java.lang.String getRetry() {
        return (java.lang.String)getProperty("retry");
    }

    public void setRetry(java.lang.String value) {
        setProperty("retry", value);
    }

    public java.lang.String getSelect() {
        return (java.lang.String)getProperty("select");
    }

    public void setSelect(java.lang.String value) {
        setProperty("select", value);
    }

    public java.lang.String getStatusFailed() {
        return (java.lang.String)getProperty("statusFailed");
    }

    public void setStatusFailed(java.lang.String value) {
        setProperty("statusFailed", value);
    }

    public java.lang.String getStatusUploaded() {
        return (java.lang.String)getProperty("statusUploaded");
    }

    public void setStatusUploaded(java.lang.String value) {
        setProperty("statusUploaded", value);
    }

    public java.lang.String getStatusUploading() {
        return (java.lang.String)getProperty("statusUploading");
    }

    public void setStatusUploading(java.lang.String value) {
        setProperty("statusUploading", value);
    }

    public java.lang.String getUploadSelectedFiles() {
        return (java.lang.String)getProperty("uploadSelectedFiles");
    }

    public void setUploadSelectedFiles(java.lang.String value) {
        setProperty("uploadSelectedFiles", value);
    }

//<< Attributes

}
