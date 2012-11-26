require 'codegen/lib/markdown_parser'
require 'codegen/lib/component'

class PrintVisitor
    def component(component)
        $stderr.puts(component.name)
    end

    def field(field)
        $stderr.puts("\t #{field.name}(#{field.type})")
    end

    def event(event)
        $stderr.puts("\t" + event.name)
    end
end

namespace :generate do
    desc('List all parsed components')
    task :list do
        visitor = PrintVisitor.new

        CodeGen::MarkdownParser.each do |component|
            component.accept(visitor)
        end
    end
end
