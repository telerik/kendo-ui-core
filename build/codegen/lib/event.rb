module CodeGen
end
class CodeGen::Event
    attr_reader :name, :description, :owner

    def initialize(options)
        @name = options[:name]
        @description = options[:description]
        @owner = options[:owner]
    end

end
