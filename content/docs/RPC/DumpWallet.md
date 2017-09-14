# DumpWallet
The `dumpwallet` RPC dumps all the private keys and addresses to a Comma-separated values (CSV) file named `wallet.csv` in the data directory. Existing file will be overwritten.

_An unlocked or unencrypted wallet is required._

## Result
Name   | Type | Presence | Description
------ | ---- | -------- | -----------------------------------------------------
result | null | Required | The wallet was sucessfully dumped.

## Example using Bash RPC script and Electron GUI console
Dump the wallet to a CSV file.

```
./rpc.sh -m dumpwallet
dumpwallet
```

The result is `null` if the wallet was successfully dumped.

```
{
  "jsonrpc": "2.0",
  "result": null,
  "id": "6341"
}
```
