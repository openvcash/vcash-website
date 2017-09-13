# DumpPrivKey
The `dumpprivkey` RPC returns the private key of the specified address in wallet-import-format (WIF). The address and private key are not removed from the wallet.

_An unlocked or unencrypted wallet is required._

## Parameter
Name            | Type            | Presence | Description
--------------- | --------------- | -------- | ---------------------------------
Address (P2PKH) | string (base58) | Required | The address to return the private key of.

## Result
Name   | Type            | Presence | Description
------ | --------------- | -------- | ------------------------------------------
result | string (base58) | Required | The address's private key.

## Example using Bash RPC script and Electron GUI console
Dump the private key of address `VtTKZCve3agWR4qvik1WjEsqvbr4jyjsrs`.

```
./rpc.sh -m dumpprivkey -p VtTKZCve3agWR4qvik1WjEsqvbr4jyjsrs
dumpprivkey ["VtTKZCve3agWR4qvik1WjEsqvbr4jyjsrs"]
```

The result is the address's private key.

```
{
  "jsonrpc": "2.0",
  "result": "7gzhVmXqz9F1pCQB9fZmT3zaGadhSGiUH4TEudvUo8BG3uJBf34",
  "id": "3772"
}

```
