package com.kendoui.taglib;

import com.kendoui.taglib.json.Function;

@SuppressWarnings("serial")
public class SliderTag extends WidgetTag /* interfaces */implements Tooltip/* interfaces */ {
    public SliderTag() {
        super("Slider");
    }

    //>> Attributes

    @Override
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

    public boolean getShowButtons() {
        return (boolean)getProperty("showButtons");
    }

    public void setShowButtons(boolean value) {
        setProperty("showButtons", value);
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

    public int getValue() {
        return (int)getProperty("value");
    }

    public void setValue(int value) {
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