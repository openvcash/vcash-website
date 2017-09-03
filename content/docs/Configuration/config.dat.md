# Configuration file definitions

Configuration key    | Description
-------------------- | ---------------------------------------------------------
version              | Configuration file version.
network.tcp.port     | The network TCP and UDP port the daemon listens on.
network.tcp.inbound.maximum | The maximum number of inbound TCP connections.
network.udp.enable   | Enable UDP connections if true.
rpc.port             | The network TCP port the RPC server listens on.
wallet.transaction.history.maximum | Maximum tx history (in seconds) to display.
wallet.keypool.size  | The keypool size.
wallet.rescan        | Perform a wallet rescan if true.
wallet.deterministic | Create and require a deterministic wallet if true.
zerotime.depth       | # of blocks a confirmed ZeroTime tx should reflect.
zerotime.answers.minimum | The minimum number of ZeroTime answers to accept.
mining.proof-of-stake | Enable Proof-of-Stake minting.
chainblender.debug_options | Use ChainBlender debug options.
chainblender.use_common_output_denominations | Use common output denominations.
database.cache_size | Database cache size.
database.private | ?

# Example config.dat file

```
{
  "version": "1",
  "network": {
    "tcp": {
      "port": "12345",
      "inbound": {
        "maximum": "128"
      }
    },
    "udp": {
      "enable": "1"
    }
  },
  "rpc": {
    "port": "9195"
  },
  "wallet": {
    "transaction": {
      "history": {
        "maximum": "31536000"
      }
    },
    "keypool": {
      "size": "100"
    },
    "rescan": "0",
    "deterministic": "1"
  },
  "zerotime": {
    "depth": "1",
    "answers": {
      "minimum": "1"
    }
  },
  "mining": {
    "proof-of-stake": "1"
  },
  "chainblender": {
    "debug_options": "0",
    "use_common_output_denominations": "1"
  },
  "database": {
    "cache_size": "25",
    "private": "0"
  }
}
```
