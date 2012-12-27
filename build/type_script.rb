require 'erb'
require 'codegen/lib/options'
require 'codegen/lib/markdown_parser'
require 'codegen/lib/component'

TYPE_SCRIPT = ERB.new(File.read("build/kendo.ts.erb"), 0, '%<>')

module CodeGen::TypeScript
    TYPES = {
        'Number' => 'number',
        'String' => 'string',
        'Boolean' => 'bool',
        'Object' => 'any',
        'Array' => 'any',
        'Function' => 'Function',
        'Date' => 'Date'
    }

    module Options
        def option_class
            Option
        end

        def composite_option_class
            CompositeOption
        end
    end

    class Component < CodeGen::Component
        include Options

        def plugin
            return 'Mobile' + @name if @full_name.include?('mobile')

            @name
        end

        def namespace
            @full_name.sub('.' + @name, '')
        end

        def type_script_options_type
            type_script_type + 'Options'
        end

        def type_script_type
            name
        end

    end

    class CompositeOption < CodeGen::CompositeOption
        include Options

        def type_script_type
            @owner.type_script_type + @name.pascalize
        end
    end

    class Option < CodeGen::Option
        include Options

        def type_script_type
            return 'any' if @type.size > 1

            TYPES[@type[0]]
        end
    end
end

def get_type_script(sources)

    components = sources.map do |source|
        parser = CodeGen::MarkdownParser.new

        parser.parse(File.read(source), CodeGen::TypeScript::Component)
    end

    widgets = components.find_all { |component| component.full_name.include?('.ui.') }
                        .sort { |a, b| a.plugin <=> b.plugin }

    namespaces = widgets.group_by { |widget| widget.namespace }

    TYPE_SCRIPT.result(binding)
end

class TypeScriptTask < Rake::FileTask
    include Rake::DSL

    def execute(args=nil)
        mkdir_p File.dirname(name), :verbose => false

        $stderr.puts("Creating #{name}") if VERBOSE

        File.open(name, "w") do |file|
            file.write get_type_script(prerequisites)
        end
    end
end

def type_script(*args, &block)
    TypeScriptTask.define_task(*args, &block)
end

namespace :type_script do
    #TYPE_SCRIPT_SOURCES = FileList["docs/api/{web,mobile,dataviz,framework}/*.md"]

    TYPE_SCRIPT_SOURCES = FileList["docs/api/web/autocomplete.md"]

    %w(master production).each do |branch|
        namespace branch do
            desc "Test TypeScript generation"
            task :test do
                #sh "cd docs && git fetch && git reset --hard origin/#{branch}"

                path = "dist/kendo-#{branch}.d.ts"

                File.open(path, "w") do |f|
                    f.write get_type_script(TYPE_SCRIPT_SOURCES)
                end

                sh "node_modules/typescript/bin/tsc #{path}"
            end
        end
    end
end
