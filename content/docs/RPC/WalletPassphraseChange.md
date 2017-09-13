# WalletPassphraseChange
The `walletpassphrasechange` RPC changes the encrypted wallet's passphrase.

_An encrypted wallet is required._

## Parameters
Name               | Type   | Presence | Description
------------------ | ------ | -------- | ---------------------------------------
Current passphrase | string | Required | The wallet's current passphrase.
New passphrase     | string | Required | The wallet's new passphrase.

## Result
Name   | Type | Presence | Description
------ | ---- | -------- | -----------------------------------------------------
result | null | Required | The wallet's passphrase was successfully updated.

## Example using Bash RPC script and Electron GUI console
Change the wallet's passphrase from `currentPassphrase` to `newPassphrase`.

```
./rpc.sh -m walletpassphrasechange -p '["currentPassphrase","newPassphrase"]'
walletpassphrasechange ["currentPassphrase", "newPassphrase"]
```

The result is `null` if the wallet's passphrase was successfully updated.

```
{
  "jsonrpc": "2.0",
  "result": true,
  "id": "8752"
}
```
