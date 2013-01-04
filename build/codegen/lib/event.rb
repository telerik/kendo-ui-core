module CodeGen

    class Event
        attr_reader :name, :description, :owner, :options

        def initialize(settings)
            @name = settings[:name]
            @description = settings[:description]
            @owner = settings[:owner]
            @options = [];
        end

        def option_class
            EventOption
        end
        def add_option(settings)
            settings[:owner] = self
            @options.push option_class.new(settings)
        end
    end

    class EventOption
        attr_reader :name, :owner, :type, :description

        def initialize(settings)
            @name = settings[:name].sub('e.', '')
            @type = settings[:type].strip if settings[:type]
            @description = settings[:description]
            @owner = settings[:owner]
        end
    end
end
