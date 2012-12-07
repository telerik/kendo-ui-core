module CodeGen::Java

    module Options

        def composite_option_class
            CompositeOption
        end

        def option_class
            Option
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
