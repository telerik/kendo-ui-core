module CodeGen::Java::TLD

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

    class Component < CodeGen::Java::Component
        include Options

        def to_tld
            COMPONENT.result(binding)
        end
    end

    class Event < CodeGen::Java::Event
        include Options
    end

    class Option < CodeGen::Java::Option
        include Options

        def array_option_class
            ArrayOption
        end

        def attr
            @name.sub(/^[a-z]{1}[A-Z]{1}[a-zA-Z]*/) {|c| c.downcase}
        end
    end

    class CompositeOption < CodeGen::Java::CompositeOption
        include Options

        def body_content
            return 'JSP' if @recursive || @options.any? { |option| option.composite? || option.type.include?('Function') }

            'empty'
        end

        def to_tag
            COMPOSITE_OPTION.result(binding)
        end
    end

    class ArrayOption < CompositeOption
        include CodeGen::Array

        def item_class
            ArrayItem
        end

        def to_tag
            ARRAY.result(binding)
        end
    end

    class ArrayItem < CompositeOption
        include CodeGen::Java::ArrayItem
    end

    COMPOSITE_OPTION = ERB.new(File.read('build/codegen/lib/java/composite_option.tld.erb'), 0, '<>%')

    ARRAY = ERB.new(File.read('build/codegen/lib/java/array.tld.erb'), 0, '<>%')

    COMPONENT = ERB.new(File.read('build/codegen/lib/java/component.tld.erb'), 0, '<>%')

class Generator
    def initialize(filename)
        @filename = filename
        @tld = ''
    end

    def component(component)

        component.delete_ignored

        @tld += component.to_tld

    end

    def sync()
        src = File.read(@filename)
                  .sub(/<!-- Auto-generated -->(.|\n)*<!-- Auto-generated -->/,
                     "<!-- Auto-generated -->\n\n" + @tld + "\n\n<!-- Auto-generated -->")

        File.write(@filename, src.dos)
    end

end

end # module CodeGen::Java::TLD
