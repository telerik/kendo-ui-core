package com.kendoui.taglib.html;

import static org.junit.Assert.*;

import java.io.IOException;

import org.junit.Before;
import org.junit.Test;

public class DivTest {
    private Div div;

    @Before
    public void setUp() {
        div = new Div();
    }

    @Test
    public void outerHtmlOutputsInputElement() throws IOException {
        assertEquals("<div></div>", div.outerHtml());
    }
}
