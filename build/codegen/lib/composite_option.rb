module CodeGen

class CompositeOption
    attr_reader :name, :description, :type, :options

    def initialize(settings)
        @name = settings[:name]
        @description = settings[:description]
        @type = settings[:type]
        @options = []
    end

    def add_option(option)
        option.name.sub!(@name + '.', '')

        parent = @options.find { |parent| option.name.start_with?(parent.name + '.') }

        if parent

            unless parent.instance_of?(CompositeOption)
                @options.delete(parent)

                parent = CompositeOption.new(:name => parent.name,
                                             :type => parent.type,
                                             :description => parent.description)
                @options.push(parent)
            end

            parent.add_option(option)

        else
            @options.push(option)
        end
    end
end

end # module CodeGen
