
package com.kendoui.taglib.chart;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class SeriesBubbleTag extends  BaseTag  /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag

        SeriesTag parent = (SeriesTag)findParentWithClass(SeriesTag.class);

        parent.addBubble(this);

//<< doEndTag

        return super.doEndTag();
    }

    @Override
    public void initialize() {
//>> initialize
//<< initialize
        setProperty("type", "bubble");
        
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
        return "chart-series-bubble";
    }

    public void setBorder(BubbleBorderTag value) {
        setProperty("border", value);
    }

    public void setLabels(BubbleLabelsTag value) {
        setProperty("labels", value);
    }

    public void setNegativeValues(BubbleNegativeValuesTag value) {
        setProperty("negativevalues", value);
    }

    public void setTooltip(BubbleTooltipTag value) {
        setProperty("tooltip", value);
    }

    public Object getData() {
        return (Object)getProperty("data");
    }

    public void setData(Object value) {
        setProperty("data", value);
    }

    public String getField() {
        return (String)getProperty("field");
    }

    public void setField(String value) {
        setProperty("field", value);
    }

    public String getGroupNameTemplate() {
        return (String)getProperty("groupNameTemplate");
    }

    public void setGroupNameTemplate(String value) {
        setProperty("groupNameTemplate", value);
    }

    public String getName() {
        return (String)getProperty("name");
    }

    public void setName(String value) {
        setProperty("name", value);
    }

    public String getCategoryField() {
        return (String)getProperty("categoryField");
    }

    public void setCategoryField(String value) {
        setProperty("categoryField", value);
    }

    public String getColor() {
        return (String)getProperty("color");
    }

    public void setColor(String value) {
        setProperty("color", value);
    }

    public String getColorField() {
        return (String)getProperty("colorField");
    }

    public void setColorField(String value) {
        setProperty("colorField", value);
    }

    public float getMaxSize() {
        return (float)getProperty("maxSize");
    }

    public void setMaxSize(float value) {
        setProperty("maxSize", value);
    }

    public float getMinSize() {
        return (float)getProperty("minSize");
    }

    public void setMinSize(float value) {
        setProperty("minSize", value);
    }

    public float getOpacity() {
        return (float)getProperty("opacity");
    }

    public void setOpacity(float value) {
        setProperty("opacity", value);
    }

    public String getSizeField() {
        return (String)getProperty("sizeField");
    }

    public void setSizeField(String value) {
        setProperty("sizeField", value);
    }

    public String getVisibleInLegendField() {
        return (String)getProperty("visibleInLegendField");
    }

    public void setVisibleInLegendField(String value) {
        setProperty("visibleInLegendField", value);
    }

    public String getXAxis() {
        return (String)getProperty("xAxis");
    }

    public void setXAxis(String value) {
        setProperty("xAxis", value);
    }

    public String getXField() {
        return (String)getProperty("xField");
    }

    public void setXField(String value) {
        setProperty("xField", value);
    }

    public String getYAxis() {
        return (String)getProperty("yAxis");
    }

    public void setYAxis(String value) {
        setProperty("yAxis", value);
    }

    public String getYField() {
        return (String)getProperty("yField");
    }

    public void setYField(String value) {
        setProperty("yField", value);
    }

//<< Attributes

}
