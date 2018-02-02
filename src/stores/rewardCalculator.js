import { action, computed, observable } from 'mobx'
import { calculateIncentive, calculatePoW } from '../utilities/blockRewards.js'

class RewardCalculator {
  /**
   * Observable properties.
   * @property {string} enteredBlock - Entered block.
   */
  @observable enteredBlock = ''

  /**
   * Constructor.
   * @param {object} network - Network store.
   * @param {object} i18n - i18next instance.
   */
  constructor(network, i18n) {
    this.network = network
    this.i18n = i18n
  }

  /**
   * Get entered block or max block height
   * @function block
   * @return {number} Block height.
   */
  @computed
  get block() {
    return this.enteredBlock.length === 0
      ? this.network.stats.maxBlockHeight
      : Math.round(this.enteredBlock)
  }

  /**
   * Get data for the next 100k rewards in 2.5k increments.
   * @function chartData
   * @return {array} Chart data.
   */
  @computed
  get chartData() {
    let data = []

    for (let i = this.block; i <= this.block + 100000; i += 2500) {
      const incentivePercent = calculateIncentive(i)
      const powReward = calculatePoW(i)
      const incentiveReward = powReward / 100 * incentivePercent
      const miningReward = powReward - incentiveReward

      data.push({
        block: i,
        [this.i18n.t('network:incentiveShare')]: incentiveReward,
        [this.i18n.t('network:miningShare')]: miningReward,
        [this.i18n.t('network:powReward')]: powReward
      })
    }

    return data
  }

  /**
   * Get incentive percent of PoW reward.
   * @function incentivePercent
   * @return {number} Percent.
   */
  @computed
  get incentivePercent() {
    return calculateIncentive(this.block)
  }

  /**
   * Get incentive share.
   * @function incentiveReward
   * @return {number} Reward.
   */
  @computed
  get incentiveReward() {
    return this.powReward / 100 * this.incentivePercent
  }

  /**
   * Get mining share.
   * @function miningReward
   * @return {number} Reward.
   */
  @computed
  get miningReward() {
    return this.powReward - this.incentiveReward
  }

  /**
   * Get proof-of-work reward.
   * @function powReward
   * @return {number} Reward.
   */
  @computed
  get powReward() {
    return calculatePoW(this.block)
  }

  /**
   * Get an approximate block time estimation.
   * @function time
   * @return {number} Block time approximation.
   */
  @computed
  get time() {
    return (
      new Date().getTime() +
      1000 * 100 * (this.block - this.network.stats.maxBlockHeight)
    )
  }

  /**
   * Set block.
   * @function setBlock
   * @param {number} block - Block number.
   */
  @action
  setBlock(e) {
    const block = typeof e === 'undefined' ? '' : e.target.value

    if (block.toString().match(/^[0-9]{0,7}$/) !== null) {
      this.enteredBlock = block
    }
  }
}

/**
 * Initialize a new store or return an existing one.
 * @function initRewardCalculator
 * @param {boolean} isServer - Calling from server or client.
 * @param {object} network - Network store.
 * @param {object} i18n - i18next instance.
 */
export const initRewardCalculator = (isServer, network, i18n) => {
  if (isServer && typeof window === 'undefined') {
    return new RewardCalculator(network, i18n)
  } else {
    if (rewardCalculatorStore === null) {
      rewardCalculatorStore = new RewardCalculator(network, i18n)
    }

    return rewardCalculatorStore
  }
}

/** Keep a global reference of the reward calculator store. */
let rewardCalculatorStore = null
