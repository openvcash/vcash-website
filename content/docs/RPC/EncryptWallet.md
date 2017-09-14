# EncryptWallet
The `encrypwallet` RPC encrypts the wallet with the specified passphrase. A daemon restart is required after the encryption.

_An unencrypted wallet is required._

## Parameter
Name       | Type   | Presence | Description
---------- | ------ | -------- | -----------------------------------------------
Passphrase | string | Required | The passphrase you want to encrypt the wallet with.

## Result
Name   | Type   | Presence | Description
------ | ------ | -------- | ---------------------------------------------------
result | string | Required | The wallet has been encrypted and it requires a restart.

## Example using Bash RPC script and Electron GUI console
Encrypt the wallet using `myPassphrase` as a passphrase.

```
./rpc.sh -m encryptwallet -p '["myPassphrase"]'
encryptwallet ["myPassphrase"]
```

The result is a message informing you of successful encryption.

```
{
  "jsonrpc": "2.0",
  "result": "wallet encrypted, restart process",
  "id": "21"
}
```
