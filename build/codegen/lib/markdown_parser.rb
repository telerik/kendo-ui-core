require 'kramdown'

class MarkdownParser
    def self.parse(markdown)
        root = Kramdown::Parser::Markdown.parse(markdown)[0]

        header = root.children.find { |e| e.type == :header && e.options[:level] == 1 }

        component = Component.new header.options[:raw_text]

        configuration = self.configuration_section(root)

        self.parse_configuration(configuration) do |field, index|
            name = self.field_name(field)

            description = self.field_description(index, configuration)

            component.add_field(:name => name, :description => description)
        end

        component
    end

    private

    def self.configuration_section(element)
        start_index = element.children.find_index {|e| e.options[:raw_text] == 'Configuration'}

        start_index = element.children.size unless start_index

        end_index = element.children.find_index {|e| e.options[:raw_text] == 'Methods'}

        end_index = element.children.size unless end_index

        element.children.slice(start_index..end_index)
    end

    def self.parse_configuration(configuration)
        configuration.each_with_index do |element, index|
            if element.type == :header && element.options[:level] == 3
                yield element, index
            end
        end
    end

    def self.field_name(element)
        self.element_text self.find_text_child(element)
    end

    def self.field_description(index, siblings)
        element = siblings.slice(index, siblings.size).find {|e| e.type == :p}

        self.element_text self.find_text_child(element)
    end

    def self.find_text_child(element)
        element.children.find {|e| e.type == :text } if element
    end

    def self.element_text(element)
        element.value.strip if element
    end
end
