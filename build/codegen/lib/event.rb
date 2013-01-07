module CodeGen

    module Events
        def add_option(settings)
            name = settings[:name].strip.sub('e.', '')

            prefix = settings[:prefix]

            name = name.sub(prefix, '') if prefix

            description = settings[:description]

            type = settings[:type]

            parent = @options.find { |p| name.start_with?(p.name + '.') && p.type.include?('Object') }

            if parent
                parent = parent.to_composite

                parent.add_option(:name => name,
                                     :description => description,
                                     :type => type,
                                     :owner => self,
                                     :prefix => parent.name + '.')
            else
                @options.push option_class.new(:name => name,
                                                     :description => description,
                                                     :owner => self,
                                                     :type => type)

            end
        end

        def option_class
            EventOption
        end

        def composite_parameter_class
            CompositeEventOption
        end

        def composite_options
            @options.find_all {|p| p.composite? }
        end
    end

    class Event
        include Events

        attr_reader :name, :description, :owner, :options

        def initialize(settings)
            @name = settings[:name]
            @description = settings[:description]
            @owner = settings[:owner]
            @options = [];
        end

    end

    class EventOption
        attr_reader :name, :owner, :type, :description

        def composite?
            false
        end

        def initialize(settings)
            @name = settings[:name]

            @type = settings[:type]

            @type = type.split('|').map { |t| t.strip } if @type.is_a?(String)

            @description = settings[:description]
            @owner = settings[:owner]
        end

        def composite_option_class
            CompositeEventOption
        end

        def to_composite
            type = []

            if @type.include?('Object')
                type.push('Object')
                @type.delete('Object')
            end

            @owner.options.delete(self) if @type.empty?

            parent = composite_option_class.new(:name => @name,
                                          :owner => @owner,
                                          :type => type,
                                          :description => @description)

            @owner.options.push(parent)

            parent
        end
    end

    class CompositeEventOption < EventOption
        include Events

        def composite?
            true
        end

        attr_reader :options

        def initialize(settings)
            super(settings)

            @options = []
        end

        def to_composite
            self
        end
    end

end
