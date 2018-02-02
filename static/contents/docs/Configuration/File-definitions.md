# Configuration file definitions
Configuration key                            | Description
-------------------------------------------- | ---------------------------------
version                                      | Configuration file version.
network.tcp.port                             | The network TCP and UDP port the daemon listens on.
network.tcp.inbound.maximum                  | The maximum number of inbound TCP connections.
network.udp.enable                           | Enable UDP connections if true.
rpc.port                                     | The network TCP port the RPC server listens on.
wallet.transaction.history.maximum           | Maximum transaction history (in seconds) to display.
wallet.keypool.size                          | The keypool size.
wallet.rescan                                | Perform a wallet rescan if true.
wallet.deterministic                         | Create and require a deterministic wallet if true.
zerotime.depth                               | Number of blocks a confirmed ZeroTime transaction should reflect.
zerotime.answers.minimum                     | The minimum number of ZeroTime answers to accept.
mining.proof-of-stake                        | Enable Proof-of-Stake minting if true.
chainblender.debug_options                   | Use ChainBlender debug options.
chainblender.use_common_output_denominations | Use common output denominations.
database.cache_size                          | Database cache size.
database.private                             | Allocate from per-process memory instead of shared memory.
