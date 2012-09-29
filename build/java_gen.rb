require 'kramdown'

TLD = 'wrappers/java/kendo-taglib/src/main/resources/META-INF/taglib.tld'

MARKDOWN = FileList['docs/api/{web,dataviz}/*.md'].exclude('**/ui.md')

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
        @type = JS_TO_JAVA_TYPES[options[:type].strip]
        @description = options[:description].strip
    end

    def to_xml
        return '' unless @type != 'object'

        <<-eos
        <attribute>
            <description>#{@description}</description>
            <name>#{@name}</name>
            <rtexprvalue>true</rtexprvalue>
            <type>#{@type}</type>
        </attribute>
        eos
    end
end

class Tag

    attr_reader :attributes, :name

    def initialize(name)
        @name = name.sub('kendo.ui.', '')
        @attributes = []
    end

    def to_xml
        <<-eos
    <tag>
        <description>#{@name} Widget</description>
        <name>#{@name.sub(/^./) { |c| c.downcase }}</name>
        <tag-class>com.kendoui.taglib.#{@name}Tag</tag-class>
        <body-content>JSP</body-content>
        <attribute>
            <description>The mandatory and unique name of the widget. Used as the &quot;id&quot; attribute of the widget HTML element.</description>
            <name>name</name>
            <required>true</required>
            <rtexprvalue>true</rtexprvalue>
            <type>java.lang.String</type>
        </attribute>
#{@attributes.map{ |a| a.to_xml }.join }
    </tag>
        eos
    end

    def self.parse(filename)

        tree = Kramdown::Parser::Markdown.parse(File.read(filename))

        root = tree[0]

        header = root.children.find { |e| e.type == :header && e.options[:level] == 1 }

        tag = Tag.new(header.options[:raw_text])

        configuration_element = root.children.find { |e| e.options[:raw_text] == 'Configuration' }

        methods_element = root.children.find { |e| e.options[:raw_text] == 'Methods' }

        start_element_index = root.children.index(configuration_element)

        end_element_index = root.children.index(methods_element)

        configuration = root.children.slice(start_element_index..end_element_index)

        find_child_with_type = lambda do |element, type|
            element.children.find { |e| e.type == type }
        end

        find_element_with_type = lambda do |reference_index, type|
            configuration.slice(reference_index, configuration.length)
                         .find { |e| e.type == type }
        end

        configuration.each_with_index do |e, index|
            if (e.type == :header && e.options[:level] == 3)
                name = find_child_with_type.call(e, :text).value

                unless name.include?('.')
                    type = find_child_with_type.call(e, :codespan)
                    paragraph  = find_element_with_type.call(index, :p)
                    description = find_child_with_type.call(paragraph, :text)

                    p e if type == nil || paragraph == nil || description == nil

                    attribute = Attribute.new :name => name,
                        :type => type.value,
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

