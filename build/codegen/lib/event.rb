class Event
    attr_reader :name, :description

    def initialize(options)
        @name = options[:name]
        @description = options[:description]
    end
end
