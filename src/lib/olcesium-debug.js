!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.ol=e():t.ol=e()}(window,function(){return function(t){var e={};function r(n){if(e[n])return e[n].exports;var i=e[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}return r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)r.d(n,i,function(e){return t[e]}.bind(null,i));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=7)}([function(t,e,r){"use strict";t.exports=i,t.exports.default=i;var n=r(4);function i(t,e){if(!(this instanceof i))return new i(t,e);this._maxEntries=Math.max(4,t||9),this._minEntries=Math.max(2,Math.ceil(.4*this._maxEntries)),e&&this._initFormat(e),this.clear()}function o(t,e,r){if(!r)return e.indexOf(t);for(var n=0;n<e.length;n++)if(r(t,e[n]))return n;return-1}function a(t,e){s(t,0,t.children.length,e,t)}function s(t,e,r,n,i){i||(i=_(null)),i.minX=1/0,i.minY=1/0,i.maxX=-1/0,i.maxY=-1/0;for(var o,a=e;a<r;a++)o=t.children[a],u(i,t.leaf?n(o):o);return i}function u(t,e){return t.minX=Math.min(t.minX,e.minX),t.minY=Math.min(t.minY,e.minY),t.maxX=Math.max(t.maxX,e.maxX),t.maxY=Math.max(t.maxY,e.maxY),t}function l(t,e){return t.minX-e.minX}function h(t,e){return t.minY-e.minY}function c(t){return(t.maxX-t.minX)*(t.maxY-t.minY)}function p(t){return t.maxX-t.minX+(t.maxY-t.minY)}function f(t,e){return t.minX<=e.minX&&t.minY<=e.minY&&e.maxX<=t.maxX&&e.maxY<=t.maxY}function d(t,e){return e.minX<=t.maxX&&e.minY<=t.maxY&&e.maxX>=t.minX&&e.maxY>=t.minY}function _(t){return{children:t,height:1,leaf:!0,minX:1/0,minY:1/0,maxX:-1/0,maxY:-1/0}}function g(t,e,r,i,o){for(var a,s=[e,r];s.length;)(r=s.pop())-(e=s.pop())<=i||(a=e+Math.ceil((r-e)/i/2)*i,n(t,a,e,r,o),s.push(e,a,a,r))}i.prototype={all:function(){return this._all(this.data,[])},search:function(t){var e=this.data,r=[],n=this.toBBox;if(!d(t,e))return r;for(var i,o,a,s,u=[];e;){for(i=0,o=e.children.length;i<o;i++)a=e.children[i],d(t,s=e.leaf?n(a):a)&&(e.leaf?r.push(a):f(t,s)?this._all(a,r):u.push(a));e=u.pop()}return r},collides:function(t){var e=this.data,r=this.toBBox;if(!d(t,e))return!1;for(var n,i,o,a,s=[];e;){for(n=0,i=e.children.length;n<i;n++)if(o=e.children[n],d(t,a=e.leaf?r(o):o)){if(e.leaf||f(t,a))return!0;s.push(o)}e=s.pop()}return!1},load:function(t){if(!t||!t.length)return this;if(t.length<this._minEntries){for(var e=0,r=t.length;e<r;e++)this.insert(t[e]);return this}var n=this._build(t.slice(),0,t.length-1,0);if(this.data.children.length)if(this.data.height===n.height)this._splitRoot(this.data,n);else{if(this.data.height<n.height){var i=this.data;this.data=n,n=i}this._insert(n,this.data.height-n.height-1,!0)}else this.data=n;return this},insert:function(t){return t&&this._insert(t,this.data.height-1),this},clear:function(){return this.data=_([]),this},remove:function(t,e){if(!t)return this;for(var r,n,i,a,s=this.data,u=this.toBBox(t),l=[],h=[];s||l.length;){if(s||(s=l.pop(),n=l[l.length-1],r=h.pop(),a=!0),s.leaf&&-1!==(i=o(t,s.children,e)))return s.children.splice(i,1),l.push(s),this._condense(l),this;a||s.leaf||!f(s,u)?n?(r++,s=n.children[r],a=!1):s=null:(l.push(s),h.push(r),r=0,n=s,s=s.children[0])}return this},toBBox:function(t){return t},compareMinX:l,compareMinY:h,toJSON:function(){return this.data},fromJSON:function(t){return this.data=t,this},_all:function(t,e){for(var r=[];t;)t.leaf?e.push.apply(e,t.children):r.push.apply(r,t.children),t=r.pop();return e},_build:function(t,e,r,n){var i,o=r-e+1,s=this._maxEntries;if(o<=s)return a(i=_(t.slice(e,r+1)),this.toBBox),i;n||(n=Math.ceil(Math.log(o)/Math.log(s)),s=Math.ceil(o/Math.pow(s,n-1))),(i=_([])).leaf=!1,i.height=n;var u,l,h,c,p=Math.ceil(o/s),f=p*Math.ceil(Math.sqrt(s));for(g(t,e,r,f,this.compareMinX),u=e;u<=r;u+=f)for(g(t,u,h=Math.min(u+f-1,r),p,this.compareMinY),l=u;l<=h;l+=p)c=Math.min(l+p-1,h),i.children.push(this._build(t,l,c,n-1));return a(i,this.toBBox),i},_chooseSubtree:function(t,e,r,n){for(var i,o,a,s,u,l,h,p,f,d;n.push(e),!e.leaf&&n.length-1!==r;){for(h=p=1/0,i=0,o=e.children.length;i<o;i++)u=c(a=e.children[i]),f=t,d=a,(l=(Math.max(d.maxX,f.maxX)-Math.min(d.minX,f.minX))*(Math.max(d.maxY,f.maxY)-Math.min(d.minY,f.minY))-u)<p?(p=l,h=u<h?u:h,s=a):l===p&&u<h&&(h=u,s=a);e=s||e.children[0]}return e},_insert:function(t,e,r){var n=this.toBBox,i=r?t:n(t),o=[],a=this._chooseSubtree(i,this.data,e,o);for(a.children.push(t),u(a,i);e>=0&&o[e].children.length>this._maxEntries;)this._split(o,e),e--;this._adjustParentBBoxes(i,o,e)},_split:function(t,e){var r=t[e],n=r.children.length,i=this._minEntries;this._chooseSplitAxis(r,i,n);var o=this._chooseSplitIndex(r,i,n),s=_(r.children.splice(o,r.children.length-o));s.height=r.height,s.leaf=r.leaf,a(r,this.toBBox),a(s,this.toBBox),e?t[e-1].children.push(s):this._splitRoot(r,s)},_splitRoot:function(t,e){this.data=_([t,e]),this.data.height=t.height+1,this.data.leaf=!1,a(this.data,this.toBBox)},_chooseSplitIndex:function(t,e,r){var n,i,o,a,u,l,h,p,f,d,_,g,y,v;for(l=h=1/0,n=e;n<=r-e;n++)i=s(t,0,n,this.toBBox),o=s(t,n,r,this.toBBox),f=i,d=o,_=void 0,g=void 0,y=void 0,v=void 0,_=Math.max(f.minX,d.minX),g=Math.max(f.minY,d.minY),y=Math.min(f.maxX,d.maxX),v=Math.min(f.maxY,d.maxY),a=Math.max(0,y-_)*Math.max(0,v-g),u=c(i)+c(o),a<l?(l=a,p=n,h=u<h?u:h):a===l&&u<h&&(h=u,p=n);return p},_chooseSplitAxis:function(t,e,r){var n=t.leaf?this.compareMinX:l,i=t.leaf?this.compareMinY:h;this._allDistMargin(t,e,r,n)<this._allDistMargin(t,e,r,i)&&t.children.sort(n)},_allDistMargin:function(t,e,r,n){t.children.sort(n);var i,o,a=this.toBBox,l=s(t,0,e,a),h=s(t,r-e,r,a),c=p(l)+p(h);for(i=e;i<r-e;i++)o=t.children[i],u(l,t.leaf?a(o):o),c+=p(l);for(i=r-e-1;i>=e;i--)o=t.children[i],u(h,t.leaf?a(o):o),c+=p(h);return c},_adjustParentBBoxes:function(t,e,r){for(var n=r;n>=0;n--)u(e[n],t)},_condense:function(t){for(var e,r=t.length-1;r>=0;r--)0===t[r].children.length?r>0?(e=t[r-1].children).splice(e.indexOf(t[r]),1):this.clear():a(t[r],this.toBBox)},_initFormat:function(t){var e=["return a"," - b",";"];this.compareMinX=new Function("a","b",e.join(t[0])),this.compareMinY=new Function("a","b",e.join(t[1])),this.toBBox=new Function("a","return {minX: a"+t[0]+", minY: a"+t[1]+", maxX: a"+t[2]+", maxY: a"+t[3]+"};")}}},function(t,e,r){"use strict";t.exports=i;var n=r(3);function i(t){this.buf=ArrayBuffer.isView&&ArrayBuffer.isView(t)?t:new Uint8Array(t||0),this.pos=0,this.type=0,this.length=this.buf.length}i.Varint=0,i.Fixed64=1,i.Bytes=2,i.Fixed32=5;function o(t){return t.type===i.Bytes?t.readVarint()+t.pos:t.pos+1}function a(t,e,r){return r?4294967296*e+(t>>>0):4294967296*(e>>>0)+(t>>>0)}function s(t,e,r){var n=e<=16383?1:e<=2097151?2:e<=268435455?3:Math.floor(Math.log(e)/(7*Math.LN2));r.realloc(n);for(var i=r.pos-1;i>=t;i--)r.buf[i+n]=r.buf[i]}function u(t,e){for(var r=0;r<t.length;r++)e.writeVarint(t[r])}function l(t,e){for(var r=0;r<t.length;r++)e.writeSVarint(t[r])}function h(t,e){for(var r=0;r<t.length;r++)e.writeFloat(t[r])}function c(t,e){for(var r=0;r<t.length;r++)e.writeDouble(t[r])}function p(t,e){for(var r=0;r<t.length;r++)e.writeBoolean(t[r])}function f(t,e){for(var r=0;r<t.length;r++)e.writeFixed32(t[r])}function d(t,e){for(var r=0;r<t.length;r++)e.writeSFixed32(t[r])}function _(t,e){for(var r=0;r<t.length;r++)e.writeFixed64(t[r])}function g(t,e){for(var r=0;r<t.length;r++)e.writeSFixed64(t[r])}function y(t,e){return(t[e]|t[e+1]<<8|t[e+2]<<16)+16777216*t[e+3]}function v(t,e,r){t[r]=e,t[r+1]=e>>>8,t[r+2]=e>>>16,t[r+3]=e>>>24}function m(t,e){return(t[e]|t[e+1]<<8|t[e+2]<<16)+(t[e+3]<<24)}i.prototype={destroy:function(){this.buf=null},readFields:function(t,e,r){for(r=r||this.length;this.pos<r;){var n=this.readVarint(),i=n>>3,o=this.pos;this.type=7&n,t(i,e,this),this.pos===o&&this.skip(n)}return e},readMessage:function(t,e){return this.readFields(t,e,this.readVarint()+this.pos)},readFixed32:function(){var t=y(this.buf,this.pos);return this.pos+=4,t},readSFixed32:function(){var t=m(this.buf,this.pos);return this.pos+=4,t},readFixed64:function(){var t=y(this.buf,this.pos)+4294967296*y(this.buf,this.pos+4);return this.pos+=8,t},readSFixed64:function(){var t=y(this.buf,this.pos)+4294967296*m(this.buf,this.pos+4);return this.pos+=8,t},readFloat:function(){var t=n.read(this.buf,this.pos,!0,23,4);return this.pos+=4,t},readDouble:function(){var t=n.read(this.buf,this.pos,!0,52,8);return this.pos+=8,t},readVarint:function(t){var e,r,n=this.buf;return e=127&(r=n[this.pos++]),r<128?e:(e|=(127&(r=n[this.pos++]))<<7,r<128?e:(e|=(127&(r=n[this.pos++]))<<14,r<128?e:(e|=(127&(r=n[this.pos++]))<<21,r<128?e:function(t,e,r){var n,i,o=r.buf;if(i=o[r.pos++],n=(112&i)>>4,i<128)return a(t,n,e);if(i=o[r.pos++],n|=(127&i)<<3,i<128)return a(t,n,e);if(i=o[r.pos++],n|=(127&i)<<10,i<128)return a(t,n,e);if(i=o[r.pos++],n|=(127&i)<<17,i<128)return a(t,n,e);if(i=o[r.pos++],n|=(127&i)<<24,i<128)return a(t,n,e);if(i=o[r.pos++],n|=(1&i)<<31,i<128)return a(t,n,e);throw new Error("Expected varint not more than 10 bytes")}(e|=(15&(r=n[this.pos]))<<28,t,this))))},readVarint64:function(){return this.readVarint(!0)},readSVarint:function(){var t=this.readVarint();return t%2==1?(t+1)/-2:t/2},readBoolean:function(){return Boolean(this.readVarint())},readString:function(){var t=this.readVarint()+this.pos,e=function(t,e,r){var n="",i=e;for(;i<r;){var o,a,s,u=t[i],l=null,h=u>239?4:u>223?3:u>191?2:1;if(i+h>r)break;1===h?u<128&&(l=u):2===h?128==(192&(o=t[i+1]))&&(l=(31&u)<<6|63&o)<=127&&(l=null):3===h?(o=t[i+1],a=t[i+2],128==(192&o)&&128==(192&a)&&((l=(15&u)<<12|(63&o)<<6|63&a)<=2047||l>=55296&&l<=57343)&&(l=null)):4===h&&(o=t[i+1],a=t[i+2],s=t[i+3],128==(192&o)&&128==(192&a)&&128==(192&s)&&((l=(15&u)<<18|(63&o)<<12|(63&a)<<6|63&s)<=65535||l>=1114112)&&(l=null)),null===l?(l=65533,h=1):l>65535&&(l-=65536,n+=String.fromCharCode(l>>>10&1023|55296),l=56320|1023&l),n+=String.fromCharCode(l),i+=h}return n}(this.buf,this.pos,t);return this.pos=t,e},readBytes:function(){var t=this.readVarint()+this.pos,e=this.buf.subarray(this.pos,t);return this.pos=t,e},readPackedVarint:function(t,e){if(this.type!==i.Bytes)return t.push(this.readVarint(e));var r=o(this);for(t=t||[];this.pos<r;)t.push(this.readVarint(e));return t},readPackedSVarint:function(t){if(this.type!==i.Bytes)return t.push(this.readSVarint());var e=o(this);for(t=t||[];this.pos<e;)t.push(this.readSVarint());return t},readPackedBoolean:function(t){if(this.type!==i.Bytes)return t.push(this.readBoolean());var e=o(this);for(t=t||[];this.pos<e;)t.push(this.readBoolean());return t},readPackedFloat:function(t){if(this.type!==i.Bytes)return t.push(this.readFloat());var e=o(this);for(t=t||[];this.pos<e;)t.push(this.readFloat());return t},readPackedDouble:function(t){if(this.type!==i.Bytes)return t.push(this.readDouble());var e=o(this);for(t=t||[];this.pos<e;)t.push(this.readDouble());return t},readPackedFixed32:function(t){if(this.type!==i.Bytes)return t.push(this.readFixed32());var e=o(this);for(t=t||[];this.pos<e;)t.push(this.readFixed32());return t},readPackedSFixed32:function(t){if(this.type!==i.Bytes)return t.push(this.readSFixed32());var e=o(this);for(t=t||[];this.pos<e;)t.push(this.readSFixed32());return t},readPackedFixed64:function(t){if(this.type!==i.Bytes)return t.push(this.readFixed64());var e=o(this);for(t=t||[];this.pos<e;)t.push(this.readFixed64());return t},readPackedSFixed64:function(t){if(this.type!==i.Bytes)return t.push(this.readSFixed64());var e=o(this);for(t=t||[];this.pos<e;)t.push(this.readSFixed64());return t},skip:function(t){var e=7&t;if(e===i.Varint)for(;this.buf[this.pos++]>127;);else if(e===i.Bytes)this.pos=this.readVarint()+this.pos;else if(e===i.Fixed32)this.pos+=4;else{if(e!==i.Fixed64)throw new Error("Unimplemented type: "+e);this.pos+=8}},writeTag:function(t,e){this.writeVarint(t<<3|e)},realloc:function(t){for(var e=this.length||16;e<this.pos+t;)e*=2;if(e!==this.length){var r=new Uint8Array(e);r.set(this.buf),this.buf=r,this.length=e}},finish:function(){return this.length=this.pos,this.pos=0,this.buf.subarray(0,this.length)},writeFixed32:function(t){this.realloc(4),v(this.buf,t,this.pos),this.pos+=4},writeSFixed32:function(t){this.realloc(4),v(this.buf,t,this.pos),this.pos+=4},writeFixed64:function(t){this.realloc(8),v(this.buf,-1&t,this.pos),v(this.buf,Math.floor(t*(1/4294967296)),this.pos+4),this.pos+=8},writeSFixed64:function(t){this.realloc(8),v(this.buf,-1&t,this.pos),v(this.buf,Math.floor(t*(1/4294967296)),this.pos+4),this.pos+=8},writeVarint:function(t){(t=+t||0)>268435455||t<0?function(t,e){var r,n;t>=0?(r=t%4294967296|0,n=t/4294967296|0):(n=~(-t/4294967296),4294967295^(r=~(-t%4294967296))?r=r+1|0:(r=0,n=n+1|0));if(t>=0x10000000000000000||t<-0x10000000000000000)throw new Error("Given varint doesn't fit into 10 bytes");e.realloc(10),function(t,e,r){r.buf[r.pos++]=127&t|128,t>>>=7,r.buf[r.pos++]=127&t|128,t>>>=7,r.buf[r.pos++]=127&t|128,t>>>=7,r.buf[r.pos++]=127&t|128,t>>>=7,r.buf[r.pos]=127&t}(r,0,e),function(t,e){var r=(7&t)<<4;if(e.buf[e.pos++]|=r|((t>>>=3)?128:0),!t)return;if(e.buf[e.pos++]=127&t|((t>>>=7)?128:0),!t)return;if(e.buf[e.pos++]=127&t|((t>>>=7)?128:0),!t)return;if(e.buf[e.pos++]=127&t|((t>>>=7)?128:0),!t)return;if(e.buf[e.pos++]=127&t|((t>>>=7)?128:0),!t)return;e.buf[e.pos++]=127&t}(n,e)}(t,this):(this.realloc(4),this.buf[this.pos++]=127&t|(t>127?128:0),t<=127||(this.buf[this.pos++]=127&(t>>>=7)|(t>127?128:0),t<=127||(this.buf[this.pos++]=127&(t>>>=7)|(t>127?128:0),t<=127||(this.buf[this.pos++]=t>>>7&127))))},writeSVarint:function(t){this.writeVarint(t<0?2*-t-1:2*t)},writeBoolean:function(t){this.writeVarint(Boolean(t))},writeString:function(t){t=String(t),this.realloc(4*t.length),this.pos++;var e=this.pos;this.pos=function(t,e,r){for(var n,i,o=0;o<e.length;o++){if((n=e.charCodeAt(o))>55295&&n<57344){if(!i){n>56319||o+1===e.length?(t[r++]=239,t[r++]=191,t[r++]=189):i=n;continue}if(n<56320){t[r++]=239,t[r++]=191,t[r++]=189,i=n;continue}n=i-55296<<10|n-56320|65536,i=null}else i&&(t[r++]=239,t[r++]=191,t[r++]=189,i=null);n<128?t[r++]=n:(n<2048?t[r++]=n>>6|192:(n<65536?t[r++]=n>>12|224:(t[r++]=n>>18|240,t[r++]=n>>12&63|128),t[r++]=n>>6&63|128),t[r++]=63&n|128)}return r}(this.buf,t,this.pos);var r=this.pos-e;r>=128&&s(e,r,this),this.pos=e-1,this.writeVarint(r),this.pos+=r},writeFloat:function(t){this.realloc(4),n.write(this.buf,t,this.pos,!0,23,4),this.pos+=4},writeDouble:function(t){this.realloc(8),n.write(this.buf,t,this.pos,!0,52,8),this.pos+=8},writeBytes:function(t){var e=t.length;this.writeVarint(e),this.realloc(e);for(var r=0;r<e;r++)this.buf[this.pos++]=t[r]},writeRawMessage:function(t,e){this.pos++;var r=this.pos;t(e,this);var n=this.pos-r;n>=128&&s(r,n,this),this.pos=r-1,this.writeVarint(n),this.pos+=n},writeMessage:function(t,e,r){this.writeTag(t,i.Bytes),this.writeRawMessage(e,r)},writePackedVarint:function(t,e){e.length&&this.writeMessage(t,u,e)},writePackedSVarint:function(t,e){e.length&&this.writeMessage(t,l,e)},writePackedBoolean:function(t,e){e.length&&this.writeMessage(t,p,e)},writePackedFloat:function(t,e){e.length&&this.writeMessage(t,h,e)},writePackedDouble:function(t,e){e.length&&this.writeMessage(t,c,e)},writePackedFixed32:function(t,e){e.length&&this.writeMessage(t,f,e)},writePackedSFixed32:function(t,e){e.length&&this.writeMessage(t,d,e)},writePackedFixed64:function(t,e){e.length&&this.writeMessage(t,_,e)},writePackedSFixed64:function(t,e){e.length&&this.writeMessage(t,g,e)},writeBytesField:function(t,e){this.writeTag(t,i.Bytes),this.writeBytes(e)},writeFixed32Field:function(t,e){this.writeTag(t,i.Fixed32),this.writeFixed32(e)},writeSFixed32Field:function(t,e){this.writeTag(t,i.Fixed32),this.writeSFixed32(e)},writeFixed64Field:function(t,e){this.writeTag(t,i.Fixed64),this.writeFixed64(e)},writeSFixed64Field:function(t,e){this.writeTag(t,i.Fixed64),this.writeSFixed64(e)},writeVarintField:function(t,e){this.writeTag(t,i.Varint),this.writeVarint(e)},writeSVarintField:function(t,e){this.writeTag(t,i.Varint),this.writeSVarint(e)},writeStringField:function(t,e){this.writeTag(t,i.Bytes),this.writeString(e)},writeFloatField:function(t,e){this.writeTag(t,i.Fixed32),this.writeFloat(e)},writeDoubleField:function(t,e){this.writeTag(t,i.Fixed64),this.writeDouble(e)},writeBooleanField:function(t,e){this.writeVarintField(t,Boolean(e))}}},function(t,e,r){var n=r(5);e.Processor=n},function(t,e){e.read=function(t,e,r,n,i){var o,a,s=8*i-n-1,u=(1<<s)-1,l=u>>1,h=-7,c=r?i-1:0,p=r?-1:1,f=t[e+c];for(c+=p,o=f&(1<<-h)-1,f>>=-h,h+=s;h>0;o=256*o+t[e+c],c+=p,h-=8);for(a=o&(1<<-h)-1,o>>=-h,h+=n;h>0;a=256*a+t[e+c],c+=p,h-=8);if(0===o)o=1-l;else{if(o===u)return a?NaN:1/0*(f?-1:1);a+=Math.pow(2,n),o-=l}return(f?-1:1)*a*Math.pow(2,o-n)},e.write=function(t,e,r,n,i,o){var a,s,u,l=8*o-i-1,h=(1<<l)-1,c=h>>1,p=23===i?Math.pow(2,-24)-Math.pow(2,-77):0,f=n?0:o-1,d=n?1:-1,_=e<0||0===e&&1/e<0?1:0;for(e=Math.abs(e),isNaN(e)||e===1/0?(s=isNaN(e)?1:0,a=h):(a=Math.floor(Math.log(e)/Math.LN2),e*(u=Math.pow(2,-a))<1&&(a--,u*=2),(e+=a+c>=1?p/u:p*Math.pow(2,1-c))*u>=2&&(a++,u/=2),a+c>=h?(s=0,a=h):a+c>=1?(s=(e*u-1)*Math.pow(2,i),a+=c):(s=e*Math.pow(2,c-1)*Math.pow(2,i),a=0));i>=8;t[r+f]=255&s,f+=d,s/=256,i-=8);for(a=a<<i|s,l+=i;l>0;t[r+f]=255&a,f+=d,a/=256,l-=8);t[r+f-d]|=128*_}},function(t,e,r){t.exports=function(){"use strict";function t(t,e,r){var n=t[e];t[e]=t[r],t[r]=n}function e(t,e){return t<e?-1:t>e?1:0}return function(r,n,i,o,a){!function e(r,n,i,o,a){for(;o>i;){if(o-i>600){var s=o-i+1,u=n-i+1,l=Math.log(s),h=.5*Math.exp(2*l/3),c=.5*Math.sqrt(l*h*(s-h)/s)*(u-s/2<0?-1:1),p=Math.max(i,Math.floor(n-u*h/s+c)),f=Math.min(o,Math.floor(n+(s-u)*h/s+c));e(r,n,p,f,a)}var d=r[n],_=i,g=o;for(t(r,i,n),a(r[o],d)>0&&t(r,i,o);_<g;){for(t(r,_,g),_++,g--;a(r[_],d)<0;)_++;for(;a(r[g],d)>0;)g--}0===a(r[i],d)?t(r,i,g):t(r,++g,o),g<=n&&(i=g+1),n<=g&&(o=g-1)}}(r,n,i||0,o||r.length-1,a||e)}}()},function(t,e,r){var n=r(6).newImageData;function i(t){var e=!0;try{new ImageData(10,10)}catch(t){e=!1}function r(t,r,n){return e?new ImageData(t,r,n):{data:t,width:r,height:n}}return function(e){var n,i,o=e.buffers,a=e.meta,s=e.imageOps,u=e.width,l=e.height,h=o.length,c=o[0].byteLength;if(s){var p=new Array(h);for(i=0;i<h;++i)p[i]=r(new Uint8ClampedArray(o[i]),u,l);n=t(p,a).data}else{n=new Uint8ClampedArray(c);var f=new Array(h),d=new Array(h);for(i=0;i<h;++i)f[i]=new Uint8ClampedArray(o[i]),d[i]=[0,0,0,0];for(var _=0;_<c;_+=4){for(var g=0;g<h;++g){var y=f[g];d[g][0]=y[_],d[g][1]=y[_+1],d[g][2]=y[_+2],d[g][3]=y[_+3]}var v=t(d,a);n[_]=v[0],n[_+1]=v[1],n[_+2]=v[2],n[_+3]=v[3]}}return n.buffer}}function o(t,e){var r=Object.keys(t.lib||{}).map(function(e){return"var "+e+" = "+t.lib[e].toString()+";"}).concat(["var __minion__ = ("+i.toString()+")(",t.operation.toString(),");",'self.addEventListener("message", function(event) {',"  var buffer = __minion__(event.data);","  self.postMessage({buffer: buffer, meta: event.data.meta}, [buffer]);","});"]),n=new Blob(r,{type:"text/javascript"}),o=URL.createObjectURL(n),a=new Worker(o);return a.addEventListener("message",e),a}function a(t){var e;this._imageOps=!!t.imageOps;var r=[];if(e=0===t.threads?0:this._imageOps?1:t.threads||1)for(var n=0;n<e;++n)r[n]=o(t,this._onWorkerMessage.bind(this,n));else r[0]=function(t,e){var r=i(t.operation);return{postMessage:function(t){setTimeout(function(){e({data:{buffer:r(t),meta:t.meta}})},0)}}}(t,this._onWorkerMessage.bind(this,0));this._workers=r,this._queue=[],this._maxQueueLength=t.queue||1/0,this._running=0,this._dataLookup={},this._job=null}a.prototype.process=function(t,e,r){this._enqueue({inputs:t,meta:e,callback:r}),this._dispatch()},a.prototype.destroy=function(){for(var t in this)this[t]=null;this._destroyed=!0},a.prototype._enqueue=function(t){for(this._queue.push(t);this._queue.length>this._maxQueueLength;)this._queue.shift().callback(null,null)},a.prototype._dispatch=function(){if(0===this._running&&this._queue.length>0){var t=this._job=this._queue.shift(),e=t.inputs[0].width,r=t.inputs[0].height,n=t.inputs.map(function(t){return t.data.buffer}),i=this._workers.length;if(this._running=i,1===i)this._workers[0].postMessage({buffers:n,meta:t.meta,imageOps:this._imageOps,width:e,height:r},n);else for(var o=t.inputs[0].data.length,a=4*Math.ceil(o/4/i),s=0;s<i;++s){for(var u=s*a,l=[],h=0,c=n.length;h<c;++h)l.push(n[s].slice(u,u+a));this._workers[s].postMessage({buffers:l,meta:t.meta,imageOps:this._imageOps,width:e,height:r},l)}}},a.prototype._onWorkerMessage=function(t,e){this._destroyed||(this._dataLookup[t]=e.data,--this._running,0===this._running&&this._resolveJob())},a.prototype._resolveJob=function(){var t,e,r=this._job,i=this._workers.length;if(1===i)t=new Uint8ClampedArray(this._dataLookup[0].buffer),e=this._dataLookup[0].meta;else{var o=r.inputs[0].data.length;t=new Uint8ClampedArray(o),e=new Array(o);for(var a=4*Math.ceil(o/4/i),s=0;s<i;++s){var u=this._dataLookup[s].buffer,l=s*a;t.set(new Uint8ClampedArray(u),l),e[s]=this._dataLookup[s].meta}}this._job=null,this._dataLookup={},r.callback(null,n(t,r.inputs[0].width,r.inputs[0].height),e),this._dispatch()},t.exports=a},function(t,e){var r=!0;try{new ImageData(10,10)}catch(t){r=!1}var n=document.createElement("canvas").getContext("2d");e.newImageData=function(t,e,i){if(r)return new ImageData(t,e,i);var o=n.createImageData(e,i);return o.data.set(t),o}},function(t,e,r){"use strict";function n(){return function(){throw new Error("Unimplemented abstract method.")}()}r.r(e);var i=0;function o(t){return t.ol_uid||(t.ol_uid=String(++i))}var a,s="5.3.0",u=(a=function(t,e){return(a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(t,e)},function(t,e){function r(){this.constructor=t}a(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}),l=function(t){function e(e){var r=this,n="Assertion failed. See https://openlayers.org/en/"+("latest"===s?s:"v"+s.split("-")[0])+"/doc/errors/#"+e+" for details.";return(r=t.call(this,n)||this).code=e,r.name="AssertionError",r.message=n,r}return u(e,t),e}(Error),h={ADD:"add",REMOVE:"remove"},c="propertychange",p="function"==typeof Object.assign?Object.assign:function(t,e){if(null==t)throw new TypeError("Cannot convert undefined or null to object");for(var r=Object(t),n=1,i=arguments.length;n<i;++n){var o=arguments[n];if(null!=o)for(var a in o)o.hasOwnProperty(a)&&(r[a]=o[a])}return r};function f(t){for(var e in t)delete t[e]}var d="function"==typeof Object.values?Object.values:function(t){var e=[];for(var r in t)e.push(t[r]);return e};function _(t){var e;for(e in t)return!1;return!e}function g(t,e,r,n){for(var i,o=0,a=t.length;o<a;++o)if((i=t[o]).listener===e&&i.bindTo===r)return n&&(i.deleteIndex=o),i}function y(t,e){var r=v(t);return r?r[e]:void 0}function v(t,e){var r=t.ol_lm;return!r&&e&&(r=t.ol_lm={}),r}function m(t,e){var r=y(t,e);if(r){for(var n=0,i=r.length;n<i;++n)t.removeEventListener(e,r[n].boundListener),f(r[n]);r.length=0;var o=v(t);o&&(delete o[e],0===Object.keys(o).length&&function(t){delete t.ol_lm}(t))}}function E(t,e,r,n,i){var o=v(t,!0),a=o[e];a||(a=o[e]=[]);var s=g(a,r,n,!1);return s?i||(s.callOnce=!1):(s={bindTo:n,callOnce:!!i,listener:r,target:t,type:e},t.addEventListener(e,function(t){var e=function(e){var r=t.listener,n=t.bindTo||t.target;return t.callOnce&&w(t),r.call(n,e)};return t.boundListener=e,e}(s)),a.push(s)),s}function T(t,e,r,n){return E(t,e,r,n,!0)}function S(t,e,r,n){var i=y(t,e);if(i){var o=g(i,r,n,!0);o&&w(o)}}function w(t){if(t&&t.target){t.target.removeEventListener(t.type,t.boundListener);var e=y(t.target,t.type);if(e){var r="deleteIndex"in t?t.deleteIndex:e.indexOf(t);-1!==r&&e.splice(r,1),0===e.length&&m(t.target,t.type)}f(t)}}function x(t){var e=v(t);if(e)for(var r in e)m(t,r)}var O=function(){function t(){this.disposed_=!1}return t.prototype.dispose=function(){this.disposed_||(this.disposed_=!0,this.disposeInternal())},t.prototype.disposeInternal=function(){},t}();function C(){return!0}function R(){return!1}function P(){}function b(t){t.stopPropagation()}var I=function(){function t(t){this.propagationStopped,this.type=t,this.target=null}return t.prototype.preventDefault=function(){this.propagationStopped=!0},t.prototype.stopPropagation=function(){this.propagationStopped=!0},t}(),L=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),M=function(t){function e(){var e=t.call(this)||this;return e.pendingRemovals_={},e.dispatching_={},e.listeners_={},e}return L(e,t),e.prototype.addEventListener=function(t,e){var r=this.listeners_[t];r||(r=this.listeners_[t]=[]),-1===r.indexOf(e)&&r.push(e)},e.prototype.dispatchEvent=function(t){var e="string"==typeof t?new I(t):t,r=e.type;e.target=this;var n,i=this.listeners_[r];if(i){r in this.dispatching_||(this.dispatching_[r]=0,this.pendingRemovals_[r]=0),++this.dispatching_[r];for(var o=0,a=i.length;o<a;++o)if(!1===i[o].call(this,e)||e.propagationStopped){n=!1;break}if(--this.dispatching_[r],0===this.dispatching_[r]){var s=this.pendingRemovals_[r];for(delete this.pendingRemovals_[r];s--;)this.removeEventListener(r,P);delete this.dispatching_[r]}return n}},e.prototype.disposeInternal=function(){x(this)},e.prototype.getListeners=function(t){return this.listeners_[t]},e.prototype.hasListener=function(t){return t?t in this.listeners_:Object.keys(this.listeners_).length>0},e.prototype.removeEventListener=function(t,e){var r=this.listeners_[t];if(r){var n=r.indexOf(e);t in this.pendingRemovals_?(r[n]=P,++this.pendingRemovals_[t]):(r.splice(n,1),0===r.length&&delete this.listeners_[t])}},e}(O),F={CHANGE:"change",CLEAR:"clear",CONTEXTMENU:"contextmenu",CLICK:"click",DBLCLICK:"dblclick",DRAGENTER:"dragenter",DRAGOVER:"dragover",DROP:"drop",ERROR:"error",KEYDOWN:"keydown",KEYPRESS:"keypress",LOAD:"load",MOUSEDOWN:"mousedown",MOUSEMOVE:"mousemove",MOUSEOUT:"mouseout",MOUSEUP:"mouseup",MOUSEWHEEL:"mousewheel",MSPOINTERDOWN:"MSPointerDown",RESIZE:"resize",TOUCHSTART:"touchstart",TOUCHMOVE:"touchmove",TOUCHEND:"touchend",WHEEL:"wheel"},A=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}();var N=function(t){function e(){var e=t.call(this)||this;return e.revision_=0,e}return A(e,t),e.prototype.changed=function(){++this.revision_,this.dispatchEvent(F.CHANGE)},e.prototype.getRevision=function(){return this.revision_},e.prototype.on=function(t,e){if(Array.isArray(t)){for(var r=t.length,n=new Array(r),i=0;i<r;++i)n[i]=E(this,t[i],e);return n}return E(this,t,e)},e.prototype.once=function(t,e){if(Array.isArray(t)){for(var r=t.length,n=new Array(r),i=0;i<r;++i)n[i]=T(this,t[i],e);return n}return T(this,t,e)},e.prototype.un=function(t,e){if(Array.isArray(t))for(var r=0,n=t.length;r<n;++r)S(this,t[r],e);else S(this,t,e)},e}(M),G=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),D=function(t){function e(e,r,n){var i=t.call(this,e)||this;return i.key=r,i.oldValue=n,i}return G(e,t),e}(I),k=function(t){function e(e){var r=t.call(this)||this;return o(r),r.values_={},void 0!==e&&r.setProperties(e),r}return G(e,t),e.prototype.get=function(t){var e;return this.values_.hasOwnProperty(t)&&(e=this.values_[t]),e},e.prototype.getKeys=function(){return Object.keys(this.values_)},e.prototype.getProperties=function(){return p({},this.values_)},e.prototype.notify=function(t,e){var r;r=U(t),this.dispatchEvent(new D(r,t,e)),r=c,this.dispatchEvent(new D(r,t,e))},e.prototype.set=function(t,e,r){if(r)this.values_[t]=e;else{var n=this.values_[t];this.values_[t]=e,n!==e&&this.notify(t,n)}},e.prototype.setProperties=function(t,e){for(var r in t)this.set(r,t[r],e)},e.prototype.unset=function(t,e){if(t in this.values_){var r=this.values_[t];delete this.values_[t],e||this.notify(t,r)}},e}(N),j={};function U(t){return j.hasOwnProperty(t)?j[t]:j[t]="change:"+t}var Y=k,X=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),B="length",z=function(t){function e(e,r,n){var i=t.call(this,e)||this;return i.element=r,i.index=n,i}return X(e,t),e}(I),V=function(t){function e(e,r){var n=t.call(this)||this,i=r||{};if(n.unique_=!!i.unique,n.array_=e||[],n.unique_)for(var o=0,a=n.array_.length;o<a;++o)n.assertUnique_(n.array_[o],o);return n.updateLength_(),n}return X(e,t),e.prototype.clear=function(){for(;this.getLength()>0;)this.pop()},e.prototype.extend=function(t){for(var e=0,r=t.length;e<r;++e)this.push(t[e]);return this},e.prototype.forEach=function(t){for(var e=this.array_,r=0,n=e.length;r<n;++r)t(e[r],r,e)},e.prototype.getArray=function(){return this.array_},e.prototype.item=function(t){return this.array_[t]},e.prototype.getLength=function(){return this.get(B)},e.prototype.insertAt=function(t,e){this.unique_&&this.assertUnique_(e),this.array_.splice(t,0,e),this.updateLength_(),this.dispatchEvent(new z(h.ADD,e,t))},e.prototype.pop=function(){return this.removeAt(this.getLength()-1)},e.prototype.push=function(t){this.unique_&&this.assertUnique_(t);var e=this.getLength();return this.insertAt(e,t),this.getLength()},e.prototype.remove=function(t){for(var e=this.array_,r=0,n=e.length;r<n;++r)if(e[r]===t)return this.removeAt(r)},e.prototype.removeAt=function(t){var e=this.array_[t];return this.array_.splice(t,1),this.updateLength_(),this.dispatchEvent(new z(h.REMOVE,e,t)),e},e.prototype.setAt=function(t,e){var r=this.getLength();if(t<r){this.unique_&&this.assertUnique_(e,t);var n=this.array_[t];this.array_[t]=e,this.dispatchEvent(new z(h.REMOVE,n,t)),this.dispatchEvent(new z(h.ADD,e,t))}else{for(var i=r;i<t;++i)this.insertAt(i,void 0);this.insertAt(t,e)}},e.prototype.updateLength_=function(){this.set(B,this.array_.length)},e.prototype.assertUnique_=function(t,e){for(var r=0,n=this.array_.length;r<n;++r)if(this.array_[r]===t&&r!==e)throw new l(58)},e}(Y);function W(t,e){if(!t)throw new l(e)}var Z=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}();var K=function(t){function e(e){var r=t.call(this)||this;if(r.id_=void 0,r.geometryName_="geometry",r.style_=null,r.styleFunction_=void 0,r.geometryChangeKey_=null,E(r,U(r.geometryName_),r.handleGeometryChanged_,r),e)if("function"==typeof e.getSimplifiedGeometry){var n=e;r.setGeometry(n)}else{var i=e;r.setProperties(i)}return r}return Z(e,t),e.prototype.clone=function(){var t=new e(this.getProperties());t.setGeometryName(this.getGeometryName());var r=this.getGeometry();r&&t.setGeometry(r.clone());var n=this.getStyle();return n&&t.setStyle(n),t},e.prototype.getGeometry=function(){return this.get(this.geometryName_)},e.prototype.getId=function(){return this.id_},e.prototype.getGeometryName=function(){return this.geometryName_},e.prototype.getStyle=function(){return this.style_},e.prototype.getStyleFunction=function(){return this.styleFunction_},e.prototype.handleGeometryChange_=function(){this.changed()},e.prototype.handleGeometryChanged_=function(){this.geometryChangeKey_&&(w(this.geometryChangeKey_),this.geometryChangeKey_=null);var t=this.getGeometry();t&&(this.geometryChangeKey_=E(t,F.CHANGE,this.handleGeometryChange_,this)),this.changed()},e.prototype.setGeometry=function(t){this.set(this.geometryName_,t)},e.prototype.setStyle=function(t){this.style_=t,this.styleFunction_=t?function(t){if("function"==typeof t)return t;var e;if(Array.isArray(t))e=t;else{W("function"==typeof t.getZIndex,41);var r=t;e=[r]}return function(){return e}}(t):void 0,this.changed()},e.prototype.setId=function(t){this.id_=t,this.changed()},e.prototype.setGeometryName=function(t){S(this,U(this.geometryName_),this.handleGeometryChanged_,this),this.geometryName_=t,E(this,U(this.geometryName_),this.handleGeometryChanged_,this),this.handleGeometryChanged_()},e}(Y);function H(t,e){return t>e?1:t<e?-1:0}function q(t,e){return t.indexOf(e)>=0}function J(t,e,r){var n=t.length;if(t[0]<=e)return 0;if(e<=t[n-1])return n-1;var i=void 0;if(r>0){for(i=1;i<n;++i)if(t[i]<e)return i-1}else if(r<0){for(i=1;i<n;++i)if(t[i]<=e)return i}else for(i=1;i<n;++i){if(t[i]==e)return i;if(t[i]<e)return t[i-1]-e<e-t[i]?i-1:i}return n-1}function Q(t,e,r){for(;e<r;){var n=t[e];t[e]=t[r],t[r]=n,++e,--r}}function $(t,e){for(var r=Array.isArray(e)?e:[e],n=r.length,i=0;i<n;i++)t[t.length]=r[i]}function tt(t,e){for(var r,n=t.length>>>0,i=0;i<n;i++)if(e(r=t[i],i,t))return r;return null}function et(t,e){var r=t.length;if(r!==e.length)return!1;for(var n=0;n<r;n++)if(t[n]!==e[n])return!1;return!0}function rt(t,e){var r;return!t.every(function(n,i){return r=i,!e(n,i,t)})?r:-1}var nt={BOTTOM_LEFT:"bottom-left",BOTTOM_RIGHT:"bottom-right",TOP_LEFT:"top-left",TOP_RIGHT:"top-right"},it={UNKNOWN:0,INTERSECTING:1,ABOVE:2,RIGHT:4,BELOW:8,LEFT:16};function ot(t){for(var e=ft(),r=0,n=t.length;r<n;++r)Et(e,t[r]);return e}function at(t,e,r){return r?(r[0]=t[0]-e,r[1]=t[1]-e,r[2]=t[2]+e,r[3]=t[3]+e,r):[t[0]-e,t[1]-e,t[2]+e,t[3]+e]}function st(t,e){return e?(e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e):t.slice()}function ut(t,e,r){var n,i;return(n=e<t[0]?t[0]-e:t[2]<e?e-t[2]:0)*n+(i=r<t[1]?t[1]-r:t[3]<r?r-t[3]:0)*i}function lt(t,e){return ct(t,e[0],e[1])}function ht(t,e){return t[0]<=e[0]&&e[2]<=t[2]&&t[1]<=e[1]&&e[3]<=t[3]}function ct(t,e,r){return t[0]<=e&&e<=t[2]&&t[1]<=r&&r<=t[3]}function pt(t,e){var r=t[0],n=t[1],i=t[2],o=t[3],a=e[0],s=e[1],u=it.UNKNOWN;return a<r?u|=it.LEFT:a>i&&(u|=it.RIGHT),s<n?u|=it.BELOW:s>o&&(u|=it.ABOVE),u===it.UNKNOWN&&(u=it.INTERSECTING),u}function ft(){return[1/0,1/0,-1/0,-1/0]}function dt(t,e,r,n,i){return i?(i[0]=t,i[1]=e,i[2]=r,i[3]=n,i):[t,e,r,n]}function _t(t){return dt(1/0,1/0,-1/0,-1/0,t)}function gt(t,e){var r=t[0],n=t[1];return dt(r,n,r,n,e)}function yt(t,e,r,n,i){return St(_t(i),t,e,r,n)}function vt(t,e){return t[0]==e[0]&&t[2]==e[2]&&t[1]==e[1]&&t[3]==e[3]}function mt(t,e){return e[0]<t[0]&&(t[0]=e[0]),e[2]>t[2]&&(t[2]=e[2]),e[1]<t[1]&&(t[1]=e[1]),e[3]>t[3]&&(t[3]=e[3]),t}function Et(t,e){e[0]<t[0]&&(t[0]=e[0]),e[0]>t[2]&&(t[2]=e[0]),e[1]<t[1]&&(t[1]=e[1]),e[1]>t[3]&&(t[3]=e[1])}function Tt(t,e){for(var r=0,n=e.length;r<n;++r)Et(t,e[r]);return t}function St(t,e,r,n,i){for(;r<n;r+=i)wt(t,e[r],e[r+1]);return t}function wt(t,e,r){t[0]=Math.min(t[0],e),t[1]=Math.min(t[1],r),t[2]=Math.max(t[2],e),t[3]=Math.max(t[3],r)}function xt(t,e,r){var n;return(n=e.call(r,Ct(t)))?n:(n=e.call(r,Rt(t)))?n:(n=e.call(r,At(t)))?n:(n=e.call(r,Ft(t)))||!1}function Ot(t){var e=0;return Dt(t)||(e=Nt(t)*Lt(t)),e}function Ct(t){return[t[0],t[1]]}function Rt(t){return[t[2],t[1]]}function Pt(t){return[(t[0]+t[2])/2,(t[1]+t[3])/2]}function bt(t,e){var r;return e===nt.BOTTOM_LEFT?r=Ct(t):e===nt.BOTTOM_RIGHT?r=Rt(t):e===nt.TOP_LEFT?r=Ft(t):e===nt.TOP_RIGHT?r=At(t):W(!1,13),r}function It(t,e,r,n,i){var o=e*n[0]/2,a=e*n[1]/2,s=Math.cos(r),u=Math.sin(r),l=o*s,h=o*u,c=a*s,p=a*u,f=t[0],d=t[1],_=f-l+p,g=f-l-p,y=f+l-p,v=f+l+p,m=d-h-c,E=d-h+c,T=d+h+c,S=d+h-c;return dt(Math.min(_,g,y,v),Math.min(m,E,T,S),Math.max(_,g,y,v),Math.max(m,E,T,S),i)}function Lt(t){return t[3]-t[1]}function Mt(t,e,r){var n=r||[1/0,1/0,-1/0,-1/0];return Gt(t,e)?(t[0]>e[0]?n[0]=t[0]:n[0]=e[0],t[1]>e[1]?n[1]=t[1]:n[1]=e[1],t[2]<e[2]?n[2]=t[2]:n[2]=e[2],t[3]<e[3]?n[3]=t[3]:n[3]=e[3]):_t(n),n}function Ft(t){return[t[0],t[3]]}function At(t){return[t[2],t[3]]}function Nt(t){return t[2]-t[0]}function Gt(t,e){return t[0]<=e[2]&&t[2]>=e[0]&&t[1]<=e[3]&&t[3]>=e[1]}function Dt(t){return t[2]<t[0]||t[3]<t[1]}function kt(t,e){var r=(t[2]-t[0])/2*(e-1),n=(t[3]-t[1])/2*(e-1);t[0]-=r,t[2]+=r,t[1]-=n,t[3]+=n}function jt(t,e,r){var n=[t[0],t[1],t[0],t[3],t[2],t[1],t[2],t[3]];return e(n,n,2),function(t,e,r){return dt(Math.min.apply(null,t),Math.min.apply(null,e),Math.max.apply(null,t),Math.max.apply(null,e),r)}([n[0],n[2],n[4],n[6]],[n[1],n[3],n[5],n[7]],r)}var Ut={XY:"XY",XYZ:"XYZ",XYM:"XYM",XYZM:"XYZM"},Yt={POINT:"Point",LINE_STRING:"LineString",LINEAR_RING:"LinearRing",POLYGON:"Polygon",MULTI_POINT:"MultiPoint",MULTI_LINE_STRING:"MultiLineString",MULTI_POLYGON:"MultiPolygon",GEOMETRY_COLLECTION:"GeometryCollection",CIRCLE:"Circle"};function Xt(t,e,r,n,i,o){for(var a=o||[],s=0,u=e;u<r;u+=n){var l=t[u],h=t[u+1];a[s++]=i[0]*l+i[2]*h+i[4],a[s++]=i[1]*l+i[3]*h+i[5]}return o&&a.length!=s&&(a.length=s),a}function Bt(t,e,r){return Math.min(Math.max(t,e),r)}var zt="cosh"in Math?Math.cosh:function(t){var e=Math.exp(t);return(e+1/e)/2};function Vt(t,e,r,n,i,o){var a=i-r,s=o-n;if(0!==a||0!==s){var u=((t-r)*a+(e-n)*s)/(a*a+s*s);u>1?(r=i,n=o):u>0&&(r+=a*u,n+=s*u)}return Wt(t,e,r,n)}function Wt(t,e,r,n){var i=r-t,o=n-e;return i*i+o*o}function Zt(t){return 180*t/Math.PI}function Kt(t){return t*Math.PI/180}function Ht(t,e){var r=t%e;return r*e<0?r+e:r}function qt(t,e,r){return t+r*(e-t)}
/**
 * @license
 * Latitude/longitude spherical geodesy formulae taken from
 * http://www.movable-type.co.uk/scripts/latlong.html
 * Licensed under CC-BY-3.0.
 */var Jt=6371008.8;function Qt(t,e,r){var n=r||Jt,i=Kt(t[1]),o=Kt(e[1]),a=(o-i)/2,s=Kt(e[0]-t[0])/2,u=Math.sin(a)*Math.sin(a)+Math.sin(s)*Math.sin(s)*Math.cos(i)*Math.cos(o);return 2*n*Math.atan2(Math.sqrt(u),Math.sqrt(1-u))}function $t(t,e){for(var r=0,n=0,i=t.length;n<i-1;++n)r+=Qt(t[n],t[n+1],e);return r}function te(t,e){for(var r=0,n=t.length,i=t[n-1][0],o=t[n-1][1],a=0;a<n;a++){var s=t[a][0],u=t[a][1];r+=Kt(s-i)*(2+Math.sin(Kt(o))+Math.sin(Kt(u))),i=s,o=u}return r*e*e/2}function ee(t,e,r,n){var i=n||Jt,o=Kt(t[1]),a=Kt(t[0]),s=e/i,u=Math.asin(Math.sin(o)*Math.cos(s)+Math.cos(o)*Math.sin(s)*Math.cos(r));return[Zt(a+Math.atan2(Math.sin(r)*Math.sin(s)*Math.cos(o),Math.cos(s)-Math.sin(o)*Math.sin(u))),Zt(u)]}var re={DEGREES:"degrees",FEET:"ft",METERS:"m",PIXELS:"pixels",TILE_PIXELS:"tile-pixels",USFEET:"us-ft"},ne={};ne[re.DEGREES]=2*Math.PI*6370997/360,ne[re.FEET]=.3048,ne[re.METERS]=1,ne[re.USFEET]=1200/3937;var ie=re,oe=function(){function t(t){this.code_=t.code,this.units_=t.units,this.extent_=void 0!==t.extent?t.extent:null,this.worldExtent_=void 0!==t.worldExtent?t.worldExtent:null,this.axisOrientation_=void 0!==t.axisOrientation?t.axisOrientation:"enu",this.global_=void 0!==t.global&&t.global,this.canWrapX_=!(!this.global_||!this.extent_),this.getPointResolutionFunc_=t.getPointResolution,this.defaultTileGrid_=null,this.metersPerUnit_=t.metersPerUnit}return t.prototype.canWrapX=function(){return this.canWrapX_},t.prototype.getCode=function(){return this.code_},t.prototype.getExtent=function(){return this.extent_},t.prototype.getUnits=function(){return this.units_},t.prototype.getMetersPerUnit=function(){return this.metersPerUnit_||ne[this.units_]},t.prototype.getWorldExtent=function(){return this.worldExtent_},t.prototype.getAxisOrientation=function(){return this.axisOrientation_},t.prototype.isGlobal=function(){return this.global_},t.prototype.setGlobal=function(t){this.global_=t,this.canWrapX_=!(!t||!this.extent_)},t.prototype.getDefaultTileGrid=function(){return this.defaultTileGrid_},t.prototype.setDefaultTileGrid=function(t){this.defaultTileGrid_=t},t.prototype.setExtent=function(t){this.extent_=t,this.canWrapX_=!(!this.global_||!t)},t.prototype.setWorldExtent=function(t){this.worldExtent_=t},t.prototype.setGetPointResolution=function(t){this.getPointResolutionFunc_=t},t.prototype.getPointResolutionFunc=function(){return this.getPointResolutionFunc_},t}(),ae=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),se=6378137,ue=Math.PI*se,le=[-ue,-ue,ue,ue],he=[-180,-85,180,85],ce=function(t){function e(e){return t.call(this,{code:e,units:ie.METERS,extent:le,global:!0,worldExtent:he,getPointResolution:function(t,e){return t/zt(e[1]/se)}})||this}return ae(e,t),e}(oe),pe=[new ce("EPSG:3857"),new ce("EPSG:102100"),new ce("EPSG:102113"),new ce("EPSG:900913"),new ce("urn:ogc:def:crs:EPSG:6.18:3:3857"),new ce("urn:ogc:def:crs:EPSG::3857"),new ce("http://www.opengis.net/gml/srs/epsg.xml#3857")];function fe(t,e,r){var n=t.length,i=r>1?r:2,o=e;void 0===o&&(o=i>2?t.slice():new Array(n));for(var a=ue,s=0;s<n;s+=i){o[s]=a*t[s]/180;var u=se*Math.log(Math.tan(Math.PI*(+t[s+1]+90)/360));u>a?u=a:u<-a&&(u=-a),o[s+1]=u}return o}function de(t,e,r){var n=t.length,i=r>1?r:2,o=e;void 0===o&&(o=i>2?t.slice():new Array(n));for(var a=0;a<n;a+=i)o[a]=180*t[a]/ue,o[a+1]=360*Math.atan(Math.exp(t[a+1]/se))/Math.PI-90;return o}var _e=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),ge=[-180,-90,180,90],ye=6378137*Math.PI/180,ve=function(t){function e(e,r){return t.call(this,{code:e,units:ie.DEGREES,extent:ge,axisOrientation:r,global:!0,metersPerUnit:ye,worldExtent:ge})||this}return _e(e,t),e}(oe),me=[new ve("CRS:84"),new ve("EPSG:4326","neu"),new ve("urn:ogc:def:crs:EPSG::4326","neu"),new ve("urn:ogc:def:crs:EPSG:6.6:4326","neu"),new ve("urn:ogc:def:crs:OGC:1.3:CRS84"),new ve("urn:ogc:def:crs:OGC:2:84"),new ve("http://www.opengis.net/gml/srs/epsg.xml#4326","neu"),new ve("urn:x-ogc:def:crs:EPSG:4326","neu")],Ee={};var Te,Se,we,xe={};function Oe(t,e,r){var n=t.getCode(),i=e.getCode();n in xe||(xe[n]={}),xe[n][i]=r}function Ce(t,e){var r;return t in xe&&e in xe[t]&&(r=xe[t][e]),r}function Re(t,e,r){var n;if(void 0!==e){for(var i=0,o=t.length;i<o;++i)e[i]=t[i];n=e}else n=t.slice();return n}function Pe(t,e,r){if(void 0!==e&&t!==e){for(var n=0,i=t.length;n<i;++n)e[n]=t[n];t=e}return t}function be(t){!function(t,e){Ee[t]=e}(t.getCode(),t),Oe(t,t,Re)}function Ie(t){return"string"==typeof t?Ee[t]||null:t||null}function Le(t,e,r,n){var i,o=(t=Ie(t)).getPointResolutionFunc();if(o)i=o(e,r),n&&n!==t.getUnits()&&(a=t.getMetersPerUnit())&&(i=i*a/ne[n]);else if(t.getUnits()==ie.DEGREES&&!n||n==ie.DEGREES)i=e;else{var a,s=De(t,Ie("EPSG:4326")),u=[r[0]-e/2,r[1],r[0]+e/2,r[1],r[0],r[1]-e/2,r[0],r[1]+e/2];i=(Qt((u=s(u,u,2)).slice(0,2),u.slice(2,4))+Qt(u.slice(4,6),u.slice(6,8)))/2,void 0!==(a=n?ne[n]:t.getMetersPerUnit())&&(i/=a)}return i}function Me(t){!function(t){t.forEach(be)}(t),t.forEach(function(e){t.forEach(function(t){e!==t&&Oe(e,t,Re)})})}function Fe(t,e){return t?"string"==typeof t?Ie(t):t:Ie(e)}function Ae(t){return function(e,r,n){for(var i=e.length,o=void 0!==n?n:2,a=void 0!==r?r:new Array(i),s=0;s<i;s+=o){var u=t([e[s],e[s+1]]);a[s]=u[0],a[s+1]=u[1];for(var l=o-1;l>=2;--l)a[s+l]=e[s+l]}return a}}function Ne(t,e,r,n){var i=Ie(t),o=Ie(e);Oe(i,o,Ae(r)),Oe(o,i,Ae(n))}function Ge(t,e){if(t===e)return!0;var r=t.getUnits()===e.getUnits();return t.getCode()===e.getCode()?r:De(t,e)===Re&&r}function De(t,e){var r=Ce(t.getCode(),e.getCode());return r||(r=Pe),r}function ke(t,e){return De(Ie(t),Ie(e))}function je(t,e,r){return ke(e,r)(t,void 0,t.length)}function Ue(t,e,r){return jt(t,ke(e,r))}Me(pe),Me(me),Te=pe,Se=fe,we=de,me.forEach(function(t){Te.forEach(function(e){Oe(t,e,Se),Oe(e,t,we)})});var Ye=new Array(6);function Xe(t){return ze(t,1,0,0,1,0,0)}function Be(t,e){var r=t[0],n=t[1],i=t[2],o=t[3],a=t[4],s=t[5],u=e[0],l=e[1],h=e[2],c=e[3],p=e[4],f=e[5];return t[0]=r*u+i*l,t[1]=n*u+o*l,t[2]=r*h+i*c,t[3]=n*h+o*c,t[4]=r*p+i*f+a,t[5]=n*p+o*f+s,t}function ze(t,e,r,n,i,o,a){return t[0]=e,t[1]=r,t[2]=n,t[3]=i,t[4]=o,t[5]=a,t}function Ve(t,e){var r=e[0],n=e[1];return e[0]=t[0]*r+t[2]*n+t[4],e[1]=t[1]*r+t[3]*n+t[5],e}function We(t,e){var r=Math.cos(e),n=Math.sin(e);return Be(t,ze(Ye,r,n,-n,r,0,0))}function Ze(t,e,r){return Be(t,ze(Ye,e,0,0,r,0,0))}function Ke(t,e,r){return ze(t,e,0,0,r,0,0)}function He(t,e,r){return Be(t,ze(Ye,1,0,0,1,e,r))}function qe(t,e,r,n,i,o,a,s){var u=Math.sin(o),l=Math.cos(o);return t[0]=n*l,t[1]=i*u,t[2]=-n*u,t[3]=i*l,t[4]=a*n*l-s*n*u+e,t[5]=a*i*u+s*i*l+r,t}function Je(t,e){var r,n=(r=e)[0]*r[3]-r[1]*r[2];W(0!==n,32);var i=e[0],o=e[1],a=e[2],s=e[3],u=e[4],l=e[5];return t[0]=s/n,t[1]=-o/n,t[2]=-a/n,t[3]=i/n,t[4]=(a*l-s*u)/n,t[5]=-(i*l-o*u)/n,t}function Qe(t){return"matrix("+t.join(", ")+")"}var $e=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),tr=[1,0,0,1,0,0],er=function(t){function e(){var e=t.call(this)||this;return e.extent_=[1/0,1/0,-1/0,-1/0],e.extentRevision_=-1,e.simplifiedGeometryCache={},e.simplifiedGeometryMaxMinSquaredTolerance=0,e.simplifiedGeometryRevision=0,e}return $e(e,t),e.prototype.clone=function(){return n()},e.prototype.closestPointXY=function(t,e,r,i){return n()},e.prototype.containsXY=function(t,e){var r=this.getClosestPoint([t,e]);return r[0]===t&&r[1]===e},e.prototype.getClosestPoint=function(t,e){var r=e||[NaN,NaN];return this.closestPointXY(t[0],t[1],r,1/0),r},e.prototype.intersectsCoordinate=function(t){return this.containsXY(t[0],t[1])},e.prototype.computeExtent=function(t){return n()},e.prototype.getExtent=function(t){return this.extentRevision_!=this.getRevision()&&(this.extent_=this.computeExtent(this.extent_),this.extentRevision_=this.getRevision()),function(t,e){return e?(e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e):t}(this.extent_,t)},e.prototype.rotate=function(t,e){n()},e.prototype.scale=function(t,e,r){n()},e.prototype.simplify=function(t){return this.getSimplifiedGeometry(t*t)},e.prototype.getSimplifiedGeometry=function(t){return n()},e.prototype.getType=function(){return n()},e.prototype.applyTransform=function(t){n()},e.prototype.intersectsExtent=function(t){return n()},e.prototype.translate=function(t,e){n()},e.prototype.transform=function(t,e){var r=Ie(t),n=r.getUnits()==ie.TILE_PIXELS?function(t,n,i){var o=r.getExtent(),a=r.getWorldExtent(),s=Lt(a)/Lt(o);return qe(tr,a[0],a[3],s,-s,0,0,0),Xt(t,0,t.length,i,tr,n),ke(r,e)(t,n,i)}:ke(r,e);return this.applyTransform(n),this},e}(Y),rr=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}();function nr(t){var e;return t==Ut.XY?e=2:t==Ut.XYZ||t==Ut.XYM?e=3:t==Ut.XYZM&&(e=4),e}var ir=function(t){function e(){var e=t.call(this)||this;return e.layout=Ut.XY,e.stride=2,e.flatCoordinates=null,e}return rr(e,t),e.prototype.computeExtent=function(t){return yt(this.flatCoordinates,0,this.flatCoordinates.length,this.stride,t)},e.prototype.getCoordinates=function(){return n()},e.prototype.getFirstCoordinate=function(){return this.flatCoordinates.slice(0,this.stride)},e.prototype.getFlatCoordinates=function(){return this.flatCoordinates},e.prototype.getLastCoordinate=function(){return this.flatCoordinates.slice(this.flatCoordinates.length-this.stride)},e.prototype.getLayout=function(){return this.layout},e.prototype.getSimplifiedGeometry=function(t){if(this.simplifiedGeometryRevision!=this.getRevision()&&(f(this.simplifiedGeometryCache),this.simplifiedGeometryMaxMinSquaredTolerance=0,this.simplifiedGeometryRevision=this.getRevision()),t<0||0!==this.simplifiedGeometryMaxMinSquaredTolerance&&t<=this.simplifiedGeometryMaxMinSquaredTolerance)return this;var e=t.toString();if(this.simplifiedGeometryCache.hasOwnProperty(e))return this.simplifiedGeometryCache[e];var r=this.getSimplifiedGeometryInternal(t);return r.getFlatCoordinates().length<this.flatCoordinates.length?(this.simplifiedGeometryCache[e]=r,r):(this.simplifiedGeometryMaxMinSquaredTolerance=t,this)},e.prototype.getSimplifiedGeometryInternal=function(t){return this},e.prototype.getStride=function(){return this.stride},e.prototype.setFlatCoordinates=function(t,e){this.stride=nr(t),this.layout=t,this.flatCoordinates=e},e.prototype.setCoordinates=function(t,e){n()},e.prototype.setLayout=function(t,e,r){var n;if(t)n=nr(t);else{for(var i=0;i<r;++i){if(0===e.length)return this.layout=Ut.XY,void(this.stride=2);e=e[0]}t=function(t){var e;2==t?e=Ut.XY:3==t?e=Ut.XYZ:4==t&&(e=Ut.XYZM);return e}(n=e.length)}this.layout=t,this.stride=n},e.prototype.applyTransform=function(t){this.flatCoordinates&&(t(this.flatCoordinates,this.flatCoordinates,this.stride),this.changed())},e.prototype.rotate=function(t,e){var r=this.getFlatCoordinates();if(r){var n=this.getStride();!function(t,e,r,n,i,o,a){for(var s=a||[],u=Math.cos(i),l=Math.sin(i),h=o[0],c=o[1],p=0,f=e;f<r;f+=n){var d=t[f]-h,_=t[f+1]-c;s[p++]=h+d*u-_*l,s[p++]=c+d*l+_*u;for(var g=f+2;g<f+n;++g)s[p++]=t[g]}a&&s.length!=p&&(s.length=p)}(r,0,r.length,n,t,e,r),this.changed()}},e.prototype.scale=function(t,e,r){var n=e;void 0===n&&(n=t);var i=r;i||(i=Pt(this.getExtent()));var o=this.getFlatCoordinates();if(o){var a=this.getStride();!function(t,e,r,n,i,o,a,s){for(var u=s||[],l=a[0],h=a[1],c=0,p=e;p<r;p+=n){var f=t[p]-l,d=t[p+1]-h;u[c++]=l+i*f,u[c++]=h+o*d;for(var _=p+2;_<p+n;++_)u[c++]=t[_]}s&&u.length!=c&&(u.length=c)}(o,0,o.length,a,t,n,i,o),this.changed()}},e.prototype.translate=function(t,e){var r=this.getFlatCoordinates();if(r){var n=this.getStride();!function(t,e,r,n,i,o,a){for(var s=a||[],u=0,l=e;l<r;l+=n){s[u++]=t[l]+i,s[u++]=t[l+1]+o;for(var h=l+2;h<l+n;++h)s[u++]=t[h]}a&&s.length!=u&&(s.length=u)}(r,0,r.length,n,t,e,r),this.changed()}},e}(er);function or(t,e,r,n){for(var i=0,o=t[r-n],a=t[r-n+1];e<r;e+=n){var s=t[e],u=t[e+1];i+=a*s-o*u,o=s,a=u}return i/2}function ar(t,e,r,n){for(var i=0,o=0,a=r.length;o<a;++o){var s=r[o];i+=or(t,e,s,n),e=s}return i}function sr(t,e,r,n,i,o,a){var s,u=t[e],l=t[e+1],h=t[r]-u,c=t[r+1]-l;if(0===h&&0===c)s=e;else{var p=((i-u)*h+(o-l)*c)/(h*h+c*c);if(p>1)s=r;else{if(p>0){for(var f=0;f<n;++f)a[f]=qt(t[e+f],t[r+f],p);return void(a.length=n)}s=e}}for(f=0;f<n;++f)a[f]=t[s+f];a.length=n}function ur(t,e,r,n,i){var o=t[e],a=t[e+1];for(e+=n;e<r;e+=n){var s=t[e],u=t[e+1],l=Wt(o,a,s,u);l>i&&(i=l),o=s,a=u}return i}function lr(t,e,r,n,i){for(var o=0,a=r.length;o<a;++o){var s=r[o];i=ur(t,e,s,n,i),e=s}return i}function hr(t,e,r,n,i,o,a,s,u,l,h){if(e==r)return l;var c,p;if(0===i){if((p=Wt(a,s,t[e],t[e+1]))<l){for(c=0;c<n;++c)u[c]=t[e+c];return u.length=n,p}return l}for(var f=h||[NaN,NaN],d=e+n;d<r;)if(sr(t,d-n,d,n,a,s,f),(p=Wt(a,s,f[0],f[1]))<l){for(l=p,c=0;c<n;++c)u[c]=f[c];u.length=n,d+=n}else d+=n*Math.max((Math.sqrt(p)-Math.sqrt(l))/i|0,1);if(o&&(sr(t,r-n,e,n,a,s,f),(p=Wt(a,s,f[0],f[1]))<l)){for(l=p,c=0;c<n;++c)u[c]=f[c];u.length=n}return l}function cr(t,e,r,n,i,o,a,s,u,l,h){for(var c=h||[NaN,NaN],p=0,f=r.length;p<f;++p){var d=r[p];l=hr(t,e,d,n,i,o,a,s,u,l,c),e=d}return l}function pr(t,e,r,n){for(var i=0,o=r.length;i<o;++i)t[e++]=r[i];return e}function fr(t,e,r,n){for(var i=0,o=r.length;i<o;++i)for(var a=r[i],s=0;s<n;++s)t[e++]=a[s];return e}function dr(t,e,r,n,i){for(var o=i||[],a=0,s=0,u=r.length;s<u;++s){var l=fr(t,e,r[s],n);o[a++]=l,e=l}return o.length=a,o}function _r(t,e,r,n,i){for(var o=void 0!==i?i:[],a=0,s=e;s<r;s+=n)o[a++]=t.slice(s,s+n);return o.length=a,o}function gr(t,e,r,n,i){for(var o=void 0!==i?i:[],a=0,s=0,u=r.length;s<u;++s){var l=r[s];o[a++]=_r(t,e,l,n,o[a]),e=l}return o.length=a,o}function yr(t,e,r,n,i){for(var o=void 0!==i?i:[],a=0,s=0,u=r.length;s<u;++s){var l=r[s];o[a++]=gr(t,e,l,n,o[a]),e=l[l.length-1]}return o.length=a,o}function vr(t,e,r,n,i,o,a){var s=(r-e)/n;if(s<3){for(;e<r;e+=n)o[a++]=t[e],o[a++]=t[e+1];return a}var u=new Array(s);u[0]=1,u[s-1]=1;for(var l=[e,r-n],h=0;l.length>0;){for(var c=l.pop(),p=l.pop(),f=0,d=t[p],_=t[p+1],g=t[c],y=t[c+1],v=p+n;v<c;v+=n){var m=Vt(t[v],t[v+1],d,_,g,y);m>f&&(h=v,f=m)}f>i&&(u[(h-e)/n]=1,p+n<h&&l.push(p,h),h+n<c&&l.push(h,c))}for(v=0;v<s;++v)u[v]&&(o[a++]=t[e+v*n],o[a++]=t[e+v*n+1]);return a}function mr(t,e,r,n,i,o,a,s){for(var u=0,l=r.length;u<l;++u){var h=r[u];a=vr(t,e,h,n,i,o,a),s.push(a),e=h}return a}function Er(t,e){return e*Math.round(t/e)}function Tr(t,e,r,n,i,o,a){if(e==r)return a;var s,u,l=Er(t[e],i),h=Er(t[e+1],i);e+=n,o[a++]=l,o[a++]=h;do{if(s=Er(t[e],i),u=Er(t[e+1],i),(e+=n)==r)return o[a++]=s,o[a++]=u,a}while(s==l&&u==h);for(;e<r;){var c=Er(t[e],i),p=Er(t[e+1],i);if(e+=n,c!=s||p!=u){var f=s-l,d=u-h,_=c-l,g=p-h;f*g==d*_&&(f<0&&_<f||f==_||f>0&&_>f)&&(d<0&&g<d||d==g||d>0&&g>d)?(s=c,u=p):(o[a++]=s,o[a++]=u,l=s,h=u,s=c,u=p)}}return o[a++]=s,o[a++]=u,a}function Sr(t,e,r,n,i,o,a,s){for(var u=0,l=r.length;u<l;++u){var h=r[u];a=Tr(t,e,h,n,i,o,a),s.push(a),e=h}return a}var wr=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),xr=function(t){function e(e,r){var n=t.call(this)||this;return n.maxDelta_=-1,n.maxDeltaRevision_=-1,void 0===r||Array.isArray(e[0])?n.setCoordinates(e,r):n.setFlatCoordinates(r,e),n}return wr(e,t),e.prototype.clone=function(){return new e(this.flatCoordinates.slice(),this.layout)},e.prototype.closestPointXY=function(t,e,r,n){return n<ut(this.getExtent(),t,e)?n:(this.maxDeltaRevision_!=this.getRevision()&&(this.maxDelta_=Math.sqrt(ur(this.flatCoordinates,0,this.flatCoordinates.length,this.stride,0)),this.maxDeltaRevision_=this.getRevision()),hr(this.flatCoordinates,0,this.flatCoordinates.length,this.stride,this.maxDelta_,!0,t,e,r,n))},e.prototype.getArea=function(){return or(this.flatCoordinates,0,this.flatCoordinates.length,this.stride)},e.prototype.getCoordinates=function(){return _r(this.flatCoordinates,0,this.flatCoordinates.length,this.stride)},e.prototype.getSimplifiedGeometryInternal=function(t){var r=[];return r.length=vr(this.flatCoordinates,0,this.flatCoordinates.length,this.stride,t,r,0),new e(r,Ut.XY)},e.prototype.getType=function(){return Yt.LINEAR_RING},e.prototype.intersectsExtent=function(t){return!1},e.prototype.setCoordinates=function(t,e){this.setLayout(e,t,1),this.flatCoordinates||(this.flatCoordinates=[]),this.flatCoordinates.length=fr(this.flatCoordinates,0,t,this.stride),this.changed()},e}(ir),Or=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),Cr=function(t){function e(e,r){var n=t.call(this)||this;return n.setCoordinates(e,r),n}return Or(e,t),e.prototype.clone=function(){return new e(this.flatCoordinates.slice(),this.layout)},e.prototype.closestPointXY=function(t,e,r,n){var i=this.flatCoordinates,o=Wt(t,e,i[0],i[1]);if(o<n){for(var a=this.stride,s=0;s<a;++s)r[s]=i[s];return r.length=a,o}return n},e.prototype.getCoordinates=function(){return this.flatCoordinates?this.flatCoordinates.slice():[]},e.prototype.computeExtent=function(t){return gt(this.flatCoordinates,t)},e.prototype.getType=function(){return Yt.POINT},e.prototype.intersectsExtent=function(t){return ct(t,this.flatCoordinates[0],this.flatCoordinates[1])},e.prototype.setCoordinates=function(t,e){this.setLayout(e,t,0),this.flatCoordinates||(this.flatCoordinates=[]),this.flatCoordinates.length=pr(this.flatCoordinates,0,t,this.stride),this.changed()},e}(ir);function Rr(t,e,r,n,i){return!xt(i,function(i){return!Pr(t,e,r,n,i[0],i[1])})}function Pr(t,e,r,n,i,o){for(var a=0,s=t[r-n],u=t[r-n+1];e<r;e+=n){var l=t[e],h=t[e+1];u<=o?h>o&&(l-s)*(o-u)-(i-s)*(h-u)>0&&a++:h<=o&&(l-s)*(o-u)-(i-s)*(h-u)<0&&a--,s=l,u=h}return 0!==a}function br(t,e,r,n,i,o){if(0===r.length)return!1;if(!Pr(t,e,r[0],n,i,o))return!1;for(var a=1,s=r.length;a<s;++a)if(Pr(t,r[a-1],r[a],n,i,o))return!1;return!0}function Ir(t,e,r,n,i,o,a){for(var s,u,l,h,c,p,f,d=i[o+1],_=[],g=0,y=r.length;g<y;++g){var v=r[g];for(h=t[v-n],p=t[v-n+1],s=e;s<v;s+=n)c=t[s],f=t[s+1],(d<=p&&f<=d||p<=d&&d<=f)&&(l=(d-p)/(f-p)*(c-h)+h,_.push(l)),h=c,p=f}var m=NaN,E=-1/0;for(_.sort(H),h=_[0],s=1,u=_.length;s<u;++s){c=_[s];var T=Math.abs(c-h);T>E&&br(t,e,r,n,l=(h+c)/2,d)&&(m=l,E=T),h=c}return isNaN(m)&&(m=i[o]),a?(a.push(m,d,E),a):[m,d,E]}function Lr(t,e,r,n,i){for(var o=[],a=0,s=r.length;a<s;++a){var u=r[a];o=Ir(t,e,u,n,i,2*a,o),e=u[u.length-1]}return o}function Mr(t,e,r,n,i){for(var o,a=[t[e],t[e+1]],s=[];e+n<r;e+=n){if(s[0]=t[e+n],s[1]=t[e+n+1],o=i(a,s))return o;a[0]=s[0],a[1]=s[1]}return!1}function Fr(t,e,r,n,i){var o=St([1/0,1/0,-1/0,-1/0],t,e,r,n);return!!Gt(i,o)&&(!!ht(i,o)||(o[0]>=i[0]&&o[2]<=i[2]||(o[1]>=i[1]&&o[3]<=i[3]||Mr(t,e,r,n,function(t,e){return function(t,e,r){var n=!1,i=pt(t,e),o=pt(t,r);if(i===it.INTERSECTING||o===it.INTERSECTING)n=!0;else{var a=t[0],s=t[1],u=t[2],l=t[3],h=e[0],c=e[1],p=r[0],f=r[1],d=(f-c)/(p-h),_=void 0,g=void 0;o&it.ABOVE&&!(i&it.ABOVE)&&(n=(_=p-(f-l)/d)>=a&&_<=u),n||!(o&it.RIGHT)||i&it.RIGHT||(n=(g=f-(p-u)*d)>=s&&g<=l),n||!(o&it.BELOW)||i&it.BELOW||(n=(_=p-(f-s)/d)>=a&&_<=u),n||!(o&it.LEFT)||i&it.LEFT||(n=(g=f-(p-a)*d)>=s&&g<=l)}return n}(i,t,e)}))))}function Ar(t,e,r,n,i){if(!function(t,e,r,n,i){return!!(Fr(t,e,r,n,i)||Pr(t,e,r,n,i[0],i[1])||Pr(t,e,r,n,i[0],i[3])||Pr(t,e,r,n,i[2],i[1])||Pr(t,e,r,n,i[2],i[3]))}(t,e,r[0],n,i))return!1;if(1===r.length)return!0;for(var o=1,a=r.length;o<a;++o)if(Rr(t,r[o-1],r[o],n,i)&&!Fr(t,r[o-1],r[o],n,i))return!1;return!0}function Nr(t,e,r,n){for(;e<r-n;){for(var i=0;i<n;++i){var o=t[e+i];t[e+i]=t[r-n+i],t[r-n+i]=o}e+=n,r-=n}}function Gr(t,e,r,n){for(var i=0,o=t[r-n],a=t[r-n+1];e<r;e+=n){var s=t[e],u=t[e+1];i+=(s-o)*(u+a),o=s,a=u}return i>0}function Dr(t,e,r,n,i){for(var o=void 0!==i&&i,a=0,s=r.length;a<s;++a){var u=r[a],l=Gr(t,e,u,n);if(0===a){if(o&&l||!o&&!l)return!1}else if(o&&!l||!o&&l)return!1;e=u}return!0}function kr(t,e,r,n,i){for(var o=void 0!==i&&i,a=0,s=r.length;a<s;++a){var u=r[a],l=Gr(t,e,u,n);(0===a?o&&l||!o&&!l:o&&!l||!o&&l)&&Nr(t,e,u,n),e=u}return e}function jr(t,e,r,n,i){for(var o=0,a=r.length;o<a;++o)e=kr(t,e,r[o],n,i);return e}var Ur=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),Yr=function(t){function e(e,r,n){var i=t.call(this)||this;return i.ends_=[],i.flatInteriorPointRevision_=-1,i.flatInteriorPoint_=null,i.maxDelta_=-1,i.maxDeltaRevision_=-1,i.orientedRevision_=-1,i.orientedFlatCoordinates_=null,void 0!==r&&n?(i.setFlatCoordinates(r,e),i.ends_=n):i.setCoordinates(e,r),i}return Ur(e,t),e.prototype.appendLinearRing=function(t){this.flatCoordinates?$(this.flatCoordinates,t.getFlatCoordinates()):this.flatCoordinates=t.getFlatCoordinates().slice(),this.ends_.push(this.flatCoordinates.length),this.changed()},e.prototype.clone=function(){return new e(this.flatCoordinates.slice(),this.layout,this.ends_.slice())},e.prototype.closestPointXY=function(t,e,r,n){return n<ut(this.getExtent(),t,e)?n:(this.maxDeltaRevision_!=this.getRevision()&&(this.maxDelta_=Math.sqrt(lr(this.flatCoordinates,0,this.ends_,this.stride,0)),this.maxDeltaRevision_=this.getRevision()),cr(this.flatCoordinates,0,this.ends_,this.stride,this.maxDelta_,!0,t,e,r,n))},e.prototype.containsXY=function(t,e){return br(this.getOrientedFlatCoordinates(),0,this.ends_,this.stride,t,e)},e.prototype.getArea=function(){return ar(this.getOrientedFlatCoordinates(),0,this.ends_,this.stride)},e.prototype.getCoordinates=function(t){var e;return void 0!==t?kr(e=this.getOrientedFlatCoordinates().slice(),0,this.ends_,this.stride,t):e=this.flatCoordinates,gr(e,0,this.ends_,this.stride)},e.prototype.getEnds=function(){return this.ends_},e.prototype.getFlatInteriorPoint=function(){if(this.flatInteriorPointRevision_!=this.getRevision()){var t=Pt(this.getExtent());this.flatInteriorPoint_=Ir(this.getOrientedFlatCoordinates(),0,this.ends_,this.stride,t,0),this.flatInteriorPointRevision_=this.getRevision()}return this.flatInteriorPoint_},e.prototype.getInteriorPoint=function(){return new Cr(this.getFlatInteriorPoint(),Ut.XYM)},e.prototype.getLinearRingCount=function(){return this.ends_.length},e.prototype.getLinearRing=function(t){return t<0||this.ends_.length<=t?null:new xr(this.flatCoordinates.slice(0===t?0:this.ends_[t-1],this.ends_[t]),this.layout)},e.prototype.getLinearRings=function(){for(var t=this.layout,e=this.flatCoordinates,r=this.ends_,n=[],i=0,o=0,a=r.length;o<a;++o){var s=r[o],u=new xr(e.slice(i,s),t);n.push(u),i=s}return n},e.prototype.getOrientedFlatCoordinates=function(){if(this.orientedRevision_!=this.getRevision()){var t=this.flatCoordinates;Dr(t,0,this.ends_,this.stride)?this.orientedFlatCoordinates_=t:(this.orientedFlatCoordinates_=t.slice(),this.orientedFlatCoordinates_.length=kr(this.orientedFlatCoordinates_,0,this.ends_,this.stride)),this.orientedRevision_=this.getRevision()}return this.orientedFlatCoordinates_},e.prototype.getSimplifiedGeometryInternal=function(t){var r=[],n=[];return r.length=Sr(this.flatCoordinates,0,this.ends_,this.stride,Math.sqrt(t),r,0,n),new e(r,Ut.XY,n)},e.prototype.getType=function(){return Yt.POLYGON},e.prototype.intersectsExtent=function(t){return Ar(this.getOrientedFlatCoordinates(),0,this.ends_,this.stride,t)},e.prototype.setCoordinates=function(t,e){this.setLayout(e,t,2),this.flatCoordinates||(this.flatCoordinates=[]);var r=dr(this.flatCoordinates,0,t,this.stride,this.ends_);this.flatCoordinates.length=0===r.length?0:r[r.length-1],this.changed()},e}(ir),Xr=Yr;function Br(t,e,r,n){for(var i=r||32,o=[],a=0;a<i;++a)$(o,ee(t,e,2*Math.PI*a/i,n));return o.push(o[0],o[1]),new Yr(o,Ut.XY,[o.length])}function zr(t){var e=t[0],r=t[1],n=t[2],i=t[3],o=[e,r,e,i,n,i,n,r,e,r];return new Yr(o,Ut.XY,[o.length])}function Vr(t,e,r){for(var n=e||32,i=t.getStride(),o=t.getLayout(),a=t.getCenter(),s=i*(n+1),u=new Array(s),l=0;l<s;l+=i){u[l]=0,u[l+1]=0;for(var h=2;h<i;h++)u[l+h]=a[h]}var c=[u.length],p=new Yr(u,o,c);return Wr(p,a,t.getRadius(),r),p}function Wr(t,e,r,n){for(var i=t.getFlatCoordinates(),o=t.getStride(),a=i.length/o-1,s=n||0,u=0;u<=a;++u){var l=u*o,h=s+2*Ht(u,a)*Math.PI/a;i[l]=e[0]+r*Math.cos(h),i[l+1]=e[1]+r*Math.sin(h)}t.changed()}var Zr="undefined"!=typeof navigator?navigator.userAgent.toLowerCase():"",Kr=-1!==Zr.indexOf("firefox"),Hr=-1!==Zr.indexOf("safari")&&-1==Zr.indexOf("chrom"),qr=-1!==Zr.indexOf("webkit")&&-1==Zr.indexOf("edge"),Jr=-1!==Zr.indexOf("macintosh"),Qr=window.devicePixelRatio||1,$r="geolocation"in navigator,tn="ontouchstart"in window,en="PointerEvent"in window,rn=!!navigator.msPointerEnabled,nn=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),on={ACCURACY:"accuracy",ACCURACY_GEOMETRY:"accuracyGeometry",ALTITUDE:"altitude",ALTITUDE_ACCURACY:"altitudeAccuracy",HEADING:"heading",POSITION:"position",PROJECTION:"projection",SPEED:"speed",TRACKING:"tracking",TRACKING_OPTIONS:"trackingOptions"},an=function(t){function e(e){var r=t.call(this,F.ERROR)||this;return r.code=e.code,r.message=e.message,r}return nn(e,t),e}(I),sn=function(t){function e(e){var r=t.call(this)||this,n=e||{};return r.position_=null,r.transform_=Pe,r.watchId_=void 0,E(r,U(on.PROJECTION),r.handleProjectionChanged_,r),E(r,U(on.TRACKING),r.handleTrackingChanged_,r),void 0!==n.projection&&r.setProjection(n.projection),void 0!==n.trackingOptions&&r.setTrackingOptions(n.trackingOptions),r.setTracking(void 0!==n.tracking&&n.tracking),r}return nn(e,t),e.prototype.disposeInternal=function(){this.setTracking(!1),t.prototype.disposeInternal.call(this)},e.prototype.handleProjectionChanged_=function(){var t=this.getProjection();t&&(this.transform_=De(Ie("EPSG:4326"),t),this.position_&&this.set(on.POSITION,this.transform_(this.position_)))},e.prototype.handleTrackingChanged_=function(){if($r){var t=this.getTracking();t&&void 0===this.watchId_?this.watchId_=navigator.geolocation.watchPosition(this.positionChange_.bind(this),this.positionError_.bind(this),this.getTrackingOptions()):t||void 0===this.watchId_||(navigator.geolocation.clearWatch(this.watchId_),this.watchId_=void 0)}},e.prototype.positionChange_=function(t){var e=t.coords;this.set(on.ACCURACY,e.accuracy),this.set(on.ALTITUDE,null===e.altitude?void 0:e.altitude),this.set(on.ALTITUDE_ACCURACY,null===e.altitudeAccuracy?void 0:e.altitudeAccuracy),this.set(on.HEADING,null===e.heading?void 0:Kt(e.heading)),this.position_?(this.position_[0]=e.longitude,this.position_[1]=e.latitude):this.position_=[e.longitude,e.latitude];var r=this.transform_(this.position_);this.set(on.POSITION,r),this.set(on.SPEED,null===e.speed?void 0:e.speed);var n=Br(this.position_,e.accuracy);n.applyTransform(this.transform_),this.set(on.ACCURACY_GEOMETRY,n),this.changed()},e.prototype.positionError_=function(t){this.setTracking(!1),this.dispatchEvent(new an(t))},e.prototype.getAccuracy=function(){return this.get(on.ACCURACY)},e.prototype.getAccuracyGeometry=function(){return this.get(on.ACCURACY_GEOMETRY)||null},e.prototype.getAltitude=function(){return this.get(on.ALTITUDE)},e.prototype.getAltitudeAccuracy=function(){return this.get(on.ALTITUDE_ACCURACY)},e.prototype.getHeading=function(){return this.get(on.HEADING)},e.prototype.getPosition=function(){return this.get(on.POSITION)},e.prototype.getProjection=function(){return this.get(on.PROJECTION)},e.prototype.getSpeed=function(){return this.get(on.SPEED)},e.prototype.getTracking=function(){return this.get(on.TRACKING)},e.prototype.getTrackingOptions=function(){return this.get(on.TRACKING_OPTIONS)},e.prototype.setProjection=function(t){this.set(on.PROJECTION,Ie(t))},e.prototype.setTracking=function(t){this.set(on.TRACKING,t)},e.prototype.setTrackingOptions=function(t){this.set(on.TRACKING_OPTIONS,t)},e}(Y),un=function(){function t(t,e,r){this.decay_=t,this.minVelocity_=e,this.delay_=r,this.points_=[],this.angle_=0,this.initialVelocity_=0}return t.prototype.begin=function(){this.points_.length=0,this.angle_=0,this.initialVelocity_=0},t.prototype.update=function(t,e){this.points_.push(t,e,Date.now())},t.prototype.end=function(){if(this.points_.length<6)return!1;var t=Date.now()-this.delay_,e=this.points_.length-3;if(this.points_[e+2]<t)return!1;for(var r=e-3;r>0&&this.points_[r+2]>t;)r-=3;var n=this.points_[e+2]-this.points_[r+2];if(n<1e3/60)return!1;var i=this.points_[e]-this.points_[r],o=this.points_[e+1]-this.points_[r+1];return this.angle_=Math.atan2(o,i),this.initialVelocity_=Math.sqrt(i*i+o*o)/n,this.initialVelocity_>this.minVelocity_},t.prototype.getDistance=function(){return(this.minVelocity_-this.initialVelocity_)/this.decay_},t.prototype.getAngle=function(){return this.angle_},t}(),ln=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),hn=function(t){function e(e,r,n){var i=t.call(this,e)||this;return i.map=r,i.frameState=void 0!==n?n:null,i}return ln(e,t),e}(I),cn=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),pn=function(t){function e(e,r,n,i,o){var a=t.call(this,e,r,o)||this;return a.originalEvent=n,a.pixel=r.getEventPixel(n),a.coordinate=r.getCoordinateFromPixel(a.pixel),a.dragging=void 0!==i&&i,a}return cn(e,t),e.prototype.preventDefault=function(){t.prototype.preventDefault.call(this),this.originalEvent.preventDefault()},e.prototype.stopPropagation=function(){t.prototype.stopPropagation.call(this),this.originalEvent.stopPropagation()},e}(hn),fn={SINGLECLICK:"singleclick",CLICK:F.CLICK,DBLCLICK:F.DBLCLICK,POINTERDRAG:"pointerdrag",POINTERMOVE:"pointermove",POINTERDOWN:"pointerdown",POINTERUP:"pointerup",POINTEROVER:"pointerover",POINTEROUT:"pointerout",POINTERENTER:"pointerenter",POINTERLEAVE:"pointerleave",POINTERCANCEL:"pointercancel"},dn=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),_n=function(t){function e(e,r,n,i,o){var a=t.call(this,e,r,n.originalEvent,i,o)||this;return a.pointerEvent=n,a}return dn(e,t),e}(pn),gn={POINTERMOVE:"pointermove",POINTERDOWN:"pointerdown",POINTERUP:"pointerup",POINTEROVER:"pointerover",POINTEROUT:"pointerout",POINTERENTER:"pointerenter",POINTERLEAVE:"pointerleave",POINTERCANCEL:"pointercancel"},yn=function(){function t(t,e){this.dispatcher=t,this.mapping_=e}return t.prototype.getEvents=function(){return Object.keys(this.mapping_)},t.prototype.getHandlerForEvent=function(t){return this.mapping_[t]},t}(),vn=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),mn=1,En="mouse";function Tn(t){if(!this.isEventSimulatedFromTouch_(t)){mn.toString()in this.pointerMap&&this.cancel(t);var e=Cn(t,this.dispatcher);this.pointerMap[mn.toString()]=t,this.dispatcher.down(e,t)}}function Sn(t){if(!this.isEventSimulatedFromTouch_(t)){var e=Cn(t,this.dispatcher);this.dispatcher.move(e,t)}}function wn(t){if(!this.isEventSimulatedFromTouch_(t)){var e=this.pointerMap[mn.toString()];if(e&&e.button===t.button){var r=Cn(t,this.dispatcher);this.dispatcher.up(r,t),this.cleanupMouse()}}}function xn(t){if(!this.isEventSimulatedFromTouch_(t)){var e=Cn(t,this.dispatcher);this.dispatcher.enterOver(e,t)}}function On(t){if(!this.isEventSimulatedFromTouch_(t)){var e=Cn(t,this.dispatcher);this.dispatcher.leaveOut(e,t)}}function Cn(t,e){var r=e.cloneEvent(t,t),n=r.preventDefault;return r.preventDefault=function(){t.preventDefault(),n()},r.pointerId=mn,r.isPrimary=!0,r.pointerType=En,r}var Rn=function(t){function e(e){var r=this,n={mousedown:Tn,mousemove:Sn,mouseup:wn,mouseover:xn,mouseout:On};return(r=t.call(this,e,n)||this).pointerMap=e.pointerMap,r.lastTouches=[],r}return vn(e,t),e.prototype.isEventSimulatedFromTouch_=function(t){for(var e=this.lastTouches,r=t.clientX,n=t.clientY,i=0,o=e.length,a=void 0;i<o&&(a=e[i]);i++){var s=Math.abs(r-a[0]),u=Math.abs(n-a[1]);if(s<=25&&u<=25)return!0}return!1},e.prototype.cancel=function(t){var e=Cn(t,this.dispatcher);this.dispatcher.cancel(e,t),this.cleanupMouse()},e.prototype.cleanupMouse=function(){delete this.pointerMap[mn.toString()]},e}(yn),Pn=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),bn=["","unavailable","touch","pen","mouse"];function In(t){this.pointerMap[t.pointerId.toString()]=t;var e=this.prepareEvent_(t);this.dispatcher.down(e,t)}function Ln(t){var e=this.prepareEvent_(t);this.dispatcher.move(e,t)}function Mn(t){var e=this.prepareEvent_(t);this.dispatcher.up(e,t),this.cleanup(t.pointerId)}function Fn(t){var e=this.prepareEvent_(t);this.dispatcher.leaveOut(e,t)}function An(t){var e=this.prepareEvent_(t);this.dispatcher.enterOver(e,t)}function Nn(t){var e=this.prepareEvent_(t);this.dispatcher.cancel(e,t),this.cleanup(t.pointerId)}function Gn(t){var e=this.dispatcher.makeEvent("lostpointercapture",t,t);this.dispatcher.dispatchEvent(e)}function Dn(t){var e=this.dispatcher.makeEvent("gotpointercapture",t,t);this.dispatcher.dispatchEvent(e)}var kn=function(t){function e(e){var r=this,n={MSPointerDown:In,MSPointerMove:Ln,MSPointerUp:Mn,MSPointerOut:Fn,MSPointerOver:An,MSPointerCancel:Nn,MSGotPointerCapture:Dn,MSLostPointerCapture:Gn};return(r=t.call(this,e,n)||this).pointerMap=e.pointerMap,r}return Pn(e,t),e.prototype.prepareEvent_=function(t){var e=t;return"number"==typeof t.pointerType&&((e=this.dispatcher.cloneEvent(t,t)).pointerType=bn[t.pointerType]),e},e.prototype.cleanup=function(t){delete this.pointerMap[t.toString()]},e}(yn),jn=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}();function Un(t){this.dispatcher.fireNativeEvent(t)}function Yn(t){this.dispatcher.fireNativeEvent(t)}function Xn(t){this.dispatcher.fireNativeEvent(t)}function Bn(t){this.dispatcher.fireNativeEvent(t)}function zn(t){this.dispatcher.fireNativeEvent(t)}function Vn(t){this.dispatcher.fireNativeEvent(t)}function Wn(t){this.dispatcher.fireNativeEvent(t)}function Zn(t){this.dispatcher.fireNativeEvent(t)}var Kn=function(t){function e(e){var r={pointerdown:Un,pointermove:Yn,pointerup:Xn,pointerout:Bn,pointerover:zn,pointercancel:Vn,gotpointercapture:Zn,lostpointercapture:Wn};return t.call(this,e,r)||this}return jn(e,t),e}(yn),Hn=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),qn=!1,Jn=function(t){function e(e,r,n){var i=t.call(this,e)||this;i.originalEvent=r;var o=n||{};return i.buttons=function(t){var e;if(t.buttons||qn)e=t.buttons;else switch(t.which){case 1:e=1;break;case 2:e=4;break;case 3:e=2;break;default:e=0}return e}(o),i.pressure=function(t,e){var r=0;r=t.pressure?t.pressure:e?.5:0;return r}(o,i.buttons),i.bubbles="bubbles"in o&&o.bubbles,i.cancelable="cancelable"in o&&o.cancelable,i.view="view"in o?o.view:null,i.detail="detail"in o?o.detail:null,i.screenX="screenX"in o?o.screenX:0,i.screenY="screenY"in o?o.screenY:0,i.clientX="clientX"in o?o.clientX:0,i.clientY="clientY"in o?o.clientY:0,i.ctrlKey="ctrlKey"in o&&o.ctrlKey,i.altKey="altKey"in o&&o.altKey,i.shiftKey="shiftKey"in o&&o.shiftKey,i.metaKey="metaKey"in o&&o.metaKey,i.button="button"in o?o.button:0,i.relatedTarget="relatedTarget"in o?o.relatedTarget:null,i.pointerId="pointerId"in o?o.pointerId:0,i.width="width"in o?o.width:0,i.height="height"in o?o.height:0,i.tiltX="tiltX"in o?o.tiltX:0,i.tiltY="tiltY"in o?o.tiltY:0,i.pointerType="pointerType"in o?o.pointerType:"",i.hwTimestamp="hwTimestamp"in o?o.hwTimestamp:0,i.isPrimary="isPrimary"in o&&o.isPrimary,r.preventDefault&&(i.preventDefault=function(){r.preventDefault()}),i}return Hn(e,t),e}(I);!function(){try{var t=new MouseEvent("click",{buttons:1});qn=1===t.buttons}catch(t){}}();var Qn=Jn,$n=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}();function ti(t){this.vacuumTouches_(t),this.setPrimaryTouch_(t.changedTouches[0]),this.dedupSynthMouse_(t),this.clickCount_++,this.processTouches_(t,this.overDown_)}function ei(t){this.processTouches_(t,this.moveOverOut_)}function ri(t){this.dedupSynthMouse_(t),this.processTouches_(t,this.upOut_)}function ni(t){this.processTouches_(t,this.cancelOut_)}var ii=function(t){function e(e,r){var n=this,i={touchstart:ti,touchmove:ei,touchend:ri,touchcancel:ni};return(n=t.call(this,e,i)||this).pointerMap=e.pointerMap,n.mouseSource=r,n.firstTouchId_=void 0,n.clickCount_=0,n.resetId_,n.dedupTimeout_=2500,n}return $n(e,t),e.prototype.isPrimaryTouch_=function(t){return this.firstTouchId_===t.identifier},e.prototype.setPrimaryTouch_=function(t){var e=Object.keys(this.pointerMap).length;(0===e||1===e&&mn.toString()in this.pointerMap)&&(this.firstTouchId_=t.identifier,this.cancelResetClickCount_())},e.prototype.removePrimaryPointer_=function(t){t.isPrimary&&(this.firstTouchId_=void 0,this.resetClickCount_())},e.prototype.resetClickCount_=function(){this.resetId_=setTimeout(this.resetClickCountHandler_.bind(this),200)},e.prototype.resetClickCountHandler_=function(){this.clickCount_=0,this.resetId_=void 0},e.prototype.cancelResetClickCount_=function(){void 0!==this.resetId_&&clearTimeout(this.resetId_)},e.prototype.touchToPointer_=function(t,e){var r=this.dispatcher.cloneEvent(t,e);return r.pointerId=e.identifier+2,r.bubbles=!0,r.cancelable=!0,r.detail=this.clickCount_,r.button=0,r.buttons=1,r.width=e.radiusX||0,r.height=e.radiusY||0,r.pressure=e.force||.5,r.isPrimary=this.isPrimaryTouch_(e),r.pointerType="touch",r.clientX=e.clientX,r.clientY=e.clientY,r.screenX=e.screenX,r.screenY=e.screenY,r},e.prototype.processTouches_=function(t,e){var r=Array.prototype.slice.call(t.changedTouches),n=r.length;function i(){t.preventDefault()}for(var o=0;o<n;++o){var a=this.touchToPointer_(t,r[o]);a.preventDefault=i,e.call(this,t,a)}},e.prototype.findTouch_=function(t,e){for(var r=t.length,n=0;n<r;n++){if(t[n].identifier===e)return!0}return!1},e.prototype.vacuumTouches_=function(t){var e=t.touches,r=Object.keys(this.pointerMap),n=r.length;if(n>=e.length){for(var i=[],o=0;o<n;++o){var a=Number(r[o]),s=this.pointerMap[a];a==mn||this.findTouch_(e,a-2)||i.push(s.out)}for(o=0;o<i.length;++o)this.cancelOut_(t,i[o])}},e.prototype.overDown_=function(t,e){this.pointerMap[e.pointerId]={target:e.target,out:e,outTarget:e.target},this.dispatcher.over(e,t),this.dispatcher.enter(e,t),this.dispatcher.down(e,t)},e.prototype.moveOverOut_=function(t,e){var r=e,n=this.pointerMap[r.pointerId];if(n){var i=n.out,o=n.outTarget;this.dispatcher.move(r,t),i&&o!==r.target&&(i.relatedTarget=r.target,r.relatedTarget=o,i.target=o,r.target?(this.dispatcher.leaveOut(i,t),this.dispatcher.enterOver(r,t)):(r.target=o,r.relatedTarget=null,this.cancelOut_(t,r))),n.out=r,n.outTarget=r.target}},e.prototype.upOut_=function(t,e){this.dispatcher.up(e,t),this.dispatcher.out(e,t),this.dispatcher.leave(e,t),this.cleanUpPointer_(e)},e.prototype.cancelOut_=function(t,e){this.dispatcher.cancel(e,t),this.dispatcher.out(e,t),this.dispatcher.leave(e,t),this.cleanUpPointer_(e)},e.prototype.cleanUpPointer_=function(t){delete this.pointerMap[t.pointerId],this.removePrimaryPointer_(t)},e.prototype.dedupSynthMouse_=function(t){var e=this.mouseSource.lastTouches,r=t.changedTouches[0];if(this.isPrimaryTouch_(r)){var n=[r.clientX,r.clientY];e.push(n),setTimeout(function(){var t,r,i;r=n,i=(t=e).indexOf(r),i>-1&&t.splice(i,1)},this.dedupTimeout_)}},e}(yn),oi=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),ai=[["bubbles",!1],["cancelable",!1],["view",null],["detail",null],["screenX",0],["screenY",0],["clientX",0],["clientY",0],["ctrlKey",!1],["altKey",!1],["shiftKey",!1],["metaKey",!1],["button",0],["relatedTarget",null],["buttons",0],["pointerId",0],["width",0],["height",0],["pressure",0],["tiltX",0],["tiltY",0],["pointerType",""],["hwTimestamp",0],["isPrimary",!1],["type",""],["target",null],["currentTarget",null],["which",0]],si=function(t){function e(e){var r=t.call(this)||this;return r.element_=e,r.pointerMap={},r.eventMap_={},r.eventSourceList_=[],r.registerSources(),r}return oi(e,t),e.prototype.registerSources=function(){if(en)this.registerSource("native",new Kn(this));else if(rn)this.registerSource("ms",new kn(this));else{var t=new Rn(this);this.registerSource("mouse",t),tn&&this.registerSource("touch",new ii(this,t))}this.register_()},e.prototype.registerSource=function(t,e){var r=e,n=r.getEvents();n&&(n.forEach(function(t){var e=r.getHandlerForEvent(t);e&&(this.eventMap_[t]=e.bind(r))}.bind(this)),this.eventSourceList_.push(r))},e.prototype.register_=function(){for(var t=this.eventSourceList_.length,e=0;e<t;e++){var r=this.eventSourceList_[e];this.addEvents_(r.getEvents())}},e.prototype.unregister_=function(){for(var t=this.eventSourceList_.length,e=0;e<t;e++){var r=this.eventSourceList_[e];this.removeEvents_(r.getEvents())}},e.prototype.eventHandler_=function(t){var e=t.type,r=this.eventMap_[e];r&&r(t)},e.prototype.addEvents_=function(t){t.forEach(function(t){E(this.element_,t,this.eventHandler_,this)}.bind(this))},e.prototype.removeEvents_=function(t){t.forEach(function(t){S(this.element_,t,this.eventHandler_,this)}.bind(this))},e.prototype.cloneEvent=function(t,e){for(var r={},n=0,i=ai.length;n<i;n++){var o=ai[n][0];r[o]=t[o]||e[o]||ai[n][1]}return r},e.prototype.down=function(t,e){this.fireEvent(gn.POINTERDOWN,t,e)},e.prototype.move=function(t,e){this.fireEvent(gn.POINTERMOVE,t,e)},e.prototype.up=function(t,e){this.fireEvent(gn.POINTERUP,t,e)},e.prototype.enter=function(t,e){t.bubbles=!1,this.fireEvent(gn.POINTERENTER,t,e)},e.prototype.leave=function(t,e){t.bubbles=!1,this.fireEvent(gn.POINTERLEAVE,t,e)},e.prototype.over=function(t,e){t.bubbles=!0,this.fireEvent(gn.POINTEROVER,t,e)},e.prototype.out=function(t,e){t.bubbles=!0,this.fireEvent(gn.POINTEROUT,t,e)},e.prototype.cancel=function(t,e){this.fireEvent(gn.POINTERCANCEL,t,e)},e.prototype.leaveOut=function(t,e){this.out(t,e),this.contains_(t.target,t.relatedTarget)||this.leave(t,e)},e.prototype.enterOver=function(t,e){this.over(t,e),this.contains_(t.target,t.relatedTarget)||this.enter(t,e)},e.prototype.contains_=function(t,e){return!(!t||!e)&&t.contains(e)},e.prototype.makeEvent=function(t,e,r){return new Qn(t,r,e)},e.prototype.fireEvent=function(t,e,r){var n=this.makeEvent(t,e,r);this.dispatchEvent(n)},e.prototype.fireNativeEvent=function(t){var e=this.makeEvent(t.type,t,t);this.dispatchEvent(e)},e.prototype.wrapMouseEvent=function(t,e){return this.makeEvent(t,Cn(e,this),e)},e.prototype.disposeInternal=function(){this.unregister_(),t.prototype.disposeInternal.call(this)},e}(M),ui=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),li=function(t){function e(e,r){var n=t.call(this)||this;n.map_=e,n.clickTimeoutId_,n.dragging_=!1,n.dragListenerKeys_=[],n.moveTolerance_=r?r*Qr:Qr,n.down_=null;var i=n.map_.getViewport();return n.activePointers_=0,n.trackedTouches_={},n.pointerEventHandler_=new si(i),n.documentPointerEventHandler_=null,n.pointerdownListenerKey_=E(n.pointerEventHandler_,gn.POINTERDOWN,n.handlePointerDown_,n),n.relayedListenerKey_=E(n.pointerEventHandler_,gn.POINTERMOVE,n.relayEvent_,n),n}return ui(e,t),e.prototype.emulateClick_=function(t){var e=new _n(fn.CLICK,this.map_,t);this.dispatchEvent(e),void 0!==this.clickTimeoutId_?(clearTimeout(this.clickTimeoutId_),this.clickTimeoutId_=void 0,e=new _n(fn.DBLCLICK,this.map_,t),this.dispatchEvent(e)):this.clickTimeoutId_=setTimeout(function(){this.clickTimeoutId_=void 0;var e=new _n(fn.SINGLECLICK,this.map_,t);this.dispatchEvent(e)}.bind(this),250)},e.prototype.updateActivePointers_=function(t){var e=t;e.type==fn.POINTERUP||e.type==fn.POINTERCANCEL?delete this.trackedTouches_[e.pointerId]:e.type==fn.POINTERDOWN&&(this.trackedTouches_[e.pointerId]=!0),this.activePointers_=Object.keys(this.trackedTouches_).length},e.prototype.handlePointerUp_=function(t){this.updateActivePointers_(t);var e=new _n(fn.POINTERUP,this.map_,t);this.dispatchEvent(e),e.propagationStopped||this.dragging_||!this.isMouseActionButton_(t)||this.emulateClick_(this.down_),0===this.activePointers_&&(this.dragListenerKeys_.forEach(w),this.dragListenerKeys_.length=0,this.dragging_=!1,this.down_=null,this.documentPointerEventHandler_.dispose(),this.documentPointerEventHandler_=null)},e.prototype.isMouseActionButton_=function(t){return 0===t.button},e.prototype.handlePointerDown_=function(t){this.updateActivePointers_(t);var e=new _n(fn.POINTERDOWN,this.map_,t);this.dispatchEvent(e),this.down_=t,0===this.dragListenerKeys_.length&&(this.documentPointerEventHandler_=new si(document),this.dragListenerKeys_.push(E(this.documentPointerEventHandler_,fn.POINTERMOVE,this.handlePointerMove_,this),E(this.documentPointerEventHandler_,fn.POINTERUP,this.handlePointerUp_,this),E(this.pointerEventHandler_,fn.POINTERCANCEL,this.handlePointerUp_,this)))},e.prototype.handlePointerMove_=function(t){if(this.isMoving_(t)){this.dragging_=!0;var e=new _n(fn.POINTERDRAG,this.map_,t,this.dragging_);this.dispatchEvent(e)}t.preventDefault()},e.prototype.relayEvent_=function(t){var e=!(!this.down_||!this.isMoving_(t));this.dispatchEvent(new _n(t.type,this.map_,t,e))},e.prototype.isMoving_=function(t){return this.dragging_||Math.abs(t.clientX-this.down_.clientX)>this.moveTolerance_||Math.abs(t.clientY-this.down_.clientY)>this.moveTolerance_},e.prototype.disposeInternal=function(){this.relayedListenerKey_&&(w(this.relayedListenerKey_),this.relayedListenerKey_=null),this.pointerdownListenerKey_&&(w(this.pointerdownListenerKey_),this.pointerdownListenerKey_=null),this.dragListenerKeys_.forEach(w),this.dragListenerKeys_.length=0,this.documentPointerEventHandler_&&(this.documentPointerEventHandler_.dispose(),this.documentPointerEventHandler_=null),this.pointerEventHandler_&&(this.pointerEventHandler_.dispose(),this.pointerEventHandler_=null),t.prototype.disposeInternal.call(this)},e}(M),hi="postrender",ci="movestart",pi="moveend",fi={LAYERGROUP:"layergroup",SIZE:"size",TARGET:"target",VIEW:"view"},di="prerender",_i="postrender",gi="precompose",yi="postcompose",vi="rendercomplete",mi={IDLE:0,LOADING:1,LOADED:2,ERROR:3,EMPTY:4,ABORT:5},Ei=function(){function t(t,e){this.priorityFunction_=t,this.keyFunction_=e,this.elements_=[],this.priorities_=[],this.queuedElements_={}}return t.prototype.clear=function(){this.elements_.length=0,this.priorities_.length=0,f(this.queuedElements_)},t.prototype.dequeue=function(){var t=this.elements_,e=this.priorities_,r=t[0];1==t.length?(t.length=0,e.length=0):(t[0]=t.pop(),e[0]=e.pop(),this.siftUp_(0));var n=this.keyFunction_(r);return delete this.queuedElements_[n],r},t.prototype.enqueue=function(t){W(!(this.keyFunction_(t)in this.queuedElements_),31);var e=this.priorityFunction_(t);return e!=1/0&&(this.elements_.push(t),this.priorities_.push(e),this.queuedElements_[this.keyFunction_(t)]=!0,this.siftDown_(0,this.elements_.length-1),!0)},t.prototype.getCount=function(){return this.elements_.length},t.prototype.getLeftChildIndex_=function(t){return 2*t+1},t.prototype.getRightChildIndex_=function(t){return 2*t+2},t.prototype.getParentIndex_=function(t){return t-1>>1},t.prototype.heapify_=function(){var t;for(t=(this.elements_.length>>1)-1;t>=0;t--)this.siftUp_(t)},t.prototype.isEmpty=function(){return 0===this.elements_.length},t.prototype.isKeyQueued=function(t){return t in this.queuedElements_},t.prototype.isQueued=function(t){return this.isKeyQueued(this.keyFunction_(t))},t.prototype.siftUp_=function(t){for(var e=this.elements_,r=this.priorities_,n=e.length,i=e[t],o=r[t],a=t;t<n>>1;){var s=this.getLeftChildIndex_(t),u=this.getRightChildIndex_(t),l=u<n&&r[u]<r[s]?u:s;e[t]=e[l],r[t]=r[l],t=l}e[t]=i,r[t]=o,this.siftDown_(a,t)},t.prototype.siftDown_=function(t,e){for(var r=this.elements_,n=this.priorities_,i=r[e],o=n[e];e>t;){var a=this.getParentIndex_(e);if(!(n[a]>o))break;r[e]=r[a],n[e]=n[a],e=a}r[e]=i,n[e]=o},t.prototype.reprioritize=function(){var t,e,r,n=this.priorityFunction_,i=this.elements_,o=this.priorities_,a=0,s=i.length;for(e=0;e<s;++e)(r=n(t=i[e]))==1/0?delete this.queuedElements_[this.keyFunction_(t)]:(o[a]=r,i[a++]=t);i.length=a,o.length=a,this.heapify_()},t}(),Ti=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),Si=function(t){function e(e,r){var n=t.call(this,function(t){return e.apply(null,t)},function(t){return t[0].getKey()})||this;return n.tileChangeCallback_=r,n.tilesLoading_=0,n.tilesLoadingKeys_={},n}return Ti(e,t),e.prototype.enqueue=function(e){var r=t.prototype.enqueue.call(this,e);r&&E(e[0],F.CHANGE,this.handleTileChange,this);return r},e.prototype.getTilesLoading=function(){return this.tilesLoading_},e.prototype.handleTileChange=function(t){var e=t.target,r=e.getState();if(e.hifi&&r===mi.LOADED||r===mi.ERROR||r===mi.EMPTY||r===mi.ABORT){S(e,F.CHANGE,this.handleTileChange,this);var n=e.getKey();n in this.tilesLoadingKeys_&&(delete this.tilesLoadingKeys_[n],--this.tilesLoading_),this.tileChangeCallback_()}},e.prototype.loadMoreTiles=function(t,e){for(var r,n,i,o=0,a=!1;this.tilesLoading_<t&&o<e&&this.getCount()>0;)i=(n=this.dequeue()[0]).getKey(),(r=n.getState())===mi.ABORT?a=!0:r!==mi.IDLE||i in this.tilesLoadingKeys_||(this.tilesLoadingKeys_[i]=!0,++this.tilesLoading_,++o,n.load());0===o&&a&&this.tileChangeCallback_()},e}(Ei),wi=42,xi=256;function Oi(t){return t}function Ci(t,e,r){var n=Nt(e)/r[0],i=Lt(e)/r[1];return Math.min(t,Math.min(n,i))}function Ri(t,e,r){var n=Math.min(t,e);return n*=Math.log(1+50*Math.max(0,t/e-1))/50+1,r&&(n=Math.max(n,r),n/=Math.log(1+50*Math.max(0,r/t-1))/50+1),Bt(n,r/2,2*e)}function Pi(t,e,r,n){return function(i,o,a,s){if(void 0!==i){var u=n?Ci(t,n,a):t;return(void 0===r||r)&&s?Ri(i,u,e):Bt(i,e,u)}}}function bi(t){return void 0!==t?0:void 0}function Ii(t){return void 0!==t?t:void 0}var Li=0,Mi=1,Fi="center",Ai="resolution",Ni="rotation";function Gi(t,e,r){var n=void 0!==r?t.toFixed(r):""+t,i=n.indexOf(".");return(i=-1===i?n.length:i)>e?n:new Array(1+e-i).join("0")+n}function Di(t,e){for(var r=(""+t).split("."),n=(""+e).split("."),i=0;i<Math.max(r.length,n.length);i++){var o=parseInt(r[i]||"0",10),a=parseInt(n[i]||"0",10);if(o>a)return 1;if(a>o)return-1}return 0}function ki(t,e){return t[0]+=+e[0],t[1]+=+e[1],t}function ji(t,e){var r,n,i=t[0],o=t[1],a=e[0],s=e[1],u=a[0],l=a[1],h=s[0],c=s[1],p=h-u,f=c-l,d=0===p&&0===f?0:(p*(i-u)+f*(o-l))/(p*p+f*f||0);return d<=0?(r=u,n=l):d>=1?(r=h,n=c):(r=u+d*p,n=l+d*f),[r,n]}function Ui(t,e,r){var n=Ht(e+180,360)-180,i=Math.abs(3600*n),o=r||0,a=Math.pow(10,o),s=Math.floor(i/3600),u=Math.floor((i-3600*s)/60),l=i-3600*s-60*u;return(l=Math.ceil(l*a)/a)>=60&&(l=0,u+=1),u>=60&&(u=0,s+=1),s+"° "+Gi(u,2)+"′ "+Gi(l,2,o)+"″"+(0==n?"":" "+t.charAt(n<0?1:0))}function Yi(t,e,r){return t?e.replace("{x}",t[0].toFixed(r)).replace("{y}",t[1].toFixed(r)):""}function Xi(t,e){for(var r=!0,n=t.length-1;n>=0;--n)if(t[n]!=e[n]){r=!1;break}return r}function Bi(t,e){var r=Math.cos(e),n=Math.sin(e),i=t[0]*r-t[1]*n,o=t[1]*r+t[0]*n;return t[0]=i,t[1]=o,t}function zi(t,e){return t[0]*=e,t[1]*=e,t}function Vi(t,e){var r=t[0]-e[0],n=t[1]-e[1];return r*r+n*n}function Wi(t,e){return Math.sqrt(Vi(t,e))}function Zi(t,e){return Vi(t,ji(t,e))}function Ki(t,e){return Yi(t,"{x}, {y}",e)}function Hi(t){return Math.pow(t,3)}function qi(t){return 1-Hi(1-t)}function Ji(t){return 3*t*t-2*t*t*t}function Qi(t){return t}var $i=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),to=0;function eo(t,e){setTimeout(function(){t(e)},0)}function ro(t){return!(t.sourceCenter&&t.targetCenter&&!Xi(t.sourceCenter,t.targetCenter))&&(t.sourceResolution===t.targetResolution&&t.sourceRotation===t.targetRotation)}var no=function(t){function e(e){var r=t.call(this)||this,n=p({},e);return r.hints_=[0,0],r.animations_=[],r.updateAnimationKey_,r.updateAnimations_=r.updateAnimations_.bind(r),r.projection_=Fe(n.projection,"EPSG:3857"),r.targetCenter_=null,r.targetResolution_,r.targetRotation_,r.applyOptions_(n),r}return $i(e,t),e.prototype.applyOptions_=function(t){var e=function(t){var e,r,n,i=void 0!==t.minZoom?t.minZoom:to,o=void 0!==t.maxZoom?t.maxZoom:28,a=void 0!==t.zoomFactor?t.zoomFactor:2,s=void 0!==t.multiWorld&&t.multiWorld,u=void 0===t.smoothResolutionConstraint||t.smoothResolutionConstraint;if(void 0!==t.resolutions){var l=t.resolutions;r=l[i],n=void 0!==l[o]?l[o]:l[l.length-1],e=t.constrainResolution?function(t,e,r){return function(n,i,o,a){if(void 0!==n){var s=t[0],u=t[t.length-1],l=r?Ci(s,r,o):s;if(a)return void 0===e||e?Ri(n,l,u):Bt(n,u,l);var h=Math.min(l,n),c=Math.floor(J(t,h,i));return t[c]}}}(l,u,!t.constrainOnlyCenter&&t.extent):Pi(r,n,u,!t.constrainOnlyCenter&&t.extent)}else{var h=Fe(t.projection,"EPSG:3857"),c=h.getExtent(),p=c?Math.max(Nt(c),Lt(c)):360*ne[ie.DEGREES]/h.getMetersPerUnit(),f=p/xi/Math.pow(2,to),d=f/Math.pow(2,28-to);if(void 0!==(r=t.maxResolution)?i=0:r=f/Math.pow(a,i),void 0===(n=t.minResolution)&&(n=void 0!==t.maxZoom?void 0!==t.maxResolution?r/Math.pow(a,o):f/Math.pow(a,o):d),o=i+Math.floor(Math.log(r/n)/Math.log(a)),n=r/Math.pow(a,o-i),t.constrainResolution)e=function(t,e,r,n,i){return function(o,a,s,u){if(void 0!==o){var l=i?Ci(e,i,s):e,h=void 0!==r?r:0;if(u)return void 0===n||n?Ri(o,l,h):Bt(o,h,l);var c=-a*(.5-1e-9)+.5,p=Math.min(l,o),f=Math.floor(Math.log(e/p)/Math.log(t)+c);return Bt(e/Math.pow(t,f),h,l)}}}(a,r,n,u,!t.constrainOnlyCenter&&t.extent);else{var _=t.constrainOnlyCenter,g=t.extent;s||g||!h.isGlobal()||(_=!1,g=h.getExtent()),e=Pi(r,n,u,!_&&g)}}return{constraint:e,maxResolution:r,minResolution:n,minZoom:i,zoomFactor:a}}(t);this.maxResolution_=e.maxResolution,this.minResolution_=e.minResolution,this.zoomFactor_=e.zoomFactor,this.resolutions_=t.resolutions,this.minZoom_=e.minZoom;var r=function(t){return void 0!==t.extent?(e=t.extent,r=t.constrainOnlyCenter,n=void 0===t.smoothExtentConstraint||t.smoothExtentConstraint,function(t,i,o,a){if(t){var s=r?0:o[0]*i,u=r?0:o[1]*i,l=e[0]+s/2,h=e[2]-s/2,c=e[1]+u/2,p=e[3]-u/2;l>h&&(l=h=(h+l)/2),c>p&&(c=p=(p+c)/2);var f=Bt(t[0],l,h),d=Bt(t[1],c,p),_=30*i;return a&&n&&(f+=-_*Math.log(1+Math.max(0,l-t[0])/_)+_*Math.log(1+Math.max(0,t[0]-h)/_),d+=-_*Math.log(1+Math.max(0,c-t[1])/_)+_*Math.log(1+Math.max(0,t[1]-p)/_)),[f,d]}}):Oi;var e,r,n}(t),n=e.constraint,i=function(t){if(void 0===t.enableRotation||t.enableRotation){var e=t.constrainRotation;return void 0===e||!0===e?(o=i||Kt(5),function(t,e){return e?t:void 0!==t?Math.abs(t)<=o?0:t:void 0}):!1===e?Ii:"number"==typeof e?(r=e,n=2*Math.PI/r,function(t,e){return e?t:void 0!==t?t=Math.floor(t/n+.5)*n:void 0}):Ii}return bi;var r,n;var i,o}(t);this.constraints_={center:r,resolution:n,rotation:i},this.setRotation(void 0!==t.rotation?t.rotation:0),this.setCenter(void 0!==t.center?t.center:null),void 0!==t.resolution?this.setResolution(t.resolution):void 0!==t.zoom&&this.setZoom(t.zoom),this.resolveConstraints(0),this.setProperties({}),this.options_=t},e.prototype.getUpdatedOptions_=function(t){var e=p({},this.options_);return void 0!==e.resolution?e.resolution=this.getResolution():e.zoom=this.getZoom(),e.center=this.getCenter(),e.rotation=this.getRotation(),p({},e,t)},e.prototype.animate=function(t){var e,r=arguments.length;if(r>1&&"function"==typeof arguments[r-1]&&(e=arguments[r-1],--r),!this.isDef()){var n=arguments[r-1];return n.center&&this.setCenter(n.center),void 0!==n.zoom&&this.setZoom(n.zoom),void 0!==n.rotation&&this.setRotation(n.rotation),void(e&&eo(e,!0))}for(var i=Date.now(),o=this.targetCenter_.slice(),a=this.targetResolution_,s=this.targetRotation_,u=[],l=0;l<r;++l){var h=arguments[l],c={start:i,complete:!1,anchor:h.anchor,duration:void 0!==h.duration?h.duration:1e3,easing:h.easing||Ji,callback:e};if(h.center&&(c.sourceCenter=o,c.targetCenter=h.center.slice(),o=c.targetCenter),void 0!==h.zoom?(c.sourceResolution=a,c.targetResolution=this.getResolutionForZoom(h.zoom),a=c.targetResolution):h.resolution&&(c.sourceResolution=a,c.targetResolution=h.resolution,a=c.targetResolution),void 0!==h.rotation){c.sourceRotation=s;var p=Ht(h.rotation-s+Math.PI,2*Math.PI)-Math.PI;c.targetRotation=s+p,s=c.targetRotation}ro(c)?c.complete=!0:i+=c.duration,u.push(c)}this.animations_.push(u),this.setHint(Li,1),this.updateAnimations_()},e.prototype.getAnimating=function(){return this.hints_[Li]>0},e.prototype.getInteracting=function(){return this.hints_[Mi]>0},e.prototype.cancelAnimations=function(){this.setHint(Li,-this.hints_[Li]);for(var t=0,e=this.animations_.length;t<e;++t){var r=this.animations_[t];r[0].callback&&eo(r[0].callback,!1)}this.animations_.length=0},e.prototype.updateAnimations_=function(){if(void 0!==this.updateAnimationKey_&&(cancelAnimationFrame(this.updateAnimationKey_),this.updateAnimationKey_=void 0),this.getAnimating()){for(var t=Date.now(),e=!1,r=this.animations_.length-1;r>=0;--r){for(var n=this.animations_[r],i=!0,o=0,a=n.length;o<a;++o){var s=n[o];if(!s.complete){var u=t-s.start,l=s.duration>0?u/s.duration:1;l>=1?(s.complete=!0,l=1):i=!1;var h=s.easing(l);if(s.sourceCenter){var c=s.sourceCenter[0],p=s.sourceCenter[1],f=c+h*(s.targetCenter[0]-c),d=p+h*(s.targetCenter[1]-p);this.targetCenter_=[f,d]}if(s.sourceResolution&&s.targetResolution){var _=1===h?s.targetResolution:s.sourceResolution+h*(s.targetResolution-s.sourceResolution);if(s.anchor){var g=this.getSizeFromViewport_(this.getRotation()),y=this.constraints_.resolution(_,0,g,!0);this.targetCenter_=this.calculateCenterZoom(y,s.anchor)}this.targetResolution_=_,this.applyTargetState_(!0)}if(void 0!==s.sourceRotation&&void 0!==s.targetRotation){var v=1===h?Ht(s.targetRotation+Math.PI,2*Math.PI)-Math.PI:s.sourceRotation+h*(s.targetRotation-s.sourceRotation);if(s.anchor){var m=this.constraints_.rotation(v,!0);this.targetCenter_=this.calculateCenterRotate(m,s.anchor)}this.targetRotation_=v}if(this.applyTargetState_(!0),e=!0,!s.complete)break}}if(i){this.animations_[r]=null,this.setHint(Li,-1);var E=n[0].callback;E&&eo(E,!0)}}this.animations_=this.animations_.filter(Boolean),e&&void 0===this.updateAnimationKey_&&(this.updateAnimationKey_=requestAnimationFrame(this.updateAnimations_)),this.getAnimating()||setTimeout(this.resolveConstraints.bind(this),0)}},e.prototype.calculateCenterRotate=function(t,e){var r,n=this.getCenter();return void 0!==n&&(Bi(r=[n[0]-e[0],n[1]-e[1]],t-this.getRotation()),ki(r,e)),r},e.prototype.calculateCenterZoom=function(t,e){var r,n=this.getCenter(),i=this.getResolution();void 0!==n&&void 0!==i&&(r=[e[0]-t*(e[0]-n[0])/i,e[1]-t*(e[1]-n[1])/i]);return r},e.prototype.getSizeFromViewport_=function(t){var e=[100,100],r='.ol-viewport[data-view="'+o(this)+'"]',n=document.querySelector(r);if(n){var i=getComputedStyle(n);e[0]=parseInt(i.width,10),e[1]=parseInt(i.height,10)}if(t){var a=e[0],s=e[1];e[0]=Math.abs(a*Math.cos(t))+Math.abs(s*Math.sin(t)),e[1]=Math.abs(a*Math.sin(t))+Math.abs(s*Math.cos(t))}return e},e.prototype.getCenter=function(){return this.get(Fi)},e.prototype.getConstraints=function(){return this.constraints_},e.prototype.getHints=function(t){return void 0!==t?(t[0]=this.hints_[0],t[1]=this.hints_[1],t):this.hints_.slice()},e.prototype.calculateExtent=function(t){var e=t||this.getSizeFromViewport_(),r=this.getCenter();W(r,1);var n=this.getResolution();W(void 0!==n,2);var i=this.getRotation();return W(void 0!==i,3),It(r,n,i,e)},e.prototype.getMaxResolution=function(){return this.maxResolution_},e.prototype.getMinResolution=function(){return this.minResolution_},e.prototype.getMaxZoom=function(){return this.getZoomForResolution(this.minResolution_)},e.prototype.setMaxZoom=function(t){this.applyOptions_(this.getUpdatedOptions_({maxZoom:t}))},e.prototype.getMinZoom=function(){return this.getZoomForResolution(this.maxResolution_)},e.prototype.setMinZoom=function(t){this.applyOptions_(this.getUpdatedOptions_({minZoom:t}))},e.prototype.setConstrainResolution=function(t){this.applyOptions_(this.getUpdatedOptions_({constrainResolution:t}))},e.prototype.getProjection=function(){return this.projection_},e.prototype.getResolution=function(){return this.get(Ai)},e.prototype.getResolutions=function(){return this.resolutions_},e.prototype.getResolutionForExtent=function(t,e){var r=e||this.getSizeFromViewport_(),n=Nt(t)/r[0],i=Lt(t)/r[1];return Math.max(n,i)},e.prototype.getResolutionForValueFunction=function(t){var e=t||2,r=this.maxResolution_,n=this.minResolution_,i=Math.log(r/n)/Math.log(e);return function(t){return r/Math.pow(e,t*i)}},e.prototype.getRotation=function(){return this.get(Ni)},e.prototype.getValueForResolutionFunction=function(t){var e=t||2,r=this.maxResolution_,n=this.minResolution_,i=Math.log(r/n)/Math.log(e);return function(t){return Math.log(r/t)/Math.log(e)/i}},e.prototype.getState=function(t){var e=this.getCenter(),r=this.getProjection(),n=this.getResolution(),i=n/t,o=this.getRotation();return{center:[Math.round(e[0]/i)*i,Math.round(e[1]/i)*i],projection:void 0!==r?r:null,resolution:n,rotation:o,zoom:this.getZoom()}},e.prototype.getZoom=function(){var t,e=this.getResolution();return void 0!==e&&(t=this.getZoomForResolution(e)),t},e.prototype.getZoomForResolution=function(t){var e,r,n=this.minZoom_||0;if(this.resolutions_){var i=J(this.resolutions_,t,1);n=i,e=this.resolutions_[i],r=i==this.resolutions_.length-1?2:e/this.resolutions_[i+1]}else e=this.maxResolution_,r=this.zoomFactor_;return n+Math.log(e/t)/Math.log(r)},e.prototype.getResolutionForZoom=function(t){if(this.resolutions_){if(this.resolutions_.length<=1)return 0;var e=Bt(Math.floor(t),0,this.resolutions_.length-2),r=this.resolutions_[e]/this.resolutions_[e+1];return this.resolutions_[e]/Math.pow(r,Bt(t-e,0,1))}return this.maxResolution_/Math.pow(this.zoomFactor_,t-this.minZoom_)},e.prototype.fit=function(t,e){var r,n=e||{},i=n.size;i||(i=this.getSizeFromViewport_()),W(Array.isArray(t)||"function"==typeof t.getSimplifiedGeometry,24),Array.isArray(t)?(W(!Dt(t),25),r=zr(t)):t.getType()===Yt.CIRCLE?(r=zr(t=t.getExtent())).rotate(this.getRotation(),Pt(t)):r=t;var o,a=void 0!==n.padding?n.padding:[0,0,0,0],s=void 0!==n.nearest&&n.nearest;o=void 0!==n.minResolution?n.minResolution:void 0!==n.maxZoom?this.getResolutionForZoom(n.maxZoom):0;for(var u=r.getFlatCoordinates(),l=this.getRotation(),h=Math.cos(-l),c=Math.sin(-l),p=1/0,f=1/0,d=-1/0,_=-1/0,g=r.getStride(),y=0,v=u.length;y<v;y+=g){var m=u[y]*h-u[y+1]*c,E=u[y]*c+u[y+1]*h;p=Math.min(p,m),f=Math.min(f,E),d=Math.max(d,m),_=Math.max(_,E)}var T=this.getResolutionForExtent([p,f,d,_],[i[0]-a[1]-a[3],i[1]-a[0]-a[2]]);T=isNaN(T)?o:Math.max(T,o),T=this.getConstrainedResolution(T,s?0:1),c=-c;var S=(p+d)/2,w=(f+_)/2,x=[(S+=(a[1]-a[3])/2*T)*h-(w+=(a[0]-a[2])/2*T)*c,w*h+S*c],O=n.callback?n.callback:P;void 0!==n.duration?this.animate({resolution:T,center:this.getConstrainedCenter(x,T),duration:n.duration,easing:n.easing},O):(this.targetResolution_=T,this.targetCenter_=x,this.applyTargetState_(!1,!0),eo(O,!0))},e.prototype.centerOn=function(t,e,r){var n=this.getRotation(),i=Math.cos(-n),o=Math.sin(-n),a=t[0]*i-t[1]*o,s=t[1]*i+t[0]*o,u=this.getResolution(),l=(a+=(e[0]/2-r[0])*u)*i-(s+=(r[1]-e[1]/2)*u)*(o=-o),h=s*i+a*o;this.setCenter([l,h])},e.prototype.isDef=function(){return!!this.getCenter()&&void 0!==this.getResolution()},e.prototype.adjustCenter=function(t){var e=this.targetCenter_;this.setCenter([e[0]+t[0],e[1]+t[1]])},e.prototype.adjustResolution=function(t,e){var r=this.getAnimating()||this.getInteracting(),n=this.getSizeFromViewport_(this.getRotation()),i=this.constraints_.resolution(this.targetResolution_*t,0,n,r);void 0!==e&&(this.targetCenter_=this.calculateCenterZoom(i,e)),this.targetResolution_*=t,this.applyTargetState_()},e.prototype.adjustZoom=function(t,e){this.adjustResolution(Math.pow(this.zoomFactor_,-t),e)},e.prototype.adjustRotation=function(t,e){var r=this.getAnimating()||this.getInteracting(),n=this.constraints_.rotation(this.targetRotation_+t,r);void 0!==e&&(this.targetCenter_=this.calculateCenterRotate(n,e)),this.targetRotation_+=t,this.applyTargetState_()},e.prototype.setCenter=function(t){this.targetCenter_=t,this.applyTargetState_()},e.prototype.setHint=function(t,e){return this.hints_[t]+=e,this.changed(),this.hints_[t]},e.prototype.setResolution=function(t){this.targetResolution_=t,this.applyTargetState_()},e.prototype.setRotation=function(t){this.targetRotation_=t,this.applyTargetState_()},e.prototype.setZoom=function(t){this.setResolution(this.getResolutionForZoom(t))},e.prototype.applyTargetState_=function(t,e){var r=this.getAnimating()||this.getInteracting()||e,n=this.constraints_.rotation(this.targetRotation_,r),i=this.getSizeFromViewport_(n),o=this.constraints_.resolution(this.targetResolution_,0,i,r),a=this.constraints_.center(this.targetCenter_,o,i,r);this.get(Ni)!==n&&this.set(Ni,n),this.get(Ai)!==o&&this.set(Ai,o),this.get(Fi)&&Xi(this.get(Fi),a)||this.set(Fi,a),this.getAnimating()&&!t&&this.cancelAnimations()},e.prototype.resolveConstraints=function(t,e,r){var n=void 0!==t?t:200,i=e||0,o=this.constraints_.rotation(this.targetRotation_),a=this.getSizeFromViewport_(o),s=this.constraints_.resolution(this.targetResolution_,i,a),u=this.constraints_.center(this.targetCenter_,s,a);if(0===n)return this.targetResolution_=s,this.targetRotation_=o,this.targetCenter_=u,void this.applyTargetState_();this.getResolution()===s&&this.getRotation()===o&&this.getCenter()&&Xi(this.getCenter(),u)||(this.getAnimating()&&this.cancelAnimations(),this.animate({rotation:o,center:u,resolution:s,duration:n,easing:qi,anchor:r}))},e.prototype.beginInteraction=function(){this.setHint(Mi,1)},e.prototype.endInteraction=function(t,e,r){this.setHint(Mi,-1),this.resolveConstraints(t,e,r)},e.prototype.getConstrainedCenter=function(t,e){var r=this.getSizeFromViewport_(this.getRotation());return this.constraints_.center(t,e||this.getResolution(),r)},e.prototype.getConstrainedZoom=function(t,e){var r=this.getResolutionForZoom(t);return this.getZoomForResolution(this.getConstrainedResolution(r))},e.prototype.getConstrainedResolution=function(t,e){var r=e||0,n=this.getSizeFromViewport_(this.getRotation());return this.constraints_.resolution(t,r,n)},e}(Y);function io(t,e){var r=document.createElement("canvas");return t&&(r.width=t),e&&(r.height=e),r.getContext("2d")}function oo(t){var e=t.offsetWidth,r=getComputedStyle(t);return e+=parseInt(r.marginLeft,10)+parseInt(r.marginRight,10)}function ao(t){var e=t.offsetHeight,r=getComputedStyle(t);return e+=parseInt(r.marginTop,10)+parseInt(r.marginBottom,10)}function so(t,e){var r=e.parentNode;r&&r.replaceChild(t,e)}function uo(t){return t&&t.parentNode?t.parentNode.removeChild(t):null}function lo(t){for(;t.lastChild;)t.removeChild(t.lastChild)}var ho={OPACITY:"opacity",VISIBLE:"visible",EXTENT:"extent",Z_INDEX:"zIndex",MAX_RESOLUTION:"maxResolution",MIN_RESOLUTION:"minResolution",SOURCE:"source"},co=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),po=function(t){function e(e){var r=t.call(this)||this,n=p({},e);return n[ho.OPACITY]=void 0!==e.opacity?e.opacity:1,n[ho.VISIBLE]=void 0===e.visible||e.visible,n[ho.Z_INDEX]=e.zIndex,n[ho.MAX_RESOLUTION]=void 0!==e.maxResolution?e.maxResolution:1/0,n[ho.MIN_RESOLUTION]=void 0!==e.minResolution?e.minResolution:0,r.className_=void 0!==n.className?e.className:"ol-layer",delete n.className,r.setProperties(n),r.state_=null,r}return co(e,t),e.prototype.getClassName=function(){return this.className_},e.prototype.getLayerState=function(){var t=this.state_||{layer:this,managed:!0};return t.opacity=Bt(Math.round(100*this.getOpacity())/100,0,1),t.sourceState=this.getSourceState(),t.visible=this.getVisible(),t.extent=this.getExtent(),t.zIndex=this.getZIndex()||0,t.maxResolution=this.getMaxResolution(),t.minResolution=Math.max(this.getMinResolution(),0),this.state_=t,t},e.prototype.getLayersArray=function(t){return n()},e.prototype.getLayerStatesArray=function(t){return n()},e.prototype.getExtent=function(){return this.get(ho.EXTENT)},e.prototype.getMaxResolution=function(){return this.get(ho.MAX_RESOLUTION)},e.prototype.getMinResolution=function(){return this.get(ho.MIN_RESOLUTION)},e.prototype.getOpacity=function(){return this.get(ho.OPACITY)},e.prototype.getSourceState=function(){return n()},e.prototype.getVisible=function(){return this.get(ho.VISIBLE)},e.prototype.getZIndex=function(){return this.get(ho.Z_INDEX)},e.prototype.setExtent=function(t){this.set(ho.EXTENT,t)},e.prototype.setMaxResolution=function(t){this.set(ho.MAX_RESOLUTION,t)},e.prototype.setMinResolution=function(t){this.set(ho.MIN_RESOLUTION,t)},e.prototype.setOpacity=function(t){this.set(ho.OPACITY,t)},e.prototype.setVisible=function(t){this.set(ho.VISIBLE,t)},e.prototype.setZIndex=function(t){this.set(ho.Z_INDEX,t)},e}(Y),fo={UNDEFINED:"undefined",LOADING:"loading",READY:"ready",ERROR:"error"},_o=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),go={LAYERS:"layers"},yo=function(t){function e(e){var r=this,n=e||{},i=p({},n);delete i.layers;var o=n.layers;return(r=t.call(this,i)||this).layersListenerKeys_=[],r.listenerKeys_={},E(r,U(go.LAYERS),r.handleLayersChanged_,r),o?Array.isArray(o)?o=new V(o.slice(),{unique:!0}):W("function"==typeof o.getArray,43):o=new V(void 0,{unique:!0}),r.setLayers(o),r}return _o(e,t),e.prototype.handleLayerChange_=function(){this.changed()},e.prototype.handleLayersChanged_=function(){this.layersListenerKeys_.forEach(w),this.layersListenerKeys_.length=0;var t=this.getLayers();for(var e in this.layersListenerKeys_.push(E(t,h.ADD,this.handleLayersAdd_,this),E(t,h.REMOVE,this.handleLayersRemove_,this)),this.listenerKeys_)this.listenerKeys_[e].forEach(w);f(this.listenerKeys_);for(var r=t.getArray(),n=0,i=r.length;n<i;n++){var a=r[n];this.listenerKeys_[o(a)]=[E(a,c,this.handleLayerChange_,this),E(a,F.CHANGE,this.handleLayerChange_,this)]}this.changed()},e.prototype.handleLayersAdd_=function(t){var e=t.element;this.listenerKeys_[o(e)]=[E(e,c,this.handleLayerChange_,this),E(e,F.CHANGE,this.handleLayerChange_,this)],this.changed()},e.prototype.handleLayersRemove_=function(t){var e=o(t.element);this.listenerKeys_[e].forEach(w),delete this.listenerKeys_[e],this.changed()},e.prototype.getLayers=function(){return this.get(go.LAYERS)},e.prototype.setLayers=function(t){this.set(go.LAYERS,t)},e.prototype.getLayersArray=function(t){var e=void 0!==t?t:[];return this.getLayers().forEach(function(t){t.getLayersArray(e)}),e},e.prototype.getLayerStatesArray=function(t){var e=void 0!==t?t:[],r=e.length;this.getLayers().forEach(function(t){t.getLayerStatesArray(e)});for(var n=this.getLayerState(),i=r,o=e.length;i<o;i++){var a=e[i];a.opacity*=n.opacity,a.visible=a.visible&&n.visible,a.maxResolution=Math.min(a.maxResolution,n.maxResolution),a.minResolution=Math.max(a.minResolution,n.minResolution),void 0!==n.extent&&(void 0!==a.extent?a.extent=Mt(a.extent,n.extent):a.extent=n.extent)}return e},e.prototype.getSourceState=function(){return fo.READY},e}(po);function vo(t,e,r){return void 0===r&&(r=[0,0]),r[0]=t[0]+2*e,r[1]=t[1]+2*e,r}function mo(t,e,r){return void 0===r&&(r=[0,0]),r[0]=t[0]*e+.5|0,r[1]=t[1]*e+.5|0,r}function Eo(t,e){return Array.isArray(t)?t:(void 0===e?e=[t,t]:e[0]=e[1]=t,e)}var To=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}();var So=function(t){function e(e){var r=t.call(this)||this,n=function(t){var e=null;void 0!==t.keyboardEventTarget&&(e="string"==typeof t.keyboardEventTarget?document.getElementById(t.keyboardEventTarget):t.keyboardEventTarget);var r,n,i,o={},a=t.layers&&"function"==typeof t.layers.getLayers?t.layers:new yo({layers:t.layers});o[fi.LAYERGROUP]=a,o[fi.TARGET]=t.target,o[fi.VIEW]=void 0!==t.view?t.view:new no,void 0!==t.controls&&(Array.isArray(t.controls)?r=new V(t.controls.slice()):(W("function"==typeof t.controls.getArray,47),r=t.controls));void 0!==t.interactions&&(Array.isArray(t.interactions)?n=new V(t.interactions.slice()):(W("function"==typeof t.interactions.getArray,48),n=t.interactions));void 0!==t.overlays?Array.isArray(t.overlays)?i=new V(t.overlays.slice()):(W("function"==typeof t.overlays.getArray,49),i=t.overlays):i=new V;return{controls:r,interactions:n,keyboardEventTarget:e,overlays:i,values:o}}(e);for(var i in r.maxTilesLoading_=void 0!==e.maxTilesLoading?e.maxTilesLoading:16,r.pixelRatio_=void 0!==e.pixelRatio?e.pixelRatio:Qr,r.animationDelayKey_,r.animationDelay_=function(){this.animationDelayKey_=void 0,this.renderFrame_(Date.now())}.bind(r),r.coordinateToPixelTransform_=[1,0,0,1,0,0],r.pixelToCoordinateTransform_=[1,0,0,1,0,0],r.frameIndex_=0,r.frameState_=null,r.previousExtent_=null,r.viewPropertyListenerKey_=null,r.viewChangeListenerKey_=null,r.layerGroupPropertyListenerKeys_=null,r.viewport_=document.createElement("div"),r.viewport_.className="ol-viewport"+(tn?" ol-touch":""),r.viewport_.style.position="relative",r.viewport_.style.overflow="hidden",r.viewport_.style.width="100%",r.viewport_.style.height="100%",r.viewport_.style.msTouchAction="none",r.viewport_.style.touchAction="none",r.overlayContainer_=document.createElement("div"),r.overlayContainer_.style.position="absolute",r.overlayContainer_.style.zIndex="0",r.overlayContainer_.style.width="100%",r.overlayContainer_.style.height="100%",r.overlayContainer_.className="ol-overlaycontainer",r.viewport_.appendChild(r.overlayContainer_),r.overlayContainerStopEvent_=document.createElement("div"),r.overlayContainerStopEvent_.style.position="absolute",r.overlayContainerStopEvent_.style.zIndex="0",r.overlayContainerStopEvent_.style.width="100%",r.overlayContainerStopEvent_.style.height="100%",r.overlayContainerStopEvent_.className="ol-overlaycontainer-stopevent",r.viewport_.appendChild(r.overlayContainerStopEvent_),r.mapBrowserEventHandler_=new li(r,e.moveTolerance),fn)E(r.mapBrowserEventHandler_,fn[i],r.handleMapBrowserEvent,r);return r.keyboardEventTarget_=n.keyboardEventTarget,r.keyHandlerKeys_=null,E(r.viewport_,F.CONTEXTMENU,r.handleBrowserEvent,r),E(r.viewport_,F.WHEEL,r.handleBrowserEvent,r),E(r.viewport_,F.MOUSEWHEEL,r.handleBrowserEvent,r),r.controls=n.controls||new V,r.interactions=n.interactions||new V,r.overlays_=n.overlays,r.overlayIdIndex_={},r.renderer_=r.createRenderer(),r.handleResize_,r.focus_=null,r.postRenderFunctions_=[],r.tileQueue_=new Si(r.getTilePriority.bind(r),r.handleTileChange_.bind(r)),r.skippedFeatureUids_={},E(r,U(fi.LAYERGROUP),r.handleLayerGroupChanged_,r),E(r,U(fi.VIEW),r.handleViewChanged_,r),E(r,U(fi.SIZE),r.handleSizeChanged_,r),E(r,U(fi.TARGET),r.handleTargetChanged_,r),r.setProperties(n.values),r.controls.forEach(function(t){t.setMap(this)}.bind(r)),E(r.controls,h.ADD,function(t){t.element.setMap(this)},r),E(r.controls,h.REMOVE,function(t){t.element.setMap(null)},r),r.interactions.forEach(function(t){t.setMap(this)}.bind(r)),E(r.interactions,h.ADD,function(t){t.element.setMap(this)},r),E(r.interactions,h.REMOVE,function(t){t.element.setMap(null)},r),r.overlays_.forEach(r.addOverlayInternal_.bind(r)),E(r.overlays_,h.ADD,function(t){this.addOverlayInternal_(t.element)},r),E(r.overlays_,h.REMOVE,function(t){var e=t.element.getId();void 0!==e&&delete this.overlayIdIndex_[e.toString()],t.element.setMap(null)},r),r}return To(e,t),e.prototype.createRenderer=function(){throw new Error("Use a map type that has a createRenderer method")},e.prototype.addControl=function(t){this.getControls().push(t)},e.prototype.addInteraction=function(t){this.getInteractions().push(t)},e.prototype.addLayer=function(t){this.getLayerGroup().getLayers().push(t)},e.prototype.addOverlay=function(t){this.getOverlays().push(t)},e.prototype.addOverlayInternal_=function(t){var e=t.getId();void 0!==e&&(this.overlayIdIndex_[e.toString()]=t),t.setMap(this)},e.prototype.disposeInternal=function(){this.mapBrowserEventHandler_.dispose(),S(this.viewport_,F.CONTEXTMENU,this.handleBrowserEvent,this),S(this.viewport_,F.WHEEL,this.handleBrowserEvent,this),S(this.viewport_,F.MOUSEWHEEL,this.handleBrowserEvent,this),void 0!==this.handleResize_&&(removeEventListener(F.RESIZE,this.handleResize_,!1),this.handleResize_=void 0),this.animationDelayKey_&&(cancelAnimationFrame(this.animationDelayKey_),this.animationDelayKey_=void 0),this.setTarget(null),t.prototype.disposeInternal.call(this)},e.prototype.forEachFeatureAtPixel=function(t,e,r){if(this.frameState_){var n=this.getCoordinateFromPixel(t),i=void 0!==(r=void 0!==r?r:{}).hitTolerance?r.hitTolerance*this.frameState_.pixelRatio:0,o=void 0!==r.layerFilter?r.layerFilter:C;return this.renderer_.forEachFeatureAtCoordinate(n,this.frameState_,i,e,null,o,null)}},e.prototype.getFeaturesAtPixel=function(t,e){var r=null;return this.forEachFeatureAtPixel(t,function(t){r||(r=[]),r.push(t)},e),r},e.prototype.forEachLayerAtPixel=function(t,e,r){if(this.frameState_){var n=r||{},i=void 0!==n.hitTolerance?r.hitTolerance*this.frameState_.pixelRatio:0,o=n.layerFilter||C;return this.renderer_.forEachLayerAtPixel(t,this.frameState_,i,e,o)}},e.prototype.hasFeatureAtPixel=function(t,e){if(!this.frameState_)return!1;var r=this.getCoordinateFromPixel(t),n=void 0!==(e=void 0!==e?e:{}).layerFilter?e.layerFilter:C,i=void 0!==e.hitTolerance?e.hitTolerance*this.frameState_.pixelRatio:0;return this.renderer_.hasFeatureAtCoordinate(r,this.frameState_,i,n,null)},e.prototype.getEventCoordinate=function(t){return this.getCoordinateFromPixel(this.getEventPixel(t))},e.prototype.getEventPixel=function(t){var e=this.viewport_.getBoundingClientRect(),r="changedTouches"in t?t.changedTouches[0]:t;return[r.clientX-e.left,r.clientY-e.top]},e.prototype.getTarget=function(){return this.get(fi.TARGET)},e.prototype.getTargetElement=function(){var t=this.getTarget();return void 0!==t?"string"==typeof t?document.getElementById(t):t:null},e.prototype.getCoordinateFromPixel=function(t){var e=this.frameState_;return e?Ve(e.pixelToCoordinateTransform,t.slice()):null},e.prototype.getControls=function(){return this.controls},e.prototype.getOverlays=function(){return this.overlays_},e.prototype.getOverlayById=function(t){var e=this.overlayIdIndex_[t.toString()];return void 0!==e?e:null},e.prototype.getInteractions=function(){return this.interactions},e.prototype.getLayerGroup=function(){return this.get(fi.LAYERGROUP)},e.prototype.getLayers=function(){return this.getLayerGroup().getLayers()},e.prototype.getPixelFromCoordinate=function(t){var e=this.frameState_;return e?Ve(e.coordinateToPixelTransform,t.slice(0,2)):null},e.prototype.getRenderer=function(){return this.renderer_},e.prototype.getSize=function(){return this.get(fi.SIZE)},e.prototype.getView=function(){return this.get(fi.VIEW)},e.prototype.getViewport=function(){return this.viewport_},e.prototype.getOverlayContainer=function(){return this.overlayContainer_},e.prototype.getOverlayContainerStopEvent=function(){return this.overlayContainerStopEvent_},e.prototype.getTilePriority=function(t,e,r,n){var i=this.frameState_;if(!(i&&e in i.wantedTiles))return 1/0;if(!i.wantedTiles[e][t.getKey()])return 1/0;var o=r[0]-i.focus[0],a=r[1]-i.focus[1];return 65536*Math.log(n)+Math.sqrt(o*o+a*a)/n},e.prototype.handleBrowserEvent=function(t,e){var r=e||t.type,n=new pn(r,this,t);this.handleMapBrowserEvent(n)},e.prototype.handleMapBrowserEvent=function(t){if(this.frameState_){for(var e=t.originalEvent.target;e instanceof HTMLElement;){if(e.parentElement===this.overlayContainerStopEvent_)return;e=e.parentElement}this.focus_=t.coordinate,t.frameState=this.frameState_;var r=this.getInteractions().getArray();if(!1!==this.dispatchEvent(t))for(var n=r.length-1;n>=0;n--){var i=r[n];if(i.getActive())if(!i.handleEvent(t))break}}},e.prototype.handlePostRender=function(){var t=this.frameState_,e=this.tileQueue_;if(!e.isEmpty()){var r=this.maxTilesLoading_,n=r;if(t){var i=t.viewHints;if(i[Li]||i[Mi]){var o=Date.now()-t.time>8;r=o?0:8,n=o?0:2}}e.getTilesLoading()<r&&(e.reprioritize(),e.loadMoreTiles(r,n))}!t||!this.hasListener(vi)||t.animate||this.tileQueue_.getTilesLoading()||function t(e){for(var r=0,n=e.length;r<n;++r){var i=e[r];if("function"==typeof i.getLayers)return t(i.getLayers().getArray());var o=i.getSource();if(o&&o.loading)return!0}return!1}(this.getLayers().getArray())||this.renderer_.dispatchRenderEvent(vi,t);for(var a=this.postRenderFunctions_,s=0,u=a.length;s<u;++s)a[s](this,t);a.length=0},e.prototype.handleSizeChanged_=function(){this.getView()&&this.getView().resolveConstraints(0),this.render()},e.prototype.handleTargetChanged_=function(){var t;if(this.getTarget()&&(t=this.getTargetElement()),this.keyHandlerKeys_){for(var e=0,r=this.keyHandlerKeys_.length;e<r;++e)w(this.keyHandlerKeys_[e]);this.keyHandlerKeys_=null}if(t){t.appendChild(this.viewport_);var n=this.keyboardEventTarget_?this.keyboardEventTarget_:t;this.keyHandlerKeys_=[E(n,F.KEYDOWN,this.handleBrowserEvent,this),E(n,F.KEYPRESS,this.handleBrowserEvent,this)],this.handleResize_||(this.handleResize_=this.updateSize.bind(this),addEventListener(F.RESIZE,this.handleResize_,!1))}else this.renderer_.removeLayerRenderers(),uo(this.viewport_),void 0!==this.handleResize_&&(removeEventListener(F.RESIZE,this.handleResize_,!1),this.handleResize_=void 0);this.updateSize()},e.prototype.handleTileChange_=function(){this.render()},e.prototype.handleViewPropertyChanged_=function(){this.render()},e.prototype.handleViewChanged_=function(){this.viewPropertyListenerKey_&&(w(this.viewPropertyListenerKey_),this.viewPropertyListenerKey_=null),this.viewChangeListenerKey_&&(w(this.viewChangeListenerKey_),this.viewChangeListenerKey_=null);var t=this.getView();t&&(this.viewport_.setAttribute("data-view",o(t)),this.viewPropertyListenerKey_=E(t,c,this.handleViewPropertyChanged_,this),this.viewChangeListenerKey_=E(t,F.CHANGE,this.handleViewPropertyChanged_,this),t.resolveConstraints(0)),this.render()},e.prototype.handleLayerGroupChanged_=function(){this.layerGroupPropertyListenerKeys_&&(this.layerGroupPropertyListenerKeys_.forEach(w),this.layerGroupPropertyListenerKeys_=null);var t=this.getLayerGroup();t&&(this.layerGroupPropertyListenerKeys_=[E(t,c,this.render,this),E(t,F.CHANGE,this.render,this)]),this.render()},e.prototype.isRendered=function(){return!!this.frameState_},e.prototype.renderSync=function(){this.animationDelayKey_&&cancelAnimationFrame(this.animationDelayKey_),this.animationDelay_()},e.prototype.render=function(){void 0===this.animationDelayKey_&&(this.animationDelayKey_=requestAnimationFrame(this.animationDelay_))},e.prototype.removeControl=function(t){return this.getControls().remove(t)},e.prototype.removeInteraction=function(t){return this.getInteractions().remove(t)},e.prototype.removeLayer=function(t){return this.getLayerGroup().getLayers().remove(t)},e.prototype.removeOverlay=function(t){return this.getOverlays().remove(t)},e.prototype.renderFrame_=function(t){var e,r=this.getSize(),n=this.getView(),i=[1/0,1/0,-1/0,-1/0],o=this.frameState_,a=null;if(void 0!==r&&function(t){return t[0]>0&&t[1]>0}(r)&&n&&n.isDef()){var s=n.getHints(this.frameState_?this.frameState_.viewHints:void 0);e=n.getState(this.pixelRatio_),a={animate:!1,coordinateToPixelTransform:this.coordinateToPixelTransform_,extent:i,focus:this.focus_?this.focus_:e.center,index:this.frameIndex_++,layerStatesArray:this.getLayerGroup().getLayerStatesArray(),pixelRatio:this.pixelRatio_,pixelToCoordinateTransform:this.pixelToCoordinateTransform_,postRenderFunctions:[],size:r,skippedFeatureUids:this.skippedFeatureUids_,tileQueue:this.tileQueue_,time:t,usedTiles:{},viewState:e,viewHints:s,wantedTiles:{}}}if(a&&(a.extent=It(e.center,e.resolution,e.rotation,a.size,i)),this.frameState_=a,this.renderer_.renderFrame(a),a){if(a.animate&&this.render(),Array.prototype.push.apply(this.postRenderFunctions_,a.postRenderFunctions),o)(!this.previousExtent_||!Dt(this.previousExtent_)&&!vt(a.extent,this.previousExtent_))&&(this.dispatchEvent(new hn(ci,this,o)),this.previousExtent_=_t(this.previousExtent_));this.previousExtent_&&!a.viewHints[Li]&&!a.viewHints[Mi]&&!vt(a.extent,this.previousExtent_)&&(this.dispatchEvent(new hn(pi,this,a)),st(a.extent,this.previousExtent_))}this.dispatchEvent(new hn(hi,this,a)),setTimeout(this.handlePostRender.bind(this),0)},e.prototype.setLayerGroup=function(t){this.set(fi.LAYERGROUP,t)},e.prototype.setSize=function(t){this.set(fi.SIZE,t)},e.prototype.setTarget=function(t){this.set(fi.TARGET,t)},e.prototype.setView=function(t){this.set(fi.VIEW,t)},e.prototype.skipFeature=function(t){this.skippedFeatureUids_[o(t)]=!0,this.render()},e.prototype.updateSize=function(){var t=this.getTargetElement();if(t){var e=getComputedStyle(t);this.setSize([t.offsetWidth-parseFloat(e.borderLeftWidth)-parseFloat(e.paddingLeft)-parseFloat(e.paddingRight)-parseFloat(e.borderRightWidth),t.offsetHeight-parseFloat(e.borderTopWidth)-parseFloat(e.paddingTop)-parseFloat(e.paddingBottom)-parseFloat(e.borderBottomWidth)])}else this.setSize(void 0)},e.prototype.unskipFeature=function(t){delete this.skippedFeatureUids_[o(t)],this.render()},e}(Y);var wo,xo,Oo=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),Co=function(t){function e(e){var r=t.call(this)||this;return r.element=e.element?e.element:null,r.target_=null,r.map_=null,r.listenerKeys=[],r.render=e.render?e.render:P,e.target&&r.setTarget(e.target),r}return Oo(e,t),e.prototype.disposeInternal=function(){uo(this.element),t.prototype.disposeInternal.call(this)},e.prototype.getMap=function(){return this.map_},e.prototype.setMap=function(t){this.map_&&uo(this.element);for(var e=0,r=this.listenerKeys.length;e<r;++e)w(this.listenerKeys[e]);(this.listenerKeys.length=0,this.map_=t,this.map_)&&((this.target_?this.target_:t.getOverlayContainerStopEvent()).appendChild(this.element),this.render!==P&&this.listenerKeys.push(E(t,hi,this.render,this)),t.render())},e.prototype.setTarget=function(t){this.target_="string"==typeof t?document.getElementById(t):t},e}(Y),Ro="ol-hidden",Po="ol-selectable",bo="ol-unselectable",Io="ol-unsupported",Lo="ol-control",Mo="ol-collapsed",Fo=(xo={},function(t){if(wo||(wo=document.createElement("div").style),!(t in xo)){wo.font=t;var e=wo.fontFamily;if(wo.font="",!e)return null;xo[t]=e.split(/,\s?/)}return xo[t]}),Ao=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}();function No(t,e){return t.visible&&e>=t.minResolution&&e<t.maxResolution}var Go=function(t){function e(e){var r=this,n=p({},e);delete n.source,(r=t.call(this,n)||this).mapPrecomposeKey_=null,r.mapRenderKey_=null,r.sourceChangeKey_=null,r.renderer_=null,e.map&&r.setMap(e.map),E(r,U(ho.SOURCE),r.handleSourcePropertyChange_,r);var i=e.source?e.source:null;return r.setSource(i),r}return Ao(e,t),e.prototype.getLayersArray=function(t){var e=t||[];return e.push(this),e},e.prototype.getLayerStatesArray=function(t){var e=t||[];return e.push(this.getLayerState()),e},e.prototype.getSource=function(){return this.get(ho.SOURCE)||null},e.prototype.getSourceState=function(){var t=this.getSource();return t?t.getState():fo.UNDEFINED},e.prototype.handleSourceChange_=function(){this.changed()},e.prototype.handleSourcePropertyChange_=function(){this.sourceChangeKey_&&(w(this.sourceChangeKey_),this.sourceChangeKey_=null);var t=this.getSource();t&&(this.sourceChangeKey_=E(t,F.CHANGE,this.handleSourceChange_,this)),this.changed()},e.prototype.render=function(t){var e=this.getRenderer(),r=this.getLayerState();if(e.prepareFrame(t,r))return e.renderFrame(t,r)},e.prototype.setMap=function(t){this.mapPrecomposeKey_&&(w(this.mapPrecomposeKey_),this.mapPrecomposeKey_=null),t||this.changed(),this.mapRenderKey_&&(w(this.mapRenderKey_),this.mapRenderKey_=null),t&&(this.mapPrecomposeKey_=E(t,gi,function(t){var e=t,r=this.getLayerState();r.managed=!1,void 0===this.getZIndex()&&(r.zIndex=1/0),e.frameState.layerStatesArray.push(r)},this),this.mapRenderKey_=E(this,F.CHANGE,t.render,t),this.changed())},e.prototype.setSource=function(t){this.set(ho.SOURCE,t)},e.prototype.getRenderer=function(){return this.renderer_||(this.renderer_=this.createRenderer()),this.renderer_},e.prototype.createRenderer=function(){return null},e}(po),Do=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}();function ko(t){this.updateElement_(t.frameState)}var jo=function(t){function e(e){var r=this,n=e||{};(r=t.call(this,{element:document.createElement("div"),render:n.render||ko,target:n.target})||this).ulElement_=document.createElement("ul"),r.collapsed_=void 0===n.collapsed||n.collapsed,r.overrideCollapsible_=void 0!==n.collapsible,r.collapsible_=void 0===n.collapsible||n.collapsible,r.collapsible_||(r.collapsed_=!1);var i=void 0!==n.className?n.className:"ol-attribution",o=void 0!==n.tipLabel?n.tipLabel:"Attributions",a=void 0!==n.collapseLabel?n.collapseLabel:"»";"string"==typeof a?(r.collapseLabel_=document.createElement("span"),r.collapseLabel_.textContent=a):r.collapseLabel_=a;var s=void 0!==n.label?n.label:"i";"string"==typeof s?(r.label_=document.createElement("span"),r.label_.textContent=s):r.label_=s;var u=r.collapsible_&&!r.collapsed_?r.collapseLabel_:r.label_,l=document.createElement("button");l.setAttribute("type","button"),l.title=o,l.appendChild(u),E(l,F.CLICK,r.handleClick_,r);var h=i+" "+bo+" "+Lo+(r.collapsed_&&r.collapsible_?" "+Mo:"")+(r.collapsible_?"":" ol-uncollapsible"),c=r.element;return c.className=h,c.appendChild(r.ulElement_),c.appendChild(l),r.renderedAttributions_=[],r.renderedVisible_=!0,r}return Do(e,t),e.prototype.collectSourceAttributions_=function(t){for(var e={},r=[],n=t.layerStatesArray,i=t.viewState.resolution,o=0,a=n.length;o<a;++o){var s=n[o];if(No(s,i)){var u=s.layer.getSource();if(u){var l=u.getAttributions();if(l){var h=l(t);if(h)if(this.overrideCollapsible_||!1!==u.getAttributionsCollapsible()||this.setCollapsible(!1),Array.isArray(h))for(var c=0,p=h.length;c<p;++c)h[c]in e||(r.push(h[c]),e[h[c]]=!0);else h in e||(r.push(h),e[h]=!0)}}}}return r},e.prototype.updateElement_=function(t){if(t){var e=this.collectSourceAttributions_(t),r=e.length>0;if(this.renderedVisible_!=r&&(this.element.style.display=r?"":"none",this.renderedVisible_=r),!et(e,this.renderedAttributions_)){lo(this.ulElement_);for(var n=0,i=e.length;n<i;++n){var o=document.createElement("li");o.innerHTML=e[n],this.ulElement_.appendChild(o)}this.renderedAttributions_=e}}else this.renderedVisible_&&(this.element.style.display="none",this.renderedVisible_=!1)},e.prototype.handleClick_=function(t){t.preventDefault(),this.handleToggle_()},e.prototype.handleToggle_=function(){this.element.classList.toggle(Mo),this.collapsed_?so(this.collapseLabel_,this.label_):so(this.label_,this.collapseLabel_),this.collapsed_=!this.collapsed_},e.prototype.getCollapsible=function(){return this.collapsible_},e.prototype.setCollapsible=function(t){this.collapsible_!==t&&(this.collapsible_=t,this.element.classList.toggle("ol-uncollapsible"),!t&&this.collapsed_&&this.handleToggle_())},e.prototype.setCollapsed=function(t){this.collapsible_&&this.collapsed_!==t&&this.handleToggle_()},e.prototype.getCollapsed=function(){return this.collapsed_},e}(Co),Uo=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}();function Yo(t){var e=t.frameState;if(e){var r=e.viewState.rotation;if(r!=this.rotation_){var n="rotate("+r+"rad)";if(this.autoHide_){var i=this.element.classList.contains(Ro);i||0!==r?i&&0!==r&&this.element.classList.remove(Ro):this.element.classList.add(Ro)}this.label_.style.transform=n}this.rotation_=r}}var Xo=function(t){function e(e){var r=this,n=e||{};r=t.call(this,{element:document.createElement("div"),render:n.render||Yo,target:n.target})||this;var i=void 0!==n.className?n.className:"ol-rotate",o=void 0!==n.label?n.label:"⇧";r.label_=null,"string"==typeof o?(r.label_=document.createElement("span"),r.label_.className="ol-compass",r.label_.textContent=o):(r.label_=o,r.label_.classList.add("ol-compass"));var a=n.tipLabel?n.tipLabel:"Reset rotation",s=document.createElement("button");s.className=i+"-reset",s.setAttribute("type","button"),s.title=a,s.appendChild(r.label_),E(s,F.CLICK,r.handleClick_,r);var u=i+" "+bo+" "+Lo,l=r.element;return l.className=u,l.appendChild(s),r.callResetNorth_=n.resetNorth?n.resetNorth:void 0,r.duration_=void 0!==n.duration?n.duration:250,r.autoHide_=void 0===n.autoHide||n.autoHide,r.rotation_=void 0,r.autoHide_&&r.element.classList.add(Ro),r}return Uo(e,t),e.prototype.handleClick_=function(t){t.preventDefault(),void 0!==this.callResetNorth_?this.callResetNorth_():this.resetNorth_()},e.prototype.resetNorth_=function(){var t=this.getMap().getView();t&&void 0!==t.getRotation()&&(this.duration_>0?t.animate({rotation:0,duration:this.duration_,easing:qi}):t.setRotation(0))},e}(Co),Bo=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),zo=function(t){function e(e){var r=this,n=e||{};r=t.call(this,{element:document.createElement("div"),target:n.target})||this;var i=void 0!==n.className?n.className:"ol-zoom",o=void 0!==n.delta?n.delta:1,a=void 0!==n.zoomInLabel?n.zoomInLabel:"+",s=void 0!==n.zoomOutLabel?n.zoomOutLabel:"−",u=void 0!==n.zoomInTipLabel?n.zoomInTipLabel:"Zoom in",l=void 0!==n.zoomOutTipLabel?n.zoomOutTipLabel:"Zoom out",h=document.createElement("button");h.className=i+"-in",h.setAttribute("type","button"),h.title=u,h.appendChild("string"==typeof a?document.createTextNode(a):a),E(h,F.CLICK,r.handleClick_.bind(r,o));var c=document.createElement("button");c.className=i+"-out",c.setAttribute("type","button"),c.title=l,c.appendChild("string"==typeof s?document.createTextNode(s):s),E(c,F.CLICK,r.handleClick_.bind(r,-o));var p=i+" "+bo+" "+Lo,f=r.element;return f.className=p,f.appendChild(h),f.appendChild(c),r.duration_=void 0!==n.duration?n.duration:250,r}return Bo(e,t),e.prototype.handleClick_=function(t,e){e.preventDefault(),this.zoomByDelta_(t)},e.prototype.zoomByDelta_=function(t){var e=this.getMap().getView();if(e){var r=e.getZoom();if(void 0!==r){var n=e.getConstrainedZoom(r+t);this.duration_>0?(e.getAnimating()&&e.cancelAnimations(),e.animate({zoom:n,duration:this.duration_,easing:qi})):e.setZoom(n)}}},e}(Co);function Vo(t){var e=t||{},r=new V;return(void 0===e.zoom||e.zoom)&&r.push(new zo(e.zoomOptions)),(void 0===e.rotate||e.rotate)&&r.push(new Xo(e.rotateOptions)),(void 0===e.attribution||e.attribution)&&r.push(new jo(e.attributionOptions)),r}var Wo={ACTIVE:"active"},Zo=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}();function Ko(t,e,r,n){var i=t.getZoom();if(void 0!==i){var o=t.getConstrainedZoom(i+e),a=t.getResolutionForZoom(o);t.getAnimating()&&t.cancelAnimations(),t.animate({resolution:a,anchor:r,duration:void 0!==n?n:250,easing:qi})}}var Ho=function(t){function e(e){var r=t.call(this)||this;return e.handleEvent&&(r.handleEvent=e.handleEvent),r.map_=null,r.setActive(!0),r}return Zo(e,t),e.prototype.getActive=function(){return this.get(Wo.ACTIVE)},e.prototype.getMap=function(){return this.map_},e.prototype.handleEvent=function(t){return!0},e.prototype.setActive=function(t){this.set(Wo.ACTIVE,t)},e.prototype.setMap=function(t){this.map_=t},e}(Y),qo=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}();function Jo(t){var e=!1;if(t.type==fn.DBLCLICK){var r=t.originalEvent,n=t.map,i=t.coordinate,o=r.shiftKey?-this.delta_:this.delta_;Ko(n.getView(),o,i,this.duration_),t.preventDefault(),e=!0}return!e}var Qo=function(t){function e(e){var r=t.call(this,{handleEvent:Jo})||this,n=e||{};return r.delta_=n.delta?n.delta:1,r.duration_=void 0!==n.duration?n.duration:250,r}return qo(e,t),e}(Ho),$o=function(t){var e=t.originalEvent;return e.altKey&&!(e.metaKey||e.ctrlKey)&&!e.shiftKey},ta=function(t){var e=t.originalEvent;return e.altKey&&!(e.metaKey||e.ctrlKey)&&e.shiftKey},ea=function(t){return t.target.getTargetElement()===document.activeElement},ra=C,na=function(t){var e=t.originalEvent;return 0==e.button&&!(qr&&Jr&&e.ctrlKey)},ia=R,oa=function(t){return"pointermove"==t.type},aa=function(t){return t.type==fn.SINGLECLICK},sa=function(t){var e=t.originalEvent;return!e.altKey&&!(e.metaKey||e.ctrlKey)&&!e.shiftKey},ua=function(t){var e=t.originalEvent;return!e.altKey&&!(e.metaKey||e.ctrlKey)&&e.shiftKey},la=function(t){var e=t.originalEvent.target.tagName;return"INPUT"!==e&&"SELECT"!==e&&"TEXTAREA"!==e},ha=function(t){var e=t.pointerEvent;return W(void 0!==e,56),"mouse"==e.pointerType},ca=function(t){var e=t.pointerEvent;return W(void 0!==e,56),e.isPrimary&&0===e.button},pa=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}();function fa(t){for(var e=t.length,r=0,n=0,i=0;i<e;i++)r+=t[i].clientX,n+=t[i].clientY;return[r/e,n/e]}var da=function(t){function e(e){var r=this,n=e||{};return r=t.call(this,n)||this,n.handleDownEvent&&(r.handleDownEvent=n.handleDownEvent),n.handleDragEvent&&(r.handleDragEvent=n.handleDragEvent),n.handleMoveEvent&&(r.handleMoveEvent=n.handleMoveEvent),n.handleUpEvent&&(r.handleUpEvent=n.handleUpEvent),n.stopDown&&(r.stopDown=n.stopDown),r.handlingDownUpSequence=!1,r.trackedPointers_={},r.targetPointers=[],r}return pa(e,t),e.prototype.handleDownEvent=function(t){return!1},e.prototype.handleDragEvent=function(t){},e.prototype.handleEvent=function(t){if(!t.pointerEvent)return!0;var e=!1;if(this.updateTrackedPointers_(t),this.handlingDownUpSequence){if(t.type==fn.POINTERDRAG)this.handleDragEvent(t);else if(t.type==fn.POINTERUP){var r=this.handleUpEvent(t);this.handlingDownUpSequence=r&&this.targetPointers.length>0}}else if(t.type==fn.POINTERDOWN){var n=this.handleDownEvent(t);n&&t.preventDefault(),this.handlingDownUpSequence=n,e=this.stopDown(n)}else t.type==fn.POINTERMOVE&&this.handleMoveEvent(t);return!e},e.prototype.handleMoveEvent=function(t){},e.prototype.handleUpEvent=function(t){return!1},e.prototype.stopDown=function(t){return t},e.prototype.updateTrackedPointers_=function(t){if(function(t){var e=t.type;return e===fn.POINTERDOWN||e===fn.POINTERDRAG||e===fn.POINTERUP}(t)){var e=t.pointerEvent,r=e.pointerId.toString();t.type==fn.POINTERUP?delete this.trackedPointers_[r]:t.type==fn.POINTERDOWN?this.trackedPointers_[r]=e:r in this.trackedPointers_&&(this.trackedPointers_[r]=e),this.targetPointers=d(this.trackedPointers_)}},e}(Ho),_a=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),ga=function(t){function e(e){var r=t.call(this,{stopDown:R})||this,n=e||{};return r.kinetic_=n.kinetic,r.lastCentroid=null,r.lastPointersCount_,r.panning_=!1,r.condition_=n.condition?n.condition:sa,r.noKinetic_=!1,r}return _a(e,t),e.prototype.handleDragEvent=function(t){var e=this.targetPointers,r=fa(e);if(e.length==this.lastPointersCount_){if(this.kinetic_&&this.kinetic_.update(r[0],r[1]),this.lastCentroid){var n=[this.lastCentroid[0]-r[0],r[1]-this.lastCentroid[1]],i=t.map.getView();zi(n,i.getResolution()),Bi(n,i.getRotation()),i.adjustCenter(n)}}else this.kinetic_&&this.kinetic_.begin();this.lastCentroid=r,this.lastPointersCount_=e.length},e.prototype.handleUpEvent=function(t){var e=t.map,r=e.getView();if(0===this.targetPointers.length){if(!this.noKinetic_&&this.kinetic_&&this.kinetic_.end()){var n=this.kinetic_.getDistance(),i=this.kinetic_.getAngle(),o=r.getCenter(),a=e.getPixelFromCoordinate(o),s=e.getCoordinateFromPixel([a[0]-n*Math.cos(i),a[1]-n*Math.sin(i)]);r.animate({center:r.getConstrainedCenter(s),duration:500,easing:qi})}return this.panning_&&(this.panning_=!1,r.endInteraction()),!1}return this.kinetic_&&this.kinetic_.begin(),this.lastCentroid=null,!0},e.prototype.handleDownEvent=function(t){if(this.targetPointers.length>0&&this.condition_(t)){var e=t.map.getView();return this.lastCentroid=null,e.getAnimating()&&e.cancelAnimations(),this.panning_||(this.panning_=!0,this.getMap().getView().beginInteraction()),this.kinetic_&&this.kinetic_.begin(),this.noKinetic_=this.targetPointers.length>1,!0}return!1},e}(da),ya=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),va=function(t){function e(e){var r=this,n=e||{};return(r=t.call(this,{stopDown:R})||this).condition_=n.condition?n.condition:ta,r.lastAngle_=void 0,r.duration_=void 0!==n.duration?n.duration:250,r}return ya(e,t),e.prototype.handleDragEvent=function(t){if(ha(t)){var e=t.map,r=e.getView();if(r.getConstraints().rotation!==bi){var n=e.getSize(),i=t.pixel,o=Math.atan2(n[1]/2-i[1],i[0]-n[0]/2);if(void 0!==this.lastAngle_){var a=o-this.lastAngle_;r.adjustRotation(-a)}this.lastAngle_=o}}},e.prototype.handleUpEvent=function(t){return!ha(t)||(t.map.getView().endInteraction(this.duration_),!1)},e.prototype.handleDownEvent=function(t){return!!ha(t)&&(!(!na(t)||!this.condition_(t))&&(t.map.getView().beginInteraction(),this.lastAngle_=void 0,!0))},e}(da),ma=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),Ea=function(t){function e(e){var r=t.call(this)||this;return r.geometry_=null,r.element_=document.createElement("div"),r.element_.style.position="absolute",r.element_.className="ol-box "+e,r.map_=null,r.startPixel_=null,r.endPixel_=null,r}return ma(e,t),e.prototype.disposeInternal=function(){this.setMap(null)},e.prototype.render_=function(){var t=this.startPixel_,e=this.endPixel_,r=this.element_.style;r.left=Math.min(t[0],e[0])+"px",r.top=Math.min(t[1],e[1])+"px",r.width=Math.abs(e[0]-t[0])+"px",r.height=Math.abs(e[1]-t[1])+"px"},e.prototype.setMap=function(t){if(this.map_){this.map_.getOverlayContainer().removeChild(this.element_);var e=this.element_.style;e.left=e.top=e.width=e.height="inherit"}this.map_=t,this.map_&&this.map_.getOverlayContainer().appendChild(this.element_)},e.prototype.setPixels=function(t,e){this.startPixel_=t,this.endPixel_=e,this.createOrUpdateGeometry(),this.render_()},e.prototype.createOrUpdateGeometry=function(){var t=this.startPixel_,e=this.endPixel_,r=[t,[t[0],e[1]],e,[e[0],t[1]]].map(this.map_.getCoordinateFromPixel,this.map_);r[4]=r[0].slice(),this.geometry_?this.geometry_.setCoordinates([r]):this.geometry_=new Xr([r])},e.prototype.getGeometry=function(){return this.geometry_},e}(O),Ta=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),Sa="boxstart",wa="boxdrag",xa="boxend",Oa=function(t){function e(e,r,n){var i=t.call(this,e)||this;return i.coordinate=r,i.mapBrowserEvent=n,i}return Ta(e,t),e}(I),Ca=function(t){function e(e){var r=t.call(this)||this,n=e||{};return r.box_=new Ea(n.className||"ol-dragbox"),r.minArea_=void 0!==n.minArea?n.minArea:64,r.onBoxEnd_=n.onBoxEnd?n.onBoxEnd:P,r.startPixel_=null,r.condition_=n.condition?n.condition:ra,r.boxEndCondition_=n.boxEndCondition?n.boxEndCondition:r.defaultBoxEndCondition,r}return Ta(e,t),e.prototype.defaultBoxEndCondition=function(t,e,r){var n=r[0]-e[0],i=r[1]-e[1];return n*n+i*i>=this.minArea_},e.prototype.getGeometry=function(){return this.box_.getGeometry()},e.prototype.handleDragEvent=function(t){ha(t)&&(this.box_.setPixels(this.startPixel_,t.pixel),this.dispatchEvent(new Oa(wa,t.coordinate,t)))},e.prototype.handleUpEvent=function(t){return!ha(t)||(this.box_.setMap(null),this.boxEndCondition_(t,this.startPixel_,t.pixel)&&(this.onBoxEnd_(t),this.dispatchEvent(new Oa(xa,t.coordinate,t))),!1)},e.prototype.handleDownEvent=function(t){return!!ha(t)&&(!(!na(t)||!this.condition_(t))&&(this.startPixel_=t.pixel,this.box_.setMap(t.map),this.box_.setPixels(this.startPixel_,this.startPixel_),this.dispatchEvent(new Oa(Sa,t.coordinate,t)),!0))},e}(da),Ra=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}();function Pa(){var t,e,r=this.getMap(),n=r.getView(),i=r.getSize(),o=this.getGeometry().getExtent();if(this.out_){var a=n.calculateExtent(i),s=(t=[r.getPixelFromCoordinate(Ct(o)),r.getPixelFromCoordinate(At(o))],Tt(_t(e),t));kt(a,1/n.getResolutionForExtent(s,i)),o=a}var u=n.getConstrainedResolution(n.getResolutionForExtent(o,i)),l=n.getConstrainedCenter(Pt(o),u);n.animate({resolution:u,center:l,duration:this.duration_,easing:qi})}var ba=function(t){function e(e){var r=this,n=e||{},i=n.condition?n.condition:ua;return(r=t.call(this,{condition:i,className:n.className||"ol-dragzoom",onBoxEnd:Pa})||this).duration_=void 0!==n.duration?n.duration:200,r.out_=void 0!==n.out&&n.out,r}return Ra(e,t),e}(Ca),Ia={LEFT:37,UP:38,RIGHT:39,DOWN:40},La=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}();function Ma(t){var e=!1;if(t.type==F.KEYDOWN){var r=t.originalEvent.keyCode;if(this.condition_(t)&&(r==Ia.DOWN||r==Ia.LEFT||r==Ia.RIGHT||r==Ia.UP)){var n=t.map.getView(),i=n.getResolution()*this.pixelDelta_,o=0,a=0;r==Ia.DOWN?a=-i:r==Ia.LEFT?o=-i:r==Ia.RIGHT?o=i:a=i;var s=[o,a];Bi(s,n.getRotation()),function(t,e,r){var n=t.getCenter();if(n){var i=[n[0]+e[0],n[1]+e[1]];t.animate({duration:void 0!==r?r:250,easing:Qi,center:t.getConstrainedCenter(i)})}}(n,s,this.duration_),t.preventDefault(),e=!0}}return!e}var Fa=function(t){function e(e){var r=t.call(this,{handleEvent:Ma})||this,n=e||{};return r.defaultCondition_=function(t){return sa(t)&&la(t)},r.condition_=void 0!==n.condition?n.condition:r.defaultCondition_,r.duration_=void 0!==n.duration?n.duration:100,r.pixelDelta_=void 0!==n.pixelDelta?n.pixelDelta:128,r}return La(e,t),e}(Ho),Aa=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}();function Na(t){var e=!1;if(t.type==F.KEYDOWN||t.type==F.KEYPRESS){var r=t.originalEvent.charCode;if(this.condition_(t)&&(r=="+".charCodeAt(0)||r=="-".charCodeAt(0))){var n=t.map,i=r=="+".charCodeAt(0)?this.delta_:-this.delta_;Ko(n.getView(),i,void 0,this.duration_),t.preventDefault(),e=!0}}return!e}var Ga=function(t){function e(e){var r=t.call(this,{handleEvent:Na})||this,n=e||{};return r.condition_=n.condition?n.condition:la,r.delta_=n.delta?n.delta:1,r.duration_=void 0!==n.duration?n.duration:100,r}return Aa(e,t),e}(Ho),Da=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),ka="trackpad",ja="wheel",Ua=function(t){function e(e){var r=this,n=e||{};return(r=t.call(this,n)||this).totalDelta_=0,r.lastDelta_=0,r.duration_=void 0!==n.duration?n.duration:250,r.timeout_=void 0!==n.timeout?n.timeout:80,r.useAnchor_=void 0===n.useAnchor||n.useAnchor,r.condition_=n.condition?n.condition:ra,r.lastAnchor_=null,r.startTime_=void 0,r.timeoutId_,r.mode_=void 0,r.trackpadEventGap_=400,r.trackpadTimeoutId_,r.trackpadDeltaPerZoom_=300,r}return Da(e,t),e.prototype.endInteraction_=function(){this.trackpadTimeoutId_=void 0,this.getMap().getView().endInteraction(void 0,Math.sign(this.lastDelta_),this.lastAnchor_)},e.prototype.handleEvent=function(t){if(!this.condition_(t))return!0;var e=t.type;if(e!==F.WHEEL&&e!==F.MOUSEWHEEL)return!0;t.preventDefault();var r,n=t.map,i=t.originalEvent;if(this.useAnchor_&&(this.lastAnchor_=t.coordinate),t.type==F.WHEEL?(r=i.deltaY,Kr&&i.deltaMode===WheelEvent.DOM_DELTA_PIXEL&&(r/=Qr),i.deltaMode===WheelEvent.DOM_DELTA_LINE&&(r*=40)):t.type==F.MOUSEWHEEL&&(r=-i.wheelDeltaY,Hr&&(r/=3)),0===r)return!1;this.lastDelta_=r;var o=Date.now();if(void 0===this.startTime_&&(this.startTime_=o),(!this.mode_||o-this.startTime_>this.trackpadEventGap_)&&(this.mode_=Math.abs(r)<4?ka:ja),this.mode_===ka){var a=n.getView();return this.trackpadTimeoutId_?clearTimeout(this.trackpadTimeoutId_):a.beginInteraction(),this.trackpadTimeoutId_=setTimeout(this.endInteraction_.bind(this),this.trackpadEventGap_),a.adjustZoom(-r/this.trackpadDeltaPerZoom_,this.lastAnchor_),this.startTime_=o,!1}this.totalDelta_+=r;var s=Math.max(this.timeout_-(o-this.startTime_),0);return clearTimeout(this.timeoutId_),this.timeoutId_=setTimeout(this.handleWheelZoom_.bind(this,n),s),!1},e.prototype.handleWheelZoom_=function(t){var e=t.getView();e.getAnimating()&&e.cancelAnimations();Ko(e,-Bt(this.totalDelta_,-1,1),this.lastAnchor_,this.duration_),this.mode_=void 0,this.totalDelta_=0,this.lastAnchor_=null,this.startTime_=void 0,this.timeoutId_=void 0},e.prototype.setMouseAnchor=function(t){this.useAnchor_=t,t||(this.lastAnchor_=null)},e}(Ho),Ya=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),Xa=function(t){function e(e){var r=this,n=e||{},i=n;return i.stopDown||(i.stopDown=R),(r=t.call(this,i)||this).anchor_=null,r.lastAngle_=void 0,r.rotating_=!1,r.rotationDelta_=0,r.threshold_=void 0!==n.threshold?n.threshold:.3,r.duration_=void 0!==n.duration?n.duration:250,r}return Ya(e,t),e.prototype.handleDragEvent=function(t){var e=0,r=this.targetPointers[0],n=this.targetPointers[1],i=Math.atan2(n.clientY-r.clientY,n.clientX-r.clientX);if(void 0!==this.lastAngle_){var o=i-this.lastAngle_;this.rotationDelta_+=o,!this.rotating_&&Math.abs(this.rotationDelta_)>this.threshold_&&(this.rotating_=!0),e=o}this.lastAngle_=i;var a=t.map,s=a.getView();if(s.getConstraints().rotation!==bi){var u=a.getViewport().getBoundingClientRect(),l=fa(this.targetPointers);l[0]-=u.left,l[1]-=u.top,this.anchor_=a.getCoordinateFromPixel(l),this.rotating_&&(a.render(),s.adjustRotation(e,this.anchor_))}},e.prototype.handleUpEvent=function(t){return!(this.targetPointers.length<2)||(t.map.getView().endInteraction(this.duration_),!1)},e.prototype.handleDownEvent=function(t){if(this.targetPointers.length>=2){var e=t.map;return this.anchor_=null,this.lastAngle_=void 0,this.rotating_=!1,this.rotationDelta_=0,this.handlingDownUpSequence||e.getView().beginInteraction(),!0}return!1},e}(da),Ba=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),za=function(t){function e(e){var r=this,n=e||{},i=n;return i.stopDown||(i.stopDown=R),(r=t.call(this,i)||this).anchor_=null,r.duration_=void 0!==n.duration?n.duration:400,r.lastDistance_=void 0,r.lastScaleDelta_=1,r}return Ba(e,t),e.prototype.handleDragEvent=function(t){var e=1,r=this.targetPointers[0],n=this.targetPointers[1],i=r.clientX-n.clientX,o=r.clientY-n.clientY,a=Math.sqrt(i*i+o*o);void 0!==this.lastDistance_&&(e=this.lastDistance_/a),this.lastDistance_=a;var s=t.map,u=s.getView();1!=e&&(this.lastScaleDelta_=e);var l=s.getViewport().getBoundingClientRect(),h=fa(this.targetPointers);h[0]-=l.left,h[1]-=l.top,this.anchor_=s.getCoordinateFromPixel(h),s.render(),u.adjustResolution(e,this.anchor_)},e.prototype.handleUpEvent=function(t){if(this.targetPointers.length<2){var e=t.map.getView(),r=this.lastScaleDelta_>1?1:-1;return e.endInteraction(this.duration_,r),!1}return!0},e.prototype.handleDownEvent=function(t){if(this.targetPointers.length>=2){var e=t.map;return this.anchor_=null,this.lastDistance_=void 0,this.lastScaleDelta_=1,this.handlingDownUpSequence||e.getView().beginInteraction(),!0}return!1},e}(da);function Va(t){var e=t||{},r=new V,n=new un(-.005,.05,100);return(void 0===e.altShiftDragRotate||e.altShiftDragRotate)&&r.push(new va),(void 0===e.doubleClickZoom||e.doubleClickZoom)&&r.push(new Qo({delta:e.zoomDelta,duration:e.zoomDuration})),(void 0===e.dragPan||e.dragPan)&&r.push(new ga({condition:e.onFocusOnly?ea:void 0,kinetic:n})),(void 0===e.pinchRotate||e.pinchRotate)&&r.push(new Xa),(void 0===e.pinchZoom||e.pinchZoom)&&r.push(new za({duration:e.zoomDuration})),(void 0===e.keyboard||e.keyboard)&&(r.push(new Fa),r.push(new Ga({delta:e.zoomDelta,duration:e.zoomDuration}))),(void 0===e.mouseWheelZoom||e.mouseWheelZoom)&&r.push(new Ua({condition:e.onFocusOnly?ea:void 0,duration:e.zoomDuration})),(void 0===e.shiftDragZoom||e.shiftDragZoom)&&r.push(new ba({duration:e.zoomDuration})),r}var Wa=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),Za=function(t){function e(e,r,n,i,o){var a=t.call(this,e)||this;return a.inversePixelTransform=r,a.frameState=n,a.context=i,a.glContext=o,a}return Wa(e,t),e}(I),Ka=/^#([a-f0-9]{3}|[a-f0-9]{4}(?:[a-f0-9]{2}){0,2})$/i,Ha=/^([a-z]*)$/i;function qa(t){return"string"==typeof t?t:ts(t)}var Ja=function(){var t={},e=0;return function(r){var n;if(t.hasOwnProperty(r))n=t[r];else{if(e>=1024){var i=0;for(var o in t)0==(3&i++)&&(delete t[o],--e)}n=function(t){var e,r,n,i,o;Ha.exec(t)&&(t=function(t){var e=document.createElement("div");if(e.style.color=t,""!==e.style.color){document.body.appendChild(e);var r=getComputedStyle(e).color;return document.body.removeChild(e),r}return""}(t));if(Ka.exec(t)){var a=t.length-1,s=void 0;s=a<=4?1:2;var u=4===a||8===a;e=parseInt(t.substr(1+0*s,s),16),r=parseInt(t.substr(1+1*s,s),16),n=parseInt(t.substr(1+2*s,s),16),i=u?parseInt(t.substr(1+3*s,s),16):255,1==s&&(e=(e<<4)+e,r=(r<<4)+r,n=(n<<4)+n,u&&(i=(i<<4)+i)),o=[e,r,n,i/255]}else 0==t.indexOf("rgba(")?$a(o=t.slice(5,-1).split(",").map(Number)):0==t.indexOf("rgb(")?((o=t.slice(4,-1).split(",").map(Number)).push(1),$a(o)):W(!1,14);return o}(r),t[r]=n,++e}return n}}();function Qa(t){return Array.isArray(t)?t:Ja(t)}function $a(t){return t[0]=Bt(t[0]+.5|0,0,255),t[1]=Bt(t[1]+.5|0,0,255),t[2]=Bt(t[2]+.5|0,0,255),t[3]=Bt(t[3],0,1),t}function ts(t){var e=t[0];e!=(0|e)&&(e=e+.5|0);var r=t[1];r!=(0|r)&&(r=r+.5|0);var n=t[2];return n!=(0|n)&&(n=n+.5|0),"rgba("+e+","+r+","+n+","+(void 0===t[3]?1:t[3])+")"}var es=function(){function t(){this.cache_={},this.cacheSize_=0,this.maxCacheSize_=32}return t.prototype.clear=function(){this.cache_={},this.cacheSize_=0},t.prototype.canExpireCache=function(){return this.cacheSize_>this.maxCacheSize_},t.prototype.expire=function(){if(this.canExpireCache()){var t=0;for(var e in this.cache_){var r=this.cache_[e];0!=(3&t++)||r.hasListener()||(delete this.cache_[e],--this.cacheSize_)}}},t.prototype.get=function(t,e,r){var n=rs(t,e,r);return n in this.cache_?this.cache_[n]:null},t.prototype.set=function(t,e,r,n){var i=rs(t,e,r);this.cache_[i]=n,++this.cacheSize_},t.prototype.setSize=function(t){this.maxCacheSize_=t,this.expire()},t}();function rs(t,e,r){return e+":"+t+":"+(r?qa(r):"null")}var ns=new es,is=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}();function os(t,e){ns.expire()}var as=function(t){function e(e){var r=t.call(this)||this;return r.map_=e,r.layerRenderers_={},r.layerRendererListeners_={},r}return is(e,t),e.prototype.dispatchRenderEvent=function(t,e){n()},e.prototype.calculateMatrices2D=function(t){var e=t.viewState,r=t.coordinateToPixelTransform,n=t.pixelToCoordinateTransform;qe(r,t.size[0]/2,t.size[1]/2,1/e.resolution,-1/e.resolution,-e.rotation,-e.center[0],-e.center[1]),Je(n,r)},e.prototype.removeLayerRenderers=function(){for(var t in this.layerRenderers_)this.removeLayerRendererByKey_(t).dispose()},e.prototype.forEachFeatureAtCoordinate=function(t,e,r,n,i,a,s){var u,l=e.viewState,h=l.resolution;function c(t,r,a){if(!(o(r)in e.skippedFeatureUids)||t)return n.call(i,r,t?a:null)}var p=l.projection,f=t;if(p.canWrapX()){var d=p.getExtent(),_=Nt(d),g=t[0];if(g<d[0]||g>d[2])f=[g+_*Math.ceil((d[0]-g)/_),t[1]]}var y,v=e.layerStatesArray;for(y=v.length-1;y>=0;--y){var m=v[y],E=m.layer;if(No(m,h)&&a.call(s,E)){var T=this.getLayerRenderer(E),S=E.getSource();if(T&&S){var w=c.bind(null,m.managed);u=T.forEachFeatureAtCoordinate(S.getWrapX()?f:t,e,r,w)}if(u)return u}}},e.prototype.forEachLayerAtPixel=function(t,e,r,i,o){return n()},e.prototype.hasFeatureAtCoordinate=function(t,e,r,n,i){return void 0!==this.forEachFeatureAtCoordinate(t,e,r,C,this,n,i)},e.prototype.getLayerRenderer=function(t){var e=o(t);if(e in this.layerRenderers_)return this.layerRenderers_[e];var r=t.getRenderer();return r?(this.layerRenderers_[e]=r,this.layerRendererListeners_[e]=E(r,F.CHANGE,this.handleLayerRendererChange_,this),r):null},e.prototype.getLayerRenderers=function(){return this.layerRenderers_},e.prototype.getMap=function(){return this.map_},e.prototype.handleLayerRendererChange_=function(){this.map_.render()},e.prototype.removeLayerRendererByKey_=function(t){var e=this.layerRenderers_[t];return delete this.layerRenderers_[t],w(this.layerRendererListeners_[t]),delete this.layerRendererListeners_[t],e},e.prototype.renderFrame=function(t){n()},e.prototype.scheduleExpireIconCache=function(t){ns.canExpireCache()&&t.postRenderFunctions.push(os)},e.prototype.scheduleRemoveUnusedLayerRenderers=function(t){var e=t.layerStatesArray.reduce(function(t,e){return t[o(e.layer)]=e,t},{}),r=function(r){r in e||t.postRenderFunctions.push(function(){this.removeLayerRendererByKey_(r).dispose()}.bind(n))},n=this;for(var i in this.layerRenderers_)r(i)},e}(O),ss=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),us=function(t){function e(e){var r=t.call(this,e)||this;r.element_=document.createElement("div");var n=r.element_.style;n.position="absolute",n.width="100%",n.height="100%",n.zIndex="0",r.element_.className=bo+" ol-layers";var i=e.getViewport();return i.insertBefore(r.element_,i.firstChild||null),r.children_=[],r.renderedVisible_=!0,r}return ss(e,t),e.prototype.dispatchRenderEvent=function(t,e){var r=this.getMap();if(r.hasListener(t)){var n=new Za(t,void 0,e);r.dispatchEvent(n)}},e.prototype.renderFrame=function(t){if(t){this.calculateMatrices2D(t),this.dispatchRenderEvent(gi,t);var e=t.layerStatesArray,r=t.viewState.resolution;this.children_.length=0;for(var n=0,i=e.length;n<i;++n){var o=e[n];if(No(o,r)&&o.sourceState==fo.READY){var a=o.layer.render(t);if(a){var s=o.zIndex;s!==a.style.zIndex&&(a.style.zIndex=s),this.children_.push(a)}}}!function(t,e){for(var r=t.childNodes,n=0;;++n){var i=r[n],o=e[n];if(!i&&!o)break;i!==o&&(i?o?t.insertBefore(o,i):(t.removeChild(i),--n):t.appendChild(o))}}(this.element_,this.children_),this.dispatchRenderEvent(yi,t),this.renderedVisible_||(this.element_.style.display="",this.renderedVisible_=!0),this.scheduleRemoveUnusedLayerRenderers(t),this.scheduleExpireIconCache(t)}else this.renderedVisible_&&(this.element_.style.display="none",this.renderedVisible_=!1)},e.prototype.forEachLayerAtPixel=function(t,e,r,n,i){for(var o=e.viewState.resolution,a=e.layerStatesArray,s=a.length-1;s>=0;--s){var u=a[s],l=u.layer;if(No(u,o)&&i(l)){var h=this.getLayerRenderer(l);if(!h)continue;var c=h.getDataAtPixel(t,e,r);if(c){var p=n(l,c);if(p)return p}}}},e}(as),ls=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),hs=function(t){function e(e){return(e=p({},e)).controls||(e.controls=Vo()),e.interactions||(e.interactions=Va()),t.call(this,e)||this}return ls(e,t),e.prototype.createRenderer=function(){return new us(this)},e}(So),cs={BOTTOM_LEFT:"bottom-left",BOTTOM_CENTER:"bottom-center",BOTTOM_RIGHT:"bottom-right",CENTER_LEFT:"center-left",CENTER_CENTER:"center-center",CENTER_RIGHT:"center-right",TOP_LEFT:"top-left",TOP_CENTER:"top-center",TOP_RIGHT:"top-right"},ps=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),fs={ELEMENT:"element",MAP:"map",OFFSET:"offset",POSITION:"position",POSITIONING:"positioning"},ds=function(t){function e(e){var r=t.call(this)||this;return r.options=e,r.id=e.id,r.insertFirst=void 0===e.insertFirst||e.insertFirst,r.stopEvent=void 0===e.stopEvent||e.stopEvent,r.element=document.createElement("div"),r.element.className=void 0!==e.className?e.className:"ol-overlay-container "+Po,r.element.style.position="absolute",r.autoPan=void 0!==e.autoPan&&e.autoPan,r.autoPanAnimation=e.autoPanAnimation||{},r.autoPanMargin=void 0!==e.autoPanMargin?e.autoPanMargin:20,r.rendered={bottom_:"",left_:"",right_:"",top_:"",visible:!0},r.mapPostrenderListenerKey=null,E(r,U(fs.ELEMENT),r.handleElementChanged,r),E(r,U(fs.MAP),r.handleMapChanged,r),E(r,U(fs.OFFSET),r.handleOffsetChanged,r),E(r,U(fs.POSITION),r.handlePositionChanged,r),E(r,U(fs.POSITIONING),r.handlePositioningChanged,r),void 0!==e.element&&r.setElement(e.element),r.setOffset(void 0!==e.offset?e.offset:[0,0]),r.setPositioning(void 0!==e.positioning?e.positioning:cs.TOP_LEFT),void 0!==e.position&&r.setPosition(e.position),r}return ps(e,t),e.prototype.getElement=function(){return this.get(fs.ELEMENT)},e.prototype.getId=function(){return this.id},e.prototype.getMap=function(){return this.get(fs.MAP)},e.prototype.getOffset=function(){return this.get(fs.OFFSET)},e.prototype.getPosition=function(){return this.get(fs.POSITION)},e.prototype.getPositioning=function(){return this.get(fs.POSITIONING)},e.prototype.handleElementChanged=function(){lo(this.element);var t=this.getElement();t&&this.element.appendChild(t)},e.prototype.handleMapChanged=function(){this.mapPostrenderListenerKey&&(uo(this.element),w(this.mapPostrenderListenerKey),this.mapPostrenderListenerKey=null);var t=this.getMap();if(t){this.mapPostrenderListenerKey=E(t,hi,this.render,this),this.updatePixelPosition();var e=this.stopEvent?t.getOverlayContainerStopEvent():t.getOverlayContainer();this.insertFirst?e.insertBefore(this.element,e.childNodes[0]||null):e.appendChild(this.element)}},e.prototype.render=function(){this.updatePixelPosition()},e.prototype.handleOffsetChanged=function(){this.updatePixelPosition()},e.prototype.handlePositionChanged=function(){this.updatePixelPosition(),this.get(fs.POSITION)&&this.autoPan&&this.panIntoView()},e.prototype.handlePositioningChanged=function(){this.updatePixelPosition()},e.prototype.setElement=function(t){this.set(fs.ELEMENT,t)},e.prototype.setMap=function(t){this.set(fs.MAP,t)},e.prototype.setOffset=function(t){this.set(fs.OFFSET,t)},e.prototype.setPosition=function(t){this.set(fs.POSITION,t)},e.prototype.panIntoView=function(){var t=this.getMap();if(t&&t.getTargetElement()){var e=this.getRect(t.getTargetElement(),t.getSize()),r=this.getElement(),n=this.getRect(r,[oo(r),ao(r)]),i=this.autoPanMargin;if(!ht(e,n)){var o=n[0]-e[0],a=e[2]-n[2],s=n[1]-e[1],u=e[3]-n[3],l=[0,0];if(o<0?l[0]=o-i:a<0&&(l[0]=Math.abs(a)+i),s<0?l[1]=s-i:u<0&&(l[1]=Math.abs(u)+i),0!==l[0]||0!==l[1]){var h=t.getView().getCenter(),c=t.getPixelFromCoordinate(h),p=[c[0]+l[0],c[1]+l[1]];t.getView().animate({center:t.getCoordinateFromPixel(p),duration:this.autoPanAnimation.duration,easing:this.autoPanAnimation.easing})}}}},e.prototype.getRect=function(t,e){var r=t.getBoundingClientRect(),n=r.left+window.pageXOffset,i=r.top+window.pageYOffset;return[n,i,n+e[0],i+e[1]]},e.prototype.setPositioning=function(t){this.set(fs.POSITIONING,t)},e.prototype.setVisible=function(t){this.rendered.visible!==t&&(this.element.style.display=t?"":"none",this.rendered.visible=t)},e.prototype.updatePixelPosition=function(){var t=this.getMap(),e=this.getPosition();if(t&&t.isRendered()&&e){var r=t.getPixelFromCoordinate(e),n=t.getSize();this.updateRenderedPosition(r,n)}else this.setVisible(!1)},e.prototype.updateRenderedPosition=function(t,e){var r=this.element.style,n=this.getOffset(),i=this.getPositioning();this.setVisible(!0);var o=n[0],a=n[1];if(i==cs.BOTTOM_RIGHT||i==cs.CENTER_RIGHT||i==cs.TOP_RIGHT){""!==this.rendered.left_&&(this.rendered.left_=r.left="");var s=Math.round(e[0]-t[0]-o)+"px";this.rendered.right_!=s&&(this.rendered.right_=r.right=s)}else{""!==this.rendered.right_&&(this.rendered.right_=r.right=""),i!=cs.BOTTOM_CENTER&&i!=cs.CENTER_CENTER&&i!=cs.TOP_CENTER||(o-=this.element.offsetWidth/2);var u=Math.round(t[0]+o)+"px";this.rendered.left_!=u&&(this.rendered.left_=r.left=u)}if(i==cs.BOTTOM_LEFT||i==cs.BOTTOM_CENTER||i==cs.BOTTOM_RIGHT){""!==this.rendered.top_&&(this.rendered.top_=r.top="");var l=Math.round(e[1]-t[1]-a)+"px";this.rendered.bottom_!=l&&(this.rendered.bottom_=r.bottom=l)}else{""!==this.rendered.bottom_&&(this.rendered.bottom_=r.bottom=""),i!=cs.CENTER_LEFT&&i!=cs.CENTER_CENTER&&i!=cs.CENTER_RIGHT||(a-=this.element.offsetHeight/2);var h=Math.round(t[1]+a)+"px";this.rendered.top_!=h&&(this.rendered.top_=r.top=h)}},e.prototype.getOptions=function(){return this.options},e}(Y);function _s(t){return Array.isArray(t)?ts(t):t}var gs={ARRAY_BUFFER:"arraybuffer",JSON:"json",TEXT:"text",XML:"xml"};function ys(t,e,r,n){return function(i,o,a){var s=new XMLHttpRequest;s.open("GET","function"==typeof t?t(i,o,a):t,!0),e.getType()==gs.ARRAY_BUFFER&&(s.responseType="arraybuffer"),s.onload=function(t){if(!s.status||s.status>=200&&s.status<300){var o=e.getType(),u=void 0;o==gs.JSON||o==gs.TEXT?u=s.responseText:o==gs.XML?(u=s.responseXML)||(u=(new DOMParser).parseFromString(s.responseText,"application/xml")):o==gs.ARRAY_BUFFER&&(u=s.response),u?r.call(this,e.readFeatures(u,{extent:i,featureProjection:a}),e.readProjection(u)):n.call(this)}else n.call(this)}.bind(this),s.onerror=function(){n.call(this)}.bind(this),s.send()}}function vs(t,e){return ys(t,e,function(t,e){"function"==typeof this.addFeatures&&this.addFeatures(t)},P)}function ms(t,e){return[[-1/0,-1/0,1/0,1/0]]}function Es(t,e){return[t]}var Ts=function(){function t(){}return t.prototype.drawCustom=function(t,e,r){},t.prototype.drawGeometry=function(t){},t.prototype.setStyle=function(t){},t.prototype.drawCircle=function(t,e){},t.prototype.drawFeature=function(t,e){},t.prototype.drawGeometryCollection=function(t,e){},t.prototype.drawLineString=function(t,e){},t.prototype.drawMultiLineString=function(t,e){},t.prototype.drawMultiPoint=function(t,e){},t.prototype.drawMultiPolygon=function(t,e){},t.prototype.drawPoint=function(t,e){},t.prototype.drawPolygon=function(t,e){},t.prototype.drawText=function(t,e){},t.prototype.setFillStrokeStyle=function(t,e){},t.prototype.setImageStyle=function(t,e){},t.prototype.setTextStyle=function(t,e){},t}(),Ss=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),ws=function(t){function e(e){var r=t.call(this)||this;return r.highWaterMark=void 0!==e?e:2048,r.count_=0,r.entries_={},r.oldest_=null,r.newest_=null,r}return Ss(e,t),e.prototype.canExpireCache=function(){return this.getCount()>this.highWaterMark},e.prototype.clear=function(){this.count_=0,this.entries_={},this.oldest_=null,this.newest_=null,this.dispatchEvent(F.CLEAR)},e.prototype.containsKey=function(t){return this.entries_.hasOwnProperty(t)},e.prototype.forEach=function(t,e){for(var r=this.oldest_;r;)t.call(e,r.value_,r.key_,this),r=r.newer},e.prototype.get=function(t,e){var r=this.entries_[t];return W(void 0!==r,15),r===this.newest_?r.value_:(r===this.oldest_?(this.oldest_=this.oldest_.newer,this.oldest_.older=null):(r.newer.older=r.older,r.older.newer=r.newer),r.newer=null,r.older=this.newest_,this.newest_.newer=r,this.newest_=r,r.value_)},e.prototype.remove=function(t){var e=this.entries_[t];return W(void 0!==e,15),e===this.newest_?(this.newest_=e.older,this.newest_&&(this.newest_.newer=null)):e===this.oldest_?(this.oldest_=e.newer,this.oldest_&&(this.oldest_.older=null)):(e.newer.older=e.older,e.older.newer=e.newer),delete this.entries_[t],--this.count_,e.value_},e.prototype.getCount=function(){return this.count_},e.prototype.getKeys=function(){var t,e=new Array(this.count_),r=0;for(t=this.newest_;t;t=t.older)e[r++]=t.key_;return e},e.prototype.getValues=function(){var t,e=new Array(this.count_),r=0;for(t=this.newest_;t;t=t.older)e[r++]=t.value_;return e},e.prototype.peekLast=function(){return this.oldest_.value_},e.prototype.peekLastKey=function(){return this.oldest_.key_},e.prototype.peekFirstKey=function(){return this.newest_.key_},e.prototype.pop=function(){var t=this.oldest_;return delete this.entries_[t.key_],t.newer&&(t.newer.older=null),this.oldest_=t.newer,this.oldest_||(this.newest_=null),--this.count_,t.value_},e.prototype.replace=function(t,e){this.get(t),this.entries_[t].value_=e},e.prototype.set=function(t,e){W(!(t in this.entries_),16);var r={key_:t,newer:null,older:this.newest_,value_:e};this.newest_?this.newest_.newer=r:this.oldest_=r,this.newest_=r,this.entries_[t]=r,++this.count_},e.prototype.setSize=function(t){this.highWaterMark=t},e}(M),xs=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),Os=function(t){function e(e){var r=t.call(this,e)||this;return r.consumers={},r}return xs(e,t),e.prototype.clear=function(){t.prototype.clear.call(this),this.consumers={}},e.prototype.get=function(e,r){var n=t.prototype.get.call(this,e),i=o(r);return i in this.consumers||(this.consumers[i]={}),this.consumers[i][e]=!0,n},e.prototype.prune=function(){t:for(;this.canExpireCache();){var t=this.peekLastKey();for(var e in this.consumers)if(t in this.consumers[e])break t;var r=this.pop();for(var e in r.width=r.height=0,this.consumers)delete this.consumers[e][t]}},e.prototype.release=function(t){delete this.consumers[o(t)]},e}(ws),Cs=[],Rs=[0,0,0,0],Ps=new Os,bs={},Is=null,Ls={},Ms=function(){var t,e,r=60,n=bs,i="32px ",o=["monospace","serif"],a=o.length,s="wmytzilWMYTZIL@#/&?$%10";function u(t){for(var r=Fs(),n=100;n<=700;n+=300){for(var u=n+" ",l=!0,h=0;h<a;++h){var c=o[h];if(r.font=u+i+c,e=r.measureText(s).width,t!=c){r.font=u+i+t+","+c;var p=r.measureText(s).width;l=l&&p!=e}}if(l)return!0}return!1}function l(){var e=!0;for(var i in n)n[i]<r&&(u(i)?(n[i]=r,f(Ls),Is=null,Ps.clear()):(++n[i],e=!1));e&&(clearInterval(t),t=void 0)}return function(e){var i=Fo(e);if(i)for(var o=0,a=i.length;o<a;++o){var s=i[o];s in n||(n[s]=r,u(s)||(n[s]=0,void 0===t&&(t=setInterval(l,32))))}}}();function Fs(){return Is||(Is=io(1,1)),Is}var As,Ns,Gs=(Ns=Ls,function(t){var e=Ns[t];return null==e&&(As||((As=document.createElement("div")).innerHTML="M",As.style.margin=As.style.padding="0 !important",As.style.position="absolute !important",As.style.left="-99999px !important"),As.style.font=t,document.body.appendChild(As),e=Ns[t]=As.offsetHeight,document.body.removeChild(As)),e});function Ds(t,e){var r=Fs();return t!=r.font&&(r.font=t),r.measureText(e).width}function ks(t,e,r){return e in r?r[e]:r[e]=Ds(t,e)}function js(t,e,r,n){0!==e&&(t.translate(r,n),t.rotate(e),t.translate(-r,-n))}var Us=[1,0,0,1,0,0];function Ys(t,e,r,n,i,o,a,s,u,l,h){var c;1!=r&&(c=t.globalAlpha,t.globalAlpha=c*r),e&&t.setTransform.apply(t,e),t.drawImage(n,i,o,a,s,u,l,a*h,s*h),c&&(t.globalAlpha=c),e&&t.setTransform.apply(t,Us)}var Xs=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),Bs=function(t){function e(e,r,n,i,o){var a=t.call(this)||this;return a.context_=e,a.pixelRatio_=r,a.extent_=n,a.transform_=i,a.viewRotation_=o,a.contextFillState_=null,a.contextStrokeState_=null,a.contextTextState_=null,a.fillState_=null,a.strokeState_=null,a.image_=null,a.imageAnchorX_=0,a.imageAnchorY_=0,a.imageHeight_=0,a.imageOpacity_=0,a.imageOriginX_=0,a.imageOriginY_=0,a.imageRotateWithView_=!1,a.imageRotation_=0,a.imageScale_=0,a.imageWidth_=0,a.text_="",a.textOffsetX_=0,a.textOffsetY_=0,a.textRotateWithView_=!1,a.textRotation_=0,a.textScale_=0,a.textFillState_=null,a.textStrokeState_=null,a.textState_=null,a.pixelCoordinates_=[],a.tmpLocalTransform_=[1,0,0,1,0,0],a}return Xs(e,t),e.prototype.drawImages_=function(t,e,r,n){if(this.image_){var i=Xt(t,e,r,2,this.transform_,this.pixelCoordinates_),o=this.context_,a=this.tmpLocalTransform_,s=o.globalAlpha;1!=this.imageOpacity_&&(o.globalAlpha=s*this.imageOpacity_);var u=this.imageRotation_;this.imageRotateWithView_&&(u+=this.viewRotation_);for(var l=0,h=i.length;l<h;l+=2){var c=i[l]-this.imageAnchorX_,p=i[l+1]-this.imageAnchorY_;if(0!==u||1!=this.imageScale_){var f=c+this.imageAnchorX_,d=p+this.imageAnchorY_;qe(a,f,d,this.imageScale_,this.imageScale_,u,-f,-d),o.setTransform.apply(o,a)}o.drawImage(this.image_,this.imageOriginX_,this.imageOriginY_,this.imageWidth_,this.imageHeight_,c,p,this.imageWidth_,this.imageHeight_)}0===u&&1==this.imageScale_||o.setTransform(1,0,0,1,0,0),1!=this.imageOpacity_&&(o.globalAlpha=s)}},e.prototype.drawText_=function(t,e,r,n){if(this.textState_&&""!==this.text_){this.textFillState_&&this.setContextFillState_(this.textFillState_),this.textStrokeState_&&this.setContextStrokeState_(this.textStrokeState_),this.setContextTextState_(this.textState_);var i=Xt(t,e,r,n,this.transform_,this.pixelCoordinates_),o=this.context_,a=this.textRotation_;for(this.textRotateWithView_&&(a+=this.viewRotation_);e<r;e+=n){var s=i[e]+this.textOffsetX_,u=i[e+1]+this.textOffsetY_;if(0!==a||1!=this.textScale_){var l=qe(this.tmpLocalTransform_,s,u,this.textScale_,this.textScale_,a,-s,-u);o.setTransform.apply(o,l)}this.textStrokeState_&&o.strokeText(this.text_,s,u),this.textFillState_&&o.fillText(this.text_,s,u)}0===a&&1==this.textScale_||o.setTransform(1,0,0,1,0,0)}},e.prototype.moveToLineTo_=function(t,e,r,n,i){var o=this.context_,a=Xt(t,e,r,n,this.transform_,this.pixelCoordinates_);o.moveTo(a[0],a[1]);var s=a.length;i&&(s-=2);for(var u=2;u<s;u+=2)o.lineTo(a[u],a[u+1]);return i&&o.closePath(),r},e.prototype.drawRings_=function(t,e,r,n){for(var i=0,o=r.length;i<o;++i)e=this.moveToLineTo_(t,e,r[i],n,!0);return e},e.prototype.drawCircle=function(t){if(Gt(this.extent_,t.getExtent())){if(this.fillState_||this.strokeState_){this.fillState_&&this.setContextFillState_(this.fillState_),this.strokeState_&&this.setContextStrokeState_(this.strokeState_);var e=function(t,e,r){var n=t.getFlatCoordinates();if(n){var i=t.getStride();return Xt(n,0,n.length,i,e,r)}return null}(t,this.transform_,this.pixelCoordinates_),r=e[2]-e[0],n=e[3]-e[1],i=Math.sqrt(r*r+n*n),o=this.context_;o.beginPath(),o.arc(e[0],e[1],i,0,2*Math.PI),this.fillState_&&o.fill(),this.strokeState_&&o.stroke()}""!==this.text_&&this.drawText_(t.getCenter(),0,2,2)}},e.prototype.setStyle=function(t){this.setFillStrokeStyle(t.getFill(),t.getStroke()),this.setImageStyle(t.getImage()),this.setTextStyle(t.getText())},e.prototype.drawGeometry=function(t){switch(t.getType()){case Yt.POINT:this.drawPoint(t);break;case Yt.LINE_STRING:this.drawLineString(t);break;case Yt.POLYGON:this.drawPolygon(t);break;case Yt.MULTI_POINT:this.drawMultiPoint(t);break;case Yt.MULTI_LINE_STRING:this.drawMultiLineString(t);break;case Yt.MULTI_POLYGON:this.drawMultiPolygon(t);break;case Yt.GEOMETRY_COLLECTION:this.drawGeometryCollection(t);break;case Yt.CIRCLE:this.drawCircle(t)}},e.prototype.drawFeature=function(t,e){var r=e.getGeometryFunction()(t);r&&Gt(this.extent_,r.getExtent())&&(this.setStyle(e),this.drawGeometry(r))},e.prototype.drawGeometryCollection=function(t){for(var e=t.getGeometriesArray(),r=0,n=e.length;r<n;++r)this.drawGeometry(e[r])},e.prototype.drawPoint=function(t){var e=t.getFlatCoordinates(),r=t.getStride();this.image_&&this.drawImages_(e,0,e.length,r),""!==this.text_&&this.drawText_(e,0,e.length,r)},e.prototype.drawMultiPoint=function(t){var e=t.getFlatCoordinates(),r=t.getStride();this.image_&&this.drawImages_(e,0,e.length,r),""!==this.text_&&this.drawText_(e,0,e.length,r)},e.prototype.drawLineString=function(t){if(Gt(this.extent_,t.getExtent())){if(this.strokeState_){this.setContextStrokeState_(this.strokeState_);var e=this.context_,r=t.getFlatCoordinates();e.beginPath(),this.moveToLineTo_(r,0,r.length,t.getStride(),!1),e.stroke()}if(""!==this.text_){var n=t.getFlatMidpoint();this.drawText_(n,0,2,2)}}},e.prototype.drawMultiLineString=function(t){var e=t.getExtent();if(Gt(this.extent_,e)){if(this.strokeState_){this.setContextStrokeState_(this.strokeState_);var r=this.context_,n=t.getFlatCoordinates(),i=0,o=t.getEnds(),a=t.getStride();r.beginPath();for(var s=0,u=o.length;s<u;++s)i=this.moveToLineTo_(n,i,o[s],a,!1);r.stroke()}if(""!==this.text_){var l=t.getFlatMidpoints();this.drawText_(l,0,l.length,2)}}},e.prototype.drawPolygon=function(t){if(Gt(this.extent_,t.getExtent())){if(this.strokeState_||this.fillState_){this.fillState_&&this.setContextFillState_(this.fillState_),this.strokeState_&&this.setContextStrokeState_(this.strokeState_);var e=this.context_;e.beginPath(),this.drawRings_(t.getOrientedFlatCoordinates(),0,t.getEnds(),t.getStride()),this.fillState_&&e.fill(),this.strokeState_&&e.stroke()}if(""!==this.text_){var r=t.getFlatInteriorPoint();this.drawText_(r,0,2,2)}}},e.prototype.drawMultiPolygon=function(t){if(Gt(this.extent_,t.getExtent())){if(this.strokeState_||this.fillState_){this.fillState_&&this.setContextFillState_(this.fillState_),this.strokeState_&&this.setContextStrokeState_(this.strokeState_);var e=this.context_,r=t.getOrientedFlatCoordinates(),n=0,i=t.getEndss(),o=t.getStride();e.beginPath();for(var a=0,s=i.length;a<s;++a){var u=i[a];n=this.drawRings_(r,n,u,o)}this.fillState_&&e.fill(),this.strokeState_&&e.stroke()}if(""!==this.text_){var l=t.getFlatInteriorPoints();this.drawText_(l,0,l.length,2)}}},e.prototype.setContextFillState_=function(t){var e=this.context_,r=this.contextFillState_;r?r.fillStyle!=t.fillStyle&&(r.fillStyle=e.fillStyle=t.fillStyle):(e.fillStyle=t.fillStyle,this.contextFillState_={fillStyle:t.fillStyle})},e.prototype.setContextStrokeState_=function(t){var e=this.context_,r=this.contextStrokeState_;r?(r.lineCap!=t.lineCap&&(r.lineCap=e.lineCap=t.lineCap),e.setLineDash&&(et(r.lineDash,t.lineDash)||e.setLineDash(r.lineDash=t.lineDash),r.lineDashOffset!=t.lineDashOffset&&(r.lineDashOffset=e.lineDashOffset=t.lineDashOffset)),r.lineJoin!=t.lineJoin&&(r.lineJoin=e.lineJoin=t.lineJoin),r.lineWidth!=t.lineWidth&&(r.lineWidth=e.lineWidth=t.lineWidth),r.miterLimit!=t.miterLimit&&(r.miterLimit=e.miterLimit=t.miterLimit),r.strokeStyle!=t.strokeStyle&&(r.strokeStyle=e.strokeStyle=t.strokeStyle)):(e.lineCap=t.lineCap,e.setLineDash&&(e.setLineDash(t.lineDash),e.lineDashOffset=t.lineDashOffset),e.lineJoin=t.lineJoin,e.lineWidth=t.lineWidth,e.miterLimit=t.miterLimit,e.strokeStyle=t.strokeStyle,this.contextStrokeState_={lineCap:t.lineCap,lineDash:t.lineDash,lineDashOffset:t.lineDashOffset,lineJoin:t.lineJoin,lineWidth:t.lineWidth,miterLimit:t.miterLimit,strokeStyle:t.strokeStyle})},e.prototype.setContextTextState_=function(t){var e=this.context_,r=this.contextTextState_,n=t.textAlign?t.textAlign:"center";r?(r.font!=t.font&&(r.font=e.font=t.font),r.textAlign!=n&&(r.textAlign=e.textAlign=n),r.textBaseline!=t.textBaseline&&(r.textBaseline=e.textBaseline=t.textBaseline)):(e.font=t.font,e.textAlign=n,e.textBaseline=t.textBaseline,this.contextTextState_={font:t.font,textAlign:n,textBaseline:t.textBaseline})},e.prototype.setFillStrokeStyle=function(t,e){if(t){var r=t.getColor();this.fillState_={fillStyle:_s(r||"#000")}}else this.fillState_=null;if(e){var n=e.getColor(),i=e.getLineCap(),o=e.getLineDash(),a=e.getLineDashOffset(),s=e.getLineJoin(),u=e.getWidth(),l=e.getMiterLimit();this.strokeState_={lineCap:void 0!==i?i:"round",lineDash:o||Cs,lineDashOffset:a||0,lineJoin:void 0!==s?s:"round",lineWidth:this.pixelRatio_*(void 0!==u?u:1),miterLimit:void 0!==l?l:10,strokeStyle:_s(n||"#000")}}else this.strokeState_=null},e.prototype.setImageStyle=function(t){if(t){var e=t.getAnchor(),r=t.getImage(1),n=t.getOrigin(),i=t.getSize();this.imageAnchorX_=e[0],this.imageAnchorY_=e[1],this.imageHeight_=i[1],this.image_=r,this.imageOpacity_=t.getOpacity(),this.imageOriginX_=n[0],this.imageOriginY_=n[1],this.imageRotateWithView_=t.getRotateWithView(),this.imageRotation_=t.getRotation(),this.imageScale_=t.getScale()*this.pixelRatio_,this.imageWidth_=i[0]}else this.image_=null},e.prototype.setTextStyle=function(t){if(t){var e=t.getFill();if(e){var r=e.getColor();this.textFillState_={fillStyle:_s(r||"#000")}}else this.textFillState_=null;var n=t.getStroke();if(n){var i=n.getColor(),o=n.getLineCap(),a=n.getLineDash(),s=n.getLineDashOffset(),u=n.getLineJoin(),l=n.getWidth(),h=n.getMiterLimit();this.textStrokeState_={lineCap:void 0!==o?o:"round",lineDash:a||Cs,lineDashOffset:s||0,lineJoin:void 0!==u?u:"round",lineWidth:void 0!==l?l:1,miterLimit:void 0!==h?h:10,strokeStyle:_s(i||"#000")}}else this.textStrokeState_=null;var c=t.getFont(),p=t.getOffsetX(),f=t.getOffsetY(),d=t.getRotateWithView(),_=t.getRotation(),g=t.getScale(),y=t.getText(),v=t.getTextAlign(),m=t.getTextBaseline();this.textState_={font:void 0!==c?c:"10px sans-serif",textAlign:void 0!==v?v:"center",textBaseline:void 0!==m?m:"middle"},this.text_=void 0!==y?y:"",this.textOffsetX_=void 0!==p?this.pixelRatio_*p:0,this.textOffsetY_=void 0!==f?this.pixelRatio_*f:0,this.textRotateWithView_=void 0!==d&&d,this.textRotation_=void 0!==_?_:0,this.textScale_=this.pixelRatio_*(void 0!==g?g:1)}else this.text_=""},e}(Ts);var zs=function(){function t(t,e,r,n){this.minX=t,this.maxX=e,this.minY=r,this.maxY=n}return t.prototype.contains=function(t){return this.containsXY(t[1],t[2])},t.prototype.containsTileRange=function(t){return this.minX<=t.minX&&t.maxX<=this.maxX&&this.minY<=t.minY&&t.maxY<=this.maxY},t.prototype.containsXY=function(t,e){return this.minX<=t&&t<=this.maxX&&this.minY<=e&&e<=this.maxY},t.prototype.equals=function(t){return this.minX==t.minX&&this.minY==t.minY&&this.maxX==t.maxX&&this.maxY==t.maxY},t.prototype.extend=function(t){t.minX<this.minX&&(this.minX=t.minX),t.maxX>this.maxX&&(this.maxX=t.maxX),t.minY<this.minY&&(this.minY=t.minY),t.maxY>this.maxY&&(this.maxY=t.maxY)},t.prototype.getHeight=function(){return this.maxY-this.minY+1},t.prototype.getSize=function(){return[this.getWidth(),this.getHeight()]},t.prototype.getWidth=function(){return this.maxX-this.minX+1},t.prototype.intersects=function(t){return this.minX<=t.maxX&&this.maxX>=t.minX&&this.minY<=t.maxY&&this.maxY>=t.minY},t}();function Vs(t,e,r,n,i){return void 0!==i?(i.minX=t,i.maxX=e,i.minY=r,i.maxY=n,i):new zs(t,e,r,n)}var Ws=zs;function Zs(t,e,r,n){return void 0!==n?(n[0]=t,n[1]=e,n[2]=r,n):[t,e,r]}function Ks(t,e,r){return t+"/"+e+"/"+r}function Hs(t){return Ks(t[0],t[1],t[2])}function qs(t){return(t[1]<<t[0])+t[2]}var Js=[0,0,0],Qs=function(){function t(t){var e,r,n,i;if(this.minZoom=void 0!==t.minZoom?t.minZoom:0,this.resolutions_=t.resolutions,W((e=this.resolutions_,r=!0,n=function(t,e){return e-t}||H,e.every(function(t,i){if(0===i)return!0;var o=n(e[i-1],t);return!(o>0||r&&0===o)})),17),!t.origins)for(var o=0,a=this.resolutions_.length-1;o<a;++o)if(i){if(this.resolutions_[o]/this.resolutions_[o+1]!==i){i=void 0;break}}else i=this.resolutions_[o]/this.resolutions_[o+1];this.zoomFactor_=i,this.maxZoom=this.resolutions_.length-1,this.origin_=void 0!==t.origin?t.origin:null,this.origins_=null,void 0!==t.origins&&(this.origins_=t.origins,W(this.origins_.length==this.resolutions_.length,20));var s=t.extent;void 0===s||this.origin_||this.origins_||(this.origin_=Ft(s)),W(!this.origin_&&this.origins_||this.origin_&&!this.origins_,18),this.tileSizes_=null,void 0!==t.tileSizes&&(this.tileSizes_=t.tileSizes,W(this.tileSizes_.length==this.resolutions_.length,19)),this.tileSize_=void 0!==t.tileSize?t.tileSize:this.tileSizes_?null:xi,W(!this.tileSize_&&this.tileSizes_||this.tileSize_&&!this.tileSizes_,22),this.extent_=void 0!==s?s:null,this.fullTileRanges_=null,this.tmpSize_=[0,0],void 0!==t.sizes?this.fullTileRanges_=t.sizes.map(function(t,e){return new Ws(Math.min(0,t[0]),Math.max(t[0]-1,-1),Math.min(0,t[1]),Math.max(t[1]-1,-1))},this):s&&this.calculateTileRanges_(s)}return t.prototype.forEachTileCoord=function(t,e,r){for(var n=this.getTileRangeForExtentAndZ(t,e),i=n.minX,o=n.maxX;i<=o;++i)for(var a=n.minY,s=n.maxY;a<=s;++a)r([e,i,a])},t.prototype.forEachTileCoordParentTileRange=function(t,e,r,n){var i,o,a=null,s=t[0]-1;for(2===this.zoomFactor_?(i=t[1],o=t[2]):a=this.getTileCoordExtent(t,n);s>=this.minZoom;){if(e(s,2===this.zoomFactor_?Vs(i=Math.floor(i/2),i,o=Math.floor(o/2),o,r):this.getTileRangeForExtentAndZ(a,s,r)))return!0;--s}return!1},t.prototype.getExtent=function(){return this.extent_},t.prototype.getMaxZoom=function(){return this.maxZoom},t.prototype.getMinZoom=function(){return this.minZoom},t.prototype.getOrigin=function(t){return this.origin_?this.origin_:this.origins_[t]},t.prototype.getResolution=function(t){return this.resolutions_[t]},t.prototype.getResolutions=function(){return this.resolutions_},t.prototype.getTileCoordChildTileRange=function(t,e,r){if(t[0]<this.maxZoom){if(2===this.zoomFactor_){var n=2*t[1],i=2*t[2];return Vs(n,n+1,i,i+1,e)}var o=this.getTileCoordExtent(t,r);return this.getTileRangeForExtentAndZ(o,t[0]+1,e)}return null},t.prototype.getTileRangeExtent=function(t,e,r){var n=this.getOrigin(t),i=this.getResolution(t),o=Eo(this.getTileSize(t),this.tmpSize_),a=n[0]+e.minX*o[0]*i,s=n[0]+(e.maxX+1)*o[0]*i;return dt(a,n[1]+e.minY*o[1]*i,s,n[1]+(e.maxY+1)*o[1]*i,r)},t.prototype.getTileRangeForExtentAndZ=function(t,e,r){var n=Js;this.getTileCoordForXYAndZ_(t[0],t[3],e,!1,n);var i=n[1],o=n[2];return this.getTileCoordForXYAndZ_(t[2],t[1],e,!0,n),Vs(i,n[1],o,n[2],r)},t.prototype.getTileCoordCenter=function(t){var e=this.getOrigin(t[0]),r=this.getResolution(t[0]),n=Eo(this.getTileSize(t[0]),this.tmpSize_);return[e[0]+(t[1]+.5)*n[0]*r,e[1]-(t[2]+.5)*n[1]*r]},t.prototype.getTileCoordExtent=function(t,e){var r=this.getOrigin(t[0]),n=this.getResolution(t[0]),i=Eo(this.getTileSize(t[0]),this.tmpSize_),o=r[0]+t[1]*i[0]*n,a=r[1]-(t[2]+1)*i[1]*n;return dt(o,a,o+i[0]*n,a+i[1]*n,e)},t.prototype.getTileCoordForCoordAndResolution=function(t,e,r){return this.getTileCoordForXYAndResolution_(t[0],t[1],e,!1,r)},t.prototype.getTileCoordForXYAndResolution_=function(t,e,r,n,i){var o=this.getZForResolution(r),a=r/this.getResolution(o),s=this.getOrigin(o),u=Eo(this.getTileSize(o),this.tmpSize_),l=n?.5:0,h=n?.5:0,c=Math.floor((t-s[0])/r+l),p=Math.floor((s[1]-e)/r+h),f=a*c/u[0],d=a*p/u[1];return n?(f=Math.ceil(f)-1,d=Math.ceil(d)-1):(f=Math.floor(f),d=Math.floor(d)),Zs(o,f,d,i)},t.prototype.getTileCoordForXYAndZ_=function(t,e,r,n,i){var o=this.getOrigin(r),a=this.getResolution(r),s=Eo(this.getTileSize(r),this.tmpSize_),u=n?.5:0,l=n?.5:0,h=Math.floor((t-o[0])/a+u),c=Math.floor((o[1]-e)/a+l),p=h/s[0],f=c/s[1];return n?(p=Math.ceil(p)-1,f=Math.ceil(f)-1):(p=Math.floor(p),f=Math.floor(f)),Zs(r,p,f,i)},t.prototype.getTileCoordForCoordAndZ=function(t,e,r){return this.getTileCoordForXYAndZ_(t[0],t[1],e,!1,r)},t.prototype.getTileCoordResolution=function(t){return this.resolutions_[t[0]]},t.prototype.getTileSize=function(t){return this.tileSize_?this.tileSize_:this.tileSizes_[t]},t.prototype.getFullTileRange=function(t){return this.fullTileRanges_?this.fullTileRanges_[t]:null},t.prototype.getZForResolution=function(t,e){return Bt(J(this.resolutions_,t,e||0),this.minZoom,this.maxZoom)},t.prototype.calculateTileRanges_=function(t){for(var e=this.resolutions_.length,r=new Array(e),n=this.minZoom;n<e;++n)r[n]=this.getTileRangeForExtentAndZ(t,n);this.fullTileRanges_=r},t}();function $s(t){var e=t.getDefaultTileGrid();return e||(e=ru(t),t.setDefaultTileGrid(e)),e}function tu(t){var e=t||{},r=e.extent||Ie("EPSG:3857").getExtent(),n={extent:r,minZoom:e.minZoom,tileSize:e.tileSize,resolutions:eu(r,e.maxZoom,e.tileSize)};return new Qs(n)}function eu(t,e,r){for(var n=void 0!==e?e:wi,i=Lt(t),o=Nt(t),a=Eo(void 0!==r?r:xi),s=Math.max(o/a[0],i/a[1]),u=n+1,l=new Array(u),h=0;h<u;++h)l[h]=s/Math.pow(2,h);return l}function ru(t,e,r,n){return function(t,e,r,n){var i=void 0!==n?n:nt.TOP_LEFT,o=eu(t,e,r);return new Qs({extent:t,origin:bt(t,i),resolutions:o,tileSize:r})}(nu(t),e,r,n)}function nu(t){var e=(t=Ie(t)).getExtent();if(!e){var r=180*ne[ie.DEGREES]/t.getMetersPerUnit();e=dt(-r,-r,r,r)}return e}var iu=document.implementation.createDocument("","",null),ou="http://www.w3.org/2001/XMLSchema-instance";function au(t,e){return iu.createElementNS(t,e)}function su(t,e){return function t(e,r,n){if(e.nodeType==Node.CDATA_SECTION_NODE||e.nodeType==Node.TEXT_NODE)r?n.push(String(e.nodeValue).replace(/(\r\n|\r|\n)/g,"")):n.push(e.nodeValue);else{var i=void 0;for(i=e.firstChild;i;i=i.nextSibling)t(i,r,n)}return n}(t,e,[]).join("")}function uu(t){return"documentElement"in t}function lu(t){return(new DOMParser).parseFromString(t,"application/xml")}function hu(t,e){return function(r,n){var i=t.call(void 0!==e?e:this,r,n);void 0!==i&&$(n[n.length-1],i)}}function cu(t,e){return function(r,n){var i=t.call(void 0!==e?e:this,r,n);void 0!==i&&n[n.length-1].push(i)}}function pu(t,e){return function(r,n){var i=t.call(void 0!==e?e:this,r,n);void 0!==i&&(n[n.length-1]=i)}}function fu(t,e,r){return function(n,i){var o=t.call(void 0!==r?r:this,n,i);if(void 0!==o){var a=i[i.length-1],s=void 0!==e?e:n.localName;(s in a?a[s]:a[s]=[]).push(o)}}}function du(t,e,r){return function(n,i){var o=t.call(void 0!==r?r:this,n,i);void 0!==o&&(i[i.length-1][void 0!==e?e:n.localName]=o)}}function _u(t,e){return function(r,n,i){t.call(void 0!==e?e:this,r,n,i),i[i.length-1].node.appendChild(r)}}function gu(t,e){var r,n;return function(e,i,o){if(void 0===r){r={};var a={};a[e.localName]=t,r[e.namespaceURI]=a,n=yu(e.localName)}wu(r,n,i,o)}}function yu(t,e){var r=t;return function(t,n,i){var o=n[n.length-1].node,a=r;return void 0===a&&(a=i),au(void 0!==e?e:o.namespaceURI,a)}}var vu=yu();function mu(t,e){for(var r=e.length,n=new Array(r),i=0;i<r;++i)n[i]=t[e[i]];return n}function Eu(t,e,r){var n,i,o=void 0!==r?r:{};for(n=0,i=t.length;n<i;++n)o[t[n]]=e;return o}function Tu(t,e,r,n){var i;for(i=e.firstElementChild;i;i=i.nextElementSibling){var o=t[i.namespaceURI];if(void 0!==o){var a=o[i.localName];void 0!==a&&a.call(n,i,r)}}}function Su(t,e,r,n,i){return n.push(t),Tu(e,r,n,i),n.pop()}function wu(t,e,r,n,i,o){for(var a,s,u=(void 0!==i?i:r).length,l=0;l<u;++l)void 0!==(a=r[l])&&void 0!==(s=e.call(void 0!==o?o:this,a,n,void 0!==i?i[l]:void 0))&&t[s.namespaceURI][s.localName].call(o,s,a,n)}function xu(t,e,r,n,i,o,a){return i.push(t),wu(e,r,n,i,o,a),i.pop()}var Ou=35048,Cu=["experimental-webgl","webgl","webkit-3d","moz-webgl"];function Ru(t,e){for(var r=Cu.length,n=0;n<r;++n)try{var i=t.getContext(Cu[n],e);if(i)return i}catch(t){}return null}var Pu;if("undefined"!=typeof window&&"WebGLRenderingContext"in window)try{var bu=Ru(document.createElement("canvas"));bu&&(!0,bu.getParameter(bu.MAX_TEXTURE_SIZE),Pu=bu.getSupportedExtensions())}catch(t){}var Iu={LOST:"webglcontextlost",RESTORED:"webglcontextrestored"};function Lu(t,e){return t[0]=e[0],t[1]=e[1],t[4]=e[2],t[5]=e[3],t[12]=e[4],t[13]=e[5],t}var Mu="\n  precision mediump float;\n  \n  attribute vec2 a_position;\n  varying vec2 v_texCoord;\n  varying vec2 v_screenCoord;\n  \n  uniform vec2 u_screenSize;\n   \n  void main() {\n    v_texCoord = a_position * 0.5 + 0.5;\n    v_screenCoord = v_texCoord * u_screenSize;\n    gl_Position = vec4(a_position, 0.0, 1.0);\n  }\n",Fu="\n  precision mediump float;\n   \n  uniform sampler2D u_image;\n   \n  varying vec2 v_texCoord;\n  varying vec2 v_screenCoord;\n   \n  void main() {\n    gl_FragColor = texture2D(u_image, v_texCoord);\n    gl_FragColor.rgb *= gl_FragColor.a;\n  }\n",Au=function(){function t(t){this.gl_=t.webGlContext;var e=this.gl_;this.scaleRatio_=t.scaleRatio||1,this.renderTargetTexture_=e.createTexture(),this.renderTargetTextureSize_=null,this.frameBuffer_=e.createFramebuffer();var r=e.createShader(e.VERTEX_SHADER);e.shaderSource(r,t.vertexShader||Mu),e.compileShader(r);var n=e.createShader(e.FRAGMENT_SHADER);e.shaderSource(n,t.fragmentShader||Fu),e.compileShader(n),this.renderTargetProgram_=e.createProgram(),e.attachShader(this.renderTargetProgram_,r),e.attachShader(this.renderTargetProgram_,n),e.linkProgram(this.renderTargetProgram_),this.renderTargetVerticesBuffer_=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,this.renderTargetVerticesBuffer_),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,-1,1,1,-1,1]),e.STATIC_DRAW),this.renderTargetAttribLocation_=e.getAttribLocation(this.renderTargetProgram_,"a_position"),this.renderTargetUniformLocation_=e.getUniformLocation(this.renderTargetProgram_,"u_screenSize"),this.renderTargetTextureLocation_=e.getUniformLocation(this.renderTargetProgram_,"u_image"),this.uniforms_=[],t.uniforms&&Object.keys(t.uniforms).forEach(function(r){this.uniforms_.push({value:t.uniforms[r],location:e.getUniformLocation(this.renderTargetProgram_,r)})}.bind(this))}return t.prototype.getGL=function(){return this.gl_},t.prototype.init=function(t){var e=this.getGL(),r=e.canvas,n=t.size;if(e.bindFramebuffer(e.FRAMEBUFFER,this.getFrameBuffer()),e.viewport(0,0,r.width*this.scaleRatio_,r.height*this.scaleRatio_),!this.renderTargetTextureSize_||this.renderTargetTextureSize_[0]!==n[0]||this.renderTargetTextureSize_[1]!==n[1]){this.renderTargetTextureSize_=n;var i=e.RGBA,o=e.RGBA,a=e.UNSIGNED_BYTE;e.bindTexture(e.TEXTURE_2D,this.renderTargetTexture_),e.texImage2D(e.TEXTURE_2D,0,i,r.width*this.scaleRatio_,r.height*this.scaleRatio_,0,o,a,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,this.renderTargetTexture_,0)}},t.prototype.apply=function(t,e){var r=this.getGL(),n=r.canvas;r.bindFramebuffer(r.FRAMEBUFFER,e?e.getFrameBuffer():null),r.activeTexture(r.TEXTURE0),r.bindTexture(r.TEXTURE_2D,this.renderTargetTexture_),r.clearColor(0,0,0,0),r.clear(r.COLOR_BUFFER_BIT),r.enable(r.BLEND),r.blendFunc(r.ONE,r.ONE_MINUS_SRC_ALPHA),r.viewport(0,0,n.width,n.height),r.bindBuffer(r.ARRAY_BUFFER,this.renderTargetVerticesBuffer_),r.useProgram(this.renderTargetProgram_),r.enableVertexAttribArray(this.renderTargetAttribLocation_),r.vertexAttribPointer(this.renderTargetAttribLocation_,2,r.FLOAT,!1,0,0),r.uniform2f(this.renderTargetUniformLocation_,n.width,n.height),r.uniform1i(this.renderTargetTextureLocation_,0),this.applyUniforms(t),r.drawArrays(r.TRIANGLES,0,6)},t.prototype.getFrameBuffer=function(){return this.frameBuffer_},t.prototype.applyUniforms=function(t){var e,r=this.getGL(),n=1;this.uniforms_.forEach(function(i){if((e="function"==typeof i.value?i.value(t):i.value)instanceof HTMLCanvasElement||e instanceof ImageData)i.texture||(i.texture=r.createTexture()),r.activeTexture(r["TEXTURE"+n]),r.bindTexture(r.TEXTURE_2D,i.texture),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE),e instanceof ImageData?r.texImage2D(r.TEXTURE_2D,0,r.RGBA,r.RGBA,e.width,e.height,0,r.UNSIGNED_BYTE,new Uint8Array(e.data)):r.texImage2D(r.TEXTURE_2D,0,r.RGBA,r.RGBA,r.UNSIGNED_BYTE,e),r.uniform1i(i.location,n++);else if(Array.isArray(e))switch(e.length){case 2:return void r.uniform2f(i.location,e[0],e[1]);case 3:return void r.uniform3f(i.location,e[0],e[1],e[2]);case 4:return void r.uniform4f(i.location,e[0],e[1],e[2],e[3]);default:return}else"number"==typeof e&&r.uniform1f(i.location,e)})},t}(),Nu=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),Gu="u_projectionMatrix",Du="u_offsetScaleMatrix",ku="u_offsetRotateMatrix",ju="a_position",Uu="a_texCoord",Yu="a_opacity",Xu="a_rotateWithView",Bu="a_offsets",zu="a_color",Vu=function(t){function e(e){var r=t.call(this)||this,n=e||{};r.canvas_=document.createElement("canvas"),r.canvas_.style.position="absolute",r.gl_=Ru(r.canvas_);var i=r.getGL();return r.bufferCache_={},r.shaderCache_=[],r.programCache_=[],r.currentProgram_=null,r.hasOESElementIndexUint=q(Pu,"OES_element_index_uint"),r.hasOESElementIndexUint&&i.getExtension("OES_element_index_uint"),E(r.canvas_,Iu.LOST,r.handleWebGLContextLost,r),E(r.canvas_,Iu.RESTORED,r.handleWebGLContextRestored,r),r.projectionMatrix_=[1,0,0,1,0,0],r.offsetRotateMatrix_=[1,0,0,1,0,0],r.offsetScaleMatrix_=[1,0,0,1,0,0],r.tmpMat4_=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],r.uniformLocations_={},r.attribLocations_={},r.uniforms_=[],n.uniforms&&Object.keys(n.uniforms).forEach(function(t){this.uniforms_.push({name:t,value:n.uniforms[t]})}.bind(r)),r.postProcessPasses_=n.postProcesses?n.postProcesses.map(function(t){return new Au({webGlContext:i,scaleRatio:t.scaleRatio,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader,uniforms:t.uniforms})}):[new Au({webGlContext:i})],r.shaderCompileErrors_=null,r}return Nu(e,t),e.prototype.bindBuffer=function(t,e){var r,n=this.getGL(),i=e.getArray(),a=o(e),s=this.bufferCache_[a];if(!s){var u=n.createBuffer();s=this.bufferCache_[a]={buf:e,buffer:u}}n.bindBuffer(t,s.buffer),34962==t?r=new Float32Array(i):34963==t&&(r=this.hasOESElementIndexUint?new Uint32Array(i):new Uint16Array(i)),n.bufferData(t,r,e.getUsage())},e.prototype.deleteBuffer=function(t){var e=this.getGL(),r=o(t),n=this.bufferCache_[r];e.isContextLost()||e.deleteBuffer(n.buffer),delete this.bufferCache_[r]},e.prototype.disposeInternal=function(){x(this.canvas_);var t=this.getGL();if(!t.isContextLost()){for(var e in this.bufferCache_)t.deleteBuffer(this.bufferCache_[e].buffer);for(var e in this.programCache_)t.deleteProgram(this.programCache_[e]);for(var e in this.shaderCache_)t.deleteShader(this.shaderCache_[e])}},e.prototype.prepareDraw=function(t){var e=this.getGL(),r=this.getCanvas(),n=t.size,i=t.pixelRatio;r.width=n[0]*i,r.height=n[1]*i,r.style.width=n[0]+"px",r.style.height=n[1]+"px",e.useProgram(this.currentProgram_);for(var o=this.postProcessPasses_.length-1;o>=0;o--)this.postProcessPasses_[o].init(t);e.bindTexture(e.TEXTURE_2D,null),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA),this.applyFrameState(t),this.applyUniforms(t)},e.prototype.drawElements=function(t,e){var r=this.getGL(),n=this.hasOESElementIndexUint?r.UNSIGNED_INT:r.UNSIGNED_SHORT,i=e-t,o=t*(this.hasOESElementIndexUint?4:2);r.drawElements(r.TRIANGLES,i,n,o)},e.prototype.finalizeDraw=function(t){for(var e=0;e<this.postProcessPasses_.length;e++)this.postProcessPasses_[e].apply(t,this.postProcessPasses_[e+1]||null)},e.prototype.getCanvas=function(){return this.canvas_},e.prototype.getGL=function(){return this.gl_},e.prototype.applyFrameState=function(t){var e=t.size,r=t.viewState.rotation,n=t.viewState.resolution,i=t.viewState.center,o=Xe(this.projectionMatrix_);Ze(o,2/(n*e[0]),2/(n*e[1])),We(o,-r),He(o,-i[0],-i[1]);var a=Xe(this.offsetScaleMatrix_);Ze(a,2/e[0],2/e[1]);var s=Xe(this.offsetRotateMatrix_);0!==r&&We(s,-r),this.setUniformMatrixValue(Gu,Lu(this.tmpMat4_,o)),this.setUniformMatrixValue(Du,Lu(this.tmpMat4_,a)),this.setUniformMatrixValue(ku,Lu(this.tmpMat4_,s))},e.prototype.applyUniforms=function(t){var e,r=this.getGL(),n=0;this.uniforms_.forEach(function(i){if((e="function"==typeof i.value?i.value(t):i.value)instanceof HTMLCanvasElement||e instanceof HTMLImageElement||e instanceof ImageData)i.texture||(i.texture=r.createTexture()),r.activeTexture(r["TEXTURE"+n]),r.bindTexture(r.TEXTURE_2D,i.texture),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE),r.texImage2D(r.TEXTURE_2D,0,r.RGBA,r.RGBA,r.UNSIGNED_BYTE,e),r.uniform1i(this.getUniformLocation(i.name),n++);else if(Array.isArray(e))switch(e.length){case 2:return void r.uniform2f(this.getUniformLocation(i.name),e[0],e[1]);case 3:return void r.uniform3f(this.getUniformLocation(i.name),e[0],e[1],e[2]);case 4:return void r.uniform4f(this.getUniformLocation(i.name),e[0],e[1],e[2],e[3]);default:return}else"number"==typeof e&&r.uniform1f(this.getUniformLocation(i.name),e)}.bind(this))},e.prototype.useProgram=function(t){return t!=this.currentProgram_&&(this.getGL().useProgram(t),this.currentProgram_=t,this.uniformLocations_={},this.attribLocations_={},!0)},e.prototype.compileShader=function(t,e){var r=this.getGL(),n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),this.shaderCache_.push(n),n},e.prototype.getProgram=function(t,e){var r=this.getGL(),n=this.compileShader(t,r.FRAGMENT_SHADER),i=this.compileShader(e,r.VERTEX_SHADER);this.shaderCompileErrors_=null,r.getShaderInfoLog(n)&&(this.shaderCompileErrors_="Fragment shader compilation failed:\n"+r.getShaderInfoLog(n)),r.getShaderInfoLog(i)&&(this.shaderCompileErrors_=(this.shaderCompileErrors_||"")+"Vertex shader compilation failed:\n"+r.getShaderInfoLog(i));var o=r.createProgram();return r.attachShader(o,n),r.attachShader(o,i),r.linkProgram(o),this.programCache_.push(o),o},e.prototype.getShaderCompileErrors=function(){return this.shaderCompileErrors_},e.prototype.getUniformLocation=function(t){return void 0===this.uniformLocations_[t]&&(this.uniformLocations_[t]=this.getGL().getUniformLocation(this.currentProgram_,t)),this.uniformLocations_[t]},e.prototype.getAttributeLocation=function(t){return void 0===this.attribLocations_[t]&&(this.attribLocations_[t]=this.getGL().getAttribLocation(this.currentProgram_,t)),this.attribLocations_[t]},e.prototype.setUniformFloatValue=function(t,e){this.getGL().uniform1f(this.getUniformLocation(t),e)},e.prototype.setUniformMatrixValue=function(t,e){this.getGL().uniformMatrix4fv(this.getUniformLocation(t),!1,e)},e.prototype.enableAttributeArray=function(t,e,r,n,i){var o=this.getAttributeLocation(t);o<0||(this.getGL().enableVertexAttribArray(o),this.getGL().vertexAttribPointer(o,e,r,!1,n,i))},e.prototype.handleWebGLContextLost=function(){f(this.bufferCache_),f(this.shaderCache_),f(this.programCache_),this.currentProgram_=null},e.prototype.handleWebGLContextRestored=function(){},e.prototype.createTextureInternal=function(t,e){var r=this.getGL(),n=r.createTexture();return r.bindTexture(r.TEXTURE_2D,n),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MAG_FILTER,r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.LINEAR),void 0!==t&&r.texParameteri(3553,10242,t),void 0!==e&&r.texParameteri(3553,10243,e),n},e.prototype.createEmptyTexture=function(t,e,r,n){var i=this.getGL(),o=this.createTextureInternal(r,n);return i.texImage2D(i.TEXTURE_2D,0,i.RGBA,t,e,0,i.RGBA,i.UNSIGNED_BYTE,null),o},e.prototype.createTexture=function(t,e,r){var n=this.getGL(),i=this.createTextureInternal(e,r);return n.texImage2D(n.TEXTURE_2D,0,n.RGBA,n.RGBA,n.UNSIGNED_BYTE,t),i},e}(O),Wu=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),Zu=function(t){function e(e){var r=t.call(this,{extent:e.extent,origin:e.origin,origins:e.origins,resolutions:e.resolutions,tileSize:e.tileSize,tileSizes:e.tileSizes,sizes:e.sizes})||this;return r.matrixIds_=e.matrixIds,r}return Wu(e,t),e.prototype.getMatrixId=function(t){return this.matrixIds_[t]},e.prototype.getMatrixIds=function(){return this.matrixIds_},e}(Qs),Ku=Zu;function Hu(t,e,r){var n=[],i=[],o=[],a=[],s=[],u=void 0!==r?r:[],l=t.SupportedCRS,h=Ie(l.replace(/urn:ogc:def:crs:(\w+):(.*:)?(\w+)$/,"$1:$3"))||Ie(l),c=h.getMetersPerUnit(),p="ne"==h.getAxisOrientation().substr(0,2);return t.TileMatrix.sort(function(t,e){return e.ScaleDenominator-t.ScaleDenominator}),t.TileMatrix.forEach(function(e){if(!(u.length>0)||tt(u,function(r){return e.Identifier==r.TileMatrix||-1===e.Identifier.indexOf(":")&&t.Identifier+":"+e.Identifier===r.TileMatrix})){i.push(e.Identifier);var r=28e-5*e.ScaleDenominator/c,l=e.TileWidth,h=e.TileHeight;p?o.push([e.TopLeftCorner[1],e.TopLeftCorner[0]]):o.push(e.TopLeftCorner),n.push(r),a.push(l==h?l:[l,h]),s.push([e.MatrixWidth,e.MatrixHeight])}}),new Zu({extent:e,origins:o,resolutions:n,matrixIds:i,tileSizes:a,sizes:s})}var qu={IDLE:0,LOADING:1,LOADED:2,ERROR:3},Ju=function(){function t(t){this.opacity_=t.opacity,this.rotateWithView_=t.rotateWithView,this.rotation_=t.rotation,this.scale_=t.scale}return t.prototype.clone=function(){return new t({opacity:this.getOpacity(),scale:this.getScale(),rotation:this.getRotation(),rotateWithView:this.getRotateWithView()})},t.prototype.getOpacity=function(){return this.opacity_},t.prototype.getRotateWithView=function(){return this.rotateWithView_},t.prototype.getRotation=function(){return this.rotation_},t.prototype.getScale=function(){return this.scale_},t.prototype.getAnchor=function(){return n()},t.prototype.getImage=function(t){return n()},t.prototype.getHitDetectionImage=function(t){return n()},t.prototype.getImageState=function(){return n()},t.prototype.getImageSize=function(){return n()},t.prototype.getHitDetectionImageSize=function(){return n()},t.prototype.getOrigin=function(){return n()},t.prototype.getSize=function(){return n()},t.prototype.setOpacity=function(t){this.opacity_=t},t.prototype.setRotateWithView=function(t){this.rotateWithView_=t},t.prototype.setRotation=function(t){this.rotation_=t},t.prototype.setScale=function(t){this.scale_=t},t.prototype.listenImageChange=function(t,e){return n()},t.prototype.load=function(){n()},t.prototype.unlistenImageChange=function(t,e){n()},t}(),Qu=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),$u=function(t){function e(e){var r=this,n=void 0!==e.rotateWithView&&e.rotateWithView;return(r=t.call(this,{opacity:1,rotateWithView:n,rotation:void 0!==e.rotation?e.rotation:0,scale:1})||this).canvas_=null,r.hitDetectionCanvas_=null,r.fill_=void 0!==e.fill?e.fill:null,r.origin_=[0,0],r.points_=e.points,r.radius_=void 0!==e.radius?e.radius:e.radius1,r.radius2_=e.radius2,r.angle_=void 0!==e.angle?e.angle:0,r.stroke_=void 0!==e.stroke?e.stroke:null,r.anchor_=null,r.size_=null,r.imageSize_=null,r.hitDetectionImageSize_=null,r.render_(),r}return Qu(e,t),e.prototype.clone=function(){var t=new e({fill:this.getFill()?this.getFill().clone():void 0,points:this.getPoints(),radius:this.getRadius(),radius2:this.getRadius2(),angle:this.getAngle(),stroke:this.getStroke()?this.getStroke().clone():void 0,rotation:this.getRotation(),rotateWithView:this.getRotateWithView()});return t.setOpacity(this.getOpacity()),t.setScale(this.getScale()),t},e.prototype.getAnchor=function(){return this.anchor_},e.prototype.getAngle=function(){return this.angle_},e.prototype.getFill=function(){return this.fill_},e.prototype.getHitDetectionImage=function(t){return this.hitDetectionCanvas_},e.prototype.getImage=function(t){return this.canvas_},e.prototype.getImageSize=function(){return this.imageSize_},e.prototype.getHitDetectionImageSize=function(){return this.hitDetectionImageSize_},e.prototype.getImageState=function(){return qu.LOADED},e.prototype.getOrigin=function(){return this.origin_},e.prototype.getPoints=function(){return this.points_},e.prototype.getRadius=function(){return this.radius_},e.prototype.getRadius2=function(){return this.radius2_},e.prototype.getSize=function(){return this.size_},e.prototype.getStroke=function(){return this.stroke_},e.prototype.listenImageChange=function(t,e){},e.prototype.load=function(){},e.prototype.unlistenImageChange=function(t,e){},e.prototype.render_=function(){var t,e="",r="",n=0,i=null,o=0,a=0;this.stroke_&&(null===(t=this.stroke_.getColor())&&(t="#000"),t=_s(t),void 0===(a=this.stroke_.getWidth())&&(a=1),i=this.stroke_.getLineDash(),o=this.stroke_.getLineDashOffset(),void 0===(r=this.stroke_.getLineJoin())&&(r="round"),void 0===(e=this.stroke_.getLineCap())&&(e="round"),void 0===(n=this.stroke_.getMiterLimit())&&(n=10));var s=2*(this.radius_+a)+1,u={strokeStyle:t,strokeWidth:a,size:s,lineCap:e,lineDash:i,lineDashOffset:o,lineJoin:r,miterLimit:n},l=io(s,s);this.canvas_=l.canvas;var h=s=this.canvas_.width;this.draw_(u,l,0,0),this.createHitDetectionCanvas_(u),this.anchor_=[s/2,s/2],this.size_=[s,s],this.imageSize_=[h,h]},e.prototype.draw_=function(t,e,r,n){var i,o,a;e.setTransform(1,0,0,1,0,0),e.translate(r,n),e.beginPath();var s=this.points_;if(s===1/0)e.arc(t.size/2,t.size/2,this.radius_,0,2*Math.PI,!0);else{var u=void 0!==this.radius2_?this.radius2_:this.radius_;for(u!==this.radius_&&(s*=2),i=0;i<=s;i++)o=2*i*Math.PI/s-Math.PI/2+this.angle_,a=i%2==0?this.radius_:u,e.lineTo(t.size/2+a*Math.cos(o),t.size/2+a*Math.sin(o))}if(this.fill_){var l=this.fill_.getColor();null===l&&(l="#000"),e.fillStyle=_s(l),e.fill()}this.stroke_&&(e.strokeStyle=t.strokeStyle,e.lineWidth=t.strokeWidth,e.setLineDash&&t.lineDash&&(e.setLineDash(t.lineDash),e.lineDashOffset=t.lineDashOffset),e.lineCap=t.lineCap,e.lineJoin=t.lineJoin,e.miterLimit=t.miterLimit,e.stroke()),e.closePath()},e.prototype.createHitDetectionCanvas_=function(t){if(this.hitDetectionImageSize_=[t.size,t.size],this.fill_)this.hitDetectionCanvas_=this.canvas_;else{var e=io(t.size,t.size);this.hitDetectionCanvas_=e.canvas,this.drawHitDetectionCanvas_(t,e,0,0)}},e.prototype.drawHitDetectionCanvas_=function(t,e,r,n){e.setTransform(1,0,0,1,0,0),e.translate(r,n),e.beginPath();var i=this.points_;if(i===1/0)e.arc(t.size/2,t.size/2,this.radius_,0,2*Math.PI,!0);else{var o=void 0!==this.radius2_?this.radius2_:this.radius_;o!==this.radius_&&(i*=2);var a=void 0,s=void 0,u=void 0;for(a=0;a<=i;a++)u=2*a*Math.PI/i-Math.PI/2+this.angle_,s=a%2==0?this.radius_:o,e.lineTo(t.size/2+s*Math.cos(u),t.size/2+s*Math.sin(u))}e.fillStyle="#000",e.fill(),this.stroke_&&(e.strokeStyle=t.strokeStyle,e.lineWidth=t.strokeWidth,t.lineDash&&(e.setLineDash(t.lineDash),e.lineDashOffset=t.lineDashOffset),e.stroke()),e.closePath()},e}(Ju),tl=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),el=function(t){function e(e){var r=e||{};return t.call(this,{points:1/0,fill:r.fill,radius:r.radius,stroke:r.stroke})||this}return tl(e,t),e.prototype.clone=function(){var t=new e({fill:this.getFill()?this.getFill().clone():void 0,stroke:this.getStroke()?this.getStroke().clone():void 0,radius:this.getRadius()});return t.setOpacity(this.getOpacity()),t.setScale(this.getScale()),t},e.prototype.setRadius=function(t){this.radius_=t},e}($u),rl=function(){function t(t){var e=t||{};this.color_=void 0!==e.color?e.color:null}return t.prototype.clone=function(){var e=this.getColor();return new t({color:Array.isArray(e)?e.slice():e||void 0})},t.prototype.getColor=function(){return this.color_},t.prototype.setColor=function(t){this.color_=t},t}(),nl={FRACTION:"fraction",PIXELS:"pixels"},il=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),ol=function(t){function e(e,r,n,i,o,a){var s=t.call(this)||this;return s.hitDetectionImage_=null,s.image_=e||new Image,null!==i&&(s.image_.crossOrigin=i),s.canvas_=a?document.createElement("canvas"):null,s.color_=a,s.imageListenerKeys_=null,s.imageState_=o,s.size_=n,s.src_=r,s.tainted_,s}return il(e,t),e.prototype.isTainted_=function(){if(void 0===this.tainted_&&this.imageState_===qu.LOADED){this.tainted_=!1;var t=io(1,1);try{t.drawImage(this.image_,0,0),t.getImageData(0,0,1,1)}catch(t){this.tainted_=!0}}return!0===this.tainted_},e.prototype.dispatchChangeEvent_=function(){this.dispatchEvent(F.CHANGE)},e.prototype.handleImageError_=function(){this.imageState_=qu.ERROR,this.unlistenImage_(),this.dispatchChangeEvent_()},e.prototype.handleImageLoad_=function(){this.imageState_=qu.LOADED,this.size_&&(this.image_.width=this.size_[0],this.image_.height=this.size_[1]),this.size_=[this.image_.width,this.image_.height],this.unlistenImage_(),this.replaceColor_(),this.dispatchChangeEvent_()},e.prototype.getImage=function(t){return this.canvas_?this.canvas_:this.image_},e.prototype.getImageState=function(){return this.imageState_},e.prototype.getHitDetectionImage=function(t){if(!this.hitDetectionImage_)if(this.isTainted_()){var e=this.size_[0],r=this.size_[1],n=io(e,r);n.fillRect(0,0,e,r),this.hitDetectionImage_=n.canvas}else this.hitDetectionImage_=this.image_;return this.hitDetectionImage_},e.prototype.getSize=function(){return this.size_},e.prototype.getSrc=function(){return this.src_},e.prototype.load=function(){if(this.imageState_==qu.IDLE){this.imageState_=qu.LOADING,this.imageListenerKeys_=[T(this.image_,F.ERROR,this.handleImageError_,this),T(this.image_,F.LOAD,this.handleImageLoad_,this)];try{this.image_.src=this.src_}catch(t){this.handleImageError_()}}},e.prototype.replaceColor_=function(){if(this.color_&&!this.isTainted_()){this.canvas_.width=this.image_.width,this.canvas_.height=this.image_.height;var t=this.canvas_.getContext("2d");t.drawImage(this.image_,0,0);for(var e=t.getImageData(0,0,this.image_.width,this.image_.height),r=e.data,n=this.color_[0]/255,i=this.color_[1]/255,o=this.color_[2]/255,a=0,s=r.length;a<s;a+=4)r[a]*=n,r[a+1]*=i,r[a+2]*=o;t.putImageData(e,0,0)}},e.prototype.unlistenImage_=function(){this.imageListenerKeys_.forEach(w),this.imageListenerKeys_=null},e}(M);var al={BOTTOM_LEFT:"bottom-left",BOTTOM_RIGHT:"bottom-right",TOP_LEFT:"top-left",TOP_RIGHT:"top-right"},sl=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),ul=function(t){function e(e){var r=this,n=e||{},i=void 0!==n.opacity?n.opacity:1,a=void 0!==n.rotation?n.rotation:0,s=void 0!==n.scale?n.scale:1,u=void 0!==n.rotateWithView&&n.rotateWithView;(r=t.call(this,{opacity:i,rotation:a,scale:s,rotateWithView:u})||this).anchor_=void 0!==n.anchor?n.anchor:[.5,.5],r.normalizedAnchor_=null,r.anchorOrigin_=void 0!==n.anchorOrigin?n.anchorOrigin:al.TOP_LEFT,r.anchorXUnits_=void 0!==n.anchorXUnits?n.anchorXUnits:nl.FRACTION,r.anchorYUnits_=void 0!==n.anchorYUnits?n.anchorYUnits:nl.FRACTION,r.crossOrigin_=void 0!==n.crossOrigin?n.crossOrigin:null;var l=void 0!==n.img?n.img:null,h=void 0!==n.imgSize?n.imgSize:null,c=n.src;W(!(void 0!==c&&l),4),W(!l||l&&h,5),void 0!==c&&0!==c.length||!l||(c=l.src||o(l)),W(void 0!==c&&c.length>0,6);var p=void 0!==n.src?qu.IDLE:qu.LOADED;return r.color_=void 0!==n.color?Qa(n.color):null,r.iconImage_=function(t,e,r,n,i,o){var a=ns.get(e,n,o);return a||(a=new ol(t,e,r,n,i,o),ns.set(e,n,o,a)),a}(l,c,h,r.crossOrigin_,p,r.color_),r.offset_=void 0!==n.offset?n.offset:[0,0],r.offsetOrigin_=void 0!==n.offsetOrigin?n.offsetOrigin:al.TOP_LEFT,r.origin_=null,r.size_=void 0!==n.size?n.size:null,r}return sl(e,t),e.prototype.clone=function(){return new e({anchor:this.anchor_.slice(),anchorOrigin:this.anchorOrigin_,anchorXUnits:this.anchorXUnits_,anchorYUnits:this.anchorYUnits_,crossOrigin:this.crossOrigin_,color:this.color_&&this.color_.slice?this.color_.slice():this.color_||void 0,src:this.getSrc(),offset:this.offset_.slice(),offsetOrigin:this.offsetOrigin_,size:null!==this.size_?this.size_.slice():void 0,opacity:this.getOpacity(),scale:this.getScale(),rotation:this.getRotation(),rotateWithView:this.getRotateWithView()})},e.prototype.getAnchor=function(){if(this.normalizedAnchor_)return this.normalizedAnchor_;var t=this.anchor_,e=this.getSize();if(this.anchorXUnits_==nl.FRACTION||this.anchorYUnits_==nl.FRACTION){if(!e)return null;t=this.anchor_.slice(),this.anchorXUnits_==nl.FRACTION&&(t[0]*=e[0]),this.anchorYUnits_==nl.FRACTION&&(t[1]*=e[1])}if(this.anchorOrigin_!=al.TOP_LEFT){if(!e)return null;t===this.anchor_&&(t=this.anchor_.slice()),this.anchorOrigin_!=al.TOP_RIGHT&&this.anchorOrigin_!=al.BOTTOM_RIGHT||(t[0]=-t[0]+e[0]),this.anchorOrigin_!=al.BOTTOM_LEFT&&this.anchorOrigin_!=al.BOTTOM_RIGHT||(t[1]=-t[1]+e[1])}return this.normalizedAnchor_=t,this.normalizedAnchor_},e.prototype.setAnchor=function(t){this.anchor_=t,this.normalizedAnchor_=null},e.prototype.getColor=function(){return this.color_},e.prototype.getImage=function(t){return this.iconImage_.getImage(t)},e.prototype.getImageSize=function(){return this.iconImage_.getSize()},e.prototype.getHitDetectionImageSize=function(){return this.getImageSize()},e.prototype.getImageState=function(){return this.iconImage_.getImageState()},e.prototype.getHitDetectionImage=function(t){return this.iconImage_.getHitDetectionImage(t)},e.prototype.getOrigin=function(){if(this.origin_)return this.origin_;var t=this.offset_;if(this.offsetOrigin_!=al.TOP_LEFT){var e=this.getSize(),r=this.iconImage_.getSize();if(!e||!r)return null;t=t.slice(),this.offsetOrigin_!=al.TOP_RIGHT&&this.offsetOrigin_!=al.BOTTOM_RIGHT||(t[0]=r[0]-e[0]-t[0]),this.offsetOrigin_!=al.BOTTOM_LEFT&&this.offsetOrigin_!=al.BOTTOM_RIGHT||(t[1]=r[1]-e[1]-t[1])}return this.origin_=t,this.origin_},e.prototype.getSrc=function(){return this.iconImage_.getSrc()},e.prototype.getSize=function(){return this.size_?this.size_:this.iconImage_.getSize()},e.prototype.listenImageChange=function(t,e){return E(this.iconImage_,F.CHANGE,t,e)},e.prototype.load=function(){this.iconImage_.load()},e.prototype.unlistenImageChange=function(t,e){S(this.iconImage_,F.CHANGE,t,e)},e}(Ju),ll=function(){function t(t){var e=t||{};this.color_=void 0!==e.color?e.color:null,this.lineCap_=e.lineCap,this.lineDash_=void 0!==e.lineDash?e.lineDash:null,this.lineDashOffset_=e.lineDashOffset,this.lineJoin_=e.lineJoin,this.miterLimit_=e.miterLimit,this.width_=e.width}return t.prototype.clone=function(){var e=this.getColor();return new t({color:Array.isArray(e)?e.slice():e||void 0,lineCap:this.getLineCap(),lineDash:this.getLineDash()?this.getLineDash().slice():void 0,lineDashOffset:this.getLineDashOffset(),lineJoin:this.getLineJoin(),miterLimit:this.getMiterLimit(),width:this.getWidth()})},t.prototype.getColor=function(){return this.color_},t.prototype.getLineCap=function(){return this.lineCap_},t.prototype.getLineDash=function(){return this.lineDash_},t.prototype.getLineDashOffset=function(){return this.lineDashOffset_},t.prototype.getLineJoin=function(){return this.lineJoin_},t.prototype.getMiterLimit=function(){return this.miterLimit_},t.prototype.getWidth=function(){return this.width_},t.prototype.setColor=function(t){this.color_=t},t.prototype.setLineCap=function(t){this.lineCap_=t},t.prototype.setLineDash=function(t){this.lineDash_=t},t.prototype.setLineDashOffset=function(t){this.lineDashOffset_=t},t.prototype.setLineJoin=function(t){this.lineJoin_=t},t.prototype.setMiterLimit=function(t){this.miterLimit_=t},t.prototype.setWidth=function(t){this.width_=t},t}(),hl=function(){function t(t){var e=t||{};this.geometry_=null,this.geometryFunction_=dl,void 0!==e.geometry&&this.setGeometry(e.geometry),this.fill_=void 0!==e.fill?e.fill:null,this.image_=void 0!==e.image?e.image:null,this.renderer_=void 0!==e.renderer?e.renderer:null,this.stroke_=void 0!==e.stroke?e.stroke:null,this.text_=void 0!==e.text?e.text:null,this.zIndex_=e.zIndex}return t.prototype.clone=function(){var e=this.getGeometry();return e&&"object"==typeof e&&(e=e.clone()),new t({geometry:e,fill:this.getFill()?this.getFill().clone():void 0,image:this.getImage()?this.getImage().clone():void 0,stroke:this.getStroke()?this.getStroke().clone():void 0,text:this.getText()?this.getText().clone():void 0,zIndex:this.getZIndex()})},t.prototype.getRenderer=function(){return this.renderer_},t.prototype.setRenderer=function(t){this.renderer_=t},t.prototype.getGeometry=function(){return this.geometry_},t.prototype.getGeometryFunction=function(){return this.geometryFunction_},t.prototype.getFill=function(){return this.fill_},t.prototype.setFill=function(t){this.fill_=t},t.prototype.getImage=function(){return this.image_},t.prototype.setImage=function(t){this.image_=t},t.prototype.getStroke=function(){return this.stroke_},t.prototype.setStroke=function(t){this.stroke_=t},t.prototype.getText=function(){return this.text_},t.prototype.setText=function(t){this.text_=t},t.prototype.getZIndex=function(){return this.zIndex_},t.prototype.setGeometry=function(t){"function"==typeof t?this.geometryFunction_=t:"string"==typeof t?this.geometryFunction_=function(e){return e.get(t)}:t?void 0!==t&&(this.geometryFunction_=function(){return t}):this.geometryFunction_=dl,this.geometry_=t},t.prototype.setZIndex=function(t){this.zIndex_=t},t}();var cl=null;function pl(t,e){if(!cl){var r=new rl({color:"rgba(255,255,255,0.4)"}),n=new ll({color:"#3399CC",width:1.25});cl=[new hl({image:new el({fill:r,stroke:n,radius:5}),fill:r,stroke:n})]}return cl}function fl(){var t={},e=[255,255,255,1],r=[0,153,255,1];return t[Yt.POLYGON]=[new hl({fill:new rl({color:[255,255,255,.5]})})],t[Yt.MULTI_POLYGON]=t[Yt.POLYGON],t[Yt.LINE_STRING]=[new hl({stroke:new ll({color:e,width:5})}),new hl({stroke:new ll({color:r,width:3})})],t[Yt.MULTI_LINE_STRING]=t[Yt.LINE_STRING],t[Yt.CIRCLE]=t[Yt.POLYGON].concat(t[Yt.LINE_STRING]),t[Yt.POINT]=[new hl({image:new el({radius:6,fill:new rl({color:r}),stroke:new ll({color:e,width:1.5})}),zIndex:1/0})],t[Yt.MULTI_POINT]=t[Yt.POINT],t[Yt.GEOMETRY_COLLECTION]=t[Yt.POLYGON].concat(t[Yt.LINE_STRING],t[Yt.POINT]),t}function dl(t){return t.getGeometry()}var _l=hl,gl={POINT:"point",LINE:"line"},yl="#333",vl=function(){function t(t){var e=t||{};this.font_=e.font,this.rotation_=e.rotation,this.rotateWithView_=e.rotateWithView,this.scale_=e.scale,this.text_=e.text,this.textAlign_=e.textAlign,this.textBaseline_=e.textBaseline,this.fill_=void 0!==e.fill?e.fill:new rl({color:yl}),this.maxAngle_=void 0!==e.maxAngle?e.maxAngle:Math.PI/4,this.placement_=void 0!==e.placement?e.placement:gl.POINT,this.overflow_=!!e.overflow,this.stroke_=void 0!==e.stroke?e.stroke:null,this.offsetX_=void 0!==e.offsetX?e.offsetX:0,this.offsetY_=void 0!==e.offsetY?e.offsetY:0,this.backgroundFill_=e.backgroundFill?e.backgroundFill:null,this.backgroundStroke_=e.backgroundStroke?e.backgroundStroke:null,this.padding_=void 0===e.padding?null:e.padding}return t.prototype.clone=function(){return new t({font:this.getFont(),placement:this.getPlacement(),maxAngle:this.getMaxAngle(),overflow:this.getOverflow(),rotation:this.getRotation(),rotateWithView:this.getRotateWithView(),scale:this.getScale(),text:this.getText(),textAlign:this.getTextAlign(),textBaseline:this.getTextBaseline(),fill:this.getFill()?this.getFill().clone():void 0,stroke:this.getStroke()?this.getStroke().clone():void 0,offsetX:this.getOffsetX(),offsetY:this.getOffsetY(),backgroundFill:this.getBackgroundFill()?this.getBackgroundFill().clone():void 0,backgroundStroke:this.getBackgroundStroke()?this.getBackgroundStroke().clone():void 0})},t.prototype.getOverflow=function(){return this.overflow_},t.prototype.getFont=function(){return this.font_},t.prototype.getMaxAngle=function(){return this.maxAngle_},t.prototype.getPlacement=function(){return this.placement_},t.prototype.getOffsetX=function(){return this.offsetX_},t.prototype.getOffsetY=function(){return this.offsetY_},t.prototype.getFill=function(){return this.fill_},t.prototype.getRotateWithView=function(){return this.rotateWithView_},t.prototype.getRotation=function(){return this.rotation_},t.prototype.getScale=function(){return this.scale_},t.prototype.getStroke=function(){return this.stroke_},t.prototype.getText=function(){return this.text_},t.prototype.getTextAlign=function(){return this.textAlign_},t.prototype.getTextBaseline=function(){return this.textBaseline_},t.prototype.getBackgroundFill=function(){return this.backgroundFill_},t.prototype.getBackgroundStroke=function(){return this.backgroundStroke_},t.prototype.getPadding=function(){return this.padding_},t.prototype.setOverflow=function(t){this.overflow_=t},t.prototype.setFont=function(t){this.font_=t},t.prototype.setMaxAngle=function(t){this.maxAngle_=t},t.prototype.setOffsetX=function(t){this.offsetX_=t},t.prototype.setOffsetY=function(t){this.offsetY_=t},t.prototype.setPlacement=function(t){this.placement_=t},t.prototype.setRotateWithView=function(t){this.rotateWithView_=t},t.prototype.setFill=function(t){this.fill_=t},t.prototype.setRotation=function(t){this.rotation_=t},t.prototype.setScale=function(t){this.scale_=t},t.prototype.setStroke=function(t){this.stroke_=t},t.prototype.setText=function(t){this.text_=t},t.prototype.setTextAlign=function(t){this.textAlign_=t},t.prototype.setTextBaseline=function(t){this.textBaseline_=t},t.prototype.setBackgroundFill=function(t){this.backgroundFill_=t},t.prototype.setBackgroundStroke=function(t){this.backgroundStroke_=t},t.prototype.setPadding=function(t){this.padding_=t},t}();function ml(t,e){var r=/\{z\}/g,n=/\{x\}/g,i=/\{y\}/g,o=/\{-y\}/g;return function(a,s,u){return a?t.replace(r,a[0].toString()).replace(n,a[1].toString()).replace(i,a[2].toString()).replace(o,function(){var t=a[0],r=e.getFullTileRange(t);return W(r,55),(r.getHeight()-a[2]-1).toString()}):void 0}}function El(t,e){for(var r=t.length,n=new Array(r),i=0;i<r;++i)n[i]=ml(t[i],e);return Tl(n)}function Tl(t){return 1===t.length?t[0]:function(e,r,n){if(e){var i=Ht(qs(e),t.length);return t[i](e,r,n)}}}function Sl(t,e,r){}function wl(t){var e=[],r=/\{([a-z])-([a-z])\}/.exec(t);if(r){var n=r[1].charCodeAt(0),i=r[2].charCodeAt(0),o=void 0;for(o=n;o<=i;++o)e.push(t.replace(r[0],String.fromCharCode(o)));return e}if(r=r=/\{(\d+)-(\d+)\}/.exec(t)){for(var a=parseInt(r[2],10),s=parseInt(r[1],10);s<=a;s++)e.push(t.replace(r[0],s.toString()));return e}return e.push(t),e}function xl(t,e,r,n){var i=document.createElement("script"),a="olc_"+o(e);function s(){delete window[a],i.parentNode.removeChild(i)}i.async=!0,i.src=t+(-1==t.indexOf("?")?"?":"&")+(n||"callback")+"="+a;var u=setTimeout(function(){s(),r&&r()},1e4);window[a]=function(t){clearTimeout(u),s(),e(t)},document.getElementsByTagName("head")[0].appendChild(i)}var Ol=.5,Cl=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),Rl=function(t){function e(e,r,n){var i=t.call(this)||this,o=n||{};return i.tileCoord=e,i.state=r,i.interimTile=null,i.hifi=!0,i.key="",i.transition_=void 0===o.transition?250:o.transition,i.transitionStarts_={},i}return Cl(e,t),e.prototype.changed=function(){this.dispatchEvent(F.CHANGE)},e.prototype.getKey=function(){return this.key+"/"+this.tileCoord},e.prototype.getInterimTile=function(){if(!this.interimTile)return this;var t=this.interimTile;do{if(t.getState()==mi.LOADED)return t;t=t.interimTile}while(t);return this},e.prototype.refreshInterimChain=function(){if(this.interimTile){var t=this.interimTile,e=this;do{if(t.getState()==mi.LOADED){t.interimTile=null;break}t.getState()==mi.LOADING?e=t:t.getState()==mi.IDLE?e.interimTile=t.interimTile:e=t,t=e.interimTile}while(t)}},e.prototype.getTileCoord=function(){return this.tileCoord},e.prototype.getState=function(){return this.state},e.prototype.setState=function(t){this.state=t,this.changed()},e.prototype.load=function(){n()},e.prototype.getAlpha=function(t,e){if(!this.transition_)return 1;var r=this.transitionStarts_[t];if(r){if(-1===r)return 1}else r=e,this.transitionStarts_[t]=r;var n=e-r+1e3/60;return n>=this.transition_?1:Hi(n/this.transition_)},e.prototype.inTransition=function(t){return!!this.transition_&&-1!==this.transitionStarts_[t]},e.prototype.endTransition=function(t){this.transition_&&(this.transitionStarts_[t]=-1)},e}(M),Pl=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}();function bl(){var t=io(1,1);return t.fillStyle="rgba(0,0,0,0)",t.fillRect(0,0,1,1),t.canvas}var Il=function(t){function e(e,r,n,i,o,a){var s=t.call(this,e,r,a)||this;return s.crossOrigin_=i,s.src_=n,s.image_=new Image,null!==i&&(s.image_.crossOrigin=i),s.imageListenerKeys_=null,s.tileLoadFunction_=o,s}return Pl(e,t),e.prototype.disposeInternal=function(){this.state==mi.LOADING&&(this.unlistenImage_(),this.image_=bl()),this.interimTile&&this.interimTile.dispose(),this.state=mi.ABORT,this.changed(),t.prototype.disposeInternal.call(this)},e.prototype.getImage=function(){return this.image_},e.prototype.getKey=function(){return this.src_},e.prototype.handleImageError_=function(){this.state=mi.ERROR,this.unlistenImage_(),this.image_=bl(),this.changed()},e.prototype.handleImageLoad_=function(){var t=this.image_;t.naturalWidth&&t.naturalHeight?this.state=mi.LOADED:this.state=mi.EMPTY,this.unlistenImage_(),this.changed()},e.prototype.load=function(){this.state==mi.ERROR&&(this.state=mi.IDLE,this.image_=new Image,null!==this.crossOrigin_&&(this.image_.crossOrigin=this.crossOrigin_)),this.state==mi.IDLE&&(this.state=mi.LOADING,this.changed(),this.imageListenerKeys_=[T(this.image_,F.ERROR,this.handleImageError_,this),T(this.image_,F.LOAD,this.handleImageLoad_,this)],this.tileLoadFunction_(this,this.src_))},e.prototype.unlistenImage_=function(){this.imageListenerKeys_.forEach(w),this.imageListenerKeys_=null},e}(Rl),Ll=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),Ml=function(t){function e(e){return t.call(this,e)||this}return Ll(e,t),e.prototype.expireCache=function(t){for(;this.canExpireCache();){if(this.peekLast().getKey()in t)break;this.pop().dispose()}},e.prototype.pruneExceptNewestZ=function(){if(0!==this.getCount()){var t=function(t){return t.split("/").map(Number)}(this.peekFirstKey())[0];this.forEach(function(e){e.tileCoord[0]!==t&&(this.remove(Hs(e.tileCoord)),e.dispose())},this)}},e}(ws);function Fl(t,e,r,n){var i=je(r,e,t),o=Le(e,n,r),a=e.getMetersPerUnit();void 0!==a&&(o*=a);var s=t.getMetersPerUnit();void 0!==s&&(o/=s);var u=t.getExtent();if(!u||lt(u,i)){var l=Le(t,o,i)/o;isFinite(l)&&l>0&&(o/=l)}return o}function Al(t,e,r,n){var i=r-t,o=n-e,a=Math.sqrt(i*i+o*o);return[Math.round(r+i/a),Math.round(n+o/a)]}function Nl(t,e,r,n,i,o,a,s,u,l,h){var c=io(Math.round(r*t),Math.round(r*e));if(0===u.length)return c.canvas;c.scale(r,r);var p=[1/0,1/0,-1/0,-1/0];u.forEach(function(t,e,r){mt(p,t.extent)});var f=Nt(p),d=Lt(p),_=io(Math.round(r*f/n),Math.round(r*d/n)),g=r/n;u.forEach(function(t,e,r){var n=t.extent[0]-p[0],i=-(t.extent[3]-p[3]),o=Nt(t.extent),a=Lt(t.extent);_.drawImage(t.image,l,l,t.image.width-2*l,t.image.height-2*l,n*g,i*g,o*g,a*g)});var y=Ft(a);return s.getTriangles().forEach(function(t,e,i){var a=t.source,s=t.target,u=a[0][0],l=a[0][1],h=a[1][0],f=a[1][1],d=a[2][0],g=a[2][1],v=(s[0][0]-y[0])/o,m=-(s[0][1]-y[1])/o,E=(s[1][0]-y[0])/o,T=-(s[1][1]-y[1])/o,S=(s[2][0]-y[0])/o,w=-(s[2][1]-y[1])/o,x=u,O=l;u=0,l=0;var C=function(t){for(var e=t.length,r=0;r<e;r++){for(var n=r,i=Math.abs(t[r][r]),o=r+1;o<e;o++){var a=Math.abs(t[o][r]);a>i&&(i=a,n=o)}if(0===i)return null;var s=t[n];t[n]=t[r],t[r]=s;for(var u=r+1;u<e;u++)for(var l=-t[u][r]/t[r][r],h=r;h<e+1;h++)r==h?t[u][h]=0:t[u][h]+=l*t[r][h]}for(var c=new Array(e),p=e-1;p>=0;p--){c[p]=t[p][e]/t[p][p];for(var f=p-1;f>=0;f--)t[f][e]-=t[f][p]*c[p]}return c}([[h-=x,f-=O,0,0,E-v],[d-=x,g-=O,0,0,S-v],[0,0,h,f,T-m],[0,0,d,g,w-m]]);if(C){c.save(),c.beginPath();var R=(v+E+S)/3,P=(m+T+w)/3,b=Al(R,P,v,m),I=Al(R,P,E,T),L=Al(R,P,S,w);c.moveTo(I[0],I[1]),c.lineTo(b[0],b[1]),c.lineTo(L[0],L[1]),c.clip(),c.transform(C[0],C[2],C[1],C[3],v,m),c.translate(p[0]-x,p[3]-O),c.scale(n/r,-n/r),c.drawImage(_.canvas,0,0),c.restore()}}),h&&(c.save(),c.strokeStyle="black",c.lineWidth=1,s.getTriangles().forEach(function(t,e,r){var n=t.target,i=(n[0][0]-y[0])/o,a=-(n[0][1]-y[1])/o,s=(n[1][0]-y[0])/o,u=-(n[1][1]-y[1])/o,l=(n[2][0]-y[0])/o,h=-(n[2][1]-y[1])/o;c.beginPath(),c.moveTo(s,u),c.lineTo(i,a),c.lineTo(l,h),c.closePath(),c.stroke()}),c.restore()),c.canvas}var Gl=10,Dl=function(){function t(t,e,r,n,i){this.sourceProj_=t,this.targetProj_=e;var o={},a=ke(this.targetProj_,this.sourceProj_);this.transformInv_=function(t){var e=t[0]+"/"+t[1];return o[e]||(o[e]=a(t)),o[e]},this.maxSourceExtent_=n,this.errorThresholdSquared_=i*i,this.triangles_=[],this.wrapsXInSource_=!1,this.canWrapXInSource_=this.sourceProj_.canWrapX()&&!!n&&!!this.sourceProj_.getExtent()&&Nt(n)==Nt(this.sourceProj_.getExtent()),this.sourceWorldWidth_=this.sourceProj_.getExtent()?Nt(this.sourceProj_.getExtent()):null,this.targetWorldWidth_=this.targetProj_.getExtent()?Nt(this.targetProj_.getExtent()):null;var s=Ft(r),u=At(r),l=Rt(r),h=Ct(r),c=this.transformInv_(s),p=this.transformInv_(u),f=this.transformInv_(l),d=this.transformInv_(h);if(this.addQuad_(s,u,l,h,c,p,f,d,Gl),this.wrapsXInSource_){var _=1/0;this.triangles_.forEach(function(t,e,r){_=Math.min(_,t.source[0][0],t.source[1][0],t.source[2][0])}),this.triangles_.forEach(function(t){if(Math.max(t.source[0][0],t.source[1][0],t.source[2][0])-_>this.sourceWorldWidth_/2){var e=[[t.source[0][0],t.source[0][1]],[t.source[1][0],t.source[1][1]],[t.source[2][0],t.source[2][1]]];e[0][0]-_>this.sourceWorldWidth_/2&&(e[0][0]-=this.sourceWorldWidth_),e[1][0]-_>this.sourceWorldWidth_/2&&(e[1][0]-=this.sourceWorldWidth_),e[2][0]-_>this.sourceWorldWidth_/2&&(e[2][0]-=this.sourceWorldWidth_);var r=Math.min(e[0][0],e[1][0],e[2][0]);Math.max(e[0][0],e[1][0],e[2][0])-r<this.sourceWorldWidth_/2&&(t.source=e)}}.bind(this))}o={}}return t.prototype.addTriangle_=function(t,e,r,n,i,o){this.triangles_.push({source:[n,i,o],target:[t,e,r]})},t.prototype.addQuad_=function(t,e,r,n,i,o,a,s,u){var l=ot([i,o,a,s]),h=this.sourceWorldWidth_?Nt(l)/this.sourceWorldWidth_:null,c=this.sourceWorldWidth_,p=this.sourceProj_.canWrapX()&&h>.5&&h<1,f=!1;if(u>0){if(this.targetProj_.isGlobal()&&this.targetWorldWidth_)f=Nt(ot([t,e,r,n]))/this.targetWorldWidth_>.25||f;!p&&this.sourceProj_.isGlobal()&&h&&(f=h>.25||f)}if(f||!this.maxSourceExtent_||Gt(l,this.maxSourceExtent_)){if(!(f||isFinite(i[0])&&isFinite(i[1])&&isFinite(o[0])&&isFinite(o[1])&&isFinite(a[0])&&isFinite(a[1])&&isFinite(s[0])&&isFinite(s[1]))){if(!(u>0))return;f=!0}if(u>0){if(!f){var d=[(t[0]+r[0])/2,(t[1]+r[1])/2],_=this.transformInv_(d),g=void 0;if(p)g=(Ht(i[0],c)+Ht(a[0],c))/2-Ht(_[0],c);else g=(i[0]+a[0])/2-_[0];var y=(i[1]+a[1])/2-_[1];f=g*g+y*y>this.errorThresholdSquared_}if(f){if(Math.abs(t[0]-r[0])<=Math.abs(t[1]-r[1])){var v=[(e[0]+r[0])/2,(e[1]+r[1])/2],m=this.transformInv_(v),E=[(n[0]+t[0])/2,(n[1]+t[1])/2],T=this.transformInv_(E);this.addQuad_(t,e,v,E,i,o,m,T,u-1),this.addQuad_(E,v,r,n,T,m,a,s,u-1)}else{var S=[(t[0]+e[0])/2,(t[1]+e[1])/2],w=this.transformInv_(S),x=[(r[0]+n[0])/2,(r[1]+n[1])/2],O=this.transformInv_(x);this.addQuad_(t,S,x,n,i,w,O,s,u-1),this.addQuad_(S,e,r,x,w,o,a,O,u-1)}return}}if(p){if(!this.canWrapXInSource_)return;this.wrapsXInSource_=!0}this.addTriangle_(t,r,n,i,a,s),this.addTriangle_(t,e,r,i,o,a)}},t.prototype.calculateSourceExtent=function(){var t=[1/0,1/0,-1/0,-1/0];return this.triangles_.forEach(function(e,r,n){var i=e.source;Et(t,i[0]),Et(t,i[1]),Et(t,i[2])}),t},t.prototype.getTriangles=function(){return this.triangles_},t}(),kl=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),jl=function(t){function e(e,r,n,i,o,a,s,u,l,h,c){var p=t.call(this,o,mi.IDLE)||this;p.renderEdges_=void 0!==c&&c,p.pixelRatio_=s,p.gutter_=u,p.canvas_=null,p.sourceTileGrid_=r,p.targetTileGrid_=i,p.wrappedTileCoord_=a||o,p.sourceTiles_=[],p.sourcesListenerKeys_=null,p.sourceZ_=0;var f=i.getTileCoordExtent(p.wrappedTileCoord_),d=p.targetTileGrid_.getExtent(),_=p.sourceTileGrid_.getExtent(),g=d?Mt(f,d):f;if(0===Ot(g))return p.state=mi.EMPTY,p;var y=e.getExtent();y&&(_=_?Mt(_,y):y);var v=i.getResolution(p.wrappedTileCoord_[0]),m=Fl(e,n,Pt(g),v);if(!isFinite(m)||m<=0)return p.state=mi.EMPTY,p;var E=void 0!==h?h:Ol;if(p.triangulation_=new Dl(e,n,g,_,m*E),0===p.triangulation_.getTriangles().length)return p.state=mi.EMPTY,p;p.sourceZ_=r.getZForResolution(m);var T=p.triangulation_.calculateSourceExtent();if(_&&(e.canWrapX()?(T[1]=Bt(T[1],_[1],_[3]),T[3]=Bt(T[3],_[1],_[3])):T=Mt(T,_)),Ot(T)){for(var S=r.getTileRangeForExtentAndZ(T,p.sourceZ_),w=S.minX;w<=S.maxX;w++)for(var x=S.minY;x<=S.maxY;x++){var O=l(p.sourceZ_,w,x,s);O&&p.sourceTiles_.push(O)}0===p.sourceTiles_.length&&(p.state=mi.EMPTY)}else p.state=mi.EMPTY;return p}return kl(e,t),e.prototype.disposeInternal=function(){this.state==mi.LOADING&&this.unlistenSources_(),t.prototype.disposeInternal.call(this)},e.prototype.getImage=function(){return this.canvas_},e.prototype.reproject_=function(){var t=[];if(this.sourceTiles_.forEach(function(e,r,n){e&&e.getState()==mi.LOADED&&t.push({extent:this.sourceTileGrid_.getTileCoordExtent(e.tileCoord),image:e.getImage()})}.bind(this)),this.sourceTiles_.length=0,0===t.length)this.state=mi.ERROR;else{var e=this.wrappedTileCoord_[0],r=this.targetTileGrid_.getTileSize(e),n="number"==typeof r?r:r[0],i="number"==typeof r?r:r[1],o=this.targetTileGrid_.getResolution(e),a=this.sourceTileGrid_.getResolution(this.sourceZ_),s=this.targetTileGrid_.getTileCoordExtent(this.wrappedTileCoord_);this.canvas_=Nl(n,i,this.pixelRatio_,a,this.sourceTileGrid_.getExtent(),o,s,this.triangulation_,t,this.gutter_,this.renderEdges_),this.state=mi.LOADED}this.changed()},e.prototype.load=function(){if(this.state==mi.IDLE){this.state=mi.LOADING,this.changed();var t=0;this.sourcesListenerKeys_=[],this.sourceTiles_.forEach(function(e,r,n){var i=e.getState();if(i==mi.IDLE||i==mi.LOADING){t++;var o=E(e,F.CHANGE,function(r){var n=e.getState();n!=mi.LOADED&&n!=mi.ERROR&&n!=mi.EMPTY||(w(o),0===--t&&(this.unlistenSources_(),this.reproject_()))},this);this.sourcesListenerKeys_.push(o)}}.bind(this)),this.sourceTiles_.forEach(function(t,e,r){t.getState()==mi.IDLE&&t.load()}),0===t&&setTimeout(this.reproject_.bind(this),0)}},e.prototype.unlistenSources_=function(){this.sourcesListenerKeys_.forEach(w),this.sourcesListenerKeys_=null},e}(Rl),Ul=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}();function Yl(t){return t?Array.isArray(t)?function(e){return t}:"function"==typeof t?t:function(e){return[t]}:null}var Xl=function(t){function e(e){var r=t.call(this)||this;return r.projection_=Ie(e.projection),r.attributions_=Yl(e.attributions),r.attributionsCollapsible_=void 0===e.attributionsCollapsible||e.attributionsCollapsible,r.loading=!1,r.state_=void 0!==e.state?e.state:fo.READY,r.wrapX_=void 0!==e.wrapX&&e.wrapX,r}return Ul(e,t),e.prototype.getAttributions=function(){return this.attributions_},e.prototype.getAttributionsCollapsible=function(){return this.attributionsCollapsible_},e.prototype.getProjection=function(){return this.projection_},e.prototype.getResolutions=function(){return n()},e.prototype.getState=function(){return this.state_},e.prototype.getWrapX=function(){return this.wrapX_},e.prototype.refresh=function(){this.changed()},e.prototype.setAttributions=function(t){this.attributions_=Yl(t),this.changed()},e.prototype.setState=function(t){this.state_=t,this.changed()},e}(Y),Bl=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),zl=function(t){function e(e){var r=t.call(this,{attributions:e.attributions,attributionsCollapsible:e.attributionsCollapsible,projection:e.projection,state:e.state,wrapX:e.wrapX})||this;r.opaque_=void 0!==e.opaque&&e.opaque,r.tilePixelRatio_=void 0!==e.tilePixelRatio?e.tilePixelRatio:1,r.tileGrid=void 0!==e.tileGrid?e.tileGrid:null;var n=e.cacheSize;if(void 0===n){var i=[256,256],o=e.tileGrid;o&&Eo(o.getTileSize(o.getMinZoom()),i);var a="screen"in self,s=a?screen.availWidth||screen.width:1920,u=a?screen.availHeight||screen.height:1080;n=4*Math.ceil(s/i[0])*Math.ceil(u/i[1])}return r.tileCache=new Ml(n),r.tmpSize=[0,0],r.key_=e.key||"",r.tileOptions={transition:e.transition},r.zDirection,r}return Bl(e,t),e.prototype.canExpireCache=function(){return this.tileCache.canExpireCache()},e.prototype.expireCache=function(t,e){var r=this.getTileCacheForProjection(t);r&&r.expireCache(e)},e.prototype.forEachLoadedTile=function(t,e,r,n){var i=this.getTileCacheForProjection(t);if(!i)return!1;for(var o,a,s,u=!0,l=r.minX;l<=r.maxX;++l)for(var h=r.minY;h<=r.maxY;++h)a=Ks(e,l,h),s=!1,i.containsKey(a)&&(s=(o=i.get(a)).getState()===mi.LOADED)&&(s=!1!==n(o)),s||(u=!1);return u},e.prototype.getGutterForProjection=function(t){return 0},e.prototype.getKey=function(){return this.key_},e.prototype.setKey=function(t){this.key_!==t&&(this.key_=t,this.changed())},e.prototype.getOpaque=function(t){return this.opaque_},e.prototype.getResolutions=function(){return this.tileGrid.getResolutions()},e.prototype.getTile=function(t,e,r,i,o){return n()},e.prototype.getTileGrid=function(){return this.tileGrid},e.prototype.getTileGridForProjection=function(t){return this.tileGrid?this.tileGrid:$s(t)},e.prototype.getTileCacheForProjection=function(t){var e=this.getProjection();return e&&!Ge(e,t)?null:this.tileCache},e.prototype.getTilePixelRatio=function(t){return this.tilePixelRatio_},e.prototype.getTilePixelSize=function(t,e,r){var n=this.getTileGridForProjection(r),i=this.getTilePixelRatio(e),o=Eo(n.getTileSize(t),this.tmpSize);return 1==i?o:mo(o,i,this.tmpSize)},e.prototype.getTileCoordForTileUrlFunction=function(t,e){var r=void 0!==e?e:this.getProjection(),n=this.getTileGridForProjection(r);return this.getWrapX()&&r.isGlobal()&&(t=function(t,e,r){var n=e[0],i=t.getTileCoordCenter(e),o=nu(r);if(lt(o,i))return e;var a=Nt(o),s=Math.ceil((o[0]-i[0])/a);return i[0]+=a*s,t.getTileCoordForCoordAndZ(i,n)}(n,t,r)),function(t,e){var r=t[0],n=t[1],i=t[2];if(e.getMinZoom()>r||r>e.getMaxZoom())return!1;var o,a=e.getExtent();return!(o=a?e.getTileRangeForExtentAndZ(a,r):e.getFullTileRange(r))||o.containsXY(n,i)}(t,n)?t:null},e.prototype.clear=function(){this.tileCache.clear()},e.prototype.refresh=function(){this.clear(),t.prototype.refresh.call(this)},e.prototype.useTile=function(t,e,r,n){},e}(Xl),Vl=function(t){function e(e,r){var n=t.call(this,e)||this;return n.tile=r,n}return Bl(e,t),e}(I),Wl=zl,Zl="tileloadstart",Kl="tileloadend",Hl="tileloaderror",ql=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),Jl=function(t){function e(e){var r=t.call(this,{attributions:e.attributions,cacheSize:e.cacheSize,opaque:e.opaque,projection:e.projection,state:e.state,tileGrid:e.tileGrid,tilePixelRatio:e.tilePixelRatio,wrapX:e.wrapX,transition:e.transition,key:e.key,attributionsCollapsible:e.attributionsCollapsible})||this;return r.generateTileUrlFunction_=!e.tileUrlFunction,r.tileLoadFunction=e.tileLoadFunction,r.tileUrlFunction=e.tileUrlFunction?e.tileUrlFunction.bind(r):Sl,r.urls=null,e.urls?r.setUrls(e.urls):e.url&&r.setUrl(e.url),r.tileLoadingKeys_={},r}return ql(e,t),e.prototype.getTileLoadFunction=function(){return this.tileLoadFunction},e.prototype.getTileUrlFunction=function(){return this.tileUrlFunction},e.prototype.getUrls=function(){return this.urls},e.prototype.handleTileChange=function(t){var e,r=t.target,n=o(r),i=r.getState();i==mi.LOADING?(this.tileLoadingKeys_[n]=!0,e=Zl):n in this.tileLoadingKeys_&&(delete this.tileLoadingKeys_[n],e=i==mi.ERROR?Hl:i==mi.LOADED||i==mi.ABORT?Kl:void 0),null!=e&&this.dispatchEvent(new Vl(e,r))},e.prototype.setTileLoadFunction=function(t){this.tileCache.clear(),this.tileLoadFunction=t,this.changed()},e.prototype.setTileUrlFunction=function(t,e){this.tileUrlFunction=t,this.tileCache.pruneExceptNewestZ(),void 0!==e?this.setKey(e):this.changed()},e.prototype.setUrl=function(t){var e=this.urls=wl(t);this.setUrls(e)},e.prototype.setUrls=function(t){this.urls=t;var e=t.join("\n");this.generateTileUrlFunction_?this.setTileUrlFunction(El(t,this.tileGrid),e):this.setKey(e)},e.prototype.useTile=function(t,e,r){var n=Ks(t,e,r);this.tileCache.containsKey(n)&&this.tileCache.get(n)},e}(Wl),Ql=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}();function $l(t,e){t.getImage().src=e}var th=function(t){function e(e){var r=t.call(this,{attributions:e.attributions,cacheSize:e.cacheSize,opaque:e.opaque,projection:e.projection,state:e.state,tileGrid:e.tileGrid,tileLoadFunction:e.tileLoadFunction?e.tileLoadFunction:$l,tilePixelRatio:e.tilePixelRatio,tileUrlFunction:e.tileUrlFunction,url:e.url,urls:e.urls,wrapX:e.wrapX,transition:e.transition,key:e.key,attributionsCollapsible:e.attributionsCollapsible})||this;return r.crossOrigin=void 0!==e.crossOrigin?e.crossOrigin:null,r.tileClass=void 0!==e.tileClass?e.tileClass:Il,r.tileCacheForProjection={},r.tileGridForProjection={},r.reprojectionErrorThreshold_=e.reprojectionErrorThreshold,r.renderReprojectionEdges_=!1,r}return Ql(e,t),e.prototype.canExpireCache=function(){if(this.tileCache.canExpireCache())return!0;for(var t in this.tileCacheForProjection)if(this.tileCacheForProjection[t].canExpireCache())return!0;return!1},e.prototype.expireCache=function(t,e){var r=this.getTileCacheForProjection(t);for(var n in this.tileCache.expireCache(this.tileCache==r?e:{}),this.tileCacheForProjection){var i=this.tileCacheForProjection[n];i.expireCache(i==r?e:{})}},e.prototype.getGutterForProjection=function(t){return this.getProjection()&&t&&!Ge(this.getProjection(),t)?0:this.getGutter()},e.prototype.getGutter=function(){return 0},e.prototype.getOpaque=function(e){return!(this.getProjection()&&e&&!Ge(this.getProjection(),e))&&t.prototype.getOpaque.call(this,e)},e.prototype.getTileGridForProjection=function(t){var e=this.getProjection();if(!this.tileGrid||e&&!Ge(e,t)){var r=o(t);return r in this.tileGridForProjection||(this.tileGridForProjection[r]=$s(t)),this.tileGridForProjection[r]}return this.tileGrid},e.prototype.getTileCacheForProjection=function(t){var e=this.getProjection();if(!e||Ge(e,t))return this.tileCache;var r=o(t);return r in this.tileCacheForProjection||(this.tileCacheForProjection[r]=new Ml(this.tileCache.highWaterMark)),this.tileCacheForProjection[r]},e.prototype.createTile_=function(t,e,r,n,i,o){var a=[t,e,r],s=this.getTileCoordForTileUrlFunction(a,i),u=s?this.tileUrlFunction(s,n,i):void 0,l=new this.tileClass(a,void 0!==u?mi.IDLE:mi.EMPTY,void 0!==u?u:"",this.crossOrigin,this.tileLoadFunction,this.tileOptions);return l.key=o,E(l,F.CHANGE,this.handleTileChange,this),l},e.prototype.getTile=function(t,e,r,n,i){var o=this.getProjection();if(o&&i&&!Ge(o,i)){var a=this.getTileCacheForProjection(i),s=[t,e,r],u=void 0,l=Hs(s);a.containsKey(l)&&(u=a.get(l));var h=this.getKey();if(u&&u.key==h)return u;var c=this.getTileGridForProjection(o),p=this.getTileGridForProjection(i),f=this.getTileCoordForTileUrlFunction(s,i),d=new jl(o,c,i,p,s,f,this.getTilePixelRatio(n),this.getGutter(),function(t,e,r,n){return this.getTileInternal(t,e,r,n,o)}.bind(this),this.reprojectionErrorThreshold_,this.renderReprojectionEdges_);return d.key=h,u?(d.interimTile=u,d.refreshInterimChain(),a.replace(l,d)):a.set(l,d),d}return this.getTileInternal(t,e,r,n,o||i)},e.prototype.getTileInternal=function(t,e,r,n,i){var o=null,a=Ks(t,e,r),s=this.getKey();if(this.tileCache.containsKey(a)){if((o=this.tileCache.get(a)).key!=s){var u=o;o=this.createTile_(t,e,r,n,i,s),u.getState()==mi.IDLE?o.interimTile=u.interimTile:o.interimTile=u,o.refreshInterimChain(),this.tileCache.replace(a,o)}}else o=this.createTile_(t,e,r,n,i,s),this.tileCache.set(a,o);return o},e.prototype.setRenderReprojectionEdges=function(t){if(this.renderReprojectionEdges_!=t){for(var e in this.renderReprojectionEdges_=t,this.tileCacheForProjection)this.tileCacheForProjection[e].clear();this.changed()}},e.prototype.setTileGridForProjection=function(t,e){var r=Ie(t);if(r){var n=o(r);n in this.tileGridForProjection||(this.tileGridForProjection[n]=e)}},e}(Jl),eh=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}();var rh=function(t){function e(e){var r=this,n=void 0!==e.hidpi&&e.hidpi;return(r=t.call(this,{cacheSize:e.cacheSize,crossOrigin:"anonymous",opaque:!0,projection:Ie("EPSG:3857"),reprojectionErrorThreshold:e.reprojectionErrorThreshold,state:fo.LOADING,tileLoadFunction:e.tileLoadFunction,tilePixelRatio:n?2:1,wrapX:void 0===e.wrapX||e.wrapX,transition:e.transition})||this).hidpi_=n,r.culture_=void 0!==e.culture?e.culture:"en-us",r.maxZoom_=void 0!==e.maxZoom?e.maxZoom:-1,r.apiKey_=e.key,r.imagerySet_=e.imagerySet,xl("https://dev.virtualearth.net/REST/v1/Imagery/Metadata/"+r.imagerySet_+"?uriScheme=https&include=ImageryProviders&key="+r.apiKey_+"&c="+r.culture_,r.handleImageryMetadataResponse.bind(r),void 0,"jsonp"),r}return eh(e,t),e.prototype.getApiKey=function(){return this.apiKey_},e.prototype.getImagerySet=function(){return this.imagerySet_},e.prototype.handleImageryMetadataResponse=function(t){if(200==t.statusCode&&"OK"==t.statusDescription&&"ValidCredentials"==t.authenticationResultCode&&1==t.resourceSets.length&&1==t.resourceSets[0].resources.length){var e=t.resourceSets[0].resources[0],r=-1==this.maxZoom_?e.zoomMax:this.maxZoom_,n=nu(this.getProjection()),i=this.hidpi_?2:1,o=e.imageWidth==e.imageHeight?e.imageWidth/i:[e.imageWidth/i,e.imageHeight/i],a=tu({extent:n,minZoom:e.zoomMin,maxZoom:r,tileSize:o});this.tileGrid=a;var s=this.culture_,u=this.hidpi_;if(this.tileUrlFunction=Tl(e.imageUrlSubdomains.map(function(t){var r=[0,0,0],n=e.imageUrl.replace("{subdomain}",t).replace("{culture}",s);return function(t,e,i){if(t){Zs(t[0],t[1],t[2],r);var o=n;return u&&(o+="&dpi=d1&device=mobile"),o.replace("{quadkey}",function(t){var e,r,n=t[0],i=new Array(n),o=1<<n-1;for(e=0;e<n;++e)r=48,t[1]&o&&(r+=1),t[2]&o&&(r+=2),i[e]=String.fromCharCode(r),o>>=1;return i.join("")}(r))}}})),e.imageryProviders){var l=De(Ie("EPSG:4326"),this.getProjection());this.setAttributions(function(t){var r=[],n=t.viewState,i=this.getTileGrid().getTileCoordForCoordAndResolution(n.center,n.resolution)[0];return e.imageryProviders.map(function(e){for(var n=!1,o=e.coverageAreas,a=0,s=o.length;a<s;++a){var u=o[a];if(i>=u.zoomMin&&i<=u.zoomMax){var h=u.bbox;if(Gt(jt([h[1],h[0],h[3],h[2]],l),t.extent)){n=!0;break}}}n&&r.push(e.attribution)}),r.push('<a class="ol-attribution-bing-tos" href="https://www.microsoft.com/maps/product/terms.html">Terms of Use</a>'),r}.bind(this))}this.setState(fo.READY)}else this.setState(fo.ERROR)},e}(th),nh=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),ih=function(t){function e(e){var r=e||{},n=void 0!==r.projection?r.projection:"EPSG:3857",i=void 0!==r.tileGrid?r.tileGrid:tu({extent:nu(n),maxZoom:r.maxZoom,minZoom:r.minZoom,tileSize:r.tileSize});return t.call(this,{attributions:r.attributions,cacheSize:r.cacheSize,crossOrigin:r.crossOrigin,opaque:r.opaque,projection:n,reprojectionErrorThreshold:r.reprojectionErrorThreshold,tileGrid:i,tileLoadFunction:r.tileLoadFunction,tilePixelRatio:r.tilePixelRatio,tileUrlFunction:r.tileUrlFunction,url:r.url,urls:r.urls,wrapX:void 0===r.wrapX||r.wrapX,transition:r.transition,attributionsCollapsible:r.attributionsCollapsible})||this}return nh(e,t),e}(th),oh=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),ah=function(t){function e(e){var r=t.call(this,{attributions:e.attributions,cacheSize:e.cacheSize,crossOrigin:e.crossOrigin,maxZoom:void 0!==e.maxZoom?e.maxZoom:18,minZoom:e.minZoom,projection:e.projection,wrapX:e.wrapX})||this;return r.account_=e.account,r.mapId_=e.map||"",r.config_=e.config||{},r.templateCache_={},r.initializeMap_(),r}return oh(e,t),e.prototype.getConfig=function(){return this.config_},e.prototype.updateConfig=function(t){p(this.config_,t),this.initializeMap_()},e.prototype.setConfig=function(t){this.config_=t||{},this.initializeMap_()},e.prototype.initializeMap_=function(){var t=JSON.stringify(this.config_);if(this.templateCache_[t])this.applyTemplate_(this.templateCache_[t]);else{var e="https://"+this.account_+".carto.com/api/v1/map";this.mapId_&&(e+="/named/"+this.mapId_);var r=new XMLHttpRequest;r.addEventListener("load",this.handleInitResponse_.bind(this,t)),r.addEventListener("error",this.handleInitError_.bind(this)),r.open("POST",e),r.setRequestHeader("Content-type","application/json"),r.send(JSON.stringify(this.config_))}},e.prototype.handleInitResponse_=function(t,e){var r=e.target;if(!r.status||r.status>=200&&r.status<300){var n=void 0;try{n=JSON.parse(r.responseText)}catch(t){return void this.setState(fo.ERROR)}this.applyTemplate_(n),this.templateCache_[t]=n,this.setState(fo.READY)}else this.setState(fo.ERROR)},e.prototype.handleInitError_=function(t){this.setState(fo.ERROR)},e.prototype.applyTemplate_=function(t){var e="https://"+t.cdn_url.https+"/"+this.account_+"/api/v1/map/"+t.layergroupid+"/{z}/{x}/{y}.png";this.setUrl(e)},e}(ih),sh={ADDFEATURE:"addfeature",CHANGEFEATURE:"changefeature",CLEAR:"clear",REMOVEFEATURE:"removefeature"},uh=r(0),lh=r.n(uh),hh=function(){function t(t){this.rbush_=lh()(t,void 0),this.items_={}}return t.prototype.insert=function(t,e){var r={minX:t[0],minY:t[1],maxX:t[2],maxY:t[3],value:e};this.rbush_.insert(r),this.items_[o(e)]=r},t.prototype.load=function(t,e){for(var r=new Array(e.length),n=0,i=e.length;n<i;n++){var a=t[n],s=e[n],u={minX:a[0],minY:a[1],maxX:a[2],maxY:a[3],value:s};r[n]=u,this.items_[o(s)]=u}this.rbush_.load(r)},t.prototype.remove=function(t){var e=o(t),r=this.items_[e];return delete this.items_[e],null!==this.rbush_.remove(r)},t.prototype.update=function(t,e){var r=this.items_[o(e)];vt([r.minX,r.minY,r.maxX,r.maxY],t)||(this.remove(e),this.insert(t,e))},t.prototype.getAll=function(){return this.rbush_.all().map(function(t){return t.value})},t.prototype.getInExtent=function(t){var e={minX:t[0],minY:t[1],maxX:t[2],maxY:t[3]};return this.rbush_.search(e).map(function(t){return t.value})},t.prototype.forEach=function(t,e){return this.forEach_(this.getAll(),t,e)},t.prototype.forEachInExtent=function(t,e,r){return this.forEach_(this.getInExtent(t),e,r)},t.prototype.forEach_=function(t,e,r){for(var n,i=0,o=t.length;i<o;i++)if(n=e.call(r,t[i]))return n;return n},t.prototype.isEmpty=function(){return _(this.items_)},t.prototype.clear=function(){this.rbush_.clear(),this.items_={}},t.prototype.getExtent=function(t){var e=this.rbush_.toJSON();return dt(e.minX,e.minY,e.maxX,e.maxY,t)},t.prototype.concat=function(t){for(var e in this.rbush_.load(t.rbush_.all()),t.items_)this.items_[e]=t.items_[e]},t}(),ch=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),ph=function(t){function e(e,r){var n=t.call(this,e)||this;return n.feature=r,n}return ch(e,t),e}(I),fh=function(t){function e(e){var r=this,n=e||{};(r=t.call(this,{attributions:n.attributions,projection:void 0,state:fo.READY,wrapX:void 0===n.wrapX||n.wrapX})||this).loader_=P,r.format_=n.format,r.overlaps_=null==n.overlaps||n.overlaps,r.url_=n.url,void 0!==n.loader?r.loader_=n.loader:void 0!==r.url_&&(W(r.format_,7),r.loader_=vs(r.url_,r.format_)),r.strategy_=void 0!==n.strategy?n.strategy:ms;var i,o,a=void 0===n.useSpatialIndex||n.useSpatialIndex;return r.featuresRtree_=a?new hh:null,r.loadedExtentsRtree_=new hh,r.nullGeometryFeatures_={},r.idIndex_={},r.undefIdIndex_={},r.featureChangeKeys_={},r.featuresCollection_=null,Array.isArray(n.features)?o=n.features:n.features&&(o=(i=n.features).getArray()),a||void 0!==i||(i=new V(o)),void 0!==o&&r.addFeaturesInternal(o),void 0!==i&&r.bindFeaturesCollection_(i),r}return ch(e,t),e.prototype.addFeature=function(t){this.addFeatureInternal(t),this.changed()},e.prototype.addFeatureInternal=function(t){var e=o(t);if(this.addToIndex_(e,t)){this.setupChangeEvents_(e,t);var r=t.getGeometry();if(r){var n=r.getExtent();this.featuresRtree_&&this.featuresRtree_.insert(n,t)}else this.nullGeometryFeatures_[e]=t;this.dispatchEvent(new ph(sh.ADDFEATURE,t))}},e.prototype.setupChangeEvents_=function(t,e){this.featureChangeKeys_[t]=[E(e,F.CHANGE,this.handleFeatureChange_,this),E(e,c,this.handleFeatureChange_,this)]},e.prototype.addToIndex_=function(t,e){var r=!0,n=e.getId();return void 0!==n?n.toString()in this.idIndex_?r=!1:this.idIndex_[n.toString()]=e:(W(!(t in this.undefIdIndex_),30),this.undefIdIndex_[t]=e),r},e.prototype.addFeatures=function(t){this.addFeaturesInternal(t),this.changed()},e.prototype.addFeaturesInternal=function(t){for(var e=[],r=[],n=[],i=0,a=t.length;i<a;i++){var s=o(l=t[i]);this.addToIndex_(s,l)&&r.push(l)}i=0;for(var u=r.length;i<u;i++){var l;s=o(l=r[i]);this.setupChangeEvents_(s,l);var h=l.getGeometry();if(h){var c=h.getExtent();e.push(c),n.push(l)}else this.nullGeometryFeatures_[s]=l}this.featuresRtree_&&this.featuresRtree_.load(e,n);i=0;for(var p=r.length;i<p;i++)this.dispatchEvent(new ph(sh.ADDFEATURE,r[i]))},e.prototype.bindFeaturesCollection_=function(t){var e=!1;E(this,sh.ADDFEATURE,function(r){e||(e=!0,t.push(r.feature),e=!1)}),E(this,sh.REMOVEFEATURE,function(r){e||(e=!0,t.remove(r.feature),e=!1)}),E(t,h.ADD,function(t){e||(e=!0,this.addFeature(t.element),e=!1)},this),E(t,h.REMOVE,function(t){e||(e=!0,this.removeFeature(t.element),e=!1)},this),this.featuresCollection_=t},e.prototype.clear=function(t){if(t){for(var e in this.featureChangeKeys_){this.featureChangeKeys_[e].forEach(w)}this.featuresCollection_||(this.featureChangeKeys_={},this.idIndex_={},this.undefIdIndex_={})}else if(this.featuresRtree_)for(var r in this.featuresRtree_.forEach(this.removeFeatureInternal,this),this.nullGeometryFeatures_)this.removeFeatureInternal(this.nullGeometryFeatures_[r]);this.featuresCollection_&&this.featuresCollection_.clear(),this.featuresRtree_&&this.featuresRtree_.clear(),this.nullGeometryFeatures_={};var n=new ph(sh.CLEAR);this.dispatchEvent(n),this.changed()},e.prototype.forEachFeature=function(t){if(this.featuresRtree_)return this.featuresRtree_.forEach(t);this.featuresCollection_&&this.featuresCollection_.forEach(t)},e.prototype.forEachFeatureAtCoordinateDirect=function(t,e){var r=[t[0],t[1],t[0],t[1]];return this.forEachFeatureInExtent(r,function(r){return r.getGeometry().intersectsCoordinate(t)?e(r):void 0})},e.prototype.forEachFeatureInExtent=function(t,e){if(this.featuresRtree_)return this.featuresRtree_.forEachInExtent(t,e);this.featuresCollection_&&this.featuresCollection_.forEach(e)},e.prototype.forEachFeatureIntersectingExtent=function(t,e){return this.forEachFeatureInExtent(t,function(r){if(r.getGeometry().intersectsExtent(t)){var n=e(r);if(n)return n}})},e.prototype.getFeaturesCollection=function(){return this.featuresCollection_},e.prototype.getFeatures=function(){var t;return this.featuresCollection_?t=this.featuresCollection_.getArray():this.featuresRtree_&&(t=this.featuresRtree_.getAll(),_(this.nullGeometryFeatures_)||$(t,d(this.nullGeometryFeatures_))),t},e.prototype.getFeaturesAtCoordinate=function(t){var e=[];return this.forEachFeatureAtCoordinateDirect(t,function(t){e.push(t)}),e},e.prototype.getFeaturesInExtent=function(t){return this.featuresRtree_.getInExtent(t)},e.prototype.getClosestFeatureToCoordinate=function(t,e){var r=t[0],n=t[1],i=null,o=[NaN,NaN],a=1/0,s=[-1/0,-1/0,1/0,1/0],u=e||C;return this.featuresRtree_.forEachInExtent(s,function(t){if(u(t)){var e=t.getGeometry(),l=a;if((a=e.closestPointXY(r,n,o,a))<l){i=t;var h=Math.sqrt(a);s[0]=r-h,s[1]=n-h,s[2]=r+h,s[3]=n+h}}}),i},e.prototype.getExtent=function(t){return this.featuresRtree_.getExtent(t)},e.prototype.getFeatureById=function(t){var e=this.idIndex_[t.toString()];return void 0!==e?e:null},e.prototype.getFormat=function(){return this.format_},e.prototype.getOverlaps=function(){return this.overlaps_},e.prototype.getUrl=function(){return this.url_},e.prototype.handleFeatureChange_=function(t){var e=t.target,r=o(e),n=e.getGeometry();if(n){var i=n.getExtent();r in this.nullGeometryFeatures_?(delete this.nullGeometryFeatures_[r],this.featuresRtree_&&this.featuresRtree_.insert(i,e)):this.featuresRtree_&&this.featuresRtree_.update(i,e)}else r in this.nullGeometryFeatures_||(this.featuresRtree_&&this.featuresRtree_.remove(e),this.nullGeometryFeatures_[r]=e);var a=e.getId();if(void 0!==a){var s=a.toString();r in this.undefIdIndex_?(delete this.undefIdIndex_[r],this.idIndex_[s]=e):this.idIndex_[s]!==e&&(this.removeFromIdIndex_(e),this.idIndex_[s]=e)}else r in this.undefIdIndex_||(this.removeFromIdIndex_(e),this.undefIdIndex_[r]=e);this.changed(),this.dispatchEvent(new ph(sh.CHANGEFEATURE,e))},e.prototype.hasFeature=function(t){var e=t.getId();return void 0!==e?e in this.idIndex_:o(t)in this.undefIdIndex_},e.prototype.isEmpty=function(){return this.featuresRtree_.isEmpty()&&_(this.nullGeometryFeatures_)},e.prototype.loadFeatures=function(t,e,r){var n=this.loadedExtentsRtree_,i=this.strategy_(t,e);this.loading=!1;for(var o=function(t,o){var s=i[t];n.forEachInExtent(s,function(t){return ht(t.extent,s)})||(a.loader_.call(a,s,e,r),n.insert(s,{extent:s.slice()}),a.loading=a.loader_!==P)},a=this,s=0,u=i.length;s<u;++s)o(s)},e.prototype.refresh=function(){this.clear(!0),this.loadedExtentsRtree_.clear(),t.prototype.refresh.call(this)},e.prototype.removeLoadedExtent=function(t){var e,r=this.loadedExtentsRtree_;r.forEachInExtent(t,function(r){if(vt(r.extent,t))return e=r,!0}),e&&r.remove(e)},e.prototype.removeFeature=function(t){var e=o(t);e in this.nullGeometryFeatures_?delete this.nullGeometryFeatures_[e]:this.featuresRtree_&&this.featuresRtree_.remove(t),this.removeFeatureInternal(t),this.changed()},e.prototype.removeFeatureInternal=function(t){var e=o(t);this.featureChangeKeys_[e].forEach(w),delete this.featureChangeKeys_[e];var r=t.getId();void 0!==r?delete this.idIndex_[r.toString()]:delete this.undefIdIndex_[e],this.dispatchEvent(new ph(sh.REMOVEFEATURE,t))},e.prototype.removeFromIdIndex_=function(t){var e=!1;for(var r in this.idIndex_)if(this.idIndex_[r]===t){delete this.idIndex_[r],e=!0;break}return e},e.prototype.setLoader=function(t){this.loader_=t},e.prototype.setUrl=function(t){W(this.format_,7),this.setLoader(vs(t,this.format_))},e}(Xl),dh=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),_h=function(t){function e(e){var r=t.call(this,{attributions:e.attributions,wrapX:e.wrapX})||this;return r.resolution=void 0,r.distance=void 0!==e.distance?e.distance:20,r.features=[],r.geometryFunction=e.geometryFunction||function(t){var e=t.getGeometry();return W(e.getType()==Yt.POINT,10),e},r.source=e.source,E(r.source,F.CHANGE,r.refresh,r),r}return dh(e,t),e.prototype.getDistance=function(){return this.distance},e.prototype.getSource=function(){return this.source},e.prototype.loadFeatures=function(t,e,r){this.source.loadFeatures(t,e,r),e!==this.resolution&&(this.clear(),this.resolution=e,this.cluster(),this.addFeatures(this.features))},e.prototype.setDistance=function(t){this.distance=t,this.refresh()},e.prototype.refresh=function(){this.clear(),this.cluster(),this.addFeatures(this.features)},e.prototype.cluster=function(){if(void 0!==this.resolution){this.features.length=0;for(var t=[1/0,1/0,-1/0,-1/0],e=this.distance*this.resolution,r=this.source.getFeatures(),n={},i=0,a=r.length;i<a;i++){var s=r[i];if(!(o(s)in n)){var u=this.geometryFunction(s);if(u){gt(u.getCoordinates(),t),at(t,e,t);var l=this.source.getFeaturesInExtent(t);l=l.filter(function(t){var e=o(t);return!(e in n)&&(n[e]=!0,!0)}),this.features.push(this.createCluster(l))}}}}},e.prototype.createCluster=function(t){for(var e=[0,0],r=t.length-1;r>=0;--r){var n=this.geometryFunction(t[r]);n?ki(e,n.getCoordinates()):t.splice(r,1)}zi(e,1/t.length);var i=new K(new Cr(e));return i.set("features",t),i},e}(fh),gh=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),yh=function(t){function e(e,r,n,i){var o=t.call(this)||this;return o.extent=e,o.pixelRatio_=n,o.resolution=r,o.state=i,o}return gh(e,t),e.prototype.changed=function(){this.dispatchEvent(F.CHANGE)},e.prototype.getExtent=function(){return this.extent},e.prototype.getImage=function(){return n()},e.prototype.getPixelRatio=function(){return this.pixelRatio_},e.prototype.getResolution=function(){return this.resolution},e.prototype.getState=function(){return this.state},e.prototype.load=function(){n()},e}(M),vh=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),mh=function(t){function e(e,r,n,i,o,a){var s=this,u=e.getExtent(),l=r.getExtent(),h=l?Mt(n,l):n,c=Fl(e,r,Pt(h),i),p=new Dl(e,r,h,u,c*Ol),f=a(p.calculateSourceExtent(),c,o),d=qu.LOADED;f&&(d=qu.IDLE);var _=f?f.getPixelRatio():1;return(s=t.call(this,n,i,_,d)||this).targetProj_=r,s.maxSourceExtent_=u,s.triangulation_=p,s.targetResolution_=i,s.targetExtent_=n,s.sourceImage_=f,s.sourcePixelRatio_=_,s.canvas_=null,s.sourceListenerKey_=null,s}return vh(e,t),e.prototype.disposeInternal=function(){this.state==qu.LOADING&&this.unlistenSource_(),t.prototype.disposeInternal.call(this)},e.prototype.getImage=function(){return this.canvas_},e.prototype.getProjection=function(){return this.targetProj_},e.prototype.reproject_=function(){var t=this.sourceImage_.getState();if(t==qu.LOADED){var e=Nt(this.targetExtent_)/this.targetResolution_,r=Lt(this.targetExtent_)/this.targetResolution_;this.canvas_=Nl(e,r,this.sourcePixelRatio_,this.sourceImage_.getResolution(),this.maxSourceExtent_,this.targetResolution_,this.targetExtent_,this.triangulation_,[{extent:this.sourceImage_.getExtent(),image:this.sourceImage_.getImage()}],0)}this.state=t,this.changed()},e.prototype.load=function(){if(this.state==qu.IDLE){this.state=qu.LOADING,this.changed();var t=this.sourceImage_.getState();t==qu.LOADED||t==qu.ERROR?this.reproject_():(this.sourceListenerKey_=E(this.sourceImage_,F.CHANGE,function(t){var e=this.sourceImage_.getState();e!=qu.LOADED&&e!=qu.ERROR||(this.unlistenSource_(),this.reproject_())},this),this.sourceImage_.load())}},e.prototype.unlistenSource_=function(){w(this.sourceListenerKey_),this.sourceListenerKey_=null},e}(yh),Eh=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),Th="imageloadstart",Sh="imageloadend",wh="imageloaderror",xh=function(t){function e(e,r){var n=t.call(this,e)||this;return n.image=r,n}return Eh(e,t),e}(I);function Oh(t,e){t.getImage().src=e}var Ch=function(t){function e(e){var r=t.call(this,{attributions:e.attributions,projection:e.projection,state:e.state})||this;return r.resolutions_=void 0!==e.resolutions?e.resolutions:null,r.reprojectedImage_=null,r.reprojectedRevision_=0,r}return Eh(e,t),e.prototype.getResolutions=function(){return this.resolutions_},e.prototype.findNearestResolution=function(t){if(this.resolutions_){var e=J(this.resolutions_,t,0);t=this.resolutions_[e]}return t},e.prototype.getImage=function(t,e,r,n){var i=this.getProjection();if(i&&n&&!Ge(i,n)){if(this.reprojectedImage_){if(this.reprojectedRevision_==this.getRevision()&&Ge(this.reprojectedImage_.getProjection(),n)&&this.reprojectedImage_.getResolution()==e&&vt(this.reprojectedImage_.getExtent(),t))return this.reprojectedImage_;this.reprojectedImage_.dispose(),this.reprojectedImage_=null}return this.reprojectedImage_=new mh(i,n,t,e,r,function(t,e,r){return this.getImageInternal(t,e,r,i)}.bind(this)),this.reprojectedRevision_=this.getRevision(),this.reprojectedImage_}return i&&(n=i),this.getImageInternal(t,e,r,n)},e.prototype.getImageInternal=function(t,e,r,i){return n()},e.prototype.handleImageChange=function(t){var e=t.target;switch(e.getState()){case qu.LOADING:this.loading=!0,this.dispatchEvent(new xh(Th,e));break;case qu.LOADED:this.loading=!1,this.dispatchEvent(new xh(Sh,e));break;case qu.ERROR:this.loading=!1,this.dispatchEvent(new xh(wh,e))}},e}(Xl),Rh=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),Ph=function(t){function e(e,r,n,i,o,a){var s=t.call(this,e,r,n,qu.IDLE)||this;return s.src_=i,s.image_=new Image,null!==o&&(s.image_.crossOrigin=o),s.imageListenerKeys_=null,s.state=qu.IDLE,s.imageLoadFunction_=a,s}return Rh(e,t),e.prototype.getImage=function(){return this.image_},e.prototype.handleImageError_=function(){this.state=qu.ERROR,this.unlistenImage_(),this.changed()},e.prototype.handleImageLoad_=function(){void 0===this.resolution&&(this.resolution=Lt(this.extent)/this.image_.height),this.state=qu.LOADED,this.unlistenImage_(),this.changed()},e.prototype.load=function(){this.state!=qu.IDLE&&this.state!=qu.ERROR||(this.state=qu.LOADING,this.changed(),this.imageListenerKeys_=[T(this.image_,F.ERROR,this.handleImageError_,this),T(this.image_,F.LOAD,this.handleImageLoad_,this)],this.imageLoadFunction_(this,this.src_))},e.prototype.setImage=function(t){this.image_=t},e.prototype.unlistenImage_=function(){this.imageListenerKeys_.forEach(w),this.imageListenerKeys_=null},e}(yh);function bh(t,e){var r=[];Object.keys(e).forEach(function(t){null!==e[t]&&void 0!==e[t]&&r.push(t+"="+encodeURIComponent(e[t]))});var n=r.join("&");return(t=-1===(t=t.replace(/[?&]$/,"")).indexOf("?")?t+"?":t+"&")+n}var Ih=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),Lh=function(t){function e(e){var r=this,n=e||{};return(r=t.call(this,{attributions:n.attributions,projection:n.projection,resolutions:n.resolutions})||this).crossOrigin_=void 0!==n.crossOrigin?n.crossOrigin:null,r.hidpi_=void 0===n.hidpi||n.hidpi,r.url_=n.url,r.imageLoadFunction_=void 0!==n.imageLoadFunction?n.imageLoadFunction:Oh,r.params_=n.params||{},r.image_=null,r.imageSize_=[0,0],r.renderedRevision_=0,r.ratio_=void 0!==n.ratio?n.ratio:1.5,r}return Ih(e,t),e.prototype.getParams=function(){return this.params_},e.prototype.getImageInternal=function(t,e,r,n){if(void 0===this.url_)return null;e=this.findNearestResolution(e),r=this.hidpi_?r:1;var i=this.image_;if(i&&this.renderedRevision_==this.getRevision()&&i.getResolution()==e&&i.getPixelRatio()==r&&ht(i.getExtent(),t))return i;var o={F:"image",FORMAT:"PNG32",TRANSPARENT:!0};p(o,this.params_);var a=((t=t.slice())[0]+t[2])/2,s=(t[1]+t[3])/2;if(1!=this.ratio_){var u=this.ratio_*Nt(t)/2,l=this.ratio_*Lt(t)/2;t[0]=a-u,t[1]=s-l,t[2]=a+u,t[3]=s+l}var h=e/r,c=Math.ceil(Nt(t)/h),f=Math.ceil(Lt(t)/h);t[0]=a-h*c/2,t[2]=a+h*c/2,t[1]=s-h*f/2,t[3]=s+h*f/2,this.imageSize_[0]=c,this.imageSize_[1]=f;var d=this.getRequestUrl_(t,this.imageSize_,r,n,o);return this.image_=new Ph(t,e,r,d,this.crossOrigin_,this.imageLoadFunction_),this.renderedRevision_=this.getRevision(),E(this.image_,F.CHANGE,this.handleImageChange,this),this.image_},e.prototype.getImageLoadFunction=function(){return this.imageLoadFunction_},e.prototype.getRequestUrl_=function(t,e,r,n,i){var o=n.getCode().split(":").pop();i.SIZE=e[0]+","+e[1],i.BBOX=t.join(","),i.BBOXSR=o,i.IMAGESR=o,i.DPI=Math.round(90*r);var a=this.url_,s=a.replace(/MapServer\/?$/,"MapServer/export").replace(/ImageServer\/?$/,"ImageServer/exportImage");return s==a&&W(!1,50),bh(s,i)},e.prototype.getUrl=function(){return this.url_},e.prototype.setImageLoadFunction=function(t){this.image_=null,this.imageLoadFunction_=t,this.changed()},e.prototype.setUrl=function(t){t!=this.url_&&(this.url_=t,this.image_=null,this.changed())},e.prototype.updateParams=function(t){p(this.params_,t),this.image_=null,this.changed()},e}(Ch),Mh=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),Fh=function(t){function e(e,r,n,i,o){var a=this,s=void 0!==o?qu.IDLE:qu.LOADED;return(a=t.call(this,e,r,n,s)||this).loader_=void 0!==o?o:null,a.canvas_=i,a.error_=null,a}return Mh(e,t),e.prototype.getError=function(){return this.error_},e.prototype.handleLoad_=function(t){t?(this.error_=t,this.state=qu.ERROR):this.state=qu.LOADED,this.changed()},e.prototype.load=function(){this.state==qu.IDLE&&(this.state=qu.LOADING,this.changed(),this.loader_(this.handleLoad_.bind(this)))},e.prototype.getImage=function(){return this.canvas_},e}(yh),Ah=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),Nh=function(t){function e(e){var r=this,n=e||{};return(r=t.call(this,{attributions:n.attributions,projection:n.projection,resolutions:n.resolutions,state:n.state})||this).canvasFunction_=n.canvasFunction,r.canvas_=null,r.renderedRevision_=0,r.ratio_=void 0!==n.ratio?n.ratio:1.5,r}return Ah(e,t),e.prototype.getImageInternal=function(t,e,r,n){e=this.findNearestResolution(e);var i=this.canvas_;if(i&&this.renderedRevision_==this.getRevision()&&i.getResolution()==e&&i.getPixelRatio()==r&&ht(i.getExtent(),t))return i;kt(t=t.slice(),this.ratio_);var o=[Nt(t)/e*r,Lt(t)/e*r],a=this.canvasFunction_.call(this,t,e,r,o,n);return a&&(i=new Fh(t,e,r,a)),this.canvas_=i,this.renderedRevision_=this.getRevision(),i},e}(Ch),Gh=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}();var Dh=function(t){function e(e){var r=t.call(this,{projection:e.projection,resolutions:e.resolutions})||this;return r.crossOrigin_=void 0!==e.crossOrigin?e.crossOrigin:null,r.displayDpi_=void 0!==e.displayDpi?e.displayDpi:96,r.params_=e.params||{},r.url_=e.url,r.imageLoadFunction_=void 0!==e.imageLoadFunction?e.imageLoadFunction:Oh,r.hidpi_=void 0===e.hidpi||e.hidpi,r.metersPerUnit_=void 0!==e.metersPerUnit?e.metersPerUnit:1,r.ratio_=void 0!==e.ratio?e.ratio:1,r.useOverlay_=void 0!==e.useOverlay&&e.useOverlay,r.image_=null,r.renderedRevision_=0,r}return Gh(e,t),e.prototype.getParams=function(){return this.params_},e.prototype.getImageInternal=function(t,e,r,n){e=this.findNearestResolution(e),r=this.hidpi_?r:1;var i=this.image_;if(i&&this.renderedRevision_==this.getRevision()&&i.getResolution()==e&&i.getPixelRatio()==r&&ht(i.getExtent(),t))return i;1!=this.ratio_&&kt(t=t.slice(),this.ratio_);var o=[Nt(t)/e*r,Lt(t)/e*r];if(void 0!==this.url_){var a=this.getUrl(this.url_,this.params_,t,o,n);E(i=new Ph(t,e,r,a,this.crossOrigin_,this.imageLoadFunction_),F.CHANGE,this.handleImageChange,this)}else i=null;return this.image_=i,this.renderedRevision_=this.getRevision(),i},e.prototype.getImageLoadFunction=function(){return this.imageLoadFunction_},e.prototype.updateParams=function(t){p(this.params_,t),this.changed()},e.prototype.getUrl=function(t,e,r,n,i){var o=function(t,e,r,n){var i=Nt(t),o=Lt(t),a=e[0],s=e[1],u=.0254/n;return s*i>a*o?i*r/(a*u):o*r/(s*u)}(r,n,this.metersPerUnit_,this.displayDpi_),a=Pt(r),s={OPERATION:this.useOverlay_?"GETDYNAMICMAPOVERLAYIMAGE":"GETMAPIMAGE",VERSION:"2.0.0",LOCALE:"en",CLIENTAGENT:"ol/source/ImageMapGuide source",CLIP:"1",SETDISPLAYDPI:this.displayDpi_,SETDISPLAYWIDTH:Math.round(n[0]),SETDISPLAYHEIGHT:Math.round(n[1]),SETVIEWSCALE:o,SETVIEWCENTERX:a[0],SETVIEWCENTERY:a[1]};return p(s,e),bh(t,s)},e.prototype.setImageLoadFunction=function(t){this.image_=null,this.imageLoadFunction_=t,this.changed()},e}(Ch),kh=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),jh=function(t){function e(e){var r=this,n=void 0!==e.crossOrigin?e.crossOrigin:null,i=void 0!==e.imageLoadFunction?e.imageLoadFunction:Oh;return(r=t.call(this,{attributions:e.attributions,projection:Ie(e.projection)})||this).url_=e.url,r.imageExtent_=e.imageExtent,r.image_=new Ph(r.imageExtent_,void 0,1,r.url_,n,i),r.imageSize_=e.imageSize?e.imageSize:null,E(r.image_,F.CHANGE,r.handleImageChange,r),r}return kh(e,t),e.prototype.getImageExtent=function(){return this.imageExtent_},e.prototype.getImageInternal=function(t,e,r,n){return Gt(t,this.image_.getExtent())?this.image_:null},e.prototype.getUrl=function(){return this.url_},e.prototype.handleImageChange=function(e){if(this.image_.getState()==qu.LOADED){var r=this.image_.getExtent(),n=this.image_.getImage(),i=void 0,o=void 0;this.imageSize_?(i=this.imageSize_[0],o=this.imageSize_[1]):(i=n.width,o=n.height);var a=Lt(r)/o,s=Math.ceil(Nt(r)/a);if(s!=i){var u=io(s,o),l=u.canvas;u.drawImage(n,0,0,i,o,0,0,l.width,l.height),this.image_.setImage(l)}}t.prototype.handleImageChange.call(this,e)},e}(Ch),Uh="1.3.0",Yh="carmentaserver",Xh="geoserver",Bh="mapserver",zh="qgis",Vh=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),Wh=[101,101],Zh=function(t){function e(e){var r=this,n=e||{};return(r=t.call(this,{attributions:n.attributions,projection:n.projection,resolutions:n.resolutions})||this).crossOrigin_=void 0!==n.crossOrigin?n.crossOrigin:null,r.url_=n.url,r.imageLoadFunction_=void 0!==n.imageLoadFunction?n.imageLoadFunction:Oh,r.params_=n.params||{},r.v13_=!0,r.updateV13_(),r.serverType_=n.serverType,r.hidpi_=void 0===n.hidpi||n.hidpi,r.image_=null,r.imageSize_=[0,0],r.renderedRevision_=0,r.ratio_=void 0!==n.ratio?n.ratio:1.5,r}return Vh(e,t),e.prototype.getGetFeatureInfoUrl=function(t,e,r,n){if(void 0!==this.url_){var i=Ie(r),o=this.getProjection();o&&o!==i&&(e=Fl(o,i,t,e),t=je(t,i,o));var a=It(t,e,0,Wh),s={SERVICE:"WMS",VERSION:Uh,REQUEST:"GetFeatureInfo",FORMAT:"image/png",TRANSPARENT:!0,QUERY_LAYERS:this.params_.LAYERS};p(s,this.params_,n);var u=Math.floor((t[0]-a[0])/e),l=Math.floor((a[3]-t[1])/e);return s[this.v13_?"I":"X"]=u,s[this.v13_?"J":"Y"]=l,this.getRequestUrl_(a,Wh,1,o||i,s)}},e.prototype.getParams=function(){return this.params_},e.prototype.getImageInternal=function(t,e,r,n){if(void 0===this.url_)return null;e=this.findNearestResolution(e),1==r||this.hidpi_&&void 0!==this.serverType_||(r=1);var i=e/r,o=Pt(t),a=It(o,i,0,[Math.ceil(Nt(t)/i),Math.ceil(Lt(t)/i)]),s=It(o,i,0,[Math.ceil(this.ratio_*Nt(t)/i),Math.ceil(this.ratio_*Lt(t)/i)]),u=this.image_;if(u&&this.renderedRevision_==this.getRevision()&&u.getResolution()==e&&u.getPixelRatio()==r&&ht(u.getExtent(),a))return u;var l={SERVICE:"WMS",VERSION:Uh,REQUEST:"GetMap",FORMAT:"image/png",TRANSPARENT:!0};p(l,this.params_),this.imageSize_[0]=Math.round(Nt(s)/i),this.imageSize_[1]=Math.round(Lt(s)/i);var h=this.getRequestUrl_(s,this.imageSize_,r,n,l);return this.image_=new Ph(s,e,r,h,this.crossOrigin_,this.imageLoadFunction_),this.renderedRevision_=this.getRevision(),E(this.image_,F.CHANGE,this.handleImageChange,this),this.image_},e.prototype.getImageLoadFunction=function(){return this.imageLoadFunction_},e.prototype.getRequestUrl_=function(t,e,r,n,i){if(W(void 0!==this.url_,9),i[this.v13_?"CRS":"SRS"]=n.getCode(),"STYLES"in this.params_||(i.STYLES=""),1!=r)switch(this.serverType_){case Xh:var o=90*r+.5|0;"FORMAT_OPTIONS"in i?i.FORMAT_OPTIONS+=";dpi:"+o:i.FORMAT_OPTIONS="dpi:"+o;break;case Bh:i.MAP_RESOLUTION=90*r;break;case Yh:case zh:i.DPI=90*r;break;default:W(!1,8)}i.WIDTH=e[0],i.HEIGHT=e[1];var a,s=n.getAxisOrientation();return a=this.v13_&&"ne"==s.substr(0,2)?[t[1],t[0],t[3],t[2]]:t,i.BBOX=a.join(","),bh(this.url_,i)},e.prototype.getUrl=function(){return this.url_},e.prototype.setImageLoadFunction=function(t){this.image_=null,this.imageLoadFunction_=t,this.changed()},e.prototype.setUrl=function(t){t!=this.url_&&(this.url_=t,this.image_=null,this.changed())},e.prototype.updateParams=function(t){p(this.params_,t),this.updateV13_(),this.image_=null,this.changed()},e.prototype.updateV13_=function(){var t=this.params_.VERSION||Uh;this.v13_=Di(t,"1.3")>=0},e}(Ch),Kh=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),Hh='&#169; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors.',qh=function(t){function e(e){var r,n=e||{};r=void 0!==n.attributions?n.attributions:[Hh];var i=void 0!==n.crossOrigin?n.crossOrigin:"anonymous",o=void 0!==n.url?n.url:"https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png";return t.call(this,{attributions:r,cacheSize:n.cacheSize,crossOrigin:i,opaque:void 0===n.opaque||n.opaque,maxZoom:void 0!==n.maxZoom?n.maxZoom:19,reprojectionErrorThreshold:n.reprojectionErrorThreshold,tileLoadFunction:n.tileLoadFunction,url:o,wrapX:n.wrapX,attributionsCollapsible:!1})||this}return Kh(e,t),e}(ih),Jh=r(2),Qh=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),$h=function(t){function e(e){var r=e||{};return t.call(this,r)||this}return Qh(e,t),e}(Go),tc=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),ec=function(t){function e(e){var r=t.call(this)||this;return r.layer_=e,r}return tc(e,t),e.prototype.prepareFrame=function(t,e){return n()},e.prototype.renderFrame=function(t,e){return n()},e.prototype.loadedTileCallback=function(t,e,r){t[e]||(t[e]={}),t[e][r.tileCoord.toString()]=r},e.prototype.createLoadedTileFinder=function(t,e,r){return function(n,i){var o=this.loadedTileCallback.bind(this,r,n);return t.forEachLoadedTile(e,n,i,o)}.bind(this)},e.prototype.forEachFeatureAtCoordinate=function(t,e,r,n){},e.prototype.getDataAtPixel=function(t,e,r){return n()},e.prototype.getLayer=function(){return this.layer_},e.prototype.handleImageChange_=function(t){t.target.getState()===qu.LOADED&&this.renderIfReadyAndVisible()},e.prototype.hasFeatureAtCoordinate=function(t,e){return!1},e.prototype.loadImage=function(t){var e=t.getState();return e!=qu.LOADED&&e!=qu.ERROR&&E(t,F.CHANGE,this.handleImageChange_,this),e==qu.IDLE&&(t.load(),e=t.getState()),e==qu.LOADED},e.prototype.renderIfReadyAndVisible=function(){var t=this.getLayer();t.getVisible()&&t.getSourceState()==fo.READY&&t.changed()},e}(N),rc=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),nc=function(t){function e(e){var r=t.call(this,e)||this;r.renderedResolution,r.tempTransform_=[1,0,0,1,0,0],r.pixelTransform_=[1,0,0,1,0,0],r.inversePixelTransform_=[1,0,0,1,0,0],r.context=io();var n=r.context.canvas;return n.style.position="absolute",n.style.transformOrigin="top left",n.className=r.getLayer().getClassName(),r}return rc(e,t),e.prototype.disposeInternal=function(){this.context.canvas.width=this.context.canvas.height=0,t.prototype.disposeInternal.call(this)},e.prototype.clip=function(t,e,r){var n=e.pixelRatio,i=e.size[0]*n/2,o=e.size[1]*n/2,a=e.viewState.rotation,s=Ft(r),u=At(r),l=Rt(r),h=Ct(r);Ve(e.coordinateToPixelTransform,s),Ve(e.coordinateToPixelTransform,u),Ve(e.coordinateToPixelTransform,l),Ve(e.coordinateToPixelTransform,h),t.save(),js(t,-a,i,o),t.beginPath(),t.moveTo(s[0]*n,s[1]*n),t.lineTo(u[0]*n,u[1]*n),t.lineTo(l[0]*n,l[1]*n),t.lineTo(h[0]*n,h[1]*n),t.clip(),js(t,a,i,o)},e.prototype.clipUnrotated=function(t,e,r){var n=Ft(r),i=At(r),o=Rt(r),a=Ct(r);Ve(e.coordinateToPixelTransform,n),Ve(e.coordinateToPixelTransform,i),Ve(e.coordinateToPixelTransform,o),Ve(e.coordinateToPixelTransform,a);var s=this.inversePixelTransform_;Ve(s,n),Ve(s,i),Ve(s,o),Ve(s,a),t.save(),t.beginPath(),t.moveTo(Math.round(n[0]),Math.round(n[1])),t.lineTo(Math.round(i[0]),Math.round(i[1])),t.lineTo(Math.round(o[0]),Math.round(o[1])),t.lineTo(Math.round(a[0]),Math.round(a[1])),t.clip()},e.prototype.dispatchRenderEvent_=function(t,e,r){var n=this.getLayer();if(n.hasListener(t)){var i=new Za(t,this.inversePixelTransform_,r,e,null);n.dispatchEvent(i)}},e.prototype.preRender=function(t,e){this.dispatchRenderEvent_(di,t,e)},e.prototype.postRender=function(t,e){this.dispatchRenderEvent_(_i,t,e)},e.prototype.getRenderTransform=function(t,e,r,n){var i=t.viewState,o=e/2,a=r/2,s=t.pixelRatio/i.resolution,u=-s,l=-i.center[0]+n,h=-i.center[1];return qe(this.tempTransform_,o,a,s,u,-i.rotation,l,h)},e.prototype.getDataAtPixel=function(t,e,r){var n,i=Ve(this.inversePixelTransform_,t.slice()),o=this.context;try{n=o.getImageData(Math.round(i[0]),Math.round(i[1]),1,1).data}catch(t){return"SecurityError"===t.name?new Uint8Array:n}return 0===n[3]?null:n},e}(ec),ic=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),oc=function(t){function e(e){var r=t.call(this,e)||this;return r.image_=null,r}return ic(e,t),e.prototype.getImage=function(){return this.image_?this.image_.getImage():null},e.prototype.prepareFrame=function(t,e){var r=t.pixelRatio,n=t.viewState,i=n.resolution,o=this.getLayer().getSource(),a=t.viewHints,s=t.extent;if(void 0!==e.extent&&(s=Mt(s,e.extent)),!a[Li]&&!a[Mi]&&!Dt(s)){var u=n.projection,l=o.getImage(s,i,r,u);l&&this.loadImage(l)&&(this.image_=l)}return!!this.image_},e.prototype.renderFrame=function(t,e){var r=this.image_,n=r.getExtent(),i=r.getResolution(),o=r.getPixelRatio(),a=t.pixelRatio,s=t.viewState,u=s.center,l=s.resolution,h=t.size,c=a*i/(l*o),p=Math.round(h[0]*a),f=Math.round(h[1]*a),d=s.rotation;d&&(p=f=Math.round(Math.sqrt(p*p+f*f)));qe(this.pixelTransform_,t.size[0]/2,t.size[1]/2,1/a,1/a,d,-p/2,-f/2),Je(this.inversePixelTransform_,this.pixelTransform_);var _=this.context,g=_.canvas;g.width!=p||g.height!=f?(g.width=p,g.height=f):_.clearRect(0,0,p,f);var y=e.extent,v=void 0!==y&&!ht(y,t.extent)&&Gt(y,t.extent);v&&this.clip(_,t,y);var m=r.getImage(),E=qe(this.tempTransform_,p/2,f/2,c,c,0,o*(n[0]-u[0])/i,o*(u[1]-n[3])/i);this.renderedResolution=i*a/o;var T=E[4],S=E[5],w=m.width*E[0],x=m.height*E[3];this.preRender(_,t),w>=.5&&x>=.5&&this.context.drawImage(m,0,0,+m.width,+m.height,Math.round(T),Math.round(S),Math.round(w),Math.round(x)),this.postRender(_,t),v&&_.restore();var O=e.opacity;O!==parseFloat(g.style.opacity)&&(g.style.opacity=O);var C=Qe(this.pixelTransform_);return C!==g.style.transform&&(g.style.transform=C),g},e}(nc),ac=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),sc=function(t){function e(e){return t.call(this,e)||this}return ac(e,t),e.prototype.createRenderer=function(){return new oc(this)},e}($h),uc="preload",lc="useInterimTilesOnError",hc=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),cc=function(t){function e(e){var r=this,n=e||{},i=p({},n);return delete i.preload,delete i.useInterimTilesOnError,(r=t.call(this,i)||this).setPreload(void 0!==n.preload?n.preload:0),r.setUseInterimTilesOnError(void 0===n.useInterimTilesOnError||n.useInterimTilesOnError),r}return hc(e,t),e.prototype.getPreload=function(){return this.get(uc)},e.prototype.setPreload=function(t){this.set(uc,t)},e.prototype.getUseInterimTilesOnError=function(){return this.get(lc)},e.prototype.setUseInterimTilesOnError=function(t){this.set(lc,t)},e}(Go),pc=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),fc=function(t){function e(e){var r=t.call(this,e)||this;return r.extentChanged=!0,r.renderedExtent_=null,r.renderedRevision,r.renderedTiles=[],r.newTiles_=!1,r.tmpExtent=[1/0,1/0,-1/0,-1/0],r.tmpTileRange_=new Ws(0,0,0,0),r.zDirection=0,r}return pc(e,t),e.prototype.isDrawableTile=function(t){var e=this.getLayer(),r=t.getState(),n=e.getUseInterimTilesOnError();return r==mi.LOADED||r==mi.EMPTY||r==mi.ERROR&&!n},e.prototype.getTile=function(t,e,r,n){var i=n.pixelRatio,o=n.viewState.projection,a=this.getLayer(),s=a.getSource().getTile(t,e,r,i,o);return s.getState()==mi.ERROR&&(a.getUseInterimTilesOnError()?a.getPreload()>0&&(this.newTiles_=!0):s.setState(mi.LOADED)),this.isDrawableTile(s)||(s=s.getInterimTile()),s},e.prototype.loadedTileCallback=function(e,r,n){return!!this.isDrawableTile(n)&&t.prototype.loadedTileCallback.call(this,e,r,n)},e.prototype.prepareFrame=function(t,e){return!0},e.prototype.renderFrame=function(t,e){var r=this.context,n=t.viewState,i=n.projection,a=n.resolution,s=n.center,u=n.rotation,l=t.pixelRatio,h=this.getLayer(),c=h.getSource(),p=c.getRevision(),f=c.getTileGridForProjection(i),d=void 0===c.zDirection?this.zDirection:c.zDirection,_=f.getZForResolution(a,d),g=f.getResolution(_),y=t.extent;e.extent&&(y=Mt(y,e.extent));var v=c.getTilePixelRatio(l),m=Math.round(t.size[0]*v),E=Math.round(t.size[1]*v);u&&(m=E=Math.round(Math.sqrt(m*m+E*E)));var T=g*m/2/v,S=g*E/2/v,w=[s[0]-T,s[1]-S,s[0]+T,s[1]+S],x=f.getTileRangeForExtentAndZ(y,_),O={};O[_]={};var C=this.createLoadedTileFinder(c,i,O),R=this.tmpExtent,P=this.tmpTileRange_;this.newTiles_=!1;for(var b=x.minX;b<=x.maxX;++b)for(var I=x.minY;I<=x.maxY;++I){var L=this.getTile(_,b,I,t);if(this.isDrawableTile(L)){var M=o(this);if(L.getState()==mi.LOADED){O[_][L.tileCoord.toString()]=L;var F=L.inTransition(M);this.newTiles_||!F&&-1!==this.renderedTiles.indexOf(L)||(this.newTiles_=!0)}if(1===L.getAlpha(M,t.time))continue}var A=f.getTileCoordChildTileRange(L.tileCoord,P,R),N=!1;A&&(N=C(_+1,A)),N||f.forEachTileCoordParentTileRange(L.tileCoord,C,P,R)}var G=r.canvas,D=g/a;qe(this.pixelTransform_,t.size[0]/2,t.size[1]/2,1/v,1/v,u,-m/2,-E/2),Je(this.inversePixelTransform_,this.pixelTransform_),qe(this.tempTransform_,m/2,E/2,D,D,0,-m/2,-E/2),G.width!=m||G.height!=E?(G.width=m,G.height=E):r.clearRect(0,0,m,E),e.extent&&this.clipUnrotated(r,t,e.extent),this.preRender(r,t),this.renderedTiles.length=0;var k=Object.keys(O).map(Number);k.sort(function(t,e){return t===_?1:e===_?-1:t>e?1:t<e?-1:0});for(var j=0,U=k.length;j<U;++j){var Y=k[j],X=c.getTilePixelSize(Y,l,i),B=f.getResolution(Y)/g,z=X[0]*B*D,V=X[1]*B*D,W=f.getTileCoordForCoordAndZ(Ft(w),Y),Z=f.getTileCoordExtent(W),K=Ve(this.tempTransform_,[v*(Z[0]-w[0])/g,v*(w[3]-Z[3])/g]),H=v*c.getGutterForProjection(i),q=O[Y];for(var J in q){var Q=(L=q[J]).tileCoord,$=K[0]-(W[1]-Q[1])*z,tt=Math.round($+z),et=K[1]-(W[2]-Q[2])*V,rt=Math.round(et+V),nt=tt-(b=Math.round($)),it=rt-(I=Math.round(et));this.drawTileImage(L,t,b,I,nt,it,H,_===Y),this.renderedTiles.push(L),this.updateUsedTiles(t.usedTiles,c,L)}}this.renderedRevision=p,this.renderedResolution=g,this.extentChanged=!this.renderedExtent_||!vt(this.renderedExtent_,w),this.renderedExtent_=w,this.manageTilePyramid(t,c,f,l,i,y,_,h.getPreload()),this.updateCacheSize_(t,c),this.scheduleExpireCache(t,c),this.postRender(r,t),e.extent&&r.restore();var ot=e.opacity;ot!==parseFloat(G.style.opacity)&&(G.style.opacity=ot);var at=Qe(this.pixelTransform_);return at!==G.style.transform&&(G.style.transform=at),G},e.prototype.drawTileImage=function(t,e,r,n,i,a,s,u){var l=this.getTileImage(t);if(l){var h=o(this),c=u?t.getAlpha(h,e.time):1,p=this.getLayer().getSource();1!==c||p.getOpaque(e.viewState.projection)||this.context.clearRect(r,n,i,a);var f=c!==this.context.globalAlpha;f&&(this.context.save(),this.context.globalAlpha=c),this.context.drawImage(l,s,s,l.width-2*s,l.height-2*s,r,n,i,a),f&&this.context.restore(),1!==c?e.animate=!0:u&&t.endTransition(h)}},e.prototype.getImage=function(){var t=this.context;return t?t.canvas:null},e.prototype.getTileImage=function(t){return t.getImage()},e.prototype.scheduleExpireCache=function(t,e){if(e.canExpireCache()){var r=function(t,e,r){var n=o(t);n in r.usedTiles&&t.expireCache(r.viewState.projection,r.usedTiles[n])}.bind(null,e);t.postRenderFunctions.push(r)}},e.prototype.updateUsedTiles=function(t,e,r){var n=o(e);n in t||(t[n]={}),t[n][r.getKey()]=!0},e.prototype.updateCacheSize_=function(t,e){var r=o(e),n=0;r in t.usedTiles&&(n+=Object.keys(t.usedTiles[r]).length),r in t.wantedTiles&&(n+=Object.keys(t.wantedTiles[r]).length);var i=e.tileCache;i.highWaterMark<n&&(i.highWaterMark=n)},e.prototype.manageTilePyramid=function(t,e,r,n,i,a,s,u,l){var h=o(e);h in t.wantedTiles||(t.wantedTiles[h]={});var c,p,f,d,_,g,y=t.wantedTiles[h],v=t.tileQueue;for(g=r.getMinZoom();g<=s;++g)for(p=r.getTileRangeForExtentAndZ(a,g,p),f=r.getResolution(g),d=p.minX;d<=p.maxX;++d)for(_=p.minY;_<=p.maxY;++_)s-g<=u?((c=e.getTile(g,d,_,n,i)).getState()==mi.IDLE&&(y[c.getKey()]=!0,v.isKeyQueued(c.getKey())||v.enqueue([c,h,r.getTileCoordCenter(c.tileCoord),f])),void 0!==l&&l(c)):e.useTile(g,d,_,i)},e}(nc);fc.prototype.getLayer;var dc=fc,_c=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),gc=function(t){function e(e){return t.call(this,e)||this}return _c(e,t),e.prototype.createRenderer=function(){return new dc(this)},e}(cc),yc=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),vc="beforeoperations",mc="afteroperations",Ec={PIXEL:"pixel",IMAGE:"image"},Tc=function(t){function e(e,r,n){var i=t.call(this,e)||this;return i.extent=r.extent,i.resolution=r.viewState.resolution/r.pixelRatio,i.data=n,i}return yc(e,t),e}(I),Sc=function(t){function e(e){var r,n=t.call(this,{projection:null})||this;n.worker_=null,n.operationType_=void 0!==e.operationType?e.operationType:Ec.PIXEL,n.threads_=void 0!==e.threads?e.threads:1,n.layers_=function(t){for(var e=t.length,r=new Array(e),n=0;n<e;++n)r[n]=Oc(t[n]);return r}(e.sources);for(var i=0,o=n.layers_.length;i<o;++i)E(n.layers_[i],F.CHANGE,n.changed,n);return n.tileQueue_=new Si(function(){return 1},n.changed.bind(n)),n.requestedFrameState_,n.renderedImageCanvas_=null,n.renderedRevision_,n.frameState_={animate:!1,coordinateToPixelTransform:[1,0,0,1,0,0],extent:null,focus:null,index:0,layerStatesArray:(r=n.layers_,r.map(function(t){return t.getLayerState()})),pixelRatio:1,pixelToCoordinateTransform:[1,0,0,1,0,0],postRenderFunctions:[],size:[0,0],skippedFeatureUids:{},tileQueue:n.tileQueue_,time:Date.now(),usedTiles:{},viewState:{rotation:0},viewHints:[],wantedTiles:{}},n.setAttributions(function(t){for(var r=[],n=0,i=e.sources.length;n<i;++n){var o=e.sources[n],a=(o instanceof Xl?o:o.getSource()).getAttributions();if("function"==typeof a){var s=a(t);r.push.apply(r,s)}}return 0!==r.length?r:null}),void 0!==e.operation&&n.setOperation(e.operation,e.lib),n}return yc(e,t),e.prototype.setOperation=function(t,e){this.worker_=new Jh.Processor({operation:t,imageOps:this.operationType_===Ec.IMAGE,queue:1,lib:e,threads:this.threads_}),this.changed()},e.prototype.updateFrameState_=function(t,e,r){var n=p({},this.frameState_);n.viewState=p({},n.viewState);var i=Pt(t);n.extent=t.slice(),n.focus=i,n.size[0]=Math.round(Nt(t)/e),n.size[1]=Math.round(Lt(t)/e),n.time=Date.now(),n.animate=!1;var o=n.viewState;return o.center=i,o.projection=r,o.resolution=e,n},e.prototype.allSourcesReady_=function(){for(var t=!0,e=0,r=this.layers_.length;e<r;++e)if(this.layers_[e].getSource().getState()!==fo.READY){t=!1;break}return t},e.prototype.getImage=function(t,e,r,n){if(!this.allSourcesReady_())return null;var i=this.updateFrameState_(t,e,n);if(this.requestedFrameState_=i,this.renderedImageCanvas_){var o=this.renderedImageCanvas_.getResolution(),a=this.renderedImageCanvas_.getExtent();e===o&&vt(t,a)||(this.renderedImageCanvas_=null)}return this.renderedImageCanvas_&&this.getRevision()===this.renderedRevision_||this.processSources_(),i.tileQueue.loadMoreTiles(16,16),i.animate&&requestAnimationFrame(this.changed.bind(this)),this.renderedImageCanvas_},e.prototype.processSources_=function(){for(var t=this.requestedFrameState_,e=this.layers_.length,r=new Array(e),n=0;n<e;++n){var i=xc(this.layers_[n],t,t.layerStatesArray[n]);if(!i)return;r[n]=i}var o={};this.dispatchEvent(new Tc(vc,t,o)),this.worker_.process(r,o,this.onWorkerComplete_.bind(this,t))},e.prototype.onWorkerComplete_=function(t,e,r,n){if(!e&&r){var i=t.extent,o=t.viewState.resolution;if(o===this.requestedFrameState_.viewState.resolution&&vt(i,this.requestedFrameState_.extent)){var a;if(this.renderedImageCanvas_)a=this.renderedImageCanvas_.getImage().getContext("2d");else a=io(Math.round(Nt(i)/o),Math.round(Lt(i)/o)),this.renderedImageCanvas_=new Fh(i,o,1,a.canvas);a.putImageData(r,0,0),this.changed(),this.renderedRevision_=this.getRevision(),this.dispatchEvent(new Tc(mc,t,n))}}},e.prototype.getImageInternal=function(){return null},e}(Ch),wc=null;function xc(t,e,r){var n=t.getRenderer();if(!n)throw new Error("Unsupported layer type: "+t);if(!n.prepareFrame(e,r))return null;var i=e.size[0],o=e.size[1],a=n.renderFrame(e,r);if(!(a instanceof HTMLCanvasElement))throw new Error("Unsupported rendered element: "+a);if(a.width===i&&a.height===o)return a.getContext("2d").getImageData(0,0,i,o);if(wc){var s=wc.canvas;s.width!==i||s.height!==o?wc=io(i,o):wc.clearRect(0,0,i,o)}else wc=io(i,o);return wc.drawImage(a,0,0,i,o),wc.getImageData(0,0,i,o)}function Oc(t){var e;return t instanceof Xl?t instanceof Wl?e=new gc({source:t}):t instanceof Ch&&(e=new sc({source:t})):e=t,e}var Cc=Sc,Rc=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),Pc=['Map tiles by <a href="https://stamen.com/">Stamen Design</a>, under <a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>.',Hh],bc={terrain:{extension:"jpg",opaque:!0},"terrain-background":{extension:"jpg",opaque:!0},"terrain-labels":{extension:"png",opaque:!1},"terrain-lines":{extension:"png",opaque:!1},"toner-background":{extension:"png",opaque:!0},toner:{extension:"png",opaque:!0},"toner-hybrid":{extension:"png",opaque:!1},"toner-labels":{extension:"png",opaque:!1},"toner-lines":{extension:"png",opaque:!1},"toner-lite":{extension:"png",opaque:!0},watercolor:{extension:"jpg",opaque:!0}},Ic={terrain:{minZoom:0,maxZoom:18},toner:{minZoom:0,maxZoom:20},watercolor:{minZoom:0,maxZoom:18}},Lc=function(t){function e(e){var r=e.layer.indexOf("-"),n=-1==r?e.layer:e.layer.slice(0,r),i=Ic[n],o=bc[e.layer],a=void 0!==e.url?e.url:"https://stamen-tiles-{a-d}.a.ssl.fastly.net/"+e.layer+"/{z}/{x}/{y}."+o.extension;return t.call(this,{attributions:Pc,cacheSize:e.cacheSize,crossOrigin:"anonymous",maxZoom:null!=e.maxZoom?e.maxZoom:i.maxZoom,minZoom:null!=e.minZoom?e.minZoom:i.minZoom,opaque:o.opaque,reprojectionErrorThreshold:e.reprojectionErrorThreshold,tileLoadFunction:e.tileLoadFunction,transition:e.transition,url:a,wrapX:e.wrapX})||this}return Rc(e,t),e}(ih),Mc=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}();function Fc(t,e,r){var n=this.getTileGrid();if(n||(n=this.getTileGridForProjection(r)),!(n.getResolutions().length<=t[0])){var i=n.getTileCoordExtent(t,this.tmpExtent_),o=Eo(n.getTileSize(t[0]),this.tmpSize);1!=e&&(o=mo(o,e,this.tmpSize));var a={F:"image",FORMAT:"PNG32",TRANSPARENT:!0};return p(a,this.params_),this.getRequestUrl_(t,o,i,e,r,a)}}var Ac=function(t){function e(e){var r=this,n=e||{};return(r=t.call(this,{attributions:n.attributions,cacheSize:n.cacheSize,crossOrigin:n.crossOrigin,projection:n.projection,reprojectionErrorThreshold:n.reprojectionErrorThreshold,tileGrid:n.tileGrid,tileLoadFunction:n.tileLoadFunction,tileUrlFunction:Fc,url:n.url,urls:n.urls,wrapX:void 0===n.wrapX||n.wrapX,transition:n.transition})||this).params_=n.params||{},r.tmpExtent_=[1/0,1/0,-1/0,-1/0],r.setKey(r.getKeyForParams_()),r}return Mc(e,t),e.prototype.getKeyForParams_=function(){var t=0,e=[];for(var r in this.params_)e[t++]=r+"-"+this.params_[r];return e.join("/")},e.prototype.getParams=function(){return this.params_},e.prototype.getRequestUrl_=function(t,e,r,n,i,o){var a=this.urls;if(a){var s,u=i.getCode().split(":").pop();if(o.SIZE=e[0]+","+e[1],o.BBOX=r.join(","),o.BBOXSR=u,o.IMAGESR=u,o.DPI=Math.round(o.DPI?o.DPI*n:90*n),1==a.length)s=a[0];else s=a[Ht(qs(t),a.length)];return bh(s.replace(/MapServer\/?$/,"MapServer/export").replace(/ImageServer\/?$/,"ImageServer/exportImage"),o)}},e.prototype.getTilePixelRatio=function(t){return t},e.prototype.updateParams=function(t){p(this.params_,t),this.setKey(this.getKeyForParams_())},e}(th),Nc=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),Gc=function(t){function e(e,r,n){var i=t.call(this,e,mi.LOADED)||this;return i.tileSize_=r,i.text_=n,i.canvas_=null,i}return Nc(e,t),e.prototype.getImage=function(){if(this.canvas_)return this.canvas_;var t=this.tileSize_,e=io(t[0],t[1]);return e.strokeStyle="grey",e.strokeRect(.5,.5,t[0]+.5,t[1]+.5),e.fillStyle="grey",e.strokeStyle="white",e.textAlign="center",e.textBaseline="middle",e.font="24px sans-serif",e.lineWidth=4,e.strokeText(this.text_,t[0]/2,t[1]/2,t[0]),e.fillText(this.text_,t[0]/2,t[1]/2,t[0]),this.canvas_=e.canvas,e.canvas},e.prototype.load=function(){},e}(Rl),Dc=function(t){function e(e){var r=e||{};return t.call(this,{opaque:!1,projection:r.projection,tileGrid:r.tileGrid,wrapX:void 0===r.wrapX||r.wrapX})||this}return Nc(e,t),e.prototype.getTile=function(t,e,r){var n=Ks(t,e,r);if(this.tileCache.containsKey(n))return this.tileCache.get(n);var i=Eo(this.tileGrid.getTileSize(t)),o=[t,e,r],a=this.getTileCoordForTileUrlFunction(o),s=void 0;s=a?"z:"+a[0]+" x:"+a[1]+" y:"+a[2]:"none";var u=new Gc(o,i,s);return this.tileCache.set(n,u),u},e}(ih),kc=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),jc=function(t){function e(e){var r=t.call(this,{attributions:e.attributions,cacheSize:e.cacheSize,crossOrigin:e.crossOrigin,projection:Ie("EPSG:3857"),reprojectionErrorThreshold:e.reprojectionErrorThreshold,state:fo.LOADING,tileLoadFunction:e.tileLoadFunction,wrapX:void 0===e.wrapX||e.wrapX,transition:e.transition})||this;if(r.tileJSON_=null,r.tileSize_=e.tileSize,e.url)if(e.jsonp)xl(e.url,r.handleTileJSONResponse.bind(r),r.handleTileJSONError.bind(r));else{var n=new XMLHttpRequest;n.addEventListener("load",r.onXHRLoad_.bind(r)),n.addEventListener("error",r.onXHRError_.bind(r)),n.open("GET",e.url),n.send()}else e.tileJSON?r.handleTileJSONResponse(e.tileJSON):W(!1,51);return r}return kc(e,t),e.prototype.onXHRLoad_=function(t){var e=t.target;if(!e.status||e.status>=200&&e.status<300){var r=void 0;try{r=JSON.parse(e.responseText)}catch(t){return void this.handleTileJSONError()}this.handleTileJSONResponse(r)}else this.handleTileJSONError()},e.prototype.onXHRError_=function(t){this.handleTileJSONError()},e.prototype.getTileJSON=function(){return this.tileJSON_},e.prototype.handleTileJSONResponse=function(t){var e,r=Ie("EPSG:4326"),n=this.getProjection();if(void 0!==t.bounds){var i=De(r,n);e=jt(t.bounds,i)}var o=t.minzoom||0,a=t.maxzoom||22,s=tu({extent:nu(n),maxZoom:a,minZoom:o,tileSize:this.tileSize_});if(this.tileGrid=s,this.tileUrlFunction=El(t.tiles,s),void 0!==t.attribution&&!this.getAttributions()){var u=void 0!==e?e:r.getExtent();this.setAttributions(function(e){return Gt(u,e.extent)?[t.attribution]:null})}this.tileJSON_=t,this.setState(fo.READY)},e.prototype.handleTileJSONError=function(){this.setState(fo.ERROR)},e}(th),Uc=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}();function Yc(t,e,r){var n=this.getTileGrid();if(n||(n=this.getTileGridForProjection(r)),!(n.getResolutions().length<=t[0])){1==e||this.hidpi_&&void 0!==this.serverType_||(e=1);var i=n.getResolution(t[0]),o=n.getTileCoordExtent(t,this.tmpExtent_),a=Eo(n.getTileSize(t[0]),this.tmpSize),s=this.gutter_;0!==s&&(a=vo(a,s,this.tmpSize),o=at(o,i*s,o)),1!=e&&(a=mo(a,e,this.tmpSize));var u={SERVICE:"WMS",VERSION:Uh,REQUEST:"GetMap",FORMAT:"image/png",TRANSPARENT:!0};return p(u,this.params_),this.getRequestUrl_(t,a,o,e,r,u)}}var Xc=function(t){function e(e){var r=this,n=e||{},i=n.params||{},o=!("TRANSPARENT"in i)||i.TRANSPARENT;return(r=t.call(this,{attributions:n.attributions,cacheSize:n.cacheSize,crossOrigin:n.crossOrigin,opaque:!o,projection:n.projection,reprojectionErrorThreshold:n.reprojectionErrorThreshold,tileClass:n.tileClass,tileGrid:n.tileGrid,tileLoadFunction:n.tileLoadFunction,tileUrlFunction:Yc,url:n.url,urls:n.urls,wrapX:void 0===n.wrapX||n.wrapX,transition:n.transition})||this).gutter_=void 0!==n.gutter?n.gutter:0,r.params_=i,r.v13_=!0,r.serverType_=n.serverType,r.hidpi_=void 0===n.hidpi||n.hidpi,r.tmpExtent_=[1/0,1/0,-1/0,-1/0],r.updateV13_(),r.setKey(r.getKeyForParams_()),r}return Uc(e,t),e.prototype.getGetFeatureInfoUrl=function(t,e,r,n){var i=Ie(r),o=this.getProjection(),a=this.getTileGrid();a||(a=this.getTileGridForProjection(i));var s=a.getTileCoordForCoordAndResolution(t,e);if(!(a.getResolutions().length<=s[0])){var u=a.getResolution(s[0]),l=a.getTileCoordExtent(s,this.tmpExtent_),h=Eo(a.getTileSize(s[0]),this.tmpSize),c=this.gutter_;0!==c&&(h=vo(h,c,this.tmpSize),l=at(l,u*c,l)),o&&o!==i&&(u=Fl(o,i,t,u),l=Ue(l,i,o),t=je(t,i,o));var f={SERVICE:"WMS",VERSION:Uh,REQUEST:"GetFeatureInfo",FORMAT:"image/png",TRANSPARENT:!0,QUERY_LAYERS:this.params_.LAYERS};p(f,this.params_,n);var d=Math.floor((t[0]-l[0])/u),_=Math.floor((l[3]-t[1])/u);return f[this.v13_?"I":"X"]=d,f[this.v13_?"J":"Y"]=_,this.getRequestUrl_(s,h,l,1,o||i,f)}},e.prototype.getGutter=function(){return this.gutter_},e.prototype.getParams=function(){return this.params_},e.prototype.getRequestUrl_=function(t,e,r,n,i,o){var a=this.urls;if(a){if(o.WIDTH=e[0],o.HEIGHT=e[1],o[this.v13_?"CRS":"SRS"]=i.getCode(),"STYLES"in this.params_||(o.STYLES=""),1!=n)switch(this.serverType_){case Xh:var s=90*n+.5|0;"FORMAT_OPTIONS"in o?o.FORMAT_OPTIONS+=";dpi:"+s:o.FORMAT_OPTIONS="dpi:"+s;break;case Bh:o.MAP_RESOLUTION=90*n;break;case Yh:case zh:o.DPI=90*n;break;default:W(!1,52)}var u,l=i.getAxisOrientation(),h=r;if(this.v13_&&"ne"==l.substr(0,2)){var c=void 0;c=r[0],h[0]=r[1],h[1]=c,c=r[2],h[2]=r[3],h[3]=c}if(o.BBOX=h.join(","),1==a.length)u=a[0];else u=a[Ht(qs(t),a.length)];return bh(u,o)}},e.prototype.getTilePixelRatio=function(t){return this.hidpi_&&void 0!==this.serverType_?t:1},e.prototype.getKeyForParams_=function(){var t=0,e=[];for(var r in this.params_)e[t++]=r+"-"+this.params_[r];return e.join("/")},e.prototype.updateParams=function(t){p(this.params_,t),this.updateV13_(),this.setKey(this.getKeyForParams_())},e.prototype.updateV13_=function(){var t=this.params_.VERSION||Uh;this.v13_=Di(t,"1.3")>=0},e}(th),Bc=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),zc=function(t){function e(e,r,n,i,o,a){var s=t.call(this,e,r)||this;return s.src_=n,s.extent_=i,s.preemptive_=o,s.grid_=null,s.keys_=null,s.data_=null,s.jsonp_=a,s}return Bc(e,t),e.prototype.getImage=function(){return null},e.prototype.getData=function(t){if(!this.grid_||!this.keys_)return null;var e=(t[0]-this.extent_[0])/(this.extent_[2]-this.extent_[0]),r=(t[1]-this.extent_[1])/(this.extent_[3]-this.extent_[1]),n=this.grid_[Math.floor((1-r)*this.grid_.length)];if("string"!=typeof n)return null;var i=n.charCodeAt(Math.floor(e*n.length));i>=93&&i--,i>=35&&i--;var o=null;if((i-=32)in this.keys_){var a=this.keys_[i];o=this.data_&&a in this.data_?this.data_[a]:a}return o},e.prototype.forDataAtCoordinate=function(t,e,r){this.state==mi.IDLE&&!0===r?(T(this,F.CHANGE,function(r){e(this.getData(t))},this),this.loadInternal_()):!0===r?setTimeout(function(){e(this.getData(t))}.bind(this),0):e(this.getData(t))},e.prototype.getKey=function(){return this.src_},e.prototype.handleError_=function(){this.state=mi.ERROR,this.changed()},e.prototype.handleLoad_=function(t){this.grid_=t.grid,this.keys_=t.keys,this.data_=t.data,this.state=mi.EMPTY,this.changed()},e.prototype.loadInternal_=function(){if(this.state==mi.IDLE)if(this.state=mi.LOADING,this.jsonp_)xl(this.src_,this.handleLoad_.bind(this),this.handleError_.bind(this));else{var t=new XMLHttpRequest;t.addEventListener("load",this.onXHRLoad_.bind(this)),t.addEventListener("error",this.onXHRError_.bind(this)),t.open("GET",this.src_),t.send()}},e.prototype.onXHRLoad_=function(t){var e=t.target;if(!e.status||e.status>=200&&e.status<300){var r=void 0;try{r=JSON.parse(e.responseText)}catch(t){return void this.handleError_()}this.handleLoad_(r)}else this.handleError_()},e.prototype.onXHRError_=function(t){this.handleError_()},e.prototype.load=function(){this.preemptive_&&this.loadInternal_()},e}(Rl),Vc=function(t){function e(e){var r=t.call(this,{projection:Ie("EPSG:3857"),state:fo.LOADING})||this;if(r.preemptive_=void 0===e.preemptive||e.preemptive,r.tileUrlFunction_=Sl,r.template_=void 0,r.jsonp_=e.jsonp||!1,e.url)if(r.jsonp_)xl(e.url,r.handleTileJSONResponse.bind(r),r.handleTileJSONError.bind(r));else{var n=new XMLHttpRequest;n.addEventListener("load",r.onXHRLoad_.bind(r)),n.addEventListener("error",r.onXHRError_.bind(r)),n.open("GET",e.url),n.send()}else e.tileJSON?r.handleTileJSONResponse(e.tileJSON):W(!1,51);return r}return Bc(e,t),e.prototype.onXHRLoad_=function(t){var e=t.target;if(!e.status||e.status>=200&&e.status<300){var r=void 0;try{r=JSON.parse(e.responseText)}catch(t){return void this.handleTileJSONError()}this.handleTileJSONResponse(r)}else this.handleTileJSONError()},e.prototype.onXHRError_=function(t){this.handleTileJSONError()},e.prototype.getTemplate=function(){return this.template_},e.prototype.forDataAtCoordinateAndResolution=function(t,e,r,n){if(this.tileGrid){var i=this.tileGrid.getTileCoordForCoordAndResolution(t,e);this.getTile(i[0],i[1],i[2],1,this.getProjection()).forDataAtCoordinate(t,r,n)}else!0===n?setTimeout(function(){r(null)},0):r(null)},e.prototype.handleTileJSONError=function(){this.setState(fo.ERROR)},e.prototype.handleTileJSONResponse=function(t){var e,r=Ie("EPSG:4326"),n=this.getProjection();if(void 0!==t.bounds){var i=De(r,n);e=jt(t.bounds,i)}var o=t.minzoom||0,a=t.maxzoom||22,s=tu({extent:nu(n),maxZoom:a,minZoom:o});this.tileGrid=s,this.template_=t.template;var u=t.grids;if(u){if(this.tileUrlFunction_=El(u,s),void 0!==t.attribution){var l=void 0!==e?e:r.getExtent();this.setAttributions(function(e){return Gt(l,e.extent)?[t.attribution]:null})}this.setState(fo.READY)}else this.setState(fo.ERROR)},e.prototype.getTile=function(t,e,r,n,i){var o=Ks(t,e,r);if(this.tileCache.containsKey(o))return this.tileCache.get(o);var a=[t,e,r],s=this.getTileCoordForTileUrlFunction(a,i),u=this.tileUrlFunction_(s,n,i),l=new zc(a,void 0!==u?mi.IDLE:mi.EMPTY,void 0!==u?u:"",this.tileGrid.getTileCoordExtent(a),this.preemptive_,this.jsonp_);return this.tileCache.set(o,l),l},e.prototype.useTile=function(t,e,r){var n=Ks(t,e,r);this.tileCache.containsKey(n)&&this.tileCache.get(n)},e}(Wl),Wc=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),Zc=function(t){function e(e,r,n,i,o,a){var s=t.call(this,e,r,{transition:0})||this;return s.context_={},s.executorGroups={},s.loadingSourceTiles=0,s.errorSourceTileKeys={},s.replayState_={},s.wantedResolution,s.getSourceTiles_=o,s.removeSourceTiles_=a,s.sourceTileGrid_=i,s.sourceZ=-1,s.hifi=!1,s.wrappedTileCoord=n,s}return Wc(e,t),e.prototype.disposeInternal=function(){for(var e in this.removeSourceTiles_(this),this.context_){var r=this.context_[e].canvas;r.width=r.height=0}for(var e in this.executorGroups)for(var n=this.executorGroups[e],i=0,o=n.length;i<o;++i)n[i].disposeInternal();this.setState(mi.ABORT),t.prototype.disposeInternal.call(this)},e.prototype.getContext=function(t){var e=o(t);return e in this.context_||(this.context_[e]=io()),this.context_[e]},e.prototype.hasContext=function(t){return o(t)in this.context_},e.prototype.getImage=function(t){return this.hasContext(t)?this.getContext(t).canvas:null},e.prototype.getReplayState=function(t){var e=o(t);return e in this.replayState_||(this.replayState_[e]={dirty:!1,renderedRenderOrder:null,renderedResolution:NaN,renderedRevision:-1,renderedTileResolution:NaN,renderedTileRevision:-1,renderedZ:-1,renderedTileZ:-1}),this.replayState_[e]},e.prototype.load=function(){this.getSourceTiles_(this)},e}(Rl),Kc=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),Hc=function(t){function e(e,r,n,i,o,a){var s=t.call(this,e,r,a)||this;return s.consumers=0,s.extent=null,s.format_=i,s.features_=null,s.loader_,s.projection=null,s.resolution,s.tileLoadFunction_=o,s.url_=n,s}return Kc(e,t),e.prototype.disposeInternal=function(){this.setState(mi.ABORT),t.prototype.disposeInternal.call(this)},e.prototype.getFormat=function(){return this.format_},e.prototype.getFeatures=function(){return this.features_},e.prototype.getKey=function(){return this.url_},e.prototype.load=function(){this.state==mi.IDLE&&(this.setState(mi.LOADING),this.tileLoadFunction_(this,this.url_),this.loader_(this.extent,this.resolution,this.projection))},e.prototype.onLoad=function(t,e){this.setFeatures(t)},e.prototype.onError=function(){this.setState(mi.ERROR)},e.prototype.setFeatures=function(t){this.features_=t,this.setState(mi.LOADED)},e.prototype.setLoader=function(t){this.loader_=t},e}(Rl),qc=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),Jc=function(t){function e(e){var r=this,n=e.projection||"EPSG:3857",i=e.extent||nu(n),o=e.tileGrid||tu({extent:i,maxZoom:e.maxZoom||22,minZoom:e.minZoom,tileSize:e.tileSize||512});return(r=t.call(this,{attributions:e.attributions,cacheSize:e.cacheSize,opaque:!1,projection:n,state:e.state,tileGrid:o,tileLoadFunction:e.tileLoadFunction?e.tileLoadFunction:Qc,tileUrlFunction:e.tileUrlFunction,url:e.url,urls:e.urls,wrapX:void 0===e.wrapX||e.wrapX,transition:e.transition})||this).format_=e.format?e.format:null,r.loadingTiles_={},r.sourceTiles_={},r.sourceTilesByTileKey_={},r.overlaps_=null==e.overlaps||e.overlaps,r.tileClass=e.tileClass?e.tileClass:Hc,r.tileGrids_={},r}return qc(e,t),e.prototype.getOverlaps=function(){return this.overlaps_},e.prototype.clear=function(){this.tileCache.clear(),this.sourceTiles_={},this.sourceTilesByTileKey_={}},e.prototype.getSourceTiles=function(t,e,r){var n=[],i=r.wrappedTileCoord;if(i){var o=this.getTileGridForProjection(e),a=o.getTileCoordExtent(i),s=i[0],u=o.getResolution(s);at(a,-1/u,a);var l=this.tileGrid,h=l.getExtent();h&&Mt(a,h,a);var c,p,f=l.getZForResolution(u,1),d=l.getMinZoom(),g=f+1;do{--g,c=!0,p=!0,l.forEachTileCoord(a,g,function(i){var o,a=Hs(i);if(a in this.sourceTiles_){var s=(o=this.sourceTiles_[a]).getState();if(s===mi.LOADED||s===mi.ERROR||s===mi.EMPTY)return p=p&&s===mi.EMPTY,void n.push(o)}else if(g===f){var u=this.tileUrlFunction(i,t,e);(o=new this.tileClass(i,null==u?mi.EMPTY:mi.IDLE,null==u?"":u,this.format_,this.tileLoadFunction)).extent=l.getTileCoordExtent(i),o.projection=e,o.resolution=l.getResolution(i[0]),this.sourceTiles_[a]=o,p=p&&o.getState()===mi.EMPTY,E(o,F.CHANGE,this.handleTileChange,this),o.load()}else p=!1;if(c=!1,o&&o.getState()!==mi.EMPTY&&r.getState()===mi.IDLE){r.loadingSourceTiles++;var h=E(o,F.CHANGE,function(){var t=o.getState(),e=Hs(o.tileCoord);t!==mi.LOADED&&t!==mi.ERROR||(t===mi.LOADED?(w(h),r.loadingSourceTiles--,delete r.errorSourceTileKeys[e]):t===mi.ERROR&&(r.errorSourceTileKeys[e]=!0),r.loadingSourceTiles-Object.keys(r.errorSourceTileKeys).length==0&&(r.hifi=!0,r.sourceZ=f,r.setState(_(r.errorSourceTileKeys)?mi.LOADED:mi.ERROR)))})}}.bind(this)),c||(n.length=0)}while(!c&&g>d);if(p||r.getState()!==mi.IDLE||r.setState(mi.LOADING),c||p){r.hifi=f===g,r.sourceZ=g;var y=this.sourceTilesByTileKey_[Hs(r.tileCoord)];r.getState()<mi.LOADED?r.setState(p?mi.EMPTY:mi.LOADED):y&&et(n,y)||(this.removeSourceTiles(r),this.addSourceTiles(r,n))}}return n},e.prototype.addSourceTiles=function(t,e){this.sourceTilesByTileKey_[Hs(t.tileCoord)]=e;for(var r=0,n=e.length;r<n;++r)e[r].consumers++},e.prototype.removeSourceTiles=function(t){var e=Hs(t.tileCoord);if(e in this.sourceTilesByTileKey_)for(var r=this.sourceTilesByTileKey_[e],n=0,i=r.length;n<i;++n){var o=r[n];o.consumers--,0===o.consumers&&(o.dispose(),delete this.sourceTiles_[Hs(o.tileCoord)])}delete this.sourceTilesByTileKey_[e]},e.prototype.getTile=function(t,e,r,n,i){var o=Ks(t,e,r);if(this.tileCache.containsKey(o))return this.tileCache.get(o);var a=[t,e,r],s=this.getTileCoordForTileUrlFunction(a,i),u=new Zc(a,null!==s?mi.IDLE:mi.EMPTY,s,this.tileGrid,this.getSourceTiles.bind(this,n,i),this.removeSourceTiles.bind(this));return u.key=this.getRevision().toString(),this.tileCache.set(o,u),u},e.prototype.getTileGridForProjection=function(t){var e=t.getCode(),r=this.tileGrids_[e];if(!r){var n=this.tileGrid;r=this.tileGrids_[e]=ru(t,void 0,n?n.getTileSize(n.getMinZoom()):void 0)}return r},e.prototype.getTilePixelRatio=function(t){return t},e.prototype.getTilePixelSize=function(t,e,r){var n=Eo(this.getTileGridForProjection(r).getTileSize(t),this.tmpSize);return[Math.round(n[0]*e),Math.round(n[1]*e)]},e}(Jl);function Qc(t,e){var r=ys(e,t.getFormat(),t.onLoad.bind(t),t.onError.bind(t));t.setLoader(r)}var $c={KVP:"KVP",REST:"REST"},tp=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),ep=function(t){function e(e){var r=this,n=void 0!==e.requestEncoding?e.requestEncoding:$c.KVP,i=e.tileGrid,o=e.urls;return void 0===o&&void 0!==e.url&&(o=wl(e.url)),(r=t.call(this,{attributions:e.attributions,cacheSize:e.cacheSize,crossOrigin:e.crossOrigin,projection:e.projection,reprojectionErrorThreshold:e.reprojectionErrorThreshold,tileClass:e.tileClass,tileGrid:i,tileLoadFunction:e.tileLoadFunction,tilePixelRatio:e.tilePixelRatio,tileUrlFunction:Sl,urls:o,wrapX:void 0!==e.wrapX&&e.wrapX,transition:e.transition})||this).version_=void 0!==e.version?e.version:"1.0.0",r.format_=void 0!==e.format?e.format:"image/jpeg",r.dimensions_=void 0!==e.dimensions?e.dimensions:{},r.layer_=e.layer,r.matrixSet_=e.matrixSet,r.style_=e.style,r.requestEncoding_=n,r.setKey(r.getKeyForDimensions_()),o&&o.length>0&&(r.tileUrlFunction=Tl(o.map(rp.bind(r)))),r}return tp(e,t),e.prototype.setUrls=function(t){this.urls=t;var e=t.join("\n");this.setTileUrlFunction(Tl(t.map(rp.bind(this))),e)},e.prototype.getDimensions=function(){return this.dimensions_},e.prototype.getFormat=function(){return this.format_},e.prototype.getLayer=function(){return this.layer_},e.prototype.getMatrixSet=function(){return this.matrixSet_},e.prototype.getRequestEncoding=function(){return this.requestEncoding_},e.prototype.getStyle=function(){return this.style_},e.prototype.getVersion=function(){return this.version_},e.prototype.getKeyForDimensions_=function(){var t=0,e=[];for(var r in this.dimensions_)e[t++]=r+"-"+this.dimensions_[r];return e.join("/")},e.prototype.updateDimensions=function(t){p(this.dimensions_,t),this.setKey(this.getKeyForDimensions_())},e}(th);function rp(t){var e=this.requestEncoding_,r={layer:this.layer_,style:this.style_,tilematrixset:this.matrixSet_};e==$c.KVP&&p(r,{Service:"WMTS",Request:"GetTile",Version:this.version_,Format:this.format_}),t=e==$c.KVP?bh(t,r):t.replace(/\{(\w+?)\}/g,function(t,e){return e.toLowerCase()in r?r[e.toLowerCase()]:t});var n=this.tileGrid,i=this.dimensions_;return function(r,o,a){if(r){var s={TileMatrix:n.getMatrixId(r[0]),TileCol:r[1],TileRow:r[2]};p(s,i);var u=t;return u=e==$c.KVP?bh(u,s):u.replace(/\{(\w+?)\}/g,function(t,e){return s[e]})}}}var np=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),ip={DEFAULT:"default",TRUNCATED:"truncated"},op=function(t){function e(e,r,n,i,o,a,s){var u=t.call(this,r,n,i,o,a,s)||this;return u.zoomifyImage_=null,u.tileSize_=Eo(e.getTileSize(r[0])),u}return np(e,t),e.prototype.getImage=function(){if(this.zoomifyImage_)return this.zoomifyImage_;var e=t.prototype.getImage.call(this);if(this.state==mi.LOADED){var r=this.tileSize_;if(e.width==r[0]&&e.height==r[1])return this.zoomifyImage_=e,e;var n=io(r[0],r[1]);return n.drawImage(e,0,0),this.zoomifyImage_=n.canvas,n.canvas}return e},e}(Il),ap=function(t){function e(e){var r=this,n=e||{},i=n.size,o=void 0!==n.tierSizeCalculation?n.tierSizeCalculation:ip.DEFAULT,a=i[0],s=i[1],u=n.extent||[0,-i[1],i[0],0],l=[],h=n.tileSize||xi,c=h;switch(o){case ip.DEFAULT:for(;a>c||s>c;)l.push([Math.ceil(a/c),Math.ceil(s/c)]),c+=c;break;case ip.TRUNCATED:for(var p=a,f=s;p>c||f>c;)l.push([Math.ceil(p/c),Math.ceil(f/c)]),p>>=1,f>>=1;break;default:W(!1,53)}l.push([1,1]),l.reverse();for(var d=[1],_=[0],g=1,y=l.length;g<y;g++)d.push(1<<g),_.push(l[g-1][0]*l[g-1][1]+_[g-1]);d.reverse();var v=new Qs({tileSize:h,extent:u,origin:Ft(u),resolutions:d}),m=n.url;m&&-1==m.indexOf("{TileGroup}")&&-1==m.indexOf("{tileIndex}")&&(m+="{TileGroup}/{z}-{x}-{y}.jpg");var E=Tl(wl(m).map(function(t){return function(e,r,n){if(e){var i=e[0],o=e[1],a=e[2],s=o+a*l[i][0],u=v.getTileSize(i),h=Array.isArray(u)?u[0]:u,c={z:i,x:o,y:a,tileIndex:s,TileGroup:"TileGroup"+((s+_[i])/h|0)};return t.replace(/\{(\w+?)\}/g,function(t,e){return c[e]})}}})),T=op.bind(null,v);return(r=t.call(this,{attributions:n.attributions,cacheSize:n.cacheSize,crossOrigin:n.crossOrigin,projection:n.projection,tilePixelRatio:n.tilePixelRatio,reprojectionErrorThreshold:n.reprojectionErrorThreshold,tileClass:T,tileGrid:v,tileUrlFunction:E,transition:n.transition})||this).zDirection=n.zDirection,r}return np(e,t),e}(th),sp={STATIC_DRAW:35044,STREAM_DRAW:35040,DYNAMIC_DRAW:Ou},up=function(){function t(t,e){this.arr_=void 0!==t?t:[],this.usage_=void 0!==e?e:sp.STATIC_DRAW}return t.prototype.getArray=function(){return this.arr_},t.prototype.getUsage=function(){return this.usage_},t}(),lp=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),hp="\n  precision mediump float;\n  attribute vec2 a_position;\n  attribute vec2 a_texCoord;\n  attribute float a_rotateWithView;\n  attribute vec2 a_offsets;\n  attribute float a_opacity;\n  attribute vec4 a_color;\n  \n  uniform mat4 u_projectionMatrix;\n  uniform mat4 u_offsetScaleMatrix;\n  uniform mat4 u_offsetRotateMatrix;\n  \n  varying vec2 v_texCoord;\n  varying float v_opacity;\n  varying vec4 v_color;\n  \n  void main(void) {\n    mat4 offsetMatrix = u_offsetScaleMatrix;\n    if (a_rotateWithView == 1.0) {\n      offsetMatrix = u_offsetScaleMatrix * u_offsetRotateMatrix;\n    }\n    vec4 offsets = offsetMatrix * vec4(a_offsets, 0.0, 0.0);\n    gl_Position = u_projectionMatrix * vec4(a_position, 0.0, 1.0) + offsets;\n    v_texCoord = a_texCoord;\n    v_opacity = a_opacity;\n    v_color = a_color;\n  }",cp="\n  precision mediump float;\n  \n  uniform sampler2D u_texture;\n\n  varying vec2 v_texCoord;\n  varying float v_opacity;\n  varying vec4 v_color;\n  \n  void main(void) {\n    if (v_opacity == 0.0) {\n      discard;\n    }\n    vec4 textureColor = texture2D(u_texture, v_texCoord);\n    gl_FragColor = v_color * textureColor;\n    gl_FragColor.a *= v_opacity;\n    gl_FragColor.rgb *= gl_FragColor.a;\n  }",pp=function(t){function e(e,r){var n=t.call(this,e)||this,i=r||{},o=i.uniforms||{};return o.u_texture=i.texture||n.getDefaultTexture(),n.helper_=new Vu({postProcesses:i.postProcesses,uniforms:o}),n.sourceRevision_=-1,n.verticesBuffer_=new up([],Ou),n.indicesBuffer_=new up([],Ou),n.program_=n.helper_.getProgram(i.fragmentShader||cp,i.vertexShader||hp),n.helper_.useProgram(n.program_),n.sizeCallback_=i.sizeCallback||function(){return 1},n.coordCallback_=i.coordCallback||function(t,e){return t.getGeometry().getCoordinates()[e]},n.opacityCallback_=i.opacityCallback||function(){return 1},n.texCoordCallback_=i.texCoordCallback||function(t,e){return e<2?0:1},n.colorCallback_=i.colorCallback||function(t,e,r){return 1},n.rotateWithViewCallback_=i.rotateWithViewCallback||function(){return!1},n}return lp(e,t),e.prototype.disposeInternal=function(){t.prototype.disposeInternal.call(this)},e.prototype.renderFrame=function(t,e){this.helper_.drawElements(0,this.indicesBuffer_.getArray().length),this.helper_.finalizeDraw(t);var r=this.helper_.getCanvas(),n=e.opacity;return n!==parseFloat(r.style.opacity)&&(r.style.opacity=n),r},e.prototype.prepareFrame=function(t){var e=this,r=this.getLayer().getSource();if(this.helper_.prepareDraw(t),this.sourceRevision_<r.getRevision()){this.sourceRevision_=r.getRevision();var n=t.viewState,i=n.projection,o=n.resolution;r.loadFeatures([-1/0,-1/0,1/0,1/0],o,i),r.forEachFeature(function(t){if(t.getGeometry()&&t.getGeometry().getType()===Yt.POINT){var r=e.coordCallback_(t,0),n=e.coordCallback_(t,1),i=e.texCoordCallback_(t,0),o=e.texCoordCallback_(t,1),a=e.texCoordCallback_(t,2),s=e.texCoordCallback_(t,3),u=e.sizeCallback_(t),l=e.opacityCallback_(t),h=e.rotateWithViewCallback_(t)?1:0,c=e.colorCallback_(t,0,0),p=e.colorCallback_(t,0,1),f=e.colorCallback_(t,0,2),d=e.colorCallback_(t,0,3),_=e.colorCallback_(t,1,0),g=e.colorCallback_(t,1,1),y=e.colorCallback_(t,1,2),v=e.colorCallback_(t,1,3),m=e.colorCallback_(t,2,0),E=e.colorCallback_(t,2,1),T=e.colorCallback_(t,2,2),S=e.colorCallback_(t,2,3),w=e.colorCallback_(t,3,0),x=e.colorCallback_(t,3,1),O=e.colorCallback_(t,3,2),C=e.colorCallback_(t,3,3),R=e.verticesBuffer_.getArray().length/12;e.verticesBuffer_.getArray().push(r,n,-u/2,-u/2,i,o,l,h,c,p,f,d,r,n,+u/2,-u/2,a,o,l,h,_,g,y,v,r,n,+u/2,+u/2,a,s,l,h,m,E,T,S,r,n,-u/2,+u/2,i,s,l,h,w,x,O,C),e.indicesBuffer_.getArray().push(R,R+1,R+3,R+1,R+2,R+3)}})}this.helper_.bindBuffer(34962,this.verticesBuffer_),this.helper_.bindBuffer(34963,this.indicesBuffer_);var a=Float32Array.BYTES_PER_ELEMENT;return this.helper_.enableAttributeArray(ju,2,5126,12*a,0),this.helper_.enableAttributeArray(Bu,2,5126,12*a,2*a),this.helper_.enableAttributeArray(Uu,2,5126,12*a,4*a),this.helper_.enableAttributeArray(Yu,1,5126,12*a,6*a),this.helper_.enableAttributeArray(Xu,1,5126,12*a,7*a),this.helper_.enableAttributeArray(zu,4,5126,12*a,8*a),!0},e.prototype.getShaderCompileErrors=function(){return this.helper_.getShaderCompileErrors()},e.prototype.getDefaultTexture=function(){var t=document.createElement("canvas").getContext("2d").createImageData(1,1);return t.data[0]=t.data[1]=t.data[2]=t.data[3]=255,t},e}(ec),fp={BEGIN_GEOMETRY:0,BEGIN_PATH:1,CIRCLE:2,CLOSE_PATH:3,CUSTOM:4,DRAW_CHARS:5,DRAW_IMAGE:6,END_GEOMETRY:7,FILL:8,MOVE_TO_LINE_TO:9,SET_FILL_STYLE:10,SET_STROKE_STYLE:11,STROKE:12},dp=[fp.FILL],_p=[fp.STROKE],gp=[fp.BEGIN_PATH],yp=[fp.CLOSE_PATH],vp=fp,mp=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),Ep=function(t){function e(e,r,n,i){var o=t.call(this)||this;return o.tolerance=e,o.maxExtent=r,o.pixelRatio=i,o.maxLineWidth=0,o.resolution=n,o.beginGeometryInstruction1_=null,o.beginGeometryInstruction2_=null,o.bufferedMaxExtent_=null,o.instructions=[],o.coordinates=[],o.tmpCoordinate_=[],o.hitDetectionInstructions=[],o.state={},o}return mp(e,t),e.prototype.applyPixelRatio=function(t){var e=this.pixelRatio;return 1==e?t:t.map(function(t){return t*e})},e.prototype.appendFlatCoordinates=function(t,e,r,n,i,o){var a=this.coordinates.length,s=this.getBufferedMaxExtent();o&&(e+=n);var u,l,h,c=t[e],p=t[e+1],f=this.tmpCoordinate_,d=!0;for(u=e+n;u<r;u+=n)f[0]=t[u],f[1]=t[u+1],(h=pt(s,f))!==l?(d&&(this.coordinates[a++]=c,this.coordinates[a++]=p),this.coordinates[a++]=f[0],this.coordinates[a++]=f[1],d=!1):h===it.INTERSECTING?(this.coordinates[a++]=f[0],this.coordinates[a++]=f[1],d=!1):d=!0,c=f[0],p=f[1],l=h;return(i&&d||u===e+n)&&(this.coordinates[a++]=c,this.coordinates[a++]=p),a},e.prototype.drawCustomCoordinates_=function(t,e,r,n,i){for(var o=0,a=r.length;o<a;++o){var s=r[o],u=this.appendFlatCoordinates(t,e,s,n,!1,!1);i.push(u),e=s}return e},e.prototype.drawCustom=function(t,e,r){this.beginGeometry(e);var n,i,o,a,s,u=t.getType(),l=t.getStride(),h=this.coordinates.length;if(u==Yt.MULTI_POLYGON){n=(t=t).getOrientedFlatCoordinates(),a=[];var c=t.getEndss();s=0;for(var p=0,f=c.length;p<f;++p){var d=[];s=this.drawCustomCoordinates_(n,s,c[p],l,d),a.push(d)}this.instructions.push([vp.CUSTOM,h,a,t,r,yr])}else u==Yt.POLYGON||u==Yt.MULTI_LINE_STRING?(o=[],n=u==Yt.POLYGON?t.getOrientedFlatCoordinates():t.getFlatCoordinates(),s=this.drawCustomCoordinates_(n,0,t.getEnds(),l,o),this.instructions.push([vp.CUSTOM,h,o,t,r,gr])):u==Yt.LINE_STRING||u==Yt.MULTI_POINT?(n=t.getFlatCoordinates(),i=this.appendFlatCoordinates(n,0,n.length,l,!1,!1),this.instructions.push([vp.CUSTOM,h,i,t,r,_r])):u==Yt.POINT&&(n=t.getFlatCoordinates(),this.coordinates.push(n[0],n[1]),i=this.coordinates.length,this.instructions.push([vp.CUSTOM,h,i,t,r]));this.endGeometry(e)},e.prototype.beginGeometry=function(t){this.beginGeometryInstruction1_=[vp.BEGIN_GEOMETRY,t,0],this.instructions.push(this.beginGeometryInstruction1_),this.beginGeometryInstruction2_=[vp.BEGIN_GEOMETRY,t,0],this.hitDetectionInstructions.push(this.beginGeometryInstruction2_)},e.prototype.finish=function(){return{instructions:this.instructions,hitDetectionInstructions:this.hitDetectionInstructions,coordinates:this.coordinates}},e.prototype.reverseHitDetectionInstructions=function(){var t,e=this.hitDetectionInstructions;e.reverse();var r,n,i=e.length,o=-1;for(t=0;t<i;++t)(n=(r=e[t])[0])==vp.END_GEOMETRY?o=t:n==vp.BEGIN_GEOMETRY&&(r[2]=t,Q(this.hitDetectionInstructions,o,t),o=-1)},e.prototype.setFillStrokeStyle=function(t,e){var r=this.state;if(t){var n=t.getColor();r.fillStyle=_s(n||"#000")}else r.fillStyle=void 0;if(e){var i=e.getColor();r.strokeStyle=_s(i||"#000");var o=e.getLineCap();r.lineCap=void 0!==o?o:"round";var a=e.getLineDash();r.lineDash=a?a.slice():Cs;var s=e.getLineDashOffset();r.lineDashOffset=s||0;var u=e.getLineJoin();r.lineJoin=void 0!==u?u:"round";var l=e.getWidth();r.lineWidth=void 0!==l?l:1;var h=e.getMiterLimit();r.miterLimit=void 0!==h?h:10,r.lineWidth>this.maxLineWidth&&(this.maxLineWidth=r.lineWidth,this.bufferedMaxExtent_=null)}else r.strokeStyle=void 0,r.lineCap=void 0,r.lineDash=null,r.lineDashOffset=void 0,r.lineJoin=void 0,r.lineWidth=void 0,r.miterLimit=void 0},e.prototype.createFill=function(t){var e=t.fillStyle,r=[vp.SET_FILL_STYLE,e];return"string"!=typeof e&&r.push(!0),r},e.prototype.applyStroke=function(t){this.instructions.push(this.createStroke(t))},e.prototype.createStroke=function(t){return[vp.SET_STROKE_STYLE,t.strokeStyle,t.lineWidth*this.pixelRatio,t.lineCap,t.lineJoin,t.miterLimit,this.applyPixelRatio(t.lineDash),t.lineDashOffset*this.pixelRatio]},e.prototype.updateFillStyle=function(t,e){var r=t.fillStyle;"string"==typeof r&&t.currentFillStyle==r||(void 0!==r&&this.instructions.push(e.call(this,t)),t.currentFillStyle=r)},e.prototype.updateStrokeStyle=function(t,e){var r=t.strokeStyle,n=t.lineCap,i=t.lineDash,o=t.lineDashOffset,a=t.lineJoin,s=t.lineWidth,u=t.miterLimit;(t.currentStrokeStyle!=r||t.currentLineCap!=n||i!=t.currentLineDash&&!et(t.currentLineDash,i)||t.currentLineDashOffset!=o||t.currentLineJoin!=a||t.currentLineWidth!=s||t.currentMiterLimit!=u)&&(void 0!==r&&e.call(this,t),t.currentStrokeStyle=r,t.currentLineCap=n,t.currentLineDash=i,t.currentLineDashOffset=o,t.currentLineJoin=a,t.currentLineWidth=s,t.currentMiterLimit=u)},e.prototype.endGeometry=function(t){this.beginGeometryInstruction1_[2]=this.instructions.length,this.beginGeometryInstruction1_=null,this.beginGeometryInstruction2_[2]=this.hitDetectionInstructions.length,this.beginGeometryInstruction2_=null;var e=[vp.END_GEOMETRY,t];this.instructions.push(e),this.hitDetectionInstructions.push(e)},e.prototype.getBufferedMaxExtent=function(){if(!this.bufferedMaxExtent_&&(this.bufferedMaxExtent_=st(this.maxExtent),this.maxLineWidth>0)){var t=this.resolution*(this.maxLineWidth+1)/2;at(this.bufferedMaxExtent_,t,this.bufferedMaxExtent_)}return this.bufferedMaxExtent_},e}(Ts),Tp=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),Sp=function(t){function e(e,r,n,i){var o=t.call(this,e,r,n,i)||this;return o.declutterGroup_=null,o.hitDetectionImage_=null,o.image_=null,o.anchorX_=void 0,o.anchorY_=void 0,o.height_=void 0,o.opacity_=void 0,o.originX_=void 0,o.originY_=void 0,o.rotateWithView_=void 0,o.rotation_=void 0,o.scale_=void 0,o.width_=void 0,o}return Tp(e,t),e.prototype.drawCoordinates_=function(t,e,r,n){return this.appendFlatCoordinates(t,e,r,n,!1,!1)},e.prototype.drawPoint=function(t,e){if(this.image_){this.beginGeometry(e);var r=t.getFlatCoordinates(),n=t.getStride(),i=this.coordinates.length,o=this.drawCoordinates_(r,0,r.length,n);this.instructions.push([vp.DRAW_IMAGE,i,o,this.image_,this.anchorX_,this.anchorY_,this.declutterGroup_,this.height_,this.opacity_,this.originX_,this.originY_,this.rotateWithView_,this.rotation_,this.scale_*this.pixelRatio,this.width_]),this.hitDetectionInstructions.push([vp.DRAW_IMAGE,i,o,this.hitDetectionImage_,this.anchorX_,this.anchorY_,this.declutterGroup_,this.height_,this.opacity_,this.originX_,this.originY_,this.rotateWithView_,this.rotation_,this.scale_,this.width_]),this.endGeometry(e)}},e.prototype.drawMultiPoint=function(t,e){if(this.image_){this.beginGeometry(e);var r=t.getFlatCoordinates(),n=t.getStride(),i=this.coordinates.length,o=this.drawCoordinates_(r,0,r.length,n);this.instructions.push([vp.DRAW_IMAGE,i,o,this.image_,this.anchorX_,this.anchorY_,this.declutterGroup_,this.height_,this.opacity_,this.originX_,this.originY_,this.rotateWithView_,this.rotation_,this.scale_*this.pixelRatio,this.width_]),this.hitDetectionInstructions.push([vp.DRAW_IMAGE,i,o,this.hitDetectionImage_,this.anchorX_,this.anchorY_,this.declutterGroup_,this.height_,this.opacity_,this.originX_,this.originY_,this.rotateWithView_,this.rotation_,this.scale_,this.width_]),this.endGeometry(e)}},e.prototype.finish=function(){return this.reverseHitDetectionInstructions(),this.anchorX_=void 0,this.anchorY_=void 0,this.hitDetectionImage_=null,this.image_=null,this.height_=void 0,this.scale_=void 0,this.opacity_=void 0,this.originX_=void 0,this.originY_=void 0,this.rotateWithView_=void 0,this.rotation_=void 0,this.width_=void 0,t.prototype.finish.call(this)},e.prototype.setImageStyle=function(t,e){var r=t.getAnchor(),n=t.getSize(),i=t.getHitDetectionImage(1),o=t.getImage(1),a=t.getOrigin();this.anchorX_=r[0],this.anchorY_=r[1],this.declutterGroup_=e,this.hitDetectionImage_=i,this.image_=o,this.height_=n[1],this.opacity_=t.getOpacity(),this.originX_=a[0],this.originY_=a[1],this.rotateWithView_=t.getRotateWithView(),this.rotation_=t.getRotation(),this.scale_=t.getScale(),this.width_=n[0]},e}(Ep),wp=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),xp=function(t){function e(e,r,n,i){return t.call(this,e,r,n,i)||this}return wp(e,t),e.prototype.drawFlatCoordinates_=function(t,e,r,n){var i=this.coordinates.length,o=this.appendFlatCoordinates(t,e,r,n,!1,!1),a=[vp.MOVE_TO_LINE_TO,i,o];return this.instructions.push(a),this.hitDetectionInstructions.push(a),r},e.prototype.drawLineString=function(t,e){var r=this.state,n=r.strokeStyle,i=r.lineWidth;if(void 0!==n&&void 0!==i){this.updateStrokeStyle(r,this.applyStroke),this.beginGeometry(e),this.hitDetectionInstructions.push([vp.SET_STROKE_STYLE,r.strokeStyle,r.lineWidth,r.lineCap,r.lineJoin,r.miterLimit,r.lineDash,r.lineDashOffset],gp);var o=t.getFlatCoordinates(),a=t.getStride();this.drawFlatCoordinates_(o,0,o.length,a),this.hitDetectionInstructions.push(_p),this.endGeometry(e)}},e.prototype.drawMultiLineString=function(t,e){var r=this.state,n=r.strokeStyle,i=r.lineWidth;if(void 0!==n&&void 0!==i){this.updateStrokeStyle(r,this.applyStroke),this.beginGeometry(e),this.hitDetectionInstructions.push([vp.SET_STROKE_STYLE,r.strokeStyle,r.lineWidth,r.lineCap,r.lineJoin,r.miterLimit,r.lineDash,r.lineDashOffset],gp);for(var o=t.getEnds(),a=t.getFlatCoordinates(),s=t.getStride(),u=0,l=0,h=o.length;l<h;++l)u=this.drawFlatCoordinates_(a,u,o[l],s);this.hitDetectionInstructions.push(_p),this.endGeometry(e)}},e.prototype.finish=function(){var e=this.state;return null!=e.lastStroke&&e.lastStroke!=this.coordinates.length&&this.instructions.push(_p),this.reverseHitDetectionInstructions(),this.state=null,t.prototype.finish.call(this)},e.prototype.applyStroke=function(e){null!=e.lastStroke&&e.lastStroke!=this.coordinates.length&&(this.instructions.push(_p),e.lastStroke=this.coordinates.length),e.lastStroke=0,t.prototype.applyStroke.call(this,e),this.instructions.push(gp)},e}(Ep),Op=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),Cp=function(t){function e(e,r,n,i){return t.call(this,e,r,n,i)||this}return Op(e,t),e.prototype.drawFlatCoordinatess_=function(t,e,r,n){var i=this.state,o=void 0!==i.fillStyle,a=null!=i.strokeStyle,s=r.length;this.instructions.push(gp),this.hitDetectionInstructions.push(gp);for(var u=0;u<s;++u){var l=r[u],h=this.coordinates.length,c=this.appendFlatCoordinates(t,e,l,n,!0,!a),p=[vp.MOVE_TO_LINE_TO,h,c];this.instructions.push(p),this.hitDetectionInstructions.push(p),a&&(this.instructions.push(yp),this.hitDetectionInstructions.push(yp)),e=l}return o&&(this.instructions.push(dp),this.hitDetectionInstructions.push(dp)),a&&(this.instructions.push(_p),this.hitDetectionInstructions.push(_p)),e},e.prototype.drawCircle=function(t,e){var r=this.state,n=r.fillStyle,i=r.strokeStyle;if(void 0!==n||void 0!==i){this.setFillStrokeStyles_(),this.beginGeometry(e),void 0!==r.fillStyle&&this.hitDetectionInstructions.push([vp.SET_FILL_STYLE,"#000"]),void 0!==r.strokeStyle&&this.hitDetectionInstructions.push([vp.SET_STROKE_STYLE,r.strokeStyle,r.lineWidth,r.lineCap,r.lineJoin,r.miterLimit,r.lineDash,r.lineDashOffset]);var o=t.getFlatCoordinates(),a=t.getStride(),s=this.coordinates.length;this.appendFlatCoordinates(o,0,o.length,a,!1,!1);var u=[vp.CIRCLE,s];this.instructions.push(gp,u),this.hitDetectionInstructions.push(gp,u),this.hitDetectionInstructions.push(dp),void 0!==r.fillStyle&&this.instructions.push(dp),void 0!==r.strokeStyle&&(this.instructions.push(_p),this.hitDetectionInstructions.push(_p)),this.endGeometry(e)}},e.prototype.drawPolygon=function(t,e){var r=this.state,n=r.fillStyle,i=r.strokeStyle;if(void 0!==n||void 0!==i){this.setFillStrokeStyles_(),this.beginGeometry(e),void 0!==r.fillStyle&&this.hitDetectionInstructions.push([vp.SET_FILL_STYLE,"#000"]),void 0!==r.strokeStyle&&this.hitDetectionInstructions.push([vp.SET_STROKE_STYLE,r.strokeStyle,r.lineWidth,r.lineCap,r.lineJoin,r.miterLimit,r.lineDash,r.lineDashOffset]);var o=t.getEnds(),a=t.getOrientedFlatCoordinates(),s=t.getStride();this.drawFlatCoordinatess_(a,0,o,s),this.endGeometry(e)}},e.prototype.drawMultiPolygon=function(t,e){var r=this.state,n=r.fillStyle,i=r.strokeStyle;if(void 0!==n||void 0!==i){this.setFillStrokeStyles_(),this.beginGeometry(e),void 0!==r.fillStyle&&this.hitDetectionInstructions.push([vp.SET_FILL_STYLE,"#000"]),void 0!==r.strokeStyle&&this.hitDetectionInstructions.push([vp.SET_STROKE_STYLE,r.strokeStyle,r.lineWidth,r.lineCap,r.lineJoin,r.miterLimit,r.lineDash,r.lineDashOffset]);for(var o=t.getEndss(),a=t.getOrientedFlatCoordinates(),s=t.getStride(),u=0,l=0,h=o.length;l<h;++l)u=this.drawFlatCoordinatess_(a,u,o[l],s);this.endGeometry(e)}},e.prototype.finish=function(){this.reverseHitDetectionInstructions(),this.state=null;var e=this.tolerance;if(0!==e)for(var r=this.coordinates,n=0,i=r.length;n<i;++n)r[n]=Er(r[n],e);return t.prototype.finish.call(this)},e.prototype.setFillStrokeStyles_=function(){var t=this.state;void 0!==t.fillStyle&&this.updateFillStyle(t,this.createFill),void 0!==t.strokeStyle&&this.updateStrokeStyle(t,this.applyStroke)},e}(Ep);function Rp(t,e,r,n,i){var o,a,s,u,l,h,c,p,f,d=r,_=r,g=0,y=0,v=r;for(o=r;o<n;o+=i){var m=e[o],E=e[o+1];void 0!==u&&(p=m-u,f=E-l,s=Math.sqrt(p*p+f*f),void 0!==h&&(y+=a,Math.acos((h*p+c*f)/(a*s))>t&&(y>g&&(g=y,d=v,_=o),y=0,v=o-i)),a=s,h=p,c=f),u=m,l=E}return(y+=s)>g?[v,o]:[d,_]}var Pp=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),bp={left:0,end:0,center:.5,right:1,start:1,top:0,middle:.5,hanging:.2,alphabetic:.8,ideographic:.8,bottom:1},Ip={Circle:Cp,Default:Ep,Image:Sp,LineString:xp,Polygon:Cp,Text:function(t){function e(e,r,n,i){var o=t.call(this,e,r,n,i)||this;return o.declutterGroup_,o.labels_=null,o.text_="",o.textOffsetX_=0,o.textOffsetY_=0,o.textRotateWithView_=void 0,o.textRotation_=0,o.textFillState_=null,o.fillStates={},o.textStrokeState_=null,o.strokeStates={},o.textState_={},o.textStates={},o.textKey_="",o.fillKey_="",o.strokeKey_="",Ps.prune(),o}return Pp(e,t),e.prototype.finish=function(){var e=t.prototype.finish.call(this);return e.textStates=this.textStates,e.fillStates=this.fillStates,e.strokeStates=this.strokeStates,e},e.prototype.drawText=function(t,e){var r=this.textFillState_,n=this.textStrokeState_,i=this.textState_;if(""!==this.text_&&i&&(r||n)){var o,a,s=this.coordinates.length,u=t.getType(),l=null,h=2,c=2;if(i.placement===gl.LINE){if(!Gt(this.getBufferedMaxExtent(),t.getExtent()))return;var p=void 0;if(l=t.getFlatCoordinates(),c=t.getStride(),u==Yt.LINE_STRING)p=[l.length];else if(u==Yt.MULTI_LINE_STRING)p=t.getEnds();else if(u==Yt.POLYGON)p=t.getEnds().slice(0,1);else if(u==Yt.MULTI_POLYGON){var f=t.getEndss();for(p=[],o=0,a=f.length;o<a;++o)p.push(f[o][0])}this.beginGeometry(e);for(var d=i.textAlign,_=0,g=void 0,y=0,v=p.length;y<v;++y){if(null==d){var m=Rp(i.maxAngle,l,_,p[y],c);_=m[0],g=m[1]}else g=p[y];for(o=_;o<g;o+=c)this.coordinates.push(l[o],l[o+1]);h=this.coordinates.length,_=p[y],this.drawChars_(s,h,this.declutterGroup_),s=h}this.endGeometry(e)}else{var E=null;switch(i.overflow||(E=[]),u){case Yt.POINT:case Yt.MULTI_POINT:h=(l=t.getFlatCoordinates()).length;break;case Yt.LINE_STRING:l=t.getFlatMidpoint();break;case Yt.CIRCLE:l=t.getCenter();break;case Yt.MULTI_LINE_STRING:h=(l=t.getFlatMidpoints()).length;break;case Yt.POLYGON:l=t.getFlatInteriorPoint(),i.overflow||E.push(l[2]/this.resolution),c=3;break;case Yt.MULTI_POLYGON:var T=t.getFlatInteriorPoints();for(l=[],o=0,a=T.length;o<a;o+=3)i.overflow||E.push(T[o+2]/this.resolution),l.push(T[o],T[o+1]);if(0==(h=l.length))return}h=this.appendFlatCoordinates(l,0,h,c,!1,!1),this.saveTextStates_(),(i.backgroundFill||i.backgroundStroke)&&(this.setFillStrokeStyle(i.backgroundFill,i.backgroundStroke),i.backgroundFill&&(this.updateFillStyle(this.state,this.createFill),this.hitDetectionInstructions.push(this.createFill(this.state))),i.backgroundStroke&&(this.updateStrokeStyle(this.state,this.applyStroke),this.hitDetectionInstructions.push(this.createStroke(this.state)))),this.beginGeometry(e);var S=this.pixelRatio;this.instructions.push([vp.DRAW_IMAGE,s,h,null,NaN,NaN,this.declutterGroup_,NaN,1,0,0,this.textRotateWithView_,this.textRotation_,1,NaN,i.padding==Rs?Rs:i.padding.map(function(t){return t*S}),!!i.backgroundFill,!!i.backgroundStroke,this.text_,this.textKey_,this.strokeKey_,this.fillKey_,this.textOffsetX_,this.textOffsetY_,E]),this.hitDetectionInstructions.push([vp.DRAW_IMAGE,s,h,null,NaN,NaN,this.declutterGroup_,NaN,1,0,0,this.textRotateWithView_,this.textRotation_,1/this.pixelRatio,NaN,i.padding,!!i.backgroundFill,!!i.backgroundStroke,this.text_,this.textKey_,this.strokeKey_,this.fillKey_,this.textOffsetX_,this.textOffsetY_,E]),this.endGeometry(e)}}},e.prototype.saveTextStates_=function(){var t=this.textStrokeState_,e=this.textState_,r=this.textFillState_,n=this.strokeKey_;t&&(n in this.strokeStates||(this.strokeStates[n]={strokeStyle:t.strokeStyle,lineCap:t.lineCap,lineDashOffset:t.lineDashOffset,lineWidth:t.lineWidth,lineJoin:t.lineJoin,miterLimit:t.miterLimit,lineDash:t.lineDash}));var i=this.textKey_;i in this.textStates||(this.textStates[i]={font:e.font,textAlign:e.textAlign||"center",textBaseline:e.textBaseline||"middle",scale:e.scale});var o=this.fillKey_;r&&(o in this.fillStates||(this.fillStates[o]={fillStyle:r.fillStyle}))},e.prototype.drawChars_=function(t,e,r){var n=this.textStrokeState_,i=this.textState_,o=this.strokeKey_,a=this.textKey_,s=this.fillKey_;this.saveTextStates_();var u=this.pixelRatio,l=bp[i.textBaseline],h=this.textOffsetY_*u,c=this.text_,p=i.scale,f=n?n.lineWidth*p/2:0;this.instructions.push([vp.DRAW_CHARS,t,e,l,r,i.overflow,s,i.maxAngle,u,h,o,f*u,c,a,1]),this.hitDetectionInstructions.push([vp.DRAW_CHARS,t,e,l,r,i.overflow,s,i.maxAngle,1,h,o,f,c,a,1/u])},e.prototype.setTextStyle=function(t,e){var r,n,i;if(t){this.declutterGroup_=e;var a=t.getFill();a?((n=this.textFillState_)||(n=this.textFillState_={}),n.fillStyle=_s(a.getColor()||"#000")):n=this.textFillState_=null;var s=t.getStroke();if(s){(i=this.textStrokeState_)||(i=this.textStrokeState_={});var u=s.getLineDash(),l=s.getLineDashOffset(),h=s.getWidth(),c=s.getMiterLimit();i.lineCap=s.getLineCap()||"round",i.lineDash=u?u.slice():Cs,i.lineDashOffset=void 0===l?0:l,i.lineJoin=s.getLineJoin()||"round",i.lineWidth=void 0===h?1:h,i.miterLimit=void 0===c?10:c,i.strokeStyle=_s(s.getColor()||"#000")}else i=this.textStrokeState_=null;r=this.textState_;var p=t.getFont()||"10px sans-serif";Ms(p);var f=t.getScale();r.overflow=t.getOverflow(),r.font=p,r.maxAngle=t.getMaxAngle(),r.placement=t.getPlacement(),r.textAlign=t.getTextAlign(),r.textBaseline=t.getTextBaseline()||"middle",r.backgroundFill=t.getBackgroundFill(),r.backgroundStroke=t.getBackgroundStroke(),r.padding=t.getPadding()||Rs,r.scale=void 0===f?1:f;var d=t.getOffsetX(),_=t.getOffsetY(),g=t.getRotateWithView(),y=t.getRotation();this.text_=t.getText()||"",this.textOffsetX_=void 0===d?0:d,this.textOffsetY_=void 0===_?0:_,this.textRotateWithView_=void 0!==g&&g,this.textRotation_=void 0===y?0:y,this.strokeKey_=i?("string"==typeof i.strokeStyle?i.strokeStyle:o(i.strokeStyle))+i.lineCap+i.lineDashOffset+"|"+i.lineWidth+i.lineJoin+i.miterLimit+"["+i.lineDash.join()+"]":"",this.textKey_=r.font+r.scale+(r.textAlign||"?"),this.fillKey_=n?"string"==typeof n.fillStyle?n.fillStyle:"|"+o(n.fillStyle):""}else this.text_=""},e}(Ep)},Lp=function(){function t(t,e,r,n,i){this.declutter_=i,this.declutterGroup_=null,this.tolerance_=t,this.maxExtent_=e,this.pixelRatio_=n,this.resolution_=r,this.buildersByZIndex_={}}return t.prototype.addDeclutter=function(t){var e=null;return this.declutter_&&(t?(e=this.declutterGroup_)[4]++:(e=this.declutterGroup_=[1/0,1/0,-1/0,-1/0]).push(1)),e},t.prototype.finish=function(){var t={};for(var e in this.buildersByZIndex_){t[e]=t[e]||{};var r=this.buildersByZIndex_[e];for(var n in r){var i=r[n].finish();t[e][n]=i}}return t},t.prototype.getBuilder=function(t,e){var r=void 0!==t?t.toString():"0",n=this.buildersByZIndex_[r];void 0===n&&(n={},this.buildersByZIndex_[r]=n);var i=n[e];void 0===i&&(i=new(0,Ip[e])(this.tolerance_,this.maxExtent_,this.resolution_,this.pixelRatio_),n[e]=i);return i},t}(),Mp={CIRCLE:"Circle",DEFAULT:"Default",IMAGE:"Image",LINE_STRING:"LineString",POLYGON:"Polygon",TEXT:"Text"};function Fp(t,e,r,n){for(var i=t[e],o=t[e+1],a=0,s=e+n;s<r;s+=n){var u=t[s],l=t[s+1];a+=Math.sqrt((u-i)*(u-i)+(l-o)*(l-o)),i=u,o=l}return a}function Ap(t,e,r,n,i,o,a,s,u,l,h){for(var c,p,f,d=[],_=t[e]>t[r-n],g=i.length,y=t[e],v=t[e+1],m=t[e+=n],E=t[e+1],T=0,S=Math.sqrt(Math.pow(m-y,2)+Math.pow(E-v,2)),w="",x=0,O=0;O<g;++O){p=_?g-O-1:O;var C=i.charAt(p),R=s*u(l,w=_?C+w:w+C,h)-x;x+=R;for(var P=o+R/2;e<r-n&&T+S<P;)y=m,v=E,m=t[e+=n],E=t[e+1],T+=S,S=Math.sqrt(Math.pow(m-y,2)+Math.pow(E-v,2));var b=P-T,I=Math.atan2(E-v,m-y);if(_&&(I+=I>0?-Math.PI:Math.PI),void 0!==f){var L=I-f;if(L+=L>Math.PI?-2*Math.PI:L<-Math.PI?2*Math.PI:0,Math.abs(L)>a)return null}var M=b/S,F=qt(y,m,M),A=qt(v,E,M);f==I?(_&&(c[0]=F,c[1]=A,c[2]=R/2),c[4]=w):(x=R,c=[F,A,R/2,I,w=C],_?d.unshift(c):d.push(c),f=I),o+=R}return d}var Np=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),Gp=[1/0,1/0,-1/0,-1/0],Dp=[1,0,0,1,0,0],kp=[],jp=[],Up=[],Yp=[],Xp=function(t){function e(e,r,n,i,o){var a=t.call(this)||this;return a.declutterTree=i,a.overlaps=n,a.pixelRatio=r,a.resolution=e,a.alignFill_,a.instructions=o.instructions,a.coordinates=o.coordinates,a.coordinateCache_={},a.renderedTransform_=[1,0,0,1,0,0],a.hitDetectionInstructions=o.hitDetectionInstructions,a.pixelCoordinates_=null,a.viewRotation_=0,a.fillStates=o.fillStates||{},a.strokeStates=o.strokeStates||{},a.textStates=o.textStates||{},a.widths_={},a}return Np(e,t),e.prototype.disposeInternal=function(){Ps.release(this),t.prototype.disposeInternal.call(this)},e.prototype.getTextImage=function(t,e,r,n){var i,o=n+e+t+r+this.pixelRatio;if(!Ps.containsKey(o)){var a=n?this.strokeStates[n]:null,s=r?this.fillStates[r]:null,u=this.textStates[e],l=this.pixelRatio,h=u.scale*l,c=bp[u.textAlign||"center"],p=n&&a.lineWidth?a.lineWidth:0,f=t.split("\n"),d=f.length,_=[],g=function(t,e,r){for(var n=e.length,i=0,o=0;o<n;++o){var a=Ds(t,e[o]);i=Math.max(i,a),r.push(a)}return i}(u.font,f,_),y=Gs(u.font),v=y*d,m=g+p,E=io(Math.ceil(m*h),Math.ceil((v+p)*h));i=E.canvas,Ps.set(o,i),1!=h&&E.scale(h,h),E.font=u.font,n&&(E.strokeStyle=a.strokeStyle,E.lineWidth=p,E.lineCap=a.lineCap,E.lineJoin=a.lineJoin,E.miterLimit=a.miterLimit,E.setLineDash&&a.lineDash.length&&(E.setLineDash(a.lineDash),E.lineDashOffset=a.lineDashOffset)),r&&(E.fillStyle=s.fillStyle),E.textBaseline="middle",E.textAlign="center";var T=.5-c,S=c*i.width/h+T*p,w=void 0;if(n)for(w=0;w<d;++w)E.strokeText(f[w],S+T*_[w],.5*(p+y)+w*y);if(r)for(w=0;w<d;++w)E.fillText(f[w],S+T*_[w],.5*(p+y)+w*y)}return Ps.get(o,this)},e.prototype.replayTextBackground_=function(t,e,r,n,i,o,a){t.beginPath(),t.moveTo.apply(t,e),t.lineTo.apply(t,r),t.lineTo.apply(t,n),t.lineTo.apply(t,i),t.lineTo.apply(t,e),o&&(this.alignFill_=o[2],this.fill_(t)),a&&(this.setStrokeStyle_(t,a),t.stroke())},e.prototype.replayImage_=function(t,e,r,n,i,o,a,s,u,l,h,c,p,f,d,_,g,y){var v=g||y;e-=i*=p,r-=o*=p;var m=d+l>n.width?n.width-l:d,E=s+h>n.height?n.height-h:s,T=_[3]+m*p+_[1],S=_[0]+E*p+_[2],w=e-_[3],x=r-_[0];(v||0!==c)&&(kp[0]=Yp[0]=w,kp[1]=jp[1]=x,jp[0]=Up[0]=w+T,Up[1]=Yp[1]=x+S);var O=null;if(0!==c){var C=e+i,R=r+o;O=qe(Dp,C,R,1,1,c,-C,-R),Ve(Dp,kp),Ve(Dp,jp),Ve(Dp,Up),Ve(Dp,Yp),dt(Math.min(kp[0],jp[0],Up[0],Yp[0]),Math.min(kp[1],jp[1],Up[1],Yp[1]),Math.max(kp[0],jp[0],Up[0],Yp[0]),Math.max(kp[1],jp[1],Up[1],Yp[1]),Gp)}else dt(w,x,w+T,x+S,Gp);var P=t.canvas,b=y?y[2]*p/2:0,I=Gp[0]-b<=P.width&&Gp[2]+b>=0&&Gp[1]-b<=P.height&&Gp[3]+b>=0;if(f&&(e=Math.round(e),r=Math.round(r)),a){if(!I&&1==a[4])return;mt(a,Gp);var L=I?[t,O?O.slice(0):null,u,n,l,h,m,E,e,r,p]:null;L&&v&&L.push(g,y,kp,jp,Up,Yp),a.push(L)}else I&&(v&&this.replayTextBackground_(t,kp,jp,Up,Yp,g,y),Ys(t,O,u,n,l,h,m,E,e,r,p))},e.prototype.fill_=function(t){if(this.alignFill_){var e=Ve(this.renderedTransform_,[0,0]),r=512*this.pixelRatio;t.save(),t.translate(e[0]%r,e[1]%r),t.rotate(this.viewRotation_)}t.fill(),this.alignFill_&&t.restore()},e.prototype.setStrokeStyle_=function(t,e){t.strokeStyle=e[1],t.lineWidth=e[2],t.lineCap=e[3],t.lineJoin=e[4],t.miterLimit=e[5],t.setLineDash&&(t.lineDashOffset=e[7],t.setLineDash(e[6]))},e.prototype.renderDeclutter_=function(t,e){if(t&&t.length>5){var r=t[4];if(1==r||r==t.length-5){var n={minX:t[0],minY:t[1],maxX:t[2],maxY:t[3],value:e};if(!this.declutterTree.collides(n)){this.declutterTree.insert(n);for(var i=5,o=t.length;i<o;++i){var a=t[i];a&&(a.length>11&&this.replayTextBackground_(a[0],a[13],a[14],a[15],a[16],a[11],a[12]),Ys.apply(void 0,a))}}t.length=5,_t(t)}}},e.prototype.drawTextImageWithPointPlacement_=function(t,e,r,n){var i=this.textStates[e],o=this.getTextImage(t,e,n,r),a=this.strokeStates[r],s=this.pixelRatio,u=bp[i.textAlign||"center"],l=bp[i.textBaseline||"middle"],h=a&&a.lineWidth?a.lineWidth:0;return{label:o,anchorX:u*o.width/s+2*(.5-u)*h,anchorY:l*o.height/s+2*(.5-l)*h}},e.prototype.execute_=function(t,e,r,n,i,a,s){var u,l,h;this.pixelCoordinates_&&et(e,this.renderedTransform_)?u=this.pixelCoordinates_:(this.pixelCoordinates_||(this.pixelCoordinates_=[]),u=Xt(this.coordinates,0,this.coordinates.length,2,e,this.pixelCoordinates_),l=this.renderedTransform_,h=e,l[0]=h[0],l[1]=h[1],l[2]=h[2],l[3]=h[3],l[4]=h[4],l[5]=h[5]);for(var c,p,f,d,g,y,v,m,E,T,S,w,x,O,C,R,P=!_(r),b=0,I=n.length,L=0,M=0,F=0,A=null,N=null,G=this.coordinateCache_,D=this.viewRotation_,k={context:t,pixelRatio:this.pixelRatio,resolution:this.resolution,rotation:D},j=this.instructions!=n||this.overlaps?0:200;b<I;){var U=n[b];switch(U[0]){case vp.BEGIN_GEOMETRY:O=U[1],P&&r[o(O)]||!O.getGeometry()?b=U[2]:void 0===s||Gt(s,O.getGeometry().getExtent())?++b:b=U[2]+1;break;case vp.BEGIN_PATH:M>j&&(this.fill_(t),M=0),F>j&&(t.stroke(),F=0),M||F||(t.beginPath(),d=g=NaN),++b;break;case vp.CIRCLE:var Y=u[L=U[1]],X=u[L+1],B=u[L+2]-Y,z=u[L+3]-X,V=Math.sqrt(B*B+z*z);t.moveTo(Y+V,X),t.arc(Y,X,V,0,2*Math.PI,!0),++b;break;case vp.CLOSE_PATH:t.closePath(),++b;break;case vp.CUSTOM:L=U[1],c=U[2];var W=U[3],Z=U[4],K=6==U.length?U[5]:void 0;k.geometry=W,k.feature=O,b in G||(G[b]=[]);var H=G[b];K?K(u,L,c,2,H):(H[0]=u[L],H[1]=u[L+1],H.length=2),Z(H,k),++b;break;case vp.DRAW_IMAGE:L=U[1],c=U[2],E=U[3],p=U[4],f=U[5],m=a?null:U[6];var q=U[7],J=U[8],Q=U[9],$=U[10],tt=U[11],rt=U[12],nt=U[13],it=U[14];if(!E&&U.length>=19){T=U[18],S=U[19],w=U[20],x=U[21];var ot=this.drawTextImageWithPointPlacement_(T,S,w,x);E=U[3]=ot.label;var at=U[22];p=U[4]=(ot.anchorX-at)*this.pixelRatio;var st=U[23];f=U[5]=(ot.anchorY-st)*this.pixelRatio,q=U[7]=E.height,it=U[14]=E.width}var ut=void 0;U.length>24&&(ut=U[24]);var lt=void 0,ht=void 0,ct=void 0;U.length>16?(lt=U[15],ht=U[16],ct=U[17]):(lt=Rs,ht=ct=!1),tt&&(rt+=D);for(var pt=0;L<c;L+=2)ut&&ut[pt++]<it/this.pixelRatio||this.replayImage_(t,u[L],u[L+1],E,p,f,m,q,J,Q,$,rt,nt,i,it,lt,ht?A:null,ct?N:null);this.renderDeclutter_(m,O),++b;break;case vp.DRAW_CHARS:var ft=U[1],dt=U[2],_t=U[3];m=a?null:U[4];var gt=U[5];x=U[6];var yt=U[7],vt=U[8],mt=U[9];w=U[10];var Et=U[11];T=U[12],S=U[13];var Tt=U[14],St=this.textStates[S],wt=St.font,xt=St.scale*vt,Ot=void 0;Ot=wt in this.widths_?this.widths_[wt]:this.widths_[wt]={};var Ct=Fp(u,ft,dt,2),Rt=xt*ks(wt,T,Ot);if(gt||Rt<=Ct){var Pt=this.textStates[S].textAlign,bt=Ap(u,ft,dt,2,T,(Ct-Rt)*bp[Pt],yt,xt,ks,wt,Ot);if(bt){var It=void 0,Lt=void 0,Mt=void 0,Ft=void 0,At=void 0;if(w)for(It=0,Lt=bt.length;It<Lt;++It)Mt=(At=bt[It])[4],Ft=this.getTextImage(Mt,S,"",w),p=At[2]+Et,f=_t*Ft.height+2*(.5-_t)*Et-mt,this.replayImage_(t,At[0],At[1],Ft,p,f,m,Ft.height,1,0,0,At[3],Tt,!1,Ft.width,Rs,null,null);if(x)for(It=0,Lt=bt.length;It<Lt;++It)Mt=(At=bt[It])[4],Ft=this.getTextImage(Mt,S,x,""),p=At[2],f=_t*Ft.height-mt,this.replayImage_(t,At[0],At[1],Ft,p,f,m,Ft.height,1,0,0,At[3],Tt,!1,Ft.width,Rs,null,null)}}this.renderDeclutter_(m,O),++b;break;case vp.END_GEOMETRY:if(void 0!==a){var Nt=a(O=U[1]);if(Nt)return Nt}++b;break;case vp.FILL:j?M++:this.fill_(t),++b;break;case vp.MOVE_TO_LINE_TO:for(L=U[1],c=U[2],C=u[L],v=(R=u[L+1])+.5|0,(y=C+.5|0)===d&&v===g||(t.moveTo(C,R),d=y,g=v),L+=2;L<c;L+=2)y=(C=u[L])+.5|0,v=(R=u[L+1])+.5|0,L!=c-2&&y===d&&v===g||(t.lineTo(C,R),d=y,g=v);++b;break;case vp.SET_FILL_STYLE:A=U,this.alignFill_=U[2],M&&(this.fill_(t),M=0,F&&(t.stroke(),F=0)),t.fillStyle=U[1],++b;break;case vp.SET_STROKE_STYLE:N=U,F&&(t.stroke(),F=0),this.setStrokeStyle_(t,U),++b;break;case vp.STROKE:j?F++:t.stroke(),++b;break;default:++b}}M&&this.fill_(t),F&&t.stroke()},e.prototype.execute=function(t,e,r,n,i){this.viewRotation_=r,this.execute_(t,e,n,this.instructions,i,void 0,void 0)},e.prototype.executeHitDetection=function(t,e,r,n,i,o){return this.viewRotation_=r,this.execute_(t,e,n,this.hitDetectionInstructions,!0,i,o)},e}(O),Bp=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),zp=[Mp.POLYGON,Mp.CIRCLE,Mp.LINE_STRING,Mp.IMAGE,Mp.TEXT,Mp.DEFAULT],Vp=function(t){function e(e,r,n,i,o,a,s){var u=t.call(this)||this;return u.declutterTree_=o,u.maxExtent_=e,u.overlaps_=i,u.pixelRatio_=n,u.resolution_=r,u.renderBuffer_=s,u.executorsByZIndex_={},u.hitDetectionContext_=io(1,1),u.hitDetectionTransform_=[1,0,0,1,0,0],u.createExecutors_(a),u}return Bp(e,t),e.prototype.clip=function(t,e){var r=this.getClipCoords(e);t.beginPath(),t.moveTo(r[0],r[1]),t.lineTo(r[2],r[3]),t.lineTo(r[4],r[5]),t.lineTo(r[6],r[7]),t.clip()},e.prototype.createExecutors_=function(t){for(var e in t){var r=this.executorsByZIndex_[e];void 0===r&&(this.executorsByZIndex_[e]=r={});var n=t[e];for(var i in n){var o=n[i];r[i]=new Xp(this.resolution_,this.pixelRatio_,this.overlaps_,this.declutterTree_,o)}}},e.prototype.disposeInternal=function(){for(var e in this.executorsByZIndex_){var r=this.executorsByZIndex_[e];for(var n in r)r[n].disposeInternal()}var i=this.hitDetectionContext_.canvas;i.width=i.height=0,t.prototype.disposeInternal.call(this)},e.prototype.hasExecutors=function(t){for(var e in this.executorsByZIndex_)for(var r=this.executorsByZIndex_[e],n=0,i=t.length;n<i;++n)if(t[n]in r)return!0;return!1},e.prototype.forEachFeatureAtCoordinate=function(t,e,r,n,i,o,a){var s,u=2*(n=Math.round(n))+1,l=qe(this.hitDetectionTransform_,n+.5,n+.5,1/e,-1/e,-r,-t[0],-t[1]),h=this.hitDetectionContext_;h.canvas.width!==u||h.canvas.height!==u?(h.canvas.width=u,h.canvas.height=u):h.clearRect(0,0,u,u),void 0!==this.renderBuffer_&&(Et(s=[1/0,1/0,-1/0,-1/0],t),at(s,e*(this.renderBuffer_+n),s));var c,p,f=function(t){if(void 0!==Wp[t])return Wp[t];for(var e=2*t+1,r=new Array(e),n=0;n<e;n++)r[n]=new Array(e);var i=t,o=0,a=0;for(;i>=o;)Zp(r,t+i,t+o),Zp(r,t+o,t+i),Zp(r,t-o,t+i),Zp(r,t-i,t+o),Zp(r,t-i,t-o),Zp(r,t-o,t-i),Zp(r,t+o,t-i),Zp(r,t+i,t-o),2*((a+=1+2*++o)-i)+1>0&&(a+=1-2*(i-=1));return Wp[t]=r,r}(n);function d(t){for(var e=h.getImageData(0,0,u,u).data,r=0;r<u;r++)for(var n=0;n<u;n++)if(f[r][n]&&e[4*(n*u+r)+3]>0){var i=void 0;return(!c||p!=Mp.IMAGE&&p!=Mp.TEXT||-1!==c.indexOf(t))&&(i=o(t)),i||void h.clearRect(0,0,u,u)}}this.declutterTree_&&(c=this.declutterTree_.all().map(function(t){return t.value}));var _,g,y,v,m,E=Object.keys(this.executorsByZIndex_).map(Number);for(E.sort(H),_=E.length-1;_>=0;--_){var T=E[_].toString();for(y=this.executorsByZIndex_[T],g=zp.length-1;g>=0;--g)if(void 0!==(v=y[p=zp[g]]))if(!a||p!=Mp.IMAGE&&p!=Mp.TEXT){if(m=v.executeHitDetection(h,l,r,i,d,s))return m}else{var S=a[T];S?S.push(v,l.slice(0)):a[T]=[v,l.slice(0)]}}},e.prototype.getClipCoords=function(t){var e=this.maxExtent_;if(!e)return null;var r=e[0],n=e[1],i=e[2],o=e[3],a=[r,n,r,o,i,o,i,n];return Xt(a,0,8,2,t,a),a},e.prototype.isEmpty=function(){return _(this.executorsByZIndex_)},e.prototype.execute=function(t,e,r,n,i,o,a){var s=Object.keys(this.executorsByZIndex_).map(Number);s.sort(H),this.maxExtent_&&(t.save(),this.clip(t,e));var u,l,h,c,p,f,d=o||zp;for(u=0,l=s.length;u<l;++u){var _=s[u].toString();for(p=this.executorsByZIndex_[_],h=0,c=d.length;h<c;++h){var g=d[h];if(void 0!==(f=p[g]))if(!a||g!=Mp.IMAGE&&g!=Mp.TEXT)f.execute(t,e,r,n,i);else{var y=a[_];y?y.push(f,e.slice(0)):a[_]=[f,e.slice(0)]}}}this.maxExtent_&&t.restore()},e}(O),Wp={0:[[!0]]};function Zp(t,e,r){var n,i=Math.floor(t.length/2);if(e>=i)for(n=i;n<e;n++)t[n][r]=!0;else if(e<i)for(n=e+1;n<i;n++)t[n][r]=!0}var Kp=Vp,Hp=.5,qp={Point:function(t,e,r,n){var i=r.getImage();if(i){if(i.getImageState()!=qu.LOADED)return;var o=t.getBuilder(r.getZIndex(),Mp.IMAGE);o.setImageStyle(i,t.addDeclutter(!1)),o.drawPoint(e,n)}var a=r.getText();if(a){var s=t.getBuilder(r.getZIndex(),Mp.TEXT);s.setTextStyle(a,t.addDeclutter(!!i)),s.drawText(e,n)}},LineString:function(t,e,r,n){var i=r.getStroke();if(i){var o=t.getBuilder(r.getZIndex(),Mp.LINE_STRING);o.setFillStrokeStyle(null,i),o.drawLineString(e,n)}var a=r.getText();if(a){var s=t.getBuilder(r.getZIndex(),Mp.TEXT);s.setTextStyle(a,t.addDeclutter(!1)),s.drawText(e,n)}},Polygon:function(t,e,r,n){var i=r.getFill(),o=r.getStroke();if(i||o){var a=t.getBuilder(r.getZIndex(),Mp.POLYGON);a.setFillStrokeStyle(i,o),a.drawPolygon(e,n)}var s=r.getText();if(s){var u=t.getBuilder(r.getZIndex(),Mp.TEXT);u.setTextStyle(s,t.addDeclutter(!1)),u.drawText(e,n)}},MultiPoint:function(t,e,r,n){var i=r.getImage();if(i){if(i.getImageState()!=qu.LOADED)return;var o=t.getBuilder(r.getZIndex(),Mp.IMAGE);o.setImageStyle(i,t.addDeclutter(!1)),o.drawMultiPoint(e,n)}var a=r.getText();if(a){var s=t.getBuilder(r.getZIndex(),Mp.TEXT);s.setTextStyle(a,t.addDeclutter(!!i)),s.drawText(e,n)}},MultiLineString:function(t,e,r,n){var i=r.getStroke();if(i){var o=t.getBuilder(r.getZIndex(),Mp.LINE_STRING);o.setFillStrokeStyle(null,i),o.drawMultiLineString(e,n)}var a=r.getText();if(a){var s=t.getBuilder(r.getZIndex(),Mp.TEXT);s.setTextStyle(a,t.addDeclutter(!1)),s.drawText(e,n)}},MultiPolygon:function(t,e,r,n){var i=r.getFill(),o=r.getStroke();if(o||i){var a=t.getBuilder(r.getZIndex(),Mp.POLYGON);a.setFillStrokeStyle(i,o),a.drawMultiPolygon(e,n)}var s=r.getText();if(s){var u=t.getBuilder(r.getZIndex(),Mp.TEXT);u.setTextStyle(s,t.addDeclutter(!1)),u.drawText(e,n)}},GeometryCollection:function(t,e,r,n){var i,o,a=e.getGeometriesArray();for(i=0,o=a.length;i<o;++i){var s=qp[a[i].getType()];s(t,a[i],r,n)}},Circle:function(t,e,r,n){var i=r.getFill(),o=r.getStroke();if(i||o){var a=t.getBuilder(r.getZIndex(),Mp.CIRCLE);a.setFillStrokeStyle(i,o),a.drawCircle(e,n)}var s=r.getText();if(s){var u=t.getBuilder(r.getZIndex(),Mp.TEXT);u.setTextStyle(s,t.addDeclutter(!1)),u.drawText(e,n)}}};function Jp(t,e){return parseInt(o(t),10)-parseInt(o(e),10)}function Qp(t,e){var r=$p(t,e);return r*r}function $p(t,e){return Hp*t/e}function tf(t,e,r,n,i,o){var a=!1,s=r.getImage();if(s){var u=s.getImageState();u==qu.LOADED||u==qu.ERROR?s.unlistenImageChange(i,o):(u==qu.IDLE&&s.load(),u=s.getImageState(),s.listenImageChange(i,o),a=!0)}return function(t,e,r,n){var i=r.getGeometryFunction()(e);if(!i)return;var o=i.getSimplifiedGeometry(n);if(r.getRenderer())!function t(e,r,n,i){if(r.getType()==Yt.GEOMETRY_COLLECTION){for(var o=r.getGeometries(),a=0,s=o.length;a<s;++a)t(e,o[a],n,i);return}var u=e.getBuilder(n.getZIndex(),Mp.DEFAULT);u.drawCustom(r,i,n.getRenderer())}(t,o,r,e);else{var a=qp[o.getType()];a(t,o,r,e)}}(t,e,r,n),a}var ef=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),rf=function(t){function e(e){var r=t.call(this,e)||this;return r.declutterTree_=e.getDeclutter()?lh()(9,void 0):null,r.dirty_=!1,r.renderedRevision_=-1,r.renderedResolution_=NaN,r.renderedExtent_=[1/0,1/0,-1/0,-1/0],r.renderedRenderOrder_=null,r.replayGroup_=null,r.replayGroupChanged=!0,E(Ps,F.CLEAR,r.handleFontsChanged_,r),r}return ef(e,t),e.prototype.disposeInternal=function(){S(Ps,F.CLEAR,this.handleFontsChanged_,this),t.prototype.disposeInternal.call(this)},e.prototype.renderFrame=function(t,e){var r=this.context,n=r.canvas,i=this.replayGroup_;if(!i||i.isEmpty())return n.width>0&&(n.width=0),n;var o=t.pixelRatio;Ke(this.pixelTransform_,1/o,1/o),Je(this.inversePixelTransform_,this.pixelTransform_);var a=Math.round(t.size[0]*o),s=Math.round(t.size[1]*o);if(n.width!=a||n.height!=s){n.width=a,n.height=s;var u=Qe(this.pixelTransform_);n.style.transform!==u&&(n.style.transform=u)}else r.clearRect(0,0,a,s);this.preRender(r,t);var l=t.extent,h=t.viewState,c=h.projection,p=h.rotation,f=c.getExtent(),d=this.getLayer().getSource(),_=e.extent,g=void 0!==_;g&&this.clip(r,t,_),this.declutterTree_&&this.declutterTree_.clear();var y=t.viewHints,v=!(y[Li]||y[Mi]),m=this.getRenderTransform(t,a,s,0),E=e.managed?t.skippedFeatureUids:{};if(i.execute(r,m,p,E,v),d.getWrapX()&&c.canWrapX()&&!ht(f,l)){for(var T=l[0],S=Nt(f),w=0,x=void 0;T<f[0];){x=S*--w;var O=this.getRenderTransform(t,a,s,x);i.execute(r,O,p,E,v),T+=S}for(w=0,T=l[2];T>f[2];){x=S*++w;var C=this.getRenderTransform(t,a,s,x);i.execute(r,C,p,E,v),T-=S}}g&&r.restore(),this.postRender(r,t);var R=e.opacity;return R!==parseFloat(n.style.opacity)&&(n.style.opacity=R),n},e.prototype.forEachFeatureAtCoordinate=function(t,e,r,n,i){if(this.replayGroup_){var a=e.viewState.resolution,s=e.viewState.rotation,u=this.getLayer(),l={};return this.replayGroup_.forEachFeatureAtCoordinate(t,a,s,r,{},function(t){var e=o(t);if(!(e in l))return l[e]=!0,n.call(i,t,u)},null)}},e.prototype.handleFontsChanged_=function(t){var e=this.getLayer();e.getVisible()&&this.replayGroup_&&e.changed()},e.prototype.handleStyleImageChange_=function(t){this.renderIfReadyAndVisible()},e.prototype.prepareFrame=function(t,e){var r=this.getLayer(),n=r.getSource(),i=t.viewHints[Li],o=t.viewHints[Mi],a=r.getUpdateWhileAnimating(),s=r.getUpdateWhileInteracting();if(!this.dirty_&&!a&&i||!s&&o)return!0;var u=t.extent,l=t.viewState,h=l.projection,c=l.resolution,p=t.pixelRatio,f=r.getRevision(),d=r.getRenderBuffer(),_=r.getRenderOrder();void 0===_&&(_=Jp);var g=at(u,d*c),y=l.projection.getExtent();if(n.getWrapX()&&l.projection.canWrapX()&&!ht(y,t.extent)){var v=Nt(y),m=Math.max(Nt(g)/2,v);g[0]=y[0]-m,g[2]=y[2]+m}if(!this.dirty_&&this.renderedResolution_==c&&this.renderedRevision_==f&&this.renderedRenderOrder_==_&&ht(this.renderedExtent_,g))return this.replayGroupChanged=!1,!0;this.replayGroup_&&this.replayGroup_.dispose(),this.replayGroup_=null,this.dirty_=!1;var E=new Lp($p(c,p),g,c,p,!!this.declutterTree_);n.loadFeatures(g,c,h);var T=function(t){var e,n=t.getStyleFunction()||r.getStyleFunction();if(n&&(e=n(t,c)),e){var i=this.renderFeature(t,c,p,e,E);this.dirty_=this.dirty_||i}}.bind(this);if(_){var S=[];n.forEachFeatureInExtent(g,function(t){S.push(t)}),S.sort(_);for(var w=0,x=S.length;w<x;++w)T(S[w])}else n.forEachFeatureInExtent(g,T);var O=E.finish(),C=new Kp(g,c,p,n.getOverlaps(),this.declutterTree_,O,r.getRenderBuffer());return this.renderedResolution_=c,this.renderedRevision_=f,this.renderedRenderOrder_=_,this.renderedExtent_=g,this.replayGroup_=C,this.replayGroupChanged=!0,!0},e.prototype.renderFeature=function(t,e,r,n,i){if(!n)return!1;var o=!1;if(Array.isArray(n))for(var a=0,s=n.length;a<s;++a)o=tf(i,t,n[a],Qp(e,r),this.handleStyleImageChange_,this)||o;else o=tf(i,t,n,Qp(e,r),this.handleStyleImageChange_,this);return o},e}(nc),nf={IMAGE:"image",HYBRID:"hybrid"},of=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),af={image:[Mp.POLYGON,Mp.CIRCLE,Mp.LINE_STRING,Mp.IMAGE,Mp.TEXT],hybrid:[Mp.POLYGON,Mp.LINE_STRING]},sf={image:[Mp.DEFAULT],hybrid:[Mp.IMAGE,Mp.TEXT,Mp.DEFAULT]},uf=function(t){function e(e){var r=t.call(this,e)||this,n=r.context.canvas;r.overlayContext_=io();var i=r.overlayContext_.canvas;i.style.position="absolute",i.style.transformOrigin="top left";var o=document.createElement("div"),a=o.style;return a.position="absolute",a.width="100%",a.height="100%",o.appendChild(n),o.appendChild(i),r.container_=o,r.overlayPixelTransform_=[1,0,0,1,0,0],r.inverseOverlayPixelTransform_=[1,0,0,1,0,0],r.declutterTree_=e.getDeclutter()?lh()(9,void 0):null,r.dirty_=!1,r.renderedLayerRevision_,r.renderTileImageQueue_={},r.tileListenerKeys_={},r.tmpTransform_=[1,0,0,1,0,0],r.zDirection=0,E(Ps,F.CLEAR,r.handleFontsChanged_,r),r}return of(e,t),e.prototype.disposeInternal=function(){S(Ps,F.CLEAR,this.handleFontsChanged_,this),this.overlayContext_.canvas.width=this.overlayContext_.canvas.height=0,t.prototype.disposeInternal.call(this)},e.prototype.prepareTile=function(t,e,r){var n=o(t),i=t.getState();(i===mi.LOADED&&t.hifi||i===mi.ERROR||i===mi.ABORT)&&n in this.tileListenerKeys_&&(w(this.tileListenerKeys_[n]),delete this.tileListenerKeys_[n]),i!==mi.LOADED&&i!==mi.ERROR||(this.updateExecutorGroup_(t,e,r),this.tileImageNeedsRender_(t,e,r)&&(this.renderTileImageQueue_[n]=t))},e.prototype.getTile=function(e,r,n,i){var a=t.prototype.getTile.call(this,e,r,n,i),s=i.pixelRatio,u=i.viewState,l=u.resolution,h=u.projection;if(a.getState()<mi.LOADED){a.wantedResolution=l;var c=o(a);if(!(c in this.tileListenerKeys_)){var p=E(a,F.CHANGE,this.prepareTile.bind(this,a,s,h));this.tileListenerKeys_[c]=p}}else{var f=i.viewHints;!!(f[Li]||f[Mi])&&a.wantedResolution||(a.wantedResolution=l),this.prepareTile(a,s,h)}return a},e.prototype.isDrawableTile=function(e){return t.prototype.isDrawableTile.call(this,e)&&e.hasContext(this.getLayer())},e.prototype.getTileImage=function(t){return t.getImage(this.getLayer())},e.prototype.prepareFrame=function(e,r){var n=this.getLayer().getRevision();return this.renderedLayerRevision_!=n&&(this.renderedTiles.length=0),this.renderedLayerRevision_=n,t.prototype.prepareFrame.call(this,e,r)},e.prototype.updateExecutorGroup_=function(t,e,r){var n=this.getLayer(),i=n.getRevision(),a=n.getRenderOrder()||null,s=t.wantedResolution,u=t.getReplayState(n);if(u.dirty||u.renderedResolution!==s||u.renderedRevision!=i||u.renderedRenderOrder!=a||u.renderedZ!==t.sourceZ){var l=n.getSource(),h=l.getTileGrid(),c=l.getTileGridForProjection(r).getTileCoordExtent(t.wrappedTileCoord),p=l.getSourceTiles(e,r,t),f=o(n),d=t.executorGroups[f];if(d)for(var _=0,g=d.length;_<g;++_)d[_].dispose();t.executorGroups[f]=[];for(var y=function(r,i){var o=p[r];if(o.getState()!=mi.LOADED)return"continue";var d=o.tileCoord,_=h.getTileCoordExtent(d),g=Mt(c,_),y=vt(_,g)?null:at(g,n.getRenderBuffer()*s,v.tmpExtent);u.dirty=!1;var m=new Lp(0,g,s,e,!!v.declutterTree_),E=Qp(s,e),T=function(t){var e,r=t.getStyleFunction()||n.getStyleFunction();if(r&&(e=r(t,s)),e){var i=this.renderFeature(t,E,e,m);this.dirty_=this.dirty_||i,u.dirty=u.dirty||i}},S=o.getFeatures();a&&a!==u.renderedRenderOrder&&S.sort(a);for(var w=0,x=S.length;w<x;++w){var O=S[w];y&&!Gt(y,O.getGeometry().getExtent())||T.call(v,O)}var C=m.finish(),R=n.getDeclutter()&&1===p.length?null:g,P=new Kp(R,s,e,l.getOverlaps(),v.declutterTree_,C,n.getRenderBuffer());t.executorGroups[f].push(P)},v=this,m=0,E=p.length;m<E;++m)y(m);u.renderedRevision=i,u.renderedZ=t.sourceZ,u.renderedRenderOrder=a,u.renderedResolution=s}},e.prototype.forEachFeatureAtCoordinate=function(t,e,r,n,i){var a=e.viewState.resolution,s=e.viewState.rotation;r=null==r?0:r;var u,l,h,c=this.getLayer(),p=c.getSource().getTileGridForProjection(e.viewState.projection),f={},d=this.renderedTiles;for(l=0,h=d.length;l<h;++l){var _=d[l];if(!this.declutterTree_)if(!lt(p.getTileCoordExtent(_.wrappedTileCoord),t))continue;for(var g=_.executorGroups[o(c)],y=0,v=g.length;y<v;++y){var m=g[y];u=u||m.forEachFeatureAtCoordinate(t,a,s,r,{},function(t){var e=t.getId();if(void 0===e&&(e=o(t)),!(e in f))return f[e]=!0,n.call(i,t,c)},null)}}return u},e.prototype.getReplayTransform_=function(t,e){var r=this.getLayer().getSource().getTileGrid(),n=t.tileCoord,i=r.getResolution(n[0]),o=e.viewState,a=e.pixelRatio,s=o.resolution/a,u=r.getTileCoordExtent(n,this.tmpExtent),l=o.center,h=Ft(u),c=e.size,p=Math.round(a*c[0]/2),f=Math.round(a*c[1]/2);return qe(this.tmpTransform_,p,f,i/s,i/s,o.rotation,(h[0]-l[0])/i,(l[1]-h[1])/i)},e.prototype.handleFontsChanged_=function(t){var e=this.getLayer();e.getVisible()&&void 0!==this.renderedLayerRevision_&&e.changed()},e.prototype.handleStyleImageChange_=function(t){this.renderIfReadyAndVisible()},e.prototype.renderFrame=function(e,r){t.prototype.renderFrame.call(this,e,r);var n=this.getLayer(),i=e.viewHints,a=!(i[Li]||i[Mi]),s=n.getRenderMode();if(s===nf.IMAGE)return this.renderTileImages_(a,e),this.container_;if(!_(this.renderTileImageQueue_)&&!this.extentChanged)return this.renderTileImages_(a,e),this.container_;var u=this.overlayContext_,l=n.getDeclutter()?{}:null,h=n.getSource(),c=sf[s],p=e.pixelRatio,f=e.viewState.rotation,d=e.size;Ke(this.overlayPixelTransform_,1/p,1/p),Je(this.inverseOverlayPixelTransform_,this.overlayPixelTransform_);var g=u.canvas,y=Math.round(d[0]*p),v=Math.round(d[1]*p);if(g.width!=y||g.height!=v){g.width=y,g.height=v;var m=Qe(this.overlayPixelTransform_);g.style.transform!==m&&(g.style.transform=m)}else u.clearRect(0,0,y,v);l&&this.declutterTree_.clear();for(var E=this.renderedTiles,T=h.getTileGridForProjection(e.viewState.projection),S=[],w=E.length-1;w>=0;--w){var x=E[w];if(x.getState()!=mi.ABORT)for(var O=x.tileCoord,C=T.getTileCoordExtent(x.wrappedTileCoord),R=T.getTileCoordExtent(O,this.tmpExtent)[0]-C[0],P=this.getRenderTransform(e,y,v,R),b=x.executorGroups[o(n)],I=0,L=b.length;I<L;++I){var M=b[I];if(M.hasExecutors(c)){var F=x.tileCoord[0],A=void 0,N=void 0;if(!l){A=[],N=M.getClipCoords(P),u.save();for(var G=0,D=S.length;G<D;++G){var k=S[G];F<A[G]&&(u.beginPath(),u.moveTo(N[0],N[1]),u.lineTo(N[2],N[3]),u.lineTo(N[4],N[5]),u.lineTo(N[6],N[7]),u.moveTo(k[6],k[7]),u.lineTo(k[4],k[5]),u.lineTo(k[2],k[3]),u.lineTo(k[0],k[1]),u.clip())}}M.execute(u,P,f,{},a,c,l),l||(u.restore(),S.push(N),A.push(F))}}}l&&function(t,e,r,n){for(var i=Object.keys(t).map(Number).sort(H),o={},a=0,s=i.length;a<s;++a)for(var u=t[i[a].toString()],l=0,h=u.length;l<h;){var c=u[l++],p=u[l++];c.execute(e,p,r,o,n)}}(l,u,f,a);var j=r.opacity;return j!==parseFloat(g.style.opacity)&&(g.style.opacity=j),this.renderTileImages_(a,e),this.container_},e.prototype.renderTileImages_=function(t,e){for(var r in this.renderTileImageQueue_){if(!t&&Date.now()-e.time>8)break;var n=this.renderTileImageQueue_[r];e.animate=!0,delete this.renderTileImageQueue_[r];var i=this.getLayer();this.declutterTree_&&i.getRenderMode()===nf.IMAGE&&this.declutterTree_.clear();var o=e.viewState,a=i.getSource().getTileGridForProjection(o.projection).getResolution(n.tileCoord[0]),s=e.pixelRatio/n.wantedResolution*a;this.renderTileImage_(n,e.pixelRatio,s,o.projection)}f(this.renderTileImageQueue_)},e.prototype.renderFeature=function(t,e,r,n){if(!r)return!1;var i=!1;if(Array.isArray(r))for(var o=0,a=r.length;o<a;++o)i=tf(n,t,r[o],e,this.handleStyleImageChange_,this)||i;else i=tf(n,t,r,e,this.handleStyleImageChange_,this);return i},e.prototype.tileImageNeedsRender_=function(t,e,r){var n=this.getLayer(),i=t.getReplayState(n),o=n.getRevision(),a=t.sourceZ,s=t.wantedResolution;return i.renderedTileResolution!==s||i.renderedTileRevision!==o||i.renderedTileZ!==a},e.prototype.renderTileImage_=function(t,e,r,n){var i=this.getLayer(),a=t.getReplayState(i),s=i.getRevision(),u=t.executorGroups[o(i)];a.renderedTileRevision=s,a.renderedTileZ=t.sourceZ;var l=t.wrappedTileCoord,h=l[0],c=i.getSource(),p=c.getTileGridForProjection(n),f=p.getResolution(h),d=t.getContext(i),_=c.getTilePixelSize(h,e,n);d.canvas.width=_[0],d.canvas.height=_[1];var g=Xe(this.tmpTransform_),y=e/r;Ze(g,y,y),d.setTransform.apply(d,g);for(var v=p.getTileCoordExtent(l,this.tmpExtent),m=0,E=u.length;m<E;++m){var T=u[m],S=r/f,w=Xe(this.tmpTransform_);Ze(w,S,-S),He(w,-v[0],-v[3]),T.execute(d,w,0,{},!0,af[i.getRenderMode()])}a.renderedTileResolution=t.wantedResolution},e.prototype.getDataAtPixel=function(e,r,n){var i=t.prototype.getDataAtPixel.call(this,e,r,n);if(i)return i;var o=Ve(this.inverseOverlayPixelTransform_,e.slice()),a=this.overlayContext_;try{i=a.getImageData(Math.round(o[0]),Math.round(o[1]),1,1).data}catch(t){return"SecurityError"===t.name?new Uint8Array:i}return 0===i[3]?null:i},e}(dc);var lf=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),hf="renderOrder",cf=function(t){function e(e){var r=this,n=e||{},i=p({},n);return delete i.style,delete i.renderBuffer,delete i.updateWhileAnimating,delete i.updateWhileInteracting,(r=t.call(this,i)||this).declutter_=void 0!==n.declutter&&n.declutter,r.renderBuffer_=void 0!==n.renderBuffer?n.renderBuffer:100,r.style_=null,r.styleFunction_=void 0,r.setStyle(n.style),r.updateWhileAnimating_=void 0!==n.updateWhileAnimating&&n.updateWhileAnimating,r.updateWhileInteracting_=void 0!==n.updateWhileInteracting&&n.updateWhileInteracting,r}return lf(e,t),e.prototype.getDeclutter=function(){return this.declutter_},e.prototype.getRenderBuffer=function(){return this.renderBuffer_},e.prototype.getRenderOrder=function(){return this.get(hf)},e.prototype.getStyle=function(){return this.style_},e.prototype.getStyleFunction=function(){return this.styleFunction_},e.prototype.getUpdateWhileAnimating=function(){return this.updateWhileAnimating_},e.prototype.getUpdateWhileInteracting=function(){return this.updateWhileInteracting_},e.prototype.setRenderOrder=function(t){this.set(hf,t)},e.prototype.setStyle=function(t){this.style_=void 0!==t?t:pl,this.styleFunction_=null===t?void 0:function(t){var e;if("function"==typeof t)e=t;else{var r;Array.isArray(t)?r=t:(W("function"==typeof t.getZIndex,41),r=[t]),e=function(){return r}}return e}(this.style_),this.changed()},e}(Go),pf=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),ff=function(t){function e(e){return t.call(this,e)||this}return pf(e,t),e.prototype.createRenderer=function(){return new rf(this)},e}(cf);function df(t,e,r,n,i,o){var a=NaN,s=NaN,u=(r-e)/n;if(1===u)a=t[e],s=t[e+1];else if(2==u)a=(1-i)*t[e]+i*t[e+n],s=(1-i)*t[e+1]+i*t[e+n+1];else if(0!==u){for(var l=t[e],h=t[e+1],c=0,p=[0],f=e+n;f<r;f+=n){var d=t[f],_=t[f+1];c+=Math.sqrt((d-l)*(d-l)+(_-h)*(_-h)),p.push(c),l=d,h=_}var g=i*c,y=function(t,e,r){for(var n,i,o=r||H,a=0,s=t.length,u=!1;a<s;)(i=+o(t[n=a+(s-a>>1)],e))<0?a=n+1:(s=n,u=!i);return u?a:~a}(p,g);if(y<0){var v=(g-p[-y-2])/(p[-y-1]-p[-y-2]),m=e+(-y-2)*n;a=qt(t[m],t[m+n],v),s=qt(t[m+1],t[m+n+1],v)}else a=t[e+y*n],s=t[e+y*n+1]}return o?(o[0]=a,o[1]=s,o):[a,s]}function _f(t,e,r,n,i,o){if(r==e)return null;var a;if(i<t[e+n-1])return o?((a=t.slice(e,e+n))[n-1]=i,a):null;if(t[r-1]<i)return o?((a=t.slice(r-n,r))[n-1]=i,a):null;if(i==t[e+n-1])return t.slice(e,e+n);for(var s=e/n,u=r/n;s<u;){var l=s+u>>1;i<t[(l+1)*n-1]?u=l:s=l+1}var h=t[s*n-1];if(i==h)return t.slice((s-1)*n,(s-1)*n+n);var c=(i-h)/(t[(s+1)*n-1]-h);a=[];for(var p=0;p<n-1;++p)a.push(qt(t[(s-1)*n+p],t[s*n+p],c));return a.push(i),a}var gf=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),yf=function(t){function e(e,r){var n=t.call(this)||this;return n.flatMidpoint_=null,n.flatMidpointRevision_=-1,n.maxDelta_=-1,n.maxDeltaRevision_=-1,void 0===r||Array.isArray(e[0])?n.setCoordinates(e,r):n.setFlatCoordinates(r,e),n}return gf(e,t),e.prototype.appendCoordinate=function(t){this.flatCoordinates?$(this.flatCoordinates,t):this.flatCoordinates=t.slice(),this.changed()},e.prototype.clone=function(){return new e(this.flatCoordinates.slice(),this.layout)},e.prototype.closestPointXY=function(t,e,r,n){return n<ut(this.getExtent(),t,e)?n:(this.maxDeltaRevision_!=this.getRevision()&&(this.maxDelta_=Math.sqrt(ur(this.flatCoordinates,0,this.flatCoordinates.length,this.stride,0)),this.maxDeltaRevision_=this.getRevision()),hr(this.flatCoordinates,0,this.flatCoordinates.length,this.stride,this.maxDelta_,!1,t,e,r,n))},e.prototype.forEachSegment=function(t){return Mr(this.flatCoordinates,0,this.flatCoordinates.length,this.stride,t)},e.prototype.getCoordinateAtM=function(t,e){if(this.layout!=Ut.XYM&&this.layout!=Ut.XYZM)return null;var r=void 0!==e&&e;return _f(this.flatCoordinates,0,this.flatCoordinates.length,this.stride,t,r)},e.prototype.getCoordinates=function(){return _r(this.flatCoordinates,0,this.flatCoordinates.length,this.stride)},e.prototype.getCoordinateAt=function(t,e){return df(this.flatCoordinates,0,this.flatCoordinates.length,this.stride,t,e)},e.prototype.getLength=function(){return Fp(this.flatCoordinates,0,this.flatCoordinates.length,this.stride)},e.prototype.getFlatMidpoint=function(){return this.flatMidpointRevision_!=this.getRevision()&&(this.flatMidpoint_=this.getCoordinateAt(.5,this.flatMidpoint_),this.flatMidpointRevision_=this.getRevision()),this.flatMidpoint_},e.prototype.getSimplifiedGeometryInternal=function(t){var r=[];return r.length=vr(this.flatCoordinates,0,this.flatCoordinates.length,this.stride,t,r,0),new e(r,Ut.XY)},e.prototype.getType=function(){return Yt.LINE_STRING},e.prototype.intersectsExtent=function(t){return Fr(this.flatCoordinates,0,this.flatCoordinates.length,this.stride,t)},e.prototype.setCoordinates=function(t,e){this.setLayout(e,t,1),this.flatCoordinates||(this.flatCoordinates=[]),this.flatCoordinates.length=fr(this.flatCoordinates,0,t,this.stride),this.changed()},e}(ir);function vf(t,e,r){for(var n,i,o,a,s,u,l=[],h=t(0),c=t(1),p=e(h),f=e(c),d=[c,h],_=[f,p],g=[1,0],y={},v=1e5;--v>0&&g.length>0;)o=g.pop(),h=d.pop(),p=_.pop(),(u=o.toString())in y||(l.push(p[0],p[1]),y[u]=!0),a=g.pop(),c=d.pop(),f=_.pop(),Vt((i=e(n=t(s=(o+a)/2)))[0],i[1],p[0],p[1],f[0],f[1])<r?(l.push(f[0],f[1]),y[u=a.toString()]=!0):(g.push(a,s,s,o),_.push(f,i,i,p),d.push(c,n,n,h));return l}var mf=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),Ef=new ll({color:"rgba(0,0,0,0.2)"}),Tf=[90,45,30,20,10,5,2,1,.5,.2,.1,.05,.01,.005,.002,.001],Sf=function(t){function e(e){var r=this,n=e||{},i=p({updateWhileAnimating:!0,updateWhileInteracting:!0,renderBuffer:0},n);return delete i.maxLines,delete i.strokeStyle,delete i.targetSize,delete i.showLabels,delete i.lonLabelFormatter,delete i.latLabelFormatter,delete i.lonLabelPosition,delete i.latLabelPosition,delete i.lonLabelStyle,delete i.latLabelStyle,delete i.intervals,(r=t.call(this,i)||this).projection_=null,r.maxLat_=1/0,r.maxLon_=1/0,r.minLat_=-1/0,r.minLon_=-1/0,r.maxLatP_=1/0,r.maxLonP_=1/0,r.minLatP_=-1/0,r.minLonP_=-1/0,r.targetSize_=void 0!==n.targetSize?n.targetSize:100,r.maxLines_=void 0!==n.maxLines?n.maxLines:100,r.meridians_=[],r.parallels_=[],r.strokeStyle_=void 0!==n.strokeStyle?n.strokeStyle:Ef,r.fromLonLatTransform_=void 0,r.toLonLatTransform_=void 0,r.projectionCenterLonLat_=null,r.meridiansLabels_=null,r.parallelsLabels_=null,n.showLabels&&(r.lonLabelFormatter_=null==n.lonLabelFormatter?Ui.bind(r,"EW"):n.lonLabelFormatter,r.latLabelFormatter_=null==n.latLabelFormatter?Ui.bind(r,"NS"):n.latLabelFormatter,r.lonLabelPosition_=null==n.lonLabelPosition?0:n.lonLabelPosition,r.latLabelPosition_=null==n.latLabelPosition?1:n.latLabelPosition,r.lonLabelStyleCache_={},r.lonLabelStyle_=function(t){var e=t.get("graticule_label");return this.lonLabelStyleCache_[e]||(this.lonLabelStyleCache_[e]=new _l({text:void 0!==n.lonLabelStyle?n.lonLabelStyle:new vl({text:e,font:"12px Calibri,sans-serif",textBaseline:"bottom",fill:new rl({color:"rgba(0,0,0,1)"}),stroke:new ll({color:"rgba(255,255,255,1)",width:3})})})),this.lonLabelStyleCache_[e]}.bind(r),r.latLabelStyleCache_={},r.latLabelStyle_=function(t){var e=t.get("graticule_label");return this.latLabelStyleCache_[e]||(this.latLabelStyleCache_[e]=new _l({text:void 0!==n.latLabelStyle?n.latLabelStyle:new vl({text:e,font:"12px Calibri,sans-serif",textAlign:"right",fill:new rl({color:"rgba(0,0,0,1)"}),stroke:new ll({color:"rgba(255,255,255,1)",width:3})})})),this.latLabelStyleCache_[e]}.bind(r),r.meridiansLabels_=[],r.parallelsLabels_=[]),r.intervals_=void 0!==n.intervals?n.intervals:Tf,r.setSource(new fh({loader:r.loaderFunction.bind(r),strategy:Es,features:new V,overlaps:!1,useSpatialIndex:!1,wrapX:n.wrapX})),r.featurePool_=[],r.lineStyle_=new _l({stroke:r.strokeStyle_}),r.renderedExtent_=null,r.setRenderOrder(null),r.tmpExtent_=null,r}return mf(e,t),e.prototype.loaderFunction=function(t,e,r){var n=this.getSource(),i=Mt(this.getExtent()||[-1/0,-1/0,1/0,1/0],t,this.tmpExtent_);if(setTimeout(function(){n.removeLoadedExtent(t)},0),!(this.renderedExtent_&&vt(this.renderedExtent_,i)||(this.renderedExtent_=i,Dt(i)))){var o=Pt(i),a=e*e/4;(!this.projection_||!Ge(this.projection_,r))&&this.updateProjectionInfo_(r),this.createGraticule_(i,o,e,a);var s,u=this.meridians_.length+this.parallels_.length;for(this.meridiansLabels_&&(u+=this.meridiansLabels_.length),this.parallelsLabels_&&(u+=this.parallelsLabels_.length);u>this.featurePool_.length;)s=new K,this.featurePool_.push(s);var l=n.getFeaturesCollection();l.clear();var h,c,p,f=0;for(h=0,c=this.meridians_.length;h<c;++h)(s=this.featurePool_[f++]).setGeometry(this.meridians_[h]),s.setStyle(this.lineStyle_),l.push(s);for(h=0,c=this.parallels_.length;h<c;++h)(s=this.featurePool_[f++]).setGeometry(this.parallels_[h]),s.setStyle(this.lineStyle_),l.push(s);if(this.meridiansLabels_)for(h=0,c=this.meridiansLabels_.length;h<c;++h)p=this.meridiansLabels_[h],(s=this.featurePool_[f++]).setGeometry(p.geom),s.setStyle(this.lonLabelStyle_),s.set("graticule_label",p.text),l.push(s);if(this.parallelsLabels_)for(h=0,c=this.parallelsLabels_.length;h<c;++h)p=this.parallelsLabels_[h],(s=this.featurePool_[f++]).setGeometry(p.geom),s.setStyle(this.latLabelStyle_),s.set("graticule_label",p.text),l.push(s)}},e.prototype.addMeridian_=function(t,e,r,n,i,o){var a=this.getMeridian_(t,e,r,n,o);if(Gt(a.getExtent(),i)){if(this.meridiansLabels_){var s=this.getMeridianPoint_(a,i,o);this.meridiansLabels_[o]={geom:s,text:this.lonLabelFormatter_(t)}}this.meridians_[o++]=a}return o},e.prototype.addParallel_=function(t,e,r,n,i,o){var a=this.getParallel_(t,e,r,n,o);if(Gt(a.getExtent(),i)){if(this.parallelsLabels_){var s=this.getParallelPoint_(a,i,o);this.parallelsLabels_[o]={geom:s,text:this.latLabelFormatter_(t)}}this.parallels_[o++]=a}return o},e.prototype.createGraticule_=function(t,e,r,n){var i=this.getInterval_(r);if(-1==i)return this.meridians_.length=this.parallels_.length=0,this.meridiansLabels_&&(this.meridiansLabels_.length=0),void(this.parallelsLabels_&&(this.parallelsLabels_.length=0));var o,a,s,u,l=this.toLonLatTransform_(e),h=l[0],c=l[1],p=this.maxLines_,f=[Math.max(t[0],this.minLonP_),Math.max(t[1],this.minLatP_),Math.min(t[2],this.maxLonP_),Math.min(t[3],this.maxLatP_)],d=(f=Ue(f,this.projection_,"EPSG:4326"))[3],_=f[2],g=f[1],y=f[0];for(u=Bt(h=Math.floor(h/i)*i,this.minLon_,this.maxLon_),a=this.addMeridian_(u,g,d,n,t,0),o=0;u!=this.minLon_&&o++<p;)u=Math.max(u-i,this.minLon_),a=this.addMeridian_(u,g,d,n,t,a);for(u=Bt(h,this.minLon_,this.maxLon_),o=0;u!=this.maxLon_&&o++<p;)u=Math.min(u+i,this.maxLon_),a=this.addMeridian_(u,g,d,n,t,a);for(this.meridians_.length=a,this.meridiansLabels_&&(this.meridiansLabels_.length=a),s=Bt(c=Math.floor(c/i)*i,this.minLat_,this.maxLat_),a=this.addParallel_(s,y,_,n,t,0),o=0;s!=this.minLat_&&o++<p;)s=Math.max(s-i,this.minLat_),a=this.addParallel_(s,y,_,n,t,a);for(s=Bt(c,this.minLat_,this.maxLat_),o=0;s!=this.maxLat_&&o++<p;)s=Math.min(s+i,this.maxLat_),a=this.addParallel_(s,y,_,n,t,a);this.parallels_.length=a,this.parallelsLabels_&&(this.parallelsLabels_.length=a)},e.prototype.getInterval_=function(t){for(var e=this.projectionCenterLonLat_[0],r=this.projectionCenterLonLat_[1],n=-1,i=Math.pow(this.targetSize_*t,2),o=[],a=[],s=0,u=this.intervals_.length;s<u;++s){var l=this.intervals_[s]/2;if(o[0]=e-l,o[1]=r-l,a[0]=e+l,a[1]=r+l,this.fromLonLatTransform_(o,o),this.fromLonLatTransform_(a,a),Math.pow(a[0]-o[0],2)+Math.pow(a[1]-o[1],2)<=i)break;n=this.intervals_[s]}return n},e.prototype.getMeridian_=function(t,e,r,n,i){var o=function(t,e,r,n,i){return vf(function(n){return[t,e+(r-e)*n]},ke(Ie("EPSG:4326"),n),i)}(t,e,r,this.projection_,n),a=this.meridians_[i];return a?(a.setFlatCoordinates(Ut.XY,o),a.changed()):a=this.meridians_[i]=new yf(o,Ut.XY),a},e.prototype.getMeridianPoint_=function(t,e,r){var n,i=t.getFlatCoordinates(),o=Math.max(e[1],i[1]),a=Math.min(e[3],i[i.length-1]),s=Bt(e[1]+Math.abs(e[1]-e[3])*this.lonLabelPosition_,o,a),u=[i[0],s];return r in this.meridiansLabels_?(n=this.meridiansLabels_[r].geom).setCoordinates(u):n=new Cr(u),n},e.prototype.getMeridians=function(){return this.meridians_},e.prototype.getParallel_=function(t,e,r,n,i){var o=function(t,e,r,n,i){return vf(function(n){return[e+(r-e)*n,t]},ke(Ie("EPSG:4326"),n),i)}(t,e,r,this.projection_,n),a=this.parallels_[i];return a?(a.setFlatCoordinates(Ut.XY,o),a.changed()):a=new yf(o,Ut.XY),a},e.prototype.getParallelPoint_=function(t,e,r){var n,i=t.getFlatCoordinates(),o=Math.max(e[0],i[0]),a=Math.min(e[2],i[i.length-2]),s=[Bt(e[0]+Math.abs(e[0]-e[2])*this.latLabelPosition_,o,a),i[1]];return r in this.parallelsLabels_?(n=this.parallelsLabels_[r].geom).setCoordinates(s):n=new Cr(s),n},e.prototype.getParallels=function(){return this.parallels_},e.prototype.updateProjectionInfo_=function(t){var e=Ie("EPSG:4326"),r=t.getWorldExtent(),n=Ue(r,e,t);this.maxLat_=r[3],this.maxLon_=r[2],this.minLat_=r[1],this.minLon_=r[0],this.maxLatP_=n[3],this.maxLonP_=n[2],this.minLatP_=n[1],this.minLonP_=n[0],this.fromLonLatTransform_=ke(e,t),this.toLonLatTransform_=ke(t,e),this.projectionCenterLonLat_=this.toLonLatTransform_(Pt(t.getExtent())),this.projection_=t},e}(ff),wf=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),xf={BLUR:"blur",GRADIENT:"gradient",RADIUS:"radius"},Of=["#00f","#0ff","#0f0","#ff0","#f00"];var Cf=function(t){function e(e){var r=this,n=e||{},i=p({},n);delete i.gradient,delete i.radius,delete i.blur,delete i.shadow,delete i.weight,(r=t.call(this,i)||this).gradient_=null,r.shadow_=void 0!==n.shadow?n.shadow:250,r.circleImage_=void 0,r.styleCache_=null,E(r,U(xf.GRADIENT),r.handleGradientChanged_,r),r.setGradient(n.gradient?n.gradient:Of),r.setBlur(void 0!==n.blur?n.blur:15),r.setRadius(void 0!==n.radius?n.radius:8);var o=n.weight?n.weight:"weight";return r.weightFunction_="string"==typeof o?function(t){return t.get(o)}:o,r.setRenderOrder(null),r}return wf(e,t),e.prototype.getBlur=function(){return this.get(xf.BLUR)},e.prototype.getGradient=function(){return this.get(xf.GRADIENT)},e.prototype.getRadius=function(){return this.get(xf.RADIUS)},e.prototype.handleGradientChanged_=function(){this.gradient_=function(t){for(var e=io(1,256),r=e.createLinearGradient(0,0,1,256),n=1/(t.length-1),i=0,o=t.length;i<o;++i)r.addColorStop(i*n,t[i]);return e.fillStyle=r,e.fillRect(0,0,1,256),e.canvas}(this.getGradient())},e.prototype.setBlur=function(t){this.set(xf.BLUR,t)},e.prototype.setGradient=function(t){this.set(xf.GRADIENT,t)},e.prototype.setRadius=function(t){this.set(xf.RADIUS,t)},e.prototype.createRenderer=function(){return new pp(this,{vertexShader:"\n        precision mediump float;\n        attribute vec2 a_position;\n        attribute vec2 a_texCoord;\n        attribute float a_rotateWithView;\n        attribute vec2 a_offsets;\n        attribute float a_opacity;\n        \n        uniform mat4 u_projectionMatrix;\n        uniform mat4 u_offsetScaleMatrix;\n        uniform mat4 u_offsetRotateMatrix;\n        uniform float u_size;\n        \n        varying vec2 v_texCoord;\n        varying float v_opacity;\n        \n        void main(void) {\n          mat4 offsetMatrix = u_offsetScaleMatrix;\n          if (a_rotateWithView == 1.0) {\n            offsetMatrix = u_offsetScaleMatrix * u_offsetRotateMatrix;\n          }\n          vec4 offsets = offsetMatrix * vec4(a_offsets, 0.0, 0.0);\n          gl_Position = u_projectionMatrix * vec4(a_position, 0.0, 1.0) + offsets * u_size;\n          v_texCoord = a_texCoord;\n          v_opacity = a_opacity;\n        }",fragmentShader:"\n        precision mediump float;\n        uniform float u_resolution;\n        uniform float u_blurSlope;\n        \n        varying vec2 v_texCoord;\n        varying float v_opacity;\n        \n        void main(void) {\n          vec2 texCoord = v_texCoord * 2.0 - vec2(1.0, 1.0);\n          float sqRadius = texCoord.x * texCoord.x + texCoord.y * texCoord.y;\n          float value = (1.0 - sqrt(sqRadius)) * u_blurSlope;\n          float alpha = smoothstep(0.0, 1.0, value) * v_opacity;\n          gl_FragColor = vec4(1.0, 1.0, 1.0, alpha);\n        }",uniforms:{u_size:function(){return 2*(this.get(xf.RADIUS)+this.get(xf.BLUR))}.bind(this),u_blurSlope:function(){return this.get(xf.RADIUS)/Math.max(1,this.get(xf.BLUR))}.bind(this),u_resolution:function(t){return t.viewState.resolution}},postProcesses:[{fragmentShader:"\n            precision mediump float;\n\n            uniform sampler2D u_image;\n            uniform sampler2D u_gradientTexture;\n\n            varying vec2 v_texCoord;\n            varying vec2 v_screenCoord;\n\n            void main() {\n              vec4 color = texture2D(u_image, v_texCoord);\n              gl_FragColor.a = color.a;\n              gl_FragColor.rgb = texture2D(u_gradientTexture, vec2(0.5, color.a)).rgb;\n              gl_FragColor.rgb *= gl_FragColor.a;\n            }",uniforms:{u_gradientTexture:this.gradient_}}],opacityCallback:function(t){return this.weightFunction_(t)}.bind(this)})},e}(ff),Rf=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),Pf=function(t){function e(e){var r=t.call(this,e)||this;return r.skippedFeatures_=[],r.vectorRenderer_=new rf(e),r.layerImageRatio_=e.getImageRatio(),r}return Rf(e,t),e.prototype.disposeInternal=function(){this.vectorRenderer_.dispose(),t.prototype.disposeInternal.call(this)},e.prototype.prepareFrame=function(t,e){var r=t.pixelRatio,n=t.viewState.resolution,i=t.viewHints,o=this.vectorRenderer_,a=t.extent;if(1!==this.layerImageRatio_&&kt(a=a.slice(0),this.layerImageRatio_),!i[Li]&&!i[Mi]&&!Dt(a)){var s=this.skippedFeatures_,u=o.context,l=p({},t,{size:[Nt(a)/n,Lt(a)/n],viewState:p({},t.viewState,{rotation:0})}),h=Object.keys(l.skippedFeatureUids).sort(),c=new Fh(a,n,r,u.canvas,function(t){!o.prepareFrame(l,e)||!o.replayGroupChanged&&et(s,h)||(o.renderFrame(l,e),s=h,t())});E(c,F.CHANGE,function(){c.getState()===qu.LOADED&&(this.image_=c,this.skippedFeatures_=s)},this),c.load()}if(this.image_){var f=this.image_,d=f.getResolution(),_=f.getPixelRatio();this.renderedResolution=d*r/_}return!!this.image_},e.prototype.preRender=function(){},e.prototype.postRender=function(){},e.prototype.forEachFeatureAtCoordinate=function(e,r,n,i){return this.vectorRenderer_?this.vectorRenderer_.forEachFeatureAtCoordinate(e,r,n,i):t.prototype.forEachFeatureAtCoordinate.call(this,e,r,n,i)},e}(oc),bf=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),If=function(t){function e(e){var r=this,n=e||{},i=p({},n);return delete i.imageRatio,(r=t.call(this,i)||this).imageRatio_=void 0!==n.imageRatio?n.imageRatio:1,r}return bf(e,t),e.prototype.getImageRatio=function(){return this.imageRatio_},e.prototype.createRenderer=function(){return new Pf(this)},e}(cf),Lf=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),Mf=function(t){function e(e){var r=this,n=e||{},i=p({},n);delete i.preload,delete i.useInterimTilesOnError,r=t.call(this,i)||this;var o=n.renderMode||nf.HYBRID;return W(null==o||o==nf.IMAGE||o==nf.HYBRID,28),r.renderMode_=o,r.setPreload(n.preload?n.preload:0),r.setUseInterimTilesOnError(void 0===n.useInterimTilesOnError||n.useInterimTilesOnError),r}return Lf(e,t),e.prototype.createRenderer=function(){return new uf(this)},e.prototype.getRenderMode=function(){return this.renderMode_},e.prototype.getPreload=function(){return this.get(uc)},e.prototype.getUseInterimTilesOnError=function(){return this.get(lc)},e.prototype.setPreload=function(t){this.set(uc,t)},e.prototype.setUseInterimTilesOnError=function(t){this.set(lc,t)},e}(cf),Ff=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),Af="addfeatures",Nf=function(t){function e(e,r,n,i){var o=t.call(this,e)||this;return o.features=n,o.file=r,o.projection=i,o}return Ff(e,t),e}(I);function Gf(t){for(var e=t.dataTransfer.files,r=0,n=e.length;r<n;++r){var i=e.item(r),o=new FileReader;o.addEventListener(F.LOAD,this.handleResult_.bind(this,i)),o.readAsText(i)}}function Df(t){t.stopPropagation(),t.preventDefault(),t.dataTransfer.dropEffect="copy"}var kf=function(t){function e(e){var r=this,n=e||{};return(r=t.call(this,{handleEvent:C})||this).formatConstructors_=n.formatConstructors?n.formatConstructors:[],r.projection_=n.projection?Ie(n.projection):null,r.dropListenKeys_=null,r.source_=n.source||null,r.target=n.target?n.target:null,r}return Ff(e,t),e.prototype.handleResult_=function(t,e){var r=e.target.result,n=this.getMap(),i=this.projection_;i||(i=n.getView().getProjection());for(var o=this.formatConstructors_,a=[],s=0,u=o.length;s<u;++s){var l=new o[s];if((a=this.tryReadFeatures_(l,r,{featureProjection:i}))&&a.length>0)break}this.source_&&(this.source_.clear(),this.source_.addFeatures(a)),this.dispatchEvent(new Nf(Af,t,a,i))},e.prototype.registerListeners_=function(){var t=this.getMap();if(t){var e=this.target?this.target:t.getViewport();this.dropListenKeys_=[E(e,F.DROP,Gf,this),E(e,F.DRAGENTER,Df,this),E(e,F.DRAGOVER,Df,this),E(e,F.DROP,Df,this)]}},e.prototype.setActive=function(e){t.prototype.setActive.call(this,e),e?this.registerListeners_():this.unregisterListeners_()},e.prototype.setMap=function(e){this.unregisterListeners_(),t.prototype.setMap.call(this,e),this.getActive()&&this.registerListeners_()},e.prototype.tryReadFeatures_=function(t,e,r){try{return t.readFeatures(e,r)}catch(t){return null}},e.prototype.unregisterListeners_=function(){this.dropListenKeys_&&(this.dropListenKeys_.forEach(w),this.dropListenKeys_=null)},e}(Ho),jf=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),Uf=function(t){function e(e){var r=this,n=e||{};return(r=t.call(this,n)||this).condition_=n.condition?n.condition:ua,r.lastAngle_=void 0,r.lastMagnitude_=void 0,r.lastScaleDelta_=0,r.duration_=void 0!==n.duration?n.duration:400,r}return jf(e,t),e.prototype.handleDragEvent=function(t){if(ha(t)){var e=t.map,r=e.getSize(),n=t.pixel,i=n[0]-r[0]/2,o=r[1]/2-n[1],a=Math.atan2(o,i),s=Math.sqrt(i*i+o*o),u=e.getView();if(void 0!==this.lastAngle_){var l=this.lastAngle_-a;u.adjustRotation(l)}this.lastAngle_=a,void 0!==this.lastMagnitude_&&u.adjustResolution(this.lastMagnitude_/s),void 0!==this.lastMagnitude_&&(this.lastScaleDelta_=this.lastMagnitude_/s),this.lastMagnitude_=s}},e.prototype.handleUpEvent=function(t){if(!ha(t))return!0;var e=t.map.getView(),r=this.lastScaleDelta_>1?1:-1;return e.endInteraction(this.duration_,r),this.lastScaleDelta_=0,!1},e.prototype.handleDownEvent=function(t){return!!ha(t)&&(!!this.condition_(t)&&(t.map.getView().beginInteraction(),this.lastAngle_=void 0,this.lastMagnitude_=void 0,!0))},e}(da),Yf=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),Xf=function(t){function e(e,r,n){var i=t.call(this)||this;if(void 0!==n&&void 0===r)i.setFlatCoordinates(n,e);else{var o=r||0;i.setCenterAndRadius(e,o,n)}return i}return Yf(e,t),e.prototype.clone=function(){return new e(this.flatCoordinates.slice(),void 0,this.layout)},e.prototype.closestPointXY=function(t,e,r,n){var i=this.flatCoordinates,o=t-i[0],a=e-i[1],s=o*o+a*a;if(s<n){if(0===s)for(var u=0;u<this.stride;++u)r[u]=i[u];else{var l=this.getRadius()/Math.sqrt(s);r[0]=i[0]+l*o,r[1]=i[1]+l*a;for(u=2;u<this.stride;++u)r[u]=i[u]}return r.length=this.stride,s}return n},e.prototype.containsXY=function(t,e){var r=this.flatCoordinates,n=t-r[0],i=e-r[1];return n*n+i*i<=this.getRadiusSquared_()},e.prototype.getCenter=function(){return this.flatCoordinates.slice(0,this.stride)},e.prototype.computeExtent=function(t){var e=this.flatCoordinates,r=e[this.stride]-e[0];return dt(e[0]-r,e[1]-r,e[0]+r,e[1]+r,t)},e.prototype.getRadius=function(){return Math.sqrt(this.getRadiusSquared_())},e.prototype.getRadiusSquared_=function(){var t=this.flatCoordinates[this.stride]-this.flatCoordinates[0],e=this.flatCoordinates[this.stride+1]-this.flatCoordinates[1];return t*t+e*e},e.prototype.getType=function(){return Yt.CIRCLE},e.prototype.intersectsExtent=function(t){if(Gt(t,this.getExtent())){var e=this.getCenter();return t[0]<=e[0]&&t[2]>=e[0]||(t[1]<=e[1]&&t[3]>=e[1]||xt(t,this.intersectsCoordinate,this))}return!1},e.prototype.setCenter=function(t){var e=this.stride,r=this.flatCoordinates[e]-this.flatCoordinates[0],n=t.slice();n[e]=n[0]+r;for(var i=1;i<e;++i)n[e+i]=t[i];this.setFlatCoordinates(this.layout,n),this.changed()},e.prototype.setCenterAndRadius=function(t,e,r){this.setLayout(r,t,0),this.flatCoordinates||(this.flatCoordinates=[]);var n=this.flatCoordinates,i=pr(n,0,t,this.stride);n[i++]=n[0]+e;for(var o=1,a=this.stride;o<a;++o)n[i++]=n[o];n.length=i,this.changed()},e.prototype.getCoordinates=function(){return null},e.prototype.setCoordinates=function(t,e){},e.prototype.setRadius=function(t){this.flatCoordinates[this.stride]=this.flatCoordinates[0]+t,this.changed()},e}(ir);Xf.prototype.transform;var Bf=Xf,zf=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),Vf=function(t){function e(e,r,n){var i=t.call(this)||this;if(i.ends_=[],i.maxDelta_=-1,i.maxDeltaRevision_=-1,Array.isArray(e[0]))i.setCoordinates(e,r);else if(void 0!==r&&n)i.setFlatCoordinates(r,e),i.ends_=n;else{for(var o=i.getLayout(),a=e,s=[],u=[],l=0,h=a.length;l<h;++l){var c=a[l];0===l&&(o=c.getLayout()),$(s,c.getFlatCoordinates()),u.push(s.length)}i.setFlatCoordinates(o,s),i.ends_=u}return i}return zf(e,t),e.prototype.appendLineString=function(t){this.flatCoordinates?$(this.flatCoordinates,t.getFlatCoordinates().slice()):this.flatCoordinates=t.getFlatCoordinates().slice(),this.ends_.push(this.flatCoordinates.length),this.changed()},e.prototype.clone=function(){return new e(this.flatCoordinates.slice(),this.layout,this.ends_.slice())},e.prototype.closestPointXY=function(t,e,r,n){return n<ut(this.getExtent(),t,e)?n:(this.maxDeltaRevision_!=this.getRevision()&&(this.maxDelta_=Math.sqrt(lr(this.flatCoordinates,0,this.ends_,this.stride,0)),this.maxDeltaRevision_=this.getRevision()),cr(this.flatCoordinates,0,this.ends_,this.stride,this.maxDelta_,!1,t,e,r,n))},e.prototype.getCoordinateAtM=function(t,e,r){if(this.layout!=Ut.XYM&&this.layout!=Ut.XYZM||0===this.flatCoordinates.length)return null;var n=void 0!==e&&e,i=void 0!==r&&r;return function(t,e,r,n,i,o,a){if(a)return _f(t,e,r[r.length-1],n,i,o);var s;if(i<t[n-1])return o?((s=t.slice(0,n))[n-1]=i,s):null;if(t[t.length-1]<i)return o?((s=t.slice(t.length-n))[n-1]=i,s):null;for(var u=0,l=r.length;u<l;++u){var h=r[u];if(e!=h){if(i<t[e+n-1])return null;if(i<=t[h-1])return _f(t,e,h,n,i,!1);e=h}}return null}(this.flatCoordinates,0,this.ends_,this.stride,t,n,i)},e.prototype.getCoordinates=function(){return gr(this.flatCoordinates,0,this.ends_,this.stride)},e.prototype.getEnds=function(){return this.ends_},e.prototype.getLineString=function(t){return t<0||this.ends_.length<=t?null:new yf(this.flatCoordinates.slice(0===t?0:this.ends_[t-1],this.ends_[t]),this.layout)},e.prototype.getLineStrings=function(){for(var t=this.flatCoordinates,e=this.ends_,r=this.layout,n=[],i=0,o=0,a=e.length;o<a;++o){var s=e[o],u=new yf(t.slice(i,s),r);n.push(u),i=s}return n},e.prototype.getFlatMidpoints=function(){for(var t=[],e=this.flatCoordinates,r=0,n=this.ends_,i=this.stride,o=0,a=n.length;o<a;++o){var s=n[o];$(t,df(e,r,s,i,.5)),r=s}return t},e.prototype.getSimplifiedGeometryInternal=function(t){var r=[],n=[];return r.length=mr(this.flatCoordinates,0,this.ends_,this.stride,t,r,0,n),new e(r,Ut.XY,n)},e.prototype.getType=function(){return Yt.MULTI_LINE_STRING},e.prototype.intersectsExtent=function(t){return function(t,e,r,n,i){for(var o=0,a=r.length;o<a;++o){if(Fr(t,e,r[o],n,i))return!0;e=r[o]}return!1}(this.flatCoordinates,0,this.ends_,this.stride,t)},e.prototype.setCoordinates=function(t,e){this.setLayout(e,t,2),this.flatCoordinates||(this.flatCoordinates=[]);var r=dr(this.flatCoordinates,0,t,this.stride,this.ends_);this.flatCoordinates.length=0===r.length?0:r[r.length-1],this.changed()},e}(ir),Wf=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),Zf=function(t){function e(e,r){var n=t.call(this)||this;return r&&!Array.isArray(e[0])?n.setFlatCoordinates(r,e):n.setCoordinates(e,r),n}return Wf(e,t),e.prototype.appendPoint=function(t){this.flatCoordinates?$(this.flatCoordinates,t.getFlatCoordinates()):this.flatCoordinates=t.getFlatCoordinates().slice(),this.changed()},e.prototype.clone=function(){return new e(this.flatCoordinates.slice(),this.layout)},e.prototype.closestPointXY=function(t,e,r,n){if(n<ut(this.getExtent(),t,e))return n;for(var i=this.flatCoordinates,o=this.stride,a=0,s=i.length;a<s;a+=o){var u=Wt(t,e,i[a],i[a+1]);if(u<n){n=u;for(var l=0;l<o;++l)r[l]=i[a+l];r.length=o}}return n},e.prototype.getCoordinates=function(){return _r(this.flatCoordinates,0,this.flatCoordinates.length,this.stride)},e.prototype.getPoint=function(t){var e=this.flatCoordinates?this.flatCoordinates.length/this.stride:0;return t<0||e<=t?null:new Cr(this.flatCoordinates.slice(t*this.stride,(t+1)*this.stride),this.layout)},e.prototype.getPoints=function(){for(var t=this.flatCoordinates,e=this.layout,r=this.stride,n=[],i=0,o=t.length;i<o;i+=r){var a=new Cr(t.slice(i,i+r),e);n.push(a)}return n},e.prototype.getType=function(){return Yt.MULTI_POINT},e.prototype.intersectsExtent=function(t){for(var e=this.flatCoordinates,r=this.stride,n=0,i=e.length;n<i;n+=r){if(ct(t,e[n],e[n+1]))return!0}return!1},e.prototype.setCoordinates=function(t,e){this.setLayout(e,t,1),this.flatCoordinates||(this.flatCoordinates=[]),this.flatCoordinates.length=fr(this.flatCoordinates,0,t,this.stride),this.changed()},e}(ir);function Kf(t,e,r,n){for(var i=[],o=[1/0,1/0,-1/0,-1/0],a=0,s=r.length;a<s;++a){var u=r[a];o=yt(t,e,u[0],n),i.push((o[0]+o[2])/2,(o[1]+o[3])/2),e=u[u.length-1]}return i}var Hf=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),qf=function(t){function e(e,r,n){var i=t.call(this)||this;if(i.endss_=[],i.flatInteriorPointsRevision_=-1,i.flatInteriorPoints_=null,i.maxDelta_=-1,i.maxDeltaRevision_=-1,i.orientedRevision_=-1,i.orientedFlatCoordinates_=null,!n&&!Array.isArray(e[0])){for(var o=i.getLayout(),a=e,s=[],u=[],l=0,h=a.length;l<h;++l){var c=a[l];0===l&&(o=c.getLayout());for(var p=s.length,f=c.getEnds(),d=0,_=f.length;d<_;++d)f[d]+=p;$(s,c.getFlatCoordinates()),u.push(f)}r=o,e=s,n=u}return void 0!==r&&n?(i.setFlatCoordinates(r,e),i.endss_=n):i.setCoordinates(e,r),i}return Hf(e,t),e.prototype.appendPolygon=function(t){var e;if(this.flatCoordinates){var r=this.flatCoordinates.length;$(this.flatCoordinates,t.getFlatCoordinates());for(var n=0,i=(e=t.getEnds().slice()).length;n<i;++n)e[n]+=r}else this.flatCoordinates=t.getFlatCoordinates().slice(),e=t.getEnds().slice(),this.endss_.push();this.endss_.push(e),this.changed()},e.prototype.clone=function(){for(var t=this.endss_.length,r=new Array(t),n=0;n<t;++n)r[n]=this.endss_[n].slice();return new e(this.flatCoordinates.slice(),this.layout,r)},e.prototype.closestPointXY=function(t,e,r,n){return n<ut(this.getExtent(),t,e)?n:(this.maxDeltaRevision_!=this.getRevision()&&(this.maxDelta_=Math.sqrt(function(t,e,r,n,i){for(var o=0,a=r.length;o<a;++o){var s=r[o];i=lr(t,e,s,n,i),e=s[s.length-1]}return i}(this.flatCoordinates,0,this.endss_,this.stride,0)),this.maxDeltaRevision_=this.getRevision()),function(t,e,r,n,i,o,a,s,u,l,h){for(var c=h||[NaN,NaN],p=0,f=r.length;p<f;++p){var d=r[p];l=cr(t,e,d,n,i,o,a,s,u,l,c),e=d[d.length-1]}return l}(this.getOrientedFlatCoordinates(),0,this.endss_,this.stride,this.maxDelta_,!0,t,e,r,n))},e.prototype.containsXY=function(t,e){return function(t,e,r,n,i,o){if(0===r.length)return!1;for(var a=0,s=r.length;a<s;++a){var u=r[a];if(br(t,e,u,n,i,o))return!0;e=u[u.length-1]}return!1}(this.getOrientedFlatCoordinates(),0,this.endss_,this.stride,t,e)},e.prototype.getArea=function(){return function(t,e,r,n){for(var i=0,o=0,a=r.length;o<a;++o){var s=r[o];i+=ar(t,e,s,n),e=s[s.length-1]}return i}(this.getOrientedFlatCoordinates(),0,this.endss_,this.stride)},e.prototype.getCoordinates=function(t){var e;return void 0!==t?jr(e=this.getOrientedFlatCoordinates().slice(),0,this.endss_,this.stride,t):e=this.flatCoordinates,yr(e,0,this.endss_,this.stride)},e.prototype.getEndss=function(){return this.endss_},e.prototype.getFlatInteriorPoints=function(){if(this.flatInteriorPointsRevision_!=this.getRevision()){var t=Kf(this.flatCoordinates,0,this.endss_,this.stride);this.flatInteriorPoints_=Lr(this.getOrientedFlatCoordinates(),0,this.endss_,this.stride,t),this.flatInteriorPointsRevision_=this.getRevision()}return this.flatInteriorPoints_},e.prototype.getInteriorPoints=function(){return new Zf(this.getFlatInteriorPoints().slice(),Ut.XYM)},e.prototype.getOrientedFlatCoordinates=function(){if(this.orientedRevision_!=this.getRevision()){var t=this.flatCoordinates;!function(t,e,r,n,i){for(var o=0,a=r.length;o<a;++o){var s=r[o];if(!Dr(t,e,s,n,i))return!1;s.length&&(e=s[s.length-1])}return!0}(t,0,this.endss_,this.stride)?(this.orientedFlatCoordinates_=t.slice(),this.orientedFlatCoordinates_.length=jr(this.orientedFlatCoordinates_,0,this.endss_,this.stride)):this.orientedFlatCoordinates_=t,this.orientedRevision_=this.getRevision()}return this.orientedFlatCoordinates_},e.prototype.getSimplifiedGeometryInternal=function(t){var r=[],n=[];return r.length=function(t,e,r,n,i,o,a,s){for(var u=0,l=r.length;u<l;++u){var h=r[u],c=[];a=Sr(t,e,h,n,i,o,a,c),s.push(c),e=h[h.length-1]}return a}(this.flatCoordinates,0,this.endss_,this.stride,Math.sqrt(t),r,0,n),new e(r,Ut.XY,n)},e.prototype.getPolygon=function(t){if(t<0||this.endss_.length<=t)return null;var e;if(0===t)e=0;else{var r=this.endss_[t-1];e=r[r.length-1]}var n=this.endss_[t].slice(),i=n[n.length-1];if(0!==e)for(var o=0,a=n.length;o<a;++o)n[o]-=e;return new Xr(this.flatCoordinates.slice(e,i),this.layout,n)},e.prototype.getPolygons=function(){for(var t=this.layout,e=this.flatCoordinates,r=this.endss_,n=[],i=0,o=0,a=r.length;o<a;++o){var s=r[o].slice(),u=s[s.length-1];if(0!==i)for(var l=0,h=s.length;l<h;++l)s[l]-=i;var c=new Xr(e.slice(i,u),t,s);n.push(c),i=u}return n},e.prototype.getType=function(){return Yt.MULTI_POLYGON},e.prototype.intersectsExtent=function(t){return function(t,e,r,n,i){for(var o=0,a=r.length;o<a;++o){var s=r[o];if(Ar(t,e,s,n,i))return!0;e=s[s.length-1]}return!1}(this.getOrientedFlatCoordinates(),0,this.endss_,this.stride,t)},e.prototype.setCoordinates=function(t,e){this.setLayout(e,t,3),this.flatCoordinates||(this.flatCoordinates=[]);var r=function(t,e,r,n,i){for(var o=i||[],a=0,s=0,u=r.length;s<u;++s){var l=dr(t,e,r[s],n,o[a]);o[a++]=l,e=l[l.length-1]}return o.length=a,o}(this.flatCoordinates,0,t,this.stride,this.endss_);if(0===r.length)this.flatCoordinates.length=0;else{var n=r[r.length-1];this.flatCoordinates.length=0===n.length?0:n[n.length-1]}this.changed()},e}(ir),Jf=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),Qf={POINT:"Point",LINE_STRING:"LineString",POLYGON:"Polygon",CIRCLE:"Circle"},$f="drawstart",td="drawend",ed=function(t){function e(e,r){var n=t.call(this,e)||this;return n.feature=r,n}return Jf(e,t),e}(I);var rd=function(t){function e(e){var r=this,n=e;n.stopDown||(n.stopDown=R),(r=t.call(this,n)||this).shouldHandle_=!1,r.downPx_=null,r.downTimeout_,r.lastDragTime_,r.freehand_=!1,r.source_=e.source?e.source:null,r.features_=e.features?e.features:null,r.snapTolerance_=e.snapTolerance?e.snapTolerance:12,r.type_=e.type,r.mode_=function(t){var e;t===Yt.POINT||t===Yt.MULTI_POINT?e=Qf.POINT:t===Yt.LINE_STRING||t===Yt.MULTI_LINE_STRING?e=Qf.LINE_STRING:t===Yt.POLYGON||t===Yt.MULTI_POLYGON?e=Qf.POLYGON:t===Yt.CIRCLE&&(e=Qf.CIRCLE);return e}(r.type_),r.stopClick_=!!e.stopClick,r.minPoints_=e.minPoints?e.minPoints:r.mode_===Qf.POLYGON?3:2,r.maxPoints_=e.maxPoints?e.maxPoints:1/0,r.finishCondition_=e.finishCondition?e.finishCondition:C;var i,o=e.geometryFunction;if(!o)if(r.type_===Yt.CIRCLE)o=function(t,e){var r=e||new Bf([NaN,NaN]),n=Vi(t[0],t[1]);return r.setCenterAndRadius(t[0],Math.sqrt(n)),r};else{var a,s=r.mode_;s===Qf.POINT?a=Cr:s===Qf.LINE_STRING?a=yf:s===Qf.POLYGON&&(a=Xr),o=function(t,e){var r=e;return r?s===Qf.POLYGON?t[0].length?r.setCoordinates([t[0].concat([t[0][0]])]):r.setCoordinates([]):r.setCoordinates(t):r=new a(t),r}}return r.geometryFunction_=o,r.dragVertexDelay_=void 0!==e.dragVertexDelay?e.dragVertexDelay:500,r.finishCoordinate_=null,r.sketchFeature_=null,r.sketchPoint_=null,r.sketchCoords_=null,r.sketchLine_=null,r.sketchLineCoords_=null,r.squaredClickTolerance_=e.clickTolerance?e.clickTolerance*e.clickTolerance:36,r.overlay_=new ff({source:new fh({useSpatialIndex:!1,wrapX:!!e.wrapX&&e.wrapX}),style:e.style?e.style:(i=fl(),function(t,e){return i[t.getGeometry().getType()]}),updateWhileInteracting:!0}),r.geometryName_=e.geometryName,r.condition_=e.condition?e.condition:sa,r.freehandCondition_,e.freehand?r.freehandCondition_=ra:r.freehandCondition_=e.freehandCondition?e.freehandCondition:ua,E(r,U(Wo.ACTIVE),r.updateState_,r),r}return Jf(e,t),e.prototype.setMap=function(e){t.prototype.setMap.call(this,e),this.updateState_()},e.prototype.getOverlay=function(){return this.overlay_},e.prototype.handleEvent=function(e){e.originalEvent.type===F.CONTEXTMENU&&e.preventDefault(),this.freehand_=this.mode_!==Qf.POINT&&this.freehandCondition_(e);var r=e.type===fn.POINTERMOVE,n=!0;!this.freehand_&&this.lastDragTime_&&e.type===fn.POINTERDRAG&&(Date.now()-this.lastDragTime_>=this.dragVertexDelay_?(this.downPx_=e.pixel,this.shouldHandle_=!this.freehand_,r=!0):this.lastDragTime_=void 0,this.shouldHandle_&&void 0!==this.downTimeout_&&(clearTimeout(this.downTimeout_),this.downTimeout_=void 0));return this.freehand_&&e.type===fn.POINTERDRAG&&null!==this.sketchFeature_?(this.addToDrawing_(e),n=!1):this.freehand_&&e.type===fn.POINTERDOWN?n=!1:r?(n=e.type===fn.POINTERMOVE)&&this.freehand_?n=this.handlePointerMove_(e):(e.pointerEvent.pointerType==En||e.type===fn.POINTERDRAG&&void 0===this.downTimeout_)&&this.handlePointerMove_(e):e.type===fn.DBLCLICK&&(n=!1),t.prototype.handleEvent.call(this,e)&&n},e.prototype.handleDownEvent=function(t){return this.shouldHandle_=!this.freehand_,this.freehand_?(this.downPx_=t.pixel,this.finishCoordinate_||this.startDrawing_(t),!0):this.condition_(t)?(this.lastDragTime_=Date.now(),this.downTimeout_=setTimeout(function(){this.handlePointerMove_(new _n(fn.POINTERMOVE,t.map,t.pointerEvent,!1,t.frameState))}.bind(this),this.dragVertexDelay_),this.downPx_=t.pixel,!0):(this.lastDragTime_=void 0,!1)},e.prototype.handleUpEvent=function(t){var e=!0;this.downTimeout_&&(clearTimeout(this.downTimeout_),this.downTimeout_=void 0),this.handlePointerMove_(t);var r=this.mode_===Qf.CIRCLE;return this.shouldHandle_?(this.finishCoordinate_?this.freehand_||r?this.finishDrawing():this.atFinish_(t)?this.finishCondition_(t)&&this.finishDrawing():this.addToDrawing_(t):(this.startDrawing_(t),this.mode_===Qf.POINT&&this.finishDrawing()),e=!1):this.freehand_&&(this.finishCoordinate_=null,this.abortDrawing_()),!e&&this.stopClick_&&t.stopPropagation(),e},e.prototype.handlePointerMove_=function(t){if(this.downPx_&&(!this.freehand_&&this.shouldHandle_||this.freehand_&&!this.shouldHandle_)){var e=this.downPx_,r=t.pixel,n=e[0]-r[0],i=e[1]-r[1],o=n*n+i*i;if(this.shouldHandle_=this.freehand_?o>this.squaredClickTolerance_:o<=this.squaredClickTolerance_,!this.shouldHandle_)return!0}return this.finishCoordinate_?this.modifyDrawing_(t):this.createOrUpdateSketchPoint_(t),!0},e.prototype.atFinish_=function(t){var e=!1;if(this.sketchFeature_){var r=!1,n=[this.finishCoordinate_];if(this.mode_===Qf.LINE_STRING)r=this.sketchCoords_.length>this.minPoints_;else if(this.mode_===Qf.POLYGON){var i=this.sketchCoords_;r=i[0].length>this.minPoints_,n=[i[0][0],i[0][i[0].length-2]]}if(r)for(var o=t.map,a=0,s=n.length;a<s;a++){var u=n[a],l=o.getPixelFromCoordinate(u),h=t.pixel,c=h[0]-l[0],p=h[1]-l[1],f=this.freehand_?1:this.snapTolerance_;if(e=Math.sqrt(c*c+p*p)<=f){this.finishCoordinate_=u;break}}}return e},e.prototype.createOrUpdateSketchPoint_=function(t){var e=t.coordinate.slice();this.sketchPoint_?this.sketchPoint_.getGeometry().setCoordinates(e):(this.sketchPoint_=new K(new Cr(e)),this.updateSketchFeatures_())},e.prototype.startDrawing_=function(t){var e=t.coordinate;this.finishCoordinate_=e,this.mode_===Qf.POINT?this.sketchCoords_=e.slice():this.mode_===Qf.POLYGON?(this.sketchCoords_=[[e.slice(),e.slice()]],this.sketchLineCoords_=this.sketchCoords_[0]):this.sketchCoords_=[e.slice(),e.slice()],this.sketchLineCoords_&&(this.sketchLine_=new K(new yf(this.sketchLineCoords_)));var r=this.geometryFunction_(this.sketchCoords_);this.sketchFeature_=new K,this.geometryName_&&this.sketchFeature_.setGeometryName(this.geometryName_),this.sketchFeature_.setGeometry(r),this.updateSketchFeatures_(),this.dispatchEvent(new ed($f,this.sketchFeature_))},e.prototype.modifyDrawing_=function(t){var e,r,n,i=t.coordinate,o=this.sketchFeature_.getGeometry();(this.mode_===Qf.POINT?r=this.sketchCoords_:this.mode_===Qf.POLYGON?(r=(e=this.sketchCoords_[0])[e.length-1],this.atFinish_(t)&&(i=this.finishCoordinate_.slice())):r=(e=this.sketchCoords_)[e.length-1],r[0]=i[0],r[1]=i[1],this.geometryFunction_(this.sketchCoords_,o),this.sketchPoint_)&&this.sketchPoint_.getGeometry().setCoordinates(i);if(o.getType()==Yt.POLYGON&&this.mode_!==Qf.POLYGON){this.sketchLine_||(this.sketchLine_=new K);var a=o.getLinearRing(0);(n=this.sketchLine_.getGeometry())?(n.setFlatCoordinates(a.getLayout(),a.getFlatCoordinates()),n.changed()):(n=new yf(a.getFlatCoordinates(),a.getLayout()),this.sketchLine_.setGeometry(n))}else this.sketchLineCoords_&&(n=this.sketchLine_.getGeometry()).setCoordinates(this.sketchLineCoords_);this.updateSketchFeatures_()},e.prototype.addToDrawing_=function(t){var e,r,n=t.coordinate,i=this.sketchFeature_.getGeometry();this.mode_===Qf.LINE_STRING?(this.finishCoordinate_=n.slice(),(r=this.sketchCoords_).length>=this.maxPoints_&&(this.freehand_?r.pop():e=!0),r.push(n.slice()),this.geometryFunction_(r,i)):this.mode_===Qf.POLYGON&&((r=this.sketchCoords_[0]).length>=this.maxPoints_&&(this.freehand_?r.pop():e=!0),r.push(n.slice()),e&&(this.finishCoordinate_=r[0]),this.geometryFunction_(this.sketchCoords_,i)),this.updateSketchFeatures_(),e&&this.finishDrawing()},e.prototype.removeLastPoint=function(){if(this.sketchFeature_){var t,e=this.sketchFeature_.getGeometry();this.mode_===Qf.LINE_STRING?((t=this.sketchCoords_).splice(-2,1),this.geometryFunction_(t,e),t.length>=2&&(this.finishCoordinate_=t[t.length-2].slice())):this.mode_===Qf.POLYGON&&((t=this.sketchCoords_[0]).splice(-2,1),this.sketchLine_.getGeometry().setCoordinates(t),this.geometryFunction_(this.sketchCoords_,e)),0===t.length&&(this.finishCoordinate_=null),this.updateSketchFeatures_()}},e.prototype.finishDrawing=function(){var t=this.abortDrawing_();if(t){var e=this.sketchCoords_,r=t.getGeometry();this.mode_===Qf.LINE_STRING?(e.pop(),this.geometryFunction_(e,r)):this.mode_===Qf.POLYGON&&(e[0].pop(),this.geometryFunction_(e,r),e=r.getCoordinates()),this.type_===Yt.MULTI_POINT?t.setGeometry(new Zf([e])):this.type_===Yt.MULTI_LINE_STRING?t.setGeometry(new Vf([e])):this.type_===Yt.MULTI_POLYGON&&t.setGeometry(new qf([e])),this.dispatchEvent(new ed(td,t)),this.features_&&this.features_.push(t),this.source_&&this.source_.addFeature(t)}},e.prototype.abortDrawing_=function(){this.finishCoordinate_=null;var t=this.sketchFeature_;return t&&(this.sketchFeature_=null,this.sketchPoint_=null,this.sketchLine_=null,this.overlay_.getSource().clear(!0)),t},e.prototype.extend=function(t){var e=t.getGeometry();this.sketchFeature_=t,this.sketchCoords_=e.getCoordinates();var r=this.sketchCoords_[this.sketchCoords_.length-1];this.finishCoordinate_=r.slice(),this.sketchCoords_.push(r.slice()),this.updateSketchFeatures_(),this.dispatchEvent(new ed($f,this.sketchFeature_))},e.prototype.updateSketchFeatures_=function(){var t=[];this.sketchFeature_&&t.push(this.sketchFeature_),this.sketchLine_&&t.push(this.sketchLine_),this.sketchPoint_&&t.push(this.sketchPoint_);var e=this.overlay_.getSource();e.clear(!0),e.addFeatures(t)},e.prototype.updateState_=function(){var t=this.getMap(),e=this.getActive();t&&e||this.abortDrawing_(),this.overlay_.setMap(e?t:null)},e}(da),nd=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),id={EXTENTCHANGED:"extentchanged"},od=function(t){function e(e){var r=t.call(this,id.EXTENTCHANGED)||this;return r.extent=e,r}return nd(e,t),e}(I);function ad(){var t=fl();return function(e,r){return t[Yt.POINT]}}function sd(t){return function(e){return ot([t,e])}}function ud(t,e){return t[0]==e[0]?function(r){return ot([t,[r[0],e[1]]])}:t[1]==e[1]?function(r){return ot([t,[e[0],r[1]]])}:null}var ld=function(t){function e(e){var r,n=this,i=e||{};return(n=t.call(this,i)||this).extent_=null,n.pointerHandler_=null,n.pixelTolerance_=void 0!==i.pixelTolerance?i.pixelTolerance:10,n.snappedToVertex_=!1,n.extentFeature_=null,n.vertexFeature_=null,e||(e={}),n.extentOverlay_=new ff({source:new fh({useSpatialIndex:!1,wrapX:!!e.wrapX}),style:e.boxStyle?e.boxStyle:(r=fl(),function(t,e){return r[Yt.POLYGON]}),updateWhileAnimating:!0,updateWhileInteracting:!0}),n.vertexOverlay_=new ff({source:new fh({useSpatialIndex:!1,wrapX:!!e.wrapX}),style:e.pointerStyle?e.pointerStyle:ad(),updateWhileAnimating:!0,updateWhileInteracting:!0}),e.extent&&n.setExtent(e.extent),n}return nd(e,t),e.prototype.snapToVertex_=function(t,e){var r=e.getCoordinateFromPixel(t),n=this.getExtent();if(n){var i=function(t){return[[[t[0],t[1]],[t[0],t[3]]],[[t[0],t[3]],[t[2],t[3]]],[[t[2],t[3]],[t[2],t[1]]],[[t[2],t[1]],[t[0],t[1]]]]}(n);i.sort(function(t,e){return Zi(r,t)-Zi(r,e)});var o=i[0],a=ji(r,o),s=e.getPixelFromCoordinate(a);if(Wi(t,s)<=this.pixelTolerance_){var u=e.getPixelFromCoordinate(o[0]),l=e.getPixelFromCoordinate(o[1]),h=Vi(s,u),c=Vi(s,l),p=Math.sqrt(Math.min(h,c));return this.snappedToVertex_=p<=this.pixelTolerance_,this.snappedToVertex_&&(a=h>c?o[1]:o[0]),a}}return null},e.prototype.handlePointerMove_=function(t){var e=t.pixel,r=t.map,n=this.snapToVertex_(e,r);n||(n=r.getCoordinateFromPixel(e)),this.createOrUpdatePointerFeature_(n)},e.prototype.createOrUpdateExtentFeature_=function(t){var e=this.extentFeature_;return e?t?e.setGeometry(zr(t)):e.setGeometry(void 0):(e=new K(t?zr(t):{}),this.extentFeature_=e,this.extentOverlay_.getSource().addFeature(e)),e},e.prototype.createOrUpdatePointerFeature_=function(t){var e=this.vertexFeature_;e?e.getGeometry().setCoordinates(t):(e=new K(new Cr(t)),this.vertexFeature_=e,this.vertexOverlay_.getSource().addFeature(e));return e},e.prototype.handleEvent=function(e){return!e.pointerEvent||(e.type!=fn.POINTERMOVE||this.handlingDownUpSequence||this.handlePointerMove_(e),t.prototype.handleEvent.call(this,e),!1)},e.prototype.handleDownEvent=function(t){var e=t.pixel,r=t.map,n=this.getExtent(),i=this.snapToVertex_(e,r),o=function(t){var e=null,r=null;return t[0]==n[0]?e=n[2]:t[0]==n[2]&&(e=n[0]),t[1]==n[1]?r=n[3]:t[1]==n[3]&&(r=n[1]),null!==e&&null!==r?[e,r]:null};if(i&&n){var a=i[0]==n[0]||i[0]==n[2]?i[0]:null,s=i[1]==n[1]||i[1]==n[3]?i[1]:null;null!==a&&null!==s?this.pointerHandler_=sd(o(i)):null!==a?this.pointerHandler_=ud(o([a,n[1]]),o([a,n[3]])):null!==s&&(this.pointerHandler_=ud(o([n[0],s]),o([n[2],s])))}else i=r.getCoordinateFromPixel(e),this.setExtent([i[0],i[1],i[0],i[1]]),this.pointerHandler_=sd(i);return!0},e.prototype.handleDragEvent=function(t){if(this.pointerHandler_){var e=t.coordinate;this.setExtent(this.pointerHandler_(e)),this.createOrUpdatePointerFeature_(e)}return!0},e.prototype.handleUpEvent=function(t){this.pointerHandler_=null;var e=this.getExtent();return e&&0!==Ot(e)||this.setExtent(null),!1},e.prototype.setMap=function(e){this.extentOverlay_.setMap(e),this.vertexOverlay_.setMap(e),t.prototype.setMap.call(this,e)},e.prototype.getExtent=function(){return this.extent_},e.prototype.setExtent=function(t){this.extent_=t||null,this.createOrUpdateExtentFeature_(t),this.dispatchEvent(new od(this.extent_))},e}(da),hd=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),cd=1,pd="modifystart",fd="modifyend",dd=function(t){function e(e,r,n){var i=t.call(this,e)||this;return i.features=r,i.mapBrowserEvent=n,i}return hd(e,t),e}(I);function _d(t,e){return t.index-e.index}function gd(t,e){var r=e.geometry;if(r.getType()===Yt.CIRCLE){var n=r;if(e.index===cd){var i=Vi(n.getCenter(),t),o=Math.sqrt(i)-n.getRadius();return o*o}}return Zi(t,e.segment)}function yd(t,e){var r=e.geometry;return r.getType()===Yt.CIRCLE&&e.index===cd?r.getClosestPoint(t):ji(t,e.segment)}var vd=function(t){function e(e){var r,n,i=t.call(this,e)||this;if(i.condition_=e.condition?e.condition:ca,i.defaultDeleteCondition_=function(t){return $o(t)&&aa(t)},i.deleteCondition_=e.deleteCondition?e.deleteCondition:i.defaultDeleteCondition_,i.insertVertexCondition_=e.insertVertexCondition?e.insertVertexCondition:ra,i.vertexFeature_=null,i.vertexSegments_=null,i.lastPixel_=[0,0],i.ignoreNextSingleClick_=!1,i.modified_=!1,i.rBush_=new hh,i.pixelTolerance_=void 0!==e.pixelTolerance?e.pixelTolerance:10,i.snappedToVertex_=!1,i.changingFeature_=!1,i.dragSegments_=[],i.overlay_=new ff({source:new fh({useSpatialIndex:!1,wrapX:!!e.wrapX}),style:e.style?e.style:(r=fl(),function(t,e){return r[Yt.POINT]}),updateWhileAnimating:!0,updateWhileInteracting:!0}),i.SEGMENT_WRITERS_={Point:i.writePointGeometry_,LineString:i.writeLineStringGeometry_,LinearRing:i.writeLineStringGeometry_,Polygon:i.writePolygonGeometry_,MultiPoint:i.writeMultiPointGeometry_,MultiLineString:i.writeMultiLineStringGeometry_,MultiPolygon:i.writeMultiPolygonGeometry_,Circle:i.writeCircleGeometry_,GeometryCollection:i.writeGeometryCollectionGeometry_},i.source_=null,e.source?(i.source_=e.source,n=new V(i.source_.getFeatures()),E(i.source_,sh.ADDFEATURE,i.handleSourceAdd_,i),E(i.source_,sh.REMOVEFEATURE,i.handleSourceRemove_,i)):n=e.features,!n)throw new Error("The modify interaction requires features or a source");return i.features_=n,i.features_.forEach(i.addFeature_.bind(i)),E(i.features_,h.ADD,i.handleFeatureAdd_,i),E(i.features_,h.REMOVE,i.handleFeatureRemove_,i),i.lastPointerEvent_=null,i}return hd(e,t),e.prototype.addFeature_=function(t){var e=t.getGeometry();e&&e.getType()in this.SEGMENT_WRITERS_&&this.SEGMENT_WRITERS_[e.getType()].call(this,t,e);var r=this.getMap();r&&r.isRendered()&&this.getActive()&&this.handlePointerAtPixel_(this.lastPixel_,r),E(t,F.CHANGE,this.handleFeatureChange_,this)},e.prototype.willModifyFeatures_=function(t){this.modified_||(this.modified_=!0,this.dispatchEvent(new dd(pd,this.features_,t)))},e.prototype.removeFeature_=function(t){this.removeFeatureSegmentData_(t),this.vertexFeature_&&0===this.features_.getLength()&&(this.overlay_.getSource().removeFeature(this.vertexFeature_),this.vertexFeature_=null),S(t,F.CHANGE,this.handleFeatureChange_,this)},e.prototype.removeFeatureSegmentData_=function(t){var e=this.rBush_,r=[];e.forEach(function(e){t===e.feature&&r.push(e)});for(var n=r.length-1;n>=0;--n){for(var i=r[n],o=this.dragSegments_.length-1;o>=0;--o)this.dragSegments_[o][0]===i&&this.dragSegments_.splice(o,1);e.remove(i)}},e.prototype.setActive=function(e){this.vertexFeature_&&!e&&(this.overlay_.getSource().removeFeature(this.vertexFeature_),this.vertexFeature_=null),t.prototype.setActive.call(this,e)},e.prototype.setMap=function(e){this.overlay_.setMap(e),t.prototype.setMap.call(this,e)},e.prototype.getOverlay=function(){return this.overlay_},e.prototype.handleSourceAdd_=function(t){t.feature&&this.features_.push(t.feature)},e.prototype.handleSourceRemove_=function(t){t.feature&&this.features_.remove(t.feature)},e.prototype.handleFeatureAdd_=function(t){this.addFeature_(t.element)},e.prototype.handleFeatureChange_=function(t){if(!this.changingFeature_){var e=t.target;this.removeFeature_(e),this.addFeature_(e)}},e.prototype.handleFeatureRemove_=function(t){var e=t.element;this.removeFeature_(e)},e.prototype.writePointGeometry_=function(t,e){var r=e.getCoordinates(),n={feature:t,geometry:e,segment:[r,r]};this.rBush_.insert(e.getExtent(),n)},e.prototype.writeMultiPointGeometry_=function(t,e){for(var r=e.getCoordinates(),n=0,i=r.length;n<i;++n){var o=r[n],a={feature:t,geometry:e,depth:[n],index:n,segment:[o,o]};this.rBush_.insert(e.getExtent(),a)}},e.prototype.writeLineStringGeometry_=function(t,e){for(var r=e.getCoordinates(),n=0,i=r.length-1;n<i;++n){var o=r.slice(n,n+2),a={feature:t,geometry:e,index:n,segment:o};this.rBush_.insert(ot(o),a)}},e.prototype.writeMultiLineStringGeometry_=function(t,e){for(var r=e.getCoordinates(),n=0,i=r.length;n<i;++n)for(var o=r[n],a=0,s=o.length-1;a<s;++a){var u=o.slice(a,a+2),l={feature:t,geometry:e,depth:[n],index:a,segment:u};this.rBush_.insert(ot(u),l)}},e.prototype.writePolygonGeometry_=function(t,e){for(var r=e.getCoordinates(),n=0,i=r.length;n<i;++n)for(var o=r[n],a=0,s=o.length-1;a<s;++a){var u=o.slice(a,a+2),l={feature:t,geometry:e,depth:[n],index:a,segment:u};this.rBush_.insert(ot(u),l)}},e.prototype.writeMultiPolygonGeometry_=function(t,e){for(var r=e.getCoordinates(),n=0,i=r.length;n<i;++n)for(var o=r[n],a=0,s=o.length;a<s;++a)for(var u=o[a],l=0,h=u.length-1;l<h;++l){var c=u.slice(l,l+2),p={feature:t,geometry:e,depth:[a,n],index:l,segment:c};this.rBush_.insert(ot(c),p)}},e.prototype.writeCircleGeometry_=function(t,e){var r=e.getCenter(),n={feature:t,geometry:e,index:0,segment:[r,r]},i={feature:t,geometry:e,index:cd,segment:[r,r]},o=[n,i];n.featureSegments=i.featureSegments=o,this.rBush_.insert(gt(r),n),this.rBush_.insert(e.getExtent(),i)},e.prototype.writeGeometryCollectionGeometry_=function(t,e){for(var r=e.getGeometriesArray(),n=0;n<r.length;++n)this.SEGMENT_WRITERS_[r[n].getType()].call(this,t,r[n])},e.prototype.createOrUpdateVertexFeature_=function(t){var e=this.vertexFeature_;e?e.getGeometry().setCoordinates(t):(e=new K(new Cr(t)),this.vertexFeature_=e,this.overlay_.getSource().addFeature(e));return e},e.prototype.handleEvent=function(e){return!e.pointerEvent||(this.lastPointerEvent_=e,e.map.getView().getInteracting()||e.type!=fn.POINTERMOVE||this.handlingDownUpSequence||this.handlePointerMove_(e),this.vertexFeature_&&this.deleteCondition_(e)&&(r=!(e.type!=fn.SINGLECLICK||!this.ignoreNextSingleClick_)||this.removePoint()),e.type==fn.SINGLECLICK&&(this.ignoreNextSingleClick_=!1),t.prototype.handleEvent.call(this,e)&&!r);var r},e.prototype.handleDragEvent=function(t){this.ignoreNextSingleClick_=!1,this.willModifyFeatures_(t);for(var e=t.coordinate,r=0,n=this.dragSegments_.length;r<n;++r){for(var i=this.dragSegments_[r],o=i[0],a=o.depth,s=o.geometry,u=void 0,l=o.segment,h=i[1];e.length<s.getStride();)e.push(l[h][e.length]);switch(s.getType()){case Yt.POINT:u=e,l[0]=l[1]=e;break;case Yt.MULTI_POINT:(u=s.getCoordinates())[o.index]=e,l[0]=l[1]=e;break;case Yt.LINE_STRING:(u=s.getCoordinates())[o.index+h]=e,l[h]=e;break;case Yt.MULTI_LINE_STRING:case Yt.POLYGON:(u=s.getCoordinates())[a[0]][o.index+h]=e,l[h]=e;break;case Yt.MULTI_POLYGON:(u=s.getCoordinates())[a[1]][a[0]][o.index+h]=e,l[h]=e;break;case Yt.CIRCLE:l[0]=l[1]=e,0===o.index?(this.changingFeature_=!0,s.setCenter(e),this.changingFeature_=!1):(this.changingFeature_=!0,s.setRadius(Wi(s.getCenter(),e)),this.changingFeature_=!1)}u&&this.setGeometryCoordinates_(s,u)}this.createOrUpdateVertexFeature_(e)},e.prototype.handleDownEvent=function(t){if(!this.condition_(t))return!1;this.handlePointerAtPixel_(t.pixel,t.map);var e=t.map.getCoordinateFromPixel(t.pixel);this.dragSegments_.length=0,this.modified_=!1;var r=this.vertexFeature_;if(r){var n=[],i=r.getGeometry().getCoordinates(),a=ot([i]),s=this.rBush_.getInExtent(a),u={};s.sort(_d);for(var l=0,h=s.length;l<h;++l){var c=s[l],p=c.segment,f=o(c.feature),d=c.depth;if(d&&(f+="-"+d.join("-")),u[f]||(u[f]=new Array(2)),c.geometry.getType()===Yt.CIRCLE&&c.index===cd)Xi(yd(e,c),i)&&!u[f][0]&&(this.dragSegments_.push([c,0]),u[f][0]=c);else if(Xi(p[0],i)&&!u[f][0])this.dragSegments_.push([c,0]),u[f][0]=c;else if(Xi(p[1],i)&&!u[f][1]){if((c.geometry.getType()===Yt.LINE_STRING||c.geometry.getType()===Yt.MULTI_LINE_STRING)&&u[f][0]&&0===u[f][0].index)continue;this.dragSegments_.push([c,1]),u[f][1]=c}else o(p)in this.vertexSegments_&&!u[f][0]&&!u[f][1]&&this.insertVertexCondition_(t)&&n.push([c,i])}n.length&&this.willModifyFeatures_(t);for(var _=n.length-1;_>=0;--_)this.insertVertex_.apply(this,n[_])}return!!this.vertexFeature_},e.prototype.handleUpEvent=function(t){for(var e=this.dragSegments_.length-1;e>=0;--e){var r=this.dragSegments_[e][0],n=r.geometry;if(n.getType()===Yt.CIRCLE){var i=n.getCenter(),o=r.featureSegments[0],a=r.featureSegments[1];o.segment[0]=o.segment[1]=i,a.segment[0]=a.segment[1]=i,this.rBush_.update(gt(i),o),this.rBush_.update(n.getExtent(),a)}else this.rBush_.update(ot(r.segment),r)}return this.modified_&&(this.dispatchEvent(new dd(fd,this.features_,t)),this.modified_=!1),!1},e.prototype.handlePointerMove_=function(t){this.lastPixel_=t.pixel,this.handlePointerAtPixel_(t.pixel,t.map)},e.prototype.handlePointerAtPixel_=function(t,e){var r=e.getCoordinateFromPixel(t),n=at(gt(r),e.getView().getResolution()*this.pixelTolerance_),i=this.rBush_.getInExtent(n);if(i.length>0){i.sort(function(t,e){return gd(r,t)-gd(r,e)});var a=i[0],s=a.segment,u=yd(r,a),l=e.getPixelFromCoordinate(u),h=Wi(t,l);if(h<=this.pixelTolerance_){var c={};if(a.geometry.getType()===Yt.CIRCLE&&a.index===cd)this.snappedToVertex_=!0,this.createOrUpdateVertexFeature_(u);else{var p=e.getPixelFromCoordinate(s[0]),f=e.getPixelFromCoordinate(s[1]),d=Vi(l,p),_=Vi(l,f);h=Math.sqrt(Math.min(d,_)),this.snappedToVertex_=h<=this.pixelTolerance_,this.snappedToVertex_&&(u=d>_?s[1]:s[0]),this.createOrUpdateVertexFeature_(u);for(var g=1,y=i.length;g<y;++g){var v=i[g].segment;if(!(Xi(s[0],v[0])&&Xi(s[1],v[1])||Xi(s[0],v[1])&&Xi(s[1],v[0])))break;c[o(v)]=!0}}return c[o(s)]=!0,void(this.vertexSegments_=c)}}this.vertexFeature_&&(this.overlay_.getSource().removeFeature(this.vertexFeature_),this.vertexFeature_=null)},e.prototype.insertVertex_=function(t,e){for(var r,n=t.segment,i=t.feature,o=t.geometry,a=t.depth,s=t.index;e.length<o.getStride();)e.push(0);switch(o.getType()){case Yt.MULTI_LINE_STRING:case Yt.POLYGON:(r=o.getCoordinates())[a[0]].splice(s+1,0,e);break;case Yt.MULTI_POLYGON:(r=o.getCoordinates())[a[1]][a[0]].splice(s+1,0,e);break;case Yt.LINE_STRING:(r=o.getCoordinates()).splice(s+1,0,e);break;default:return}this.setGeometryCoordinates_(o,r);var u=this.rBush_;u.remove(t),this.updateSegmentIndices_(o,s,a,1);var l={segment:[n[0],e],feature:i,geometry:o,depth:a,index:s};u.insert(ot(l.segment),l),this.dragSegments_.push([l,1]);var h={segment:[e,n[1]],feature:i,geometry:o,depth:a,index:s+1};u.insert(ot(h.segment),h),this.dragSegments_.push([h,0]),this.ignoreNextSingleClick_=!0},e.prototype.removePoint=function(){if(this.lastPointerEvent_&&this.lastPointerEvent_.type!=fn.POINTERDRAG){var t=this.lastPointerEvent_;this.willModifyFeatures_(t);var e=this.removeVertex_();return this.dispatchEvent(new dd(fd,this.features_,t)),this.modified_=!1,e}return!1},e.prototype.removeVertex_=function(){var t,e,r,n,i,a,s,u,l,h,c,p=this.dragSegments_,f={},d=!1;for(i=p.length-1;i>=0;--i)c=o((h=(r=p[i])[0]).feature),h.depth&&(c+="-"+h.depth.join("-")),c in f||(f[c]={}),0===r[1]?(f[c].right=h,f[c].index=h.index):1==r[1]&&(f[c].left=h,f[c].index=h.index+1);for(c in f){switch(l=f[c].right,s=f[c].left,(u=(a=f[c].index)-1)<0&&(u=0),t=e=(n=(h=void 0!==s?s:l).geometry).getCoordinates(),d=!1,n.getType()){case Yt.MULTI_LINE_STRING:e[h.depth[0]].length>2&&(e[h.depth[0]].splice(a,1),d=!0);break;case Yt.LINE_STRING:e.length>2&&(e.splice(a,1),d=!0);break;case Yt.MULTI_POLYGON:t=t[h.depth[1]];case Yt.POLYGON:(t=t[h.depth[0]]).length>4&&(a==t.length-1&&(a=0),t.splice(a,1),d=!0,0===a&&(t.pop(),t.push(t[0]),u=t.length-1))}if(d){this.setGeometryCoordinates_(n,e);var _=[];if(void 0!==s&&(this.rBush_.remove(s),_.push(s.segment[0])),void 0!==l&&(this.rBush_.remove(l),_.push(l.segment[1])),void 0!==s&&void 0!==l){var g={depth:h.depth,feature:h.feature,geometry:h.geometry,index:u,segment:_};this.rBush_.insert(ot(g.segment),g)}this.updateSegmentIndices_(n,a,h.depth,-1),this.vertexFeature_&&(this.overlay_.getSource().removeFeature(this.vertexFeature_),this.vertexFeature_=null),p.length=0}}return d},e.prototype.setGeometryCoordinates_=function(t,e){this.changingFeature_=!0,t.setCoordinates(e),this.changingFeature_=!1},e.prototype.updateSegmentIndices_=function(t,e,r,n){this.rBush_.forEachInExtent(t.getExtent(),function(i){i.geometry===t&&(void 0===r||void 0===i.depth||et(i.depth,r))&&i.index>e&&(i.index+=n)})},e}(da),md=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),Ed={SELECT:"select"},Td=function(t){function e(e,r,n,i){var o=t.call(this,e)||this;return o.selected=r,o.deselected=n,o.mapBrowserEvent=i,o}return md(e,t),e}(I);function Sd(t){if(!this.condition_(t))return!0;var e=this.addCondition_(t),r=this.removeCondition_(t),n=this.toggleCondition_(t),i=!e&&!r&&!n,o=t.map,a=this.getFeatures(),s=[],u=[];if(i){f(this.featureLayerAssociation_),o.forEachFeatureAtPixel(t.pixel,function(t,e){if(this.filter_(t,e))return u.push(t),this.addFeatureLayerAssociation_(t,e),!this.multi_}.bind(this),{layerFilter:this.layerFilter_,hitTolerance:this.hitTolerance_});for(var l=a.getLength()-1;l>=0;--l){var h=a.item(l),c=u.indexOf(h);c>-1?u.splice(c,1):(a.remove(h),s.push(h))}0!==u.length&&a.extend(u)}else{o.forEachFeatureAtPixel(t.pixel,function(t,i){if(this.filter_(t,i))return!e&&!n||q(a.getArray(),t)?(r||n)&&q(a.getArray(),t)&&(s.push(t),this.removeFeatureLayerAssociation_(t)):(u.push(t),this.addFeatureLayerAssociation_(t,i)),!this.multi_}.bind(this),{layerFilter:this.layerFilter_,hitTolerance:this.hitTolerance_});for(var p=s.length-1;p>=0;--p)a.remove(s[p]);a.extend(u)}return(u.length>0||s.length>0)&&this.dispatchEvent(new Td(Ed.SELECT,u,s,t)),oa(t)}function wd(){var t=fl();return $(t[Yt.POLYGON],t[Yt.LINE_STRING]),$(t[Yt.GEOMETRY_COLLECTION],t[Yt.LINE_STRING]),function(e,r){return e.getGeometry()?t[e.getGeometry().getType()]:null}}var xd=function(t){function e(e){var r=t.call(this,{handleEvent:Sd})||this,n=e||{};r.condition_=n.condition?n.condition:aa,r.addCondition_=n.addCondition?n.addCondition:ia,r.removeCondition_=n.removeCondition?n.removeCondition:ia,r.toggleCondition_=n.toggleCondition?n.toggleCondition:ua,r.multi_=!!n.multi&&n.multi,r.filter_=n.filter?n.filter:C,r.hitTolerance_=n.hitTolerance?n.hitTolerance:0;var i,o=new ff({source:new fh({useSpatialIndex:!1,features:n.features,wrapX:n.wrapX}),style:n.style?n.style:wd(),updateWhileAnimating:!0,updateWhileInteracting:!0});if(r.featureOverlay_=o,n.layers)if("function"==typeof n.layers)i=n.layers;else{var a=n.layers;i=function(t){return q(a,t)}}else i=C;r.layerFilter_=i,r.featureLayerAssociation_={};var s=r.getFeatures();return E(s,h.ADD,r.addFeature_,r),E(s,h.REMOVE,r.removeFeature_,r),r}return md(e,t),e.prototype.addFeatureLayerAssociation_=function(t,e){this.featureLayerAssociation_[o(t)]=e},e.prototype.getFeatures=function(){return this.featureOverlay_.getSource().getFeaturesCollection()},e.prototype.getHitTolerance=function(){return this.hitTolerance_},e.prototype.getLayer=function(t){return this.featureLayerAssociation_[o(t)]},e.prototype.getOverlay=function(){return this.featureOverlay_},e.prototype.setHitTolerance=function(t){this.hitTolerance_=t},e.prototype.setMap=function(e){var r=this.getMap(),n=this.getFeatures();r&&n.forEach(r.unskipFeature.bind(r)),t.prototype.setMap.call(this,e),this.featureOverlay_.setMap(e),e&&n.forEach(e.skipFeature.bind(e))},e.prototype.addFeature_=function(t){var e=this.getMap();e&&e.skipFeature(t.element)},e.prototype.removeFeature_=function(t){var e=this.getMap();e&&e.unskipFeature(t.element)},e.prototype.removeFeatureLayerAssociation_=function(t){delete this.featureLayerAssociation_[o(t)]},e}(Ho),Od=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}();function Cd(t){return t.feature?t.feature:t.element?t.element:void 0}var Rd=function(t){function e(e){var r=this,n=e||{},i=n;return i.handleDownEvent||(i.handleDownEvent=C),i.stopDown||(i.stopDown=R),(r=t.call(this,i)||this).source_=n.source?n.source:null,r.vertex_=void 0===n.vertex||n.vertex,r.edge_=void 0===n.edge||n.edge,r.features_=n.features?n.features:null,r.featuresListenerKeys_=[],r.featureChangeListenerKeys_={},r.indexedFeaturesExtents_={},r.pendingFeatures_={},r.pixelCoordinate_=null,r.pixelTolerance_=void 0!==n.pixelTolerance?n.pixelTolerance:10,r.sortByDistance_=function(t,e){var r=Zi(this.pixelCoordinate_,t.segment),n=Zi(this.pixelCoordinate_,e.segment);return r-n}.bind(r),r.rBush_=new hh,r.SEGMENT_WRITERS_={Point:r.writePointGeometry_,LineString:r.writeLineStringGeometry_,LinearRing:r.writeLineStringGeometry_,Polygon:r.writePolygonGeometry_,MultiPoint:r.writeMultiPointGeometry_,MultiLineString:r.writeMultiLineStringGeometry_,MultiPolygon:r.writeMultiPolygonGeometry_,GeometryCollection:r.writeGeometryCollectionGeometry_,Circle:r.writeCircleGeometry_},r}return Od(e,t),e.prototype.addFeature=function(t,e){var r=void 0===e||e,n=o(t),i=t.getGeometry();if(i){var a=this.SEGMENT_WRITERS_[i.getType()];a&&(this.indexedFeaturesExtents_[n]=i.getExtent([1/0,1/0,-1/0,-1/0]),a.call(this,t,i))}r&&(this.featureChangeListenerKeys_[n]=E(t,F.CHANGE,this.handleFeatureChange_,this))},e.prototype.forEachFeatureAdd_=function(t){this.addFeature(t)},e.prototype.forEachFeatureRemove_=function(t){this.removeFeature(t)},e.prototype.getFeatures_=function(){var t;return this.features_?t=this.features_:this.source_&&(t=this.source_.getFeatures()),t},e.prototype.handleEvent=function(e){var r=this.snapTo(e.pixel,e.coordinate,e.map);return r.snapped&&(e.coordinate=r.vertex.slice(0,2),e.pixel=r.vertexPixel),t.prototype.handleEvent.call(this,e)},e.prototype.handleFeatureAdd_=function(t){var e=Cd(t);this.addFeature(e)},e.prototype.handleFeatureRemove_=function(t){var e=Cd(t);this.removeFeature(e)},e.prototype.handleFeatureChange_=function(t){var e=t.target;if(this.handlingDownUpSequence){var r=o(e);r in this.pendingFeatures_||(this.pendingFeatures_[r]=e)}else this.updateFeature_(e)},e.prototype.handleUpEvent=function(t){var e=d(this.pendingFeatures_);return e.length&&(e.forEach(this.updateFeature_.bind(this)),this.pendingFeatures_={}),!1},e.prototype.removeFeature=function(t,e){var r=void 0===e||e,n=o(t),i=this.indexedFeaturesExtents_[n];if(i){var a=this.rBush_,s=[];a.forEachInExtent(i,function(e){t===e.feature&&s.push(e)});for(var u=s.length-1;u>=0;--u)a.remove(s[u])}r&&(w(this.featureChangeListenerKeys_[n]),delete this.featureChangeListenerKeys_[n])},e.prototype.setMap=function(e){var r=this.getMap(),n=this.featuresListenerKeys_,i=this.getFeatures_();r&&(n.forEach(w),n.length=0,i.forEach(this.forEachFeatureRemove_.bind(this))),t.prototype.setMap.call(this,e),e&&(this.features_?n.push(E(this.features_,h.ADD,this.handleFeatureAdd_,this),E(this.features_,h.REMOVE,this.handleFeatureRemove_,this)):this.source_&&n.push(E(this.source_,sh.ADDFEATURE,this.handleFeatureAdd_,this),E(this.source_,sh.REMOVEFEATURE,this.handleFeatureRemove_,this)),i.forEach(this.forEachFeatureAdd_.bind(this)))},e.prototype.snapTo=function(t,e,r){var n=ot([r.getCoordinateFromPixel([t[0]-this.pixelTolerance_,t[1]+this.pixelTolerance_]),r.getCoordinateFromPixel([t[0]+this.pixelTolerance_,t[1]-this.pixelTolerance_])]),i=this.rBush_.getInExtent(n);this.vertex_&&!this.edge_&&(i=i.filter(function(t){return t.feature.getGeometry().getType()!==Yt.CIRCLE}));var o,a,s,u,l=!1,h=null,c=null;if(i.length>0){this.pixelCoordinate_=e,i.sort(this.sortByDistance_);var p=i[0].segment,f=i[0].feature.getGeometry().getType()===Yt.CIRCLE;this.vertex_&&!this.edge_?(o=r.getPixelFromCoordinate(p[0]),a=r.getPixelFromCoordinate(p[1]),s=Vi(t,o),u=Vi(t,a),Math.sqrt(Math.min(s,u))<=this.pixelTolerance_&&(l=!0,h=s>u?p[1]:p[0],c=r.getPixelFromCoordinate(h))):this.edge_&&(h=f?function(t,e){var r=e.getRadius(),n=e.getCenter(),i=n[0],o=n[1],a=t[0]-i,s=t[1]-o;0===a&&0===s&&(a=1);var u=Math.sqrt(a*a+s*s);return[i+r*a/u,o+r*s/u]}(e,i[0].feature.getGeometry()):ji(e,p),Wi(t,c=r.getPixelFromCoordinate(h))<=this.pixelTolerance_&&(l=!0,this.vertex_&&!f&&(o=r.getPixelFromCoordinate(p[0]),a=r.getPixelFromCoordinate(p[1]),s=Vi(c,o),u=Vi(c,a),Math.sqrt(Math.min(s,u))<=this.pixelTolerance_&&(h=s>u?p[1]:p[0],c=r.getPixelFromCoordinate(h))))),l&&(c=[Math.round(c[0]),Math.round(c[1])])}return{snapped:l,vertex:h,vertexPixel:c}},e.prototype.updateFeature_=function(t){this.removeFeature(t,!1),this.addFeature(t,!1)},e.prototype.writeCircleGeometry_=function(t,e){for(var r=Vr(e).getCoordinates()[0],n=0,i=r.length-1;n<i;++n){var o=r.slice(n,n+2),a={feature:t,segment:o};this.rBush_.insert(ot(o),a)}},e.prototype.writeGeometryCollectionGeometry_=function(t,e){for(var r=e.getGeometriesArray(),n=0;n<r.length;++n){var i=this.SEGMENT_WRITERS_[r[n].getType()];i&&i.call(this,t,r[n])}},e.prototype.writeLineStringGeometry_=function(t,e){for(var r=e.getCoordinates(),n=0,i=r.length-1;n<i;++n){var o=r.slice(n,n+2),a={feature:t,segment:o};this.rBush_.insert(ot(o),a)}},e.prototype.writeMultiLineStringGeometry_=function(t,e){for(var r=e.getCoordinates(),n=0,i=r.length;n<i;++n)for(var o=r[n],a=0,s=o.length-1;a<s;++a){var u=o.slice(a,a+2),l={feature:t,segment:u};this.rBush_.insert(ot(u),l)}},e.prototype.writeMultiPointGeometry_=function(t,e){for(var r=e.getCoordinates(),n=0,i=r.length;n<i;++n){var o=r[n],a={feature:t,segment:[o,o]};this.rBush_.insert(e.getExtent(),a)}},e.prototype.writeMultiPolygonGeometry_=function(t,e){for(var r=e.getCoordinates(),n=0,i=r.length;n<i;++n)for(var o=r[n],a=0,s=o.length;a<s;++a)for(var u=o[a],l=0,h=u.length-1;l<h;++l){var c=u.slice(l,l+2),p={feature:t,segment:c};this.rBush_.insert(ot(c),p)}},e.prototype.writePointGeometry_=function(t,e){var r=e.getCoordinates(),n={feature:t,segment:[r,r]};this.rBush_.insert(e.getExtent(),n)},e.prototype.writePolygonGeometry_=function(t,e){for(var r=e.getCoordinates(),n=0,i=r.length;n<i;++n)for(var o=r[n],a=0,s=o.length-1;a<s;++a){var u=o.slice(a,a+2),l={feature:t,segment:u};this.rBush_.insert(ot(u),l)}},e}(da),Pd=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),bd="translatestart",Id="translating",Ld="translateend",Md=function(t){function e(e,r,n){var i=t.call(this,e)||this;return i.features=r,i.coordinate=n,i}return Pd(e,t),e}(I),Fd=function(t){function e(e){var r,n=this,i=e||{};if((n=t.call(this,i)||this).lastCoordinate_=null,n.features_=void 0!==i.features?i.features:null,i.layers)if("function"==typeof i.layers)r=i.layers;else{var o=i.layers;r=function(t){return q(o,t)}}else r=C;return n.layerFilter_=r,n.hitTolerance_=i.hitTolerance?i.hitTolerance:0,n.lastFeature_=null,E(n,U(Wo.ACTIVE),n.handleActiveChanged_,n),n}return Pd(e,t),e.prototype.handleDownEvent=function(t){if(this.lastFeature_=this.featuresAtPixel_(t.pixel,t.map),!this.lastCoordinate_&&this.lastFeature_){this.lastCoordinate_=t.coordinate,this.handleMoveEvent(t);var e=this.features_||new V([this.lastFeature_]);return this.dispatchEvent(new Md(bd,e,t.coordinate)),!0}return!1},e.prototype.handleUpEvent=function(t){if(this.lastCoordinate_){this.lastCoordinate_=null,this.handleMoveEvent(t);var e=this.features_||new V([this.lastFeature_]);return this.dispatchEvent(new Md(Ld,e,t.coordinate)),!0}return!1},e.prototype.handleDragEvent=function(t){if(this.lastCoordinate_){var e=t.coordinate,r=e[0]-this.lastCoordinate_[0],n=e[1]-this.lastCoordinate_[1],i=this.features_||new V([this.lastFeature_]);i.forEach(function(t){var e=t.getGeometry();e.translate(r,n),t.setGeometry(e)}),this.lastCoordinate_=e,this.dispatchEvent(new Md(Id,i,e))}},e.prototype.handleMoveEvent=function(t){var e=t.map.getViewport();this.featuresAtPixel_(t.pixel,t.map)?(e.classList.remove(this.lastCoordinate_?"ol-grab":"ol-grabbing"),e.classList.add(this.lastCoordinate_?"ol-grabbing":"ol-grab")):e.classList.remove("ol-grab","ol-grabbing")},e.prototype.featuresAtPixel_=function(t,e){return e.forEachFeatureAtPixel(t,function(t){if(!this.features_||q(this.features_.getArray(),t))return t}.bind(this),{layerFilter:this.layerFilter_,hitTolerance:this.hitTolerance_})},e.prototype.getHitTolerance=function(){return this.hitTolerance_},e.prototype.setHitTolerance=function(t){this.hitTolerance_=t},e.prototype.setMap=function(e){var r=this.getMap();t.prototype.setMap.call(this,e),this.updateState_(r)},e.prototype.handleActiveChanged_=function(){this.updateState_(null)},e.prototype.updateState_=function(t){var e=this.getMap(),r=this.getActive();e&&r||(e=e||t)&&e.getViewport().classList.remove("ol-grab","ol-grabbing")},e}(da),Ad=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}();function Nd(t){for(var e=[],r=0,n=t.length;r<n;++r)e.push(t[r].clone());return e}var Gd=function(t){function e(e){var r=t.call(this)||this;return r.geometries_=e||null,r.listenGeometriesChange_(),r}return Ad(e,t),e.prototype.unlistenGeometriesChange_=function(){if(this.geometries_)for(var t=0,e=this.geometries_.length;t<e;++t)S(this.geometries_[t],F.CHANGE,this.changed,this)},e.prototype.listenGeometriesChange_=function(){if(this.geometries_)for(var t=0,e=this.geometries_.length;t<e;++t)E(this.geometries_[t],F.CHANGE,this.changed,this)},e.prototype.clone=function(){var t=new e(null);return t.setGeometries(this.geometries_),t},e.prototype.closestPointXY=function(t,e,r,n){if(n<ut(this.getExtent(),t,e))return n;for(var i=this.geometries_,o=0,a=i.length;o<a;++o)n=i[o].closestPointXY(t,e,r,n);return n},e.prototype.containsXY=function(t,e){for(var r=this.geometries_,n=0,i=r.length;n<i;++n)if(r[n].containsXY(t,e))return!0;return!1},e.prototype.computeExtent=function(t){_t(t);for(var e=this.geometries_,r=0,n=e.length;r<n;++r)mt(t,e[r].getExtent());return t},e.prototype.getGeometries=function(){return Nd(this.geometries_)},e.prototype.getGeometriesArray=function(){return this.geometries_},e.prototype.getSimplifiedGeometry=function(t){if(this.simplifiedGeometryRevision!=this.getRevision()&&(f(this.simplifiedGeometryCache),this.simplifiedGeometryMaxMinSquaredTolerance=0,this.simplifiedGeometryRevision=this.getRevision()),t<0||0!==this.simplifiedGeometryMaxMinSquaredTolerance&&t<this.simplifiedGeometryMaxMinSquaredTolerance)return this;var r=t.toString();if(this.simplifiedGeometryCache.hasOwnProperty(r))return this.simplifiedGeometryCache[r];for(var n=[],i=this.geometries_,o=!1,a=0,s=i.length;a<s;++a){var u=i[a],l=u.getSimplifiedGeometry(t);n.push(l),l!==u&&(o=!0)}if(o){var h=new e(null);return h.setGeometriesArray(n),this.simplifiedGeometryCache[r]=h,h}return this.simplifiedGeometryMaxMinSquaredTolerance=t,this},e.prototype.getType=function(){return Yt.GEOMETRY_COLLECTION},e.prototype.intersectsExtent=function(t){for(var e=this.geometries_,r=0,n=e.length;r<n;++r)if(e[r].intersectsExtent(t))return!0;return!1},e.prototype.isEmpty=function(){return 0===this.geometries_.length},e.prototype.rotate=function(t,e){for(var r=this.geometries_,n=0,i=r.length;n<i;++n)r[n].rotate(t,e);this.changed()},e.prototype.scale=function(t,e,r){var n=r;n||(n=Pt(this.getExtent()));for(var i=this.geometries_,o=0,a=i.length;o<a;++o)i[o].scale(t,e,n);this.changed()},e.prototype.setGeometries=function(t){this.setGeometriesArray(Nd(t))},e.prototype.setGeometriesArray=function(t){this.unlistenGeometriesChange_(),this.geometries_=t,this.listenGeometriesChange_(),this.changed()},e.prototype.applyTransform=function(t){for(var e=this.geometries_,r=0,n=e.length;r<n;++r)e[r].applyTransform(t);this.changed()},e.prototype.translate=function(t,e){for(var r=this.geometries_,n=0,i=r.length;n<i;++n)r[n].translate(t,e);this.changed()},e.prototype.disposeInternal=function(){this.unlistenGeometriesChange_(),t.prototype.disposeInternal.call(this)},e}(er),Dd=function(){function t(){this.dataProjection=null,this.defaultFeatureProjection=null}return t.prototype.getReadOptions=function(t,e){var r;return e&&(r={dataProjection:e.dataProjection?e.dataProjection:this.readProjection(t),featureProjection:e.featureProjection}),this.adaptOptions(r)},t.prototype.adaptOptions=function(t){return p({dataProjection:this.dataProjection,featureProjection:this.defaultFeatureProjection},t)},t.prototype.getType=function(){return n()},t.prototype.readFeature=function(t,e){return n()},t.prototype.readFeatures=function(t,e){return n()},t.prototype.readGeometry=function(t,e){return n()},t.prototype.readProjection=function(t){return n()},t.prototype.writeFeature=function(t,e){return n()},t.prototype.writeFeatures=function(t,e){return n()},t.prototype.writeGeometry=function(t,e){return n()},t}();function kd(t,e,r){var n,i=r?Ie(r.featureProjection):null,o=r?Ie(r.dataProjection):null;if(n=i&&o&&!Ge(i,o)?(e?t.clone():t).transform(e?i:o,e?o:i):t,e&&r&&void 0!==r.decimals){var a=Math.pow(10,r.decimals);n===t&&(n=t.clone()),n.applyTransform(function(t){for(var e=0,r=t.length;e<r;++e)t[e]=Math.round(t[e]*a)/a;return t})}return n}function jd(t,e){var r=e?Ie(e.featureProjection):null,n=e?Ie(e.dataProjection):null;return r&&n&&!Ge(r,n)?Ue(t,n,r):t}var Ud=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}();function Yd(t){if("string"==typeof t){var e=JSON.parse(t);return e||null}return null!==t?t:null}var Xd=function(t){function e(){return t.call(this)||this}return Ud(e,t),e.prototype.getType=function(){return gs.JSON},e.prototype.readFeature=function(t,e){return this.readFeatureFromObject(Yd(t),this.getReadOptions(t,e))},e.prototype.readFeatures=function(t,e){return this.readFeaturesFromObject(Yd(t),this.getReadOptions(t,e))},e.prototype.readFeatureFromObject=function(t,e){return n()},e.prototype.readFeaturesFromObject=function(t,e){return n()},e.prototype.readGeometry=function(t,e){return this.readGeometryFromObject(Yd(t),this.getReadOptions(t,e))},e.prototype.readGeometryFromObject=function(t,e){return n()},e.prototype.readProjection=function(t){return this.readProjectionFromObject(Yd(t))},e.prototype.readProjectionFromObject=function(t){return n()},e.prototype.writeFeature=function(t,e){return JSON.stringify(this.writeFeatureObject(t,e))},e.prototype.writeFeatureObject=function(t,e){return n()},e.prototype.writeFeatures=function(t,e){return JSON.stringify(this.writeFeaturesObject(t,e))},e.prototype.writeFeaturesObject=function(t,e){return n()},e.prototype.writeGeometry=function(t,e){return JSON.stringify(this.writeGeometryObject(t,e))},e.prototype.writeGeometryObject=function(t,e){return n()},e}(Dd),Bd=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),zd={};zd[Yt.POINT]=function(t){var e;e=void 0!==t.m&&void 0!==t.z?new Cr([t.x,t.y,t.z,t.m],Ut.XYZM):void 0!==t.z?new Cr([t.x,t.y,t.z],Ut.XYZ):void 0!==t.m?new Cr([t.x,t.y,t.m],Ut.XYM):new Cr([t.x,t.y]);return e},zd[Yt.LINE_STRING]=function(t){var e=Zd(t);return new yf(t.paths[0],e)},zd[Yt.POLYGON]=function(t){var e=Zd(t);return new Xr(t.rings,e)},zd[Yt.MULTI_POINT]=function(t){var e=Zd(t);return new Zf(t.points,e)},zd[Yt.MULTI_LINE_STRING]=function(t){var e=Zd(t);return new Vf(t.paths,e)},zd[Yt.MULTI_POLYGON]=function(t){var e=Zd(t);return new qf(t.rings,e)};var Vd={};function Wd(t,e){if(!t)return null;var r;if("number"==typeof t.x&&"number"==typeof t.y)r=Yt.POINT;else if(t.points)r=Yt.MULTI_POINT;else if(t.paths){r=1===t.paths.length?Yt.LINE_STRING:Yt.MULTI_LINE_STRING}else if(t.rings){var n=t,i=Zd(n),o=function(t,e){var r,n,i=[],o=[],a=[];for(r=0,n=t.length;r<n;++r){i.length=0,fr(i,0,t[r],e.length);var s=Gr(i,0,i.length,e.length);s?o.push([t[r]]):a.push(t[r])}for(;a.length;){var u=a.shift(),l=!1;for(r=o.length-1;r>=0;r--){var h=o[r][0],c=ht(new xr(h).getExtent(),new xr(u).getExtent());if(c){o[r].push(u),l=!0;break}}l||o.push([u.reverse()])}return o}(n.rings,i);1===o.length?(r=Yt.POLYGON,t.rings=o[0]):(r=Yt.MULTI_POLYGON,t.rings=o)}return kd((0,zd[r])(t),!1,e)}function Zd(t){var e=Ut.XY;return!0===t.hasZ&&!0===t.hasM?e=Ut.XYZM:!0===t.hasZ?e=Ut.XYZ:!0===t.hasM&&(e=Ut.XYM),e}function Kd(t){var e=t.getLayout();return{hasZ:e===Ut.XYZ||e===Ut.XYZM,hasM:e===Ut.XYM||e===Ut.XYZM}}function Hd(t,e){return(0,Vd[t.getType()])(kd(t,!0,e),e)}Vd[Yt.POINT]=function(t,e){var r,n=t.getCoordinates(),i=t.getLayout();i===Ut.XYZ?r={x:n[0],y:n[1],z:n[2]}:i===Ut.XYM?r={x:n[0],y:n[1],m:n[2]}:i===Ut.XYZM?r={x:n[0],y:n[1],z:n[2],m:n[3]}:i===Ut.XY?r={x:n[0],y:n[1]}:W(!1,34);return r},Vd[Yt.LINE_STRING]=function(t,e){var r=Kd(t);return{hasZ:r.hasZ,hasM:r.hasM,paths:[t.getCoordinates()]}},Vd[Yt.POLYGON]=function(t,e){var r=Kd(t);return{hasZ:r.hasZ,hasM:r.hasM,rings:t.getCoordinates(!1)}},Vd[Yt.MULTI_POINT]=function(t,e){var r=Kd(t);return{hasZ:r.hasZ,hasM:r.hasM,points:t.getCoordinates()}},Vd[Yt.MULTI_LINE_STRING]=function(t,e){var r=Kd(t);return{hasZ:r.hasZ,hasM:r.hasM,paths:t.getCoordinates()}},Vd[Yt.MULTI_POLYGON]=function(t,e){for(var r=Kd(t),n=t.getCoordinates(!1),i=[],o=0;o<n.length;o++)for(var a=n[o].length-1;a>=0;a--)i.push(n[o][a]);return{hasZ:r.hasZ,hasM:r.hasM,rings:i}};var qd=function(t){function e(e){var r=this,n=e||{};return(r=t.call(this)||this).geometryName_=n.geometryName,r}return Bd(e,t),e.prototype.readFeatureFromObject=function(t,e){var r=t,n=Wd(r.geometry,e),i=new K;return this.geometryName_&&i.setGeometryName(this.geometryName_),i.setGeometry(n),e&&e.idField&&r.attributes[e.idField]&&i.setId(r.attributes[e.idField]),r.attributes&&i.setProperties(r.attributes,!0),i},e.prototype.readFeaturesFromObject=function(t,e){var r=e||{};if(t.features){var n=[],i=t.features;r.idField=t.objectIdFieldName;for(var o=0,a=i.length;o<a;++o)n.push(this.readFeatureFromObject(i[o],r));return n}return[this.readFeatureFromObject(t,r)]},e.prototype.readGeometryFromObject=function(t,e){return Wd(t,e)},e.prototype.readProjectionFromObject=function(t){return t.spatialReference&&void 0!==t.spatialReference.wkid?Ie("EPSG:"+t.spatialReference.wkid):null},e.prototype.writeGeometryObject=function(t,e){return Hd(t,this.adaptOptions(e))},e.prototype.writeFeatureObject=function(t,e){e=this.adaptOptions(e);var r={},n=t.getGeometry();n&&(r.geometry=Hd(n,e),e&&e.featureProjection&&(r.geometry.spatialReference={wkid:Number(Ie(e.featureProjection).getCode().split(":").pop())}));var i=t.getProperties();return delete i[t.getGeometryName()],_(i)?r.attributes={}:r.attributes=i,r},e.prototype.writeFeaturesObject=function(t,e){e=this.adaptOptions(e);for(var r=[],n=0,i=t.length;n<i;++n)r.push(this.writeFeatureObject(t[n],e));return{features:r}},e}(Xd),Jd=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),Qd=function(t){function e(){var e=t.call(this)||this;return e.xmlSerializer_=new XMLSerializer,e}return Jd(e,t),e.prototype.getType=function(){return gs.XML},e.prototype.readFeature=function(t,e){if(t){if("string"==typeof t){var r=lu(t);return this.readFeatureFromDocument(r,e)}return uu(t)?this.readFeatureFromDocument(t,e):this.readFeatureFromNode(t,e)}return null},e.prototype.readFeatureFromDocument=function(t,e){var r=this.readFeaturesFromDocument(t,e);return r.length>0?r[0]:null},e.prototype.readFeatureFromNode=function(t,e){return null},e.prototype.readFeatures=function(t,e){if(t){if("string"==typeof t){var r=lu(t);return this.readFeaturesFromDocument(r,e)}return uu(t)?this.readFeaturesFromDocument(t,e):this.readFeaturesFromNode(t,e)}return[]},e.prototype.readFeaturesFromDocument=function(t,e){for(var r=[],n=t.firstChild;n;n=n.nextSibling)n.nodeType==Node.ELEMENT_NODE&&$(r,this.readFeaturesFromNode(n,e));return r},e.prototype.readFeaturesFromNode=function(t,e){return n()},e.prototype.readGeometry=function(t,e){if(t){if("string"==typeof t){var r=lu(t);return this.readGeometryFromDocument(r,e)}return uu(t)?this.readGeometryFromDocument(t,e):this.readGeometryFromNode(t,e)}return null},e.prototype.readGeometryFromDocument=function(t,e){return null},e.prototype.readGeometryFromNode=function(t,e){return null},e.prototype.readProjection=function(t){if(t){if("string"==typeof t){var e=lu(t);return this.readProjectionFromDocument(e)}return uu(t)?this.readProjectionFromDocument(t):this.readProjectionFromNode(t)}return null},e.prototype.readProjectionFromDocument=function(t){return this.dataProjection},e.prototype.readProjectionFromNode=function(t){return this.dataProjection},e.prototype.writeFeature=function(t,e){var r=this.writeFeatureNode(t,e);return this.xmlSerializer_.serializeToString(r)},e.prototype.writeFeatureNode=function(t,e){return null},e.prototype.writeFeatures=function(t,e){var r=this.writeFeaturesNode(t,e);return this.xmlSerializer_.serializeToString(r)},e.prototype.writeFeaturesNode=function(t,e){return null},e.prototype.writeGeometry=function(t,e){var r=this.writeGeometryNode(t,e);return this.xmlSerializer_.serializeToString(r)},e.prototype.writeGeometryNode=function(t,e){return null},e}(Dd),$d=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),t_="http://www.opengis.net/gml",e_=/^[\s\xa0]*$/,r_=function(t){function e(e){var r=t.call(this)||this,n=e||{};return r.featureType=n.featureType,r.featureNS=n.featureNS,r.srsName=n.srsName,r.schemaLocation="",r.FEATURE_COLLECTION_PARSERS={},r.FEATURE_COLLECTION_PARSERS[r.namespace]={featureMember:cu(r.readFeaturesInternal),featureMembers:pu(r.readFeaturesInternal)},r}return $d(e,t),e.prototype.readFeaturesInternal=function(t,e){var r=t.localName,n=null;if("FeatureCollection"==r)n=Su([],this.FEATURE_COLLECTION_PARSERS,t,e,this);else if("featureMembers"==r||"featureMember"==r){var i=e[0],o=i.featureType,a=i.featureNS;if(!o&&t.childNodes){o=[],a={};for(var s=0,u=t.childNodes.length;s<u;++s){var l=t.childNodes[s];if(1===l.nodeType){var h=l.nodeName.split(":").pop();if(-1===o.indexOf(h)){var c="",p=0,f=l.namespaceURI;for(var d in a){if(a[d]===f){c=d;break}++p}c||(a[c="p"+p]=f),o.push(c+":"+h)}}}"featureMember"!=r&&(i.featureType=o,i.featureNS=a)}if("string"==typeof a){var _=a;(a={}).p0=_}var g={},y=Array.isArray(o)?o:[o];for(var v in a){var m={};for(s=0,u=y.length;s<u;++s){(-1===y[s].indexOf(":")?"p0":y[s].split(":")[0])===v&&(m[y[s].split(":").pop()]="featureMembers"==r?cu(this.readFeatureElement,this):pu(this.readFeatureElement,this))}g[a[v]]=m}n=Su("featureMember"==r?void 0:[],g,t,e)}return null===n&&(n=[]),n},e.prototype.readGeometryElement=function(t,e){var r=e[0];r.srsName=t.firstElementChild.getAttribute("srsName"),r.srsDimension=t.firstElementChild.getAttribute("srsDimension");var n=Su(null,this.GEOMETRY_PARSERS,t,e,this);return n?Array.isArray(n)?jd(n,r):kd(n,!1,r):void 0},e.prototype.readFeatureElementInternal=function(t,e,r){for(var n,i={},o=t.firstElementChild;o;o=o.nextElementSibling){var a=void 0,s=o.localName;0===o.childNodes.length||1===o.childNodes.length&&(3===o.firstChild.nodeType||4===o.firstChild.nodeType)?(a=su(o,!1),e_.test(a)&&(a=void 0)):(r&&(a=this.readGeometryElement(o,e)),a?"boundedBy"!==s&&(n=s):a=this.readFeatureElementInternal(o,e,!1)),i[s]?(i[s]instanceof Array||(i[s]=[i[s]]),i[s].push(a)):i[s]=a;var u=o.attributes.length;if(u>0){i[s]={_content_:i[s]};for(var l=0;l<u;l++){var h=o.attributes[l].name;i[s][h]=o.attributes[l].value}}}if(r){var c=new K(i);n&&c.setGeometryName(n);var p=t.getAttribute("fid")||function(t,e,r){return t.getAttributeNS(e,r)||""}(t,this.namespace,"id");return p&&c.setId(p),c}return i},e.prototype.readFeatureElement=function(t,e){return this.readFeatureElementInternal(t,e,!0)},e.prototype.readPoint=function(t,e){var r=this.readFlatCoordinatesFromNode_(t,e);if(r)return new Cr(r,Ut.XYZ)},e.prototype.readMultiPoint=function(t,e){var r=Su([],this.MULTIPOINT_PARSERS_,t,e,this);return r?new Zf(r):void 0},e.prototype.readMultiLineString=function(t,e){var r=Su([],this.MULTILINESTRING_PARSERS_,t,e,this);if(r)return new Vf(r)},e.prototype.readMultiPolygon=function(t,e){var r=Su([],this.MULTIPOLYGON_PARSERS_,t,e,this);if(r)return new qf(r)},e.prototype.pointMemberParser_=function(t,e){Tu(this.POINTMEMBER_PARSERS_,t,e,this)},e.prototype.lineStringMemberParser_=function(t,e){Tu(this.LINESTRINGMEMBER_PARSERS_,t,e,this)},e.prototype.polygonMemberParser_=function(t,e){Tu(this.POLYGONMEMBER_PARSERS_,t,e,this)},e.prototype.readLineString=function(t,e){var r=this.readFlatCoordinatesFromNode_(t,e);return r?new yf(r,Ut.XYZ):void 0},e.prototype.readFlatLinearRing_=function(t,e){var r=Su(null,this.GEOMETRY_FLAT_COORDINATES_PARSERS,t,e,this);return r||void 0},e.prototype.readLinearRing=function(t,e){var r=this.readFlatCoordinatesFromNode_(t,e);if(r)return new xr(r,Ut.XYZ)},e.prototype.readPolygon=function(t,e){var r=Su([null],this.FLAT_LINEAR_RINGS_PARSERS,t,e,this);if(r&&r[0]){var n,i=r[0],o=[i.length],a=void 0;for(a=1,n=r.length;a<n;++a)$(i,r[a]),o.push(i.length);return new Xr(i,Ut.XYZ,o)}},e.prototype.readFlatCoordinatesFromNode_=function(t,e){return Su(null,this.GEOMETRY_FLAT_COORDINATES_PARSERS,t,e,this)},e.prototype.readGeometryFromNode=function(t,e){var r=this.readGeometryElement(t,[this.getReadOptions(t,e||{})]);return r||null},e.prototype.readFeaturesFromNode=function(t,e){var r={featureType:this.featureType,featureNS:this.featureNS};return e&&p(r,this.getReadOptions(t,e)),this.readFeaturesInternal(t,[r])||[]},e.prototype.readProjectionFromNode=function(t){return Ie(this.srsName?this.srsName:t.firstElementChild.getAttribute("srsName"))},e}(Qd);r_.prototype.namespace=t_,r_.prototype.FLAT_LINEAR_RINGS_PARSERS={"http://www.opengis.net/gml":{}},r_.prototype.GEOMETRY_FLAT_COORDINATES_PARSERS={"http://www.opengis.net/gml":{}},r_.prototype.GEOMETRY_PARSERS={"http://www.opengis.net/gml":{}},r_.prototype.MULTIPOINT_PARSERS_={"http://www.opengis.net/gml":{pointMember:cu(r_.prototype.pointMemberParser_),pointMembers:cu(r_.prototype.pointMemberParser_)}},r_.prototype.MULTILINESTRING_PARSERS_={"http://www.opengis.net/gml":{lineStringMember:cu(r_.prototype.lineStringMemberParser_),lineStringMembers:cu(r_.prototype.lineStringMemberParser_)}},r_.prototype.MULTIPOLYGON_PARSERS_={"http://www.opengis.net/gml":{polygonMember:cu(r_.prototype.polygonMemberParser_),polygonMembers:cu(r_.prototype.polygonMemberParser_)}},r_.prototype.POINTMEMBER_PARSERS_={"http://www.opengis.net/gml":{Point:cu(r_.prototype.readFlatCoordinatesFromNode_)}},r_.prototype.LINESTRINGMEMBER_PARSERS_={"http://www.opengis.net/gml":{LineString:cu(r_.prototype.readLineString)}},r_.prototype.POLYGONMEMBER_PARSERS_={"http://www.opengis.net/gml":{Polygon:cu(r_.prototype.readPolygon)}},r_.prototype.RING_PARSERS={"http://www.opengis.net/gml":{LinearRing:pu(r_.prototype.readFlatLinearRing_)}};var n_=r_;function i_(t){return o_(su(t,!1))}function o_(t){var e=/^\s*(true|1)|(false|0)\s*$/.exec(t);return e?void 0!==e[1]||!1:void 0}function a_(t){var e=su(t,!1),r=Date.parse(e);return isNaN(r)?void 0:r/1e3}function s_(t){return u_(su(t,!1))}function u_(t){var e=/^\s*([+\-]?\d*\.?\d+(?:e[+\-]?\d+)?)\s*$/i.exec(t);return e?parseFloat(e[1]):void 0}function l_(t){return h_(su(t,!1))}function h_(t){var e=/^\s*(\d+)\s*$/.exec(t);return e?parseInt(e[1],10):void 0}function c_(t){return su(t,!1).trim()}function p_(t,e){__(t,e?"1":"0")}function f_(t,e){var r=e.toPrecision();t.appendChild(iu.createTextNode(r))}function d_(t,e){var r=e.toString();t.appendChild(iu.createTextNode(r))}function __(t,e){t.appendChild(iu.createTextNode(e))}var g_=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),y_=t_+" http://schemas.opengis.net/gml/3.1.1/profiles/gmlsfProfile/1.0.0/gmlsf.xsd",v_={MultiLineString:"lineStringMember",MultiCurve:"curveMember",MultiPolygon:"polygonMember",MultiSurface:"surfaceMember"},m_=function(t){function e(e){var r=this,n=e||{};return(r=t.call(this,n)||this).surface_=void 0!==n.surface&&n.surface,r.curve_=void 0!==n.curve&&n.curve,r.multiCurve_=void 0===n.multiCurve||n.multiCurve,r.multiSurface_=void 0===n.multiSurface||n.multiSurface,r.schemaLocation=n.schemaLocation?n.schemaLocation:y_,r.hasZ=void 0!==n.hasZ&&n.hasZ,r}return g_(e,t),e.prototype.readMultiCurve_=function(t,e){var r=Su([],this.MULTICURVE_PARSERS_,t,e,this);return r?new Vf(r):void 0},e.prototype.readMultiSurface_=function(t,e){var r=Su([],this.MULTISURFACE_PARSERS_,t,e,this);if(r)return new qf(r)},e.prototype.curveMemberParser_=function(t,e){Tu(this.CURVEMEMBER_PARSERS_,t,e,this)},e.prototype.surfaceMemberParser_=function(t,e){Tu(this.SURFACEMEMBER_PARSERS_,t,e,this)},e.prototype.readPatch_=function(t,e){return Su([null],this.PATCHES_PARSERS_,t,e,this)},e.prototype.readSegment_=function(t,e){return Su([null],this.SEGMENTS_PARSERS_,t,e,this)},e.prototype.readPolygonPatch_=function(t,e){return Su([null],this.FLAT_LINEAR_RINGS_PARSERS,t,e,this)},e.prototype.readLineStringSegment_=function(t,e){return Su([null],this.GEOMETRY_FLAT_COORDINATES_PARSERS,t,e,this)},e.prototype.interiorParser_=function(t,e){var r=Su(void 0,this.RING_PARSERS,t,e,this);r&&e[e.length-1].push(r)},e.prototype.exteriorParser_=function(t,e){var r=Su(void 0,this.RING_PARSERS,t,e,this);r&&(e[e.length-1][0]=r)},e.prototype.readSurface_=function(t,e){var r=Su([null],this.SURFACE_PARSERS_,t,e,this);if(r&&r[0]){var n,i=r[0],o=[i.length],a=void 0;for(a=1,n=r.length;a<n;++a)$(i,r[a]),o.push(i.length);return new Xr(i,Ut.XYZ,o)}},e.prototype.readCurve_=function(t,e){var r=Su([null],this.CURVE_PARSERS_,t,e,this);return r?new yf(r,Ut.XYZ):void 0},e.prototype.readEnvelope_=function(t,e){var r=Su([null],this.ENVELOPE_PARSERS_,t,e,this);return dt(r[1][0],r[1][1],r[2][0],r[2][1])},e.prototype.readFlatPos_=function(t,e){for(var r,n=su(t,!1),i=/^\s*([+\-]?\d*\.?\d+(?:[eE][+\-]?\d+)?)\s*/,o=[];r=i.exec(n);)o.push(parseFloat(r[1])),n=n.substr(r[0].length);if(""===n){var a=e[0].srsName,s="enu";if(a)s=Ie(a).getAxisOrientation();if("neu"===s){var u,l=void 0;for(l=0,u=o.length;l<u;l+=3){var h=o[l],c=o[l+1];o[l]=c,o[l+1]=h}}var p=o.length;if(2==p&&o.push(0),0!==p)return o}},e.prototype.readFlatPosList_=function(t,e){var r=su(t,!1).replace(/^\s*|\s*$/g,""),n=e[0],i=n.srsName,o=n.srsDimension,a="enu";i&&(a=Ie(i).getAxisOrientation());var s,u,l,h=r.split(/\s+/),c=2;t.getAttribute("srsDimension")?c=h_(t.getAttribute("srsDimension")):t.getAttribute("dimension")?c=h_(t.getAttribute("dimension")):t.parentNode.getAttribute("srsDimension")?c=h_(t.parentNode.getAttribute("srsDimension")):o&&(c=h_(o));for(var p=[],f=0,d=h.length;f<d;f+=c)s=parseFloat(h[f]),u=parseFloat(h[f+1]),l=3===c?parseFloat(h[f+2]):0,"en"===a.substr(0,2)?p.push(s,u,l):p.push(u,s,l);return p},e.prototype.writePos_=function(t,e,r){var n=r[r.length-1],i=n.hasZ,o=i?"3":"2";t.setAttribute("srsDimension",o);var a=n.srsName,s="enu";a&&(s=Ie(a).getAxisOrientation());var u,l=e.getCoordinates();(u="en"===s.substr(0,2)?l[0]+" "+l[1]:l[1]+" "+l[0],i)&&(u+=" "+(l[2]||0));__(t,u)},e.prototype.getCoords_=function(t,e,r){var n="enu";e&&(n=Ie(e).getAxisOrientation());var i="en"===n.substr(0,2)?t[0]+" "+t[1]:t[1]+" "+t[0];r&&(i+=" "+(t[2]||0));return i},e.prototype.writePosList_=function(t,e,r){var n=r[r.length-1],i=n.hasZ,o=i?"3":"2";t.setAttribute("srsDimension",o);for(var a,s=n.srsName,u=e.getCoordinates(),l=u.length,h=new Array(l),c=0;c<l;++c)a=u[c],h[c]=this.getCoords_(a,s,i);__(t,h.join(" "))},e.prototype.writePoint_=function(t,e,r){var n=r[r.length-1].srsName;n&&t.setAttribute("srsName",n);var i=au(t.namespaceURI,"pos");t.appendChild(i),this.writePos_(i,e,r)},e.prototype.writeEnvelope=function(t,e,r){var n=r[r.length-1].srsName;n&&t.setAttribute("srsName",n);var i=[e[0]+" "+e[1],e[2]+" "+e[3]];xu({node:t},this.ENVELOPE_SERIALIZERS_,vu,i,r,["lowerCorner","upperCorner"],this)},e.prototype.writeLinearRing_=function(t,e,r){var n=r[r.length-1].srsName;n&&t.setAttribute("srsName",n);var i=au(t.namespaceURI,"posList");t.appendChild(i),this.writePosList_(i,e,r)},e.prototype.RING_NODE_FACTORY_=function(t,e,r){var n=e[e.length-1],i=n.node,o=n.exteriorWritten;return void 0===o&&(n.exteriorWritten=!0),au(i.namespaceURI,void 0!==o?"interior":"exterior")},e.prototype.writeSurfaceOrPolygon_=function(t,e,r){var n=r[r.length-1],i=n.hasZ,o=n.srsName;if("PolygonPatch"!==t.nodeName&&o&&t.setAttribute("srsName",o),"Polygon"===t.nodeName||"PolygonPatch"===t.nodeName){var a=e.getLinearRings();xu({node:t,hasZ:i,srsName:o},this.RING_SERIALIZERS_,this.RING_NODE_FACTORY_,a,r,void 0,this)}else if("Surface"===t.nodeName){var s=au(t.namespaceURI,"patches");t.appendChild(s),this.writeSurfacePatches_(s,e,r)}},e.prototype.writeCurveOrLineString_=function(t,e,r){var n=r[r.length-1].srsName;if("LineStringSegment"!==t.nodeName&&n&&t.setAttribute("srsName",n),"LineString"===t.nodeName||"LineStringSegment"===t.nodeName){var i=au(t.namespaceURI,"posList");t.appendChild(i),this.writePosList_(i,e,r)}else if("Curve"===t.nodeName){var o=au(t.namespaceURI,"segments");t.appendChild(o),this.writeCurveSegments_(o,e,r)}},e.prototype.writeMultiSurfaceOrPolygon_=function(t,e,r){var n=r[r.length-1],i=n.hasZ,o=n.srsName,a=n.surface;o&&t.setAttribute("srsName",o);var s=e.getPolygons();xu({node:t,hasZ:i,srsName:o,surface:a},this.SURFACEORPOLYGONMEMBER_SERIALIZERS_,this.MULTIGEOMETRY_MEMBER_NODE_FACTORY_,s,r,void 0,this)},e.prototype.writeMultiPoint_=function(t,e,r){var n=r[r.length-1],i=n.srsName,o=n.hasZ;i&&t.setAttribute("srsName",i);var a=e.getPoints();xu({node:t,hasZ:o,srsName:i},this.POINTMEMBER_SERIALIZERS_,yu("pointMember"),a,r,void 0,this)},e.prototype.writeMultiCurveOrLineString_=function(t,e,r){var n=r[r.length-1],i=n.hasZ,o=n.srsName,a=n.curve;o&&t.setAttribute("srsName",o);var s=e.getLineStrings();xu({node:t,hasZ:i,srsName:o,curve:a},this.LINESTRINGORCURVEMEMBER_SERIALIZERS_,this.MULTIGEOMETRY_MEMBER_NODE_FACTORY_,s,r,void 0,this)},e.prototype.writeRing_=function(t,e,r){var n=au(t.namespaceURI,"LinearRing");t.appendChild(n),this.writeLinearRing_(n,e,r)},e.prototype.writeSurfaceOrPolygonMember_=function(t,e,r){var n=this.GEOMETRY_NODE_FACTORY_(e,r);n&&(t.appendChild(n),this.writeSurfaceOrPolygon_(n,e,r))},e.prototype.writePointMember_=function(t,e,r){var n=au(t.namespaceURI,"Point");t.appendChild(n),this.writePoint_(n,e,r)},e.prototype.writeLineStringOrCurveMember_=function(t,e,r){var n=this.GEOMETRY_NODE_FACTORY_(e,r);n&&(t.appendChild(n),this.writeCurveOrLineString_(n,e,r))},e.prototype.writeSurfacePatches_=function(t,e,r){var n=au(t.namespaceURI,"PolygonPatch");t.appendChild(n),this.writeSurfaceOrPolygon_(n,e,r)},e.prototype.writeCurveSegments_=function(t,e,r){var n=au(t.namespaceURI,"LineStringSegment");t.appendChild(n),this.writeCurveOrLineString_(n,e,r)},e.prototype.writeGeometryElement=function(t,e,r){var n,i=r[r.length-1],o=p({},i);o.node=t,n=Array.isArray(e)?jd(e,i):kd(e,!0,i),xu(o,this.GEOMETRY_SERIALIZERS_,this.GEOMETRY_NODE_FACTORY_,[n],r,void 0,this)},e.prototype.writeFeatureElement=function(t,e,r){var n=e.getId();n&&t.setAttribute("fid",n);var i=r[r.length-1],o=i.featureNS,a=e.getGeometryName();i.serializers||(i.serializers={},i.serializers[o]={});var s=e.getProperties(),u=[],l=[];for(var h in s){var c=s[h];null!==c&&(u.push(h),l.push(c),h==a||"function"==typeof c.getSimplifiedGeometry?h in i.serializers[o]||(i.serializers[o][h]=_u(this.writeGeometryElement,this)):h in i.serializers[o]||(i.serializers[o][h]=_u(__)))}var f=p({},i);f.node=t,xu(f,i.serializers,yu(void 0,o),l,r,u)},e.prototype.writeFeatureMembers_=function(t,e,r){var n=r[r.length-1],i=n.featureType,o=n.featureNS,a={};a[o]={},a[o][i]=_u(this.writeFeatureElement,this);var s=p({},n);s.node=t,xu(s,a,yu(i,o),e,r)},e.prototype.MULTIGEOMETRY_MEMBER_NODE_FACTORY_=function(t,e,r){var n=e[e.length-1].node;return au(this.namespace,v_[n.nodeName])},e.prototype.GEOMETRY_NODE_FACTORY_=function(t,e,r){var n,i=e[e.length-1],o=i.multiSurface,a=i.surface,s=i.curve,u=i.multiCurve;return Array.isArray(t)?n="Envelope":"MultiPolygon"===(n=t.getType())&&!0===o?n="MultiSurface":"Polygon"===n&&!0===a?n="Surface":"LineString"===n&&!0===s?n="Curve":"MultiLineString"===n&&!0===u&&(n="MultiCurve"),au(this.namespace,n)},e.prototype.writeGeometryNode=function(t,e){e=this.adaptOptions(e);var r=au(this.namespace,"geom"),n={node:r,hasZ:this.hasZ,srsName:this.srsName,curve:this.curve_,surface:this.surface_,multiSurface:this.multiSurface_,multiCurve:this.multiCurve_};return e&&p(n,e),this.writeGeometryElement(r,t,[n]),r},e.prototype.writeFeaturesNode=function(t,e){e=this.adaptOptions(e);var r=au(this.namespace,"featureMembers");r.setAttributeNS(ou,"xsi:schemaLocation",this.schemaLocation);var n={srsName:this.srsName,hasZ:this.hasZ,curve:this.curve_,surface:this.surface_,multiSurface:this.multiSurface_,multiCurve:this.multiCurve_,featureNS:this.featureNS,featureType:this.featureType};return e&&p(n,e),this.writeFeatureMembers_(r,t,[n]),r},e}(n_);m_.prototype.GEOMETRY_FLAT_COORDINATES_PARSERS={"http://www.opengis.net/gml":{pos:pu(m_.prototype.readFlatPos_),posList:pu(m_.prototype.readFlatPosList_)}},m_.prototype.FLAT_LINEAR_RINGS_PARSERS={"http://www.opengis.net/gml":{interior:m_.prototype.interiorParser_,exterior:m_.prototype.exteriorParser_}},m_.prototype.GEOMETRY_PARSERS={"http://www.opengis.net/gml":{Point:pu(n_.prototype.readPoint),MultiPoint:pu(n_.prototype.readMultiPoint),LineString:pu(n_.prototype.readLineString),MultiLineString:pu(n_.prototype.readMultiLineString),LinearRing:pu(n_.prototype.readLinearRing),Polygon:pu(n_.prototype.readPolygon),MultiPolygon:pu(n_.prototype.readMultiPolygon),Surface:pu(m_.prototype.readSurface_),MultiSurface:pu(m_.prototype.readMultiSurface_),Curve:pu(m_.prototype.readCurve_),MultiCurve:pu(m_.prototype.readMultiCurve_),Envelope:pu(m_.prototype.readEnvelope_)}},m_.prototype.MULTICURVE_PARSERS_={"http://www.opengis.net/gml":{curveMember:cu(m_.prototype.curveMemberParser_),curveMembers:cu(m_.prototype.curveMemberParser_)}},m_.prototype.MULTISURFACE_PARSERS_={"http://www.opengis.net/gml":{surfaceMember:cu(m_.prototype.surfaceMemberParser_),surfaceMembers:cu(m_.prototype.surfaceMemberParser_)}},m_.prototype.CURVEMEMBER_PARSERS_={"http://www.opengis.net/gml":{LineString:cu(n_.prototype.readLineString),Curve:cu(m_.prototype.readCurve_)}},m_.prototype.SURFACEMEMBER_PARSERS_={"http://www.opengis.net/gml":{Polygon:cu(n_.prototype.readPolygon),Surface:cu(m_.prototype.readSurface_)}},m_.prototype.SURFACE_PARSERS_={"http://www.opengis.net/gml":{patches:pu(m_.prototype.readPatch_)}},m_.prototype.CURVE_PARSERS_={"http://www.opengis.net/gml":{segments:pu(m_.prototype.readSegment_)}},m_.prototype.ENVELOPE_PARSERS_={"http://www.opengis.net/gml":{lowerCorner:cu(m_.prototype.readFlatPosList_),upperCorner:cu(m_.prototype.readFlatPosList_)}},m_.prototype.PATCHES_PARSERS_={"http://www.opengis.net/gml":{PolygonPatch:pu(m_.prototype.readPolygonPatch_)}},m_.prototype.SEGMENTS_PARSERS_={"http://www.opengis.net/gml":{LineStringSegment:pu(m_.prototype.readLineStringSegment_)}},m_.prototype.writeFeatures,m_.prototype.RING_SERIALIZERS_={"http://www.opengis.net/gml":{exterior:_u(m_.prototype.writeRing_),interior:_u(m_.prototype.writeRing_)}},m_.prototype.ENVELOPE_SERIALIZERS_={"http://www.opengis.net/gml":{lowerCorner:_u(__),upperCorner:_u(__)}},m_.prototype.SURFACEORPOLYGONMEMBER_SERIALIZERS_={"http://www.opengis.net/gml":{surfaceMember:_u(m_.prototype.writeSurfaceOrPolygonMember_),polygonMember:_u(m_.prototype.writeSurfaceOrPolygonMember_)}},m_.prototype.POINTMEMBER_SERIALIZERS_={"http://www.opengis.net/gml":{pointMember:_u(m_.prototype.writePointMember_)}},m_.prototype.LINESTRINGORCURVEMEMBER_SERIALIZERS_={"http://www.opengis.net/gml":{lineStringMember:_u(m_.prototype.writeLineStringOrCurveMember_),curveMember:_u(m_.prototype.writeLineStringOrCurveMember_)}},m_.prototype.GEOMETRY_SERIALIZERS_={"http://www.opengis.net/gml":{Curve:_u(m_.prototype.writeCurveOrLineString_),MultiCurve:_u(m_.prototype.writeMultiCurveOrLineString_),Point:_u(m_.prototype.writePoint_),MultiPoint:_u(m_.prototype.writeMultiPoint_),LineString:_u(m_.prototype.writeCurveOrLineString_),MultiLineString:_u(m_.prototype.writeMultiCurveOrLineString_),LinearRing:_u(m_.prototype.writeLinearRing_),Polygon:_u(m_.prototype.writeSurfaceOrPolygon_),MultiPolygon:_u(m_.prototype.writeMultiSurfaceOrPolygon_),Surface:_u(m_.prototype.writeSurfaceOrPolygon_),MultiSurface:_u(m_.prototype.writeMultiSurfaceOrPolygon_),Envelope:_u(m_.prototype.writeEnvelope)}};var E_=m_,T_=E_;T_.prototype.writeFeatures,T_.prototype.writeFeaturesNode;var S_=T_,w_=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),x_=t_+" http://schemas.opengis.net/gml/2.1.2/feature.xsd",O_={MultiLineString:"lineStringMember",MultiCurve:"curveMember",MultiPolygon:"polygonMember",MultiSurface:"surfaceMember"},C_=function(t){function e(e){var r=this,n=e||{};return(r=t.call(this,n)||this).FEATURE_COLLECTION_PARSERS[t_].featureMember=cu(r.readFeaturesInternal),r.schemaLocation=n.schemaLocation?n.schemaLocation:x_,r}return w_(e,t),e.prototype.readFlatCoordinates_=function(t,e){var r=su(t,!1).replace(/^\s*|\s*$/g,""),n=e[0].srsName,i="enu";if(n){var o=Ie(n);o&&(i=o.getAxisOrientation())}for(var a=r.trim().split(/\s+/),s=[],u=0,l=a.length;u<l;u++){var h=a[u].split(/,+/),c=parseFloat(h[0]),p=parseFloat(h[1]),f=3===h.length?parseFloat(h[2]):0;"en"===i.substr(0,2)?s.push(c,p,f):s.push(p,c,f)}return s},e.prototype.readBox_=function(t,e){var r=Su([null],this.BOX_PARSERS_,t,e,this);return dt(r[1][0],r[1][1],r[1][3],r[1][4])},e.prototype.innerBoundaryIsParser_=function(t,e){var r=Su(void 0,this.RING_PARSERS,t,e,this);r&&e[e.length-1].push(r)},e.prototype.outerBoundaryIsParser_=function(t,e){var r=Su(void 0,this.RING_PARSERS,t,e,this);r&&(e[e.length-1][0]=r)},e.prototype.GEOMETRY_NODE_FACTORY_=function(t,e,r){var n,i=e[e.length-1],o=i.multiSurface,a=i.surface,s=i.multiCurve;return Array.isArray(t)?n="Envelope":"MultiPolygon"===(n=t.getType())&&!0===o?n="MultiSurface":"Polygon"===n&&!0===a?n="Surface":"MultiLineString"===n&&!0===s&&(n="MultiCurve"),au("http://www.opengis.net/gml",n)},e.prototype.writeFeatureElement=function(t,e,r){var n=e.getId();n&&t.setAttribute("fid",n);var i=r[r.length-1],o=i.featureNS,a=e.getGeometryName();i.serializers||(i.serializers={},i.serializers[o]={});var s=e.getProperties(),u=[],l=[];for(var h in s){var c=s[h];null!==c&&(u.push(h),l.push(c),h==a||"function"==typeof c.getSimplifiedGeometry?h in i.serializers[o]||(i.serializers[o][h]=_u(this.writeGeometryElement,this)):h in i.serializers[o]||(i.serializers[o][h]=_u(__)))}var f=p({},i);f.node=t,xu(f,i.serializers,yu(void 0,o),l,r,u)},e.prototype.writeCurveOrLineString_=function(t,e,r){var n=r[r.length-1].srsName;if("LineStringSegment"!==t.nodeName&&n&&t.setAttribute("srsName",n),"LineString"===t.nodeName||"LineStringSegment"===t.nodeName){var i=this.createCoordinatesNode_(t.namespaceURI);t.appendChild(i),this.writeCoordinates_(i,e,r)}else if("Curve"===t.nodeName){var o=au(t.namespaceURI,"segments");t.appendChild(o),this.writeCurveSegments_(o,e,r)}},e.prototype.writeLineStringOrCurveMember_=function(t,e,r){var n=this.GEOMETRY_NODE_FACTORY_(e,r);n&&(t.appendChild(n),this.writeCurveOrLineString_(n,e,r))},e.prototype.writeMultiCurveOrLineString_=function(t,e,r){var n=r[r.length-1],i=n.hasZ,o=n.srsName,a=n.curve;o&&t.setAttribute("srsName",o);var s=e.getLineStrings();xu({node:t,hasZ:i,srsName:o,curve:a},this.LINESTRINGORCURVEMEMBER_SERIALIZERS_,this.MULTIGEOMETRY_MEMBER_NODE_FACTORY_,s,r,void 0,this)},e.prototype.writeGeometryElement=function(t,e,r){var n,i=r[r.length-1],o=p({},i);o.node=t,n=Array.isArray(e)?jd(e,i):kd(e,!0,i),xu(o,this.GEOMETRY_SERIALIZERS_,this.GEOMETRY_NODE_FACTORY_,[n],r,void 0,this)},e.prototype.createCoordinatesNode_=function(t){var e=au(t,"coordinates");return e.setAttribute("decimal","."),e.setAttribute("cs",","),e.setAttribute("ts"," "),e},e.prototype.writeCoordinates_=function(t,e,r){for(var n=r[r.length-1],i=n.hasZ,o=n.srsName,a=e.getCoordinates(),s=a.length,u=new Array(s),l=0;l<s;++l){var h=a[l];u[l]=this.getCoords_(h,o,i)}__(t,u.join(" "))},e.prototype.writeCurveSegments_=function(t,e,r){var n=au(t.namespaceURI,"LineStringSegment");t.appendChild(n),this.writeCurveOrLineString_(n,e,r)},e.prototype.writeSurfaceOrPolygon_=function(t,e,r){var n=r[r.length-1],i=n.hasZ,o=n.srsName;if("PolygonPatch"!==t.nodeName&&o&&t.setAttribute("srsName",o),"Polygon"===t.nodeName||"PolygonPatch"===t.nodeName){var a=e.getLinearRings();xu({node:t,hasZ:i,srsName:o},this.RING_SERIALIZERS_,this.RING_NODE_FACTORY_,a,r,void 0,this)}else if("Surface"===t.nodeName){var s=au(t.namespaceURI,"patches");t.appendChild(s),this.writeSurfacePatches_(s,e,r)}},e.prototype.RING_NODE_FACTORY_=function(t,e,r){var n=e[e.length-1],i=n.node,o=n.exteriorWritten;return void 0===o&&(n.exteriorWritten=!0),au(i.namespaceURI,void 0!==o?"innerBoundaryIs":"outerBoundaryIs")},e.prototype.writeSurfacePatches_=function(t,e,r){var n=au(t.namespaceURI,"PolygonPatch");t.appendChild(n),this.writeSurfaceOrPolygon_(n,e,r)},e.prototype.writeRing_=function(t,e,r){var n=au(t.namespaceURI,"LinearRing");t.appendChild(n),this.writeLinearRing_(n,e,r)},e.prototype.getCoords_=function(t,e,r){var n="enu";e&&(n=Ie(e).getAxisOrientation());var i="en"===n.substr(0,2)?t[0]+","+t[1]:t[1]+","+t[0];r&&(i+=","+(t[2]||0));return i},e.prototype.writePoint_=function(t,e,r){var n=r[r.length-1],i=n.hasZ,o=n.srsName;o&&t.setAttribute("srsName",o);var a=this.createCoordinatesNode_(t.namespaceURI);t.appendChild(a);var s=e.getCoordinates();__(a,this.getCoords_(s,o,i))},e.prototype.writeMultiPoint_=function(t,e,r){var n=r[r.length-1],i=n.hasZ,o=n.srsName;o&&t.setAttribute("srsName",o);var a=e.getPoints();xu({node:t,hasZ:i,srsName:o},this.POINTMEMBER_SERIALIZERS_,yu("pointMember"),a,r,void 0,this)},e.prototype.writePointMember_=function(t,e,r){var n=au(t.namespaceURI,"Point");t.appendChild(n),this.writePoint_(n,e,r)},e.prototype.writeLinearRing_=function(t,e,r){var n=r[r.length-1].srsName;n&&t.setAttribute("srsName",n);var i=this.createCoordinatesNode_(t.namespaceURI);t.appendChild(i),this.writeCoordinates_(i,e,r)},e.prototype.writeMultiSurfaceOrPolygon_=function(t,e,r){var n=r[r.length-1],i=n.hasZ,o=n.srsName,a=n.surface;o&&t.setAttribute("srsName",o);var s=e.getPolygons();xu({node:t,hasZ:i,srsName:o,surface:a},this.SURFACEORPOLYGONMEMBER_SERIALIZERS_,this.MULTIGEOMETRY_MEMBER_NODE_FACTORY_,s,r,void 0,this)},e.prototype.writeSurfaceOrPolygonMember_=function(t,e,r){var n=this.GEOMETRY_NODE_FACTORY_(e,r);n&&(t.appendChild(n),this.writeSurfaceOrPolygon_(n,e,r))},e.prototype.writeEnvelope=function(t,e,r){var n=r[r.length-1].srsName;n&&t.setAttribute("srsName",n);var i=[e[0]+" "+e[1],e[2]+" "+e[3]];xu({node:t},this.ENVELOPE_SERIALIZERS_,vu,i,r,["lowerCorner","upperCorner"],this)},e.prototype.MULTIGEOMETRY_MEMBER_NODE_FACTORY_=function(t,e,r){var n=e[e.length-1].node;return au("http://www.opengis.net/gml",O_[n.nodeName])},e}(n_);C_.prototype.GEOMETRY_FLAT_COORDINATES_PARSERS={"http://www.opengis.net/gml":{coordinates:pu(C_.prototype.readFlatCoordinates_)}},C_.prototype.FLAT_LINEAR_RINGS_PARSERS={"http://www.opengis.net/gml":{innerBoundaryIs:C_.prototype.innerBoundaryIsParser_,outerBoundaryIs:C_.prototype.outerBoundaryIsParser_}},C_.prototype.BOX_PARSERS_={"http://www.opengis.net/gml":{coordinates:cu(C_.prototype.readFlatCoordinates_)}},C_.prototype.GEOMETRY_PARSERS={"http://www.opengis.net/gml":{Point:pu(n_.prototype.readPoint),MultiPoint:pu(n_.prototype.readMultiPoint),LineString:pu(n_.prototype.readLineString),MultiLineString:pu(n_.prototype.readMultiLineString),LinearRing:pu(n_.prototype.readLinearRing),Polygon:pu(n_.prototype.readPolygon),MultiPolygon:pu(n_.prototype.readMultiPolygon),Box:pu(C_.prototype.readBox_)}},C_.prototype.GEOMETRY_SERIALIZERS_={"http://www.opengis.net/gml":{Curve:_u(C_.prototype.writeCurveOrLineString_),MultiCurve:_u(C_.prototype.writeMultiCurveOrLineString_),Point:_u(C_.prototype.writePoint_),MultiPoint:_u(C_.prototype.writeMultiPoint_),LineString:_u(C_.prototype.writeCurveOrLineString_),MultiLineString:_u(C_.prototype.writeMultiCurveOrLineString_),LinearRing:_u(C_.prototype.writeLinearRing_),Polygon:_u(C_.prototype.writeSurfaceOrPolygon_),MultiPolygon:_u(C_.prototype.writeMultiSurfaceOrPolygon_),Surface:_u(C_.prototype.writeSurfaceOrPolygon_),MultiSurface:_u(C_.prototype.writeMultiSurfaceOrPolygon_),Envelope:_u(C_.prototype.writeEnvelope)}},C_.prototype.LINESTRINGORCURVEMEMBER_SERIALIZERS_={"http://www.opengis.net/gml":{lineStringMember:_u(C_.prototype.writeLineStringOrCurveMember_),curveMember:_u(C_.prototype.writeLineStringOrCurveMember_)}},C_.prototype.RING_SERIALIZERS_={"http://www.opengis.net/gml":{outerBoundaryIs:_u(C_.prototype.writeRing_),innerBoundaryIs:_u(C_.prototype.writeRing_)}},C_.prototype.POINTMEMBER_SERIALIZERS_={"http://www.opengis.net/gml":{pointMember:_u(C_.prototype.writePointMember_)}},C_.prototype.SURFACEORPOLYGONMEMBER_SERIALIZERS_={"http://www.opengis.net/gml":{surfaceMember:_u(C_.prototype.writeSurfaceOrPolygonMember_),polygonMember:_u(C_.prototype.writeSurfaceOrPolygonMember_)}},C_.prototype.ENVELOPE_SERIALIZERS_={"http://www.opengis.net/gml":{lowerCorner:_u(__),upperCorner:_u(__)}};var R_=C_,P_=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),b_=function(t){function e(e){var r=this,n=e||{};return(r=t.call(this,n)||this).schemaLocation=n.schemaLocation?n.schemaLocation:r.namespace+" http://schemas.opengis.net/gml/3.2.1/gml.xsd",r}return P_(e,t),e}(E_);b_.prototype.namespace="http://www.opengis.net/gml/3.2",b_.prototype.GEOMETRY_FLAT_COORDINATES_PARSERS={"http://www.opengis.net/gml/3.2":{pos:pu(E_.prototype.readFlatPos_),posList:pu(E_.prototype.readFlatPosList_)}},b_.prototype.FLAT_LINEAR_RINGS_PARSERS={"http://www.opengis.net/gml/3.2":{interior:E_.prototype.interiorParser_,exterior:E_.prototype.exteriorParser_}},b_.prototype.GEOMETRY_PARSERS={"http://www.opengis.net/gml/3.2":{Point:pu(n_.prototype.readPoint),MultiPoint:pu(n_.prototype.readMultiPoint),LineString:pu(n_.prototype.readLineString),MultiLineString:pu(n_.prototype.readMultiLineString),LinearRing:pu(n_.prototype.readLinearRing),Polygon:pu(n_.prototype.readPolygon),MultiPolygon:pu(n_.prototype.readMultiPolygon),Surface:pu(b_.prototype.readSurface_),MultiSurface:pu(E_.prototype.readMultiSurface_),Curve:pu(b_.prototype.readCurve_),MultiCurve:pu(E_.prototype.readMultiCurve_),Envelope:pu(b_.prototype.readEnvelope_)}},b_.prototype.MULTICURVE_PARSERS_={"http://www.opengis.net/gml/3.2":{curveMember:cu(E_.prototype.curveMemberParser_),curveMembers:cu(E_.prototype.curveMemberParser_)}},b_.prototype.MULTISURFACE_PARSERS_={"http://www.opengis.net/gml/3.2":{surfaceMember:cu(E_.prototype.surfaceMemberParser_),surfaceMembers:cu(E_.prototype.surfaceMemberParser_)}},b_.prototype.CURVEMEMBER_PARSERS_={"http://www.opengis.net/gml/3.2":{LineString:cu(n_.prototype.readLineString),Curve:cu(E_.prototype.readCurve_)}},b_.prototype.SURFACEMEMBER_PARSERS_={"http://www.opengis.net/gml/3.2":{Polygon:cu(n_.prototype.readPolygon),Surface:cu(E_.prototype.readSurface_)}},b_.prototype.SURFACE_PARSERS_={"http://www.opengis.net/gml/3.2":{patches:pu(E_.prototype.readPatch_)}},b_.prototype.CURVE_PARSERS_={"http://www.opengis.net/gml/3.2":{segments:pu(E_.prototype.readSegment_)}},b_.prototype.ENVELOPE_PARSERS_={"http://www.opengis.net/gml/3.2":{lowerCorner:cu(E_.prototype.readFlatPosList_),upperCorner:cu(E_.prototype.readFlatPosList_)}},b_.prototype.PATCHES_PARSERS_={"http://www.opengis.net/gml/3.2":{PolygonPatch:pu(E_.prototype.readPolygonPatch_)}},b_.prototype.SEGMENTS_PARSERS_={"http://www.opengis.net/gml/3.2":{LineStringSegment:pu(E_.prototype.readLineStringSegment_)}},b_.prototype.MULTIPOINT_PARSERS_={"http://www.opengis.net/gml/3.2":{pointMember:cu(n_.prototype.pointMemberParser_),pointMembers:cu(n_.prototype.pointMemberParser_)}},b_.prototype.MULTILINESTRING_PARSERS_={"http://www.opengis.net/gml/3.2":{lineStringMember:cu(n_.prototype.lineStringMemberParser_),lineStringMembers:cu(n_.prototype.lineStringMemberParser_)}},b_.prototype.MULTIPOLYGON_PARSERS_={"http://www.opengis.net/gml/3.2":{polygonMember:cu(n_.prototype.polygonMemberParser_),polygonMembers:cu(n_.prototype.polygonMemberParser_)}},b_.prototype.POINTMEMBER_PARSERS_={"http://www.opengis.net/gml/3.2":{Point:cu(n_.prototype.readFlatCoordinatesFromNode_)}},b_.prototype.LINESTRINGMEMBER_PARSERS_={"http://www.opengis.net/gml/3.2":{LineString:cu(n_.prototype.readLineString)}},b_.prototype.POLYGONMEMBER_PARSERS_={"http://www.opengis.net/gml/3.2":{Polygon:cu(n_.prototype.readPolygon)}},b_.prototype.RING_PARSERS={"http://www.opengis.net/gml/3.2":{LinearRing:pu(n_.prototype.readFlatLinearRing_)}},b_.prototype.RING_SERIALIZERS_={"http://www.opengis.net/gml/3.2":{exterior:_u(E_.prototype.writeRing_),interior:_u(E_.prototype.writeRing_)}},b_.prototype.ENVELOPE_SERIALIZERS_={"http://www.opengis.net/gml/3.2":{lowerCorner:_u(__),upperCorner:_u(__)}},b_.prototype.SURFACEORPOLYGONMEMBER_SERIALIZERS_={"http://www.opengis.net/gml/3.2":{surfaceMember:_u(E_.prototype.writeSurfaceOrPolygonMember_),polygonMember:_u(E_.prototype.writeSurfaceOrPolygonMember_)}},b_.prototype.POINTMEMBER_SERIALIZERS_={"http://www.opengis.net/gml/3.2":{pointMember:_u(E_.prototype.writePointMember_)}},b_.prototype.LINESTRINGORCURVEMEMBER_SERIALIZERS_={"http://www.opengis.net/gml/3.2":{lineStringMember:_u(E_.prototype.writeLineStringOrCurveMember_),curveMember:_u(E_.prototype.writeLineStringOrCurveMember_)}},b_.prototype.GEOMETRY_SERIALIZERS_={"http://www.opengis.net/gml/3.2":{Curve:_u(E_.prototype.writeCurveOrLineString_),MultiCurve:_u(E_.prototype.writeMultiCurveOrLineString_),Point:_u(b_.prototype.writePoint_),MultiPoint:_u(E_.prototype.writeMultiPoint_),LineString:_u(E_.prototype.writeCurveOrLineString_),MultiLineString:_u(E_.prototype.writeMultiCurveOrLineString_),LinearRing:_u(E_.prototype.writeLinearRing_),Polygon:_u(E_.prototype.writeSurfaceOrPolygon_),MultiPolygon:_u(E_.prototype.writeMultiSurfaceOrPolygon_),Surface:_u(E_.prototype.writeSurfaceOrPolygon_),MultiSurface:_u(E_.prototype.writeMultiSurfaceOrPolygon_),Envelope:_u(E_.prototype.writeEnvelope)}};var I_=b_,L_=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),M_=[null,"http://www.topografix.com/GPX/1/0","http://www.topografix.com/GPX/1/1"],F_={rte:sg,trk:ug,wpt:lg},A_=Eu(M_,{rte:cu(sg),trk:cu(ug),wpt:cu(lg)}),N_=Eu(M_,{text:du(c_,"linkText"),type:du(c_,"linkType")}),G_=Eu(M_,{rte:_u(function(t,e,r){var n=r[0],i=e.getProperties(),o={node:t};o.properties=i;var a=e.getGeometry();if(a.getType()==Yt.LINE_STRING){var s=kd(a,!0,n);o.geometryLayout=s.getLayout(),i.rtept=s.getCoordinates()}var u=r[r.length-1].node,l=W_[u.namespaceURI],h=mu(i,l);xu(o,Z_,vu,h,r,l)}),trk:_u(function(t,e,r){var n=r[0],i=e.getProperties(),o={node:t};o.properties=i;var a=e.getGeometry();if(a.getType()==Yt.MULTI_LINE_STRING){var s=kd(a,!0,n);i.trkseg=s.getLineStrings()}var u=r[r.length-1].node,l=H_[u.namespaceURI],h=mu(i,l);xu(o,q_,vu,h,r,l)}),wpt:_u(function(t,e,r){var n=r[0],i=r[r.length-1];i.properties=e.getProperties();var o=e.getGeometry();if(o.getType()==Yt.POINT){var a=kd(o,!0,n);i.geometryLayout=a.getLayout(),cg(t,a.getCoordinates(),r)}})}),D_=function(t){function e(e){var r=t.call(this)||this,n=e||{};return r.dataProjection=Ie("EPSG:4326"),r.readExtensions_=n.readExtensions,r}return L_(e,t),e.prototype.handleReadExtensions_=function(t){t||(t=[]);for(var e=0,r=t.length;e<r;++e){var n=t[e];if(this.readExtensions_){var i=n.get("extensionsNode_")||null;this.readExtensions_(n,i)}n.set("extensionsNode_",void 0)}},e.prototype.readFeatureFromNode=function(t,e){if(!q(M_,t.namespaceURI))return null;var r=F_[t.localName];if(!r)return null;var n=r(t,[this.getReadOptions(t,e)]);return n?(this.handleReadExtensions_([n]),n):null},e.prototype.readFeaturesFromNode=function(t,e){if(!q(M_,t.namespaceURI))return[];if("gpx"==t.localName){var r=Su([],A_,t,[this.getReadOptions(t,e)]);return r?(this.handleReadExtensions_(r),r):[]}return[]},e.prototype.writeFeaturesNode=function(t,e){e=this.adaptOptions(e);var r=au("http://www.topografix.com/GPX/1/1","gpx");return r.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:xsi",ou),r.setAttributeNS(ou,"xsi:schemaLocation","http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd"),r.setAttribute("version","1.1"),r.setAttribute("creator","OpenLayers"),xu({node:r},G_,rg,t,[e]),r},e}(Qd),k_=Eu(M_,{name:du(c_),cmt:du(c_),desc:du(c_),src:du(c_),link:og,number:du(l_),extensions:ag,type:du(c_),rtept:function(t,e){var r=Su({},j_,t,e);if(r){var n=e[e.length-1],i=n.flatCoordinates,o=n.layoutOptions;ng(i,o,t,r)}}}),j_=Eu(M_,{ele:du(s_),time:du(a_)}),U_=Eu(M_,{name:du(c_),cmt:du(c_),desc:du(c_),src:du(c_),link:og,number:du(l_),type:du(c_),extensions:ag,trkseg:function(t,e){var r=e[e.length-1];Tu(Y_,t,e);var n=r.flatCoordinates;r.ends.push(n.length)}}),Y_=Eu(M_,{trkpt:function(t,e){var r=Su({},X_,t,e);if(r){var n=e[e.length-1],i=n.flatCoordinates,o=n.layoutOptions;ng(i,o,t,r)}}}),X_=Eu(M_,{ele:du(s_),time:du(a_)}),B_=Eu(M_,{ele:du(s_),time:du(a_),magvar:du(s_),geoidheight:du(s_),name:du(c_),cmt:du(c_),desc:du(c_),src:du(c_),link:og,sym:du(c_),type:du(c_),fix:du(c_),sat:du(l_),hdop:du(s_),vdop:du(s_),pdop:du(s_),ageofdgpsdata:du(s_),dgpsid:du(l_),extensions:ag}),z_=["text","type"],V_=Eu(M_,{text:_u(__),type:_u(__)}),W_=Eu(M_,["name","cmt","desc","src","link","number","type","rtept"]),Z_=Eu(M_,{name:_u(__),cmt:_u(__),desc:_u(__),src:_u(__),link:_u(hg),number:_u(d_),type:_u(__),rtept:gu(_u(cg))}),K_=Eu(M_,["ele","time"]),H_=Eu(M_,["name","cmt","desc","src","link","number","type","trkseg"]),q_=Eu(M_,{name:_u(__),cmt:_u(__),desc:_u(__),src:_u(__),link:_u(hg),number:_u(d_),type:_u(__),trkseg:gu(_u(function(t,e,r){var n={node:t};n.geometryLayout=e.getLayout(),n.properties={},xu(n,Q_,J_,e.getCoordinates(),r)}))}),J_=yu("trkpt"),Q_=Eu(M_,{trkpt:_u(cg)}),$_=Eu(M_,["ele","time","magvar","geoidheight","name","cmt","desc","src","link","sym","type","fix","sat","hdop","vdop","pdop","ageofdgpsdata","dgpsid"]),tg=Eu(M_,{ele:_u(f_),time:_u(function(t,e){var r=new Date(1e3*e),n=r.getUTCFullYear()+"-"+Gi(r.getUTCMonth()+1,2)+"-"+Gi(r.getUTCDate(),2)+"T"+Gi(r.getUTCHours(),2)+":"+Gi(r.getUTCMinutes(),2)+":"+Gi(r.getUTCSeconds(),2)+"Z";t.appendChild(iu.createTextNode(n))}),magvar:_u(f_),geoidheight:_u(f_),name:_u(__),cmt:_u(__),desc:_u(__),src:_u(__),link:_u(hg),sym:_u(__),type:_u(__),fix:_u(__),sat:_u(d_),hdop:_u(f_),vdop:_u(f_),pdop:_u(f_),ageofdgpsdata:_u(f_),dgpsid:_u(d_)}),eg={Point:"wpt",LineString:"rte",MultiLineString:"trk"};function rg(t,e,r){var n=t.getGeometry();if(n){var i=eg[n.getType()];if(i)return au(e[e.length-1].node.namespaceURI,i)}}function ng(t,e,r,n){return t.push(parseFloat(r.getAttribute("lon")),parseFloat(r.getAttribute("lat"))),"ele"in n?(t.push(n.ele),delete n.ele,e.hasZ=!0):t.push(0),"time"in n?(t.push(n.time),delete n.time,e.hasM=!0):t.push(0),t}function ig(t,e,r){var n=Ut.XY,i=2;if(t.hasZ&&t.hasM?(n=Ut.XYZM,i=4):t.hasZ?(n=Ut.XYZ,i=3):t.hasM&&(n=Ut.XYM,i=3),4!==i){for(var o=0,a=e.length/4;o<a;o++)e[o*i]=e[4*o],e[o*i+1]=e[4*o+1],t.hasZ&&(e[o*i+2]=e[4*o+2]),t.hasM&&(e[o*i+2]=e[4*o+3]);if(e.length=e.length/4*i,r)for(o=0,a=r.length;o<a;o++)r[o]=r[o]/4*i}return n}function og(t,e){var r=e[e.length-1],n=t.getAttribute("href");null!==n&&(r.link=n),Tu(N_,t,e)}function ag(t,e){e[e.length-1].extensionsNode_=t}function sg(t,e){var r=e[0],n=Su({flatCoordinates:[],layoutOptions:{}},k_,t,e);if(n){var i=n.flatCoordinates;delete n.flatCoordinates;var o=n.layoutOptions;delete n.layoutOptions;var a=ig(o,i),s=new yf(i,a);kd(s,!1,r);var u=new K(s);return u.setProperties(n,!0),u}}function ug(t,e){var r=e[0],n=Su({flatCoordinates:[],ends:[],layoutOptions:{}},U_,t,e);if(n){var i=n.flatCoordinates;delete n.flatCoordinates;var o=n.ends;delete n.ends;var a=n.layoutOptions;delete n.layoutOptions;var s=ig(a,i,o),u=new Vf(i,s,o);kd(u,!1,r);var l=new K(u);return l.setProperties(n,!0),l}}function lg(t,e){var r=e[0],n=Su({},B_,t,e);if(n){var i={},o=ng([],i,t,n),a=ig(i,o),s=new Cr(o,a);kd(s,!1,r);var u=new K(s);return u.setProperties(n,!0),u}}function hg(t,e,r){t.setAttribute("href",e);var n=r[r.length-1].properties,i=[n.linkText,n.linkType];xu({node:t},V_,vu,i,r,z_)}function cg(t,e,r){var n=r[r.length-1],i=n.node.namespaceURI,o=n.properties;switch(t.setAttributeNS(null,"lat",String(e[1])),t.setAttributeNS(null,"lon",String(e[0])),n.geometryLayout){case Ut.XYZM:0!==e[3]&&(o.time=e[3]);case Ut.XYZ:0!==e[2]&&(o.ele=e[2]);break;case Ut.XYM:0!==e[2]&&(o.time=e[2])}var a="rtept"==t.nodeName?K_[i]:$_[i],s=mu(o,a);xu({node:t,properties:o},tg,vu,s,r,a)}var pg=D_,fg=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}();function dg(t,e){if(!t)return null;var r;switch(t.type){case Yt.POINT:r=function(t){return new Cr(t.coordinates)}(t);break;case Yt.LINE_STRING:r=function(t){return new yf(t.coordinates)}(t);break;case Yt.POLYGON:r=function(t){return new Xr(t.coordinates)}(t);break;case Yt.MULTI_POINT:r=function(t){return new Zf(t.coordinates)}(t);break;case Yt.MULTI_LINE_STRING:r=function(t){return new Vf(t.coordinates)}(t);break;case Yt.MULTI_POLYGON:r=function(t){return new qf(t.coordinates)}(t);break;case Yt.GEOMETRY_COLLECTION:r=function(t,e){var r=t.geometries.map(function(t){return dg(t,e)});return new Gd(r)}(t);break;default:throw new Error("Unsupported GeoJSON type: "+t.type)}return kd(r,!1,e)}function _g(t,e){var r,n=(t=kd(t,!0,e)).getType();switch(n){case Yt.POINT:r=function(t,e){return{type:"Point",coordinates:t.getCoordinates()}}(t);break;case Yt.LINE_STRING:r=function(t,e){return{type:"LineString",coordinates:t.getCoordinates()}}(t);break;case Yt.POLYGON:r=function(t,e){var r;e&&(r=e.rightHanded);return{type:"Polygon",coordinates:t.getCoordinates(r)}}(t,e);break;case Yt.MULTI_POINT:r=function(t,e){return{type:"MultiPoint",coordinates:t.getCoordinates()}}(t);break;case Yt.MULTI_LINE_STRING:r=function(t,e){return{type:"MultiLineString",coordinates:t.getCoordinates()}}(t);break;case Yt.MULTI_POLYGON:r=function(t,e){var r;e&&(r=e.rightHanded);return{type:"MultiPolygon",coordinates:t.getCoordinates(r)}}(t,e);break;case Yt.GEOMETRY_COLLECTION:r=function(t,e){return{type:"GeometryCollection",geometries:t.getGeometriesArray().map(function(t){var r=p({},e);return delete r.featureProjection,_g(t,r)})}}(t,e);break;case Yt.CIRCLE:r={type:"GeometryCollection",geometries:[]};break;default:throw new Error("Unsupported geometry type: "+n)}return r}var gg=function(t){function e(e){var r=this,n=e||{};return(r=t.call(this)||this).dataProjection=Ie(n.dataProjection?n.dataProjection:"EPSG:4326"),n.featureProjection&&(r.defaultFeatureProjection=Ie(n.featureProjection)),r.geometryName_=n.geometryName,r.extractGeometryName_=n.extractGeometryName,r}return fg(e,t),e.prototype.readFeatureFromObject=function(t,e){var r=null,n=dg((r="Feature"===t.type?t:{type:"Feature",geometry:t,properties:null}).geometry,e),i=new K;return this.geometryName_?i.setGeometryName(this.geometryName_):this.extractGeometryName_&&"geometry_name"in r!==void 0&&i.setGeometryName(r.geometry_name),i.setGeometry(n),"id"in r&&i.setId(r.id),r.properties&&i.setProperties(r.properties,!0),i},e.prototype.readFeaturesFromObject=function(t,e){var r=null;if("FeatureCollection"===t.type){r=[];for(var n=t.features,i=0,o=n.length;i<o;++i)r.push(this.readFeatureFromObject(n[i],e))}else r=[this.readFeatureFromObject(t,e)];return r},e.prototype.readGeometryFromObject=function(t,e){return dg(t,e)},e.prototype.readProjectionFromObject=function(t){var e,r=t.crs;return r?"name"==r.type?e=Ie(r.properties.name):W(!1,36):e=this.dataProjection,e},e.prototype.writeFeatureObject=function(t,e){e=this.adaptOptions(e);var r={type:"Feature",geometry:null,properties:null},n=t.getId();void 0!==n&&(r.id=n);var i=t.getGeometry();i&&(r.geometry=_g(i,e));var o=t.getProperties();return delete o[t.getGeometryName()],_(o)||(r.properties=o),r},e.prototype.writeFeaturesObject=function(t,e){e=this.adaptOptions(e);for(var r=[],n=0,i=t.length;n<i;++n)r.push(this.writeFeatureObject(t[n],e));return{type:"FeatureCollection",features:r}},e.prototype.writeGeometryObject=function(t,e){return _g(t,this.adaptOptions(e))},e}(Xd),yg=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}();function vg(t){return"string"==typeof t?t:""}var mg,Eg,Tg,Sg,wg,xg,Og,Cg=function(t){function e(){return t.call(this)||this}return yg(e,t),e.prototype.getType=function(){return gs.TEXT},e.prototype.readFeature=function(t,e){return this.readFeatureFromText(vg(t),this.adaptOptions(e))},e.prototype.readFeatureFromText=function(t,e){return n()},e.prototype.readFeatures=function(t,e){return this.readFeaturesFromText(vg(t),this.adaptOptions(e))},e.prototype.readFeaturesFromText=function(t,e){return n()},e.prototype.readGeometry=function(t,e){return this.readGeometryFromText(vg(t),this.adaptOptions(e))},e.prototype.readGeometryFromText=function(t,e){return n()},e.prototype.readProjection=function(t){return this.readProjectionFromText(vg(t))},e.prototype.readProjectionFromText=function(t){return this.dataProjection},e.prototype.writeFeature=function(t,e){return this.writeFeatureText(t,this.adaptOptions(e))},e.prototype.writeFeatureText=function(t,e){return n()},e.prototype.writeFeatures=function(t,e){return this.writeFeaturesText(t,this.adaptOptions(e))},e.prototype.writeFeaturesText=function(t,e){return n()},e.prototype.writeGeometry=function(t,e){return this.writeGeometryText(t,this.adaptOptions(e))},e.prototype.writeGeometryText=function(t,e){return n()},e}(Dd),Rg=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),Pg={BAROMETRIC:"barometric",GPS:"gps",NONE:"none"},bg=/^B(\d{2})(\d{2})(\d{2})(\d{2})(\d{5})([NS])(\d{3})(\d{5})([EW])([AV])(\d{5})(\d{5})/,Ig=/^H.([A-Z]{3}).*?:(.*)/,Lg=/^HFDTE(\d{2})(\d{2})(\d{2})/,Mg=/\r\n|\r|\n/,Fg=function(t){function e(e){var r=t.call(this)||this,n=e||{};return r.dataProjection=Ie("EPSG:4326"),r.altitudeMode_=n.altitudeMode?n.altitudeMode:Pg.NONE,r}return Rg(e,t),e.prototype.readFeatureFromText=function(t,e){var r,n,i=this.altitudeMode_,o=t.split(Mg),a={},s=[],u=2e3,l=0,h=1,c=-1;for(r=0,n=o.length;r<n;++r){var p=o[r],f=void 0;if("B"==p.charAt(0)){if(f=bg.exec(p)){var d=parseInt(f[1],10),_=parseInt(f[2],10),g=parseInt(f[3],10),y=parseInt(f[4],10)+parseInt(f[5],10)/6e4;"S"==f[6]&&(y=-y);var v=parseInt(f[7],10)+parseInt(f[8],10)/6e4;if("W"==f[9]&&(v=-v),s.push(v,y),i!=Pg.NONE){var m=void 0;m=i==Pg.GPS?parseInt(f[11],10):i==Pg.BAROMETRIC?parseInt(f[12],10):0,s.push(m)}var E=Date.UTC(u,l,h,d,_,g);E<c&&(E=Date.UTC(u,l,h+1,d,_,g)),s.push(E/1e3),c=E}}else"H"==p.charAt(0)&&((f=Lg.exec(p))?(h=parseInt(f[1],10),l=parseInt(f[2],10)-1,u=2e3+parseInt(f[3],10)):(f=Ig.exec(p))&&(a[f[1]]=f[2].trim()))}if(0===s.length)return null;var T=i==Pg.NONE?Ut.XYM:Ut.XYZM,S=new yf(s,T),w=new K(kd(S,!1,e));return w.setProperties(a,!0),w},e.prototype.readFeaturesFromText=function(t,e){var r=this.readFeatureFromText(t,e);return r?[r]:[]},e}(Cg),Ag=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),Ng=["http://www.google.com/kml/ext/2.2"],Gg=[null,"http://earth.google.com/kml/2.0","http://earth.google.com/kml/2.1","http://earth.google.com/kml/2.2","http://www.opengis.net/kml/2.2"],Dg={fraction:nl.FRACTION,pixels:nl.PIXELS,insetPixels:nl.PIXELS},kg=Eu(Gg,{ExtendedData:Ly,Region:My,MultiGeometry:du(Sy,"geometry"),LineString:du(my,"geometry"),LinearRing:du(Ey,"geometry"),Point:du(wy,"geometry"),Polygon:du(Oy,"geometry"),Style:du(Ry),StyleMap:function(t,e){var r=oy(t,e);if(!r)return;var n=e[e.length-1];Array.isArray(r)?n.Style=r:"string"==typeof r?n.styleUrl=r:W(!1,38)},address:du(c_),description:du(c_),name:du(c_),open:du(i_),phoneNumber:du(c_),styleUrl:du(ry),visibility:du(i_)},Eu(Ng,{MultiTrack:du(function(t,e){var r=Su([],py,t,e);if(!r)return;return new Vf(r)},"geometry"),Track:du(dy,"geometry")})),jg=Eu(Gg,{ExtendedData:Ly,Region:My,Link:function(t,e){Tu(Ug,t,e)},address:du(c_),description:du(c_),name:du(c_),open:du(i_),phoneNumber:du(c_),visibility:du(i_)}),Ug=Eu(Gg,{href:du(ry)}),Yg=Eu(Gg,{LatLonAltBox:function(t,e){var r=Su({},Ny,t,e);if(!r)return;var n=e[e.length-1],i=[parseFloat(r.west),parseFloat(r.south),parseFloat(r.east),parseFloat(r.north)];n.extent=i,n.altitudeMode=r.altitudeMode,n.minAltitude=parseFloat(r.minAltitude),n.maxAltitude=parseFloat(r.maxAltitude)},Lod:function(t,e){var r=Su({},Gy,t,e);if(!r)return;var n=e[e.length-1];n.minLodPixels=parseFloat(r.minLodPixels),n.maxLodPixels=parseFloat(r.maxLodPixels),n.minFadeExtent=parseFloat(r.minFadeExtent),n.maxFadeExtent=parseFloat(r.maxFadeExtent)}}),Xg=Eu(Gg,["Document","Placemark"]),Bg=Eu(Gg,{Document:_u(function(t,e,r){xu({node:t},Yy,Xy,e,r,void 0,this)}),Placemark:_u(pv)}),zg=null;var Vg,Wg=null;var Zg,Kg=null;var Hg=null;var qg=null;var Jg=null;var Qg=function(t){function e(e){var r=t.call(this)||this,n=e||{};return Jg||(zg=new rl({color:mg=[255,255,255,1]}),Eg=[20,2],Tg=nl.PIXELS,Sg=nl.PIXELS,wg=[64,64],xg="https://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png",Og=.5,Wg=new ul({anchor:Eg,anchorOrigin:al.BOTTOM_LEFT,anchorXUnits:Tg,anchorYUnits:Sg,crossOrigin:"anonymous",rotation:0,scale:Og,size:wg,src:xg}),Vg="NO_IMAGE",Kg=new ll({color:mg,width:1}),Zg=new ll({color:[51,51,51,1],width:2}),Hg=new vl({font:"bold 16px Helvetica",fill:zg,stroke:Zg,scale:.8}),qg=new _l({fill:zg,image:Wg,text:Hg,stroke:Kg,zIndex:0}),Jg=[qg]),r.dataProjection=Ie("EPSG:4326"),r.defaultStyle_=n.defaultStyle?n.defaultStyle:Jg,r.extractStyles_=void 0===n.extractStyles||n.extractStyles,r.writeStyles_=void 0===n.writeStyles||n.writeStyles,r.sharedStyles_={},r.showPointNames_=void 0===n.showPointNames||n.showPointNames,r}return Ag(e,t),e.prototype.readDocumentOrFolder_=function(t,e){var r=Su([],Eu(Gg,{Document:hu(this.readDocumentOrFolder_,this),Folder:hu(this.readDocumentOrFolder_,this),Placemark:cu(this.readPlacemark_,this),Style:this.readSharedStyle_.bind(this),StyleMap:this.readSharedStyleMap_.bind(this)}),t,e,this);return r||void 0},e.prototype.readPlacemark_=function(t,e){var r=Su({geometry:null},kg,t,e);if(r){var n=new K,i=t.getAttribute("id");null!==i&&n.setId(i);var o=e[0],a=r.geometry;if(a&&kd(a,!1,o),n.setGeometry(a),delete r.geometry,this.extractStyles_){var s=function(t,e,r,n,i){return function(o,a){var s,u=i,l="";if(u){var h=o.getGeometry();h&&(u=h.getType()===Yt.POINT)}if(u&&(l=o.get("name"),u=u&&!!l),t)return u?(s=$g(t[0],l),t.concat(s)):t;if(e){var c=function t(e,r,n){return Array.isArray(e)?e:"string"==typeof e?(!(e in n)&&"#"+e in n&&(e="#"+e),t(n[e],r,n)):r}(e,r,n);return u?(s=$g(c[0],l),c.concat(s)):c}return u?(s=$g(r[0],l),r.concat(s)):r}}(r.Style,r.styleUrl,this.defaultStyle_,this.sharedStyles_,this.showPointNames_);n.setStyle(s)}return delete r.Style,n.setProperties(r,!0),n}},e.prototype.readSharedStyle_=function(t,e){var r=t.getAttribute("id");if(null!==r){var n=Ry(t,e);if(n){var i=void 0,o=t.baseURI;if(o&&"about:blank"!=o||(o=window.location.href),o)i=new URL("#"+r,o).href;else i="#"+r;this.sharedStyles_[i]=n}}},e.prototype.readSharedStyleMap_=function(t,e){var r=t.getAttribute("id");if(null!==r){var n=oy(t,e);if(n){var i,o=t.baseURI;if(o&&"about:blank"!=o||(o=window.location.href),o)i=new URL("#"+r,o).href;else i="#"+r;this.sharedStyles_[i]=n}}},e.prototype.readFeatureFromNode=function(t,e){if(!q(Gg,t.namespaceURI))return null;var r=this.readPlacemark_(t,[this.getReadOptions(t,e)]);return r||null},e.prototype.readFeaturesFromNode=function(t,e){if(!q(Gg,t.namespaceURI))return[];var r,n=t.localName;if("Document"==n||"Folder"==n)return(r=this.readDocumentOrFolder_(t,[this.getReadOptions(t,e)]))||[];if("Placemark"==n){var i=this.readPlacemark_(t,[this.getReadOptions(t,e)]);return i?[i]:[]}if("kml"==n){r=[];for(var o=t.firstElementChild;o;o=o.nextElementSibling){var a=this.readFeaturesFromNode(o,e);a&&$(r,a)}return r}return[]},e.prototype.readName=function(t){if(t){if("string"==typeof t){var e=lu(t);return this.readNameFromDocument(e)}return uu(t)?this.readNameFromDocument(t):this.readNameFromNode(t)}},e.prototype.readNameFromDocument=function(t){for(var e=t.firstChild;e;e=e.nextSibling)if(e.nodeType==Node.ELEMENT_NODE){var r=this.readNameFromNode(e);if(r)return r}},e.prototype.readNameFromNode=function(t){for(var e=t.firstElementChild;e;e=e.nextElementSibling)if(q(Gg,e.namespaceURI)&&"name"==e.localName)return c_(e);for(e=t.firstElementChild;e;e=e.nextElementSibling){var r=e.localName;if(q(Gg,e.namespaceURI)&&("Document"==r||"Folder"==r||"Placemark"==r||"kml"==r)){var n=this.readNameFromNode(e);if(n)return n}}},e.prototype.readNetworkLinks=function(t){var e=[];if("string"==typeof t){var r=lu(t);$(e,this.readNetworkLinksFromDocument(r))}else uu(t)?$(e,this.readNetworkLinksFromDocument(t)):$(e,this.readNetworkLinksFromNode(t));return e},e.prototype.readNetworkLinksFromDocument=function(t){for(var e=[],r=t.firstChild;r;r=r.nextSibling)r.nodeType==Node.ELEMENT_NODE&&$(e,this.readNetworkLinksFromNode(r));return e},e.prototype.readNetworkLinksFromNode=function(t){for(var e=[],r=t.firstElementChild;r;r=r.nextElementSibling)if(q(Gg,r.namespaceURI)&&"NetworkLink"==r.localName){var n=Su({},jg,r,[]);e.push(n)}for(r=t.firstElementChild;r;r=r.nextElementSibling){var i=r.localName;!q(Gg,r.namespaceURI)||"Document"!=i&&"Folder"!=i&&"kml"!=i||$(e,this.readNetworkLinksFromNode(r))}return e},e.prototype.readRegion=function(t){var e=[];if("string"==typeof t){var r=lu(t);$(e,this.readRegionFromDocument(r))}else uu(t)?$(e,this.readRegionFromDocument(t)):$(e,this.readRegionFromNode(t));return e},e.prototype.readRegionFromDocument=function(t){for(var e=[],r=t.firstChild;r;r=r.nextSibling)r.nodeType==Node.ELEMENT_NODE&&$(e,this.readRegionFromNode(r));return e},e.prototype.readRegionFromNode=function(t){for(var e=[],r=t.firstElementChild;r;r=r.nextElementSibling)if(q(Gg,r.namespaceURI)&&"Region"==r.localName){var n=Su({},Yg,r,[]);e.push(n)}for(r=t.firstElementChild;r;r=r.nextElementSibling){var i=r.localName;!q(Gg,r.namespaceURI)||"Document"!=i&&"Folder"!=i&&"kml"!=i||$(e,this.readRegionFromNode(r))}return e},e.prototype.writeFeaturesNode=function(t,e){e=this.adaptOptions(e);var r=au(Gg[4],"kml"),n="http://www.w3.org/2000/xmlns/";r.setAttributeNS(n,"xmlns:gx",Ng[0]),r.setAttributeNS(n,"xmlns:xsi",ou),r.setAttributeNS(ou,"xsi:schemaLocation","http://www.opengis.net/kml/2.2 https://developers.google.com/kml/schema/kml22gx.xsd");var i={node:r},o={};t.length>1?o.Document=t:1==t.length&&(o.Placemark=t[0]);var a=Xg[r.namespaceURI],s=mu(o,a);return xu(i,Bg,vu,s,[e],a,this),r},e}(Qd);function $g(t,e){var r=null,n=[0,0],i="start";if(t.getImage()){var o=t.getImage().getImageSize();if(null===o&&(o=wg),2==o.length){var a=t.getImage().getScale();n[0]=a*o[0]/2,n[1]=-a*o[1]/2,i="left"}}if(null!==t.getText()){var s=t.getText();(r=s.clone()).setFont(s.getFont()||Hg.getFont()),r.setScale(s.getScale()||Hg.getScale()),r.setFill(s.getFill()||Hg.getFill()),r.setStroke(s.getStroke()||Zg)}else r=Hg.clone();return r.setText(e),r.setOffsetX(n[0]),r.setOffsetY(n[1]),r.setTextAlign(i),new _l({text:r})}function ty(t){var e=su(t,!1),r=/^\s*#?\s*([0-9A-Fa-f]{8})\s*$/.exec(e);if(r){var n=r[1];return[parseInt(n.substr(6,2),16),parseInt(n.substr(4,2),16),parseInt(n.substr(2,2),16),parseInt(n.substr(0,2),16)/255]}}function ey(t){for(var e,r=su(t,!1),n=[],i=/^\s*([+\-]?\d*\.?\d+(?:e[+\-]?\d+)?)\s*,\s*([+\-]?\d*\.?\d+(?:e[+\-]?\d+)?)(?:\s*,\s*([+\-]?\d*\.?\d+(?:e[+\-]?\d+)?))?\s*/i;e=i.exec(r);){var o=parseFloat(e[1]),a=parseFloat(e[2]),s=e[3]?parseFloat(e[3]):0;n.push(o,a,s),r=r.substr(e[0].length)}if(""===r)return n}function ry(t){var e=su(t,!1).trim(),r=t.baseURI;return r&&"about:blank"!=r||(r=window.location.href),r?new URL(e,r).href:e}function ny(t){return s_(t)}var iy=Eu(Gg,{Pair:function(t,e){var r=Su({},Fy,t,e);if(!r)return;var n=r.key;if(n&&"normal"==n){var i=r.styleUrl;i&&(e[e.length-1]=i);var o=r.Style;o&&(e[e.length-1]=o)}}});function oy(t,e){return Su(void 0,iy,t,e)}var ay=Eu(Gg,{Icon:du(function(t,e){var r=Su({},_y,t,e);return r||null}),heading:du(s_),hotSpot:du(function(t){var e,r=t.getAttribute("xunits"),n=t.getAttribute("yunits");return e="insetPixels"!==r?"insetPixels"!==n?al.BOTTOM_LEFT:al.TOP_LEFT:"insetPixels"!==n?al.BOTTOM_RIGHT:al.TOP_RIGHT,{x:parseFloat(t.getAttribute("x")),xunits:Dg[r],y:parseFloat(t.getAttribute("y")),yunits:Dg[n],origin:e}}),scale:du(ny)});var sy=Eu(Gg,{color:du(ty),scale:du(ny)});var uy=Eu(Gg,{color:du(ty),width:du(s_)});var ly=Eu(Gg,{color:du(ty),fill:du(i_),outline:du(i_)});var hy=Eu(Gg,{coordinates:pu(ey)});function cy(t,e){return Su(null,hy,t,e)}var py=Eu(Ng,{Track:cu(dy)});var fy=Eu(Gg,{when:function(t,e){var r=e[e.length-1].whens,n=su(t,!1),i=Date.parse(n);r.push(isNaN(i)?0:i)}},Eu(Ng,{coord:function(t,e){var r=e[e.length-1].flatCoordinates,n=su(t,!1),i=/^\s*([+\-]?\d+(?:\.\d*)?(?:e[+\-]?\d*)?)\s+([+\-]?\d+(?:\.\d*)?(?:e[+\-]?\d*)?)\s+([+\-]?\d+(?:\.\d*)?(?:e[+\-]?\d*)?)\s*$/i.exec(n);if(i){var o=parseFloat(i[1]),a=parseFloat(i[2]),s=parseFloat(i[3]);r.push(o,a,s,0)}else r.push(0,0,0,0)}}));function dy(t,e){var r=Su({flatCoordinates:[],whens:[]},fy,t,e);if(r){for(var n=r.flatCoordinates,i=r.whens,o=0,a=Math.min(n.length,i.length);o<a;++o)n[4*o+3]=i[o];return new yf(n,Ut.XYZM)}}var _y=Eu(Gg,{href:du(ry)},Eu(Ng,{x:du(s_),y:du(s_),w:du(s_),h:du(s_)}));var gy=Eu(Gg,{coordinates:pu(ey)});function yy(t,e){return Su(null,gy,t,e)}var vy=Eu(Gg,{extrude:du(i_),tessellate:du(i_),altitudeMode:du(c_)});function my(t,e){var r=Su({},vy,t,e),n=yy(t,e);if(n){var i=new yf(n,Ut.XYZ);return i.setProperties(r,!0),i}}function Ey(t,e){var r=Su({},vy,t,e),n=yy(t,e);if(n){var i=new Xr(n,Ut.XYZ,[n.length]);return i.setProperties(r,!0),i}}var Ty=Eu(Gg,{LineString:cu(my),LinearRing:cu(Ey),MultiGeometry:cu(Sy),Point:cu(wy),Polygon:cu(Oy)});function Sy(t,e){var r,n=Su([],Ty,t,e);if(!n)return null;if(0===n.length)return new Gd(n);for(var i=!0,o=n[0].getType(),a=1,s=n.length;a<s;++a)if(n[a].getType()!=o){i=!1;break}if(i){var u=void 0,l=void 0;if(o==Yt.POINT){var h=n[0];u=h.getLayout(),l=h.getFlatCoordinates();for(a=1,s=n.length;a<s;++a)$(l,n[a].getFlatCoordinates());Py(r=new Zf(l,u),n)}else o==Yt.LINE_STRING?Py(r=new Vf(n),n):o==Yt.POLYGON?Py(r=new qf(n),n):o==Yt.GEOMETRY_COLLECTION?r=new Gd(n):W(!1,37)}else r=new Gd(n);return r}function wy(t,e){var r=Su({},vy,t,e),n=yy(t,e);if(n){var i=new Cr(n,Ut.XYZ);return i.setProperties(r,!0),i}}var xy=Eu(Gg,{innerBoundaryIs:function(t,e){var r=Su(void 0,Dy,t,e);if(r){var n=e[e.length-1];n.push(r)}},outerBoundaryIs:function(t,e){var r=Su(void 0,ky,t,e);if(r){var n=e[e.length-1];n[0]=r}}});function Oy(t,e){var r=Su({},vy,t,e),n=Su([null],xy,t,e);if(n&&n[0]){for(var i=n[0],o=[i.length],a=1,s=n.length;a<s;++a)$(i,n[a]),o.push(i.length);var u=new Xr(i,Ut.XYZ,o);return u.setProperties(r,!0),u}}var Cy=Eu(Gg,{IconStyle:function(t,e){var r=Su({},ay,t,e);if(r){var n,i,o,a,s=e[e.length-1],u="Icon"in r?r.Icon:{},l=!("Icon"in r)||Object.keys(u).length>0,h=u.href;h?n=h:l&&(n=xg);var c,p=al.BOTTOM_LEFT,f=r.hotSpot;f?(i=[f.x,f.y],o=f.xunits,a=f.yunits,p=f.origin):n===xg?(i=Eg,o=Tg,a=Sg):/^http:\/\/maps\.(?:google|gstatic)\.com\//.test(n)&&(i=[.5,0],o=nl.FRACTION,a=nl.FRACTION);var d,_=u.x,g=u.y;void 0!==_&&void 0!==g&&(c=[_,g]);var y,v=u.w,m=u.h;void 0!==v&&void 0!==m&&(d=[v,m]);var E=r.heading;void 0!==E&&(y=Kt(E));var T=r.scale;if(l){n==xg&&(d=wg,void 0===T&&(T=Og));var S=new ul({anchor:i,anchorOrigin:p,anchorXUnits:o,anchorYUnits:a,crossOrigin:"anonymous",offset:c,offsetOrigin:al.BOTTOM_LEFT,rotation:y,scale:T,size:d,src:n});s.imageStyle=S}else s.imageStyle=Vg}},LabelStyle:function(t,e){var r=Su({},sy,t,e);if(r){var n=e[e.length-1],i=new vl({fill:new rl({color:"color"in r?r.color:mg}),scale:r.scale});n.textStyle=i}},LineStyle:function(t,e){var r=Su({},uy,t,e);if(r){var n=e[e.length-1],i=new ll({color:"color"in r?r.color:mg,width:"width"in r?r.width:1});n.strokeStyle=i}},PolyStyle:function(t,e){var r=Su({},ly,t,e);if(r){var n=e[e.length-1],i=new rl({color:"color"in r?r.color:mg});n.fillStyle=i;var o=r.fill;void 0!==o&&(n.fill=o);var a=r.outline;void 0!==a&&(n.outline=a)}}});function Ry(t,e){var r=Su({},Cy,t,e);if(!r)return null;var n,i="fillStyle"in r?r.fillStyle:zg,o=r.fill;void 0===o||o||(i=null),"imageStyle"in r?r.imageStyle!=Vg&&(n=r.imageStyle):n=Wg;var a="textStyle"in r?r.textStyle:Hg,s="strokeStyle"in r?r.strokeStyle:Kg,u=r.outline;return void 0===u||u||(s=null),[new _l({fill:i,image:n,stroke:s,text:a,zIndex:void 0})]}function Py(t,e){var r,n,i,o=e.length,a=new Array(e.length),s=new Array(e.length),u=new Array(e.length);r=n=i=!1;for(var l=0;l<o;++l){var h=e[l];a[l]=h.get("extrude"),s[l]=h.get("tessellate"),u[l]=h.get("altitudeMode"),r=r||void 0!==a[l],n=n||void 0!==s[l],i=i||u[l]}r&&t.set("extrude",a),n&&t.set("tessellate",s),i&&t.set("altitudeMode",u)}var by=Eu(Gg,{displayName:du(c_),value:du(c_)});var Iy=Eu(Gg,{Data:function(t,e){var r=t.getAttribute("name");Tu(by,t,e);var n=e[e.length-1];null!==r?n[r]=n.value:null!==n.displayName&&(n[n.displayName]=n.value),delete n.value},SchemaData:function(t,e){Tu(Ay,t,e)}});function Ly(t,e){Tu(Iy,t,e)}function My(t,e){Tu(Yg,t,e)}var Fy=Eu(Gg,{Style:du(Ry),key:du(c_),styleUrl:du(ry)});var Ay=Eu(Gg,{SimpleData:function(t,e){var r=t.getAttribute("name");if(null!==r){var n=c_(t),i=e[e.length-1];i[r]=n}}});var Ny=Eu(Gg,{altitudeMode:du(c_),minAltitude:du(s_),maxAltitude:du(s_),north:du(s_),south:du(s_),east:du(s_),west:du(s_)});var Gy=Eu(Gg,{minLodPixels:du(s_),maxLodPixels:du(s_),minFadeExtent:du(s_),maxFadeExtent:du(s_)});var Dy=Eu(Gg,{LinearRing:pu(cy)});var ky=Eu(Gg,{LinearRing:pu(cy)});function jy(t,e){for(var r=Qa(e),n=[255*(4==r.length?r[3]:1),r[2],r[1],r[0]],i=0;i<4;++i){var o=Math.floor(n[i]).toString(16);n[i]=1==o.length?"0"+o:o}__(t,n.join(""))}var Uy=Eu(Gg,{Data:_u(function(t,e,r){t.setAttribute("name",e.name);var n={node:t},i=e.value;"object"==typeof i?(null!==i&&i.displayName&&xu(n,Uy,vu,[i.displayName],r,["displayName"]),null!==i&&i.value&&xu(n,Uy,vu,[i.value],r,["value"])):xu(n,Uy,vu,[i],r,["value"])}),value:_u(function(t,e){__(t,e)}),displayName:_u(function(t,e){!function(t,e){t.appendChild(iu.createCDATASection(e))}(t,e)})});var Yy=Eu(Gg,{Placemark:_u(pv)}),Xy=function(t,e,r){return au(e[e.length-1].node.namespaceURI,"Placemark")};var By=yu("Data");var zy=Eu(Gg,["href"],Eu(Ng,["x","y","w","h"])),Vy=Eu(Gg,{href:_u(__)},Eu(Ng,{x:_u(f_),y:_u(f_),w:_u(f_),h:_u(f_)})),Wy=function(t,e,r){return au(Ng[0],"gx:"+r)};var Zy=Eu(Gg,["scale","heading","Icon","hotSpot"]),Ky=Eu(Gg,{Icon:_u(function(t,e,r){var n={node:t},i=r[r.length-1].node,o=zy[i.namespaceURI],a=mu(e,o);xu(n,Vy,vu,a,r,o),a=mu(e,o=zy[Ng[0]]),xu(n,Vy,Wy,a,r,o)}),heading:_u(f_),hotSpot:_u(function(t,e){t.setAttribute("x",String(e.x)),t.setAttribute("y",String(e.y)),t.setAttribute("xunits",e.xunits),t.setAttribute("yunits",e.yunits)}),scale:_u(Sv)});var Hy=Eu(Gg,["color","scale"]),qy=Eu(Gg,{color:_u(jy),scale:_u(Sv)});var Jy=Eu(Gg,["color","width"]),Qy=Eu(Gg,{color:_u(jy),width:_u(f_)});var $y={Point:"Point",LineString:"LineString",LinearRing:"LinearRing",Polygon:"Polygon",MultiPoint:"MultiGeometry",MultiLineString:"MultiGeometry",MultiPolygon:"MultiGeometry",GeometryCollection:"MultiGeometry"},tv=function(t,e,r){if(t)return au(e[e.length-1].node.namespaceURI,$y[t.getType()])},ev=yu("Point"),rv=yu("LineString"),nv=yu("LinearRing"),iv=yu("Polygon"),ov=Eu(Gg,{LineString:_u(_v),Point:_u(_v),Polygon:_u(mv),GeometryCollection:_u(av)});function av(t,e,r){var n,i,o={node:t},a=e.getType();a==Yt.GEOMETRY_COLLECTION?(n=e.getGeometries(),i=tv):a==Yt.MULTI_POINT?(n=e.getPoints(),i=ev):a==Yt.MULTI_LINE_STRING?(n=e.getLineStrings(),i=rv):a==Yt.MULTI_POLYGON?(n=e.getPolygons(),i=iv):W(!1,39),xu(o,ov,i,n,r)}var sv=Eu(Gg,{LinearRing:_u(_v)});function uv(t,e,r){xu({node:t},sv,nv,[e],r)}var lv=Eu(Gg,{ExtendedData:_u(function(t,e,r){for(var n={node:t},i=e.names,o=e.values,a=i.length,s=0;s<a;s++)xu(n,Uy,By,[{name:i[s],value:o[s]}],r)}),MultiGeometry:_u(av),LineString:_u(_v),LinearRing:_u(_v),Point:_u(_v),Polygon:_u(mv),Style:_u(function(t,e,r){var n={node:t},i={},o=e.getFill(),a=e.getStroke(),s=e.getImage(),u=e.getText();s&&"function"==typeof s.getSrc&&(i.IconStyle=s);u&&(i.LabelStyle=u);a&&(i.LineStyle=a);o&&(i.PolyStyle=o);var l=r[r.length-1].node,h=wv[l.namespaceURI],c=mu(i,h);xu(n,xv,vu,c,r,h)}),address:_u(__),description:_u(__),name:_u(__),open:_u(p_),phoneNumber:_u(__),styleUrl:_u(__),visibility:_u(p_)}),hv=Eu(Gg,["name","open","visibility","address","phoneNumber","description","styleUrl","Style"]),cv=yu("ExtendedData");function pv(t,e,r){var n={node:t};e.getId()&&t.setAttribute("id",e.getId());var i=e.getProperties(),o={address:1,description:1,name:1,open:1,phoneNumber:1,styleUrl:1,visibility:1};o[e.getGeometryName()]=1;var a=Object.keys(i||{}).sort().filter(function(t){return!o[t]});if(a.length>0){var s=mu(i,a);xu(n,lv,cv,[{names:a,values:s}],r)}var u=e.getStyleFunction();if(u){var l=u(e,0);if(l){var h=Array.isArray(l)?l[0]:l;this.writeStyles_&&(i.Style=h);var c=h.getText();c&&(i.name=c.getText())}}var p=r[r.length-1].node,f=hv[p.namespaceURI],d=mu(i,f);xu(n,lv,vu,d,r,f);var _=r[0],g=e.getGeometry();g&&(g=kd(g,!0,_)),xu(n,lv,tv,[g],r)}var fv=Eu(Gg,["extrude","tessellate","altitudeMode","coordinates"]),dv=Eu(Gg,{extrude:_u(p_),tessellate:_u(p_),altitudeMode:_u(__),coordinates:_u(function(t,e,r){var n,i=r[r.length-1],o=i.layout,a=i.stride;o==Ut.XY||o==Ut.XYM?n=2:o==Ut.XYZ||o==Ut.XYZM?n=3:W(!1,34);var s=e.length,u="";if(s>0){u+=e[0];for(var l=1;l<n;++l)u+=","+e[l];for(var h=a;h<s;h+=a)for(u+=" "+e[h],l=1;l<n;++l)u+=","+e[h+l]}__(t,u)})});function _v(t,e,r){var n=e.getFlatCoordinates(),i={node:t};i.layout=e.getLayout(),i.stride=e.getStride();var o=e.getProperties();o.coordinates=n;var a=r[r.length-1].node,s=fv[a.namespaceURI],u=mu(o,s);xu(i,dv,vu,u,r,s)}var gv=Eu(Gg,{outerBoundaryIs:_u(uv),innerBoundaryIs:_u(uv)}),yv=yu("innerBoundaryIs"),vv=yu("outerBoundaryIs");function mv(t,e,r){var n=e.getLinearRings(),i=n.shift(),o={node:t};xu(o,gv,yv,n,r),xu(o,gv,vv,[i],r)}var Ev=Eu(Gg,{color:_u(jy)}),Tv=yu("color");function Sv(t,e){f_(t,Math.round(1e6*e)/1e6)}var wv=Eu(Gg,["IconStyle","LabelStyle","LineStyle","PolyStyle"]),xv=Eu(Gg,{IconStyle:_u(function(t,e,r){var n={node:t},i={},o=e.getSrc(),a=e.getSize(),s=e.getImageSize(),u={href:o};if(a){u.w=a[0],u.h=a[1];var l=e.getAnchor(),h=e.getOrigin();if(h&&s&&0!==h[0]&&h[1]!==a[1]&&(u.x=h[0],u.y=s[1]-(h[1]+a[1])),l&&(l[0]!==a[0]/2||l[1]!==a[1]/2)){var c={x:l[0],xunits:nl.PIXELS,y:a[1]-l[1],yunits:nl.PIXELS};i.hotSpot=c}}i.Icon=u;var p=e.getScale();1!==p&&(i.scale=p);var f=e.getRotation();0!==f&&(i.heading=f);var d=r[r.length-1].node,_=Zy[d.namespaceURI],g=mu(i,_);xu(n,Ky,vu,g,r,_)}),LabelStyle:_u(function(t,e,r){var n={node:t},i={},o=e.getFill();o&&(i.color=o.getColor());var a=e.getScale();a&&1!==a&&(i.scale=a);var s=r[r.length-1].node,u=Hy[s.namespaceURI],l=mu(i,u);xu(n,qy,vu,l,r,u)}),LineStyle:_u(function(t,e,r){var n={node:t},i={color:e.getColor(),width:e.getWidth()},o=r[r.length-1].node,a=Jy[o.namespaceURI],s=mu(i,a);xu(n,Qy,vu,s,r,a)}),PolyStyle:_u(function(t,e,r){xu({node:t},Ev,Tv,[e.getColor()],r)})});var Ov=Qg,Cv=r(1),Rv=r.n(Cv),Pv=[1,0,0,1,0,0],bv=function(){function t(t,e,r,n,i){this.extent_,this.id_=i,this.type_=t,this.flatCoordinates_=e,this.flatInteriorPoints_=null,this.flatMidpoints_=null,this.ends_=r,this.properties_=n}return t.prototype.get=function(t){return this.properties_[t]},t.prototype.getExtent=function(){return this.extent_||(this.extent_=this.type_===Yt.POINT?gt(this.flatCoordinates_):yt(this.flatCoordinates_,0,this.flatCoordinates_.length,2)),this.extent_},t.prototype.getFlatInteriorPoint=function(){if(!this.flatInteriorPoints_){var t=Pt(this.getExtent());this.flatInteriorPoints_=Ir(this.flatCoordinates_,0,this.ends_,2,t,0)}return this.flatInteriorPoints_},t.prototype.getFlatInteriorPoints=function(){if(!this.flatInteriorPoints_){var t=Kf(this.flatCoordinates_,0,this.ends_,2);this.flatInteriorPoints_=Lr(this.flatCoordinates_,0,this.ends_,2,t)}return this.flatInteriorPoints_},t.prototype.getFlatMidpoint=function(){return this.flatMidpoints_||(this.flatMidpoints_=df(this.flatCoordinates_,0,this.flatCoordinates_.length,2,.5)),this.flatMidpoints_},t.prototype.getFlatMidpoints=function(){if(!this.flatMidpoints_){this.flatMidpoints_=[];for(var t=this.flatCoordinates_,e=0,r=this.ends_,n=0,i=r.length;n<i;++n){var o=r[n],a=df(t,e,o,2,.5);$(this.flatMidpoints_,a),e=o}}return this.flatMidpoints_},t.prototype.getId=function(){return this.id_},t.prototype.getOrientedFlatCoordinates=function(){return this.flatCoordinates_},t.prototype.getGeometry=function(){return this},t.prototype.getSimplifiedGeometry=function(t){return this},t.prototype.getProperties=function(){return this.properties_},t.prototype.getStride=function(){return 2},t.prototype.getStyleFunction=function(){},t.prototype.getType=function(){return this.type_},t.prototype.transform=function(t,e){var r=(t=Ie(t)).getExtent(),n=t.getWorldExtent(),i=Lt(n)/Lt(r);qe(Pv,n[0],n[3],i,-i,0,0,0),Xt(this.flatCoordinates_,0,this.flatCoordinates_.length,2,Pv,this.flatCoordinates_)},t}();bv.prototype.getEnds=bv.prototype.getEndss=function(){return this.ends_},bv.prototype.getFlatCoordinates=bv.prototype.getOrientedFlatCoordinates;var Iv=bv,Lv=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}();function Mv(t,e,r){if(3===t){var n={keys:[],values:[],features:[]},i=r.readVarint()+r.pos;r.readFields(Fv,n,i),n.length=n.features.length,n.length&&(e[n.name]=n)}}function Fv(t,e,r){if(15===t)e.version=r.readVarint();else if(1===t)e.name=r.readString();else if(5===t)e.extent=r.readVarint();else if(2===t)e.features.push(r.pos);else if(3===t)e.keys.push(r.readString());else if(4===t){for(var n=null,i=r.readVarint()+r.pos;r.pos<i;)n=1===(t=r.readVarint()>>3)?r.readString():2===t?r.readFloat():3===t?r.readDouble():4===t?r.readVarint64():5===t?r.readVarint():6===t?r.readSVarint():7===t?r.readBoolean():null;e.values.push(n)}}function Av(t,e,r){if(1==t)e.id=r.readVarint();else if(2==t)for(var n=r.readVarint()+r.pos;r.pos<n;){var i=e.layer.keys[r.readVarint()],o=e.layer.values[r.readVarint()];e.properties[i]=o}else 3==t?e.type=r.readVarint():4==t&&(e.geometry=r.pos)}function Nv(t,e,r){t.pos=e.features[r];var n=t.readVarint()+t.pos,i={layer:e,type:0,properties:{}};return t.readFields(Av,i,n),i}var Gv=function(t){function e(e){var r=t.call(this)||this,n=e||{};return r.dataProjection=new oe({code:"",units:ie.TILE_PIXELS}),r.featureClass_=n.featureClass?n.featureClass:Iv,r.geometryName_=n.geometryName,r.layerName_=n.layerName?n.layerName:"layer",r.layers_=n.layers?n.layers:null,r}return Lv(e,t),e.prototype.readRawGeometry_=function(t,e,r,n){t.pos=e.geometry;for(var i=t.readVarint()+t.pos,o=1,a=0,s=0,u=0,l=0,h=0;t.pos<i;){if(!a){var c=t.readVarint();o=7&c,a=c>>3}a--,1===o||2===o?(s+=t.readSVarint(),u+=t.readSVarint(),1===o&&l>h&&(n.push(l),h=l),r.push(s,u),l+=2):7===o?l>h&&(r.push(r[h],r[h+1]),l+=2):W(!1,59)}l>h&&(n.push(l),h=l)},e.prototype.createFeature_=function(t,e,r){var n,i=e.type;if(0===i)return null;var o=e.id,a=e.properties;a[this.layerName_]=e.layer.name;var s=[],u=[];this.readRawGeometry_(t,e,s,u);var l=function(t,e){var r;1===t?r=1===e?Yt.POINT:Yt.MULTI_POINT:2===t?r=1===e?Yt.LINE_STRING:Yt.MULTI_LINE_STRING:3===t&&(r=Yt.POLYGON);return r}(i,u.length);if(this.featureClass_===Iv)(n=new this.featureClass_(l,s,u,a,o)).transform(r.dataProjection,r.featureProjection);else{var h=void 0;if(l==Yt.POLYGON){for(var c=[],p=0,f=0,d=0,_=u.length;d<_;++d){var g=u[d];Gr(s,p,g,2)||(c.push(u.slice(f,d)),f=d),p=g}h=c.length>1?new qf(s,Ut.XY,c):new Xr(s,Ut.XY,u)}else h=l===Yt.POINT?new Cr(s,Ut.XY):l===Yt.LINE_STRING?new yf(s,Ut.XY):l===Yt.POLYGON?new Xr(s,Ut.XY,u):l===Yt.MULTI_POINT?new Zf(s,Ut.XY):l===Yt.MULTI_LINE_STRING?new Vf(s,Ut.XY,u):null;n=new(0,this.featureClass_),this.geometryName_&&n.setGeometryName(this.geometryName_);var y=kd(h,!1,r);n.setGeometry(y),n.setId(o),n.setProperties(a,!0)}return n},e.prototype.getType=function(){return gs.ARRAY_BUFFER},e.prototype.readFeatures=function(t,e){var r=this.layers_,n=this.adaptOptions(e),i=Ie(n.dataProjection);i.setWorldExtent(n.extent),n.dataProjection=i;var o=new Rv.a(t),a=o.readFields(Mv,{}),s=[];for(var u in a)if(!r||-1!=r.indexOf(u)){var l=a[u],h=l?[0,0,l.extent,l.extent]:null;i.setExtent(h);for(var c=0,p=l.length;c<p;++c){var f=Nv(o,l,c);s.push(this.createFeature_(o,f,n))}}return s},e.prototype.readProjection=function(t){return this.dataProjection},e.prototype.setLayers=function(t){this.layers_=t},e}(Dd),Dv=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),kv=[null],jv=Eu(kv,{nd:function(t,e){e[e.length-1].ndrefs.push(t.getAttribute("ref"))},tag:Bv}),Uv=Eu(kv,{node:function(t,e){var r=e[0],n=e[e.length-1],i=t.getAttribute("id"),o=[parseFloat(t.getAttribute("lon")),parseFloat(t.getAttribute("lat"))];n.nodes[i]=o;var a=Su({tags:{}},Xv,t,e);if(!_(a.tags)){var s=new Cr(o);kd(s,!1,r);var u=new K(s);u.setId(i),u.setProperties(a.tags,!0),n.features.push(u)}},way:function(t,e){var r=Su({id:t.getAttribute("id"),ndrefs:[],tags:{}},jv,t,e);e[e.length-1].ways.push(r)}}),Yv=function(t){function e(){var e=t.call(this)||this;return e.dataProjection=Ie("EPSG:4326"),e}return Dv(e,t),e.prototype.readFeaturesFromNode=function(t,e){var r=this.getReadOptions(t,e);if("osm"==t.localName){for(var n=Su({nodes:{},ways:[],features:[]},Uv,t,[r]),i=0;i<n.ways.length;i++){for(var o=n.ways[i],a=[],s=0,u=o.ndrefs.length;s<u;s++){$(a,n.nodes[o.ndrefs[s]])}var l=void 0;kd(l=o.ndrefs[0]==o.ndrefs[o.ndrefs.length-1]?new Xr(a,Ut.XY,[a.length]):new yf(a,Ut.XY),!1,r);var h=new K(l);h.setId(o.id),h.setProperties(o.tags,!0),n.features.push(h)}if(n.features)return n.features}return[]},e}(Qd),Xv=Eu(kv,{tag:Bv});function Bv(t,e){e[e.length-1].tags[t.getAttribute("k")]=t.getAttribute("v")}var zv=Yv;function Vv(t,e,r,n,i,o){var a,s;void 0!==i?(a=i,s=void 0!==o?o:0):(a=[],s=0);for(var u=e;u<r;){var l=t[u++];a[s++]=t[u++],a[s++]=l;for(var h=2;h<n;++h)a[s++]=t[u++]}return a.length=s,a}var Wv=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}();function Zv(t,e,r){var n,i=r||1e5,o=new Array(e);for(n=0;n<e;++n)o[n]=0;for(var a=0,s=t.length;a<s;)for(n=0;n<e;++n,++a){var u=t[a],l=u-o[n];o[n]=u,t[a]=l}return Hv(t,i)}function Kv(t,e,r){var n,i=r||1e5,o=new Array(e);for(n=0;n<e;++n)o[n]=0;for(var a=qv(t,i),s=0,u=a.length;s<u;)for(n=0;n<e;++n,++s)o[n]+=a[s],a[s]=o[n];return a}function Hv(t,e){for(var r=e||1e5,n=0,i=t.length;n<i;++n)t[n]=Math.round(t[n]*r);return function(t){for(var e=0,r=t.length;e<r;++e){var n=t[e];t[e]=n<0?~(n<<1):n<<1}return function(t){for(var e="",r=0,n=t.length;r<n;++r)e+=Jv(t[r]);return e}(t)}(t)}function qv(t,e){for(var r=e||1e5,n=function(t){for(var e=function(t){for(var e=[],r=0,n=0,i=0,o=t.length;i<o;++i){var a=t.charCodeAt(i)-63;r|=(31&a)<<n,a<32?(e.push(r),r=0,n=0):n+=5}return e}(t),r=0,n=e.length;r<n;++r){var i=e[r];e[r]=1&i?~(i>>1):i>>1}return e}(t),i=0,o=n.length;i<o;++i)n[i]/=r;return n}function Jv(t){for(var e,r="";t>=32;)e=63+(32|31&t),r+=String.fromCharCode(e),t>>=5;return e=t+63,r+=String.fromCharCode(e)}var Qv=function(t){function e(e){var r=t.call(this)||this,n=e||{};return r.dataProjection=Ie("EPSG:4326"),r.factor_=n.factor?n.factor:1e5,r.geometryLayout_=n.geometryLayout?n.geometryLayout:Ut.XY,r}return Wv(e,t),e.prototype.readFeatureFromText=function(t,e){var r=this.readGeometryFromText(t,e);return new K(r)},e.prototype.readFeaturesFromText=function(t,e){return[this.readFeatureFromText(t,e)]},e.prototype.readGeometryFromText=function(t,e){var r=nr(this.geometryLayout_),n=Kv(t,r,this.factor_);Vv(n,0,n.length,r,n);var i=_r(n,0,n.length,r);return kd(new yf(i,this.geometryLayout_),!1,this.adaptOptions(e))},e.prototype.writeFeatureText=function(t,e){var r=t.getGeometry();return r?this.writeGeometryText(r,e):(W(!1,40),"")},e.prototype.writeFeaturesText=function(t,e){return this.writeFeatureText(t[0],e)},e.prototype.writeGeometryText=function(t,e){var r=(t=kd(t,!0,this.adaptOptions(e))).getFlatCoordinates(),n=t.getStride();return Vv(r,0,r.length,n,r),Zv(r,n,this.factor_)},e}(Cg),$v=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),tm=function(t){function e(e){var r=t.call(this)||this,n=e||{};return r.layerName_=n.layerName,r.layers_=n.layers?n.layers:null,r.dataProjection=Ie(n.dataProjection?n.dataProjection:"EPSG:4326"),r}return $v(e,t),e.prototype.readFeaturesFromObject=function(t,e){if("Topology"==t.type){var r=t,n=void 0,i=null,o=null;r.transform&&(i=(n=r.transform).scale,o=n.translate);var a=r.arcs;n&&function(t,e,r){for(var n=0,i=t.length;n<i;++n)om(t[n],e,r)}(a,i,o);var s=[],u=r.objects,l=this.layerName_,h=void 0;for(var c in u)this.layers_&&-1==this.layers_.indexOf(c)||("GeometryCollection"===u[c].type?(h=u[c],s.push.apply(s,nm(h,a,i,o,l,c,e))):(h=u[c],s.push(im(h,a,i,o,l,c,e))));return s}return[]},e.prototype.readProjectionFromObject=function(t){return this.dataProjection},e}(Xd),em={Point:function(t,e,r){var n=t.coordinates;e&&r&&am(n,e,r);return new Cr(n)},LineString:function(t,e){var r=rm(t.arcs,e);return new yf(r)},Polygon:function(t,e){for(var r=[],n=0,i=t.arcs.length;n<i;++n)r[n]=rm(t.arcs[n],e);return new Xr(r)},MultiPoint:function(t,e,r){var n=t.coordinates;if(e&&r)for(var i=0,o=n.length;i<o;++i)am(n[i],e,r);return new Zf(n)},MultiLineString:function(t,e){for(var r=[],n=0,i=t.arcs.length;n<i;++n)r[n]=rm(t.arcs[n],e);return new Vf(r)},MultiPolygon:function(t,e){for(var r=[],n=0,i=t.arcs.length;n<i;++n){for(var o=t.arcs[n],a=[],s=0,u=o.length;s<u;++s)a[s]=rm(o[s],e);r[n]=a}return new qf(r)}};function rm(t,e){for(var r,n,i=[],o=0,a=t.length;o<a;++o)r=t[o],o>0&&i.pop(),n=r>=0?e[r]:e[~r].slice().reverse(),i.push.apply(i,n);for(var s=0,u=i.length;s<u;++s)i[s]=i[s].slice();return i}function nm(t,e,r,n,i,o,a){for(var s=t.geometries,u=[],l=0,h=s.length;l<h;++l)u[l]=im(s[l],e,r,n,i,o,a);return u}function im(t,e,r,n,i,o,a){var s,u=t.type,l=em[u];s="Point"===u||"MultiPoint"===u?l(t,r,n):l(t,e);var h=new K;h.setGeometry(kd(s,!1,a)),void 0!==t.id&&h.setId(t.id);var c=t.properties;return i&&(c||(c={}),c[i]=o),c&&h.setProperties(c,!0),h}function om(t,e,r){for(var n=0,i=0,o=0,a=t.length;o<a;++o){var s=t[o];n+=s[0],i+=s[1],s[0]=n,s[1]=i,am(s,e,r)}}function am(t,e,r){t[0]=t[0]*e[0]+r[0],t[1]=t[1]*e[1]+r[1]}var sm=tm,um=function(){function t(t){this.tagName_=t}return t.prototype.getTagName=function(){return this.tagName_},t}(),lm=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),hm=function(t){function e(e,r){var n=t.call(this,e)||this;return n.conditions=r,W(n.conditions.length>=2,57),n}return lm(e,t),e}(um),cm=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),pm=function(t){function e(e){return t.call(this,"And",Array.prototype.slice.call(arguments))||this}return cm(e,t),e}(hm),fm=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),dm=function(t){function e(e,r,n){var i=t.call(this,"BBOX")||this;return i.geometryName=e,i.extent=r,i.srsName=n,i}return fm(e,t),e}(um),_m=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),gm=function(t){function e(e,r,n,i){var o=t.call(this,e)||this;return o.geometryName=r||"the_geom",o.geometry=n,o.srsName=i,o}return _m(e,t),e}(um),ym=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),vm=function(t){function e(e,r,n){return t.call(this,"Contains",e,r,n)||this}return ym(e,t),e}(gm),mm=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),Em=function(t){function e(e,r){var n=t.call(this,e)||this;return n.propertyName=r,n}return mm(e,t),e}(um),Tm=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),Sm=function(t){function e(e,r,n){var i=t.call(this,"During",e)||this;return i.begin=r,i.end=n,i}return Tm(e,t),e}(Em),wm=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),xm=function(t){function e(e,r,n,i){var o=t.call(this,e,r)||this;return o.expression=n,o.matchCase=i,o}return wm(e,t),e}(Em),Om=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),Cm=function(t){function e(e,r,n){return t.call(this,"PropertyIsEqualTo",e,r,n)||this}return Om(e,t),e}(xm),Rm=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),Pm=function(t){function e(e,r){return t.call(this,"PropertyIsGreaterThan",e,r)||this}return Rm(e,t),e}(xm),bm=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),Im=function(t){function e(e,r){return t.call(this,"PropertyIsGreaterThanOrEqualTo",e,r)||this}return bm(e,t),e}(xm),Lm=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),Mm=function(t){function e(e,r,n){return t.call(this,"Intersects",e,r,n)||this}return Lm(e,t),e}(gm),Fm=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),Am=function(t){function e(e,r,n){var i=t.call(this,"PropertyIsBetween",e)||this;return i.lowerBoundary=r,i.upperBoundary=n,i}return Fm(e,t),e}(Em),Nm=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),Gm=function(t){function e(e,r,n,i,o,a){var s=t.call(this,"PropertyIsLike",e)||this;return s.pattern=r,s.wildCard=void 0!==n?n:"*",s.singleChar=void 0!==i?i:".",s.escapeChar=void 0!==o?o:"!",s.matchCase=a,s}return Nm(e,t),e}(Em),Dm=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),km=function(t){function e(e){return t.call(this,"PropertyIsNull",e)||this}return Dm(e,t),e}(Em),jm=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),Um=function(t){function e(e,r){return t.call(this,"PropertyIsLessThan",e,r)||this}return jm(e,t),e}(xm),Ym=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),Xm=function(t){function e(e,r){return t.call(this,"PropertyIsLessThanOrEqualTo",e,r)||this}return Ym(e,t),e}(xm),Bm=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),zm=function(t){function e(e){var r=t.call(this,"Not")||this;return r.condition=e,r}return Bm(e,t),e}(um),Vm=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),Wm=function(t){function e(e,r,n){return t.call(this,"PropertyIsNotEqualTo",e,r,n)||this}return Vm(e,t),e}(xm),Zm=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),Km=function(t){function e(e){return t.call(this,"Or",Array.prototype.slice.call(arguments))||this}return Zm(e,t),e}(hm),Hm=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),qm=function(t){function e(e,r,n){return t.call(this,"Within",e,r,n)||this}return Hm(e,t),e}(gm);function Jm(t){var e=[null].concat(Array.prototype.slice.call(arguments));return new(Function.prototype.bind.apply(pm,e))}function Qm(t,e,r){return new dm(t,e,r)}var $m=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),tE={"http://www.opengis.net/gml":{boundedBy:du(n_.prototype.readGeometryElement,"bounds")}},eE={"http://www.opengis.net/wfs":{totalInserted:du(l_),totalUpdated:du(l_),totalDeleted:du(l_)}},rE={"http://www.opengis.net/wfs":{TransactionSummary:du(function(t,e){return Su({},eE,t,e)},"transactionSummary"),InsertResults:du(function(t,e){return Su([],dE,t,e)},"insertIds")}},nE={"http://www.opengis.net/wfs":{PropertyName:_u(__)}},iE={"http://www.opengis.net/wfs":{Insert:_u(function(t,e,r){var n=r[r.length-1],i=n.featureType,o=n.featureNS,a=n.gmlVersion,s=au(o,i);t.appendChild(s),2===a?R_.prototype.writeFeatureElement(s,e,r):E_.prototype.writeFeatureElement(s,e,r)}),Update:_u(function(t,e,r){var n=r[r.length-1];W(void 0!==e.getId(),27);var i=n.featureType,o=n.featurePrefix,a=n.featureNS,s=gE(o,i),u=e.getGeometryName();t.setAttribute("typeName",s),t.setAttributeNS(aE,"xmlns:"+o,a);var l=e.getId();if(void 0!==l){for(var h=e.getKeys(),c=[],p=0,f=h.length;p<f;p++){var d=e.get(h[p]);if(void 0!==d){var _=h[p];d&&"function"==typeof d.getSimplifiedGeometry&&(_=u),c.push({name:_,value:d})}}xu({gmlVersion:n.gmlVersion,node:t,hasZ:n.hasZ,srsName:n.srsName},iE,yu("Property"),c,r),_E(t,l,r)}}),Delete:_u(function(t,e,r){var n=r[r.length-1];W(void 0!==e.getId(),26);var i=n.featureType,o=n.featurePrefix,a=n.featureNS,s=gE(o,i);t.setAttribute("typeName",s),t.setAttributeNS(aE,"xmlns:"+o,a);var u=e.getId();void 0!==u&&_E(t,u,r)}),Property:_u(function(t,e,r){var n=au(uE,"Name"),i=r[r.length-1].gmlVersion;if(t.appendChild(n),__(n,e.name),void 0!==e.value&&null!==e.value){var o=au(uE,"Value");t.appendChild(o),e.value&&"function"==typeof e.value.getSimplifiedGeometry?2===i?R_.prototype.writeGeometryElement(o,e.value,r):E_.prototype.writeGeometryElement(o,e.value,r):__(o,e.value)}}),Native:_u(function(t,e,r){e.vendorId&&t.setAttribute("vendorId",e.vendorId);void 0!==e.safeToIgnore&&t.setAttribute("safeToIgnore",String(e.safeToIgnore));void 0!==e.value&&__(t,e.value)})}},oE="feature",aE="http://www.w3.org/2000/xmlns/",sE="http://www.opengis.net/ogc",uE="http://www.opengis.net/wfs",lE="http://www.opengis.net/fes",hE={"1.1.0":"http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/wfs.xsd","1.0.0":"http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.0.0/wfs.xsd"},cE="1.1.0",pE=function(t){function e(e){var r=t.call(this)||this,n=e||{};return r.featureType_=n.featureType,r.featureNS_=n.featureNS,r.gmlFormat_=n.gmlFormat?n.gmlFormat:new E_,r.schemaLocation_=n.schemaLocation?n.schemaLocation:hE[cE],r}return $m(e,t),e.prototype.getFeatureType=function(){return this.featureType_},e.prototype.setFeatureType=function(t){this.featureType_=t},e.prototype.readFeaturesFromNode=function(t,e){var r={node:t};p(r,{featureType:this.featureType_,featureNS:this.featureNS_}),p(r,this.getReadOptions(t,e||{}));var n=[r];this.gmlFormat_.FEATURE_COLLECTION_PARSERS[t_].featureMember=cu(n_.prototype.readFeaturesInternal);var i=Su([],this.gmlFormat_.FEATURE_COLLECTION_PARSERS,t,n,this.gmlFormat_);return i||(i=[]),i},e.prototype.readTransactionResponse=function(t){if(t){if("string"==typeof t){var e=lu(t);return this.readTransactionResponseFromDocument(e)}return uu(t)?this.readTransactionResponseFromDocument(t):this.readTransactionResponseFromNode(t)}},e.prototype.readFeatureCollectionMetadata=function(t){if(t){if("string"==typeof t){var e=lu(t);return this.readFeatureCollectionMetadataFromDocument(e)}return uu(t)?this.readFeatureCollectionMetadataFromDocument(t):this.readFeatureCollectionMetadataFromNode(t)}},e.prototype.readFeatureCollectionMetadataFromDocument=function(t){for(var e=t.firstChild;e;e=e.nextSibling)if(e.nodeType==Node.ELEMENT_NODE)return this.readFeatureCollectionMetadataFromNode(e)},e.prototype.readFeatureCollectionMetadataFromNode=function(t){var e={},r=h_(t.getAttribute("numberOfFeatures"));return e.numberOfFeatures=r,Su(e,tE,t,[],this.gmlFormat_)},e.prototype.readTransactionResponseFromDocument=function(t){for(var e=t.firstChild;e;e=e.nextSibling)if(e.nodeType==Node.ELEMENT_NODE)return this.readTransactionResponseFromNode(e)},e.prototype.readTransactionResponseFromNode=function(t){return Su({},rE,t,[])},e.prototype.writeGetFeature=function(t){var e,r=au(uE,"GetFeature");if(r.setAttribute("service","WFS"),r.setAttribute("version","1.1.0"),t&&(t.handle&&r.setAttribute("handle",t.handle),t.outputFormat&&r.setAttribute("outputFormat",t.outputFormat),void 0!==t.maxFeatures&&r.setAttribute("maxFeatures",String(t.maxFeatures)),t.resultType&&r.setAttribute("resultType",t.resultType),void 0!==t.startIndex&&r.setAttribute("startIndex",String(t.startIndex)),void 0!==t.count&&r.setAttribute("count",String(t.count)),void 0!==t.viewParams&&r.setAttribute("viewParams ",t.viewParams),e=t.filter,t.bbox)){W(t.geometryName,12);var n=Qm(t.geometryName,t.bbox,t.srsName);e=e?Jm(e,n):n}r.setAttributeNS(ou,"xsi:schemaLocation",this.schemaLocation_);var i={node:r};return p(i,{srsName:t.srsName,featureNS:t.featureNS?t.featureNS:this.featureNS_,featurePrefix:t.featurePrefix,geometryName:t.geometryName,filter:e,propertyNames:t.propertyNames?t.propertyNames:[]}),W(Array.isArray(t.featureTypes),11),function(t,e,r){var n=r[r.length-1],i=p({},n);i.node=t,xu(i,yE,yu("Query"),e,r)}(r,t.featureTypes,[i]),r},e.prototype.writeTransaction=function(t,e,r,n){var i,o,a=[],s=au(uE,"Transaction"),u=n.version?n.version:cE,l="1.0.0"===u?2:3;s.setAttribute("service","WFS"),s.setAttribute("version",u),n&&(i=n.gmlOptions?n.gmlOptions:{},n.handle&&s.setAttribute("handle",n.handle));var h=hE[u];s.setAttributeNS(ou,"xsi:schemaLocation",h);var c=n.featurePrefix?n.featurePrefix:oE;return t&&(o=p({node:s},{featureNS:n.featureNS,featureType:n.featureType,featurePrefix:c,gmlVersion:l,hasZ:n.hasZ,srsName:n.srsName}),p(o,i),xu(o,iE,yu("Insert"),t,a)),e&&(o=p({node:s},{featureNS:n.featureNS,featureType:n.featureType,featurePrefix:c,gmlVersion:l,hasZ:n.hasZ,srsName:n.srsName}),p(o,i),xu(o,iE,yu("Update"),e,a)),r&&xu({node:s,featureNS:n.featureNS,featureType:n.featureType,featurePrefix:c,gmlVersion:l,srsName:n.srsName},iE,yu("Delete"),r,a),n.nativeElements&&xu({node:s,featureNS:n.featureNS,featureType:n.featureType,featurePrefix:c,gmlVersion:l,srsName:n.srsName},iE,yu("Native"),n.nativeElements,a),s},e.prototype.readProjectionFromDocument=function(t){for(var e=t.firstChild;e;e=e.nextSibling)if(e.nodeType==Node.ELEMENT_NODE)return this.readProjectionFromNode(e);return null},e.prototype.readProjectionFromNode=function(t){if(t.firstElementChild&&t.firstElementChild.firstElementChild)for(var e=(t=t.firstElementChild.firstElementChild).firstElementChild;e;e=e.nextElementSibling)if(0!==e.childNodes.length&&(1!==e.childNodes.length||3!==e.firstChild.nodeType)){var r=[{}];return this.gmlFormat_.readGeometryElement(e,r),Ie(r.pop().srsName)}return null},e}(Qd);var fE={"http://www.opengis.net/ogc":{FeatureId:cu(function(t,e){return t.getAttribute("fid")})}};var dE={"http://www.opengis.net/wfs":{Feature:function(t,e){Tu(fE,t,e)}}};function _E(t,e,r){var n=au(sE,"Filter"),i=au(sE,"FeatureId");n.appendChild(i),i.setAttribute("fid",e),t.appendChild(n)}function gE(t,e){var r=(t=t||oE)+":";return 0===e.indexOf(r)?e:r+e}var yE={"http://www.opengis.net/wfs":{Query:_u(function(t,e,r){var n,i=r[r.length-1],o=i.featurePrefix,a=i.featureNS,s=i.propertyNames,u=i.srsName;n=o?gE(o,e):e;t.setAttribute("typeName",n),u&&t.setAttribute("srsName",u);a&&t.setAttributeNS(aE,"xmlns:"+o,a);var l=p({},i);l.node=t,xu(l,nE,yu("PropertyName"),s,r);var h=i.filter;if(h){var c=au(sE,"Filter");t.appendChild(c),vE(c,h,r)}})},"http://www.opengis.net/ogc":{During:_u(function(t,e,r){var n=au(lE,"ValueReference");__(n,e.propertyName),t.appendChild(n);var i=au(t_,"TimePeriod");t.appendChild(i);var o=au(t_,"begin");i.appendChild(o),xE(o,e.begin);var a=au(t_,"end");i.appendChild(a),xE(a,e.end)}),And:_u(mE),Or:_u(mE),Not:_u(function(t,e,r){var n={node:t},i=e.condition;xu(n,yE,yu(i.getTagName()),[i],r)}),BBOX:_u(function(t,e,r){r[r.length-1].srsName=e.srsName,SE(t,e.geometryName),E_.prototype.writeGeometryElement(t,e.extent,r)}),Contains:_u(function(t,e,r){r[r.length-1].srsName=e.srsName,SE(t,e.geometryName),E_.prototype.writeGeometryElement(t,e.geometry,r)}),Intersects:_u(function(t,e,r){r[r.length-1].srsName=e.srsName,SE(t,e.geometryName),E_.prototype.writeGeometryElement(t,e.geometry,r)}),Within:_u(function(t,e,r){r[r.length-1].srsName=e.srsName,SE(t,e.geometryName),E_.prototype.writeGeometryElement(t,e.geometry,r)}),PropertyIsEqualTo:_u(EE),PropertyIsNotEqualTo:_u(EE),PropertyIsLessThan:_u(EE),PropertyIsLessThanOrEqualTo:_u(EE),PropertyIsGreaterThan:_u(EE),PropertyIsGreaterThanOrEqualTo:_u(EE),PropertyIsNull:_u(function(t,e,r){SE(t,e.propertyName)}),PropertyIsBetween:_u(function(t,e,r){SE(t,e.propertyName);var n=au(sE,"LowerBoundary");t.appendChild(n),wE(n,""+e.lowerBoundary);var i=au(sE,"UpperBoundary");t.appendChild(i),wE(i,""+e.upperBoundary)}),PropertyIsLike:_u(function(t,e,r){t.setAttribute("wildCard",e.wildCard),t.setAttribute("singleChar",e.singleChar),t.setAttribute("escapeChar",e.escapeChar),void 0!==e.matchCase&&t.setAttribute("matchCase",e.matchCase.toString());SE(t,e.propertyName),wE(t,""+e.pattern)})}};function vE(t,e,r){xu({node:t},yE,yu(e.getTagName()),[e],r)}function mE(t,e,r){for(var n={node:t},i=e.conditions,o=0,a=i.length;o<a;++o){var s=i[o];xu(n,yE,yu(s.getTagName()),[s],r)}}function EE(t,e,r){void 0!==e.matchCase&&t.setAttribute("matchCase",e.matchCase.toString()),SE(t,e.propertyName),wE(t,""+e.expression)}function TE(t,e,r){var n=au(sE,t);__(n,r),e.appendChild(n)}function SE(t,e){TE("PropertyName",t,e)}function wE(t,e){TE("Literal",t,e)}function xE(t,e){var r=au(t_,"TimeInstant");t.appendChild(r);var n=au(t_,"timePosition");r.appendChild(n),__(n,e)}var OE=pE,CE=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),RE={POINT:Cr,LINESTRING:yf,POLYGON:Xr,MULTIPOINT:Zf,MULTILINESTRING:Vf,MULTIPOLYGON:qf},PE="EMPTY",bE="Z",IE="M",LE=1,ME=2,FE=3,AE=4,NE=5,GE=6,DE={};for(var kE in Yt)DE[kE]=Yt[kE].toUpperCase();var jE=function(){function t(t){this.wkt=t,this.index_=-1}return t.prototype.isAlpha_=function(t){return t>="a"&&t<="z"||t>="A"&&t<="Z"},t.prototype.isNumeric_=function(t,e){return t>="0"&&t<="9"||"."==t&&!(void 0!==e&&e)},t.prototype.isWhiteSpace_=function(t){return" "==t||"\t"==t||"\r"==t||"\n"==t},t.prototype.nextChar_=function(){return this.wkt.charAt(++this.index_)},t.prototype.nextToken=function(){var t,e=this.nextChar_(),r=this.index_,n=e;if("("==e)t=ME;else if(","==e)t=NE;else if(")"==e)t=FE;else if(this.isNumeric_(e)||"-"==e)t=AE,n=this.readNumber_();else if(this.isAlpha_(e))t=LE,n=this.readText_();else{if(this.isWhiteSpace_(e))return this.nextToken();if(""!==e)throw new Error("Unexpected character: "+e);t=GE}return{position:r,value:n,type:t}},t.prototype.readNumber_=function(){var t,e=this.index_,r=!1,n=!1;do{"."==t?r=!0:"e"!=t&&"E"!=t||(n=!0),t=this.nextChar_()}while(this.isNumeric_(t,r)||!n&&("e"==t||"E"==t)||n&&("-"==t||"+"==t));return parseFloat(this.wkt.substring(e,this.index_--))},t.prototype.readText_=function(){var t,e=this.index_;do{t=this.nextChar_()}while(this.isAlpha_(t));return this.wkt.substring(e,this.index_--).toUpperCase()},t}(),UE=function(){function t(t){this.lexer_=t,this.token_,this.layout_=Ut.XY}return t.prototype.consume_=function(){this.token_=this.lexer_.nextToken()},t.prototype.isTokenType=function(t){return this.token_.type==t},t.prototype.match=function(t){var e=this.isTokenType(t);return e&&this.consume_(),e},t.prototype.parse=function(){return this.consume_(),this.parseGeometry_()},t.prototype.parseGeometryLayout_=function(){var t=Ut.XY,e=this.token_;if(this.isTokenType(LE)){var r=e.value;r===bE?t=Ut.XYZ:r===IE?t=Ut.XYM:"ZM"===r&&(t=Ut.XYZM),t!==Ut.XY&&this.consume_()}return t},t.prototype.parseGeometryCollectionText_=function(){if(this.match(ME)){var t=[];do{t.push(this.parseGeometry_())}while(this.match(NE));if(this.match(FE))return t}else if(this.isEmptyGeometry_())return[];throw new Error(this.formatErrorMessage_())},t.prototype.parsePointText_=function(){if(this.match(ME)){var t=this.parsePoint_();if(this.match(FE))return t}else if(this.isEmptyGeometry_())return null;throw new Error(this.formatErrorMessage_())},t.prototype.parseLineStringText_=function(){if(this.match(ME)){var t=this.parsePointList_();if(this.match(FE))return t}else if(this.isEmptyGeometry_())return[];throw new Error(this.formatErrorMessage_())},t.prototype.parsePolygonText_=function(){if(this.match(ME)){var t=this.parseLineStringTextList_();if(this.match(FE))return t}else if(this.isEmptyGeometry_())return[];throw new Error(this.formatErrorMessage_())},t.prototype.parseMultiPointText_=function(){if(this.match(ME)){var t=void 0;if(t=this.token_.type==ME?this.parsePointTextList_():this.parsePointList_(),this.match(FE))return t}else if(this.isEmptyGeometry_())return[];throw new Error(this.formatErrorMessage_())},t.prototype.parseMultiLineStringText_=function(){if(this.match(ME)){var t=this.parseLineStringTextList_();if(this.match(FE))return t}else if(this.isEmptyGeometry_())return[];throw new Error(this.formatErrorMessage_())},t.prototype.parseMultiPolygonText_=function(){if(this.match(ME)){var t=this.parsePolygonTextList_();if(this.match(FE))return t}else if(this.isEmptyGeometry_())return[];throw new Error(this.formatErrorMessage_())},t.prototype.parsePoint_=function(){for(var t=[],e=this.layout_.length,r=0;r<e;++r){var n=this.token_;if(!this.match(AE))break;t.push(n.value)}if(t.length==e)return t;throw new Error(this.formatErrorMessage_())},t.prototype.parsePointList_=function(){for(var t=[this.parsePoint_()];this.match(NE);)t.push(this.parsePoint_());return t},t.prototype.parsePointTextList_=function(){for(var t=[this.parsePointText_()];this.match(NE);)t.push(this.parsePointText_());return t},t.prototype.parseLineStringTextList_=function(){for(var t=[this.parseLineStringText_()];this.match(NE);)t.push(this.parseLineStringText_());return t},t.prototype.parsePolygonTextList_=function(){for(var t=[this.parsePolygonText_()];this.match(NE);)t.push(this.parsePolygonText_());return t},t.prototype.isEmptyGeometry_=function(){var t=this.isTokenType(LE)&&this.token_.value==PE;return t&&this.consume_(),t},t.prototype.formatErrorMessage_=function(){return"Unexpected `"+this.token_.value+"` at position "+this.token_.position+" in `"+this.lexer_.wkt+"`"},t.prototype.parseGeometry_=function(){var t=this.token_;if(this.match(LE)){var e=t.value;if(this.layout_=this.parseGeometryLayout_(),"GEOMETRYCOLLECTION"==e){var r=this.parseGeometryCollectionText_();return new Gd(r)}var n=RE[e];if(!n)throw new Error("Invalid geometry type: "+e);var i=void 0;switch(e){case"POINT":i=this.parsePointText_();break;case"LINESTRING":i=this.parseLineStringText_();break;case"POLYGON":i=this.parsePolygonText_();break;case"MULTIPOINT":i=this.parseMultiPointText_();break;case"MULTILINESTRING":i=this.parseMultiLineStringText_();break;case"MULTIPOLYGON":i=this.parseMultiPolygonText_();break;default:throw new Error("Invalid geometry type: "+e)}return i||(i=n===RE.POINT?[NaN,NaN]:[]),new n(i,this.layout_)}throw new Error(this.formatErrorMessage_())},t}(),YE=function(t){function e(e){var r=t.call(this)||this,n=e||{};return r.splitCollection_=void 0!==n.splitCollection&&n.splitCollection,r}return CE(e,t),e.prototype.parse_=function(t){var e=new jE(t);return new UE(e).parse()},e.prototype.readFeatureFromText=function(t,e){var r=this.readGeometryFromText(t,e);if(r){var n=new K;return n.setGeometry(r),n}return null},e.prototype.readFeaturesFromText=function(t,e){for(var r=[],n=this.readGeometryFromText(t,e),i=[],o=0,a=(r=this.splitCollection_&&n.getType()==Yt.GEOMETRY_COLLECTION?n.getGeometriesArray():[n]).length;o<a;++o){var s=new K;s.setGeometry(r[o]),i.push(s)}return i},e.prototype.readGeometryFromText=function(t,e){var r=this.parse_(t);return r?kd(r,!1,e):null},e.prototype.writeFeatureText=function(t,e){var r=t.getGeometry();return r?this.writeGeometryText(r,e):""},e.prototype.writeFeaturesText=function(t,e){if(1==t.length)return this.writeFeatureText(t[0],e);for(var r=[],n=0,i=t.length;n<i;++n)r.push(t[n].getGeometry());var o=new Gd(r);return this.writeGeometryText(o,e)},e.prototype.writeGeometryText=function(t,e){return WE(kd(t,!0,e))},e}(Cg);function XE(t){var e=t.getCoordinates();return 0===e.length?"":e.join(" ")}function BE(t){for(var e=t.getCoordinates(),r=[],n=0,i=e.length;n<i;++n)r.push(e[n].join(" "));return r.join(",")}function zE(t){for(var e=[],r=t.getLinearRings(),n=0,i=r.length;n<i;++n)e.push("("+BE(r[n])+")");return e.join(",")}var VE={Point:XE,LineString:BE,Polygon:zE,MultiPoint:function(t){for(var e=[],r=t.getPoints(),n=0,i=r.length;n<i;++n)e.push("("+XE(r[n])+")");return e.join(",")},MultiLineString:function(t){for(var e=[],r=t.getLineStrings(),n=0,i=r.length;n<i;++n)e.push("("+BE(r[n])+")");return e.join(",")},MultiPolygon:function(t){for(var e=[],r=t.getPolygons(),n=0,i=r.length;n<i;++n)e.push("("+zE(r[n])+")");return e.join(",")},GeometryCollection:function(t){for(var e=[],r=t.getGeometries(),n=0,i=r.length;n<i;++n)e.push(WE(r[n]));return e.join(",")}};function WE(t){var e=t.getType(),r=(0,VE[e])(t);if(e=e.toUpperCase(),"function"==typeof t.getFlatCoordinates){var n=function(t){var e=t.getLayout(),r="";return e!==Ut.XYZ&&e!==Ut.XYZM||(r+=bE),e!==Ut.XYM&&e!==Ut.XYZM||(r+=IE),r}(t);n.length>0&&(e+=" "+n)}return 0===r.length?e+" "+PE:e+"("+r+")"}var ZE=YE,KE="http://www.w3.org/1999/xlink";function HE(t){return t.getAttributeNS(KE,"href")}var qE=function(){function t(){}return t.prototype.read=function(t){if(t){if("string"==typeof t){var e=lu(t);return this.readFromDocument(e)}return uu(t)?this.readFromDocument(t):this.readFromNode(t)}return null},t.prototype.readFromDocument=function(t){},t.prototype.readFromNode=function(t){},t}(),JE=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),QE=[null,"http://www.opengis.net/wms"],$E=Eu(QE,{Service:du(function(t,e){return Su({},rT,t,e)}),Capability:du(function(t,e){return Su({},tT,t,e)})}),tT=Eu(QE,{Request:du(function(t,e){return Su({},hT,t,e)}),Exception:du(function(t,e){return Su([],aT,t,e)}),Layer:du(function(t,e){return Su({},sT,t,e)})}),eT=function(t){function e(){var e=t.call(this)||this;return e.version=void 0,e}return JE(e,t),e.prototype.readFromDocument=function(t){for(var e=t.firstChild;e;e=e.nextSibling)if(e.nodeType==Node.ELEMENT_NODE)return this.readFromNode(e);return null},e.prototype.readFromNode=function(t){this.version=t.getAttribute("version").trim();var e=Su({version:this.version},$E,t,[]);return e||null},e}(qE),rT=Eu(QE,{Name:du(c_),Title:du(c_),Abstract:du(c_),KeywordList:du(ET),OnlineResource:du(HE),ContactInformation:du(function(t,e){return Su({},nT,t,e)}),Fees:du(c_),AccessConstraints:du(c_),LayerLimit:du(l_),MaxWidth:du(l_),MaxHeight:du(l_)}),nT=Eu(QE,{ContactPersonPrimary:du(function(t,e){return Su({},iT,t,e)}),ContactPosition:du(c_),ContactAddress:du(function(t,e){return Su({},oT,t,e)}),ContactVoiceTelephone:du(c_),ContactFacsimileTelephone:du(c_),ContactElectronicMailAddress:du(c_)}),iT=Eu(QE,{ContactPerson:du(c_),ContactOrganization:du(c_)}),oT=Eu(QE,{AddressType:du(c_),Address:du(c_),City:du(c_),StateOrProvince:du(c_),PostCode:du(c_),Country:du(c_)}),aT=Eu(QE,{Format:cu(c_)}),sT=Eu(QE,{Name:du(c_),Title:du(c_),Abstract:du(c_),KeywordList:du(ET),CRS:fu(c_),EX_GeographicBoundingBox:du(function(t,e){var r=Su({},lT,t,e);if(!r)return;var n=r.westBoundLongitude,i=r.southBoundLatitude,o=r.eastBoundLongitude,a=r.northBoundLatitude;if(void 0===n||void 0===i||void 0===o||void 0===a)return;return[n,i,o,a]}),BoundingBox:fu(function(t,e){var r=[u_(t.getAttribute("minx")),u_(t.getAttribute("miny")),u_(t.getAttribute("maxx")),u_(t.getAttribute("maxy"))],n=[u_(t.getAttribute("resx")),u_(t.getAttribute("resy"))];return{crs:t.getAttribute("CRS"),extent:r,res:n}}),Dimension:fu(function(t,e){return{name:t.getAttribute("name"),units:t.getAttribute("units"),unitSymbol:t.getAttribute("unitSymbol"),default:t.getAttribute("default"),multipleValues:o_(t.getAttribute("multipleValues")),nearestValue:o_(t.getAttribute("nearestValue")),current:o_(t.getAttribute("current")),values:c_(t)}}),Attribution:du(function(t,e){return Su({},uT,t,e)}),AuthorityURL:fu(function(t,e){var r=yT(t,e);if(r)return r.name=t.getAttribute("name"),r;return}),Identifier:fu(c_),MetadataURL:fu(function(t,e){var r=yT(t,e);if(r)return r.type=t.getAttribute("type"),r;return}),DataURL:fu(yT),FeatureListURL:fu(yT),Style:fu(function(t,e){return Su({},dT,t,e)}),MinScaleDenominator:du(s_),MaxScaleDenominator:du(s_),Layer:fu(function(t,e){var r=e[e.length-1],n=Su({},sT,t,e);if(!n)return;var i=o_(t.getAttribute("queryable"));void 0===i&&(i=r.queryable);n.queryable=void 0!==i&&i;var o=h_(t.getAttribute("cascaded"));void 0===o&&(o=r.cascaded);n.cascaded=o;var a=o_(t.getAttribute("opaque"));void 0===a&&(a=r.opaque);n.opaque=void 0!==a&&a;var s=o_(t.getAttribute("noSubsets"));void 0===s&&(s=r.noSubsets);n.noSubsets=void 0!==s&&s;var u=u_(t.getAttribute("fixedWidth"));u||(u=r.fixedWidth);n.fixedWidth=u;var l=u_(t.getAttribute("fixedHeight"));l||(l=r.fixedHeight);n.fixedHeight=l,["Style","CRS","AuthorityURL"].forEach(function(t){if(t in r){var e=n[t]||[];n[t]=e.concat(r[t])}});return["EX_GeographicBoundingBox","BoundingBox","Dimension","Attribution","MinScaleDenominator","MaxScaleDenominator"].forEach(function(t){if(!(t in n)){var e=r[t];n[t]=e}}),n})}),uT=Eu(QE,{Title:du(c_),OnlineResource:du(HE),LogoURL:du(mT)}),lT=Eu(QE,{westBoundLongitude:du(s_),eastBoundLongitude:du(s_),southBoundLatitude:du(s_),northBoundLatitude:du(s_)}),hT=Eu(QE,{GetCapabilities:du(vT),GetMap:du(vT),GetFeatureInfo:du(vT)}),cT=Eu(QE,{Format:fu(c_),DCPType:fu(function(t,e){return Su({},pT,t,e)})}),pT=Eu(QE,{HTTP:du(function(t,e){return Su({},fT,t,e)})}),fT=Eu(QE,{Get:du(yT),Post:du(yT)}),dT=Eu(QE,{Name:du(c_),Title:du(c_),Abstract:du(c_),LegendURL:fu(mT),StyleSheetURL:du(yT),StyleURL:du(yT)}),_T=Eu(QE,{Format:du(c_),OnlineResource:du(HE)}),gT=Eu(QE,{Keyword:cu(c_)});function yT(t,e){return Su({},_T,t,e)}function vT(t,e){return Su({},cT,t,e)}function mT(t,e){var r=yT(t,e);if(r){var n=[h_(t.getAttribute("width")),h_(t.getAttribute("height"))];return r.size=n,r}}function ET(t,e){return Su([],gT,t,e)}var TT=eT,ST=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),wT=function(t){function e(e){var r=t.call(this)||this,n=e||{};return r.featureNS_="http://mapserver.gis.umn.edu/mapserver",r.gmlFormat_=new R_,r.layers_=n.layers?n.layers:null,r}return ST(e,t),e.prototype.getLayers=function(){return this.layers_},e.prototype.setLayers=function(t){this.layers_=t},e.prototype.readFeatures_=function(t,e){t.setAttribute("namespaceURI",this.featureNS_);var r=t.localName,n=[];if(0===t.childNodes.length)return n;if("msGMLOutput"==r)for(var i=0,o=t.childNodes.length;i<o;i++){var a=t.childNodes[i];if(a.nodeType===Node.ELEMENT_NODE){var s=a,u=e[0],l=s.localName.replace("_layer","");if(!this.layers_||q(this.layers_,l)){var h=l+"_feature";u.featureType=h,u.featureNS=this.featureNS_;var c={};c[h]=cu(this.gmlFormat_.readFeatureElement,this.gmlFormat_);var p=Eu([u.featureNS,null],c);s.setAttribute("namespaceURI",this.featureNS_);var f=Su([],p,s,e,this.gmlFormat_);f&&$(n,f)}}}if("FeatureCollection"==r){var d=Su([],this.gmlFormat_.FEATURE_COLLECTION_PARSERS,t,[{}],this.gmlFormat_);d&&(n=d)}return n},e.prototype.readFeaturesFromNode=function(t,e){var r={};return e&&p(r,this.getReadOptions(t,e)),this.readFeatures_(t,[r])},e}(Qd),xT=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),OT=[null,"http://www.opengis.net/ows/1.1"],CT=Eu(OT,{ServiceIdentification:du(function(t,e){return Su({},jT,t,e)}),ServiceProvider:du(function(t,e){return Su({},UT,t,e)}),OperationsMetadata:du(function(t,e){return Su({},NT,t,e)})}),RT=function(t){function e(){return t.call(this)||this}return xT(e,t),e.prototype.readFromDocument=function(t){for(var e=t.firstChild;e;e=e.nextSibling)if(e.nodeType==Node.ELEMENT_NODE)return this.readFromNode(e);return null},e.prototype.readFromNode=function(t){var e=Su({},CT,t,[]);return e||null},e}(qE),PT=Eu(OT,{DeliveryPoint:du(c_),City:du(c_),AdministrativeArea:du(c_),PostalCode:du(c_),Country:du(c_),ElectronicMailAddress:du(c_)}),bT=Eu(OT,{Value:fu(function(t,e){return c_(t)})}),IT=Eu(OT,{AllowedValues:du(function(t,e){return Su({},bT,t,e)})}),LT=Eu(OT,{Phone:du(function(t,e){return Su({},GT,t,e)}),Address:du(function(t,e){return Su({},PT,t,e)})}),MT=Eu(OT,{HTTP:du(function(t,e){return Su({},FT,t,e)})}),FT=Eu(OT,{Get:fu(function(t,e){var r=HE(t);if(!r)return;return Su({href:r},DT,t,e)}),Post:void 0}),AT=Eu(OT,{DCP:du(function(t,e){return Su({},MT,t,e)})}),NT=Eu(OT,{Operation:function(t,e){var r=t.getAttribute("name"),n=Su({},AT,t,e);if(!n)return;e[e.length-1][r]=n}}),GT=Eu(OT,{Voice:du(c_),Facsimile:du(c_)}),DT=Eu(OT,{Constraint:fu(function(t,e){var r=t.getAttribute("name");if(!r)return;return Su({name:r},IT,t,e)})}),kT=Eu(OT,{IndividualName:du(c_),PositionName:du(c_),ContactInfo:du(function(t,e){return Su({},LT,t,e)})}),jT=Eu(OT,{Abstract:du(c_),AccessConstraints:du(c_),Fees:du(c_),Title:du(c_),ServiceTypeVersion:du(c_),ServiceType:du(c_)}),UT=Eu(OT,{ProviderName:du(c_),ProviderSite:du(HE),ServiceContact:du(function(t,e){return Su({},kT,t,e)})});var YT=RT,XT=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),BT=[null,"http://www.opengis.net/wmts/1.0"],zT=[null,"http://www.opengis.net/ows/1.1"],VT=Eu(BT,{Contents:du(function(t,e){return Su({},ZT,t,e)})}),WT=function(t){function e(){var e=t.call(this)||this;return e.owsParser_=new YT,e}return XT(e,t),e.prototype.readFromDocument=function(t){for(var e=t.firstChild;e;e=e.nextSibling)if(e.nodeType==Node.ELEMENT_NODE)return this.readFromNode(e);return null},e.prototype.readFromNode=function(t){var e=t.getAttribute("version").trim(),r=this.owsParser_.readFromNode(t);return r?(r.version=e,(r=Su(r,VT,t,[]))||null):null},e}(qE),ZT=Eu(BT,{Layer:fu(function(t,e){return Su({},KT,t,e)}),TileMatrixSet:fu(function(t,e){return Su({},eS,t,e)})}),KT=Eu(BT,{Style:fu(function(t,e){var r=Su({},HT,t,e);if(!r)return;var n="true"===t.getAttribute("isDefault");return r.isDefault=n,r}),Format:fu(c_),TileMatrixSetLink:fu(function(t,e){return Su({},qT,t,e)}),Dimension:fu(function(t,e){return Su({},$T,t,e)}),ResourceURL:fu(function(t,e){var r=t.getAttribute("format"),n=t.getAttribute("template"),i=t.getAttribute("resourceType"),o={};r&&(o.format=r);n&&(o.template=n);i&&(o.resourceType=i);return o})},Eu(zT,{Title:du(c_),Abstract:du(c_),WGS84BoundingBox:du(function(t,e){var r=Su([],tS,t,e);if(2!=r.length)return;return ot(r)}),Identifier:du(c_)})),HT=Eu(BT,{LegendURL:fu(function(t,e){var r={};return r.format=t.getAttribute("format"),r.href=HE(t),r})},Eu(zT,{Title:du(c_),Identifier:du(c_)})),qT=Eu(BT,{TileMatrixSet:du(c_),TileMatrixSetLimits:du(function(t,e){return Su([],JT,t,e)})}),JT=Eu(BT,{TileMatrixLimits:cu(function(t,e){return Su({},QT,t,e)})}),QT=Eu(BT,{TileMatrix:du(c_),MinTileRow:du(l_),MaxTileRow:du(l_),MinTileCol:du(l_),MaxTileCol:du(l_)}),$T=Eu(BT,{Default:du(c_),Value:fu(c_)},Eu(zT,{Identifier:du(c_)})),tS=Eu(zT,{LowerCorner:cu(nS),UpperCorner:cu(nS)}),eS=Eu(BT,{WellKnownScaleSet:du(c_),TileMatrix:fu(function(t,e){return Su({},rS,t,e)})},Eu(zT,{SupportedCRS:du(c_),Identifier:du(c_)})),rS=Eu(BT,{TopLeftCorner:du(nS),ScaleDenominator:du(s_),TileWidth:du(l_),TileHeight:du(l_),MatrixWidth:du(l_),MatrixHeight:du(l_)},Eu(zT,{Identifier:du(c_)}));function nS(t,e){var r=c_(t).split(/\s+/);if(r&&2==r.length){var n=+r[0],i=+r[1];if(!isNaN(n)&&!isNaN(i))return[n,i]}}var iS=WT,oS=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),aS=["fullscreenchange","webkitfullscreenchange","MSFullscreenChange"];function sS(){var t=document.body;return!!(t.webkitRequestFullscreen||t.msRequestFullscreen&&document.msFullscreenEnabled||t.requestFullscreen&&document.fullscreenEnabled)}function uS(){return!!(document.webkitIsFullScreen||document.msFullscreenElement||document.fullscreenElement)}function lS(t){t.requestFullscreen?t.requestFullscreen():t.msRequestFullscreen?t.msRequestFullscreen():t.webkitRequestFullscreen&&t.webkitRequestFullscreen()}var hS=function(t){function e(e){var r=this,n=e||{};(r=t.call(this,{element:document.createElement("div"),target:n.target})||this).cssClassName_=void 0!==n.className?n.className:"ol-full-screen";var i=void 0!==n.label?n.label:"⤢";r.labelNode_="string"==typeof i?document.createTextNode(i):i;var o=void 0!==n.labelActive?n.labelActive:"×";r.labelActiveNode_="string"==typeof o?document.createTextNode(o):o,r.button_=document.createElement("button");var a=n.tipLabel?n.tipLabel:"Toggle full-screen";r.setClassName_(r.button_,uS()),r.button_.setAttribute("type","button"),r.button_.title=a,r.button_.appendChild(r.labelNode_),E(r.button_,F.CLICK,r.handleClick_,r);var s=r.cssClassName_+" "+bo+" "+Lo+" "+(sS()?"":Io),u=r.element;return u.className=s,u.appendChild(r.button_),r.keys_=void 0!==n.keys&&n.keys,r.source_=n.source,r}return oS(e,t),e.prototype.handleClick_=function(t){t.preventDefault(),this.handleFullScreen_()},e.prototype.handleFullScreen_=function(){if(sS()){var t=this.getMap();if(t)if(uS())document.exitFullscreen?document.exitFullscreen():document.msExitFullscreen?document.msExitFullscreen():document.webkitExitFullscreen&&document.webkitExitFullscreen();else{var e=void 0;e=this.source_?"string"==typeof this.source_?document.getElementById(this.source_):this.source_:t.getTargetElement(),this.keys_?function(t){t.webkitRequestFullscreen?t.webkitRequestFullscreen():lS(t)}(e):lS(e)}}},e.prototype.handleFullScreenChange_=function(){var t=this.getMap();uS()?(this.setClassName_(this.button_,!0),so(this.labelActiveNode_,this.labelNode_)):(this.setClassName_(this.button_,!1),so(this.labelNode_,this.labelActiveNode_)),t&&t.updateSize()},e.prototype.setClassName_=function(t,e){var r=this.cssClassName_+"-true",n=this.cssClassName_+"-false",i=e?r:n;t.classList.remove(r),t.classList.remove(n),t.classList.add(i)},e.prototype.setMap=function(e){if(t.prototype.setMap.call(this,e),e)for(var r=0,n=aS.length;r<n;++r)this.listenerKeys.push(E(document,aS[r],this.handleFullScreenChange_,this))},e}(Co),cS=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),pS="projection";function fS(t){var e=t.frameState;e?this.mapProjection_!=e.viewState.projection&&(this.mapProjection_=e.viewState.projection,this.transform_=null):this.mapProjection_=null}var dS=function(t){function e(e){var r=this,n=e||{},i=document.createElement("div");return i.className=void 0!==n.className?n.className:"ol-mouse-position",E(r=t.call(this,{element:i,render:n.render||fS,target:n.target})||this,U(pS),r.handleProjectionChanged_,r),n.coordinateFormat&&r.setCoordinateFormat(n.coordinateFormat),n.projection&&r.setProjection(n.projection),r.undefinedHTML_=void 0!==n.undefinedHTML?n.undefinedHTML:"&#160;",r.renderOnMouseOut_=!!r.undefinedHTML_,r.renderedHTML_=i.innerHTML,r.mapProjection_=null,r.transform_=null,r.lastMouseMovePixel_=null,r}return cS(e,t),e.prototype.handleProjectionChanged_=function(){this.transform_=null},e.prototype.getCoordinateFormat=function(){return this.get("coordinateFormat")},e.prototype.getProjection=function(){return this.get(pS)},e.prototype.handleMouseMove=function(t){var e=this.getMap();this.lastMouseMovePixel_=e.getEventPixel(t),this.updateHTML_(this.lastMouseMovePixel_)},e.prototype.handleMouseOut=function(t){this.updateHTML_(null),this.lastMouseMovePixel_=null},e.prototype.setMap=function(e){if(t.prototype.setMap.call(this,e),e){var r=e.getViewport();this.listenerKeys.push(E(r,F.MOUSEMOVE,this.handleMouseMove,this),E(r,F.TOUCHSTART,this.handleMouseMove,this)),this.renderOnMouseOut_&&this.listenerKeys.push(E(r,F.MOUSEOUT,this.handleMouseOut,this),E(r,F.TOUCHEND,this.handleMouseOut,this))}},e.prototype.setCoordinateFormat=function(t){this.set("coordinateFormat",t)},e.prototype.setProjection=function(t){this.set(pS,Ie(t))},e.prototype.updateHTML_=function(t){var e=this.undefinedHTML_;if(t&&this.mapProjection_){if(!this.transform_){var r=this.getProjection();this.transform_=r?De(this.mapProjection_,r):Pe}var n=this.getMap().getCoordinateFromPixel(t);if(n){this.transform_(n,n);var i=this.getCoordinateFormat();e=i?i(n):n.toString()}}this.renderedHTML_&&e===this.renderedHTML_||(this.element.innerHTML=e,this.renderedHTML_=e)},e}(Co),_S=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}();function gS(t){this.validateExtent_(),this.updateBox_()}var yS=function(t){function e(e){var r=this,n=e||{};(r=t.call(this,{element:document.createElement("div"),render:n.render||gS,target:n.target})||this).collapsed_=void 0===n.collapsed||n.collapsed,r.collapsible_=void 0===n.collapsible||n.collapsible,r.collapsible_||(r.collapsed_=!1);var i=void 0!==n.className?n.className:"ol-overviewmap",o=void 0!==n.tipLabel?n.tipLabel:"Overview map",a=void 0!==n.collapseLabel?n.collapseLabel:"«";"string"==typeof a?(r.collapseLabel_=document.createElement("span"),r.collapseLabel_.textContent=a):r.collapseLabel_=a;var s=void 0!==n.label?n.label:"»";"string"==typeof s?(r.label_=document.createElement("span"),r.label_.textContent=s):r.label_=s;var u=r.collapsible_&&!r.collapsed_?r.collapseLabel_:r.label_,l=document.createElement("button");l.setAttribute("type","button"),l.title=o,l.appendChild(u),E(l,F.CLICK,r.handleClick_,r),r.ovmapDiv_=document.createElement("div"),r.ovmapDiv_.className="ol-overviewmap-map",r.ovmap_=new hs({controls:new V,interactions:new V,view:n.view});var h=r.ovmap_;n.layers&&n.layers.forEach(function(t){h.addLayer(t)}.bind(r));var c=document.createElement("div");c.className="ol-overviewmap-box",c.style.boxSizing="border-box",r.boxOverlay_=new ds({position:[0,0],positioning:cs.BOTTOM_LEFT,element:c}),r.ovmap_.addOverlay(r.boxOverlay_);var p=i+" "+bo+" "+Lo+(r.collapsed_&&r.collapsible_?" "+Mo:"")+(r.collapsible_?"":" ol-uncollapsible"),f=r.element;f.className=p,f.appendChild(r.ovmapDiv_),f.appendChild(l);var d=r,_=r.boxOverlay_,g=r.boxOverlay_.getElement(),y=function(t){var e,r={clientX:(e=t).clientX-g.offsetWidth/2,clientY:e.clientY+g.offsetHeight/2},n=h.getEventCoordinate(r);_.setPosition(n)},v=function(t){var e=h.getEventCoordinate(t);d.getMap().getView().setCenter(e),window.removeEventListener("mousemove",y),window.removeEventListener("mouseup",v)};return g.addEventListener("mousedown",function(){window.addEventListener("mousemove",y),window.addEventListener("mouseup",v)}),r}return _S(e,t),e.prototype.setMap=function(e){var r=this.getMap();if(e!==r){if(r){var n=r.getView();n&&this.unbindView_(n),this.ovmap_.setTarget(null)}if(t.prototype.setMap.call(this,e),e){this.ovmap_.setTarget(this.ovmapDiv_),this.listenerKeys.push(E(e,c,this.handleMapPropertyChange_,this));var i=e.getView();i&&(this.bindView_(i),i.isDef()&&(this.ovmap_.updateSize(),this.resetExtent_()))}}},e.prototype.handleMapPropertyChange_=function(t){if(t.key===fi.VIEW){var e=t.oldValue;e&&this.unbindView_(e);var r=this.getMap().getView();this.bindView_(r)}},e.prototype.bindView_=function(t){E(t,U(Ni),this.handleRotationChanged_,this)},e.prototype.unbindView_=function(t){S(t,U(Ni),this.handleRotationChanged_,this)},e.prototype.handleRotationChanged_=function(){this.ovmap_.getView().setRotation(this.getMap().getView().getRotation())},e.prototype.validateExtent_=function(){var t=this.getMap(),e=this.ovmap_;if(t.isRendered()&&e.isRendered()){var r=t.getSize(),n=t.getView().calculateExtent(r),i=e.getSize(),o=e.getView().calculateExtent(i),a=e.getPixelFromCoordinate(Ft(n)),s=e.getPixelFromCoordinate(Rt(n)),u=Math.abs(a[0]-s[0]),l=Math.abs(a[1]-s[1]),h=i[0],c=i[1];u<.1*h||l<.1*c||u>.75*h||l>.75*c?this.resetExtent_():ht(o,n)||this.recenter_()}},e.prototype.resetExtent_=function(){var t=this.getMap(),e=this.ovmap_,r=t.getSize(),n=t.getView().calculateExtent(r),i=e.getView(),o=Math.log(7.5)/Math.LN2;kt(n,1/(.1*Math.pow(2,o/2))),i.fit(n)},e.prototype.recenter_=function(){var t=this.getMap(),e=this.ovmap_,r=t.getView();e.getView().setCenter(r.getCenter())},e.prototype.updateBox_=function(){var t=this.getMap(),e=this.ovmap_;if(t.isRendered()&&e.isRendered()){var r=t.getSize(),n=t.getView(),i=e.getView(),o=n.getRotation(),a=this.boxOverlay_,s=this.boxOverlay_.getElement(),u=n.calculateExtent(r),l=i.getResolution(),h=Ct(u),c=At(u),p=this.calculateCoordinateRotate_(o,h);a.setPosition(p),s&&(s.style.width=Math.abs((h[0]-c[0])/l)+"px",s.style.height=Math.abs((c[1]-h[1])/l)+"px")}},e.prototype.calculateCoordinateRotate_=function(t,e){var r,n=this.getMap().getView().getCenter();return n&&(Bi(r=[e[0]-n[0],e[1]-n[1]],t),ki(r,n)),r},e.prototype.handleClick_=function(t){t.preventDefault(),this.handleToggle_()},e.prototype.handleToggle_=function(){this.element.classList.toggle(Mo),this.collapsed_?so(this.collapseLabel_,this.label_):so(this.label_,this.collapseLabel_),this.collapsed_=!this.collapsed_;var t=this.ovmap_;this.collapsed_||t.isRendered()||(t.updateSize(),this.resetExtent_(),T(t,hi,function(t){this.updateBox_()},this))},e.prototype.getCollapsible=function(){return this.collapsible_},e.prototype.setCollapsible=function(t){this.collapsible_!==t&&(this.collapsible_=t,this.element.classList.toggle("ol-uncollapsible"),!t&&this.collapsed_&&this.handleToggle_())},e.prototype.setCollapsed=function(t){this.collapsible_&&this.collapsed_!==t&&this.handleToggle_()},e.prototype.getCollapsed=function(){return this.collapsed_},e.prototype.getOverviewMap=function(){return this.ovmap_},e}(Co),vS=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),mS="units",ES={DEGREES:"degrees",IMPERIAL:"imperial",NAUTICAL:"nautical",METRIC:"metric",US:"us"},TS=[1,2,5];function SS(t){var e=t.frameState;this.viewState_=e?e.viewState:null,this.updateElement_()}var wS=function(t){function e(e){var r=this,n=e||{},i=void 0!==n.className?n.className:n.bar?"ol-scale-bar":"ol-scale-line";return(r=t.call(this,{element:document.createElement("div"),render:n.render||SS,target:n.target})||this).innerElement_=document.createElement("div"),r.innerElement_.className=i+"-inner",r.element.className=i+" "+bo,r.element.appendChild(r.innerElement_),r.viewState_=null,r.minWidth_=void 0!==n.minWidth?n.minWidth:64,r.renderedVisible_=!1,r.renderedWidth_=void 0,r.renderedHTML_="",E(r,U(mS),r.handleUnitsChanged_,r),r.setUnits(n.units||ES.METRIC),r.scaleBar_=n.bar||!1,r.scaleBarSteps_=n.steps||4,r.scaleBarText_=n.text||!1,r}return vS(e,t),e.prototype.getUnits=function(){return this.get(mS)},e.prototype.handleUnitsChanged_=function(){this.updateElement_()},e.prototype.setUnits=function(t){this.set(mS,t)},e.prototype.updateElement_=function(){var t=this.viewState_;if(t){var e=t.center,r=t.projection,n=this.getUnits(),i=n==ES.DEGREES?ie.DEGREES:ie.METERS,o=Le(r,t.resolution,e,i),a=this.minWidth_*o,s="";if(n==ES.DEGREES){var u=ne[ie.DEGREES];(a*=u)<u/60?(s="″",o*=3600):a<u?(s="′",o*=60):s="°"}else n==ES.IMPERIAL?a<.9144?(s="in",o/=.0254):a<1609.344?(s="ft",o/=.3048):(s="mi",o/=1609.344):n==ES.NAUTICAL?(o/=1852,s="nm"):n==ES.METRIC?a<.001?(s="μm",o*=1e6):a<1?(s="mm",o*=1e3):a<1e3?s="m":(s="km",o/=1e3):n==ES.US?a<.9144?(s="in",o*=39.37):a<1609.344?(s="ft",o/=.30480061):(s="mi",o/=1609.3472):W(!1,33);for(var l,h,c,p,f=3*Math.floor(Math.log(this.minWidth_*o)/Math.log(10));;){c=Math.floor(f/3);var d=Math.pow(10,c);if(l=TS[(f%3+3)%3]*d,h=Math.round(l/o),isNaN(h))return this.element.style.display="none",void(this.renderedVisible_=!1);if(h>=this.minWidth_)break;++f}p=this.scaleBar_?this.createScaleBar(h,l,s):l.toFixed(c<0?-c:0)+" "+s,this.renderedHTML_!=p&&(this.innerElement_.innerHTML=p,this.renderedHTML_=p),this.renderedWidth_!=h&&(this.innerElement_.style.width=h+"px",this.renderedWidth_=h),this.renderedVisible_||(this.element.style.display="",this.renderedVisible_=!0)}else this.renderedVisible_&&(this.element.style.display="none",this.renderedVisible_=!1)},e.prototype.createScaleBar=function(t,e,r){for(var n="1 : "+Math.round(this.getScaleForResolution()).toLocaleString(),i=[],o=t/this.scaleBarSteps_,a="#ffffff",s=0;s<this.scaleBarSteps_;s++)0===s&&i.push(this.createMarker("absolute",s)),i.push('<div><div class="ol-scale-singlebar" style="width: '+o+"px;background-color: "+a+';"></div>'+this.createMarker("relative",s)+(s%2==0||2===this.scaleBarSteps_?this.createStepText(s,t,!1,e,r):"")+"</div>"),s===this.scaleBarSteps_-1&&i.push(this.createStepText(s+1,t,!0,e,r)),a="#ffffff"===a?"#000000":"#ffffff";return'<div style="display: flex;">'+(this.scaleBarText_?'<div class="ol-scale-text" style="width: '+t+'px;">'+n+"</div>":"")+i.join("")+"</div>"},e.prototype.createMarker=function(t,e){return'<div class="ol-scale-step-marker" style="position: '+t+";top: "+("absolute"===t?3:-10)+'px;"></div>'},e.prototype.createStepText=function(t,e,r,n,i){var o=(0===t?0:Math.round(n/this.scaleBarSteps_*t*100)/100)+(0===t?"":" "+i);return'<div class="ol-scale-step-text" style="margin-left: '+(0===t?-3:e/this.scaleBarSteps_*-1)+"px;text-align: "+(0===t?"left":"center")+"; min-width: "+(0===t?0:e/this.scaleBarSteps_*2)+"px;left: "+(r?e+"px":"unset")+';">'+o+"</div>"},e.prototype.getScaleForResolution=function(){var t=this.getMap().getView().getResolution(),e=this.viewState_.projection.getMetersPerUnit();return parseFloat(t.toString())*e*39.37*(25.4/.28)},e}(Co),xS=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),OS={VERTICAL:0,HORIZONTAL:1};function CS(t){if(t.frameState){this.sliderInitialized_||this.initSlider_();var e=t.frameState.viewState.resolution;this.currentResolution_=e,this.setThumbPosition_(e)}}var RS=function(t){function e(e){var r=this,n=e||{};(r=t.call(this,{element:document.createElement("div"),render:n.render||CS})||this).dragListenerKeys_=[],r.currentResolution_=void 0,r.direction_=OS.VERTICAL,r.dragging_,r.heightLimit_=0,r.widthLimit_=0,r.startX_,r.startY_,r.thumbSize_=null,r.sliderInitialized_=!1,r.duration_=void 0!==n.duration?n.duration:200;var i=void 0!==n.className?n.className:"ol-zoomslider",o=document.createElement("button");o.setAttribute("type","button"),o.className=i+"-thumb "+bo;var a=r.element;return a.className=i+" "+bo+" "+Lo,a.appendChild(o),r.dragger_=new si(a),E(r.dragger_,gn.POINTERDOWN,r.handleDraggerStart_,r),E(r.dragger_,gn.POINTERMOVE,r.handleDraggerDrag_,r),E(r.dragger_,gn.POINTERUP,r.handleDraggerEnd_,r),E(a,F.CLICK,r.handleContainerClick_,r),E(o,F.CLICK,b),r}return xS(e,t),e.prototype.disposeInternal=function(){this.dragger_.dispose(),t.prototype.disposeInternal.call(this)},e.prototype.setMap=function(e){t.prototype.setMap.call(this,e),e&&e.render()},e.prototype.initSlider_=function(){var t=this.element,e=t.offsetWidth,r=t.offsetHeight,n=t.firstElementChild,i=getComputedStyle(n),o=n.offsetWidth+parseFloat(i.marginRight)+parseFloat(i.marginLeft),a=n.offsetHeight+parseFloat(i.marginTop)+parseFloat(i.marginBottom);this.thumbSize_=[o,a],e>r?(this.direction_=OS.HORIZONTAL,this.widthLimit_=e-o):(this.direction_=OS.VERTICAL,this.heightLimit_=r-a),this.sliderInitialized_=!0},e.prototype.handleContainerClick_=function(t){var e=this.getMap().getView(),r=this.getRelativePosition_(t.offsetX-this.thumbSize_[0]/2,t.offsetY-this.thumbSize_[1]/2),n=this.getResolutionForPosition_(r),i=e.getConstrainedZoom(e.getZoomForResolution(n));e.animate({zoom:i,duration:this.duration_,easing:qi})},e.prototype.handleDraggerStart_=function(t){if(!this.dragging_&&t.originalEvent.target===this.element.firstElementChild){var e=this.element.firstElementChild;if(this.getMap().getView().beginInteraction(),this.startX_=t.clientX-parseFloat(e.style.left),this.startY_=t.clientY-parseFloat(e.style.top),this.dragging_=!0,0===this.dragListenerKeys_.length){var r=this.handleDraggerDrag_,n=this.handleDraggerEnd_;this.dragListenerKeys_.push(E(document,F.MOUSEMOVE,r,this),E(document,gn.POINTERMOVE,r,this),E(document,F.MOUSEUP,n,this),E(document,gn.POINTERUP,n,this))}}},e.prototype.handleDraggerDrag_=function(t){if(this.dragging_){var e=t.clientX-this.startX_,r=t.clientY-this.startY_,n=this.getRelativePosition_(e,r);this.currentResolution_=this.getResolutionForPosition_(n),this.getMap().getView().setResolution(this.currentResolution_)}},e.prototype.handleDraggerEnd_=function(t){this.dragging_&&(this.getMap().getView().endInteraction(),this.dragging_=!1,this.startX_=void 0,this.startY_=void 0,this.dragListenerKeys_.forEach(w),this.dragListenerKeys_.length=0)},e.prototype.setThumbPosition_=function(t){var e=this.getPositionForResolution_(t),r=this.element.firstElementChild;this.direction_==OS.HORIZONTAL?r.style.left=this.widthLimit_*e+"px":r.style.top=this.heightLimit_*e+"px"},e.prototype.getRelativePosition_=function(t,e){return Bt(this.direction_===OS.HORIZONTAL?t/this.widthLimit_:e/this.heightLimit_,0,1)},e.prototype.getResolutionForPosition_=function(t){return this.getMap().getView().getResolutionForValueFunction()(1-t)},e.prototype.getPositionForResolution_=function(t){return Bt(1-this.getMap().getView().getValueForResolutionFunction()(t),0,1)},e}(Co),PS=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),bS=function(t){function e(e){var r=this,n=e||{};(r=t.call(this,{element:document.createElement("div"),target:n.target})||this).extent=n.extent?n.extent:null;var i=void 0!==n.className?n.className:"ol-zoom-extent",o=void 0!==n.label?n.label:"E",a=void 0!==n.tipLabel?n.tipLabel:"Fit to extent",s=document.createElement("button");s.setAttribute("type","button"),s.title=a,s.appendChild("string"==typeof o?document.createTextNode(o):o),E(s,F.CLICK,r.handleClick_,r);var u=i+" "+bo+" "+Lo,l=r.element;return l.className=u,l.appendChild(s),r}return PS(e,t),e.prototype.handleClick_=function(t){t.preventDefault(),this.handleZoomToExtent()},e.prototype.handleZoomToExtent=function(){var t=this.getMap().getView(),e=this.extent?this.extent:t.getProjection().getExtent();t.fit(e)},e}(Co),IS={array:{},color:{},colorlike:{},control:{},coordinate:{},easing:{},events:{}};IS.events.condition={},IS.extent={},IS.featureloader={},IS.format={},IS.format.filter={},IS.geom={},IS.has={},IS.interaction={},IS.layer={},IS.loadingstrategy={},IS.proj={},IS.proj.Units={},IS.proj.proj4={},IS.render={},IS.render.canvas={},IS.renderer={},IS.renderer.canvas={},IS.renderer.webgl={},IS.size={},IS.source={},IS.sphere={},IS.style={},IS.style.IconImageCache={},IS.tilegrid={},IS.webgl={},IS.xml={},IS.Collection=V,IS.Feature=K,IS.Geolocation=sn,IS.Kinetic=un,IS.Map=hs,IS.Object=Y,IS.Observable=N,IS.Observable.unByKey=function(t){if(Array.isArray(t))for(var e=0,r=t.length;e<r;++e)w(t[e]);else w(t)},IS.Overlay=ds,IS.PluggableMap=So,IS.View=no,IS.array.stableSort=function(t,e){var r,n=t.length,i=Array(t.length);for(r=0;r<n;r++)i[r]={index:r,value:t[r]};for(i.sort(function(t,r){return e(t.value,r.value)||t.index-r.index}),r=0;r<t.length;r++)t[r]=i[r].value},IS.color.asArray=Qa,IS.color.asString=qa,IS.colorlike.asColorLike=_s,IS.control.Attribution=jo,IS.control.Attribution.render=ko,IS.control.Control=Co,IS.control.FullScreen=hS,IS.control.MousePosition=dS,IS.control.MousePosition.render=fS,IS.control.OverviewMap=yS,IS.control.OverviewMap.render=gS,IS.control.Rotate=Xo,IS.control.Rotate.render=Yo,IS.control.ScaleLine=wS,IS.control.ScaleLine.render=SS,IS.control.Zoom=zo,IS.control.ZoomSlider=RS,IS.control.ZoomSlider.render=CS,IS.control.ZoomToExtent=bS,IS.control.defaults=Vo,IS.coordinate.add=ki,IS.coordinate.createStringXY=function(t){return function(e){return Ki(e,t)}},IS.coordinate.format=Yi,IS.coordinate.rotate=Bi,IS.coordinate.toStringHDMS=function(t,e){return t?Ui("NS",t[1],e)+" "+Ui("EW",t[0],e):""},IS.coordinate.toStringXY=Ki,IS.easing.easeIn=Hi,IS.easing.easeOut=qi,IS.easing.inAndOut=Ji,IS.easing.linear=Qi,IS.easing.upAndDown=function(t){return t<.5?Ji(2*t):1-Ji(2*(t-.5))},IS.events.condition.altKeyOnly=$o,IS.events.condition.altShiftKeysOnly=ta,IS.events.condition.always=ra,IS.events.condition.click=function(t){return t.type==fn.CLICK},IS.events.condition.doubleClick=function(t){return t.type==fn.DBLCLICK},IS.events.condition.focus=ea,IS.events.condition.mouseOnly=ha,IS.events.condition.never=ia,IS.events.condition.noModifierKeys=sa,IS.events.condition.penOnly=function(t){var e=t.pointerEvent;return W(void 0!==e,56),"pen"===e.pointerType},IS.events.condition.platformModifierKeyOnly=function(t){var e=t.originalEvent;return!e.altKey&&(Jr?e.metaKey:e.ctrlKey)&&!e.shiftKey},IS.events.condition.pointerMove=oa,IS.events.condition.primaryAction=ca,IS.events.condition.shiftKeyOnly=ua,IS.events.condition.singleClick=aa,IS.events.condition.targetNotEditable=la,IS.events.condition.touchOnly=function(t){var e=t.pointerEvent;return W(void 0!==e,56),"touch"===e.pointerType},IS.extent.applyTransform=jt,IS.extent.boundingExtent=ot,IS.extent.buffer=at,IS.extent.containsCoordinate=lt,IS.extent.containsExtent=ht,IS.extent.containsXY=ct,IS.extent.createEmpty=ft,IS.extent.equals=vt,IS.extent.extend=mt,IS.extent.getArea=Ot,IS.extent.getBottomLeft=Ct,IS.extent.getBottomRight=Rt,IS.extent.getCenter=Pt,IS.extent.getHeight=Lt,IS.extent.getIntersection=Mt,IS.extent.getSize=function(t){return[t[2]-t[0],t[3]-t[1]]},IS.extent.getTopLeft=Ft,IS.extent.getTopRight=At,IS.extent.getWidth=Nt,IS.extent.intersects=Gt,IS.extent.isEmpty=Dt,IS.featureloader.xhr=vs,IS.format.EsriJSON=qd,IS.format.Feature=Dd,IS.format.GML=S_,IS.format.GML2=R_,IS.format.GML3=E_,IS.format.GML32=I_,IS.format.GPX=pg,IS.format.GeoJSON=gg,IS.format.IGC=Fg,IS.format.KML=Ov,IS.format.MVT=Gv,IS.format.OSMXML=zv,IS.format.Polyline=Qv,IS.format.Polyline.decodeDeltas=Kv,IS.format.Polyline.decodeFloats=qv,IS.format.Polyline.encodeDeltas=Zv,IS.format.Polyline.encodeFloats=Hv,IS.format.TopoJSON=sm,IS.format.WFS=OE,IS.format.WFS.writeFilter=function(t){var e=au(sE,"Filter");return vE(e,t,[]),e},IS.format.WKT=ZE,IS.format.WMSCapabilities=TT,IS.format.WMSGetFeatureInfo=wT,IS.format.WMTSCapabilities=iS,IS.format.filter.Bbox=dm,IS.format.filter.Contains=vm,IS.format.filter.During=Sm,IS.format.filter.EqualTo=Cm,IS.format.filter.GreaterThan=Pm,IS.format.filter.GreaterThanOrEqualTo=Im,IS.format.filter.Intersects=Mm,IS.format.filter.IsBetween=Am,IS.format.filter.IsLike=Gm,IS.format.filter.IsNull=km,IS.format.filter.LessThan=Um,IS.format.filter.LessThanOrEqualTo=Xm,IS.format.filter.Not=zm,IS.format.filter.NotEqualTo=Wm,IS.format.filter.Or=Km,IS.format.filter.Within=qm,IS.format.filter.and=Jm,IS.format.filter.bbox=Qm,IS.format.filter.between=function(t,e,r){return new Am(t,e,r)},IS.format.filter.contains=function(t,e,r){return new vm(t,e,r)},IS.format.filter.during=function(t,e,r){return new Sm(t,e,r)},IS.format.filter.equalTo=function(t,e,r){return new Cm(t,e,r)},IS.format.filter.greaterThan=function(t,e){return new Pm(t,e)},IS.format.filter.greaterThanOrEqualTo=function(t,e){return new Im(t,e)},IS.format.filter.intersects=function(t,e,r){return new Mm(t,e,r)},IS.format.filter.isNull=function(t){return new km(t)},IS.format.filter.lessThan=function(t,e){return new Um(t,e)},IS.format.filter.lessThanOrEqualTo=function(t,e){return new Xm(t,e)},IS.format.filter.like=function(t,e,r,n,i,o){return new Gm(t,e,r,n,i,o)},IS.format.filter.not=function(t){return new zm(t)},IS.format.filter.notEqualTo=function(t,e,r){return new Wm(t,e,r)},IS.format.filter.or=function(t){var e=[null].concat(Array.prototype.slice.call(arguments));return new(Function.prototype.bind.apply(Km,e))},IS.format.filter.within=function(t,e,r){return new qm(t,e,r)},IS.geom.Circle=Bf,IS.geom.Geometry=er,IS.geom.GeometryCollection=Gd,IS.geom.LineString=yf,IS.geom.LinearRing=xr,IS.geom.MultiLineString=Vf,IS.geom.MultiPoint=Zf,IS.geom.MultiPolygon=qf,IS.geom.Point=Cr,IS.geom.Polygon=Xr,IS.geom.Polygon.circular=Br,IS.geom.Polygon.fromCircle=Vr,IS.geom.Polygon.fromExtent=zr,IS.geom.SimpleGeometry=ir,IS.getUid=o,IS.has.DEVICE_PIXEL_RATIO=Qr,IS.has.GEOLOCATION=$r,IS.has.TOUCH=tn,IS.interaction.DoubleClickZoom=Qo,IS.interaction.DragAndDrop=kf,IS.interaction.DragBox=Ca,IS.interaction.DragPan=ga,IS.interaction.DragRotate=va,IS.interaction.DragRotateAndZoom=Uf,IS.interaction.DragZoom=ba,IS.interaction.Draw=rd,IS.interaction.Draw.createBox=function(){return function(t,e){var r=ot(t),n=[[Ct(r),Rt(r),At(r),Ft(r),Ct(r)]],i=e;return i?i.setCoordinates(n):i=new Xr(n),i}},IS.interaction.Draw.createRegularPolygon=function(t,e){return function(r,n){var i=r[0],o=r[1],a=Math.sqrt(Vi(i,o)),s=n||Vr(new Bf(i),t),u=e;if(!e){var l=o[0]-i[0],h=o[1]-i[1];u=Math.atan(h/l)-(l<0?Math.PI:0)}return Wr(s,i,a,u),s}},IS.interaction.Extent=ld,IS.interaction.Interaction=Ho,IS.interaction.KeyboardPan=Fa,IS.interaction.KeyboardZoom=Ga,IS.interaction.Modify=vd,IS.interaction.MouseWheelZoom=Ua,IS.interaction.PinchRotate=Xa,IS.interaction.PinchZoom=za,IS.interaction.Pointer=da,IS.interaction.Select=xd,IS.interaction.Snap=Rd,IS.interaction.Translate=Fd,IS.interaction.defaults=Va,IS.layer.Base=po,IS.layer.BaseImage=$h,IS.layer.BaseTile=cc,IS.layer.BaseVector=cf,IS.layer.Graticule=Sf,IS.layer.Group=yo,IS.layer.Heatmap=Cf,IS.layer.Image=sc,IS.layer.Tile=gc,IS.layer.Vector=ff,IS.layer.VectorImage=If,IS.layer.VectorTile=Mf,IS.loadingstrategy.all=ms,IS.loadingstrategy.bbox=Es,IS.loadingstrategy.tile=function(t){return function(e,r){var n=t.getZForResolution(r),i=t.getTileRangeForExtentAndZ(e,n),o=[],a=[n,0,0];for(a[1]=i.minX;a[1]<=i.maxX;++a[1])for(a[2]=i.minY;a[2]<=i.maxY;++a[2])o.push(t.getTileCoordExtent(a));return o}},IS.proj.Projection=oe,IS.proj.Units.METERS_PER_UNIT=ne,IS.proj.addCoordinateTransforms=Ne,IS.proj.addEquivalentProjections=Me,IS.proj.addProjection=be,IS.proj.equivalent=Ge,IS.proj.fromLonLat=function(t,e){return je(t,"EPSG:4326",void 0!==e?e:"EPSG:3857")},IS.proj.get=Ie,IS.proj.getPointResolution=Le,IS.proj.getTransform=ke,IS.proj.proj4.register=function(t){var e,r,n=Object.keys(t.defs),i=n.length;for(e=0;e<i;++e){var o=n[e];if(!Ie(o)){var a=t.defs(o);be(new oe({code:o,axisOrientation:a.axis,metersPerUnit:a.to_meter,units:a.units}))}}for(e=0;e<i;++e){var s=n[e],u=Ie(s);for(r=0;r<i;++r){var l=n[r],h=Ie(l);if(!Ce(s,l))if(t.defs[s]===t.defs[l])Me([u,h]);else{var c=t(s,l);Ne(u,h,c.forward,c.inverse)}}}},IS.proj.toLonLat=function(t,e){var r=je(t,void 0!==e?e:"EPSG:3857","EPSG:4326"),n=r[0];return(n<-180||n>180)&&(r[0]=Ht(n+180,360)-180),r},IS.proj.transform=je,IS.proj.transformExtent=Ue,IS.render.VectorContext=Ts,IS.render.canvas.labelCache=Ps,IS.render.getRenderPixel=function(t,e){var r=e.slice(0);return Ve(t.inversePixelTransform.slice(),r),r},IS.render.getVectorContext=function(t){var e=t.frameState,r=Be(t.inversePixelTransform.slice(),e.coordinateToPixelTransform);return new Bs(t.context,e.pixelRatio,e.extent,r,e.viewState.rotation)},IS.render.toContext=function(t,e){var r=t.canvas,n=e||{},i=n.pixelRatio||Qr,o=n.size;o&&(r.width=o[0]*i,r.height=o[1]*i,r.style.width=o[0]+"px",r.style.height=o[1]+"px");var a=[0,0,r.width,r.height],s=Ze([1,0,0,1,0,0],i,i);return new Bs(t,i,a,s,0)},IS.renderer.Composite=us,IS.renderer.canvas.ImageLayer=oc,IS.renderer.canvas.ImageLayer=oc,IS.renderer.canvas.TileLayer=dc,IS.renderer.canvas.VectorLayer=rf,IS.renderer.canvas.VectorTileLayer=uf,IS.renderer.webgl.PointsLayer=pp,IS.size.toSize=Eo,IS.source.BingMaps=rh,IS.source.CartoDB=ah,IS.source.Cluster=_h,IS.source.Image=Ch,IS.source.ImageArcGISRest=Lh,IS.source.ImageCanvas=Nh,IS.source.ImageMapGuide=Dh,IS.source.ImageStatic=jh,IS.source.ImageWMS=Zh,IS.source.OSM=qh,IS.source.OSM.ATTRIBUTION=Hh,IS.source.Raster=Cc,IS.source.Source=Xl,IS.source.Stamen=Lc,IS.source.Tile=Wl,IS.source.TileArcGISRest=Ac,IS.source.TileDebug=Dc,IS.source.TileImage=th,IS.source.TileJSON=jc,IS.source.TileWMS=Xc,IS.source.UTFGrid=Vc,IS.source.Vector=fh,IS.source.VectorTile=Jc,IS.source.WMTS=ep,IS.source.WMTS.optionsFromCapabilities=function(t,e){var r=tt(t.Contents.Layer,function(t,r,n){return t.Identifier==e.layer});if(null===r)return null;var n,i=t.Contents.TileMatrixSet;(n=r.TileMatrixSetLink.length>1?rt(r.TileMatrixSetLink,"projection"in e?function(t,r,n){var o=tt(i,function(e){return e.Identifier==t.TileMatrixSet}).SupportedCRS,a=Ie(o.replace(/urn:ogc:def:crs:(\w+):(.*:)?(\w+)$/,"$1:$3"))||Ie(o),s=Ie(e.projection);return a&&s?Ge(a,s):o==e.projection}:function(t,r,n){return t.TileMatrixSet==e.matrixSet}):0)<0&&(n=0);var o=r.TileMatrixSetLink[n].TileMatrixSet,a=r.TileMatrixSetLink[n].TileMatrixSetLimits,s=r.Format[0];"format"in e&&(s=e.format),(n=rt(r.Style,function(t,r,n){return"style"in e?t.Title==e.style:t.isDefault}))<0&&(n=0);var u=r.Style[n].Identifier,l={};"Dimension"in r&&r.Dimension.forEach(function(t,e,r){var n=t.Identifier,i=t.Default;void 0===i&&(i=t.Value[0]),l[n]=i});var h,c=tt(t.Contents.TileMatrixSet,function(t,e,r){return t.Identifier==o}),p=c.SupportedCRS;if(p&&(h=Ie(p.replace(/urn:ogc:def:crs:(\w+):(.*:)?(\w+)$/,"$1:$3"))||Ie(p)),"projection"in e){var f=Ie(e.projection);f&&(h&&!Ge(f,h)||(h=f))}var d,_,g=r.WGS84BoundingBox;if(void 0!==g){var y=Ie("EPSG:4326").getExtent();_=g[0]==y[0]&&g[2]==y[2],d=Ue(g,"EPSG:4326",h);var v=h.getExtent();v&&(ht(v,d)||(d=void 0))}var m=Hu(c,d,a),E=[],T=e.requestEncoding;if(T=void 0!==T?T:"","OperationsMetadata"in t&&"GetTile"in t.OperationsMetadata)for(var S=t.OperationsMetadata.GetTile.DCP.HTTP.Get,w=0,x=S.length;w<x;++w)if(S[w].Constraint){var O=tt(S[w].Constraint,function(t){return"GetEncoding"==t.name}).AllowedValues.Value;if(""===T&&(T=O[0]),T!==$c.KVP)break;q(O,$c.KVP)&&E.push(S[w].href)}else S[w].href&&(T=$c.KVP,E.push(S[w].href));return 0===E.length&&(T=$c.REST,r.ResourceURL.forEach(function(t){"tile"===t.resourceType&&(s=t.format,E.push(t.template))})),{urls:E,layer:e.layer,matrixSet:o,format:s,projection:h,requestEncoding:T,tileGrid:m,style:u,dimensions:l,wrapX:_,crossOrigin:e.crossOrigin}},IS.source.XYZ=ih,IS.source.Zoomify=ap,IS.sphere.getArea=function t(e,r){var n=r||{},i=n.radius||Jt,o=n.projection||"EPSG:3857",a=e.getType();a!==Yt.GEOMETRY_COLLECTION&&(e=e.clone().transform(o,"EPSG:4326"));var s,u,l,h,c,p,f=0;switch(a){case Yt.POINT:case Yt.MULTI_POINT:case Yt.LINE_STRING:case Yt.MULTI_LINE_STRING:case Yt.LINEAR_RING:break;case Yt.POLYGON:for(s=e.getCoordinates(),f=Math.abs(te(s[0],i)),l=1,h=s.length;l<h;++l)f-=Math.abs(te(s[l],i));break;case Yt.MULTI_POLYGON:for(l=0,h=(s=e.getCoordinates()).length;l<h;++l)for(u=s[l],f+=Math.abs(te(u[0],i)),c=1,p=u.length;c<p;++c)f-=Math.abs(te(u[c],i));break;case Yt.GEOMETRY_COLLECTION:var d=e.getGeometries();for(l=0,h=d.length;l<h;++l)f+=t(d[l],r);break;default:throw new Error("Unsupported geometry type: "+a)}return f},IS.sphere.getDistance=Qt,IS.sphere.getLength=function t(e,r){var n=r||{},i=n.radius||Jt,o=n.projection||"EPSG:3857",a=e.getType();a!==Yt.GEOMETRY_COLLECTION&&(e=e.clone().transform(o,"EPSG:4326"));var s,u,l,h,c,p,f=0;switch(a){case Yt.POINT:case Yt.MULTI_POINT:break;case Yt.LINE_STRING:case Yt.LINEAR_RING:f=$t(s=e.getCoordinates(),i);break;case Yt.MULTI_LINE_STRING:case Yt.POLYGON:for(l=0,h=(s=e.getCoordinates()).length;l<h;++l)f+=$t(s[l],i);break;case Yt.MULTI_POLYGON:for(l=0,h=(s=e.getCoordinates()).length;l<h;++l)for(c=0,p=(u=s[l]).length;c<p;++c)f+=$t(u[c],i);break;case Yt.GEOMETRY_COLLECTION:var d=e.getGeometries();for(l=0,h=d.length;l<h;++l)f+=t(d[l],r);break;default:throw new Error("Unsupported geometry type: "+a)}return f},IS.style.Circle=el,IS.style.Fill=rl,IS.style.Icon=ul,IS.style.IconImageCache.shared=ns,IS.style.Image=Ju,IS.style.RegularShape=$u,IS.style.Stroke=ll,IS.style.Style=_l,IS.style.Text=vl,IS.tilegrid.TileGrid=Qs,IS.tilegrid.WMTS=Ku,IS.tilegrid.WMTS.createFromCapabilitiesMatrixSet=Hu,IS.tilegrid.createXYZ=tu,IS.webgl.Helper=Vu,IS.webgl.PostProcessingPass=Au,IS.xml.getAllTextContent=su,IS.xml.parse=lu;e.default=IS}]).default});
//# sourceMappingURL=ol.js.mapvar olcs_unused_var =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.library.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.library.js":
/*!******************************!*\
  !*** ./src/index.library.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _olcs_OLCesium_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./olcs/OLCesium.js */ "./src/olcs/OLCesium.js");
/* harmony import */ var _olcs_AbstractSynchronizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./olcs/AbstractSynchronizer.js */ "./src/olcs/AbstractSynchronizer.js");
/* harmony import */ var _olcs_RasterSynchronizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./olcs/RasterSynchronizer.js */ "./src/olcs/RasterSynchronizer.js");
/* harmony import */ var _olcs_VectorSynchronizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./olcs/VectorSynchronizer.js */ "./src/olcs/VectorSynchronizer.js");
/* harmony import */ var _olcs_core_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./olcs/core.js */ "./src/olcs/core.js");
/* harmony import */ var _olcs_GaKmlSynchronizer_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./olcs/GaKmlSynchronizer.js */ "./src/olcs/GaKmlSynchronizer.js");
/* harmony import */ var _olcs_GaRasterSynchronizer_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./olcs/GaRasterSynchronizer.js */ "./src/olcs/GaRasterSynchronizer.js");
/* harmony import */ var _olcs_GaTileset3dSynchronizer_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./olcs/GaTileset3dSynchronizer.js */ "./src/olcs/GaTileset3dSynchronizer.js");
/* harmony import */ var _olcs_GaVectorSynchronizer_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./olcs/GaVectorSynchronizer.js */ "./src/olcs/GaVectorSynchronizer.js");












/* harmony default export */ __webpack_exports__["default"] = (_olcs_OLCesium_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

// Using var for phantomJS
// eslint-disable-next-line no-var
var olcs = window['olcs'] = {};
olcs.OLCesium = _olcs_OLCesium_js__WEBPACK_IMPORTED_MODULE_0__["default"];
olcs.AbstractSynchronizer = _olcs_AbstractSynchronizer_js__WEBPACK_IMPORTED_MODULE_1__["default"];
olcs.RasterSynchronizer = _olcs_RasterSynchronizer_js__WEBPACK_IMPORTED_MODULE_2__["default"];
olcs.VectorSynchronizer = _olcs_VectorSynchronizer_js__WEBPACK_IMPORTED_MODULE_3__["default"];
olcs.core = _olcs_core_js__WEBPACK_IMPORTED_MODULE_4__["default"];

olcs.GaKmlSynchronizer = _olcs_GaKmlSynchronizer_js__WEBPACK_IMPORTED_MODULE_5__["default"];
olcs.GaRasterSynchronizer = _olcs_GaRasterSynchronizer_js__WEBPACK_IMPORTED_MODULE_6__["default"];
olcs.GaTileset3dSynchronizer = _olcs_GaTileset3dSynchronizer_js__WEBPACK_IMPORTED_MODULE_7__["default"];
olcs.GaVectorSynchronizer = _olcs_GaVectorSynchronizer_js__WEBPACK_IMPORTED_MODULE_8__["default"];


/***/ }),

/***/ "./src/olcs/AbstractSynchronizer.js":
/*!******************************************!*\
  !*** ./src/olcs/AbstractSynchronizer.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ol_Observable_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ol/Observable.js */ "ol/Observable.js");
/* harmony import */ var ol_Observable_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ol_Observable_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ol_layer_Group_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ol/layer/Group.js */ "ol/layer/Group.js");
/* harmony import */ var ol_layer_Group_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ol_layer_Group_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util.js */ "./src/olcs/util.js");
/**
 * @module olcs.AbstractSynchronizer
 */




var AbstractSynchronizer =
/*#__PURE__*/
function () {
  /**
   * @param {!ol.Map} map
   * @param {!Cesium.Scene} scene
   * @template T
   * @abstract
   * @api
   */
  function AbstractSynchronizer(map, scene) {
    /**
     * @type {!ol.Map}
     * @protected
     */
    this.map = map;
    /**
     * @type {ol.View}
     * @protected
     */

    this.view = map.getView();
    /**
     * @type {!Cesium.Scene}
     * @protected
     */

    this.scene = scene;
    /**
     * @type {ol.Collection.<ol.layer.Base>}
     * @protected
     */

    this.olLayers = map.getLayerGroup().getLayers();
    /**
     * @type {ol.layer.Group}
     */

    this.mapLayerGroup = map.getLayerGroup();
    /**
     * Map of OpenLayers layer ids (from getUid) to the Cesium ImageryLayers.
     * Null value means, that we are unable to create equivalent layers.
     * @type {Object.<string, ?Array.<T>>}
     * @protected
     */

    this.layerMap = {};
    /**
     * Map of listen keys for OpenLayers layer layers ids (from getUid).
     * @type {!Object.<string, Array<ol.EventsKey>>}
     * @protected
     */

    this.olLayerListenKeys = {};
    /**
     * Map of listen keys for OpenLayers layer groups ids (from getUid).
     * @type {!Object.<string, !Array.<ol.EventsKey>>}
     * @private
     */

    this.olGroupListenKeys_ = {};
  }
  /**
   * Destroy all and perform complete synchronization of the layers.
   * @api
   */


  var _proto = AbstractSynchronizer.prototype;

  _proto.synchronize = function synchronize() {
    this.destroyAll();
    this.addLayers_(this.mapLayerGroup);
  }
  /**
   * Order counterparts using the same algorithm as the Openlayers renderer:
   * z-index then original sequence order.
   * @protected
   */
  ;

  _proto.orderLayers = function orderLayers() {} // Ordering logics is handled in subclasses.

  /**
   * Add a layer hierarchy.
   * @param {ol.layer.Base} root
   * @private
   */
  ;

  _proto.addLayers_ = function addLayers_(root) {
    var _this = this;

    /** @type {Array<import('olsc/core.js').LayerWithParents>} */
    var fifo = [{
      layer: root,
      parents: []
    }];

    var _loop = function _loop() {
      var olLayerWithParents = fifo.splice(0, 1)[0];
      var olLayer = olLayerWithParents.layer;
      var olLayerId = Object(_util_js__WEBPACK_IMPORTED_MODULE_2__["getUid"])(olLayer).toString();
      _this.olLayerListenKeys[olLayerId] = [];
      console.assert(!_this.layerMap[olLayerId]);
      var cesiumObjects = null;

      if (olLayer instanceof ol_layer_Group_js__WEBPACK_IMPORTED_MODULE_1___default.a) {
        _this.listenForGroupChanges_(olLayer);

        if (olLayer !== _this.mapLayerGroup) {
          cesiumObjects = _this.createSingleLayerCounterparts(olLayerWithParents);
        }

        if (!cesiumObjects) {
          olLayer.getLayers().forEach(function (l) {
            if (l) {
              var newOlLayerWithParents = {
                layer: l,
                parents: olLayer === _this.mapLayerGroup ? [] : [olLayerWithParents.layer].concat(olLayerWithParents.parents)
              };
              fifo.push(newOlLayerWithParents);
            }
          });
        }
      } else {
        cesiumObjects = _this.createSingleLayerCounterparts(olLayerWithParents);

        if (!cesiumObjects) {
          // keep an eye on the layers that once failed to be added (might work when the layer is updated)
          // for example when a source is set after the layer is added to the map
          var layerId = olLayerId;
          var layerWithParents = olLayerWithParents;

          var onLayerChange = function onLayerChange(e) {
            var cesiumObjs = _this.createSingleLayerCounterparts(layerWithParents);

            if (cesiumObjs) {
              // unsubscribe event listener
              layerWithParents.layer.un('change', onLayerChange);

              _this.addCesiumObjects_(cesiumObjs, layerId, layerWithParents.layer);

              _this.orderLayers();
            }
          };

          _this.olLayerListenKeys[olLayerId].push(Object(_util_js__WEBPACK_IMPORTED_MODULE_2__["olcsListen"])(layerWithParents.layer, 'change', onLayerChange));
        }
      } // add Cesium layers


      if (cesiumObjects) {
        _this.addCesiumObjects_(cesiumObjects, olLayerId, olLayer);
      }
    };

    while (fifo.length > 0) {
      _loop();
    }

    this.orderLayers();
  }
  /**
   * Add Cesium objects.
   * @param {Array.<T>} cesiumObjects
   * @param {string} layerId
   * @param {ol.layer.Base} layer
   * @private
   */
  ;

  _proto.addCesiumObjects_ = function addCesiumObjects_(cesiumObjects, layerId, layer) {
    var _this2 = this;

    this.layerMap[layerId] = cesiumObjects;
    this.olLayerListenKeys[layerId].push(Object(_util_js__WEBPACK_IMPORTED_MODULE_2__["olcsListen"])(layer, 'change:zIndex', function () {
      return _this2.orderLayers();
    }));
    cesiumObjects.forEach(function (cesiumObject) {
      _this2.addCesiumObject(cesiumObject);
    });
  }
  /**
   * Remove and destroy a single layer.
   * @param {ol.layer.Layer} layer
   * @return {boolean} counterpart destroyed
   * @private
   */
  ;

  _proto.removeAndDestroySingleLayer_ = function removeAndDestroySingleLayer_(layer) {
    var _this3 = this;

    var uid = Object(_util_js__WEBPACK_IMPORTED_MODULE_2__["getUid"])(layer).toString();
    var counterparts = this.layerMap[uid];

    if (!!counterparts) {
      counterparts.forEach(function (counterpart) {
        _this3.removeSingleCesiumObject(counterpart, false);

        _this3.destroyCesiumObject(counterpart);
      });
      this.olLayerListenKeys[uid].forEach(ol_Observable_js__WEBPACK_IMPORTED_MODULE_0__["unByKey"]);
      delete this.olLayerListenKeys[uid];
    }

    delete this.layerMap[uid];
    return !!counterparts;
  }
  /**
   * Unlisten a single layer group.
   * @param {ol.layer.Group} group
   * @private
   */
  ;

  _proto.unlistenSingleGroup_ = function unlistenSingleGroup_(group) {
    if (group === this.mapLayerGroup) {
      return;
    }

    var uid = Object(_util_js__WEBPACK_IMPORTED_MODULE_2__["getUid"])(group).toString();
    var keys = this.olGroupListenKeys_[uid];
    keys.forEach(function (key) {
      Object(ol_Observable_js__WEBPACK_IMPORTED_MODULE_0__["unByKey"])(key);
    });
    delete this.olGroupListenKeys_[uid];
    delete this.layerMap[uid];
  }
  /**
   * Remove layer hierarchy.
   * @param {ol.layer.Base} root
   * @private
   */
  ;

  _proto.removeLayer_ = function removeLayer_(root) {
    var _this4 = this;

    if (!!root) {
      (function () {
        var fifo = [root];

        while (fifo.length > 0) {
          var olLayer = fifo.splice(0, 1)[0];

          var done = _this4.removeAndDestroySingleLayer_(olLayer);

          if (olLayer instanceof ol_layer_Group_js__WEBPACK_IMPORTED_MODULE_1___default.a) {
            _this4.unlistenSingleGroup_(olLayer);

            if (!done) {
              // No counterpart for the group itself so removing
              // each of the child layers.
              olLayer.getLayers().forEach(function (l) {
                fifo.push(l);
              });
            }
          }
        }
      })();
    }
  }
  /**
   * Register listeners for single layer group change.
   * @param {ol.layer.Group} group
   * @private
   */
  ;

  _proto.listenForGroupChanges_ = function listenForGroupChanges_(group) {
    var uuid = Object(_util_js__WEBPACK_IMPORTED_MODULE_2__["getUid"])(group).toString();
    console.assert(this.olGroupListenKeys_[uuid] === undefined);
    var listenKeyArray = [];
    this.olGroupListenKeys_[uuid] = listenKeyArray; // only the keys that need to be relistened when collection changes

    var contentKeys = [];

    var listenAddRemove = function () {
      var _this5 = this;

      var collection = group.getLayers();

      if (collection) {
        contentKeys = [collection.on('add', function (event) {
          _this5.addLayers_(event.element);
        }), collection.on('remove', function (event) {
          _this5.removeLayer_(event.element);
        })];
        listenKeyArray.push.apply(listenKeyArray, contentKeys);
      }
    }.bind(this);

    listenAddRemove();
    listenKeyArray.push(group.on('change:layers', function (e) {
      contentKeys.forEach(function (el) {
        var i = listenKeyArray.indexOf(el);

        if (i >= 0) {
          listenKeyArray.splice(i, 1);
        }

        Object(ol_Observable_js__WEBPACK_IMPORTED_MODULE_0__["unByKey"])(el);
      });
      listenAddRemove();
    }));
  }
  /**
   * Destroys all the created Cesium objects.
   * @protected
   */
  ;

  _proto.destroyAll = function destroyAll() {
    this.removeAllCesiumObjects(true); // destroy

    var objKey;

    for (objKey in this.olGroupListenKeys_) {
      var keys = this.olGroupListenKeys_[objKey];
      keys.forEach(ol_Observable_js__WEBPACK_IMPORTED_MODULE_0__["unByKey"]);
    }

    for (objKey in this.olLayerListenKeys) {
      this.olLayerListenKeys[objKey].forEach(ol_Observable_js__WEBPACK_IMPORTED_MODULE_0__["unByKey"]);
    }

    this.olGroupListenKeys_ = {};
    this.olLayerListenKeys = {};
    this.layerMap = {};
  }
  /**
   * Adds a single Cesium object to the collection.
   * @param {!T} object
   * @abstract
   * @protected
   */
  ;

  _proto.addCesiumObject = function addCesiumObject(object) {}
  /**
   * @param {!T} object
   * @abstract
   * @protected
   */
  ;

  _proto.destroyCesiumObject = function destroyCesiumObject(object) {}
  /**
   * Remove single Cesium object from the collection.
   * @param {!T} object
   * @param {boolean} destroy
   * @abstract
   * @protected
   */
  ;

  _proto.removeSingleCesiumObject = function removeSingleCesiumObject(object, destroy) {}
  /**
   * Remove all Cesium objects from the collection.
   * @param {boolean} destroy
   * @abstract
   * @protected
   */
  ;

  _proto.removeAllCesiumObjects = function removeAllCesiumObjects(destroy) {}
  /**
   * @param {import('olsc/core.js').LayerWithParents} olLayerWithParents
   * @return {?Array.<T>}
   * @abstract
   * @protected
   */
  ;

  _proto.createSingleLayerCounterparts = function createSingleLayerCounterparts(olLayerWithParents) {};

  return AbstractSynchronizer;
}();

/* harmony default export */ __webpack_exports__["default"] = (AbstractSynchronizer);

/***/ }),

/***/ "./src/olcs/AutoRenderLoop.js":
/*!************************************!*\
  !*** ./src/olcs/AutoRenderLoop.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * @module olcs.AutoRenderLoop
 */
var AutoRenderLoop =
/*#__PURE__*/
function () {
  /**
   * @constructor
   * @param {olcs.OLCesium} ol3d
   */
  function AutoRenderLoop(ol3d) {
    this.ol3d = ol3d;
    this.scene_ = ol3d.getCesiumScene();
    this.canvas_ = this.scene_.canvas;
    this._boundNotifyRepaintRequired = this.notifyRepaintRequired.bind(this);
    this.repaintEventNames_ = ['mousemove', 'mousedown', 'mouseup', 'touchstart', 'touchend', 'touchmove', 'pointerdown', 'pointerup', 'pointermove', 'wheel'];
    this.enable();
  }
  /**
   * Enable.
   */


  var _proto = AutoRenderLoop.prototype;

  _proto.enable = function enable() {
    this.scene_.requestRenderMode = true;
    this.scene_.maximumRenderTimeChange = 1000;

    for (var _iterator = this.repaintEventNames_, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var repaintKey = _ref;
      this.canvas_.addEventListener(repaintKey, this._boundNotifyRepaintRequired, false);
    }

    window.addEventListener('resize', this._boundNotifyRepaintRequired, false); // Listen for changes on the layer group

    this.ol3d.getOlMap().getLayerGroup().on('change', this._boundNotifyRepaintRequired);
  }
  /**
   * Disable.
   */
  ;

  _proto.disable = function disable() {
    for (var _iterator2 = this.repaintEventNames_, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
      var _ref2;

      if (_isArray2) {
        if (_i2 >= _iterator2.length) break;
        _ref2 = _iterator2[_i2++];
      } else {
        _i2 = _iterator2.next();
        if (_i2.done) break;
        _ref2 = _i2.value;
      }

      var repaintKey = _ref2;
      this.canvas_.removeEventListener(repaintKey, this._boundNotifyRepaintRequired, false);
    }

    window.removeEventListener('resize', this._boundNotifyRepaintRequired, false);
    this.ol3d.getOlMap().getLayerGroup().un('change', this._boundNotifyRepaintRequired);
    this.scene_.requestRenderMode = false;
  }
  /**
   * Restart render loop.
   * Force a restart of the render loop.
   * @api
   */
  ;

  _proto.restartRenderLoop = function restartRenderLoop() {
    this.notifyRepaintRequired();
  };

  _proto.notifyRepaintRequired = function notifyRepaintRequired() {
    this.scene_.requestRender();
  };

  return AutoRenderLoop;
}();

/* harmony default export */ __webpack_exports__["default"] = (AutoRenderLoop);

/***/ }),

/***/ "./src/olcs/Camera.js":
/*!****************************!*\
  !*** ./src/olcs/Camera.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ol_Observable_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ol/Observable.js */ "ol/Observable.js");
/* harmony import */ var ol_Observable_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ol_Observable_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./math.js */ "./src/olcs/math.js");
/* harmony import */ var ol_proj_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ol/proj.js */ "ol/proj.js");
/* harmony import */ var ol_proj_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(ol_proj_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _core_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./core.js */ "./src/olcs/core.js");
/**
 * @module olcs.Camera
 */





var Camera =
/*#__PURE__*/
function () {
  /**
   * This object takes care of additional 3d-specific properties of the view and
   * ensures proper synchronization with the underlying raw Cesium.Camera object.
   * @param {!Cesium.Scene} scene
   * @param {!ol.Map} map
   * @api
   */
  function Camera(scene, map) {
    var _this = this;

    /**
     * @type {!Cesium.Scene}
     * @private
     */
    this.scene_ = scene;
    /**
     * @type {!Cesium.Camera}
     * @private
     */

    this.cam_ = scene.camera;
    /**
     * @type {!ol.Map}
     * @private
     */

    this.map_ = map;
    /**
     * @type {?ol.View}
     * @private
     */

    this.view_ = null;
    /**
     * @type {?ol.EventsKey}
     * @private
     */

    this.viewListenKey_ = null;
    /**
     * @type {!ol.TransformFunction}
     * @private
     */

    this.toLonLat_ = Camera.identityProjection;
    /**
     * @type {!ol.TransformFunction}
     * @private
     */

    this.fromLonLat_ = Camera.identityProjection;
    /**
     * 0 -- topdown, PI/2 -- the horizon
     * @type {number}
     * @private
     */

    this.tilt_ = 0;
    /**
     * @type {number}
     * @private
     */

    this.distance_ = 0;
    /**
     * @type {?Cesium.Matrix4}
     * @private
     */

    this.lastCameraViewMatrix_ = null;
    /**
     * This is used to discard change events on view caused by updateView method.
     * @type {boolean}
     * @private
     */

    this.viewUpdateInProgress_ = false;
    this.map_.on('change:view', function (e) {
      _this.setView_(_this.map_.getView());
    });
    this.setView_(this.map_.getView());
  }
  /**
   * @param {Array.<number>} input Input coordinate array.
   * @param {Array.<number>=} opt_output Output array of coordinate values.
   * @param {number=} opt_dimension Dimension.
   * @return {Array.<number>} Input coordinate array (same array as input).
   */


  Camera.identityProjection = function identityProjection(input, opt_output, opt_dimension) {
    var dim = opt_dimension || input.length;

    if (opt_output) {
      for (var i = 0; i < dim; ++i) {
        opt_output[i] = input[i];
      }
    }

    return input;
  }
  /**
   * @param {?ol.View} view New view to use.
   * @private
   */
  ;

  var _proto = Camera.prototype;

  _proto.setView_ = function setView_(view) {
    var _this2 = this;

    if (this.view_) {
      Object(ol_Observable_js__WEBPACK_IMPORTED_MODULE_0__["unByKey"])(this.viewListenKey_);
      this.viewListenKey_ = null;
    }

    this.view_ = view;

    if (view) {
      var toLonLat = Object(ol_proj_js__WEBPACK_IMPORTED_MODULE_2__["getTransform"])(view.getProjection(), 'EPSG:4326');
      var fromLonLat = Object(ol_proj_js__WEBPACK_IMPORTED_MODULE_2__["getTransform"])('EPSG:4326', view.getProjection());
      console.assert(toLonLat && fromLonLat);
      this.toLonLat_ = toLonLat;
      this.fromLonLat_ = fromLonLat;
      this.viewListenKey_ = view.on('propertychange', function (e) {
        return _this2.handleViewEvent_(e);
      });
      this.readFromView();
    } else {
      this.toLonLat_ = Camera.identityProjection;
      this.fromLonLat_ = Camera.identityProjection;
    }
  }
  /**
   * @param {?} e
   * @private
   */
  ;

  _proto.handleViewEvent_ = function handleViewEvent_(e) {
    if (!this.viewUpdateInProgress_) {
      this.readFromView();
    }
  }
  /**
   * @param {number} heading In radians.
   * @api
   */
  ;

  _proto.setHeading = function setHeading(heading) {
    if (!this.view_) {
      return;
    }

    this.view_.setRotation(heading);
  }
  /**
   * @return {number|undefined} Heading in radians.
   * @api
   */
  ;

  _proto.getHeading = function getHeading() {
    if (!this.view_) {
      return undefined;
    }

    var rotation = this.view_.getRotation();
    return rotation || 0;
  }
  /**
   * @param {number} tilt In radians.
   * @api
   */
  ;

  _proto.setTilt = function setTilt(tilt) {
    this.tilt_ = tilt;
    this.updateCamera_();
  }
  /**
   * @return {number} Tilt in radians.
   * @api
   */
  ;

  _proto.getTilt = function getTilt() {
    return this.tilt_;
  }
  /**
   * @param {number} distance In meters.
   * @api
   */
  ;

  _proto.setDistance = function setDistance(distance) {
    this.distance_ = distance;
    this.updateCamera_();
    this.updateView();
  }
  /**
   * @return {number} Distance in meters.
   * @api
   */
  ;

  _proto.getDistance = function getDistance() {
    return this.distance_;
  }
  /**
   * Shortcut for ol.View.setCenter().
   * @param {!ol.Coordinate} center Same projection as the ol.View.
   * @api
   */
  ;

  _proto.setCenter = function setCenter(center) {
    if (!this.view_) {
      return;
    }

    this.view_.setCenter(center);
  }
  /**
   * Shortcut for ol.View.getCenter().
   * @return {ol.Coordinate|undefined} Same projection as the ol.View.
   * @api
   */
  ;

  _proto.getCenter = function getCenter() {
    if (!this.view_) {
      return undefined;
    }

    return this.view_.getCenter();
  }
  /**
   * Sets the position of the camera.
   * @param {!ol.Coordinate} position Same projection as the ol.View.
   * @api
   */
  ;

  _proto.setPosition = function setPosition(position) {
    if (!this.toLonLat_) {
      return;
    }

    var ll = this.toLonLat_(position);
    console.assert(ll);
    var carto = new Cesium.Cartographic(Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["toRadians"])(ll[0]), Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["toRadians"])(ll[1]), this.getAltitude());
    this.cam_.setView({
      destination: Cesium.Ellipsoid.WGS84.cartographicToCartesian(carto)
    });
    this.updateView();
  }
  /**
   * Calculates position under the camera.
   * @return {!ol.Coordinate|undefined} Same projection as the ol.View.
   * @api
   */
  ;

  _proto.getPosition = function getPosition() {
    if (!this.fromLonLat_) {
      return undefined;
    }

    var carto = Cesium.Ellipsoid.WGS84.cartesianToCartographic(this.cam_.position);
    var pos = this.fromLonLat_([Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["toDegrees"])(carto.longitude), Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["toDegrees"])(carto.latitude)]);
    console.assert(pos);
    return pos;
  }
  /**
   * @param {number} altitude In meters.
   * @api
   */
  ;

  _proto.setAltitude = function setAltitude(altitude) {
    var carto = Cesium.Ellipsoid.WGS84.cartesianToCartographic(this.cam_.position);
    carto.height = altitude;
    this.cam_.position = Cesium.Ellipsoid.WGS84.cartographicToCartesian(carto);
    this.updateView();
  }
  /**
   * @return {number} Altitude in meters.
   * @api
   */
  ;

  _proto.getAltitude = function getAltitude() {
    var carto = Cesium.Ellipsoid.WGS84.cartesianToCartographic(this.cam_.position);
    return carto.height;
  }
  /**
   * Updates the state of the underlying Cesium.Camera
   * according to the current values of the properties.
   * @private
   */
  ;

  _proto.updateCamera_ = function updateCamera_() {
    if (!this.view_ || !this.toLonLat_) {
      return;
    }

    var center = this.view_.getCenter();

    if (!center) {
      return;
    }

    var ll = this.toLonLat_(center);
    console.assert(ll);
    var carto = new Cesium.Cartographic(Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["toRadians"])(ll[0]), Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["toRadians"])(ll[1]));

    if (this.scene_.globe) {
      var height = this.scene_.globe.getHeight(carto);
      carto.height = height || 0;
    }

    var destination = Cesium.Ellipsoid.WGS84.cartographicToCartesian(carto);
    /** @type {Cesium.optionsOrientation} */

    var orientation = {
      pitch: this.tilt_ - Cesium.Math.PI_OVER_TWO,
      heading: -this.view_.getRotation(),
      roll: undefined
    };
    this.cam_.setView({
      destination: destination,
      orientation: orientation
    });
    this.cam_.moveBackward(this.distance_);
    this.checkCameraChange(true);
  }
  /**
   * Calculates the values of the properties from the current ol.View state.
   * @api
   */
  ;

  _proto.readFromView = function readFromView() {
    if (!this.view_ || !this.toLonLat_) {
      return;
    }

    var center = this.view_.getCenter();

    if (center === undefined || center === null) {
      return;
    }

    var ll = this.toLonLat_(center);
    console.assert(ll);
    var resolution = this.view_.getResolution();
    this.distance_ = this.calcDistanceForResolution(resolution || 0, Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["toRadians"])(ll[1]));
    this.updateCamera_();
  }
  /**
   * Calculates the values of the properties from the current Cesium.Camera state.
   * Modifies the center, resolution and rotation properties of the view.
   * @api
   */
  ;

  _proto.updateView = function updateView() {
    if (!this.view_ || !this.fromLonLat_) {
      return;
    }

    this.viewUpdateInProgress_ = true; // target & distance

    var ellipsoid = Cesium.Ellipsoid.WGS84;
    var scene = this.scene_;
    var target = _core_js__WEBPACK_IMPORTED_MODULE_3__["default"].pickCenterPoint(scene);
    var bestTarget = target;

    if (!bestTarget) {
      //TODO: how to handle this properly ?
      var globe = scene.globe;
      var carto = this.cam_.positionCartographic.clone();
      var height = globe.getHeight(carto);
      carto.height = height || 0;
      bestTarget = Cesium.Ellipsoid.WGS84.cartographicToCartesian(carto);
    }

    this.distance_ = Cesium.Cartesian3.distance(bestTarget, this.cam_.position);
    var bestTargetCartographic = ellipsoid.cartesianToCartographic(bestTarget);
    this.view_.setCenter(this.fromLonLat_([Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["toDegrees"])(bestTargetCartographic.longitude), Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["toDegrees"])(bestTargetCartographic.latitude)])); // resolution

    this.view_.setResolution(this.calcResolutionForDistance(this.distance_, bestTargetCartographic ? bestTargetCartographic.latitude : 0));
    /*
     * Since we are positioning the target, the values of heading and tilt
     * need to be calculated _at the target_.
     */

    if (target) {
      var pos = this.cam_.position; // normal to the ellipsoid at the target

      var targetNormal = new Cesium.Cartesian3();
      ellipsoid.geocentricSurfaceNormal(target, targetNormal); // vector from the target to the camera

      var targetToCamera = new Cesium.Cartesian3();
      Cesium.Cartesian3.subtract(pos, target, targetToCamera);
      Cesium.Cartesian3.normalize(targetToCamera, targetToCamera); // HEADING

      var up = this.cam_.up;
      var right = this.cam_.right;
      var normal = new Cesium.Cartesian3(-target.y, target.x, 0); // what is it?

      var heading = Cesium.Cartesian3.angleBetween(right, normal);
      var cross = Cesium.Cartesian3.cross(target, up, new Cesium.Cartesian3());
      var orientation = cross.z;
      this.view_.setRotation(orientation < 0 ? heading : -heading); // TILT

      var tiltAngle = Math.acos(Cesium.Cartesian3.dot(targetNormal, targetToCamera));
      this.tilt_ = isNaN(tiltAngle) ? 0 : tiltAngle;
    } else {
      // fallback when there is no target
      this.view_.setRotation(this.cam_.heading);
      this.tilt_ = -this.cam_.pitch + Math.PI / 2;
    }

    this.viewUpdateInProgress_ = false;
  }
  /**
   * Check if the underlying camera state has changed and ensure synchronization.
   * @param {boolean=} opt_dontSync Do not synchronize the view.
   */
  ;

  _proto.checkCameraChange = function checkCameraChange(opt_dontSync) {
    var old = this.lastCameraViewMatrix_;
    var current = this.cam_.viewMatrix;

    if (!old || !Cesium.Matrix4.equalsEpsilon(old, current, 1e-5)) {
      this.lastCameraViewMatrix_ = current.clone();

      if (opt_dontSync !== true) {
        this.updateView();
      }
    }
  }
  /**
   * calculate the distance between camera and centerpoint based on the resolution and latitude value
   * @param {number} resolution Number of map units per pixel.
   * @param {number} latitude Latitude in radians.
   * @return {number} The calculated distance.
   * @api
   */
  ;

  _proto.calcDistanceForResolution = function calcDistanceForResolution(resolution, latitude) {
    var canvas = this.scene_.canvas;
    var fovy = this.cam_.frustum.fovy; // vertical field of view

    console.assert(!isNaN(fovy));
    var metersPerUnit = this.view_.getProjection().getMetersPerUnit(); // number of "map units" visible in 2D (vertically)

    var visibleMapUnits = resolution * canvas.clientHeight; // The metersPerUnit does not take latitude into account, but it should
    // be lower with increasing latitude -- we have to compensate.
    // In 3D it is not possible to maintain the resolution at more than one point,
    // so it only makes sense to use the latitude of the "target" point.

    var relativeCircumference = Math.cos(Math.abs(latitude)); // how many meters should be visible in 3D

    var visibleMeters = visibleMapUnits * metersPerUnit * relativeCircumference; // distance required to view the calculated length in meters
    //
    //  fovy/2
    //    |\
    //  x | \
    //    |--\
    // visibleMeters/2

    var requiredDistance = visibleMeters / 2 / Math.tan(fovy / 2); // NOTE: This calculation is not absolutely precise, because metersPerUnit
    // is a great simplification. It does not take ellipsoid/terrain into account.

    return requiredDistance;
  }
  /**
   * calculate the resolution based on a distance(camera to position) and latitude value
   * @param {number} distance
   * @param {number} latitude
   * @return {number} The calculated resolution.
   * @api
   */
  ;

  _proto.calcResolutionForDistance = function calcResolutionForDistance(distance, latitude) {
    // See the reverse calculation (calcDistanceForResolution) for details
    var canvas = this.scene_.canvas;
    var fovy = this.cam_.frustum.fovy;
    var metersPerUnit = this.view_.getProjection().getMetersPerUnit();
    var visibleMeters = 2 * distance * Math.tan(fovy / 2);
    var relativeCircumference = Math.cos(Math.abs(latitude));
    var visibleMapUnits = visibleMeters / metersPerUnit / relativeCircumference;
    var resolution = visibleMapUnits / canvas.clientHeight;
    return resolution;
  };

  return Camera;
}();

/* harmony default export */ __webpack_exports__["default"] = (Camera);

/***/ }),

/***/ "./src/olcs/FeatureConverter.js":
/*!**************************************!*\
  !*** ./src/olcs/FeatureConverter.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ol_geom_Geometry_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ol/geom/Geometry.js */ "ol/geom/Geometry.js");
/* harmony import */ var ol_geom_Geometry_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ol_geom_Geometry_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ol_style_Icon_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ol/style/Icon.js */ "ol/style/Icon.js");
/* harmony import */ var ol_style_Icon_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ol_style_Icon_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ol_source_Vector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ol/source/Vector.js */ "ol/source/Vector.js");
/* harmony import */ var ol_source_Vector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(ol_source_Vector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var ol_source_Cluster_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ol/source/Cluster.js */ "ol/source/Cluster.js");
/* harmony import */ var ol_source_Cluster_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(ol_source_Cluster_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var ol_geom_Polygon_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ol/geom/Polygon.js */ "ol/geom/Polygon.js");
/* harmony import */ var ol_geom_Polygon_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(ol_geom_Polygon_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var ol_extent_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ol/extent.js */ "ol/extent.js");
/* harmony import */ var ol_extent_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(ol_extent_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var ol_geom_SimpleGeometry_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ol/geom/SimpleGeometry.js */ "ol/geom/SimpleGeometry.js");
/* harmony import */ var ol_geom_SimpleGeometry_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(ol_geom_SimpleGeometry_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _core_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./core.js */ "./src/olcs/core.js");
/* harmony import */ var _core_VectorLayerCounterpart_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./core/VectorLayerCounterpart.js */ "./src/olcs/core/VectorLayerCounterpart.js");
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./util.js */ "./src/olcs/util.js");
/**
 * @module olcs.FeatureConverter
 */










/**
 * @typedef {Object} ModelStyle
 * @property {Cesium.Matrix4} [debugModelMatrix]
 * @property {Cesium.ModelFromGltfOptions} cesiumOptions
 */

var FeatureConverter =
/*#__PURE__*/
function () {
  /**
   * Concrete base class for converting from OpenLayers3 vectors to Cesium
   * primitives.
   * Extending this class is possible provided that the extending class and
   * the library are compiled together by the closure compiler.
   * @param {!Cesium.Scene} scene Cesium scene.
   * @constructor
   * @api
   */
  function FeatureConverter(scene) {
    /**
     * @protected
     */
    this.scene = scene;
    /**
     * Bind once to have a unique function for using as a listener
     * @type {function(ol.source.Vector.Event)}
     * @private
     */

    this.boundOnRemoveOrClearFeatureListener_ = this.onRemoveOrClearFeature_.bind(this);
    /**
     * @type {Cesium.Cartesian3}
     * @private
     */

    this.defaultBillboardEyeOffset_ = new Cesium.Cartesian3(0, 0, 10);
  }
  /**
   * @param {ol.source.Vector.Event} evt
   * @private
   */


  var _proto = FeatureConverter.prototype;

  _proto.onRemoveOrClearFeature_ = function onRemoveOrClearFeature_(evt) {
    var source = evt.target;
    console.assert(source instanceof ol_source_Vector_js__WEBPACK_IMPORTED_MODULE_2___default.a);
    var cancellers = _util_js__WEBPACK_IMPORTED_MODULE_9__["default"].obj(source)['olcs_cancellers'];

    if (cancellers) {
      var feature = evt.feature;

      if (feature) {
        // remove
        var id = Object(_util_js__WEBPACK_IMPORTED_MODULE_9__["getUid"])(feature);
        var canceller = cancellers[id];

        if (canceller) {
          canceller();
          delete cancellers[id];
        }
      } else {
        // clear
        for (var key in cancellers) {
          if (cancellers.hasOwnProperty(key)) {
            cancellers[key]();
          }
        }

        _util_js__WEBPACK_IMPORTED_MODULE_9__["default"].obj(source)['olcs_cancellers'] = {};
      }
    }
  }
  /**
   * @param {ol.layer.Vector|ol.layer.Image} layer
   * @param {!ol.Feature} feature OpenLayers feature.
   * @param {!Cesium.Primitive|Cesium.Label|Cesium.Billboard} primitive
   * @protected
   */
  ;

  _proto.setReferenceForPicking = function setReferenceForPicking(layer, feature, primitive) {
    primitive.olLayer = layer;
    primitive.olFeature = feature;
  }
  /**
   * Basics primitive creation using a color attribute.
   * Note that Cesium has 'interior' and outline geometries.
   * @param {ol.layer.Vector|ol.layer.Image} layer
   * @param {!ol.Feature} feature OpenLayers feature.
   * @param {!ol.geom.Geometry} olGeometry OpenLayers geometry.
   * @param {!Cesium.Geometry} geometry
   * @param {!Cesium.Color} color
   * @param {number=} opt_lineWidth
   * @return {Cesium.Primitive}
   * @protected
   */
  ;

  _proto.createColoredPrimitive = function createColoredPrimitive(layer, feature, olGeometry, geometry, color, opt_lineWidth) {
    var createInstance = function createInstance(geometry, color) {
      var instance = new Cesium.GeometryInstance({
        // always update Cesium externs before adding a property
        geometry: geometry
      });

      if (color && !(color instanceof Cesium.ImageMaterialProperty)) {
        instance.attributes = {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(color)
        };
      }

      return instance;
    };

    var options = {
      // always update Cesium externs before adding a property
      flat: true,
      // work with all geometries
      renderState: {
        depthTest: {
          enabled: true
        }
      }
    };

    if (opt_lineWidth !== undefined) {
      if (!options.renderState) {
        options.renderState = {};
      }

      options.renderState.lineWidth = opt_lineWidth;
    }

    var instances = createInstance(geometry, color);
    var heightReference = this.getHeightReference(layer, feature, olGeometry);
    var primitive;

    if (heightReference === Cesium.HeightReference.CLAMP_TO_GROUND) {
      var ctor = instances.geometry.constructor;

      if (ctor && !ctor['createShadowVolume']) {
        return null;
      }

      primitive = new Cesium.GroundPrimitive({
        geometryInstances: instances
      });
    } else {
      primitive = new Cesium.Primitive({
        geometryInstances: instances
      });
    }

    if (color instanceof Cesium.ImageMaterialProperty) {
      var dataUri = color.image.getValue().toDataURL();
      primitive.appearance = new Cesium.MaterialAppearance({
        flat: true,
        renderState: {
          depthTest: {
            enabled: true
          }
        },
        material: new Cesium.Material({
          fabric: {
            type: 'Image',
            uniforms: {
              image: dataUri
            }
          }
        })
      });
    } else {
      primitive.appearance = new Cesium.PerInstanceColorAppearance(options);
    }

    this.setReferenceForPicking(layer, feature, primitive);
    return primitive;
  }
  /**
   * Return the fill or stroke color from a plain ol style.
   * @param {!ol.style.Style|ol.style.Text} style
   * @param {boolean} outline
   * @return {!Cesium.Color}
   * @protected
   */
  ;

  _proto.extractColorFromOlStyle = function extractColorFromOlStyle(style, outline) {
    var fillColor = style.getFill() ? style.getFill().getColor() : null;
    var strokeColor = style.getStroke() ? style.getStroke().getColor() : null;
    var olColor = 'black';

    if (strokeColor && outline) {
      olColor = strokeColor;
    } else if (fillColor) {
      olColor = fillColor;
    }

    return _core_js__WEBPACK_IMPORTED_MODULE_7__["default"].convertColorToCesium(olColor);
  }
  /**
   * Return the width of stroke from a plain ol style.
   * @param {!ol.style.Style|ol.style.Text} style
   * @return {number}
   * @protected
   */
  ;

  _proto.extractLineWidthFromOlStyle = function extractLineWidthFromOlStyle(style) {
    // Handling of line width WebGL limitations is handled by Cesium.
    var width = style.getStroke() ? style.getStroke().getWidth() : undefined;
    return width !== undefined ? width : 1;
  }
  /**
   * Create a primitive collection out of two Cesium geometries.
   * Only the OpenLayers style colors will be used.
   * @param {ol.layer.Vector|ol.layer.Image} layer
   * @param {!ol.Feature} feature OpenLayers feature.
   * @param {!ol.geom.Geometry} olGeometry OpenLayers geometry.
   * @param {!Cesium.Geometry} fillGeometry
   * @param {!Cesium.Geometry} outlineGeometry
   * @param {!ol.style.Style} olStyle
   * @return {!Cesium.PrimitiveCollection}
   * @protected
   */
  ;

  _proto.wrapFillAndOutlineGeometries = function wrapFillAndOutlineGeometries(layer, feature, olGeometry, fillGeometry, outlineGeometry, olStyle) {
    var fillColor = this.extractColorFromOlStyle(olStyle, false);
    var outlineColor = this.extractColorFromOlStyle(olStyle, true);
    var primitives = new Cesium.PrimitiveCollection();

    if (olStyle.getFill()) {
      var p1 = this.createColoredPrimitive(layer, feature, olGeometry, fillGeometry, fillColor);
      console.assert(!!p1);
      primitives.add(p1);
    }

    if (olStyle.getStroke() && outlineGeometry) {
      var width = this.extractLineWidthFromOlStyle(olStyle);
      var p2 = this.createColoredPrimitive(layer, feature, olGeometry, outlineGeometry, outlineColor, width);

      if (p2) {
        // Some outline geometries are not supported by Cesium in clamp to ground
        // mode. These primitives are skipped.
        primitives.add(p2);
      }
    }

    return primitives;
  } // Geometry converters

  /**
   * Create a Cesium primitive if style has a text component.
   * Eventually return a PrimitiveCollection including current primitive.
   * @param {ol.layer.Vector|ol.layer.Image} layer
   * @param {!ol.Feature} feature OpenLayers feature..
   * @param {!ol.geom.Geometry} geometry
   * @param {!ol.style.Style} style
   * @param {!Cesium.Primitive} primitive current primitive
   * @return {!Cesium.PrimitiveCollection}
   * @protected
   */
  ;

  _proto.addTextStyle = function addTextStyle(layer, feature, geometry, style, primitive) {
    var primitives;

    if (!(primitive instanceof Cesium.PrimitiveCollection)) {
      primitives = new Cesium.PrimitiveCollection();
      primitives.add(primitive);
    } else {
      primitives = primitive;
    }

    if (!style.getText()) {
      return primitives;
    }

    var text =
    /** @type {!ol.style.Text} */
    style.getText();
    var label = this.olGeometry4326TextPartToCesium(layer, feature, geometry, text);

    if (label) {
      primitives.add(label);
    }

    return primitives;
  }
  /**
   * Add a billboard to a Cesium.BillboardCollection.
   * Overriding this wrapper allows manipulating the billboard options.
   * @param {!Cesium.BillboardCollection} billboards
   * @param {!Cesium.optionsBillboardCollectionAdd} bbOptions
   * @param {ol.layer.Vector|ol.layer.Image} layer
   * @param {!ol.Feature} feature OpenLayers feature.
   * @param {!ol.geom.Geometry} geometry
   * @param {!ol.style.Style} style
   * @return {!Cesium.Billboard} newly created billboard
   * @api
   */
  ;

  _proto.csAddBillboard = function csAddBillboard(billboards, bbOptions, layer, feature, geometry, style) {
    if (!bbOptions.eyeOffset) {
      bbOptions.eyeOffset = this.defaultBillboardEyeOffset_;
    }

    var bb = billboards.add(bbOptions);
    this.setReferenceForPicking(layer, feature, bb);
    return bb;
  }
  /**
   * Convert an OpenLayers circle geometry to Cesium.
   * @param {ol.layer.Vector|ol.layer.Image} layer
   * @param {!ol.Feature} feature OpenLayers feature..
   * @param {!ol.geom.Circle} olGeometry OpenLayers circle geometry.
   * @param {!ol.ProjectionLike} projection
   * @param {!ol.style.Style} olStyle
   * @return {!Cesium.PrimitiveCollection} primitives
   * @api
   */
  ;

  _proto.olCircleGeometryToCesium = function olCircleGeometryToCesium(layer, feature, olGeometry, projection, olStyle) {
    var _this = this;

    olGeometry = _core_js__WEBPACK_IMPORTED_MODULE_7__["default"].olGeometryCloneTo4326(olGeometry, projection);
    console.assert(olGeometry.getType() == 'Circle'); // ol.Coordinate

    var center = olGeometry.getCenter();
    var height = center.length == 3 ? center[2] : 0.0;
    var point = center.slice();
    point[0] += olGeometry.getRadius(); // Cesium

    center = _core_js__WEBPACK_IMPORTED_MODULE_7__["default"].ol4326CoordinateToCesiumCartesian(center);
    point = _core_js__WEBPACK_IMPORTED_MODULE_7__["default"].ol4326CoordinateToCesiumCartesian(point); // Accurate computation of straight distance

    var radius = Cesium.Cartesian3.distance(center, point);
    var fillGeometry = new Cesium.CircleGeometry({
      // always update Cesium externs before adding a property
      center: center,
      radius: radius,
      height: height
    });
    var outlinePrimitive, outlineGeometry;

    if (this.getHeightReference(layer, feature, olGeometry) === Cesium.HeightReference.CLAMP_TO_GROUND) {
      var width = this.extractLineWidthFromOlStyle(olStyle);

      if (width) {
        var circlePolygon = Object(ol_geom_Polygon_js__WEBPACK_IMPORTED_MODULE_4__["circular"])(olGeometry.getCenter(), radius);
        var positions = _core_js__WEBPACK_IMPORTED_MODULE_7__["default"].ol4326CoordinateArrayToCsCartesians(circlePolygon.getLinearRing(0).getCoordinates());

        if (!Object(_util_js__WEBPACK_IMPORTED_MODULE_9__["isGroundPolylinePrimitiveSupported"])(this.scene)) {
          var color = this.extractColorFromOlStyle(olStyle, true);
          outlinePrimitive = this.createStackedGroundCorridors(layer, feature, width, color, positions);
        } else {
          outlinePrimitive = new Cesium.GroundPolylinePrimitive({
            geometryInstances: new Cesium.GeometryInstance({
              geometry: new Cesium.GroundPolylineGeometry({
                positions: positions,
                width: width
              })
            }),
            appearance: new Cesium.PolylineMaterialAppearance({
              material: this.olStyleToCesium(feature, olStyle, true)
            }),
            classificationType: Cesium.ClassificationType.TERRAIN
          });
          outlinePrimitive.readyPromise.then(function () {
            _this.setReferenceForPicking(layer, feature, outlinePrimitive._primitive);
          });
        }
      }
    } else {
      outlineGeometry = new Cesium.CircleOutlineGeometry({
        // always update Cesium externs before adding a property
        center: center,
        radius: radius,
        extrudedHeight: height,
        height: height
      });
    }

    var primitives = this.wrapFillAndOutlineGeometries(layer, feature, olGeometry, fillGeometry, outlineGeometry, olStyle);

    if (outlinePrimitive) {
      primitives.add(outlinePrimitive);
    }

    return this.addTextStyle(layer, feature, olGeometry, olStyle, primitives);
  }
  /**
   * @param {ol.layer.Vector|ol.layer.Image} layer
   * @param {!ol.Feature} feature OpenLayers feature..
   * @param {!number} width The width of the line.
   * @param {!Cesium.Color} color The color of the line.
   * @param {!Array<Cesium.Cartesian3>|Array<Array<Cesium.Cartesian3>>} positions The vertices of the line(s).
   * @return {!Cesium.GroundPrimitive} primitive
   */
  ;

  _proto.createStackedGroundCorridors = function createStackedGroundCorridors(layer, feature, width, color, positions) {
    // Convert positions to an Array if it isn't
    if (!Array.isArray(positions[0])) {
      positions = [positions];
    }

    width = Math.max(3, width); // A <3px width is too small for ground primitives

    var geometryInstances = [];
    var previousDistance = 0; // A stack of ground lines with increasing width (in meters) are created.
    // Only one of these lines is displayed at any time giving a feeling of continuity.
    // The values for the distance and width factor are more or less arbitrary.
    // Applications can override this logics by subclassing the FeatureConverter class.

    var _arr = [1000, 4000, 16000, 64000, 254000, 1000000, 10000000];

    for (var _i = 0; _i < _arr.length; _i++) {
      var distance = _arr[_i];
      width *= 2.14;
      var geometryOptions = {
        // always update Cesium externs before adding a property
        width: width,
        vertexFormat: Cesium.VertexFormat.POSITION_ONLY
      };

      for (var _iterator = positions, _isArray = Array.isArray(_iterator), _i2 = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i2 >= _iterator.length) break;
          _ref = _iterator[_i2++];
        } else {
          _i2 = _iterator.next();
          if (_i2.done) break;
          _ref = _i2.value;
        }

        var linePositions = _ref;
        geometryOptions.positions = linePositions;
        geometryInstances.push(new Cesium.GeometryInstance({
          geometry: new Cesium.CorridorGeometry(geometryOptions),
          attributes: {
            color: Cesium.ColorGeometryInstanceAttribute.fromColor(color),
            distanceDisplayCondition: new Cesium.DistanceDisplayConditionGeometryInstanceAttribute(previousDistance, distance - 1)
          }
        }));
      }

      previousDistance = distance;
    }

    return new Cesium.GroundPrimitive({
      // always update Cesium externs before adding a property
      geometryInstances: geometryInstances
    });
  }
  /**
   * Convert an OpenLayers line string geometry to Cesium.
   * @param {ol.layer.Vector|ol.layer.Image} layer
   * @param {!ol.Feature} feature OpenLayers feature..
   * @param {!ol.geom.LineString} olGeometry OpenLayers line string geometry.
   * @param {!ol.ProjectionLike} projection
   * @param {!ol.style.Style} olStyle
   * @return {!Cesium.PrimitiveCollection} primitives
   * @api
   */
  ;

  _proto.olLineStringGeometryToCesium = function olLineStringGeometryToCesium(layer, feature, olGeometry, projection, olStyle) {
    var _this2 = this;

    olGeometry = _core_js__WEBPACK_IMPORTED_MODULE_7__["default"].olGeometryCloneTo4326(olGeometry, projection);
    console.assert(olGeometry.getType() == 'LineString');
    var positions = _core_js__WEBPACK_IMPORTED_MODULE_7__["default"].ol4326CoordinateArrayToCsCartesians(olGeometry.getCoordinates());
    var width = this.extractLineWidthFromOlStyle(olStyle);
    var outlinePrimitive;
    var heightReference = this.getHeightReference(layer, feature, olGeometry);

    if (heightReference === Cesium.HeightReference.CLAMP_TO_GROUND && !Object(_util_js__WEBPACK_IMPORTED_MODULE_9__["isGroundPolylinePrimitiveSupported"])(this.scene)) {
      var color = this.extractColorFromOlStyle(olStyle, true);
      outlinePrimitive = this.createStackedGroundCorridors(layer, feature, width, color, positions);
    } else {
      var appearance = new Cesium.PolylineMaterialAppearance({
        // always update Cesium externs before adding a property
        material: this.olStyleToCesium(feature, olStyle, true)
      });
      var geometryOptions = {
        // always update Cesium externs before adding a property
        positions: positions,
        width: width
      };
      var primitiveOptions = {
        // always update Cesium externs before adding a property
        appearance: appearance
      };

      if (heightReference === Cesium.HeightReference.CLAMP_TO_GROUND) {
        var geometry = new Cesium.GroundPolylineGeometry(geometryOptions);
        primitiveOptions.geometryInstances = new Cesium.GeometryInstance({
          geometry: geometry
        }), outlinePrimitive = new Cesium.GroundPolylinePrimitive(primitiveOptions);
        outlinePrimitive.readyPromise.then(function () {
          _this2.setReferenceForPicking(layer, feature, outlinePrimitive._primitive);
        });
      } else {
        geometryOptions.vertexFormat = appearance.vertexFormat;

        var _geometry = new Cesium.PolylineGeometry(geometryOptions);

        primitiveOptions.geometryInstances = new Cesium.GeometryInstance({
          geometry: _geometry
        }), outlinePrimitive = new Cesium.Primitive(primitiveOptions);
      }
    }

    this.setReferenceForPicking(layer, feature, outlinePrimitive);
    return this.addTextStyle(layer, feature, olGeometry, olStyle, outlinePrimitive);
  }
  /**
   * Convert an OpenLayers polygon geometry to Cesium.
   * @param {ol.layer.Vector|ol.layer.Image} layer
   * @param {!ol.Feature} feature OpenLayers feature..
   * @param {!ol.geom.Polygon} olGeometry OpenLayers polygon geometry.
   * @param {!ol.ProjectionLike} projection
   * @param {!ol.style.Style} olStyle
   * @return {!Cesium.PrimitiveCollection} primitives
   * @api
   */
  ;

  _proto.olPolygonGeometryToCesium = function olPolygonGeometryToCesium(layer, feature, olGeometry, projection, olStyle) {
    var _this3 = this;

    olGeometry = _core_js__WEBPACK_IMPORTED_MODULE_7__["default"].olGeometryCloneTo4326(olGeometry, projection);
    console.assert(olGeometry.getType() == 'Polygon');
    var heightReference = this.getHeightReference(layer, feature, olGeometry);
    var fillGeometry, outlineGeometry, outlinePrimitive;

    if (olGeometry.getCoordinates()[0].length == 5 && feature.getGeometry().get('olcs.polygon_kind') === 'rectangle') {
      // Create a rectangle according to the longitude and latitude curves
      var coordinates = olGeometry.getCoordinates()[0]; // Extract the West, South, East, North coordinates

      var extent = Object(ol_extent_js__WEBPACK_IMPORTED_MODULE_5__["boundingExtent"])(coordinates);
      var rectangle = Cesium.Rectangle.fromDegrees(extent[0], extent[1], extent[2], extent[3]); // Extract the average height of the vertices

      var maxHeight = 0.0;

      if (coordinates[0].length == 3) {
        for (var c = 0; c < coordinates.length; c++) {
          maxHeight = Math.max(maxHeight, coordinates[c][2]);
        }
      } // Render the cartographic rectangle


      fillGeometry = new Cesium.RectangleGeometry({
        ellipsoid: Cesium.Ellipsoid.WGS84,
        rectangle: rectangle,
        height: maxHeight
      });
      outlineGeometry = new Cesium.RectangleOutlineGeometry({
        ellipsoid: Cesium.Ellipsoid.WGS84,
        rectangle: rectangle,
        height: maxHeight
      });
    } else {
      var rings = olGeometry.getLinearRings(); // always update Cesium externs before adding a property

      var hierarchy = {};
      var polygonHierarchy = hierarchy;
      console.assert(rings.length > 0);

      for (var i = 0; i < rings.length; ++i) {
        var olPos = rings[i].getCoordinates();
        var positions = _core_js__WEBPACK_IMPORTED_MODULE_7__["default"].ol4326CoordinateArrayToCsCartesians(olPos);
        console.assert(positions && positions.length > 0);

        if (i == 0) {
          hierarchy.positions = positions;
        } else {
          if (!hierarchy.holes) {
            hierarchy.holes = [];
          }

          hierarchy.holes.push({
            positions: positions
          });
        }
      }

      fillGeometry = new Cesium.PolygonGeometry({
        // always update Cesium externs before adding a property
        polygonHierarchy: polygonHierarchy,
        perPositionHeight: true
      }); // Since Cesium doesn't yet support Polygon outlines on terrain yet (coming soon...?)
      // we don't create an outline geometry if clamped, but instead do the polyline method
      // for each ring. Most of this code should be removeable when Cesium adds
      // support for Polygon outlines on terrain.

      if (heightReference === Cesium.HeightReference.CLAMP_TO_GROUND) {
        var width = this.extractLineWidthFromOlStyle(olStyle);

        if (width > 0) {
          var _positions = [hierarchy.positions];

          if (hierarchy.holes) {
            for (var _i3 = 0; _i3 < hierarchy.holes.length; ++_i3) {
              _positions.push(hierarchy.holes[_i3].positions);
            }
          }

          if (!Object(_util_js__WEBPACK_IMPORTED_MODULE_9__["isGroundPolylinePrimitiveSupported"])(this.scene)) {
            var color = this.extractColorFromOlStyle(olStyle, true);
            outlinePrimitive = this.createStackedGroundCorridors(layer, feature, width, color, _positions);
          } else {
            var appearance = new Cesium.PolylineMaterialAppearance({
              // always update Cesium externs before adding a property
              material: this.olStyleToCesium(feature, olStyle, true)
            });
            var geometryInstances = [];
            var _arr2 = _positions;

            for (var _i4 = 0; _i4 < _arr2.length; _i4++) {
              var linePositions = _arr2[_i4];
              var polylineGeometry = new Cesium.GroundPolylineGeometry({
                positions: linePositions,
                width: width
              });
              geometryInstances.push(new Cesium.GeometryInstance({
                geometry: polylineGeometry
              }));
            }

            var primitiveOptions = {
              // always update Cesium externs before adding a property
              appearance: appearance,
              geometryInstances: geometryInstances
            };
            outlinePrimitive = new Cesium.GroundPolylinePrimitive(primitiveOptions);
            outlinePrimitive.readyPromise.then(function () {
              _this3.setReferenceForPicking(layer, feature, outlinePrimitive._primitive);
            });
          }
        }
      } else {
        // Actually do the normal polygon thing. This should end the removable
        // section of code described above.
        outlineGeometry = new Cesium.PolygonOutlineGeometry({
          // always update Cesium externs before adding a property
          polygonHierarchy: hierarchy,
          perPositionHeight: true
        });
      }
    }

    var primitives = this.wrapFillAndOutlineGeometries(layer, feature, olGeometry, fillGeometry, outlineGeometry, olStyle);

    if (outlinePrimitive) {
      primitives.add(outlinePrimitive);
    }

    return this.addTextStyle(layer, feature, olGeometry, olStyle, primitives);
  }
  /**
   * @param {ol.layer.Vector|ol.layer.Image} layer
   * @param {ol.Feature} feature OpenLayers feature..
   * @param {!ol.geom.Geometry} geometry
   * @return {!Cesium.HeightReference}
   * @api
   */
  ;

  _proto.getHeightReference = function getHeightReference(layer, feature, geometry) {
    // Read from the geometry
    var altitudeMode = geometry.get('altitudeMode'); // Or from the feature

    if (altitudeMode === undefined) {
      altitudeMode = feature.get('altitudeMode');
    } // Or from the layer


    if (altitudeMode === undefined) {
      altitudeMode = layer.get('altitudeMode');
    }

    var heightReference = Cesium.HeightReference.NONE;

    if (altitudeMode === 'clampToGround') {
      heightReference = Cesium.HeightReference.CLAMP_TO_GROUND;
    } else if (altitudeMode === 'relativeToGround') {
      heightReference = Cesium.HeightReference.RELATIVE_TO_GROUND;
    }

    return heightReference;
  }
  /**
   * Convert a point geometry to a Cesium BillboardCollection.
   * @param {ol.layer.Vector|ol.layer.Image} layer
   * @param {!ol.Feature} feature OpenLayers feature..
   * @param {!ol.geom.Point} olGeometry OpenLayers point geometry.
   * @param {!ol.ProjectionLike} projection
   * @param {!ol.style.Style} style
   * @param {!ol.style.Image} imageStyle
   * @param {!Cesium.BillboardCollection} billboards
   * @param {function(!Cesium.Billboard)=} opt_newBillboardCallback Called when the new billboard is added.
   * @api
   */
  ;

  _proto.createBillboardFromImage = function createBillboardFromImage(layer, feature, olGeometry, projection, style, imageStyle, billboards, opt_newBillboardCallback) {
    if (imageStyle instanceof ol_style_Icon_js__WEBPACK_IMPORTED_MODULE_1___default.a) {
      // make sure the image is scheduled for load
      imageStyle.load();
    }

    var image = imageStyle.getImage(1); // get normal density

    var isImageLoaded = function isImageLoaded(image) {
      return image.src != '' && image.naturalHeight != 0 && image.naturalWidth != 0 && image.complete;
    };

    var reallyCreateBillboard = function () {
      if (!image) {
        return;
      }

      if (!(image instanceof HTMLCanvasElement || image instanceof Image || image instanceof HTMLImageElement)) {
        return;
      }

      var center = olGeometry.getCoordinates();
      var position = _core_js__WEBPACK_IMPORTED_MODULE_7__["default"].ol4326CoordinateToCesiumCartesian(center);
      var color;
      var opacity = imageStyle.getOpacity();

      if (opacity !== undefined) {
        color = new Cesium.Color(1.0, 1.0, 1.0, opacity);
      }

      var heightReference = this.getHeightReference(layer, feature, olGeometry);
      var bbOptions =
      /** @type {Cesium.optionsBillboardCollectionAdd} */
      {
        // always update Cesium externs before adding a property
        image: image,
        color: color,
        scale: imageStyle.getScale(),
        heightReference: heightReference,
        position: position
      };

      if (imageStyle instanceof ol_style_Icon_js__WEBPACK_IMPORTED_MODULE_1___default.a) {
        var anchor = imageStyle.getAnchor();

        if (anchor) {
          bbOptions.pixelOffset = new Cesium.Cartesian2(image.width / 2 - anchor[0], image.height / 2 - anchor[1]);
        }
      }

      var bb = this.csAddBillboard(billboards, bbOptions, layer, feature, olGeometry, style);

      if (opt_newBillboardCallback) {
        opt_newBillboardCallback(bb);
      }
    }.bind(this);

    if (image instanceof Image && !isImageLoaded(image)) {
      // Cesium requires the image to be loaded
      var cancelled = false;
      var source = layer.getSource();

      var canceller = function canceller() {
        cancelled = true;
      };

      source.on(['removefeature', 'clear'], this.boundOnRemoveOrClearFeatureListener_);
      var cancellers = _util_js__WEBPACK_IMPORTED_MODULE_9__["default"].obj(source)['olcs_cancellers'];

      if (!cancellers) {
        cancellers = _util_js__WEBPACK_IMPORTED_MODULE_9__["default"].obj(source)['olcs_cancellers'] = {};
      }

      var fuid = Object(_util_js__WEBPACK_IMPORTED_MODULE_9__["getUid"])(feature);

      if (cancellers[fuid]) {
        // When the feature change quickly, a canceller may still be present so
        // we cancel it here to prevent creation of a billboard.
        cancellers[fuid]();
      }

      cancellers[fuid] = canceller;

      var listener = function listener() {
        image.removeEventListener('load', listener);

        if (!billboards.isDestroyed() && !cancelled) {
          // Create billboard if the feature is still displayed on the map.
          reallyCreateBillboard();
        }
      };

      image.addEventListener('load', listener);
    } else {
      reallyCreateBillboard();
    }
  }
  /**
   * Convert a point geometry to a Cesium BillboardCollection.
   * @param {ol.layer.Vector|ol.layer.Image} layer
   * @param {!ol.Feature} feature OpenLayers feature..
   * @param {!ol.geom.Point} olGeometry OpenLayers point geometry.
   * @param {!ol.ProjectionLike} projection
   * @param {!ol.style.Style} style
   * @param {!Cesium.BillboardCollection} billboards
   * @param {function(!Cesium.Billboard)=} opt_newBillboardCallback Called when
   * the new billboard is added.
   * @return {Cesium.Primitive} primitives
   * @api
   */
  ;

  _proto.olPointGeometryToCesium = function olPointGeometryToCesium(layer, feature, olGeometry, projection, style, billboards, opt_newBillboardCallback) {
    console.assert(olGeometry.getType() == 'Point');
    olGeometry = _core_js__WEBPACK_IMPORTED_MODULE_7__["default"].olGeometryCloneTo4326(olGeometry, projection);
    var modelPrimitive = null;
    var imageStyle = style.getImage();

    if (imageStyle) {
      var olcsModelFunction =
      /** @type {function():olcsx.ModelStyle} */
      olGeometry.get('olcs_model') || feature.get('olcs_model');

      if (olcsModelFunction) {
        var olcsModel = olcsModelFunction();
        var options =
        /** @type {Cesium.ModelFromGltfOptions} */
        Object.assign({}, {
          scene: this.scene
        }, olcsModel.cesiumOptions);
        var model = Cesium.Model.fromGltf(options);
        modelPrimitive = new Cesium.PrimitiveCollection();
        modelPrimitive.add(model);

        if (olcsModel.debugModelMatrix) {
          modelPrimitive.add(new Cesium.DebugModelMatrixPrimitive({
            modelMatrix: olcsModel.debugModelMatrix
          }));
        }
      } else {
        this.createBillboardFromImage(layer, feature, olGeometry, projection, style, imageStyle, billboards, opt_newBillboardCallback);
      }
    }

    if (style.getText()) {
      return this.addTextStyle(layer, feature, olGeometry, style, modelPrimitive || new Cesium.Primitive());
    } else {
      return modelPrimitive;
    }
  }
  /**
   * Convert an OpenLayers multi-something geometry to Cesium.
   * @param {ol.layer.Vector|ol.layer.Image} layer
   * @param {!ol.Feature} feature OpenLayers feature..
   * @param {!ol.geom.Geometry} geometry OpenLayers geometry.
   * @param {!ol.ProjectionLike} projection
   * @param {!ol.style.Style} olStyle
   * @param {!Cesium.BillboardCollection} billboards
   * @param {function(!Cesium.Billboard)=} opt_newBillboardCallback Called when
   * the new billboard is added.
   * @return {Cesium.Primitive} primitives
   * @api
   */
  ;

  _proto.olMultiGeometryToCesium = function olMultiGeometryToCesium(layer, feature, geometry, projection, olStyle, billboards, opt_newBillboardCallback) {
    var _this4 = this;

    // Do not reproject to 4326 now because it will be done later.
    // FIXME: would be better to combine all child geometries in one primitive
    // instead we create n primitives for simplicity.
    var accumulate = function accumulate(geometries, functor) {
      var primitives = new Cesium.PrimitiveCollection();
      geometries.forEach(function (geometry) {
        primitives.add(functor(layer, feature, geometry, projection, olStyle));
      });
      return primitives;
    };

    var subgeos;

    switch (geometry.getType()) {
      case 'MultiPoint':
        geometry =
        /** @type {!ol.geom.MultiPoint} */
        geometry;
        subgeos = geometry.getPoints();

        if (olStyle.getText()) {
          var primitives = new Cesium.PrimitiveCollection();
          subgeos.forEach(function (geometry) {
            console.assert(geometry);

            var result = _this4.olPointGeometryToCesium(layer, feature, geometry, projection, olStyle, billboards, opt_newBillboardCallback);

            if (result) {
              primitives.add(result);
            }
          });
          return primitives;
        } else {
          subgeos.forEach(function (geometry) {
            console.assert(geometry);

            _this4.olPointGeometryToCesium(layer, feature, geometry, projection, olStyle, billboards, opt_newBillboardCallback);
          });
          return null;
        }

      case 'MultiLineString':
        geometry =
        /** @type {!ol.geom.MultiLineString} */
        geometry;
        subgeos = geometry.getLineStrings();
        return accumulate(subgeos, this.olLineStringGeometryToCesium.bind(this));

      case 'MultiPolygon':
        geometry =
        /** @type {!ol.geom.MultiPolygon} */
        geometry;
        subgeos = geometry.getPolygons();
        return accumulate(subgeos, this.olPolygonGeometryToCesium.bind(this));

      default:
        console.assert(false, "Unhandled multi geometry type" + geometry.getType());
    }
  }
  /**
   * Convert an OpenLayers text style to Cesium.
   * @param {ol.layer.Vector|ol.layer.Image} layer
   * @param {!ol.Feature} feature OpenLayers feature..
   * @param {!ol.geom.Geometry} geometry
   * @param {!ol.style.Text} style
   * @return {Cesium.LabelCollection} Cesium primitive
   * @api
   */
  ;

  _proto.olGeometry4326TextPartToCesium = function olGeometry4326TextPartToCesium(layer, feature, geometry, style) {
    var text = style.getText();

    if (!text) {
      return null;
    }

    var labels = new Cesium.LabelCollection({
      scene: this.scene
    }); // TODO: export and use the text draw position from OpenLayers .
    // See src/ol/render/vector.js

    var extentCenter = Object(ol_extent_js__WEBPACK_IMPORTED_MODULE_5__["getCenter"])(geometry.getExtent());

    if (geometry instanceof ol_geom_SimpleGeometry_js__WEBPACK_IMPORTED_MODULE_6___default.a) {
      var first = geometry.getFirstCoordinate();
      extentCenter[2] = first.length == 3 ? first[2] : 0.0;
    }

    var options =
    /** @type {Cesium.optionsLabelCollection} */
    {};
    options.position = _core_js__WEBPACK_IMPORTED_MODULE_7__["default"].ol4326CoordinateToCesiumCartesian(extentCenter);
    options.text = text;
    options.heightReference = this.getHeightReference(layer, feature, geometry);
    var offsetX = style.getOffsetX();
    var offsetY = style.getOffsetY();

    if (offsetX != 0 && offsetY != 0) {
      var offset = new Cesium.Cartesian2(offsetX, offsetY);
      options.pixelOffset = offset;
    }

    options.font = style.getFont() || '10px sans-serif'; // OpenLayers default

    var labelStyle = undefined;

    if (style.getFill()) {
      options.fillColor = this.extractColorFromOlStyle(style, false);
      labelStyle = Cesium.LabelStyle.FILL;
    }

    if (style.getStroke()) {
      options.outlineWidth = this.extractLineWidthFromOlStyle(style);
      options.outlineColor = this.extractColorFromOlStyle(style, true);
      labelStyle = Cesium.LabelStyle.OUTLINE;
    }

    if (style.getFill() && style.getStroke()) {
      labelStyle = Cesium.LabelStyle.FILL_AND_OUTLINE;
    }

    options.style = labelStyle;
    var horizontalOrigin;

    switch (style.getTextAlign()) {
      case 'left':
        horizontalOrigin = Cesium.HorizontalOrigin.LEFT;
        break;

      case 'right':
        horizontalOrigin = Cesium.HorizontalOrigin.RIGHT;
        break;

      case 'center':
      default:
        horizontalOrigin = Cesium.HorizontalOrigin.CENTER;
    }

    options.horizontalOrigin = horizontalOrigin;

    if (style.getTextBaseline()) {
      var verticalOrigin;

      switch (style.getTextBaseline()) {
        case 'top':
          verticalOrigin = Cesium.VerticalOrigin.TOP;
          break;

        case 'middle':
          verticalOrigin = Cesium.VerticalOrigin.CENTER;
          break;

        case 'bottom':
          verticalOrigin = Cesium.VerticalOrigin.BOTTOM;
          break;

        case 'alphabetic':
          verticalOrigin = Cesium.VerticalOrigin.TOP;
          break;

        case 'hanging':
          verticalOrigin = Cesium.VerticalOrigin.BOTTOM;
          break;

        default:
          console.assert(false, "unhandled baseline " + style.getTextBaseline());
      }

      options.verticalOrigin = verticalOrigin;
    }

    var l = labels.add(options);
    this.setReferenceForPicking(layer, feature, l);
    return labels;
  }
  /**
   * Convert an OpenLayers style to a Cesium Material.
   * @param {ol.Feature} feature OpenLayers feature..
   * @param {!ol.style.Style} style
   * @param {boolean} outline
   * @return {Cesium.Material}
   * @api
   */
  ;

  _proto.olStyleToCesium = function olStyleToCesium(feature, style, outline) {
    var fill = style.getFill();
    var stroke = style.getStroke();

    if (outline && !stroke || !outline && !fill) {
      return null; // FIXME use a default style? Developer error?
    }

    var color = outline ? stroke.getColor() : fill.getColor();
    color = _core_js__WEBPACK_IMPORTED_MODULE_7__["default"].convertColorToCesium(color);

    if (outline && stroke.getLineDash()) {
      return Cesium.Material.fromType('Stripe', {
        // always update Cesium externs before adding a property
        horizontal: false,
        repeat: 500,
        // TODO how to calculate this?
        evenColor: color,
        oddColor: new Cesium.Color(0, 0, 0, 0) // transparent

      });
    } else {
      return Cesium.Material.fromType('Color', {
        // always update Cesium externs before adding a property
        color: color
      });
    }
  }
  /**
   * Compute OpenLayers plain style.
   * Evaluates style function, blend arrays, get default style.
   * @param {ol.layer.Vector|ol.layer.Image} layer
   * @param {!ol.Feature} feature
   * @param {ol.StyleFunction|undefined} fallbackStyleFunction
   * @param {number} resolution
   * @return {Array.<!ol.style.Style>} null if no style is available
   * @api
   */
  ;

  _proto.computePlainStyle = function computePlainStyle(layer, feature, fallbackStyleFunction, resolution) {
    /**
     * @type {ol.FeatureStyleFunction|undefined}
     */
    var featureStyleFunction = feature.getStyleFunction();
    /**
     * @type {ol.style.Style|Array.<ol.style.Style>}
     */

    var style = null;

    if (featureStyleFunction) {
      style = featureStyleFunction(feature, resolution);
    }

    if (!style && fallbackStyleFunction) {
      style = fallbackStyleFunction(feature, resolution);
    }

    if (!style) {
      // The feature must not be displayed
      return null;
    } // FIXME combine materials as in cesium-materials-pack?
    // then this function must return a custom material
    // More simply, could blend the colors like described in
    // http://en.wikipedia.org/wiki/Alpha_compositing


    return Array.isArray(style) ? style : [style];
  }
  /**
   * @protected
   * @param {!ol.Feature} feature
   * @param {!ol.style.Style} style
   * @param {!ol.geom.Geometry=} opt_geom Geometry to be converted.
   * @return {ol.geom.Geometry|undefined}
   */
  ;

  _proto.getGeometryFromFeature = function getGeometryFromFeature(feature, style, opt_geom) {
    if (opt_geom) {
      return opt_geom;
    }

    var geom3d =
    /** @type {!ol.geom.Geometry} */
    feature.get('olcs.3d_geometry');

    if (geom3d && geom3d instanceof ol_geom_Geometry_js__WEBPACK_IMPORTED_MODULE_0___default.a) {
      return geom3d;
    }

    if (style) {
      var geomFuncRes = style.getGeometryFunction()(feature);

      if (geomFuncRes instanceof ol_geom_Geometry_js__WEBPACK_IMPORTED_MODULE_0___default.a) {
        return geomFuncRes;
      }
    }

    return feature.getGeometry();
  }
  /**
   * Convert one OpenLayers feature up to a collection of Cesium primitives.
   * @param {ol.layer.Vector|ol.layer.Image} layer
   * @param {!ol.Feature} feature OpenLayers feature.
   * @param {!ol.style.Style} style
   * @param {!import('olcs/core/VectorLayerConterpart.js').OlFeatureToCesiumContext} context
   * @param {!ol.geom.Geometry=} opt_geom Geometry to be converted.
   * @return {Cesium.Primitive} primitives
   * @api
   */
  ;

  _proto.olFeatureToCesium = function olFeatureToCesium(layer, feature, style, context, opt_geom) {
    var _this5 = this;

    var geom = this.getGeometryFromFeature(feature, style, opt_geom);

    if (!geom) {
      // OpenLayers features may not have a geometry
      // See http://geojson.org/geojson-spec.html#feature-objects
      return null;
    }

    var proj = context.projection;

    var newBillboardAddedCallback = function newBillboardAddedCallback(bb) {
      var featureBb = context.featureToCesiumMap[Object(_util_js__WEBPACK_IMPORTED_MODULE_9__["getUid"])(feature)];

      if (featureBb instanceof Array) {
        featureBb.push(bb);
      } else {
        context.featureToCesiumMap[Object(_util_js__WEBPACK_IMPORTED_MODULE_9__["getUid"])(feature)] = [bb];
      }
    };

    switch (geom.getType()) {
      case 'GeometryCollection':
        var primitives = new Cesium.PrimitiveCollection();
        var collection =
        /** @type {!ol.geom.GeometryCollection} */
        geom; // TODO: use getGeometriesArray() instead

        collection.getGeometries().forEach(function (geom) {
          if (geom) {
            var prims = _this5.olFeatureToCesium(layer, feature, style, context, geom);

            if (prims) {
              primitives.add(prims);
            }
          }
        });
        return primitives;

      case 'Point':
        geom =
        /** @type {!ol.geom.Point} */
        geom;
        var bbs = context.billboards;
        var result = this.olPointGeometryToCesium(layer, feature, geom, proj, style, bbs, newBillboardAddedCallback);

        if (!result) {
          // no wrapping primitive
          return null;
        } else {
          return result;
        }

      case 'Circle':
        geom =
        /** @type {!ol.geom.Circle} */
        geom;
        return this.olCircleGeometryToCesium(layer, feature, geom, proj, style);

      case 'LineString':
        geom =
        /** @type {!ol.geom.LineString} */
        geom;
        return this.olLineStringGeometryToCesium(layer, feature, geom, proj, style);

      case 'Polygon':
        geom =
        /** @type {!ol.geom.Polygon} */
        geom;
        return this.olPolygonGeometryToCesium(layer, feature, geom, proj, style);

      case 'MultiPoint':
      case 'MultiLineString':
      case 'MultiPolygon':
        var result2 = this.olMultiGeometryToCesium(layer, feature, geom, proj, style, context.billboards, newBillboardAddedCallback);

        if (!result2) {
          // no wrapping primitive
          return null;
        } else {
          return result2;
        }

      case 'LinearRing':
        throw new Error('LinearRing should only be part of polygon.');

      default:
        throw new Error("Ol geom type not handled : " + geom.getType());
    }
  }
  /**
   * Convert an OpenLayers vector layer to Cesium primitive collection.
   * For each feature, the associated primitive will be stored in
   * `featurePrimitiveMap`.
   * @param {!(ol.layer.Vector|ol.layer.Image)} olLayer
   * @param {!ol.View} olView
   * @param {!Object.<number, !Cesium.Primitive>} featurePrimitiveMap
   * @return {!olcs.core.VectorLayerCounterpart}
   * @api
   */
  ;

  _proto.olVectorLayerToCesium = function olVectorLayerToCesium(olLayer, olView, featurePrimitiveMap) {
    var proj = olView.getProjection();
    var resolution = olView.getResolution();

    if (resolution === undefined || !proj) {
      console.assert(false, 'View not ready'); // an assertion is not enough for closure to assume resolution and proj
      // are defined

      throw new Error('View not ready');
    }

    var source = olLayer.getSource();

    if (source instanceof ol_source_Cluster_js__WEBPACK_IMPORTED_MODULE_3___default.a) {
      source = source.getSource();
    }

    console.assert(source instanceof ol_source_Vector_js__WEBPACK_IMPORTED_MODULE_2___default.a);
    var features = source.getFeatures();
    var counterpart = new _core_VectorLayerCounterpart_js__WEBPACK_IMPORTED_MODULE_8__["default"](proj, this.scene);
    var context = counterpart.context;

    for (var i = 0; i < features.length; ++i) {
      var feature = features[i];

      if (!feature) {
        continue;
      }
      /**
       * @type {ol.StyleFunction|undefined}
       */


      var layerStyle = olLayer.getStyleFunction();
      var styles = this.computePlainStyle(olLayer, feature, layerStyle, resolution);

      if (!styles || !styles.length) {
        // only 'render' features with a style
        continue;
      }
      /**
       * @type {Cesium.Primitive|null}
       */


      var primitives = null;

      for (var _i5 = 0; _i5 < styles.length; _i5++) {
        var prims = this.olFeatureToCesium(olLayer, feature, styles[_i5], context);

        if (prims) {
          if (!primitives) {
            primitives = prims;
          } else if (prims) {
            var _i6 = 0,
                prim = void 0;

            while (prim = prims.get(_i6)) {
              primitives.add(prim);
              _i6++;
            }
          }
        }
      }

      if (!primitives) {
        continue;
      }

      featurePrimitiveMap[Object(_util_js__WEBPACK_IMPORTED_MODULE_9__["getUid"])(feature)] = primitives;
      counterpart.getRootPrimitive().add(primitives);
    }

    return counterpart;
  }
  /**
   * Convert an OpenLayers feature to Cesium primitive collection.
   * @param {!(ol.layer.Vector|ol.layer.Image)} layer
   * @param {!ol.View} view
   * @param {!ol.Feature} feature
   * @param {!import('olcs/core/VectorLayerConterpart.js').OlFeatureToCesiumContext} context
   * @return {Cesium.Primitive}
   * @api
   */
  ;

  _proto.convert = function convert(layer, view, feature, context) {
    var proj = view.getProjection();
    var resolution = view.getResolution();

    if (resolution == undefined || !proj) {
      return null;
    }
    /**
     * @type {ol.StyleFunction|undefined}
     */


    var layerStyle = layer.getStyleFunction();
    var styles = this.computePlainStyle(layer, feature, layerStyle, resolution);

    if (!styles.length) {
      // only 'render' features with a style
      return null;
    }

    context.projection = proj;
    /**
     * @type {Cesium.Primitive|null}
     */

    var primitives = null;

    for (var i = 0; i < styles.length; i++) {
      var prims = this.olFeatureToCesium(layer, feature, styles[i], context);

      if (!primitives) {
        primitives = prims;
      } else if (prims) {
        var _i7 = 0,
            prim = void 0;

        while (prim = prims.get(_i7)) {
          primitives.add(prim);
          _i7++;
        }
      }
    }

    return primitives;
  };

  return FeatureConverter;
}();

/* harmony default export */ __webpack_exports__["default"] = (FeatureConverter);

/***/ }),

/***/ "./src/olcs/GaKmlSynchronizer.js":
/*!***************************************!*\
  !*** ./src/olcs/GaKmlSynchronizer.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ol_layer_Layer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ol/layer/Layer.js */ "ol/layer/Layer.js");
/* harmony import */ var ol_layer_Layer_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ol_layer_Layer_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ol_layer_Vector_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ol/layer/Vector.js */ "ol/layer/Vector.js");
/* harmony import */ var ol_layer_Vector_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ol_layer_Vector_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util.js */ "./src/olcs/util.js");
/* harmony import */ var _AbstractSynchronizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./AbstractSynchronizer.js */ "./src/olcs/AbstractSynchronizer.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/**
 * @module olcs.GaKmlSynchronizer
 */





var exports =
/*#__PURE__*/
function (_olcsAbstractSynchron) {
  _inheritsLoose(exports, _olcsAbstractSynchron);

  /**
   * Unidirectionally synchronize geoadmin kml layers to Cesium.
   * @param {!ol.Map} map
   * @param {!Cesium.Scene} scene
   * @param {!Cesium.DataSourceCollection} dataSources
   */
  function exports(map, scene, dataSources) {
    var _this;

    _this = _olcsAbstractSynchron.call(this, map, scene) || this;
    /**
     * @protected
     */

    _this.dataSources_ = dataSources;
    return _this;
  }

  var _proto = exports.prototype;

  _proto.createSingleLayerCounterparts = function createSingleLayerCounterparts(olLayerWithParents) {
    var dsP;
    var layer = olLayerWithParents.layer;
    var factory = layer['getCesiumDataSource'];

    if (factory) {
      dsP = factory(this.scene);
    }

    if (!dsP) {
      /** @type {string} */
      var id = layer.id;
      /** @type {string} */

      var url = layer.url;

      if (!(layer instanceof ol_layer_Layer_js__WEBPACK_IMPORTED_MODULE_0___default.a) || !id || !/^KML/.test(id) || !url || /:\/\/public\./.test(url)) {
        return null;
      }
      /** @type {string|Document} */


      var loadParam = url;
      /** @type {string} */

      var kml = "" + (layer.getSource().get('rawData') || '');

      if (kml) {
        loadParam = new DOMParser().parseFromString(kml, 'text/xml');
      }

      dsP = Cesium.KmlDataSource.load(loadParam, {
        camera: this.scene.camera,
        canvas: this.scene.canvas,
        clampToGround: true
      });
    }

    var that = this;
    dsP.then(function (ds) {
      var _that$olLayerListenKe;

      ds.show = layer.getVisible();
      var uid = Object(_util_js__WEBPACK_IMPORTED_MODULE_2__["getUid"])(layer).toString();
      var listenKeyArray = [];
      listenKeyArray.push(layer.on('change:visible', function (evt) {
        ds.show = evt.target.getVisible();
      }));

      (_that$olLayerListenKe = that.olLayerListenKeys[uid]).push.apply(_that$olLayerListenKe, listenKeyArray); // Add link between OL and Cesium features.


      if (layer instanceof ol_layer_Vector_js__WEBPACK_IMPORTED_MODULE_1___default.a) {
        layer.getSource().getFeatures().forEach(function (feature) {
          if (ds.entities.getById) {
            var entity = ds.entities.getById(feature.getId());

            if (entity) {
              entity['olFeature'] = feature;
              entity['olLayer'] = layer;
            }
          }
        });
      }
    });
    return [dsP];
  };

  _proto.addCesiumObject = function addCesiumObject(dsP) {
    this.dataSources_.add(dsP);
  }
  /**
   * @inheritDoc
   */
  ;

  _proto.destroyCesiumObject = function destroyCesiumObject(dsP) {
    var that = this;
    dsP.then(function (ds) {
      that.dataSources_.remove(ds, true);
    });
  }
  /**
   * @inheritDoc
   */
  ;

  _proto.removeSingleCesiumObject = function removeSingleCesiumObject(dsP, destroy) {
    var that = this;
    dsP.then(function (ds) {
      that.dataSources_.remove(ds, destroy);
    });
  }
  /**
   * @inheritDoc
   */
  ;

  _proto.removeAllCesiumObjects = function removeAllCesiumObjects(destroy) {
    this.dataSources_.removeAll(destroy);
  };

  return exports;
}(_AbstractSynchronizer_js__WEBPACK_IMPORTED_MODULE_3__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (exports);

/***/ }),

/***/ "./src/olcs/GaRasterSynchronizer.js":
/*!******************************************!*\
  !*** ./src/olcs/GaRasterSynchronizer.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ol_layer_Layer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ol/layer/Layer.js */ "ol/layer/Layer.js");
/* harmony import */ var ol_layer_Layer_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ol_layer_Layer_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ol_source_Vector_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ol/source/Vector.js */ "ol/source/Vector.js");
/* harmony import */ var ol_source_Vector_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ol_source_Vector_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _RasterSynchronizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./RasterSynchronizer.js */ "./src/olcs/RasterSynchronizer.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/**
 * @module olcs.GaRasterSynchronizer
 */




var exports =
/*#__PURE__*/
function (_olcsRasterSynchroniz) {
  _inheritsLoose(exports, _olcsRasterSynchroniz);

  function exports() {
    return _olcsRasterSynchroniz.apply(this, arguments) || this;
  }

  var _proto = exports.prototype;

  /**
   * @override
   */
  _proto.convertLayerToCesiumImageries = function convertLayerToCesiumImageries(olLayer, viewProj) {
    if (olLayer instanceof ol_layer_Layer_js__WEBPACK_IMPORTED_MODULE_0___default.a) {
      var source = olLayer.getSource();

      if (source instanceof ol_source_Vector_js__WEBPACK_IMPORTED_MODULE_1___default.a) {
        return null;
      }
    }
    /**
     * @type {Cesium.ImageryProvider}
     */


    var provider = null; // Read custom, non standard properties

    var factory = olLayer['getCesiumImageryProvider'];

    if (!factory) {
      // root layer group
      return null;
    }

    provider = factory();

    if (!provider) {
      return null;
    } // the provider is always non-null if we got this far


    var providers = Array.isArray(provider) ? provider : [provider];
    return providers.map(function (p) {
      return new Cesium.ImageryLayer(p);
    });
  };

  return exports;
}(_RasterSynchronizer_js__WEBPACK_IMPORTED_MODULE_2__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (exports);

/***/ }),

/***/ "./src/olcs/GaTileset3dSynchronizer.js":
/*!*********************************************!*\
  !*** ./src/olcs/GaTileset3dSynchronizer.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util.js */ "./src/olcs/util.js");
/* harmony import */ var _AbstractSynchronizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AbstractSynchronizer.js */ "./src/olcs/AbstractSynchronizer.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/**
 * @module olcs.GaTileset3dSynchronizer
 */



var exports =
/*#__PURE__*/
function (_olcsAbstractSynchron) {
  _inheritsLoose(exports, _olcsAbstractSynchron);

  /**
   * Unidirectionally synchronize geoadmin kml layers to Cesium.
   * @param {!ol.Map} map
   * @param {!Cesium.Scene} scene
   */
  function exports(map, scene) {
    var _this;

    _this = _olcsAbstractSynchron.call(this, map, scene) || this;
    /**
     * @protected
     */

    _this.primitives_ = new Cesium.PrimitiveCollection();
    scene.primitives.add(_this.primitives_);
    return _this;
  }

  var _proto = exports.prototype;

  _proto.createSingleLayerCounterparts = function createSingleLayerCounterparts(olLayerWithParents) {
    var prim;
    var layer = olLayerWithParents.layer;
    var factory = layer['getCesiumTileset3d'];

    if (factory) {
      prim = factory(this.scene);
    }

    if (!prim) {
      return null;
    }

    if (prim) {
      var _this$olLayerListenKe;

      prim.show = layer.getVisible();
      var uid = Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["getUid"])(layer).toString();
      var listenKeyArray = [];
      listenKeyArray.push(layer.on(['change:visible'], function (e) {
        prim.show = layer.getVisible();
      }));

      (_this$olLayerListenKe = this.olLayerListenKeys[uid]).push.apply(_this$olLayerListenKe, listenKeyArray);
    }

    return [prim];
  };

  _proto.addCesiumObject = function addCesiumObject(prim) {
    if (!this.primitives_.contains(prim)) {
      this.primitives_.add(prim);
    }
  };

  _proto.destroyCesiumObject = function destroyCesiumObject(prim) {
    if (this.primitives_.contains(prim)) {
      this.primitives_.remove(prim);
    }
  };

  _proto.removeSingleCesiumObject = function removeSingleCesiumObject(prim, destroy) {
    if (this.primitives_.contains(prim)) {
      this.primitives_.remove(prim);
    }
  };

  _proto.removeAllCesiumObjects = function removeAllCesiumObjects(destroy) {
    this.primitives_.removeAll();
  };

  return exports;
}(_AbstractSynchronizer_js__WEBPACK_IMPORTED_MODULE_1__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (exports);

/***/ }),

/***/ "./src/olcs/GaVectorSynchronizer.js":
/*!******************************************!*\
  !*** ./src/olcs/GaVectorSynchronizer.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VectorSynchronizer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VectorSynchronizer.js */ "./src/olcs/VectorSynchronizer.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/**
 * @module olcs.GaVectorSynchronizer
 */


var exports =
/*#__PURE__*/
function (_olcsVectorSynchroniz) {
  _inheritsLoose(exports, _olcsVectorSynchroniz);

  function exports() {
    return _olcsVectorSynchroniz.apply(this, arguments) || this;
  }

  var _proto = exports.prototype;

  _proto.createSingleLayerCounterparts = function createSingleLayerCounterparts(olLayerWithParents) {
    var layer = olLayerWithParents.layer;
    /** @type {string} */

    var id = layer.id;
    /** @type {string} */

    var url = layer.url;

    if (/^KML/.test(id) && url && !/:\/\/public\./.test(url)) {
      return null;
    }

    return _olcsVectorSynchroniz.prototype.createSingleLayerCounterparts.call(this, olLayerWithParents);
  };

  return exports;
}(_VectorSynchronizer_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (exports);

/***/ }),

/***/ "./src/olcs/OLCesium.js":
/*!******************************!*\
  !*** ./src/olcs/OLCesium.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ol_geom_Point_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ol/geom/Point.js */ "ol/geom/Point.js");
/* harmony import */ var ol_geom_Point_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ol_geom_Point_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ol_proj_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ol/proj.js */ "ol/proj.js");
/* harmony import */ var ol_proj_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ol_proj_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util.js */ "./src/olcs/util.js");
/* harmony import */ var _core_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./core.js */ "./src/olcs/core.js");
/* harmony import */ var _AutoRenderLoop_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./AutoRenderLoop.js */ "./src/olcs/AutoRenderLoop.js");
/* harmony import */ var _Camera_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Camera.js */ "./src/olcs/Camera.js");
/* harmony import */ var _RasterSynchronizer_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./RasterSynchronizer.js */ "./src/olcs/RasterSynchronizer.js");
/* harmony import */ var _VectorSynchronizer_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./VectorSynchronizer.js */ "./src/olcs/VectorSynchronizer.js");
/* harmony import */ var _OverlaySynchronizer_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./OverlaySynchronizer.js */ "./src/olcs/OverlaySynchronizer.js");
/**
 * @module olcs.OLCesium
 */









/**
 * @typedef {Object} OLCesiumOptions
 * @property {import('ol/Map.js').default} map The OpenLayers map we want to show on a Cesium scene.
 * @property {Element|string} [target] Target element for the Cesium scene.
 * @property {function(!import('ol/Map.js').default, !Cesium.Scene, !Cesium.DataSourceCollection): Array<import('olcs/AbstractSynchronizer.js').default>}
 *      [createSynchronizers] Callback function which will be called by the {@link olcs.OLCesium}
 *      constructor to create custom synchronizers. Receives an `ol.Map` and a `Cesium.Scene` as arguments,
 *      and needs to return an array of {@link import('olcs/AbstractSynchronizer.js').default}.
 * @property {function(): Cesium.JulianDate} [time] Control the current time used by Cesium.
 * @property {boolean} [stopOpenLayersEventsPropagation] Prevent propagation of mouse/touch events to
 *      OpenLayers when Cesium is active.
 * @property {Cesium.SceneOptions} [sceneOptions] Allows the passing of property value to the
 *      `Cesium.Scene`.
 */

var OLCesium =
/*#__PURE__*/
function () {
  /**
   * @param {!OLCesiumOptions} options Options.
   * @constructor
   * @api
   */
  function OLCesium(options) {
    /**
     * @type {olcs.AutoRenderLoop}
     * @private
     */
    this.autoRenderLoop_ = null;
    /**
     * @type {!ol.Map}
     * @private
     */

    this.map_ = options.map;
    /**
     * @type {!function(): Cesium.JulianDate}
     * @private
     */

    this.time_ = options.time || function () {
      return Cesium.JulianDate.now();
    };
    /**
     * No change of the view projection.
     * @private
     */


    this.to4326Transform_ = Object(ol_proj_js__WEBPACK_IMPORTED_MODULE_1__["getTransform"])(this.map_.getView().getProjection(), 'EPSG:4326');
    /**
     * @type {number}
     * @private
     */

    this.resolutionScale_ = 1.0;
    /**
     * @type {number}
     * @private
     */

    this.canvasClientWidth_ = 0.0;
    /**
     * @type {number}
     * @private
     */

    this.canvasClientHeight_ = 0.0;
    /**
     * @type {boolean}
     * @private
     */

    this.resolutionScaleChanged_ = true; // force resize

    var fillArea = 'position:absolute;top:0;left:0;width:100%;height:100%;';
    /**
     * @type {!Element}
     * @private
     */

    this.container_ = document.createElement('DIV');
    var containerAttribute = document.createAttribute('style');
    containerAttribute.value = fillArea + "visibility:hidden;";
    this.container_.setAttributeNode(containerAttribute);
    var targetElement = options.target || null;

    if (targetElement) {
      if (typeof targetElement === 'string') {
        targetElement = document.getElementById(targetElement);
      }

      targetElement.appendChild(this.container_);
    } else {
      var oc = this.map_.getViewport().querySelector('.ol-overlaycontainer');

      if (oc && oc.parentNode) {
        oc.parentNode.insertBefore(this.container_, oc);
      }
    }
    /**
     * Whether the Cesium container is placed over the ol map.
     * @type {boolean}
     * @private
     */


    this.isOverMap_ = !targetElement;

    if (this.isOverMap_ && options.stopOpenLayersEventsPropagation) {
      var overlayEvents = ['click', 'dblclick', 'mousedown', 'touchstart', 'MSPointerDown', 'pointerdown', 'mousewheel', 'wheel'];

      for (var i = 0, ii = overlayEvents.length; i < ii; ++i) {
        this.container_.addEventListener(overlayEvents[i], function (evt) {
          return evt.stopPropagation();
        });
      }
    }
    /**
     * @type {!HTMLCanvasElement}
     * @private
     */


    this.canvas_ =
    /** @type {!HTMLCanvasElement} */
    document.createElement('CANVAS');
    var canvasAttribute = document.createAttribute('style');
    canvasAttribute.value = fillArea;
    this.canvas_.setAttributeNode(canvasAttribute);

    if (_util_js__WEBPACK_IMPORTED_MODULE_2__["default"].supportsImageRenderingPixelated()) {
      // non standard CSS4
      this.canvas_.style['imageRendering'] = _util_js__WEBPACK_IMPORTED_MODULE_2__["default"].imageRenderingValue();
    }

    this.canvas_.oncontextmenu = function () {
      return false;
    };

    this.canvas_.onselectstart = function () {
      return false;
    };

    this.container_.appendChild(this.canvas_);
    /**
     * @type {boolean}
     * @private
     */

    this.enabled_ = false;
    /**
     * @type {!Array.<ol.interaction.Interaction>}
     * @private
     */

    this.pausedInteractions_ = [];
    /**
     * @type {?ol.layer.Group}
     * @private
     */

    this.hiddenRootGroup_ = null;
    var sceneOptions = options.sceneOptions !== undefined ? options.sceneOptions :
    /** @type {Cesium.SceneOptions} */
    {};
    sceneOptions.canvas = this.canvas_;
    sceneOptions.scene3DOnly = true;
    /**
     * @type {!Cesium.Scene}
     * @private
     */

    this.scene_ = new Cesium.Scene(sceneOptions);
    var sscc = this.scene_.screenSpaceCameraController;
    sscc.tiltEventTypes.push({
      'eventType': Cesium.CameraEventType.LEFT_DRAG,
      'modifier': Cesium.KeyboardEventModifier.SHIFT
    });
    sscc.tiltEventTypes.push({
      'eventType': Cesium.CameraEventType.LEFT_DRAG,
      'modifier': Cesium.KeyboardEventModifier.ALT
    });
    sscc.enableLook = false;
    this.scene_.camera.constrainedAxis = Cesium.Cartesian3.UNIT_Z;
    /**
     * @type {!olcs.Camera}
     * @private
     */

    this.camera_ = new _Camera_js__WEBPACK_IMPORTED_MODULE_5__["default"](this.scene_, this.map_);
    /**
     * @type {!Cesium.Globe}
     * @private
     */

    this.globe_ = new Cesium.Globe(Cesium.Ellipsoid.WGS84);
    this.globe_.baseColor = Cesium.Color.WHITE;
    this.scene_.globe = this.globe_;
    this.scene_.skyAtmosphere = new Cesium.SkyAtmosphere(); // The first layer of Cesium is special; using a 1x1 transparent image to workaround it.
    // See https://github.com/AnalyticalGraphicsInc/cesium/issues/1323 for details.

    var firstImageryProvider = new Cesium.SingleTileImageryProvider({
      url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
      rectangle: Cesium.Rectangle.fromDegrees(0, 0, 1, 1) // the Rectangle dimensions are arbitrary

    });
    this.globe_.imageryLayers.addImageryProvider(firstImageryProvider, 0);
    this.dataSourceCollection_ = new Cesium.DataSourceCollection();
    this.dataSourceDisplay_ = new Cesium.DataSourceDisplay({
      scene: this.scene_,
      dataSourceCollection: this.dataSourceCollection_
    });
    var synchronizers = options.createSynchronizers ? options.createSynchronizers(this.map_, this.scene_, this.dataSourceCollection_) : [new _RasterSynchronizer_js__WEBPACK_IMPORTED_MODULE_6__["default"](this.map_, this.scene_), new _VectorSynchronizer_js__WEBPACK_IMPORTED_MODULE_7__["default"](this.map_, this.scene_), new _OverlaySynchronizer_js__WEBPACK_IMPORTED_MODULE_8__["default"](this.map_, this.scene_)]; // Assures correct canvas size after initialisation

    this.handleResize_();

    for (var _i = synchronizers.length - 1; _i >= 0; --_i) {
      synchronizers[_i].synchronize();
    }
    /**
     * Time of the last rendered frame, as returned by `performance.now()`.
     * @type {number}
     * @private
     */


    this.lastFrameTime_ = 0;
    /**
     * The identifier returned by `requestAnimationFrame`.
     * @type {number|undefined}
     * @private
     */

    this.renderId_ = undefined;
    /**
     * Target frame rate for the render loop.
     * @type {number}
     * @private
     */

    this.targetFrameRate_ = Number.POSITIVE_INFINITY;
    /**
     * If the Cesium render loop is being blocked.
     * @type {boolean}
     * @private
     */

    this.blockCesiumRendering_ = false;
    /**
     * If the warmup routine is active.
     * @type {boolean}
     * @private
     */

    this.warmingUp_ = false;
    /**
     * @type {ol.Feature}
     * @private
     */

    this.trackedFeature_ = null;
    /**
     * @type {Cesium.Entity}
     * @private
     */

    this.trackedEntity_ = null;
    /**
     * @type {Cesium.EntityView}
     * @private
     */

    this.entityView_ = null;
    /**
     * @type {boolean}
     * @private
     */

    this.needTrackedEntityUpdate_ = false;
    /**
     * @type {!Cesium.BoundingSphere}
     */

    this.boundingSphereScratch_ = new Cesium.BoundingSphere();
    var eventHelper = new Cesium.EventHelper();
    eventHelper.add(this.scene_.postRender, OLCesium.prototype.updateTrackedEntity_, this); // Cesium has a mechanism to prevent the camera to go under the terrain.
    // Unfortunately, it is only active when all the terrain has been loaded, which:
    // - does not prevent the camera to sink under terrain anymore;
    // - introduce a jumping effect once all terrain has been loaded and the position of the camera is finally fixed.
    // The property below enables a workaround found in the Camptocamp Cesium fork.
    // See also https://github.com/AnalyticalGraphicsInc/cesium/issues/5999.

    Cesium.Camera.enableSuspendTerrainAdjustment = false;
  }
  /**
   * Render the Cesium scene.
   * @private
   */


  var _proto = OLCesium.prototype;

  _proto.render_ = function render_() {
    // if a call to `requestAnimationFrame` is pending, cancel it
    if (this.renderId_ !== undefined) {
      cancelAnimationFrame(this.renderId_);
      this.renderId_ = undefined;
    } // only render if Cesium is enabled/warming and rendering hasn't been blocked


    if ((this.enabled_ || this.warmingUp_) && !this.blockCesiumRendering_) {
      this.renderId_ = requestAnimationFrame(this.onAnimationFrame_.bind(this));
    }
  }
  /**
   * Callback for `requestAnimationFrame`.
   * @param {number} frameTime The frame time, from `performance.now()`.
   * @private
   */
  ;

  _proto.onAnimationFrame_ = function onAnimationFrame_(frameTime) {
    this.renderId_ = undefined; // check if a frame was rendered within the target frame rate

    var interval = 1000.0 / this.targetFrameRate_;
    var delta = frameTime - this.lastFrameTime_;

    if (delta < interval) {
      // too soon, don't render yet
      this.render_();
      return;
    } // time to render a frame, save the time


    this.lastFrameTime_ = frameTime;
    var julianDate = this.time_();
    this.scene_.initializeFrame();
    this.handleResize_();
    this.dataSourceDisplay_.update(julianDate); // Update tracked entity

    if (this.entityView_) {
      var trackedEntity = this.trackedEntity_;
      var trackedState = this.dataSourceDisplay_.getBoundingSphere(trackedEntity, false, this.boundingSphereScratch_);

      if (trackedState === Cesium.BoundingSphereState.DONE) {
        this.boundingSphereScratch_.radius = 1; // a radius of 1 is enough for tracking points

        this.entityView_.update(julianDate, this.boundingSphereScratch_);
      }
    }

    this.scene_.render(julianDate);
    this.camera_.checkCameraChange(); // request the next render call after this one completes to ensure the browser doesn't get backed up

    this.render_();
  }
  /**
   * @private
   */
  ;

  _proto.updateTrackedEntity_ = function updateTrackedEntity_() {
    if (!this.needTrackedEntityUpdate_) {
      return;
    }

    var trackedEntity = this.trackedEntity_;
    var scene = this.scene_;
    var state = this.dataSourceDisplay_.getBoundingSphere(trackedEntity, false, this.boundingSphereScratch_);

    if (state === Cesium.BoundingSphereState.PENDING) {
      return;
    }

    scene.screenSpaceCameraController.enableTilt = false;
    var bs = state !== Cesium.BoundingSphereState.FAILED ? this.boundingSphereScratch_ : undefined;

    if (bs) {
      bs.radius = 1;
    }

    this.entityView_ = new Cesium.EntityView(trackedEntity, scene, scene.mapProjection.ellipsoid);
    this.entityView_.update(this.time_(), bs);
    this.needTrackedEntityUpdate_ = false;
  }
  /**
   * @private
   */
  ;

  _proto.handleResize_ = function handleResize_() {
    var width = this.canvas_.clientWidth;
    var height = this.canvas_.clientHeight;

    if (width === 0 | height === 0) {
      // The canvas DOM element is not ready yet.
      return;
    }

    if (width === this.canvasClientWidth_ && height === this.canvasClientHeight_ && !this.resolutionScaleChanged_) {
      return;
    }

    var resolutionScale = this.resolutionScale_;

    if (!_util_js__WEBPACK_IMPORTED_MODULE_2__["default"].supportsImageRenderingPixelated()) {
      resolutionScale *= window.devicePixelRatio || 1.0;
    }

    this.resolutionScaleChanged_ = false;
    this.canvasClientWidth_ = width;
    this.canvasClientHeight_ = height;
    width *= resolutionScale;
    height *= resolutionScale;
    this.canvas_.width = width;
    this.canvas_.height = height;
    this.scene_.camera.frustum.aspectRatio = width / height;
  }
  /**
   * @return {!olcs.Camera}
   * @api
   */
  ;

  _proto.getCamera = function getCamera() {
    return this.camera_;
  }
  /**
   * @return {!ol.Map}
   * @api
   */
  ;

  _proto.getOlMap = function getOlMap() {
    return this.map_;
  }
  /**
   * @return {!ol.View}
   * @api
   */
  ;

  _proto.getOlView = function getOlView() {
    var view = this.map_.getView();
    console.assert(view);
    return view;
  }
  /**
   * @return {!Cesium.Scene}
   * @api
   */
  ;

  _proto.getCesiumScene = function getCesiumScene() {
    return this.scene_;
  }
  /**
   * @return {!Cesium.DataSourceCollection}
   * @api
   */
  ;

  _proto.getDataSources = function getDataSources() {
    return this.dataSourceCollection_;
  }
  /**
   * @return {!Cesium.DataSourceDisplay}
   * @api
   */
  ;

  _proto.getDataSourceDisplay = function getDataSourceDisplay() {
    return this.dataSourceDisplay_;
  }
  /**
   * @return {boolean}
   * @api
   */
  ;

  _proto.getEnabled = function getEnabled() {
    return this.enabled_;
  }
  /**
   * Enables/disables the Cesium.
   * This modifies the visibility style of the container element.
   * @param {boolean} enable
   * @api
   */
  ;

  _proto.setEnabled = function setEnabled(enable) {
    var _this = this;

    if (this.enabled_ === enable) {
      return;
    }

    this.enabled_ = enable; // some Cesium operations are operating with canvas.clientWidth,
    // so we can't remove it from DOM or even make display:none;

    this.container_.style.visibility = this.enabled_ ? 'visible' : 'hidden';
    var interactions;

    if (this.enabled_) {
      this.throwOnUnitializedMap_();

      if (this.isOverMap_) {
        interactions = this.map_.getInteractions();
        interactions.forEach(function (el, i, arr) {
          _this.pausedInteractions_.push(el);
        });
        interactions.clear();

        this.map_.addInteraction = function (interaction) {
          return _this.pausedInteractions_.push(interaction);
        };

        this.map_.removeInteraction = function (interaction) {
          return _this.pausedInteractions_ = _this.pausedInteractions_.filter(function (i) {
            return i !== interaction;
          });
        };

        var rootGroup = this.map_.getLayerGroup();

        if (rootGroup.getVisible()) {
          this.hiddenRootGroup_ = rootGroup;
          this.hiddenRootGroup_.setVisible(false);
        }

        this.map_.getOverlayContainer().classList.add('olcs-hideoverlay');
        this.map_.getOverlayContainerStopEvent().classList.add('olcs-hideoverlay');
      }

      this.camera_.readFromView();
      this.render_();
    } else {
      if (this.isOverMap_) {
        interactions = this.map_.getInteractions();
        this.pausedInteractions_.forEach(function (interaction) {
          interactions.push(interaction);
        });
        this.pausedInteractions_.length = 0;

        this.map_.addInteraction = function (interaction) {
          return _this.map_.getInteractions().push(interaction);
        };

        this.map_.removeInteraction = function (interaction) {
          return _this.map_.getInteractions().remove(interaction);
        };

        this.map_.getOverlayContainer().classList.remove('olcs-hideoverlay');
        this.map_.getOverlayContainerStopEvent().classList.remove('olcs-hideoverlay');

        if (this.hiddenRootGroup_) {
          this.hiddenRootGroup_.setVisible(true);
          this.hiddenRootGroup_ = null;
        }
      }

      this.camera_.updateView();
    }
  }
  /**
   * Preload Cesium so that it is ready when transitioning from 2D to 3D.
   * @param {number} height Target height of the camera
   * @param {number} timeout Milliseconds after which the warming will stop
   * @api
  */
  ;

  _proto.warmUp = function warmUp(height, timeout) {
    var _this2 = this;

    if (this.enabled_) {
      // already enabled
      return;
    }

    this.throwOnUnitializedMap_();
    this.camera_.readFromView();
    var ellipsoid = this.globe_.ellipsoid;
    var csCamera = this.scene_.camera;
    var position = ellipsoid.cartesianToCartographic(csCamera.position);

    if (position.height < height) {
      position.height = height;
      csCamera.position = ellipsoid.cartographicToCartesian(position);
    }

    this.warmingUp_ = true;
    this.render_();
    setTimeout(function () {
      _this2.warmingUp_ = false;
    }, timeout);
  }
  /**
   * Block Cesium rendering to save resources.
   * @param {boolean} block True to block.
   * @api
  */
  ;

  _proto.setBlockCesiumRendering = function setBlockCesiumRendering(block) {
    if (this.blockCesiumRendering_ !== block) {
      this.blockCesiumRendering_ = block; // reset the render loop

      this.render_();
    }
  }
  /**
   * Render the globe only when necessary in order to save resources.
   * Experimental.
   * @api
   */
  ;

  _proto.enableAutoRenderLoop = function enableAutoRenderLoop() {
    if (!this.autoRenderLoop_) {
      this.autoRenderLoop_ = new _AutoRenderLoop_js__WEBPACK_IMPORTED_MODULE_4__["default"](this);
    }
  }
  /**
   * Get the autorender loop.
   * @return {?olcs.AutoRenderLoop}
   * @api
  */
  ;

  _proto.getAutoRenderLoop = function getAutoRenderLoop() {
    return this.autoRenderLoop_;
  }
  /**
   * The 3D Cesium globe is rendered in a canvas with two different dimensions:
   * clientWidth and clientHeight which are the dimension on the screen and
   * width and height which are the dimensions of the drawing buffer.
   *
   * By using a resolution scale lower than 1.0, it is possible to render the
   * globe in a buffer smaller than the canvas client dimensions and improve
   * performance, at the cost of quality.
   *
   * Pixel ratio should also be taken into account; by default, a device with
   * pixel ratio of 2.0 will have a buffer surface 4 times bigger than the client
   * surface.
   *
   * @param {number} value
   * @this {olcs.OLCesium}
   * @api
   */
  ;

  _proto.setResolutionScale = function setResolutionScale(value) {
    value = Math.max(0, value);

    if (value !== this.resolutionScale_) {
      this.resolutionScale_ = Math.max(0, value);
      this.resolutionScaleChanged_ = true;

      if (this.autoRenderLoop_) {
        this.autoRenderLoop_.restartRenderLoop();
      }
    }
  }
  /**
   * Set the target frame rate for the renderer. Set to `Number.POSITIVE_INFINITY`
   * to render as quickly as possible.
   * @param {number} value The frame rate, in frames per second.
   * @api
   */
  ;

  _proto.setTargetFrameRate = function setTargetFrameRate(value) {
    if (this.targetFrameRate_ !== value) {
      this.targetFrameRate_ = value; // reset the render loop

      this.render_();
    }
  }
  /**
   * Check if OpenLayers map is not properly initialized.
   * @private
   */
  ;

  _proto.throwOnUnitializedMap_ = function throwOnUnitializedMap_() {
    var map = this.map_;
    var view = map.getView();
    var center = view.getCenter();

    if (!view.isDef() || isNaN(center[0]) || isNaN(center[1])) {
      throw new Error("The OpenLayers map is not properly initialized: " + center + " / " + view.getResolution());
    }
  };

  return OLCesium;
}();

Object.defineProperties(OLCesium.prototype, {
  'trackedFeature': {
    'get':
    /** @this {olcs.OLCesium} */
    function get() {
      return this.trackedFeature_;
    },
    'set':
    /** @this {olcs.OLCesium} */
    function set(feature) {
      if (this.trackedFeature_ !== feature) {
        var scene = this.scene_; //Stop tracking

        if (!feature || !feature.getGeometry()) {
          this.needTrackedEntityUpdate_ = false;
          scene.screenSpaceCameraController.enableTilt = true;

          if (this.trackedEntity_) {
            this.dataSourceDisplay_.defaultDataSource.entities.remove(this.trackedEntity_);
          }

          this.trackedEntity_ = null;
          this.trackedFeature_ = null;
          this.entityView_ = null;
          scene.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
          return;
        }

        this.trackedFeature_ = feature; //We can't start tracking immediately, so we set a flag and start tracking
        //when the bounding sphere is ready (most likely next frame).

        this.needTrackedEntityUpdate_ = true;
        var to4326Transform = this.to4326Transform_;

        var toCesiumPosition = function toCesiumPosition() {
          var geometry = feature.getGeometry();
          console.assert(geometry instanceof ol_geom_Point_js__WEBPACK_IMPORTED_MODULE_0___default.a);
          var coo = geometry.getCoordinates();
          var coo4326 = to4326Transform(coo, undefined, coo.length);
          return _core_js__WEBPACK_IMPORTED_MODULE_3__["default"].ol4326CoordinateToCesiumCartesian(coo4326);
        }; // Create an invisible point entity for tracking.
        // It is independant from the primitive/geometry created by the vector synchronizer.


        var options = {
          'position': new Cesium.CallbackProperty(function (time, result) {
            return toCesiumPosition();
          }, false),
          'point': {
            'pixelSize': 1,
            'color': Cesium.Color.TRANSPARENT
          }
        };
        this.trackedEntity_ = this.dataSourceDisplay_.defaultDataSource.entities.add(options);
      }
    }
  }
});
/* harmony default export */ __webpack_exports__["default"] = (OLCesium);

/***/ }),

/***/ "./src/olcs/OverlaySynchronizer.js":
/*!*****************************************!*\
  !*** ./src/olcs/OverlaySynchronizer.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SynchronizedOverlay_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SynchronizedOverlay.js */ "./src/olcs/SynchronizedOverlay.js");
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util.js */ "./src/olcs/util.js");
/**
 * @module olcs.OverlaySynchronizer
 */



var OverlaySynchronizer =
/*#__PURE__*/
function () {
  /**
  * @param {!ol.Map} map
  * @param {!Cesium.Scene} scene
  * @constructor
  * @template T
  * @api
  */
  function OverlaySynchronizer(map, scene) {
    var _this = this;

    /**
    * @type {!ol.Map}
    * @protected
    */
    this.map = map;
    /**
    * @type {ol.Collection.<ol.Overlay>}
    * @private
    */

    this.overlays_ = this.map.getOverlays();
    /**
    * @type {!Cesium.Scene}
    * @protected
    */

    this.scene = scene;
    /**
    * @private
    * @type {!Element}
    */

    this.overlayContainerStopEvent_ = document.createElement('DIV');
    this.overlayContainerStopEvent_.className = 'ol-overlaycontainer-stopevent';
    var overlayEvents = ['click', 'dblclick', 'mousedown', 'touchstart', 'MSPointerDown', 'pointerdown', 'mousewheel', 'wheel'];
    overlayEvents.forEach(function (event) {
      _this.overlayContainerStopEvent_.addEventListener(event, function (evt) {
        return evt.stopPropagation();
      });
    });
    this.scene.canvas.parentElement.appendChild(this.overlayContainerStopEvent_);
    /**
    * @private
    * @type {!Element}
    */

    this.overlayContainer_ = document.createElement('DIV');
    this.overlayContainer_.className = 'ol-overlaycontainer';
    this.scene.canvas.parentElement.appendChild(this.overlayContainer_);
    /**
    * @type {!Object<?,olcs.SynchronizedOverlay>}
    * @private
    */

    this.overlayMap_ = {};
  }
  /**
  * Get the element that serves as a container for overlays that don't allow
  * event propagation. Elements added to this container won't let mousedown and
  * touchstart events through to the map, so clicks and gestures on an overlay
  * don't trigger any {@link ol.MapBrowserEvent}.
  * @return {!Element} The map's overlay container that stops events.
  */


  var _proto = OverlaySynchronizer.prototype;

  _proto.getOverlayContainerStopEvent = function getOverlayContainerStopEvent() {
    return this.overlayContainerStopEvent_;
  }
  /**
  * Get the element that serves as a container for overlays.
  * @return {!Element} The map's overlay container.
  */
  ;

  _proto.getOverlayContainer = function getOverlayContainer() {
    return this.overlayContainer_;
  }
  /**
  * Destroy all and perform complete synchronization of the overlays.
  * @api
  */
  ;

  _proto.synchronize = function synchronize() {
    this.destroyAll();
    this.addOverlays();
    this.overlays_.on('add', this.addOverlayFromEvent_.bind(this));
    this.overlays_.on('remove', this.removeOverlayFromEvent_.bind(this));
  }
  /**
  * @param {ol.Collection.Event} event
  * @private
  */
  ;

  _proto.addOverlayFromEvent_ = function addOverlayFromEvent_(event) {
    var overlay =
    /** @type {ol.Overlay} */
    event.element;
    this.addOverlay(overlay);
  }
  /**
  * @api
  */
  ;

  _proto.addOverlays = function addOverlays() {
    var _this2 = this;

    this.overlays_.forEach(function (overlay) {
      _this2.addOverlay(overlay);
    });
  }
  /**
  * @param {ol.Overlay} overlay
  * @api
  */
  ;

  _proto.addOverlay = function addOverlay(overlay) {
    if (!overlay) {
      return;
    }

    var cesiumOverlay = new _SynchronizedOverlay_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
      scene: this.scene,
      synchronizer: this,
      parent: overlay
    });
    var overlayId = Object(_util_js__WEBPACK_IMPORTED_MODULE_1__["getUid"])(overlay).toString();
    this.overlayMap_[overlayId] = cesiumOverlay;
  }
  /**
  * @param {ol.Collection.Event} event
  * @private
  */
  ;

  _proto.removeOverlayFromEvent_ = function removeOverlayFromEvent_(event) {
    var removedOverlay =
    /** @type {ol.Overlay} */
    event.element;
    this.removeOverlay(removedOverlay);
  }
  /**
  * Removes an overlay from the scene
  * @param {ol.Overlay} overlay
  * @api
  */
  ;

  _proto.removeOverlay = function removeOverlay(overlay) {
    var overlayId = Object(_util_js__WEBPACK_IMPORTED_MODULE_1__["getUid"])(overlay).toString();
    var csOverlay = this.overlayMap_[overlayId];

    if (csOverlay) {
      csOverlay.destroy();
      delete this.overlayMap_[overlayId];
    }
  }
  /**
  * Destroys all the created Cesium objects.
  * @protected
  */
  ;

  _proto.destroyAll = function destroyAll() {
    var _this3 = this;

    Object.keys(this.overlayMap_).forEach(function (key) {
      var overlay = _this3.overlayMap_[key];
      overlay.destroy();
      delete _this3.overlayMap_[key];
    });
  };

  return OverlaySynchronizer;
}();

/* harmony default export */ __webpack_exports__["default"] = (OverlaySynchronizer);

/***/ }),

/***/ "./src/olcs/RasterSynchronizer.js":
/*!****************************************!*\
  !*** ./src/olcs/RasterSynchronizer.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ol_layer_Group_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ol/layer/Group.js */ "ol/layer/Group.js");
/* harmony import */ var ol_layer_Group_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ol_layer_Group_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util.js */ "./src/olcs/util.js");
/* harmony import */ var _AbstractSynchronizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AbstractSynchronizer.js */ "./src/olcs/AbstractSynchronizer.js");
/* harmony import */ var _core_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./core.js */ "./src/olcs/core.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/**
 * @module olcs.RasterSynchronizer
 */





var RasterSynchronizer =
/*#__PURE__*/
function (_olcsAbstractSynchron) {
  _inheritsLoose(RasterSynchronizer, _olcsAbstractSynchron);

  /**
   * This object takes care of one-directional synchronization of
   * Openlayers raster layers to the given Cesium globe.
   * @param {!ol.Map} map
   * @param {!Cesium.Scene} scene
   * @constructor
   * @extends {olcsAbstractSynchronizer.<Cesium.ImageryLayer>}
   * @api
   */
  function RasterSynchronizer(map, scene) {
    var _this;

    _this = _olcsAbstractSynchron.call(this, map, scene) || this;
    /**
     * @type {!Cesium.ImageryLayerCollection}
     * @private
     */

    _this.cesiumLayers_ = scene.imageryLayers;
    /**
     * @type {!Cesium.ImageryLayerCollection}
     * @private
     */

    _this.ourLayers_ = new Cesium.ImageryLayerCollection();
    return _this;
  }
  /**
   * @inheritDoc
   */


  var _proto = RasterSynchronizer.prototype;

  _proto.addCesiumObject = function addCesiumObject(object) {
    this.cesiumLayers_.add(object);
    this.ourLayers_.add(object);
  }
  /**
   * @inheritDoc
   */
  ;

  _proto.destroyCesiumObject = function destroyCesiumObject(object) {
    object.destroy();
  }
  /**
   * @inheritDoc
   */
  ;

  _proto.removeSingleCesiumObject = function removeSingleCesiumObject(object, destroy) {
    this.cesiumLayers_.remove(object, destroy);
    this.ourLayers_.remove(object, false);
  }
  /**
   * @inheritDoc
   */
  ;

  _proto.removeAllCesiumObjects = function removeAllCesiumObjects(destroy) {
    for (var i = 0; i < this.ourLayers_.length; ++i) {
      this.cesiumLayers_.remove(this.ourLayers_.get(i), destroy);
    }

    this.ourLayers_.removeAll(false);
  }
  /**
   * Creates an array of Cesium.ImageryLayer.
   * May be overriden by child classes to implement custom behavior.
   * The default implementation handles tiled imageries in EPSG:4326 or
   * EPSG:3859.
   * @param {!ol.layer.Base} olLayer
   * @param {!ol.proj.Projection} viewProj Projection of the view.
   * @return {?Array.<!Cesium.ImageryLayer>} array or null if not possible
   * (or supported)
   * @protected
   */
  ;

  _proto.convertLayerToCesiumImageries = function convertLayerToCesiumImageries(olLayer, viewProj) {
    var result = _core_js__WEBPACK_IMPORTED_MODULE_3__["default"].tileLayerToImageryLayer(this.map, olLayer, viewProj);
    return result ? [result] : null;
  }
  /**
   * @inheritDoc
   */
  ;

  _proto.createSingleLayerCounterparts = function createSingleLayerCounterparts(olLayerWithParents) {
    var _this2 = this;

    var olLayer = olLayerWithParents.layer;
    var uid = Object(_util_js__WEBPACK_IMPORTED_MODULE_1__["getUid"])(olLayer).toString();
    var viewProj = this.view.getProjection();
    console.assert(viewProj);
    var cesiumObjects = this.convertLayerToCesiumImageries(olLayer, viewProj);

    if (cesiumObjects) {
      var _this$olLayerListenKe;

      var listenKeyArray = [];
      [olLayerWithParents.layer].concat(olLayerWithParents.parents).forEach(function (olLayerItem) {
        listenKeyArray.push(olLayerItem.on(['change:opacity', 'change:visible'], function () {
          // the compiler does not seem to be able to infer this
          console.assert(cesiumObjects);

          for (var i = 0; i < cesiumObjects.length; ++i) {
            _core_js__WEBPACK_IMPORTED_MODULE_3__["default"].updateCesiumLayerProperties(olLayerWithParents, cesiumObjects[i]);
          }
        }));
      });

      for (var i = 0; i < cesiumObjects.length; ++i) {
        _core_js__WEBPACK_IMPORTED_MODULE_3__["default"].updateCesiumLayerProperties(olLayerWithParents, cesiumObjects[i]);
      } // there is no way to modify Cesium layer extent,
      // we have to recreate when OpenLayers layer extent changes:


      listenKeyArray.push(olLayer.on('change:extent', function (e) {
        for (var _i = 0; _i < cesiumObjects.length; ++_i) {
          _this2.cesiumLayers_.remove(cesiumObjects[_i], true); // destroy


          _this2.ourLayers_.remove(cesiumObjects[_i], false);
        }

        delete _this2.layerMap[Object(_util_js__WEBPACK_IMPORTED_MODULE_1__["getUid"])(olLayer)]; // invalidate the map entry

        _this2.synchronize();
      }));
      listenKeyArray.push(olLayer.on('change', function (e) {
        // when the source changes, re-add the layer to force update
        for (var _i2 = 0; _i2 < cesiumObjects.length; ++_i2) {
          var position = _this2.cesiumLayers_.indexOf(cesiumObjects[_i2]);

          if (position >= 0) {
            _this2.cesiumLayers_.remove(cesiumObjects[_i2], false);

            _this2.cesiumLayers_.add(cesiumObjects[_i2], position);
          }
        }
      }));

      (_this$olLayerListenKe = this.olLayerListenKeys[uid]).push.apply(_this$olLayerListenKe, listenKeyArray);
    }

    return Array.isArray(cesiumObjects) ? cesiumObjects : null;
  }
  /**
   * Order counterparts using the same algorithm as the Openlayers renderer:
   * z-index then original sequence order.
   * @override
   * @protected
   */
  ;

  _proto.orderLayers = function orderLayers() {
    var _this3 = this;

    var layers = [];
    var zIndices = {};
    var queue = [this.mapLayerGroup];

    while (queue.length > 0) {
      var olLayer = queue.splice(0, 1)[0];
      layers.push(olLayer);
      zIndices[Object(_util_js__WEBPACK_IMPORTED_MODULE_1__["getUid"])(olLayer)] = olLayer.getZIndex();

      if (olLayer instanceof ol_layer_Group_js__WEBPACK_IMPORTED_MODULE_0___default.a) {
        var sublayers = olLayer.getLayers();

        if (sublayers) {
          // Prepend queue with sublayers in order
          queue.unshift.apply(queue, sublayers.getArray());
        }
      }
    }

    Object(_util_js__WEBPACK_IMPORTED_MODULE_1__["stableSort"])(layers, function (layer1, layer2) {
      return zIndices[Object(_util_js__WEBPACK_IMPORTED_MODULE_1__["getUid"])(layer1)] - zIndices[Object(_util_js__WEBPACK_IMPORTED_MODULE_1__["getUid"])(layer2)];
    });
    layers.forEach(function (olLayer) {
      var olLayerId = Object(_util_js__WEBPACK_IMPORTED_MODULE_1__["getUid"])(olLayer).toString();
      var cesiumObjects = _this3.layerMap[olLayerId];

      if (cesiumObjects) {
        cesiumObjects.forEach(function (cesiumObject) {
          _this3.raiseToTop(cesiumObject);
        });
      }
    });
  }
  /**
   * @param {Cesium.ImageryLayer} counterpart
   */
  ;

  _proto.raiseToTop = function raiseToTop(counterpart) {
    this.cesiumLayers_.raiseToTop(counterpart);
  };

  return RasterSynchronizer;
}(_AbstractSynchronizer_js__WEBPACK_IMPORTED_MODULE_2__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (RasterSynchronizer);

/***/ }),

/***/ "./src/olcs/SynchronizedOverlay.js":
/*!*****************************************!*\
  !*** ./src/olcs/SynchronizedOverlay.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ol_Overlay_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ol/Overlay.js */ "ol/Overlay.js");
/* harmony import */ var ol_Overlay_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ol_Overlay_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ol_proj_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ol/proj.js */ "ol/proj.js");
/* harmony import */ var ol_proj_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ol_proj_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util.js */ "./src/olcs/util.js");
/* harmony import */ var ol_Observable_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ol/Observable.js */ "ol/Observable.js");
/* harmony import */ var ol_Observable_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(ol_Observable_js__WEBPACK_IMPORTED_MODULE_3__);
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/**
 * @module olcs.SynchronizedOverlay
 */




/**
 * Options for SynchronizedOverlay
 * @typedef {Object} SynchronizedOverlayOptions
 * @property {!Cesium.Scene} scene
 * @property {olOverlay} parent
 * @property {!import('olsc/OverlaySynchronizer.js').default} synchronizer
 */

var SynchronizedOverlay =
/*#__PURE__*/
function (_olOverlay) {
  _inheritsLoose(SynchronizedOverlay, _olOverlay);

  /**
   * @param {olcsx.SynchronizedOverlayOptions} options SynchronizedOverlay Options.
   * @api
   */
  function SynchronizedOverlay(options) {
    var _this;

    var parent = options.parent;
    _this = _olOverlay.call(this, parent.getOptions()) || this;
    /**
     * @private
     * @type {?Function}
     */

    _this.scenePostRenderListenerRemover_ = null;
    /**
     * @private
     * @type {!Cesium.Scene}
     */

    _this.scene_ = options.scene;
    /**
     * @private
     * @type {!olcs.OverlaySynchronizer}
     */

    _this.synchronizer_ = options.synchronizer;
    /**
     * @private
     * @type {!ol.Overlay}
     */

    _this.parent_ = parent;
    /**
     * @private
     * @type {ol.Coordinate|undefined}
     */

    _this.positionWGS84_ = undefined;
    /**
     * @private
     * @type {MutationObserver}
     */

    _this.observer_ = new MutationObserver(_this.handleElementChanged.bind(_assertThisInitialized(_this)));
    /**
     * @private
     * @type {Array.<MutationObserver>}
     */

    _this.attributeObserver_ = [];
    /**
     * @private
     * @type {Array<ol.EventsKey>}
     */

    _this.listenerKeys_ = []; // synchronize our Overlay with the parent Overlay

    var setPropertyFromEvent = function setPropertyFromEvent(event) {
      return _this.setPropertyFromEvent_(event);
    };

    _this.listenerKeys_.push(_this.parent_.on('change:position', setPropertyFromEvent));

    _this.listenerKeys_.push(_this.parent_.on('change:element', setPropertyFromEvent));

    _this.listenerKeys_.push(_this.parent_.on('change:offset', setPropertyFromEvent));

    _this.listenerKeys_.push(_this.parent_.on('change:position', setPropertyFromEvent));

    _this.listenerKeys_.push(_this.parent_.on('change:positioning', setPropertyFromEvent));

    _this.setProperties(_this.parent_.getProperties());

    _this.handleMapChanged();

    _this.handleElementChanged();

    return _this;
  }
  /**
   * @param {Node} target
   * @private
   */


  var _proto = SynchronizedOverlay.prototype;

  _proto.observeTarget_ = function observeTarget_(target) {
    if (!this.observer_) {
      // not ready, skip the event (this occurs on construction)
      return;
    }

    this.observer_.disconnect();
    this.observer_.observe(target, {
      attributes: false,
      childList: true,
      characterData: true,
      subtree: true
    });
    this.attributeObserver_.forEach(function (observer) {
      observer.disconnect();
    });
    this.attributeObserver_.length = 0;

    for (var i = 0; i < target.childNodes.length; i++) {
      var node = target.childNodes[i];

      if (node.nodeType === 1) {
        var observer = new MutationObserver(this.handleElementChanged.bind(this));
        observer.observe(node, {
          attributes: true,
          subtree: true
        });
        this.attributeObserver_.push(observer);
      }
    }
  }
  /**
   *
   * @param {ol.Object.Event} event
   * @private
   */
  ;

  _proto.setPropertyFromEvent_ = function setPropertyFromEvent_(event) {
    if (event.target && event.key) {
      this.set(event.key, event.target.get(event.key));
    }
  }
  /**
   * Get the scene associated with this overlay.
   * @see ol.Overlay.prototype.getMap
   * @return {!Cesium.Scene} The scene that the overlay is part of.
   * @api
   */
  ;

  _proto.getScene = function getScene() {
    return this.scene_;
  }
  /**
   * @override
   */
  ;

  _proto.handleMapChanged = function handleMapChanged() {
    if (this.scenePostRenderListenerRemover_) {
      this.scenePostRenderListenerRemover_();
      Object(_util_js__WEBPACK_IMPORTED_MODULE_2__["removeNode"])(this.element);
    }

    this.scenePostRenderListenerRemover_ = null;
    var scene = this.getScene();

    if (scene) {
      this.scenePostRenderListenerRemover_ = scene.postRender.addEventListener(this.updatePixelPosition.bind(this));
      this.updatePixelPosition();
      var container = this.stopEvent ? this.synchronizer_.getOverlayContainerStopEvent() : this.synchronizer_.getOverlayContainer();

      if (this.insertFirst) {
        container.insertBefore(this.element, container.childNodes[0] || null);
      } else {
        container.appendChild(this.element);
      }
    }
  }
  /**
   * @override
   */
  ;

  _proto.handlePositionChanged = function handlePositionChanged() {
    // transform position to WGS84
    var position = this.getPosition();

    if (position) {
      var sourceProjection = this.parent_.getMap().getView().getProjection();
      this.positionWGS84_ = Object(ol_proj_js__WEBPACK_IMPORTED_MODULE_1__["transform"])(position, sourceProjection, 'EPSG:4326');
    } else {
      this.positionWGS84_ = undefined;
    }

    this.updatePixelPosition();
  }
  /**
   * @override
   */
  ;

  _proto.handleElementChanged = function handleElementChanged() {
    function cloneNode(node, parent) {
      var clone = node.cloneNode();

      if (parent) {
        parent.appendChild(clone);
      }

      if (node.nodeType != Node.TEXT_NODE) {
        clone.addEventListener('click', function (event) {
          node.dispatchEvent(new MouseEvent('click', event));
          event.stopPropagation();
        });
      }

      var nodes = node.childNodes;

      for (var i = 0; i < nodes.length; i++) {
        if (!nodes[i]) {
          continue;
        }

        cloneNode(nodes[i], clone);
      }

      return clone;
    }

    Object(_util_js__WEBPACK_IMPORTED_MODULE_2__["removeChildren"])(this.element);
    var element = this.getElement();

    if (element) {
      if (element.parentNode && element.parentNode.childNodes) {
        for (var _iterator = element.parentNode.childNodes, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
          var _ref;

          if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
          } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
          }

          var node = _ref;
          var clonedNode = cloneNode(node, null);
          this.element.appendChild(clonedNode);
        }
      }
    }

    if (element.parentNode) {
      // set new Observer
      this.observeTarget_(element.parentNode);
    }
  }
  /**
   * @override
   */
  ;

  _proto.updatePixelPosition = function updatePixelPosition() {
    var position = this.positionWGS84_;

    if (!this.scene_ || !position) {
      this.setVisible(false);
      return;
    }

    var height = 0;

    if (position.length === 2) {
      var globeHeight = this.scene_.globe.getHeight(Cesium.Cartographic.fromDegrees(position[0], position[1]));

      if (globeHeight && this.scene_.globe.tilesLoaded) {
        position[2] = globeHeight;
      }

      if (globeHeight) {
        height = globeHeight;
      }
    } else {
      height = position[2];
    }

    var cartesian = Cesium.Cartesian3.fromDegrees(position[0], position[1], height);
    var camera = this.scene_.camera;
    var ellipsoidBoundingSphere = new Cesium.BoundingSphere(new Cesium.Cartesian3(), 6356752);
    var occluder = new Cesium.Occluder(ellipsoidBoundingSphere, camera.position); // check if overlay position is behind the horizon

    if (!occluder.isPointVisible(cartesian)) {
      this.setVisible(false);
      return;
    }

    var cullingVolume = camera.frustum.computeCullingVolume(camera.position, camera.direction, camera.up); // check if overlay position is visible from the camera

    if (cullingVolume.computeVisibility(new Cesium.BoundingSphere(cartesian)) !== 1) {
      this.setVisible(false);
      return;
    }

    this.setVisible(true);
    var pixelCartesian = this.scene_.cartesianToCanvasCoordinates(cartesian);
    var pixel = [pixelCartesian.x, pixelCartesian.y];
    var mapSize = [this.scene_.canvas.width, this.scene_.canvas.height];
    this.updateRenderedPosition(pixel, mapSize);
  }
  /**
   * Destroys the overlay, removing all its listeners and elements
   * @api
   */
  ;

  _proto.destroy = function destroy() {
    if (this.scenePostRenderListenerRemover_) {
      this.scenePostRenderListenerRemover_();
    }

    if (this.observer_) {
      this.observer_.disconnect();
    }

    Object(ol_Observable_js__WEBPACK_IMPORTED_MODULE_3__["unByKey"])(this.listenerKeys_);
    this.listenerKeys_.splice(0);

    if (this.element.removeNode) {
      this.element.removeNode(true);
    } else {
      this.element.remove();
    }

    this.element = null;
  };

  return SynchronizedOverlay;
}(ol_Overlay_js__WEBPACK_IMPORTED_MODULE_0___default.a);

/* harmony default export */ __webpack_exports__["default"] = (SynchronizedOverlay);

/***/ }),

/***/ "./src/olcs/VectorSynchronizer.js":
/*!****************************************!*\
  !*** ./src/olcs/VectorSynchronizer.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ol_source_Vector_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ol/source/Vector.js */ "ol/source/Vector.js");
/* harmony import */ var ol_source_Vector_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ol_source_Vector_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ol_layer_Layer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ol/layer/Layer.js */ "ol/layer/Layer.js");
/* harmony import */ var ol_layer_Layer_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ol_layer_Layer_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ol_source_Cluster_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ol/source/Cluster.js */ "ol/source/Cluster.js");
/* harmony import */ var ol_source_Cluster_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(ol_source_Cluster_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var ol_layer_Image_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ol/layer/Image.js */ "ol/layer/Image.js");
/* harmony import */ var ol_layer_Image_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(ol_layer_Image_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./util.js */ "./src/olcs/util.js");
/* harmony import */ var ol_layer_Vector_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ol/layer/Vector.js */ "ol/layer/Vector.js");
/* harmony import */ var ol_layer_Vector_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(ol_layer_Vector_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var ol_layer_VectorTile_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ol/layer/VectorTile.js */ "ol/layer/VectorTile.js");
/* harmony import */ var ol_layer_VectorTile_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(ol_layer_VectorTile_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _AbstractSynchronizer_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./AbstractSynchronizer.js */ "./src/olcs/AbstractSynchronizer.js");
/* harmony import */ var _FeatureConverter_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./FeatureConverter.js */ "./src/olcs/FeatureConverter.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/**
 * @module olcs.VectorSynchronizer
 */










var VectorSynchronizer =
/*#__PURE__*/
function (_olcsAbstractSynchron) {
  _inheritsLoose(VectorSynchronizer, _olcsAbstractSynchron);

  /**
   * Unidirectionally synchronize OpenLayers vector layers to Cesium.
   * @param {!ol.Map} map
   * @param {!Cesium.Scene} scene
   * @param {olcs.FeatureConverter=} opt_converter
   * @extends {olcs.AbstractSynchronizer.<olcs.core.VectorLayerCounterpart>}
   * @api
   */
  function VectorSynchronizer(map, scene, opt_converter) {
    var _this;

    _this = _olcsAbstractSynchron.call(this, map, scene) || this;
    /**
     * @protected
     */

    _this.converter = opt_converter || new _FeatureConverter_js__WEBPACK_IMPORTED_MODULE_8__["default"](scene);
    /**
     * @private
     */

    _this.csAllPrimitives_ = new Cesium.PrimitiveCollection();
    scene.primitives.add(_this.csAllPrimitives_);
    _this.csAllPrimitives_.destroyPrimitives = false;
    return _this;
  }
  /**
   * @inheritDoc
   */


  var _proto = VectorSynchronizer.prototype;

  _proto.addCesiumObject = function addCesiumObject(counterpart) {
    console.assert(counterpart);
    counterpart.getRootPrimitive()['counterpart'] = counterpart;
    this.csAllPrimitives_.add(counterpart.getRootPrimitive());
  }
  /**
   * @inheritDoc
   */
  ;

  _proto.destroyCesiumObject = function destroyCesiumObject(object) {
    object.getRootPrimitive().destroy();
  }
  /**
   * @inheritDoc
   */
  ;

  _proto.removeSingleCesiumObject = function removeSingleCesiumObject(object, destroy) {
    object.destroy();
    this.csAllPrimitives_.destroyPrimitives = destroy;
    this.csAllPrimitives_.remove(object.getRootPrimitive());
    this.csAllPrimitives_.destroyPrimitives = false;
  }
  /**
   * @inheritDoc
   */
  ;

  _proto.removeAllCesiumObjects = function removeAllCesiumObjects(destroy) {
    this.csAllPrimitives_.destroyPrimitives = destroy;

    if (destroy) {
      for (var i = 0; i < this.csAllPrimitives_.length; ++i) {
        this.csAllPrimitives_.get(i)['counterpart'].destroy();
      }
    }

    this.csAllPrimitives_.removeAll();
    this.csAllPrimitives_.destroyPrimitives = false;
  }
  /**
   * Synchronizes the layer visibility properties
   * to the given Cesium Primitive.
   * @param {import('olsc/core.js').LayerWithParents} olLayerWithParents
   * @param {!Cesium.Primitive} csPrimitive
   */
  ;

  _proto.updateLayerVisibility = function updateLayerVisibility(olLayerWithParents, csPrimitive) {
    var visible = true;
    [olLayerWithParents.layer].concat(olLayerWithParents.parents).forEach(function (olLayer) {
      var layerVisible = olLayer.getVisible();

      if (layerVisible !== undefined) {
        visible &= layerVisible;
      } else {
        visible = false;
      }
    });
    csPrimitive.show = visible;
  }
  /**
   * @inheritDoc
   */
  ;

  _proto.createSingleLayerCounterparts = function createSingleLayerCounterparts(olLayerWithParents) {
    var _this2 = this;

    var olLayer = olLayerWithParents.layer;

    if (!(olLayer instanceof ol_layer_Vector_js__WEBPACK_IMPORTED_MODULE_5___default.a) || olLayer instanceof ol_layer_VectorTile_js__WEBPACK_IMPORTED_MODULE_6___default.a) {
      return null;
    }

    console.assert(olLayer instanceof ol_layer_Layer_js__WEBPACK_IMPORTED_MODULE_1___default.a);
    var source = olLayer.getSource();

    if (source instanceof ol_source_Cluster_js__WEBPACK_IMPORTED_MODULE_2___default.a) {
      source = source.getSource();
    }

    if (!source) {
      return null;
    }

    console.assert(source instanceof ol_source_Vector_js__WEBPACK_IMPORTED_MODULE_0___default.a);
    console.assert(this.view);
    var view = this.view;
    var featurePrimitiveMap = {};
    var counterpart = this.converter.olVectorLayerToCesium(olLayer, view, featurePrimitiveMap);
    var csPrimitives = counterpart.getRootPrimitive();
    var olListenKeys = counterpart.olListenKeys;
    [olLayerWithParents.layer].concat(olLayerWithParents.parents).forEach(function (olLayerItem) {
      olListenKeys.push(Object(_util_js__WEBPACK_IMPORTED_MODULE_4__["olcsListen"])(olLayerItem, 'change:visible', function () {
        _this2.updateLayerVisibility(olLayerWithParents, csPrimitives);
      }));
    });
    this.updateLayerVisibility(olLayerWithParents, csPrimitives);

    var onAddFeature = function (feature) {
      console.assert(olLayer instanceof ol_layer_Vector_js__WEBPACK_IMPORTED_MODULE_5___default.a || olLayer instanceof ol_layer_Image_js__WEBPACK_IMPORTED_MODULE_3___default.a);
      var context = counterpart.context;
      var prim = this.converter.convert(olLayer, view, feature, context);

      if (prim) {
        featurePrimitiveMap[Object(_util_js__WEBPACK_IMPORTED_MODULE_4__["getUid"])(feature)] = prim;
        csPrimitives.add(prim);
      }
    }.bind(this);

    var onRemoveFeature = function (feature) {
      var id = Object(_util_js__WEBPACK_IMPORTED_MODULE_4__["getUid"])(feature);
      var context = counterpart.context;
      var bbs = context.featureToCesiumMap[id];

      if (bbs) {
        delete context.featureToCesiumMap[id];
        bbs.forEach(function (bb) {
          if (bb instanceof Cesium.Billboard) {
            context.billboards.remove(bb);
          }
        });
      }

      var csPrimitive = featurePrimitiveMap[id];
      delete featurePrimitiveMap[id];

      if (csPrimitive) {
        csPrimitives.remove(csPrimitive);
      }
    }.bind(this);

    olListenKeys.push(Object(_util_js__WEBPACK_IMPORTED_MODULE_4__["olcsListen"])(source, 'addfeature', function (e) {
      console.assert(e.feature);
      onAddFeature(e.feature);
    }, this));
    olListenKeys.push(Object(_util_js__WEBPACK_IMPORTED_MODULE_4__["olcsListen"])(source, 'removefeature', function (e) {
      console.assert(e.feature);
      onRemoveFeature(e.feature);
    }, this));
    olListenKeys.push(Object(_util_js__WEBPACK_IMPORTED_MODULE_4__["olcsListen"])(source, 'changefeature', function (e) {
      var feature = e.feature;
      console.assert(feature);
      onRemoveFeature(feature);
      onAddFeature(feature);
    }, this));
    return counterpart ? [counterpart] : null;
  };

  return VectorSynchronizer;
}(_AbstractSynchronizer_js__WEBPACK_IMPORTED_MODULE_7__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (VectorSynchronizer);

/***/ }),

/***/ "./src/olcs/core.js":
/*!**************************!*\
  !*** ./src/olcs/core.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ol_easing_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ol/easing.js */ "ol/easing.js");
/* harmony import */ var ol_easing_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ol_easing_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ol_layer_Tile_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ol/layer/Tile.js */ "ol/layer/Tile.js");
/* harmony import */ var ol_layer_Tile_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ol_layer_Tile_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ol_layer_Image_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ol/layer/Image.js */ "ol/layer/Image.js");
/* harmony import */ var ol_layer_Image_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(ol_layer_Image_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var ol_proj_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ol/proj.js */ "ol/proj.js");
/* harmony import */ var ol_proj_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(ol_proj_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var ol_source_ImageStatic__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ol/source/ImageStatic */ "ol/source/ImageStatic");
/* harmony import */ var ol_source_ImageStatic__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(ol_source_ImageStatic__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var ol_source_ImageWMS_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ol/source/ImageWMS.js */ "ol/source/ImageWMS.js");
/* harmony import */ var ol_source_ImageWMS_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(ol_source_ImageWMS_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var ol_source_TileImage_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ol/source/TileImage.js */ "ol/source/TileImage.js");
/* harmony import */ var ol_source_TileImage_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(ol_source_TileImage_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var ol_source_TileWMS_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ol/source/TileWMS.js */ "ol/source/TileWMS.js");
/* harmony import */ var ol_source_TileWMS_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(ol_source_TileWMS_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var ol_source_Image_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ol/source/Image.js */ "ol/source/Image.js");
/* harmony import */ var ol_source_Image_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(ol_source_Image_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _core_OLImageryProvider_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./core/OLImageryProvider.js */ "./src/olcs/core/OLImageryProvider.js");
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./util.js */ "./src/olcs/util.js");
/**
 * @module olcs.core
 */











var exports = {};
/**
 * @typedef {Object} CesiumUrlDefinition
 * @property {string} url
 * @property {string} subdomains
 */

/**
 * Options for rotate around axis core function.
 * @typedef {Object} RotateAroundAxisOption
 * @property {number} [duration]
 * @property {function(number): number} [easing]
 * @property {function(): void} [callback]
 */

/**
 * @typedef {Object} LayerWithParents
 * @property {import('ol/layer/Base.js').default} layer
 * @property {Array<import('ol/layer/Group.js').default>} parents
 */

/**
 * Compute the pixel width and height of a point in meters using the
 * camera frustum.
 * @param {!Cesium.Scene} scene
 * @param {!Cesium.Cartesian3} target
 * @return {!Cesium.Cartesian2} the pixel size
 * @api
 */

exports.computePixelSizeAtCoordinate = function (scene, target) {
  var camera = scene.camera;
  var canvas = scene.canvas;
  var frustum = camera.frustum;
  var distance = Cesium.Cartesian3.magnitude(Cesium.Cartesian3.subtract(camera.position, target, new Cesium.Cartesian3()));
  var pixelSize = new Cesium.Cartesian2();
  return frustum.getPixelDimensions(canvas.clientWidth, canvas.clientHeight, distance, pixelSize);
};
/**
 * Compute bounding box around a target point.
 * @param {!Cesium.Scene} scene
 * @param {!Cesium.Cartesian3} target
 * @param {number} amount Half the side of the box, in pixels.
 * @return {Array<Cesium.Cartographic>} bottom left and top right
 * coordinates of the box
 */


exports.computeBoundingBoxAtTarget = function (scene, target, amount) {
  var pixelSize = exports.computePixelSizeAtCoordinate(scene, target);
  var transform = Cesium.Transforms.eastNorthUpToFixedFrame(target);
  var bottomLeft = Cesium.Matrix4.multiplyByPoint(transform, new Cesium.Cartesian3(-pixelSize.x * amount, -pixelSize.y * amount, 0), new Cesium.Cartesian3());
  var topRight = Cesium.Matrix4.multiplyByPoint(transform, new Cesium.Cartesian3(pixelSize.x * amount, pixelSize.y * amount, 0), new Cesium.Cartesian3());
  return Cesium.Ellipsoid.WGS84.cartesianArrayToCartographicArray([bottomLeft, topRight]);
};
/**
 *
 * @param {!ol.geom.Geometry} geometry
 * @param {number} height
 * @api
 */


exports.applyHeightOffsetToGeometry = function (geometry, height) {
  geometry.applyTransform(function (input, output, stride) {
    console.assert(input === output);

    if (stride !== undefined && stride >= 3) {
      for (var i = 0; i < output.length; i += stride) {
        output[i + 2] = output[i + 2] + height;
      }
    }

    return output;
  });
};
/**
 * @param {ol.Coordinate} coordinates
 * @param {number=} rotation
 * @param {!Cesium.Cartesian3=} translation
 * @param {!Cesium.Cartesian3=} scale
 * @return {!Cesium.Matrix4}
 * @api
 */


exports.createMatrixAtCoordinates = function (coordinates, rotation, translation, scale) {
  if (rotation === void 0) {
    rotation = 0;
  }

  if (translation === void 0) {
    translation = Cesium.Cartesian3.ZERO;
  }

  if (scale === void 0) {
    scale = new Cesium.Cartesian3(1, 1, 1);
  }

  var position = exports.ol4326CoordinateToCesiumCartesian(coordinates);
  var rawMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(position);
  var quaternion = Cesium.Quaternion.fromAxisAngle(Cesium.Cartesian3.UNIT_Z, -rotation);
  var rotationMatrix = Cesium.Matrix4.fromTranslationQuaternionRotationScale(translation, quaternion, scale);
  return Cesium.Matrix4.multiply(rawMatrix, rotationMatrix, new Cesium.Matrix4());
};
/**
 * @param {!Cesium.Camera} camera
 * @param {number} angle
 * @param {!Cesium.Cartesian3} axis
 * @param {!Cesium.Matrix4} transform
 * @param {RotateAroundAxisOption=} opt_options
 * @api
 */


exports.rotateAroundAxis = function (camera, angle, axis, transform, opt_options) {
  var clamp = Cesium.Math.clamp;
  var defaultValue = Cesium.defaultValue;
  var options = opt_options || {};
  var duration = defaultValue(options.duration, 500); // ms

  var easing = defaultValue(options.easing, ol_easing_js__WEBPACK_IMPORTED_MODULE_0__["linear"]);
  var callback = options.callback;
  var lastProgress = 0;
  var oldTransform = new Cesium.Matrix4();
  var start = Date.now();

  var step = function step() {
    var timestamp = Date.now();
    var timeDifference = timestamp - start;
    var progress = easing(clamp(timeDifference / duration, 0, 1));
    console.assert(progress >= lastProgress);
    camera.transform.clone(oldTransform);
    var stepAngle = (progress - lastProgress) * angle;
    lastProgress = progress;
    camera.lookAtTransform(transform);
    camera.rotate(axis, stepAngle);
    camera.lookAtTransform(oldTransform);

    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      if (callback) {
        callback();
      }
    }
  };

  window.requestAnimationFrame(step);
};
/**
 * @param {!Cesium.Scene} scene
 * @param {number} heading
 * @param {!Cesium.Cartesian3} bottomCenter
 * @param {RotateAroundAxisOption=} opt_options
 * @api
 */


exports.setHeadingUsingBottomCenter = function (scene, heading, bottomCenter, opt_options) {
  var camera = scene.camera; // Compute the camera position to zenith quaternion

  var angleToZenith = exports.computeAngleToZenith(scene, bottomCenter);
  var axis = camera.right;
  var quaternion = Cesium.Quaternion.fromAxisAngle(axis, angleToZenith);
  var rotation = Cesium.Matrix3.fromQuaternion(quaternion); // Get the zenith point from the rotation of the position vector

  var vector = new Cesium.Cartesian3();
  Cesium.Cartesian3.subtract(camera.position, bottomCenter, vector);
  var zenith = new Cesium.Cartesian3();
  Cesium.Matrix3.multiplyByVector(rotation, vector, zenith);
  Cesium.Cartesian3.add(zenith, bottomCenter, zenith); // Actually rotate around the zenith normal

  var transform = Cesium.Matrix4.fromTranslation(zenith);
  var rotateAroundAxis = exports.rotateAroundAxis;
  rotateAroundAxis(camera, heading, zenith, transform, opt_options);
};
/**
 * Get the 3D position of the given pixel of the canvas.
 * @param {!Cesium.Scene} scene
 * @param {!Cesium.Cartesian2} pixel
 * @return {!Cesium.Cartesian3|undefined}
 * @api
 */


exports.pickOnTerrainOrEllipsoid = function (scene, pixel) {
  var ray = scene.camera.getPickRay(pixel);
  var target = scene.globe.pick(ray, scene);
  return target || scene.camera.pickEllipsoid(pixel);
};
/**
 * Get the 3D position of the point at the bottom-center of the screen.
 * @param {!Cesium.Scene} scene
 * @return {!Cesium.Cartesian3|undefined}
 * @api
 */


exports.pickBottomPoint = function (scene) {
  var canvas = scene.canvas;
  var bottom = new Cesium.Cartesian2(canvas.clientWidth / 2, canvas.clientHeight);
  return exports.pickOnTerrainOrEllipsoid(scene, bottom);
};
/**
 * Get the 3D position of the point at the center of the screen.
 * @param {!Cesium.Scene} scene
 * @return {!Cesium.Cartesian3|undefined}
 * @api
 */


exports.pickCenterPoint = function (scene) {
  var canvas = scene.canvas;
  var center = new Cesium.Cartesian2(canvas.clientWidth / 2, canvas.clientHeight / 2);
  return exports.pickOnTerrainOrEllipsoid(scene, center);
};
/**
 * Compute the signed tilt angle on globe, between the opposite of the
 * camera direction and the target normal. Return undefined if there is no
 * intersection of the camera direction with the globe.
 * @param {!Cesium.Scene} scene
 * @return {number|undefined}
 * @api
 */


exports.computeSignedTiltAngleOnGlobe = function (scene) {
  var camera = scene.camera;
  var ray = new Cesium.Ray(camera.position, camera.direction);
  var target = scene.globe.pick(ray, scene);

  if (!target) {
    // no tiles in the area were loaded?
    var ellipsoid = Cesium.Ellipsoid.WGS84;
    var obj = Cesium.IntersectionTests.rayEllipsoid(ray, ellipsoid);

    if (obj) {
      target = Cesium.Ray.getPoint(ray, obj.start);
    }
  }

  if (!target) {
    return undefined;
  }

  var normal = new Cesium.Cartesian3();
  Cesium.Ellipsoid.WGS84.geocentricSurfaceNormal(target, normal);
  var angleBetween = exports.signedAngleBetween;
  var angle = angleBetween(camera.direction, normal, camera.right) - Math.PI;
  return Cesium.Math.convertLongitudeRange(angle);
};
/**
 * Compute the ray from the camera to the bottom-center of the screen.
 * @param {!Cesium.Scene} scene
 * @return {!Cesium.Ray}
 */


exports.bottomFovRay = function (scene) {
  var camera = scene.camera;
  var fovy2 = camera.frustum.fovy / 2;
  var direction = camera.direction;
  var rotation = Cesium.Quaternion.fromAxisAngle(camera.right, fovy2);
  var matrix = Cesium.Matrix3.fromQuaternion(rotation);
  var vector = new Cesium.Cartesian3();
  Cesium.Matrix3.multiplyByVector(matrix, direction, vector);
  return new Cesium.Ray(camera.position, vector);
};
/**
 * Compute the angle between two Cartesian3.
 * @param {!Cesium.Cartesian3} first
 * @param {!Cesium.Cartesian3} second
 * @param {!Cesium.Cartesian3} normal Normal to test orientation against.
 * @return {number}
 */


exports.signedAngleBetween = function (first, second, normal) {
  // We are using the dot for the angle.
  // Then the cross and the dot for the sign.
  var a = new Cesium.Cartesian3();
  var b = new Cesium.Cartesian3();
  var c = new Cesium.Cartesian3();
  Cesium.Cartesian3.normalize(first, a);
  Cesium.Cartesian3.normalize(second, b);
  Cesium.Cartesian3.cross(a, b, c);
  var cosine = Cesium.Cartesian3.dot(a, b);
  var sine = Cesium.Cartesian3.magnitude(c); // Sign of the vector product and the orientation normal

  var sign = Cesium.Cartesian3.dot(normal, c);
  var angle = Math.atan2(sine, cosine);
  return sign >= 0 ? angle : -angle;
};
/**
 * Compute the rotation angle around a given point, needed to reach the
 * zenith position.
 * At a zenith position, the camera direction is going througth the earth
 * center and the frustrum bottom ray is going through the chosen pivot
 * point.
 * The bottom-center of the screen is a good candidate for the pivot point.
 * @param {!Cesium.Scene} scene
 * @param {!Cesium.Cartesian3} pivot Point around which the camera rotates.
 * @return {number}
 * @api
 */


exports.computeAngleToZenith = function (scene, pivot) {
  // This angle is the sum of the angles 'fy' and 'a', which are defined
  // using the pivot point and its surface normal.
  //        Zenith |    camera
  //           \   |   /
  //            \fy|  /
  //             \ |a/
  //              \|/pivot
  var camera = scene.camera;
  var fy = camera.frustum.fovy / 2;
  var ray = exports.bottomFovRay(scene);
  var direction = Cesium.Cartesian3.clone(ray.direction);
  Cesium.Cartesian3.negate(direction, direction);
  var normal = new Cesium.Cartesian3();
  Cesium.Ellipsoid.WGS84.geocentricSurfaceNormal(pivot, normal);
  var left = new Cesium.Cartesian3();
  Cesium.Cartesian3.negate(camera.right, left);
  var a = exports.signedAngleBetween(normal, direction, left);
  return a + fy;
};
/**
 * Convert an OpenLayers extent to a Cesium rectangle.
 * @param {ol.Extent} extent Extent.
 * @param {ol.ProjectionLike} projection Extent projection.
 * @return {Cesium.Rectangle} The corresponding Cesium rectangle.
 * @api
 */


exports.extentToRectangle = function (extent, projection) {
  if (extent && projection) {
    var ext = Object(ol_proj_js__WEBPACK_IMPORTED_MODULE_3__["transformExtent"])(extent, projection, 'EPSG:4326');
    return Cesium.Rectangle.fromDegrees(ext[0], ext[1], ext[2], ext[3]);
  } else {
    return null;
  }
};
/**
 * Creates Cesium.ImageryLayer best corresponding to the given ol.layer.Layer.
 * Only supports raster layers and static images
 * @param {!ol.Map} olMap
 * @param {!ol.layer.Base} olLayer
 * @param {!ol.proj.Projection} viewProj Projection of the view.
 * @return {?Cesium.ImageryLayer} null if not possible (or supported)
 * @api
 */


exports.tileLayerToImageryLayer = function (olMap, olLayer, viewProj) {
  if (!(olLayer instanceof ol_layer_Tile_js__WEBPACK_IMPORTED_MODULE_1___default.a) && !(olLayer instanceof ol_layer_Image_js__WEBPACK_IMPORTED_MODULE_2___default.a)) {
    return null;
  }

  var provider = null;
  var source = olLayer.getSource(); // Convert ImageWMS to TileWMS

  if (source instanceof ol_source_ImageWMS_js__WEBPACK_IMPORTED_MODULE_5___default.a && source.getUrl() && source.getImageLoadFunction() === ol_source_Image_js__WEBPACK_IMPORTED_MODULE_8__["defaultImageLoadFunction"]) {
    var sourceProps = {
      'olcs.proxy': source.get('olcs.proxy'),
      'olcs.extent': source.get('olcs.extent'),
      'olcs.projection': source.get('olcs.projection'),
      'olcs.imagesource': source
    };
    source = new ol_source_TileWMS_js__WEBPACK_IMPORTED_MODULE_7___default.a({
      url: source.getUrl(),
      attributions: source.getAttributions(),
      projection: source.getProjection(),
      params: source.getParams()
    });
    source.setProperties(sourceProps);
  }

  if (source instanceof ol_source_TileImage_js__WEBPACK_IMPORTED_MODULE_6___default.a) {
    var projection = _util_js__WEBPACK_IMPORTED_MODULE_10__["default"].getSourceProjection(source);

    if (!projection) {
      // if not explicit, assume the same projection as view
      projection = viewProj;
    }

    if (exports.isCesiumProjection(projection)) {
      provider = new _core_OLImageryProvider_js__WEBPACK_IMPORTED_MODULE_9__["default"](olMap, source, viewProj);
    } // Projection not supported by Cesium
    else {
        return null;
      }
  } else if (source instanceof ol_source_ImageStatic__WEBPACK_IMPORTED_MODULE_4___default.a) {
    var _projection = _util_js__WEBPACK_IMPORTED_MODULE_10__["default"].getSourceProjection(source);

    if (!_projection) {
      _projection = viewProj;
    }

    if (exports.isCesiumProjection(_projection)) {
      provider = new Cesium.SingleTileImageryProvider({
        url: source.getUrl(),
        rectangle: new Cesium.Rectangle.fromDegrees(source.getImageExtent()[0], source.getImageExtent()[1], source.getImageExtent()[2], source.getImageExtent()[3])
      });
    } // Projection not supported by Cesium
    else {
        return null;
      }
  } else {
    // sources other than TileImage|ImageStatic are currently not supported
    return null;
  } // the provider is always non-null if we got this far


  var layerOptions = {};
  var forcedExtent =
  /** @type {ol.Extent} */
  olLayer.get('olcs.extent');
  var ext = forcedExtent || olLayer.getExtent();

  if (ext) {
    layerOptions.rectangle = exports.extentToRectangle(ext, viewProj);
  }

  var cesiumLayer = new Cesium.ImageryLayer(provider, layerOptions);
  return cesiumLayer;
};
/**
 * Synchronizes the layer rendering properties (opacity, visible)
 * to the given Cesium ImageryLayer.
 * @param {olcsx.LayerWithParents} olLayerWithParents
 * @param {!Cesium.ImageryLayer} csLayer
 * @api
 */


exports.updateCesiumLayerProperties = function (olLayerWithParents, csLayer) {
  var opacity = 1;
  var visible = true;
  [olLayerWithParents.layer].concat(olLayerWithParents.parents).forEach(function (olLayer) {
    var layerOpacity = olLayer.getOpacity();

    if (layerOpacity !== undefined) {
      opacity *= layerOpacity;
    }

    var layerVisible = olLayer.getVisible();

    if (layerVisible !== undefined) {
      visible &= layerVisible;
    }
  });
  csLayer.alpha = opacity;
  csLayer.show = visible;
};
/**
 * Convert a 2D or 3D OpenLayers coordinate to Cesium.
 * @param {ol.Coordinate} coordinate Ol3 coordinate.
 * @return {!Cesium.Cartesian3} Cesium cartesian coordinate
 * @api
 */


exports.ol4326CoordinateToCesiumCartesian = function (coordinate) {
  var coo = coordinate;
  return coo.length > 2 ? Cesium.Cartesian3.fromDegrees(coo[0], coo[1], coo[2]) : Cesium.Cartesian3.fromDegrees(coo[0], coo[1]);
};
/**
 * Convert an array of 2D or 3D OpenLayers coordinates to Cesium.
 * @param {Array.<!ol.Coordinate>} coordinates Ol3 coordinates.
 * @return {!Array.<Cesium.Cartesian3>} Cesium cartesian coordinates
 * @api
 */


exports.ol4326CoordinateArrayToCsCartesians = function (coordinates) {
  console.assert(coordinates !== null);
  var toCartesian = exports.ol4326CoordinateToCesiumCartesian;
  var cartesians = [];

  for (var i = 0; i < coordinates.length; ++i) {
    cartesians.push(toCartesian(coordinates[i]));
  }

  return cartesians;
};
/**
 * Reproject an OpenLayers geometry to EPSG:4326 if needed.
 * The geometry will be cloned only when original projection is not EPSG:4326
 * and the properties will be shallow copied.
 * @param {!T} geometry
 * @param {!ol.ProjectionLike} projection
 * @return {!T}
 * @template T
 * @api
 */


exports.olGeometryCloneTo4326 = function (geometry, projection) {
  console.assert(projection);
  var proj4326 = Object(ol_proj_js__WEBPACK_IMPORTED_MODULE_3__["get"])('EPSG:4326');
  var proj = Object(ol_proj_js__WEBPACK_IMPORTED_MODULE_3__["get"])(projection);

  if (proj !== proj4326) {
    var properties = geometry.getProperties();
    geometry = geometry.clone();
    geometry.transform(proj, proj4326);
    geometry.setProperties(properties);
  }

  return geometry;
};
/**
 * Convert an OpenLayers color to Cesium.
 * @param {ol.Color|CanvasGradient|CanvasPattern|string} olColor
 * @return {!Cesium.Color}
 * @api
 */


exports.convertColorToCesium = function (olColor) {
  olColor = olColor || 'black';

  if (Array.isArray(olColor)) {
    return new Cesium.Color(Cesium.Color.byteToFloat(olColor[0]), Cesium.Color.byteToFloat(olColor[1]), Cesium.Color.byteToFloat(olColor[2]), olColor[3]);
  } else if (typeof olColor == 'string') {
    return Cesium.Color.fromCssColorString(olColor);
  } else if (olColor instanceof CanvasPattern || olColor instanceof CanvasGradient) {
    // Render the CanvasPattern/CanvasGradient into a canvas that will be sent to Cesium as material
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = canvas.height = 256;
    ctx.fillStyle = olColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    return new Cesium.ImageMaterialProperty({
      image: canvas
    });
  }

  console.assert(false, 'impossible');
};
/**
 * Convert an OpenLayers url to Cesium.
 * @param {string} url
 * @return {!CesiumUrlDefinition}
 * @api
 */


exports.convertUrlToCesium = function (url) {
  var subdomains = '';
  var re = /\{(\d|[a-z])-(\d|[a-z])\}/;
  var match = re.exec(url);

  if (match) {
    url = url.replace(re, '{s}');
    var startCharCode = match[1].charCodeAt(0);
    var stopCharCode = match[2].charCodeAt(0);
    var charCode;

    for (charCode = startCharCode; charCode <= stopCharCode; ++charCode) {
      subdomains += String.fromCharCode(charCode);
    }
  }

  return {
    url: url,
    subdomains: subdomains
  };
};
/**
 * Animate the return to a top-down view from the zenith.
 * The camera is rotated to orient to the North.
 * @param {!ol.Map} map
 * @param {!Cesium.Scene} scene
 * @return {Promise<undefined>}
 * @api
 */


exports.resetToNorthZenith = function (map, scene) {
  return new Promise(function (resolve, reject) {
    var camera = scene.camera;
    var pivot = exports.pickBottomPoint(scene);

    if (!pivot) {
      reject('Could not get bottom pivot');
      return;
    }

    var currentHeading = map.getView().getRotation();

    if (currentHeading === undefined) {
      reject('The view is not initialized');
      return;
    }

    var angle = exports.computeAngleToZenith(scene, pivot); // Point to North

    exports.setHeadingUsingBottomCenter(scene, currentHeading, pivot); // Go to zenith

    var transform = Cesium.Matrix4.fromTranslation(pivot);
    var axis = camera.right;
    var options = {
      callback: function callback() {
        var view = map.getView();
        exports.normalizeView(view);
        resolve();
      }
    };
    exports.rotateAroundAxis(camera, -angle, axis, transform, options);
  });
};
/**
 * @param {!Cesium.Scene} scene
 * @param {number} angle in radian
 * @return {Promise<undefined>}
 * @api
 */


exports.rotateAroundBottomCenter = function (scene, angle) {
  return new Promise(function (resolve, reject) {
    var camera = scene.camera;
    var pivot = exports.pickBottomPoint(scene);

    if (!pivot) {
      reject('could not get bottom pivot');
      return;
    }

    var options = {
      callback: resolve
    };
    var transform = Cesium.Matrix4.fromTranslation(pivot);
    var axis = camera.right;
    var rotateAroundAxis = exports.rotateAroundAxis;
    rotateAroundAxis(camera, -angle, axis, transform, options);
  });
};
/**
 * Set the OpenLayers view to a specific rotation and
 * the nearest resolution.
 * @param {ol.View} view
 * @param {number=} angle
 * @api
 */


exports.normalizeView = function (view, angle) {
  if (angle === void 0) {
    angle = 0;
  }

  var resolution = view.getResolution();
  view.setRotation(angle);
  view.setResolution(view.constrainResolution(resolution));
};
/**
 * Check if the given projection is managed by Cesium (WGS84 or Mercator Spheric)
 *
 * @param {ol.proj.Projection} projection Projection to check.
 * @returns {boolean} Whether it's managed by Cesium.
 */


exports.isCesiumProjection = function (projection) {
  var is3857 = projection === Object(ol_proj_js__WEBPACK_IMPORTED_MODULE_3__["get"])('EPSG:3857');
  var is4326 = projection === Object(ol_proj_js__WEBPACK_IMPORTED_MODULE_3__["get"])('EPSG:4326');
  return is3857 || is4326;
};

/* harmony default export */ __webpack_exports__["default"] = (exports);

/***/ }),

/***/ "./src/olcs/core/OLImageryProvider.js":
/*!********************************************!*\
  !*** ./src/olcs/core/OLImageryProvider.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ol_proj_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ol/proj.js */ "ol/proj.js");
/* harmony import */ var ol_proj_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ol_proj_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util.js */ "./src/olcs/util.js");
/**
 * @module olcs.core.OLImageryProvider
 */



var OLImageryProvider
/* should not extend Cesium.ImageryProvider */
=
/*#__PURE__*/
function () {
  /**
   * Special class derived from Cesium.ImageryProvider
   * that is connected to the given ol.source.TileImage.
   * @param {!ol.Map} olMap
   * @param {!ol.source.TileImage} source
   * @param {ol.proj.Projection=} opt_fallbackProj Projection to assume if the
   *                                               projection of the source is not defined.
   * @constructor
   * @extends {Cesium.ImageryProvider}
   */
  function OLImageryProvider(olMap, source, opt_fallbackProj) {
    var _this = this;

    // Do not extend or call super constructor from
    // Cesium.ImageryProvider since this particular function is a
    // 'non instanciable interface' which throws on instanciation.

    /**
     * @type {!ol.source.TileImage}
     * @private
     */
    this.source_ = source;
    /**
     * @type {?ol.proj.Projection}
     * @private
     */

    this.projection_ = null;
    /**
     * @type {?ol.proj.Projection}
     * @private
     */

    this.fallbackProj_ = opt_fallbackProj || null;
    /**
     * @type {boolean}
     * @private
     */

    this.ready_ = false;
    /**
     * @type {?Cesium.TilingScheme}
     * @private
     */

    this.tilingScheme_ = null;
    /**
     * @type {?Cesium.Rectangle}
     * @private
     */

    this.rectangle_ = null;
    /**
     * @type {!ol.Map}
     * @private
     */

    this.map_ = olMap;
    var proxy = this.source_.get('olcs.proxy');

    if (proxy) {
      if (typeof proxy === 'function') {
        this.proxy_ = {
          'getURL': proxy
        };
      } else if (typeof proxy === 'string') {
        this.proxy_ = new Cesium.DefaultProxy(proxy);
      }
    }

    this.errorEvent_ = new Cesium.Event();
    this.emptyCanvas_ = document.createElement('canvas');
    this.emptyCanvas_.width = 1;
    this.emptyCanvas_.height = 1;
    this.source_.on('change', function (e) {
      _this.handleSourceChanged_();
    });
    this.handleSourceChanged_();
  }
  /**
   * Checks if the underlying source is ready and cached required data.
   * @private
   */


  var _proto = OLImageryProvider.prototype;

  _proto.handleSourceChanged_ = function handleSourceChanged_(frameState) {
    if (!this.ready_ && this.source_.getState() == 'ready') {
      this.projection_ = _util_js__WEBPACK_IMPORTED_MODULE_1__["default"].getSourceProjection(this.source_) || this.fallbackProj_;

      if (this.projection_ == Object(ol_proj_js__WEBPACK_IMPORTED_MODULE_0__["get"])('EPSG:4326')) {
        this.tilingScheme_ = new Cesium.GeographicTilingScheme();
      } else if (this.projection_ == Object(ol_proj_js__WEBPACK_IMPORTED_MODULE_0__["get"])('EPSG:3857')) {
        this.tilingScheme_ = new Cesium.WebMercatorTilingScheme();
      } else {
        return;
      }

      this.rectangle_ = this.tilingScheme_.rectangle;
      this.ready_ = true;
    }
  }
  /**
   * Generates the proper attributions for a given position and zoom
   * level.
   * @export
   * @override
   */
  ;

  _proto.getTileCredits = function getTileCredits(x, y, level) {
    var extent = this.map_.getView().calculateExtent(this.map_.getSize());
    var center = this.map_.getView().getCenter();
    var zoom = this.tilingScheme_ instanceof Cesium.GeographicTilingScheme ? level + 1 : level;
    var frameState = {
      viewState: {
        zoom: zoom,
        center: center
      },
      extent: extent
    };
    var attributionsFunction = this.source_.getAttributions();

    if (!attributionsFunction) {
      return [];
    }

    var attributions = attributionsFunction(frameState);

    if (!Array.isArray(attributions)) {
      attributions = [attributions];
    }

    return attributions.map(function (html) {
      return new Cesium.Credit(html, true);
    });
  }
  /**
   * @export
   * @override
   */
  ;

  _proto.requestImage = function requestImage(x, y, level) {
    var tileUrlFunction = this.source_.getTileUrlFunction();

    if (tileUrlFunction && this.projection_) {
      // Perform mapping of Cesium tile coordinates to OpenLayers tile coordinates:
      // 1) Cesium zoom level 0 is OpenLayers zoom level 1 for EPSG:4326
      var z_ = this.tilingScheme_ instanceof Cesium.GeographicTilingScheme ? level + 1 : level; // 2) OpenLayers tile coordinates increase from bottom to top

      var y_ = -y - 1;
      var url = tileUrlFunction.call(this.source_, [z_, x, y_], 1, this.projection_);

      if (this.proxy_) {
        url = this.proxy_.getURL(url);
      }

      return url ? Cesium.ImageryProvider.loadImage(this, url) : this.emptyCanvas_;
    } else {
      // return empty canvas to stop Cesium from retrying later
      return this.emptyCanvas_;
    }
  };

  return OLImageryProvider;
}(); // definitions of getters that are required to be present
// in the Cesium.ImageryProvider instance:


Object.defineProperties(OLImageryProvider.prototype, {
  'ready': {
    'get':
    /** @this {olcs.core.OLImageryProvider} */
    function get() {
      return this.ready_;
    }
  },
  'rectangle': {
    'get':
    /** @this {olcs.core.OLImageryProvider} */
    function get() {
      return this.rectangle_;
    }
  },
  'tileWidth': {
    'get':
    /** @this {olcs.core.OLImageryProvider} */
    function get() {
      var tg = this.source_.getTileGrid();
      return tg ? Array.isArray(tg.getTileSize(0)) ? tg.getTileSize(0)[0] : tg.getTileSize(0) : 256;
    }
  },
  'tileHeight': {
    'get':
    /** @this {olcs.core.OLImageryProvider} */
    function get() {
      var tg = this.source_.getTileGrid();
      return tg ? Array.isArray(tg.getTileSize(0)) ? tg.getTileSize(0)[1] : tg.getTileSize(0) : 256;
    }
  },
  'maximumLevel': {
    'get':
    /** @this {olcs.core.OLImageryProvider} */
    function get() {
      var tg = this.source_.getTileGrid();
      return tg ? tg.getMaxZoom() : 18;
    }
  },
  'minimumLevel': {
    'get':
    /** @this {olcs.core.OLImageryProvider} */
    function get() {
      // WARNING: Do not use the minimum level (at least until the extent is
      // properly set). Cesium assumes the minimumLevel to contain only
      // a few tiles and tries to load them all at once -- this can
      // freeze and/or crash the browser !
      return 0; //var tg = this.source_.getTileGrid();
      //return tg ? tg.getMinZoom() : 0;
    }
  },
  'tilingScheme': {
    'get':
    /** @this {olcs.core.OLImageryProvider} */
    function get() {
      return this.tilingScheme_;
    }
  },
  'tileDiscardPolicy': {
    'get': function get() {
      return undefined;
    }
  },
  'errorEvent': {
    'get':
    /** @this {olcs.core.OLImageryProvider} */
    function get() {
      return this.errorEvent_;
    }
  },
  'proxy': {
    'get':
    /** @this {olcs.core.OLImageryProvider} */
    function get() {
      return this.proxy_;
    }
  },
  'hasAlphaChannel': {
    'get': function get() {
      return true;
    }
  },
  'pickFeatures': {
    'get': function get() {
      return undefined;
    }
  }
});
/* harmony default export */ __webpack_exports__["default"] = (OLImageryProvider);

/***/ }),

/***/ "./src/olcs/core/VectorLayerCounterpart.js":
/*!*************************************************!*\
  !*** ./src/olcs/core/VectorLayerCounterpart.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ol_Observable_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ol/Observable.js */ "ol/Observable.js");
/* harmony import */ var ol_Observable_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ol_Observable_js__WEBPACK_IMPORTED_MODULE_0__);
/**
 * @module olcs.core.VectorLayerCounterpart
 */

/**
 * Context for feature conversion.
 * @typedef {Object} OlFeatureToCesiumContext
 * @property {!(import('ol/Projection.js').default|string)} projection
 * @property {!Cesium.PrimitiveCollection} primitives
 * @property {Object<number, Array<!Cesium.Primitive|!Cesium.Billboard>>} featureToCesiumMap
 * @property {!Cesium.BillboardCollection} billboards
 */

var VectorLayerCounterpart =
/*#__PURE__*/
function () {
  /**
  * Result of the conversion of an OpenLayers layer to Cesium.
  * @param {!(ol.proj.Projection|string)} layerProjection
  * @param {!Cesium.Scene} scene
  */
  function VectorLayerCounterpart(layerProjection, scene) {
    var billboards = new Cesium.BillboardCollection({
      scene: scene
    });
    var primitives = new Cesium.PrimitiveCollection();
    /**
    * @type {!Array.<ol.EventsKey>}
    */

    this.olListenKeys = [];
    this.rootCollection_ = new Cesium.PrimitiveCollection();
    /**
    * @type {!OlFeatureToCesiumContext}
    */

    this.context = {
      projection: layerProjection,
      billboards: billboards,
      featureToCesiumMap: {},
      primitives: primitives
    };
    this.rootCollection_.add(billboards);
    this.rootCollection_.add(primitives);
  }
  /**
  * Unlisten.
  */


  var _proto = VectorLayerCounterpart.prototype;

  _proto.destroy = function destroy() {
    this.olListenKeys.forEach(ol_Observable_js__WEBPACK_IMPORTED_MODULE_0__["unByKey"]);
    this.olListenKeys.length = 0;
  }
  /**
  * @return {!Cesium.Primitive}
  */
  ;

  _proto.getRootPrimitive = function getRootPrimitive() {
    return this.rootCollection_;
  };

  return VectorLayerCounterpart;
}();

/* harmony default export */ __webpack_exports__["default"] = (VectorLayerCounterpart);

/***/ }),

/***/ "./src/olcs/math.js":
/*!**************************!*\
  !*** ./src/olcs/math.js ***!
  \**************************/
/*! exports provided: toDegrees, toRadians */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toDegrees", function() { return toDegrees; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toRadians", function() { return toRadians; });
/**
 * Converts radians to to degrees.
 *
 * @param {number} angleInRadians Angle in radians.
 * @return {number} Angle in degrees.
 */
function toDegrees(angleInRadians) {
  return angleInRadians * 180 / Math.PI;
}
/**
 * Converts degrees to radians.
 *
 * @param {number} angleInDegrees Angle in degrees.
 * @return {number} Angle in radians.
 */

function toRadians(angleInDegrees) {
  return angleInDegrees * Math.PI / 180;
}

/***/ }),

/***/ "./src/olcs/util.js":
/*!**************************!*\
  !*** ./src/olcs/util.js ***!
  \**************************/
/*! exports provided: olcsListen, getUid, stableSort, removeNode, removeChildren, isGroundPolylinePrimitiveSupported, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "olcsListen", function() { return olcsListen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getUid", function() { return getUid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stableSort", function() { return stableSort; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeNode", function() { return removeNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeChildren", function() { return removeChildren; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isGroundPolylinePrimitiveSupported", function() { return isGroundPolylinePrimitiveSupported; });
/**
 * @module olcs.util
 */
var exports = {};
/**
 * Cast to object.
 * @param {Object} param
 * @return {Object}
 */

exports.obj = function (param) {
  return param;
};
/**
 * @type {boolean|undefined}
 * @private
 */


exports.supportsImageRenderingPixelatedResult_ = undefined;
/**
 * @type {string|undefined}
 * @private
 */

exports.imageRenderingValueResult_ = undefined;
/**
 * @return {boolean}
 */

exports.supportsImageRenderingPixelated = function () {
  if (exports.supportsImageRenderingPixelatedResult_ === undefined) {
    var canvas = document.createElement('canvas');
    canvas.setAttribute('style', 'image-rendering: -moz-crisp-edges; image-rendering: pixelated;'); // canvas.style.imageRendering will be undefined, null or an
    // empty string on unsupported browsers.

    var tmp = canvas.style['imageRendering']; // non standard

    exports.supportsImageRenderingPixelatedResult_ = !!tmp;

    if (exports.supportsImageRenderingPixelatedResult_) {
      exports.imageRenderingValueResult_ = tmp;
    }
  }

  return exports.supportsImageRenderingPixelatedResult_;
};
/**
 * @return {string}
 */


exports.imageRenderingValue = function () {
  exports.supportsImageRenderingPixelated();
  return exports.imageRenderingValueResult_ || '';
};
/**
 * Return the projection of the source that Cesium should use.
 *
 * @param {ol.source.Source} source Source.
 * @returns {ol.proj.Projection} The projection of the source.
 */


exports.getSourceProjection = function (source) {
  return (
    /** @type {ol.proj.Projection} */
    source.get('olcs.projection') || source.getProjection()
  );
};
/**
 * @param {ol.Observable} observable
 * @param {string} type
 * @param {Function} listener
 * @return {!ol.events.EventsKey}
 */


function olcsListen(observable, type, listener) {
  // See https://github.com/openlayers/openlayers/pull/8481
  // ol.events.listen is internal so we use `on` instead.
  // And since `on` as a convoluted API (can return an EventsKey or an array of them)
  // we use a cast here.
  return (
    /** @type {!ol.events.EventsKey} */
    observable.on(type, listener)
  );
}
/**
 * Counter for getUid.
 * @type {number}
 */

var uidCounter_ = 0;
/**
 * Gets a unique ID for an object. This mutates the object so that further calls
 * with the same object as a parameter returns the same value. Unique IDs are generated
 * as a strictly increasing sequence. Adapted from goog.getUid.
 *
 * @param {Object} obj The object to get the unique ID for.
 * @return {number} The unique ID for the object.
 */

function getUid(obj) {
  return obj.olcs_uid || (obj.olcs_uid = ++uidCounter_);
}
/**
 * Sort the passed array such that the relative order of equal elements is preverved.
 * See https://en.wikipedia.org/wiki/Sorting_algorithm#Stability for details.
 * @param {Array<*>} arr The array to sort (modifies original).
 * @param {!function(*, *): number} compareFnc Comparison function.
 */

function stableSort(arr, compareFnc) {
  var length = arr.length;
  var tmp = Array(arr.length);

  for (var i = 0; i < length; i++) {
    tmp[i] = {
      index: i,
      value: arr[i]
    };
  }

  tmp.sort(function (a, b) {
    return compareFnc(a.value, b.value) || a.index - b.index;
  });

  for (var _i = 0; _i < arr.length; _i++) {
    arr[_i] = tmp[_i].value;
  }
}
/**
 * @param {Node} node The node to remove.
 * @returns {Node} The node that was removed or null.
 */

function removeNode(node) {
  return node && node.parentNode ? node.parentNode.removeChild(node) : null;
}
/**
 * @param {Node} node The node to remove the children from.
 */

function removeChildren(node) {
  while (node.lastChild) {
    node.removeChild(node.lastChild);
  }
}
/**
 * @param {Cesium.Scene} scene The scene.
 */

function isGroundPolylinePrimitiveSupported(scene) {
  var obj = Cesium.GroundPolylinePrimitive;
  return obj && obj.isSupported(scene);
}
/* harmony default export */ __webpack_exports__["default"] = (exports);

/***/ }),

/***/ "ol/Observable.js":
/*!********************************!*\
  !*** external "ol.Observable" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ol.Observable;

/***/ }),

/***/ "ol/Overlay.js":
/*!*****************************!*\
  !*** external "ol.Overlay" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ol.Overlay;

/***/ }),

/***/ "ol/easing.js":
/*!****************************!*\
  !*** external "ol.easing" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ol.easing;

/***/ }),

/***/ "ol/extent.js":
/*!****************************!*\
  !*** external "ol.extent" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ol.extent;

/***/ }),

/***/ "ol/geom/Geometry.js":
/*!***********************************!*\
  !*** external "ol.geom.Geometry" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ol.geom.Geometry;

/***/ }),

/***/ "ol/geom/Point.js":
/*!********************************!*\
  !*** external "ol.geom.Point" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ol.geom.Point;

/***/ }),

/***/ "ol/geom/Polygon.js":
/*!**********************************!*\
  !*** external "ol.geom.Polygon" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ol.geom.Polygon;

/***/ }),

/***/ "ol/geom/SimpleGeometry.js":
/*!*****************************************!*\
  !*** external "ol.geom.SimpleGeometry" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ol.geom.SimpleGeometry;

/***/ }),

/***/ "ol/layer/Group.js":
/*!*********************************!*\
  !*** external "ol.layer.Group" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ol.layer.Group;

/***/ }),

/***/ "ol/layer/Image.js":
/*!*********************************!*\
  !*** external "ol.layer.Image" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ol.layer.Image;

/***/ }),

/***/ "ol/layer/Layer.js":
/*!*********************************!*\
  !*** external "ol.layer.Layer" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ol.layer.Layer;

/***/ }),

/***/ "ol/layer/Tile.js":
/*!********************************!*\
  !*** external "ol.layer.Tile" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ol.layer.Tile;

/***/ }),

/***/ "ol/layer/Vector.js":
/*!**********************************!*\
  !*** external "ol.layer.Vector" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ol.layer.Vector;

/***/ }),

/***/ "ol/layer/VectorTile.js":
/*!**************************************!*\
  !*** external "ol.layer.VectorTile" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ol.layer.VectorTile;

/***/ }),

/***/ "ol/proj.js":
/*!**************************!*\
  !*** external "ol.proj" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ol.proj;

/***/ }),

/***/ "ol/source/Cluster.js":
/*!************************************!*\
  !*** external "ol.source.Cluster" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ol.source.Cluster;

/***/ }),

/***/ "ol/source/Image.js":
/*!**********************************!*\
  !*** external "ol.source.Image" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ol.source.Image;

/***/ }),

/***/ "ol/source/ImageStatic":
/*!****************************************!*\
  !*** external "ol.source.ImageStatic" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ol.source.ImageStatic;

/***/ }),

/***/ "ol/source/ImageWMS.js":
/*!*************************************!*\
  !*** external "ol.source.ImageWMS" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ol.source.ImageWMS;

/***/ }),

/***/ "ol/source/TileImage.js":
/*!**************************************!*\
  !*** external "ol.source.TileImage" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ol.source.TileImage;

/***/ }),

/***/ "ol/source/TileWMS.js":
/*!************************************!*\
  !*** external "ol.source.TileWMS" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ol.source.TileWMS;

/***/ }),

/***/ "ol/source/Vector.js":
/*!***********************************!*\
  !*** external "ol.source.Vector" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ol.source.Vector;

/***/ }),

/***/ "ol/style/Icon.js":
/*!********************************!*\
  !*** external "ol.style.Icon" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ol.style.Icon;

/***/ })

/******/ });
//# sourceMappingURL=olcesium-debug.js.map