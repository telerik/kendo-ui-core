package com.kendoui.taglib;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.spy;
import java.io.IOException;

import org.junit.Before;
import org.junit.Test;

public class UploadTagTest {
    private UploadTag tag;
    
    @Before
    public void setUp() throws IOException {
        tag = spy(new UploadTag());

        tag.setName("foo");
    }
    
    @Test
    public void createElementCreatesInputElement() throws IOException {
        assertEquals("<input id=\"foo\" name=\"foo\" type=\"file\" />", tag.html().outerHtml());         
    }
}