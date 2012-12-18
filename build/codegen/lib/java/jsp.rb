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

        def to_java(filename)
            java = COMPOSITE_OPTION.result(binding)

            java = File.read(filename) if File.exists?(filename)

            java.sub(/\/\/>> Attributes(.|\n)*\/\/<< Attributes/, COMPONENT_ATTRIBUTES.result(binding))
        end
    end

    class ArrayOption < CompositeOption
        include CodeGen::Array

        def item_class
            ArrayItem
        end

        def to_setter
            ARRAY_SETTER.result(binding)
        end

        def to_java(filename)
            java = ARRAY.result(binding)

            java = File.read(filename) if File.exists?(filename)

            java = java.sub(/\/\/>> Attributes(.|\n)*\/\/<< Attributes/,
                            ARRAY_ATTRIBUTES.result(binding))

            java = java.sub(/\/\/>> initialize(.|\n)*\/\/<< initialize/, ARRAY_INIT.result(binding))

            java
        end

    end

    class ArrayItem < CompositeOption

        def tag_name
            @owner.tag_name.sub(@owner.name.camelize, @name.camelize)
        end

        def tag_class
            super.sub(@owner.name.pascalize, '')
        end

        def to_setter

        end
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

COMPOSITE_OPTION = ERB.new(%{
package com.kendoui.taglib.<%= namespace %>;

<% if owner.name == 'Items' %>
import com.kendoui.taglib.BaseItemTag;
<% else %>
import com.kendoui.taglib.BaseTag;
<% end %>

<% if owner.namespace == owner.name.downcase %>
import com.kendoui.taglib.<%= owner.tag_class %>;
<% end %>

<% if events.any? %>
import com.kendoui.taglib.json.Function;
<% end %>

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class <%= tag_class %> extends <% if owner.name == 'Items' %> BaseItemTag <% else %> BaseTag <% end %> /* interfaces */ /* interfaces */ {
    #{METHODS}
}
})

ARRAY_INIT = ERB.new(%{//>> initialize

        <%= name %> = new ArrayList<Map<String, Object>>();

//<< initialize})

ARRAY_ATTRIBUTES = ERB.new(%{//>> Attributes

    private List<Map<String, Object>> <%= name %>;

    public List<Map<String, Object>> <%= name %>() {
        return <%= name %>;
    }

    public static String tagName() {
        return "<%= tag_name %>";
    }

    public void add<%= item.name.pascalize %>(<%= item.tag_class %> value) {
        <%= name %>.add(value.properties());
    }

//<< Attributes})

ARRAY = ERB.new(%{
package com.kendoui.taglib.<%= namespace %>;

<% if name == 'Items' %>
import com.kendoui.taglib.ContentTag;
<% else %>
import com.kendoui.taglib.BaseTag;
<% end %>

<% if owner.namespace == owner.name.downcase && name != 'Items' %>
import com.kendoui.taglib.<%= owner.tag_class %>;
<% end %>

import java.util.ArrayList;
import java.util.Map;
import java.util.List;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class <%= tag_class %> extends <% if name == 'Items' %>ContentTag<% else %>BaseTag<% end %> /* interfaces */ /* interfaces */ {
    #{JAVA_METHODS}
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

            composite_options(component)
        end

        def composite_options(owner)

            owner.unique_composite_options.each do |option|
                filename = "#{@path}#{option.namespace}/#{option.tag_class}.java"

                $stderr.puts("Updating #{filename}") if VERBOSE

                java = option.to_java(filename)

                File.write(filename, java.dos)

                break

                composite_options(option)
            end

        end
    end
end
