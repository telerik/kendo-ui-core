
package com.kendoui.taglib.pivotdatasource;


import com.kendoui.taglib.BaseTag;
import com.kendoui.taglib.DataSourceTag;



import com.kendoui.taglib.PivotDataSourceTag;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.List;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class MeasuresTag extends BaseTag /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag

        PivotDataSourceTag parent = (PivotDataSourceTag)findParentWithClass(DataSourceTag.class);

        parent.setMeasures(this);

//<< doEndTag

        return super.doEndTag();
    }

    @Override
    public void initialize() {
//>> initialize

        measures = new ArrayList<String>();

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

    private List<String> measures;

    public Map<String, Object> measures() {
        return new HashMap<String, Object>() {{
            put("values", measures);
            put("axis", getAxis());
          }};
    }

    public static String tagName() {
        return "pivotDataSource-measures";
    }

    public void addMeasure(MeasureTag value) {
        measures.add(value.getName());
    }

    public java.lang.String getAxis() {
        return (java.lang.String)getProperty("axis");
    }

    public void setAxis(java.lang.String value) {
        setProperty("axis", value);
    }
//<< Attributes

}
