package com.kendoui.taglib;

import javax.servlet.jsp.JspException;

import static org.junit.Assert.*;
import org.junit.Before;
import org.junit.Rule;

import org.junit.rules.ExpectedException;

import org.junit.Test;

public class PanelBarItemTagTest {
    private PanelBarItemTag item;

    @Rule
    public ExpectedException thrown = ExpectedException.none();

    @Before
    public void setUp() {
        item = new PanelBarItemTag();
    }

    @Test
    public void doEndTagThrowsIfNotNestedInPanelBarItemTagContainer() throws JspException {
        thrown.expect(JspException.class);
        thrown.expectMessage("The <kendo:panelBarItem> tag should be nested in a <kendo:panelBar> or <kendo:panelBarItem> tag.");

        item.doEndTag();
    }

}
