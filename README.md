# Endec Js
encrypt decrypt javascript standalone library

### CDN
```
 https://cdn.jsdelivr.net/gh/Hillzacky/endec-js@latest/endec.js
```

### Snippet
```
function addScript(url) {
    var script = document.createElement('script');
    script.type = 'application/javascript';
    script.src = url;
    document.head.appendChild(script);
}
addScript('https://cdn.jsdelivr.net/gh/Hillzacky/endec-js@latest/endec.js');
```
### ES6
```
const script = {
  add(src){
    let s = document.createElement('script'), s.type = 'application/javascript', s.src = src;
    document.head.appendChild(script)
  }
}

script.add('https://cdn.jsdelivr.net/gh/Hillzacky/endec-js@latest/endec.js')
```
### Use
```
const str = `ABCDEF12345abcdef`,
encode = Endec.encode(str);
console.log(encode)

const decode = Endec.decode(encode)
console.log(decode)
```
