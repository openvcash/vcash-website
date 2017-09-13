# BackupWallet
The `backupwallet` RPC safely copies your `wallet.dat` to the specified directory or path with a filename ending with `.dat`.

## Parameter
Name        | Type   | Presence | Description
----------- | -------| -------- | ----------------------------------------------
Destination | string | Required | Directory or path with a filename ending with `.dat`.

## Result
Name   | Type | Presence | Description
------ | ---- | -------- | -----------------------------------------------------
result | null | Required | The wallet was sucessfully backed up.

## Example using Bash RPC script and Electron GUI console
Dump the wallet to the `/home/user/Downloads/mybackup.dat` path with a filename.

```
./rpc.sh -m dumpwallet -p '["/home/user/Downloads/mybackup.dat"]'
dumpprivkey ["VtTKZCve3agWR4qvik1WjEsqvbr4jyjsrs"]
```

The result is `null` if the wallet was successfully backed up.

```
{
  "jsonrpc": "2.0",
  "result": null,
  "id": "1214"
}
```
