import os

diseases = [
    "Psoriasis", "Eczema", "Tinea corporis", "Pityriasis rosea", "Lichen planus",
    "Scabies", "Seborrheic dermatitis", "Contact dermatitis", "Rosacea", "Acne vulgaris",
    "Vitiligo", "Melasma", "Alopecia areata", "Warts", "Molluscum contagiosum",
    "Basal cell carcinoma", "Squamous cell carcinoma", "Melanoma", "Urticaria", "Impetigo",
    "Herpes simplex", "Herpes zoster", "Cellulitis", "Dermatitis herpetiformis",
    "Folliculitis", "Hidradenitis suppurativa", "Keratosis pilaris", "Nummular eczema",
    "Atopic dermatitis", "Perioral dermatitis"
]

for phase in ["train", "val"]:
    for disease in diseases:
        os.makedirs(os.path.join("data", phase, disease), exist_ok=True)

print("Folders created!")
