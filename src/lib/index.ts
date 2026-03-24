import weapons from "./weaponList.json";

export let weaponList: any[] = [];

export function initPlayerAndEnemyStats() {
  weaponList = weapons;

  let playerMaxHealth = 10;
  let playerCurrentHealth = 10;
  let enemyMaxHealth = 10;
  let enemyCurrentHealth = 10;
  let playerWeaponList = weaponList;
  let playerWeapon =
    playerWeaponList[Math.floor(Math.random() * weaponList.length)];
  let playerRerolls = 0;
  let enemyWeapon = null;
  let hasInit = true;
  let hasRound = true;
  let hasFought = false;

  weaponList = weapons;

  return {
    playerMaxHealth,
    playerCurrentHealth,
    enemyMaxHealth,
    enemyCurrentHealth,
    playerWeaponList,
    playerWeapon,
    playerRerolls,
    enemyWeapon,
    hasInit,
    hasRound,
    hasFought,
  };
}

export function rollWeapon(hasInit: boolean, playerWeaponList: any[]) {
  if (!hasInit) {
    throw new Error("Game not initialized");
  }
  weaponList = playerWeaponList;

  return {
    playerWeapon: weaponList[Math.floor(Math.random() * weaponList.length)],
    enemyWeapon: null,
    hasRound: true,
    hasFought: false,
  };
}

export function calculateDamage(weaponName: any, weaponDamage: number): number {
  if (weaponName == "bow" || weaponName == "crossbow") {
    return weaponDamage * Math.floor(Math.random() * 5 + 1);
  }
  if (weaponName == "darts") {
    return weaponDamage * Math.floor(Math.random() * 3 + 1);
  }
  return weaponDamage;
}

export function startDuel(
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

export function removeWeaponFromPool(weaponList: any[], weapon: any): any[] {
  return weaponList.filter((w) => w.name != weapon.name);
}

export function checkIfHealthIsNegative(health: number) {
  if (health < 0) {
    return 0;
  }
  return health;
}

export function checkIfGameIsOver(
  playerHealth: number,
  enemyHealth: number,
  enemyWeapon: any,
  playerWeaponList: any[],
) {
  if (enemyHealth === 0) {
    return [
      playerHealth,
      enemyHealth,
      enemyWeapon,
      true,
      true,
      false,
      playerWeaponList,
    ];
  }
  if (playerHealth === 0) {
    return [
      playerHealth,
      enemyHealth,
      enemyWeapon,
      true,
      false,
      true,
      playerWeaponList,
    ];
  }
  return [
    playerHealth,
    enemyHealth,
    enemyWeapon,
    true,
    false,
    false,
    playerWeaponList,
  ];
}

export function fight(
  playerHealth: number,
  enemyHealth: number,
  playerWeapon: any,
  hasInit: boolean,
  hasRound: boolean,
  hasFought: boolean,
  playerWeaponList: any[],
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

  let fightResults: any[] = startDuel(
    [playerWeapon, enemyWeapon],
    playerHealth,
    enemyHealth,
  );

  playerHealth = fightResults[0];
  enemyHealth = fightResults[1];

  playerWeaponList = removeWeaponFromPool(playerWeaponList, playerWeapon);

  playerHealth = checkIfHealthIsNegative(playerHealth);
  enemyHealth = checkIfHealthIsNegative(enemyHealth);

  return checkIfGameIsOver(
    playerHealth,
    enemyHealth,
    enemyWeapon,
    playerWeaponList,
  );
}
