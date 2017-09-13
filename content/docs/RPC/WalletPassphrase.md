# WalletPassphrase
The `walletpassphrase` RPC unlocks the wallet using the specified passphrase.

_An encrypted wallet is required._

## Parameter
Name       | Type   | Presence | Description
---------- | ------ | -------- | -----------------------------------------------
Passphrase | string | Required | The wallet's current passphrase.

## Result
Name   | Type | Presence | Description
------ | ---- | -------- | -----------------------------------------------------
result | null | Required | The wallet was successfully unlocked.

## Example using Bash RPC script and Electron GUI console
Unlock the wallet using the passphrase `currentPassphrase`.

```
./rpc.sh -m walletpassphrase -p '["currentPassphrase"]'
walletpassphrase ["currentPassphrase"]
```

The result is `null` if the wallet was successfully unlocked.

```
{
  "jsonrpc": "2.0",
  "result": true,
  "id": "3255"
}
```
