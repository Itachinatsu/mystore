aws s3 cp --recursive --acl public-read --cache-control="max-age=0, no-cache, no-store, must-revalidate" ./dist/mystore-frontend s3://mystorefrontend-bucket/