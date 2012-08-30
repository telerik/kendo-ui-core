package com.kendoui.taglib.json;

import java.beans.IntrospectionException;
import java.beans.Introspector;
import java.beans.PropertyDescriptor;

import java.io.IOException;
import java.io.StringWriter;
import java.io.Writer;

import java.lang.reflect.Array;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import java.util.Map.Entry;

public class Serializer {

    private Map<String, Object> options(Object object) {
        Map<String, Object> options = new HashMap<String, Object>();

        try {
            for (PropertyDescriptor property : Introspector.getBeanInfo(object.getClass(), Object.class).getPropertyDescriptors()) {
                Method getter = property.getReadMethod();

                if (getter != null) {
                    options.put(property.getName(), getter.invoke(object));
                }
            }
        } catch (IntrospectionException e) {
        } catch (IllegalAccessException e) {
        } catch (IllegalArgumentException e) {
        } catch (InvocationTargetException e) {
        }

        return options;
    }

    private void quote(Writer out, String string) throws IOException {
        char ch = 0;

        out.append("\"");

        for (int index = 0, length = string.length(); index < length; index++) {
            char previous = ch;
            ch = string.charAt(index);

            switch (ch) {
                case '\\':
                case '"':
                    out.append("\\")
                       .append(ch);
                    break;
                case '/':
                    if (previous == '<') {
                        out.append("\\");
                    }
                    out.append(ch);
                    break;
                case '\b':
                    out.append("\\b");
                    break;
                case '\n':
                    out.append("\\n");
                    break;
                case '\r':
                    out.append("\\r");
                    break;
                case '\f':
                    out.append("\\f");
                    break;
                case '\t':
                    out.append("\\t");
                    break;
                default:
                    if (ch < ' ' || (ch >= '\u0080' && ch < '\u00a0') || (ch >= '\u2000' && ch < '\u2100')) {
                        String hex = "000" + Integer.toHexString(ch);

                        out.append("\\u")
                           .append(hex.substring(hex.length() - 4));
                    } else {
                        out.append(ch);
                    }
                    break;
            }
        }

        out.append("\"");
    }

    public void serialize(Writer out, Object object) throws IOException {
        serializeMap(out, options(object));
    }

    private void serializeValue(Writer out, Object value) throws IOException {
        if (value instanceof String) {
            quote(out, (String)value);
        } else if (value instanceof Number) {
            out.append(value.toString());
        } else if (value instanceof Collection<?>) {
            serializeCollection(out, (Collection<?>)value);
        } else if (value instanceof Map<?,?>) {
            serializeMap(out, (Map<?,?>)value);
        } else if (value.getClass().isArray()) {
            serializeArray(out, value);
        } else {
            serialize(out, value);
        }
    }

    private void serializeMap(Writer out, Map<?,?> map) throws IOException {
        out.append("{");

        Iterator<?> iterator =  map.entrySet().iterator();

        while (iterator.hasNext()) {
            Entry<?,?> entry = (Entry<?,?>)iterator.next();

            out.append("\"")
               .append(entry.getKey().toString())
               .append("\":");

            serializeValue(out, entry.getValue());

            if (iterator.hasNext()) {
                out.append(",");
            }
        }

        out.append("}");
    }

    private void serializeCollection(Writer out, Collection<?> collection) throws IOException {
        out.append("[");

        Iterator<?> iterator = collection.iterator();

        while (iterator.hasNext()) {
            serializeValue(out, iterator.next());

            if (iterator.hasNext()) {
                out.append(",");
            }
        }

        out.append("]");
    }

    private void serializeArray(Writer out, Object array) throws IOException {
        out.append("[");

        for (int index = 0, length = Array.getLength(array); index < length; index++) {
            serializeValue(out, Array.get(array, index));

            if (index < length - 1) {
                out.append(",");
            }
        }

        out.append("]");
    }

    public String json(Object object) throws IOException {
        StringWriter out = new StringWriter();

        serialize(out, object);

        return out.toString();
    }
}
