package com.kendoui.taglib.json;

import java.io.IOException;
import java.io.Writer;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Date;
import java.util.Calendar;

import static org.junit.Assert.*;
import org.junit.Before;
import org.junit.Test;

import static org.mockito.Mockito.*;

public class SerializerTest {
    Serializer serializer;

    @Before
    public void setUp() {
        serializer = new Serializer();
    }

    @Test
    public void serializeOutputsOpeningBrace() throws IOException {
        Writer out = mock(Writer.class);

        serializer.serialize(out, new Object());

        verify(out).append("{");
    }

    @Test
    public void serializeOutputsClosingBrace() throws IOException {
        Writer writer = mock(Writer.class);

        serializer.serialize(writer, new Object());

        verify(writer).append("}");
    }

    @Test
    public void jsonReturnsSerializedObject() throws IOException {
        assertEquals("{}", serializer.json(new Object()));
    }

    @Test
    public void jsonSerializesKeyValuePairForGetter() throws IOException {
        assertEquals("{\"foo\":1}", serializer.json(new Object() {
            @SuppressWarnings("unused")
            public int getFoo() {
                return 1;
            }
        }));
    }

    @Test
    public void jsonSerializesCommaSeparatedKeyValuePairsForTheGetters() throws IOException {
        assertEquals("{\"foo\":1,\"bar\":2}", serializer.json(new Object() {
            @SuppressWarnings("unused")
            public int getFoo() {
                return 1;
            }

            @SuppressWarnings("unused")
            public int getBar() {
                return 2;
            }
        }));
    }

    @Test
    public void jsonQuotesStrings() throws IOException {
        assertEquals("{\"foo\":\"foo\"}", serializer.json(new Object() {
            @SuppressWarnings("unused")
            public String getFoo() {
                return "foo";
            }
        }));
    }

    @Test
    public void jsonEscapesQuotes() throws IOException {
        assertEquals("{\"foo\":\"\\\"\"}", serializer.json(new Object() {
            @SuppressWarnings("unused")
            public String getFoo() {
                return "\"";
            }
        }));
    }

    @Test
    public void jsonEscapesBackSlash() throws IOException {
        assertEquals("{\"foo\":\"\\\\\"}", serializer.json(new Object() {
            @SuppressWarnings("unused")
            public String getFoo() {
                return "\\";
            }
        }));
    }

    @Test
    public void jsonEscapesCarriageReturn() throws IOException {
        assertEquals("{\"foo\":\"\\r\"}", serializer.json(new Object() {
            @SuppressWarnings("unused")
            public String getFoo() {
                return "\r";
            }
        }));
    }

    @Test
    public void jsonEscapesLineFeed() throws IOException {
        assertEquals("{\"foo\":\"\\n\"}", serializer.json(new Object() {
            @SuppressWarnings("unused")
            public String getFoo() {
                return "\n";
            }
        }));
    }

    @Test
    public void jsonEscapesBell() throws IOException {
        assertEquals("{\"foo\":\"\\b\"}", serializer.json(new Object() {
            @SuppressWarnings("unused")
            public String getFoo() {
                return "\b";
            }
        }));
    }

    @Test
    public void jsonEscapesTab() throws IOException {
        assertEquals("{\"foo\":\"\\t\"}", serializer.json(new Object() {
            @SuppressWarnings("unused")
            public String getFoo() {
                return "\t";
            }
        }));
    }

    @Test
    public void jsonEscapesFormFeed() throws IOException {
        assertEquals("{\"foo\":\"\\f\"}", serializer.json(new Object() {
            @SuppressWarnings("unused")
            public String getFoo() {
                return "\f";
            }
        }));
    }

    @Test
    public void jsonEscapesSlashWhenAfterLessThan() throws IOException {
        assertEquals("{\"foo\":\"<\\/script>\"}", serializer.json(new Object() {
            @SuppressWarnings("unused")
            public String getFoo() {
                return "</script>";
            }
        }));
    }

    @Test
    public void jsonEscapesUnicodeEntities() throws IOException {
        assertEquals("{\"foo\":\"\\u2000\"}", serializer.json(new Object() {
            @SuppressWarnings("unused")
            public String getFoo() {
                return "\u2000";
            }
        }));
    }

    @Test
    public void jsonSerializesNumbers() throws IOException {
        assertEquals("{\"foo\":1.5}", serializer.json(new Object() {
            @SuppressWarnings("unused")
            public float getFoo() {
                return 1.5f;
            }
        }));
    }

    @Test
    public void jsonSerializesBooleans() throws IOException {
        assertEquals("{\"foo\":true}", serializer.json(new Object() {
            @SuppressWarnings("unused")
            public boolean getFoo() {
                return true;
            }
        }));
    }
    @Test
    public void jsonSerializesNestedObjects() throws IOException {
        assertEquals("{\"foo\":{\"bar\":\"bar\"}}", serializer.json(new Object() {
            @SuppressWarnings("unused")
            public Object getFoo() {
                return new Object() {
                    public String getBar() {
                        return "bar";
                    }
                };
            }
        }));
    }

    @Test
    public void jsonSerializesArrays() throws IOException {
        assertEquals("{\"foo\":[1,2]}", serializer.json(new Object() {
            @SuppressWarnings("unused")
            public int[] getFoo() {
                return new int[] { 1, 2 };
            }
        }));
    }

    @Test
    public void jsonSerializesCollections() throws IOException {
        assertEquals("{\"foo\":[1,2]}", serializer.json(new Object() {
            @SuppressWarnings("unused")
            public Collection<?> getFoo() {
                List<Integer> collection = new ArrayList<Integer>();

                collection.add(1);
                collection.add(2);

                return collection;
            }
        }));
    }

    @Test
    public void jsonsSerializesDates() throws IOException {
        assertEquals("{\"foo\":new Date(949359661812)}", serializer.json(new Object() {
            @SuppressWarnings("unused")
            public Date getFoo() {
                Calendar cal = Calendar.getInstance();
                
                cal.setTimeInMillis(949359661812l);
                
                return cal.getTime();
            }
        }));
    }
    @Test
    public void jsonSerializesMaps() throws IOException {
        assertEquals("{\"foo\":{\"bar\":\"bar\",\"baz\":\"baz\"}}", serializer.json(new Object() {
            @SuppressWarnings("unused")
            public Map<?,?> getFoo() {
                Map<String,String> map = new LinkedHashMap<String,String>();

                map.put("bar", "bar");
                map.put("baz", "baz");

                return map;
            }
        }));
    }

    @Test
    public void jsonSerializesSerializablesUsingTheirProperties() throws IOException {
        Serializable bag = new Serializable () {
            public Map<String,Object> properties() {
                Map<String,Object> properties = new HashMap<String, Object>();

                properties.put("foo", "foo");

                return properties;
            }
        };

        assertEquals("{\"foo\":\"foo\"}", serializer.json(bag));
    }

    @Test
    public void jsonSerializesNestedSerializables() throws IOException {
        Serializable bag = new Serializable () {
            public Map<String,Object> properties() {
                Map<String,Object> properties = new HashMap<String, Object>();

                properties.put("foo", new Serializable() {

                    public Map<String,Object> properties() {
                        Map<String,Object> properties = new HashMap<String, Object>();

                        properties.put("bar", "bar");

                        return properties;
                    }
                });

                return properties;
            }
        };

        assertEquals("{\"foo\":{\"bar\":\"bar\"}}", serializer.json(bag));
    }

    @Test
    public void jsonSerializesFunctionsAsVerbatimValue() throws IOException {
        assertEquals("{\"foo\":foo}", serializer.json(new Object() {
            @SuppressWarnings("unused")
            public Function getFoo() {
                return new Function("foo");
            }
        }));
    }
}
