# GetNewAddress
The `getnewaddress` RPC returns a new Vcash address for receiving payments. Specifying an account will ensure that received payments are credited to it.

## Parameter
Name    | Type            | Presence | Description
------- | --------------- | -------- | -----------------------------------------
Account | string          | Optional | The account to assign the new address to. Default is an empty string `""`.

## Result
Name    | Type            | Presence | Description
------- | --------------- | -------- | -----------------------------------------
result  | string (base58) | Required | A P2PKH address not yet returned by this RPC.

## Example using Bash RPC script and Electron GUI console
Get a new address and assign it to the `Learning` account.

```
./rpc.sh -m getnewaddress -p Learning
getnewaddress ["Learning"]
```

The result is a new receiving address, previously not returned by this RPC.

```
{
  "jsonrpc": "2.0",
  "result": "VtTKZCve3agWR4qvik1WjEsqvbr4jyjsrs",
  "id": "233"
}

```
