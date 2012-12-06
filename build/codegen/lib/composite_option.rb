module CodeGen

class CompositeOption
    attr_reader :name, :description, :type, :options, :owner

    def initialize(settings)
        @name = settings[:name]
        @description = settings[:description]
        @type = settings[:type]
        @owner = settings[:owner]
        @options = []
    end

    def composite_options
        @options.find_all { |option| option.instance_of?(composite_option_class) }
    end

    def to_composite
        self
    end

    def composite_option_class
        CompositeOption
    end

    def option_class
        Option
    end

    def add_option(settings)
        name = settings[:name].sub(@name + '.', '')
        type = settings[:type]
        description = settings[:description]

        parent = @options.find { |parent| name.start_with?(parent.name + '.') }

        if parent

            unless parent.instance_of?(composite_option_class)
                @options.delete(parent)

                parent = composite_option_class.new(:name => parent.name,
                                                    :owner => self,
                                                    :type => parent.type,
                                                    :description => parent.description)
                @options.push(parent)
            end

            parent.add_option(:name => name,
                              :type => type,
                              :description => description)

        else
            @options.push option_class.new(:name => name,
                                           :owner => self,
                                           :type => type,
                                           :description => description)
        end
    end
end

end # module CodeGen
