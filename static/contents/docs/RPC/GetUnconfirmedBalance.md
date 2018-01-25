# GetUnconfirmedBalance
The `getunconfirmedbalance` RPC returns the wallet's unconfirmed balance.

## Result
Name   | Type   | Presence | Description
------ | ------ | -------- | ---------------------------------------------------
result | number | Required | Balance of the wallet's unconfirmed transactions.

## Example using Bash RPC script and Electron GUI console
Get unconfirmed balance of the wallet.

```
./rpc.sh -m getunconfirmedbalance
getunconfirmedbalance
```

The result is the balance of unconfirmed transactions.

```
{
  "jsonrpc": "2.0",
  "result": 0.826944
  "id": "968"
}
```
