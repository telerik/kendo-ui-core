module CodeGen::Java::JSP

    module Options

        def component_class
            Component
        end

        def composite_option_class
            CompositeOption
        end

        def option_class
            Option
        end

        def event_class
            Event
        end

        def array_option_class
            ArrayOption
        end
    end

    class Component < CodeGen::Java::Component
        include Options

        def interfaces
            interfaces = []

            if @options.any? { |o| o.name == 'dataSource' }
                interfaces.push('DataBoundWidget')
            end

            interfaces
        end

        def implement_interfaces(java)
            implements = 'implements ' + interfaces.join(", ") if interfaces.any?

            java.sub /\/\* interfaces \*\/(.|\n)*\/\* interfaces \*\//,
                "/* interfaces */#{implements}/* interfaces */"
        end

        def to_java(filename)
            java = COMPONENT.result(binding)

            java = File.read(filename) if File.exists?(filename)

            java = implement_interfaces(java)

            java.sub(/\/\/>> Attributes(.|\n)*\/\/<< Attributes/, COMPONENT_ATTRIBUTES.result(binding))
        end
    end

    class Event < CodeGen::Java::Event
        include Options

        def to_getter_and_setter
            EVENT_GETTER_AND_SETTER.result(binding)
        end

        def to_setter
            EVENT_SETTER.result(binding)
        end

        def tag_class
            @name.pascalize + 'FunctionTag'
        end
    end

    class Option < CodeGen::Java::Option
        include Options

        def to_getter_and_setter
            return DATA_SOURCE_SETTER if @name == 'dataSource'

            OPTION_GETTER_AND_SETTER.result(binding)
        end
    end

    class CompositeOption < CodeGen::Java::CompositeOption
        include Options

        def to_setter
            COMPOSITE_OPTION_SETTER.result(binding)
        end
    end

    class ArrayOption < CompositeOption
        include CodeGen::Array

        def to_setter
            ARRAY_SETTER.result(binding)
        end
    end

    class ArrayItem < CompositeOption

    end

COMPOSITE_OPTION_SETTER = ERB.new(%{
    public void set<%= name.pascalize %>(<%= tag_class %> value) {
        setProperty("<%= name %>", value);
    }
})

OPTION_GETTER_AND_SETTER = ERB.new(%{
    public <%= java_type %> get<%= name.sub(/^[a-z]{1}[A-Z]{1}[a-zA-Z]*/){|c| c.downcase}.pascalize %>() {
        return (<%= java_type %>)getProperty("<%= name %>");
    }

    public void set<%= name.sub(/^[a-z]{1}[A-Z]{1}[a-zA-Z]*/){|c| c.downcase}.pascalize %>(<%= java_type %> value) {
        setProperty("<%= name %>", value);
    }
})

EVENT_SETTER = ERB.new(%{
    public void set<%= name.pascalize %>(<%= tag_class %> value) {
        setEvent("<%= name %>", value.getBody());
    }
})

ARRAY_SETTER = ERB.new(%{
    public void set<%= name.pascalize %>(<%= tag_class %> value) {
<% if name == 'items' %>
        <%= name %> = value.<%= name %>();
<% else %>
        setProperty("<%= name %>", value.<%= name %>());
<% end %>
    }
})
EVENT_GETTER_AND_SETTER = ERB.new(%{
    public String get<%= name.pascalize %>() {
        Function property = ((Function)getProperty("<%= name %>"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void set<%= name.pascalize %>(String value) {
        setProperty("<%= name %>", new Function(value));
    }
})

DATA_SOURCE_SETTER = %{
    @Override
    public void setDataSource(DataSourceTag dataSource) {
        setProperty("dataSource", dataSource);
    }
}

COMPONENT_ATTRIBUTES = ERB.new(%{//>> Attributes

    public static String tagName() {
        return "<%= tag_name %>";
    }
<%= unique_composite_options.map { |option| option.to_setter }.join %><%= events.map { |event| event.to_setter }.join %><%= unique_options.map { |option| option.to_getter_and_setter }.join %><%= events.map { |event| event.to_getter_and_setter }.join %>
//<< Attributes})

METHODS = %{
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag
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
//<< Attributes
}

COMPONENT = ERB.new(%{
package com.kendoui.taglib;

<% if composite_options.any? %>
import com.kendoui.taglib.<%= namespace %>.*;
<% end %>
<% if events.any? %>
import com.kendoui.taglib.json.Function;
<% end %>

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class <%= tag_class %> extends WidgetTag /* interfaces */ /* interfaces */ {

    public <%= tag_class %>() {
        super("<%= name %>");
    }
    #{METHODS}
}
})

ITEMS = ERB.new(%{
package com.kendoui.taglib.<%= namespace %>;

public interface Items {
    void setItems(ItemsTag items);
}
})
    class Generator
        def initialize(path)
            @path = path
        end

        def component(component)
            filename = "#{@path}#{component.tag_class}.java"

            $stderr.puts("Updating #{filename}") if VERBOSE

            component.delete_ignored

            java = component.to_java(filename)

            File.write(filename, java.dos)

            if component.interfaces.include?('Items')
                namespace = component.namespace

                java = ITEMS.result(binding)

                filename = "#{@path}#{component.namespace}/Items.java"

                File.write(filename, java.dos)
            end
        end
    end
end
