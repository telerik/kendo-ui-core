
package com.kendoui.taglib.upload;

import com.kendoui.taglib.BaseTag;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class AsyncTag extends BaseTag /* interfaces *//* interfaces */ {

    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag

        Async parent = (Async)findParentWithClass(Async.class);

        parent.setAsync(this);

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
        return "upload-async";
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
