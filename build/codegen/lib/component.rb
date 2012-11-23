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
        name = options[:name].strip

        description = options[:description]

        types = options[:type]

        if types
            types.split('|').each do |type|
                @fields.push Field.new(:name => name,
                                       :type => type.strip,
                                       :description => description)
            end
        end
    end


    def add_event(options)
        @events.push Event.new(options)
    end

    def promote_members
        @fields.clone.each do |field|
            prefix = field.name + '.'

            fields = @fields.find_all {|f| f.name.start_with?(prefix)}

            events = @events.find_all {|e| e.name.start_with?(prefix)}

            next unless fields.any? || events.any?

            @fields.push promote_field_to_component(field, fields, events)
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

    def import_events(events)
        prefix = @name + "."

        events.each do |event|
            add_event(:name => event.name.sub(prefix, ''),
                      :description => event.description)
        end
    end

    private

    def promote_field_to_component(field, fields, events)
        fields.each {|f| @fields.delete(f)}

        events.each {|e| @events.delete(e)}

        @fields.delete(field)

        component = Component.new(:name => field.name)

        component.import_fields(fields)

        component.import_events(events)

        component
    end
end
