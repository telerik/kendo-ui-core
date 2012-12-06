require 'kramdown'

module CodeGen
    MARKDOWN = FileList['docs/api/{web,dataviz}/*.md']
        .exclude('**/ui.md')
        .include('docs/api/framework/datasource.md')

class MarkdownParser

    def self.all(component_class = nil)
        MARKDOWN.map { |filename| self.read(filename, component_class) }
                .sort { |a, b| a.name <=> b.name }
    end

    def self.read(filename, component_class = nil)
        MarkdownParser.new.parse(File.read(filename), component_class)
    end

    def parse(markdown, component_class = nil)
        component_class ||= Component

        root = Kramdown::Parser::Markdown.parse(markdown)[0]

        header = root.children.find { |e| e.type == :header && e.options[:level] == 1 }

        component = component_class.new(:name => component_name(root))

        configuration = configuration_section(root)

        each_section(configuration) do |option, index|

            component.add_option(:name => section_name(option),
                                :type => option_type(option),
                                :description => section_description(index, configuration))
        end

        events = events_section(root)

        each_section(events) do |event, index|

            component.add_event(:name => section_name(event),
                                :description => section_description(index, events))

        end

        component
    end

    private

    def configuration_section(element)
        start_index = child_index(element, 'Configuration')

        end_index = child_index(element, 'Methods')

        end_index = child_index(element, 'Events') if end_index = element.children.size

        element.children.slice(start_index..end_index)
    end

    def events_section(element)
        start_index = child_index(element, 'Events')

        element.children.slice(start_index..element.children.size)
    end

    def child_index(element, text)
        index = element.children.find_index {|e| e.options[:raw_text] == text}

        index = element.children.size unless index

        index
    end

    def each_section(configuration)
        configuration.each_with_index do |element, index|
            if element.type == :header && element.options[:level] == 3
                yield element, index
            end
        end
    end

    def component_name(element)
        header = element.children.find {|e| e.type == :header && e.options[:level] == 1}

        header.options[:raw_text]
    end

    def section_name(element)
        element_text find_text_child(element)
    end

    def option_type(element)
        child = element.children.find {|e| e.type == :codespan }

        element_text child
    end

    def section_description(index, siblings)
        element = siblings.slice(index, siblings.size).find {|e| e.type == :p}

        element_text find_text_child(element)
    end

    def find_text_child(element)
        element.children.find {|e| e.type == :text } if element
    end

    def element_text(element)
        element.value.strip if element
    end
end

end # module CodeGen
