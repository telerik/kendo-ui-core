require 'field'
require 'event'

class Component
    attr_reader :fields, :name, :events

    def initialize(fields)
        @name = fields[:name]
        @fields = []
        @events = []
    end

    def add_field(options)
        @fields.push Field.new(options)
    end


    def add_event(options)
        @events.push Event.new(options)
    end

    def promote_members
        @fields.clone.each do |field|
            prefix = field.name + '.'

            children = @fields.find_all {|f| f.name.start_with?(prefix)}

            next unless children.any?

            @fields.push promote_field_to_component(field, children)
        end
    end

    def import_fields(fields)
        prefix = @name + "."

        fields.each do |field|
            add_field(:name => field.name.sub(prefix, ''),
                      :type => field.type,
                      :description => field.description)
        end
    end

    private

    def promote_field_to_component(field, children)
        children.each {|f| @fields.delete(f)}

        @fields.delete(field)

        component = Component.new(:name => field.name)

        component.import_fields(children)

        component
    end
end
