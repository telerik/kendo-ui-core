package com.kendoui.taglib;

import static org.mockito.Mockito.*;
import static org.junit.Assert.*;

import javax.servlet.jsp.JspException;

import org.junit.Before;
import org.junit.Test;

public class EventTagTest {
    private EventTag tag;

    @Before
    public void setUp() {
        tag = new EventTag();
    }

    @Test
    public void doEndTagSetsEvent() throws JspException {
        WidgetTag widget = mock(WidgetTag.class);

        tag.setName("foo");
        tag.setBody("bar");

        tag.setParent(widget);

        tag.doEndTag();

        verify(widget).setEvent("foo", "bar");
    }

    @Test
    public void setBodyStripsScriptTags() throws JspException {
        tag.setBody("\n    <script>\n\n foo \n\n</script>    \n");

        assertEquals("foo", tag.getBody());
    }

    @Test
    public void setBodyStripsScriptTagAttributes() throws JspException {
        tag.setBody("\n    <script type=\"text/javacscript\">\n\n foo \n\n</script>    \n");

        assertEquals("foo", tag.getBody());
    }
}
