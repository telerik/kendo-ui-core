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

    def self.tag_name(target)
        return target.name.camelize if target.instance_of?(CodeGen::Component)

        self.tag_name(target.owner) + '-' + target.name
    end

    def self.namespace(target)
        return target.name.downcase if target.instance_of?(CodeGen::Component)

        self.namespace(target.owner)
    end

    def self.body_content(target)
        return 'JSP' if target.options.any { |option| option.instance_of?(CodeGen::CompositeOption) }

        'empty'
    end

    def self.tag_class(target)
        return target.name + 'Tag' if target.instance_of?(CodeGen::Component)

        return target.name.pascalize + 'Tag' if target.owner.instance_of?(CodeGen::Component)

        target.owner.name.pascalize + target.name.pascalize + 'Tag'
    end

module TLD
    COMPOSITE_OPTION_START = ERB.new(%{
        <tag>
            <description><%= option.description %></description>
            <name><%= CodeGen::Java.tag_name(option) %></name>
            <tag-class>com.kendoui.taglib.<%= CodeGen::Java.namespace(option) %>.<%= CodeGen::Java.tag_class(option) %></tag-class>
            <body-content>JSP</body-content>
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
            <name><%= CodeGen::Java.tag_name(component) %></name>
            <tag-class>com.kendoui.taglib.<%= CodeGen::Java.tag_class(component) %></tag-class>
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

        composite_options(component.options).each do |option|

            composite_option(component, option)

        end
    end

    def composite_option(component, option)
        @tld += COMPOSITE_OPTION_START.result(binding)

        @tld += COMPOSITE_OPTION_END.result(binding)

        composite_options(option.options).each do |option|

            composite_option(component, option)

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
