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
            }

            TYPES_MAP = {
                'String' => 'string',
                'Number' => 'double',
                'Boolean' => 'bool',
                'Object' => 'object',
                'Function' => 'string',
                'Date' => 'DateTime'
            }

            TYPES_DEFAULT_MAP = {
                'String' => '""',
                'Number' => '0.0',
                'Boolean' => 'false',
                'Object' => 'null',
                'Function' => '""',
                'Date' => 'null'
            }

            CLASS_TEMPLATE = ERB.new(File.read('build/codegen/lib/aspx/class.template.erb'))

            WIDGET_CLASS_TEMPLATE = ERB.new(File.read('build/codegen/lib/aspx/widget.class.template.erb'))

            COMPOSITE_CLASS_TEMPLATE = ERB.new(File.read('build/codegen/lib/aspx/composite.class.template.erb'))

            PROPERTY_WITH_DEFAULT_VALUE_TEMPLATE = ERB.new(File.read('build/codegen/lib/aspx/property.with.default.template.erb'))

            PROPERTY_TEMPLATE = ERB.new(File.read('build/codegen/lib/aspx/property.template.erb'))

            COMPOSITE_PROPERTY_TEMPLATE = ERB.new(File.read('build/codegen/lib/aspx/composite.property.template.erb'))

            ENUM_TEMPLATE = ERB.new(File.read('build/codegen/lib/aspx/enum.template.erb'))

            COLLECTION_TEMPLATE = ERB.new(File.read('build/codegen/lib/aspx/collection.property.template.erb'))

            ARRAY_ITEM_CLASS_TEMPLATE = ERB.new(File.read('build/codegen/lib/aspx/collection.class.template.erb'))

            CONVERTER_CLASS_TEMPLATE = ERB.new(File.read('build/codegen/lib/aspx/converter.class.template.erb'))

            CONVERTER_COMPOSITE_TEMPLATE = ERB.new('
            if (!convertable.<%= csharp_name %>.IsDefault)
                AddProperty(state, "<%= name %>", convertable.<%= csharp_name %>, null);')

            CONVERTER_ARRAY_TEMPLATE = ERB.new('
            if (convertable.<%= csharp_name %>.Count != 0)
                AddProperty(state, "<%= name %>", convertable.<%= csharp_name %>, null);')

            CONVERTER_PROPERTY_TEMPLATE = ERB.new('
            AddProperty(state, "<%= name %>", convertable.<%= csharp_name %>, <%= csharp_default %>);')

            CONVERTER_ENUM_PROPERTY_TEMPLATE = ERB.new('
            AddProperty(state, "<%= name %>", convertable.<%= csharp_name %>.ToString().ToLower(), "<%= value_to_s(values[0]) %>");')

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

                def csharp_name
                    name.pascalize
                end

                def csharp_namespace
                    "Telerik.Web.UI.#{root_component.owner_namespace}"
                end

                def description
                    @description.gsub(/[\n\r]/, ' ')
                end

                def add_option(settings)
                    return if OPTIONS_TO_SKIP.include?(settings[:name])

                    if !settings[:type].nil? && settings[:type].include?('kendo.')

                        name = settings[:name].strip

                        prefix = settings[:prefix]

                        name = name.sub(prefix, '') if prefix

                        recursive = settings[:recursive]

                        content = settings[:content]

                        description = settings[:description]

                        default = settings[:default]

                        type = settings[:type]

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
                    return TYPES_MAP[type[0]]
                end

                def to_declaration
                    return PROPERTY_WITH_DEFAULT_VALUE_TEMPLATE.result(get_binding) if csharp_default
                    return PROPERTY_TEMPLATE.result(get_binding)
                end

                def to_converter
                    return CONVERTER_ENUM_PROPERTY_TEMPLATE.result(get_binding) if values
                    return CONVERTER_PROPERTY_TEMPLATE.result(get_binding) if csharp_default
                end

                def to_serialization_declaration
                    return ERB.new('            sb.AppendFormat("<%= name %>:{0}", serializer.Serialize(<%= csharp_name %>));').result(binding)
                end

                def csharp_default
                    return TYPES_DEFAULT_MAP[type[0]] if !default
                    return default.to_f if type[0] == 'Number'
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

                def csharp_name
                    "#{name.pascalize}Settings"
                end

                def csharp_class
                    return strip_kendo_type(type) if type.include?('kendo.')

                    #prefix = owner.instance_of?(ArrayItem) ? owner.owner.owner.csharp_name.sub('Settings', '') : owner.csharp_name.sub('Settings', '')

                    #"#{prefix}#{name.sub('Settings', '').pascalize}"

                    name.pascalize
                end

                def csharp_namespace
                    return 'Telerik.Web.UI' if csharp_class.start_with?(root_component.owner_namespace)
                    "Telerik.Web.UI.#{root_component.owner_namespace}"
                end

                def csharp_converter_class
                    "#{csharp_class}Converter"
                end

                def to_converter
                    CONVERTER_COMPOSITE_TEMPLATE.result(get_binding)
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

                def to_serialization_declaration
                    return ERB.new('            sb.AppendFormat("<%= name %>:{0}", serializer.Serialize(<%= csharp_name %>));').result(binding)
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
                    "List<#{item.csharp_class}>"
                end

                def to_declaration
                    COLLECTION_TEMPLATE.result(binding)
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
                            existing_option.type = option[:type] if option[:type].include?('kendo.')
                            existing_option.values = option[:values] unless option[:values].nil?
                            existing_option.description = option[:description] unless option[:description].nil? || option[:description] == ''
                            existing_option.default = option[:default] unless option[:default].nil? || option[:default] == ''
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

                def to_converter_class_declaration
                    CONVERTER_CLASS_TEMPLATE.result(get_binding)
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

                def component(component)
                    write_class(component)
                    write_converter(component) unless component.widget?
                    write_enums(component)
                    write_properties(component)
                    write_events(component)
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

                    write_file(file_path, properties_content, '[ Properties ]')

                    if component.widget?
                        serialization_content = write_options_serialization(component.options)
                        write_file(file_path, serialization_content, '[ Properties Serialization ]')
                    else
                        is_default_content = write_is_default(component.options)
                        write_file(file_path, is_default_content, '[ IsDefault ]')
                    end

                end

                def write_options_serialization(options)
                    content = "\n"

                    options.each_index do |index|
                        content += options[index].to_serialization_declaration + "\n"
                        content += 'sb.Append(",");' + "\n" unless index == options.length - 1
                    end

                    content
                end

                def write_events(component)

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
                    end

                    option.to_declaration
                end

                def write_composite_option_file(composite)
                    filename = File.join(@path, "#{composite.csharp_class}.cs")
                    create_file(filename, composite.to_class_declaration)

                    composite_content = write_options(composite.options)
                    is_default_content = write_is_default(composite.options)

                    write_file(filename, composite_content, '[ Properties ]')
                    write_file(filename, is_default_content, '[ IsDefault ]')

                    write_composite_option_converter_file(composite)
                end

                def write_is_default(options)
                    result = ''
                    options.each_index do |index|
                        option  = options[index]
                        result += !option.composite? ?
                            "                   #{option.csharp_name} == #{option.csharp_default}" :
                            option.instance_of?(CompositeOption) ?
                                "                   #{option.csharp_name}.IsDefault" :
                                "                   #{option.csharp_name}.Count == 0"
                        result += index < options.length - 1 ? " &&\n" : ';'
                    end
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

                    write_file(filename, composite_content, '[ SerializedProperties ]')
                end

                def write_array_item_class(item)
                    file_name = File.join(@path, "#{item.csharp_class}.cs")

                    create_file(file_name, item.to_class)

                    content = write_options(item.options)

                    write_file(file_name, content, '[ Properties ]')

                    write_composite_option_converter_file(item)
                end

                def write_file(file_path, content, marker)
                    return unless File.exists?(file_path)

                    region_regexp = Regexp.new("#region\s#{Regexp.escape(marker)}(.*)#endregion\s#{Regexp.escape(marker)}", Regexp::MULTILINE)

                    c = File.read(file_path).gsub(region_regexp) { "#region #{marker}\n#{content}\n#endregion #{marker}" }

                    File.open(file_path, 'w') do |f|
                        f.write(c)
                    end
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
