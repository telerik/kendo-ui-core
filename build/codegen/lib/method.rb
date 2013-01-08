module CodeGen

    module Parameters
        def add_parameter(settings)
            name = settings[:name].strip

            prefix = settings[:prefix]

            name = name.sub(prefix, '') if prefix

            description = settings[:description]

            optional = settings[:optional]

            type = settings[:type]

            parent = @parameters.find { |p| name.start_with?(p.name + '.') && p.type.include?('Object') }

            if parent
                parent = parent.to_composite

                parent.add_parameter(:name => name,
                                     :description => description,
                                     :type => type,
                                     :optional => optional,
                                     :owner => self,
                                     :prefix => parent.name + '.')
            else
                @parameters.push parameter_class.new(:name => name,
                                                     :description => description,
                                                     :optional => optional,
                                                     :owner => self,
                                                     :type => type)

            end
        end

        def parameter_class
            Parameter
        end

        def composite_parameter_class
            CompositeParameter
        end

        def composite_parameters
            @parameters.find_all {|p| p.composite? }
        end
    end

    class Method
        include Parameters

        attr_reader :name, :owner, :description, :parameters, :result

        def result_class
            Result
        end

        def initialize(settings)
            @name = settings[:name]
            @description = settings[:description] || ''
            @owner = settings[:owner]
            @parameters = []
            @result = result_class.new(settings[:result]) if settings[:result]
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
        attr_reader :name, :description, :type, :owner, :optional

        def composite?
            false
        end

        def initialize(settings)
            @name = settings[:name]

            @optional = settings[:optional]

            @type = settings[:type]

            @type = type.split('|').map { |t| t.strip } if @type.is_a?(String)

            @owner = settings[:owner]

            @description = settings[:description] || ''
        end

        def composite_parameter_class
            CompositeParameter
        end

        def to_composite
            type = []

            if @type.include?('Object')
                type.push('Object')
                @type.delete('Object')
            end

            @owner.parameters.delete(self) if @type.empty?

            parent = composite_parameter_class.new(:name => @name,
                                          :owner => @owner,
                                          :type => type,
                                          :description => @description)

            @owner.parameters.push(parent)

            parent
        end
    end

    class CompositeParameter < Parameter
        include Parameters

        attr_reader :parameters

        def initialize(settings)
            super(settings)

            @parameters = []
        end

        def composite?
            true
        end

        def to_composite
            self
        end
    end
end
