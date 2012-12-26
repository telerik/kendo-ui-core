module CodeGen

class CompositeOption
    include Options

    attr_reader :name, :description, :type, :options, :owner, :recursive, :default

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

end

end # module CodeGen
