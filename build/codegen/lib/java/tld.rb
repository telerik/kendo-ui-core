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

    module Options

        def composite_option_class
            CompositeOption
        end

        def option_class
            Option
        end

        def unique_options
            options = @options.find_all { |o| o.instance_of?(Option) }

            options.clone.each do |option|

                homonyms = options.find_all {|o| o.name == option.name }

                if homonyms.size > 1

                    homonyms.each { |option| options.delete(option) }

                    options.push Option.new(:name => option.name,
                                            :owner => self,
                                            :description => option.description,
                                            :type => 'Object')
                end
            end

            options.sort{ |a, b| a.name <=> b.name }
        end

    end

class Event < CodeGen::Event

    def tag_name
        @owner.tag_name + '-' + @name
    end

    def tag_class
        @name.pascalize + 'FunctionTag'
    end

    def namespace
        @owner.namespace
    end
end

class Option < CodeGen::Option

    def composite_option_class
        CompositeOption
    end

    def tag_name
        @owner.tag_name + '-' + @name
    end

end

class CompositeOption < CodeGen::CompositeOption
    include Options

    def tag_name
        @owner.tag_name + '-' + @name
    end

    def namespace
        @owner.namespace
    end

    def tag_class
        name = @name.pascalize

        return name + 'Tag' if @owner.instance_of?(Component)

        @owner.name.pascalize + name + 'Tag'
    end

    def body_content
        return 'JSP' if @options.any? { |option| option.instance_of?(CompositeOption) }

        'empty'
    end
end

class Component < CodeGen::Component

    include Options

    def event_class
        Event
    end

    def tag_name
        @name.camelize
    end

    def namespace
        @name.downcase
    end

    def tag_class
        @name + 'Tag'
    end

end


    def self.ignored?(component, option)
        ignored = IGNORED[component.downcase]

        ignored && ignored.any? { |ignore| option.start_with?(ignore) }
    end

module TLD
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
