
package com.kendoui.taglib;


import com.kendoui.taglib.upload.*;


import com.kendoui.taglib.json.Function;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class UploadTag extends WidgetTag /* interfaces */implements Async, Localization/* interfaces */ {

    public UploadTag() {
        super("Upload");
    }

    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag
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
        return "upload";
    }

    @Override
    public void setAsync(AsyncTag value) {
        setProperty("async", value.properties());
    }

    @Override
    public void setLocalization(LocalizationTag value) {
        setProperty("localization", value.properties());
    }

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
