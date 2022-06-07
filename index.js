var CryptoJS=CryptoJS||function(t,e){var r={},n=r.lib={},i=n.Base=function(){function t(){}return{extend:function(e){t.prototype=this;var r=new t;return e&&r.mixIn(e),r.hasOwnProperty("init")||(r.init=function(){r.$super.init.apply(this,arguments)}),r.init.prototype=r,r.$super=this,r},create:function(){var t=this.extend();return t.init.apply(t,arguments),t},init:function(){},mixIn:function(t){for(var e in t)t.hasOwnProperty(e)&&(this[e]=t[e]);t.hasOwnProperty("toString")&&(this.toString=t.toString)},clone:function(){return this.init.prototype.extend(this)}}}(),o=n.WordArray=i.extend({init:function(t,r){t=this.words=t||[],this.sigBytes=r!=e?r:4*t.length},toString:function(t){return(t||a).stringify(this)},concat:function(t){var e=this.words,r=t.words,n=this.sigBytes,i=t.sigBytes;if(this.clamp(),n%4)for(var o=0;i>o;o++){var s=r[o>>>2]>>>24-o%4*8&255;e[n+o>>>2]|=s<<24-(n+o)%4*8}else if(r.length>65535)for(var o=0;i>o;o+=4)e[n+o>>>2]=r[o>>>2];else e.push.apply(e,r);return this.sigBytes+=i,this},clamp:function(){var e=this.words,r=this.sigBytes;e[r>>>2]&=4294967295<<32-r%4*8,e.length=t.ceil(r/4)},clone:function(){var t=i.clone.call(this);return t.words=this.words.slice(0),t},random:function(e){for(var r=[],n=0;e>n;n+=4)r.push(4294967296*t.random()|0);return new o.init(r,e)}}),s=r.enc={},a=s.Hex={stringify:function(t){for(var e=t.words,r=t.sigBytes,n=[],i=0;r>i;i++){var o=e[i>>>2]>>>24-i%4*8&255;n.push((o>>>4).toString(16)),n.push((15&o).toString(16))}return n.join("")},parse:function(t){for(var e=t.length,r=[],n=0;e>n;n+=2)r[n>>>3]|=parseInt(t.substr(n,2),16)<<24-n%8*4;return new o.init(r,e/2)}},c=s.Latin1={stringify:function(t){for(var e=t.words,r=t.sigBytes,n=[],i=0;r>i;i++){var o=e[i>>>2]>>>24-i%4*8&255;n.push(String.fromCharCode(o))}return n.join("")},parse:function(t){for(var e=t.length,r=[],n=0;e>n;n++)r[n>>>2]|=(255&t.charCodeAt(n))<<24-n%4*8;return new o.init(r,e)}},f=s.Utf8={stringify:function(t){try{return decodeURIComponent(escape(c.stringify(t)))}catch(e){throw new Error("Malformed UTF-8 data")}},parse:function(t){return c.parse(unescape(encodeURIComponent(t)))}},u=n.BufferedBlockAlgorithm=i.extend({reset:function(){this._data=new o.init,this._nDataBytes=0},_append:function(t){"string"==typeof t&&(t=f.parse(t)),this._data.concat(t),this._nDataBytes+=t.sigBytes},_process:function(e){var r=this._data,n=r.words,i=r.sigBytes,s=this.blockSize,a=4*s,c=i/a;c=e?t.ceil(c):t.max((0|c)-this._minBufferSize,0);var f=c*s,u=t.min(4*f,i);if(f){for(var h=0;f>h;h+=s)this._doProcessBlock(n,h);var p=n.splice(0,f);r.sigBytes-=u}return new o.init(p,u)},clone:function(){var t=i.clone.call(this);return t._data=this._data.clone(),t},_minBufferSize:0}),h=(n.Hasher=u.extend({cfg:i.extend(),init:function(t){this.cfg=this.cfg.extend(t),this.reset()},reset:function(){u.reset.call(this),this._doReset()},update:function(t){return this._append(t),this._process(),this},finalize:function(t){t&&this._append(t);var e=this._doFinalize();return e},blockSize:16,_createHelper:function(t){return function(e,r){return new t.init(r).finalize(e)}},_createHmacHelper:function(t){return function(e,r){return new h.HMAC.init(t,r).finalize(e)}}}),r.algo={});return r}(Math);!function(){{var t=CryptoJS,e=t.lib,r=e.WordArray,n=t.enc;n.Base64={stringify:function(t){var e=t.words,r=t.sigBytes,n=this._map;t.clamp();for(var i=[],o=0;r>o;o+=3)for(var s=e[o>>>2]>>>24-o%4*8&255,a=e[o+1>>>2]>>>24-(o+1)%4*8&255,c=e[o+2>>>2]>>>24-(o+2)%4*8&255,f=s<<16|a<<8|c,u=0;4>u&&r>o+.75*u;u++)i.push(n.charAt(f>>>6*(3-u)&63));var h=n.charAt(64);if(h)for(;i.length%4;)i.push(h);return i.join("")},parse:function(t){var e=t.length,n=this._map,i=n.charAt(64);if(i){var o=t.indexOf(i);-1!=o&&(e=o)}for(var s=[],a=0,c=0;e>c;c++)if(c%4){var f=n.indexOf(t.charAt(c-1))<<c%4*2,u=n.indexOf(t.charAt(c))>>>6-c%4*2;s[a>>>2]|=(f|u)<<24-a%4*8,a++}return r.create(s,a)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="}}}(),function(t){function e(t,e,r,n,i,o,s){var a=t+(e&r|~e&n)+i+s;return(a<<o|a>>>32-o)+e}function r(t,e,r,n,i,o,s){var a=t+(e&n|r&~n)+i+s;return(a<<o|a>>>32-o)+e}function n(t,e,r,n,i,o,s){var a=t+(e^r^n)+i+s;return(a<<o|a>>>32-o)+e}function i(t,e,r,n,i,o,s){var a=t+(r^(e|~n))+i+s;return(a<<o|a>>>32-o)+e}var o=CryptoJS,s=o.lib,a=s.WordArray,c=s.Hasher,f=o.algo,u=[];!function(){for(var e=0;64>e;e++)u[e]=4294967296*t.abs(t.sin(e+1))|0}();var h=f.MD5=c.extend({_doReset:function(){this._hash=new a.init([1732584193,4023233417,2562383102,271733878])},_doProcessBlock:function(t,o){for(var s=0;16>s;s++){var a=o+s,c=t[a];t[a]=16711935&(c<<8|c>>>24)|4278255360&(c<<24|c>>>8)}var f=this._hash.words,h=t[o+0],p=t[o+1],l=t[o+2],d=t[o+3],v=t[o+4],y=t[o+5],g=t[o+6],_=t[o+7],m=t[o+8],S=t[o+9],B=t[o+10],x=t[o+11],k=t[o+12],C=t[o+13],z=t[o+14],w=t[o+15],E=f[0],D=f[1],M=f[2],b=f[3];E=e(E,D,M,b,h,7,u[0]),b=e(b,E,D,M,p,12,u[1]),M=e(M,b,E,D,l,17,u[2]),D=e(D,M,b,E,d,22,u[3]),E=e(E,D,M,b,v,7,u[4]),b=e(b,E,D,M,y,12,u[5]),M=e(M,b,E,D,g,17,u[6]),D=e(D,M,b,E,_,22,u[7]),E=e(E,D,M,b,m,7,u[8]),b=e(b,E,D,M,S,12,u[9]),M=e(M,b,E,D,B,17,u[10]),D=e(D,M,b,E,x,22,u[11]),E=e(E,D,M,b,k,7,u[12]),b=e(b,E,D,M,C,12,u[13]),M=e(M,b,E,D,z,17,u[14]),D=e(D,M,b,E,w,22,u[15]),E=r(E,D,M,b,p,5,u[16]),b=r(b,E,D,M,g,9,u[17]),M=r(M,b,E,D,x,14,u[18]),D=r(D,M,b,E,h,20,u[19]),E=r(E,D,M,b,y,5,u[20]),b=r(b,E,D,M,B,9,u[21]),M=r(M,b,E,D,w,14,u[22]),D=r(D,M,b,E,v,20,u[23]),E=r(E,D,M,b,S,5,u[24]),b=r(b,E,D,M,z,9,u[25]),M=r(M,b,E,D,d,14,u[26]),D=r(D,M,b,E,m,20,u[27]),E=r(E,D,M,b,C,5,u[28]),b=r(b,E,D,M,l,9,u[29]),M=r(M,b,E,D,_,14,u[30]),D=r(D,M,b,E,k,20,u[31]),E=n(E,D,M,b,y,4,u[32]),b=n(b,E,D,M,m,11,u[33]),M=n(M,b,E,D,x,16,u[34]),D=n(D,M,b,E,z,23,u[35]),E=n(E,D,M,b,p,4,u[36]),b=n(b,E,D,M,v,11,u[37]),M=n(M,b,E,D,_,16,u[38]),D=n(D,M,b,E,B,23,u[39]),E=n(E,D,M,b,C,4,u[40]),b=n(b,E,D,M,h,11,u[41]),M=n(M,b,E,D,d,16,u[42]),D=n(D,M,b,E,g,23,u[43]),E=n(E,D,M,b,S,4,u[44]),b=n(b,E,D,M,k,11,u[45]),M=n(M,b,E,D,w,16,u[46]),D=n(D,M,b,E,l,23,u[47]),E=i(E,D,M,b,h,6,u[48]),b=i(b,E,D,M,_,10,u[49]),M=i(M,b,E,D,z,15,u[50]),D=i(D,M,b,E,y,21,u[51]),E=i(E,D,M,b,k,6,u[52]),b=i(b,E,D,M,d,10,u[53]),M=i(M,b,E,D,B,15,u[54]),D=i(D,M,b,E,p,21,u[55]),E=i(E,D,M,b,m,6,u[56]),b=i(b,E,D,M,w,10,u[57]),M=i(M,b,E,D,g,15,u[58]),D=i(D,M,b,E,C,21,u[59]),E=i(E,D,M,b,v,6,u[60]),b=i(b,E,D,M,x,10,u[61]),M=i(M,b,E,D,l,15,u[62]),D=i(D,M,b,E,S,21,u[63]),f[0]=f[0]+E|0,f[1]=f[1]+D|0,f[2]=f[2]+M|0,f[3]=f[3]+b|0},_doFinalize:function(){var e=this._data,r=e.words,n=8*this._nDataBytes,i=8*e.sigBytes;r[i>>>5]|=128<<24-i%32;var o=t.floor(n/4294967296),s=n;r[(i+64>>>9<<4)+15]=16711935&(o<<8|o>>>24)|4278255360&(o<<24|o>>>8),r[(i+64>>>9<<4)+14]=16711935&(s<<8|s>>>24)|4278255360&(s<<24|s>>>8),e.sigBytes=4*(r.length+1),this._process();for(var a=this._hash,c=a.words,f=0;4>f;f++){var u=c[f];c[f]=16711935&(u<<8|u>>>24)|4278255360&(u<<24|u>>>8)}return a},clone:function(){var t=c.clone.call(this);return t._hash=this._hash.clone(),t}});o.MD5=c._createHelper(h),o.HmacMD5=c._createHmacHelper(h)}(Math),function(){var t=CryptoJS,e=t.lib,r=e.Base,n=e.WordArray,i=t.algo,o=i.MD5,s=i.EvpKDF=r.extend({cfg:r.extend({keySize:4,hasher:o,iterations:1}),init:function(t){this.cfg=this.cfg.extend(t)},compute:function(t,e){for(var r=this.cfg,i=r.hasher.create(),o=n.create(),s=o.words,a=r.keySize,c=r.iterations;s.length<a;){f&&i.update(f);var f=i.update(t).finalize(e);i.reset();for(var u=1;c>u;u++)f=i.finalize(f),i.reset();o.concat(f)}return o.sigBytes=4*a,o}});t.EvpKDF=function(t,e,r){return s.create(r).compute(t,e)}}(),CryptoJS.lib.Cipher||function(t){var e=CryptoJS,r=e.lib,n=r.Base,i=r.WordArray,o=r.BufferedBlockAlgorithm,s=e.enc,a=(s.Utf8,s.Base64),c=e.algo,f=c.EvpKDF,u=r.Cipher=o.extend({cfg:n.extend(),createEncryptor:function(t,e){return this.create(this._ENC_XFORM_MODE,t,e)},createDecryptor:function(t,e){return this.create(this._DEC_XFORM_MODE,t,e)},init:function(t,e,r){this.cfg=this.cfg.extend(r),this._xformMode=t,this._key=e,this.reset()},reset:function(){o.reset.call(this),this._doReset()},process:function(t){return this._append(t),this._process()},finalize:function(t){t&&this._append(t);var e=this._doFinalize();return e},keySize:4,ivSize:4,_ENC_XFORM_MODE:1,_DEC_XFORM_MODE:2,_createHelper:function(){function t(t){return"string"==typeof t?x:m}return function(e){return{encrypt:function(r,n,i){return t(n).encrypt(e,r,n,i)},decrypt:function(r,n,i){return t(n).decrypt(e,r,n,i)}}}}()}),h=(r.StreamCipher=u.extend({_doFinalize:function(){var t=this._process(!0);return t},blockSize:1}),e.mode={}),p=r.BlockCipherMode=n.extend({createEncryptor:function(t,e){return this.Encryptor.create(t,e)},createDecryptor:function(t,e){return this.Decryptor.create(t,e)},init:function(t,e){this._cipher=t,this._iv=e}}),l=h.CBC=function(){function e(e,r,n){var i=this._iv;if(i){var o=i;this._iv=t}else var o=this._prevBlock;for(var s=0;n>s;s++)e[r+s]^=o[s]}var r=p.extend();return r.Encryptor=r.extend({processBlock:function(t,r){var n=this._cipher,i=n.blockSize;e.call(this,t,r,i),n.encryptBlock(t,r),this._prevBlock=t.slice(r,r+i)}}),r.Decryptor=r.extend({processBlock:function(t,r){var n=this._cipher,i=n.blockSize,o=t.slice(r,r+i);n.decryptBlock(t,r),e.call(this,t,r,i),this._prevBlock=o}}),r}(),d=e.pad={},v=d.Pkcs7={pad:function(t,e){for(var r=4*e,n=r-t.sigBytes%r,o=n<<24|n<<16|n<<8|n,s=[],a=0;n>a;a+=4)s.push(o);var c=i.create(s,n);t.concat(c)},unpad:function(t){var e=255&t.words[t.sigBytes-1>>>2];t.sigBytes-=e}},y=(r.BlockCipher=u.extend({cfg:u.cfg.extend({mode:l,padding:v}),reset:function(){u.reset.call(this);var t=this.cfg,e=t.iv,r=t.mode;if(this._xformMode==this._ENC_XFORM_MODE)var n=r.createEncryptor;else{var n=r.createDecryptor;this._minBufferSize=1}this._mode=n.call(r,this,e&&e.words)},_doProcessBlock:function(t,e){this._mode.processBlock(t,e)},_doFinalize:function(){var t=this.cfg.padding;if(this._xformMode==this._ENC_XFORM_MODE){t.pad(this._data,this.blockSize);var e=this._process(!0)}else{var e=this._process(!0);t.unpad(e)}return e},blockSize:4}),r.CipherParams=n.extend({init:function(t){this.mixIn(t)},toString:function(t){return(t||this.formatter).stringify(this)}})),g=e.format={},_=g.OpenSSL={stringify:function(t){var e=t.ciphertext,r=t.salt;if(r)var n=i.create([1398893684,1701076831]).concat(r).concat(e);else var n=e;return n.toString(a)},parse:function(t){var e=a.parse(t),r=e.words;if(1398893684==r[0]&&1701076831==r[1]){var n=i.create(r.slice(2,4));r.splice(0,4),e.sigBytes-=16}return y.create({ciphertext:e,salt:n})}},m=r.SerializableCipher=n.extend({cfg:n.extend({format:_}),encrypt:function(t,e,r,n){n=this.cfg.extend(n);var i=t.createEncryptor(r,n),o=i.finalize(e),s=i.cfg;return y.create({ciphertext:o,key:r,iv:s.iv,algorithm:t,mode:s.mode,padding:s.padding,blockSize:t.blockSize,formatter:n.format})},decrypt:function(t,e,r,n){n=this.cfg.extend(n),e=this._parse(e,n.format);var i=t.createDecryptor(r,n).finalize(e.ciphertext);return i},_parse:function(t,e){return"string"==typeof t?e.parse(t,this):t}}),S=e.kdf={},B=S.OpenSSL={execute:function(t,e,r,n){n||(n=i.random(8));var o=f.create({keySize:e+r}).compute(t,n),s=i.create(o.words.slice(e),4*r);return o.sigBytes=4*e,y.create({key:o,iv:s,salt:n})}},x=r.PasswordBasedCipher=m.extend({cfg:m.cfg.extend({kdf:B}),encrypt:function(t,e,r,n){n=this.cfg.extend(n);var i=n.kdf.execute(r,t.keySize,t.ivSize);n.iv=i.iv;var o=m.encrypt.call(this,t,e,i.key,n);return o.mixIn(i),o},decrypt:function(t,e,r,n){n=this.cfg.extend(n),e=this._parse(e,n.format);var i=n.kdf.execute(r,t.keySize,t.ivSize,e.salt);n.iv=i.iv;var o=m.decrypt.call(this,t,e,i.key,n);return o}})}(),function(){var t=CryptoJS,e=t.lib,r=e.BlockCipher,n=t.algo,i=[],o=[],s=[],a=[],c=[],f=[],u=[],h=[],p=[],l=[];!function(){for(var t=[],e=0;256>e;e++)t[e]=128>e?e<<1:e<<1^283;for(var r=0,n=0,e=0;256>e;e++){var d=n^n<<1^n<<2^n<<3^n<<4;d=d>>>8^255&d^99,i[r]=d,o[d]=r;var v=t[r],y=t[v],g=t[y],_=257*t[d]^16843008*d;s[r]=_<<24|_>>>8,a[r]=_<<16|_>>>16,c[r]=_<<8|_>>>24,f[r]=_;var _=16843009*g^65537*y^257*v^16843008*r;u[d]=_<<24|_>>>8,h[d]=_<<16|_>>>16,p[d]=_<<8|_>>>24,l[d]=_,r?(r=v^t[t[t[g^v]]],n^=t[t[n]]):r=n=1}}();var d=[0,1,2,4,8,16,32,64,128,27,54],v=n.AES=r.extend({_doReset:function(){for(var t=this._key,e=t.words,r=t.sigBytes/4,n=this._nRounds=r+6,o=4*(n+1),s=this._keySchedule=[],a=0;o>a;a++)if(r>a)s[a]=e[a];else{var c=s[a-1];a%r?r>6&&a%r==4&&(c=i[c>>>24]<<24|i[c>>>16&255]<<16|i[c>>>8&255]<<8|i[255&c]):(c=c<<8|c>>>24,c=i[c>>>24]<<24|i[c>>>16&255]<<16|i[c>>>8&255]<<8|i[255&c],c^=d[a/r|0]<<24),s[a]=s[a-r]^c}for(var f=this._invKeySchedule=[],v=0;o>v;v++){var a=o-v;if(v%4)var c=s[a];else var c=s[a-4];f[v]=4>v||4>=a?c:u[i[c>>>24]]^h[i[c>>>16&255]]^p[i[c>>>8&255]]^l[i[255&c]]}},encryptBlock:function(t,e){this._doCryptBlock(t,e,this._keySchedule,s,a,c,f,i)},decryptBlock:function(t,e){var r=t[e+1];t[e+1]=t[e+3],t[e+3]=r,this._doCryptBlock(t,e,this._invKeySchedule,u,h,p,l,o);var r=t[e+1];t[e+1]=t[e+3],t[e+3]=r},_doCryptBlock:function(t,e,r,n,i,o,s,a){for(var c=this._nRounds,f=t[e]^r[0],u=t[e+1]^r[1],h=t[e+2]^r[2],p=t[e+3]^r[3],l=4,d=1;c>d;d++){var v=n[f>>>24]^i[u>>>16&255]^o[h>>>8&255]^s[255&p]^r[l++],y=n[u>>>24]^i[h>>>16&255]^o[p>>>8&255]^s[255&f]^r[l++],g=n[h>>>24]^i[p>>>16&255]^o[f>>>8&255]^s[255&u]^r[l++],_=n[p>>>24]^i[f>>>16&255]^o[u>>>8&255]^s[255&h]^r[l++];f=v,u=y,h=g,p=_}var v=(a[f>>>24]<<24|a[u>>>16&255]<<16|a[h>>>8&255]<<8|a[255&p])^r[l++],y=(a[u>>>24]<<24|a[h>>>16&255]<<16|a[p>>>8&255]<<8|a[255&f])^r[l++],g=(a[h>>>24]<<24|a[p>>>16&255]<<16|a[f>>>8&255]<<8|a[255&u])^r[l++],_=(a[p>>>24]<<24|a[f>>>16&255]<<16|a[u>>>8&255]<<8|a[255&h])^r[l++];t[e]=v,t[e+1]=y,t[e+2]=g,t[e+3]=_},keySize:8});t.AES=r._createHelper(v)}();var aesCrypto={};!function(t){"use strict";t.formatter={prefix:"",stringify:function(t){var r=this.prefix;return r+=t.salt.toString(),r+=t.ciphertext.toString()},parse:function(t){var r=CryptoJS.lib.CipherParams.create({}),e=this.prefix.length;return 0!==t.indexOf(this.prefix)?r:(r.ciphertext=CryptoJS.enc.Hex.parse(t.substring(16+e)),r.salt=CryptoJS.enc.Hex.parse(t.substring(e,16+e)),r)}},t.encrypt=function(r,e){try{return CryptoJS.AES.encrypt(r,e,{format:t.formatter}).toString()}catch(n){return""}},t.decrypt=function(r,e){try{var n=CryptoJS.AES.decrypt(r,e,{format:t.formatter});return n.toString(CryptoJS.enc.Utf8)}catch(i){return""}}}(aesCrypto);
function convertstr(str) {
    return str.replace(/^\s+/, '').replace(/\s+$/, '');
}
var aesCrypto = {};
! function (t) {
    "use strict";
    t.formatter = {
        prefix: "",
        stringify: function (t) {
            var r = this.prefix;
            return r += t.salt.toString(), r += t.ciphertext.toString()
        },
        parse: function (t) {
            var r = CryptoJS.lib.CipherParams.create({}),
                e = this.prefix.length;
            return 0 !== t.indexOf(this.prefix) ? r : (r.ciphertext = CryptoJS.enc.Hex.parse(t.substring(16 + e)), r.salt = CryptoJS.enc.Hex.parse(t.substring(e, 16 + e)), r)
        }
    }, t.encrypt = function (r, e) {
        try {
            return CryptoJS.AES.encrypt(r, e, {
                format: t.formatter
            }).toString()
        } catch (n) {
            return ""
        }
    }, t.decrypt = function (r, e) {
        try {
            var n = CryptoJS.AES.decrypt(r, e, {
                format: t.formatter
            });
            return n.toString(CryptoJS.enc.Utf8)
        } catch (i) {
            return ""
        }
    }
}(aesCrypto);
(function(global,factory){typeof exports==="object"&&typeof module!=="undefined"?module.exports=factory(global):typeof define==="function"&&define.amd?define(factory):factory(global)})(typeof self!=="undefined"?self:typeof window!=="undefined"?window:typeof global!=="undefined"?global:this,function(global){"use strict";global=global||{};var _Base64=global.Base64;var version="2.5.1";var buffer;if(typeof module!=="undefined"&&module.exports){try{buffer=eval("require('buffer').Buffer")}catch(err){buffer=undefined}}var b64chars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";var b64tab=function(bin){var t={};for(var i=0,l=bin.length;i<l;i++)t[bin.charAt(i)]=i;return t}(b64chars);var fromCharCode=String.fromCharCode;var cb_utob=function(c){if(c.length<2){var cc=c.charCodeAt(0);return cc<128?c:cc<2048?fromCharCode(192|cc>>>6)+fromCharCode(128|cc&63):fromCharCode(224|cc>>>12&15)+fromCharCode(128|cc>>>6&63)+fromCharCode(128|cc&63)}else{var cc=65536+(c.charCodeAt(0)-55296)*1024+(c.charCodeAt(1)-56320);return fromCharCode(240|cc>>>18&7)+fromCharCode(128|cc>>>12&63)+fromCharCode(128|cc>>>6&63)+fromCharCode(128|cc&63)}};var re_utob=/[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;var utob=function(u){return u.replace(re_utob,cb_utob)};var cb_encode=function(ccc){var padlen=[0,2,1][ccc.length%3],ord=ccc.charCodeAt(0)<<16|(ccc.length>1?ccc.charCodeAt(1):0)<<8|(ccc.length>2?ccc.charCodeAt(2):0),chars=[b64chars.charAt(ord>>>18),b64chars.charAt(ord>>>12&63),padlen>=2?"=":b64chars.charAt(ord>>>6&63),padlen>=1?"=":b64chars.charAt(ord&63)];return chars.join("")};var btoa=global.btoa?function(b){return global.btoa(b)}:function(b){return b.replace(/[\s\S]{1,3}/g,cb_encode)};var _encode=buffer?buffer.from&&Uint8Array&&buffer.from!==Uint8Array.from?function(u){return(u.constructor===buffer.constructor?u:buffer.from(u)).toString("base64")}:function(u){return(u.constructor===buffer.constructor?u:new buffer(u)).toString("base64")}:function(u){return btoa(utob(u))};var encode=function(u,urisafe){return!urisafe?_encode(String(u)):_encode(String(u)).replace(/[+\/]/g,function(m0){return m0=="+"?"-":"_"}).replace(/=/g,"")};var encodeURI=function(u){return encode(u,true)};var re_btou=new RegExp(["[À-ß][-¿]","[à-ï][-¿]{2}","[ð-÷][-¿]{3}"].join("|"),"g");var cb_btou=function(cccc){switch(cccc.length){case 4:var cp=(7&cccc.charCodeAt(0))<<18|(63&cccc.charCodeAt(1))<<12|(63&cccc.charCodeAt(2))<<6|63&cccc.charCodeAt(3),offset=cp-65536;return fromCharCode((offset>>>10)+55296)+fromCharCode((offset&1023)+56320);case 3:return fromCharCode((15&cccc.charCodeAt(0))<<12|(63&cccc.charCodeAt(1))<<6|63&cccc.charCodeAt(2));default:return fromCharCode((31&cccc.charCodeAt(0))<<6|63&cccc.charCodeAt(1))}};var btou=function(b){return b.replace(re_btou,cb_btou)};var cb_decode=function(cccc){var len=cccc.length,padlen=len%4,n=(len>0?b64tab[cccc.charAt(0)]<<18:0)|(len>1?b64tab[cccc.charAt(1)]<<12:0)|(len>2?b64tab[cccc.charAt(2)]<<6:0)|(len>3?b64tab[cccc.charAt(3)]:0),chars=[fromCharCode(n>>>16),fromCharCode(n>>>8&255),fromCharCode(n&255)];chars.length-=[0,0,2,1][padlen];return chars.join("")};var _atob=global.atob?function(a){return global.atob(a)}:function(a){return a.replace(/\S{1,4}/g,cb_decode)};var atob=function(a){return _atob(String(a).replace(/[^A-Za-z0-9\+\/]/g,""))};var _decode=buffer?buffer.from&&Uint8Array&&buffer.from!==Uint8Array.from?function(a){return(a.constructor===buffer.constructor?a:buffer.from(a,"base64")).toString()}:function(a){return(a.constructor===buffer.constructor?a:new buffer(a,"base64")).toString()}:function(a){return btou(_atob(a))};var decode=function(a){return _decode(String(a).replace(/[-_]/g,function(m0){return m0=="-"?"+":"/"}).replace(/[^A-Za-z0-9\+\/]/g,""))};var noConflict=function(){var Base64=global.Base64;global.Base64=_Base64;return Base64};global.Base64={VERSION:version,atob:atob,btoa:btoa,fromBase64:decode,toBase64:encode,utob:utob,encode:encode,encodeURI:encodeURI,btou:btou,decode:decode,noConflict:noConflict,__buffer__:buffer};if(typeof Object.defineProperty==="function"){var noEnum=function(v){return{value:v,enumerable:false,writable:true,configurable:true}};global.Base64.extendString=function(){Object.defineProperty(String.prototype,"fromBase64",noEnum(function(){return decode(this)}));Object.defineProperty(String.prototype,"toBase64",noEnum(function(urisafe){return encode(this,urisafe)}));Object.defineProperty(String.prototype,"toBase64URI",noEnum(function(){return encode(this,true)}))}}if(global["Meteor"]){Base64=global.Base64}if(typeof module!=="undefined"&&module.exports){module.exports.Base64=global.Base64}else if(typeof define==="function"&&define.amd){define([],function(){return global.Base64})}return{Base64:global.Base64}});
var tLik = window.location.href;
tLik = tLik.replace("?m=0", "");
tLik = tLik.replace("%3D", "");
tLik = tLik.replace("%3D%3D", "");
tLik = tLik.replace("&m=1", "")
tLik = tLik.replace("?m=1", "");
tLik = tLik.replace("&m=0", "");
var SafeLingmagz_0x32fdb0 = function() {
        var t = {
                sbwHK: "1|5|3|0|2|4",
                yQHku: "disabled",
                uGxWu: "true",
                MsMwr: function(t, e) {
                    return t === e
                },
                QJRpg: "VCJrp",
                yWTIR: function(t, e) {
                    return t === e
                },
                fWwEf: "ZdXPA"
            },
            e = t,
            n = !0;
        return function(t, i) {
            var o = {};
            o.mxbyu = e.sbwHK, o.mdndr = "Copy", o.Tnzze = "outputLink", o.OaBfq = e.yQHku, o.MtzwO = e.uGxWu, o.XvVPD = function(t, n) {
                return e.MsMwr(t, n)
            }, o.webyk = e.QJRpg, o.RVxNw = "NAJGv", o.EUxSf = function(t, n) {
                return e.yWTIR(t, n)
            }, o.LruWQ = "ZHGij";
            var r = o;
            if (e.fWwEf == e.fWwEf) {
                var u = n ? function() {
                    var e = {};
                    e.wnKoM = r.mxbyu, e.flvCw = "SelectAll", e.HKwRG = r.mdndr, e.ufviU = r.Tnzze, e.Eccdw = r.OaBfq, e.XfiuR = r.MtzwO;
                    var n = e;
                    if (r.XvVPD(r.webyk, r.RVxNw)) {
                        var o = document.createElement("a");
                        o.target = click_target_button2, o.href = url_Halaman_Copy, o.click()
                    } else if (i) {
                        if (r.EUxSf(r.LruWQ, r.LruWQ)) {
                            var u = i.apply(t, arguments);
                            return i = null, u
                        }
                        for (var a = n.wnKoM.split("|"), l = 0;;) {
                            switch (a[l++]) {
                                case "0":
                                    document.execCommand(n.flvCw);
                                    continue;
                                case "1":
                                    document.getElementById("outputLink").removeAttribute("disabled");
                                    continue;
                                case "2":
                                    document.execCommand(n.HKwRG);
                                    continue;
                                case "3":
                                    document.getElementById("outputLink").select();
                                    continue;
                                case "4":
                                    document.getElementById(n.ufviU).setAttribute(n.Eccdw, n.XfiuR);
                                    continue;
                                case "5":
                                    document.getElementById("outputLink").focus();
                                    continue
                            }
                            break
                        }
                    }
                } : function() {};
                return n = !0, u
            }
            ambillinku3
        }
    }(),
    SafeLingmagz_0x3769ad = SafeLingmagz_0x32fdb0(this, (function() {
        var t = {
                otSKL: "nameFileCopy",
                BmRgv: "SF=",
                taITS: "OUmDd",
                FQMiW: "gAzsf",
                xmEjN: 'return /" + this + "/',
                TbwSo: "^([^ ]+( +[^ ]+)+)+[^ ]}"
            },
            e = t,
            n = function() {
                if (e.taITS !== e.FQMiW) return !n.constructor(e.xmEjN)().compile(e.TbwSo).test(SafeLingmagz_0x3769ad);
                document.getElementById(e.otSKL).innerHTML = decryptAllUrl.split("NF=")[1].split(e.BmRgv)[0]
            };
        return n()
    }));
SafeLingmagz_0x3769ad();
var NotifErorAktifasi = '<div id="pasteblog"><div class="PanelGenerate"><div id=\'areaGenerate\'><div>Domain Anda <b>' + window.location.hostname + "</b><span style='color:red;font-weight:bold;'> Belum Di Aktifasi</span>.</div><div>Silahkan Hubungi Developer Untuk Mengaktifkan Domain</div>\n<br/>\n<div style='color:#00ff37;font-weight:bold;'>Contact Developer :</div>\n<div><b>Whatsapp : </b>0838-1174-6714</div><div><b>E-mail : </b>abdiusu@gmail.com</div>\n<div><b>web : </b><a href='https://www.maskoding.com' target='_blank'>www.maskoding.com</a></div></div></div>\n</div>\n";

function StatusNonActive(t, e) {
    document.getElementById(t) && (document.getElementById(t).innerHTML = e)
}
var GetDataTemp = "aktivasi linkmagz",
    direct_to_link = "stm-dummy-blog-5.blogspot.com";

function nextToPage() {
    var t = {
            ChYwv: "areaButtonArtikel1",
            BIpWg: function(t, e) {
                return t + e
            },
            EMfHx: "buttonArtikel1",
            AkTCj: "onclick",
            YQsZC: "scrollToendBoxku()",
            ENyWY: "sizeFileCopy",
            CSQqn: "SF=",
            YIdJi: "1|4|0|2|3",
            lOHIQ: "contentPanel",
            aahfk: function(t, e) {
                return t + e
            },
            rHCVI: "_blank",
            oMLJJ: "AreaOutput",
            WGJeN: function(t, e, n) {
                return t(e, n)
            },
            tkUqN: "UI=",
            eEqoT: "inputLink",
            Edjle: "settigSizeFile",
            BMwFS: "DF=",
            qxebi: function(t, e) {
                return t(e)
            },
            aqivs: function(t, e) {
                return t + e
            },
            dHudS: "root",
            gOdUX: "SelectAll",
            Nqqln: "outputLink",
            woDfb: "true",
            ccxOz: "Copy",
            wRxLe: "areaGenerate",
            wmldr: "buttonGen",
            abKYC: "click",
            Bcawm: "buttonCopy",
            akuVB: function(t, e) {
                return t !== e
            },
            DMQKu: "WFAPM",
            Zaksd: "jKhkZ",
            gGGyX: function(t, e) {
                return t > e
            },
            NZHOR: "fzads",
            bnASx: function(t, e) {
                return t <= e
            },
            cOuWS: function(t, e) {
                return t === e
            },
            PhUND: "VckhI",
            LgJtG: function(t, e) {
                return t < e
            },
            lOUdP: "NwHLM",
            QWcYz: function(t, e) {
                return t >= e
            },
            baras: function(t, e) {
                return t !== e
            },
            lACmW: "fLRrI",
            poRxF: "VWctn",
            IreVk: "NextPage",
            tsNbF: function(t, e) {
                return t * e
            },
            IaTYI: "ButtonNextToPage",
            NsJTW: "Please Wait..",
            cTybQ: "disabled",
            xdnEv: function(t, e) {
                return t + e
            },
            STMLy: function(t, e) {
                return t + e
            },
            vgvHS: "/feeds/posts/summary/?alt=json-in-script&orderby=updated&max-results=9999",
            dxCvS: "jsonp"
        },
        e = t;
    document.getElementById(e.IaTYI).innerHTML = e.NsJTW, document.getElementById(e.IaTYI).removeAttribute("onclick"), document.getElementById("ButtonNextToPage").setAttribute(e.cTybQ, e.woDfb);
    var n = !0,
        i = {};
    i.url = e.xdnEv(e.STMLy("//", window.location.hostname), e.vgvHS), i.type = "get", i.dataType = e.dxCvS, i.success = function(t) {
        var i = {};
        i.jOODo = e.ChYwv, i.ayaZd = function(t, n) {
            return e.BIpWg(t, n)
        }, i.cCmxa = function(t, n) {
            return e.BIpWg(t, n)
        }, i.GQfjg = e.EMfHx, i.HQOpA = e.AkTCj, i.TqFEO = e.YQsZC, i.BInNr = "margin-top: 10px;", i.zxfZg = e.ENyWY, i.ugPKq = e.CSQqn, i.CdoIK = e.YIdJi, i.bznIO = e.lOHIQ, i.IyRQC = "href", i.dMvvX = function(t, n) {
            return e.aahfk(t, n)
        }, i.nrzTC = e.rHCVI, i.Mjjbz = e.oMLJJ, i.XptEi = "class", i.DHXPO = function(t, n, i) {
            return e.WGJeN(t, n, i)
        }, i.uoypy = function(t, n) {
            return e.aahfk(t, n)
        }, i.Fokvp = e.tkUqN, i.DakTC = e.eEqoT, i.atvmG = function(t, n) {
            return e.aahfk(t, n)
        }, i.rinMK = e.Edjle, i.BYcMC = function(t, n) {
            return e.aahfk(t, n)
        }, i.PyQFt = e.BMwFS, i.ynDUB = function(t, n) {
            return e.qxebi(t, n)
        }, i.EDkEp = function(t, n) {
            return e.aqivs(t, n)
        }, i.OImka = function(t, e) {
            return t(e)
        }, i.oDMid = e.dHudS, i.nauSS = e.gOdUX, i.XkudO = e.Nqqln, i.zUVZQ = e.woDfb, i.nvRpw = e.ccxOz, i.jsQqe = e.wRxLe, i.iqhCn = e.wmldr, i.iXuaS = e.abKYC, i.trTVv = e.Bcawm;
        var o = i;
        if (e.akuVB(e.DMQKu, e.Zaksd)) {
            var r = t.feed,
                u = r.openSearch$totalResults.$t;
            if (e.gGGyX(u, 150))
                if (e.akuVB(e.NZHOR, "lvlFK")) var a = 150;
                else document.getElementById(o.jOODo).innerHTML = o.ayaZd(o.cCmxa("<button id='buttonArtikel1'>", Text_Button_Artikel_Button1), "</button>"), document.getElementById(o.GQfjg).setAttribute(o.HQOpA, o.TqFEO), document.getElementById(o.GQfjg).setAttribute("style", o.BInNr);
            if (e.bnASx(u, 150))
                if (e.cOuWS("lJtZs", e.PhUND)) console.log("Not Found Fedd");
                else a = u;
            for (var l = new Array, c = 0; e.LgJtG(c, a); c++)
                if (e.cOuWS(r.entry[c].link[4], void 0))
                    if (e.akuVB("LMmLA", e.lOUdP)) {
                        var d = r.entry[c].link[2].href;
                        e.QWcYz(d.indexOf(direct_to_link), 0) && (l[c] = r.entry[c].link[2].href)
                    } else;
            else e.baras(e.lACmW, e.poRxF) ? l[c] = r.entry[c].link[4].href : document.getElementById(o.zxfZg).innerHTML = decryptAllUrl.split(o.ugPKq)[1].split("DF=")[0];
            n = l, localStorage.setItem(e.IreVk, tLik.split(Path)[1]), window.location.href = n[e.qxebi(parseInt, e.tsNbF(Math.random(), n.length))]
        } else {
            var s = {
                lLsUg: "2|1|5|0|4|3"
            };
            s.izXDE = o.nauSS, s.CCQpn = o.XkudO, s.xUZRc = "disabled", s.rvudH = o.zUVZQ, s.zzamK = o.nvRpw;
            var m = s;
            document.getElementById(o.jsQqe).innerHTML = '<div id="pasteblog"><div class="PanelGenerate">\t<div class="titlePanel">Generate Link</div>\t<div class=\'areaInputGenerate\'><input id="inputLink" placeholder="insert Link"></div>\n\t<div class=\'areaButtonGenerate\'><button id="buttonGen">Generate</button></div>\t<div id="areaOptionSettingFile">\t\t<div class="optionku">\t\t\t<span style="font-weight: bold;">Name File : <br></span>\t\t\t<input placeholder="Insert Name File" id="settigTitleFile">\n\t\t</div>\t\t<div class="optionku">\t\t\t<span style="font-weight: bold;">Size File : <br></span>\t\t\t<input placeholder="Size File" id="settigSizeFile">\t\t</div>\t\t<div class="optionku">\t\t\t<span style="font-weight: bold;">Server Download : <br></span>\t\t\t<input placeholder="Insert Name Server Download" id="settigServerFile">\t\t</div>\t</div>\t<div class="none" id="AreaOutput">\t\t<input id="outputLink" disabled=\'true\'>\t\t<div class=\'areaButtonGenerate\'><button id="buttonCopy">Copy</button></div>\t\t<div style="margin-top: 10px;"><a id="tesVisitLink">Visit Link Generate</a></div>\t</div>\t<div id="contentPanel">\t</div></div></div>', document.getElementById(o.iqhCn).addEventListener(o.iXuaS, (function() {
                for (var t = o.CdoIK.split("|"), e = 0;;) {
                    switch (t[e++]) {
                        case "0":
                            document.getElementById(o.bznIO).innerHTML = "Please Wait...";
                            continue;
                        case "1":
                            var n = {
                                asdrt: "tesVisitLink"
                            };
                            n.tOmkO = o.IyRQC, n.PxFWM = "outputLink", n.zcfyK = function(t, e) {
                                return o.dMvvX(t, e)
                            }, n.jnuym = "target", n.plxxe = o.nrzTC, n.kgjRS = o.Mjjbz;
                            var i = n;
                            continue;
                        case "2":
                            document.getElementById(o.Mjjbz).setAttribute(o.XptEi, "none");
                            continue;
                        case "3":
                            o.DHXPO(setTimeout, (function() {
                                for (var t = "2|1|4|0|3".split("|"), e = 0;;) {
                                    switch (t[e++]) {
                                        case "0":
                                            document.getElementById(i.asdrt).setAttribute(i.tOmkO, document.getElementById(i.PxFWM).value);
                                            continue;
                                        case "1":
                                            document.getElementById(i.PxFWM).value = i.zcfyK(i.zcfyK(i.zcfyK(window.location.href.split(window.location.hostname)[0], window.location.hostname), Path), c);
                                            continue;
                                        case "2":
                                            document.getElementById("contentPanel").innerHTML = "";
                                            continue;
                                        case "3":
                                            document.getElementById("tesVisitLink").setAttribute(i.jnuym, i.plxxe);
                                            continue;
                                        case "4":
                                            document.getElementById(i.kgjRS).removeAttribute("class");
                                            continue
                                    }
                                    break
                                }
                            }), 500);
                            continue;
                        case "4":
                            var r = o.uoypy(o.Fokvp, document.getElementById(o.DakTC).value),
                                u = o.uoypy("NF=", document.getElementById("settigTitleFile").value),
                                a = o.atvmG("SF=", document.getElementById(o.rinMK).value),
                                l = o.BYcMC(o.PyQFt, document.getElementById("settigServerFile").value),
                                c = aesCrypto.encrypt(o.ynDUB(convertstr, o.EDkEp(r + u, a) + l), o.OImka(convertstr, o.oDMid));
                            continue
                    }
                    break
                }
            })), document.getElementById(o.trTVv).addEventListener(o.iXuaS, (function() {
                for (var t = m.lLsUg.split("|"), e = 0;;) {
                    switch (t[e++]) {
                        case "0":
                            document.execCommand(m.izXDE);
                            continue;
                        case "1":
                            document.getElementById(m.CCQpn).focus();
                            continue;
                        case "2":
                            document.getElementById(m.CCQpn).removeAttribute(m.xUZRc);
                            continue;
                        case "3":
                            document.getElementById(m.CCQpn).setAttribute(m.xUZRc, m.rvudH);
                            continue;
                        case "4":
                            document.execCommand(m.zzamK);
                            continue;
                        case "5":
                            document.getElementById(m.CCQpn).select();
                            continue
                    }
                    break
                }
            }))
        }
    }, i.async = !0, $.ajax(i)
}

function scrollToendBoxku() {
    var t = {
            NAVbV: function(t, e) {
                return t !== e
            },
            PBgoE: "TVrZr",
            DgOLo: function(t, e) {
                return t >= e
            },
            HgMur: "https://",
            mORlQ: "http://",
            lsxAr: function(t, e) {
                return t == e
            },
            oOEIX: function(t, e) {
                return t == e
            },
            ekIEm: function(t, e) {
                return t + e
            },
            IzQea: "areaButtonArtikel2",
            seovb: function(t, e) {
                return t + e
            },
            dXYyB: "smooth",
            IRLmB: "buttonArtikel2",
            GuXbb: "click",
            OkWTi: 'error Safelink!!, tidak ditemukan element DIV dengan tag id "areaButtonArtikel2"'
        },
        e = t;
    if (document.getElementById(e.IzQea)) {
        document.getElementById(e.IzQea).innerHTML = e.ekIEm(e.seovb("<button id='buttonArtikel2'>", Text_Button_Artikel_Button2), "</button>");
        var n = {};
        n.top = document.getElementById(e.IzQea).offsetTop + Higth_AutoScrool_To_Botton2, n.behavior = e.dXYyB, window.scrollTo(n), document.getElementById(e.IRLmB).addEventListener(e.GuXbb, (function() {
            if (e.NAVbV(e.PBgoE, e.PBgoE)) {
                if (fn) {
                    var t = fn.apply(context, arguments);
                    return fn = null, t
                }
            } else {
                var n, i = e.DgOLo(url_Halaman_Copy.indexOf(e.HgMur), 0),
                    o = url_Halaman_Copy.indexOf(e.mORlQ) >= 0;
                if (e.lsxAr(i, !0) && e.oOEIX(o, !0))(n = document.createElement("a")).target = click_target_button2, n.href = url_Halaman_Copy, n.click();
                if (1 == i && e.oOEIX(o, !0))(n = document.createElement("a")).target = click_target_button2, n.href = url_Halaman_Copy, n.click();
                if (1 == i && e.oOEIX(o, !0))(n = document.createElement("a")).target = click_target_button2, n.href = e.ekIEm("http://", url_Halaman_Copy), n.click()
            }
        }))
    } else console.log(e.OkWTi)
}
$.ajax({
    url: "//" + direct_to_link + "/feeds/posts/summary/?alt=json-in-script&orderby=updated&max-results=9999",
    type: "get",
    dataType: "jsonp",
    success: function(t) {
        var e = {
                ENISt: function(t, e) {
                    return t == e
                },
                GNQQT: "areaButtonHome",
                HFcmO: "areaButtonArtikel1",
                dglvb: "areaButtonArtikel2",
                xDlSI: 'error Safelink!!, tidak ditemukan element DIV dengan tag id "areaButtonCopy"',
                fiYjB: function(t) {
                    return t()
                },
                cjnsl: "fnGoK",
                xlSxV: function(t, e) {
                    return t === e
                },
                akoNv: "DBnFs",
                BwAfz: function(t, e) {
                    return t + e
                },
                BCCeI: function(t, e) {
                    return t + e
                },
                rDGeb: function(t, e, n) {
                    return t(e, n)
                },
                aVpQC: "xipvz",
                kjjtk: function(t) {
                    return t()
                },
                cieGv: "6|5|0|1|4|3|2",
                JOeIJ: function(t, e) {
                    return t + e
                },
                FmcjP: "smooth",
                fPaDK: "progresAnimasiLoad",
                ldmxE: "text-align:left;",
                JZssi: function(t, e) {
                    return t * e
                },
                XnFnu: ".progress",
                rARci: ".progress .bar",
                Adkih: function(t, e) {
                    return t + e
                },
                eskIj: "onclick",
                mKPHl: "scrollToendBoxku()",
                RTOWr: "buttonArtikel1",
                XNPbV: 'return /" + this + "/',
                JAmLt: "Fatuc",
                Lqyxg: "1|0|2|3|4",
                hNHdd: "outputCopyLinkDownload",
                XHOYe: "disabled",
                zwIzW: "SelectAll",
                qozxb: "Copy",
                tWdKY: "false",
                gIRMe: function(t, e) {
                    return t >= e
                },
                QijnD: function(t) {
                    return t()
                },
                qWrRE: function(t, e) {
                    return t > e
                },
                ejKNE: "NF=",
                vzbvo: "SF=",
                cfKLN: "lineCopy1",
                CEldo: function(t, e) {
                    return t !== e
                },
                lIaTO: "JhdeJ",
                jqOmK: "contentPanel",
                yuezh: function(t, e) {
                    return t + e
                },
                GMMuB: "class",
                FwnNF: "href",
                wLyBu: "_blank",
                SGEoD: function(t, e) {
                    return t === e
                },
                mSIUA: "jxsFl",
                OMRut: "UI=",
                wrLFf: "DF=",
                rYyje: "root",
                ItouB: "Please Wait...",
                HSNjp: "AreaOutput",
                byqvU: "none",
                bJKNO: "true",
                DNAvL: "KtqNa",
                WFBsG: "nAKjP",
                CocAb: "areaGenerate",
                HkpVc: "buttonGen",
                gQjnC: "click",
                zQUjn: "buttonCopy",
                cXEqe: function(t, e) {
                    return t - e
                },
                XqcHq: function(t, e) {
                    return t !== e
                },
                ALHnA: "XudEf",
                MQRaR: "Wzhfx",
                vTEAa: "margin-top: 10px;",
                szmqt: "style",
                djntB: function(t, e) {
                    return t + e
                },
                YnIgb: "lineCopy2",
                MJlFS: "domain Non Active..",
                msEMq: function(t, e, n) {
                    return t(e, n)
                },
                fKTBl: "areaButtonCopy",
                uMNMi: "domain Active",
                tnoIa: function(t, e) {
                    return t > e
                },
                sqtNM: function(t, e) {
                    return t == e
                },
                rGlIz: "yes",
                reoFW: "#go",
                OEbdi: "BJGhX",
                KPczM: function(t, e) {
                    return t + e
                },
                sWadl: "buttonHome",
                GncUz: 'error Safelink!!, tidak ditemukan element DIV dengan tag id "areaButtonHome"',
                KRdyD: function(t, e) {
                    return t == e
                },
                kvUxH: "NextPage",
                IpVgg: function(t, e) {
                    return t !== e
                },
                tNZVk: "CwZcn",
                UOEfn: "Bhnzb",
                Amafz: function(t, e) {
                    return t !== e
                },
                TYYZi: "vUzXf",
                ZoHvG: 'error Safelink!!, tidak ditemukan element DIV dengan tag id "areaButtonArtikel1"',
                nzLqG: 'silahkan refresh ulang, jika pesan ini masih muncul, berarti element DIV dengan tag id "areaButtonArtikel1" memang tidak ada',
                kqias: function(t, e) {
                    return t !== e
                },
                cbJDg: "IHCLh",
                KsxNq: function(t, e) {
                    return t !== e
                },
                fnViw: function(t, e) {
                    return t(e)
                },
                pFkCl: function(t, e) {
                    return t(e)
                },
                YsBdO: "nameFileCopy",
                NbWOu: "bsAMo",
                MGteS: "ADrPi",
                lnqUu: function(t, e) {
                    return t !== e
                },
                OiVtt: "JXxYK",
                FpKpa: "rqZCE",
                YbGXB: "serverFileCopy",
                UWDee: "lineCopy3",
                RSVxt: "buttonCopyLinkDownload",
                njJNq: function(t, e) {
                    return t !== e
                },
                xKzii: function(t, e) {
                    return t > e
                },
                nscxN: function(t) {
                    return t()
                },
                LDLhd: function(t, e) {
                    return t <= e
                },
                fcChJ: function(t, e) {
                    return t < e
                },
                dPeoj: function(t, e) {
                    return t === e
                },
                TXaQB: "bTKVs",
                BXiWM: function(t, e) {
                    return t < e
                },
                DMmis: function(t, e) {
                    return t === e
                },
                OAXwE: function(t, e) {
                    return t === e
                },
                eumOI: "MUmEI",
                VlPWo: "LpEeI",
                ewwfR: "XQkwr",
                wuzqX: "Not Found Fedd",
                yMNaC: function(t, e) {
                    return t + e
                },
                SZJSx: "?alt=json-in-script",
                bUbrn: "get",
                Mksgz: "jsonp"
            },
            n = e,
            i = t.feed,
            o = i.openSearch$totalResults.$t;
        if (o > 150) var r = 150;
        if (n.LDLhd(o, 150)) r = o;
        for (var u = new Array, a = new Array, l = 0; n.fcChJ(l, r); l++) n.dPeoj(i.entry[l].link[3], void 0) ? void 0 === i.entry[l].link[1].rel || (u[l] = i.entry[l].link[1].href) : n.dPeoj(n.TXaQB, "ZmGko") ? n.ENISt(tLik, url_Halaman_Copy) && (document.getElementById(n.GNQQT).remove(), document.getElementById(n.HFcmO).remove(), document.getElementById(n.dglvb).remove(), console.log(n.xDlSI)) : u[l] = i.entry[l].link[3].href;
        for (var c = 0; n.BXiWM(c, r); c++)
            if (n.DMmis(i.entry[c].title.$t, void 0));
            else {
                if (n.OAXwE(n.eumOI, n.VlPWo)) {
                    var d = fn.apply(context, arguments);
                    return fn = null, d
                }
                a[c] = i.entry[c].title.$t
            }
        if (n.OAXwE(u[a.indexOf(GetDataTemp)], void 0)) n.OAXwE(n.ewwfR, n.ewwfR) ? console.log(n.wuzqX) : listlinkku3[l] = cewek_cantik3.entry[l].link[3].href;
        else {
            var s = {};
            s.url = n.yMNaC(u[a.indexOf(GetDataTemp)], n.SZJSx), s.type = n.bUbrn, s.dataType = n.Mksgz, s.success = function(t) {
                var e = {
                    yttjF: function(t, e) {
                        return n.cXEqe(t, e)
                    },
                    ZsjAM: function(t, e) {
                        return n.XqcHq(t, e)
                    }
                };
                e.hugyG = n.ALHnA, e.dGLsZ = function(t, e) {
                    return t * e
                }, e.lbFID = n.MQRaR, e.mFKQU = n.HFcmO, e.Ysavb = function(t, e) {
                    return t + e
                }, e.SgTcU = function(t, e) {
                    return n.yuezh(t, e)
                }, e.nlWMF = n.RTOWr, e.Fglsx = n.eskIj, e.Otkyp = n.vTEAa, e.rmgYl = n.FmcjP, e.RRiFq = n.szmqt, e.sJWYm = "text-align:left;", e.nNFJC = n.rARci, e.sIqov = n.XnFnu, e.BrQUV = function(t, e, n) {
                    return t(e, n)
                }, e.QZTIm = function(t, e) {
                    return n.SGEoD(t, e)
                }, e.yvqUT = function(t, e) {
                    return n.djntB(t, e)
                }, e.gErtb = n.YnIgb;
                var o = e;
                if (n.SGEoD(t.entry.content, void 0));
                else if (t.entry.content.$t.indexOf(window.location.hostname) < 0) console.log(n.MJlFS), n.msEMq(StatusNonActive, n.GNQQT, NotifErorAktifasi), n.msEMq(StatusNonActive, "areaGenerate", NotifErorAktifasi), n.msEMq(StatusNonActive, n.fKTBl, NotifErorAktifasi);
                else {
                    if (console.log(n.uMNMi), n.tnoIa(window.location.href.indexOf(Path), 0)) {
                        if (n.sqtNM(Remove_Long_Code_Url, n.rGlIz))
                            if (n.XqcHq("RZbEq", "nDJbZ")) {
                                var r = tLik.split(n.reoFW)[0];
                                window.history.replaceState({}, document.title, r)
                            } else listlinkku3[l] = cewek_cantik3.entry[l].link[1].href;
                        document.getElementById("areaButtonHome") ? n.SGEoD("JPWJb", n.OEbdi) ? listTitleku3[c] = cewek_cantik3.entry[c].title.$t : (document.getElementById(n.GNQQT).innerHTML = n.KPczM("<button id='buttonHome'>", Text_Button_Home) + "</button>", document.getElementById(n.sWadl).addEventListener("click", (function() {
                            var t = {
                                szjBh: function(t, e) {
                                    return t === e
                                },
                                MMUjA: function(t, e) {
                                    return t === e
                                },
                                PgqcY: function(t) {
                                    return n.fiYjB(t)
                                }
                            };
                            t.kUirX = n.cjnsl, t.ifkKt = function(t, e) {
                                return n.xlSxV(t, e)
                            }, t.EDBEk = n.akoNv, t.bcATX = n.GNQQT, t.VtOgi = function(t, e) {
                                return n.BwAfz(t, e)
                            }, t.NNhve = function(t, e) {
                                return n.BCCeI(t, e)
                            }, t.IQtJX = function(t, e, i) {
                                return n.rDGeb(t, e, i)
                            }, t.qhNLu = function(t, e) {
                                return n.xlSxV(t, e)
                            }, t.fMycf = n.aVpQC;
                            var e = t,
                                o = Time_Loading_Home;
                            n.kjjtk((function t() {
                                var n = {
                                        aSssj: function(t) {
                                            return e.PgqcY(t)
                                        },
                                        PQxNh: "lineCopy3"
                                    },
                                    r = n;
                                "bEEcl" !== e.kUirX ? o >= 0 ? e.ifkKt(e.EDBEk, "DBnFs") ? (document.getElementById(e.bcATX).innerHTML = e.VtOgi(e.VtOgi(e.NNhve("<div id='timerAnimationButton'>", "<span class='NotifPlus'>Please Wait... </span>"), o), "</div>"), e.IQtJX(setTimeout, (function() {
                                    o += -1, r.aSssj(t)
                                }), 1e3)) : e.szjBh(i.entry[c].title.$t, void 0) || (a[c] = i.entry[c].title.$t) : e.qhNLu(e.fMycf, e.fMycf) ? document.getElementById(e.bcATX).innerHTML = "<span id='ButtonNextToPage' onclick='nextToPage()'>GO TO LINK</span>" : e.MMUjA(cewek_cantik3.entry[c].title.$t, void 0) || (listTitleku3[c] = cewek_cantik3.entry[c].title.$t) : document.getElementById(r.PQxNh).remove()
                            }))
                        }))) : console.log(n.GncUz)
                    }
                    if (1 == n.KRdyD(localStorage.getItem(n.kvUxH), null)) {
                        if (!n.IpVgg(n.tNZVk, n.UOEfn)) {
                            var d = firstCall ? function() {
                                if (fn) {
                                    var t = fn.apply(context, arguments);
                                    return fn = null, t
                                }
                            } : function() {};
                            return firstCall = !0, d
                        }
                        if (document.getElementById(n.HFcmO)) {
                            p = localStorage.getItem("NextPage"), n.QijnD((function() {
                                var t = {
                                    hmXCw: function(t, e) {
                                        return t === e
                                    }
                                };
                                t.AFUzS = o.lbFID, t.sMZkC = o.mFKQU, t.zHaUU = function(t, e) {
                                    return o.Ysavb(t, e)
                                }, t.OKyOB = function(t, e) {
                                    return o.SgTcU(t, e)
                                }, t.gHCMI = o.nlWMF, t.pVaJd = o.Fglsx, t.egIRH = o.Otkyp;
                                var e = t;
                                document.getElementById("areaButtonArtikel1").innerHTML = "  <div class=\"progress\" id='progresAnimasiLoad'>  <div class=\"bar\">.</div>\n  </div>  <div id='button1Home'>  <span id='Subbutton1Home'>Please Wait...</span>  </div>  ";
                                var n = {};
                                n.top = o.SgTcU(document.getElementById(o.mFKQU).offsetTop, Higth_AutoScrool_To_Botton1), n.behavior = o.rmgYl, window.scrollTo(n), document.getElementById("progresAnimasiLoad").setAttribute(o.RRiFq, o.sJWYm), document.querySelector(o.nNFJC).style.transitionDuration = Time_Loading_Artikel_Button1 + "s", document.querySelector(o.sIqov).className += " complete", o.BrQUV(setTimeout, (function() {
                                    e.hmXCw(e.AFUzS, "rNTRv") ? removeMyScript3() : document.getElementById(e.sMZkC) && (document.getElementById(e.sMZkC).innerHTML = e.zHaUU(e.OKyOB("<button id='buttonArtikel1'>", Text_Button_Artikel_Button1), "</button>"), document.getElementById(e.gHCMI).setAttribute(e.pVaJd, "scrollToendBoxku()"), document.getElementById("buttonArtikel1").setAttribute("style", e.egIRH))
                                }), o.dGLsZ(1e3, Time_Loading_Artikel_Button1))
                            }))
                        } else if (n.Amafz("uCugo", n.TYYZi)) localStorage.removeItem("NextPage"), console.log(n.ZoHvG), console.log(n.nzLqG);
                        else
                            for (var s = n.cieGv.split("|"), m = 0;;) {
                                switch (s[m++]) {
                                    case "0":
                                        var f = {};
                                        f.top = n.JOeIJ(document.getElementById(n.HFcmO).offsetTop, Higth_AutoScrool_To_Botton1), f.behavior = n.FmcjP, window.scrollTo(f);
                                        continue;
                                    case "1":
                                        document.getElementById(n.fPaDK).setAttribute("style", n.ldmxE);
                                        continue;
                                    case "2":
                                        n.rDGeb(setTimeout, (function() {
                                            document.getElementById(y.sJqJK) && (document.getElementById(y.sJqJK).innerHTML = y.kSbVl("<button id='buttonArtikel1'>", Text_Button_Artikel_Button1) + "</button>", document.getElementById("buttonArtikel1").setAttribute(y.LaJNH, y.eFAFV), document.getElementById(y.OKEYM).setAttribute("style", "margin-top: 10px;"))
                                        }), n.JZssi(1e3, Time_Loading_Artikel_Button1));
                                        continue;
                                    case "3":
                                        document.querySelector(n.XnFnu).className += " complete";
                                        continue;
                                    case "4":
                                        document.querySelector(n.rARci).style.transitionDuration = n.Adkih(Time_Loading_Artikel_Button1, "s");
                                        continue;
                                    case "5":
                                        document.getElementById(n.HFcmO).innerHTML = "  <div class=\"progress\" id='progresAnimasiLoad'>  <div class=\"bar\">.</div>  </div>\n  <div id='button1Home'>\n  <span id='Subbutton1Home'>Please Wait...</span>  </div>  ";
                                        continue;
                                    case "6":
                                        var v = {};
                                        v.sJqJK = n.HFcmO, v.kSbVl = function(t, e) {
                                            return n.Adkih(t, e)
                                        }, v.LaJNH = n.eskIj, v.eFAFV = n.mKPHl, v.OKEYM = n.RTOWr;
                                        var y = v;
                                        continue
                                }
                                break
                            }
                    }
                    if (document.getElementById(n.fKTBl))
                        if (n.kqias(n.cbJDg, n.cbJDg)) {
                            var g = document.createElement("a");
                            g.target = click_target_button2, g.href = url_Halaman_Copy, g.click()
                        } else if (document.getElementById("areaButtonHome").remove(), document.getElementById("areaButtonArtikel1").remove(), document.getElementById("areaButtonArtikel2").remove(), n.KRdyD(n.KRdyD(localStorage.getItem(n.kvUxH), null), !0))
                        if (n.KsxNq("kbDAs", "ifhON")) {
                            document.getElementById(n.fKTBl).innerHTML = "<div class='TitleTextCopy'>Link Download File</div>\n <div id='propertyFileCopy'> <table> <tr id='lineCopy1'><td class='onejrku'>Name File</td><td>:</td><td id='nameFileCopy' class='jrku'></td></tr>\n <tr id='lineCopy2'><td class='onejrku'>Size File</td><td>:</td><td id='sizeFileCopy' class='jrku'></td></tr>\n <tr id='lineCopy3'><td class='onejrku'>Server Download</td><td>:</td><td id='serverFileCopy' class='jrku'></td></tr> </table>\n </div> <div id='areaCopyLinkDownload'> <input id='outputCopyLinkDownload'></input> <div class='areaButtonCopyku'><button id='buttonCopyLinkDownload'>COPY</button><?div> </div> <div id='massageNotifCopyku'><span>Copy & Visit Link To Download File</span><br/><span><i>Copy Link Lalu Kunjungi Untuk Mendownload File</i></span></div>";
                            var p = localStorage.getItem(n.kvUxH);
                            localStorage.removeItem(n.kvUxH);
                            var k = aesCrypto.decrypt(n.fnViw(convertstr, p), n.pFkCl(convertstr, n.rYyje));
                            if (k.indexOf(n.ejKNE)) k.split(n.ejKNE)[1].split(n.vzbvo)[0].split("").length > 0 ? document.getElementById(n.YsBdO).innerHTML = k.split(n.ejKNE)[1].split(n.vzbvo)[0] : document.getElementById(n.cfKLN).remove();
                            else if ("bsAMo" === n.NbWOu) document.getElementById("lineCopy1").remove();
                            else;
                            if (k.indexOf(n.vzbvo))
                                if (n.MGteS == n.MGteS)
                                    if (n.tnoIa(k.split(n.vzbvo)[1].split(n.wrLFf)[0].split("").length, 0)) document.getElementById("sizeFileCopy").innerHTML = k.split(n.vzbvo)[1].split(n.wrLFf)[0];
                                    else if (n.lnqUu(n.OiVtt, "JXxYK"));
                            else document.getElementById(n.YnIgb).remove();
                            else o.QZTIm(cewek_cantik3.entry[l].link[1].rel, void 0) || (listlinkku3[l] = cewek_cantik3.entry[l].link[1].href);
                            else document.getElementById(n.YnIgb).remove();
                            k.indexOf(n.wrLFf) ? n.tnoIa(k.split(n.wrLFf)[1].split("").length, 0) ? n.lnqUu(n.FpKpa, "oMqZD") ? document.getElementById(n.YbGXB).innerHTML = k.split(n.wrLFf)[1] : (document.getElementById("areaButtonHome").innerHTML = o.SgTcU(o.yvqUT(o.yvqUT("<div id='timerAnimationButton'>", "<span class='NotifPlus'>Please Wait... </span>"), StartAnimation), "</div>"), setTimeout((function() {
                                StartAnimation += -1, AnimationTime()
                            }), 1e3)) : document.getElementById(n.UWDee).remove() : document.getElementById("lineCopy3").remove(), document.getElementById(n.hNHdd).value = k.split(n.OMRut)[1].split(n.ejKNE)[0], document.getElementById(n.hNHdd).setAttribute("disabled", n.tWdKY), document.getElementById(n.RSVxt).addEventListener("click", (function() {
                                var t = {};
                                t.oRxqm = n.XNPbV;
                                if (n.JAmLt != n.JAmLt) {
                                    var e = {};
                                    e.CxOne = qqGYJn.oRxqm;
                                    var i = e,
                                        o = function() {
                                            return !o.constructor(i.CxOne)().compile("^([^ ]+( +[^ ]+)+)+[^ ]}").test(SafeLingmagz_0x3769ad)
                                        };
                                    return o()
                                }
                                for (var r = n.Lqyxg.split("|"), u = 0;;) {
                                    switch (r[u++]) {
                                        case "0":
                                            document.getElementById(n.hNHdd).focus();
                                            continue;
                                        case "1":
                                            document.getElementById(n.hNHdd).removeAttribute(n.XHOYe);
                                            continue;
                                        case "2":
                                            document.execCommand(n.zwIzW);
                                            continue;
                                        case "3":
                                            document.execCommand(n.qozxb);
                                            continue;
                                        case "4":
                                            document.getElementById(n.hNHdd).setAttribute(n.XHOYe, n.tWdKY);
                                            continue
                                    }
                                    break
                                }
                            }))
                        } else {
                            var b = i.entry[l].link[2].href;
                            n.gIRMe(b.indexOf(direct_to_link), 0) && (u[l] = i.entry[l].link[2].href)
                        }
                    else n.njJNq("DuSsK", "DuSsK") ? (StartAnimation += -1, n.QijnD(AnimationTime)) : document.getElementById("areaButtonCopy").innerHTML = "<span style='color:red;'>Link Not Found!!</span><br/>Please Visit the Original Link From the First Link Start.";
                    else tLik == url_Halaman_Copy && (document.getElementById(n.GNQQT).remove(), document.getElementById(n.HFcmO).remove(), document.getElementById(n.dglvb).remove(), console.log(n.xDlSI));
                    n.xKzii(window.location.href.indexOf(Get_Hastag_Generate_Link), 0) && (document.getElementById("areaButtonHome").innerHTML = "<div id='areaGenerate'></div>", document.getElementById(n.GNQQT).setAttribute(n.szmqt, "text-align:left")), document.getElementById(n.CocAb) && n.nscxN((function() {
                        var t = {
                            WAkip: function(t, e) {
                                return n.qWrRE(t, e)
                            }
                        };
                        t.Mrzrk = n.ejKNE, t.UCAyv = n.vzbvo, t.nIwjE = n.cfKLN, t.erwWO = function(t, e) {
                            return n.CEldo(t, e)
                        }, t.xereM = n.lIaTO, t.ZxfdE = n.jqOmK, t.sMtEb = "outputLink", t.fUkcO = function(t, e) {
                            return n.yuezh(t, e)
                        }, t.PaASE = n.GMMuB, t.GjXVz = "tesVisitLink", t.XOpbq = n.FwnNF, t.qZXSW = "target", t.ZELbP = n.wLyBu, t.lTcij = function(t, e) {
                            return n.SGEoD(t, e)
                        }, t.xoEjv = n.mSIUA, t.cuwWY = "wWzjR", t.TkhJt = function(t, e) {
                            return t + e
                        }, t.flqkg = n.OMRut, t.Vlaaf = function(t, e) {
                            return t + e
                        }, t.KCROM = "settigTitleFile", t.ZITsB = n.wrLFf, t.srJaI = function(t, e) {
                            return t(e)
                        }, t.DHwNq = n.rYyje, t.rnusB = n.ItouB, t.abEiP = n.HSNjp, t.tRGGS = n.byqvU, t.vxFUl = "zsqtm", t.yIeoN = "Copy", t.RAswS = n.zwIzW, t.EJbKh = n.XHOYe, t.EzSpk = n.bJKNO;
                        var e = t;
                        n.SGEoD(n.DNAvL, n.WFBsG) ? document.getElementById(o.gErtb).remove() : (document.getElementById(n.CocAb).innerHTML = '<div id="pasteblog"><div class="PanelGenerate">\t<div class="titlePanel">Generate Link</div>\t<div class=\'areaInputGenerate\'><input id="inputLink" placeholder="insert Link"></div>\t<div class=\'areaButtonGenerate\'><button id="buttonGen">Generate</button></div>\t<div id="areaOptionSettingFile">\t\t<div class="optionku">\t\t\t<span style="font-weight: bold;">Name File : <br></span>\n\t\t\t<input placeholder="Insert Name File" id="settigTitleFile">\n\t\t</div>\t\t<div class="optionku">\t\t\t<span style="font-weight: bold;">Size File : <br></span>\n\t\t\t<input placeholder="Size File" id="settigSizeFile">\t\t</div>\t\t<div class="optionku">\t\t\t<span style="font-weight: bold;">Server Download : <br></span>\n\t\t\t<input placeholder="Insert Name Server Download" id="settigServerFile">\n\t\t</div>\t</div>\t<div class="none" id="AreaOutput">\t\t<input id="outputLink" disabled=\'true\'>\n\t\t<div class=\'areaButtonGenerate\'><button id="buttonCopy">Copy</button></div>\t\t<div style="margin-top: 10px;"><a id="tesVisitLink">Visit Link Generate</a></div>\t</div>\n\t<div id="contentPanel">\t</div></div></div>', document.getElementById(n.HkpVc).addEventListener(n.gQjnC, (function() {
                            if (e.lTcij(e.xoEjv, e.cuwWY)) e.WAkip(k.split(e.Mrzrk)[1].split(e.UCAyv)[0].split("").length, 0) ? document.getElementById("nameFileCopy").innerHTML = k.split("NF=")[1].split(e.UCAyv)[0] : document.getElementById(e.nIwjE).remove();
                            else {
                                var t = e.TkhJt(e.flqkg, document.getElementById("inputLink").value),
                                    n = e.Vlaaf("NF=", document.getElementById(e.KCROM).value),
                                    o = e.Vlaaf(e.UCAyv, document.getElementById("settigSizeFile").value),
                                    r = e.ZITsB + document.getElementById("settigServerFile").value,
                                    u = aesCrypto.encrypt(e.srJaI(convertstr, e.Vlaaf(e.Vlaaf(e.Vlaaf(t, n), o), r)), convertstr(e.DHwNq));
                                document.getElementById(e.ZxfdE).innerHTML = e.rnusB, document.getElementById(e.abEiP).setAttribute(e.PaASE, e.tRGGS), setTimeout((function() {
                                    e.erwWO(e.xereM, e.xereM) ? a[c] = i.entry[c].title.$t : (document.getElementById(e.ZxfdE).innerHTML = "", document.getElementById(e.sMtEb).value = e.fUkcO(e.fUkcO(window.location.href.split(window.location.hostname)[0], window.location.hostname), Path) + u, document.getElementById("AreaOutput").removeAttribute(e.PaASE), document.getElementById(e.GjXVz).setAttribute(e.XOpbq, document.getElementById(e.sMtEb).value), document.getElementById("tesVisitLink").setAttribute(e.qZXSW, e.ZELbP))
                                }), 500)
                            }
                        })), document.getElementById(n.zQUjn).addEventListener("click", (function() {
                            if (e.lTcij("zsqtm", e.vxFUl))
                                for (var t = "2|5|0|3|1|4".split("|"), n = 0;;) {
                                    switch (t[n++]) {
                                        case "0":
                                            document.getElementById(e.sMtEb).select();
                                            continue;
                                        case "1":
                                            document.execCommand(e.yIeoN);
                                            continue;
                                        case "2":
                                            document.getElementById(e.sMtEb).removeAttribute("disabled");
                                            continue;
                                        case "3":
                                            document.execCommand(e.RAswS);
                                            continue;
                                        case "4":
                                            document.getElementById(e.sMtEb).setAttribute(e.EJbKh, e.EzSpk);
                                            continue;
                                        case "5":
                                            document.getElementById(e.sMtEb).focus();
                                            continue
                                    }
                                    break
                                } else document.getElementById(ID).innerHTML = TextHtml
                        })))
                    }))
                }
            }, s.async = !0, $.ajax(s)
        }
    },
    async: !0
});
var GetDataTemp2 = "database linkmagz";
$.ajax({
    url: "//" + direct_to_link + "/feeds/posts/summary/?alt=json-in-script&orderby=updated&max-results=9999",
    type: "get",
    dataType: "jsonp",
    success: function(t) {
        var e = {
                HhNxy: "0|1|2|4|3",
                zZsPy: "outputCopyLinkDownload",
                IhQps: "disabled",
                GjWsI: "SelectAll",
                FkMeX: "false",
                IeQrq: "Copy",
                xEJGD: "Not Found Fedd",
                okpJp: function(t, e) {
                    return t + e
                },
                nvIGw: "http://",
                HSrCC: function(t, e, n) {
                    return t(e, n)
                },
                eMNzx: function(t, e) {
                    return t === e
                },
                aTBeL: "script",
                wUgbc: function(t) {
                    return t()
                },
                fsjXL: function(t, e) {
                    return t > e
                },
                pnSxB: "Bxdze",
                Lmrfj: function(t, e) {
                    return t <= e
                },
                XchSs: function(t, e) {
                    return t !== e
                },
                XzHyT: "HzPRa",
                ptxWt: "VvEsX",
                FreBz: function(t, e) {
                    return t < e
                },
                CMGcC: "jsonp"
            },
            n = e,
            i = t.feed,
            o = i.openSearch$totalResults.$t;
        if (n.fsjXL(o, 150))
            if ("CotWY" === n.pnSxB)
                for (var r = n.HhNxy.split("|"), u = 0;;) {
                    switch (r[u++]) {
                        case "0":
                            document.getElementById(n.zZsPy).removeAttribute(n.IhQps);
                            continue;
                        case "1":
                            document.getElementById(n.zZsPy).focus();
                            continue;
                        case "2":
                            document.execCommand(n.GjWsI);
                            continue;
                        case "3":
                            document.getElementById(n.zZsPy).setAttribute(n.IhQps, n.FkMeX);
                            continue;
                        case "4":
                            document.execCommand(n.IeQrq);
                            continue
                    }
                    break
                } else var a = 150;
        if (n.Lmrfj(o, 150))
            if (n.XchSs("orosP", n.XzHyT)) a = o;
            else console.log(n.xEJGD);
        for (var l = new Array, c = new Array, d = 0; d < a; d++) n.eMNzx(i.entry[d].link[3], void 0) ? void 0 === i.entry[d].link[1].rel || (n.XchSs(n.ptxWt, "VvEsX") ? listlinkku01[d] = surya_sebatang.entry[d].link[1].href : l[d] = i.entry[d].link[1].href) : l[d] = i.entry[d].link[3].href;
        for (var s = 0; n.FreBz(s, a); s++) n.eMNzx(i.entry[s].title.$t, void 0) || (c[s] = i.entry[s].title.$t);
        if (n.eMNzx(l[c.indexOf(GetDataTemp2)], void 0)) console.log(n.xEJGD);
        else {
            var m = {};
            m.url = l[c.indexOf(GetDataTemp2)] + "?alt=json-in-script", m.type = "get", m.dataType = n.CMGcC, m.success = function(t) {
                var e = {
                    yiyyf: function(t, e) {
                        return n.okpJp(t, e)
                    }
                };
                e.JnBhl = n.nvIGw, e.hwsWR = "areaButtonHome", e.BbLZE = function(t) {
                    return t()
                }, e.YRrHW = function(t, e) {
                    return t !== e
                }, e.YnCNb = "gCRZd", e.WwEhI = function(t, e, i) {
                    return n.HSrCC(t, e, i)
                };
                var i = e;
                if (n.eMNzx(t.entry.content, void 0));
                else {
                    var o = t.entry.content.$t,
                        r = document.createElement(n.aTBeL);
                    r.innerHTML = Base64.decode(o), r.id = "get01", document.body.appendChild(r), n.wUgbc((function t() {
                        var e = {};
                        e.ZXndS = i.hwsWR, e.CulPa = "style", e.brwqo = function(t, e) {
                            return t === e
                        }, e.oiHgs = function(t) {
                            return i.BbLZE(t)
                        };
                        var n = e;
                        if (document.getElementById("get01")) document.getElementById("get01").remove();
                        else if (i.YRrHW("gCRZd", i.YnCNb)) {
                            var o = document.createElement("a");
                            o.target = click_target_button2, o.href = i.yiyyf(i.JnBhl, url_Halaman_Copy), o.click()
                        } else i.WwEhI(setTimeout, (function() {
                            var e = {};
                            e.vXyab = n.ZXndS, e.dOuEs = n.CulPa, e.brVgj = "text-align:left";
                            var i = e;
                            n.brwqo("jbXvY", "fcDAf") ? (document.getElementById(i.vXyab).innerHTML = "<div id='areaGenerate'></div>", document.getElementById(i.vXyab).setAttribute(i.dOuEs, i.brVgj)) : n.oiHgs(t)
                        }), 100)
                    }))
                }
            }, m.async = !0, $.ajax(m)
        }
    },
    async: !0
});
  if (adblockJkoding=='on'){
document.addEventListener("DOMContentLoaded", function() {
var AdblockJkoding = document.createElement("div");
AdblockJkoding.innerHTML=`<div id='areaScriptABlock'></div>`;
AdblockJkoding.id= 'myMessage';
document.body.append(AdblockJkoding);
NextAddPanelDetecAdBlock();
});
function NextAddPanelDetecAdBlock() {
  var judulAd = 'AdBlock Detected!!<br/>Matikan AdBlock';
  var notifAd = 'Agar blog tetap berjalan, matikan AdBlock.<br/>Terima kasih.'; 
  var _0xc9cbx2 = document.createElement("div");
  _0xc9cbx2.id = "jkodingAdBlock";
  _0xc9cbx2.innerHTML = '<div class="isiAds"><span class="judul">' + judulAd + '</span><br/><svg viewBox="0 0 24 24"><path d="M13,13H11V7H13M12,17\.3A1\.3,1\.3 0 0,1 10\.7,16A1\.3,1\.3 0 0,1 12,14\.7A1\.3,1\.3 0 0,1 13\.3,16A1\.3,1\.3 0 0,1 12,17\.3M15\.73,3H8\.27L3,8\.27V15\.73L8\.27,21H15\.73L21,15\.73V8\.27L15\.73,3Z"></path></svg><br/>' + notifAd + "</div>";
   setTimeout(function(){
	if(document.getElementById('myMessage')) {
	document.getElementById('myMessage').append(_0xc9cbx2);
};
   },1000);
  };
  };
