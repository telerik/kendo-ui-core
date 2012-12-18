
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

    public void setHighlight(NavigatorSeriesItemHighlightTag value) {
        setProperty("highlight", value);
    }

    public void setBorder(NavigatorSeriesItemBorderTag value) {
        setProperty("border", value);
    }

    public void setLine(NavigatorSeriesItemLineTag value) {
        setProperty("line", value);
    }

    public void setLabels(NavigatorSeriesItemLabelsTag value) {
        setProperty("labels", value);
    }

    public void setMarkers(NavigatorSeriesItemMarkersTag value) {
        setProperty("markers", value);
    }

    public void setOverlay(NavigatorSeriesItemOverlayTag value) {
        setProperty("overlay", value);
    }

    public void setTooltip(NavigatorSeriesItemTooltipTag value) {
        setProperty("tooltip", value);
    }

    public String getType() {
        return (String)getProperty("type");
    }

    public void setType(String value) {
        setProperty("type", value);
    }

    public String getDashType() {
        return (String)getProperty("dashType");
    }

    public void setDashType(String value) {
        setProperty("dashType", value);
    }

    public Object getData() {
        return (Object)getProperty("data");
    }

    public void setData(Object value) {
        setProperty("data", value);
    }

    public String getHighField() {
        return (String)getProperty("highField");
    }

    public void setHighField(String value) {
        setProperty("highField", value);
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

    public String getCloseField() {
        return (String)getProperty("closeField");
    }

    public void setCloseField(String value) {
        setProperty("closeField", value);
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

    public String getDownColor() {
        return (String)getProperty("downColor");
    }

    public void setDownColor(String value) {
        setProperty("downColor", value);
    }

    public String getDownColorField() {
        return (String)getProperty("downColorField");
    }

    public void setDownColorField(String value) {
        setProperty("downColorField", value);
    }

    public float getGap() {
        return (float)getProperty("gap");
    }

    public void setGap(float value) {
        setProperty("gap", value);
    }

    public String getLine() {
        return (String)getProperty("line");
    }

    public void setLine(String value) {
        setProperty("line", value);
    }

    public String getLowField() {
        return (String)getProperty("lowField");
    }

    public void setLowField(String value) {
        setProperty("lowField", value);
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

    public String getOpenField() {
        return (String)getProperty("openField");
    }

    public void setOpenField(String value) {
        setProperty("openField", value);
    }

    public float getSpacing() {
        return (float)getProperty("spacing");
    }

    public void setSpacing(float value) {
        setProperty("spacing", value);
    }

    public boolean getStack() {
        return (boolean)getProperty("stack");
    }

    public void setStack(boolean value) {
        setProperty("stack", value);
    }

    public float getWidth() {
        return (float)getProperty("width");
    }

    public void setWidth(float value) {
        setProperty("width", value);
    }

//<< Attributes

}
