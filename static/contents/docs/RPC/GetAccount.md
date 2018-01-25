# GetAccount
The `getaccount` RPC returns the account name assigned to the specified address. Default is an empty string `""`.

## Parameter
Name    | Type            | Presence | Description
------- | --------------- | -------- | -----------------------------------------
Address | string (base58) | Required | A P2PKH address to lookup the account name of.

## Result
Name   | Type   | Presence | Description
------ | ------ | -------- | ---------------------------------------------------
result | string | Required | The account name assigned to the address.

## Example using Bash RPC script and Electron GUI console
Get the account name assigned to the address `mrQjA6f4FQnEuoge1PpChdk3Lvnvq9iQDn`.

```
./rpc.sh -m getaccount -p mrQjA6f4FQnEuoge1PpChdk3Lvnvq9iQDn
getaccount ["mrQjA6f4FQnEuoge1PpChdk3Lvnvq9iQDn"]
```

The result is the account name assigned to the address.

```
{
  "jsonrpc": "2.0",
  "result": "Savings",
  "id": "840"
}
```
