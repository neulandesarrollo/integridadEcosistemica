export const getMapboxStyles = () => {
  const rasterTileUrl = "https://api.mapbox.com/styles/v1/" +
    Meteor.settings.public.MAPBOX.STYLE_ID +
    "/tiles/{x}/{y}/{z}?access_token=" +
    Meteor.settings.public.MAPBOX.TOKEN

  const styleUrl = "mapbox://" + Meteor.settings.public.MAPBOX.MAP_ID
  // console.log("rasterTileUrl: " + rasterTileUrl);

  return {
    "version": 8,
    "name": "v4",
    "sprite": "mapbox://sprites/mapbox/streets-v8",
    "glyphs": "mapbox://fonts/mapbox/{fontstack}/{range}.pbf",
    "sources": {
      "mapbox": {
        "url": "mapbox://mapbox.mapbox-streets-v7",
        "type": "vector"
      },
      "mexEco": {
        "type": "raster",
        // "tiles": [
        //   rasterTileUrl
        // ],
        "url": styleUrl,
        "tileSize": 512
      }
    },
    "layers": [
      {
        "id": "background",
        "type": "background",
        "paint": {
          "background-color": "#906b19"
        },
        "interactive": true
      },
      {
        "id": "water",
        "type": "fill",
        "source": "mapbox",
        "source-layer": "water",
        "paint": {
          "fill-color": "#a0cfdf"
        },
        "interactive": true
      },
      {
        "id": "mexEco",
        "type": "raster",
        "source": "mexEco",
        "minzoom": 0,
        "maxzoom": 22
      }
    ],
  }
}
