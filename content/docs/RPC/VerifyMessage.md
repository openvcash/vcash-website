# VerifyMessage
The `verifymessage` RPC verifies a signed message.

## Parameters

Name    | Type            | Presence | Description
------- | --------------- | -------- | -----------------------------------------
Address	| string (base58) | Required | The P2PKH address whose private key made the signature.
Signature | string (base64) | Required | The signature created by the signer.
Message | string | Required | The message that was signed.

## Result

Name    | Type            | Presence | Description
------- | --------------- | -------- | -----------------------------------------
result | boolean | Required | `true` if the message was signed by the address's private key or `false` if not.

## Example using Bash RPC script and Electron GUI console

Verify that the message `Vcash` was signed by the private key of address  `VdTiJEE49rJBU4YTmSHC1UseEqwD5G6rVb`.

```
./rpc.sh -m verifymessage -p '["VdTiJEE49rJBU4YTmSHC1UseEqwD5G6rVb","G29KcwEu0slSs9UPIjKKe6jBP3IATrrt0m3SZFb6CnAW02B7oM7ti3/8INQYkFan+vNUmojbGdBf0N9cYBcb3V4=","Vcash"]'
verifymessage ["VdTiJEE49rJBU4YTmSHC1UseEqwD5G6rVb", "G29KcwEu0slSs9UPIjKKe6jBP3IATrrt0m3SZFb6CnAW02B7oM7ti3/8INQYkFan+vNUmojbGdBf0N9cYBcb3V4=", "Vcash"]
```

The result is status of verification.

```
{
  "jsonrpc": "2.0",
  "result": true,
  "id": "8469"
}
```
