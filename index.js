const canvas = document.getElementById("map");

const map = new harp.MapView({
    canvas,
    //theme: "https://unpkg.com/@here/harp-map-theme@latest/resources/berlin_tilezen_night_reduced.json",
    theme: "theme.json",
    //For tile cache optimization:
    maxVisibleDataSourceTiles: 40,
    tileCacheSize: 100
});

map.setCameraGeolocationAndZoom(new harp.GeoCoordinates(37.774997, -122.410407), 16);

const mapControls = new harp.MapControls(map);
const ui = new harp.MapControlsUI(mapControls);
canvas.parentElement.appendChild(ui.domElement);

mapControls.maxPitchAngle = 60;
mapControls.setRotation(6.3, 50);

map.loadPostEffects("effects.json");

map.resize(window.innerWidth, window.innerHeight);
window.onresize = () => map.resize(window.innerWidth, window.innerHeight);

const omvDataSource = new harp.OmvDataSource({
    baseUrl: "https://xyz.api.here.com/tiles/herebase.02",
    apiFormat: harp.APIFormat.XYZOMV,
    styleSetName: "tilezen",
    authenticationCode: "AVoxWfIDYgZOr4zOaUV3urg"
});
map.addDataSource(omvDataSource);

/* function modifyTheme(theme) {
   const urbanAreaTexture = "clover.png";
   const parkTexture = "clover.png";

   if (theme.styles) {
      for (const styleSetName in theme.styles) {
          if (!theme.styles.hasOwnProperty(styleSetName)) {
              continue;
          }
          const styleSet = theme.styles[styleSetName];
          styleSet.forEach(style => {
              if (style.description === "urban area") {
                  style.technique = "standard";
                  style.attr = {
                      color: "#ffffff",
                      map: urbanAreaTexture,
                      mapProperties: {
                          repeatU: 10,
                          repeatV: 10,
                          wrapS: "repeat",
                          wrapT: "repeat"
                      },
                      textureCoordinateType: harp.TextureCoordinateType.TileSpace
                  };
              } else if (style.description === "park") {
                  style.technique = "standard";
                  style.attr = {
                      color: "#ffffff",
                      map: parkTexture,
                      mapProperties: {
                          repeatU: 5,
                          repeatV: 5,
                          wrapS: "repeat",
                          wrapT: "repeat"
                      },
                      textureCoordinateType: harp.TextureCoordinateType.TileSpace
                  };
              } else if (style.description === "building_geometry") {
                  // Disable extruded buildings to reduce noise.
                  style.technique = "none";
              }
          });
      }
   }
   return theme;
} */
