namespace :cdn do
    desc('Deploy assets to CloudFront')

    task :deploy => 'bundles:cdn.commercial' do
        sh <<-SH
        if [ ! -d kendo-cdn ]
        then
            git clone git@github.com:telerik/kendo-cdn.git
        fi
        cd kendo-cdn;
        git pull;
        mkdir -p #{VERSION};
        rsync -av ../dist/bundles/cdn.commercial/ #{VERSION}/;
        git add #{VERSION};
        git commit --message "Automatic CDN upload of #{VERSION}";
        git push;
        rsync -avz --exclude '.git' --delete-excluded ./ kendoorigin:/usr/share/nginx/html/;
        SH
    end
end
