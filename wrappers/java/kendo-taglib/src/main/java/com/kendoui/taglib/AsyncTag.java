
package com.kendoui.taglib;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class AsyncTag extends BaseTag /* interfaces *//* interfaces */ {

//>> Attributes

    @Override
    public int doEndTag() throws JspException {
        Async parent = (Async)findParentWithClass(Async.class);

        parent.setAsync(this);

        return EVAL_PAGE;
    }

    public boolean getAutoUpload() {
        return (boolean)getProperty("autoUpload");
    }

    public void setAutoUpload(boolean value) {
        setProperty("autoUpload", value);
    }

    public boolean getBatch() {
        return (boolean)getProperty("batch");
    }

    public void setBatch(boolean value) {
        setProperty("batch", value);
    }

    public String getRemoveField() {
        return (String)getProperty("removeField");
    }

    public void setRemoveField(String value) {
        setProperty("removeField", value);
    }

    public String getRemoveUrl() {
        return (String)getProperty("removeUrl");
    }

    public void setRemoveUrl(String value) {
        setProperty("removeUrl", value);
    }

    public String getRemoveVerb() {
        return (String)getProperty("removeVerb");
    }

    public void setRemoveVerb(String value) {
        setProperty("removeVerb", value);
    }

    public String getSaveField() {
        return (String)getProperty("saveField");
    }

    public void setSaveField(String value) {
        setProperty("saveField", value);
    }

    public String getSaveUrl() {
        return (String)getProperty("saveUrl");
    }

    public void setSaveUrl(String value) {
        setProperty("saveUrl", value);
    }

//<< Attributes
}
