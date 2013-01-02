module CodeGen

    class Method
        attr_reader :name, :owner, :description, :parameters, :result

        def result_class
            Result
        end

        def parameter_class
            Parameter
        end

        def initialize(settings)
            @name = settings[:name]
            @description = settings[:description] || ''
            @owner = settings[:owner]
            @parameters = []
            @result = result_class.new(settings[:result]) if settings[:result]
        end

        def add_parameter(settings)
            settings[:owner] = self
            @parameters.push parameter_class.new(settings)
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
        attr_reader :name, :description, :type, :owner

        def initialize(settings)
            @name = settings[:name]
            @type = settings[:type]
            @owner = settings[:owner]
            @description = settings[:description] || ''
        end
    end
end
