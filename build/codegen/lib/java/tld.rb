module CodeGen::Java::TLD

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

        def to_tld
            COMPONENT.result(binding)
        end
    end

    class Event < CodeGen::Java::Event
        include Options

        def to_attribute
            EVENT_ATTRIBUTE.result(binding)
        end

        def to_tag
            EVENT.result(binding)
        end
    end


    class Option < CodeGen::Java::Option
        include Options

        def to_attribute
            OPTION_ATTRIBUTE.result(binding)
        end

        def array_option_class
            ArrayOption
        end
    end

    class CompositeOption < CodeGen::Java::CompositeOption
        include Options

        def body_content
            return 'JSP' if @recursive || @options.any? { |option| option.composite? || option.type == 'Function' }

            'empty'
        end

        def to_tag
            COMPOSITE_OPTION.result(binding)
        end
    end

    class ArrayOption < CompositeOption
        include CodeGen::Array

        def item_class
            ArrayItem
        end

        def to_tag
            ARRAY.result(binding)
        end
    end

    class ArrayItem < CompositeOption
        def tag_name
            @owner.tag_name.sub(@owner.name.camelize, @name.camelize)
        end

        def tag_class
            super.sub(@owner.name.pascalize, '')
        end
    end

    EVENT = ERB.new(%{
    <tag>
        <description><%= description %></description>
        <name><%= tag_name %></name>
        <tag-class>com.kendoui.taglib.<%= namespace %>.<%= tag_class %></tag-class>
        <body-content>JSP</body-content>
    </tag>
    }, 0, '<>%')

    COMPOSITE_OPTION = ERB.new(%{
    <tag>
        <description><%= description %></description>
        <name><%= tag_name %></name>
        <tag-class>com.kendoui.taglib.<%= namespace %>.<%= tag_class %></tag-class>
        <body-content><%= body_content %></body-content>

<%= unique_options.map { |option| option.to_attribute }.join %>

    </tag>

<%= unique_composite_options.map { |option| option.to_tag }.join %>

<%= events.map { |event| event.to_tag }.join %>

    }, 0, '<>%')

    ARRAY = ERB.new(%{
    <tag>
        <description><%= description %></description>
        <name><%= tag_name %></name>
        <tag-class>com.kendoui.taglib.<%= namespace %>.<%= tag_class %></tag-class>
        <body-content>JSP</body-content>
    </tag>

    <tag>
        <description><%= item.description %></description>
        <name><%= item.tag_name %></name>
        <tag-class>com.kendoui.taglib.<%= namespace %>.<%= item.tag_class %></tag-class>

<% if item.tag_name == 'splitter-pane' %>
        <body-content>JSP</body-content>
<% else %>
        <body-content><%= item.body_content %></body-content>
<% end %>
<%= item.unique_options.map { |option| option.to_attribute }.join %>

<% if item.tag_name == 'splitter-pane' %>
        <dynamic-attributes>true</dynamic-attributes>
<% end %>

    </tag>

<%= item.unique_composite_options.map { |option| option.to_tag }.join %>

<%= item.events.map { |event| event.to_tag }.join %>
    }, 0, '<>%')

    COMPONENT = ERB.new(%{
    <tag>
        <description><%= name %></description>
        <name><%= tag_name %></name>
        <tag-class>com.kendoui.taglib.<%= tag_class %></tag-class>
        <body-content>JSP</body-content>
<% if name != 'DataSource' %>
        <attribute>
            <description>The mandatory and unique name of the widget. Used as the &quot;id&quot; attribute of the widget HTML element.</description>
            <name>name</name>
            <required>true</required>
            <rtexprvalue>true</rtexprvalue>
            <type>java.lang.String</type>
        </attribute>
<% end %>
<%= unique_options.map { |option| option.to_attribute }.join %>
<%= events.map { |event| event.to_attribute }.join %>

<% if name != 'DataSource' %>
        <dynamic-attributes>true</dynamic-attributes>
<% end %>
    </tag>

<%= unique_composite_options.map { |option| option.to_tag }.join("\n") %>

<%= events.map { |event| event.to_tag }.join("\n") %>

            }, 0, '<>%')

    OPTION_ATTRIBUTE = ERB.new(%{
        <attribute>
            <description><%= description %></description>
            <name><%= name.sub(/^[a-z]{1}[A-Z]{1}[a-zA-Z]*/){|c| c.downcase} %></name>
            <rtexprvalue>true</rtexprvalue>
<% if type != 'Function' %>
            <type><%= java_type %></type>
<% end %>
        </attribute>
    }, 0, '<>%')

    EVENT_ATTRIBUTE = ERB.new(%{
        <attribute>
            <description><%= description %></description>
            <name><%= name %></name>
            <rtexprvalue>true</rtexprvalue>
        </attribute>
    }, 0, '<>%')

class Generator
    def initialize(filename)
        @filename = filename
        @tld = ''
    end

    def component(component)

        component.delete_ignored

        @tld += component.to_tld

    end

    def sync()
        src = File.read(@filename)

        src = src.sub(/<!-- Auto-generated -->(.|\n)*<!-- Auto-generated -->/,
                     "<!-- Auto-generated -->\n\n" +
                     @tld +
                     "\n\n<!-- Auto-generated -->")

        File.write(@filename, src.dos)
    end

end

end # module CodeGen::Java::TLD
