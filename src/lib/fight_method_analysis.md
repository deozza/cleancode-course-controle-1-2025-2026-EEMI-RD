La fonction fight() ne respecte pas les principes du clean code

Différents problèmes et comment les résoudre pour respercter le clean code :

- La fonction est trop longue, il est préconisé d'avoir une fonction sur 20 lignes maximum

- Pour être courte une fonction ne doit pas avoir de structures imbriqués, alors que là on a des if imbriqués

- On a des fonctions dupliquée il faudrait faire un fonction pour les rassembler :
    - switch joueur / ennemi

- Dead code :   
    - retirer return [playerHealth, enemyHealth, enemyWeapon, true, false, false]; (écrit 2 fois)
    - retirer commentaire qui n'apporte aucune information utile (health cannot be negative, check if the game is over and the player has won, reset weapon list so the enemy could play)
