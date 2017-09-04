# SignMessage
The `signmessage` RPC signs a message with the private key of an address.

_An unlocked or unencrypted wallet is required._

## Parameters

Name    | Type            | Presence | Description
------- | --------------- | -------- | -----------------------------------------
Address	| string (base58) | Required | A P2PKH address whose private key belongs to this wallet.
Message | string          | Required | The message to sign.

## Result

Name    | Type            | Presence | Description
------- | --------------- | -------- | -----------------------------------------
result  | string (base64) | Required | The message signature, encoded in base64. The same message encoded multiple times will result in different signatures.

## Example using Bash RPC script and Electron GUI console

Sign the message `Vcash` with the private key of address `VdTiJEE49rJBU4YTmSHC1UseEqwD5G6rVb` belonging to this wallet.

```
./rpc.sh -m signmessage -p '["VdTiJEE49rJBU4YTmSHC1UseEqwD5G6rVb","Vcash"]'
signmessage ["VdTiJEE49rJBU4YTmSHC1UseEqwD5G6rVb", "Vcash"]
```

The result is signature of the message.

```
{
  "jsonrpc": "2.0",
  "result": "G29KcwEu0slSs9UPIjKKe6jBP3IATrrt0m3SZFb6CnAW02B7oM7ti3/8INQYkFan+vNUmojbGdBf0N9cYBcb3V4=",
  "id": "968"
}
```
