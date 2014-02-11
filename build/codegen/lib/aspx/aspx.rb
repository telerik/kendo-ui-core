require 'codegen/lib/string.rb'

module CodeGen
    module ASPX
        module Wrappers

            CHILD_COMPONENTS = %w{
            DiagramConnection
            DiagramShape
            DiagramConnector
            DiagramLayoutSettings}

            OPTIONS_TO_SKIP = %w{dataSource}

            TYPES_MAP = {
                'String' => 'string',
                'Number' => 'double',
                'Boolean' => 'bool',
                'Object' => 'object',
                'Function' => 'string',
                'Date' => 'DateTime'
            }

            TYPES_DEFAULT_MAP = {
                'String' => 'null',
                'Number' => '0.0',
                'Boolean' => 'false',
                'Object' => 'null',
                'Function' => 'null',
                'Date' => 'null'
            }

            CLASS_TEMPLATE = ERB.new('
namespace <%= csharp_namespace %>
{

    using System.ComponentModel;
    using System.Collections.Generic;
    using System.Web.UI;
    using System.Web.Script.Serialization;

    /// <summary>
    /// 
    /// </summary>
    <%= widget? ? "	[ParseChildren(ChildrenAsProperties = true)]" : "" %>
    public class <%= csharp_class %> : <%= widget? ? "RadWebControl" : "Telerik.Web.StateManager" %>
    {
        #region [ Constructor ]
        public <%= csharp_class %>()
        {
<% if widget? %>
            List<JavaScriptConverter> converters = new List<JavaScriptConverter>()
                                                    {
                                                        #region [ Converters Declaration ]
                                                        #endregion [ Converters Declaration ]
                                                    };
<% end %>
        }
        #endregion [ Constructor ]
    
        #region [ Properties ]
        #endregion [ Properties ]
    
        #region [ Events ]
        #endregion [ Events ]
<% if widget? %>
        private JavaScriptSerializer serializer = new JavaScriptSerializer();

        protected override void DescribeComponent(IScriptDescriptor descriptor)
        {
            base.DescribeComponent(descriptor);

            #region [ Properties Serialization ]
            #endregion [ Properties Serialization ]
        }
<% end %>
  }
}
')

            COMPOSITE_CLASS_TEMPLATE = ERB.new('
namespace <%= csharp_namespace %>
{
    using System.ComponentModel;
    using System.Web.UI;

    /// <summary>
    /// <%= description %>
    /// </summary>
    public class <%= csharp_class %> : Telerik.Web.StateManager
    {
        #region [ Properties ]
        #endregion [ Properties ]
    }
}
')

            PROPERTY_WITH_DEFAULT_VALUE_TEMPLATE = ERB.new('
    /// <summary>
    /// <%= description %>
    /// </summary>
    [DefaultValue(<%= csharp_default %>)]
    public <%= csharp_type %> <%= name.pascalize %>
    {
      get
      {
        return (<%= csharp_type %>)(ViewState["<%= name.pascalize %>"] ?? <%= csharp_default %>);
      }
      set
      {
        ViewState["<%= name.pascalize %>"] = value;
      }
    }')

            PROPERTY_TEMPLATE = ERB.new('
    /// <summary>
    /// <%= description %>
    /// </summary>
    public <%= csharp_type %> <%= name.pascalize %>
    {
      get
      {
        return (<%= csharp_type %>)(ViewState["<%= name.pascalize %>"]);
      }
      set
      {
        ViewState["<%= name.pascalize %>"] = value;
      }
    }')

            COMPOSITE_PROPERTY_TEMPLATE = ERB.new('
    private <%= csharp_class %> _<%= name %>; 
    /// <summary>
    /// <%= description %>
    /// </summary>
    [DefaultValue("<%= csharp_default %>")]
    [PersistenceMode(PersistenceMode.InnerProperty)]
    public <%= csharp_class %> <%= name.pascalize %>
    {
      get
      {
        if (this._<%= name %> == null)
        {
            this._<%= name %> = new <%= csharp_class %>();
        }
        return this._<%= name %>;
      }
    }')

            ENUM_TEMPLATE = ERB.new('
namespace <%= csharp_namespace %>
{
    /// <summary>
    /// <%= description %>
    /// </summary>
    public enum <%= csharp_type %>
    {
        <% values.each_with_index do |value, index| %>
        ///<summary>
        ///<%= value_desc_to_s value %>
        ///</summary>
        <%= value_to_s(value).pascalize %><%= \',\' if index < values.length - 1 %>
        <% end %>
    }
}
    ')

            COLLECTION_TEMPLATE = ERB.new('
    private <%= csharp_class %> _<%= name %>;
    /// <summary>
    /// <%= description %>
    /// </summary>
    [DefaultValue(<%= csharp_default %>)]
    [PersistenceMode(PersistenceMode.InnerProperty)]
    public <%= csharp_class %> <%= name.pascalize %>
    {
      get
      {
        if (this._<%= name %> == null)
        {
            this._<%= name %> = new <%= csharp_class %>();
        }
        return this._<%= name %>;
      }
    }
')
            ARRAY_ITEM_CLASS_TEMPLATE = ERB.new('
namespace <%= csharp_namespace %>
{
    using System.ComponentModel;

    /// <summary>
    /// <%= description %>
    /// </summary>
    public class <%= csharp_class %> : Telerik.Web.StateManager
    {
        public <%= csharp_class %>() {}

        #region [ Properties ]
        #endregion [ Properties ]
    }
}
')

            CONVERTER_CLASS_TEMPLATE = ERB.new('
namespace <%= csharp_namespace %>
{
    using System;
    using System.Collections.Generic;

    /// <summary>
    /// Serialization JS converter class for <%= csharp_class %>
    /// </summary>
    public class <%= csharp_converter_class %>: ExplicitJavaScriptConverter
    {
        protected override void PopulateProperties(IDictionary<string, object> state, object obj)
        {
            var convertable = obj as <%= csharp_class %>;
            
            #region [ SerializedProperties ]
            #endregion [ SerializedProperties ]
        }

        public override IEnumerable<System.Type> SupportedTypes
        {
            get
            {
                return new[] { typeof(<%= csharp_class %>) };
            }
        }
    }
}
')

            CONVERTER_PROPERTY_TEMPLATE = ERB.new('
            AddProperty(state, "<%= name %>", convertable.<%= name.pascalize %>, <%= csharp_default %>);')
            CONVERTER_ENUM_PROPERTY_TEMPLATE = ERB.new('
            AddProperty(state, "<%= name %>", convertable.<%= name.pascalize %>.ToString().ToLower(), "<%= value_to_s(values[0]) %>");')

            module Options
                def component_class
                    Component
                end

                def csharp_name
                    name.pascalize
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

                def csharp_namespace
                    "Telerik.Web.UI.#{root_component.name.pascalize}" if root_component.widget?
                    "Telerik.Web.UI"
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

                        parents = @options.find_all { |option| name.start_with?(option.name + '.') && (option.type.include?('Object') || option.type.include?('Array')) }

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
                    parent = owner
                    while !parent.is_a?(Component) && !parent.owner.nil?
                        parent = parent.owner
                    end

                    parent if parent.is_a?(Component)
                end
            end

            class Option < CodeGen::Option
                include Options

                def enum?
                    root_component.enum_options.include?(self)
                end

                def csharp_type
                    return "#{owner.csharp_name.sub('Settings', '').sub('Collection', '')}#{name.pascalize}" if enum? || type.include?('kendo.')
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
                    return ERB.new('descriptor.AddProperty("<%= name %>", serializer.Serialize(<%= csharp_name %>));').result(binding)
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

                def csharp_class
                    prefix = owner.csharp_name.sub('Settings', '')
                    name.include?('Settings') ? "#{prefix}#{name.sub('Settings', '').pascalize}" : "#{prefix}#{name.pascalize}"
                end

                def csharp_default
                    'null'
                end

                def csharp_converter_class
                    "#{csharp_class}Converter"
                end

                def to_converter
                    ''
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
                    return ERB.new('descriptor.AddProperty("<%= name %>", serializer.Serialize(<%= csharp_name %>));').result(binding)
                end

                def get_binding
                    binding
                end
            end

            class ArrayOption < CompositeOption
                include Options, CodeGen::Array

                def item_class
                    ArrayItem
                end

                def csharp_class
                    "List<#{item.csharp_class}>"
                end

                def csharp_namespace
                    'Telerik.Web.UI'
                end

                def csharp_default
                    'null'
                end

                def to_declaration
                    COLLECTION_TEMPLATE.result(binding)
                end

            end

            class ArrayItem < CompositeOption

                def csharp_class
                    "#{owner.owner.name.pascalize.sub('Collection', '')}#{name.pascalize}"
                end

                def to_class
                    ARRAY_ITEM_CLASS_TEMPLATE.result(binding)
                end
            end

            class Component < CodeGen::Component
                include Options

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

                def csharp_namespace
                    prefix = "Telerik.Web.UI"

                    return "#{prefix}.#{owner_namespace}" unless widget? || CHILD_COMPONENTS.include?(csharp_class)

                    prefix
                end

                def owner_namespace
                    full_name.sub(".#{name}", '')
                    .sub('kendo.ui.', '')
                    .sub('kendo.dataviz.ui.', '')
                    .sub('kendo.dataviz.', '')
                    .sub('kendo.mobile.ui.', '')
                    .sub('kendo.mobile.', '')
                    .sub('kendo.', '')
                    .pascalize
                end

                def description
                    @description.gsub(/\n/, '')
                end

                def get_binding
                    binding
                end

                def enum_options
                    enums = simple_options.select { |o| !o.values.nil? }
                    composite = composite_options.flat_map { |o| o.options }

                    composite.each do |item|
                        composite.push(*item.options) if item.composite?

                        enums.push(item) if item.respond_to?(:values) && !item.values.nil?
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

                    class_content = CLASS_TEMPLATE.result(component.get_binding)

                    create_file(file_path, class_content)
                end

                def write_enums(component)
                    options = component.enum_options

                    options.each do |option|
                        filename = "#{@path}/#{option.csharp_type}.cs"

                        create_file(filename, option.to_enum)
                    end
                end

                def write_converter(component)
                    write_composite_option_converter_file(component)
                end

                def write_properties(component)
                    file_path = File.join(@path, component.csharp_class + '.cs')

                    properties_content = write_options(component.options)

                    write_file(file_path, properties_content, '#region [ Properties ]')

                    if component.widget?
                        serialization_content = write_options_serialization(component.options)
                        write_file(file_path, serialization_content, '#region [ Properties Serialization ]')
                    end

                end

                def write_options_serialization(options)
                    content = "\n"

                    options.each do |o|
                        content += o.to_serialization_declaration + "\n"
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
                    if option.class == CompositeOption && option.owner.class != ArrayItem && !CHILD_COMPONENTS.include?(option.csharp_class)
                        write_composite_option_file(option)
                    end
                    if option.class == ArrayOption && !CHILD_COMPONENTS.include?(option.item.csharp_class)
                        write_array_item_class(option.item)
                    end

                    option.to_declaration
                end

                def write_composite_option_file(composite)
                    filename = File.join(@path, "#{composite.csharp_class}.cs")
                    create_file(filename, composite.to_class_declaration)

                    composite_content = write_options(composite.options)

                    write_file(filename, composite_content, '#region [ Properties ]')

                    write_composite_option_converter_file(composite)
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
                    @@converters[key] << composite.csharp_converter_class

                    composite_content = write_converter_options(composite.options)

                    write_file(filename, composite_content, '#region [ SerializedProperties ]')
                end

                def write_array_item_class(item)
                    file_name = File.join(@path, "#{item.csharp_class}.cs")

                    create_file(file_name, item.to_class)

                    content = write_options(item.options[0].options)

                    write_file(file_name, content, '#region [ Properties ]')
                end

                def write_file(file_path, content, marker)
                    return unless File.exists?(file_path)

                    c = File.read(file_path).sub(Regexp.new(Regexp.escape(marker)), marker + content)

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
