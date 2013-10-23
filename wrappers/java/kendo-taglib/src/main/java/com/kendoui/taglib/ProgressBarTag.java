
package com.kendoui.taglib;


import com.kendoui.taglib.progressbar.*;


import com.kendoui.taglib.json.Function;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ProgressBarTag extends WidgetTag /* interfaces *//* interfaces */ {

    public ProgressBarTag() {
        super("ProgressBar");
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
        return "progressBar";
    }

    public void setAnimation(com.kendoui.taglib.progressbar.AnimationTag value) {
        setProperty("animation", value);
    }

    public void setChange(ChangeFunctionTag value) {
        setEvent("change", value.getBody());
    }

    public void setComplete(CompleteFunctionTag value) {
        setEvent("complete", value.getBody());
    }

    public float getChunkCount() {
        return (float)getProperty("chunkCount");
    }

    public void setChunkCount(float value) {
        setProperty("chunkCount", value);
    }

    public boolean getEnable() {
        return (boolean)getProperty("enable");
    }

    public void setEnable(boolean value) {
        setProperty("enable", value);
    }

    public float getMax() {
        return (float)getProperty("max");
    }

    public void setMax(float value) {
        setProperty("max", value);
    }

    public float getMin() {
        return (float)getProperty("min");
    }

    public void setMin(float value) {
        setProperty("min", value);
    }

    public java.lang.String getOrientation() {
        return (java.lang.String)getProperty("orientation");
    }

    public void setOrientation(java.lang.String value) {
        setProperty("orientation", value);
    }

    public boolean getReverse() {
        return (boolean)getProperty("reverse");
    }

    public void setReverse(boolean value) {
        setProperty("reverse", value);
    }

    public boolean getShowStatus() {
        return (boolean)getProperty("showStatus");
    }

    public void setShowStatus(boolean value) {
        setProperty("showStatus", value);
    }

    public java.lang.String getType() {
        return (java.lang.String)getProperty("type");
    }

    public void setType(java.lang.String value) {
        setProperty("type", value);
    }

    public float getValue() {
        return (float)getProperty("value");
    }

    public void setValue(float value) {
        setProperty("value", value);
    }

    public String getChange() {
        Function property = ((Function)getProperty("change"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setChange(String value) {
        setProperty("change", new Function(value));
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

//<< Attributes

}
