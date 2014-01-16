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
namespace Telerik.Web.UI //full_name: <%= full_name %>
{
  /// <summary>
  /// Summary description for MyControl
  /// </summary>
  public class <%= name.pascalize %> : Telerik.Web.StateManager
  {
    #region [ Constructor ]
    public class <%= name.pascalize %>() {}
    #endregion [ Constructor ]

    #region [ Properties ]
    #endregion [ Properties ]

    #region [ Events ]
    #endregion [ Events ]

  }
}
')

      PROPERTY_TEMPLATE = ERB.new('
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
            this._<%= name %> = new <%= csharp_class %>(ViewState);
        }
        return this._<%= name %>;
      }
    }')

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
    end

      class Option < CodeGen::Option
        include Options

        def csharp_type
          TYPES_MAP[type[0]]
        end

        def to_declaration
            PROPERTY_TEMPLATE.result(get_binding)
        end

        def csharp_default
          return default if type[0] == 'String'
          return default.to_f if type[0] == 'Number'
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

        def get_binding
            binding
        end
    end

      class Component < CodeGen::Component
        include Options

        def csharp_class
            name
        end

        def get_binding
          binding
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
            write_composite_option_file(option) if option.class == CompositeOption
 
            option.to_declaration
        end

        def write_composite_option_file(composite)
            composite_content = write_options(composite.options)

            create_file(File.join(@path, "#{composite.csharp_class}.cs"), composite_content)
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
