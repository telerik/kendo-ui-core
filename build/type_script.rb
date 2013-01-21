require 'erb'
require 'codegen/lib/options'
require 'codegen/lib/markdown_parser'
require 'codegen/lib/component'

TYPE_SCRIPT = ERB.new(File.read("build/kendo.ts.erb"), 0, '%<>')

module CodeGen::TypeScript
    EXCLUDE = [
        'docs/api/framework/kendo.md',
        'docs/api/framework/class.md',
        'docs/api/framework/hierarchicaldatasource.md',
        'docs/api/framework/model.md',
        'docs/api/framework/observable.md',
        'docs/api/framework/observableobject.md',
        'docs/api/framework/node.md',
        'docs/api/framework/observablearray.md',
        'docs/api/framework/widget.md',
        'docs/api/framework/mobilewidget.md',
        'docs/api/web/ui.md'
    ]

    TYPES = {
        'Number' => 'number',
        'String' => 'string',
        'Boolean' => 'bool',
        'Document' => 'Document',
        'Range' => 'Range',
        'Object' => 'any',
        'Array' => 'any',
        'Date' => 'Date',
        'Function' => 'Function',
        'Element' => 'Element',
        'jQuery' => 'JQuery',
        'jqXHR' => 'JQueryXHR',
        'Selector' => 'string',
        'TouchEvent' => 'kendo.mobile.ui.TouchEventOptions',
        'Point' => 'kendo.mobile.ui.Point'
    }

    def self.type(type)
        return type if type.start_with?('kendo')

        result = TYPES[type]

        raise "No TypeScript mapping for type #{type}" unless result

        result
    end

    module Declaration
        def type_script_declaration
            "#{name}?: #{type_script_type};"
        end

        def type_script_type
            return 'any' if @type.size > 1

            CodeGen::TypeScript.type(@type[0])
        end
    end

    MANUALLY_GENERATED = {
        'schema' => ['model'],
        'column' => ['editor'],
        'transport' => ['parameterMap']
    }

    module Options
        include Declaration

        def option_class
            Option
        end

        def composite_option_class
            CompositeOption
        end

        def method_class
            Method
        end

        def array_option_class
            ArrayOption
        end

        def event_class
            Event
        end

        def unique_options
            composite = composite_options

            result = options.find_all {|o| o.composite? || !composite.any? { |composite| composite.name == o.name } }

            if MANUALLY_GENERATED.has_key?(@name)
                result.delete_if { |o| MANUALLY_GENERATED[@name].include?(o.name) }
            end

            result
        end
    end

    class Event < CodeGen::Event
        include Options

        def option_class
            EventOption
        end

        def composite_option_class
            CompositeEventOption
        end

        def type_script_type
            return @owner.type_script_type + @name.pascalize + 'Event' if @options.size > 0

            @owner.type_script_type + 'Event'
        end
    end

    class EventOption < CodeGen::EventOption
        include Declaration

        def composite_option_class
            CompositeEventOption
        end

    end

    EVENT = ERB.new(File.read("build/event.ts.erb"), 0, '%<>')

    class CompositeEventOption < CodeGen::CompositeEventOption
        include Options

        def type_script_type
            @owner.type_script_type + @name.pascalize
        end

        def type_script_interface
            EVENT.result(binding)
        end
    end

    class Method < CodeGen::Method
        def result_class
            Result
        end

        def parameter_class
            Parameter
        end

        def type_script_type
            @owner.type_script_type + @name.pascalize
        end

        def type_script_parameters
            unique_parameters.map { |p| "#{p.name}#{p.optional ? "?" : ""}: #{p.type_script_type}" }.join(', ')
        end

        def type_script_declaration
            declaration = "#{name}(#{type_script_parameters}): "

            if @result
                declaration += @result.type_script_type
            else
                declaration += 'void'
            end

            declaration + ';'
        end

        def unique_parameters
            composite = composite_parameters

            parameters.find_all {|p| p.composite? || !composite.any? { |composite| composite.name == p.name } }
        end
    end

    class Parameter < CodeGen::Parameter
        include Declaration

        def composite_parameter_class
            CompositeParameter
        end
    end

    PARAMETER = ERB.new(File.read("build/parameter.ts.erb"), 0, '%<>')

    class CompositeParameter < CodeGen::CompositeParameter
        include Declaration

        def parameter_class
            Parameter
        end

        def type_script_type
            @owner.type_script_type + @name.pascalize
        end

        def type_script_interface
            PARAMETER.result(binding)
        end

        def unique_parameters
            composite = composite_parameters

            parameters.find_all {|p| p.composite? || !composite.any? { |composite| composite.name == p.name } }
        end
    end

    class Result < CodeGen::Result
        def type_script_type
            CodeGen::TypeScript.type(@type.split('|')[0].strip)
        end
    end

    COMPONENT = ERB.new(File.read("build/component.ts.erb"), 0, '%<>')

    class Component < CodeGen::Component
        include Options

        def plugin
            return 'Mobile' + @name if @full_name.include?('mobile')

            @name
        end

        def widget?
            @full_name.include?('ui.')
        end

        def mobile?
            @full_name.include?('mobile.')
        end

        def type_script_base_class
            return 'kendo.ui.Widget' if widget? && !mobile?

            return 'kendo.mobile.ui.Widget' if widget? && mobile?

            'Observable'
        end

        def namespace
            @full_name.sub('.' + @name, '')
        end

        def type_script_options_type
            type_script_type + 'Options'
        end

        def type_script_class
            COMPONENT.result(binding)
        end

        def type_script_type
            name
        end

        def add_method(settings)
            description = settings[:description]
            result = settings[:result]

            if description =~ /Gets?\/Sets?/i

                settings[:result] = nil

                super(:description => description,
                      :name => settings[:name],
                      :result => result)
            end

            super(settings)
        end
    end

    COMPOSITE = ERB.new(File.read("build/composite_option.ts.erb"), 0, '%<>')

    class CompositeOption < CodeGen::CompositeOption
        include Options

        def type_script_type
            @owner.type_script_type + @name.pascalize
        end

        def type_script_interface
            COMPOSITE.result(binding)
        end
    end

    class Option < CodeGen::Option
        include Options

        def type_script_type
            return 'any' if @type.size > 1

            CodeGen::TypeScript.type(@type[0])
        end

    end

    class ArrayOption < CompositeOption
        include CodeGen::Array

        def item_class
            ArrayItem
        end

        def type_script_interface
            item.type_script_interface
        end

        def type_script_declaration
            "#{name}?: #{item.type_script_type}[];"
        end
    end

    class ArrayItem < CompositeOption
        def type_script_type
            super.sub(@owner.name.pascalize, '')
        end
    end

end

def get_type_script(sources)

    sources = sources.find_all { |source| !CodeGen::TypeScript::EXCLUDE.include?(source) }

    components = sources.map do |source|
        parser = CodeGen::MarkdownParser.new

        parser.parse(File.read(source), CodeGen::TypeScript::Component)
    end

    components = components.sort { |a, b| a.plugin <=> b.plugin }

    namespaces = components.group_by { |component| component.namespace }

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
    TYPE_SCRIPT_SOURCES = FileList["docs/api/web/*.md"]
        .include('docs/api/framework/*.md')
        .include('docs/api/dataviz/*.md')
        .include('docs/api/mobile/*.md')

    %w(master production).each do |branch|
        namespace branch do
            desc "Test TypeScript generation"
            task :test do
                sh "cd docs && git fetch && git reset --hard origin/#{branch}"

                path = "dist/kendo-#{branch}.d.ts"

                File.open(path, "w") do |f|
                    f.write get_type_script(TYPE_SCRIPT_SOURCES)
                end

                sh "node_modules/typescript/bin/tsc #{path}"
            end
        end
    end
end
