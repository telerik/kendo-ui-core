class SlugTag < Liquid::Block
    @@page_by_slug = nil

    def initialize(tag_name, text, tokens)
        @text = text.strip
    end

    def index_slugs(site)
        return if @@page_by_slug

        @@page_by_slug = Hash.new
        Jekyll.logger.info "      Indexing slugs in #{site.pages.length} pages..."

        duplicates = false
        page = site.pages.each do |p|
            slug = p.data['slug']
            if (slug)
                if @@page_by_slug.has_key?(slug)
                    Jekyll.logger.warn "Duplicate slug '#{slug}' on #{p.url}"
                    duplicates = true
                end

                @@page_by_slug[slug] = p
            end
        end

        if duplicates
            raise "Duplicate slugs found. Aborting"
        else
            Jekyll.logger.info "      Done. Found #{@@page_by_slug.length} unique slugs."
        end
    end

    def render(context)
        index_slugs context.registers[:site]

        page = @@page_by_slug[@text]
        if page
            page.url.sub('.html', '')
        else
            page_url = context.environments.first["page"]["url"]
            Jekyll.logger.warn "Slug:", "No page with slug `#{@text}` in #{page_url}. Consider fixing the slug or use normal link." 
        end
    end
end

Liquid::Template.register_tag('slug', SlugTag)
