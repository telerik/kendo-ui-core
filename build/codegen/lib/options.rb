module CodeGen
    module Options

        def composite_options
            @options.find_all { |option| option.composite? }.sort {|a, b| a.name <=> b.name }
        end

        def simple_options
            @options.find_all { |option| !option.composite? }.sort {|a, b| a.name <=> b.name }
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

        def add_option(settings)
            name = settings[:name].strip

            prefix = settings[:prefix]

            name = name.sub(prefix, '') if prefix

            recursive = settings[:recursive]

            description = settings[:description]

            types = settings[:type]

            return unless types

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> More refactoring.
            if types.is_a?(String)
                type = types.split('|').map { |type| type.strip }.find_all { |t| TYPES.include?(t) }
            else
                type = types
            end
<<<<<<< HEAD
=======
            type = types.split('|').map { |type| type.strip }.find_all { |t| TYPES.include?(t) }
>>>>>>> Add generate:java task
=======
>>>>>>> More refactoring.

            return if type.empty?

            parents = @options.find_all { |option| name.start_with?(option.name + '.') && (option.type.include?('Object') || option.type.include?('Array')) }

            parents.map! { |parent| parent.to_composite }

            if parents.any?

                parents.each do |parent|

                    parent.add_option(:name => name,
                                      :type => type,
                                      :recursive => recursive,
                                      :prefix => parent.name + '.',
                                      :description => description)
                end

            else

                @options.push option_class.new(:name => name,
                                               :owner => self,
                                               :recursive => recursive,
                                               :type => type,
                                               :description => description)

            end

        end
    end
end
