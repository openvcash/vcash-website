# WalletLock
The `walletlock` RPC locks the currently unlocked wallet.

_An unlocked wallet is required._

## Result
Name   | Type | Presence | Description
------ | ---- | -------- | -----------------------------------------------------
result | null | Required | The wallet was successfully locked.

## Example using Bash RPC script and Electron GUI console
Lock the wallet that's unlocked at the moment.

```
./rpc.sh -m walletlock
walletlock
```

The result is `null` if the wallet was successfully locked.

```
{
  "jsonrpc": "2.0",
  "result": null,
  "id": "6371"
}
```
