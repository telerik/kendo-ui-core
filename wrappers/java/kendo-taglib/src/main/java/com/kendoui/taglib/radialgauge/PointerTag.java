
package com.kendoui.taglib.radialgauge;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.kendoui.taglib.BaseTag;
import com.kendoui.taglib.RadialGaugeTag;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class PointerTag extends BaseTag /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        RadialGaugeTag parent = (RadialGaugeTag)findParentWithClass(RadialGaugeTag.class);


        parent.setPointer(this);

//<< doEndTag

        return super.doEndTag();
    }

    @Override
    public void initialize() {
//>> initialize

        pointer = new ArrayList<Map<String, Object>>();

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

    private List<Map<String, Object>> pointer;

    public List<Map<String, Object>> pointer() {
        return pointer;
    }

    public static String tagName() {
        return "radialGauge-pointer";
    }

    public void addPointerItem(PointerItemTag value) {
        pointer.add(value.properties());
    }

//<< Attributes

}
