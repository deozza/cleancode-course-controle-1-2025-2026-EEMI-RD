La fonction fight() n'est pas écrite proprement, le CleanCode n'est pas respecté sur plusieurs aspects :

- la fonction fait plusieurs choses : elle choisit une arme pour le joueur et l'ennemi, fait attaquer le joueur, l'ennemi, vérifie les PV négatifs et vérifie si quelqu'un a gagné la partie, elle fait quatre choses à la fois
- pas de failfast : on se lance quand même dans la fonction sans savoir si elle risque d'échouer après ou non
- 6 arguments en fonction dont trois booleans : c'est trop et surtout on veut éviter les booléens (sinon ça veut dire qu'on fera plus d'une chose dans la fonction)
- certains passages de la fonction sont simplement des répétitions comme le choix de l'arme joueur et ennemi et le check de victoire/défaite
- on pourrait clarifier des noms de variables, notamment pour les dégâts infligés (playerDamageDealt serait plus cohérent par exemple)
- weaponList devrait posséder l'information des dégâts de chaque arme
- tous les commentaires sont inutiles

Avec tout cela en tête, le plan d'action idéal serait :

- failfast sur la fonction, inverser les conditions et tout de suite throw une erreur s'il y a échec
- remplacer les booleans en argument par le simple fait d'appeler les fonctions dans fight() et faire le failsafe en récupérant le résultat de la fonction plutôt que de passer le boolean en argument
- supprimer le switch et changer la façon dont on liste les armes et récupère l'info des dégâts
- factoriser le choix de l'arme du joueur et de l'ennemi en une simple fonction au lieu d'un double switch
- au passage pourquoi on reset la liste d'armes avant le choix ennemi ? ça n'a aucun intérêt
- créer des fonctions pour gérer le choix de l'arme, l'attaque, la vérification des PV négatifs et la vérification de si quelqu'un a gagné
- ajouter une propriété "damage" à la liste des armes (json à modifier)
- supprimer les commentaires
