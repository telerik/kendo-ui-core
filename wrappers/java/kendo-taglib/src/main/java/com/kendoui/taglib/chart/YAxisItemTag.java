
package com.kendoui.taglib.chart;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class YAxisItemTag extends  BaseTag  /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag

        YAxisTag parent = (YAxisTag)findParentWithClass(YAxisTag.class);

        parent.addYAxisItem(this);

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
        return "chart-yAxisItem";
    }

    public void setLabels(YAxisItemLabelsTag value) {
        setProperty("labels", value);
    }

    public String getType() {
        return (String)getProperty("type");
    }

    public void setType(String value) {
        setProperty("type", value);
    }

    public String getBaseUnit() {
        return (String)getProperty("baseUnit");
    }

    public void setBaseUnit(String value) {
        setProperty("baseUnit", value);
    }

    public float getMajorUnit() {
        return (float)getProperty("majorUnit");
    }

    public void setMajorUnit(float value) {
        setProperty("majorUnit", value);
    }

    public Object getMax() {
        return (Object)getProperty("max");
    }

    public void setMax(Object value) {
        setProperty("max", value);
    }

    public Object getMin() {
        return (Object)getProperty("min");
    }

    public void setMin(Object value) {
        setProperty("min", value);
    }

    public float getMinorUnit() {
        return (float)getProperty("minorUnit");
    }

    public void setMinorUnit(float value) {
        setProperty("minorUnit", value);
    }

    public Object getAxisCrossingValue() {
        return (Object)getProperty("axisCrossingValue");
    }

    public void setAxisCrossingValue(Object value) {
        setProperty("axisCrossingValue", value);
    }

//<< Attributes

}
