# GetBlockHash
The `getblockhash` RPC returns the block hash of the specified block's index (or height) in the locally best block chain. The hardcoded genesis block's index is `0`.

## Parameter
Name        | Type         | Presence | Description
----------- | ------------ | -------- | ----------------------------------------
Block index | number (int) | Required | The block's index (or height) in the locally best block chain.

## Result
Name   | Type            | Presence | Description
------ | --------------- | -------- | ------------------------------------------
result | string (base16) | Required | The block's hash.

## Example using Bash RPC script and Electron GUI console
Get the block hash of the block with index (or height) `584213`.

```
./rpc.sh -m getblockhash -p 584213
getblockhash [584213]
```

The result is the block's hash.

```
{
  "jsonrpc": "2.0",
  "result": "52a55b819ae9d19624c503c35e3bfe97bdf3fa7721ecdedbb9f31d008bbcfb4c",
  "id": "33"
}
```
