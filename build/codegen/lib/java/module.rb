module CodeGen::Java

    TYPES = {
        'Number' => 'float',
        'number' => 'float',
        'String' => 'java.lang.String',
        'string' => 'java.lang.String',
        'Boolean' => 'boolean',
        'Object' => 'Object',
        'Array' => 'java.lang.Object',
        'Function' => 'java.lang.String',
        'Date' => 'java.util.Date'
    }

    IGNORED = {
        'chart' => ['axisDefaults', 'seriesDefaults'],
        'stockchart' => ['axisDefaults', 'seriesDefaults'],
        'window' => ['content'],
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

        def unique_composite_options
            options = composite_options

            options.clone.each do |option|

                next if option.type == 'Array'

                homonyms = options.find_all {|o| o.name == option.name }

                if homonyms.size > 1

                    options.delete(option)

                end
            end

            options
        end

        def unique_options
            options = @options.find_all { |o| o.instance_of?(option_class) }
                              .find_all { |o| !CodeGen::Java.ignored?(@name, o.name) }

            options.clone.each do |option|

                homonyms = options.find_all {|o| o.name == option.name }

                if homonyms.size > 1

                    homonyms.each { |option| options.delete(option) }

                    options.push option_class.new(:name => option.name,
                                            :owner => self,
                                            :description => option.description,
                                            :type => 'Object')
                end
            end

            options.sort{ |a, b| a.name <=> b.name }
        end

    end

end
