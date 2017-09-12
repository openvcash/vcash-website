# ZtLock
The `ztlock` RPC performs a ZeroTime lock on the specified transaction in your wallet.

## Parameter
Name    | Type            | Presence | Description
------- | --------------- | -------- | -----------------------------------------
TxID    | string (hex)    | Required | The TxID of the transaction to lock.

## Result
Name    | Type            | Presence | Description
------- | --------------- | -------- | -----------------------------------------
result  | null            | Required | The transaction was successfully locked.

## Example using Bash RPC script and Electron GUI console
Lock the inputs and outputs of transaction `1395c9a2acacb928d7b60f68e186415f6896d5399c437c0d4830d5112fd64005`.

```
./rpc.sh -m ztlock -p 1395c9a2acacb928d7b60f68e186415f6896d5399c437c0d4830d5112fd64005
ztlock ["1395c9a2acacb928d7b60f68e186415f6896d5399c437c0d4830d5112fd64005"]
```

The result is `null` if the transaction is successfully locked.

```
{
  "jsonrpc": "2.0",
  "result": null,
  "id": "9966"
}
```
