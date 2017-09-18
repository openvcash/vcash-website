# GetAccountAddress
The `getaccountaddress` RPC returns an unused address assigned to the specified account. If there are no addresses assigned one will be assigned to it. The same address will be returned until it gets used. Default is an empty string `""`.

## Parameter
Name    | Type   | Presence | Description
------- | ------ | -------- | --------------------------------------------------
Account | string | Required | The account to get the unused address of.

## Result
Name   | Type            | Presence | Description
------ | --------------- | -------- | ------------------------------------------
result | string (base58) | Required | The unused address of the specified account.

## Example using Bash RPC script and Electron GUI console
Get an unused address that is assigned to the `Savings` account.

```
./rpc.sh -m getaccountaddress -p '["Savings"]'
getaccountaddress ["Savings"]
```

The result is an unused address assigned to the specified account.

```
{
  "jsonrpc": "2.0",
  "result": "mrQjA6f4FQnEuoge1PpChdk3Lvnvq9iQDn",
  "id": "58"
}
```
