require 'field'
require 'event'

module CodeGen
end

class CodeGen::Component
    attr_reader :members, :name, :configuration, :events

    def initialize(options)
        @name = options[:name]
        @configuration = []
        @events = []
        @members = @configuration
    end

    def add_option(options)
        name = options[:name].strip.sub(/\s*type\s*[=:][^\.]*\.?/, '')

        description = options[:description]

        types = options[:type]

        if types
            types.split('|').each do |type|

                @configuration.push CodeGen::Field.new(:name => name,
                                       :type => type.strip,
                                       :description => description)
            end
        end
    end

    def add_event(options)
        @members.push CodeGen::Event.new(options)
        @events.push CodeGen::Event.new(options)
    end

    def accept(visitor)
        visitor.component_start(self)

        @members.each {|f| f.accept(visitor)}

        visitor.component_end(self)
    end

    def promote_members
        @configuration.clone.each do |member|
            prefix = member.name + '.'

            members = @configuration.find_all {|m| m.name.start_with?(prefix)}

            next unless members.any?

            @configuration.push promote_member_to_component(member, members)
        end
    end

    def import_members(members)
        prefix = @name + "."

        members.each do |member|
            member.name.sub!(prefix, '')
            @configuration.push(member)
        end
    end

    private

    def promote_member_to_component(member, members)
        members.each {|m| @configuration.delete(m) }

        @configuration.delete(member)

        component = CodeGen::Component.new(:name => member.name)

        component.import_members(members)

        component.promote_members

        component
    end
end

