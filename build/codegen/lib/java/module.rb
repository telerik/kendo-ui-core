module CodeGen::Java

    TYPES = {
        'Number' => 'float',
        'String' => 'String',
        'Boolean' => 'boolean',
        'Object' => 'Object',
        'Array' => 'Object',
        'Function' => 'String',
        'Date' => 'java.util.Date'
    }

    IGNORED = {
        'chart' => ['axisDefaults', 'seriesDefaults'],
        'stockchart' => ['axisDefaults', 'seriesDefaults']
    }

    def self.ignored?(component, option)
        ignored = IGNORED[component.downcase]

        ignored && ignored.any? { |ignore| option.start_with?(ignore) }
    end

    module Options

        def composite_option_class
            CompositeOption
        end

        def option_class
            Option
        end

<<<<<<< HEAD
        def simple_options
            @options.find_all { |o| !o.composite? }
                    .sort { |a, b| a.name <=> b.name }
        end

    end

    module ArrayItem

        def tag_name
            @owner.tag_name.sub(@owner.name.camelize, @name.camelize)
        end

        def tag_class
            super.sub(@owner.name.pascalize, '')
=======
        def unique_composite_options
            composite_options
        end

        def unique_options
            @options.find_all { |o| !o.composite? }
                    .sort { |a, b| a.name <=> b.name }
>>>>>>> Refactor jsp generation.
        end

    end
end
