const stringifyNice = (data) => JSON.stringify(data, null, 2)
const templates = Object.freeze({
    beskomat: {
        fileName: "beskomat.txt",
        value: `apiKey.id=f4bae82c8e4c4a2d
apiKey.key=3cea6a582c3d6dc81b72879b1ac090cc5ad42b4265537f448f60fccfc50705c0
apiKey.encoding=hex
fiatCurrency=EUR
callbackUrl=https://legend.lnbits.com/bleskomat/u
shorten=true`,
    },
    elements: {
        fileName: "elements.json",
        value: stringifyNice([
            {
                "name": "text",
                "type": "ACText",
                "value": "LNPoS options",
                "style": "font-family:Arial;font-size:16px;font-weight:400;color:#191970;margin-botom:15px;"
            },
            {
                "name": "password",
                "type": "ACInput",
                "label": "Password for PoS AP WiFi",
                "value": "ToTheMoon1"
            },
            {
                "name": "offline",
                "type": "ACText",
                "value": "Onchain *optional",
                "style": "font-family:Arial;font-size:16px;font-weight:400;color:#191970;margin-botom:15px;"
            },
            {
                "name": "masterkey",
                "type": "ACInput",
                "label": "Master Public Key"
            },
            {
                "name": "heading1",
                "type": "ACText",
                "value": "Lightning *optional",
                "style": "font-family:Arial;font-size:16px;font-weight:400;color:#191970;margin-botom:15px;"
            },
            {
                "name": "server",
                "type": "ACInput",
                "label": "LNbits Server"
            },
            {
                "name": "invoice",
                "type": "ACInput",
                "label": "Wallet Invoice Key"
            },
            {
                "name": "lncurrency",
                "type": "ACInput",
                "label": "PoS Currency ie EUR"
            },
            {
                "name": "heading2",
                "type": "ACText",
                "value": "Offline Lightning *optional",
                "style": "font-family:Arial;font-size:16px;font-weight:400;color:#191970;margin-botom:15px;"
            },
            {
                "name": "lnurlpos",
                "type": "ACInput",
                "label": "LNURLPoS String"
            },
            {
                "name": "heading3",
                "type": "ACText",
                "value": "Offline Lightning *optional",
                "style": "font-family:Arial;font-size:16px;font-weight:400;color:#191970;margin-botom:15px;"
            },
            {
                "name": "lnurlatm",
                "type": "ACInput",
                "label": "LNURLATM String"
            },
            {
                "name": "lnurlatmms",
                "type": "ACInput",
                "value": "mempool.space",
                "label": "mempool.space server"
            },
            {
                "name": "lnurlatmpin",
                "type": "ACInput",
                "value": "878787",
                "label": "LNURLATM pin String"
            },
            {
                "name": "load",
                "type": "ACSubmit",
                "value": "Load",
                "uri": "/posconfig"
            },
            {
                "name": "save",
                "type": "ACSubmit",
                "value": "Save",
                "uri": "/save"
            },
            {
                "name": "adjust_width",
                "type": "ACElement",
                "value": "<script type='text/javascript'>window.onload=function(){var t=document.querySelectorAll('input[]');for(i=0;i<t.length;i++){var e=t[i].getAttribute('placeholder');e&&t[i].setAttribute('size',e.length*.8)}};</script>"
            }
        ])
    }
})

