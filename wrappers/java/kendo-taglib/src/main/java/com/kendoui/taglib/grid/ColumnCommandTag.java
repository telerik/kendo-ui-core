
package com.kendoui.taglib.grid;


import com.kendoui.taglib.BaseTag;




import java.util.ArrayList;
import java.util.Map;
import java.util.List;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ColumnCommandTag extends BaseTag /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        ColumnTag parent = (ColumnTag)findParentWithClass(ColumnTag.class);


        parent.setCommand(this);

//<< doEndTag

        return super.doEndTag();
    }

    @Override
    public void initialize() {
//>> initialize

        command = new ArrayList<Map<String, Object>>();

//<< initialize

        super.initialize();
    }

    @Override
    public void destroy() {
//>> destroy

        command = null;

//<< destroy

        super.destroy();
    }

//>> Attributes

    private List<Map<String, Object>> command;

    public List<Map<String, Object>> command() {
        return command;
    }

    public static String tagName() {
        return "grid-column-command";
    }

    public void addCommandItem(CommandItemTag value) {
        command.add(value.properties());
    }

//<< Attributes

}
