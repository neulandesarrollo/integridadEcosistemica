
## Rasterio
https://mapbox.github.io/rasterio/installation.html
http://docs.python-guide.org/en/latest/dev/virtualenvs/

````
$ python3 -m venv .venv
$ source .venv/bin/activate
$ pip install numpy
$ pip install rasterio

$ rio calc "(asarray (take a 1) (take a 2) (take a 3))" --co compress=lzw --co tiled=true --co blockxsize=256 --co blockysize=256 --name a=INPUT.tif OUTPUT.tif

$ rio edit-info --nodata 255 --crs EPSG:4326 OUTPUT.tif
````
