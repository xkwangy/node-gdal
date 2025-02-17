#!/bin/bash
cd libexpat

dir_expat=./expat

#
# download expat source
#

rm -rf $dir_expat
if [[ ! -f expat.tar.gz ]]; then
	curl "http://softlayer-dal.dl.sourceforge.net/project/expat/expat/2.1.0/expat-2.1.0.tar.gz" -o expat.tar.gz
fi
tar -xzf expat.tar.gz
mv expat-2.1.0 $dir_expat

rm -rf $dir_expat/win32
rm -rf $dir_expat/tests
rm -rf $dir_expat/m4
rm -rf $dir_expat/examples
rm -rf $dir_expat/vms
rm -rf $dir_expat/doc
rm -rf $dir_expat/amiga
rm -rf $dir_expat/conftools
rm -rf $dir_expat/bcb5
rm -rf $dir_expat/xmlwf
rm -f $dir_expat/expat.dsw
rm -f $dir_expat/MANIFEST
rm -f $dir_expat/Changes
rm -f $dir_expat/configure
rm -f $dir_expat/aclocal.m4
rm -f $dir_expat/CMake*
rm -f $dir_expat/Configure*
rm -f $dir_expat/*.in
rm -f $dir_expat/*.cmake
rm -f $dir_expat/*/*.dsp
rm -f $dir_expat/*/*.def
rm -f $dir_expat/*/Makefile*