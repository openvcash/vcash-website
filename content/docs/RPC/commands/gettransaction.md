### gettransaction ###

Gets information regarding a transaction.

### Example ###

```
gettransaction 3d7b638c640822970148555a55f689d7bf2b5164a041e672e55956943e343d76

{
    "txid": 3d7b638c640822970148555a55f689d7bf2b5164a041e672e55956943e343d76,
    "version": 1,
    "time": 1440852475,
    "locktime": 0,
    "vin":
    [
        {
            "txid": e797eba2e6bdef4f65a32ae2805a5d1f5b7cbca2b49f3693d01f0c51dfaa0b3f,
            "vout": 1,
            "scriptSig":
            {
                "asm": 30460221009bdbfb30a2bdaa04637307abd94b8526a7fed097726d2646dea145a78ca31f11022100fe86432ebfcf15d17c5ff054fdcf787c1334822830f3b2cf9a14137fcecb1e8c01,
                "hex": 4930460221009bdbfb30a2bdaa04637307abd94b8526a7fed097726d2646dea145a78ca31f11022100fe86432ebfcf15d17c5ff054fdcf787c1334822830f3b2cf9a14137fcecb1e8c01
            },
            "sequence": 4294967295
        }
    ],
    "vout":
    [
        {
            "value": 0,
            "n": 0,
            "scriptPubKey":
            {
                "asm": ,
                "hex": ,
                "type": nonstandard
            }
        },
        {
            "value": 42.237093,
            "n": 1,
            "scriptPubKey":
            {
                "asm": 04853d02b5e7eac5266b05b4771c2cad689e926e8bbcfdcdd6a8e4ad9c26786825755e4c485e57aaee7a19639b152d0374c80fe09760b4be5d02d12a23e70aa82e OP_CHECKSIG,
                "hex": 4104853d02b5e7eac5266b05b4771c2cad689e926e8bbcfdcdd6a8e4ad9c26786825755e4c485e57aaee7a19639b152d0374c80fe09760b4be5d02d12a23e70aa82eac,
                "reqSigs": 1,
                "type": pubkey,
                "addresses":
                [
                    VeBFzqSGZ8tDqIP7Xv2CbuVCRbSFtUJYEC
                ]
            }
        }
    ],
    "amount": -42.175858,
    "confirmations": 9,
    "generated": true,
    "blockhash": 85a5053a01ab08d221b96f78ea08d7eb75d2d31ca6549013fabe36af8b5d883d,
    "blockindex": 1,
    "blocktime": 1440852475,
    "txid": 3d7b638c640822970148555a55f689d7bf2b5164a041e672e55956943e343d76,
    "time": 1440852475,
    "timereceived": 1440852527,
    "details":
    [
        {
            "account": ,
            "address": V8tFgQwsYWnkuFpk7KQm3xSTjv78KJwfYX,
            "category": immature,
            "amount": 42.237093
        }
    ]
}

```
