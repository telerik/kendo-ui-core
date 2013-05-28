require 'debugger'

class String
    def to_attribute
        self.gsub(/[A-Z]/, '-\0').downcase
    end
end

module CodeGen::MVC::Mobile

    module Wrappers

        TYPES = {
            'Number' => 'int',
            'String' => 'string',
            'Boolean' => 'bool',
            'Object' => 'object',
            'Function' => 'string',
            'Date' => 'DateTime'
        }

        SERIALIZATION_SKIP_LIST = [
            'actionsheet.items.text',
            'buttongroup.items.text',
            'tabstrip.items.text',
            'tabstrip.items.href'
        ]

        CSPROJ = 'wrappers/mvc/src/Kendo.Mvc/Kendo.Mvc.csproj'

        COMPONENT = ERB.new(File.read("build/codegen/lib/mvc/component.csharp.erb"), 0, '%<>')
        COMPONENT_FLUENT = ERB.new(File.read("build/codegen/lib/mvc/component.builder.csharp.erb"), 0, '%<>')
        SETTING = ERB.new(File.read("build/codegen/lib/mvc/setting.csharp.erb"), 0, '%<>')
        SETTING_FLUENT = ERB.new(File.read("build/codegen/lib/mvc/setting.builder.csharp.erb"), 0, '%<>')
        EVENT = ERB.new(File.read("build/codegen/lib/mvc/event.builder.csharp.erb"), 0, '%<>')
        ITEM_FACTORY = ERB.new(File.read("build/codegen/lib/mvc/item.factory.csharp.erb"), 0, '%<>')
        HTML_BUILDER = ERB.new(File.read("build/codegen/lib/mvc/html.builder.csharp.erb"), 0, '%<>')

        COMPONENT_FIELDS = ERB.new(%{//>> Fields
        <%= unique_options.map { |option| option.to_declaration }.join %>
        //<< Fields})

        FIELD_DECLARATION = ERB.new(%{
        public <%= csharp_type %> <%= csharp_name %> { get; set; }
        })

        FIELD_SERIALIZATION = ERB.new(%{//>> Serialization
        <%= unique_options.map { |option|
            next if SERIALIZATION_SKIP_LIST.include?(option.full_name)
            option.to_client_option
        }.join %>
        //<< Serialization})

        COMPOSITE_FIELD_DECLARATION = ERB.new(%{
        public <%= csharp_class %> <%= csharp_name %>
        {
            get;
            private set;
        }
        })

        COMPOSITE_FIELD_INITIALIZATION = ERB.new(%{//>> Initialization
        <%= composite_options.map { |option| option.to_initialization }.join %>
        //<< Initialization})


        COMPONENT_FLUENT_FIELDS = ERB.new(%{//>> Fields
        <%= unique_options.map { |option| option.to_fluent }.join %>
        //<< Fields})

        FLUENT_FIELD_DECLARATION = ERB.new(%{
        /// <summary>
        /// <%= description.gsub(/\r?\n/, '\n\t\t/// ')%>
        /// </summary>
        /// <param name="value">The value that configures the <%= csharp_name.downcase %>.</param>
        public <%= owner.instance_of?(ArrayOption) ? owner.csharp_item_class : owner.csharp_class %>Builder <%= csharp_name %>(<%= csharp_type %> value)
        {
            container.<%= csharp_name %> = value;

            return this;
        }
        })

        FLUENT_COMPOSITE_FIELD_DECLARATION = ERB.new(%{
        /// <summary>
        /// <%= description.gsub(/\r?\n/, '\n\t\t/// ')%>
        /// </summary>
        /// <param name="configurator">The action that configures the <%= csharp_name.downcase %>.</param>
        public <%= owner.csharp_class %>Builder <%= csharp_name%>(Action<<%= csharp_builder_class %>> configurator)
        {
            configurator(new <%= csharp_builder_class %>(container.<%= csharp_name%>));
            return this;
        }
        })

        FLUENT_EVENTS = ERB.new(%{//>> Handlers
        <%= events.map { |event| event.to_fluent }.join %>
        //<< Handlers})

        FLUENT_EVENT_DECLARATION = ERB.new(%{
        /// <summary>
        /// <%= description.gsub(/\r?\n/, '\n\t\t/// ')%>
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the <%= name %> event.</param>
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
        ///             .Name("<%= csharp_class %>")
        /// %&gt;
        /// </code>
        /// </example>
        public virtual <%= csharp_class %>Builder <%= csharp_class %>()
        {
            return new <%= csharp_class %>Builder(new <%= csharp_class %>(ViewContext, Initializer, UrlGenerator));
        }
        })

        ENUM = ERB.new(File.read("build/codegen/lib/mvc/enum.csharp.erb"), 0, '%<>')

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

            def full_name
                name = @name

                if !@owner.nil?
                    name = @owner.full_name + '.' + name
                end

                name.downcase
            end
        end

        class Option < CodeGen::Option
            include Options

            def csharp_type
                if values
                    "#{owner.csharp_class.gsub(/Settings/, "")}#{csharp_name}"
                else
                    TYPES[type[0]]
                end
            end

            def to_declaration
                FIELD_DECLARATION.result(binding)
            end

            def to_fluent
                FLUENT_FIELD_DECLARATION.result(binding)
            end

            def to_client_option
                if csharp_type.eql?('string')
                    return ERB.new(%{
            if (<%=csharp_name%>.HasValue())
            {
                json["<%= name.to_attribute %>"] = <%=csharp_name%>;
            }
            }).result(binding)
                end

                ERB.new(%{
            json["<%= name.to_attribute %>"] = <%=csharp_name%>;
                }).result(binding)
            end

            def to_enum
                ENUM.result(binding)
            end
        end

        class CompositeOption < CodeGen::CompositeOption
            include Options

            def csharp_class
                "#{owner.csharp_class.gsub(/Settings/, "")}#{csharp_name}Settings"
            end

            def csharp_builder_class
                "#{csharp_class}Builder"
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
                ERB.new(%{
            json["<%= name.to_attribute %>"] = <%=csharp_name%>.ToJson();
                }).result(binding)
            end

            def get_binding
                binding
            end
        end

        class ArrayOption < CompositeOption
            def csharp_class
                "List<#{csharp_item_class}>"
            end

            def csharp_builder_class
                "#{owner.csharp_class}#{csharp_name.chop}Factory"
            end

            def csharp_item_class
                "#{owner.csharp_class}#{csharp_name.chop}"
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
                write_enums(component)
                write_fluent(component)
                write_settings(component)
                write_events(component)
                write_html_builder(component)
            end

            def write_class(component)
                filename = "#{@path}/#{component.path}/#{component.csharp_class}.cs"

                write_file(filename, component.to_class(filename))
            end

            def write_html_builder(component)
                return if component.csharp_class.eql?('MobileApplication')

                filename = "#{@path}/#{component.path}/Html/#{component.csharp_class}HtmlBuilder.cs"

                write_file(filename, component.to_html_builder(filename)) unless File.exists?(filename)
            end

            def write_enums(component)
                options = component.enum_options

                options.each do |option|
                    filename = "#{@path}/#{component.path}/#{component.csharp_class}#{option.csharp_name}.cs"

                    write_file(filename, component.to_enum(filename, option))
                end
            end

            def write_fluent(component)
                filename = "#{@path}/#{component.path}/Fluent/#{component.csharp_class}Builder.cs"

                write_file(filename, component.to_fluent(filename))
            end

            def write_settings(component)
                options = component.composite_options

                options.each do |option|
                    if option.instance_of?(ArrayOption)
                        write_array(component, option)

                        next
                    end

                    # write *Settings.cs file
                    filename = "#{@path}/#{component.path}/Settings/#{option.csharp_class}.cs"

                    write_file(filename, component.to_setting(filename, option))

                    # write *SettingsBuilder.cs file
                    filename = "#{@path}/#{component.path}/Fluent/#{option.csharp_builder_class}.cs"

                    write_file(filename, component.to_fluent_setting(filename, option))

                    # nested composite options
                    options.push(*option.composite_options) if option.composite_options
                end
            end

            def write_array(component, option)
                #write *Factory.cs file
                filename = "#{@path}/#{option.owner.path}/Fluent/#{option.csharp_builder_class}.cs"
                component.files.push(filename)
                write_file(filename, ITEM_FACTORY.result(option.get_binding))

                #write *Item.cs file
                filename = "#{@path}/#{option.owner.path}/#{option.csharp_item_class}.cs"
                write_file(filename, component.to_setting(filename, option))

                #write *ItemBuilder.cs file
                filename = "#{@path}/#{option.owner.path}/Fluent/#{option.csharp_item_class}Builder.cs"
                write_file(filename, component.to_fluent_setting(filename, option))
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

            attr_accessor :files

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
            end

            def to_html_builder(filename)
                @files.push(filename)

                HTML_BUILDER.result(binding)
            end

            def to_enum(filename, option)
                @files.push(filename)

                option.to_enum
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

                csharp = csharp.sub(/\/\/>> Serialization(.|\n)*\/\/<< Serialization/, FIELD_SERIALIZATION.result(option.get_binding))
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

            def enum_options
                enums = simple_options.select{ |o| !o.values.nil? }
                composite = composite_options.flat_map { |o| o.options }

                composite.each do |item|
                    composite.push(*item.options) if item.composite?

                    enums.push(item) if !item.values.nil?
                end

                enums
            end
        end
    end
end
