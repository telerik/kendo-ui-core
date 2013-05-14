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

        CSPROJ = 'wrappers/mvc/src/Kendo.Mvc/Kendo.Mvc.csproj'

        COMPONENT = ERB.new(File.read("build/codegen/lib/mvc/component.csharp.erb"), 0, '%<>')
        COMPONENT_FLUENT = ERB.new(File.read("build/codegen/lib/mvc/component.builder.csharp.erb"), 0, '%<>')
        SETTING = ERB.new(File.read("build/codegen/lib/mvc/setting.csharp.erb"), 0, '%<>')
        SETTING_FLUENT = ERB.new(File.read("build/codegen/lib/mvc/setting.builder.csharp.erb"), 0, '%<>')
        EVENT = ERB.new(File.read("build/codegen/lib/mvc/event.builder.csharp.erb"), 0, '%<>')

        COMPONENT_FIELDS = ERB.new(%{
        //>> Fields
        <%= unique_options.map { |option| option.to_declaration }.join %>
        //<< Fields})

        FIELD_DECLARATION = ERB.new(%{
        public <%= csharp_type %> <%= csharp_name %> { get; set; }
        })

        FIELD_SERIALIZATION = ERB.new(%{
        //>> Serialization
        <%= unique_options.map { |option| option.to_client_option }.join %>
        //<< Serialization})

        COMPOSITE_FIELD_DECLARATION = ERB.new(%{
        public <%= csharp_class %> <%= csharp_name %>
        {
            get;
            private set;
        }
        })

        COMPOSITE_FIELD_INITIALIZATION = ERB.new(%{
        //>> Initialization
        <%= composite_options.map { |option| option.to_initialization }.join %>
        //<< Initialization})


        COMPONENT_FLUENT_FIELDS = ERB.new(%{
        //>> Fields
        <%= unique_options.map { |option| option.to_fluent }.join %>
        //<< Fields})

        FLUENT_FIELD_DECLARATION = ERB.new(%{
        public <%= self.owner.csharp_class %>Builder <%= csharp_name %>(<%= csharp_type %> value)
        {
            container.<%= csharp_name %> = value;

            return this;
        }
        })

        FLUENT_COMPOSITE_FIELD_DECLARATION = ERB.new(%{
        public <%= owner.csharp_class %>Builder <%= csharp_name%>(Action<<%= csharp_class %>Builder> configurator)
        {
            configurator(new <%= csharp_class %>Builder(container.<%= csharp_name%>));
            return this;
        }
        })

        FLUENT_EVENTS = ERB.new(%{
        //>> Handlers
        <%= events.map { |event| event.to_fluent }.join %>
        //<< Handlers
        })

        FLUENT_EVENT_DECLARATION = ERB.new(%{
        public <%= owner.csharp_class %>EventBuilder <%= csharp_name %>(string handler)
        {
            Handler("<%= name %>", handler);

            return this;
        }
        })

        COMPONENT_REGISTER = ERB.new(%{
        /// <summary>
        /// Creates a <see cref="<%= csharp_class %>"/>
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().<%= csharp_class %>()
        ///             .Name("<%= csharp_class %>");
        /// %&gt;
        /// </code>
        /// </example>
        public virtual <%= csharp_class %>Builder <%= csharp_class %>()
        {
            return new <%= csharp_class %>Builder(new <%= csharp_class %>(ViewContext, Initializer, UrlGenerator));
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
                composite = composite_options.map { |o| o.name }

                options.find_all { |o| o.composite? || !composite.include?(o.name) }
            end

            def csharp_name
                name.slice(0,1).capitalize + name.slice(1..-1)
            end
        end

        class Option < CodeGen::Option
            include Options

            def csharp_type
                TYPES[type[0]]
            end

            def to_declaration
                FIELD_DECLARATION.result(binding)
            end

            def to_fluent
                FLUENT_FIELD_DECLARATION.result(binding)
            end

            def to_client_option
                ERB.new(%{
            options["<%=name.camelize%>"] = <%=csharp_name%>;
                }).result(binding)
            end
        end

        class CompositeOption < CodeGen::CompositeOption
            include Options

            def csharp_class
                "#{owner.csharp_class.gsub(/Settings/, "")}#{csharp_name}Settings"
            end

            def to_initialization
                ERB.new(%{
            <%=csharp_name%> = new <%=csharp_class%>();
                }).result(binding)
            end

            def to_declaration
                COMPOSITE_FIELD_DECLARATION.result(binding)
            end

            def to_fluent
                FLUENT_COMPOSITE_FIELD_DECLARATION.result(binding)
            end

            def to_client_option
                "Composite client option for #{name}"
            end

            def get_binding
                binding
            end
        end

        class Event < CodeGen::Event
            include Options

            def to_fluent
                FLUENT_EVENT_DECLARATION.result(binding)
            end
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
                write_events(component)
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

            def write_events(component)
                return if component.events.empty?

                filename = "#{@path}/#{component.path}/Fluent/#{component.csharp_class}EventBuilder.cs"

                write_file(filename, component.to_events(filename))
            end

            def cs_proj(component)
                return unless File.exists?(CSPROJ)

                proj_content = File.read(CSPROJ)

                includes = ''
                component.files.each do |filename|
                    filename.sub!(%r{^#{@path}}, '').gsub!(/\//, "\\")

                    item = "<Compile Include=\"UI#{filename}\" />"

                    if !(proj_content =~ %r{#{Regexp.escape(item)}})
                        includes << item
                    end
                end

                if !includes.empty?
                    proj_content = proj_content.sub(/<\/Project>/, "<ItemGroup>#{includes}</ItemGroup></Project>")

                    write_file(CSPROJ, proj_content)
                end
            end

            def write_file(filename, content)
                $stderr.puts("Updating #{filename}") if VERBOSE

                ensure_path(filename)

                File.write(filename, content.dos)
            end
        end

        class Component < CodeGen::Component
            include Options

            attr_reader :files

            def initialize *args
                super

                @files = []
            end

            def name
                "Mobile#{@name}"
            end

            def path
                name
            end

            def csharp_class
                name
            end

            def to_class(filename)
                @files.push(filename)

                csharp = File.exists?(filename) ? File.read(filename) : COMPONENT.result(binding)

                csharp = csharp.sub(/\/\/>> Fields(.|\n)*\/\/<< Fields/, COMPONENT_FIELDS.result(binding))

                csharp = csharp.sub(/\/\/>> Initialization(.|\n)*\/\/<< Initialization/, COMPOSITE_FIELD_INITIALIZATION.result(binding))

                #csharp = csharp.sub(/\/\/>> Serialization(.|\n)*\/\/<< Serialization/, FIELD_SERIALIZATION.result(binding))
            end

            def to_fluent(filename)
                @files.push(filename)

                csharp = File.exists?(filename) ? File.read(filename) : COMPONENT_FLUENT.result(binding)

                csharp = csharp.sub(/\/\/>> Fields(.|\n)*\/\/<< Fields/, COMPONENT_FLUENT_FIELDS.result(binding))
            end

            def to_setting(filename, option)
                @files.push(filename)

                csharp = File.exists?(filename) ? File.read(filename) : SETTING.result(option.get_binding)

                csharp = csharp.sub(/\/\/>> Fields(.|\n)*\/\/<< Fields/, COMPONENT_FIELDS.result(option.get_binding))

                csharp = csharp.sub(/\/\/>> Initialization(.|\n)*\/\/<< Initialization/, COMPOSITE_FIELD_INITIALIZATION.result(option.get_binding))
            end

            def to_fluent_setting(filename, option)
                @files.push(filename)

                csharp = File.exists?(filename) ? File.read(filename) : SETTING_FLUENT.result(option.get_binding)

                csharp = csharp.sub(/\/\/>> Fields(.|\n)*\/\/<< Fields/, COMPONENT_FLUENT_FIELDS.result(option.get_binding))
            end

            def to_events(filename)
                @files.push(filename)

                csharp = File.exists?(filename) ? File.read(filename) : EVENT.result(binding)

                csharp = csharp.sub(/\/\/>> Handlers(.|\n)*\/\/<< Handlers/, FLUENT_EVENTS.result(binding))
            end

            def register(container)
                container << COMPONENT_REGISTER.result(binding)
            end
        end
    end
end
