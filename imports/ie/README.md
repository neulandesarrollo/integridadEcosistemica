
## Rasterio
https://mapbox.github.io/rasterio/installation.html

````
rio calc "(asarray (take a 1) (take a 2) (take a 3))" --co compress=lzw --co tiled=true --co blockxsize=256 --co blockysize=256 --name a=mex.tif mex255.tif

rio edit-info --nodata 0 mex255.tif
````
