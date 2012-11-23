require 'field'
require 'event'

class Component
    attr_reader :fields, :name, :events

    def initialize(fields)
        @name = fields[:name]
        @fields = []
        @events = []
    end

    def add_field(fields)
        @fields.push Field.new(fields)
    end

    def add_event(fields)
        @events.push Event.new(fields)
    end

    def promote
        @fields.clone.each do |field|
            prefix = field.name + '.'

            child_fields = @fields.find_all {|f| f.name.start_with?(prefix)}

            next unless child_fields.any?

            child_fields.each {|f| @fields.delete(f)}

            @fields.delete(field)

            component = Component.new(:name => field.name)

            @fields.push(component)
        end
    end
end
