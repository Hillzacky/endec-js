'use-strict';
class Endec {
    /** 
      * Encode string 
      * @param str 
      * @return {string} 
      */
    static encode(str) { 
         str = Endec.toJson(str); 
         const enbyte = utf8.toBytes(str);
         return atob(enbyte); 
     } 
  
     /** 
      * Decode string 
      * @param str 
      * @return {string} 
      */ 
     static decode(str) { 
         str = Endec.toJson(str); 
         const decoded = btoa(str);
         const debyte = utf8.fromBytes(decoded);
         return Endec.fromJson(debyte); 
     }
     /** 
      * Create simple string 
      * @param str 
      * @returns {*} 
      */ 
     static toJson(str) { 
         if (str === null || typeof str === 'undefined') 
             throw new Error('required origin'); 
  
         if (typeof str === 'object') 
             str = JSON.stringify(str); 
  
         if (typeof str !== 'string') 
             str = str.toString(); 
  
         return str; 
     } 
  
     /** 
      * If is JSON string then parse 
      * @param str 
      * @returns {*} 
      */ 
     static fromJson(str) { 
         try { 
             return JSON.parse(str); 
         } catch (e) { 
             return str; 
         } 
     }
}

class utf8 {
        static toBytes(text) { 
             var result = [], i = 0; 
             text = encodeURI(text); 
             while (i < text.length) { 
                 var c = text.charCodeAt(i++);  
                 if (c === 37) { 
                     result.push(parseInt(text.substr(i, 2), 16)) 
                     i += 2;  
                 } else { 
                     result.push(c) 
                 } 
             } 
             return utf8.arr(result); 
         } 
  
         static fromBytes(bytes) { 
             var result = [], i = 0; 
             while (i < bytes.length) { 
                 var c = bytes[i]; 
                 if (c < 128) { 
                     result.push(String.fromCharCode(c)); 
                     i++; 
                 } else if (c > 191 && c < 224) { 
                     result.push(String.fromCharCode(((c & 0x1f) << 6) | (bytes[i + 1] & 0x3f))); 
                     i += 2; 
                 } else { 
                     result.push(String.fromCharCode(((c & 0x0f) << 12) | ((bytes[i + 1] & 0x3f) << 6) | (bytes[i + 2] & 0x3f))); 
                     i += 3; 
                 } 
             } 
             return result.join(''); 
         }

    static checkInt(value) { 
         return (parseInt(value) === value); 
     } 
  
    static checkInts(arrayish) { 
         if (!checkInt(arrayish.length)) { return false; } 
         for (var i = 0; i < arrayish.length; i++) { 
             if (!checkInt(arrayish[i]) || arrayish[i] < 0 || arrayish[i] > 255) { 
                 return false; 
             } 
         } 
         return true; 
     }

    static arr(arg, copy) {  
         if (arg.buffer && arg.name === 'Uint8Array') { 
             if (copy) { 
                 if (arg.slice) { 
                     arg = arg.slice(); 
                 } else { 
                     arg = Array.prototype.slice.call(arg); 
                 } 
             } 
             return arg; 
         } 
   
         if (Array.isArray(arg)) { 
             if (!utf8.checkInts(arg)) { 
                 throw new Error('Array contains invalid value: ' + arg); 
             } 
             return new Uint8Array(arg); 
         } 
  
         if (utf8.checkInt(arg.length) && utf8.checkInts(arg)) { 
             return new Uint8Array(arg); 
         } 
  
         throw new Error('unsupported array-like object'); 
     }
}
