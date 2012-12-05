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

module TLD
    COMPONENT_START = ERB.new(%{
        <tag>
            <description><%= component.name %></description>
            <name><%= component.name.camelize %></name>
            <tag-class>com.kendoui.taglib.<%= component.name %>Tag</tag-class>
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

    OPTION = ERB.new(%{
            <attribute>
                <description><%= option.description %></description>
                <name><%= option.name.sub(/^[a-z]{1}[A-Z]{1}[a-zA-Z]*/){|c| c.downcase} %></name>
                <rtexprvalue>true</rtexprvalue>
                <type><%= CodeGen::Java::TYPES[option.type] %></type>
            </attribute>
    }, 0, '<>%')

    EVENT = ERB.new(%{
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

    def unique_options(options)
        options = options.find_all { |o| o.instance_of?(CodeGen::Option) }

        options.clone.each do |option|

            homonyms = options.find_all {|o| o.name == option.name }

            if homonyms.size > 1

                homonyms.each { |option| options.delete(option) }

                options.push(CodeGen::Option.new :name => option.name,
                                                 :description => option.description,
                                                 :type => 'Object')
            end
        end

        options.sort{ |a, b| a.name <=> b.name }
    end

    def composite_options(options)
        options.find_all { |option| option.instance_of?(CodeGen::CompositeOption) }
    end

    def ignored?(component_name, option_name)
        ignored = IGNORED[component_name.downcase]

        ignored && ignored.any? { |ignore| option_name.start_with?(ignore) }
    end

    def component(component)
        @tld += COMPONENT_START.result(binding)

        unique_options(component.options).each do |option|

            next if ignored?(component.name, option.name)

            @tld += OPTION.result(binding)

        end

        component.events.each do |event|

            @tld += EVENT.result(binding)

        end

        @tld += COMPONENT_END.result(binding)
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
