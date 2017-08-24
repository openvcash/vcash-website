### Example config.dat ###


```
{
    "version": "1",
    "network": {
        "tcp": {
            "port": "39520",
            "inbound": {
                "maximum": "8"
            }
        },
        "udp": {
            "enable": "1"
        }
    },
    "wallet": {
        "transaction": {
            "history": {
                "maximum": "604800"
            }
        },
        "keypool": {
            "size": "100"
        },
        "rescan": "0"
    },
    "zerotime": {
        "depth": "1",
        "answers": {
            "minimum": "1"
        }
    },
    "mining": {
        "proof-of-stake": "1"
    }
}
```

### Key Definitions ###

    * version - The file version.
    * network.tcp.port - The network TCP port to use.
    * network.tcp.inbound.maximum - The maximum number of inbound TCP connections.
    * network.udp.enable - Enables UDP.
    * wallet.transaction.history.maximum - The maximum transaction history (in seconds) to display.
    * wallet.keypool.size - The keypool size.
    * wallet.rescan - Performs a wallet rescan if true.
    * zerotime.depth - The number blocks a confirmed ZeroTime transaction should reflect.
    * zerotime.answers.minimum - The minimum number of answers to accept.
    * mining.proof-of-stake - Enables Proof-of-Stake minting.
