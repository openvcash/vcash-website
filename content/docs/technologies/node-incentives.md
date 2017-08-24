### Node Incentives ###

The node incentives system donates a portion of the miners coinbase reward to peers that are helping to maintain the network infrastructure. The system is constantly probing for good publicly addressable peers. These peers are voted on using a deterministic scoring system that is secured by the blockchain. Additionally there is a collateral mechanism that (if enabled) can prohibit votes from peers that do not have at least N amount of coins (in a single deposit) in their default wallet address. The only requirements for participating in the incentive system are a possible collateral deposit and a publically addressable peer.

### Questions and Answers

1. How do I know if my client is a candidate for incentive rewards?

    Use the [getincentiveinfo](../RPC/commands/getincentiveinfo.md) command in the GUI console. If you see "votecandidate, true" you are eligible to be a candidate.

2. Will collateral be required?

    A collateral deposit of at least 10000 into the default wallet address will be required to be a vote candiate starting at block 220000.

3. How do I deposit collateral?

    You send 10000 coins to your default wallet address found in [getincentiveinfo](../RPC/commands/getincentiveinfo.md) as a single transaction. Within some time it should reflect in [getincentiveinfo](../RPC/commands/getincentiveinfo.md) if the deposit is equal or greater than 10000.


4. What is the incentive percentage?

    Schedule: [https://github.com/openvcash/vcash/blob/b49dec02a9a1cde13b6357ba9b22b974fcfda366/coin/src/incentive.cpp#L250-L428](https://github.com/openvcash/vcash/blob/b49dec02a9a1cde13b6357ba9b22b974fcfda366/coin/src/incentive.cpp#L250-L428)

5. How do mining pools reward users?

    As found in [getblocktemplate](../RPC/commands/getblocktemplate.md) they are required to include a transaction if the incentive address is not empty.

    ```
    "incentive": {
        "enforced": false,
        "address": "VrOmvLuHfayJMlCDj3mRWdf7xrFsD53Tfw",
        "amount": 617283
    }
    ```
6. What happens if a mining pool doesn't include the incentive transaction when required?

    If enforced the block will be dropped and their ban score will be incremented.

7. Is there a guarantee I will be chosen to receive an incentive reward?

    No, some peers may not be providing reliable service or have bad luck due to variance.

8. What are the minimum computing requirements for running an incentivised node?

    * Quad Core (Physical CPU)
    * 2 gigabytes of free memory (Physical RAM)
    * 1 gigabytes of free disk space (Physical SSD)


You can read more about it in the [whitepaper](https://github.com/openvcash/papers/blob/master/incentive.pdf).
