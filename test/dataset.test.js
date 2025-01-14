'use strict';

var fs = require('fs');
var gdal = require('../lib/gdal.js');
var path = require('path');
var assert = require('chai').assert;
var fileUtils = require('./utils/file.js');

describe('Dataset', function() {
	var ds;
	before(function() {
		ds = gdal.open(__dirname + "/data/dem_azimuth50_pa.img");
	})
	it('should be exposed', function() {
		assert.ok(gdal.Dataset);
	});
	it('should not be instantiable', function() {
		assert.throws(function() {
			new gdal.Dataset();
		}, /Cannot create dataset directly/);
	});

	describe('"bands" property', function() {
		it('should exist', function() {
			assert.instanceOf(ds.bands, gdal.DatasetBands);
		});
	});

	describe('"srs" property', function() {
		describe('getter', function() {
			it('should return SpatialReference', function() {
				var ds = gdal.open(__dirname + "/data/dem_azimuth50_pa.img");
				assert.equal(ds.srs.toWKT(), 'PROJCS["WGS_1984_Albers",GEOGCS["WGS 84",DATUM["WGS_1984",SPHEROID["WGS 84",6378137,298.257223563,AUTHORITY["EPSG","7030"]],TOWGS84[0,0,0,0,0,0,0],AUTHORITY["EPSG","6326"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.0174532925199433,AUTHORITY["EPSG","9108"]],AUTHORITY["EPSG","4326"]],PROJECTION["Albers_Conic_Equal_Area"],PARAMETER["standard_parallel_1",40],PARAMETER["standard_parallel_2",42],PARAMETER["latitude_of_center",39],PARAMETER["longitude_of_center",-78],PARAMETER["false_easting",0],PARAMETER["false_northing",0],UNIT["meters",1]]');
			});
			it('should return null when dataset doesn\'t have projection', function() {
				var ds = gdal.open(__dirname + "/data/blank.jpg");
				assert.isNull(ds.srs);
			});
		});
		describe('setter', function() {
			it('should throw when not an SpatialReference object', function() {
				var ds = gdal.open(__dirname + "/data/sample.tif");
				assert.throws(function() {
					ds.srs = '`1`inoinawfawfian!@121';
				}, /srs must be SpatialReference object/);
			});
			it('should set projection', function() {
				var ds = gdal.open(fileUtils.clone(__dirname + "/data/dem_azimuth50_pa.img"));

				var ref = 'PROJCS["NAD_1983_UTM_Zone_10N",' +
					'GEOGCS["GCS_North_American_1983",' +
					'DATUM["D_North_American_1983",SPHEROID["GRS_1980",6378137,298.257222101]],' +
					'PRIMEM["Greenwich",0],UNIT["Degree",0.0174532925199433]],' +
					'PROJECTION["Transverse_Mercator"],PARAMETER["False_Easting",500000.0],' +
					'PARAMETER["False_Northing",0.0],PARAMETER["Central_Meridian",-123.0],' +
					'PARAMETER["Scale_Factor",0.9996],PARAMETER["Latitude_of_Origin",0.0],' +
					'UNIT["Meter",1.0]]';

				ds.srs = new gdal.SpatialReference.fromWKT(ref);
				assert.equal(ds.srs.toWKT(), ref);
			});
		});
	});

	describe('"rasterSize" property', function() {
		describe('getter', function() {
			it('should return dataset dimensions', function() {
				var ds = gdal.open(__dirname + "/data/dem_azimuth50_pa.img");
				assert.deepEqual(ds.rasterSize, {
					x: 495,
					y: 286
				});
			});

		});
		describe('setter', function() {
			it('should throw', function() {
				var ds = gdal.open(__dirname + "/data/sample.tif");
				assert.throws(function() {
					ds.rasterSize = {x: 0, y: 0}
				}, /rasterSize is a read\-only property/);
			});
		});
	});

});