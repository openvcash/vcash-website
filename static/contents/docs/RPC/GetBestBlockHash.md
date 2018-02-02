# GetBestBlockHash
The `getbestblockhash` RPC returns the block hash of the latest block in the locally best block chain.

## Result
Name   | Type            | Presence | Description
------ | --------------- | -------- | ------------------------------------------
result | string (base16) | Required | The block hash of the latest block in the locally best block chain.

## Example using Bash RPC script and Electron GUI console
Get the block hash of the latest block in the locally best block chain.

```
./rpc.sh -m getbestblockhash
getbestblockhash
```

The result is the block hash of the latest block in the locally best block chain.

```
{
  "jsonrpc": "2.0",
  "result": "00000000000097a69b96ef030d706f38e608270a330f9da5ec8cd695485e37ae",
  "id": "198"
}
```
