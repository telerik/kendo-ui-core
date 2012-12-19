module CodeGen

class CompositeOption
    include Options

    attr_reader :name, :description, :type, :options, :owner, :recursive

    def initialize(settings)
        @name = settings[:name]
        @description = settings[:description]
        @type = settings[:type]
        @owner = settings[:owner]
        @recursive = settings[:recursive]
        @options = []
    end

    def composite?
        true
    end

    def to_composite
        self
    end

<<<<<<< HEAD
=======
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

        parent = @options.find { |option| name.start_with?(option.name + '.') && (option.type.include?('Object') || option.type.include?('Array')) }

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
>>>>>>> Refactor tld generation.
end

end # module CodeGen
