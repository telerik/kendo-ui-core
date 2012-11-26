require 'field'
require 'event'

class Component
    attr_reader :members, :name

    def initialize(members)
        @name = members[:name]
        @members = []
    end

    def add_field(options)
        name = options[:name].strip.sub(/\s*type\s*[=:][^\.]*\.?/, '')

        description = options[:description]

        types = options[:type]

        if types
            types.split('|').each do |type|
                @members.push Field.new(:name => name,
                                       :type => type.strip,
                                       :description => description)
            end
        end
    end

    def add_event(options)
        @members.push Event.new(options)
    end

    def accept(visitor)
        visitor.component(self)

        @members.each {|f| f.accept(visitor)}
    end

    def promote_members
        @members.clone.each do |member|
            prefix = member.name + '.'

            members = @members.find_all {|m| m.name.start_with?(prefix)}

            next unless members.any?

            @members.push promote_member_to_component(member, members)
        end
    end

    def import_members(members)
        prefix = @name + "."

        members.each do |member|
            member.name.sub!(prefix, '')
            @members.push(member)
        end
    end

    private

    def promote_member_to_component(member, members)
        members.each {|m| @members.delete(m)}

        @members.delete(member)

        component = Component.new(:name => member.name)

        component.import_members(members)

        component.promote_members

        component
    end
end
