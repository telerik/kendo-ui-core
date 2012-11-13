
package com.kendoui.taglib.stockchart;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class NavigatorSeriesItemTag extends  BaseTag  /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag

        NavigatorSeriesTag parent = (NavigatorSeriesTag)findParentWithClass(NavigatorSeriesTag.class);

        parent.addSeriesItem(this);

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
        return "stockChart-navigator-seriesItem";
    }

    public void setLabels(NavigatorSeriesItemLabelsTag value) {
        setProperty("labels", value);
    }

    public void setBorder(NavigatorSeriesItemBorderTag value) {
        setProperty("border", value);
    }

    public void setMarkers(NavigatorSeriesItemMarkersTag value) {
        setProperty("markers", value);
    }

    public void setTooltip(NavigatorSeriesItemTooltipTag value) {
        setProperty("tooltip", value);
    }

    public void setLine(NavigatorSeriesItemLineTag value) {
        setProperty("line", value);
    }

    public void setOverlay(NavigatorSeriesItemOverlayTag value) {
        setProperty("overlay", value);
    }

    public String getType() {
        return (String)getProperty("type");
    }

    public void setType(String value) {
        setProperty("type", value);
    }

    public Object get() {
        return (Object)getProperty("");
    }

    public void set(Object value) {
        setProperty("", value);
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

    public String getAggregate() {
        return (String)getProperty("aggregate");
    }

    public void setAggregate(String value) {
        setProperty("aggregate", value);
    }

    public String getAxis() {
        return (String)getProperty("axis");
    }

    public void setAxis(String value) {
        setProperty("axis", value);
    }

    public String getColor() {
        return (String)getProperty("color");
    }

    public void setColor(String value) {
        setProperty("color", value);
    }

    public String getDashType() {
        return (String)getProperty("dashType");
    }

    public void setDashType(String value) {
        setProperty("dashType", value);
    }

    public String getMissingValues() {
        return (String)getProperty("missingValues");
    }

    public void setMissingValues(String value) {
        setProperty("missingValues", value);
    }

    public float getOpacity() {
        return (float)getProperty("opacity");
    }

    public void setOpacity(float value) {
        setProperty("opacity", value);
    }

    public String getWidth() {
        return (String)getProperty("width");
    }

    public void setWidth(String value) {
        setProperty("width", value);
    }

    public String getLine() {
        return (String)getProperty("line");
    }

    public void setLine(String value) {
        setProperty("line", value);
    }

    public String getColorField() {
        return (String)getProperty("colorField");
    }

    public void setColorField(String value) {
        setProperty("colorField", value);
    }

    public float getGap() {
        return (float)getProperty("gap");
    }

    public void setGap(float value) {
        setProperty("gap", value);
    }

    public float getSpacing() {
        return (float)getProperty("spacing");
    }

    public void setSpacing(float value) {
        setProperty("spacing", value);
    }

    public String getStack() {
        return (String)getProperty("stack");
    }

    public void setStack(String value) {
        setProperty("stack", value);
    }

//<< Attributes

}
