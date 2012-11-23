class Field
    attr_reader :name, :description, :type

    def initialize(options)
        @name = options[:name]
        @description = options[:description]
        @type = options[:type]
    end

    def accept(visitor)
        visitor.field(self)
    end
end
