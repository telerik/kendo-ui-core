
package com.kendoui.taglib;


import com.kendoui.taglib.upload.*;


import com.kendoui.taglib.json.Function;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class UploadTag extends WidgetTag /* interfaces *//* interfaces */ {

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

    public void setAsync(AsyncTag value) {
        setProperty("async", value);
    }

    public void setLocalization(LocalizationTag value) {
        setProperty("localization", value);
    }

    public void setCancel(CancelFunctionTag value) {
        setEvent("cancel", value.getBody());
    }

    public void setComplete(CompleteFunctionTag value) {
        setEvent("complete", value.getBody());
    }

    public void setError(ErrorFunctionTag value) {
        setEvent("error", value.getBody());
    }

    public void setProgress(ProgressFunctionTag value) {
        setEvent("progress", value.getBody());
    }

    public void setRemove(RemoveFunctionTag value) {
        setEvent("remove", value.getBody());
    }

    public void setSelect(SelectFunctionTag value) {
        setEvent("select", value.getBody());
    }

    public void setSuccess(SuccessFunctionTag value) {
        setEvent("success", value.getBody());
    }

    public void setUpload(UploadFunctionTag value) {
        setEvent("upload", value.getBody());
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
        Function property = ((Function)getProperty("cancel"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setCancel(String value) {
        setProperty("cancel", new Function(value));
    }

    public String getComplete() {
        Function property = ((Function)getProperty("complete"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setComplete(String value) {
        setProperty("complete", new Function(value));
    }

    public String getError() {
        Function property = ((Function)getProperty("error"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setError(String value) {
        setProperty("error", new Function(value));
    }

    public String getProgress() {
        Function property = ((Function)getProperty("progress"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setProgress(String value) {
        setProperty("progress", new Function(value));
    }

    public String getRemove() {
        Function property = ((Function)getProperty("remove"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setRemove(String value) {
        setProperty("remove", new Function(value));
    }

    public String getSelect() {
        Function property = ((Function)getProperty("select"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setSelect(String value) {
        setProperty("select", new Function(value));
    }

    public String getSuccess() {
        Function property = ((Function)getProperty("success"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setSuccess(String value) {
        setProperty("success", new Function(value));
    }

    public String getUpload() {
        Function property = ((Function)getProperty("upload"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setUpload(String value) {
        setProperty("upload", new Function(value));
    }

//<< Attributes

}
