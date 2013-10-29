module CodeGen::MVC::Wrappers::Mobile

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

    end

    TYPES = {
        'Number' => 'int',
        'String' => 'string',
        'Boolean' => 'bool',
        'Object' => 'object',
        'Function' => 'string',
        'Date' => 'DateTime'
    }

        FIELD_DECLARATION = ERB.new(%{
        public <%= csharp_type %> <%= csharp_name %> { get; set; }
        })

    class Option < CodeGen::MVC::Wrappers::Option
        include Options

        def csharp_type
            if values
                "#{owner.csharp_class.gsub(/Settings/, "")}#{csharp_name}"
            else
                TYPES[type[0]]
            end
        end

        def declaration_template
            FIELD_DECLARATION
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
            json["<%= name.to_attribute %>"] = <%= csharp_name %>;
                }).result(binding)
        end

    end

    class CompositeOption < CodeGen::MVC::Wrappers::CompositeOption
        include Options

        def to_client_option
            ERB.new(%{
            json["<%= name.to_attribute %>"] = <%=csharp_name%>.ToJson();
                }).result(binding)
        end
    end

    class ArrayItem < CompositeOption
        def csharp_class
            owner.csharp_item_class
        end

        def full_name
            @owner.full_name
        end

    end

    class ArrayOption < CompositeOption
        include CodeGen::Array

        def item_class
            ArrayItem
        end
        def csharp_class
            "List<#{csharp_item_class}>"
        end

        def csharp_builder_class
            "#{owner.csharp_class}#{csharp_name.chop}Factory"
        end

        def csharp_item_class
            "#{owner.csharp_class}#{csharp_name.chop}"
        end

        def delete_ignored
            item.delete_ignored
        end

        def composite_options
            []
        end

        def unique_options
            item.unique_options
        end
    end

    class Event < CodeGen::MVC::Wrappers::Event
        include Options

        def event_name
            name.to_attribute
        end
    end

    COMPONENT = ERB.new(File.read("build/codegen/lib/mvc/mobile.component.csharp.erb"), 0, '%<>')
    SETTING = ERB.new(File.read("build/codegen/lib/mvc/mobile.setting.csharp.erb"), 0, '%<>')
    SETTING_FLUENT = ERB.new(File.read("build/codegen/lib/mvc/mobile.setting.builder.csharp.erb"), 0, '%<>')

    class Component < CodeGen::MVC::Wrappers::Component
        include Options

        def name
            "Mobile#{@name}"
        end

        def component_template
            COMPONENT
        end

        def setting_template
            SETTING
        end

        def setting_fluent_template
            SETTING_FLUENT
        end
    end
end
