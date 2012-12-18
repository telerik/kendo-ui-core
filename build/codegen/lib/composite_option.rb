module CodeGen

class CompositeOption
    attr_reader :name, :description, :type, :options, :owner

    def initialize(settings)
        @name = settings[:name]
        @description = settings[:description]
        @type = settings[:type]
        @owner = settings[:owner]
        @recursive = settings[:recursive]
        @options = []
    end

    def composite_options
        @options.find_all { |option| option.composite? }.sort {|a, b| a.name <=> b.name }
    end

    def composite?
        true
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

    def add_option(settings, prefix = nil)
        prefix ||= @name + '.'

        recursive = settings[:recursive]

        name = settings[:name].sub(prefix, '')

        return if name == ''

        type = settings[:type]

        description = settings[:description]

        return if @options.any? { |option| option.name == name && option.type == type }

        parent = @options.find { |option| name.start_with?(option.name + '.') && option.type =~ /Object|Array/ }

        if parent

            parent = parent.to_composite

            parent.add_option(:name => name,
                              :type => type,
                              :recursive => recursive,
                              :description => description)

        else
            @options.push option_class.new(:name => name,
                                           :owner => self,
                                           :type => type,
                                           :recursive => recursive,
                                           :description => description)
        end

    end
end

end # module CodeGen
