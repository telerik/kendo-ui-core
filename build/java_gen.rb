require 'kramdown'
require 'erb'

TLD = 'wrappers/java/kendo-taglib/src/main/resources/META-INF/taglib.tld'

MARKDOWN = FileList['docs/api/{web,dataviz}/*.md'].exclude('**/ui.md')

TLD_ATTR_TEMPLATE = ERB.new(%{
        <attribute>
            <description><%= description %></description>
            <name><%= name %></name>
            <rtexprvalue>true</rtexprvalue>
<% if type %>
            <type><%= type %></type>
<% end %>
        </attribute>}, 0, "<>")

TLD_TAG_TEMPLATE = ERB.new(%{
    <tag>
        <description><%= name %> Widget</description>
        <name><%= name.sub(/^./) { |c| c.downcase } %></name>
        <tag-class>com.kendoui.taglib.<%= name %>Tag</tag-class>
        <body-content>JSP</body-content>
        <attribute>
            <description>The mandatory and unique name of the widget. Used as the &quot;id&quot; attribute of the widget HTML element.</description>
            <name>name</name>
            <required>true</required>
            <rtexprvalue>true</rtexprvalue>
            <type>java.lang.String</type>
        </attribute>
<%= attributes.map{ |a| a.to_xml }.join %>
    </tag>
        })

JS_TO_JAVA_TYPES = {
    'Number' => 'int',
    'String' => 'java.lang.String',
    'Boolean' => 'boolean',
    'Object' => 'object'
}

class Attribute
    attr_reader :name, :type, :description

    def initialize(options)
        @name = options[:name].strip
        @type = JS_TO_JAVA_TYPES[options[:type]]
        @description = options[:description].strip
    end

    def to_xml
        return '' unless @type != 'object'

        TLD_ATTR_TEMPLATE.result(binding)
    end
end

class Tag

    attr_reader :attributes, :name

    def initialize(name)
        @name = name.sub('kendo.ui.', '')
        @attributes = []
    end

    def to_xml
        TLD_TAG_TEMPLATE.result(binding)
    end

    def self.parse(filename)

        tree = Kramdown::Parser::Markdown.parse(File.read(filename))

        root = tree[0]

        header = root.children.find { |e| e.type == :header && e.options[:level] == 1 }

        tag = Tag.new(header.options[:raw_text])

        start_element_index = root.children.find_index { |e| e.options[:raw_text] == 'Configuration' }

        end_element_index = root.children.find_index { |e| e.options[:raw_text] == 'Methods' }

        configuration = root.children.slice(start_element_index..end_element_index)

        find_child_with_type = lambda do |element, type|
            element.children.find { |e| e.type == type }
        end

        find_element_with_type = lambda do |elements, reference_index, type|
            elements.slice(reference_index, elements.length)
                         .find { |e| e.type == type }
        end

        configuration.each_with_index do |e, index|
            if (e.type == :header && e.options[:level] == 3)
                name = find_child_with_type.call(e, :text).value

                unless name.include?('.')
                    type = find_child_with_type.call(e, :codespan)

                    paragraph  = find_element_with_type.call(configuration, index, :p)

                    description = find_child_with_type.call(paragraph, :text)

                    attribute = Attribute.new :name => name,
                        :type => type.value,
                        :description => description.value

                    tag.attributes.push(attribute)
                end
            end
        end

        start_element_index = root.children.find_index { |e| e.options[:raw_text] == 'Events' }

        if start_element_index != nil
            events = root.children.slice(start_element_index, root.children.length)

            events.each_with_index do |e, index|
                if (e.type == :header && e.options[:level] == 3)
                    name = find_child_with_type.call(e, :text).value

                    paragraph  = find_element_with_type.call(events, index, :p)

                    description = find_child_with_type.call(paragraph, :text)

                    attribute = Attribute.new :name => name,
                                              :description => description.value

                    tag.attributes.push(attribute)
                end
            end
        end

        tag
    end
end

def generate
    tags = MARKDOWN.map{ |md| Tag.parse(md) }.sort{ |a, b| a.name <=> b.name }

    tld = File.read(TLD)

    tld.sub!(/<!-- Auto-generated -->(.|\n)*<!-- Auto-generated -->/,
             "<!-- Auto-generated -->\n\n" +
             tags.map{ |t| t.to_xml }.join("\n") +
             "\n\n<!-- Auto-generated -->"
        )

    File.open(TLD, 'w') do |file|
        file.write(tld)
    end
end


namespace :java do
    desc('Generate JSP Wrappers from Markdown API reference')
    task :generate do
        generate
    end
end

