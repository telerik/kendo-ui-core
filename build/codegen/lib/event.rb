module CodeGen
end
class CodeGen::Event
    attr_reader :name, :description

    def initialize(options)
        @name = options[:name]
        @description = options[:description]
    end

    def accept(visitor)
        visitor.event(self)
    end
end
