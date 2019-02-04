goog.provide('ga_map_directive');

goog.require('ga_browsersniffer_service');
goog.require('ga_debounce_service');
goog.require('ga_offline_service');
goog.require('ga_permalink');
goog.require('ga_styles_service');
(function() {

  var module = angular.module('ga_map_directive', [
    'ga_browsersniffer_service',
    'ga_debounce_service',
    'ga_offline_service',
    'ga_permalink',
    'ga_styles_service'
  ]);

  module.directive('gaCesiumInspector', function(gaPermalink) {
    return {
      restrict: 'A',
      scope: {
        ol3d: '=gaCesiumInspectorOl3d'
      },
      link: function(scope, element, attrs) {
        if (!gaPermalink.getParams().debug) {
          element.remove();
          return;
        }
        var inspector;
        scope.$watch('::ol3d', function(ol3d) {
          if (ol3d && !inspector) {
            var scene = ol3d.getCesiumScene();
            inspector = new Cesium.CesiumInspector(element[0], scene);

            // Hide the menu
            element.find('.cesium-cesiumInspector-button').trigger('click');
          }
        });
      }
    };
  });

  module.directive('gaCesium3dTilesInspector', function(gaPermalink) {
    return {
      restrict: 'A',
      scope: {
        ol3d: '=gaCesium3dTilesInspectorOl3d'
      },
      link: function(scope, element, attrs) {
        if (!gaPermalink.getParams().debug) {
          element.remove();
          return;
        }
        var inspector;
        scope.$watch('::ol3d', function(ol3d) {
          if (ol3d && !inspector) {
            var scene = ol3d.getCesiumScene();
            inspector = new Cesium.Cesium3DTilesInspector(element[0], scene);

            // Hide the menu
            element.find('.cesium-cesiumInspector-button').trigger('click');
          }
        });
      }
    };
  });

  module.directive('gaMap', function($window, gaPermalink,
      gaStyleFactory, gaBrowserSniffer, gaLayers, gaDebounce, gaOffline,
      gaMapUtils, $translate) {
    return {
      restrict: 'A',
      scope: {
        map: '=gaMapMap',
        ol3d: '=gaMapOl3d'
      },
      link: function(scope, element, attrs) {
        var map = scope.map;
        var view = map.getView();
        var isOpeningIn3d = false;
        var isSwissPermalink = false;

        // set view states based on URL query string
        var queryParams = gaPermalink.getParams();

        if (isFinite(queryParams.lon) && isFinite(queryParams.lat)) {
          view.setCenter(
              ol.proj.transform(
                  [parseFloat(queryParams.lon), parseFloat(queryParams.lat)],
                  'EPSG:4326', view.getProjection().getCode()));
        } else if ((queryParams.E && queryParams.N) ||
           (queryParams.X && queryParams.Y)) {
          var easting = queryParams.Y;
          var northing = queryParams.X;
          if (queryParams.E && queryParams.N) {
            easting = queryParams.E;
            northing = queryParams.N;
          }

          easting = parseFloat(easting.replace(/,/g, '.'));
          northing = parseFloat(northing.replace(/,/g, '.'));

          isSwissPermalink = isFinite(easting) && isFinite(northing);
          if (isSwissPermalink) {
            var position = [easting, northing];
            var lonlat = [easting, northing];
            // Backward compatible with 21781
            if (ol.extent.containsCoordinate(
                [420000, 30000, 900000, 350000], position)) {
              position = ol.proj.transform(position,
                  'EPSG:21781', view.getProjection().getCode());
              lonlat = ol.proj.transform(lonlat, 'EPSG:21781', 'EPSG:4326');
            // Backward compatible with 2056
            } else {
              position = new ol.geom.Point(position);
              position = gaMapUtils.transformBack(position).getCoordinates();
              lonlat = ol.proj.transform(lonlat, 'EPSG:2056', 'EPSG:4326');
            }
            // Delete old params and replace them with lon/lat
            gaPermalink.deleteSwissCoords();
            gaPermalink.updateParams({
              lon: lonlat[0],
              lat: lonlat[1]
            })
            view.setCenter(position);
          }
        }

        if (queryParams.zoom !== undefined && isFinite(queryParams.zoom)) {
          var zoom = parseFloat(queryParams.zoom);
          // Map old permalink zooms (same for both swiss projections)
          if (isSwissPermalink) {
            zoom = gaMapUtils.swissZoomToMercator(zoom);
            gaPermalink.updateParams({zoom: zoom.toFixed(2)});
          }
          view.setZoom(zoom);
        }

        if (queryParams.crosshair !== undefined) {
          var crosshair = new ol.Feature({
            label: 'link_bowl_crosshair',
            geometry: new ol.geom.Point(view.getCenter())
          });
          var style = gaStyleFactory.getStyle(queryParams.crosshair);
          if (!style) {
            style = gaStyleFactory.getStyle('marker');
          }
          map.addLayer(gaMapUtils.getFeatureOverlay([crosshair], style));
          var unregister = view.on('propertychange', function() {
            gaPermalink.deleteParam('crosshair');
            ol.Observable.unByKey(unregister);
          });
        }

        // Update permalink based on view states.
        var updatePermalink = function() {
          // only update the permalink in 2d mode
          if (!scope.ol3d || !scope.ol3d.getEnabled()) {
            // remove 3d params
            gaPermalink.deleteParam('elevation');
            gaPermalink.deleteParam('heading');
            gaPermalink.deleteParam('pitch');
            var center = view.getCenter();
            var zoom = view.getZoom();
            // when the directive is instantiated the view may not
            // be defined yet.
            if (center && zoom !== undefined) {
              center = ol.proj.transform(
                  center, view.getProjection().getCode(), 'EPSG:4326');
              gaPermalink.updateParams({
                lon: center[0].toFixed(5),
                lat: center[1].toFixed(5),
                zoom: zoom
              });
              gaPermalink.deleteSwissCoords();
            }
          }
        };
        view.on('propertychange', gaDebounce.debounce(updatePermalink, 1000,
            false));

        map.setTarget(element[0]);

        scope.$watch('::ol3d', function(ol3d) {
          if (ol3d) {
            var camera = ol3d.getCesiumScene().camera;
            var params = gaPermalink.getParams();

            // initial location based on query params
            var position, heading, pitch;
            if (isFinite(params.lon) && isFinite(params.lat) &&
                isFinite(params.elevation)) {
              isOpeningIn3d = true;
              var lon = parseFloat(params.lon);
              var lat = parseFloat(params.lat);
              var elevation = parseFloat(params.elevation);
              position = Cesium.Cartesian3.fromDegrees(lon, lat, elevation);
            }
            if (isFinite(params.heading)) {
              heading = Cesium.Math.toRadians(parseFloat(params.heading));
            }
            if (isFinite(params.pitch)) {
              pitch = Cesium.Math.toRadians(parseFloat(params.pitch));
            }
            camera.setView({
              destination: position,
              orientation: {
                heading: heading,
                pitch: pitch,
                roll: 0.0
              }
            });

            // update permalink
            camera.moveEnd.addEventListener(gaDebounce.debounce(function() {
              // remove 2d params
              gaPermalink.deleteParam('E');
              gaPermalink.deleteParam('N');
              gaPermalink.deleteParam('zoom');

              var position = camera.positionCartographic;
              gaPermalink.updateParams({
                lon: Cesium.Math.toDegrees(position.longitude).toFixed(5),
                lat: Cesium.Math.toDegrees(position.latitude).toFixed(5),
                elevation: position.height.toFixed(0),
                heading: Cesium.Math.toDegrees(camera.heading).toFixed(3),
                pitch: Cesium.Math.toDegrees(camera.pitch).toFixed(3)
              });
            }, 1000, false));

            var dereg = [];
            var setRealPosition = function(itemOrEvt) {
              var item = (itemOrEvt instanceof ol.Overlay) ? itemOrEvt :
                itemOrEvt.element;
              item.set('realPosition', item.getPosition());
              item.setPosition();
              dereg.push(item.on('change:position', function(evt) {
                var val = evt.target.getPosition();
                if (val) {
                  item.set('realPosition', val);
                  item.setPosition();
                }
              }));
            };

            // Management of 2d layer with a 3d config to display in 3d.
            var dflt3dStatus = [];
            var showDflt3dLayers = function(map) {
              // Add 2d layer which have a 3d configuration to display in 3d
              // by default.
              gaLayers.loadConfig().then(function(layers) {
                for (var bodId in layers) {
                  if (layers.hasOwnProperty(bodId) && layers[bodId].default3d &&
                      layers[bodId].config2d) {
                    var config2d = layers[bodId].config2d;
                    var overlay = gaMapUtils.getMapOverlayForBodId(map,
                        config2d);
                    // If the page is openinig directly in 3d we consider the
                    // default layers were not displayed in 2d initally.
                    if (isOpeningIn3d || !overlay) {
                      dflt3dStatus.push(config2d);
                      isOpeningIn3d = false;
                    }
                    if (!overlay) {
                      map.addLayer(gaLayers.getOlLayerById(config2d));
                    }
                  }
                }
              });
            };
            var hideDflt3dLayers = function(map) {
              dflt3dStatus.forEach(function(bodId) {
                var overlay = gaMapUtils.getMapOverlayForBodId(map, bodId);
                if (overlay) {
                  map.removeLayer(overlay);
                }
              });
              dflt3dStatus = [];
            };

            // Watch when 3d is enabled to show/hide overlays
            scope.$watch(function() {
              return ol3d.getEnabled();
            }, function(active) {
              if (active) {
                // Hide the overlays
                map.getOverlays().forEach(setRealPosition);
                dereg.push(map.getOverlays().on('add', setRealPosition));

                // Show layers we have to display in 3d
                showDflt3dLayers(map);

                // Display alert messages that layers can't be displayed in 3d
                var msg = '';
                map.getLayers().forEach(function(layer) {
                  if (!layer.displayIn3d) {
                    msg = msg + '\n' + layer.label;
                  }
                });
                if (msg) {
                  msg = $translate.instant('layer_cant_be_displayed_in_3d') +
                      msg;
                  $window.alert(msg);
                }
              } else {
                // Show the overlays
                dereg.forEach(function(key) {
                  ol.Observable.unByKey(key);
                });
                dereg = [];
                map.getOverlays().forEach(function(item) {
                  if (!item.getPosition()) {
                    item.setPosition(item.get('realPosition'));
                  }
                });

                // Hide layers we have to display in 3d, if it wasn't there in
                // 2d.
                hideDflt3dLayers(map);
              }
            });
          }
        });

        // Often when we use embed map the size of the map is fixed, so we
        // don't need to resize the map for printing (use case: print an
        // embed map in a tooltip.
        if (gaBrowserSniffer.embed) {
          // #3722: On mobile we need to update size of the map on iframe load.
          $($window).on('DOMContentLoaded', function() {
            map.updateSize();
          });
        }

        scope.$on('gaNetworkStatusChange', function(evt, offline) {
          gaOffline.refreshLayers(map.getLayers().getArray(), offline);
          if (offline) {
            gaOffline.showExtent(map);
          } else {
            gaOffline.hideExtent();
          }
        });

        var savedTimeStr = {};
        scope.$on('gaTimeChange', function(evt, time, oldTime) {
          var switchTimeActive = (!oldTime && time);
          var switchTimeDeactive = (oldTime && !time);
          var olLayer, olLayers = scope.map.getLayers().getArray();
          var singleModif = false;

          // Detection the time change has been triggered by a layer's
          // 'propertychange' event.
          // (ex: using layermanager)
          if (switchTimeDeactive) {

            for (var i = 0, ii = olLayers.length; i < ii; i++) {
              olLayer = olLayers[i];
              // We update only time enabled bod layers
              if (olLayer.timeEnabled &&
                  angular.isDefined(olLayer.time) &&
                  olLayer.time.substr(0, 4) !== oldTime) {
                singleModif = true;
                break;
              }
            }
          }

          // In case the time change event has been triggered by a layer's
          // 'propertychange' event, we do nothing more.
          // (ex: using the layer manager)
          if (singleModif) {
            savedTimeStr = {};
            return;
          }
          // In case the user has done a global modification.
          // (ex: using the time selector toggle)
          for (var j = 0, jj = olLayers.length; j < jj; j++) {
            olLayer = olLayers[j];

            if (olLayer.timeEnabled && olLayer.visible) {
              var layerTimeStr =
                  gaLayers.getLayerTimestampFromYear(olLayer, time);
              if (switchTimeActive) {
                // We save the current value after a global activation.
                // (ex: using the time selector toggle)
                savedTimeStr[olLayer.id] = olLayer.time;
              } else if (switchTimeDeactive &&
                  savedTimeStr.hasOwnProperty(olLayer.id)) {
                // We apply the saved values after a global deactivation.
                // (ex: using the time selector toggle)
                layerTimeStr = savedTimeStr[olLayer.id];
                savedTimeStr[olLayer.id] = undefined;

              }
              olLayer.time = layerTimeStr;
            }
          }
        });
      }
    };
  });
})();
