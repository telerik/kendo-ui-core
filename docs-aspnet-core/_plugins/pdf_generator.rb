module Jekyll
=begin

    LATEX_HEADER = <<-LATEX
\\documentclass{scrartcl}
\\usepackage[utf8x]{inputenc}
\\usepackage[T1]{fontenc}
\\usepackage{listings}
\\usepackage{hyperref}
\\hypersetup{colorlinks=true,urlcolor=blue}
\\begin{document}
\\tableofcontents
LATEX

LATEX_FOOTER = "\\end{document}"

    module Pdf
        class Node
            attr_reader :path, :text
            attr_accessor :level
            def initialize(path, text)
                @path = path
                @text = text
                @items = {}
            end

            def add(item)
                @items[item.path] = item
                item.level = level + 1
            end

            def child(path)
                @items[path]
            end

            def title
                return "" if text.empty?
                "#" * level + " " + text + "\n"
            end

            def toc
                title + @items.map { |key, item| item.toc }.join("")
            end

            def latex
                @items.values.map { |item| item.latex }.join("")
            end
        end


        class Page < Node
            def initialize(path, text, content)
                @path = path
                @text = text
                @content = content
            end

            def latex
                Kramdown::Document.new(File.read(@content).sub(/---.+---/m, '')).to_latex
            end

            alias :toc :title
        end
    end

    class PdfGenerator < Generator
        def initialize(config)
            @mapping = config['mapping'] || {}
        end

        def generate(site)
            root = Pdf::Node.new('/', '')
            root.level = 0

            site.pages.each do |page|
                parent = page.data['category']

                next unless parent

                url = page.url

                segments = url.split('/')
                segments.shift

                parent = root

                segments.each_with_index do |segment, index|
                    item = parent.child(segment)

                    unless item
                        mapped_segment = @mapping[segment] || segment

                        if index == segments.size - 1
                            item = Pdf::Page.new(segment, page.data[:nav_title] ? page.data[:nav_title].split('.').last : mapped_segment, page.path)
                        else
                            item = Pdf::Node.new(segment, mapped_segment)
                        end
                        parent.add(item)
                    end

                    parent = item
                end
            end

            latex = File.join(site.dest, "doc.latex")

            site.keep_files << latex

            File.open latex, 'w' do |out|
                out.write LATEX_HEADER
                out.write root.latex
                out.write LATEX_FOOTER
            end

            # You need to call that twice. Yes.
            system "pdflatex -interaction=batchmode #{latex}"
            system "pdflatex -interaction=batchmode #{latex}"

        end
    end
=end
end

