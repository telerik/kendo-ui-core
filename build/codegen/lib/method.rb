module CodeGen

    class Method
        attr_reader :name, :owner, :description, :parameters, :result

        def initialize(settings)
            @name = settings[:name]
            @description = settings[:description]
            @owner = settings[:owner]
            @parameters = []
            @result = Result.new(settings[:result]) if settings[:result]
        end

        def add_parameter(settings)
            parameters.push Parameter.new(settings)
        end
    end

    class Result
        attr_reader :type, :description

        def initialize(settings)
            @type = settings[:type]
            @description = settings[:description]
        end
    end

    class Parameter
        attr_reader :name, :description, :type

        def initialize(settings)
            @name = settings[:name]
            @type = settings[:type]
            @description = settings[:description]
        end
    end
end
