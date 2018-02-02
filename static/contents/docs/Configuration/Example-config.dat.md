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
