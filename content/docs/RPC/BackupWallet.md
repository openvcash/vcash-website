# BackupWallet
The `backupwallet` RPC safely copies your `wallet.dat` to the specified directory or path with a file name ending with `.dat`.

## Parameter
Name        | Type   | Presence | Description
----------- | -------| -------- | ----------------------------------------------
Destination | string | Required | Directory or path with a file name ending with `.dat`. Existing file will be overwritten.

## Result
Name   | Type | Presence | Description
------ | ---- | -------- | -----------------------------------------------------
result | null | Required | The wallet was sucessfully backed up.

## Example using Bash RPC script and Electron GUI console
Backup wallet to the `/home/user/Downloads/` directory, and name the backup `myBackup.dat`.

```
./rpc.sh -m backupwallet -p '["/home/user/Downloads/myBackup.dat"]'
backupwallet ["/home/user/Downloads/myBackup.dat"]
```

The result is `null` if the wallet was successfully backed up.

```
{
  "jsonrpc": "2.0",
  "result": null,
  "id": "1214"
}
```
