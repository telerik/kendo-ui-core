
package com.kendoui.taglib.chart;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class CategoryAxisItemTag extends  BaseTag  /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag

        CategoryAxisTag parent = (CategoryAxisTag)findParentWithClass(CategoryAxisTag.class);

        parent.addCategoryAxisItem(this);

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
        return "chart-categoryAxisItem";
    }

    public void setLabels(com.kendoui.taglib.chart.CategoryAxisItemLabelsTag value) {
        setProperty("labels", value);
    }

    public void setLine(com.kendoui.taglib.chart.CategoryAxisItemLineTag value) {
        setProperty("line", value);
    }

    public void setMajorGridLines(com.kendoui.taglib.chart.CategoryAxisItemMajorGridLinesTag value) {
        setProperty("majorGridLines", value);
    }

    public void setMajorTicks(com.kendoui.taglib.chart.CategoryAxisItemMajorTicksTag value) {
        setProperty("majorTicks", value);
    }

    public void setMinorGridLines(com.kendoui.taglib.chart.CategoryAxisItemMinorGridLinesTag value) {
        setProperty("minorGridLines", value);
    }

    public void setMinorTicks(com.kendoui.taglib.chart.CategoryAxisItemMinorTicksTag value) {
        setProperty("minorTicks", value);
    }

    public void setPlotBands(CategoryAxisItemPlotBandsTag value) {

        setProperty("plotBands", value.plotBands());

    }

    public void setTitle(com.kendoui.taglib.chart.CategoryAxisItemTitleTag value) {
        setProperty("title", value);
    }

    public Object getAutoBaseUnitSteps() {
        return (Object)getProperty("autoBaseUnitSteps");
    }

    public void setAutoBaseUnitSteps(Object value) {
        setProperty("autoBaseUnitSteps", value);
    }

    public Object getAxisCrossingValue() {
        return (Object)getProperty("axisCrossingValue");
    }

    public void setAxisCrossingValue(Object value) {
        setProperty("axisCrossingValue", value);
    }

    public String getBaseUnit() {
        return (String)getProperty("baseUnit");
    }

    public void setBaseUnit(String value) {
        setProperty("baseUnit", value);
    }

    public Object getBaseUnitStep() {
        return (Object)getProperty("baseUnitStep");
    }

    public void setBaseUnitStep(Object value) {
        setProperty("baseUnitStep", value);
    }

    public Object getCategories() {
        return (Object)getProperty("categories");
    }

    public void setCategories(Object value) {
        setProperty("categories", value);
    }

    public String getColor() {
        return (String)getProperty("color");
    }

    public void setColor(String value) {
        setProperty("color", value);
    }

    public String getField() {
        return (String)getProperty("field");
    }

    public void setField(String value) {
        setProperty("field", value);
    }

    public boolean getJustified() {
        return (boolean)getProperty("justified");
    }

    public void setJustified(boolean value) {
        setProperty("justified", value);
    }

    public Object getMax() {
        return (Object)getProperty("max");
    }

    public void setMax(Object value) {
        setProperty("max", value);
    }

    public float getMaxDateGroups() {
        return (float)getProperty("maxDateGroups");
    }

    public void setMaxDateGroups(float value) {
        setProperty("maxDateGroups", value);
    }

    public Object getMin() {
        return (Object)getProperty("min");
    }

    public void setMin(Object value) {
        setProperty("min", value);
    }

    public String getName() {
        return (String)getProperty("name");
    }

    public void setName(String value) {
        setProperty("name", value);
    }

    public String getPane() {
        return (String)getProperty("pane");
    }

    public void setPane(String value) {
        setProperty("pane", value);
    }

    public boolean getReverse() {
        return (boolean)getProperty("reverse");
    }

    public void setReverse(boolean value) {
        setProperty("reverse", value);
    }

    public boolean getRoundToBaseUnit() {
        return (boolean)getProperty("roundToBaseUnit");
    }

    public void setRoundToBaseUnit(boolean value) {
        setProperty("roundToBaseUnit", value);
    }

    public String getType() {
        return (String)getProperty("type");
    }

    public void setType(String value) {
        setProperty("type", value);
    }

    public boolean getVisible() {
        return (boolean)getProperty("visible");
    }

    public void setVisible(boolean value) {
        setProperty("visible", value);
    }

    public float getWeekStartDay() {
        return (float)getProperty("weekStartDay");
    }

    public void setWeekStartDay(float value) {
        setProperty("weekStartDay", value);
    }

//<< Attributes

}
