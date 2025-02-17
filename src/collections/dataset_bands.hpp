#ifndef __NODE_GDAL_RASTERBAND_COLLECTION_H__
#define __NODE_GDAL_RASTERBAND_COLLECTION_H__

// v8
#include <v8.h>

// node
#include <node.h>
#include <node_object_wrap.h>

// gdal
#include <gdal_priv.h>

using namespace v8;
using namespace node;

namespace node_gdal {

class DatasetBands: public node::ObjectWrap {
public:
	static Persistent<FunctionTemplate> constructor;

	static void Initialize(Handle<Object> target);
	static Handle<Value> New(const Arguments &args);
	static Handle<Value> New(Handle<Value> ds_obj);
	static Handle<Value> toString(const Arguments &args);

	static Handle<Value> get(const Arguments &args);
	static Handle<Value> count(const Arguments &args);
	static Handle<Value> create(const Arguments &args);

	static Handle<Value> dsGetter(Local<String> property, const AccessorInfo &info);
	
	DatasetBands();
private:
	~DatasetBands();
};

}
#endif
