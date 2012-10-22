
package com.kendoui.taglib;


import com.kendoui.taglib.slider.*;


import com.kendoui.taglib.json.Function;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class SliderTag extends WidgetTag /* interfaces *//* interfaces */ {

    public SliderTag() {
        super("Slider");
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
        return "slider";
    }

    public void setChange(ChangeTag value) {
        setEvent("change", value.getBody());
    }

    public void setSlide(SlideTag value) {
        setEvent("slide", value.getBody());
    }

    public void setTooltip(TooltipTag value) {
        setProperty("tooltip", value);
    }

    public String getDecreaseButtonTitle() {
        return (String)getProperty("decreaseButtonTitle");
    }

    public void setDecreaseButtonTitle(String value) {
        setProperty("decreaseButtonTitle", value);
    }

    public String getIncreaseButtonTitle() {
        return (String)getProperty("increaseButtonTitle");
    }

    public void setIncreaseButtonTitle(String value) {
        setProperty("increaseButtonTitle", value);
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

    public boolean getShowButtons() {
        return (boolean)getProperty("showButtons");
    }

    public void setShowButtons(boolean value) {
        setProperty("showButtons", value);
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

    public float getValue() {
        return (float)getProperty("value");
    }

    public void setValue(float value) {
        setProperty("value", value);
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
