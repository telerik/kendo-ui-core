require 'erb'
require 'codegen/lib/options'
require 'codegen/lib/markdown_parser'
require 'codegen/lib/component'

JSONTYPEDEF = ERB.new(File.read("build/codegen/lib/json_typedef/kendo.json.erb"), 0, '%<>')

module CodeGen::JsonTypeDef
    TYPES = {
        'Number' => 'number',
        'String' => 'string',
        'Boolean' => 'bool',
        'Document' => 'Document',
        'Range' => 'Range',
        'Object' => 'Object',
        'Array' => '[]',
        'Date' => 'Date',
        'Function' => 'fn()',
        'Selection' => 'Selection',
        'Element' => 'Element',
        'HTMLCollection' => 'HTMLCollection',
        'jQuery' => '+jQuery',
        'jqXHR' => '+XMLHttpRequest',
        'jQueryEvent' => '+jQuery.Event',
        'jQuery.Event' => '+jQuery.Event',
        'Selector' => 'string',
        'TouchEvent' => '+kendo.mobile.ui.TouchEventOptions',
        'Point' => '+kendo.mobile.ui.Point'
    }

    def self.type(type)
        return "+#{type}" if type.start_with?('kendo')

        result = TYPES[type]

        raise "No JsonTypeDef mapping for type #{type}" unless result

        result
    end

    module Declaration
        def type_script_declaration
            "#{name}?: #{type_script_type};"
        end

        def type_script_type
            raise "#{name} doesn't have a type specified" unless @type

            return 'any' if @type.size > 1

            CodeGen::JsonTypeDef.type(@type[0])
        end
    end

    MANUALLY_GENERATED = {
        'schema' => ['model'],
        'column' => ['editor'],
        'transport' => ['parameterMap']
    }

    module Options
        include Declaration

        def field_class
            Field
        end

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

        def type_script_declaration
            "#{name}?(e: #{type_script_type}): void;";
        end
    end

    FIELD_OVERRIDES = {
        'Grid' => {
            'columns' => 'GridColumn[]'
        }
    }

    class Field < CodeGen::Field
        def type_script_type
            raise "#{name} doesn't have a type specified" unless @type

            if FIELD_OVERRIDES.has_key?(@owner.name)
                overrides = FIELD_OVERRIDES[@owner.name]

                if overrides.has_key?(@name)
                    return overrides[name]
                end
            end

            CodeGen::JsonTypeDef.type(@type)
        end

        def type_script_declaration
            "#{name}: #{type_script_type};"
        end
    end

    class EventOption < CodeGen::EventOption
        include Declaration

        def composite_option_class
            CompositeEventOption
        end

    end

    EVENT = ERB.new(File.read("build/codegen/lib/json_typedef/event.json.erb"), 0, '%<>')

    class CompositeEventOption < CodeGen::CompositeEventOption
        include Options

        def type_script_type
            @owner.type_script_type + @name.pascalize
        end

        def type_script_interface
            EVENT.result(binding)
        end
    end

    METHOD = ERB.new(File.read("build/codegen/lib/json_typedef/method.json.erb"), 0, '%<>')

    METHOD_JSDOC = ERB.new(%{/**
        <%= description %>
        @method
        <%- combination.each do |parameter| -%>
        @param <%= parameter.name %> - <%= parameter.description %>
        <%- end -%>
        <%- if result -%>
        Returns <%= result.description %>
        <%- end -%>
        */
        <%= declaration %>}, 0, '-')

    class Method < CodeGen::Method

        def result_class
            Result
        end

        def parameter_class
            Parameter
        end

        def json_typedef_parameters()
            params = parameters.map do |p|
                "#{p.name}: #{p.json_typedef_type}"
            end

            params.join(', ')
        end

        def json_typedef
            if @result
                result_type = ' -> ' + @result.json_typedef
            else
                result_type = ''
            end

            METHOD.result(binding)
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

        def json_typedef_type
            raise "#{name} doesn't have a type specified" unless @type

            return 'Object' if @type.size > 1

            CodeGen::JsonTypeDef.type(@type[0])
        end
    end

    PARAMETER = ERB.new(File.read("build/codegen/lib/json_typedef/parameter.json.erb"), 0, '%<>')

    class CompositeParameter < CodeGen::CompositeParameter
        include Declaration

        def parameter_class
            Parameter
        end

        def json_typedef_type
            'Object'
        end

        def unique_parameters
            composite = composite_parameters

            parameters.find_all {|p| p.composite? || !composite.any? { |composite| composite.name == p.name } }
        end
    end

    class Result < CodeGen::Result
        def json_typedef
            type = CodeGen::JsonTypeDef.type(@type.split('|')[0].strip)

            return '+' + type if type =~ /^kendo\./

            type
        end
    end

    COMPONENT = ERB.new(File.read("build/codegen/lib/json_typedef/component.json.erb"), 0, '%<>')

    COMPONENT_PLUGIN = ERB.new(File.read("build/codegen/lib/json_typedef/component_plugin.json.erb"), 0, '%<>')

    class Component < CodeGen::Component
        include Options

        def plugin
            return 'Mobile' + @name if @full_name.include?('mobile')

            @name
        end

        def mobile?
            @full_name.include?('mobile.')
        end

        def fx?
            @full_name.include?('FX')
        end

        def namespace
            @full_name.sub('.' + @name, '')
        end

        def json_typedef
            COMPONENT.result(binding)
        end

        def plugin_json_typedef
            return unless @full_name.include?('ui')

            COMPONENT_PLUGIN.result(binding)
        end

        def add_method(settings)
            description = settings[:description]
            result = settings[:result]

            if description =~ /Gets?\/Sets?/i || description =~ /gets?\s+or\s+sets?/i

                settings[:result] = nil

                super(:description => description,
                      :name => settings[:name],
                      :result => result)
            end

            super(settings)
        end
    end

    COMPOSITE = ERB.new(File.read("build/codegen/lib/json_typedef/composite_option.json.erb"), 0, '%<>')

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

            CodeGen::JsonTypeDef.type(@type[0])
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

def get_json_typedef(name, sources)

    sources = sources.find_all { |source| !CodeGen::TypeScript::EXCLUDE.include?(source) && source.end_with?('.md') }

    components = sources.map do |source|
        parser = CodeGen::MarkdownParser.new

        File.open(source, 'r:bom|utf-8') do |file|
            parser.parse(file.read, CodeGen::JsonTypeDef::Component)
        end
    end

    components = components.sort { |a, b| a.plugin <=> b.plugin }

    namespaces = components.group_by { |component| component.namespace }

    def component_json_typedefs (namespace)
      namespace.map { |component| component.json_typedef }.reject(&:blank?).join(",") 
    end

    suite = name.match(/kendo\.([^.]*)\.json/).captures.first

    suite = 'mobile' if suite == 'icenium'

    JSONTYPEDEF.result(binding)
end

class JsonTypeDefTask < Rake::FileTask
    include Rake::DSL

    def execute(args=nil)
        mkdir_p File.dirname(name), :verbose => false

        $stderr.puts("Creating #{name}") if VERBOSE

        File.write(name, get_type_script(name, prerequisites))
    end
end

def json_typedef(*args, &block)
    JsonTypeDefTask.define_task(*args, &block)
end

namespace :json_typedef do
    %w(master production).each do |branch|
        namespace branch do
            desc "Test JSON TypeDef generation"
            task :test do
                #sh "cd docs && git fetch && git reset --hard origin/#{branch}"

                SUITES.each do |suite, dependencies|
                    path = "dist/kendo.#{suite}.json"

                    File.write(path, get_json_typedef(path, dependencies))
                end

            end
        end
    end
end
