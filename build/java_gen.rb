require 'kramdown'

TLD = 'wrappers/java/kendo-taglib/src/main/resources/META-INF/taglib.tld'

MARKDOWN = FileList['docs/api/{web,dataviz}/*.md'].exclude('**/ui.md')

class Attribute

    attr_reader :name, :type, :description

    def initialize(options)
        @name = options[:name]
        @type = options[:type]
        @description = options[:description]
    end

    def to_xml

    end
end

class Tag

    attr_reader :attributes, :name

    def initialize(name)
        @name = name.sub('kendo.ui.', '')
        @attributes = []
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

        configuration.each_with_index do |e, index|
            if (e.type == :header && e.options[:level] == 3)
                type = find_child_with_type(e, :codespan)
                text = find_child_with_type(e, :text)

                paragraph  = find_element_with_type(configuration, index, :p)
                description = find_child_with_type(paragraph, :text)

                attribute = Attribute.new :name => text.value,
                    :type => type.value,
                    :description => description.value

                tag.attributes.push(attribute)
            end
        end

        tag
    end
end

def sync_tld
    filename = MARKDOWN.find {|f| f =~ /autocomplete/ }
    tag = Tag.parse(filename)

    p tag
end

def find_child_with_type(element, type)
    element.children.find { |e| e.type == type }
end

def find_element_with_type(elements, reference_index, type)
    elements = elements.slice(reference_index, elements.length)

    elements.find { |e| e.type == type }
end


namespace :java do
    desc('Sync the tag library definition with the documentation')
    task :sync_tld do
        sync_tld
    end
end

