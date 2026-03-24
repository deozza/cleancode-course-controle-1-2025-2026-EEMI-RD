<script lang="ts">
	import { fight, init, newRound, rerollWeapon } from '$lib';

	let state: any = {
		playerMaxHealth: null,
		playerCurrentHealth: null,
		enemyMaxHealth: null,
		enemyCurrentHealth: null,
		playerWeapon: null,
		enemyWeapon: null,
		playerRerolls: 0,
		hasInit: false,
		hasRound: false,
		hasFought: false,
		playerWon: false,
		playerLost: false
	};

	function triggerInit() {
		state = init();
	}

	function triggerNewRound() {
		let response = null;
		try {
			response = newRound(state.hasInit);
		} catch (error) {
			console.error(error);
		}

		if (response !== null) {
			state.playerWeapon = response.playerWeapon;
			state.enemyWeapon = response.enemyWeapon;
			state.hasRound = response.hasRound;
			state.hasFought = response.hasFought;
			state.playerRerolls = 0;
		}
	}

	function triggerReroll() {
		if (state.playerRerolls < 2) {
			let response = null;
			try {
				response = rerollWeapon(state.playerRerolls);
			} catch (error) {
				console.error(error);
			}

			if (response !== null) {
				state.playerWeapon = response.playerWeapon;
				state.enemyWeapon = response.enemyWeapon;
				state.hasRound = response.hasRound;
				state.hasFought = response.hasFought;
				state.playerRerolls++;
			}
		}
	}

	function triggerFight() {
		let response = null;

		try {
			response = fight(
				state.playerCurrentHealth,
				state.enemyCurrentHealth,
				state.playerWeapon,
				state.hasInit,
				state.hasRound,
				state.hasFought
			);
		} catch (error) {
			console.error(error);
		}

		if (response !== null) {
			state.playerCurrentHealth = response[0];
			state.enemyCurrentHealth = response[1];
			state.enemyWeapon = response[2];
			state.hasFought = response[3];
			state.playerWon = response[4];
			state.playerLost = response[5];
		}
	}
</script>

<section id="player" class="w-1/3">
	{#if state.hasInit === true}
		<div class="flex w-full flex-row flex-wrap items-center justify-between">
			<div class="flex w-full flex-col items-center justify-center">
				<h1 class="text-2xl font-bold">Player</h1>
				<p class="text-lg">Health: {state.playerCurrentHealth} / {state.playerMaxHealth}</p>
				<p class="text-lg">Weapon name: {state.playerWeapon.name}</p>
				<p class="text-lg">Weapon description: {state.playerWeapon.description}</p>
			</div>
		</div>
	{/if}
</section>

<section id="action">
	{#if state.hasInit === false}
		<button class="variant-filled-primary btn btn-xl" on:click={triggerInit}>Start</button>
	{:else}
		{#if state.hasRound === true && state.hasFought === true && state.playerWon === false && state.playerLost === false}
			<button class="variant-filled-warning btn btn-xl" on:click={triggerNewRound}
				>Next Round</button
			>
		{/if}

		{#if state.hasRound === true && state.hasFought === false && state.playerWon === false && state.playerLost === false}
			<button class="variant-filled-error btn btn-xl" on:click={triggerFight}>Fight</button>
			<button class="variant-filled-error btn btn-xl" on:click={triggerReroll}
				>Reroll weapon ({2 - state.playerRerolls} left)
			</button>
		{/if}

		{#if state.hasRound === true && state.hasFought === true && state.playerWon === true && state.playerLost === false}
			<p class="p">You won !</p>
			<button class="variant-filled-primary btn btn-xl" on:click={triggerInit}>Play again</button>
		{/if}

		{#if state.hasRound === true && state.hasFought === true && state.playerWon === false && state.playerLost === true}
			<p class="p">You lost ...</p>
			<button class="variant-filled-primary btn btn-xl" on:click={triggerInit}>Play again</button>
		{/if}
	{/if}
</section>

<section id="enemy" class="w-1/3">
	{#if state.hasInit === true}
		<div class="flex w-full flex-row flex-wrap items-center justify-between">
			<div class="flex w-full flex-col items-center justify-center">
				<h1 class="text-2xl font-bold">Enemy</h1>
				<p class="text-lg">Health: {state.enemyCurrentHealth} / {state.enemyMaxHealth}</p>
				{#if state.enemyWeapon !== null}
					<p class="text-lg">Weapon name: {state.enemyWeapon.name}</p>
					<p class="text-lg">Weapon description: {state.enemyWeapon.description}</p>
				{/if}
			</div>
		</div>
	{/if}
</section>
