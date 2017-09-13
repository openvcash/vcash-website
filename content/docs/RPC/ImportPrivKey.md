# ImportPrivKey
The `importprivkey` RPC imports a private key in wallet-import-format (WIF) to your wallet.

_An unlocked or unencrypted wallet is required._

## Parameters
Name        | Type            | Presence | Description
----------- | --------------- | -------- | -------------------------------------
Private key | string (base58) | Required | The private key to import.
Account     | string          | Optional | The account to assign the address to. Default is an empty string `""`.

## Result
Name   | Type | Presence | Description
------ | ---- | -------- | -----------------------------------------------------
result | null | Required | The private key was successfully imported or is already part of the wallet.

## Example using Bash RPC script and Electron GUI console
Import the private key of address `VtTKZCve3agWR4qvik1WjEsqvbr4jyjsrs` and assign it to the `Learning` account.

```
./rpc.sh -m importprivkey -p '["7gzhVmXqz9F1pCQB9fZmT3zaGadhSGiUH4TEudvUo8BG3uJBf34","Learning"]'
importprivkey ["7gzhVmXqz9F1pCQB9fZmT3zaGadhSGiUH4TEudvUo8BG3uJBf34", "Learning"]
```

The result is `null` if the private key was successfully imported or if it's already part of the wallet.

```
{
  "jsonrpc": "2.0",
  "result": null,
  "id": "19"
}

```
