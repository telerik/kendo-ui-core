module CodeGen::MVC::Wrappers::DataViz

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

    class Option < CodeGen::MVC::Wrappers::Option
        include Options
    end

    class CompositeOption < CodeGen::MVC::Wrappers::CompositeOption
        include Options
    end

    class ArrayItem < CompositeOption
        def csharp_class
            owner.csharp_item_class
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
    end

    class Event < CodeGen::MVC::Wrappers::Event
        include Options
    end

    class Component < CodeGen::MVC::Wrappers::Component
        include Options
    end
end
