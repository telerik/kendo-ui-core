require 'codegen/lib/markdown_parser'
require 'codegen/lib/component'
require 'codegen/lib/java/tld'

class PrintVisitor
    def component_start(component)
        $stderr.puts(component.name)
    end

    def component_end(component)
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

    namespace :java do
        task :tld do

            tld = ''

            CodeGen::MarkdownParser.each do |component|
                visitor = CodeGen::Java::TagLibraryDescriptorVisitor.new(component)

                component.accept(visitor)

                tld += visitor.output

                break
            end

            p tld

            #visitor.sync('wrappers/java/kendo-taglib/src/main/resources/META-INF/taglib.tld', tld)
        end
    end
end
