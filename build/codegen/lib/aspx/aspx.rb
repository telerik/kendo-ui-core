require 'codegen/lib/string.rb'

module CodeGen
  module ASPX
    module Wrappers

      TYPES_MAP = {
          'String' => 'string',
          'Number' => 'double',
          'Boolean' => 'bool',
          'Object' => 'object',
          'Function' => 'string',
          'Date' => 'DateTime'
      }

      CLASS_TEMPLATE = ERB.new('
namespace <%= csharp_namespace %>
{

    using System.ComponentModel;

    /// <summary>
    /// 
    /// </summary>
    public class <%= csharp_class %> : Telerik.Web.StateManager
    {
        #region [ Constructor ]
        public <%= csharp_class %>() {}
        #endregion [ Constructor ]
    
        #region [ Properties ]
        #endregion [ Properties ]
    
        #region [ Events ]
        #endregion [ Events ]

  }
}
')
      
      COMPOSITE_CLASS_TEMPLATE = ERB.new('
namespace <%= csharp_namespace %>
{
    using System.ComponentModel;

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
    [DefaultValue("<%= name.pascalize %>")]
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
        <%= value_to_s(value).pascalize %> <%= \',\' if index < values.length - 1 %>
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
    /// <summary>
    /// <%= description %>
    /// </summary>
    public class <%= csharp_class %>
    {
        public <%= csharp_class %>() {}

        #region [ Properties ]
        #endregion [ Properties ]
    }
}
')

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

        def csharp_type
            return "#{owner.csharp_class}#{name.pascalize}" if values
            return TYPES_MAP[type[0]]
        end

        def to_declaration
            return PROPERTY_WITH_DEFAULT_VALUE_TEMPLATE.result(get_binding) if csharp_default
            return PROPERTY_TEMPLATE.result(get_binding)
        end

        def csharp_default
          return default if type[0] == 'String'
          return default.to_f if type[0] == 'Number'
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
            prefix = owner.csharp_class.sub('Settings', '')
            "#{prefix}#{name.pascalize}Settings"
        end

        def to_declaration
            COMPOSITE_PROPERTY_TEMPLATE.result(get_binding)
        end

        def to_class_declaration
            COMPOSITE_CLASS_TEMPLATE.result(get_binding)
        end

        def description
            @description.gsub(/\n/, '')
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

            name.pascalize
        end

        def csharp_namespace
            prefix = "Telerik.Web.UI"

            return "#{prefix}.#{owner_namespace}" unless widget?

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

        def get_binding
          binding
        end

        def enum_options
            enums = simple_options.select{ |o| !o.values.nil? }
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

        def initialize(path)
          @path = path
        end

        def component(component)
          write_class(component)
          write_enums(component)
          write_properties(component)
          write_events(component)
        end

        private

        def write_class(component)
          file_path = File.join(@path, component.name.pascalize + '.cs')
          return if File.exists?(file_path)

          class_content = CLASS_TEMPLATE.result(component.get_binding)

          create_file(file_path, class_content)
        end

        def write_enums(component)
            options = component.enum_options

            options.each do |option|
                filename = "#{@path}/#{component.csharp_class}#{option.csharp_name}.cs"

                create_file(filename, option.to_enum)
            end 
        end

        def write_properties(component)
          file_path = File.join(@path, component.name.pascalize + '.cs')

          properties_content = write_options(component.options)

          write_file(file_path, properties_content, '#region [ Properties ]')
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
            
            write_file(filename, composite_content, '#region [ Properties ]')
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
