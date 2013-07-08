module CodeGen

    class Field
        attr_reader :name, :description, :type, :owner

        def initialize(options)
            @name = options[:name]
            @description = options[:description] || ''
            @type = options[:type]
            @owner = options[:owner]
        end
    end
end
