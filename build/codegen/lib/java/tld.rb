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

    end

    class Component < CodeGen::Java::Component
        include Options

        def tag_name
            @name.camelize
        end

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
    end

    class CompositeOption < CodeGen::Java::CompositeOption
        include Options

        def body_content
            return 'JSP' if @options.any? { |option| option.instance_of?(CompositeOption) }

            'empty'
        end

        def to_tag
            COMPOSITE_OPTION.result(binding)
        end
    end

    EVENT = ERB.new(%{
        <tag>
            <description>Subscribes to the <%= name.camelize %> event of <%= owner.name %>.</description>
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
            <body-content><%=body_content%></body-content>

<%= unique_options.map { |option| option.to_attribute }.join("\n") %>
<% if name == 'pane' && namespace == 'splitter' %>
            <dynamic-attributes>true</dynamic-attributes>
<% end %>
        </tag>

<%= composite_options.map { |option| option.to_tag }.join("\n") %>
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
<%= unique_options.map { |option| option.to_attribute }.join("\n") %>
<%= events.map { |event| event.to_attribute }.join("\n") %>

<% if name != 'DataSource' %>
            <dynamic-attributes>true</dynamic-attributes>
<% end %>
        </tag>

<%= composite_options.map { |option| option.to_tag }.join("\n") %>

<%= events.map { |event| event.to_tag }.join("\n") %>

            }, 0, '<>%')

    OPTION_ATTRIBUTE = ERB.new(%{
            <attribute>
                <description><%= description %></description>
                <name><%= name.sub(/^[a-z]{1}[A-Z]{1}[a-zA-Z]*/){|c| c.downcase} %></name>
                <rtexprvalue>true</rtexprvalue>
                <type><%= CodeGen::Java::TYPES[type] %></type>
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

        @tld += component.to_tld

    end

    def sync()
        src = File.read(@filename)

        src = src.sub(/<!-- Auto-generated -->(.|\n)*<!-- Auto-generated -->/,
                     "<!-- Auto-generated -->\n\n" +
                     @tld +
                     "\n\n<!-- Auto-generated -->")
                 .gsub(/\r?\n/, RUBY_PLATFORM =~ /w32/ ? "\n" : "\r\n")

        File.write(@filename, src)
    end

end

end # module CodeGen::Java::TLD
