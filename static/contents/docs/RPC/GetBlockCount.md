# GetBlockCount
The `getblockcount` RPC returns the number of blocks in the locally best block chain.

## Result
Name   | Type         | Presence | Description
------ | ------------ | -------- | ---------------------------------------------
result | number (int) | Required | The number of blocks in the locally best block chain.

## Example using Bash RPC script and Electron GUI console
Get the number of blocks in the locally best block chain.

```
./rpc.sh -m getblockcount
getblockcount
```

The result is the number of blocks in the locally best block chain.

```
{
  "jsonrpc": "2.0",
  "result": 771341,
  "id": "105"
}
```
