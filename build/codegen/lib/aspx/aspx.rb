require 'codegen/lib/string.rb'

module CodeGen
    module ASPX
        module Wrappers

            CHILD_COMPONENTS = %w{
                DiagramLayout
            }

            OPTIONS_TO_SKIP = %w{
                dataSource
                autoBind
                layers.dataSource
                layers.autoBind
            }

            COMPOSITE_PROPERTY_WITHOUT_SETTINGS = %w{
                clientEvents
            }

            TYPES_MAP = {
                'String' => 'string',
                'Number' => 'double',
                'Boolean' => 'bool',
                'Object' => 'object',
                'Function' => 'string',
                'Date' => 'DateTime',
                'stringArray' => 'string[]',
                'ClientEvent' => 'string'
            }

            TYPES_DEFAULT_MAP = {
                'String' => '""',
                'Number' => '0.0',
                'Boolean' => 'false',
                'Object' => 'null',
                'Function' => '""',
                'Date' => 'null',
                'Array' => 'null',
                'stringArray' => 'null',
                'ClientEvent' => '""'
            }

            CLASS_TEMPLATE = ERB.new(File.read('build/codegen/lib/aspx/class.template.erb'))

            WIDGET_CLASS_TEMPLATE = ERB.new(File.read('build/codegen/lib/aspx/widget.class.template.erb'))

            COMPOSITE_CLASS_TEMPLATE = ERB.new(File.read('build/codegen/lib/aspx/composite.class.template.erb'))

            PROPERTY_WITH_DEFAULT_VALUE_TEMPLATE = ERB.new(File.read('build/codegen/lib/aspx/property.with.default.template.erb'))

            PROPERTY_TEMPLATE = ERB.new(File.read('build/codegen/lib/aspx/property.template.erb'))

            COMPOSITE_PROPERTY_TEMPLATE = ERB.new(File.read('build/codegen/lib/aspx/composite.property.template.erb'))

            ENUM_TEMPLATE = ERB.new(File.read('build/codegen/lib/aspx/enum.template.erb'))

            COLLECTION_CLASS_TEMPLATE = ERB.new(File.read('build/codegen/lib/aspx/collection.class.template.erb'))

            COLLECTION_ITEM_TEMPLATE = ERB.new(File.read('build/codegen/lib/aspx/collection.item.property.template.erb'))

            ARRAY_ITEM_CLASS_TEMPLATE = ERB.new(File.read('build/codegen/lib/aspx/collection.item.class.template.erb'))

            CONVERTER_CLASS_TEMPLATE = ERB.new(File.read('build/codegen/lib/aspx/converter.class.template.erb'))

            CONVERTER_COMPOSITE_TEMPLATE = ERB.new('
            if (!convertable.<%= csharp_name %>.IsDefault)
                AddProperty(state, "<%= name %>", convertable.<%= csharp_name %>, null);')

            CONVERTER_COMPOSITE_TO_ARRAY_TEMPLATE = ERB.new('
            if (!convertable.<%= csharp_name %>.IsDefault)
                AddProperty(state, "<%= name %>", convertable.<%= csharp_name %>.ToArray(), null);')

            CONVERTER_ARRAY_TEMPLATE = ERB.new('
            if (convertable.<%= csharp_name %>.Count != 0)
                AddProperty(state, "<%= name %>", convertable.<%= csharp_name %>.ItemsList, null);')

            CONVERTER_PROPERTY_TEMPLATE = ERB.new('
            AddProperty(state, "<%= name %>", convertable.<%= csharp_name %>, <%= csharp_default %>);')

            CONVERTER_SCRIPT_TEMPLATE = ERB.new('
            AddScript(state, "<%= name %>", convertable.<%= csharp_name %>);')

            CONVERTER_EVENT_TEMPLATE = ERB.new('
            AddScript(state, "<%= name %>", convertable.ClientEvents.<%= csharp_name %>);')

            CONVERTER_ENUM_PROPERTY_TEMPLATE = ERB.new('
            AddProperty(state, "<%= name %>", StringHelpers.ToCamelCase(convertable.<%= csharp_name %>.ToString()), <%= csharp_default %>.ToString());')

            LOAD_VIEWSTATE_TEMPLATE = ERB.new('((IStateManager)<%= csharp_name%>).LoadViewState(viewState[i++]);')

            SAVE_VIEWSTATE_TEMPLATE = ERB.new('((IStateManager)<%= csharp_name%>).SaveViewState()')

            TRACK_VIEWSTATE_TEMPLATE = ERB.new('((IStateManager)<%= csharp_name%>).TrackViewState();')

            SETDIRTY_VIEWSTATE_TEMPLATE = ERB.new('<%= csharp_name%>.SetDirty();')

            module Options

                attr_accessor :type, :values, :description, :default

                def component_class
                    Component
                end

                def composite_option_class
                    CompositeOption
                end

                def option_class
                    Option
                end

                def array_option_class
                    ArrayOption
                end

                def event_class
                    Event
                end

                def has_composite_options?
                    composite? && @options.select { |o| o.composite? }.count > 0
                end

                def csharp_name
                    return "On" + @name.pascalize if type.respond_to?('include?') && type.include?('ClientEvent')
                    @name.pascalize
                end

                def csharp_namespace
                    "Telerik.Web.UI.#{root_component.owner_namespace}"
                end

                def csharp_datafield
                    nil
                end

                def boundable?
                    !csharp_datafield.nil?
                end

                def description
                    @description.gsub(/[\n\r]/, ' ')
                end

                def add_option(settings)
                    return if OPTIONS_TO_SKIP.include?(settings[:name])

                    #if !settings[:type].nil? && settings[:type].instance_of?(String) && settings[:type].start_with?('kendo.')
                    if !settings[:type].nil? && settings[:type].include?('kendo.')

                        name = settings[:name].strip

                        prefix = settings[:prefix]

                        name = name.sub(prefix, '') if prefix

                        recursive = settings[:recursive]

                        content = settings[:content]

                        description = settings[:description]

                        default = settings[:default]

                        type = settings[:type]

                        #type = type.split('|').find{ |t| t.include?('kendo.') } #asdf
                        type = type

                        values = settings[:values]

                        remove_existing = settings[:remove_existing] || false

                        parents = @options.find_all { |option| name.start_with?(option.name + '.') && (option.type.include?('Object') || option.type.include?('Array') || option.type.include?('kendo.')) }

                        parents.map! { |parent| parent.to_composite }

                        if parents.any?

                            parents.each do |parent|
                                parent.add_option(
                                    :name => name,
                                    :type => type,
                                    :recursive => recursive,
                                    :content => content,
                                    :default => default,
                                    :prefix => parent.name + '.',
                                    :values => values,
                                    :description => description,
                                    :remove_existing => remove_existing
                                )

                            end

                        else

                            @options.delete_if { |o| o.name == name } if remove_existing

                            @options.push composite_option_class.new(:name => name,
                                                                     :owner => self,
                                                                     :recursive => recursive,
                                                                     :content => content,
                                                                     :type => type,
                                                                     :default => default,
                                                                     :values => values,
                                                                     :description => description)
                        end
                    else
                        super(settings)
                    end
                end

                def root_component
                    parent = self
                    while !parent.is_a?(Component) && !parent.owner.nil?
                        parent = parent.owner
                    end

                    parent if parent.is_a?(Component)
                end

                def strip_kendo_type(input)
                    result = input
                    .sub('kendo.ui.', '')
                    .sub('kendo.dataviz.ui.', '')
                    .sub('kendo.dataviz.', '')
                    .sub('kendo.mobile.ui.', '')
                    .sub('kendo.mobile.', '')
                    .sub('kendo.', '')
                    .sub(".#{root_component.owner_namespace.downcase}", '')
                    .sub("#{root_component.owner_namespace.downcase}.", '')

                    return result.split('.').map { |w|
                        w.pascalize
                    }.join('')
                end
            end

            class Option < CodeGen::Option
                include Options

                def enum?
                    !@values.nil?
                end

                def csharp_class
                    return strip_kendo_type(type) if type.include?('kendo.')
                    return "#{owner.csharp_name.sub('Settings', '').sub('Collection', '')}#{name.pascalize}" if enum?
                    return TYPES_MAP[type[0]] if type.instance_of?([].class)
                    return TYPES_MAP[type]
                end

                def to_declaration
                    return PROPERTY_WITH_DEFAULT_VALUE_TEMPLATE.result(get_binding) if csharp_default
                    return PROPERTY_TEMPLATE.result(get_binding)
                end

                def to_converter
                    return CONVERTER_ENUM_PROPERTY_TEMPLATE.result(get_binding) if values
                    return CONVERTER_SCRIPT_TEMPLATE.result(get_binding) if type.instance_of?([].class) && type.length == 1 && (type.include?("Function") || type.include?("ClientEvent"))
                    return CONVERTER_PROPERTY_TEMPLATE.result(get_binding) if csharp_default
                end

                def csharp_default
                    type_value = type.instance_of?([].class) ? type[0] : type
                    return TYPES_DEFAULT_MAP[type_value] if !default
                    return default.to_f if type_value == 'Number'
                    default
                end

                def values
                    @values if self.respond_to?(:values)
                end

                def values_to_s
                    values.map { |value|
                        value.to_s.pascalize
                    }.join ",\n"
                end

                def value_to_s(value)
                    value.split(' - ')[0]
                end

                def value_desc_to_s(value)
                    s = value.split(' - ')
                    #rejoin the remaining parts in case the description contains the split string itself
                    return s[1..s.length].join(' - ') if value.index(' - ')
                end

                def to_enum
                    ENUM_TEMPLATE.result(binding)
                end

                def get_binding
                    binding
                end
            end

            class CompositeOption < CodeGen::CompositeOption
                include Options

                attr_accessor :serialize_to_array

                def csharp_name
                    if COMPOSITE_PROPERTY_WITHOUT_SETTINGS.include?(name)
                        name.pascalize
                    else
                        "#{name.pascalize}Settings"
                    end
                end

                def csharp_class
                    return strip_kendo_type(type) if type.include?('kendo.')

                    name.pascalize
                end

                def csharp_namespace
                    return 'Telerik.Web.UI' if csharp_class.start_with?(root_component.owner_namespace)
                    "Telerik.Web.UI.#{root_component.owner_namespace}"
                end

                def csharp_converter_class
                    "#{csharp_class}Converter"
                end

                def array_options
                    @options.select { |option| option.instance_of?(ArrayOption) }
                end

                def to_converter
                    if (serialize_to_array)
                      CONVERTER_COMPOSITE_TO_ARRAY_TEMPLATE.result(get_binding)
                    else
                      CONVERTER_COMPOSITE_TEMPLATE.result(get_binding)
                    end
                end

                def to_declaration
                    COMPOSITE_PROPERTY_TEMPLATE.result(get_binding)
                end

                def to_class_declaration
                    COMPOSITE_CLASS_TEMPLATE.result(get_binding)
                end

                def to_converter_class_declaration
                    CONVERTER_CLASS_TEMPLATE.result(get_binding)
                end

                def to_loadviewstate
                    LOAD_VIEWSTATE_TEMPLATE.result(get_binding)
                end

                def to_saveviewstate
                    SAVE_VIEWSTATE_TEMPLATE.result(get_binding)
                end

                def to_trackviewstate
                    TRACK_VIEWSTATE_TEMPLATE.result(get_binding)
                end

                def to_setdirtyviewstate
                    SETDIRTY_VIEWSTATE_TEMPLATE.result(get_binding)
                end

                def get_binding
                    binding
                end
            end

            class ArrayOption < CompositeOption
                include Options, CodeGen::Array

                def add_option(settings)
                    if settings[:name] == "#{name}.#{@item.name}"
                        @item.type = settings[:type]
                    else
                        @item.add_option(settings) unless @item.name == settings[:name]
                    end
                end

                def item_class
                    ArrayItem
                end

                def csharp_name
                    "#{name.pascalize}Collection"
                end

                def csharp_class
                    "#{item.csharp_class}sCollection"
                end

                def to_declaration
                    COLLECTION_ITEM_TEMPLATE.result(binding)
                end

                def to_converter
                    CONVERTER_ARRAY_TEMPLATE.result(get_binding)
                end


            end

            class ArrayItem < CompositeOption

                def csharp_class
                    if type.include?('kendo.')
                        prefix = root_component.widget? ? root_component.name.pascalize : root_component.owner_namespace

                        return "#{prefix}#{strip_kendo_type(type)}"
                    end

                    "#{owner.owner.name.pascalize.sub('Collection', '')}#{name.pascalize}"
                end

                def to_class
                    ARRAY_ITEM_CLASS_TEMPLATE.result(binding)
                end
            end

            class Event < CodeGen::Event
                def to_converter
                    CONVERTER_EVENT_TEMPLATE.result(binding)
                end

                def csharp_name
                    return "On" + @name.pascalize
                end
            end

            class Component < CodeGen::Component
                include Options

                def find_option_by_name(name, root)
                    return root if root.name == name

                    child = root.options.find { |o| name == o.name || name.start_with?("#{o.name}.") }

                    if !child.nil? && !child.instance_of?(Option) && name != child.name
                        name = name.sub("#{child.name}.", '')
                        child = child.item if child.instance_of?(ArrayOption) && (name.include?('.') || name != child.name.singular)
                        child = find_option_by_name(name, child)
                    end

                    if !child.nil? && name.end_with?(child.name)
                        child
                    else
                        nil
                    end
                end

                def import(metadata)
                    @content = metadata[:content]

                    metadata[:options].each do |option|
                        existing_option = find_option_by_name(option[:name], self)

                        if !existing_option.nil?
                            existing_option.type = option[:type] unless option[:type].nil?
                            existing_option.values = option[:values] unless option[:values].nil?
                            existing_option.description = option[:description] unless option[:description].nil? || option[:description] == ''
                            existing_option.default = option[:default] unless option[:default].nil? || option[:default] == ''
                            existing_option.csharp_datafield = option[:default] unless option[:datafield].nil? || option[:datafield] == ''
                            existing_option.serialize_to_array = option[:serialize_to_array] unless option[:serialize_to_array].nil?
                        else
                            option[:remove_existing] = existing_option.nil?
                            add_option(option)
                        end
                    end
                end

                def csharp_class
                    return "Rad#{name.pascalize}" if widget?

                    "#{owner_namespace}#{name.pascalize}"
                end

                def csharp_converter_class
                    "#{csharp_class}Converter"
                end

                def has_composite_options?
                    @options.select { |o| o.composite? }.count > 0
                end

                def to_converter_class_declaration
                    CONVERTER_CLASS_TEMPLATE.result(get_binding)
                end

                def to_loadviewstate
                    LOAD_VIEWSTATE_TEMPLATE.result(get_binding)
                end

                def to_saveviewstate
                    SAVE_VIEWSTATE_TEMPLATE.result(get_binding)
                end

                def to_trackviewstate
                    TRACK_VIEWSTATE_TEMPLATE.result(get_binding)
                end

                def to_setdirtyviewstate
                    SETDIRTY_VIEWSTATE_TEMPLATE.result(get_binding)
                end

                def script_resource_path
                    "#{csharp_namespace}.#{csharp_name}.Scripts.#{csharp_class}.js"
                end

                def script_component_type
                    "#{csharp_namespace}.#{csharp_class}"
                end

                def csharp_namespace
                    prefix = 'Telerik.Web.UI'

                    return "#{prefix}.#{owner_namespace}" unless widget? || CHILD_COMPONENTS.include?(csharp_class)

                    prefix
                end

                def owner_namespace
                    full_name
                    .sub('kendo.ui.', '')
                    .sub('kendo.dataviz.ui.', '')
                    .sub('kendo.dataviz.', '')
                    .sub('kendo.mobile.ui.', '')
                    .sub('kendo.mobile.', '')
                    .sub('kendo.', '')
                    .sub(".#{name}", '')
                    .pascalize
                end

                def description
                    @description.gsub(/\n/, '')
                end

                def get_binding
                    binding
                end

                def enum_options
                    enums = simple_options.select { |o| o.enum? }
                    composite = composite_options.flat_map { |o| o.options }

                    composite.each do |item|
                        if item.composite?
                            composite.push(*item.options) if item.composite?
                        else
                            enums.push(item) if item.enum?
                        end
                    end

                    enums
                end

                def array_options
                    @options.select { |option| option.instance_of?(ArrayOption) }
                end
            end


            class Generator
                include Rake::DSL

                @@converters = {}

                def initialize(path)
                    @path = path
                end

                def self.converters
                    @@converters
                end

                def self.write_file(file_path, content, marker)
                    return unless File.exists?(file_path)

                    region_regexp = Regexp.new("#region\s#{Regexp.escape(marker)}(.*)#endregion\s#{Regexp.escape(marker)}", Regexp::MULTILINE)

                    c = File.read(file_path).gsub(region_regexp) { "#region #{marker}\n#{content}\n#endregion #{marker}" }

                    File.open(file_path, 'w') do |f|
                        f.write(c)
                    end
                end

                def component(component)
                    write_class(component)
                    write_converter(component)
                    write_enums(component)
                    write_events(component)
                    write_properties(component)
                    write_viewstate(component)
                end

                private

                def write_class(component)
                    file_path = File.join(@path, component.csharp_class + '.cs')
                    return if File.exists?(file_path)

                    template = component.widget? ? WIDGET_CLASS_TEMPLATE : CLASS_TEMPLATE

                    class_content = template.result(component.get_binding)

                    create_file(file_path, class_content)
                end

                def write_enums(component)
                    options = component.enum_options

                    options.each do |option|
                        filename = "#{@path}/#{option.csharp_class}.cs"

                        create_file(filename, option.to_enum)
                    end
                end

                def write_converter(component)
                    write_composite_option_converter_file(component)
                end

                def write_properties(component)
                    file_path = File.join(@path, component.csharp_class + '.cs')

                    properties_content = write_options(component.options)

                    Generator.write_file(file_path, properties_content, '[ Properties ]')

                    if !component.widget?
                        is_default_content = write_is_default(component.options)
                        Generator.write_file(file_path, is_default_content, '[ IsDefault ]')
                    end

                end

                def write_events(component)
                    register_events_as_property(component)
                end

                def register_events_as_property(component)
                    if component.events.count > 0
                        component.add_option({name: 'clientEvents', type: 'Object', description: 'Defines the client events handlers.' })

                        component.events.each do |event|
                            component.add_option({name: "clientEvents.#{event.name}", type: ['ClientEvent'], description: event.description, remove_existing: true })
                        end

                        component.options.find{|o| o.name == 'clientEvents'}.type = "kendo.#{component.name.pascalize}ClientEvents"
                    end
                end

                def write_options(options)
                    content = ''

                    options.each do |option|
                        content += write_option(option)
                    end

                    content
                end

                def write_option(option)
                    if option.class == CompositeOption && option.owner.class != ArrayItem
                        write_composite_option_file(option)
                    end
                    if option.class == ArrayOption
                        write_array_item_class(option.item)
                        write_collection_class(option)
                    end

                    option.to_declaration
                end

                def write_collection_class(option)
                    content = COLLECTION_CLASS_TEMPLATE.result(option.get_binding)

                    file_name = File.join(@path, "#{option.csharp_class}.cs")

                    create_file(file_name, content)
                end

                def write_composite_option_file(composite)
                    filename = File.join(@path, "#{composite.csharp_class}.cs")
                    create_file(filename, composite.to_class_declaration)

                    composite_content = write_options(composite.options)
                    is_default_content = write_is_default(composite.options)

                    Generator.write_file(filename, composite_content, '[ Properties ]')
                    Generator.write_file(filename, is_default_content, '[ IsDefault ]')
                    if (composite.serialize_to_array)
                      to_array_content = write_to_array(composite.options)
                      Generator.write_file(filename, to_array_content, '[ ToArray ]')
                    end

                    write_viewstate(composite)

                    write_composite_option_converter_file(composite) unless composite.name.include?('clientEvents') || composite.serialize_to_array
                end

                def write_is_default(options)
                    result = ''
                    options.each_index do |index|
                        option  = options[index]
                        result += !option.composite? ?
                            "                   #{option.csharp_name} == #{option.csharp_default}" :
                            option.instance_of?(CompositeOption) ?
                                "                   #{option.csharp_name}.IsDefault" :
                                "                   #{option.csharp_name}.ItemsList.Count == 0"
                        result += index < options.length - 1 ? " &&\n" : ';'
                    end
                    result
                end

                def write_to_array(options)
                  result = "        internal double[] ToArray()\n        {\n            return new double[] {"
                  options.each_index do |index|
                    option = options[index]
                    result += " #{option.csharp_name}"
                    result += ", " unless index == options.length - 1
                  end
                  result += " };\n        }"
                  result
                end

                def write_converter_options(options)
                    content = ''

                    options.each do |option|
                        content += write_converter_option(option)
                    end

                    content
                end

                def write_converter_option(option)
                    option.to_converter
                end

                def write_composite_option_converter_file(composite)
                    filename = File.join(@path, "#{composite.csharp_converter_class}.cs")
                    create_file(filename, composite.to_converter_class_declaration)

                    if composite.instance_of? Component
                        key = composite.owner_namespace
                    else
                        key = composite.root_component.widget? ? composite.root_component.csharp_name : composite.root_component.owner_namespace
                    end

                    if @@converters[key].nil?
                        @@converters[key] = []
                    end
                    @@converters[key] << composite.csharp_converter_class unless @@converters[key].include?(composite.csharp_converter_class)

                    composite_content = write_converter_options(composite.options)
                    if composite.instance_of?(Component) && composite.widget? && composite.events
                       composite_content += write_converter_options(composite.events)
                    end

                    Generator.write_file(filename, composite_content, '[ SerializedProperties ]')
                end

                def write_array_item_class(item)
                    file_name = File.join(@path, "#{item.csharp_class}.cs")

                    create_file(file_name, item.to_class)

                    content = write_options(item.options)

                    Generator.write_file(file_name, content, '[ Properties ]')

                    write_viewstate(item)

                    write_composite_option_converter_file(item)
                end

                def write_viewstate(owner)
                    options = owner.options.select { |o|
                        o.composite?
                    }.sort { |a,b| a.name <=> b.name }

                    load_viewstate_content = write_viewstate_content(options, 'load')
                    save_viewstate_content = write_viewstate_content(options, 'save')
                    track_viewstate_content = write_viewstate_content(options, 'track')
                    setdirty_viewstate_content = write_viewstate_content(options, 'setdirty')

                    file_name = File.join(@path, "#{owner.csharp_class}.cs")

                    Generator.write_file(file_name, setdirty_viewstate_content, '[ SetDirty ]')
                    Generator.write_file(file_name, load_viewstate_content, '[ LoadViewState ]')
                    Generator.write_file(file_name, save_viewstate_content, '[ SaveViewState ]')
                    Generator.write_file(file_name, track_viewstate_content, '[ TrackViewState ]')
                end

                def write_viewstate_content(options, action)
                    content = ''
                    options.each_with_index do |option, index|
                        content += option.send("to_#{action}viewstate")
                        content += ',' if action == 'save' && index < options.count - 1
                        content += "\n"
                    end
                    content
                end

                def create_file(file_path, content)
                    return if File.exists?(file_path)

                    File.open(file_path, 'w') do |f|
                        f.write(content)
                    end

                end

            end

        end
    end
end
