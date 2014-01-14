require 'codegen/lib/string.rb'

module CodeGen
  module ASPX
    module Wrappers

      TYPES_MAP = {
          'String' => 'string',
          'Number' => 'decimal',
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
    }
')

      class CodeGen::Option
        def get_binding
          binding
        end

        def csharp_type
          TYPES_MAP[type[0]]
        end

        def csharp_default
          return default if type[0] == 'String'
          return default.to_f if type[0] == 'Number'
        end
      end


      class Component < CodeGen::Component
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

          properties_content = ''
          component.options.each do |option|
            properties_content += PROPERTY_TEMPLATE.result(option.get_binding)
          end

          write_file(file_path, properties_content, '#region [ Properties ]')
        end

        def write_events(component)

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