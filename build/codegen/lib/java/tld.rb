module CodeGen::Java
    TYPES = {
        'Number' => 'float',
        'number' => 'float',
        'String' => 'java.lang.String',
        'string' => 'java.lang.String',
        'Boolean' => 'boolean',
        'Object' => 'Object',
        'Array' => 'java.lang.Object',
        'Function' => 'java.lang.String',
        'Date' => 'java.util.Date'
    }

    IGNORED = {
        'chart' => ['axisDefaults', 'seriesDefaults'],
        'stockchart' => ['axisDefaults', 'seriesDefaults'],
        'window' => ['content.template'],
    }

    def self.ignored?(component, option)
        ignored = IGNORED[component.downcase]

        ignored && ignored.any? { |ignore| option.start_with?(ignore) }
    end

module TLD

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

    end

    class Event < CodeGen::Java::Event
        include Options
    end

    class Option < CodeGen::Java::Option
        include Options
    end

    class CompositeOption < CodeGen::Java::CompositeOption
        include Options

        def body_content
            return 'JSP' if @options.any? { |option| option.instance_of?(CompositeOption) }

            'empty'
        end
    end

    EVENT = ERB.new(%{
        <tag>
            <description>Subscribes to the <%=event.name.camelize%> event of <%=component.name%>.</description>
            <name><%=event.tag_name%></name>
            <tag-class>com.kendoui.taglib.<%=event.namespace%>.<%=event.tag_class%></tag-class>
            <body-content>JSP</body-content>
        </tag>
    }, 0, '<>%')

    COMPOSITE_OPTION_START = ERB.new(%{
        <tag>
            <description><%= option.description %></description>
            <name><%= option.tag_name %></name>
            <tag-class>com.kendoui.taglib.<%=option.namespace%>.<%=option.tag_class%></tag-class>
            <body-content><%=option.body_content%></body-content>
    }, 0, '<>%')

    COMPOSITE_OPTION_END = ERB.new(%{
<% if option.name == 'pane' && component.name == 'Splitter' %>
            <dynamic-attributes>true</dynamic-attributes>
<% end %>
        </tag>
    }, 0, '<>%')

    COMPONENT_START = ERB.new(%{
        <tag>
            <description><%= component.name %></description>
            <name><%= component.tag_name %></name>
            <tag-class>com.kendoui.taglib.<%=component.tag_class%></tag-class>
            <body-content>JSP</body-content>
<% if component.name != 'DataSource' %>
            <attribute>
                <description>The mandatory and unique name of the widget. Used as the &quot;id&quot; attribute of the widget HTML element.</description>
                <name>name</name>
                <required>true</required>
                <rtexprvalue>true</rtexprvalue>
                <type>java.lang.String</type>
            </attribute>
<% end %>
            }, 0, '<>%')

    COMPONENT_END = ERB.new(%{
<% if component.name != 'DataSource' %>
            <dynamic-attributes>true</dynamic-attributes>
<% end %>
        </tag>
            }, 0, '<>%')

    OPTION_ATTRIBUTE = ERB.new(%{
            <attribute>
                <description><%= option.description %></description>
                <name><%= option.name.sub(/^[a-z]{1}[A-Z]{1}[a-zA-Z]*/){|c| c.downcase} %></name>
                <rtexprvalue>true</rtexprvalue>
                <type><%= CodeGen::Java::TYPES[option.type] %></type>
            </attribute>
    }, 0, '<>%')

    EVENT_ATTRIBUTE = ERB.new(%{
            <attribute>
                <description><%= event.description %></description>
                <name><%= event.name %></name>
                <rtexprvalue>true</rtexprvalue>
            </attribute>
    }, 0, '<>%')

class Generator
    def initialize(filename)
        @filename = filename
        @tld = ''
    end

    def component(component)

        @tld += COMPONENT_START.result(binding)

        options(component, component)

        component.events.each do |event|

            @tld += EVENT_ATTRIBUTE.result(binding)

        end

        @tld += COMPONENT_END.result(binding)

        composite_options(component, component)

        component.events.each do |event|

            @tld += EVENT.result(binding)

        end

    end

    def options(component, owner)
        owner.unique_options.each do |option|

            next if CodeGen::Java.ignored?(component.name, option.name)

            @tld += OPTION_ATTRIBUTE.result(binding)

        end
    end

    def composite_options(component, owner)

        owner.composite_options.each do |option|

            @tld += COMPOSITE_OPTION_START.result(binding)

            options(component, option)

            @tld += COMPOSITE_OPTION_END.result(binding)

            composite_options(component, option)

        end
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
end # module CodeGen::Java
