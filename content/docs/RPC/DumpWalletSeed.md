# DumpWalletSeed
The `dumpwalletseed` RPC returns the deterministic wallet seed.

_An unlocked or unencrypted deterministic wallet is required._

## Result
Name   | Type            | Presence | Description
------ | --------------- | -------- | ------------------------------------------
result | string (base16) | Required | The deterministic wallet seed.

## Example using Bash RPC script and Electron GUI console
Dump the deterministic wallet seed.

```
./rpc.sh -m dumpwalletseed
dumpwalletseed
```

The result is the deterministic wallet seed.

```
{
  "jsonrpc": "2.0",
  "result": "78a8595ec4e67ea63c1213fa11c1771b984218ff2bd91f9d53e5f0f54373566f",
  "id": "66"
}
```
