# Install
## Ubuntu 16.04 x64
### GDAL
Add PPA https://wiki.ubuntu.com/UbuntuGIS
Packages: https://launchpad.net/ubuntu/+source/gdal
````
sudo add-apt-repository ppa:ubuntugis/ppa
sudo apt-get update
sudo apt-get install gdal-bin
````

# Image processing
## Viewer
May only be able to view the final output. XnView is probably better on faster computers, Gwenview is probably better on slower ones. Mileage may vary.

[XnView MP](http://www.xnview.com/en/xnviewmp/#downloads)

Gwenview (Ubuntu: `sudo apt-get install gwenview`)

## Get upper-left, lower-right bound

- Copy the `Corner Coordinates` from `gdal_info FILENAME`
- Flip coordinates to be in form <LONG, LAT>
- Replace `d` with `°`
- Paste into Google Maps to get decimal form

e.g.
````
118d47'59.77"W, 32d22'12.35"N
=> 32°22'12.3"N 118°47'59.8"W (flip and replace)
=> 32.370097, -118.799936 (from Google Maps) [y1, x1]

87d24'58.18"W, 14d 8'25.76"N
=> 14°8'25.76"N 87°24'58.18"W (flip and replace)
=> 14.140489, -87.416161 (from Google Maps) [y2, x2]
````
OR
````
35.7724410 -120.0669610
11.7244410 -83.9949610
````

## WGS84 => EPSG:3395 transformation
Transform the known WGS84 coordinates of the upper left and lower right corners to the "WGS 84 / World Mercator" projection (EPSG:3395):

````
cs2cs +init=epsg:4326 +to +init=epsg:3395
-118.799936 32.370097 [x1 y1]
=> -13224748.38	3789115.88 0.00 [X1 Y1 Z1]

-87.416161 14.140489 [x2 y2]
=> -9731122.53	1579906.98 0.00 [X2 Y2 Z2]

> CTRL+C to quit
````

OR
````
cs2cs +init=epsg:4326 +to +init=epsg:3395
-120.0669610 35.7724410
=> -13365792.96	4244375.88 0.00

-83.9949610 11.7244410
=> -9350276.29	1305686.74 0.00
````

## Move TIF to corresponding location on 3395 map
Assign the "WGS 84 / World Mercator" projection and the coordinates of the upper left and lower right corners in the same SRS:
````

gdal_translate -a_srs EPSG:3395 -a_ullr X1 Y1 X2 Y2 input.tif output.tif
gdal_translate -a_srs EPSG:3395 -a_ullr -13224748.38 3789115.88 -9731122.53 1579906.98 ie_2004.tif mx_3395_03.tif
> Input file size is 3172, 2029
> 0...10...20...30...40...50...60...70...80...90...100 - done.
````

OR

````
gdal_translate -a_srs EPSG:3395 -a_ullr -13365792.96 4244375.88 -9350276.29 1305686.74 mexico-2014.tiff mx_3395_03.tif
````
## Convert back to EPSG:4326
Finally, transform the image from the "WGS 84 / World Mercator" projection to EPSG:4326:

````
gdalwarp -srcnodata -dst255 -t_srs EPSG:4326 input3395.tif output4326.tif
gdalwarp -srcnodata -dstnodata -t_srs EPSG:4326 mx_3395_03.tif mx_04.tif
````

## Remove white / background from TIF

````
gdal_translate -of GTiff -a_nodata 255 input.tif output.tif
gdal_translate -of GTiff -a_nodata 255 mx_04.tif mx_final_04.tif
````
