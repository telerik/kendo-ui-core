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

    class Option < CodeGen::MVC::Wrappers::Option
        include Options
    end

    class CompositeOption < CodeGen::MVC::Wrappers::CompositeOption
        include Options
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

    class Event < CodeGen::MVC::Wrappers::Event
        include Options
    end


    class Component < CodeGen::MVC::Wrappers::Component
        include Options

        def name
            "Mobile#{@name}"
        end

    end
end
