import weapons from "./weaponList.json";

export let weaponList: any[] = [];

export function init() {
  weaponList = weapons;

  let playerMaxHealth = 10;
  let playerCurrentHealth = 10;
  let enemyMaxHealth = 10;
  let enemyCurrentHealth = 10;
  let playerWeapon = weaponList[Math.floor(Math.random() * weaponList.length)];
  let enemyWeapon = null;
  let hasInit = true;
  let hasRound = true;
  let hasFought = false;
  let playerWon = false;
  let playerLost = false;

  weaponList = weapons;

  return {
    playerMaxHealth,
    playerCurrentHealth,
    enemyMaxHealth,
    enemyCurrentHealth,
    playerWeapon,
    enemyWeapon,
    hasInit,
    hasRound,
    hasFought,
    playerWon,
    playerLost,
  };
}

export function newRound(hasInit: boolean) {
  if (hasInit) {
    weaponList = weapons;

    return {
      playerWeapon: weaponList[Math.floor(Math.random() * weaponList.length)],
      enemyWeapon: null,
      hasRound: true,
      hasFought: false,
    };
  } else {
    throw new Error("Game not initialized");
  }
}

export function calculateDamage(weaponName: any, weaponDamage: number): number {
  if (weaponName === "bow" || weaponName === "crossbow") {
    return weaponDamage * Math.floor(Math.random() * 5);
  }
  if (weaponName === "darts") {
    return weaponDamage * Math.floor(Math.random() * 3);
  }
  return weaponDamage;
}

export function attack(
  weaponsToUse: any[],
  playerHealth: any,
  enemyHealth: any,
): any[] {
  if (!weaponsToUse) {
    throw new Error("Invalid weapon");
  }

  let playerDamage = calculateDamage(
    weaponsToUse[0].name,
    weaponsToUse[0].damage,
  );
  let enemyDamage = calculateDamage(
    weaponsToUse[1].name,
    weaponsToUse[1].damage,
  );

  if (playerDamage === enemyDamage) {
    return [playerHealth, enemyHealth];
  }

  if (playerDamage > enemyDamage) {
    enemyHealth -= playerDamage - enemyDamage;
    return [playerHealth, enemyHealth];
  }

  playerHealth -= enemyDamage - playerDamage;
  return [playerHealth, enemyHealth];
}

export function checkIfHealthIsNegative(health: number) {
  if (health < 0) {
    return 0;
  }
  return health;
}

export function checkIfWinOrLossConditionReached(
  playerHealth: number,
  enemyHealth: number,
  enemyWeapon: any,
) {
  if (enemyHealth === 0) {
    return [playerHealth, enemyHealth, enemyWeapon, true, true, false];
  }
  if (playerHealth === 0) {
    return [playerHealth, enemyHealth, enemyWeapon, true, false, true];
  }
  return [playerHealth, enemyHealth, enemyWeapon, true, false, false];
}

export function fight(
  playerHealth: number,
  enemyHealth: number,
  playerWeapon: any,
  hasInit: boolean,
  hasRound: boolean,
  hasFought: boolean,
): Array<number | boolean> {
  if (!hasInit) {
    throw new Error("Game not initialized");
  }

  if (!hasRound) {
    throw new Error("Round not initialized");
  }

  if (hasFought) {
    throw new Error("Round already played");
  }

  let enemyWeapon = weaponList[Math.floor(Math.random() * weaponList.length)];

  let fightResults: any[] = attack(
    [playerWeapon, enemyWeapon],
    playerHealth,
    enemyHealth,
  );

  playerHealth = fightResults[0];
  enemyHealth = fightResults[1];

  playerHealth = checkIfHealthIsNegative(playerHealth);
  enemyHealth = checkIfHealthIsNegative(enemyHealth);

  return checkIfWinOrLossConditionReached(
    playerHealth,
    enemyHealth,
    enemyWeapon,
  );
}
