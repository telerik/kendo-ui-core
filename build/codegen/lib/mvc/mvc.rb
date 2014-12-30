# proper capitalization for legacy event names
CSHARP_NAME_MAP = {
    'dragend' => 'DragEnd',
    'dragstart' => 'DragStart'
}

class String
    def to_attribute
        self.gsub(/[A-Z]/, '-\0').downcase
    end

    def to_csharp_name
        CSHARP_NAME_MAP[self] || self.slice(0,1).capitalize + self.slice(1..-1)
    end
end

module CodeGen::MVC::Wrappers
    TYPES = {
        'Number' => 'double',
        'String' => 'string',
        'Boolean' => 'bool',
        'Object' => 'object',
        'Function' => 'string',
        'Date' => 'DateTime'
    }

    FIELD_TYPES = {
        'map.layers.extent' => 'double[]',
        'map.markers.location' => 'double[]',
        'treemap.colors' => 'string[]',
        'editor.stylesheets' => 'string[]',

        # types: Function => ClientHandlerDescriptior, perhaps?
        'toolbar.items.click' => 'ClientHandlerDescriptor',
        'toolbar.items.toggle' => 'ClientHandlerDescriptor',
        'toolbar.items.buttons.click' => 'ClientHandlerDescriptor',
        'toolbar.items.buttons.toggle' => 'ClientHandlerDescriptor',
        'treelist.columns.command.click' => 'ClientHandlerDescriptor'
    }

    SERIALIZATION_SKIP_LIST = [
		'diagram.editable',
		'diagram.editable.select',
		'diagram.editable.rotate',
		'diagram.editable.resize',
        'map.center',
        'map.controls.attribution',
        'map.controls.navigator',
        'map.controls.zoom',
        'map.layerdefaults.marker.shape',
        'map.layerdefaults.bubble.symbol',
        'map.layers.datasource',
        'map.layers.shape',
        'map.layers.symbol',
        'map.markers.position',
		'map.markers.shape',
		'map.markerdefaults.shape',
        'actionsheet.items.text',
        'buttongroup.items.text',
        'tabstrip.items.text',
        'tabstrip.items.url',
        'splitview.panes.id'
    ]

    FLUENT_SKIP_LIST = [
        'map.layers',
		'map.markers',
		'map.markerdefaults'
    ]

    INITIALIZATION_SKIP_LIST = [
		'map.markerdefaults',
		'map.layerdefaults',
		'map.layerdefaults.marker'
    ]

    GENERIC_BUILDER_SKIP_LIST = [
        'gantt'
    ]

    IGNORED = [
        'map.center',
        'map.controls.attribution.position',
        'map.controls.navigator.position',
        'map.controls.zoom.position',
        'map.layers.datasource',
        'map.layerdefaults.tile.subdomains',
        'map.layerdefaults.marker.tooltip',
        'map.layers.subdomains',
        'map.layers.tooltip',
        'map.markerdefaults.tooltip',
        'map.markers.tooltip',
        'popover.popup.direction',
        'layout.id',
        'view.model',
        'scrollview.pagesize',
        'scrollview.velocitythreshold',
        'scrollview.bouncevelocitythreshold',
        'scrollview.datasource',
        'drawer.views',
        'gantt.datasource',
        'gantt.dependencies',
        'gantt.columns',
        'treelist.datasource',
        'treelist.editable.window',
        'treeview.items',
        'treeview.autobind',
        'treeview.animation',
        'treeview.draganddrop',
        'treeview.loadondemand',
        'treeview.datasource',
        'treeview.checkboxes',
        'treeview.template',
        'editor.filebrowser',
        'editor.imagebrowser',
        'editor.messages',
        'editor.tag',
        'editor.tools',
        'editor.encoded',
        'editor.stylesheets',
        'editor.content',
        'colorpicker.palette',
        'colorpicker.tilesize',
		'diagram.shapedefaults.visual',
		'diagram.shapes.visual',
		'diagram.datasource',
		'diagram.connectionsdatasource',
		'treemap.datasource'
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
        public <%= nullable? || csharp_array? ? csharp_type : csharp_type + '?'%> <%= csharp_name %> { get; set; }
        })

        FIELD_SERIALIZATION = ERB.new(%{//>> Serialization
        <%= unique_options.map { |option|
            next if SERIALIZATION_SKIP_LIST.include?(option.full_name)
            option.to_client_option
        }.join %>
        //<< Serialization})

        COMPOSITE_FIELD_DECLARATION = ERB.new(%{
        public <%= csharp_class %><%= csharp_generic_args if needs_generics? %> <%= csharp_name %>
        {
            get;
            set;
        }
        })

        COMPOSITE_FIELD_INITIALIZATION = ERB.new(%{//>> Initialization
        <%= composite_options.map { |option|
            next if INITIALIZATION_SKIP_LIST.include?(option.full_name)
            option.to_initialization
        }.join %>
        //<< Initialization})

        COMPONENT_FLUENT_FIELDS = ERB.new(%{//>> Fields
        <%= unique_options.map { |option| option.to_fluent }.join %>
        //<< Fields})

        FLUENT_FIELD_DECLARATION = ERB.new(%{<% if dictionary? %>
        /// <summary>
        /// <%= description.gsub(/\r?\n/, '\n\t\t/// ').html_encode()%>
        /// </summary>
        /// <param name="value">The value that configures the <%= csharp_name.downcase %>.</param>
        public <%= csharp_builder_name %> <%= csharp_name %>(object value)
        {
            return this.<%= csharp_name %>(value.ToDictionary());
        }
        <% end %><% if field? %>
        /// <summary>
        /// <%= description.gsub(/\r?\n/, '\n\t\t/// ').html_encode()%>
        /// </summary>
        /// <param name="expression">The expression that specifies the <%= csharp_name.downcase %>, based on the bound model.</param>
        public <%= csharp_builder_name %> <%= csharp_name %><TValue>(Expression<Func<T, TValue>> expression)
        {
            if (typeof(T).IsPlainType() && !expression.IsBindable())
            {
                throw new InvalidOperationException(Exceptions.MemberExpressionRequired);
            }

            container.<%= csharp_name %> = expression.MemberWithoutInstance();

            if (typeof(T).IsPlainType())
            {
                var metadata = ModelMetadata.FromLambdaExpression(expression, new ViewDataDictionary<T>());
                container.Title = metadata.DisplayName;
                container.Format = metadata.DisplayFormatString;
            }

            if (string.IsNullOrEmpty(container.Title))
            {
                var asTitle = container.<%= csharp_name %>.AsTitle();
                if (asTitle != container.<%= csharp_name %>) {
                    container.Title = asTitle;
                }
            }

            return this;
        }
        <% end %><% if handler? %>
        /// <summary>
        /// <%= description.gsub(/\r?\n/, '\n\t\t/// ').html_encode()%>
        /// </summary>
        /// <param name="value">The value that configures the <%= csharp_name.downcase %> action.</param>
        public <%= csharp_builder_name %> <%= csharp_name %>(Func<object, object> handler)
        {
            container.<%= csharp_name %>.TemplateDelegate = handler;

            return this;
        }

        /// <summary>
        /// <%= description.gsub(/\r?\n/, '\n\t\t/// ').html_encode()%>
        /// </summary>
        /// <param name="value">The value that configures the <%= csharp_name.downcase %> action.</param>
        public <%= csharp_builder_name %> <%= csharp_name %>(string handler)
        {
            container.<%= csharp_name %>.HandlerName = handler;

            return this;
        }<% else %>
        /// <summary>
        /// <%= description.gsub(/\r?\n/, '\n\t\t/// ').html_encode()%>
        /// </summary>
        /// <param name="value">The value that configures the <%= csharp_name.downcase %>.</param>
        public <%= csharp_builder_name %> <%= csharp_name %>(<%= csharp_array? ? 'params ' : '' %><%= csharp_type %> value)
        {
            container.<%= csharp_name %> = value;

            return this;
        }<% end %>
        })

        FLUENT_COMPOSITE_FIELD_DECLARATION = ERB.new(%{<% if toggleable %><% if default.eql?('false') %>
        /// <summary>
        /// <%= description.gsub(/\r?\n/, '\n\t\t/// ').html_encode()%>
        /// </summary>
        public <%= owner.respond_to?('csharp_item_class') ? owner.csharp_item_class : owner.csharp_class %>Builder<%= owner.csharp_generic_args %> <%= csharp_name%>()
        {
            return <%= csharp_name %>(true);
        }<% end %>

        /// <summary>
        /// <%= description.gsub(/\r?\n/, '\n\t\t/// ').html_encode()%>
        /// </summary>
        /// <param name="enabled">Enables or disables the <%= csharp_name.downcase %> option.</param>
        public <%= owner.respond_to?('csharp_item_class') ? owner.csharp_item_class : owner.csharp_class %>Builder<%= owner.csharp_generic_args %> <%= csharp_name%>(bool enabled)
        {
            container.<%= csharp_name %>.Enabled = enabled;
            return this;
        }

        <% end %>
        /// <summary>
        /// <%= description.gsub(/\r?\n/, '\n\t\t/// ').html_encode()%>
        /// </summary>
        /// <param name="configurator">The action that configures the <%= csharp_name.downcase %>.</param>
        public <%= owner.respond_to?('csharp_item_class') ? owner.csharp_item_class : owner.csharp_class %>Builder<%= owner.csharp_generic_args %> <%= csharp_name%>(Action<<%= csharp_builder_class %><%= csharp_generic_args %>> configurator)
        {<% if toggleable %>
            container.<%= csharp_name %>.Enabled = true;
            <% end %>
            configurator(new <%= csharp_builder_class %><%= csharp_generic_args %>(container.<%= csharp_name%>));
            return this;
        }
        })

        FLUENT_EVENTS = ERB.new(%{//>> Handlers
        <%= events.map { |event| event.to_fluent }.join %>
        //<< Handlers})

        FLUENT_EVENT_DECLARATION = ERB.new(%{
        /// <summary>
        /// <%= description.gsub(/\r?\n/, '\n\t\t/// ').html_encode()%>
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the <%= name %> event.</param>
        public <%= owner.csharp_class %>EventBuilder <%= csharp_name %>(string handler)
        {
            Handler("<%= event_name %>", handler);

            return this;
        }
        })

        NAMED_FACTORY_METHODS = ERB.new(%{//>> Factory methods
        <% if builtin_names.empty? %>
        /// <summary>
        /// Adds an item to the collection
        /// </summary>
        public virtual <%= csharp_item_class %>Builder<%= csharp_generic_args %> Add()
        {
            var item = new <%= csharp_item_class %>();

            container.Add(item);

            return new <%= csharp_item_class %>Builder<%= csharp_generic_args %>(item);
        }<% else %>
        /// <summary>
        /// Adds an item for a custom action.
        /// </summary>
        public virtual <%= csharp_item_class %>Builder<%= csharp_generic_args %> Custom()
        {
            var item = new <%= csharp_item_class %>();

            container.Add(item);

            return new <%= csharp_item_class %>Builder<%= csharp_generic_args %>(item);
        }<% end %><% builtin_names.each { |name| %>

        /// <summary>
        /// Adds an item for the <%= name %> action.
        /// </summary>
        public virtual <%= csharp_item_class %>Builder<%= csharp_generic_args %> <%= name.to_csharp_name %>()
        {
            var item = new <%= csharp_item_class %>() { Name = "<%= name %>" };

            container.Add(item);

            return new <%= csharp_item_class %>Builder<%= csharp_generic_args %>(item);
        }<% } %>
        //<< Factory methods})

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
        public virtual <%= csharp_class %>Builder<%= csharp_generic_args %> <%= csharp_class %><%= csharp_generic_args %>()<%= csharp_generic_constraints %>
        {
            return new <%= csharp_class %>Builder<%= csharp_generic_args %>(new <%= csharp_class %><%= csharp_generic_args %>(<%= csharp_registration_args %>));
        }
        })

    ENUM = ERB.new(File.read("build/codegen/lib/mvc/enum.csharp.erb"), 0, '%<>')

    module Options

        def unique_options
            composite = composite_options.map { |o| o.name }

            f = options.find_all { |o| o.composite? || !composite.include?(o.name) }
        end

        def csharp_name
            postfix = name[/template$/i].nil? ? "" : "Id"

            name.to_csharp_name + postfix
        end

        def csharp_generic_args
        end

        def to_initialization
            type_args = csharp_generic_args if needs_generics?

            ERB.new(%{
            <%= csharp_name%> = new <%= csharp_class %><%= type_args %>();
                }).result(binding)
        end

        def uses_generic_args?
            GENERIC_BUILDER_SKIP_LIST.inject(true) do |uses_generics, field|
                uses_generics && !full_name.start_with?(field)
            end
        end

        def builtin_names
            # check if child options contain 'name'
            name_field = options.map{ |o| o.options }.flatten.find{ |o| o.name.eql?('name') }

            return [] if name_field.nil?

            name_field.description.scan(/"(\w+)"/i).flatten
        end

        def full_name
            name = @name

            if !@owner.nil?
                name = @owner.full_name + '.' + name
            end

            name.downcase
        end

        def values
            @values if self.respond_to?(:values)
        end

        def delete_ignored
            return if @options.nil?


            @options.delete_if do |option|
                option.delete_ignored
                IGNORED.include?(option.full_name)
            end
        end
    end

    class Option < CodeGen::Option
        include Options

        def csharp_type
            return_type = ""

            if enum_type
                return_type = enum_type
            elsif values
                return_type = "#{owner.csharp_class.gsub(/Settings/, "")}#{csharp_name}"
            elsif full_name.match(/attributes$/)
                return_type = 'IDictionary<string,object>'
            else
                return_type = FIELD_TYPES[full_name] || TYPES[type[0]]
            end

            $stderr.puts("Unknown type for #{full_name}") if return_type.empty?

            return_type
        end

        def declaration_template
            FIELD_DECLARATION
        end

        def to_declaration
            declaration_template.result(binding)
        end

        def csharp_class
            csharp_type
        end

        def csharp_builder_name
            if owner.respond_to?('csharp_item_class')
                producedType = owner.csharp_item_class
            else
                producedType = owner.csharp_class
            end

            "#{producedType}Builder#{owner.csharp_generic_args}"
        end

        def to_fluent
            FLUENT_FIELD_DECLARATION.result(binding)
        end

        def nullable?
            csharp_type.eql?('string') || handler? || dictionary?
        end

        def csharp_array?
            csharp_type.match(/\[\]$/)
        end

        def field?
            name.downcase.eql?('field') && uses_generic_args?
        end

        def handler?
            csharp_type.eql?('ClientHandlerDescriptor')
        end

        def dictionary?
            csharp_type.match(/^IDictionary/)
        end

        def to_client_option
            template = ""

            if csharp_type.eql?('string') || handler?
                template = %{
            if (<%=csharp_name%>.HasValue())
            {
                json["<%= name %>"] = <%=csharp_name%>;
            }
            }
            elsif csharp_array?
                template = %{
            if (<%=csharp_name%> != null)
            {
                json["<%= name %>"] = <%=csharp_name%>;
            }
            }
            elsif dictionary?
                template = %{
            if (<%=csharp_name%>.Any())
            {
                json["<%= name %>"] = <%=csharp_name%>;
            }
            }
            else
                template = %{
            if (<%= csharp_name %>.HasValue)
            {
                json["<%= name %>"] = <%= csharp_name %>;
            }
                }
            end

            ERB.new(template).result(binding)
        end

        def to_enum
            ENUM.result(binding)
        end
    end

    class CompositeOption < CodeGen::CompositeOption
        include Options

        def csharp_class
            prefix = owner.csharp_class.sub('Settings','')
                                       .sub('List<', '')
                                       .sub('>', '')

           "#{prefix}#{csharp_name}Settings"
        end

        def csharp_builder_class
            "#{csharp_class}Builder"
        end

        def csharp_generic_args
            owner.csharp_generic_args if uses_generic_args?
        end

        def csharp_generic_constraints
            owner.csharp_generic_constraints if uses_generic_args?
        end

        def needs_generics?
            full_name.eql?('treelist.editable') || full_name.eql?('diagram.editable')
        end

        def to_declaration
            COMPOSITE_FIELD_DECLARATION.result(binding)
        end

        def to_fluent
            FLUENT_COMPOSITE_FIELD_DECLARATION.result(binding)
        end

        def to_client_option
            ERB.new(%{
            var <%= name %> = <%= csharp_name %>.ToJson();
            if (<%= name %>.Any())
            {
                json["<%= name %>"] = <%= name %>;
            }<% if toggleable %> else if (<%= csharp_name %>.Enabled != <%= default %>) {
                json["<%= name %>"] = <%= csharp_name %>.Enabled;
            }
<% end %>}).result(binding)
        end

        def get_binding
            binding
        end
    end

    class Event < CodeGen::Event
        include Options

        def event_name
            name
        end

        def to_fluent
            FLUENT_EVENT_DECLARATION.result(binding)
        end
    end

    GENERIC_ARGS = {
        'gantt' => {
            'TTaskModel' => 'class, IGanttTask',
            'TDependenciesModel' => 'class, IGanttDependency'
        },
        'diagram' => {
            'TShapeModel' => 'class',
            'TConnectionModel' => 'class'
        },
        'treelist' => {
            'T' => 'class'
        }
    }

    class Component < CodeGen::Component
        include Options

        attr_accessor :files

        def initialize *args
            super

            @files = []
        end

        def path
            name
        end

        def csharp_class
            name
        end

        def csharp_full_class
            csharp_class + csharp_generic_args
        end

        def csharp_builder_class
            "#{csharp_class}Builder#{csharp_generic_args}"
        end

        def csharp_html_builder_class
            "#{csharp_class}HtmlBuilder#{csharp_generic_args}"
        end

        def csharp_generic_args
            args = GENERIC_ARGS[full_name]

            return '' unless args

            '<' + args.map { |name, type| name } .join(',') + '>'
        end

        def csharp_generic_constraints
            args = GENERIC_ARGS[full_name]

            return unless args

            args.map { |name, type| " where #{name} : #{type}" } .join(' ')
        end

        def csharp_init_args
            return ", DI.Current.Resolve<INavigationItemAuthorization>()" if name.eql?('TreeView')

            return ""
        end

        def component_template
            COMPONENT
        end

        def to_class(filename)
            @files.push(filename)

            csharp = File.exists?(filename) ? File.read(filename) : component_template.result(binding)

            csharp = csharp.sub(/\/\/>> Fields(.|\n)*\/\/<< Fields/, COMPONENT_FIELDS.result(binding))

            csharp = csharp.sub(/\/\/>> Initialization(.|\n)*\/\/<< Initialization/, COMPOSITE_FIELD_INITIALIZATION.result(binding))

            csharp = csharp.sub(/\/\/>> Serialization(.|\n)*\/\/<< Serialization/, FIELD_SERIALIZATION.result(binding))
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

            csharp = prepare_fluent_fields(csharp, unique_options)
        end

        def prepare_fluent_fields(csharp, options)
            matches = csharp.match(/\/\/>> Fields(.|\n)*\/\/<< Fields/)

            if matches.nil?
                puts "Field markers not found in #{csharp_builder_class}, skipping..." if VERBOSE
                return csharp
            end

            fields = matches[0]

            parts = options.map do |o|
                match = fields.match("//>> #{o.csharp_name}$(.|\n)*//<< #{o.csharp_name}$")

                if match.nil?
                    unless FLUENT_SKIP_LIST.include?(o.full_name)
                        o.to_fluent
                    end
                else
                    "\n\t\t#{match[0]}\n"
                end
            end

            csharp = csharp.sub(/\/\/>> Fields(.|\n)*\/\/<< Fields/, "//>> Fields\n        #{parts.join}\n        //<< Fields")
        end

        def setting_template
            SETTING
        end

        def setting_fluent_template
            SETTING_FLUENT
        end

        def to_setting(filename, option)
            @files.push(filename)

            csharp = File.exists?(filename) ? File.read(filename) : setting_template.result(option.get_binding)

            csharp = csharp.sub(/\/\/>> Fields(.|\n)*\/\/<< Fields/, COMPONENT_FIELDS.result(option.get_binding))

            csharp = csharp.sub(/\/\/>> Initialization(.|\n)*\/\/<< Initialization/, COMPOSITE_FIELD_INITIALIZATION.result(option.get_binding))

            csharp = csharp.sub(/\/\/>> Serialization(.|\n)*\/\/<< Serialization/, FIELD_SERIALIZATION.result(option.get_binding))
        end

        def to_item_factory(filename, option)
            @files.push(filename)

            csharp = File.exists?(filename) ? File.read(filename) : ITEM_FACTORY.result(option.get_binding)

            csharp = csharp.sub(/\/\/>> Factory methods(.|\n)*\/\/<< Factory methods/, NAMED_FACTORY_METHODS.result(option.get_binding))
            csharp
        end

        def to_fluent_setting(filename, option)
            @files.push(filename)

            csharp = File.exists?(filename) ? File.read(filename) : setting_fluent_template.result(option.get_binding)

            csharp = prepare_fluent_fields(csharp, option.unique_options)
        end

        def to_events(filename)
            @files.push(filename)

            csharp = File.exists?(filename) ? File.read(filename) : EVENT.result(binding)

            csharp = csharp.sub(/\/\/>> Handlers(.|\n)*\/\/<< Handlers/, FLUENT_EVENTS.result(binding))
        end

        def editing_widget
            name.include?('Picker')
        end

        def csharp_registration_args
            args = [ "ViewContext", "Initializer" ]

            if editing_widget
                args.push("ViewData")
            else
                args.push("UrlGenerator" + csharp_init_args)
            end

            args.join(", ")
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

    class Generator
        include Rake::DSL

        def initialize(path)
            @path = path
        end

        def component(component)

            component.delete_ignored

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
                filename = "#{@path}/#{component.path}/#{option.enum_type || component.csharp_class + option.csharp_name }.cs"

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
                if option.instance_of?(component.array_option_class)
                    write_array(component, option)

                    next
                end

                write_composite_option(component, option)

            end
        end

        def write_composite_option(component, option)
            if option.instance_of?(component.array_option_class)
                write_array(component, option)

                return
            end
            # write *Settings.cs file
            filename = "#{@path}/#{component.path}/Settings/#{option.csharp_class}.cs"

            write_file(filename, component.to_setting(filename, option))

            # write *SettingsBuilder.cs file
            filename = "#{@path}/#{component.path}/Fluent/#{option.csharp_builder_class}.cs"

            write_file(filename, component.to_fluent_setting(filename, option))

            option.composite_options.each do |o|
                write_composite_option(component, o)
            end
        end

        def write_array(component, option)
            #write *Factory.cs file
            filename = "#{@path}/#{component.path}/Fluent/#{option.csharp_builder_class}.cs"
            write_file(filename, component.to_item_factory(filename, option))

            #write *Item.cs file
            filename = "#{@path}/#{component.path}/#{option.csharp_item_class}.cs"
            write_file(filename, component.to_setting(filename, option))

            #write *ItemBuilder.cs file
            filename = "#{@path}/#{component.path}/Fluent/#{option.csharp_item_class}Builder.cs"
            write_file(filename, component.to_fluent_setting(filename, option))

            option.item.composite_options.each do |o|
                write_composite_option(component, o)
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
end
