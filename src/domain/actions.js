const actions = [
    {
        'label': 'Transport',
        'img': 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/285/woman-biking_1f6b4-200d-2640-fe0f.png',
        'actions': [
            {
                'label': 'Voiture (1km)',
                'value': 0.19,
                'color': 'rgb(127,127,127)',
                'min': 0,
                'max': 1000,
                'visible': true
            },
            {
                'label': 'TGV (1km)',
                'value': 0.00173,
                'color': 'rgb(156,255,198)',
                'min': 0,
                'max': 5000,
                'visible': true
            },
            {
                'label': 'Avion (1km)',
                'value': 0.23,
                'color': 'rgb(142,68,16)',
                'min': 0,
                'max': 100000,
                'visible': true
            },
        ]
    },
    {
        'label': 'Numérique',
            'img': 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/285/laptop_1f4bb.png',
            'actions': [
                {
                    'label': 'Envoyer un email',
                    'value': 0.004,
                    'color': 'rgb(255,103,0)',
                    'min': 0,
                    'max': 1000,
                    'visible': true
                },
                {
                    'label': 'Un tweet',
                    'value': 0.00002,
                    'color': 'rgb(54,185,255)',
                    'min': 0,
                    'max': 1000,
                    'visible': false
                },
                {
                    'label': 'Smartphone',
                    'value': 32,
                    'color': 'rgb(83,83,83)',
                    'min': 0,
                    'max': 70,
                    'visible': true
                },
                {
                    'label': 'Streaming vidéo (1H)',
                    'value': 0.070,
                    'color': 'rgb(151,151,151)',
                    'min': 0,
                    'max': 7000,
                    'visible': true
                },
                {
                    'label': 'Ordinateur portable (15 pouces)',
                    'value': 392,
                    'color': 'rgb(154,154,154)',
                    'min': 0,
                    'max': 25,
                    'visible': false
                },
        ]
    },
    {
        'label': 'Multimédia',
        'img': 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/285/television_1f4fa.png',
        'actions': [
            {
                'label': 'Appareil photo',
                'value': 28,
                'color': 'rgb(149,0,255)',
                'min': 0,
                'max': 30,
                'visible': true
            },
            {
                'label': 'Écran LCD (24 pouces)',
                'value': 431,
                'color': 'rgb(255,250,0)',
                'min': 0,
                'max': 10,
                'visible': false
            },
            {
                'label': 'Lave-vaisselle',
                'value': 271,
                'color': 'rgb(255,250,0)',
                'min': 0,
                'max': 10,
                'visible': true
            },
            {
                'label': 'Ordinateur fixe',
                'value': 865,
                'color': 'rgb(90,90,90)',
                'min': 0,
                'max': 20,
                'visible': false
            },
            {
                'label': 'Télévision 45 pouces',
                'value': 371,
                'color': 'rgb(88,88,88)',
                'min': 0,
                'max': 10,
                'visible': true
            },
        ]
    },
    {
        'label': 'Alimentation',
        'img': 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/285/curry-rice_1f35b.png',
        'actions': [
            {
                'label': 'Alcool fort (10cl)',
                'value': 0.12,
                'color': 'rgb(243,243,243)',
                'min': 0,
                'max': 1000,
                'visible': false
            },
            {
                'label': 'Blanc de poulet (120g)',
                'value': 0.576,
                'color': 'rgb(205,204,78)',
                'min': 0,
                'max': 1000,
                'visible': false
            },
            {
                'label': 'Boeuf (120g)',
                'value': 40,
                'color': 'rgb(255,0,38)',
                'min': 0,
                'max': 1000,
                'visible': false
            },
            {
                'label': 'Canard (120g)',
                'value': 0.78,
                'color': 'rgb(149,255,0)',
                'min': 0,
                'max': 1000,
                'visible': false
            },
            {
                'label': 'Brioche (100g)',
                'value': 0.491,
                'color': 'rgb(255,191,0)',
                'min': 0,
                'max': 1000,
                'visible': false
            },
            {
                'label': 'Brocoli (100g)',
                'value': 0.06,
                'color': 'rgb(98,255,0)',
                'min': 0,
                'max': 1000,
                'visible': false
            },
            {
                'label': 'Chocolat noir (100g)',
                'value': 1.8,
                'color': 'rgb(140,11,11)',
                'min': 0,
                'max': 1000,
                'visible': false
            },    {
                'label': 'Compote (100g)',
                'value': 0.08,
                'color': 'rgb(255,0,51)',
                'min': 0,
                'max': 1000,
                'visible': false
            },
            {
                'label': 'Crêpe (100g)',
                'value': 0.17,
                'color': 'rgb(255,250,0)',
                'min': 0,
                'max': 1000,
                'visible': false
            },
            {
                'label': 'Croque-monsieur (160g)',
                'value': 0.76,
                'color': 'rgb(255,250,0)',
                'min': 0,
                'max': 1000,
                'visible': false
            },    {
                'label': 'Fromage (150g)',
                'value': 0.675,
                'color': 'rgb(255,250,0)',
                'min': 0,
                'max': 1000,
                'visible': false
            },
            {
                'label': 'Fondant au chocolat (125g)',
                'value': 1.21,
                'color': 'rgb(82,32,0)',
                'min': 0,
                'max': 1000,
                'visible': false
            },
            {
                'label': 'Glace (60g)',
                'value': 0.1422,
                'color': 'rgb(255,222,0)',
                'min': 0,
                'max': 1000,
                'visible': false
            },
            {
                'label': 'Jambon cru (130g)',
                'value': 1.638,
                'color': 'rgb(248,130,245)',
                'min': 0,
                'max': 1000,
                'visible': false
            },
            {
                'label': 'Bière (pinte)',
                'value': 1.33,
                'color': 'rgb(198,155,27)',
                'min': 0,
                'max': 1000,
                'visible': false
            },
            {
                'label': 'Légumes/fruits local, de saison (100g)',
                'value': 0.026,
                'color': 'rgb(85,213,101)',
                'min': 0,
                'max': 1000,
                'visible': false
            },
            {
                'label': 'Légumes/fruits importé par avion, saison ou hors saison (100g)',
                'value': 2.7,
                'color': 'rgb(54,80,45)',
                'min': 0,
                'max': 1000,
                'visible': false
            },
            {
                'label': 'Petits pois conserve (100g)',
                'value': 0.04,
                'color': 'rgb(20,219,14)',
                'min': 0,
                'max': 1000,
                'visible': false
            },
            {
                'label': 'Eau du robinet (1L)',
                'value': 0.00013,
                'color': 'rgb(0,50,118)',
                'min': 0,
                'max': 1000,
                'visible': false
            },
            {
                'label': 'Eau de source (1L)',
                'value': 0.45,
                'color': 'rgb(4,84,203)',
                'min': 0,
                'max': 1000,
                'visible': false
            },
            {
                'label': 'Repas avec du boeuf',
                'value': 7.26,
                'color': 'rgb(172,16,40)',
                'min': 0,
                'max': 1000,
                'visible': true
            },
            {
                'label': 'Repas avec du poulet',
                'value': 1.58,
                'color': 'rgb(255,250,133)',
                'min': 0,
                'max': 1000,
                'visible': true
            },
            {
                'label': 'Repas végétarien',
                'value': 0.51,
                'color': 'rgb(47,219,65)',
                'min': 0,
                'max': 1000,
                'visible': true
            },
        ]
    },
    {
        'label': 'Vétements',
        'img': 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/285/t-shirt_1f455.png',
        'actions': [
            {
                'label': 'Chaussures',
                'value': 15,
                'color': 'rgb(11,125,140)',
                'min': 0,
                'max': 100,
                'visible': true
            },
            {
                'label': 'Chemise',
                'value': 11,
                'color': 'rgb(245,242,129)',
                'min': 0,
                'max': 200,
                'visible': false
            },
            {
                'label': 'T-shirt coton',
                'value': 5.2,
                'color': 'rgb(144,121,182)',
                'min': 0,
                'max': 300,
                'visible': true
            },
            {
                'label': '1 jean en coton',
                'value': 23.2,
                'color': 'rgb(4,0,121)',
                'min': 0,
                'max': 300,
                'visible': true
            },
        ]
    },
    {
        'label': 'Énergie',
        'img': 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/285/high-voltage_26a1.png',
        'actions': [
            {
                'label': 'Jour de chauffage (gaz)',
                'value': 18.63, // 15000 * 0.23 / 365 * 2
                'color': 'rgb(255,250,0)',
                'min': 0,
                'max': 10000,
                'visible': true
            },
            {
                'label': 'Jour de chauffage (éléctricité)',
                'value': 1.64, // 5000 * 0.06 / 365 * 2
                'color': 'rgb(255,250,0)',
                'min': 0,
                'max': 10000,
                'visible': true
            },
            {
                'label': 'Jour de chauffage (fioul)',
                'value': 32.05, // 1800 * 3.25 / 365 * 2
                'color': 'rgb(255,250,0)',
                'min': 0,
                'max': 10000,
                'visible': true
            },
        ]
    },
    {
        'label': 'Maison',
        'img': 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/285/house_1f3e0.png',
        'actions': [
            {
                'label': '1 livre de poche',
                'value': 1.18,
                'color': 'rgb(114,201,35)',
                'min': 0,
                'max': 100,
                'visible': true
            },
            {
                'label': '1 canapé convertible',
                'value': 197,
                'color': 'rgb(39,53,121)',
                'min': 0,
                'max': 20,
                'visible': true
            },
            {
                'label': 'Feuille de papier A4',
                'value': 0.0046,
                'color': 'rgb(246,246,246)',
                'min': 0,
                'max': 1000,
                'visible': true
            },
        ]
    },
]

export default actions;