require 'field'
require 'event'

class Component
    attr_reader :fields, :name, :events

    def initialize(options)
        @name = options[:name]
        @fields = []
        @events = []
    end

    def add_field(options)
        @fields.push Field.new(options)
    end

    def add_event(options)
        @events.push Event.new(options)
    end
end
