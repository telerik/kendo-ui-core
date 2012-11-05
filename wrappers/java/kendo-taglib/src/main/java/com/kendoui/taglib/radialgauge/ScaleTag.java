
package com.kendoui.taglib.radialgauge;

import com.kendoui.taglib.BaseTag;

import com.kendoui.taglib.RadialGaugeTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ScaleTag extends BaseTag /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        RadialGaugeTag parent = (RadialGaugeTag)findParentWithClass(RadialGaugeTag.class);


        parent.setScale(this);

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
        return "radialGauge-scale";
    }

    public void setLabels(ScaleLabelsTag value) {
        setProperty("labels", value);
    }

    public void setMajorTicks(ScaleMajorTicksTag value) {
        setProperty("majorTicks", value);
    }

    public void setMinorTicks(ScaleMinorTicksTag value) {
        setProperty("minorTicks", value);
    }

    public float getEndAngle() {
        return (float)getProperty("endAngle");
    }

    public void setEndAngle(float value) {
        setProperty("endAngle", value);
    }

    public float getMajorUnit() {
        return (float)getProperty("majorUnit");
    }

    public void setMajorUnit(float value) {
        setProperty("majorUnit", value);
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

    public float getMinorUnit() {
        return (float)getProperty("minorUnit");
    }

    public void setMinorUnit(float value) {
        setProperty("minorUnit", value);
    }

    public Object getRanges() {
        return (Object)getProperty("ranges");
    }

    public void setRanges(Object value) {
        setProperty("ranges", value);
    }

    public boolean getReverse() {
        return (boolean)getProperty("reverse");
    }

    public void setReverse(boolean value) {
        setProperty("reverse", value);
    }

    public float getStartAngle() {
        return (float)getProperty("startAngle");
    }

    public void setStartAngle(float value) {
        setProperty("startAngle", value);
    }

//<< Attributes

}
