
package com.kendoui.taglib;


import com.kendoui.taglib.rangeslider.*;


import com.kendoui.taglib.json.Function;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class RangeSliderTag extends WidgetTag /* interfaces */implements Tooltip/* interfaces */ {

    public RangeSliderTag() {
        super("RangeSlider");
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

    @Override
    public void setTooltip(TooltipTag value) {
        setProperty("tooltip", value.properties());
    }

    public float getLargeStep() {
        return (float)getProperty("largeStep");
    }

    public void setLargeStep(float value) {
        setProperty("largeStep", value);
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

    public String getOrientation() {
        return (String)getProperty("orientation");
    }

    public void setOrientation(String value) {
        setProperty("orientation", value);
    }

    public float getSelectionEnd() {
        return (float)getProperty("selectionEnd");
    }

    public void setSelectionEnd(float value) {
        setProperty("selectionEnd", value);
    }

    public float getSelectionStart() {
        return (float)getProperty("selectionStart");
    }

    public void setSelectionStart(float value) {
        setProperty("selectionStart", value);
    }

    public float getSmallStep() {
        return (float)getProperty("smallStep");
    }

    public void setSmallStep(float value) {
        setProperty("smallStep", value);
    }

    public String getTickPlacement() {
        return (String)getProperty("tickPlacement");
    }

    public void setTickPlacement(String value) {
        setProperty("tickPlacement", value);
    }

    public String getChange() {
        return ((Function)getProperty("change")).getBody();
    }

    public void setChange(String value) {
        setProperty("change", new Function(value));
    }

    public String getSlide() {
        return ((Function)getProperty("slide")).getBody();
    }

    public void setSlide(String value) {
        setProperty("slide", new Function(value));
    }

//<< Attributes

}
