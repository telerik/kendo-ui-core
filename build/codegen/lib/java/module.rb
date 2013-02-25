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
        'stockchart' => ['axisDefaults', 'seriesDefaults'],
        'tooltip' => ['content'],
        'column' => ['values']
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

        def simple_options
            @options.find_all { |o| !o.composite? }
                    .sort { |a, b| a.name <=> b.name }
        end

        def delete_ignored
           @options.delete_if { |o| CodeGen::Java.ignored?(@name, o.name) }
           composite_options.each { |o| o.delete_ignored }
        end

    end

    module ArrayItem

        def tag_name
            @owner.tag_name.sub(@owner.name.camelize, @name.camelize)
        end

        def tag_class
            super.sub(@owner.name.pascalize, '')
        end

    end
end
