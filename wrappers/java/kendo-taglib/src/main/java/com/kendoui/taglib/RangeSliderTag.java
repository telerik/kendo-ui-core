
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

    public int getLargeStep() {
        return (int)getProperty("largeStep");
    }

    public void setLargeStep(int value) {
        setProperty("largeStep", value);
    }

    public int getMax() {
        return (int)getProperty("max");
    }

    public void setMax(int value) {
        setProperty("max", value);
    }

    public int getMin() {
        return (int)getProperty("min");
    }

    public void setMin(int value) {
        setProperty("min", value);
    }

    public String getOrientation() {
        return (String)getProperty("orientation");
    }

    public void setOrientation(String value) {
        setProperty("orientation", value);
    }

    public int getSelectionEnd() {
        return (int)getProperty("selectionEnd");
    }

    public void setSelectionEnd(int value) {
        setProperty("selectionEnd", value);
    }

    public int getSelectionStart() {
        return (int)getProperty("selectionStart");
    }

    public void setSelectionStart(int value) {
        setProperty("selectionStart", value);
    }

    public int getSmallStep() {
        return (int)getProperty("smallStep");
    }

    public void setSmallStep(int value) {
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
