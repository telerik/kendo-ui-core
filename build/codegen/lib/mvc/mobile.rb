require 'debugger'

module CodeGen::MVC::Mobile

    module Wrappers

        TYPES = {
            'Number' => 'int',
            'String' => 'string',
            'Boolean' => 'bool',
            'Object' => 'object',
            'Array' => 'IEnumerable',
            'Function' => 'string',
            'Date' => 'DateTime'
        }

        COMPONENT = ERB.new(File.read("build/codegen/lib/mvc/component.csharp.erb"), 0, '%<>')

        COMPONENT_FIELDS = ERB.new(%{//>> Fields
        <%= unique_options.map { |option| option.to_declaration }.join %>
        //<< Fields})

        FIELDS_DECLARATION = ERB.new(%{
        public <%= csharp_type %> <%= csharp_name %> { get; set; }
        })

        FIELDS_SERIALIZATION = ERB.new(%{//>> Serialization
        <%= unique_options.map { |option| option.to_client_option }.join %>
        //<< Serialization})

        COMPONENT_FLUENT = ERB.new(File.read("build/codegen/lib/mvc/component.builder.csharp.erb"), 0, '%<>')

        COMPONENT_FLUENT_FIELDS = ERB.new(%{//>> Fields
        <%= unique_options.map { |option| option.to_fluent }.join %>
        //<< Fields})

        FLUENT_FIELDS_DECLARATION = ERB.new(%{
        public <%= self.owner.csharp_class %>Builder <%= csharp_name %>(<%= csharp_type %> value)
        {
            container.<%= csharp_name %> = value;

            return this;
        }
        })

        COMPOSITE_FIELDS_DECLARATION = ERB.new(%{
        public <%= csharp_class %> <%= csharp_name %>
        {
            get;
            private set;
        }
        })

        COMPOSITE_FIELDS_INITIALIZATION = ERB.new(%{//>> Initialization
        <%= composite_options.map { |option| option.to_initialization }.join %>
        //<< Initialization})

        SETTING = ERB.new(File.read("build/codegen/lib/mvc/setting.csharp.erb"), 0, '%<>')

        SETTING_FLUENT = ERB.new(File.read("build/codegen/lib/mvc/setting.builder.csharp.erb"), 0, '%<>')

        SETTING_FLUENT_FIELDS = ERB.new(%{//>> Fields
        <%= unique_options.map { |option| option.composite? }.join %>
        //<< Fields})

        FLUENT_COMPOSITE_FIELDS_DECLARATION = ERB.new(%{
        public <%= owner.csharp_class %>Builder <%= csharp_name%>(Action<<%= csharp_class %>Builder> configurator)
        {
            configurator(new <%= csharp_class %>Builder(container.<%= csharp_name%>));
            return this;
        }
        })

        module Options
            def component_class
                Component
            end

            def composite_option_class
                CompositeOption
            end

            def option_class
                Option
            end

            def event_class
                Event
            end

            def array_option_class
                ArrayOption
            end

            def unique_options
                composite = composite_options

                options.find_all do |option|
                    option.composite? || !composite.any? { |composite| composite.name == option.name }
                end
            end
        end

        class Option < CodeGen::Option
            include Options

            def csharp_type
                TYPES[type[0]]
            end

            def csharp_name
                name.slice(0,1).capitalize + name.slice(1..-1)
            end

            def to_declaration
                FIELDS_DECLARATION.result(binding)
            end

            def to_fluent
                FLUENT_FIELDS_DECLARATION.result(binding)
            end

            def to_client_option
                ERB.new(%{
            options["<%=name.camelize%>"] = <%=csharp_name%>;
                }).result(binding)
            end
        end

        class CompositeOption < CodeGen::CompositeOption
            include Options

            def csharp_name
                name.slice(0,1).capitalize + name.slice(1..-1)
            end

            def csharp_class
                "#{owner.csharp_class.gsub(/Settings/, "")}#{csharp_name}Settings"
            end

            def to_initialization
                ERB.new(%{
            <%=csharp_name%> = new <%=csharp_class%>();
                }).result(binding)
            end

            def to_declaration
                COMPOSITE_FIELDS_DECLARATION.result(binding)
            end

            def to_fluent
                FLUENT_COMPOSITE_FIELDS_DECLARATION.result(binding)
            end

            def to_client_option
                "Composite client option for #{name}"
            end

            def get_binding
                binding
            end
        end

        class ArrayOption < CodeGen::ArrayOption
            include Options

            def csharp_name
            end

            def csharp_class
            end

            def to_initialization
            end

            def to_declaration
            end

            def to_fluent
            end

            def to_client_option
            end

            def get_binding
                binding
            end
        end

        class Event < CodeGen::Event
            include Options

        end

        class Generator
            include Rake::DSL

            def initialize(path)
                @path = path
            end

            def component(component)
                write_class(component)
                write_fluent(component)
                write_settings(component)
            end

            def write_class(component)
                filename = "#{@path}/#{component.path}/#{component.csharp_class}.cs"

                write_file(filename, component.to_class(filename))
            end

            def write_fluent(component)
                filename = "#{@path}/#{component.path}/Fluent/#{component.csharp_class}Builder.cs"

                write_file(filename, component.to_fluent(filename))
            end

            def write_settings(component)
                options = component.composite_options

                options.each do |option|
                    # write *Settings.cs file
                    filename = "#{@path}/#{component.path}/Settings/#{option.csharp_class}.cs"

                    write_file(filename, component.to_setting(filename, option))

                    # write *SettingsBuilder.cs file
                    filename = "#{@path}/#{component.path}/Fluent/#{option.csharp_class}Builder.cs"

                    write_file(filename, component.to_fluent_setting(filename, option))

                    # nested composite options
                    options.push(*option.composite_options) if option.composite_options
                end
            end

            def write_file(filename, content)
                $stderr.puts("Updating #{filename}") if VERBOSE

                ensure_path(filename)

                File.write(filename, content)
            end
        end

        class Component < CodeGen::Component
            include Options

            def namespace
                @full_name.sub('.' + @name, '')
            end

            def path
                "Mobile#{@name}"
            end

            def csharp_class
                "Mobile#{@name}"
            end

            def to_class(filename)
                csharp = File.exists?(filename) ? File.read(filename) : COMPONENT.result(binding)

                csharp = csharp.sub(/\/\/>> Fields(.|\n)*\/\/<< Fields/, COMPONENT_FIELDS.result(binding))

                csharp = csharp.sub(/\/\/>> Initialization(.|\n)*\/\/<< Initialization/, COMPOSITE_FIELDS_INITIALIZATION.result(binding))

                #csharp = csharp.sub(/\/\/>> Serialization(.|\n)*\/\/<< Serialization/, FIELDS_SERIALIZATION.result(binding))

                csharp.dos
            end

            def to_fluent(filename)
                csharp = File.exists?(filename) ? File.read(filename) : COMPONENT_FLUENT.result(binding)

                csharp = csharp.sub(/\/\/>> Fields(.|\n)*\/\/<< Fields/, COMPONENT_FLUENT_FIELDS.result(binding))

                csharp.dos
            end

            def to_setting(filename, option)
                csharp = File.exists?(filename) ? File.read(filename) : SETTING.result(option.get_binding)

                csharp = csharp.sub(/\/\/>> Fields(.|\n)*\/\/<< Fields/, COMPONENT_FIELDS.result(option.get_binding))

                csharp = csharp.sub(/\/\/>> Initialization(.|\n)*\/\/<< Initialization/, COMPOSITE_FIELDS_INITIALIZATION.result(option.get_binding))

                csharp.dos
            end

            def to_fluent_setting(filename, option)
                csharp = File.exists?(filename) ? File.read(filename) : SETTING_FLUENT.result(option.get_binding)

                csharp = csharp.sub(/\/\/>> Fields(.|\n)*\/\/<< Fields/, COMPONENT_FLUENT_FIELDS.result(option.get_binding))

                csharp.dos
            end

        end
    end
end
